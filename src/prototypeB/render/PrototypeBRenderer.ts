import * as THREE from "three";
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
  IMPACT_WEAPON_RECIPE,
  MURMUR_ENEMY_RECIPE,
  NAMED_ANOMALY_RECIPE,
  PLAYER_RECIPE,
  RELAY_SHELL_ENEMY_RECIPE,
  RELIC_RECIPE,
  ROCK_RECIPE,
  SCRAP_HOUND_ENEMY_RECIPE,
  TREE_RECIPE,
  VOXEL_GRID_SIZE,
  meshVoxelRecipe,
  type VoxelRecipe,
} from "../voxel";

const INTERNAL_WIDTH = 640;
const INTERNAL_HEIGHT = 360;
const CAMERA_VIEW_HEIGHT = 660;
const CAMERA_VIEW_WIDTH =
  CAMERA_VIEW_HEIGHT * (INTERNAL_WIDTH / INTERNAL_HEIGHT);
const CAMERA_OFFSET = new THREE.Vector3(510, 680, 510);
const PLAYER_VOXEL_SIZE = 4;
const ENEMY_VOXEL_SIZE = 4;
const PROP_VOXEL_SIZE = 3.4;
const GROUND_TILE_SIZE = 80;

type EntityVisual = {
  readonly group: THREE.Group;
  readonly body: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
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

export type PrototypeBRenderStats = {
  readonly calls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly textures: number;
};

export interface PrototypeBRendererOptions {
  readonly onContextLost?: () => void;
  readonly onContextRestored?: () => void;
}

export class PrototypeBRenderer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.OrthographicCamera;
  private readonly cameraTarget = new THREE.Vector3();
  private readonly playerGroup = new THREE.Group();
  private readonly playerBody: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly bladeMesh: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly impactMesh: THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly playerShadow: THREE.Mesh<
    THREE.CircleGeometry,
    THREE.MeshBasicMaterial
  >;
  private readonly enemyVisuals = new Map<string, EntityVisual>();
  private readonly lootVisuals = new Map<string, THREE.Group>();
  private readonly ringEffects: RingEffect[] = [];
  private readonly burstEffects: BurstEffect[] = [];
  private readonly reusableMatrix = new THREE.Matrix4();
  private readonly reusablePosition = new THREE.Vector3();
  private readonly reusableQuaternion = new THREE.Quaternion();
  private readonly reusableScale = new THREE.Vector3(1, 1, 1);
  private readonly contextLostHandler: (event: Event) => void;
  private readonly contextRestoredHandler: () => void;
  private attackAnimation = 0;
  private attackWeapon: WeaponId = "blade";
  private elapsed = 0;
  private disposed = false;

  public constructor(
    mount: HTMLElement,
    initialState: PrototypeBState,
    options: PrototypeBRendererOptions = {},
  ) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      depth: true,
      powerPreference: "high-performance",
      precision: "mediump",
      preserveDrawingBuffer: false,
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(INTERNAL_WIDTH, INTERNAL_HEIGHT, false);
    this.renderer.domElement.dataset.testid = "game-canvas";
    this.renderer.domElement.setAttribute(
      "aria-label",
      "辺境遺物録 ボクセルゲーム画面",
    );
    mount.append(this.renderer.domElement);

    this.contextLostHandler = (event: Event): void => {
      event.preventDefault();
      options.onContextLost?.();
    };
    this.contextRestoredHandler = (): void => {
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

    this.scene.background = new THREE.Color(0x111817);
    this.scene.fog = new THREE.FogExp2(0x111817, 0.00088);

    this.camera = new THREE.OrthographicCamera(
      -CAMERA_VIEW_WIDTH / 2,
      CAMERA_VIEW_WIDTH / 2,
      CAMERA_VIEW_HEIGHT / 2,
      -CAMERA_VIEW_HEIGHT / 2,
      1,
      3_200,
    );

    this.createGround(initialState);
    this.createTerrain(initialState);
    this.createProps(initialState);
    this.createLandmarkSignals(initialState);

    this.playerBody = createVoxelMesh(
      PLAYER_RECIPE,
      PLAYER_VOXEL_SIZE,
      1,
    );
    this.playerGroup.add(this.playerBody);
    this.bladeMesh = createVoxelMesh(
      BLADE_WEAPON_RECIPE,
      2.1,
      1,
    );
    this.impactMesh = createVoxelMesh(
      IMPACT_WEAPON_RECIPE,
      2,
      1,
    );
    configureHeldWeapon(this.bladeMesh, "blade");
    configureHeldWeapon(this.impactMesh, "impact");
    this.playerGroup.add(this.bladeMesh, this.impactMesh);

    this.playerShadow = createBlobShadow(38, 22, 0.32);
    this.playerGroup.add(this.playerShadow);
    this.scene.add(this.playerGroup);

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
  ): void {
    if (this.disposed) {
      return;
    }

    const deltaSeconds = Math.min(0.05, Math.max(0, deltaMs / 1_000));
    this.elapsed += deltaSeconds;
    this.handleEvents(events);
    this.syncPlayer(state, deltaSeconds);
    this.syncEnemies(state);
    this.syncLoot(state);
    this.updateEffects(deltaSeconds);
    this.updateCamera(state, deltaSeconds);
    this.updateAmbientMotion(state, timeMs / 1_000);
    this.renderer.render(this.scene, this.camera);
  }

  public getStats(): PrototypeBRenderStats {
    return {
      calls: this.renderer.info.render.calls,
      triangles: this.renderer.info.render.triangles,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
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

    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();

    this.scene.traverse((object) => {
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

  private createGround(state: PrototypeBState): void {
    const columns = Math.ceil(state.world.width / GROUND_TILE_SIZE);
    const rows = Math.ceil(state.world.height / GROUND_TILE_SIZE);
    const geometry = new THREE.BoxGeometry(
      GROUND_TILE_SIZE - 3,
      10,
      GROUND_TILE_SIZE - 3,
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: false,
    });
    const ground = new THREE.InstancedMesh(
      geometry,
      material,
      columns * rows,
    );
    ground.name = "voxel-ground";

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    let index = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = column * GROUND_TILE_SIZE + GROUND_TILE_SIZE / 2;
        const z = row * GROUND_TILE_SIZE + GROUND_TILE_SIZE / 2;
        matrix.makeTranslation(x, -5, z);
        ground.setMatrixAt(index, matrix);
        color.setHex(groundColorAt(x, z, index));
        ground.setColorAt(index, color);
        index += 1;
      }
    }

    ground.instanceMatrix.needsUpdate = true;
    if (ground.instanceColor !== null) {
      ground.instanceColor.needsUpdate = true;
    }
    ground.computeBoundingSphere();
    this.scene.add(ground);

    const worldBorder = new THREE.LineSegments(
      new THREE.EdgesGeometry(
        new THREE.BoxGeometry(state.world.width, 24, state.world.height),
      ),
      new THREE.LineBasicMaterial({
        color: 0x61e5d1,
        transparent: true,
        opacity: 0.12,
      }),
    );
    worldBorder.position.set(
      state.world.width / 2,
      -11,
      state.world.height / 2,
    );
    this.scene.add(worldBorder);
  }

  private createTerrain(state: PrototypeBState): void {
    const materials: Record<TerrainKind, THREE.MeshBasicMaterial> = {
      building: new THREE.MeshBasicMaterial({ color: 0x3a4742 }),
      wall: new THREE.MeshBasicMaterial({ color: 0x303a37 }),
      rock: new THREE.MeshBasicMaterial({ color: 0x4c514a }),
      pillar: new THREE.MeshBasicMaterial({ color: 0x443c43 }),
      water: new THREE.MeshBasicMaterial({
        color: 0x224b4d,
        transparent: true,
        opacity: 0.75,
      }),
    };

    for (const placement of state.world.terrain) {
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
      this.scene.add(mesh);

      if (placement.kind !== "water") {
        const outline = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          new THREE.LineBasicMaterial({
            color:
              placement.kind === "pillar" ? 0x8269a5 : 0xa39a7d,
            transparent: true,
            opacity: 0.22,
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
          new THREE.MeshBasicMaterial({ color: 0x6f4735 }),
        );
        roof.position.set(
          mesh.position.x,
          placement.height + 5,
          mesh.position.z,
        );
        this.scene.add(roof);
      }
    }
  }

  private createProps(state: PrototypeBState): void {
    for (const prop of state.world.props) {
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
  ): void {
    const player = state.player;
    this.playerGroup.position.x = player.x;
    this.playerGroup.position.z = player.y;
    this.playerGroup.position.y = Math.sin(this.elapsed * 6) * 2;
    this.playerGroup.rotation.y = Math.atan2(
      -player.facingX,
      -player.facingY,
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
    this.bladeMesh.rotation.z = -0.42 - swing;
    this.impactMesh.rotation.z = -0.28 - swing;
    this.playerBody.material.color.setHex(
      player.invulnerableTicks > 0 && state.tick % 2 === 0
        ? 0xb8fff4
        : 0xffffff,
    );
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
          0.22 +
          (1 -
            enemy.attack.ticksRemaining /
              Math.max(1, definition.telegraphTicks)) *
            0.48;
      }
    }

    for (const [id, visual] of this.enemyVisuals) {
      if (!activeIds.has(id)) {
        visual.group.visible = false;
      }
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
        color: 0xe95445,
        transparent: true,
        opacity: 0.42,
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
          break;
        case "enemy-damaged": {
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
          }
          break;
        }
        case "player-damaged":
          this.addBurst(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0xe95445,
            10,
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
          break;
        case "relic-activated":
          this.addRing(
            event.x,
            event.y,
            0x61e5d1,
            28,
            event.radius,
            0.5,
            1.9,
          );
          break;
        case "loot-picked":
          this.addBurst(
            this.playerGroup.position.x,
            this.playerGroup.position.z,
            0x61e5d1,
            9,
          );
          break;
        case "anomaly-resolved":
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
          break;
        default:
          break;
      }
    }
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
        effect.mesh.geometry.dispose();
        disposeMaterial(effect.mesh.material);
        this.burstEffects.splice(index, 1);
      }
    }
  }

  private snapCamera(state: PrototypeBState): void {
    this.cameraTarget.set(state.player.x, 28, state.player.y);
    this.camera.position.copy(this.cameraTarget).add(CAMERA_OFFSET);
    this.camera.lookAt(this.cameraTarget);
    this.camera.updateProjectionMatrix();
  }

  private updateCamera(
    state: PrototypeBState,
    deltaSeconds: number,
  ): void {
    const follow = 1 - Math.exp(-8 * deltaSeconds);
    this.cameraTarget.lerp(
      this.reusablePosition.set(
        state.player.x,
        28,
        state.player.y,
      ),
      follow,
    );
    const desiredPosition = this.reusablePosition
      .copy(this.cameraTarget)
      .add(CAMERA_OFFSET);
    this.camera.position.lerp(desiredPosition, follow);
    this.camera.lookAt(this.cameraTarget);

    const worldUnitsPerPixel = CAMERA_VIEW_HEIGHT / INTERNAL_HEIGHT;
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

function createVoxelMesh(
  recipe: VoxelRecipe,
  voxelSize: number,
  opacity: number,
): THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial> {
  const extent = VOXEL_GRID_SIZE * voxelSize;
  const data = meshVoxelRecipe(recipe, {
    voxelSize,
    origin: {
      x: -extent / 2,
      y: 0,
      z: -extent / 2,
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
  geometry.computeBoundingSphere();

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: opacity < 1,
    opacity,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = recipe.id;
  return mesh;
}

function createBlobShadow(
  radiusX: number,
  radiusZ: number,
  opacity: number,
): THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial> {
  const geometry = new THREE.CircleGeometry(1, 24);
  const material = new THREE.MeshBasicMaterial({
    color: 0x030505,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.scale.set(radiusX, radiusZ, 1);
  mesh.position.y = 1;
  return mesh;
}

function configureHeldWeapon(
  mesh: THREE.Mesh,
  weapon: WeaponId,
): void {
  mesh.position.set(
    weapon === "blade" ? 24 : 25,
    weapon === "blade" ? 23 : 17,
    -3,
  );
  mesh.rotation.x = weapon === "blade" ? 0.12 : 0.04;
  mesh.rotation.z = weapon === "blade" ? -0.42 : -0.28;
  mesh.scale.setScalar(weapon === "blade" ? 0.9 : 0.86);
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
    return index % 3 === 0 ? 0x303b35 : 0x28332f;
  }

  if (x > 2_420 && x < 3_330 && z > 380 && z < 1_420) {
    return index % 4 === 0 ? 0x332f38 : 0x282a31;
  }

  if (Math.abs(z - 900) < 145) {
    return index % 3 === 0 ? 0x4c4033 : 0x43372f;
  }

  const variation = ((Math.floor(x / 80) * 17 + Math.floor(z / 80) * 31) >>> 0) % 4;
  return [0x1b2822, 0x202d27, 0x243027, 0x1b2521][variation] ?? 0x1b2822;
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
