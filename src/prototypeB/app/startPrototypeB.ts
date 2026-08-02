import { RelicSoundscape, type RelicSoundCue } from "../audio";
import {
  PrototypeBControls,
  type PrototypeBControlFrame,
} from "../input";
import {
  ANOMALY_ID,
  LANDMARKS,
  LOOT_DEFINITIONS,
  TICK_RATE,
  WEAPON_DEFINITIONS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  createPrototypeBState,
  createSemiAutoCombatController,
  isWithinAnomalyInteractionReach,
  stepSemiAutoCombatController,
  stepPrototypeB,
  type AudioCue,
  type CommandRejectionReason,
  type LootId,
  type PrototypeBCommand,
  type PrototypeBEvent,
  type PrototypeBState,
  type QuestOutcome,
  type SemiAutoCombatControllerState,
  type WeaponId,
} from "../sim";
import {
  PrototypeBRenderer,
  type CombatPresentationState,
  type PrototypeBRenderQuality,
} from "../render";
import { screenMovementToWorld } from "../render/CameraComposition";
import {
  createPrototypeBLayout,
  type PrototypeBLayout,
} from "./layout";

const FIXED_STEP_MS = 1_000 / TICK_RATE;
const MAX_STEPS_PER_FRAME = 5;
const SEMI_AUTO_SKILL_LOCK_TICKS = Math.ceil(TICK_RATE * 0.7);
const RUN_SEED = "relic-frontier-b-02";
const activeApplications = new WeakMap<
  HTMLElement,
  PrototypeBApplication
>();

type ItemDossier = {
  readonly title: string;
  readonly effect: string;
  readonly principle: string;
  readonly sideEffect: string;
  readonly note: string;
};

type InterfaceOptions = {
  readonly decisionOpen?: boolean;
  readonly announceStatus?: boolean;
  readonly combatPresentation?: CombatPresentationState;
};

export type PrototypeBApplication = {
  destroy(): void;
  getState(): PrototypeBState;
};

export type PrototypeBExperience =
  | "baseline"
  | "north-star"
  | "beauty-cell"
  | "r04"
  | "r05"
  | "r06"
  | "r07"
  | "r08";

export type StartPrototypeBOptions = {
  readonly experience?: PrototypeBExperience;
  readonly renderQuality?: PrototypeBRenderQuality;
  readonly companionPreview?: boolean;
  readonly semiAutoCombat?: boolean;
};

export function isNorthStarDebugEnabled(search: string): boolean {
  return new URLSearchParams(search).getAll("debug").includes("1");
}

const DOSSIERS: Record<LootId, ItemDossier> = {
  "edge-coil": {
    title: "縁断コイル E-04",
    effect: "測量刃の威力を6増幅する。",
    principle: "刃の輪郭だけを0.03秒先に送る位相先行。仮説。",
    sideEffect: "鞘に入れた鉛筆まで、やたら尖る。",
    note: "『切れ味より、書類の角が怖い』— 前任調査員",
  },
  "gravity-weight": {
    title: "局所重錘 G-12",
    effect: "杭打機の威力を12増幅する。",
    principle: "衝突の瞬間だけ質量の参照先を衛星軌道へ移す。仮説。",
    sideEffect: "使用後、持ち主の靴だけ三分間重くなる。",
    note: "『置き忘れない。床がへこむ』— 整備票",
  },
  "field-tonic": {
    title: "野外縫合剤 T-3",
    effect: "体力を45回復する道具を1個追加する。",
    principle: "傷口へ本人の正常時データを上書きする医療糊。",
    sideEffect: "治った場所が一度だけ知らない番号へ発信する。",
    note: "『通話料は観測所持ちにしてほしい』— 使用者",
  },
  "relay-capacitor": {
    title: "中継蓄相器 C-17",
    effect: "斥力環の威力を10増し、再使用を1秒短縮する。",
    principle: "周辺機器の待ち時間を回収し、電荷として再利用する。",
    sideEffect: "近くの炊飯器が、完了前に完了音を鳴らす。",
    note: "『急かされている気がする』— 台所担当",
  },
  "quiet-chime": {
    title: "無音鈴 Q-0",
    effect: "反響体を斥力環で鎮静できる。",
    principle: "音を出すのではなく、周囲から同じ長さの沈黙を引く。",
    sideEffect: "鳴らすたび、どこかで一匹だけ犬が首を傾げる。",
    note: "『聞こえなかった。だから作動した』— 観測記録",
  },
  "signal-key": {
    title: "信号鍵 K-99",
    effect: "反響体との直接接続を解禁する。",
    principle: "鍵穴ではなく、通信相手の「返事したい気持ち」を開く。",
    sideEffect: "接続中、使用者の独り言が字幕として表示される。",
    note: "『考えてから黙ること』— 接続手順書",
  },
};

const OUTCOME_LABELS: Record<QuestOutcome, string> = {
  destroy: "破壊",
  calm: "鎮静",
  connect: "接続",
};

export function startPrototypeB(
  root: HTMLElement,
  options: StartPrototypeBOptions = {},
): PrototypeBApplication {
  activeApplications.get(root)?.destroy();

  const layout = createPrototypeBLayout(root);
  configureExperience(root, layout, options);
  const controls = new PrototypeBControls(layout.stage);
  const sound = new RelicSoundscape();
  const listeners: Array<() => void> = [];
  let state = createPrototypeBState(RUN_SEED);
  if (
    options.experience === "r05" ||
    options.experience === "r06" ||
    options.experience === "r07" ||
    options.experience === "r08"
  ) {
    // Start in a front three-quarter read so the high-density voxel face,
    // hair silhouette and fitted coat are visible before the player moves.
    state.player.facingX = 0;
    state.player.facingY = 1;
  }
  let renderer = createRenderer(layout, state);
  let animationFrame = 0;
  let lastFrameAt = performance.now();
  let accumulator = 0;
  let started = false;
  let disposed = false;
  let contextLost = false;
  let muted = false;
  let toastUntil = 0;
  let dossierUntil = 0;
  let lastStatsAt = 0;
  let sampledFrames = 0;
  let sampledTime = 0;
  let outcomeDismissed = false;
  let combatPresentation: CombatPresentationState | undefined;
  let semiAutoController: SemiAutoCombatControllerState =
    createSemiAutoCombatController();
  let semiAutoSuppressionTicks = 0;
  let previousDecisionOpen = false;
  let previousResultOpen = false;
  let statusMessageHoldUntil = 0;
  const captureState =
    options.experience === "r05" ||
      options.experience === "r06" ||
      options.experience === "r07" ||
      options.experience === "r08"
    ? new URLSearchParams(window.location.search).get("capture")
    : null;
  let capturedFrameCount = 0;
  const portraitQuery = window.matchMedia("(orientation: portrait)");
  let portraitPaused = portraitQuery.matches;

  controls.setEnabled(false);
  updateInterface(layout, state, performance.now(), {
    decisionOpen: false,
    announceStatus: false,
  });

  const announceStatus = (
    message: string,
    now = performance.now(),
    holdMs = 1_800,
  ): void => {
    layout.statusLive.textContent = message;
    statusMessageHoldUntil = now + holdMs;
  };

  const controlsMayRun = (): boolean =>
    started &&
    !portraitPaused &&
    !contextLost &&
    !document.hidden &&
    state.status === "playing";
  const currentDecisionOpen = (): boolean =>
    isOutcomeDecisionPending(state) && !outcomeDismissed;

  const applyOrientationState = (
    announceChange: boolean,
  ): void => {
    portraitPaused = portraitQuery.matches;
    layout.stage.inert = portraitPaused;
    layout.orientationNotice.setAttribute(
      "aria-hidden",
      String(!portraitPaused),
    );
    controls.setEnabled(controlsMayRun());
    accumulator = 0;
    lastFrameAt = performance.now();

    if (announceChange) {
      announceStatus(
        portraitPaused
          ? "ゲームを一時停止しました。端末を横向きにしてください。"
          : "横向き表示へ戻りました。調査を再開します。",
      );
      if (!portraitPaused && started) {
        layout.stage.focus({ preventScroll: true });
      }
    }
  };

  applyOrientationState(false);

  const begin = (): void => {
    if (started || disposed) {
      return;
    }

    started = true;
    if (
      options.experience === "north-star" ||
      options.experience === "beauty-cell" ||
      options.experience === "r04" ||
      options.experience === "r05" ||
      options.experience === "r06" ||
      options.experience === "r07" ||
      options.experience === "r08"
    ) {
      layout.stage.dataset.presentationState = "active";
    }
    layout.titleOverlay.setAttribute("aria-hidden", "true");
    layout.titleOverlay.inert = true;
    controls.setEnabled(controlsMayRun());
    lastFrameAt = performance.now();
    announceStatus(
      "調査開始。町の依頼板に近づき、調査ボタンを押してください。",
      lastFrameAt,
    );
    if (!portraitPaused) {
      layout.stage.focus({ preventScroll: true });
    }
    if (captureState === null) {
      void sound.unlock().catch(() => {
        showToast(
          layout,
          "音声を開始できませんでした。ゲームは続行できます。",
          performance.now(),
        );
      });
    }
  };

  const toggleMute = (): void => {
    muted = !muted;
    sound.setMuted(muted);
    layout.muteButton.setAttribute("aria-pressed", String(muted));
    layout.muteButton.innerHTML = muted
      ? '<span aria-hidden="true">×</span> MUTED'
      : '<span aria-hidden="true">◖))</span> SOUND';
  };

  const restart = (): void => {
    state = createPrototypeBState(RUN_SEED);
    semiAutoController = createSemiAutoCombatController();
    semiAutoSuppressionTicks = 0;
    combatPresentation = undefined;
    accumulator = 0;
    outcomeDismissed = false;
    previousDecisionOpen = false;
    previousResultOpen = false;
    renderer.dispose();
    renderer = createRenderer(layout, state);
    layout.resultPanel.setAttribute("aria-hidden", "true");
    layout.resultPanel.inert = true;
    layout.outcomePanel.setAttribute("aria-hidden", "true");
    layout.outcomePanel.inert = true;
    controls.setEnabled(controlsMayRun());
    showToast(layout, "新しい調査記録を開始。", performance.now());
    updateInterface(layout, state, performance.now(), {
      decisionOpen: false,
      announceStatus: false,
    });
    layout.stage.focus({ preventScroll: true });
  };

  const startClick = (): void => begin();
  const muteClick = (): void => toggleMute();
  const restartClick = (): void => restart();
  const enterToBegin = (event: KeyboardEvent): void => {
    if (event.code === "Enter") {
      begin();
    }
  };
  const visibilityChange = (): void => {
    lastFrameAt = performance.now();
    accumulator = 0;
    controls.setEnabled(controlsMayRun());
  };
  const orientationChange = (): void => applyOrientationState(true);
  const outcomeBackClick = (): void => {
    if (!isOutcomeDecisionPending(state)) {
      return;
    }

    outcomeDismissed = true;
    showToast(
      layout,
      "応答を保留。街道へ戻り、必要な遺物を探せる。",
      performance.now(),
      3_600,
    );
    announceStatus(
      "応答を保留しました。反響体の近くで調査すると、選択へ戻れます。",
    );
  };
  const trapOutcomeFocus = (event: KeyboardEvent): void => {
    if (!currentDecisionOpen()) {
      return;
    }

    if (event.code === "Escape") {
      event.preventDefault();
      outcomeBackClick();
      return;
    }
    if (event.code !== "Tab") {
      return;
    }

    const focusable = getEnabledOutcomeButtons(layout);
    if (focusable.length === 0) {
      return;
    }

    event.preventDefault();
    const activeIndex = focusable.indexOf(
      document.activeElement as HTMLButtonElement,
    );
    const nextIndex = event.shiftKey
      ? activeIndex <= 0
        ? focusable.length - 1
        : activeIndex - 1
      : activeIndex < 0 || activeIndex === focusable.length - 1
        ? 0
        : activeIndex + 1;
    focusable[nextIndex]?.focus({ preventScroll: true });
  };

  layout.startButton.addEventListener("click", startClick);
  layout.muteButton.addEventListener("click", muteClick);
  layout.restartButton.addEventListener("click", restartClick);
  layout.outcomeBackButton.addEventListener("click", outcomeBackClick);
  window.addEventListener("keydown", enterToBegin);
  window.addEventListener("keydown", trapOutcomeFocus);
  document.addEventListener("visibilitychange", visibilityChange);
  portraitQuery.addEventListener("change", orientationChange);
  listeners.push(
    () => layout.startButton.removeEventListener("click", startClick),
    () => layout.muteButton.removeEventListener("click", muteClick),
    () => layout.restartButton.removeEventListener("click", restartClick),
    () =>
      layout.outcomeBackButton.removeEventListener(
        "click",
        outcomeBackClick,
      ),
    () => window.removeEventListener("keydown", enterToBegin),
    () => window.removeEventListener("keydown", trapOutcomeFocus),
    () =>
      document.removeEventListener(
        "visibilitychange",
        visibilityChange,
      ),
    () => portraitQuery.removeEventListener("change", orientationChange),
  );

  const renderFrame = (now: number): void => {
    if (disposed) {
      return;
    }

    const delta = Math.min(100, Math.max(0, now - lastFrameAt));
    lastFrameAt = now;
    const events: PrototypeBEvent[] = [];

    if (
      started &&
      !contextLost &&
      !document.hidden &&
      !portraitPaused &&
      state.status === "playing"
    ) {
      accumulator += delta;
      let steps = 0;

      while (
        accumulator >= FIXED_STEP_MS &&
        steps < MAX_STEPS_PER_FRAME
      ) {
        const input = controls.consumeFrame();
        const decisionOpen = currentDecisionOpen();

        if (
          outcomeDismissed &&
          input.interact &&
          isPlayerWithinAnomalyInteractionReach(state)
        ) {
          outcomeDismissed = false;
          announceStatus(
            "反響体への応答選択を再開します。",
            now,
          );
        } else if (!decisionOpen || input.outcomeChoice !== null) {
          const command = commandFromInput(state, input, decisionOpen);
          if (options.semiAutoCombat === true && !decisionOpen) {
            const willActivateRelic =
              command.activateRelic === true &&
              state.player.relicCooldownTicks <= 1;
            if (willActivateRelic) {
              semiAutoSuppressionTicks = Math.max(
                semiAutoSuppressionTicks,
                SEMI_AUTO_SKILL_LOCK_TICKS,
              );
            } else if (
              command.dodge === true ||
              command.chooseWeapon !== undefined
            ) {
              semiAutoSuppressionTicks = Math.max(
                semiAutoSuppressionTicks,
                1,
              );
            }

            if (semiAutoSuppressionTicks > 0) {
              semiAutoController = createSemiAutoCombatController();
              semiAutoSuppressionTicks -= 1;
              command.moveSpeedScale = 1;
              command.attack = false;
              combatPresentation = {
                targetId: null,
                phase: "idle",
                progress: 0,
              };
            } else {
              const autoCombat = stepSemiAutoCombatController(
                semiAutoController,
                state,
              );
              semiAutoController = autoCombat.state;
              command.moveSpeedScale =
                autoCombat.presentation.movementScale;
              command.attack =
                autoCombat.commandContribution.attack === true;
              combatPresentation = {
                targetId: autoCombat.presentation.targetId,
                phase: autoCombat.presentation.phase,
                progress: autoCombat.presentation.phaseProgress,
              };
            }
          }
          const result = stepPrototypeB(state, command);
          state = result.state;
          events.push(...result.events);
        }

        accumulator -= FIXED_STEP_MS;
        steps += 1;
      }

      if (steps === MAX_STEPS_PER_FRAME) {
        accumulator = Math.min(accumulator, FIXED_STEP_MS);
      }
    }

    processEvents(layout, sound, state, events, now);
    if (!isOutcomeDecisionPending(state)) {
      outcomeDismissed = false;
    }
    const decisionOpen = currentDecisionOpen();
    updateInterface(layout, state, now, {
      decisionOpen,
      announceStatus:
        started &&
        !portraitPaused &&
        !contextLost &&
        now >= statusMessageHoldUntil,
      combatPresentation,
    });
    updateNorthStarPresentation(layout, state, combatPresentation);
    syncOverlayFocus(decisionOpen);
    sound.setDanger(
      portraitPaused || document.hidden ? 0 : calculateDanger(state),
    );
    if (!document.hidden) {
      sound.update();
    }
    renderer.update(
      state,
      events,
      now,
      portraitPaused || document.hidden ? 0 : delta,
      combatPresentation,
    );

    sampledFrames += 1;
    sampledTime += delta;
    if (now - lastStatsAt >= 500) {
      const fps =
        sampledTime > 0 ? Math.round((sampledFrames * 1_000) / sampledTime) : 0;
      const stats = renderer.getStats();
      layout.performance.textContent =
        `${fps} FPS · ${stats.width}×${stats.height} · ${stats.calls} CALL · ${stats.triangles} TRI`;
      sampledFrames = 0;
      sampledTime = 0;
      lastStatsAt = now;
    }

    if (now >= toastUntil) {
      layout.toast.classList.remove("is-visible");
    }
    if (now >= dossierUntil) {
      layout.dossier.setAttribute("aria-hidden", "true");
    }

    capturedFrameCount += 1;
    if (captureState !== null && capturedFrameCount >= 4) {
      document.documentElement.dataset.captureReady = captureState;
      return;
    }

    animationFrame = requestAnimationFrame(renderFrame);
  };

  const application: PrototypeBApplication = {
    destroy(): void {
      if (disposed) {
        return;
      }

      disposed = true;
      cancelAnimationFrame(animationFrame);
      controls.destroy();
      sound.dispose();
      renderer.dispose();
      for (const removeListener of listeners.splice(0)) {
        removeListener();
      }
      activeApplications.delete(root);
    },
    getState(): PrototypeBState {
      return state;
    },
  };

  function createRenderer(
    currentLayout: PrototypeBLayout,
    currentState: PrototypeBState,
  ): PrototypeBRenderer {
    return new PrototypeBRenderer(
      currentLayout.worldMount,
      currentState,
      {
        onContextLost: () => {
          contextLost = true;
          controls.setEnabled(false);
          const now = performance.now();
          showToast(
            currentLayout,
            "描画装置との接続が切れました。復旧を待っています。",
            now,
            20_000,
          );
          announceStatus(
            "WebGL描画コンテキストが失われました。",
            now,
            20_000,
          );
        },
        onContextRestored: () => {
          contextLost = false;
          controls.setEnabled(controlsMayRun());
          const now = performance.now();
          showToast(
            currentLayout,
            "描画装置との接続を復旧しました。",
            now,
          );
          announceStatus(
            "描画装置との接続を復旧しました。",
            now,
          );
          lastFrameAt = now;
          accumulator = 0;
        },
        companionPreview: options.companionPreview,
        cameraCompositionProfile:
          options.experience === "r05" ||
            options.experience === "r06" ||
            options.experience === "r07" ||
            options.experience === "r08"
            ? "r05"
            : options.experience === "r04"
            ? "r04"
            : options.experience === "baseline" ||
                options.experience === undefined
              ? "baseline"
              : "north-star",
        environmentProfile:
          options.experience === "r04" ||
            options.experience === "r05" ||
            options.experience === "r06" ||
            options.experience === "r07" ||
            options.experience === "r08"
            ? "r04-live"
            : options.experience === "beauty-cell"
            ? "beauty-cell"
            : options.experience === "north-star"
              ? "north-star-city"
              : "start-town",
        presentationProfile:
          options.experience === "r08"
            ? "r08-fram"
            : options.experience === "r07"
            ? "r07-fram"
            : options.experience === "r05" || options.experience === "r06"
            ? "r05-fram"
            : options.experience === "r04"
              ? "r04"
              : "default",
        qualityProfile: options.renderQuality,
        sharpPresentation:
          options.experience === "r06" ||
            options.experience === "r07" ||
            options.experience === "r08",
      },
    );
  }

  function showToast(
    currentLayout: PrototypeBLayout,
    message: string,
    now: number,
    duration = 2_800,
  ): void {
    currentLayout.toast.textContent = message;
    currentLayout.toast.classList.add("is-visible");
    toastUntil = now + duration;
  }

  function showDossier(lootId: LootId, now: number): void {
    const dossier = DOSSIERS[lootId];
    layout.dossierTitle.textContent = dossier.title;
    layout.dossierBody.textContent = [
      `効果　${dossier.effect}`,
      `原理　${dossier.principle}`,
      `副作用　${dossier.sideEffect}`,
      `所感　${dossier.note}`,
    ].join("\n");
    layout.dossier.setAttribute("aria-hidden", "false");
    dossierUntil = now + 7_000;
  }

  function syncOverlayFocus(decisionOpen: boolean): void {
    const focusWasInOutcome =
      layout.outcomePanel.contains(document.activeElement);
    layout.outcomePanel.inert = !decisionOpen;

    if (decisionOpen !== previousDecisionOpen) {
      if (decisionOpen && !portraitPaused) {
        getEnabledOutcomeButtons(layout)[0]?.focus({
          preventScroll: true,
        });
      } else if (
        !portraitPaused &&
        focusWasInOutcome
      ) {
        layout.stage.focus({ preventScroll: true });
      }
      previousDecisionOpen = decisionOpen;
    }

    const resultOpen =
      layout.resultPanel.getAttribute("aria-hidden") === "false";
    layout.resultPanel.inert = !resultOpen;

    if (resultOpen !== previousResultOpen) {
      if (resultOpen && !portraitPaused) {
        layout.restartButton.focus({ preventScroll: true });
      }
      previousResultOpen = resultOpen;
    }
  }

  activeApplications.set(root, application);
  if (captureState === "active") {
    begin();
  }
  animationFrame = requestAnimationFrame(renderFrame);
  return application;

  function processEvents(
    currentLayout: PrototypeBLayout,
    currentSound: RelicSoundscape,
    currentState: PrototypeBState,
    events: readonly PrototypeBEvent[],
    now: number,
  ): void {
    for (const event of events) {
      playEventSound(currentSound, event);

      switch (event.type) {
        case "weapon-selected":
          showToast(
            currentLayout,
            event.weaponId === "blade"
              ? "測量刃へ持ち替えた。速く、間合いが長い。"
              : "杭打機へ持ち替えた。遅いが、重く吹き飛ばす。",
            now,
          );
          break;
        case "loot-picked": {
          const loot = LOOT_DEFINITIONS[event.lootId];
          showToast(currentLayout, `${loot.name}を回収。`, now);
          showDossier(event.lootId, now);
          break;
        }
        case "landmark-entered":
          showToast(
            currentLayout,
            event.landmarkId === "fork"
              ? "三叉路を記録。廃区の信号が強くなる。"
              : event.landmarkId === "ruin"
                ? "聴取廃区へ侵入。発信源は近い。"
                : "ダストウェイク観測町へ帰還。",
            now,
          );
          break;
        case "quest-advanced":
          showToast(
            currentLayout,
            objectiveText(currentState),
            now,
            3_300,
          );
          break;
        case "outcome-committed":
          showToast(
            currentLayout,
            event.outcome === "destroy"
              ? "破壊手順を確定。通常攻撃で停止させる。"
              : event.outcome === "calm"
                ? "鎮静手順を確定。近くで斥力環を使う。"
                : "接続手順を確定。近くで調査する。",
            now,
            4_000,
          );
          break;
        case "anomaly-resolved":
          showToast(
            currentLayout,
            `反響体への${OUTCOME_LABELS[event.outcome]}を記録。町へ戻れ。`,
            now,
            4_000,
          );
          break;
        case "enemy-defeated":
          if (event.enemyId !== ANOMALY_ID) {
            showToast(currentLayout, "異形を停止。周囲を調べられる。", now);
          }
          break;
        case "item-used":
          showToast(
            currentLayout,
            `縫合剤を使用。体力を${event.healed}回復。`,
            now,
          );
          break;
        case "command-rejected":
          showToast(
            currentLayout,
            rejectionText(event.reason),
            now,
          );
          break;
        case "player-defeated":
          controls.setEnabled(false);
          currentLayout.resultTitle.textContent = "調査記録、途絶";
          currentLayout.resultBody.textContent =
            "辺境はあなたを待たずに巡り続ける。\n装備と防御の使い方を変え、もう一度この経路を試せる。";
          currentLayout.resultPanel.setAttribute("aria-hidden", "false");
          currentLayout.resultPanel.inert = false;
          announceStatus("調査員は倒れました。", now, 10_000);
          break;
        case "result-reached":
          controls.setEnabled(false);
          announceStatus(
            `依頼完了。${event.result.title}`,
            now,
            10_000,
          );
          break;
        default:
          break;
      }
    }
  }
}

function commandFromInput(
  state: PrototypeBState,
  input: PrototypeBControlFrame,
  decisionOpen: boolean,
): PrototypeBCommand {
  const outcome = outcomeFromChoice(input.outcomeChoice);

  if (decisionOpen) {
    return outcome === undefined ? {} : { chooseOutcome: outcome };
  }

  const movement = screenMovementToWorld(input.moveX, input.moveY);

  return {
    moveX: movement.moveX,
    moveY: movement.moveY,
    attack: input.attack,
    guard: input.guard,
    dodge: input.dodge,
    activateRelic: input.activateRelic,
    useItem: input.useItem,
    interact: input.interact,
    chooseWeapon: input.switchWeapon
      ? alternateWeapon(state.player.weaponId)
      : undefined,
  };
}

function configureExperience(
  root: HTMLElement,
  layout: PrototypeBLayout,
  options: StartPrototypeBOptions,
): void {
  if (
    options.experience !== "north-star" &&
    options.experience !== "beauty-cell" &&
    options.experience !== "r04" &&
    options.experience !== "r05" &&
    options.experience !== "r06" &&
    options.experience !== "r07" &&
    options.experience !== "r08"
  ) {
    return;
  }

  root.classList.add("north-star-shell");
  layout.stage.classList.add("north-star-stage");
  const beautyCell = options.experience === "beauty-cell";
  const r04 = options.experience === "r04";
  const r05 = options.experience === "r05";
  const r06 = options.experience === "r06";
  const r07 = options.experience === "r07";
  const r08 = options.experience === "r08";
  const fram = r05 || r06 || r07 || r08;
  const sharpNavigation = r06 || r07 || r08;
  if (beautyCell || r04 || fram) {
    root.classList.add("beauty-cell-shell");
    layout.stage.classList.add("beauty-cell-stage");
  }
  if (r04 || fram) {
    root.classList.add("r04-shell");
    layout.stage.classList.add("r04-stage");
  }
  if (fram) {
    root.classList.add("r05-shell");
    layout.stage.classList.add("r05-stage");
  }
  if (sharpNavigation) {
    root.classList.add("r06-shell");
    layout.stage.classList.add("r06-stage");
  }
  if (r07) {
    root.classList.add("r07-shell");
    layout.stage.classList.add("r07-stage");
  }
  if (r08) {
    root.classList.add("r07-shell", "r08-shell");
    layout.stage.classList.add("r07-stage", "r08-stage");
  }
  layout.stage.dataset.experience = options.experience;
  layout.stage.dataset.prototypeVersion = r08
    ? "R08"
    : r07
    ? "R07"
    : r06
    ? "R06"
    : r05
      ? "R05"
    : r04
      ? "R04"
    : beautyCell
      ? "R02"
      : "R01";
  layout.stage.dataset.presentationState = "intro";
  const debugEnabled = isNorthStarDebugEnabled(window.location.search);
  layout.stage.classList.toggle("is-north-star-debug", debugEnabled);
  layout.stage.dataset.debug = debugEnabled ? "1" : "0";
  layout.performance.hidden = !debugEnabled;
  layout.stage.setAttribute(
    "aria-label",
    fram
      ? `F.R.A.M. ${r08 ? "R08" : r07 ? "R07" : r06 ? "R06" : "R05"}。WASDまたは画面左で移動。通常攻撃は間合いに入ると自動。Qで大技、Shiftで防御と回避、Eで調査、Rで道具を使います。`
      : r04
      ? "R02系統 R04。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。"
      : beautyCell
      ? "AI-native Beauty Cell。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。"
      : "North Star Scene。方向キーまたは画面左で移動。通常攻撃は間合いに入ると自動。Qキーまたは画面右で大技、防御、道具を操作します。",
  );

  const badge = document.createElement("div");
  badge.className = "north-star-badge";
  badge.hidden = !debugEnabled;
  badge.innerHTML = fram
    ? `<span>FRONTIER RELICS ARCHIVE MODULE</span><strong>${r08 ? "R08 / UNIFIED VOXEL GIRL" : r07 ? "R07 / SEMANTIC VOXEL GIRL" : r06 ? "R06 / SHARP NAVIGATION" : "R05 / WIDE WORLD"} / PC ULTRA</strong>`
    : r04
    ? "<span>CAUSAL BEAUTY CELL</span><strong>R04 / R02 SYSTEMS / PC ULTRA</strong>"
    : beautyCell
      ? "<span>AI-NATIVE BEAUTY CELL</span><strong>R02 / PC ULTRA / LIVE SYSTEMS</strong>"
    : "<span>VISUAL NORTH STAR</span><strong>PC ULTRA / LIVE COMBAT</strong>";
  layout.stage.append(badge);

  const combatReadout = document.createElement("div");
  combatReadout.className = "north-star-combat-readout";
  combatReadout.dataset.phase = "idle";
  combatReadout.setAttribute("aria-hidden", "true");
  combatReadout.innerHTML = `
    <strong data-ui="north-star-combat-phase">LOCK</strong>
    <i><em data-ui="north-star-combat-progress"></em></i>
  `;
  layout.stage.append(combatReadout);

  const kicker = layout.titleOverlay.querySelector<HTMLElement>(
    ".relic-title__copy .relic-kicker",
  );
  const heading = layout.titleOverlay.querySelector<HTMLElement>("h1");
  const description = layout.titleOverlay.querySelector<HTMLElement>("p");
  const startLabel = layout.startButton.querySelector<HTMLElement>("span");
  const startHint = layout.startButton.querySelector<HTMLElement>("small");
  const identity = layout.stage.querySelector<HTMLElement>(
    ".relic-hud__identity strong",
  );
  if (kicker !== null) {
    kicker.textContent = fram
      ? "FRONTIER RELICS ARCHIVE MODULE / F-01"
      : r04
      ? "R02 CAUSAL WORLD / CONCEPT C VISUAL REBUILD"
      : beautyCell
        ? "AI-NATIVE CONCEPT C / REALTIME BEAUTY CELL"
      : "PC ULTRA VISUAL + GAME FEEL BENCHMARK";
  }
  if (heading !== null) {
    heading.innerHTML = fram
      ? "F.R.A.M.<br /><em>辺境遺物記録モジュール</em>"
      : r04
        ? "緑蝕<br /><em>雨庭区</em>"
      : beautyCell
        ? "緑蝕<br /><em>交差区</em>"
      : "緑蝕<br /><em>観測区</em>";
  }
  if (description !== null) {
    description.innerHTML = fram
      ? "あなたは辺境を歩き、遺物を解析し、世界の記憶を編むモジュール。<br />滅びかけの都市は、今も明るく生きている。"
      : r04
      ? "雨上がりの都市は、滅びたあとも鮮やかだ。<br />歩き、拾い、戦い、世界の記憶を自分の経路にする。"
      : beautyCell
        ? "光と水と緑が都市を更新している。<br />調査員は歩き、拾い、間合いを選び、大技だけを自分で撃つ。"
      : "自然に呑まれた現代都市を歩く。<br />間合いで通常攻撃を起こし、大技で戦況を変える。";
  }
  if (startLabel !== null) {
    startLabel.textContent = fram
      ? "F.R.A.M.を起動"
      : r04
      ? "雨庭区へ降りる"
      : beautyCell
        ? "Beauty Cellを歩く"
      : "North Star Sceneを開始";
  }
  if (startHint !== null) {
    startHint.textContent = "MOVE / AUTO BASIC / MANUAL SKILL";
  }
  if ((beautyCell || r04 || fram) && identity !== null) {
    identity.textContent = fram
      ? "F.R.A.M. F-01 / 第07雨庭区"
      : r04
      ? "緑蝕・第07雨庭区"
      : "緑蝕・第04交差区";
  }

  const attackButton = layout.stage.querySelector<HTMLButtonElement>(
    '[data-control="attack"]',
  );
  if (attackButton !== null) {
    attackButton.tabIndex = -1;
    attackButton.setAttribute("aria-hidden", "true");
  }
  const relicButton = layout.stage.querySelector<HTMLButtonElement>(
    '[data-control="relic"]',
  );
  const relicLabel = relicButton?.querySelector<HTMLElement>("span");
  const relicHint = relicButton?.querySelector<HTMLElement>("small");
  if (relicLabel !== null && relicLabel !== undefined) {
    relicLabel.textContent = "大技";
  }
  if (relicHint !== null && relicHint !== undefined) {
    relicHint.textContent = "Q / MANUAL";
  }
}

function updateNorthStarPresentation(
  layout: PrototypeBLayout,
  state: PrototypeBState,
  presentation: CombatPresentationState | undefined,
): void {
  const readout = layout.stage.querySelector<HTMLElement>(
    ".north-star-combat-readout",
  );
  if (readout === null) {
    return;
  }

  const phase = readout.querySelector<HTMLElement>(
    '[data-ui="north-star-combat-phase"]',
  );
  const progress = readout.querySelector<HTMLElement>(
    '[data-ui="north-star-combat-progress"]',
  );
  const phaseName = presentation?.phase ?? "idle";
  const phaseLabels: Record<CombatPresentationState["phase"], string> = {
    idle: "LOCK",
    acquire: "LOCK",
    windup: state.player.weaponId === "blade" ? "WINDUP" : "CHARGE",
    hit: "HIT",
    recover: "RECOVER",
  };
  if (phase !== null) {
    phase.textContent = phaseLabels[phaseName];
  }
  if (progress !== null) {
    progress.style.width = `${Math.round((presentation?.progress ?? 0) * 100)}%`;
  }
  readout.dataset.phase = phaseName;
  layout.stage.dataset.combatPhase = phaseName;
  layout.stage.dataset.combatTarget = presentation?.targetId ?? "";
}

function outcomeFromChoice(
  choice: PrototypeBControlFrame["outcomeChoice"],
): QuestOutcome | undefined {
  switch (choice) {
    case 0:
      return "destroy";
    case 1:
      return "calm";
    case 2:
      return "connect";
    default:
      return undefined;
  }
}

function alternateWeapon(current: WeaponId): WeaponId {
  return current === "blade" ? "impact" : "blade";
}

function updateInterface(
  layout: PrototypeBLayout,
  state: PrototypeBState,
  now: number,
  options: InterfaceOptions = {},
): void {
  const player = state.player;
  const hpRatio = Math.max(0, player.hp / player.maxHp);
  const weapon = WEAPON_DEFINITIONS[player.weaponId];
  const bonus = player.weaponDamageBonuses[player.weaponId];
  const relicSeconds = player.relicCooldownTicks / TICK_RATE;
  const decisionOpen =
    options.decisionOpen ?? isOutcomeDecisionPending(state);

  layout.stage.dataset.questPhase = state.quest.phase;
  layout.stage.dataset.playerX = String(Math.round(player.x));
  layout.stage.dataset.playerY = String(Math.round(player.y));
  layout.stage.dataset.weapon = player.weaponId;
  layout.stage.dataset.status = state.status;
  layout.zoneLabel.textContent =
    layout.stage.dataset.experience === "r04" ||
      layout.stage.dataset.experience === "r05" ||
      layout.stage.dataset.experience === "r06" ||
      layout.stage.dataset.experience === "r07" ||
      layout.stage.dataset.experience === "r08"
      ? "緑蝕・第07雨庭区"
      : layout.stage.dataset.experience === "beauty-cell"
      ? "緑蝕・第04交差区"
      : zoneText(player.x, player.y);
  layout.objectiveText.textContent = objectiveText(state);
  layout.healthFill.style.width = `${Math.round(hpRatio * 100)}%`;
  layout.healthFill.style.background =
    hpRatio <= 0.3
      ? "var(--relic-danger)"
      : "linear-gradient(90deg, var(--relic-amber), var(--relic-signal))";
  layout.healthText.textContent = `${player.hp} / ${player.maxHp}`;
  layout.weaponName.textContent =
    player.weaponId === "blade" ? "測量刃" : "杭打機";
  layout.weaponDetail.textContent =
    `${player.weaponId === "blade" ? "速い・広い" : "遅い・重い"} / 威力 ${weapon.damage + bonus}`;
  layout.relicName.textContent =
    relicSeconds <= 0
      ? `斥力環 R-17 / READY`
      : `斥力環 R-17 / ${relicSeconds.toFixed(1)}s`;
  layout.itemCount.textContent = `× ${player.healingItems}`;
  updateTargetInterface(layout, state, options.combatPresentation);
  updateNavigationInterface(layout, state, now);
  layout.outcomePanel.setAttribute(
    "aria-hidden",
    String(!decisionOpen),
  );

  const calmButton = requireOutcomeButton(layout, "outcome-calm");
  const connectButton = requireOutcomeButton(layout, "outcome-connect");
  setOutcomeAvailability(
    calmButton,
    player.collectedLootIds.includes("quiet-chime"),
    "無音鈴 Q-0 が必要",
  );
  setOutcomeAvailability(
    connectButton,
    player.collectedLootIds.includes("signal-key"),
    "信号鍵 K-99 が必要",
  );

  const prompt = interactionPrompt(state);
  layout.contextPrompt.setAttribute(
    "aria-hidden",
    String(prompt === null || decisionOpen),
  );
  if (prompt !== null) {
    const key = layout.contextPrompt.querySelector<HTMLElement>("span");
    const text = layout.contextPrompt.querySelector<HTMLElement>("strong");
    if (key !== null) {
      key.textContent = prompt.key;
    }
    if (text !== null) {
      text.textContent = prompt.text;
    }
  }

  if (state.status === "result" && state.quest.result !== null) {
    const result = state.quest.result;
    layout.resultTitle.textContent = resultTitle(result.outcome);
    layout.resultBody.textContent = resultBody(result.outcome);
    layout.resultPanel.setAttribute("aria-hidden", "false");
    layout.resultPanel.inert = false;
  }

  if (
    options.announceStatus !== false &&
    now > 0 &&
    state.status === "playing"
  ) {
    const nextStatus =
      `${layout.zoneLabel.textContent}。目的：${layout.objectiveText.textContent}。` +
      `体力${player.hp}。武器${layout.weaponName.textContent}。`;
    if (layout.statusLive.textContent !== nextStatus) {
      layout.statusLive.textContent = nextStatus;
    }
  }
}

function updateTargetInterface(
  layout: PrototypeBLayout,
  state: PrototypeBState,
  combatPresentation: CombatPresentationState | undefined,
): void {
  const lockedTarget = combatPresentation?.targetId === null ||
      combatPresentation?.targetId === undefined
    ? undefined
    : state.enemies.find(
        (enemy) =>
          enemy.id === combatPresentation.targetId &&
          enemy.active &&
          !enemy.defeated &&
          enemy.disposition === "hostile",
      );
  const target = lockedTarget ?? state.enemies
    .filter(
      (enemy) =>
        enemy.active &&
        !enemy.defeated &&
        enemy.disposition === "hostile",
    )
    .map((enemy) => ({
      enemy,
      distance: Math.hypot(
        state.player.x - enemy.x,
        state.player.y - enemy.y,
      ),
    }))
    .filter((entry) => entry.distance <= 440)
    .sort(
      (first, second) =>
        first.distance - second.distance ||
        first.enemy.id.localeCompare(second.enemy.id),
    )[0]?.enemy;

  layout.targetPanel.setAttribute(
    "aria-hidden",
    String(target === undefined),
  );
  if (target === undefined) {
    return;
  }

  layout.targetName.textContent = enemyName(target.kind);
  layout.targetFill.style.width =
    `${Math.round((target.hp / target.maxHp) * 100)}%`;
}

function updateNavigationInterface(
  layout: PrototypeBLayout,
  state: PrototypeBState,
  now: number,
): void {
  const lastPaintAt = Number(layout.minimap.dataset.lastPaintAt ?? "0");
  if (now - lastPaintAt < 100) {
    return;
  }
  layout.minimap.dataset.lastPaintAt = String(now);

  const context = layout.minimap.getContext("2d");
  if (context === null) {
    return;
  }

  const destination = objectiveDestination(state);
  const player = state.player;
  const scaleX = layout.minimap.width / WORLD_WIDTH;
  const scaleY = layout.minimap.height / WORLD_HEIGHT;
  const mapX = (x: number): number => x * scaleX;
  const mapY = (y: number): number => y * scaleY;

  context.clearRect(0, 0, layout.minimap.width, layout.minimap.height);
  const background = context.createLinearGradient(
    0,
    0,
    layout.minimap.width,
    layout.minimap.height,
  );
  background.addColorStop(0, "#102c27");
  background.addColorStop(0.52, "#224d3b");
  background.addColorStop(1, "#162f32");
  context.fillStyle = background;
  context.fillRect(0, 0, layout.minimap.width, layout.minimap.height);

  context.strokeStyle = "rgba(213, 207, 160, 0.34)";
  context.lineWidth = 8;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(mapX(180), mapY(930));
  context.bezierCurveTo(
    mapX(1_060),
    mapY(860),
    mapX(2_180),
    mapY(1_040),
    mapX(3_160),
    mapY(880),
  );
  context.stroke();

  context.strokeStyle = "rgba(117, 207, 212, 0.38)";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(mapX(210), mapY(1_240));
  context.bezierCurveTo(
    mapX(1_120),
    mapY(1_080),
    mapX(2_040),
    mapY(1_340),
    mapX(3_380),
    mapY(1_120),
  );
  context.stroke();

  for (const landmark of Object.values(LANDMARKS)) {
    context.fillStyle = "rgba(241, 225, 175, 0.22)";
    context.fillRect(
      mapX(landmark.bounds.x),
      mapY(landmark.bounds.y),
      Math.max(4, mapX(landmark.bounds.width)),
      Math.max(4, mapY(landmark.bounds.height)),
    );
  }

  for (const enemy of state.enemies) {
    if (!enemy.active || enemy.defeated || enemy.disposition !== "hostile") {
      continue;
    }
    context.fillStyle = "rgba(244, 117, 92, 0.86)";
    context.beginPath();
    context.arc(mapX(enemy.x), mapY(enemy.y), 2.3, 0, Math.PI * 2);
    context.fill();
  }

  context.fillStyle = "#ffd46f";
  context.strokeStyle = "rgba(255, 248, 214, 0.92)";
  context.lineWidth = 2;
  context.beginPath();
  context.arc(
    mapX(destination.x),
    mapY(destination.y),
    6,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.stroke();

  context.fillStyle = "#82f3d2";
  context.strokeStyle = "#062b28";
  context.lineWidth = 2.4;
  context.beginPath();
  context.arc(mapX(player.x), mapY(player.y), 5.2, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  const distance = Math.hypot(
    destination.x - player.x,
    destination.y - player.y,
  );
  const worldDeltaX = destination.x - player.x;
  const worldDeltaY = destination.y - player.y;
  const screenX = (worldDeltaX - worldDeltaY) / Math.SQRT2;
  const screenY = (worldDeltaX + worldDeltaY) / Math.SQRT2;
  const angle = Math.atan2(screenX, -screenY) * (180 / Math.PI);

  layout.waypointName.textContent = destination.name;
  layout.waypointDistance.textContent = `${Math.max(0, Math.round(distance / 10))} m`;
  layout.waypointArrow.style.transform = `rotate(${angle.toFixed(1)}deg)`;
  layout.minimap.setAttribute(
    "aria-label",
    `現在地から${destination.name}まで約${Math.round(distance / 10)}メートル。`,
  );
}

function objectiveDestination(
  state: PrototypeBState,
): { readonly x: number; readonly y: number; readonly name: string } {
  switch (state.quest.phase) {
    case "briefing":
      return { ...LANDMARKS.town.interactionPoint, name: "観測町・依頼板" };
    case "travel-to-fork":
      return { ...LANDMARKS.fork.interactionPoint, name: "三叉路" };
    case "travel-to-ruin":
    case "confrontation":
      return { ...LANDMARKS.ruin.interactionPoint, name: "聴取廃区・発信源" };
    case "return-town":
    case "result":
      return { ...LANDMARKS.town.interactionPoint, name: "観測町・帰還点" };
  }
}

function objectiveText(state: PrototypeBState): string {
  switch (state.quest.phase) {
    case "briefing":
      return "町の依頼板を調べる";
    case "travel-to-fork":
      return "東の三叉路へ向かう";
    case "travel-to-ruin":
      return "聴取廃区の発信源へ向かう";
    case "confrontation":
      if (state.quest.intent === "destroy") {
        return "反響体を攻撃して停止させる";
      }
      if (state.quest.intent === "calm") {
        return "反響体の近くで斥力環を使う";
      }
      if (state.quest.intent === "connect") {
        return "反響体の近くで調査する";
      }
      return "反響体への応答を選ぶ";
    case "return-town":
      return "観測町の依頼板へ帰還する";
    case "result":
      return "依頼記録を閉じる";
  }
}

function zoneText(x: number, y: number): string {
  if (pointInBounds(x, y, LANDMARKS.town.bounds)) {
    return "ダストウェイク観測町";
  }
  if (pointInBounds(x, y, LANDMARKS.ruin.bounds)) {
    return "聴取廃区";
  }
  if (pointInBounds(x, y, LANDMARKS.fork.bounds)) {
    return "三叉路";
  }
  return x < 1_180 ? "赤錆街道・西" : x < 2_450 ? "赤錆街道・東" : "廃区外縁";
}

function enemyName(kind: PrototypeBState["enemies"][number]["kind"]): string {
  switch (kind) {
    case "scrap-hound":
      return "屑鉄猟犬";
    case "relay-shell":
      return "中継殻";
    case "murmur":
      return "囁き";
    case "named-anomaly":
      return "聴取断層《オリソン》";
  }
}

function interactionPrompt(
  state: PrototypeBState,
): { key: string; text: string } | null {
  const player = state.player;
  const nearestLoot = state.world.loot.some(
    (loot) =>
      !loot.picked &&
      Math.hypot(player.x - loot.x, player.y - loot.y) <=
        player.radius + loot.radius + 70,
  );
  if (nearestLoot) {
    return { key: "E", text: "遺物を回収" };
  }

  if (
    state.quest.phase === "briefing" &&
    distanceTo(player, LANDMARKS.town.interactionPoint) <=
      player.radius + 70
  ) {
    return { key: "E", text: "依頼板を調べる" };
  }

  const anomaly = state.enemies.find((enemy) => enemy.id === ANOMALY_ID);
  if (
    anomaly !== undefined &&
    isWithinAnomalyInteractionReach(player, anomaly)
  ) {
    if (
      state.quest.phase === "confrontation" &&
      state.quest.intent === null
    ) {
      return { key: "E", text: "反響体への応答を選ぶ" };
    }
    if (state.quest.intent === "connect") {
      return { key: "E", text: "信号鍵で接続" };
    }
    if (state.quest.intent === "calm") {
      return { key: "Q", text: "斥力環で鎮静" };
    }
    if (state.quest.intent === "destroy") {
      return { key: "AUTO", text: "間合いに入って武器で破壊" };
    }
  }

  if (
    state.quest.phase === "return-town" &&
    distanceTo(player, LANDMARKS.town.interactionPoint) <=
      player.radius + 70
  ) {
    return { key: "E", text: "依頼を報告" };
  }

  return null;
}

function playEventSound(
  sound: RelicSoundscape,
  event: PrototypeBEvent,
): void {
  if (event.type === "player-damaged") {
    sound.play("hurt");
    return;
  }
  if (event.type === "weapon-selected" || event.type === "command-rejected") {
    sound.play("ui");
    return;
  }

  if ("cue" in event) {
    const cue = mapAudioCue(event.cue);
    if (cue !== null) {
      sound.play(cue);
    }
  }
}

function mapAudioCue(cue: AudioCue): RelicSoundCue | null {
  switch (cue) {
    case "blade-swing":
      return "blade";
    case "impact-swing":
      return "impact";
    case "enemy-warning":
      return "warning";
    case "enemy-impact":
      return "enemy-impact";
    case "guard":
      return "guard";
    case "just-guard":
      return "perfect-guard";
    case "dodge":
      return "dodge";
    case "relic":
      return "relic";
    case "heal":
      return "item";
    case "loot":
      return "pickup";
    case "quest":
      return "ui";
    case "outcome-destroy":
    case "outcome-calm":
    case "outcome-connect":
      return cue;
    case "result":
      return "result";
  }
}

function calculateDanger(state: PrototypeBState): number {
  let nearest = Number.POSITIVE_INFINITY;

  for (const enemy of state.enemies) {
    if (
      !enemy.active ||
      enemy.defeated ||
      enemy.disposition !== "hostile"
    ) {
      continue;
    }
    nearest = Math.min(
      nearest,
      Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y),
    );
  }

  if (!Number.isFinite(nearest)) {
    return 0;
  }
  return 1 - Math.min(1, Math.max(0, (nearest - 100) / 500));
}

function rejectionText(reason: CommandRejectionReason): string {
  switch (reason) {
    case "item-full-health":
      return "体力は満タン。縫合剤は温存した。";
    case "item-empty":
      return "縫合剤がない。";
    case "outcome-already-chosen":
      return "応答手順はすでに確定している。";
    case "outcome-not-available":
      return "必要な遺物がない。街道を調べ直せる。";
    case "wrong-quest-phase":
      return "ここではその応答を選べない。";
  }
}

function resultTitle(outcome: QuestOutcome): string {
  switch (outcome) {
    case "destroy":
      return "静かになった断層";
    case "calm":
      return "眠る断層";
    case "connect":
      return "開いたままの回線";
  }
}

function resultBody(outcome: QuestOutcome): string {
  switch (outcome) {
    case "destroy":
      return "町は静寂を歓迎した。しかし中継守たちは、失われた信号を弔い始めた。\n次の旅では、別の返事も選べる。";
    case "calm":
      return "廃区は穏やかになり、旅人は三叉路へ小さな供物を置き始めた。\nあなたの鎮静記録が、この土地の新しい習慣になる。";
    case "connect":
      return "廃区から短い通信が届き始め、誰が返事をしてよいか町で議論になった。\n回線の向こう側は、まだ何者とも確定していない。";
  }
}

function setOutcomeAvailability(
  button: HTMLButtonElement,
  available: boolean,
  unavailableReason: string,
): void {
  button.disabled = !available;
  button.setAttribute(
    "aria-label",
    available
      ? button.textContent?.trim() ?? "選択"
      : `${button.textContent?.trim() ?? "選択"}。${unavailableReason}`,
  );
  button.title = available ? "" : unavailableReason;
}

function requireOutcomeButton(
  layout: PrototypeBLayout,
  control: string,
): HTMLButtonElement {
  const button = layout.outcomePanel.querySelector<HTMLButtonElement>(
    `[data-control="${control}"]`,
  );
  if (button === null) {
    throw new Error(`Outcome button is missing: ${control}`);
  }
  return button;
}

function getEnabledOutcomeButtons(
  layout: PrototypeBLayout,
): HTMLButtonElement[] {
  return Array.from(
    layout.outcomePanel.querySelectorAll<HTMLButtonElement>(
      "button:not(:disabled)",
    ),
  );
}

function isOutcomeDecisionPending(state: PrototypeBState): boolean {
  return (
    state.quest.phase === "confrontation" &&
    state.quest.intent === null
  );
}

function isPlayerWithinAnomalyInteractionReach(
  state: PrototypeBState,
): boolean {
  const anomaly = state.enemies.find((enemy) => enemy.id === ANOMALY_ID);
  return (
    anomaly !== undefined &&
    isWithinAnomalyInteractionReach(state.player, anomaly)
  );
}

function pointInBounds(
  x: number,
  y: number,
  bounds: { x: number; y: number; width: number; height: number },
): boolean {
  return (
    x >= bounds.x &&
    x <= bounds.x + bounds.width &&
    y >= bounds.y &&
    y <= bounds.y + bounds.height
  );
}

function distanceTo(
  source: { x: number; y: number },
  target: { x: number; y: number },
): number {
  return Math.hypot(source.x - target.x, source.y - target.y);
}
