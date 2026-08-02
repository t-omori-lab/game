import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  ENEMY_DEFINITIONS,
  type EnemyKind,
  type EnemyState,
  type PrototypeBEvent,
  type PrototypeBState,
  type TerrainKind,
  type WeaponId,
} from "../sim";
import {
  BLADE_WEAPON_RECIPE,
  CHEST_RECIPE,
  COMPANION_RECIPE,
  COMPANION_VOXEL_SIZE,
  IMPACT_WEAPON_RECIPE,
  MURMUR_ENEMY_RECIPE,
  NAMED_ANOMALY_RECIPE,
  PLAYER_RECIPE,
  PLAYER_VOXEL_SIZE,
  RELAY_SHELL_ENEMY_RECIPE,
  RELIC_RECIPE,
  ROCK_RECIPE,
  SCRAP_HOUND_ENEMY_RECIPE,
  TREE_RECIPE,
  meshVoxelRecipe,
  type VoxelMaterialRole,
  type VoxelRecipe,
  voxelAnchorPosition,
} from "../voxel";
import {
  createStartTownArtSlice,
  type StartTownArtSlice,
} from "./startTownArt";
import { createNorthStarCityArtSlice } from "./northStarCityArt";
import { createBeautyCellArtSlice } from "./beautyCell";
import { createR04ArtSlice } from "./r04/R04Art";
import { R04_LIVE_PROFILE } from "./r04/R04LiveProfile";
import { R05_FRAM_PROFILE } from "./r05/R05FramProfile";
import { configureDisplayColor } from "./displayColor";
import {
  FIXED_CAMERA_OFFSET,
  composeActorFacingRotation,
  composeCameraTarget,
  type CameraCompositionProfile,
} from "./CameraComposition";
import {
  alignObjectGripToSocket,
  createHeroVisual,
  type HeroMotion,
  type HeroVisual,
} from "./hero";
import {
  createBeautyCompanionVisual,
  createBeautyHeroVisual,
  createBeautyWeaponVisual,
  type BeautyCompanionVisual,
} from "./hero/BeautyHeroVisual";
import { createR04HeroVisual } from "./hero/R04HeroVisual";
import { createR05FramHeroVisual } from "./hero/R05FramHeroVisual";
import { createR05ConceptCArtSlice } from "./r05/R05ConceptCArt";
import { UltraRenderPipeline } from "./UltraRenderPipeline";
import reclaimedMeadowTextureUrl from "./assets/reclaimed-meadow-v1.webp";

const INTERNAL_WIDTH = 854;
const INTERNAL_HEIGHT = 480;
const CAMERA_VIEW_HEIGHT = 600;
const PC_ULTRA_CAMERA_VIEW_HEIGHT = 360;
const BEAUTY_CELL_CAMERA_VIEW_HEIGHT = 390;
const PC_ULTRA_EXPOSURE = 0.98;
const BEAUTY_CELL_EXPOSURE = 0.92;
const MAX_INTERNAL_WIDTH = 1_075;
const BASE_CAMERA_OFFSET = new THREE.Vector3(
  FIXED_CAMERA_OFFSET.x,
  FIXED_CAMERA_OFFSET.y,
  FIXED_CAMERA_OFFSET.z,
);
const R05_CAMERA_OFFSET = new THREE.Vector3(
  FIXED_CAMERA_OFFSET.x,
  R05_FRAM_PROFILE.camera.offsetY,
  FIXED_CAMERA_OFFSET.z,
);
const BLADE_VOXEL_SIZE = 2.1;
const IMPACT_VOXEL_SIZE = 2;
const ENEMY_VOXEL_SIZE = 4;
const PROP_VOXEL_SIZE = 3.4;
const GROUND_PATCH_SIZE = 64;
const DAYLIGHT_FOG_COLOR = 0xd7e1d3;
const PLAYER_WEAPON_ANCHOR = voxelAnchorPosition(
  PLAYER_RECIPE,
  "weapon",
  PLAYER_VOXEL_SIZE,
);
const BLADE_GRIP_ANCHOR = voxelAnchorPosition(
  BLADE_WEAPON_RECIPE,
  "grip",
  BLADE_VOXEL_SIZE,
);
const IMPACT_GRIP_ANCHOR = voxelAnchorPosition(
  IMPACT_WEAPON_RECIPE,
  "grip",
  IMPACT_VOXEL_SIZE,
);
const heldWeaponGripOffset = new THREE.Vector3();

type HeroVoxelMesh = THREE.Mesh<
  THREE.BufferGeometry,
  THREE.Material[]
>;

type EntityVisual = {
  readonly group: THREE.Group;
  readonly body: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshStandardMaterial
  >;
  readonly telegraph: THREE.Mesh<
    THREE.RingGeometry,
    THREE.MeshBasicMaterial
  >;
  baseY: number;
};

type RingEffect = {
  readonly mesh: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  age: number;
  readonly duration: number;
  readonly grow: number;
};

type BurstEffect = {
  readonly mesh: THREE.InstancedMesh;
  readonly positions: THREE.Vector3[];
  readonly velocities: THREE.Vector3[];
  age: number;
  readonly duration: number;
};

type GrowthPlacement = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly rotation: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly scaleZ: number;
};

export type PrototypeBRenderStats = {
  readonly calls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly textures: number;
  readonly width: number;
  readonly height: number;
};

export type PrototypeBRenderQuality = "baseline" | "pc-ultra";
export type PrototypeBEnvironmentProfile =
  | "start-town"
  | "north-star-city"
  | "beauty-cell"
  | "r04-live";
export type PrototypeBPresentationProfile =
  | "default"
  | "r04"
  | "r05-fram";

export type CombatPresentationState = {
  readonly targetId: string | null;
  readonly phase: "idle" | "acquire" | "windup" | "hit" | "recover";
  readonly progress: number;
};

export interface PrototypeBRendererOptions {
  readonly onContextLost?: () => void;
  readonly onContextRestored?: () => void;
  /**
   * Art-review only. Gameplay starts without a companion until a future
   * discovery/roster state explicitly selects one.
   */
  readonly companionPreview?: boolean;
  readonly cameraCompositionProfile?: CameraCompositionProfile;
  readonly environmentProfile?: PrototypeBEnvironmentProfile;
  readonly presentationProfile?: PrototypeBPresentationProfile;
  readonly qualityProfile?: PrototypeBRenderQuality;
  readonly sharpPresentation?: boolean;
}

export class PrototypeBRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly qualityProfile: PrototypeBRenderQuality;
  private readonly environmentProfile: PrototypeBEnvironmentProfile;
  private readonly presentationProfile: PrototypeBPresentationProfile;
  private readonly sharpPresentation: boolean;
  private readonly cameraCompositionProfile: CameraCompositionProfile;
  private readonly cameraViewHeight: number;
  private ultraPipeline: UltraRenderPipeline | null = null;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.OrthographicCamera;
  private readonly environmentArt: StartTownArtSlice;
  private readonly cameraTarget = new THREE.Vector3();
  private readonly playerGroup = new THREE.Group();
  private readonly playerBody: HeroVoxelMesh;
  private readonly playerHeroVisual: HeroVisual | null;
  private readonly bladeMesh: THREE.Object3D;
  private readonly impactMesh: THREE.Object3D;
  private readonly playerShadow: THREE.Mesh<
    THREE.CircleGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly companionGroup = new THREE.Group();
  private readonly companionBody: HeroVoxelMesh;
  private readonly companionBeautyVisual: BeautyCompanionVisual | null;
  private readonly companionShadow: THREE.Mesh<
    THREE.CircleGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly enemyVisuals = new Map<string, EntityVisual>();
  private readonly lootVisuals = new Map<string, THREE.Group>();
  private readonly ringEffects: RingEffect[] = [];
  private readonly burstEffects: BurstEffect[] = [];
  private readonly targetRing: THREE.Mesh<
    THREE.RingGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly windupRing: THREE.Mesh<
    THREE.RingGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly reusableMatrix = new THREE.Matrix4();
  private readonly reusablePosition = new THREE.Vector3();
  private readonly reusableQuaternion = new THREE.Quaternion();
  private readonly reusableScale = new THREE.Vector3(1, 1, 1);
  private readonly keyLight = new THREE.DirectionalLight(0xffe8bd, 2.45);
  private readonly keyLightTarget = new THREE.Object3D();
  private readonly effectLight = new THREE.PointLight(
    0x61e5d1,
    0,
    390,
    2,
  );
  private readonly contextLostHandler: (event: Event) => void;
  private readonly contextRestoredHandler: () => void;
  private environmentTarget: THREE.WebGLRenderTarget | null = null;
  private groundTexture: THREE.Texture | null = null;
  private attackAnimation = 0;
  private attackWeapon: WeaponId = "blade";
  private effectLightEnergy = 0;
  private internalRenderWidth = INTERNAL_WIDTH;
  private internalRenderHeight = INTERNAL_HEIGHT;
  private viewportCssWidth = 0;
  private viewportCssHeight = 0;
  private resizeObserver: ResizeObserver | null = null;
  private windowResizeHandler: (() => void) | null = null;
  private companionInitialized = false;
  private companionReaction = 0;
  private cameraTrauma = 0;
  private heroHurtAnimation = 0;
  private heroSkillAnimation = 0;
  private lastPlayerX: number | null = null;
  private lastPlayerY: number | null = null;
  private elapsed = 0;
  private disposed = false;

  private cameraOffset(): THREE.Vector3 {
    return this.presentationProfile === "r05-fram"
      ? R05_CAMERA_OFFSET
      : BASE_CAMERA_OFFSET;
  }

  public constructor(
    mount: HTMLElement,
    initialState: PrototypeBState,
    options: PrototypeBRendererOptions = {},
  ) {
    this.qualityProfile = options.qualityProfile ?? "baseline";
    this.environmentProfile =
      options.environmentProfile ?? "start-town";
    this.presentationProfile = options.presentationProfile ??
      (this.environmentProfile === "r04-live" ? "r04" : "default");
    this.sharpPresentation = options.sharpPresentation ?? false;
    this.cameraCompositionProfile =
      options.cameraCompositionProfile ??
      (this.environmentProfile === "r04-live" ? "r04" : "baseline");
    this.cameraViewHeight =
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.camera.viewHeight
        : this.environmentProfile === "r04-live"
          ? R04_LIVE_PROFILE.camera.viewHeight
        : this.environmentProfile === "beauty-cell"
        ? BEAUTY_CELL_CAMERA_VIEW_HEIGHT
        : this.qualityProfile === "pc-ultra"
          ? PC_ULTRA_CAMERA_VIEW_HEIGHT
          : CAMERA_VIEW_HEIGHT;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      depth: true,
      powerPreference: "high-performance",
      precision: "highp",
      preserveDrawingBuffer: false,
    });
    configureDisplayColor(
      this.renderer,
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.display.exposure
        : this.environmentProfile === "r04-live"
        ? R04_LIVE_PROFILE.display.exposure
        : this.environmentProfile === "beauty-cell"
        ? BEAUTY_CELL_EXPOSURE
        : this.qualityProfile === "pc-ultra"
          ? PC_ULTRA_EXPOSURE
          : undefined,
    );
    this.renderer.shadowMap.enabled = true;
    // Three.js 0.185 maps the deprecated PCFSoftShadowMap to PCFShadowMap.
    // Select the effective mode directly so the North Star route stays free of
    // deprecation noise while preserving the rendered result.
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setPixelRatio(
      this.qualityProfile === "pc-ultra"
        ? Math.min(2, Math.max(1, window.devicePixelRatio || 1))
        : 1,
    );
    this.renderer.setSize(INTERNAL_WIDTH, INTERNAL_HEIGHT, false);
    this.renderer.domElement.dataset.testid = "game-canvas";
    this.renderer.domElement.dataset.antialias =
      this.renderer.getContextAttributes().antialias === true
        ? "msaa"
        : "none";
    this.renderer.domElement.dataset.qualityProfile = this.qualityProfile;
    this.renderer.domElement.dataset.sharpPresentation =
      String(this.sharpPresentation);
    this.renderer.domElement.dataset.cameraCompositionProfile =
      this.cameraCompositionProfile;
    this.renderer.domElement.dataset.environmentProfile =
      this.environmentProfile;
    this.renderer.domElement.dataset.presentationProfile =
      this.presentationProfile;
    this.renderer.domElement.setAttribute(
      "aria-label",
      this.presentationProfile === "r05-fram"
        ? "F.R.A.M. 辺境遺物記録モジュール ゲーム画面"
        : "辺境遺物録 ボクセルゲーム画面",
    );
    mount.append(this.renderer.domElement);

    this.contextLostHandler = (event: Event): void => {
      event.preventDefault();
      options.onContextLost?.();
    };
    this.contextRestoredHandler = (): void => {
      if (this.qualityProfile === "pc-ultra") {
        this.createEnvironmentLighting();
      }
      options.onContextRestored?.();
    };
    this.renderer.domElement.addEventListener(
      "webglcontextlost",
      this.contextLostHandler,
    );
    this.renderer.domElement.addEventListener(
      "webglcontextrestored",
      this.contextRestoredHandler,
    );

    const fogColor =
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.display.fogColor
        : this.environmentProfile === "r04-live"
        ? R04_LIVE_PROFILE.display.fogColor
        : this.environmentProfile === "beauty-cell"
        ? 0xa9c4bd
        : DAYLIGHT_FOG_COLOR;
    this.scene.background = new THREE.Color(fogColor);
    this.scene.fog = new THREE.Fog(
      fogColor,
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.display.fogNear
        : this.environmentProfile === "r04-live"
        ? R04_LIVE_PROFILE.display.fogNear
        : this.environmentProfile === "beauty-cell"
        ? 1_020
        : this.qualityProfile === "pc-ultra"
          ? 1_140
          : 900,
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.display.fogFar
        : this.environmentProfile === "r04-live"
        ? R04_LIVE_PROFILE.display.fogFar
        : this.environmentProfile === "beauty-cell"
        ? 2_340
        : this.qualityProfile === "pc-ultra"
          ? 2_700
          : 2_450,
    );
    this.createLighting();
    if (this.qualityProfile === "pc-ultra") {
      this.createEnvironmentLighting();
    }

    const defaultCameraViewWidth =
      this.cameraViewHeight * (INTERNAL_WIDTH / INTERNAL_HEIGHT);
    this.camera = new THREE.OrthographicCamera(
      -defaultCameraViewWidth / 2,
      defaultCameraViewWidth / 2,
      this.cameraViewHeight / 2,
      -this.cameraViewHeight / 2,
      1,
      3_200,
    );
    this.initializeViewportSync(mount);
    if (this.qualityProfile === "pc-ultra") {
      this.ultraPipeline = new UltraRenderPipeline(
        this.renderer,
        this.scene,
        this.camera,
        {
          maxPixelRatio: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.maxPixelRatio
            : 2,
          samples: 4,
          gtao: true,
          bloom: true,
          smaa: true,
          tiltShift: !this.sharpPresentation &&
            (this.environmentProfile === "beauty-cell" ||
              this.environmentProfile === "r04-live"),
          tiltShiftMode: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.tiltShiftMode
            : "classic",
          tiltShiftFocus: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.tiltShiftFocus
            : this.environmentProfile === "r04-live"
            ? R04_LIVE_PROFILE.post.tiltShiftFocus
            : 0.49,
          tiltShiftStrength: this.environmentProfile === "r04-live"
            ? R04_LIVE_PROFILE.post.tiltShiftStrength
            : 3.7,
          tiltShiftClearBand: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.tiltShiftClearBand
            : undefined,
          tiltShiftFarBlurPixels: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.tiltShiftFarBlurPixels
            : undefined,
          tiltShiftNearBlurPixels: this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.post.tiltShiftNearBlurPixels
            : undefined,
          onFallback: (reason) => {
            this.renderer.domElement.dataset.ultraFallback =
              reason instanceof Error ? reason.message : "post-processing";
          },
        },
      );
      this.ultraPipeline.resize(
        Math.max(1, mount.clientWidth),
        Math.max(1, mount.clientHeight),
      );
      this.syncUltraPipelineDataset();
    }

    this.createGround(initialState);
    this.environmentArt =
      this.presentationProfile === "r05-fram"
        ? createR05ConceptCArtSlice()
      : this.environmentProfile === "r04-live"
        ? createR04ArtSlice()
        : this.environmentProfile === "beauty-cell"
        ? createBeautyCellArtSlice()
        : this.environmentProfile === "north-star-city"
          ? createNorthStarCityArtSlice()
          : createStartTownArtSlice();
    this.scene.add(this.environmentArt.group);
    if (this.environmentProfile === "beauty-cell") {
      this.renderer.domElement.dataset.visualGrammar =
        "concept-c-fixed-diagonal";
      this.renderer.domElement.dataset.generationMode =
        "deterministic-spec-compiler";
      const stableId = this.environmentArt.group.userData.stableId;
      if (typeof stableId === "string") {
        this.renderer.domElement.dataset.beautyCellId = stableId;
      }
    }
    if (this.environmentProfile === "r04-live") {
      this.renderer.domElement.dataset.visualGrammar =
        R04_LIVE_PROFILE.composition.rule;
      this.renderer.domElement.dataset.generationMode =
        R04_LIVE_PROFILE.generation.mode;
      this.renderer.domElement.dataset.r04ArtId =
        typeof this.environmentArt.group.userData.stableId === "string"
          ? this.environmentArt.group.userData.stableId
          : R04_LIVE_PROFILE.stableId;
    }
    if (
      this.environmentProfile !== "beauty-cell" &&
      this.environmentProfile !== "r04-live"
    ) {
      this.createFieldGrowth(
        initialState,
        this.environmentArt.replacedTerrainIds,
      );
    }
    // The Beauty Cell replaces the authored town cell, not the authoritative
    // 3,600-unit simulation. Always render every terrain/prop that its art
    // manifest did not explicitly replace, so collision and the eastern quest
    // route can never continue through invisible legacy geometry.
    this.createTerrain(
      initialState,
      this.environmentArt.replacedTerrainIds,
    );
    this.createProps(
      initialState,
      this.environmentArt.replacedPropIds,
    );
    this.createLandmarkSignals(initialState);

    this.playerBody = createHeroVoxelMesh(
      PLAYER_RECIPE,
      PLAYER_VOXEL_SIZE,
    );
    this.playerGroup.add(this.playerBody);
    this.playerBody.castShadow = true;
    this.playerBody.receiveShadow = true;
    this.playerHeroVisual =
      this.presentationProfile === "r05-fram"
        ? createR05FramHeroVisual()
        : this.environmentProfile === "r04-live"
        ? createR04HeroVisual()
        : this.environmentProfile === "beauty-cell"
        ? createBeautyHeroVisual()
        : this.qualityProfile === "pc-ultra"
          ? createHeroVisual({ mode: "articulated" })
          : null;
    if (this.playerHeroVisual !== null) {
      this.playerBody.visible = false;
      if (this.environmentProfile === "beauty-cell") {
        this.playerHeroVisual.root.scale.setScalar(1.28);
      } else if (this.presentationProfile === "r05-fram") {
        this.playerHeroVisual.root.scale.setScalar(
          R05_FRAM_PROFILE.actors.heroScale,
        );
      } else if (this.environmentProfile === "r04-live") {
        this.playerHeroVisual.root.scale.setScalar(
          R04_LIVE_PROFILE.actors.heroScale,
        );
      }
      this.playerGroup.add(this.playerHeroVisual.root);
      if (this.presentationProfile === "r05-fram") {
        this.renderer.domElement.dataset.heroRepresentation = String(
          this.playerHeroVisual.root.userData.runtimeRepresentation ?? "unknown",
        );
        this.renderer.domElement.dataset.heroVoxelCells = String(
          this.playerHeroVisual.root.userData.visibleVoxelCells ?? "unknown",
        );
      }
    }
    if (
      this.environmentProfile === "beauty-cell" ||
      this.environmentProfile === "r04-live"
    ) {
      this.bladeMesh = createBeautyWeaponVisual("blade");
      this.impactMesh = createBeautyWeaponVisual("impact");
    } else {
      const bladeMesh = createVoxelMesh(
        BLADE_WEAPON_RECIPE,
        BLADE_VOXEL_SIZE,
        1,
      );
      const impactMesh = createVoxelMesh(
        IMPACT_WEAPON_RECIPE,
        IMPACT_VOXEL_SIZE,
        1,
      );
      configureHeldWeapon(bladeMesh, "blade");
      configureHeldWeapon(impactMesh, "impact");
      this.bladeMesh = bladeMesh;
      this.impactMesh = impactMesh;
    }
    this.bladeMesh.castShadow = true;
    this.impactMesh.castShadow = true;
    if (this.playerHeroVisual !== null) {
      this.playerHeroVisual.attachWeapon(
        this.bladeMesh,
        this.environmentProfile === "beauty-cell" ||
          this.environmentProfile === "r04-live"
          ? { x: 0, y: 0, z: 0 }
          : BLADE_GRIP_ANCHOR,
      );
      this.playerHeroVisual.attachWeapon(
        this.impactMesh,
        this.environmentProfile === "beauty-cell" ||
          this.environmentProfile === "r04-live"
          ? { x: 0, y: 0, z: 0 }
          : IMPACT_GRIP_ANCHOR,
      );
    } else {
      this.playerGroup.add(this.bladeMesh, this.impactMesh);
    }

    this.playerShadow = createBlobShadow(38, 22, 0.32);
    this.playerGroup.add(this.playerShadow);
    this.scene.add(this.playerGroup);

    this.targetRing = createTargetRing(0x61e5d1, 0.76);
    this.windupRing = createTargetRing(0xf4a950, 0.92);
    this.targetRing.visible = false;
    this.windupRing.visible = false;
    this.scene.add(this.targetRing, this.windupRing);

    this.companionBody = createHeroVoxelMesh(
      COMPANION_RECIPE,
      COMPANION_VOXEL_SIZE,
    );
    this.companionBody.castShadow = true;
    this.companionBody.receiveShadow = true;
    this.companionBeautyVisual =
      options.companionPreview === true &&
      (this.environmentProfile === "beauty-cell" ||
        this.environmentProfile === "r04-live")
        ? createBeautyCompanionVisual()
        : null;
    if (this.companionBeautyVisual !== null) {
      this.companionBody.visible = false;
      this.companionGroup.add(this.companionBeautyVisual.root);
    }
    this.companionShadow = createBlobShadow(24, 15, 0.24);
    this.companionGroup.name = "visual-only-companion";
    this.companionGroup.add(this.companionBody, this.companionShadow);
    this.companionGroup.visible = options.companionPreview === true;
    this.scene.add(this.companionGroup);

    this.syncEnemies(initialState);
    this.syncLoot(initialState);
    this.snapCamera(initialState);
    this.update(initialState, [], 0, 0);
  }

  public update(
    state: PrototypeBState,
    events: readonly PrototypeBEvent[],
    timeMs: number,
    deltaMs: number,
    combatPresentation?: CombatPresentationState,
  ): void {
    if (this.disposed) {
      return;
    }

    const deltaSeconds = Math.min(0.05, Math.max(0, deltaMs / 1_000));
    this.elapsed += deltaSeconds;
    this.handleEvents(events);
    this.syncPlayer(state, deltaSeconds, combatPresentation);
    if (this.companionGroup.visible) {
      this.syncCompanion(state, deltaSeconds);
    }
    this.syncEnemies(state);
    this.syncCombatPresentation(state, combatPresentation);
    this.syncLoot(state);
    this.updateEffects(deltaSeconds);
    this.updateCamera(state, deltaSeconds, combatPresentation);
    this.updateAmbientMotion(state, timeMs / 1_000);
    if (this.ultraPipeline !== null) {
      this.ultraPipeline.render(deltaSeconds);
      this.syncUltraPipelineDataset();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private initializeViewportSync(mount: HTMLElement): void {
    this.updateViewportSize(mount.clientWidth, mount.clientHeight);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver((entries) => {
        const entry = entries.find(
          (candidate) => candidate.target === mount,
        );
        if (entry === undefined) {
          return;
        }

        this.updateViewportSize(
          entry.contentRect.width,
          entry.contentRect.height,
        );
      });
      this.resizeObserver.observe(mount);
      return;
    }

    if (typeof window !== "undefined") {
      this.windowResizeHandler = (): void => {
        this.updateViewportSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", this.windowResizeHandler, {
        passive: true,
      });
    }
  }

  private updateViewportSize(cssWidth: number, cssHeight: number): void {
    if (this.disposed) {
      return;
    }

    if (cssWidth <= 0 || cssHeight <= 0) {
      return;
    }

    if (
      Math.abs(cssWidth - this.viewportCssWidth) < 0.5 &&
      Math.abs(cssHeight - this.viewportCssHeight) < 0.5
    ) {
      return;
    }

    this.viewportCssWidth = cssWidth;
    this.viewportCssHeight = cssHeight;
    const aspect = THREE.MathUtils.clamp(
      cssWidth / cssHeight,
      16 / 9,
      2.24,
    );
    if (this.qualityProfile === "pc-ultra") {
      const pixelRatio = Math.min(
        this.presentationProfile === "r05-fram"
          ? R05_FRAM_PROFILE.post.maxPixelRatio
          : 2,
        Math.max(1, window.devicePixelRatio || 1),
      );
      if (this.ultraPipeline !== null) {
        this.ultraPipeline.resize(cssWidth, cssHeight, pixelRatio);
      } else {
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(
          Math.max(1, Math.round(cssWidth)),
          Math.max(1, Math.round(cssHeight)),
          false,
        );
      }
      this.internalRenderWidth = Math.max(
        1,
        Math.round(cssWidth * pixelRatio),
      );
      this.internalRenderHeight = Math.max(
        1,
        Math.round(cssHeight * pixelRatio),
      );
      const cameraWidth = this.cameraViewHeight * aspect;
      this.camera.left = -cameraWidth / 2;
      this.camera.right = cameraWidth / 2;
      this.camera.updateProjectionMatrix();
      this.renderer.domElement.dataset.internalResolution =
        `${this.internalRenderWidth}x${this.internalRenderHeight}`;
      this.syncUltraPipelineDataset();
      return;
    }
    const nextWidth = THREE.MathUtils.clamp(
      Math.round(INTERNAL_HEIGHT * aspect),
      INTERNAL_WIDTH,
      MAX_INTERNAL_WIDTH,
    );
    if (nextWidth === this.internalRenderWidth) {
      return;
    }

    this.internalRenderWidth = nextWidth;
    this.internalRenderHeight = INTERNAL_HEIGHT;
    this.renderer.setSize(nextWidth, INTERNAL_HEIGHT, false);
    this.renderer.domElement.dataset.internalResolution =
      `${nextWidth}x${INTERNAL_HEIGHT}`;
    const cameraWidth =
      this.cameraViewHeight * (nextWidth / INTERNAL_HEIGHT);
    this.camera.left = -cameraWidth / 2;
    this.camera.right = cameraWidth / 2;
    this.camera.updateProjectionMatrix();
  }

  public getStats(): PrototypeBRenderStats {
    return {
      calls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
      width: this.internalRenderWidth,
      height: this.internalRenderHeight,
    };
  }

  public dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.renderer.domElement.removeEventListener(
      "webglcontextlost",
      this.contextLostHandler,
    );
    this.renderer.domElement.removeEventListener(
      "webglcontextrestored",
      this.contextRestoredHandler,
    );
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (
      this.windowResizeHandler !== null &&
      typeof window !== "undefined"
    ) {
      window.removeEventListener("resize", this.windowResizeHandler);
      this.windowResizeHandler = null;
    }
    this.environmentArt.dispose();
    this.ultraPipeline?.dispose();
    this.ultraPipeline = null;
    this.scene.environment = null;
    this.environmentTarget?.dispose();
    this.environmentTarget = null;
    this.groundTexture?.dispose();
    this.groundTexture = null;

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    this.scene.traverse((object) => {
      if (object instanceof THREE.InstancedMesh) {
        object.dispose();
      }

      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.InstancedMesh ||
        object instanceof THREE.LineSegments
      ) {
        geometries.add(object.geometry);
        const material = object.material;

        if (Array.isArray(material)) {
          material.forEach((entry) => materials.add(entry));
        } else {
          materials.add(material);
        }
      }
    });

    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private syncUltraPipelineDataset(): void {
    if (this.ultraPipeline === null) {
      return;
    }

    const status = this.ultraPipeline.getStatus();
    this.renderer.domElement.dataset.ultraPipeline = status.mode;
    this.renderer.domElement.dataset.ultraGtao = String(status.gtao);
    this.renderer.domElement.dataset.ultraBloom = String(status.bloom);
    this.renderer.domElement.dataset.ultraSmaa = String(status.smaa);
    this.renderer.domElement.dataset.ultraTiltShift = String(
      status.tiltShift,
    );
    this.renderer.domElement.dataset.ultraTiltShiftMode =
      status.tiltShiftMode;
    this.renderer.domElement.dataset.ultraTiltShiftFocus =
      String(status.tiltShiftFocus);
    this.renderer.domElement.dataset.ultraTiltShiftBand =
      String(status.tiltShiftClearBand);
    this.renderer.domElement.dataset.ultraTiltShiftFar =
      String(status.tiltShiftFarBlurPixels);
    this.renderer.domElement.dataset.ultraTiltShiftNear =
      String(status.tiltShiftNearBlurPixels);
    this.renderer.domElement.dataset.ultraSamples = String(status.samples);
    if (status.fallbackReason === null) {
      delete this.renderer.domElement.dataset.ultraFallback;
    } else {
      this.renderer.domElement.dataset.ultraFallback =
        status.fallbackReason;
    }
  }

  private createLighting(): void {
    const r04 = this.environmentProfile === "r04-live";
    const r05 = this.presentationProfile === "r05-fram";
    const skyFill = new THREE.HemisphereLight(
      r05
        ? R05_FRAM_PROFILE.lighting.skyColor
        : r04
        ? R04_LIVE_PROFILE.lighting.skyColor
        : this.environmentProfile === "beauty-cell"
          ? 0xfff2ca
          : 0xf6f0d2,
      r05
        ? R05_FRAM_PROFILE.lighting.groundColor
        : r04
        ? R04_LIVE_PROFILE.lighting.groundColor
        : this.environmentProfile === "beauty-cell"
          ? 0x173e34
          : 0x355a43,
      r05
        ? R05_FRAM_PROFILE.lighting.skyIntensity
        : r04
        ? R04_LIVE_PROFILE.lighting.skyIntensity
        : this.environmentProfile === "beauty-cell"
        ? 0.34
        : this.qualityProfile === "pc-ultra"
          ? 0.42
          : 1.55,
    );
    skyFill.name = "daylight-sky-fill";

    this.keyLight.color.setHex(
      r05
        ? R05_FRAM_PROFILE.lighting.keyColor
        : r04
        ? R04_LIVE_PROFILE.lighting.keyColor
        : this.environmentProfile === "beauty-cell"
          ? 0xffe0b0
          : 0xffe8bd,
    );
    this.keyLight.intensity =
      r05
        ? R05_FRAM_PROFILE.lighting.keyIntensity
        : r04
        ? R04_LIVE_PROFILE.lighting.keyIntensity
        : this.environmentProfile === "beauty-cell"
        ? 2.52
        : this.qualityProfile === "pc-ultra"
          ? 2.68
          : 2.45;
    this.keyLight.name = "daylight-key";
    this.keyLightTarget.name = "daylight-key-target";
    this.keyLightTarget.position.set(r04 ? 430 : 390, 0, 900);
    this.keyLight.position.set(
      r05
        ? this.keyLightTarget.position.x +
          R05_FRAM_PROFILE.lighting.keyOffsetX
        : r04
        ? this.keyLightTarget.position.x +
          R04_LIVE_PROFILE.lighting.keyOffsetX
        : this.environmentProfile === "beauty-cell"
          ? -180
          : 40,
      r05
        ? R05_FRAM_PROFILE.lighting.keyOffsetY
        : r04
        ? R04_LIVE_PROFILE.lighting.keyOffsetY
        : this.environmentProfile === "beauty-cell"
          ? 890
          : 820,
      r05
        ? this.keyLightTarget.position.z +
          R05_FRAM_PROFILE.lighting.keyOffsetZ
        : r04
        ? this.keyLightTarget.position.z +
          R04_LIVE_PROFILE.lighting.keyOffsetZ
        : this.environmentProfile === "beauty-cell"
          ? 140
          : 360,
    );
    this.keyLight.target = this.keyLightTarget;
    this.keyLight.castShadow = true;
    const shadowMapSize = this.qualityProfile === "pc-ultra" ? 2_048 : 512;
    this.keyLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
    this.keyLight.shadow.bias = -0.0012;
    this.keyLight.shadow.normalBias =
      r05
        ? R05_FRAM_PROFILE.lighting.shadowNormalBias
        : r04
        ? R04_LIVE_PROFILE.lighting.shadowNormalBias
        : this.environmentProfile === "beauty-cell"
          ? 0.82
          : 1.4;
    const shadowHalfExtent = r05
      ? R05_FRAM_PROFILE.lighting.shadowHalfExtent
      : r04
      ? R04_LIVE_PROFILE.lighting.shadowHalfExtent
      : 460;
    this.keyLight.shadow.camera.left = -shadowHalfExtent;
    this.keyLight.shadow.camera.right = shadowHalfExtent;
    this.keyLight.shadow.camera.top = shadowHalfExtent;
    this.keyLight.shadow.camera.bottom = -shadowHalfExtent;
    this.keyLight.shadow.camera.near = 160;
    this.keyLight.shadow.camera.far = 1_420;

    this.effectLight.name = "signal-effect-light";
    this.effectLight.position.set(430, 58, 900);

    this.scene.add(
      skyFill,
      this.keyLightTarget,
      this.keyLight,
      this.effectLight,
    );

    if (this.qualityProfile === "pc-ultra") {
      const rimTarget = new THREE.Object3D();
      rimTarget.name = "daylight-rim-target";
      rimTarget.position.set(430, 24, 860);
      const rimLight = new THREE.DirectionalLight(
        r05
          ? R05_FRAM_PROFILE.lighting.rimColor
          : r04
          ? R04_LIVE_PROFILE.lighting.rimColor
          : this.environmentProfile === "beauty-cell"
            ? 0x8bd9d1
            : 0xa9e6df,
        r05
          ? R05_FRAM_PROFILE.lighting.rimIntensity
          : r04
          ? R04_LIVE_PROFILE.lighting.rimIntensity
          : this.environmentProfile === "beauty-cell"
            ? 0.48
            : 0.62,
      );
      rimLight.name = "daylight-cool-rim";
      rimLight.position.set(-360, 420, -280);
      rimLight.target = rimTarget;
      this.scene.add(rimTarget, rimLight);
    }
  }

  /**
   * Adds roughness-aware image-based light to PC materials. RoomEnvironment is
   * a compact neutral source for this technical slice; the accepted art route
   * can later swap in a baked outdoor HDRI without changing material contracts.
   */
  private createEnvironmentLighting(): void {
    this.scene.environment = null;
    this.environmentTarget?.dispose();
    this.environmentTarget = null;
    delete this.renderer.domElement.dataset.environmentLightingFallback;

    const environment = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(this.renderer);

    try {
      this.environmentTarget = generator.fromScene(environment, 0.04);
      this.scene.environment = this.environmentTarget.texture;
      this.scene.environmentIntensity =
        this.presentationProfile === "r05-fram"
          ? R05_FRAM_PROFILE.lighting.environmentIntensity
          : this.environmentProfile === "r04-live"
          ? R04_LIVE_PROFILE.lighting.environmentIntensity
          : this.environmentProfile === "beauty-cell"
            ? 0.19
            : 0.26;
      this.renderer.domElement.dataset.environmentLighting = "pmrem-ibl";
    } catch (reason) {
      this.renderer.domElement.dataset.environmentLighting =
        "direct-light-fallback";
      this.renderer.domElement.dataset.environmentLightingFallback =
        reason instanceof Error ? reason.message : "pmrem-generation";
    } finally {
      environment.dispose();
      generator.dispose();
    }
  }

  private createGround(state: PrototypeBState): void {
    const minimumX = -480;
    const maximumX = state.world.width + 480;
    const minimumZ = -240;
    const maximumZ = state.world.height + 240;
    const groundWidth = maximumX - minimumX;
    const groundHeight = maximumZ - minimumZ;
    const columns = Math.ceil(groundWidth / GROUND_PATCH_SIZE);
    const rows = Math.ceil(groundHeight / GROUND_PATCH_SIZE);
    const positions: number[] = [];
    const colors: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const color = new THREE.Color();
    const white = new THREE.Color(0xffffff);

    for (let row = 0; row <= rows; row += 1) {
      const z = Math.min(
        maximumZ,
        minimumZ + row * GROUND_PATCH_SIZE,
      );
      for (let column = 0; column <= columns; column += 1) {
        const x = Math.min(
          maximumX,
          minimumX + column * GROUND_PATCH_SIZE,
        );
        const seed = growthSeed(column + 401, row + 809, 17);
        const undulation =
          -3.8 + (((seed >>> 9) & 0xff) / 255 - 0.5) * 2.2;
        positions.push(x, undulation, z);
        uvs.push(
          (x - minimumX) / groundWidth,
          1 - (z - minimumZ) / groundHeight,
        );

        color.setHex(
          groundColorAt(x, z, row * (columns + 1) + column),
        );
        color.offsetHSL(
          (((seed >>> 19) & 0x0f) / 15 - 0.5) * 0.012,
          (((seed >>> 4) & 0x0f) / 15 - 0.5) * 0.035,
          (((seed >>> 13) & 0x0f) / 15 - 0.5) * 0.055,
        );
        color.lerp(
          white,
          this.presentationProfile === "r05-fram"
            ? R05_FRAM_PROFILE.display.groundWhiteMix
            : this.environmentProfile === "r04-live"
            ? R04_LIVE_PROFILE.display.groundWhiteMix
            : this.environmentProfile === "beauty-cell"
              ? 0.24
              : 0.72,
        );
        colors.push(color.r, color.g, color.b);
      }
    }

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const topLeft = row * (columns + 1) + column;
        const topRight = topLeft + 1;
        const bottomLeft = topLeft + columns + 1;
        const bottomRight = bottomLeft + 1;
        if ((row + column) % 2 === 0) {
          indices.push(
            topLeft,
            bottomLeft,
            topRight,
            topRight,
            bottomLeft,
            bottomRight,
          );
        } else {
          indices.push(
            topLeft,
            bottomLeft,
            bottomRight,
            topLeft,
            bottomRight,
            topRight,
          );
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3),
    );
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2),
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.96,
      metalness: 0,
      dithering: true,
    });
    const configureGroundTexture = (texture: THREE.Texture): void => {
      texture.name = "generated-reclaimed-meadow-v1";
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(
        groundWidth / 720,
        groundHeight / 720,
      );
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy =
        this.qualityProfile === "pc-ultra"
          ? this.renderer.capabilities.getMaxAnisotropy()
          : Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
    };

    this.renderer.domElement.dataset.groundTexture = "loading";
    const requestedGroundTexture = new THREE.TextureLoader().load(
      reclaimedMeadowTextureUrl,
      (loadedTexture) => {
        if (this.disposed) {
          loadedTexture.dispose();
          return;
        }

        configureGroundTexture(loadedTexture);
        this.groundTexture = loadedTexture;
        material.map = loadedTexture;
        material.color.setHex(0xffffff);
        material.needsUpdate = true;
        this.renderer.domElement.dataset.groundTexture = "ready";
      },
      undefined,
      () => {
        this.groundTexture?.dispose();
        this.groundTexture = null;

        if (this.disposed) {
          return;
        }

        material.map = null;
        material.color.setHex(0xa7b88d);
        material.needsUpdate = true;
        this.renderer.domElement.dataset.groundTexture = "fallback";
      },
    );
    configureGroundTexture(requestedGroundTexture);
    this.groundTexture = requestedGroundTexture;
    material.map = requestedGroundTexture;

    const ground = new THREE.Mesh(geometry, material);
    ground.name = "continuous-reclaimed-ground";
    ground.receiveShadow = true;
    this.scene.add(ground);

    const worldBorder = new THREE.LineSegments(
      new THREE.EdgesGeometry(
        new THREE.BoxGeometry(state.world.width, 8, state.world.height),
      ),
      new THREE.LineBasicMaterial({
        color: 0x628d72,
        transparent: true,
        opacity: 0.12,
      }),
    );
    worldBorder.position.set(
      state.world.width / 2,
      -7,
      state.world.height / 2,
    );
    this.scene.add(worldBorder);
  }

  private createFieldGrowth(
    state: PrototypeBState,
    excludedTerrainIds: ReadonlySet<string> = new Set(),
  ): void {
    const spacing = 142;
    const columns = Math.ceil(state.world.width / spacing);
    const rows = Math.ceil(state.world.height / spacing);
    const placements: GrowthPlacement[] = [];
    const addGrowth = (
      x: number,
      y: number,
      z: number,
      seed: number,
      scaleX = 1,
      scaleZ = 1,
      scaleY = 1,
    ): void => {
      placements.push({
        x,
        y,
        z,
        rotation: ((seed >>> 8) % 16) * (Math.PI / 8),
        scaleX:
          scaleX * (0.78 + ((seed >>> 3) % 7) * 0.055),
        scaleY:
          scaleY * (0.82 + ((seed >>> 19) % 6) * 0.06),
        scaleZ:
          scaleZ * (0.8 + ((seed >>> 13) % 7) * 0.05),
      });
    };

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const seed =
          (Math.imul(column + 11, 73_856_093) ^
            Math.imul(row + 17, 19_349_663)) >>>
          0;

        if (seed % 100 > 15) {
          continue;
        }

        const x =
          (column + 0.5) * spacing +
          (((seed >>> 3) & 0xff) / 255 - 0.5) * 52;
        const z =
          (row + 0.5) * spacing +
          (((seed >>> 11) & 0xff) / 255 - 0.5) * 52;

        if (
          x < 24 ||
          z < 24 ||
          x > state.world.width - 24 ||
          z > state.world.height - 24 ||
          Math.abs(z - 900) < 88 ||
          state.world.terrain.some((terrain) => {
            const margin = 10;
            return (
              x > terrain.bounds.x - margin &&
              x < terrain.bounds.x + terrain.bounds.width + margin &&
              z > terrain.bounds.y - margin &&
              z < terrain.bounds.y + terrain.bounds.height + margin
            );
          })
        ) {
          continue;
        }

        addGrowth(
          x,
          0.8,
          z,
          seed,
          0.84 + ((seed >>> 21) % 4) * 0.1,
          0.82 + ((seed >>> 25) % 4) * 0.1,
          0.82,
        );
      }
    }

    state.world.terrain.forEach((terrain, terrainIndex) => {
      if (excludedTerrainIds.has(terrain.id)) {
        return;
      }

      const bounds = terrain.bounds;
      const left = bounds.x;
      const right = bounds.x + bounds.width;
      const near = bounds.y;
      const far = bounds.y + bounds.height;
      const centerX = left + bounds.width / 2;
      const centerZ = near + bounds.height / 2;
      const baseSeed = growthSeed(terrainIndex + 31, bounds.x, bounds.y);

      switch (terrain.kind) {
        case "building": {
          const roofY = terrain.height + 10.5;
          addGrowth(
            left + bounds.width * 0.2,
            roofY,
            near + bounds.height * 0.22,
            baseSeed,
            1.25,
            1,
            0.78,
          );
          addGrowth(
            right - bounds.width * 0.16,
            roofY,
            far - bounds.height * 0.2,
            baseSeed ^ 0x5bd1e995,
            1.38,
            0.92,
            0.9,
          );
          addGrowth(
            centerX + bounds.width * 0.08,
            roofY,
            far - bounds.height * 0.1,
            baseSeed ^ 0xd3a2646c,
            2.05,
            0.7,
            0.52,
          );
          addGrowth(
            left - 3,
            0.8,
            centerZ - bounds.height * 0.2,
            baseSeed ^ 0x27d4eb2d,
            1.15,
            1.32,
          );
          addGrowth(
            right + 2,
            0.8,
            centerZ + bounds.height * 0.22,
            baseSeed ^ 0x165667b1,
            1.1,
            1.26,
          );
          break;
        }
        case "wall": {
          const runsEastWest = bounds.width >= bounds.height;
          for (let offsetIndex = 0; offsetIndex < 3; offsetIndex += 1) {
            const progress = 0.16 + offsetIndex * 0.34;
            const seed = baseSeed ^ Math.imul(offsetIndex + 7, 0x45d9f3b);
            addGrowth(
              runsEastWest
                ? left + bounds.width * progress
                : centerX,
              terrain.height + 0.8,
              runsEastWest
                ? centerZ
                : near + bounds.height * progress,
              seed,
              runsEastWest ? 1.42 : 0.82,
              runsEastWest ? 0.82 : 1.42,
              0.72,
            );
          }
          addGrowth(
            runsEastWest ? centerX + bounds.width * 0.26 : left - 3,
            0.8,
            runsEastWest ? far + 2 : centerZ + bounds.height * 0.2,
            baseSeed ^ 0x9e3779b9,
            runsEastWest ? 1.25 : 0.94,
            runsEastWest ? 0.94 : 1.25,
          );
          break;
        }
        case "pillar":
          addGrowth(
            centerX,
            terrain.height + 0.8,
            centerZ,
            baseSeed,
            1.02,
            1.02,
            0.72,
          );
          addGrowth(
            right + 1,
            0.8,
            far - bounds.height * 0.12,
            baseSeed ^ 0x7f4a7c15,
            1.2,
            1.2,
          );
          break;
        case "rock":
          addGrowth(
            centerX + bounds.width * 0.25,
            terrain.height + 0.8,
            centerZ + bounds.height * 0.3,
            baseSeed,
            1.28,
            1.14,
            0.9,
          );
          break;
        case "water": {
          const bankPoints = [
            [left + bounds.width * 0.12, near - 2, false],
            [left + bounds.width * 0.48, near - 4, false],
            [right - bounds.width * 0.12, near + 1, true],
            [right + 2, near + bounds.height * 0.28, false],
            [right - 1, far - bounds.height * 0.18, true],
            [left + bounds.width * 0.64, far + 2, false],
            [left + bounds.width * 0.26, far - 1, true],
            [left - 3, near + bounds.height * 0.54, false],
          ] as const;

          bankPoints.forEach(([x, z, inWater], bankIndex) => {
            addGrowth(
              x,
              inWater ? terrain.height + 0.5 : 0.8,
              z,
              baseSeed ^ Math.imul(bankIndex + 13, 0x27d4eb2d),
              1.02,
              1.24,
              0.92,
            );
          });
          break;
        }
      }
    });

    if (placements.length === 0) {
      return;
    }

    const geometry = createGrowthClusterGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.88,
      metalness: 0,
    });
    const growth = new THREE.InstancedMesh(
      geometry,
      material,
      placements.length,
    );
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    placements.forEach((placement, index) => {
      position.set(placement.x, placement.y, placement.z);
      rotation.setFromAxisAngle(up, placement.rotation);
      scale.set(
        placement.scaleX,
        placement.scaleY,
        placement.scaleZ,
      );
      matrix.compose(position, rotation, scale);
      growth.setMatrixAt(index, matrix);
    });

    growth.instanceMatrix.needsUpdate = true;
    growth.computeBoundingSphere();
    growth.name = "reclaiming-growth";
    growth.receiveShadow = true;
    this.scene.add(growth);
  }

  private createTerrain(
    state: PrototypeBState,
    excludedIds: ReadonlySet<string> = new Set(),
  ): void {
    const materials: Record<TerrainKind, THREE.MeshStandardMaterial> = {
      building: new THREE.MeshStandardMaterial({
        color: 0xa9aa8e,
        roughness: 0.92,
      }),
      wall: new THREE.MeshStandardMaterial({
        color: 0x94968a,
        roughness: 0.96,
      }),
      rock: new THREE.MeshStandardMaterial({
        color: 0x7f917b,
        roughness: 0.98,
      }),
      pillar: new THREE.MeshStandardMaterial({
        color: 0x95879a,
        roughness: 0.9,
      }),
      water: new THREE.MeshStandardMaterial({
        color: 0x4d91a1,
        transparent: true,
        opacity: 0.82,
        roughness: 0.28,
        metalness: 0.04,
      }),
    };

    for (const placement of state.world.terrain) {
      if (excludedIds.has(placement.id)) {
        continue;
      }

      const geometry = new THREE.BoxGeometry(
        placement.bounds.width,
        placement.height,
        placement.bounds.height,
      );
      const mesh = new THREE.Mesh(geometry, materials[placement.kind]);
      mesh.position.set(
        placement.bounds.x + placement.bounds.width / 2,
        placement.height / 2,
        placement.bounds.y + placement.bounds.height / 2,
      );
      mesh.name = placement.id;
      mesh.receiveShadow = placement.kind !== "water";
      mesh.castShadow =
        placement.kind === "building" ||
        placement.kind === "wall" ||
        placement.kind === "pillar";
      this.scene.add(mesh);

      if (placement.kind !== "water") {
        const outline = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          new THREE.LineBasicMaterial({
            color:
              placement.kind === "pillar" ? 0x70577b : 0x626d5d,
            transparent: true,
            opacity: 0.34,
          }),
        );
        outline.position.copy(mesh.position);
        this.scene.add(outline);
      }

      if (placement.kind === "building") {
        const roof = new THREE.Mesh(
          new THREE.BoxGeometry(
            placement.bounds.width + 18,
            10,
            placement.bounds.height + 18,
          ),
          new THREE.MeshStandardMaterial({
            color: 0xb76c49,
            roughness: 0.86,
          }),
        );
        roof.position.set(
          mesh.position.x,
          placement.height + 5,
          mesh.position.z,
        );
        roof.castShadow = true;
        roof.receiveShadow = true;
        this.scene.add(roof);
      }
    }
  }

  private createProps(
    state: PrototypeBState,
    excludedIds: ReadonlySet<string> = new Set(),
  ): void {
    for (const prop of state.world.props) {
      if (excludedIds.has(prop.id)) {
        continue;
      }

      const recipe = recipeForProp(prop.kind);
      const mesh = createVoxelMesh(recipe, PROP_VOXEL_SIZE, 1);
      const group = new THREE.Group();
      group.position.set(prop.x, 0, prop.y);
      group.rotation.y = prop.rotation;
      group.add(mesh, createBlobShadow(28, 17, 0.24));

      if (prop.kind === "lamp") {
        group.scale.setScalar(0.72);
      } else if (prop.kind === "signpost") {
        group.scale.set(0.62, 0.78, 0.62);
      } else if (prop.kind === "relay") {
        group.scale.setScalar(1.18);
      }

      group.name = prop.id;
      this.scene.add(group);
    }
  }

  private createLandmarkSignals(state: PrototypeBState): void {
    const colors = [0x61e5d1, 0xf4a950, 0x8269a5];
    state.world.landmarks.forEach((landmark, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: colors[index] ?? 0x61e5d1,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(54, 59, 40),
        material,
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(landmark.center.x, 2, landmark.center.y);
      ring.name = `landmark-${landmark.id}`;
      this.scene.add(ring);
    });
  }

  private syncPlayer(
    state: PrototypeBState,
    deltaSeconds: number,
    combatPresentation: CombatPresentationState | undefined,
  ): void {
    const player = state.player;
    const movementDistance =
      this.lastPlayerX === null || this.lastPlayerY === null
        ? 0
        : Math.hypot(
            player.x - this.lastPlayerX,
            player.y - this.lastPlayerY,
          );
    this.lastPlayerX = player.x;
    this.lastPlayerY = player.y;
    this.playerGroup.position.x = player.x;
    this.playerGroup.position.z = player.y;
    this.playerGroup.position.y = Math.sin(this.elapsed * 5.2) * 0.6;
    this.playerGroup.rotation.y = composeActorFacingRotation(
      player.facingX,
      player.facingY,
      this.environmentProfile === "r04-live" ? "+z" : "-z",
    );
    this.bladeMesh.visible = player.weaponId === "blade";
    this.impactMesh.visible = player.weaponId === "impact";

    this.attackAnimation = Math.max(
      0,
      this.attackAnimation - deltaSeconds * 4.8,
    );
    const progress = 1 - this.attackAnimation;
    const swing = this.attackAnimation > 0
      ? Math.sin(progress * Math.PI) *
        (this.attackWeapon === "impact" ? 1.42 : 1.05)
      : 0;
    if (
      this.environmentProfile === "beauty-cell" ||
      this.environmentProfile === "r04-live"
    ) {
      this.bladeMesh.rotation.set(0, 0, 0);
      this.impactMesh.rotation.set(0, 0, 0);
    } else {
      this.bladeMesh.rotation.z = -0.42 - swing;
      this.impactMesh.rotation.z = -0.28 - swing;
    }
    const tint =
      player.invulnerableTicks > 0 && state.tick % 2 === 0
        ? 0xb8fff4
        : 0xffffff;
    if (this.playerHeroVisual === null) {
      if (
        this.bladeMesh instanceof THREE.Mesh &&
        this.impactMesh instanceof THREE.Mesh
      ) {
        alignHeldWeapon(this.bladeMesh, "blade");
        alignHeldWeapon(this.impactMesh, "impact");
      }
      setHeroMeshTint(this.playerBody, tint);
      return;
    }

    alignObjectGripToSocket(
      this.bladeMesh,
      this.environmentProfile === "beauty-cell" ||
        this.environmentProfile === "r04-live"
        ? { x: 0, y: 0, z: 0 }
        : BLADE_GRIP_ANCHOR,
    );
    alignObjectGripToSocket(
      this.impactMesh,
      this.environmentProfile === "beauty-cell" ||
        this.environmentProfile === "r04-live"
        ? { x: 0, y: 0, z: 0 }
        : IMPACT_GRIP_ANCHOR,
    );
    this.heroHurtAnimation = Math.max(
      0,
      this.heroHurtAnimation - deltaSeconds * 3.8,
    );
    this.heroSkillAnimation = Math.max(
      0,
      this.heroSkillAnimation - deltaSeconds * 1.45,
    );
    const moveAmount =
      deltaSeconds > Number.EPSILON
        ? THREE.MathUtils.clamp(
            movementDistance / deltaSeconds / 118,
            0,
            1,
          )
        : 0;
    const pose = resolveHeroMotion(
      combatPresentation,
      this.heroHurtAnimation,
      this.heroSkillAnimation,
      this.attackAnimation,
      moveAmount,
    );
    this.playerHeroVisual.updatePose({
      motion: pose.motion,
      timeSeconds: this.elapsed,
      progress: pose.progress,
      moveAmount,
    });
    this.playerHeroVisual.setTint(tint);
  }

  private syncCompanion(
    state: PrototypeBState,
    deltaSeconds: number,
  ): void {
    const player = state.player;
    const facingLength = Math.hypot(player.facingX, player.facingY);
    const facingX =
      facingLength > Number.EPSILON ? player.facingX / facingLength : 0;
    const facingY =
      facingLength > Number.EPSILON ? player.facingY / facingLength : -1;
    const desiredX = player.x - facingX * 32 - facingY * 38;
    const desiredZ = player.y - facingY * 32 + facingX * 38;
    const distanceSquared =
      (this.companionGroup.position.x - desiredX) ** 2 +
      (this.companionGroup.position.z - desiredZ) ** 2;

    if (!this.companionInitialized || distanceSquared > 140 ** 2) {
      this.companionGroup.position.x = desiredX;
      this.companionGroup.position.z = desiredZ;
      this.companionInitialized = true;
    } else {
      const follow = 1 - Math.exp(-6.4 * deltaSeconds);
      this.companionGroup.position.x = THREE.MathUtils.lerp(
        this.companionGroup.position.x,
        desiredX,
        follow,
      );
      this.companionGroup.position.z = THREE.MathUtils.lerp(
        this.companionGroup.position.z,
        desiredZ,
        follow,
      );
    }

    this.companionGroup.position.y =
      1.2 + Math.sin(this.elapsed * 4.4 + 0.8) * 0.7;
    this.companionGroup.rotation.y = Math.atan2(-facingX, -facingY);
    this.companionReaction = Math.max(
      0,
      this.companionReaction - deltaSeconds * 2.6,
    );
    const reactionPulse =
      1 +
      Math.sin((1 - this.companionReaction) * Math.PI * 3) *
        this.companionReaction *
        0.045;
    this.companionGroup.scale.setScalar(
      reactionPulse *
        (this.environmentProfile === "r04-live"
          ? R04_LIVE_PROFILE.actors.companionPreviewScale
          : this.environmentProfile === "beauty-cell"
            ? 1.08
            : 1),
    );
    this.companionBeautyVisual?.updatePose({
      timeSeconds: this.elapsed,
      moveAmount: THREE.MathUtils.clamp(
        Math.sqrt(distanceSquared) / 72,
        0,
        1,
      ),
      reaction: this.companionReaction,
    });
  }

  private syncEnemies(state: PrototypeBState): void {
    const activeIds = new Set<string>();

    for (const enemy of state.enemies) {
      activeIds.add(enemy.id);
      let visual = this.enemyVisuals.get(enemy.id);

      if (visual === undefined) {
        visual = this.createEnemyVisual(enemy);
        this.enemyVisuals.set(enemy.id, visual);
        this.scene.add(visual.group);
      }

      visual.group.visible =
        !enemy.defeated || enemy.kind === "named-anomaly";
      visual.group.position.set(enemy.x, visual.baseY, enemy.y);
      visual.group.rotation.y = Math.atan2(
        -(state.player.x - enemy.x),
        -(state.player.y - enemy.y),
      );
      visual.group.scale.setScalar(
        enemy.disposition === "calmed" ||
          enemy.disposition === "connected"
          ? 0.92
          : enemy.defeated
            ? 0.28
            : 1,
      );
      visual.body.material.opacity =
        enemy.disposition === "connected" ? 0.62 : 1;
      visual.body.material.transparent =
        enemy.disposition === "connected";
      visual.telegraph.visible = enemy.attack.phase === "telegraph";

      if (visual.telegraph.visible) {
        const definition = ENEMY_DEFINITIONS[enemy.kind];
        const pulse =
          1 +
          Math.sin(
            (enemy.attack.ticksRemaining /
              Math.max(1, definition.telegraphTicks)) *
              Math.PI *
              2,
          ) *
            0.08;
        visual.telegraph.scale.setScalar(
          pulse * ((definition.attackRange + enemy.radius) / 58),
        );
        visual.telegraph.material.opacity =
          0.34 +
          (1 -
            enemy.attack.ticksRemaining /
              Math.max(1, definition.telegraphTicks)) *
            0.5;
      }
    }

    for (const [id, visual] of this.enemyVisuals) {
      if (!activeIds.has(id)) {
        visual.group.visible = false;
      }
    }
  }

  private syncCombatPresentation(
    state: PrototypeBState,
    presentation: CombatPresentationState | undefined,
  ): void {
    if (presentation === undefined || presentation.targetId === null) {
      this.targetRing.visible = false;
      this.windupRing.visible = false;
      return;
    }

    const target = state.enemies.find(
      (enemy) => enemy.id === presentation.targetId && !enemy.defeated,
    );
    if (target === undefined) {
      this.targetRing.visible = false;
      this.windupRing.visible = false;
      return;
    }

    const radius = Math.max(24, target.radius * 1.45);
    this.targetRing.visible = true;
    this.targetRing.position.set(target.x, 2.8, target.y);
    this.targetRing.scale.setScalar(radius / 30);
    this.targetRing.material.color.setHex(
      state.player.weaponId === "blade" ? 0x61e5d1 : 0xf4a950,
    );
    this.targetRing.material.opacity =
      0.56 + Math.sin(this.elapsed * 6) * 0.12;

    const windup = presentation.phase === "windup";
    this.windupRing.visible = windup;
    if (windup) {
      this.windupRing.position.set(target.x, 3, target.y);
      const remaining = Math.max(0.05, 1 - presentation.progress);
      this.windupRing.scale.setScalar((radius / 30) * (1.6 * remaining + 0.72));
      this.windupRing.material.opacity = 0.3 + presentation.progress * 0.66;
    }
  }

  private createEnemyVisual(enemy: EnemyState): EntityVisual {
    const recipe = recipeForEnemy(enemy.kind);
    const body = createVoxelMesh(
      recipe,
      enemy.kind === "named-anomaly"
        ? ENEMY_VOXEL_SIZE * 1.15
        : ENEMY_VOXEL_SIZE,
      1,
    );
    const group = new THREE.Group();
    const telegraph = new THREE.Mesh(
      new THREE.RingGeometry(43, 54, 32),
      new THREE.MeshBasicMaterial({
        color: 0xed4034,
        transparent: true,
        opacity: 0.48,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    telegraph.rotation.x = -Math.PI / 2;
    telegraph.position.y = 3;
    telegraph.visible = false;
    group.add(
      body,
      createBlobShadow(
        enemy.kind === "named-anomaly" ? 54 : 34,
        enemy.kind === "named-anomaly" ? 31 : 20,
        0.26,
      ),
      telegraph,
    );

    return {
      group,
      body,
      telegraph,
      baseY:
        enemy.kind === "murmur"
          ? 16
          : 0,
    };
  }

  private syncLoot(state: PrototypeBState): void {
    for (const pickup of state.world.loot) {
      let group = this.lootVisuals.get(pickup.id);

      if (group === undefined) {
        const mesh = createVoxelMesh(RELIC_RECIPE, 1.55, 1);
        group = new THREE.Group();
        group.add(mesh, createBlobShadow(17, 10, 0.2));
        group.position.set(pickup.x, 4, pickup.y);
        group.scale.setScalar(0.68);
        group.name = pickup.id;
        this.lootVisuals.set(pickup.id, group);
        this.scene.add(group);
      }

      group.visible = !pickup.picked;
    }
  }

  private handleEvents(events: readonly PrototypeBEvent[]): void {
    for (const event of events) {
      switch (event.type) {
        case "player-attacked":
          this.attackAnimation = 1;
          this.attackWeapon = event.weaponId;
          this.addAttackRing(event);
          this.pulseEffectLight(
            event.x,
            event.y,
            event.weaponId === "blade" ? 0xffe4ac : 0xf4a950,
            event.weaponId === "blade" ? 0.58 : 0.82,
          );
          break;
        case "enemy-damaged": {
          this.cameraTrauma = Math.min(
            1,
            this.cameraTrauma +
              (event.source === "impact"
                ? 0.82
                : event.source === "relic"
                  ? 0.66
                  : 0.28),
          );
          const enemy = this.enemyVisuals.get(event.enemyId);
          if (enemy !== undefined) {
            this.addBurst(
              enemy.group.position.x,
              enemy.group.position.z,
              event.source === "relic"
                ? 0x61e5d1
                : event.source === "impact"
                  ? 0xf4a950
                  : 0xe7ddbd,
              event.source === "impact" ? 13 : 8,
            );
            this.pulseEffectLight(
              enemy.group.position.x,
              enemy.group.position.z,
              event.source === "relic"
                ? 0x61e5d1
                : event.source === "impact"
                  ? 0xf4a950
                  : 0xffe4ac,
              event.source === "relic" ? 1 : 0.62,
            );
          }
          break;
        }
        case "player-damaged":
          this.heroHurtAnimation = 1;
          this.addBurst(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0xe95445,
            10,
          );
          this.pulseEffectLight(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0xff5c48,
            0.9,
          );
          break;
        case "guard-resolved":
          this.addRing(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            event.justGuard ? 0x61e5d1 : 0xe7ddbd,
            22,
            34,
            0.28,
            1.8,
          );
          this.pulseEffectLight(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            event.justGuard ? 0x61e5d1 : 0xffe4ac,
            event.justGuard ? 0.92 : 0.5,
          );
          break;
        case "relic-activated":
          this.heroSkillAnimation = 1;
          this.companionReaction = 1;
          this.addRing(
            event.x,
            event.y,
            0x61e5d1,
            event.radius * 0.76,
            event.radius * 0.82,
            0.62,
            1.36,
          );
          this.addRing(
            event.x,
            event.y,
            0xc6fff3,
            event.radius * 0.38,
            event.radius * 0.42,
            0.44,
            1.82,
          );
          this.addBurst(event.x, event.y, 0x9cf8e8, 16);
          this.pulseEffectLight(
            event.x,
            event.y,
            0x61e5d1,
            1,
          );
          break;
        case "loot-picked":
          this.companionReaction = 0.82;
          this.addBurst(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0x61e5d1,
            9,
          );
          this.pulseEffectLight(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0x61e5d1,
            0.72,
          );
          break;
        case "anomaly-resolved":
          this.companionReaction = 1;
          this.addRing(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            event.outcome === "destroy"
              ? 0xe95445
              : event.outcome === "calm"
                ? 0xf4a950
                : 0x61e5d1,
            36,
            250,
            1.1,
            2.4,
          );
          this.pulseEffectLight(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            event.outcome === "destroy"
              ? 0xff5c48
              : event.outcome === "calm"
                ? 0xf4a950
                : 0x61e5d1,
            1,
          );
          break;
        default:
          break;
      }
    }
  }

  private pulseEffectLight(
    x: number,
    z: number,
    color: number,
    energy: number,
  ): void {
    this.effectLight.position.set(x, 54, z);
    this.effectLight.color.setHex(color);
    this.effectLightEnergy = Math.max(this.effectLightEnergy, energy);
  }

  private addAttackRing(
    event: Extract<PrototypeBEvent, { type: "player-attacked" }>,
  ): void {
    const angle = Math.atan2(event.directionY, event.directionX);
    const color = event.weaponId === "blade" ? 0xe7ddbd : 0xf4a950;
    const inner = event.weaponId === "blade" ? event.range * 0.52 : 20;
    const outer = event.weaponId === "blade" ? event.range : event.range * 1.15;
    const geometry = new THREE.RingGeometry(
      inner,
      outer,
      24,
      1,
      -0.72,
      1.44,
    );
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.66,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = angle;
    mesh.position.set(event.x, 8, event.y);
    this.scene.add(mesh);
    this.ringEffects.push({
      mesh,
      age: 0,
      duration: event.weaponId === "blade" ? 0.18 : 0.3,
      grow: event.weaponId === "blade" ? 1.05 : 1.25,
    });
  }

  private addRing(
    x: number,
    z: number,
    color: number,
    inner: number,
    outer: number,
    duration: number,
    grow: number,
  ): void {
    const mesh = new THREE.Mesh(
      new THREE.RingGeometry(inner, outer, 40),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.56,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x, 7, z);
    this.scene.add(mesh);
    this.ringEffects.push({
      mesh,
      age: 0,
      duration,
      grow,
    });
  }

  private addBurst(
    x: number,
    z: number,
    color: number,
    count: number,
  ): void {
    const geometry = new THREE.BoxGeometry(8, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2 + (index % 3) * 0.19;
      const speed = 70 + (index % 4) * 17;
      positions.push(new THREE.Vector3(x, 28, z));
      velocities.push(
        new THREE.Vector3(
          Math.cos(angle) * speed,
          70 + (index % 5) * 14,
          Math.sin(angle) * speed,
        ),
      );
      this.reusableMatrix.makeTranslation(x, 28, z);
      mesh.setMatrixAt(index, this.reusableMatrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    this.scene.add(mesh);
    this.burstEffects.push({
      mesh,
      positions,
      velocities,
      age: 0,
      duration: 0.5,
    });
  }

  private updateEffects(deltaSeconds: number): void {
    this.effectLightEnergy = Math.max(
      0,
      this.effectLightEnergy - deltaSeconds * 3.8,
    );
    this.effectLight.intensity =
      this.effectLightEnergy * this.effectLightEnergy * 155;

    for (let index = this.ringEffects.length - 1; index >= 0; index -= 1) {
      const effect = this.ringEffects[index];
      if (effect === undefined) {
        continue;
      }

      effect.age += deltaSeconds;
      const progress = Math.min(1, effect.age / effect.duration);
      const scale = 1 + progress * (effect.grow - 1);
      effect.mesh.scale.setScalar(scale);
      effect.mesh.material.opacity = (1 - progress) * 0.56;

      if (progress >= 1) {
        this.scene.remove(effect.mesh);
        effect.mesh.geometry.dispose();
        effect.mesh.material.dispose();
        this.ringEffects.splice(index, 1);
      }
    }

    for (let index = this.burstEffects.length - 1; index >= 0; index -= 1) {
      const effect = this.burstEffects[index];
      if (effect === undefined) {
        continue;
      }

      effect.age += deltaSeconds;
      const progress = Math.min(1, effect.age / effect.duration);

      for (
        let particleIndex = 0;
        particleIndex < effect.positions.length;
        particleIndex += 1
      ) {
        const position = effect.positions[particleIndex];
        const velocity = effect.velocities[particleIndex];
        if (position === undefined || velocity === undefined) {
          continue;
        }

        velocity.y -= 260 * deltaSeconds;
        position.addScaledVector(velocity, deltaSeconds);
        this.reusablePosition.copy(position);
        this.reusableScale.setScalar(Math.max(0.05, 1 - progress));
        this.reusableMatrix.compose(
          this.reusablePosition,
          this.reusableQuaternion,
          this.reusableScale,
        );
        effect.mesh.setMatrixAt(particleIndex, this.reusableMatrix);
      }

      effect.mesh.instanceMatrix.needsUpdate = true;

      if (progress >= 1) {
        this.scene.remove(effect.mesh);
        effect.mesh.dispose();
        effect.mesh.geometry.dispose();
        disposeMaterial(effect.mesh.material);
        this.burstEffects.splice(index, 1);
      }
    }
  }

  private cameraTargetOffsetX(): number {
    return this.presentationProfile === "r05-fram"
      ? R05_FRAM_PROFILE.camera.targetOffsetX
      : this.environmentProfile === "r04-live"
      ? R04_LIVE_PROFILE.camera.targetOffsetX
      : this.environmentProfile === "beauty-cell"
        ? -42
        : 0;
  }

  private cameraTargetOffsetZ(): number {
    return this.presentationProfile === "r05-fram"
      ? R05_FRAM_PROFILE.camera.targetOffsetZ
      : this.environmentProfile === "r04-live"
      ? R04_LIVE_PROFILE.camera.targetOffsetZ
      : this.environmentProfile === "beauty-cell"
        ? -54
        : 0;
  }

  private syncR04KeyLight(): void {
    if (this.environmentProfile !== "r04-live") {
      return;
    }
    this.keyLightTarget.position.set(
      this.cameraTarget.x,
      0,
      this.cameraTarget.z,
    );
    this.keyLight.position.set(
      this.cameraTarget.x + (
        this.presentationProfile === "r05-fram"
          ? R05_FRAM_PROFILE.lighting.keyOffsetX
          : R04_LIVE_PROFILE.lighting.keyOffsetX
      ),
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.lighting.keyOffsetY
        : R04_LIVE_PROFILE.lighting.keyOffsetY,
      this.cameraTarget.z + (
        this.presentationProfile === "r05-fram"
          ? R05_FRAM_PROFILE.lighting.keyOffsetZ
          : R04_LIVE_PROFILE.lighting.keyOffsetZ
      ),
    );
  }

  private snapCamera(state: PrototypeBState): void {
    const composition = composeCameraTarget(
      {
        playerX: state.player.x,
        playerY: state.player.y,
        facingX: state.player.facingX,
        facingY: state.player.facingY,
        phase: "idle",
      },
      this.cameraCompositionProfile,
    );
    this.cameraTarget.set(
      composition.targetX + this.cameraTargetOffsetX(),
      this.presentationProfile === "r05-fram"
        ? R05_FRAM_PROFILE.camera.targetHeight
        : this.environmentProfile === "r04-live"
          ? R04_LIVE_PROFILE.camera.targetHeight
        : 28,
      composition.targetY + this.cameraTargetOffsetZ(),
    );
    this.renderer.domElement.dataset.cameraComposition = composition.mode;
    this.camera.position.copy(this.cameraTarget).add(this.cameraOffset());
    this.camera.lookAt(this.cameraTarget);
    this.syncR04KeyLight();
    this.camera.updateProjectionMatrix();
  }

  private updateCamera(
    state: PrototypeBState,
    deltaSeconds: number,
    combatPresentation: CombatPresentationState | undefined,
  ): void {
    const activeTarget = combatPresentation?.targetId === null ||
        combatPresentation?.targetId === undefined
      ? undefined
      : state.enemies.find(
          (enemy) => enemy.id === combatPresentation.targetId,
        );
    const composition = composeCameraTarget(
      {
        playerX: state.player.x,
        playerY: state.player.y,
        facingX: state.player.facingX,
        facingY: state.player.facingY,
        phase: combatPresentation?.phase ?? "idle",
        targetX: activeTarget?.x,
        targetY: activeTarget?.y,
      },
      this.cameraCompositionProfile,
    );
    this.renderer.domElement.dataset.cameraComposition = composition.mode;
    const followSpeed = this.presentationProfile === "r05-fram"
      ? R05_FRAM_PROFILE.camera.followSpeed
      : this.environmentProfile === "r04-live"
        ? R04_LIVE_PROFILE.camera.followSpeed
      : 8;
    const follow = 1 - Math.exp(-followSpeed * deltaSeconds);
    this.cameraTarget.lerp(
      this.reusablePosition.set(
        composition.targetX + this.cameraTargetOffsetX(),
        this.presentationProfile === "r05-fram"
          ? R05_FRAM_PROFILE.camera.targetHeight
          : this.environmentProfile === "r04-live"
            ? R04_LIVE_PROFILE.camera.targetHeight
          : 28,
        composition.targetY + this.cameraTargetOffsetZ(),
      ),
      follow,
    );
    const desiredPosition = this.reusablePosition
      .copy(this.cameraTarget)
      .add(this.cameraOffset());
    this.camera.position.lerp(desiredPosition, follow);
    this.cameraTrauma = Math.max(
      0,
      this.cameraTrauma - deltaSeconds * 3.4,
    );
    if (this.cameraTrauma > 0.001) {
      const amplitude = this.cameraTrauma * this.cameraTrauma * 7.5;
      this.camera.position.x += Math.sin(this.elapsed * 137.3) * amplitude;
      this.camera.position.y += Math.sin(this.elapsed * 173.1) * amplitude * 0.28;
      this.camera.position.z += Math.cos(this.elapsed * 151.7) * amplitude;
    }
    this.camera.lookAt(this.cameraTarget);
    this.syncR04KeyLight();

    if (this.qualityProfile === "pc-ultra") {
      return;
    }

    const worldUnitsPerPixel =
      this.cameraViewHeight / this.internalRenderHeight;
    this.camera.position.x =
      Math.round(this.camera.position.x / worldUnitsPerPixel) *
      worldUnitsPerPixel;
    this.camera.position.y =
      Math.round(this.camera.position.y / worldUnitsPerPixel) *
      worldUnitsPerPixel;
    this.camera.position.z =
      Math.round(this.camera.position.z / worldUnitsPerPixel) *
      worldUnitsPerPixel;
  }

  private updateAmbientMotion(
    state: PrototypeBState,
    timeSeconds: number,
  ): void {
    for (const [id, visual] of this.enemyVisuals) {
      const enemy = state.enemies.find((candidate) => candidate.id === id);
      if (enemy === undefined) {
        continue;
      }

      const hover = enemy.kind === "murmur" ? 8 : 2;
      visual.group.position.y =
        visual.baseY +
        Math.sin(timeSeconds * 3.1 + id.length * 0.7) *
          hover;
    }

    let index = 0;
    for (const group of this.lootVisuals.values()) {
      group.rotation.y = timeSeconds * 0.8 + index * 0.4;
      group.position.y = 5 + Math.sin(timeSeconds * 2.4 + index) * 5;
      index += 1;
    }
  }
}

function buildVoxelGeometry(
  recipe: VoxelRecipe,
  voxelSize: number,
  groupByMaterialRole: boolean,
): {
  readonly geometry: THREE.BufferGeometry;
  readonly data: ReturnType<typeof meshVoxelRecipe>;
} {
  const extentX = recipe.dimensions.width * voxelSize;
  const extentZ = recipe.dimensions.depth * voxelSize;
  const data = meshVoxelRecipe(recipe, {
    voxelSize,
    shadeFaces: false,
    origin: {
      x: -extentX / 2,
      y: 0,
      z: -extentZ / 2,
    },
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(data.positions, 3),
  );
  geometry.setAttribute(
    "normal",
    new THREE.BufferAttribute(data.normals, 3),
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(data.colors, 3),
  );
  geometry.setIndex(new THREE.BufferAttribute(data.indices, 1));
  if (groupByMaterialRole) {
    data.materialGroups.forEach((group, materialIndex) => {
      geometry.addGroup(group.start, group.count, materialIndex);
    });
  }
  geometry.computeBoundingSphere();
  return { geometry, data };
}

function createVoxelMesh(
  recipe: VoxelRecipe,
  voxelSize: number,
  opacity: number,
): THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> {
  const { geometry } = buildVoxelGeometry(recipe, voxelSize, false);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: opacity < 1,
    opacity,
    roughness: 0.78,
    metalness: 0.04,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = recipe.id;
  return mesh;
}

function createHeroVoxelMesh(
  recipe: VoxelRecipe,
  voxelSize: number,
): HeroVoxelMesh {
  const { geometry, data } = buildVoxelGeometry(
    recipe,
    voxelSize,
    true,
  );
  const materials = data.materialGroups.map((group) =>
    createHeroMaterial(group.role)
  );
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.name = recipe.id;
  return mesh;
}

function createHeroMaterial(role: VoxelMaterialRole): THREE.Material {
  switch (role) {
    case "matte":
      return new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.84,
        metalness: 0,
      });
    case "metal":
      return new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.38,
        metalness: 0.68,
      });
    case "emissive":
      return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        toneMapped: false,
      });
  }
}

function setHeroMeshTint(mesh: HeroVoxelMesh, color: number): void {
  for (const material of mesh.material) {
    if (
      material instanceof THREE.MeshStandardMaterial ||
      material instanceof THREE.MeshBasicMaterial
    ) {
      material.color.setHex(color);
    }
  }
}

function createBlobShadow(
  radiusX: number,
  radiusZ: number,
  opacity: number,
): THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial> {
  const geometry = new THREE.CircleGeometry(1, 24);
  const material = new THREE.MeshBasicMaterial({
    color: 0x243832,
    transparent: true,
    opacity: opacity * 0.72,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.scale.set(radiusX, radiusZ, 1);
  mesh.position.y = 1;
  return mesh;
}

function createTargetRing(
  color: number,
  opacity: number,
): THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial> {
  const geometry = new THREE.RingGeometry(25, 30, 64);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = 12;
  return mesh;
}

function createGrowthClusterGeometry(): THREE.BufferGeometry {
  const components = [
    {
      size: [26, 3.5, 18] as const,
      position: [0, 1.75, 0] as const,
      color: 0x397a3f,
    },
    {
      size: [15, 5, 21] as const,
      position: [-7, 4.25, 4] as const,
      color: 0x4d9143,
    },
    {
      size: [12, 11, 12] as const,
      position: [5, 7.5, -3] as const,
      color: 0x2f7040,
    },
    {
      size: [10, 8, 10] as const,
      position: [-5, 8, 5] as const,
      color: 0x6aa34e,
    },
    {
      size: [4.5, 4.5, 4.5] as const,
      position: [5, 15.5, 0] as const,
      color: 0xf0c94c,
    },
    {
      size: [4, 4, 4] as const,
      position: [-7, 13, 7] as const,
      color: 0xe46f68,
    },
  ];
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const shadedColor = new THREE.Color();

  for (const component of components) {
    const box = new THREE.BoxGeometry(
      component.size[0],
      component.size[1],
      component.size[2],
    ).toNonIndexed();
    box.translate(
      component.position[0],
      component.position[1],
      component.position[2],
    );
    const boxPositions = box.getAttribute("position");
    const boxNormals = box.getAttribute("normal");

    for (let index = 0; index < boxPositions.count; index += 1) {
      const normalY = boxNormals.getY(index);
      const normalX = Math.abs(boxNormals.getX(index));
      const shade =
        normalY > 0.5
          ? 1
          : normalY < -0.5
            ? 0.58
            : normalX > 0.5
              ? 0.82
              : 0.72;
      shadedColor.setHex(component.color).multiplyScalar(shade);
      positions.push(
        boxPositions.getX(index),
        boxPositions.getY(index),
        boxPositions.getZ(index),
      );
      normals.push(
        boxNormals.getX(index),
        boxNormals.getY(index),
        boxNormals.getZ(index),
      );
      colors.push(shadedColor.r, shadedColor.g, shadedColor.b);
    }

    box.dispose();
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(normals, 3),
  );
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3),
  );
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function growthSeed(first: number, second: number, third: number): number {
  return (
    Math.imul(Math.trunc(first) + 101, 73_856_093) ^
    Math.imul(Math.trunc(second) + 211, 19_349_663) ^
    Math.imul(Math.trunc(third) + 307, 83_492_791)
  ) >>> 0;
}

function configureHeldWeapon(
  mesh: THREE.Mesh,
  weapon: WeaponId,
): void {
  mesh.rotation.x = weapon === "blade" ? 0.12 : 0.04;
  mesh.rotation.z = weapon === "blade" ? -0.42 : -0.28;
  mesh.scale.setScalar(weapon === "blade" ? 0.9 : 0.86);
  alignHeldWeapon(mesh, weapon);
}

function resolveHeroMotion(
  presentation: CombatPresentationState | undefined,
  hurtAnimation: number,
  skillAnimation: number,
  attackAnimation: number,
  moveAmount: number,
): { readonly motion: HeroMotion; readonly progress: number } {
  if (hurtAnimation > 0) {
    return { motion: "hurt", progress: 1 - hurtAnimation };
  }
  if (skillAnimation > 0) {
    return { motion: "skill", progress: 1 - skillAnimation };
  }
  if (attackAnimation > 0) {
    return { motion: "hit", progress: 1 - attackAnimation };
  }

  switch (presentation?.phase) {
    case "windup":
      return { motion: "windup", progress: presentation.progress };
    case "hit":
      return { motion: "hit", progress: presentation.progress };
    case "recover":
      return { motion: "recovery", progress: presentation.progress };
    case "idle":
    case "acquire":
    case undefined:
      return moveAmount > 0.08
        ? { motion: "run", progress: 0 }
        : { motion: "idle", progress: 0 };
  }
}

export function alignHeldWeapon(mesh: THREE.Mesh, weapon: WeaponId): void {
  const gripAnchor =
    weapon === "blade" ? BLADE_GRIP_ANCHOR : IMPACT_GRIP_ANCHOR;
  heldWeaponGripOffset.set(
    gripAnchor.x,
    gripAnchor.y,
    gripAnchor.z,
  )
    .multiply(mesh.scale)
    .applyEuler(mesh.rotation);

  mesh.position.set(
    PLAYER_WEAPON_ANCHOR.x - heldWeaponGripOffset.x,
    PLAYER_WEAPON_ANCHOR.y - heldWeaponGripOffset.y,
    PLAYER_WEAPON_ANCHOR.z - heldWeaponGripOffset.z,
  );
}

function recipeForEnemy(kind: EnemyKind): VoxelRecipe {
  switch (kind) {
    case "scrap-hound":
      return SCRAP_HOUND_ENEMY_RECIPE;
    case "relay-shell":
      return RELAY_SHELL_ENEMY_RECIPE;
    case "murmur":
      return MURMUR_ENEMY_RECIPE;
    case "named-anomaly":
      return NAMED_ANOMALY_RECIPE;
  }
}

function recipeForProp(kind: string): VoxelRecipe {
  switch (kind) {
    case "dead-tree":
    case "signpost":
      return TREE_RECIPE;
    case "relay":
    case "lamp":
    case "anomaly-marker":
      return RELIC_RECIPE;
    case "contract-board":
      return CHEST_RECIPE;
    default:
      return ROCK_RECIPE;
  }
}

function groundColorAt(x: number, z: number, index: number): number {
  if (x < 760 && z > 430 && z < 1_370) {
    return index % 3 === 0 ? 0x729469 : 0x607e58;
  }

  if (x > 2_420 && x < 3_330 && z > 380 && z < 1_420) {
    return index % 4 === 0 ? 0x85867c : 0x767a72;
  }

  if (Math.abs(z - 900) < 145) {
    return index % 3 === 0 ? 0x9a7859 : 0x87684f;
  }

  const variation = ((Math.floor(x / 80) * 17 + Math.floor(z / 80) * 31) >>> 0) % 4;
  return [0x477744, 0x4f8048, 0x5b8951, 0x68965a][variation] ?? 0x477744;
}

function disposeMaterial(
  material: THREE.Material | readonly THREE.Material[],
): void {
  const materials: readonly THREE.Material[] = Array.isArray(material)
    ? material
    : [material as THREE.Material];

  for (const entry of materials) {
    entry.dispose();
  }
}
