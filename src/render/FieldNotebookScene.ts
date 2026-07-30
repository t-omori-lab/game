import Phaser from "phaser";
import {
  createInitialState,
  stepSimulation,
  TICK_RATE,
  type EnemyState,
  type SimulationEvent,
  type SimulationState,
  type UpgradeChoice,
} from "../sim";
import { GameInput, SKILL_BUTTON } from "../input/GameInput";
import {
  SaveRepository,
  createDefaultStorageBackend,
  type StoragePersistence,
} from "../platform";
import {
  WORLD_LEGACY_CONTENT_VERSION,
  createEmptyWorldLegacy,
  recordCompletedRun,
  worldLegacyCodec,
  type WorldLegacy,
} from "../session";
import {
  createVectorAssets,
  enemyTextureFor,
  FIELD_TEXTURE,
  PLAYER_TEXTURE,
} from "./VectorAssets";
import { CSS_PALETTE, PALETTE } from "./palette";

const WIDTH = 960;
const HEIGHT = 540;
const TICK_MS = 1000 / TICK_RATE;
const MAX_STEPS_PER_FRAME = 5;
const DISPLAY_FONT = '"Hiragino Mincho ProN", "Yu Mincho", serif';
const LABEL_FONT =
  '"Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';

type ScenePhase = "title" | "running" | "upgrade" | "won" | "lost";

type EnemyVisual = {
  image: Phaser.GameObjects.Image;
  kind: string;
};

type FieldMark = {
  x: number;
  y: number;
  rotation: number;
  boss: boolean;
  legacy: boolean;
};

type ImpactBurst = {
  x: number;
  y: number;
  age: number;
  duration: number;
  color: number;
};

type TrailPoint = {
  x: number;
  y: number;
  age: number;
};

export class FieldNotebookScene extends Phaser.Scene {
  private simulation: SimulationState | null = null;
  private gameInput!: GameInput;
  private phase: ScenePhase = "title";
  private accumulator = 0;
  private runNumber = 0;
  private pendingUpgrade: number | null = null;
  private lastTrailTick = -1;
  private damageFlash = 0;
  private worldLegacy: WorldLegacy = createEmptyWorldLegacy();
  private legacyRepository: SaveRepository<WorldLegacy> | null = null;
  private legacyReady = false;
  private pendingStart = false;
  private runRecorded = false;
  private storagePersistence: StoragePersistence = "memory";
  private unsubscribePersistence: (() => void) | null = null;
  private disposed = false;

  private worldGraphics!: Phaser.GameObjects.Graphics;
  private entityGraphics!: Phaser.GameObjects.Graphics;
  private effectsGraphics!: Phaser.GameObjects.Graphics;
  private uiGraphics!: Phaser.GameObjects.Graphics;
  private playerImage!: Phaser.GameObjects.Image;
  private readonly enemyVisuals = new Map<string, EnemyVisual>();
  private readonly fieldMarks: FieldMark[] = [];
  private readonly impactBursts: ImpactBurst[] = [];
  private readonly trailPoints: TrailPoint[] = [];

  private titleOverlay: Phaser.GameObjects.Container | null = null;
  private titleLegacyText: Phaser.GameObjects.Text | null = null;
  private upgradeOverlay: Phaser.GameObjects.Container | null = null;
  private endOverlay: Phaser.GameObjects.Container | null = null;

  private hudTag!: Phaser.GameObjects.Text;
  private hudHealth!: Phaser.GameObjects.Text;
  private hudTime!: Phaser.GameObjects.Text;
  private hudLevel!: Phaser.GameObjects.Text;
  private hudKills!: Phaser.GameObjects.Text;
  private hudObjective!: Phaser.GameObjects.Text;
  private moveCaption!: Phaser.GameObjects.Text;
  private skillCaption!: Phaser.GameObjects.Text;

  private startKey!: Phaser.Input.Keyboard.Key;
  private choiceKeys!: Phaser.Input.Keyboard.Key[];

  public constructor() {
    super({ key: "FieldNotebookScene" });
  }

  public create(): void {
    createVectorAssets(this);
    this.add.image(WIDTH / 2, HEIGHT / 2, FIELD_TEXTURE).setDepth(0);

    this.worldGraphics = this.add.graphics().setDepth(2);
    this.entityGraphics = this.add.graphics().setDepth(8);
    this.effectsGraphics = this.add.graphics().setDepth(16);
    this.playerImage = this.add
      .image(WIDTH / 2, HEIGHT / 2, PLAYER_TEXTURE)
      .setDepth(14)
      .setVisible(false);
    this.uiGraphics = this.add.graphics().setDepth(30);

    this.createHudText();
    this.gameInput = new GameInput(this);
    this.gameInput.setEnabled(false);

    const keyboard = this.input.keyboard;
    if (keyboard === null) {
      throw new Error("Keyboard input plugin is unavailable.");
    }
    this.startKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.choiceKeys = [
      keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
      keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
      keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
    ];

    this.titleOverlay = this.createTitleOverlay();
    this.emitStatus("境界調査録。開始待ち。Enterまたは画面中央の開始札で出発します。");
    void this.initializeWorldLegacy();

    this.events.once("shutdown", () => {
      this.disposed = true;
      this.unsubscribePersistence?.();
      this.unsubscribePersistence = null;
      this.gameInput.destroy();
    });
  }

  public update(time: number, delta: number): void {
    if (this.phase === "title") {
      if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
        this.beginRun();
      }
      this.drawIdleField(time);
      return;
    }

    if (this.phase === "upgrade") {
      this.readUpgradeKeys();
      this.applyPendingUpgrade();
    } else if (this.phase === "won" || this.phase === "lost") {
      if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
        this.beginRun();
      }
    } else {
      this.advanceSimulation(delta);
    }

    this.ageEffects(delta);
    this.renderSimulation(time, delta);
  }

  private beginRun(): void {
    if (!this.legacyReady) {
      this.pendingStart = true;
      this.emitStatus("端末の記録帳を確認中。準備でき次第、遠征を始めます。");
      return;
    }

    this.runNumber = Math.max(
      this.runNumber + 1,
      this.worldLegacy.totalRuns + 1,
    );
    this.simulation = createInitialState(`field-note:${this.runNumber}`);
    this.phase = "running";
    this.accumulator = 0;
    this.pendingUpgrade = null;
    this.lastTrailTick = -1;
    this.damageFlash = 0;
    this.runRecorded = false;
    this.fieldMarks.length = 0;
    this.fieldMarks.push(
      ...this.worldLegacy.fieldMarks.map((mark) => ({
        ...mark,
        legacy: true,
      })),
    );
    this.impactBursts.length = 0;
    this.trailPoints.length = 0;

    for (const visual of this.enemyVisuals.values()) {
      visual.image.destroy();
    }
    this.enemyVisuals.clear();

    this.titleOverlay?.destroy(true);
    this.titleOverlay = null;
    this.titleLegacyText = null;
    this.upgradeOverlay?.destroy(true);
    this.upgradeOverlay = null;
    this.endOverlay?.destroy(true);
    this.endOverlay = null;

    this.setHudVisible(true);
    this.playerImage
      .setVisible(true)
      .setPosition(this.simulation.player.x, this.simulation.player.y)
      .setRotation(0);
    this.gameInput.setEnabled(true);
    this.emitStatus(
      "遠征中。左側をドラッグして移動、右側の印またはSpaceで脈動スキル。",
    );
  }

  private advanceSimulation(delta: number): void {
    if (this.simulation === null || this.simulation.status !== "running") {
      return;
    }

    this.accumulator += Math.min(delta, 100);
    let steps = 0;

    while (this.accumulator >= TICK_MS && steps < MAX_STEPS_PER_FRAME) {
      const previous = this.simulation;
      const intent = this.gameInput.consumeIntent();
      const result = stepSimulation(previous, {
        moveX: intent.moveX,
        moveY: intent.moveY,
        activateSkill: intent.activateSkill,
      });
      this.simulation = result.state;
      this.handleSimulationEvents(result.events, previous);
      this.accumulator -= TICK_MS;
      steps += 1;

      if (this.simulation.status !== "running") {
        this.syncPhaseFromSimulation();
        break;
      }
    }

    if (steps === MAX_STEPS_PER_FRAME) {
      this.accumulator = Math.min(this.accumulator, TICK_MS);
    }
  }

  private applyPendingUpgrade(): void {
    if (
      this.pendingUpgrade === null ||
      this.simulation === null ||
      this.simulation.status !== "upgrade"
    ) {
      return;
    }

    const choice = this.pendingUpgrade;
    this.pendingUpgrade = null;
    const previous = this.simulation;
    const result = stepSimulation(previous, { upgradeChoice: choice });
    this.simulation = result.state;
    this.handleSimulationEvents(result.events, previous);
    this.upgradeOverlay?.destroy(true);
    this.upgradeOverlay = null;
    this.phase = "running";
    this.gameInput.setEnabled(true);
    this.emitStatus(
      "強化を記録しました。遠征再開。左ドラッグで移動、右の印で脈動スキル。",
    );
  }

  private syncPhaseFromSimulation(): void {
    if (this.simulation === null) {
      return;
    }

    switch (this.simulation.status) {
      case "upgrade":
        this.phase = "upgrade";
        this.gameInput.setEnabled(false);
        this.upgradeOverlay?.destroy(true);
        this.upgradeOverlay = this.createUpgradeOverlay(
          this.simulation.upgradeChoices ?? [],
        );
        this.emitStatus(
          "強化選択。3枚の記録から1枚を選択。キーボードでは1、2、3。",
        );
        break;
      case "won":
        this.phase = "won";
        this.gameInput.setEnabled(false);
        this.recordWorldLegacy();
        this.endOverlay = this.createEndOverlay(true);
        this.emitStatus(
          `調査完了。討伐${this.simulation.kills}体。世界へ記録中。Enterまたは再調査札で再開。`,
        );
        break;
      case "lost":
        this.phase = "lost";
        this.gameInput.setEnabled(false);
        this.recordWorldLegacy();
        this.endOverlay = this.createEndOverlay(false);
        this.emitStatus(
          `調査中断。討伐${this.simulation.kills}体。痕跡を世界へ記録中。Enterまたは再調査札で再開。`,
        );
        break;
      case "running":
        this.phase = "running";
        break;
    }
  }

  private readUpgradeKeys(): void {
    for (let index = 0; index < this.choiceKeys.length; index += 1) {
      const key = this.choiceKeys[index];
      if (key !== undefined && Phaser.Input.Keyboard.JustDown(key)) {
        this.selectUpgrade(index);
        return;
      }
    }
  }

  private selectUpgrade(index: number): void {
    if (
      this.phase !== "upgrade" ||
      this.simulation?.upgradeChoices?.[index] === undefined
    ) {
      return;
    }
    this.pendingUpgrade = index;
  }

  private handleSimulationEvents(
    events: readonly SimulationEvent[],
    previous: SimulationState,
  ): void {
    for (const event of events) {
      switch (event.type) {
        case "enemy-defeated": {
          const enemy = previous.enemies.find(
            (candidate) => candidate.id === event.enemyId,
          );
          if (enemy !== undefined) {
            this.fieldMarks.push({
              x: enemy.x,
              y: enemy.y,
              rotation: ((previous.tick + enemy.id.length * 17) % 12) * 0.1,
              boss: event.boss,
              legacy: false,
            });
            if (this.fieldMarks.length > 36) {
              this.fieldMarks.shift();
            }
            this.addImpact(enemy.x, enemy.y, PALETTE.vermilion, 360);
          }
          break;
        }
        case "enemy-damaged": {
          const enemy = previous.enemies.find(
            (candidate) => candidate.id === event.enemyId,
          );
          if (enemy !== undefined) {
            this.addImpact(enemy.x, enemy.y, PALETTE.paper, 180);
          }
          break;
        }
        case "player-damaged":
          this.damageFlash = 1;
          this.cameras.main.shake(70, 0.0035);
          this.addImpact(
            previous.player.x,
            previous.player.y,
            PALETTE.vermilion,
            240,
          );
          break;
        case "pulse-activated":
          this.cameras.main.flash(80, 89, 202, 213, false);
          break;
        case "boss-triggered":
          this.emitStatus(
            "大型異形を確認。警戒輪を読み、脈動スキルで間合いを作ってください。",
          );
          break;
        default:
          break;
      }
    }
  }

  private addImpact(
    x: number,
    y: number,
    color: number,
    duration: number,
  ): void {
    this.impactBursts.push({ x, y, age: 0, duration, color });
    if (this.impactBursts.length > 42) {
      this.impactBursts.shift();
    }
  }

  private ageEffects(delta: number): void {
    this.damageFlash = Math.max(0, this.damageFlash - delta / 260);

    for (let index = this.impactBursts.length - 1; index >= 0; index -= 1) {
      const burst = this.impactBursts[index];
      if (burst === undefined) {
        continue;
      }
      burst.age += delta;
      if (burst.age >= burst.duration) {
        this.impactBursts.splice(index, 1);
      }
    }

    for (let index = this.trailPoints.length - 1; index >= 0; index -= 1) {
      const point = this.trailPoints[index];
      if (point === undefined) {
        continue;
      }
      point.age += delta;
      if (point.age >= 1500) {
        this.trailPoints.splice(index, 1);
      }
    }
  }

  private renderSimulation(time: number, delta: number): void {
    const state = this.simulation;
    if (state === null) {
      return;
    }

    if (state.tick !== this.lastTrailTick && state.tick % 2 === 0) {
      this.trailPoints.push({
        x: state.player.x,
        y: state.player.y,
        age: 0,
      });
      if (this.trailPoints.length > 28) {
        this.trailPoints.shift();
      }
      this.lastTrailTick = state.tick;
    }

    this.drawWorldHistory();
    this.syncPlayer(state, delta);
    this.syncEnemies(state, time, delta);
    this.drawEntities(state, time);
    this.drawEffects();
    this.drawHud(state);
  }

  private syncPlayer(state: SimulationState, delta: number): void {
    const blend = Math.min(1, delta * 0.024);
    const previousX = this.playerImage.x;
    const previousY = this.playerImage.y;
    this.playerImage.x = Phaser.Math.Linear(
      this.playerImage.x,
      state.player.x,
      blend,
    );
    this.playerImage.y = Phaser.Math.Linear(
      this.playerImage.y,
      state.player.y,
      blend,
    );
    this.playerImage.setScale((state.player.radius / 12) * 0.74);

    const velocityX = this.playerImage.x - previousX;
    const velocityY = this.playerImage.y - previousY;
    if (Math.hypot(velocityX, velocityY) > 0.1) {
      const targetRotation = Math.atan2(velocityY, velocityX) + Math.PI / 2;
      this.playerImage.rotation = Phaser.Math.Angle.RotateTo(
        this.playerImage.rotation,
        targetRotation,
        0.18,
      );
    }
  }

  private syncEnemies(
    state: SimulationState,
    time: number,
    delta: number,
  ): void {
    const liveIds = new Set<string>();
    const blend = Math.min(1, delta * 0.02);

    for (const enemy of state.enemies) {
      liveIds.add(enemy.id);
      let visual = this.enemyVisuals.get(enemy.id);
      if (visual === undefined) {
        const image = this.add
          .image(
            enemy.x,
            enemy.y,
            enemyTextureFor(enemy.kind, enemy.boss),
          )
          .setDepth(enemy.boss ? 13 : 11);
        visual = { image, kind: enemy.kind };
        this.enemyVisuals.set(enemy.id, visual);
      }

      if (visual.kind !== enemy.kind) {
        visual.kind = enemy.kind;
        visual.image.setTexture(enemyTextureFor(enemy.kind, enemy.boss));
      }

      visual.image.x = Phaser.Math.Linear(visual.image.x, enemy.x, blend);
      visual.image.y = Phaser.Math.Linear(visual.image.y, enemy.y, blend);
      visual.image.setScale((enemy.radius / 28) * (enemy.boss ? 1.04 : 1));
      visual.image.rotation =
        enemy.kind === "wisp"
          ? time * 0.0022
          : Math.sin(time * 0.002 + enemy.id.length) * 0.12;
      visual.image.setAlpha(enemy.hp > 0 ? 1 : 0.3);
    }

    for (const [id, visual] of this.enemyVisuals) {
      if (!liveIds.has(id)) {
        visual.image.destroy();
        this.enemyVisuals.delete(id);
      }
    }
  }

  private drawWorldHistory(): void {
    this.worldGraphics.clear();

    if (this.trailPoints.length > 1) {
      for (let index = 1; index < this.trailPoints.length; index += 1) {
        const previous = this.trailPoints[index - 1];
        const current = this.trailPoints[index];
        if (previous === undefined || current === undefined) {
          continue;
        }
        const alpha = Math.max(0, 1 - current.age / 1500) * 0.24;
        this.worldGraphics.lineStyle(3, PALETTE.paper, alpha);
        this.worldGraphics.lineBetween(
          previous.x,
          previous.y,
          current.x,
          current.y,
        );
      }
    }

    for (const mark of this.fieldMarks) {
      const size = mark.boss ? 20 : 9;
      const color = mark.boss
        ? PALETTE.vermilion
        : mark.legacy
          ? PALETTE.cyan
          : PALETTE.paper;
      const alpha = mark.legacy ? 0.22 : mark.boss ? 0.8 : 0.38;
      const cosine = Math.cos(mark.rotation);
      const sine = Math.sin(mark.rotation);
      const ax = cosine * size;
      const ay = sine * size;
      const bx = -sine * size;
      const by = cosine * size;
      this.worldGraphics.lineStyle(
        mark.boss ? 4 : 2,
        color,
        alpha,
      );
      this.worldGraphics.lineBetween(
        mark.x - ax,
        mark.y - ay,
        mark.x + ax,
        mark.y + ay,
      );
      this.worldGraphics.lineBetween(
        mark.x - bx,
        mark.y - by,
        mark.x + bx,
        mark.y + by,
      );
      this.worldGraphics.strokeCircle(mark.x, mark.y, size * 1.45);
    }
  }

  private drawEntities(state: SimulationState, time: number): void {
    this.entityGraphics.clear();

    for (const projectile of state.projectiles) {
      const trailLength = 16;
      const directionX = Math.cos(projectile.angle);
      const directionY = Math.sin(projectile.angle);
      this.entityGraphics.lineStyle(4, PALETTE.cyan, 0.38);
      this.entityGraphics.lineBetween(
        projectile.x - directionX * trailLength,
        projectile.y - directionY * trailLength,
        projectile.x,
        projectile.y,
      );
      this.entityGraphics.fillStyle(PALETTE.paper, 1);
      this.entityGraphics.fillCircle(
        projectile.x,
        projectile.y,
        Math.max(2, projectile.radius),
      );
    }

    for (const pulse of state.pulses) {
      const progress = 1 - pulse.remainingTicks / Math.max(1, pulse.totalTicks);
      this.entityGraphics.lineStyle(
        7 - progress * 4,
        PALETTE.cyan,
        0.78 - progress * 0.48,
      );
      this.entityGraphics.strokeCircle(pulse.x, pulse.y, pulse.radius);
      this.entityGraphics.lineStyle(2, PALETTE.paper, 0.32);
      this.entityGraphics.strokeCircle(pulse.x, pulse.y, pulse.radius + 8);
    }

    for (const enemy of state.enemies) {
      this.drawEnemyAnnotation(enemy, time);
    }
  }

  private drawEnemyAnnotation(enemy: EnemyState, time: number): void {
    const healthRatio = Phaser.Math.Clamp(enemy.hp / enemy.maxHp, 0, 1);
    if (healthRatio < 1 || enemy.elite || enemy.boss) {
      const width = enemy.boss ? 74 : Math.max(24, enemy.radius * 2.2);
      const y = enemy.y - enemy.radius - 11;
      this.entityGraphics.fillStyle(PALETTE.ink, 0.72);
      this.entityGraphics.fillRect(enemy.x - width / 2, y, width, 4);
      this.entityGraphics.fillStyle(
        enemy.boss ? PALETTE.vermilion : PALETTE.paper,
        0.92,
      );
      this.entityGraphics.fillRect(
        enemy.x - width / 2,
        y,
        width * healthRatio,
        4,
      );
    }

    const warningThreshold = Math.max(8, enemy.attackCooldownMaxTicks * 0.3);
    if (enemy.attackCooldownTicks <= warningThreshold) {
      const warningProgress =
        1 - enemy.attackCooldownTicks / Math.max(1, warningThreshold);
      const ringRadius =
        enemy.radius + 9 + Math.sin(time * 0.015 + enemy.id.length) * 2;
      this.entityGraphics.lineStyle(
        enemy.boss ? 5 : 3,
        PALETTE.vermilion,
        0.18 + warningProgress * 0.55,
      );
      this.entityGraphics.strokeCircle(enemy.x, enemy.y, ringRadius);
    }

    if (enemy.elite || enemy.boss) {
      this.entityGraphics.lineStyle(
        enemy.boss ? 3 : 2,
        PALETTE.cyan,
        enemy.boss ? 0.66 : 0.32,
      );
      this.entityGraphics.strokeCircle(
        enemy.x,
        enemy.y,
        enemy.radius + 17 + Math.sin(time * 0.004) * 3,
      );
    }
  }

  private drawEffects(): void {
    this.effectsGraphics.clear();

    for (const burst of this.impactBursts) {
      const progress = burst.age / burst.duration;
      const radius = 5 + progress * 22;
      this.effectsGraphics.lineStyle(
        3 - progress * 1.5,
        burst.color,
        0.78 * (1 - progress),
      );
      this.effectsGraphics.strokeCircle(burst.x, burst.y, radius);

      const ray = 5 + progress * 10;
      for (let index = 0; index < 4; index += 1) {
        const angle = index * (Math.PI / 2) + progress * 0.3;
        this.effectsGraphics.lineBetween(
          burst.x + Math.cos(angle) * (radius + 2),
          burst.y + Math.sin(angle) * (radius + 2),
          burst.x + Math.cos(angle) * (radius + ray),
          burst.y + Math.sin(angle) * (radius + ray),
        );
      }
    }
  }

  private drawHud(state: SimulationState): void {
    this.uiGraphics.clear();

    this.uiGraphics.fillStyle(PALETTE.ink, 0.82);
    this.uiGraphics.fillRect(20, 20, 920, 64);
    this.uiGraphics.lineStyle(2, PALETTE.paper, 0.28);
    this.uiGraphics.strokeRect(20, 20, 920, 64);
    this.uiGraphics.fillStyle(PALETTE.vermilion, 0.86);
    this.uiGraphics.fillRect(20, 20, 8, 64);

    const healthRatio = Phaser.Math.Clamp(
      state.player.hp / state.player.maxHp,
      0,
      1,
    );
    const xpRatio = Phaser.Math.Clamp(
      state.player.xp / Math.max(1, state.player.xpToNext),
      0,
      1,
    );
    this.uiGraphics.fillStyle(PALETTE.ground, 1);
    this.uiGraphics.fillRect(80, 48, 204, 12);
    this.uiGraphics.fillStyle(
      healthRatio < 0.3 ? PALETTE.vermilion : PALETTE.paper,
      1,
    );
    this.uiGraphics.fillRect(80, 48, 204 * healthRatio, 12);
    this.uiGraphics.fillStyle(PALETTE.ink, 1);
    this.uiGraphics.fillRect(80, 65, 204, 4);
    this.uiGraphics.fillStyle(PALETTE.cyan, 1);
    this.uiGraphics.fillRect(80, 65, 204 * xpRatio, 4);

    this.drawTouchControls(state);

    if (this.damageFlash > 0) {
      this.uiGraphics.lineStyle(
        18 * this.damageFlash,
        PALETTE.vermilion,
        0.38 * this.damageFlash,
      );
      this.uiGraphics.strokeRect(8, 8, 944, 524);
    }

    const seconds = Math.floor(state.elapsedTicks / TICK_RATE);
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    this.hudHealth.setText(
      `${Math.ceil(state.player.hp)} / ${state.player.maxHp}`,
    );
    this.hudTime.setText(
      `${minutes.toString().padStart(2, "0")}:${remainder
        .toString()
        .padStart(2, "0")}`,
    );
    this.hudLevel.setText(`FIELD LV.${state.player.level}`);
    this.hudKills.setText(`討伐印  ${state.kills.toString().padStart(2, "0")}`);
    this.hudObjective.setText(
      state.bossSpawned && !state.bossDefeated
        ? "大型異形 / 接近中"
        : "境界線 / 調査継続",
    );
  }

  private drawTouchControls(state: SimulationState): void {
    const drag = this.gameInput.getDragVisual();
    const controlAlpha = this.phase === "running" ? 1 : 0.35;
    const originX = drag.active ? drag.originX : 116;
    const originY = drag.active ? drag.originY : 442;
    const knobX = drag.active ? drag.knobX : originX;
    const knobY = drag.active ? drag.knobY : originY;

    this.uiGraphics.fillStyle(PALETTE.ink, 0.54 * controlAlpha);
    this.uiGraphics.fillCircle(originX, originY, 56);
    this.uiGraphics.lineStyle(2, PALETTE.paper, 0.28 * controlAlpha);
    this.uiGraphics.strokeCircle(originX, originY, 50);
    this.uiGraphics.lineStyle(1, PALETTE.cyan, 0.36 * controlAlpha);
    this.uiGraphics.strokeCircle(originX, originY, 34);
    this.uiGraphics.lineBetween(originX - 64, originY, originX - 45, originY);
    this.uiGraphics.lineBetween(originX + 45, originY, originX + 64, originY);
    this.uiGraphics.lineBetween(originX, originY - 64, originX, originY - 45);
    this.uiGraphics.lineBetween(originX, originY + 45, originX, originY + 64);
    this.uiGraphics.fillStyle(
      drag.active ? PALETTE.cyan : PALETTE.paper,
      (drag.active ? 0.82 : 0.38) * controlAlpha,
    );
    this.uiGraphics.fillCircle(knobX, knobY, drag.active ? 16 : 10);

    const cooldownRatio = Phaser.Math.Clamp(
      1 -
        state.player.skillCooldownTicks /
          Math.max(1, state.player.skillCooldownMaxTicks),
      0,
      1,
    );
    const ready = state.player.skillCooldownTicks <= 0;
    this.uiGraphics.fillStyle(PALETTE.ink, 0.78 * controlAlpha);
    this.uiGraphics.fillCircle(
      SKILL_BUTTON.x,
      SKILL_BUTTON.y,
      SKILL_BUTTON.radius,
    );
    this.uiGraphics.lineStyle(3, PALETTE.paper, 0.5 * controlAlpha);
    this.uiGraphics.strokeCircle(
      SKILL_BUTTON.x,
      SKILL_BUTTON.y,
      SKILL_BUTTON.radius - 4,
    );
    this.uiGraphics.lineStyle(
      7,
      ready ? PALETTE.vermilion : PALETTE.cyan,
      (ready ? 0.95 : 0.72) * controlAlpha,
    );
    this.uiGraphics.beginPath();
    this.uiGraphics.arc(
      SKILL_BUTTON.x,
      SKILL_BUTTON.y,
      SKILL_BUTTON.radius - 10,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * cooldownRatio,
      false,
    );
    this.uiGraphics.strokePath();
    this.uiGraphics.lineStyle(3, PALETTE.cyan, 0.48 * controlAlpha);
    this.uiGraphics.strokeCircle(SKILL_BUTTON.x, SKILL_BUTTON.y, 22);
    this.uiGraphics.strokeCircle(SKILL_BUTTON.x, SKILL_BUTTON.y, 11);
    if (ready) {
      this.uiGraphics.fillStyle(PALETTE.vermilion, 0.3 * controlAlpha);
      this.uiGraphics.fillCircle(SKILL_BUTTON.x, SKILL_BUTTON.y, 21);
    }
  }

  private createHudText(): void {
    this.hudTag = this.add
      .text(40, 31, "TRAVELER / HP", {
        fontFamily: LABEL_FONT,
        fontSize: "11px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 2,
      })
      .setDepth(32);
    this.hudHealth = this.add
      .text(286, 47, "100 / 100", {
        fontFamily: LABEL_FONT,
        fontSize: "14px",
        color: CSS_PALETTE.paper,
      })
      .setDepth(32);
    this.hudTime = this.add
      .text(480, 38, "00:00", {
        fontFamily: LABEL_FONT,
        fontSize: "27px",
        fontStyle: "bold",
        color: CSS_PALETTE.paper,
      })
      .setOrigin(0.5, 0)
      .setDepth(32);
    this.hudLevel = this.add
      .text(350, 34, "FIELD LV.1", {
        fontFamily: LABEL_FONT,
        fontSize: "12px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 1.5,
      })
      .setDepth(32);
    this.hudKills = this.add
      .text(912, 34, "討伐印  00", {
        fontFamily: LABEL_FONT,
        fontSize: "14px",
        color: CSS_PALETTE.paper,
      })
      .setOrigin(1, 0)
      .setDepth(32);
    this.hudObjective = this.add
      .text(912, 58, "境界線 / 調査継続", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 1.2,
      })
      .setOrigin(1, 0)
      .setDepth(32);
    this.moveCaption = this.add
      .text(116, 505, "DRAG / MOVE", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.paper,
        letterSpacing: 1.6,
      })
      .setOrigin(0.5)
      .setDepth(32);
    this.skillCaption = this.add
      .text(SKILL_BUTTON.x, 508, "SPACE / PULSE", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.paper,
        letterSpacing: 1.4,
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.setHudVisible(false);
  }

  private setHudVisible(visible: boolean): void {
    for (const text of [
      this.hudTag,
      this.hudHealth,
      this.hudTime,
      this.hudLevel,
      this.hudKills,
      this.hudObjective,
      this.moveCaption,
      this.skillCaption,
    ]) {
      text.setVisible(visible);
    }
    this.uiGraphics.setVisible(visible);
  }

  private createTitleOverlay(): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0).setDepth(60);
    const plate = this.add.graphics();
    plate.fillStyle(PALETTE.ink, 0.9);
    plate.fillRect(0, 0, WIDTH, HEIGHT);
    plate.lineStyle(2, PALETTE.paper, 0.22);
    plate.strokeRect(42, 38, 876, 444);
    plate.fillStyle(PALETTE.vermilion, 1);
    plate.fillRect(57, 56, 8, 314);
    plate.fillStyle(PALETTE.cyan, 0.74);
    plate.fillTriangle(57, 382, 65, 382, 61, 403);

    plate.lineStyle(2, PALETTE.cyan, 0.44);
    plate.strokeCircle(704, 214, 96);
    plate.strokeCircle(704, 214, 72);
    plate.strokeCircle(704, 214, 39);
    plate.lineBetween(590, 214, 818, 214);
    plate.lineBetween(704, 100, 704, 328);
    plate.lineStyle(5, PALETTE.vermilion, 0.8);
    plate.beginPath();
    plate.arc(704, 214, 111, -0.35, 1.02, false);
    plate.strokePath();

    const eyebrow = this.add.text(87, 63, "FIELD NOTE  /  NO. 01", {
      fontFamily: LABEL_FONT,
      fontSize: "13px",
      color: CSS_PALETTE.cyan,
      letterSpacing: 3.2,
    });
    const title = this.add.text(82, 93, "境界\n調査録", {
      fontFamily: DISPLAY_FONT,
      fontSize: "76px",
      color: CSS_PALETTE.paper,
      fontStyle: "bold",
      lineSpacing: -7,
    });
    const subtitle = this.add.text(
      90,
      288,
      "移動する地図に、生き延びた線を刻む。",
      {
        fontFamily: DISPLAY_FONT,
        fontSize: "17px",
        color: CSS_PALETTE.paper,
        letterSpacing: 1.2,
      },
    );
    const legacy = this.add.text(90, 335, "継承記録 / 読み込み中", {
      fontFamily: LABEL_FONT,
      fontSize: "11px",
      color: CSS_PALETTE.cyan,
      lineSpacing: 5,
      letterSpacing: 1.3,
    });
    this.titleLegacyText = legacy;
    const note = this.add.text(
      605,
      344,
      "左手 / 移動\n右手 / 脈動印\n攻撃 / 自動",
      {
        fontFamily: LABEL_FONT,
        fontSize: "13px",
        color: CSS_PALETTE.paper,
        lineSpacing: 8,
        letterSpacing: 1.5,
      },
    );
    const coordinate = this.add
      .text(864, 57, "N 35° / E 139°", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.paper,
        letterSpacing: 1.6,
      })
      .setOrigin(1, 0);
    const seal = this.add
      .text(704, 195, "巡", {
        fontFamily: DISPLAY_FONT,
        fontSize: "35px",
        color: CSS_PALETTE.paper,
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const button = this.createPaperButton(
      480,
      414,
      248,
      62,
      "調査を始める",
      "ENTER / START",
      () => this.beginRun(),
    );
    const footer = this.add
      .text(480, 472, "WASD / 矢印キーでも移動できます", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 1.5,
      })
      .setOrigin(0.5);

    container.add([
      plate,
      eyebrow,
      title,
      subtitle,
      legacy,
      note,
      coordinate,
      seal,
      button,
      footer,
    ]);
    return container;
  }

  private async initializeWorldLegacy(): Promise<void> {
    let loadWarning = false;

    try {
      const selection = await createDefaultStorageBackend({
        databaseName: "field-note-world",
      });

      if (this.disposed) {
        return;
      }

      this.storagePersistence = selection.persistence;
      this.unsubscribePersistence = selection.backend.subscribePersistence(
        (persistence) => {
          this.storagePersistence = persistence;
          this.refreshLegacyCaption();
        },
      );

      const repository = new SaveRepository<WorldLegacy>({
        storage: selection.backend,
        codec: worldLegacyCodec,
        namespace: "field-note-world",
      });
      this.legacyRepository = repository;

      const loaded = await repository.loadLatest();
      if (loaded.status === "loaded") {
        this.worldLegacy = loaded.save.payload;
      } else if (loaded.status === "corrupt") {
        loadWarning = true;
      }
    } catch {
      loadWarning = true;
    }

    if (this.disposed) {
      return;
    }

    this.legacyReady = true;
    this.refreshLegacyCaption();

    if (this.pendingStart) {
      this.pendingStart = false;
      this.beginRun();
      return;
    }

    this.emitStatus(
      loadWarning
        ? "境界調査録。保存記録を復旧できませんでした。新しい記録で開始できます。"
        : `境界調査録。開始待ち。継承記録${this.worldLegacy.totalRuns}件。画面中央の開始札で出発します。`,
    );
  }

  private refreshLegacyCaption(): void {
    if (this.titleLegacyText === null) {
      return;
    }

    const storageLabel =
      this.storagePersistence === "indexeddb" ? "端末保存" : "一時記録";

    if (this.worldLegacy.totalRuns === 0) {
      this.titleLegacyText.setText(`継承記録 / まだない\n保存先 / ${storageLabel}`);
      return;
    }

    const outcome =
      this.worldLegacy.lastOutcome === "won" ? "完了" : "中断";
    this.titleLegacyText.setText(
      [
        `継承記録 / ${this.worldLegacy.totalRuns}遠征  最高${this.worldLegacy.bestKills}体`,
        `前回 / ${outcome}  ${this.worldLegacy.lastKills}体  ${storageLabel}`,
      ].join("\n"),
    );
  }

  private recordWorldLegacy(): void {
    const state = this.simulation;
    if (
      this.runRecorded ||
      state === null ||
      (state.status !== "won" && state.status !== "lost")
    ) {
      return;
    }

    const currentMarks = this.fieldMarks
      .filter((mark) => !mark.legacy)
      .map((mark) => ({
        x: mark.x,
        y: mark.y,
        rotation: mark.rotation,
        boss: mark.boss,
      }));

    this.worldLegacy = recordCompletedRun(
      this.worldLegacy,
      state,
      currentMarks,
    );
    this.runRecorded = true;

    const repository = this.legacyRepository;
    const recordedRunCount = this.worldLegacy.totalRuns;

    if (repository === null) {
      return;
    }

    void repository
      .save(this.worldLegacy, {
        contentVersion: WORLD_LEGACY_CONTENT_VERSION,
        seed: state.seed,
      })
      .then(() => {
        if (
          this.disposed ||
          this.worldLegacy.totalRuns !== recordedRunCount ||
          (this.phase !== "won" && this.phase !== "lost")
        ) {
          return;
        }

        const destination =
          this.storagePersistence === "indexeddb"
            ? "端末へ保存済み"
            : "この起動中の一時記録へ保存";
        this.emitStatus(
          `遠征${recordedRunCount}の痕跡を${destination}。Enterまたは再調査札で次の旅人へ。`,
        );
      })
      .catch(() => {
        if (
          !this.disposed &&
          (this.phase === "won" || this.phase === "lost")
        ) {
          this.emitStatus(
            "遠征の痕跡を端末へ保存できませんでした。この画面では次の遠征へ継承します。",
          );
        }
      });
  }

  private createUpgradeOverlay(
    choices: readonly UpgradeChoice[],
  ): Phaser.GameObjects.Container {
    const container = this.add.container(0, 0).setDepth(70);
    const backdrop = this.add.graphics();
    backdrop.fillStyle(PALETTE.ink, 0.9);
    backdrop.fillRect(0, 0, WIDTH, HEIGHT);
    backdrop.fillStyle(PALETTE.paper, 0.06);
    backdrop.fillRect(38, 28, 884, 484);
    backdrop.lineStyle(2, PALETTE.paper, 0.35);
    backdrop.strokeRect(38, 28, 884, 484);
    backdrop.fillStyle(PALETTE.vermilion, 1);
    backdrop.fillRect(38, 28, 112, 7);

    const eyebrow = this.add
      .text(480, 52, "FIELD ANNOTATION / LEVEL UP", {
        fontFamily: LABEL_FONT,
        fontSize: "11px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 3,
      })
      .setOrigin(0.5, 0);
    const heading = this.add
      .text(480, 77, "余白に、次の生き方を記す", {
        fontFamily: DISPLAY_FONT,
        fontSize: "27px",
        color: CSS_PALETTE.paper,
        fontStyle: "bold",
        letterSpacing: 1.6,
      })
      .setOrigin(0.5, 0);

    container.add([backdrop, eyebrow, heading]);

    const cardCenters = [244, 480, 716];
    choices.slice(0, 3).forEach((choice, index) => {
      const centerX = cardCenters[index] ?? 480;
      container.add(this.createUpgradeCard(centerX, 282, choice, index));
    });

    const footer = this.add
      .text(480, 485, "1 / 2 / 3 キーでも選択", {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 1.8,
      })
      .setOrigin(0.5);
    container.add(footer);
    return container;
  }

  private createUpgradeCard(
    centerX: number,
    centerY: number,
    choice: UpgradeChoice,
    index: number,
  ): Phaser.GameObjects.Container {
    const card = this.add.container(centerX, centerY);
    const paper = this.add.graphics();
    paper.fillStyle(PALETTE.paper, 1);
    paper.fillPoints(
      [
        new Phaser.Math.Vector2(-100, -139),
        new Phaser.Math.Vector2(96, -134),
        new Phaser.Math.Vector2(102, 132),
        new Phaser.Math.Vector2(-94, 139),
      ],
      true,
    );
    paper.lineStyle(4, index === 1 ? PALETTE.cyan : PALETTE.ink, 1);
    paper.strokePoints(
      [
        new Phaser.Math.Vector2(-100, -139),
        new Phaser.Math.Vector2(96, -134),
        new Phaser.Math.Vector2(102, 132),
        new Phaser.Math.Vector2(-94, 139),
      ],
      true,
      true,
    );
    paper.fillStyle(PALETTE.vermilion, 1);
    paper.fillCircle(-74, -105, 21);
    paper.lineStyle(2, PALETTE.ink, 0.38);
    paper.lineBetween(-76, 90, 76, 90);

    const number = this.add
      .text(-74, -106, String(index + 1), {
        fontFamily: LABEL_FONT,
        fontSize: "21px",
        color: CSS_PALETTE.paper,
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    const rank = this.add
      .text(76, -113, `RANK ${choice.nextRank}`, {
        fontFamily: LABEL_FONT,
        fontSize: "10px",
        color: CSS_PALETTE.vermilion,
        letterSpacing: 1.5,
      })
      .setOrigin(1, 0);
    const title = this.add.text(-76, -67, choice.title, {
      fontFamily: DISPLAY_FONT,
      fontSize: "21px",
      color: CSS_PALETTE.ink,
      fontStyle: "bold",
      wordWrap: { width: 152 },
    });
    const description = this.add.text(-76, -7, choice.description, {
      fontFamily: LABEL_FONT,
      fontSize: "13px",
      color: CSS_PALETTE.ink,
      lineSpacing: 5,
      wordWrap: { width: 152 },
    });
    const action = this.add
      .text(0, 105, "この記録を選ぶ", {
        fontFamily: LABEL_FONT,
        fontSize: "11px",
        color: CSS_PALETTE.ink,
        fontStyle: "bold",
        letterSpacing: 1.2,
      })
      .setOrigin(0.5);
    const zone = this.add
      .zone(0, 0, 204, 278)
      .setInteractive({ useHandCursor: true });
    zone.on("pointerover", () => {
      card.setScale(1.025);
      card.setRotation(index === 1 ? 0 : index === 0 ? -0.01 : 0.01);
    });
    zone.on("pointerout", () => {
      card.setScale(1);
      card.setRotation(0);
    });
    zone.on("pointerdown", () => this.selectUpgrade(index));

    card.add([paper, number, rank, title, description, action, zone]);
    return card;
  }

  private createEndOverlay(won: boolean): Phaser.GameObjects.Container {
    const state = this.simulation;
    if (state === null) {
      throw new Error("Cannot create an end overlay without a simulation.");
    }

    const container = this.add.container(0, 0).setDepth(75);
    const backdrop = this.add.graphics();
    backdrop.fillStyle(PALETTE.ink, 0.9);
    backdrop.fillRect(0, 0, WIDTH, HEIGHT);
    backdrop.lineStyle(2, PALETTE.paper, 0.3);
    backdrop.strokeRect(48, 42, 864, 448);

    for (let index = 0; index < 7; index += 1) {
      const x = 580 + index * 43;
      const y = 120 + (index % 3) * 56;
      backdrop.lineStyle(3, won ? PALETTE.cyan : PALETTE.vermilion, 0.28);
      backdrop.lineBetween(x - 10, y - 10, x + 10, y + 10);
      backdrop.lineBetween(x + 10, y - 10, x - 10, y + 10);
      backdrop.strokeCircle(x, y, 18);
    }

    backdrop.fillStyle(won ? PALETTE.cyan : PALETTE.vermilion, 1);
    backdrop.fillRect(64, 66, 8, 266);

    const eyebrow = this.add.text(
      91,
      72,
      won ? "SURVEY COMPLETE / FILED" : "SURVEY INTERRUPTED / RECOVERABLE",
      {
        fontFamily: LABEL_FONT,
        fontSize: "11px",
        color: CSS_PALETTE.cyan,
        letterSpacing: 2.4,
      },
    );
    const heading = this.add.text(
      88,
      105,
      won ? "境界記録\n完了" : "調査記録\n中断",
      {
        fontFamily: DISPLAY_FONT,
        fontSize: "58px",
        color: CSS_PALETTE.paper,
        fontStyle: "bold",
        lineSpacing: -4,
      },
    );

    const seconds = Math.floor(state.elapsedTicks / TICK_RATE);
    const stats = this.add.text(
      93,
      255,
      [
        `討伐印      ${state.kills.toString().padStart(2, "0")}`,
        `到達段階    FIELD LV.${state.player.level}`,
        `記録時間    ${Math.floor(seconds / 60)
          .toString()
          .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`,
        `累計遠征    ${this.worldLegacy.totalRuns
          .toString()
          .padStart(2, "0")}`,
        `最高討伐    ${this.worldLegacy.bestKills
          .toString()
          .padStart(2, "0")}`,
      ].join("\n"),
      {
        fontFamily: LABEL_FONT,
        fontSize: "13px",
        color: CSS_PALETTE.paper,
        lineSpacing: 7,
        letterSpacing: 1.2,
      },
    );

    const button = this.createPaperButton(
      480,
      426,
      248,
      62,
      "もう一度、調べる",
      "ENTER / RESTART",
      () => this.beginRun(),
    );

    container.add([backdrop, eyebrow, heading, stats, button]);
    return container;
  }

  private createPaperButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    microLabel: string,
    action: () => void,
  ): Phaser.GameObjects.Container {
    const button = this.add.container(x, y);
    const plate = this.add.graphics();
    plate.fillStyle(PALETTE.paper, 1);
    plate.fillPoints(
      [
        new Phaser.Math.Vector2(-width / 2, -height / 2 + 3),
        new Phaser.Math.Vector2(width / 2 - 5, -height / 2),
        new Phaser.Math.Vector2(width / 2, height / 2 - 4),
        new Phaser.Math.Vector2(-width / 2 + 4, height / 2),
      ],
      true,
    );
    plate.lineStyle(3, PALETTE.vermilion, 1);
    plate.strokePoints(
      [
        new Phaser.Math.Vector2(-width / 2, -height / 2 + 3),
        new Phaser.Math.Vector2(width / 2 - 5, -height / 2),
        new Phaser.Math.Vector2(width / 2, height / 2 - 4),
        new Phaser.Math.Vector2(-width / 2 + 4, height / 2),
      ],
      true,
      true,
    );
    plate.fillStyle(PALETTE.vermilion, 1);
    plate.fillTriangle(
      -width / 2 + 15,
      -height / 2 + 11,
      -width / 2 + 25,
      -height / 2 + 11,
      -width / 2 + 20,
      -height / 2 + 21,
    );

    const mainText = this.add
      .text(0, -8, label, {
        fontFamily: DISPLAY_FONT,
        fontSize: "19px",
        color: CSS_PALETTE.ink,
        fontStyle: "bold",
        letterSpacing: 1.4,
      })
      .setOrigin(0.5);
    const microText = this.add
      .text(0, 16, microLabel, {
        fontFamily: LABEL_FONT,
        fontSize: "8px",
        color: CSS_PALETTE.vermilion,
        letterSpacing: 2,
      })
      .setOrigin(0.5);
    const zone = this.add
      .zone(0, 0, width, height)
      .setInteractive({ useHandCursor: true });
    zone.on("pointerover", () => button.setScale(1.025));
    zone.on("pointerout", () => button.setScale(1));
    zone.on("pointerdown", action);
    button.add([plate, mainText, microText, zone]);
    return button;
  }

  private drawIdleField(time: number): void {
    this.effectsGraphics.clear();
    const radius = 44 + Math.sin(time * 0.002) * 5;
    this.effectsGraphics.lineStyle(2, PALETTE.cyan, 0.12);
    this.effectsGraphics.strokeCircle(WIDTH / 2, HEIGHT / 2, radius);
  }

  private emitStatus(message: string): void {
    this.game.events.emit("fieldnote:status", message);
  }
}
