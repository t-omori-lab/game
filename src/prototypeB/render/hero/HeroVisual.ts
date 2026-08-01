import * as THREE from "three";
import {
  PLAYER_RECIPE,
  PLAYER_VOXEL_SIZE,
  meshVoxelRecipe,
  voxelAnchorPosition,
  type AuthoredVoxel,
  type VoxelMaterialRole,
  type VoxelPoint,
  type VoxelRecipe,
} from "../../voxel";

export const HERO_PART_IDS = [
  "head",
  "torso",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
  "equipment",
] as const;

export type HeroPartId = (typeof HERO_PART_IDS)[number];
export type HeroVisualMode = "articulated" | "merged";
export type HeroMotion =
  | "idle"
  | "run"
  | "windup"
  | "hit"
  | "recovery"
  | "hurt"
  | "skill";

export interface HeroAnimationInput {
  readonly motion: HeroMotion;
  readonly timeSeconds: number;
  /** Normalized phase progress for windup/hit/recovery/hurt/skill. */
  readonly progress?: number;
  /** Locomotion weight for run, from zero to one. */
  readonly moveAmount?: number;
}

export type HeroVoxelClassifier = (
  voxel: AuthoredVoxel,
  recipe: VoxelRecipe,
) => HeroPartId;

type HeroMesh = THREE.Mesh<THREE.BufferGeometry, THREE.Material[]>;
type HeroPartMap<T> = Readonly<Record<HeroPartId, T>>;

export interface HeroVisualOptions {
  readonly recipe?: VoxelRecipe;
  readonly voxelSize?: number;
  readonly mode?: HeroVisualMode;
  readonly classifyVoxel?: HeroVoxelClassifier;
  readonly materials?: Readonly<
    Partial<Record<VoxelMaterialRole, THREE.Material>>
  >;
}

export interface HeroVisual {
  /** Caller-owned placement and facing transform. Animation never mutates it. */
  readonly root: THREE.Group;
  /** Animation-only transform below root. */
  readonly motionRoot: THREE.Group;
  readonly mode: HeroVisualMode;
  readonly partGroups: HeroPartMap<THREE.Group>;
  readonly partMeshes: HeroPartMap<HeroMesh | null>;
  readonly mergedMesh: HeroMesh | null;
  /** Articulated mode follows the right hand; merged mode uses the recipe anchor. */
  readonly weaponSocket: THREE.Group;
  readonly materials: Readonly<Record<VoxelMaterialRole, THREE.Material>>;
  updatePose(input: HeroAnimationInput): void;
  attachWeapon(object: THREE.Object3D, gripLocal?: VoxelPoint): void;
  setTint(color: THREE.ColorRepresentation): void;
  dispose(): void;
}

interface PartTransform {
  readonly position: readonly [number, number, number];
  readonly rotation: readonly [number, number, number];
  readonly scale: readonly [number, number, number];
}

export interface HeroPose {
  readonly root: PartTransform;
  readonly parts: HeroPartMap<PartTransform>;
}

const MATERIAL_ROLES = [
  "matte",
  "metal",
  "emissive",
] as const satisfies readonly VoxelMaterialRole[];

const DEFAULT_PIVOTS = {
  head: { x: 12, y: 23.5, z: 7.5 },
  torso: { x: 12, y: 14, z: 8 },
  "left-arm": { x: 7.5, y: 21.5, z: 7 },
  "right-arm": { x: 16.5, y: 21.5, z: 7 },
  "left-leg": { x: 8.5, y: 13, z: 7 },
  "right-leg": { x: 15, y: 13, z: 7 },
  equipment: { x: 12, y: 16, z: 10 },
} as const satisfies HeroPartMap<VoxelPoint>;

function clamp01(value: number | undefined, fallback: number): number {
  return Number.isFinite(value) ? THREE.MathUtils.clamp(value ?? fallback, 0, 1) : fallback;
}

function smooth(value: number): number {
  return value * value * (3 - 2 * value);
}

function transform(
  position: readonly [number, number, number] = [0, 0, 0],
  rotation: readonly [number, number, number] = [0, 0, 0],
  scale: readonly [number, number, number] = [1, 1, 1],
): PartTransform {
  return { position, rotation, scale };
}

/**
 * Spatial semantic fallback for the canonical surveyor. Equipment rules run
 * first so the pack, signal frame, coat tails, and front harness stay on the
 * torso while limbs articulate beneath them.
 */
export function classifyPlayerVoxel(voxel: AuthoredVoxel): HeroPartId {
  const isPackOrSignal =
    voxel.paletteId === "pack-pale" ||
    voxel.paletteId === "cyan" ||
    voxel.paletteId === "amber";
  const isRearRig =
    voxel.z >= 9 &&
    voxel.y >= 15 &&
    voxel.x >= 5 &&
    voxel.x <= 15;
  const isHarness =
    voxel.z <= 5 &&
    voxel.y >= 15 &&
    voxel.y <= 22 &&
    voxel.paletteId === "rust";
  const isCoatTail =
    voxel.z >= 8 &&
    voxel.y >= 10 &&
    voxel.y <= 14 &&
    (voxel.paletteId === "cloth-sage" ||
      voxel.paletteId === "cloth-dark");

  if (isPackOrSignal || isRearRig || isHarness || isCoatTail) {
    return "equipment";
  }
  if (voxel.y >= 24) {
    return "head";
  }
  if (voxel.y >= 13 && voxel.x <= 8) {
    return "left-arm";
  }
  if (voxel.y >= 13 && voxel.x >= 16) {
    return "right-arm";
  }
  if (voxel.y <= 12 && voxel.x <= 11) {
    return "left-leg";
  }
  if (voxel.y <= 12) {
    return "right-leg";
  }
  return "torso";
}

export function partitionHeroRecipe(
  recipe: VoxelRecipe = PLAYER_RECIPE,
  classifyVoxel: HeroVoxelClassifier = classifyPlayerVoxel,
): HeroPartMap<VoxelRecipe> {
  const voxelsByPart: Record<HeroPartId, AuthoredVoxel[]> = {
    head: [],
    torso: [],
    "left-arm": [],
    "right-arm": [],
    "left-leg": [],
    "right-leg": [],
    equipment: [],
  };
  for (const voxel of recipe.voxels) {
    voxelsByPart[classifyVoxel(voxel, recipe)].push(voxel);
  }

  return Object.fromEntries(
    HERO_PART_IDS.map((partId) => [
      partId,
      {
        schemaVersion: 2,
        id: `${recipe.id}-${partId}`,
        name: `${recipe.name} / ${partId}`,
        kind: recipe.kind,
        dimensions: recipe.dimensions,
        palette: recipe.palette,
        voxels: voxelsByPart[partId],
        anchors: [],
        validation: {
          minVoxelCount: 0,
          maxVoxelCount: recipe.voxels.length,
          requireGroundContact: false,
          requireConnectedBody: false,
        },
      } satisfies VoxelRecipe,
    ]),
  ) as unknown as HeroPartMap<VoxelRecipe>;
}

function defaultMaterial(role: VoxelMaterialRole): THREE.Material {
  switch (role) {
    case "matte":
      return new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.8,
        metalness: 0,
      });
    case "metal":
      return new THREE.MeshStandardMaterial({
        color: 0xffffff,
        vertexColors: true,
        roughness: 0.32,
        metalness: 0.72,
      });
    case "emissive":
      return new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        toneMapped: false,
      });
  }
}

function pivotWorldPosition(
  recipe: VoxelRecipe,
  pivot: VoxelPoint,
  voxelSize: number,
): THREE.Vector3 {
  return new THREE.Vector3(
    (pivot.x - recipe.dimensions.width / 2) * voxelSize,
    pivot.y * voxelSize,
    (pivot.z - recipe.dimensions.depth / 2) * voxelSize,
  );
}

function createGeometry(
  recipe: VoxelRecipe,
  voxelSize: number,
  pivot: THREE.Vector3,
): { readonly geometry: THREE.BufferGeometry; readonly roles: readonly VoxelMaterialRole[] } {
  const data = meshVoxelRecipe(recipe, {
    voxelSize,
    shadeFaces: false,
    origin: {
      x: -(recipe.dimensions.width * voxelSize) / 2 - pivot.x,
      y: -pivot.y,
      z: -(recipe.dimensions.depth * voxelSize) / 2 - pivot.z,
    },
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(data.normals, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(data.colors, 3));
  geometry.setIndex(new THREE.BufferAttribute(data.indices, 1));
  data.materialGroups.forEach((group, index) => {
    geometry.addGroup(group.start, group.count, index);
  });
  geometry.computeBoundingSphere();
  return {
    geometry,
    roles: data.materialGroups.map((group) => group.role),
  };
}

function createMesh(
  recipe: VoxelRecipe,
  voxelSize: number,
  pivot: THREE.Vector3,
  materials: Readonly<Record<VoxelMaterialRole, THREE.Material>>,
): HeroMesh {
  const built = createGeometry(recipe, voxelSize, pivot);
  const mesh = new THREE.Mesh(
    built.geometry,
    built.roles.map((role) => materials[role]),
  );
  mesh.name = recipe.id;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function sampleHeroPose(input: HeroAnimationInput): HeroPose {
  const time = Number.isFinite(input.timeSeconds) ? input.timeSeconds : 0;
  const progress = clamp01(input.progress, 0);
  const move = clamp01(input.moveAmount, 1);
  const breath = Math.sin(time * 2.15);
  const rootPosition: [number, number, number] = [0, breath * 0.32, 0];
  const rootRotation: [number, number, number] = [0, 0, 0];
  const rotations: Record<HeroPartId, [number, number, number]> = {
    head: [breath * 0.012, Math.sin(time * 0.72) * 0.035, 0],
    torso: [0.018 + breath * 0.008, 0, 0],
    "left-arm": [-0.025 - breath * 0.018, 0, -0.035],
    "right-arm": [0.025 + breath * 0.018, 0, 0.035],
    "left-leg": [0, 0, 0],
    "right-leg": [0, 0, 0],
    equipment: [-breath * 0.008, 0, 0],
  };
  const scales: Record<HeroPartId, [number, number, number]> = {
    head: [1, 1, 1],
    torso: [1, 1, 1],
    "left-arm": [1, 1, 1],
    "right-arm": [1, 1, 1],
    "left-leg": [1, 1, 1],
    "right-leg": [1, 1, 1],
    equipment: [1, 1, 1],
  };

  switch (input.motion) {
    case "idle":
      break;
    case "run": {
      const stride = Math.sin(time * 10.5) * move;
      rootPosition[1] += Math.abs(Math.cos(time * 10.5)) * 1.25 * move;
      rotations.torso[0] += 0.1 * move;
      rotations.torso[1] = Math.cos(time * 10.5) * 0.09 * move;
      rotations.head[1] -= rotations.torso[1] * 0.55;
      rotations["left-leg"][0] = stride * 0.68;
      rotations["right-leg"][0] = -stride * 0.68;
      rotations["left-arm"][0] = -stride * 0.5;
      rotations["right-arm"][0] = stride * 0.5;
      rotations.equipment[0] -= 0.08 * move + Math.abs(stride) * 0.035;
      break;
    }
    case "windup": {
      const phase = smooth(progress);
      rotations.torso[1] = -0.42 * phase;
      rotations.torso[2] = 0.08 * phase;
      rotations["right-arm"][0] = -1.18 * phase;
      rotations["right-arm"][2] = -0.25 * phase;
      rotations["left-arm"][0] = 0.38 * phase;
      rotations.head[1] = 0.2 * phase;
      rotations["left-leg"][0] = -0.12 * phase;
      rotations["right-leg"][0] = 0.16 * phase;
      break;
    }
    case "hit": {
      const phase = smooth(progress);
      rotations.torso[1] = THREE.MathUtils.lerp(-0.42, 0.34, phase);
      rotations["right-arm"][0] = THREE.MathUtils.lerp(-1.18, 1.46, phase);
      rotations["right-arm"][2] = THREE.MathUtils.lerp(-0.25, 0.2, phase);
      rotations["left-arm"][0] = THREE.MathUtils.lerp(0.38, -0.2, phase);
      rotations.head[1] = -rotations.torso[1] * 0.42;
      rootPosition[2] -= Math.sin(progress * Math.PI) * 2.8;
      break;
    }
    case "recovery": {
      const remaining = 1 - smooth(progress);
      rotations.torso[1] = 0.34 * remaining;
      rotations["right-arm"][0] = 1.46 * remaining;
      rotations["right-arm"][2] = 0.2 * remaining;
      rotations["left-arm"][0] = -0.2 * remaining;
      rotations.head[1] = -0.14 * remaining;
      break;
    }
    case "hurt": {
      const recoil = Math.sin(progress * Math.PI);
      rootPosition[2] += recoil * 7.5;
      rootRotation[2] = Math.sin(progress * Math.PI * 2) * 0.06;
      rotations.torso[0] = -0.34 * recoil;
      rotations.head[0] = 0.28 * recoil;
      rotations["left-arm"][0] = -0.62 * recoil;
      rotations["right-arm"][0] = -0.78 * recoil;
      break;
    }
    case "skill": {
      const energy = Math.sin(progress * Math.PI);
      rootPosition[1] -= energy * 2.6;
      rotations.torso[0] = -0.18 * energy;
      rotations.head[0] = 0.14 * energy;
      rotations["left-arm"][0] = 0.72 * energy;
      rotations["right-arm"][0] = 0.72 * energy;
      rotations["left-arm"][2] = -0.92 * energy;
      rotations["right-arm"][2] = 0.92 * energy;
      rotations["left-leg"][0] = -0.15 * energy;
      rotations["right-leg"][0] = 0.15 * energy;
      scales.equipment = [1 + energy * 0.07, 1 + energy * 0.07, 1 + energy * 0.07];
      break;
    }
  }

  const parts = Object.fromEntries(
    HERO_PART_IDS.map((partId) => [
      partId,
      transform([0, 0, 0], rotations[partId], scales[partId]),
    ]),
  ) as unknown as HeroPartMap<PartTransform>;
  return { root: transform(rootPosition, rootRotation), parts };
}

export function alignObjectGripToSocket(
  object: THREE.Object3D,
  gripLocal: VoxelPoint,
): void {
  const offset = new THREE.Vector3(gripLocal.x, gripLocal.y, gripLocal.z)
    .multiply(object.scale)
    .applyQuaternion(object.quaternion);
  object.position.copy(offset).multiplyScalar(-1);
}

export function createHeroVisual(options: HeroVisualOptions = {}): HeroVisual {
  const recipe = options.recipe ?? PLAYER_RECIPE;
  const voxelSize = options.voxelSize ?? PLAYER_VOXEL_SIZE;
  const mode = options.mode ?? "articulated";
  if (!Number.isFinite(voxelSize) || voxelSize <= 0) {
    throw new RangeError("Hero voxel size must be a positive finite number.");
  }

  const ownedMaterials = new Set<THREE.Material>();
  const materials = Object.fromEntries(
    MATERIAL_ROLES.map((role) => {
      const supplied = options.materials?.[role];
      const material = supplied ?? defaultMaterial(role);
      if (supplied === undefined) {
        ownedMaterials.add(material);
      }
      return [role, material];
    }),
  ) as unknown as Record<VoxelMaterialRole, THREE.Material>;

  const root = new THREE.Group();
  root.name = `${recipe.id}-visual`;
  const motionRoot = new THREE.Group();
  motionRoot.name = `${recipe.id}-motion`;
  root.add(motionRoot);

  const pivotPositions = Object.fromEntries(
    HERO_PART_IDS.map((partId) => [
      partId,
      pivotWorldPosition(recipe, DEFAULT_PIVOTS[partId], voxelSize),
    ]),
  ) as unknown as HeroPartMap<THREE.Vector3>;
  const partGroups = Object.fromEntries(
    HERO_PART_IDS.map((partId) => {
      const group = new THREE.Group();
      group.name = `${recipe.id}-${partId}-pivot`;
      return [partId, group];
    }),
  ) as unknown as Record<HeroPartId, THREE.Group>;
  const basePositions = Object.fromEntries(
    HERO_PART_IDS.map((partId) => [partId, new THREE.Vector3()]),
  ) as unknown as Record<HeroPartId, THREE.Vector3>;

  const torsoPivot = pivotPositions.torso;
  for (const partId of HERO_PART_IDS) {
    const parent =
      partId === "head" ||
      partId === "left-arm" ||
      partId === "right-arm" ||
      partId === "equipment"
        ? partGroups.torso
        : motionRoot;
    parent.add(partGroups[partId]);
    basePositions[partId].copy(pivotPositions[partId]);
    if (parent === partGroups.torso) {
      basePositions[partId].sub(torsoPivot);
    }
    partGroups[partId].position.copy(basePositions[partId]);
  }

  const emptyMeshes = Object.fromEntries(
    HERO_PART_IDS.map((partId) => [partId, null]),
  ) as unknown as Record<HeroPartId, HeroMesh | null>;
  let partMeshes = emptyMeshes;
  let mergedMesh: HeroMesh | null = null;
  const geometries: THREE.BufferGeometry[] = [];

  if (mode === "articulated") {
    const recipes = partitionHeroRecipe(
      recipe,
      options.classifyVoxel ?? classifyPlayerVoxel,
    );
    partMeshes = Object.fromEntries(
      HERO_PART_IDS.map((partId) => {
        const mesh = createMesh(
          recipes[partId],
          voxelSize,
          pivotPositions[partId],
          materials,
        );
        geometries.push(mesh.geometry);
        partGroups[partId].add(mesh);
        return [partId, mesh];
      }),
    ) as unknown as Record<HeroPartId, HeroMesh | null>;
  } else {
    mergedMesh = createMesh(
      recipe,
      voxelSize,
      new THREE.Vector3(),
      materials,
    );
    geometries.push(mergedMesh.geometry);
    motionRoot.add(mergedMesh);
    for (const partId of HERO_PART_IDS) {
      partGroups[partId].visible = false;
    }
  }

  const weaponAnchor = voxelAnchorPosition(recipe, "weapon", voxelSize);
  const weaponSocket = new THREE.Group();
  weaponSocket.name = `${recipe.id}-weapon-socket`;
  if (mode === "articulated") {
    partGroups["right-arm"].add(weaponSocket);
    weaponSocket.position.set(
      weaponAnchor.x - pivotPositions["right-arm"].x,
      weaponAnchor.y - pivotPositions["right-arm"].y,
      weaponAnchor.z - pivotPositions["right-arm"].z,
    );
  } else {
    motionRoot.add(weaponSocket);
    weaponSocket.position.set(weaponAnchor.x, weaponAnchor.y, weaponAnchor.z);
  }

  const visual: HeroVisual = {
    root,
    motionRoot,
    mode,
    partGroups,
    partMeshes,
    mergedMesh,
    weaponSocket,
    materials,
    updatePose(input): void {
      const pose = sampleHeroPose(input);
      motionRoot.position.set(...pose.root.position);
      motionRoot.rotation.set(...pose.root.rotation);
      motionRoot.scale.set(...pose.root.scale);
      for (const partId of HERO_PART_IDS) {
        const partPose = pose.parts[partId];
        const group = partGroups[partId];
        group.position.set(
          basePositions[partId].x + partPose.position[0],
          basePositions[partId].y + partPose.position[1],
          basePositions[partId].z + partPose.position[2],
        );
        group.rotation.set(...partPose.rotation);
        group.scale.set(...partPose.scale);
      }
      if (mode === "merged") {
        weaponSocket.rotation.set(...pose.parts["right-arm"].rotation);
      }
    },
    attachWeapon(object, gripLocal = { x: 0, y: 0, z: 0 }): void {
      weaponSocket.add(object);
      alignObjectGripToSocket(object, gripLocal);
    },
    setTint(color): void {
      for (const material of Object.values(materials)) {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshBasicMaterial
        ) {
          material.color.set(color);
        }
      }
    },
    dispose(): void {
      for (const geometry of geometries) {
        geometry.dispose();
      }
      for (const material of ownedMaterials) {
        material.dispose();
      }
      root.removeFromParent();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0 });
  return visual;
}
