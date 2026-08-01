import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { VoxelMaterialRole, VoxelPoint } from "../../voxel";
import {
  HERO_PART_IDS,
  alignObjectGripToSocket,
  sampleHeroPose,
  type HeroAnimationInput,
  type HeroPartId,
  type HeroVisual,
} from "./HeroVisual";

/**
 * Deterministic authoring contract for the R02 default actor. Geometry is
 * compiled locally from this grammar; no concept image or generated mesh is
 * sampled by the runtime.
 */
export const BEAUTY_HERO_ASSET_DNA = Object.freeze({
  schemaVersion: 1,
  id: "actor.beauty-cell.field-surveyor-01",
  generatorVersion: "grid-quantized-stylized-actor-v1",
  seed: "r02-surveyor-7429",
  rigFamily: "humanoid-v1",
  representation: "grid-quantized-modular-3d",
  unitStep: 0.25,
  role: "reclamation field surveyor",
  silhouette: [
    "asymmetric storm mantle",
    "compact analysis pack",
    "offset sensor mast",
    "armored field boots",
  ],
  materialGrammar: [
    "waxed teal cloth",
    "warm ceramic shell",
    "brushed utility metal",
    "cyan and amber diagnostic light",
  ],
  provenance: {
    source: "procedural runtime geometry",
    externalAssets: false,
    conceptImageUsedAtRuntime: false,
  },
} as const);

export const BEAUTY_COMPANION_ASSET_DNA = Object.freeze({
  schemaVersion: 1,
  id: "companion.beauty-cell.survey-hound-01",
  generatorVersion: "grid-quantized-stylized-actor-v1",
  seed: "r02-hound-3118",
  role: "recoverable terrain-analysis unit",
  bodyPlan: "four-legged survey robot",
  provenance: {
    source: "procedural runtime geometry",
    externalAssets: false,
  },
} as const);

type MaterialId =
  | "skin"
  | "hair"
  | "under"
  | "cloth"
  | "clothDark"
  | "shell"
  | "metal"
  | "copper"
  | "rubber"
  | "glass"
  | "cyan"
  | "amber"
  | "coral";

type ContractMesh = THREE.Mesh<THREE.BufferGeometry, THREE.Material[]>;

interface MaterialLibrary {
  readonly byId: Readonly<Record<MaterialId, THREE.Material>>;
  readonly contract: Readonly<Record<VoxelMaterialRole, THREE.Material>>;
  readonly originals: ReadonlyMap<THREE.Material, THREE.Color>;
  readonly owned: ReadonlySet<THREE.Material>;
}

interface PrimitiveOptions {
  readonly position: readonly [number, number, number];
  readonly rotation?: readonly [number, number, number];
  readonly scale?: readonly [number, number, number];
}

class PartBuilder {
  private readonly buckets = new Map<MaterialId, THREE.BufferGeometry[]>();

  public add(
    material: MaterialId,
    geometry: THREE.BufferGeometry,
    options: PrimitiveOptions,
  ): this {
    const normalized = geometry.index === null ? geometry : geometry.toNonIndexed();
    if (normalized !== geometry) {
      geometry.dispose();
      geometry = normalized;
    }
    // Actor materials are untextured. Dropping primitive-specific UV layouts
    // keeps rounded, capsule, and cylindrical pieces merge-compatible.
    geometry.deleteAttribute("uv");
    const position = options.position.map(snap) as [number, number, number];
    const rotation = options.rotation ?? [0, 0, 0];
    const scale = (options.scale ?? [1, 1, 1]).map(snap) as [
      number,
      number,
      number,
    ];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(...scale),
    );
    geometry.applyMatrix4(matrix);
    const bucket = this.buckets.get(material) ?? [];
    bucket.push(geometry);
    this.buckets.set(material, bucket);
    return this;
  }

  public rounded(
    material: MaterialId,
    size: readonly [number, number, number],
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    radius = 0.8,
  ): this {
    const [width, height, depth] = size.map(snap) as [number, number, number];
    return this.add(
      material,
      new RoundedBoxGeometry(
        width,
        height,
        depth,
        2,
        Math.min(radius, width * 0.24, height * 0.24, depth * 0.24),
      ),
      { position, rotation },
    );
  }

  public capsule(
    material: MaterialId,
    radius: number,
    height: number,
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    scale?: readonly [number, number, number],
  ): this {
    const snappedRadius = snap(radius);
    const snappedHeight = snap(height);
    return this.add(
      material,
      new THREE.CapsuleGeometry(
        snappedRadius,
        Math.max(0.25, snappedHeight - snappedRadius * 2),
        4,
        10,
      ),
      { position, rotation, scale },
    );
  }

  public sphere(
    material: MaterialId,
    radius: number,
    position: readonly [number, number, number],
    scale?: readonly [number, number, number],
  ): this {
    return this.add(
      material,
      new THREE.SphereGeometry(snap(radius), 14, 9),
      { position, scale },
    );
  }

  public cylinder(
    material: MaterialId,
    topRadius: number,
    bottomRadius: number,
    height: number,
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    radialSegments = 10,
  ): this {
    return this.add(
      material,
      new THREE.CylinderGeometry(
        snap(topRadius),
        snap(bottomRadius),
        snap(height),
        radialSegments,
        1,
      ),
      { position, rotation },
    );
  }

  public torus(
    material: MaterialId,
    radius: number,
    tube: number,
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    scale?: readonly [number, number, number],
  ): this {
    return this.add(
      material,
      new THREE.TorusGeometry(snap(radius), snap(tube), 6, 16),
      { position, rotation, scale },
    );
  }

  public build(
    name: string,
    materials: Readonly<Record<MaterialId, THREE.Material>>,
  ): ContractMesh {
    const materialIds = [...this.buckets.keys()];
    if (materialIds.length === 0) {
      throw new Error(`Cannot build empty actor part: ${name}`);
    }
    const materialGeometries: THREE.BufferGeometry[] = [];
    for (const materialId of materialIds) {
      const sources = this.buckets.get(materialId);
      if (sources === undefined) {
        continue;
      }
      const merged = mergeGeometries(sources, false);
      for (const source of sources) {
        source.dispose();
      }
      if (merged === null) {
        throw new Error(`Failed to merge actor material group: ${name}`);
      }
      materialGeometries.push(merged);
    }
    const geometry = mergeGeometries(materialGeometries, true);
    for (const materialGeometry of materialGeometries) {
      materialGeometry.dispose();
    }
    if (geometry === null) {
      throw new Error(`Failed to merge actor part: ${name}`);
    }
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(
      geometry,
      materialIds.map((materialId) => materials[materialId]),
    );
    mesh.name = name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }
}

function snap(value: number): number {
  return Math.round(value * 4) / 4;
}

function physical(
  color: THREE.ColorRepresentation,
  options: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0] = {},
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({ color, ...options });
}

function signal(color: THREE.ColorRepresentation, strength: number): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(strength),
    toneMapped: false,
  });
}

function createMaterialLibrary(): MaterialLibrary {
  const byId: Record<MaterialId, THREE.Material> = {
    skin: physical(0xc98668, {
      roughness: 0.52,
      sheen: 0.12,
      sheenColor: 0xffd8c4,
      sheenRoughness: 0.75,
    }),
    hair: physical(0x17252a, {
      roughness: 0.48,
      sheen: 0.52,
      sheenColor: 0x5a8c8e,
      sheenRoughness: 0.66,
    }),
    under: physical(0x172126, { roughness: 0.64 }),
    cloth: physical(0x2f706c, {
      roughness: 0.72,
      sheen: 0.46,
      sheenColor: 0x8bd1c4,
      sheenRoughness: 0.82,
    }),
    clothDark: physical(0x183b40, {
      roughness: 0.8,
      sheen: 0.28,
      sheenColor: 0x6b9f98,
      sheenRoughness: 0.9,
    }),
    shell: physical(0xd8d2bd, {
      roughness: 0.38,
      clearcoat: 0.24,
      clearcoatRoughness: 0.7,
    }),
    metal: physical(0x667b80, {
      roughness: 0.27,
      metalness: 0.86,
      clearcoat: 0.12,
      clearcoatRoughness: 0.36,
    }),
    copper: physical(0xac5439, {
      roughness: 0.32,
      metalness: 0.68,
    }),
    rubber: physical(0x0d1619, { roughness: 0.9 }),
    glass: physical(0x193d48, {
      roughness: 0.12,
      metalness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
    cyan: signal(0x62f4e1, 2.7),
    amber: signal(0xffb54d, 2.35),
    coral: signal(0xff7454, 2.1),
  };
  const originals = new Map<THREE.Material, THREE.Color>();
  for (const material of Object.values(byId)) {
    if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshStandardMaterial) {
      originals.set(material, material.color.clone());
    }
  }
  return {
    byId,
    contract: {
      matte: byId.cloth,
      metal: byId.metal,
      emissive: byId.cyan,
    },
    originals,
    owned: new Set(Object.values(byId)),
  };
}

function buildHeroParts(
  materials: Readonly<Record<MaterialId, THREE.Material>>,
): Readonly<Record<HeroPartId, ContractMesh>> {
  const head = new PartBuilder()
    .capsule("skin", 5.1, 10.5, [0, 5, 1.4], undefined, [0.92, 1, 0.88])
    .sphere("hair", 5.8, [0, 7.2, -1.35], [1, 1.02, 0.82])
    .rounded("hair", [9.5, 3.5, 3], [0, 10.25, 1.15], [0.08, 0, 0], 1.2)
    .capsule("hair", 1.45, 9, [-5, 3.4, -0.5], [0.08, 0, -0.18])
    .capsule("hair", 1.7, 12.5, [4.7, 2.1, -1], [-0.08, 0, 0.12])
    .rounded("glass", [8.5, 1.4, 0.8], [0, 6.3, 6.15], [0, 0, -0.04], 0.38)
    .rounded("cyan", [2.2, 0.45, 0.3], [2.35, 6.3, 6.65], undefined, 0.12)
    .rounded("copper", [1.25, 3.2, 1.5], [-5.2, 5.25, 0.8], [0, 0, 0.18], 0.4)
    .rounded("shell", [7, 1.4, 4.2], [0, -0.75, 0], undefined, 0.45)
    .build("beauty-hero-head", materials);

  const torso = new PartBuilder()
    .rounded("under", [12, 17, 7.5], [0, 5, 0], undefined, 2.4)
    .rounded("cloth", [7, 14.5, 2.2], [-3.7, 5.5, 4.1], [0, 0, -0.08], 1.05)
    .rounded("clothDark", [6.3, 14, 2.1], [3.5, 5.2, 4.15], [0, 0, 0.06], 1)
    .rounded("shell", [15.5, 4.2, 7.8], [0, 12.2, -0.1], undefined, 1.5)
    .rounded("under", [13.2, 4.6, 7.8], [0, -4.5, 0], undefined, 1.2)
    .rounded("copper", [1.1, 12.2, 0.85], [-1.2, 5.2, 5.45], [-0.04, 0, 0.11], 0.3)
    .rounded("metal", [7.4, 2.1, 1], [2.2, 9.2, 5.25], [0.02, 0, -0.06], 0.42)
    .rounded("cyan", [3.1, 0.65, 0.35], [3.5, 9.2, 5.85], undefined, 0.16)
    .rounded("amber", [1.1, 1.1, 0.35], [0.3, -2.8, 5.15], undefined, 0.22)
    .build("beauty-hero-torso", materials);

  function buildArm(side: -1 | 1): ContractMesh {
    const label = side < 0 ? "left" : "right";
    const builder = new PartBuilder()
      .sphere(side < 0 ? "cloth" : "clothDark", 3.7, [0, -1.2, 0], [1, 0.82, 1])
      .capsule(side < 0 ? "cloth" : "clothDark", 2.7, 11, [0, -6.5, 0], [0.02, 0, side * 0.035])
      .capsule("under", 2.3, 9.5, [0, -15.1, 0.3], [-0.04, 0, side * 0.025])
      .rounded("metal", [5.2, 5.8, 5.1], [0, -12.7, 0.8], undefined, 1.2)
      .capsule("rubber", 2.35, 5.2, [0, -20.3, 0.5])
      .rounded("shell", [4.3, 2.8, 4.7], [0, -19, 0.7], undefined, 0.9);
    if (side < 0) {
      builder
        .rounded("glass", [5.6, 1.2, 1.4], [-0.2, -12.3, 3.4], [0.08, 0, 0], 0.38)
        .rounded("cyan", [3.6, 0.42, 0.28], [-0.2, -12.3, 4.18], [0.08, 0, 0], 0.12);
    } else {
      builder.rounded("amber", [1.4, 2.8, 0.32], [2, -12.5, 3.5], undefined, 0.18);
    }
    return builder.build(`beauty-hero-${label}-arm`, materials);
  }

  function buildLeg(side: -1 | 1): ContractMesh {
    const label = side < 0 ? "left" : "right";
    return new PartBuilder()
      .capsule("under", 3.8, 14.5, [0, -7.2, 0], [0.03, 0, side * 0.025], [1, 1, 0.92])
      .rounded(side < 0 ? "cloth" : "clothDark", [7.7, 10.5, 7], [0, -5.4, 0], undefined, 1.9)
      .rounded("shell", [7.2, 5.3, 6.6], [0, -13, 1.1], [0.05, 0, 0], 1.45)
      .capsule("under", 3.1, 12, [0, -20.2, 0], [-0.035, 0, 0])
      .rounded("rubber", [8.2, 7.2, 11.2], [0, -27, 1.65], [0.03, 0, 0], 1.8)
      .rounded("metal", [7.5, 2, 8.8], [0, -24.2, 1], undefined, 0.65)
      .rounded(side < 0 ? "cyan" : "amber", [1.2, 3.2, 0.35], [side * 2.8, -23.8, 5.55], undefined, 0.16)
      .build(`beauty-hero-${label}-leg`, materials);
  }

  const equipment = new PartBuilder()
    .rounded("cloth", [10.5, 18, 2.2], [-6, -1, -3.9], [0.13, -0.08, -0.08], 1)
    .rounded("clothDark", [7.6, 16, 2], [4.5, -2.2, -4], [0.18, 0.08, 0.08], 0.9)
    .rounded("shell", [11.8, 15, 5.8], [0, 5.5, -6.1], [-0.05, 0, 0], 2)
    .rounded("metal", [8.6, 8.2, 1.8], [0, 6, -9.4], undefined, 0.8)
    .cylinder("metal", 0.85, 1, 15.5, [6, 14, -6], [0, 0, -0.08], 8)
    .sphere("glass", 2.1, [6.9, 21.5, -5.7], [0.8, 1, 0.8])
    .rounded("cyan", [1.2, 2.2, 0.5], [7, 21.6, -3.95], undefined, 0.22)
    .cylinder("copper", 1.25, 1.25, 8.2, [-7, 1.4, -6.6], [0, 0, 0.04], 10)
    .rounded("metal", [5.4, 7.2, 4.6], [7.2, -3.5, 0], [0, 0, -0.06], 1.1)
    .rounded("coral", [0.5, 2.8, 0.28], [9.95, -3.4, 1.4], undefined, 0.12)
    .build("beauty-hero-equipment", materials);

  return {
    head,
    torso,
    "left-arm": buildArm(-1),
    "right-arm": buildArm(1),
    "left-leg": buildLeg(-1),
    "right-leg": buildLeg(1),
    equipment,
  };
}

function applyTint(library: MaterialLibrary, color: THREE.ColorRepresentation): void {
  const tint = new THREE.Color(color);
  for (const [material, original] of library.originals) {
    if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshStandardMaterial) {
      material.color.copy(original).multiply(tint);
    }
  }
}

/** High-density, smooth procedural replacement for the voxel hero. */
export function createBeautyHeroVisual(): HeroVisual {
  const library = createMaterialLibrary();
  const root = new THREE.Group();
  root.name = BEAUTY_HERO_ASSET_DNA.id;
  root.userData.assetDNA = BEAUTY_HERO_ASSET_DNA;
  const motionRoot = new THREE.Group();
  motionRoot.name = "beauty-hero-motion";
  root.add(motionRoot);

  const groups = Object.fromEntries(
    HERO_PART_IDS.map((partId) => {
      const group = new THREE.Group();
      group.name = `beauty-hero-${partId}-pivot`;
      return [partId, group];
    }),
  ) as unknown as Record<HeroPartId, THREE.Group>;
  const basePositions: Record<HeroPartId, THREE.Vector3> = {
    head: new THREE.Vector3(0, 21, 0),
    torso: new THREE.Vector3(0, 34, 0),
    "left-arm": new THREE.Vector3(-10, 14, 0),
    "right-arm": new THREE.Vector3(10, 14, 0),
    "left-leg": new THREE.Vector3(-4.8, 30, 0),
    "right-leg": new THREE.Vector3(4.8, 30, 0),
    equipment: new THREE.Vector3(0, 0, 0),
  };
  motionRoot.add(groups.torso, groups["left-leg"], groups["right-leg"]);
  groups.torso.position.copy(basePositions.torso);
  groups["left-leg"].position.copy(basePositions["left-leg"]);
  groups["right-leg"].position.copy(basePositions["right-leg"]);
  for (const partId of ["head", "left-arm", "right-arm", "equipment"] as const) {
    groups.torso.add(groups[partId]);
    groups[partId].position.copy(basePositions[partId]);
  }

  const partMeshes = buildHeroParts(library.byId);
  for (const partId of HERO_PART_IDS) {
    groups[partId].add(partMeshes[partId]);
  }
  const weaponSocket = new THREE.Group();
  weaponSocket.name = "beauty-hero-right-hand-socket";
  weaponSocket.position.set(0, -21.5, 1.2);
  groups["right-arm"].add(weaponSocket);

  const visual: HeroVisual = {
    root,
    motionRoot,
    mode: "articulated",
    partGroups: groups,
    partMeshes,
    mergedMesh: null,
    weaponSocket,
    materials: library.contract,
    updatePose(input: HeroAnimationInput): void {
      const pose = sampleHeroPose(input);
      motionRoot.position.set(...pose.root.position);
      motionRoot.rotation.set(...pose.root.rotation);
      motionRoot.scale.set(...pose.root.scale);
      for (const partId of HERO_PART_IDS) {
        const partPose = pose.parts[partId];
        groups[partId].position.set(
          basePositions[partId].x + partPose.position[0],
          basePositions[partId].y + partPose.position[1],
          basePositions[partId].z + partPose.position[2],
        );
        groups[partId].rotation.set(...partPose.rotation);
        groups[partId].scale.set(...partPose.scale);
      }
      const movement = THREE.MathUtils.clamp(input.moveAmount ?? 0, 0, 1);
      groups.equipment.rotation.x +=
        Math.sin(input.timeSeconds * 5.8) * (0.018 + movement * 0.025);
      groups.head.rotation.y += Math.sin(input.timeSeconds * 0.7) * 0.018;
    },
    attachWeapon(object: THREE.Object3D, gripLocal: VoxelPoint = { x: 0, y: 0, z: 0 }): void {
      weaponSocket.add(object);
      alignObjectGripToSocket(object, gripLocal);
    },
    setTint(color: THREE.ColorRepresentation): void {
      applyTint(library, color);
    },
    dispose(): void {
      for (const mesh of Object.values(partMeshes)) {
        mesh.geometry.dispose();
      }
      for (const material of library.owned) {
        material.dispose();
      }
      root.removeFromParent();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0 });
  return visual;
}

export interface BeautyCompanionVisual {
  readonly root: THREE.Group;
  readonly motionRoot: THREE.Group;
  readonly sensorHead: THREE.Group;
  readonly legGroups: readonly [THREE.Group, THREE.Group, THREE.Group, THREE.Group];
  updatePose(input: {
    readonly timeSeconds: number;
    readonly moveAmount?: number;
    readonly reaction?: number;
  }): void;
  setTint(color: THREE.ColorRepresentation): void;
  dispose(): void;
}

/** Recoverable survey-hound candidate; gameplay decides whether it is present. */
export function createBeautyCompanionVisual(): BeautyCompanionVisual {
  const library = createMaterialLibrary();
  const root = new THREE.Group();
  root.name = BEAUTY_COMPANION_ASSET_DNA.id;
  root.userData.assetDNA = BEAUTY_COMPANION_ASSET_DNA;
  const motionRoot = new THREE.Group();
  motionRoot.name = "beauty-companion-motion";
  root.add(motionRoot);

  const meshes: ContractMesh[] = [];
  const body = new PartBuilder()
    .rounded("shell", [22, 11, 13], [0, 15, 0], undefined, 2.8)
    .rounded("metal", [17, 4, 10], [0, 10, 0], undefined, 1.2)
    .rounded("cloth", [11, 6, 9], [-3, 20.5, -0.5], undefined, 1.4)
    .rounded("copper", [2, 7, 9.5], [5.2, 17.5, 0], undefined, 0.55)
    .rounded("cyan", [6, 0.65, 0.35], [-3, 21.6, 4.6], undefined, 0.18)
    .build("beauty-companion-body", library.byId);
  meshes.push(body);
  motionRoot.add(body);

  const sensorHead = new THREE.Group();
  sensorHead.name = "beauty-companion-sensor-head";
  sensorHead.position.set(0, 17, 8.5);
  const head = new PartBuilder()
    .rounded("shell", [13, 9, 10], [0, 0, 0], [-0.1, 0, 0], 2.3)
    .rounded("glass", [9, 2, 0.9], [0, 1, 5.1], undefined, 0.5)
    .rounded("cyan", [6.6, 0.55, 0.32], [0, 1, 5.65], undefined, 0.16)
    .cylinder("metal", 0.6, 0.75, 8, [4.3, 7.2, -1], [0, 0, -0.13], 8)
    .sphere("amber", 1.1, [4.8, 11, -0.9])
    .build("beauty-companion-head", library.byId);
  meshes.push(head);
  sensorHead.add(head);
  motionRoot.add(sensorHead);

  const legGroups = [
    new THREE.Group(),
    new THREE.Group(),
    new THREE.Group(),
    new THREE.Group(),
  ] as [THREE.Group, THREE.Group, THREE.Group, THREE.Group];
  const legPositions = [
    [-7.2, 12, 4.5],
    [7.2, 12, 4.5],
    [-7.2, 12, -4.5],
    [7.2, 12, -4.5],
  ] as const;
  for (let index = 0; index < legGroups.length; index += 1) {
    const group = legGroups[index];
    const position = legPositions[index];
    if (group === undefined || position === undefined) {
      continue;
    }
    group.name = `beauty-companion-leg-${index + 1}`;
    group.position.set(position[0], position[1], position[2]);
    const leg = new PartBuilder()
      .capsule("metal", 1.6, 9.5, [0, -4, 0], [0, 0, index % 2 === 0 ? -0.13 : 0.13])
      .rounded("shell", [4.5, 4.2, 5], [0, -7.5, 0.4], undefined, 1)
      .capsule("rubber", 1.45, 8, [0, -11.8, 1.6], [0.35, 0, 0])
      .rounded("rubber", [5.2, 2.8, 7], [0, -15.2, 3], [0.08, 0, 0], 0.9)
      .rounded(index < 2 ? "cyan" : "amber", [0.55, 2.2, 0.3], [2.35, -7.4, 1.5], undefined, 0.12)
      .build(`beauty-companion-leg-mesh-${index + 1}`, library.byId);
    meshes.push(leg);
    group.add(leg);
    motionRoot.add(group);
  }

  return {
    root,
    motionRoot,
    sensorHead,
    legGroups,
    updatePose({ timeSeconds, moveAmount = 0, reaction = 0 }): void {
      const move = THREE.MathUtils.clamp(moveAmount, 0, 1);
      const pulse = THREE.MathUtils.clamp(reaction, 0, 1);
      motionRoot.position.y = Math.sin(timeSeconds * 3.2) * 0.45;
      motionRoot.rotation.z = Math.sin(timeSeconds * 2.1) * 0.012;
      sensorHead.rotation.y = Math.sin(timeSeconds * 1.15) * 0.22;
      sensorHead.rotation.x = -0.06 + Math.sin(timeSeconds * 1.9) * 0.035;
      for (let index = 0; index < legGroups.length; index += 1) {
        const phase = index === 0 || index === 3 ? 0 : Math.PI;
        const legGroup = legGroups[index];
        if (legGroup !== undefined) {
          legGroup.rotation.x = Math.sin(timeSeconds * 8.2 + phase) * 0.4 * move;
        }
      }
      root.scale.setScalar(1 + Math.sin(pulse * Math.PI) * 0.035);
    },
    setTint(color): void {
      applyTint(library, color);
    },
    dispose(): void {
      for (const mesh of meshes) {
        mesh.geometry.dispose();
      }
      for (const material of library.owned) {
        material.dispose();
      }
      root.removeFromParent();
    },
  };
}

/**
 * Technical field tools authored around the local origin grip. The long axis
 * is local -Y, matching the relaxed right-arm socket; no sword silhouette is
 * used. Callers own the returned group and may invoke userData.dispose().
 */
export function createBeautyWeaponVisual(kind: "blade" | "impact"): THREE.Group {
  const library = createMaterialLibrary();
  const root = new THREE.Group();
  root.name = kind === "blade" ? "resonance-seam-cutter" : "coil-anchor-driver";
  root.userData.kind = kind;
  root.userData.gripAnchor = { x: 0, y: 0, z: 0 } satisfies VoxelPoint;
  root.userData.longAxis = "-Y";
  const builder = new PartBuilder()
    .rounded("rubber", [4.2, 8, 4.4], [0, -3, 0], undefined, 1)
    .rounded("metal", [5.8, 6.8, 5.6], [0, -9.2, 0], undefined, 1.25)
    .rounded("copper", [1.1, 5, 5.9], [2.8, -9.2, 0], undefined, 0.3);
  if (kind === "blade") {
    builder
      .rounded("metal", [5.5, 24, 2.8], [0, -24, 0], undefined, 0.75)
      .rounded("shell", [3.8, 18, 3.5], [0, -22, 0], undefined, 0.8)
      .rounded("cyan", [0.7, 22, 0.38], [2.2, -24, 1.65], undefined, 0.15)
      .rounded("amber", [3, 1.1, 0.35], [0, -14, 2], undefined, 0.16);
  } else {
    builder
      .rounded("metal", [8, 20, 8], [0, -21, 0], undefined, 1.6)
      .rounded("shell", [6.5, 12, 8.8], [0, -18, 0], undefined, 1.4)
      .cylinder("copper", 4.4, 4.4, 2, [0, -16.5, 0], undefined, 12)
      .cylinder("copper", 4.4, 4.4, 2, [0, -23, 0], undefined, 12)
      .rounded("coral", [1, 8, 0.4], [4.2, -21, 2.5], undefined, 0.18)
      .rounded("metal", [3.8, 12, 3.8], [0, -36, 0], undefined, 0.7);
  }
  const mesh = builder.build(`${root.name}-mesh`, library.byId);
  root.add(mesh);
  root.userData.dispose = (): void => {
    mesh.geometry.dispose();
    for (const material of library.owned) {
      material.dispose();
    }
    root.removeFromParent();
  };
  return root;
}
