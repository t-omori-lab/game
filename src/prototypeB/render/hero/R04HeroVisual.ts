import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { VoxelPoint } from "../../voxel";
import { createBeautyHeroVisual } from "./BeautyHeroVisual";
import type { HeroAnimationInput, HeroVisual } from "./HeroVisual";

/**
 * R04's authored contract: a realtime, fully articulated successor to the R03
 * concept sprite. The front of the actor is local +Z, matching the existing
 * player facing transform and right-hand weapon rig.
 */
export const R04_HERO_ASSET_DNA = Object.freeze({
  schemaVersion: 1,
  id: "actor.r04.mio-field-engineer-01",
  generatorVersion: "procedural-stylized-hero-r04-v1",
  seed: "mio-r04-augmented-surveyor-0417",
  rigFamily: "humanoid-v1",
  representation: "realtime-articulated-procedural-3d",
  frontAxis: "+Z",
  role: "reclamation field engineer",
  characterRead: [
    "cute young woman with an alert, optimistic expression",
    "slightly oversized head and slim field-ready silhouette",
    "layered dark hair with a rust textile tie",
    "pale expedition coat over a technical under-suit",
    "compact analysis pack and asymmetrical SF tools",
  ],
  faceGrammar: [
    "large white-and-amber eyes",
    "independent brows",
    "readable mouth and cheek color",
    "procedural blink and action expressions",
  ],
  provenance: {
    source: "procedural runtime geometry",
    externalAssets: false,
    r03SpriteUsedAtRuntime: false,
  },
} as const);

type R04MaterialId =
  | "skinShade"
  | "eyeWhite"
  | "iris"
  | "pupil"
  | "catchlight"
  | "brow"
  | "lip"
  | "blush"
  | "hair"
  | "hairLight"
  | "coatPale"
  | "coatShadow"
  | "rustTextile"
  | "underSuit"
  | "metal"
  | "glass"
  | "cyan"
  | "amber";

type DetailMesh = THREE.Mesh<THREE.BufferGeometry, THREE.Material[]>;

interface PrimitiveTransform {
  readonly position: readonly [number, number, number];
  readonly rotation?: readonly [number, number, number];
  readonly scale?: readonly [number, number, number];
}

interface R04MaterialLibrary {
  readonly byId: Readonly<Record<R04MaterialId, THREE.Material>>;
  readonly originals: ReadonlyMap<THREE.Material, THREE.Color>;
  readonly owned: ReadonlySet<THREE.Material>;
}

export interface R04FacialRig {
  readonly eyes: readonly [THREE.Group, THREE.Group];
  readonly brows: readonly [THREE.Group, THREE.Group];
  readonly mouth: THREE.Group;
  readonly ponytail: THREE.Group;
  readonly coatTails: readonly [THREE.Group, THREE.Group];
}

export interface R04HeroVisual extends HeroVisual {
  readonly facialRig: R04FacialRig;
}

class DetailBuilder {
  private readonly buckets = new Map<R04MaterialId, THREE.BufferGeometry[]>();

  public add(
    materialId: R04MaterialId,
    geometry: THREE.BufferGeometry,
    transform: PrimitiveTransform,
  ): this {
    const nonIndexed = geometry.index === null ? geometry : geometry.toNonIndexed();
    if (nonIndexed !== geometry) {
      geometry.dispose();
      geometry = nonIndexed;
    }
    geometry.deleteAttribute("uv");
    geometry.applyMatrix4(
      new THREE.Matrix4().compose(
        new THREE.Vector3(...transform.position),
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(...(transform.rotation ?? [0, 0, 0])),
        ),
        new THREE.Vector3(...(transform.scale ?? [1, 1, 1])),
      ),
    );
    const bucket = this.buckets.get(materialId) ?? [];
    bucket.push(geometry);
    this.buckets.set(materialId, bucket);
    return this;
  }

  public rounded(
    materialId: R04MaterialId,
    size: readonly [number, number, number],
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    radius = 0.6,
  ): this {
    const [width, height, depth] = size;
    return this.add(
      materialId,
      new RoundedBoxGeometry(
        width,
        height,
        depth,
        3,
        Math.min(radius, width * 0.24, height * 0.24, depth * 0.24),
      ),
      { position, rotation },
    );
  }

  public capsule(
    materialId: R04MaterialId,
    radius: number,
    height: number,
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
    scale?: readonly [number, number, number],
  ): this {
    return this.add(
      materialId,
      new THREE.CapsuleGeometry(
        radius,
        Math.max(0.2, height - radius * 2),
        6,
        14,
      ),
      { position, rotation, scale },
    );
  }

  public sphere(
    materialId: R04MaterialId,
    radius: number,
    position: readonly [number, number, number],
    scale?: readonly [number, number, number],
  ): this {
    return this.add(
      materialId,
      new THREE.SphereGeometry(radius, 20, 14),
      { position, scale },
    );
  }

  public cylinder(
    materialId: R04MaterialId,
    radius: number,
    height: number,
    position: readonly [number, number, number],
    rotation?: readonly [number, number, number],
  ): this {
    return this.add(
      materialId,
      new THREE.CylinderGeometry(radius, radius, height, 14, 1),
      { position, rotation },
    );
  }

  public build(
    name: string,
    materials: Readonly<Record<R04MaterialId, THREE.Material>>,
  ): DetailMesh {
    const materialIds = [...this.buckets.keys()];
    if (materialIds.length === 0) {
      throw new Error(`Cannot build empty R04 detail mesh: ${name}`);
    }
    const grouped: THREE.BufferGeometry[] = [];
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
        throw new Error(`Failed to merge R04 material group: ${name}`);
      }
      grouped.push(merged);
    }
    const geometry = mergeGeometries(grouped, true);
    for (const group of grouped) {
      group.dispose();
    }
    if (geometry === null) {
      throw new Error(`Failed to merge R04 detail mesh: ${name}`);
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

function physical(
  color: THREE.ColorRepresentation,
  options: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0] = {},
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({ color, ...options });
}

function signal(
  color: THREE.ColorRepresentation,
  strength: number,
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(strength),
    toneMapped: false,
  });
}

function createR04Materials(): R04MaterialLibrary {
  const byId: Record<R04MaterialId, THREE.Material> = {
    skinShade: physical(0xd78772, { roughness: 0.5 }),
    eyeWhite: signal(0xfff8e8, 1.45),
    iris: signal(0x7a402f, 1.08),
    pupil: physical(0x151719, { roughness: 0.24 }),
    catchlight: signal(0xffffff, 3.1),
    brow: physical(0x8a675b, { roughness: 0.62 }),
    lip: physical(0x8c3f44, { roughness: 0.48 }),
    blush: physical(0xda756c, { roughness: 0.64 }),
    hair: physical(0xd8d1c3, {
      roughness: 0.38,
      sheen: 0.72,
      sheenColor: 0xffe6bf,
      sheenRoughness: 0.58,
    }),
    hairLight: physical(0xf1ddbc, {
      roughness: 0.42,
      sheen: 0.55,
      sheenColor: 0xfff2d4,
      sheenRoughness: 0.62,
    }),
    coatPale: physical(0xd6d8c7, {
      roughness: 0.67,
      sheen: 0.38,
      sheenColor: 0xf2f0d8,
      sheenRoughness: 0.76,
    }),
    coatShadow: physical(0x9ba49a, {
      roughness: 0.76,
      sheen: 0.22,
      sheenColor: 0xd4ddcf,
    }),
    rustTextile: physical(0xa64f39, {
      roughness: 0.78,
      sheen: 0.32,
      sheenColor: 0xe58b64,
      sheenRoughness: 0.82,
    }),
    underSuit: physical(0x20282b, { roughness: 0.72 }),
    metal: physical(0x687a7c, {
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.2,
      clearcoatRoughness: 0.24,
    }),
    glass: physical(0x28505a, {
      roughness: 0.08,
      metalness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    }),
    cyan: signal(0x65f4e5, 2.8),
    amber: signal(0xffb95b, 2.45),
  };
  const originals = new Map<THREE.Material, THREE.Color>();
  for (const material of Object.values(byId)) {
    if (
      material instanceof THREE.MeshBasicMaterial ||
      material instanceof THREE.MeshStandardMaterial
    ) {
      originals.set(material, material.color.clone());
    }
  }
  return {
    byId,
    originals,
    owned: new Set(Object.values(byId)),
  };
}

function buildEye(
  side: -1 | 1,
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): { readonly group: THREE.Group; readonly mesh: DetailMesh } {
  const group = new THREE.Group();
  group.name = side < 0 ? "r04-face-eye-left" : "r04-face-eye-right";
  group.position.set(side * 2.25, 6.15, 6.82);
  const mesh = new DetailBuilder()
    .sphere("eyeWhite", 1.5, [0, 0, 0], [1.32, 0.82, 0.28])
    .sphere("iris", 0.52, [-side * 0.02, -0.08, 0.46], [0.78, 1, 0.22])
    .sphere("pupil", 0.24, [-side * 0.02, -0.09, 0.64], [0.7, 1, 0.18])
    .sphere("catchlight", 0.15, [-side * 0.13, 0.16, 0.76], [0.75, 1, 0.16])
    .build(`${group.name}-mesh`, materials);
  group.add(mesh);
  return { group, mesh };
}

function buildBrow(
  side: -1 | 1,
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): { readonly group: THREE.Group; readonly mesh: DetailMesh } {
  const group = new THREE.Group();
  group.name = side < 0 ? "r04-face-brow-left" : "r04-face-brow-right";
  group.position.set(side * 2.2, 8.38, 7.05);
  const mesh = new DetailBuilder()
    .capsule("brow", 0.1, 1.72, [0, 0, 0], [0, 0, Math.PI / 2])
    .build(`${group.name}-mesh`, materials);
  group.rotation.z = -side * 0.11;
  group.add(mesh);
  return { group, mesh };
}

function buildMouth(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): { readonly group: THREE.Group; readonly mesh: DetailMesh } {
  const group = new THREE.Group();
  group.name = "r04-face-mouth";
  group.position.set(0, 3.45, 6.78);
  const mesh = new DetailBuilder()
    .capsule("lip", 0.13, 1.65, [0, 0.1, 0], [0, 0, Math.PI / 2])
    .capsule("blush", 0.1, 0.9, [0.18, -0.12, 0.08], [0, 0, Math.PI / 2])
    .build("r04-face-mouth-mesh", materials);
  group.add(mesh);
  return { group, mesh };
}

function buildFaceAccents(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): DetailMesh {
  return new DetailBuilder()
    .sphere("skinShade", 0.38, [0, 4.85, 6.72], [0.72, 1, 0.32])
    .sphere("blush", 0.72, [-3.42, 4.55, 6.45], [1.2, 0.45, 0.2])
    .sphere("blush", 0.72, [3.42, 4.55, 6.45], [1.2, 0.45, 0.2])
    .rounded("rustTextile", [1.25, 2.9, 1.25], [-5.45, 5.35, 0.7], [0, 0, 0.18], 0.42)
    .build("r04-face-accents", materials);
}

function buildFringe(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): DetailMesh {
  return new DetailBuilder()
    .capsule("hair", 0.78, 4.2, [-3.7, 10.1, 5.25], [0.18, 0.08, -0.5], [1, 1, 0.72])
    .capsule("hair", 0.82, 4.55, [-1.75, 10.35, 6.2], [0.12, 0.05, -0.22], [1, 1, 0.68])
    .capsule("hairLight", 0.72, 4.15, [0.2, 10.55, 6.35], [0.1, 0, 0.08], [1, 1, 0.65])
    .capsule("hair", 0.82, 4.5, [2, 10.3, 6], [0.13, -0.04, 0.3], [1, 1, 0.68])
    .capsule("hair", 0.72, 4, [3.75, 9.95, 5.1], [0.18, -0.08, 0.5], [1, 1, 0.7])
    .capsule("hairLight", 0.38, 3.2, [-0.9, 11, 6.82], [0.1, 0, -0.08], [1, 1, 0.55])
    .build("r04-layered-fringe", materials);
}

function buildPonytail(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): { readonly group: THREE.Group; readonly mesh: DetailMesh } {
  const group = new THREE.Group();
  group.name = "r04-layered-ponytail";
  group.position.set(4.65, 9.3, -3.2);
  const mesh = new DetailBuilder()
    .sphere("rustTextile", 1.28, [0, 0, 0], [0.86, 1, 0.86])
    .capsule("hair", 1.65, 8.8, [2.1, -1.6, -0.4], [-0.08, 0.12, -0.55], [1, 1, 0.86])
    .capsule("hairLight", 1.25, 7.4, [4.1, -4.5, -0.9], [-0.12, 0.15, -0.68], [1, 1, 0.82])
    .capsule("hair", 1.1, 6.2, [5.35, -7.1, -1.4], [-0.16, 0.1, -0.82], [1, 1, 0.78])
    .build("r04-layered-ponytail-mesh", materials);
  group.add(mesh);
  return { group, mesh };
}

function buildTorsoOverlay(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): DetailMesh {
  return new DetailBuilder()
    .rounded("coatPale", [4.9, 13.8, 1.55], [-3.45, 4.7, 5.5], [0.03, 0.06, -0.08], 0.72)
    .rounded("coatPale", [4.4, 12.7, 1.5], [3.35, 4.2, 5.52], [0.03, -0.06, 0.07], 0.7)
    .rounded("coatShadow", [9.4, 2.3, 1.45], [0, 11.65, 5.15], [0.08, 0, 0], 0.55)
    .rounded("rustTextile", [1.25, 13.8, 0.8], [-0.65, 4.5, 6.38], [-0.03, 0, 0.09], 0.27)
    .rounded("underSuit", [4.6, 7.8, 0.8], [0.45, 0.8, 6.14], undefined, 0.35)
    .rounded("metal", [5.1, 1.5, 0.65], [2.4, 8.65, 6.3], [0, 0, -0.08], 0.3)
    .rounded("glass", [3.4, 1.2, 0.42], [2.65, 8.65, 6.72], undefined, 0.22)
    .rounded("cyan", [2.3, 0.35, 0.2], [2.7, 8.66, 6.98], undefined, 0.08)
    .rounded("amber", [0.65, 0.65, 0.22], [0.25, -2.2, 6.1], undefined, 0.12)
    .build("r04-pale-coat-torso-overlay", materials);
}

function buildCoatTail(
  side: -1 | 1,
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): { readonly group: THREE.Group; readonly mesh: DetailMesh } {
  const group = new THREE.Group();
  group.name = side < 0 ? "r04-coat-tail-left" : "r04-coat-tail-right";
  group.position.set(side * 3.8, -1.8, 1.1);
  const mesh = new DetailBuilder()
    .rounded("coatPale", [6.2, 16.5, 1.8], [0, -7.5, 0], [0.11, side * 0.04, side * 0.08], 0.72)
    .rounded("coatShadow", [1.25, 13.4, 0.5], [-side * 2.15, -7, 1.02], [0.1, 0, side * 0.08], 0.2)
    .rounded("rustTextile", [0.8, 5.6, 0.4], [side * 2.45, -9.2, 1.12], [0.1, 0, side * 0.08], 0.14)
    .build(`${group.name}-mesh`, materials);
  group.add(mesh);
  return { group, mesh };
}

function buildPackAndTools(
  materials: Readonly<Record<R04MaterialId, THREE.Material>>,
): DetailMesh {
  return new DetailBuilder()
    .rounded("coatShadow", [10.4, 13.2, 5.8], [0, 4.8, -9.15], [-0.04, 0, 0], 1.6)
    .rounded("coatPale", [8.8, 9.8, 2], [0, 5, -12.8], undefined, 0.75)
    .rounded("metal", [7.2, 4.4, 1.1], [0, 7.8, -14.35], undefined, 0.46)
    .rounded("cyan", [4.2, 0.5, 0.24], [-0.4, 8.15, -14.96], undefined, 0.1)
    .cylinder("metal", 0.72, 13.5, [5.6, 14.2, -10.4], [0, 0, -0.08])
    .sphere("glass", 1.65, [6.2, 21, -10.1], [0.82, 1, 0.82])
    .sphere("amber", 0.52, [6.25, 21.2, -8.62])
    .rounded("metal", [4.8, 7.5, 3.2], [-7.2, -4.2, 1.1], [0, 0, -0.08], 0.8)
    .rounded("glass", [3.4, 4.6, 0.6], [-7.3, -3.8, 2.95], undefined, 0.3)
    .rounded("cyan", [2.2, 0.35, 0.2], [-7.3, -3.8, 3.32], undefined, 0.08)
    .cylinder("rustTextile", 1.1, 7.2, [7.2, -4.6, -2], [0, 0, 0.05])
    .rounded("amber", [0.4, 2.7, 0.24], [8.28, -4.5, -0.8], undefined, 0.1)
    .build("r04-analysis-pack-and-tools", materials);
}

function tintMaterials(
  library: R04MaterialLibrary,
  color: THREE.ColorRepresentation,
): void {
  const tint = new THREE.Color(color);
  for (const [material, original] of library.originals) {
    if (
      material instanceof THREE.MeshBasicMaterial ||
      material instanceof THREE.MeshStandardMaterial
    ) {
      material.color.copy(original).multiply(tint);
    }
  }
}

function normalizedProgress(input: HeroAnimationInput): number {
  return THREE.MathUtils.clamp(
    Number.isFinite(input.progress) ? (input.progress ?? 0) : 0,
    0,
    1,
  );
}

/** Creates the R04 high-detail female SF protagonist using realtime 3D only. */
export function createR04HeroVisual(): R04HeroVisual {
  const base = createBeautyHeroVisual();
  const library = createR04Materials();
  const detailMeshes: DetailMesh[] = [];
  const head = base.partGroups.head;
  const torso = base.partGroups.torso;
  const equipment = base.partGroups.equipment;

  base.root.name = R04_HERO_ASSET_DNA.id;
  base.root.userData.assetDNA = R04_HERO_ASSET_DNA;
  base.root.userData.frontAxis = R04_HERO_ASSET_DNA.frontAxis;
  base.root.userData.runtimeRepresentation = R04_HERO_ASSET_DNA.representation;

  // R04 proportions: larger expressive head, narrower shoulders and limbs.
  base.partMeshes.head?.scale.set(1.22, 1.16, 1.1);
  base.partMeshes.torso?.scale.set(0.79, 1.03, 0.88);
  base.partMeshes["left-arm"]?.scale.set(0.74, 1.01, 0.78);
  base.partMeshes["right-arm"]?.scale.set(0.74, 1.01, 0.78);
  base.partMeshes["left-leg"]?.scale.set(0.81, 1.03, 0.86);
  base.partMeshes["right-leg"]?.scale.set(0.81, 1.03, 0.86);
  base.partMeshes.equipment?.scale.set(0.93, 1, 0.94);

  // The inherited material starts intentionally weathered for R02. R04 keeps
  // that rig but lifts the face into the pale, warm range used by Concept C so
  // eyes and expression remain readable at the pulled-back gameplay camera.
  const headMaterials = Array.isArray(base.partMeshes.head?.material)
    ? base.partMeshes.head.material
    : [];
  const inheritedSkin = headMaterials[0];
  const inheritedHair = headMaterials[1];
  const inheritedVisor = headMaterials[2];
  if (inheritedVisor instanceof THREE.MeshPhysicalMaterial) {
    inheritedVisor.name = "r04-inherited-visor-neutralized";
    inheritedVisor.color.setHex(0x9bd6d2);
    inheritedVisor.transparent = true;
    inheritedVisor.opacity = 0.1;
    inheritedVisor.depthWrite = false;
  }

  const leftEye = buildEye(-1, library.byId);
  const rightEye = buildEye(1, library.byId);
  const leftBrow = buildBrow(-1, library.byId);
  const rightBrow = buildBrow(1, library.byId);
  const mouth = buildMouth(library.byId);
  const faceAccents = buildFaceAccents(library.byId);
  const fringe = buildFringe(library.byId);
  const ponytail = buildPonytail(library.byId);
  head.add(
    leftEye.group,
    rightEye.group,
    leftBrow.group,
    rightBrow.group,
    mouth.group,
    faceAccents,
    fringe,
    ponytail.group,
  );
  detailMeshes.push(
    leftEye.mesh,
    rightEye.mesh,
    leftBrow.mesh,
    rightBrow.mesh,
    mouth.mesh,
    faceAccents,
    fringe,
    ponytail.mesh,
  );

  const torsoOverlay = buildTorsoOverlay(library.byId);
  torso.add(torsoOverlay);
  detailMeshes.push(torsoOverlay);

  const leftTail = buildCoatTail(-1, library.byId);
  const rightTail = buildCoatTail(1, library.byId);
  const packAndTools = buildPackAndTools(library.byId);
  equipment.add(leftTail.group, rightTail.group, packAndTools);
  detailMeshes.push(leftTail.mesh, rightTail.mesh, packAndTools);

  const facialRig: R04FacialRig = {
    eyes: [leftEye.group, rightEye.group],
    brows: [leftBrow.group, rightBrow.group],
    mouth: mouth.group,
    ponytail: ponytail.group,
    coatTails: [leftTail.group, rightTail.group],
  };

  const updatePose = (input: HeroAnimationInput): void => {
    base.updatePose(input);

    // Narrow the inherited joint layout without changing its animation math.
    base.partGroups.head.position.y += 1.25;
    base.partGroups["left-arm"].position.x += 1.15;
    base.partGroups["right-arm"].position.x -= 1.15;
    base.partGroups["left-leg"].position.x += 0.55;
    base.partGroups["right-leg"].position.x -= 0.55;

    const progress = normalizedProgress(input);
    const move = THREE.MathUtils.clamp(input.moveAmount ?? 0, 0, 1);
    const blinkClock = ((input.timeSeconds + 0.35) % 4.1 + 4.1) % 4.1;
    const blink = blinkClock < 0.17
      ? Math.sin((blinkClock / 0.17) * Math.PI)
      : 0;
    const hurt = input.motion === "hurt" ? Math.sin(progress * Math.PI) : 0;
    const skill = input.motion === "skill" ? Math.sin(progress * Math.PI) : 0;
    const focus =
      input.motion === "windup" || input.motion === "hit" ? 1 : 0;
    const eyeScaleY = Math.max(0.12, 1 - blink * 0.9 - hurt * 0.38);
    leftEye.group.scale.set(1 + skill * 0.08, eyeScaleY + skill * 0.08, 1);
    rightEye.group.scale.copy(leftEye.group.scale);

    leftBrow.group.rotation.z = -0.11 - focus * 0.18 + hurt * 0.28 - skill * 0.08;
    rightBrow.group.rotation.z = 0.11 + focus * 0.18 - hurt * 0.28 + skill * 0.08;
    leftBrow.group.position.y = 8.38 + hurt * 0.32;
    rightBrow.group.position.y = 8.38 + hurt * 0.32;
    mouth.group.scale.set(
      1 - focus * 0.18 + skill * 0.12,
      1 + hurt * 1.05 + skill * 0.72,
      1,
    );
    mouth.group.rotation.z = hurt * -0.08;

    const stride = Math.sin(input.timeSeconds * 10.5) * move;
    ponytail.group.rotation.x = -0.12 + Math.abs(stride) * 0.12 + skill * 0.16;
    ponytail.group.rotation.z = -0.08 - stride * 0.16 + hurt * 0.22;
    leftTail.group.rotation.x = 0.05 + Math.abs(stride) * 0.14 + skill * 0.2;
    rightTail.group.rotation.x = 0.04 + Math.abs(stride) * 0.12 + skill * 0.18;
    leftTail.group.rotation.z = -stride * 0.055;
    rightTail.group.rotation.z = stride * 0.055;
  };

  const visual: R04HeroVisual = {
    ...base,
    facialRig,
    updatePose,
    attachWeapon(object: THREE.Object3D, gripLocal?: VoxelPoint): void {
      base.attachWeapon(object, gripLocal);
    },
    setTint(color: THREE.ColorRepresentation): void {
      base.setTint(color);
      if (inheritedSkin instanceof THREE.MeshStandardMaterial) {
        inheritedSkin.color
          .setHex(0xefb18f)
          .multiply(new THREE.Color(color));
      }
      if (inheritedHair instanceof THREE.MeshStandardMaterial) {
        inheritedHair.color
          .setHex(0xb9afa2)
          .multiply(new THREE.Color(color));
      }
      tintMaterials(library, color);
    },
    dispose(): void {
      for (const mesh of detailMeshes) {
        mesh.geometry.dispose();
      }
      for (const material of library.owned) {
        material.dispose();
      }
      base.dispose();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}
