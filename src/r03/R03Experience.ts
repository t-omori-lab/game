import environmentUrl from "./assets/concept-c-environment-v1.png?url";
import heroUpUrl from "./assets/hero/up.png?url";
import heroRightUrl from "./assets/hero/right.png?url";
import heroDownUrl from "./assets/hero/down.png?url";
import heroLeftUrl from "./assets/hero/left.png?url";
import companionUpUrl from "./assets/companion/up.png?url";
import companionRightUrl from "./assets/companion/right.png?url";
import companionDownUrl from "./assets/companion/down.png?url";
import companionLeftUrl from "./assets/companion/left.png?url";
import anomalyUrl from "./assets/anomaly.png?url";
import hudUrl from "./assets/hud-overlay.png?url";
import {
  clampCameraToPlate,
  clampPointToPolygon,
  getFacingDirection,
  getInputVector,
  moveWithinPolygon,
  vectorToward,
  type DirectionalInput,
  type Point,
  type ScreenDirection,
} from "./logic";

const REFERENCE_WIDTH = 1672;
const REFERENCE_HEIGHT = 941;
const HERO_START = Object.freeze({ x: 757, y: 651 });
const WALKABLE_POLYGON: readonly Point[] = Object.freeze([
  { x: 365, y: 565 },
  { x: 570, y: 435 },
  { x: 805, y: 410 },
  { x: 1030, y: 500 },
  { x: 1215, y: 545 },
  { x: 1175, y: 665 },
  { x: 1110, y: 780 },
  { x: 875, y: 825 },
  { x: 620, y: 795 },
  { x: 420, y: 705 },
]);
const HERO_HEIGHT = 184;
const COMPANION_HEIGHT = 116;
const ANOMALY_POSITION = Object.freeze({ x: 1408, y: 164 });

interface LoadedAssets {
  environment: HTMLImageElement;
  hero: Record<ScreenDirection, HTMLImageElement>;
  companion: Record<ScreenDirection, HTMLImageElement>;
  anomaly: HTMLImageElement;
  hud: HTMLImageElement;
}

interface RenderTransform {
  scale: number;
  originX: number;
  originY: number;
}

interface TrailSample extends Point {
  direction: ScreenDirection;
}

export class R03Experience {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly loading: HTMLElement;
  private readonly notice: HTMLElement;
  private readonly status: HTMLElement;
  private readonly skillButton: HTMLButtonElement;
  private readonly keys = new Set<string>();
  private readonly input: DirectionalInput = {
    up: false,
    right: false,
    down: false,
    left: false,
  };
  private readonly trail: TrailSample[] = [];
  private readonly particles = createParticles(34);
  private assets: LoadedAssets | null = null;
  private hero: Point = { ...HERO_START };
  private companion: Point = { x: HERO_START.x - 132, y: HERO_START.y + 34 };
  private facing: ScreenDirection = "down";
  private companionFacing: ScreenDirection = "right";
  private pointerTarget: Point | null = null;
  private camera = { x: 0, y: 0 };
  private renderTransform: RenderTransform = { scale: 1, originX: 0, originY: 0 };
  private previousTime = performance.now();
  private elapsed = 0;
  private skillStartedAt = Number.NEGATIVE_INFINITY;
  private autoShotStartedAt = Number.NEGATIVE_INFINITY;
  private animationFrame = 0;
  private destroyed = false;
  private statusTimer = 0;

  public constructor(private readonly root: HTMLElement) {
    this.root.className = "r03-experience";
    this.root.innerHTML = `
      <canvas class="r03-stage" aria-label="Concept C Beauty Benchmarkのプレイ画面"></canvas>
      <div class="r03-loading" role="status">
        <span>R03 / BEAUTY BENCHMARK</span>
        <strong>世界を再構成中</strong>
      </div>
      <div class="r03-title" aria-hidden="true">
        <span>RELIC FRONTIER / R03</span>
        <strong>雨上がりの第九観測区</strong>
      </div>
      <p class="r03-notice">WASD / 矢印で移動 · クリック／タップで移動 · Spaceで遺物技</p>
      <p class="r03-status" aria-live="polite">接続待機中</p>
      <button class="r03-skill" type="button" aria-label="遺物技を発動">
        <span>RELIC</span><strong>SPACE</strong>
      </button>
      <a class="r03-back" href="../" aria-label="プロトタイプ一覧へ戻る">R03</a>
    `;

    const canvas = this.root.querySelector<HTMLCanvasElement>("canvas");
    const context = canvas?.getContext("2d", { alpha: false });
    const loading = this.root.querySelector<HTMLElement>(".r03-loading");
    const notice = this.root.querySelector<HTMLElement>(".r03-notice");
    const status = this.root.querySelector<HTMLElement>(".r03-status");
    const skillButton = this.root.querySelector<HTMLButtonElement>(".r03-skill");

    if (
      canvas === null ||
      context === null ||
      context === undefined ||
      loading === null ||
      notice === null ||
      status === null ||
      skillButton === null
    ) {
      throw new Error("R03 stage could not be initialized.");
    }

    this.canvas = canvas;
    this.context = context;
    this.loading = loading;
    this.notice = notice;
    this.status = status;
    this.skillButton = skillButton;
  }

  public async start(): Promise<void> {
    this.bindEvents();
    this.resize();

    try {
      this.assets = await loadAssets();
      this.loading.classList.add("is-hidden");
      this.showStatus("MIO-7 · 一時リンク確立");
      this.animationFrame = requestAnimationFrame(this.frame);
      window.setTimeout(() => this.notice.classList.add("is-hidden"), 7200);
    } catch (error) {
      this.loading.innerHTML = `<strong>再構成に失敗しました</strong><span>画面を再読み込みしてください</span>`;
      throw error;
    }
  }

  public destroy(): void {
    this.destroyed = true;
    cancelAnimationFrame(this.animationFrame);
    window.clearTimeout(this.statusTimer);
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  }

  private readonly frame = (time: number): void => {
    if (this.destroyed || this.assets === null) {
      return;
    }

    const delta = Math.min(0.04, Math.max(0, (time - this.previousTime) / 1000));
    this.previousTime = time;
    this.elapsed += delta;
    this.update(delta);
    this.render();
    this.animationFrame = requestAnimationFrame(this.frame);
  };

  private update(delta: number): void {
    this.syncInput();
    let vector = getInputVector(this.input);

    if (vector.x === 0 && vector.y === 0 && this.pointerTarget !== null) {
      vector = vectorToward(this.hero, this.pointerTarget, 7);

      if (vector.x === 0 && vector.y === 0) {
        this.pointerTarget = null;
      }
    } else if (vector.x !== 0 || vector.y !== 0) {
      this.pointerTarget = null;
    }

    const moving = vector.x !== 0 || vector.y !== 0;

    if (moving) {
      this.facing = getFacingDirection(vector, this.facing);
      this.hero = moveWithinPolygon(
        this.hero,
        vector,
        142 * delta,
        WALKABLE_POLYGON,
      );
    }

    this.root.dataset.heroFacing = this.facing;
    this.root.dataset.heroX = this.hero.x.toFixed(2);
    this.root.dataset.heroY = this.hero.y.toFixed(2);

    this.trail.unshift({ ...this.hero, direction: this.facing });

    if (this.trail.length > 64) {
      this.trail.length = 64;
    }

    const follow = this.trail[Math.min(34, this.trail.length - 1)];

    if (follow !== undefined) {
      const before = { ...this.companion };
      this.companion.x += (follow.x - 128 - this.companion.x) * Math.min(1, delta * 4.8);
      this.companion.y += (follow.y + 34 - this.companion.y) * Math.min(1, delta * 4.8);
      this.companionFacing = getFacingDirection(
        { x: this.companion.x - before.x, y: this.companion.y - before.y },
        this.companionFacing,
      );
    }

    const desiredCamera = clampCameraToPlate(
      {
        x: clamp(this.hero.x - HERO_START.x, -82, 108),
        y: clamp(this.hero.y - HERO_START.y, -48, 72),
      },
      {
        ...this.renderTransform,
        viewportWidth: Math.max(1, window.innerWidth),
        viewportHeight: Math.max(1, window.innerHeight),
        referenceWidth: REFERENCE_WIDTH,
        referenceHeight: REFERENCE_HEIGHT,
      },
    );
    this.camera.x +=
      (desiredCamera.x - this.camera.x) * Math.min(1, delta * 3.2);
    this.camera.y +=
      (desiredCamera.y - this.camera.y) * Math.min(1, delta * 3.2);
    this.root.dataset.cameraX = this.camera.x.toFixed(2);
    this.root.dataset.cameraY = this.camera.y.toFixed(2);

    const anomalyDistance = Math.hypot(
      this.hero.x - ANOMALY_POSITION.x,
      this.hero.y - ANOMALY_POSITION.y,
    );

    if (anomalyDistance < 735 && this.elapsed - this.autoShotStartedAt > 2.5) {
      this.autoShotStartedAt = this.elapsed;
      this.showStatus("近接脅威を自動照準 · 手動遺物技はSpace");
    }
  }

  private render(): void {
    const assets = this.assets;

    if (assets === null) {
      return;
    }

    const context = this.context;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
    const width = this.canvas.width / pixelRatio;
    const height = this.canvas.height / pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.clearRect(0, 0, width, height);

    const transform = this.renderTransform;
    const backgroundX = transform.originX - this.camera.x * transform.scale;
    const backgroundY = transform.originY - this.camera.y * transform.scale;
    context.drawImage(
      assets.environment,
      backgroundX,
      backgroundY,
      REFERENCE_WIDTH * transform.scale,
      REFERENCE_HEIGHT * transform.scale,
    );

    this.drawAtmosphere(context, transform);
    this.drawAnomaly(context, assets.anomaly, transform);

    const actors = [
      {
        kind: "companion" as const,
        y: this.companion.y,
      },
      { kind: "hero" as const, y: this.hero.y },
    ].sort((first, second) => first.y - second.y);

    for (const actor of actors) {
      if (actor.kind === "hero") {
        this.drawActor(
          context,
          assets.hero[this.facing],
          this.hero,
          HERO_HEIGHT,
          transform,
          true,
        );
      } else {
        this.drawActor(
          context,
          assets.companion[this.companionFacing],
          this.companion,
          COMPANION_HEIGHT,
          transform,
          false,
        );
      }
    }

    this.drawCombatEffects(context, transform);

    const hudScale = Math.min(width / REFERENCE_WIDTH, height / REFERENCE_HEIGHT);
    const hudOriginX = (width - REFERENCE_WIDTH * hudScale) / 2;
    const hudOriginY = (height - REFERENCE_HEIGHT * hudScale) / 2;
    context.globalAlpha = 0.96;
    context.drawImage(
      assets.hud,
      hudOriginX,
      hudOriginY,
      REFERENCE_WIDTH * hudScale,
      REFERENCE_HEIGHT * hudScale,
    );
    context.globalAlpha = 1;

    const vignette = context.createRadialGradient(
      width * 0.52,
      height * 0.48,
      Math.min(width, height) * 0.22,
      width * 0.52,
      height * 0.5,
      Math.max(width, height) * 0.76,
    );
    vignette.addColorStop(0, "rgb(0 0 0 / 0)");
    vignette.addColorStop(0.72, "rgb(0 8 5 / 0.01)");
    vignette.addColorStop(1, "rgb(0 7 5 / 0.12)");
    context.fillStyle = vignette;
    context.fillRect(0, 0, width, height);
  }

  private drawActor(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    position: Point,
    targetHeight: number,
    transform: RenderTransform,
    isHero: boolean,
  ): void {
    const movement = getInputVector(this.input);
    const isMoving =
      isHero &&
      (movement.x !== 0 || movement.y !== 0 || this.pointerTarget !== null);
    const bob = Math.sin(this.elapsed * (isMoving ? 11.5 : 3.1)) * (isMoving ? 2.4 : 0.8);
    const drawHeight = targetHeight * transform.scale;
    const drawWidth = drawHeight * (image.width / image.height);
    const screen = this.toScreen(position, transform);
    const footY = screen.y + bob * transform.scale;

    context.save();
    context.filter = `blur(${Math.max(3.2, transform.scale * 4.5)}px)`;
    context.fillStyle = isHero ? "rgb(4 12 10 / 0.24)" : "rgb(4 12 10 / 0.2)";
    context.beginPath();
    context.ellipse(
      screen.x - (isHero ? 35 : 28) * transform.scale,
      footY + (isHero ? 16 : 12) * transform.scale,
      (isHero ? 62 : 47) * transform.scale,
      (isHero ? 12 : 9) * transform.scale,
      -0.34,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();

    context.save();
    context.filter = `blur(${Math.max(1.2, transform.scale * 1.4)}px)`;
    context.fillStyle = isHero ? "rgb(4 12 10 / 0.5)" : "rgb(4 12 10 / 0.42)";
    context.beginPath();
    context.ellipse(
      screen.x - 12 * transform.scale,
      footY - 4 * transform.scale,
      (isHero ? 44 : 34) * transform.scale,
      (isHero ? 13 : 10) * transform.scale,
      -0.22,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();

    context.save();
    context.translate(screen.x, footY + 2 * transform.scale);
    context.scale(1, -0.22);
    context.globalAlpha = isHero ? 0.085 : 0.065;
    context.filter = `blur(${Math.max(2.2, transform.scale * 2.8)}px) saturate(0.72)`;
    context.drawImage(
      image,
      -drawWidth / 2,
      -drawHeight,
      drawWidth,
      drawHeight,
    );
    context.restore();

    context.save();
    context.filter = isHero
      ? `brightness(1.12) saturate(1.05) drop-shadow(${-2 * transform.scale}px ${-3 * transform.scale}px ${2.2 * transform.scale}px rgb(255 216 147 / 0.42))`
      : `brightness(1.06) saturate(0.98) drop-shadow(${-2 * transform.scale}px ${-2 * transform.scale}px ${2 * transform.scale}px rgb(255 216 147 / 0.34))`;
    context.shadowColor = isHero ? "rgb(255 190 104 / 0.24)" : "rgb(94 231 255 / 0.22)";
    context.shadowBlur = (isHero ? 6 : 9) * transform.scale;
    context.shadowOffsetX = -2 * transform.scale;
    context.shadowOffsetY = -3 * transform.scale;
    context.drawImage(
      image,
      screen.x - drawWidth / 2,
      footY - drawHeight,
      drawWidth,
      drawHeight,
    );
    context.restore();
  }

  private drawAnomaly(
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    transform: RenderTransform,
  ): void {
    const screen = this.toScreen(ANOMALY_POSITION, transform);
    const pulse = 1 + Math.sin(this.elapsed * 1.65) * 0.025;
    const drawHeight = 185 * transform.scale * pulse;
    const drawWidth = drawHeight * (image.width / image.height) * 1.28;
    const aura = context.createRadialGradient(
      screen.x,
      screen.y - drawHeight * 0.45,
      3 * transform.scale,
      screen.x,
      screen.y - drawHeight * 0.45,
      94 * transform.scale,
    );
    aura.addColorStop(0, "rgb(255 51 143 / 0.22)");
    aura.addColorStop(0.36, "rgb(255 74 151 / 0.08)");
    aura.addColorStop(1, "rgb(255 84 157 / 0)");
    context.save();
    context.globalCompositeOperation = "lighter";
    context.fillStyle = aura;
    context.beginPath();
    context.arc(
      screen.x,
      screen.y - drawHeight * 0.45,
      94 * transform.scale,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();

    const reflection = context.createRadialGradient(
      screen.x + 12 * transform.scale,
      screen.y + 18 * transform.scale,
      2 * transform.scale,
      screen.x + 12 * transform.scale,
      screen.y + 18 * transform.scale,
      88 * transform.scale,
    );
    reflection.addColorStop(0, "rgb(255 62 145 / 0.14)");
    reflection.addColorStop(0.42, "rgb(255 68 148 / 0.05)");
    reflection.addColorStop(1, "rgb(255 74 151 / 0)");
    context.save();
    context.globalCompositeOperation = "lighter";
    context.fillStyle = reflection;
    context.filter = `blur(${Math.max(2, transform.scale * 3)}px)`;
    context.beginPath();
    context.ellipse(
      screen.x + 12 * transform.scale,
      screen.y + 18 * transform.scale,
      88 * transform.scale,
      24 * transform.scale,
      -0.42,
      0,
      Math.PI * 2,
    );
    context.fill();
    context.restore();

    context.save();
    context.globalAlpha = 0.78;
    context.filter = `blur(${Math.max(1.05, transform.scale * 1.35)}px) saturate(0.86) brightness(0.94)`;
    context.shadowColor = "rgb(255 42 137 / 0.85)";
    context.shadowBlur = 26 * transform.scale;
    context.drawImage(
      image,
      screen.x - drawWidth / 2,
      screen.y - drawHeight * 0.78,
      drawWidth,
      drawHeight,
    );
    context.restore();

    context.save();
    context.globalCompositeOperation = "lighter";
    context.filter = `blur(${Math.max(1.2, transform.scale * 1.8)}px)`;
    for (let index = 0; index < 11; index += 1) {
      const angle = index * 2.14 + this.elapsed * (0.18 + (index % 3) * 0.03);
      const radius = (42 + (index % 4) * 17) * transform.scale;
      const x = screen.x + Math.cos(angle) * radius;
      const y = screen.y - drawHeight * 0.46 + Math.sin(angle) * radius * 0.56;
      const alpha = 0.18 + (index % 3) * 0.08;
      context.fillStyle = `rgb(255 73 154 / ${alpha})`;
      context.beginPath();
      context.arc(x, y, (1.2 + (index % 2)) * transform.scale, 0, Math.PI * 2);
      context.fill();
    }
    context.restore();
  }

  private drawAtmosphere(
    context: CanvasRenderingContext2D,
    transform: RenderTransform,
  ): void {
    context.save();

    for (const particle of this.particles) {
      const driftX = Math.sin(this.elapsed * particle.speed + particle.phase) * 8;
      const driftY = ((this.elapsed * particle.speed * 8 + particle.phase * 20) % 48) - 24;
      const screen = this.toScreen(
        { x: particle.x + driftX, y: particle.y - driftY },
        transform,
      );
      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.warm ? "#ffd97f" : "#b5fff0";
      context.beginPath();
      context.arc(screen.x, screen.y, particle.radius * transform.scale, 0, Math.PI * 2);
      context.fill();
    }

    context.restore();
  }

  private drawCombatEffects(
    context: CanvasRenderingContext2D,
    transform: RenderTransform,
  ): void {
    const heroScreen = this.toScreen(this.hero, transform);
    const anomalyScreen = this.toScreen(ANOMALY_POSITION, transform);
    const autoAge = this.elapsed - this.autoShotStartedAt;

    if (autoAge >= 0 && autoAge < 0.34) {
      const progress = autoAge / 0.34;
      context.save();
      context.globalCompositeOperation = "lighter";
      context.strokeStyle = `rgb(116 244 255 / ${Math.sin(progress * Math.PI) * 0.72})`;
      context.lineWidth = 2.2 * transform.scale;
      context.shadowColor = "#61e6ff";
      context.shadowBlur = 13 * transform.scale;
      context.beginPath();
      context.moveTo(heroScreen.x + 13 * transform.scale, heroScreen.y - 70 * transform.scale);
      context.lineTo(anomalyScreen.x, anomalyScreen.y - 58 * transform.scale);
      context.stroke();
      context.restore();
    }

    const skillAge = this.elapsed - this.skillStartedAt;

    if (skillAge >= 0 && skillAge < 1.05) {
      const progress = skillAge / 1.05;
      const radius = (22 + progress * 170) * transform.scale;
      context.save();
      context.globalCompositeOperation = "lighter";
      context.strokeStyle = `rgb(255 187 89 / ${(1 - progress) * 0.85})`;
      context.lineWidth = Math.max(1, (4 - progress * 3) * transform.scale);
      context.shadowColor = "#ffb44f";
      context.shadowBlur = 24 * transform.scale;
      context.beginPath();
      context.ellipse(heroScreen.x, heroScreen.y - 8 * transform.scale, radius, radius * 0.43, -0.1, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
  }

  private toScreen(position: Point, transform: RenderTransform): Point {
    return {
      x: transform.originX + (position.x - this.camera.x) * transform.scale,
      y: transform.originY + (position.y - this.camera.y) * transform.scale,
    };
  }

  private bindEvents(): void {
    window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    this.canvas.addEventListener("pointerdown", this.pointerDown);
    this.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    this.skillButton.addEventListener("click", this.activateSkill);
  }

  private readonly resize = (): void => {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);
    this.canvas.width = Math.round(width * pixelRatio);
    this.canvas.height = Math.round(height * pixelRatio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    const scale = Math.max(width / REFERENCE_WIDTH, height / REFERENCE_HEIGHT);
    this.renderTransform = {
      scale,
      originX: (width - REFERENCE_WIDTH * scale) / 2,
      originY: (height - REFERENCE_HEIGHT * scale) / 2,
    };
    this.camera = clampCameraToPlate(this.camera, {
      ...this.renderTransform,
      viewportWidth: width,
      viewportHeight: height,
      referenceWidth: REFERENCE_WIDTH,
      referenceHeight: REFERENCE_HEIGHT,
    });
  };

  private readonly keyDown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    if (
      ["w", "a", "s", "d", "arrowup", "arrowright", "arrowdown", "arrowleft", " "].includes(key)
    ) {
      event.preventDefault();
    }

    if (key === " " || key === "q") {
      if (!event.repeat) {
        this.activateSkill();
      }
      return;
    }

    this.keys.add(key);
  };

  private readonly keyUp = (event: KeyboardEvent): void => {
    this.keys.delete(event.key.toLowerCase());
  };

  private readonly pointerDown = (event: PointerEvent): void => {
    event.preventDefault();
    const basePoint = this.screenToWorld(event.clientX, event.clientY);

    if (basePoint.x < 270 && basePoint.y > 670) {
      this.activateSkill();
      return;
    }

    this.pointerTarget = clampPointToPolygon(basePoint, WALKABLE_POLYGON);
    this.showStatus("移動地点を設定 · 近接脅威は自動迎撃");
  };

  private readonly activateSkill = (): void => {
    if (this.elapsed - this.skillStartedAt < 1.4) {
      return;
    }

    this.skillStartedAt = this.elapsed;
    this.showStatus("遺物技〈分光衝撃環〉発動");
    this.root.classList.remove("is-skill-active");
    void this.root.offsetWidth;
    this.root.classList.add("is-skill-active");
  };

  private syncInput(): void {
    this.input.up = this.keys.has("w") || this.keys.has("arrowup");
    this.input.right = this.keys.has("d") || this.keys.has("arrowright");
    this.input.down = this.keys.has("s") || this.keys.has("arrowdown");
    this.input.left = this.keys.has("a") || this.keys.has("arrowleft");
  }

  private showStatus(message: string): void {
    window.clearTimeout(this.statusTimer);
    this.status.textContent = message;
    this.status.classList.add("is-visible");
    this.statusTimer = window.setTimeout(
      () => this.status.classList.remove("is-visible"),
      2600,
    );
  }

  private screenToWorld(screenX: number, screenY: number): Point {
    const transform = this.renderTransform;
    return {
      x: (screenX - transform.originX) / transform.scale + this.camera.x,
      y: (screenY - transform.originY) / transform.scale + this.camera.y,
    };
  }
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  phase: number;
  warm: boolean;
}

function createParticles(count: number): readonly Particle[] {
  let seed = 0x803a11;
  const random = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0x1_0000_0000;
  };

  return Array.from({ length: count }, () => ({
    x: 1020 + random() * 520,
    y: 45 + random() * 430,
    radius: 0.7 + random() * 1.7,
    alpha: 0.16 + random() * 0.38,
    speed: 0.18 + random() * 0.52,
    phase: random() * Math.PI * 2,
    warm: random() > 0.42,
  }));
}

async function loadAssets(): Promise<LoadedAssets> {
  const urls = {
    environment: environmentUrl,
    heroUp: heroUpUrl,
    heroRight: heroRightUrl,
    heroDown: heroDownUrl,
    heroLeft: heroLeftUrl,
    companionUp: companionUpUrl,
    companionRight: companionRightUrl,
    companionDown: companionDownUrl,
    companionLeft: companionLeftUrl,
    anomaly: anomalyUrl,
    hud: hudUrl,
  } as const;

  const entries = await Promise.all(
    Object.entries(urls).map(async ([name, url]) => [name, await loadImage(url)] as const),
  );
  const images = Object.fromEntries(entries) as Record<keyof typeof urls, HTMLImageElement>;

  return {
    environment: images.environment,
    hero: {
      up: images.heroUp,
      right: images.heroRight,
      down: images.heroDown,
      left: images.heroLeft,
    },
    companion: {
      up: images.companionUp,
      right: images.companionRight,
      down: images.companionDown,
      left: images.companionLeft,
    },
    anomaly: images.anomaly,
    hud: images.hud,
  };
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.decoding = "async";
  image.src = url;
  await image.decode();
  return image;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}
