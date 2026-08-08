import {
  LANDMARKS,
  type LandmarkId,
  type PrototypeBEvent,
  type PrototypeBState,
} from "../sim";
import {
  deriveWorldMemoryEffects,
  reduceWorldMemory,
  reduceWorldMemoryEvents,
  unresolvedWorldMemorySiteIds,
  type ExpeditionEndReason,
  type WorldEvent,
  type WorldMemoryEffects,
  type WorldMemoryModuleId,
  type WorldMemorySiteId,
  type WorldMemoryState,
} from "../worldMemory";
import type { PrototypeBLayout } from "./layout";

const SITE_LABELS: Record<WorldMemorySiteId, string> = {
  "canopy-relay": "樹冠中継所",
  "flooded-archive": "沈水資料庫",
};

const MODULE_LABELS: Record<WorldMemoryModuleId, string> = {
  "pathfinder-array": "経路観測列",
  "relic-overdrive": "遺物過励器",
};

const SITE_POINTS: Record<
  WorldMemorySiteId,
  { readonly x: number; readonly y: number }
> = {
  "canopy-relay": LANDMARKS.fork.interactionPoint,
  "flooded-archive": LANDMARKS.ruin.interactionPoint,
};

const PICKUP_SITES: Readonly<Record<string, WorldMemorySiteId>> = {
  "pickup-gravity-weight": "canopy-relay",
  "pickup-relay-capacitor": "canopy-relay",
  "pickup-quiet-chime": "flooded-archive",
  "pickup-signal-key": "flooded-archive",
};

const RETURN_REACH = 112;

export interface R09WorldMemoryRuntime {
  readonly initialState: WorldMemoryState;
  readonly loadSource:
    | "empty"
    | "loaded"
    | "recovered-backup"
    | "corrupt-fallback"
    | "seed-mismatch-fallback";
  readonly onCommit: (state: WorldMemoryState) => Promise<void>;
}

type R09Phase =
  | "exploring"
  | "choosing-base"
  | "choosing-module"
  | "saving"
  | "ended";

export class R09MemoryLoop {
  private memory: WorldMemoryState;
  private preview: WorldMemoryState;
  private pendingEvents: WorldEvent[] = [];
  private phase: R09Phase = "exploring";
  private expeditionId = "";
  private eventSequence = 1;
  private selectedBaseSiteId: WorldMemorySiteId | null = null;
  private readonly ledger: HTMLElement;
  private readonly siteList: HTMLElement;
  private readonly memoryLine: HTMLElement;
  private readonly retreatButton: HTMLButtonElement;
  private readonly chooser: HTMLElement;
  private readonly chooserKicker: HTMLElement;
  private readonly chooserTitle: HTMLElement;
  private readonly chooserBody: HTMLElement;
  private readonly chooserActions: HTMLElement;
  private readonly chooserBackButton: HTMLButtonElement;
  private readonly cleanup: Array<() => void> = [];
  private lastAnnotatedMapPaint = "";
  private autoBasicEvents = 0;
  private manualSkillEvents = 0;

  public constructor(
    private readonly layout: PrototypeBLayout,
    private readonly runtime: R09WorldMemoryRuntime,
  ) {
    this.memory = runtime.initialState;
    this.preview = runtime.initialState;
    this.expeditionId = this.nextExpeditionId();
    this.ledger = this.createLedger();
    this.siteList = requireElement(this.ledger, '[data-r09="sites"]');
    this.memoryLine = requireElement(this.ledger, '[data-r09="memory"]');
    this.retreatButton = requireButton(
      this.ledger,
      '[data-r09-action="retreat"]',
    );
    this.chooser = this.createChooser();
    this.chooserKicker = requireElement(
      this.chooser,
      '[data-r09="chooser-kicker"]',
    );
    this.chooserTitle = requireElement(
      this.chooser,
      '[data-r09="chooser-title"]',
    );
    this.chooserBody = requireElement(
      this.chooser,
      '[data-r09="chooser-body"]',
    );
    this.chooserActions = requireElement(
      this.chooser,
      '[data-r09="chooser-actions"]',
    );
    this.chooserBackButton = requireButton(
      this.chooser,
      '[data-r09-action="back"]',
    );

    const retreat = (): void => {
      void this.finish("retreated");
    };
    const back = (): void => this.closeChooser();
    this.retreatButton.addEventListener("click", retreat);
    this.chooserBackButton.addEventListener("click", back);
    this.cleanup.push(
      () => this.retreatButton.removeEventListener("click", retreat),
      () => this.chooserBackButton.removeEventListener("click", back),
    );

    this.layout.stage.append(this.ledger, this.chooser);
    this.syncDataset();
    this.renderLedger();
  }

  public get isBlocking(): boolean {
    return this.phase !== "exploring";
  }

  public get effects(): WorldMemoryEffects {
    return deriveWorldMemoryEffects(this.memory);
  }

  public get worldMemory(): WorldMemoryState {
    return this.memory;
  }

  public ownsTownInteraction(state: PrototypeBState): boolean {
    return this.isAtTownBoard(state);
  }

  public observeStep(
    state: PrototypeBState,
    events: readonly PrototypeBEvent[],
    interacted: boolean,
  ): void {
    if (this.phase !== "exploring") {
      return;
    }

    for (const event of events) {
      if (event.type === "player-attacked") {
        this.autoBasicEvents += 1;
      }
      if (event.type === "relic-activated") {
        this.manualSkillEvents += 1;
      }
      if (event.type === "landmark-entered") {
        const siteId = siteForLandmark(event.landmarkId);
        if (siteId !== null) {
          this.discoverSite(siteId, event.tick);
        }
      }
      if (event.type === "loot-picked") {
        const siteId = PICKUP_SITES[event.pickupId];
        if (siteId !== undefined) {
          this.recoverItem(siteId, event.pickupId, event.tick);
        }
      }
      if (event.type === "player-defeated") {
        void this.finish("defeated");
      }
    }

    if (interacted && this.isAtTownBoard(state)) {
      this.openReturnFlow();
    }
  }

  public updatePresentation(state: PrototypeBState): void {
    this.syncDataset();

    const destination = this.destinationFor(state);
    this.layout.objectiveText.textContent = this.objectiveText();
    this.layout.stage.dataset.playerSpeed = String(state.player.speed);
    this.layout.stage.dataset.relicCooldownMaxTicks = String(
      state.player.relicCooldownMaxTicks,
    );
    this.layout.waypointName.textContent = destination.name;

    const deltaX = destination.x - state.player.x;
    const deltaY = destination.y - state.player.y;
    const distance = Math.hypot(deltaX, deltaY);
    const screenX = (deltaX - deltaY) / Math.SQRT2;
    const screenY = (deltaX + deltaY) / Math.SQRT2;
    const angle = Math.atan2(screenX, -screenY) * (180 / Math.PI);
    this.layout.waypointDistance.textContent =
      `${Math.max(0, Math.round(distance / 10))} m`;
    this.layout.waypointArrow.style.transform =
      `rotate(${angle.toFixed(1)}deg)`;
    this.annotateMinimap();

    if (this.phase === "ended") {
      this.layout.resultPanel.setAttribute("aria-hidden", "false");
      this.layout.resultPanel.inert = false;
    }
  }

  public beginNextExpedition(): void {
    this.pendingEvents = [];
    this.preview = this.memory;
    this.phase = "exploring";
    this.selectedBaseSiteId = null;
    this.eventSequence = 1;
    this.autoBasicEvents = 0;
    this.manualSkillEvents = 0;
    this.expeditionId = this.nextExpeditionId();
    this.layout.resultPanel.setAttribute("aria-hidden", "true");
    this.layout.resultPanel.inert = true;
    this.closeChooser();
    this.lastAnnotatedMapPaint = "";
    this.syncDataset();
    this.renderLedger();
  }

  public destroy(): void {
    for (const remove of this.cleanup.splice(0)) {
      remove();
    }
    this.ledger.remove();
    this.chooser.remove();
  }

  private discoverSite(siteId: WorldMemorySiteId, tick: number): void {
    if (
      this.preview.discoveredSites.some((site) => site.siteId === siteId)
    ) {
      return;
    }
    this.queue({
      type: "site-discovered",
      eventId: this.allocateEventId("site"),
      expeditionId: this.expeditionId,
      tick,
      siteId,
    });
  }

  private recoverItem(
    siteId: WorldMemorySiteId,
    pickupId: string,
    tick: number,
  ): void {
    this.discoverSite(siteId, tick);
    const itemId = `relic:${pickupId}`;
    if (this.preview.recoveredItems.some((item) => item.itemId === itemId)) {
      return;
    }
    this.queue({
      type: "item-recovered",
      eventId: this.allocateEventId("item"),
      expeditionId: this.expeditionId,
      tick,
      siteId,
      itemId,
    });
  }

  private queue(event: WorldEvent): void {
    this.preview = reduceWorldMemory(this.preview, event);
    this.pendingEvents.push(event);
    this.renderLedger();
    this.syncDataset();
  }

  private openReturnFlow(): void {
    if (this.memory.installedModule !== null) {
      void this.finish("returned");
      return;
    }

    const candidates = this.baseCandidates();
    if (candidates.length === 0) {
      this.memoryLine.textContent =
        "拠点化には、どちらかのsiteで回収した中核遺物が一つ必要。";
      this.layout.statusLive.textContent =
        "拠点化できる回収物がありません。siteを探索してください。";
      return;
    }

    this.phase = "choosing-base";
    this.selectedBaseSiteId = null;
    this.chooserKicker.textContent = "BASE CLAIM / WORLD MEMORY";
    this.chooserTitle.textContent = "どちらを最初の拠点にする？";
    this.chooserBody.textContent =
      "もう一方は消えない。次の遠征に、未解決の目的地として残る。";
    this.chooserActions.replaceChildren(
      ...candidates.map((siteId) =>
        this.choiceButton(
          SITE_LABELS[siteId],
          `${this.availableItemsAt(siteId).length}件の中核遺物を利用可能`,
          () => this.chooseBase(siteId),
        ),
      ),
    );
    this.showChooser();
  }

  private chooseBase(siteId: WorldMemorySiteId): void {
    this.phase = "choosing-module";
    this.selectedBaseSiteId = siteId;
    this.chooserKicker.textContent = "MODULE INSTALL / ONE CORE REQUIRED";
    this.chooserTitle.textContent = `${SITE_LABELS[siteId]}に何を組み込む？`;
    this.chooserBody.textContent =
      "設置には回収物を一つ消費する。効果は次の遠征開始時から現れる。";
    this.chooserActions.replaceChildren(
      this.choiceButton(
        MODULE_LABELS["pathfinder-array"],
        "琥珀色の経路標を投影し、非戦闘時の移動を12%高める",
        () => void this.install("pathfinder-array"),
      ),
      this.choiceButton(
        MODULE_LABELS["relic-overdrive"],
        "珊瑚色の共鳴環を形成し、大技の再使用時間を35%短縮する",
        () => void this.install("relic-overdrive"),
      ),
    );
    this.showChooser();
  }

  private async install(moduleId: WorldMemoryModuleId): Promise<void> {
    const siteId = this.selectedBaseSiteId;
    const item = siteId === null ? undefined : this.availableItemsAt(siteId)[0];
    if (siteId === null || item === undefined) {
      this.failReturn("設置に使える回収物が見つかりませんでした。");
      return;
    }

    const tick = this.pendingEvents.at(-1)?.tick ?? 0;
    const completionEvents: WorldEvent[] = [
      {
        type: "base-claimed",
        eventId: this.allocateEventId("base"),
        expeditionId: this.expeditionId,
        tick,
        siteId,
      },
      {
        type: "module-installed",
        eventId: this.allocateEventId("module"),
        expeditionId: this.expeditionId,
        tick,
        siteId,
        moduleId,
        consumedItemId: item.itemId,
      },
    ];
    await this.finish("returned", completionEvents);
  }

  private async finish(
    reason: ExpeditionEndReason,
    completionEvents: readonly WorldEvent[] = [],
  ): Promise<void> {
    if (this.phase === "saving" || this.phase === "ended") {
      return;
    }
    this.phase = "saving";
    this.hideChooser();
    this.retreatButton.disabled = true;
    const tick = Math.max(
      0,
      completionEvents.at(-1)?.tick ?? this.pendingEvents.at(-1)?.tick ?? 0,
    );
    const endEvent: WorldEvent = {
      type: "expedition-ended",
      eventId: this.allocateEventId("end"),
      expeditionId: this.expeditionId,
      tick,
      reason,
    };
    const commitEvents = [
      ...this.pendingEvents,
      ...completionEvents,
      endEvent,
    ];

    try {
      const next = reduceWorldMemoryEvents(this.memory, commitEvents);
      await this.runtime.onCommit(next);
      this.memory = next;
      this.preview = next;
      this.pendingEvents = [];
      this.phase = "ended";
      this.showResult(reason);
    } catch (error) {
      this.phase = "exploring";
      this.retreatButton.disabled = false;
      this.failReturn(
        error instanceof Error
          ? `記録に失敗しました。${error.message}`
          : "記録に失敗しました。もう一度帰還操作を試してください。",
      );
    }
    this.syncDataset();
    this.renderLedger();
  }

  private showResult(reason: ExpeditionEndReason): void {
    const module = this.memory.installedModule;
    const remaining = unresolvedWorldMemorySiteIds(this.memory);
    this.layout.resultTitle.textContent =
      reason === "returned"
        ? module === null
          ? "遠征記録を保存"
          : `${SITE_LABELS[module.siteId]}、稼働開始`
        : reason === "retreated"
          ? "撤退。持ち帰れるものは持ち帰った"
          : "調査途絶。記録だけが帰還した";
    this.layout.resultBody.textContent = [
      `発見site ${this.memory.discoveredSites.length} / 2　回収履歴 ${this.memory.recoveredItems.length}`,
      module === null
        ? "拠点とmoduleはまだ確定していない。"
        : `${MODULE_LABELS[module.moduleId]}を設置。回収物 ${module.consumedItemId} を消費。`,
      remaining.length > 0
        ? `未解決：${remaining.map((siteId) => SITE_LABELS[siteId]).join(" / ")}`
        : "二つのsiteは記録済み。世界は次の変化を待っている。",
    ].join("\n");
    this.layout.restartButton.textContent =
      module === null ? "次の遠征へ" : "記憶を反映して二回目へ";
    this.layout.restartButton.disabled = false;
    this.layout.resultPanel.setAttribute("aria-hidden", "false");
    this.layout.resultPanel.inert = false;
    this.layout.statusLive.textContent = "世界記憶をローカルへ保存しました。";
  }

  private baseCandidates(): readonly WorldMemorySiteId[] {
    return this.preview.discoveredSites
      .map((site) => site.siteId)
      .filter((siteId) => this.availableItemsAt(siteId).length > 0);
  }

  private availableItemsAt(siteId: WorldMemorySiteId) {
    return this.preview.recoveredItems.filter(
      (item) => item.sourceSiteId === siteId && item.status === "available",
    );
  }

  private objectiveText(): string {
    if (this.phase === "saving") {
      return "世界記憶を書き込んでいる";
    }
    if (this.phase === "ended") {
      return "遠征記録を確認する";
    }
    if (this.memory.installedModule !== null) {
      const unresolved = unresolvedWorldMemorySiteIds(this.memory);
      return unresolved.length > 0
        ? `${SITE_LABELS[unresolved[0] ?? "canopy-relay"]}へ。module効果を確認する`
        : "module効果を確認し、自由に調査する";
    }
    if (this.baseCandidates().length > 0) {
      return "観測町へ帰還し、拠点とmoduleを選ぶ";
    }
    if (this.preview.discoveredSites.length > 0) {
      return "siteの中核遺物を回収する";
    }
    return "二つのsiteから行き先を選ぶ";
  }

  private destinationFor(state: PrototypeBState): {
    readonly x: number;
    readonly y: number;
    readonly name: string;
  } {
    if (this.baseCandidates().length > 0 || this.phase !== "exploring") {
      return { ...LANDMARKS.town.interactionPoint, name: "観測町・帰還端末" };
    }
    const unresolved = unresolvedWorldMemorySiteIds(this.memory);
    const undiscovered = (Object.keys(SITE_POINTS) as WorldMemorySiteId[])
      .filter(
        (siteId) =>
          !this.preview.discoveredSites.some((site) => site.siteId === siteId),
      );
    const candidates = unresolved.length > 0 ? unresolved : undiscovered;
    const siteId = nearestSite(state, candidates.length > 0 ? candidates : [
      "canopy-relay",
      "flooded-archive",
    ]);
    return { ...SITE_POINTS[siteId], name: SITE_LABELS[siteId] };
  }

  private renderLedger(): void {
    const siteRows = (Object.keys(SITE_LABELS) as WorldMemorySiteId[]).map(
      (siteId) => {
        const discovered = this.preview.discoveredSites.some(
          (site) => site.siteId === siteId,
        );
        const isBase = this.preview.claimedBaseSiteId === siteId;
        const recovered = this.preview.recoveredItems.filter(
          (item) => item.sourceSiteId === siteId,
        ).length;
        const row = document.createElement("li");
        row.dataset.state = isBase
          ? "base"
          : discovered
            ? "discovered"
            : "unknown";
        row.innerHTML = `<i></i><span>${SITE_LABELS[siteId]}</span><b>${
          isBase ? "BASE" : discovered ? `REC ${recovered}` : "SIGNAL"
        }</b>`;
        return row;
      },
    );
    this.siteList.replaceChildren(...siteRows);

    const module = this.memory.installedModule?.moduleId;
    this.memoryLine.textContent =
      this.phase === "saving"
        ? "LOCAL MEMORY / WRITING…"
        : module === undefined
          ? `LOCAL MEMORY / ${this.pendingEvents.length}件を持帰り中`
          : `${MODULE_LABELS[module]} / ACTIVE`;
    this.retreatButton.disabled =
      this.phase !== "exploring" || this.pendingEvents.length === 0;
  }

  private annotateMinimap(): void {
    const paint = this.layout.minimap.dataset.lastPaintAt ?? "";
    if (paint === this.lastAnnotatedMapPaint) {
      return;
    }
    const context = this.layout.minimap.getContext("2d");
    if (context === null) {
      return;
    }
    this.lastAnnotatedMapPaint = paint;
    const scaleX = this.layout.minimap.width / 3_600;
    const scaleY = this.layout.minimap.height / 1_800;

    for (const siteId of Object.keys(SITE_POINTS) as WorldMemorySiteId[]) {
      const point = SITE_POINTS[siteId];
      const discovered = this.preview.discoveredSites.some(
        (site) => site.siteId === siteId,
      );
      context.save();
      context.translate(point.x * scaleX, point.y * scaleY);
      context.fillStyle = discovered ? "#82f3d2" : "#f6bd68";
      context.strokeStyle = "rgba(7, 31, 29, 0.92)";
      context.lineWidth = 2;
      context.rotate(Math.PI / 4);
      context.fillRect(-4, -4, 8, 8);
      context.strokeRect(-4, -4, 8, 8);
      context.restore();
    }
  }

  private syncDataset(): void {
    const effects = this.effects;
    this.layout.stage.dataset.memoryVersion = String(this.memory.version);
    this.layout.stage.dataset.memoryExpedition = this.expeditionId;
    this.layout.stage.dataset.memoryPhase = this.phase;
    this.layout.stage.dataset.memoryDiscovered = this.preview.discoveredSites
      .map((site) => site.siteId)
      .join(",");
    this.layout.stage.dataset.memoryModule =
      this.memory.installedModule?.moduleId ?? "none";
    this.layout.stage.dataset.memoryBase =
      this.memory.claimedBaseSiteId ?? "none";
    this.layout.stage.dataset.memoryRecovered = this.preview.recoveredItems
      .map((item) => `${item.itemId}:${item.status}`)
      .join(",");
    this.layout.stage.dataset.memoryLastEndReason =
      this.memory.expeditionHistory.at(-1)?.endedReason ?? "none";
    this.layout.stage.dataset.memoryVisualCue = effects.routeOverlay
      ? "route-overlay"
      : effects.relicAura
        ? "relic-aura"
        : "none";
    this.layout.stage.dataset.memoryGameplayCue =
      effects.explorationSpeedMultiplier > 1
        ? "exploration-speed"
        : effects.relicCooldownMultiplier < 1
          ? "relic-cooldown"
          : "none";
    this.layout.stage.dataset.memorySaved = String(
      this.memory.expeditionHistory.length,
    );
    this.layout.stage.dataset.memoryAutoBasicEvents = String(
      this.autoBasicEvents,
    );
    this.layout.stage.dataset.memoryManualSkillEvents = String(
      this.manualSkillEvents,
    );
  }

  private createLedger(): HTMLElement {
    const ledger = document.createElement("aside");
    ledger.className = "r09-memory-ledger";
    ledger.setAttribute("aria-label", "世界記憶と遠征状況");
    ledger.innerHTML = `
      <div class="r09-memory-ledger__head">
        <span>WORLD MEMORY / V1</span>
        <strong>FIRST MEMORY EXPEDITION</strong>
      </div>
      <ul data-r09="sites"></ul>
      <p data-r09="memory">LOCAL MEMORY</p>
      <button data-r09-action="retreat" type="button" disabled>
        <strong>撤退して持ち帰る</strong><small>発見と回収だけを記録</small>
      </button>
    `;
    return ledger;
  }

  private createChooser(): HTMLElement {
    const chooser = document.createElement("section");
    chooser.className = "r09-memory-chooser";
    chooser.setAttribute("role", "dialog");
    chooser.setAttribute("aria-modal", "true");
    chooser.setAttribute("aria-hidden", "true");
    chooser.inert = true;
    chooser.innerHTML = `
      <div class="r09-memory-chooser__copy">
        <span data-r09="chooser-kicker">WORLD MEMORY</span>
        <h2 data-r09="chooser-title">拠点を選ぶ</h2>
        <p data-r09="chooser-body"></p>
      </div>
      <div class="r09-memory-chooser__actions" data-r09="chooser-actions"></div>
      <button class="r09-memory-chooser__back" data-r09-action="back" type="button">
        探索へ戻る
      </button>
    `;
    return chooser;
  }

  private choiceButton(
    title: string,
    detail: string,
    action: () => void,
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<strong>${title}</strong><small>${detail}</small>`;
    button.addEventListener("click", action, { once: true });
    return button;
  }

  private showChooser(): void {
    this.chooser.setAttribute("aria-hidden", "false");
    this.chooser.inert = false;
    this.chooserActions.querySelector<HTMLButtonElement>("button")?.focus({
      preventScroll: true,
    });
    this.syncDataset();
  }

  private hideChooser(): void {
    this.chooser.setAttribute("aria-hidden", "true");
    this.chooser.inert = true;
  }

  private closeChooser(): void {
    if (this.phase === "choosing-base" || this.phase === "choosing-module") {
      this.phase = "exploring";
    }
    this.selectedBaseSiteId = null;
    this.hideChooser();
    this.syncDataset();
    this.layout.stage.focus({ preventScroll: true });
  }

  private failReturn(message: string): void {
    this.memoryLine.textContent = message;
    this.layout.statusLive.textContent = message;
    this.closeChooser();
  }

  private isAtTownBoard(state: PrototypeBState): boolean {
    return (
      Math.hypot(
        state.player.x - LANDMARKS.town.interactionPoint.x,
        state.player.y - LANDMARKS.town.interactionPoint.y,
      ) <= RETURN_REACH
    );
  }

  private allocateEventId(kind: string): string {
    const id = `${this.expeditionId}:${this.eventSequence}:${kind}`;
    this.eventSequence += 1;
    return id;
  }

  private nextExpeditionId(): string {
    return `expedition-${this.memory.expeditionHistory.length + 1}`;
  }
}

function siteForLandmark(
  landmarkId: LandmarkId,
): WorldMemorySiteId | null {
  if (landmarkId === "fork") {
    return "canopy-relay";
  }
  if (landmarkId === "ruin") {
    return "flooded-archive";
  }
  return null;
}

function nearestSite(
  state: PrototypeBState,
  candidates: readonly WorldMemorySiteId[],
): WorldMemorySiteId {
  return [...candidates].sort((first, second) => {
    const a = SITE_POINTS[first];
    const b = SITE_POINTS[second];
    return (
      Math.hypot(state.player.x - a.x, state.player.y - a.y) -
        Math.hypot(state.player.x - b.x, state.player.y - b.y) ||
      first.localeCompare(second)
    );
  })[0] ?? "canopy-relay";
}

function requireElement(root: HTMLElement, selector: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector);
  if (element === null) {
    throw new Error(`R09 memory UI element is missing: ${selector}`);
  }
  return element;
}

function requireButton(root: HTMLElement, selector: string): HTMLButtonElement {
  const element = root.querySelector<HTMLButtonElement>(selector);
  if (element === null) {
    throw new Error(`R09 memory UI button is missing: ${selector}`);
  }
  return element;
}
