import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { VoxelMaterialRole, VoxelPoint } from "../../voxel";
import {
  alignObjectGripToSocket,
  sampleHeroPose,
  type HeroAnimationInput,
  type HeroPartId,
  type HeroVisual,
} from "./HeroVisual";
import {
  R05_VOXEL_CELL,
  R05_VOXEL_COUNT,
  R05_VOXEL_DATA_BASE64,
  R05_VOXEL_PARTS,
  R05_VOXEL_PIVOTS,
  R05_VOXEL_ROLES,
} from "./R05VoxelAvatarData.generated";

export const R05_FRAM_HERO_ASSET_DNA = Object.freeze({
  schemaVersion: 2,
  id: "actor.fram.module-f01.archive-runner",
  generatorVersion: "cc0-rig-guided-articulated-voxel-surface-v2",
  seed: "fram-f01-rain-garden-0501",
  rigFamily: "humanoid-fram-voxel-v2",
  representation: "high-density-articulated-voxel-surface",
  frontAxis: "+z" as const,
  bodyRatioHeads: 4.8,
  voxelCellCount: R05_VOXEL_COUNT,
  role: "embodied frontier relic archive module",
  silhouette: [
    "fine-cell white hair and readable three-quarter head shape",
    "long split expedition coat with coral field textile",
    "slim articulated limbs, dark boots and luminous relic blade",
    "compact archive pack with restrained cyan record signal",
  ],
  materialGrammar: [
    "warm skin and bright facial pixels",
    "white and pearl hair with cool shadow cells",
    "pale sage technical coat with graphite under-suit",
    "coral field textile, weathered metal and cyan archive light",
  ],
  provenance: {
    visibleRuntimeSource: "generated voxel cells only",
    anatomicalScaffold: "Quaternius Universal Base Characters Standard",
    scaffoldLicense: "CC0-1.0",
    sourceMeshRenderedAtRuntime: false,
    conceptImageUsedAtRuntime: false,
  },
} as const);

type VoxelPart = (typeof R05_VOXEL_PARTS)[number];
type VoxelRole = (typeof R05_VOXEL_ROLES)[number];
type VoxelRecord = {
  readonly part: VoxelPart;
  readonly role: VoxelRole;
  readonly x: number;
  readonly y: number;
  readonly z: number;
};
type VoxelMesh = THREE.InstancedMesh<THREE.BufferGeometry, THREE.Material>;

const WORLD_SCALE = 42.5;
const WORLD_CELL = R05_VOXEL_CELL * WORLD_SCALE;
const LOWER_BODY_TOP = 0.95;
const LOWER_BODY_SCALE = 0.82;
const UPPER_BODY_SHIFT = LOWER_BODY_TOP * (1 - LOWER_BODY_SCALE);

function avatarY(value: number): number {
  return value <= LOWER_BODY_TOP
    ? value * LOWER_BODY_SCALE
    : value - UPPER_BODY_SHIFT;
}

const ROLE_COLORS = Object.freeze({
  skin: 0xf0aa8f,
  hair: 0xe6e0d5,
  hairLight: 0xfff4de,
  coat: 0xb9c0ae,
  coatShadow: 0x66756f,
  under: 0x27343a,
  boot: 0x1b292e,
  metal: 0x64797b,
  pack: 0x294b50,
  coral: 0xc95544,
  cyan: 0x63f5e4,
  eye: 0xf8f1df,
  mouth: 0x863f47,
} as const satisfies Readonly<Record<VoxelRole, number>>);

interface MaterialLibrary {
  readonly byRole: Readonly<Record<VoxelRole, THREE.Material>>;
  readonly contract: Readonly<Record<VoxelMaterialRole, THREE.Material>>;
  readonly originals: ReadonlyMap<THREE.Material, THREE.Color>;
  readonly owned: ReadonlySet<THREE.Material>;
}

interface VoxelRig {
  readonly all: Readonly<Record<VoxelPart, THREE.Group>>;
  readonly broad: Readonly<Record<HeroPartId, THREE.Group>>;
  readonly basePositions: Readonly<Record<VoxelPart, THREE.Vector3>>;
}

function physical(
  color: THREE.ColorRepresentation,
  options: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0] = {},
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    vertexColors: false,
    roughness: 0.68,
    ...options,
  });
}

function signal(
  color: THREE.ColorRepresentation,
  strength: number,
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color).multiplyScalar(strength),
    vertexColors: false,
    toneMapped: false,
  });
}

function createMaterials(): MaterialLibrary {
  const byRole: Record<VoxelRole, THREE.Material> = {
    skin: physical(0xffffff, {
      roughness: 0.52,
      sheen: 0.18,
      sheenColor: 0xffd5bd,
    }),
    hair: physical(0xffffff, {
      roughness: 0.38,
      sheen: 0.76,
      sheenColor: 0xfff0cf,
      sheenRoughness: 0.56,
    }),
    hairLight: physical(0xffffff, {
      roughness: 0.34,
      sheen: 0.82,
      sheenColor: 0xffffff,
    }),
    coat: physical(0xffffff, {
      roughness: 0.72,
      sheen: 0.34,
      sheenColor: 0xf3f0d8,
    }),
    coatShadow: physical(0xffffff, { roughness: 0.8 }),
    under: physical(0xffffff, { roughness: 0.74 }),
    boot: physical(0xffffff, {
      roughness: 0.48,
      clearcoat: 0.12,
      clearcoatRoughness: 0.5,
    }),
    metal: physical(0xffffff, {
      roughness: 0.24,
      metalness: 0.86,
      clearcoat: 0.2,
      clearcoatRoughness: 0.3,
    }),
    pack: physical(0xffffff, {
      roughness: 0.5,
      metalness: 0.22,
    }),
    coral: physical(0xffffff, {
      roughness: 0.76,
      sheen: 0.35,
      sheenColor: 0xf1a080,
    }),
    cyan: signal(0xffffff, 1.42),
    eye: physical(0xffffff, { roughness: 0.42 }),
    mouth: physical(0xffffff, { roughness: 0.5 }),
  };
  const originals = new Map<THREE.Material, THREE.Color>();
  for (const material of Object.values(byRole)) {
    if (
      material instanceof THREE.MeshStandardMaterial ||
      material instanceof THREE.MeshBasicMaterial
    ) {
      originals.set(material, material.color.clone());
    }
  }
  return {
    byRole,
    contract: {
      matte: byRole.coat,
      metal: byRole.metal,
      emissive: byRole.cyan,
    },
    originals,
    owned: new Set(Object.values(byRole)),
  };
}

function decodeVoxelRecords(): readonly VoxelRecord[] {
  const binary = atob(R05_VOXEL_DATA_BASE64);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  const records: VoxelRecord[] = [];
  for (let offset = 0; offset < bytes.length; offset += 8) {
    const part = R05_VOXEL_PARTS[view.getUint8(offset)];
    const role = R05_VOXEL_ROLES[view.getUint8(offset + 1)];
    if (part === undefined || role === undefined) {
      throw new Error("Invalid F.R.A.M. generated voxel record.");
    }
    records.push({
      part,
      role,
      x: view.getInt16(offset + 2, true),
      y: view.getInt16(offset + 4, true),
      z: view.getInt16(offset + 6, true),
    });
  }
  if (records.length !== R05_VOXEL_COUNT) {
    throw new Error("F.R.A.M. voxel asset count does not match its contract.");
  }
  return records;
}

function pivot(part: VoxelPart): THREE.Vector3 {
  const value = R05_VOXEL_PIVOTS[part];
  return new THREE.Vector3(...value).multiplyScalar(WORLD_SCALE);
}

function createRig(motionRoot: THREE.Group): VoxelRig {
  const all = Object.fromEntries(
    R05_VOXEL_PARTS.map((part) => {
      const group = new THREE.Group();
      group.name = `fram-f01-${part}-voxel-pivot`;
      return [part, group];
    }),
  ) as unknown as Record<VoxelPart, THREE.Group>;
  const basePositions = Object.fromEntries(
    R05_VOXEL_PARTS.map((part) => [part, pivot(part)]),
  ) as unknown as Record<VoxelPart, THREE.Vector3>;

  motionRoot.add(
    all.torso,
    all.leftThigh,
    all.rightThigh,
  );
  all.torso.add(
    all.head,
    all.leftUpperArm,
    all.rightUpperArm,
    all.equipment,
  );
  all.leftUpperArm.add(all.leftForearm);
  all.leftForearm.add(all.leftHand);
  all.rightUpperArm.add(all.rightForearm);
  all.rightForearm.add(all.rightHand);
  all.leftThigh.add(all.leftCalf);
  all.leftCalf.add(all.leftFoot);
  all.rightThigh.add(all.rightCalf);
  all.rightCalf.add(all.rightFoot);

  all.torso.position.copy(basePositions.torso);
  all.head.position.copy(basePositions.head).sub(basePositions.torso);
  all.equipment.position.copy(basePositions.equipment).sub(basePositions.torso);
  all.leftUpperArm.position.copy(basePositions.leftUpperArm).sub(basePositions.torso);
  all.leftForearm.position.copy(basePositions.leftForearm).sub(basePositions.leftUpperArm);
  all.leftHand.position.copy(basePositions.leftHand).sub(basePositions.leftForearm);
  all.rightUpperArm.position.copy(basePositions.rightUpperArm).sub(basePositions.torso);
  all.rightForearm.position.copy(basePositions.rightForearm).sub(basePositions.rightUpperArm);
  all.rightHand.position.copy(basePositions.rightHand).sub(basePositions.rightForearm);
  all.leftThigh.position.copy(basePositions.leftThigh);
  all.leftCalf.position.copy(basePositions.leftCalf).sub(basePositions.leftThigh);
  all.leftFoot.position.copy(basePositions.leftFoot).sub(basePositions.leftCalf);
  all.rightThigh.position.copy(basePositions.rightThigh);
  all.rightCalf.position.copy(basePositions.rightCalf).sub(basePositions.rightThigh);
  all.rightFoot.position.copy(basePositions.rightFoot).sub(basePositions.rightCalf);

  return {
    all,
    broad: {
      head: all.head,
      torso: all.torso,
      "left-arm": all.leftUpperArm,
      "right-arm": all.rightUpperArm,
      "left-leg": all.leftThigh,
      "right-leg": all.rightThigh,
      equipment: all.equipment,
    },
    basePositions,
  };
}

function colorVariation(role: VoxelRole, record: VoxelRecord): THREE.Color {
  const seed = (
    Math.imul(record.x + 113, 73_856_093) ^
    Math.imul(record.y + 251, 19_349_663) ^
    Math.imul(record.z + 389, 83_492_791)
  ) >>> 0;
  const color = new THREE.Color(ROLE_COLORS[role]);
  const lightness = (((seed >>> 7) & 0xff) / 255 - 0.5) *
    (role === "skin" || role === "eye" ? 0.055 : 0.095);
  color.offsetHSL(0, 0, lightness);
  return color;
}

function createVoxelMeshes(
  records: readonly VoxelRecord[],
  rig: VoxelRig,
  materials: Readonly<Record<VoxelRole, THREE.Material>>,
): {
  readonly byPart: Readonly<Record<VoxelPart, readonly VoxelMesh[]>>;
  readonly ownedGeometries: ReadonlySet<THREE.BufferGeometry>;
} {
  const buckets = new Map<string, VoxelRecord[]>();
  for (const record of records) {
    if (
      record.part === "head" &&
      (record.role === "eye" || record.role === "mouth" || record.role === "cyan")
    ) {
      continue;
    }
    const key = `${record.part}:${record.role}`;
    const bucket = buckets.get(key) ?? [];
    bucket.push(record);
    buckets.set(key, bucket);
  }
  const byPart = Object.fromEntries(
    R05_VOXEL_PARTS.map((part) => [part, [] as VoxelMesh[]]),
  ) as unknown as Record<VoxelPart, VoxelMesh[]>;
  const ownedGeometries = new Set<THREE.BufferGeometry>();
  const matrix = new THREE.Matrix4();
  const cellGeometry = new RoundedBoxGeometry(
    WORLD_CELL * 0.94,
    WORLD_CELL * 0.94,
    WORLD_CELL * 0.94,
    1,
    WORLD_CELL * 0.038,
  );
  ownedGeometries.add(cellGeometry);

  for (const [key, bucket] of buckets) {
    const [part, role] = key.split(":") as [VoxelPart, VoxelRole];
    const mesh = new THREE.InstancedMesh(cellGeometry, materials[role], bucket.length);
    mesh.name = role === "coat" && part === "equipment"
      ? "fram-f01-a-line-field-coat"
      : `fram-f01-${part}-${role}-voxel-surface`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    bucket.forEach((record, index) => {
      matrix.makeTranslation(
        record.x * WORLD_CELL,
        record.y * WORLD_CELL,
        record.z * WORLD_CELL,
      );
      mesh.setMatrixAt(index, matrix);
      mesh.setColorAt(index, colorVariation(role, record));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor !== null) mesh.instanceColor.needsUpdate = true;
    rig.all[part].add(mesh);
    byPart[part].push(mesh);
  }
  return { byPart, ownedGeometries };
}

function createSingleVoxel(
  name: string,
  material: THREE.Material,
  color: THREE.ColorRepresentation,
): THREE.Mesh {
  const geometry = new RoundedBoxGeometry(
    WORLD_CELL * 0.98,
    WORLD_CELL * 0.98,
    WORLD_CELL * 0.58,
    2,
    WORLD_CELL * 0.08,
  );
  const value = new THREE.Color(color);
  const colors = new Float32Array(geometry.getAttribute("position").count * 3);
  for (let index = 0; index < colors.length; index += 3) {
    colors[index] = value.r;
    colors[index + 1] = value.g;
    colors[index + 2] = value.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const faceMaterial = material.clone();
  if (
    faceMaterial instanceof THREE.MeshStandardMaterial ||
    faceMaterial instanceof THREE.MeshBasicMaterial
  ) {
    faceMaterial.color.set(color);
  }
  const mesh = new THREE.Mesh(geometry, faceMaterial);
  mesh.name = name;
  mesh.userData.baseColor = color;
  mesh.castShadow = true;
  return mesh;
}

function createFace(
  head: THREE.Group,
  materials: Readonly<Record<VoxelRole, THREE.Material>>,
): {
  readonly eyes: readonly [THREE.Group, THREE.Group];
  readonly meshes: readonly THREE.Mesh[];
} {
  const headPivot = pivot("head");
  const eyes = [-1, 1].map((side) => {
    const group = new THREE.Group();
    group.name = side < 0
      ? "fram-f01-left-expressive-eye"
      : "fram-f01-right-expressive-eye";
    group.position.set(
      side * 0.046 * WORLD_SCALE - headPivot.x,
      avatarY(1.655) * WORLD_SCALE - headPivot.y,
      0.164 * WORLD_SCALE - headPivot.z,
    );
    const white = createSingleVoxel(
      `${group.name}-white-pixel`,
      materials.eye,
      ROLE_COLORS.eye,
    );
    const pupil = createSingleVoxel(
      `${group.name}-dark-pixel-pupil`,
      materials.under,
      ROLE_COLORS.under,
    );
    pupil.scale.set(0.52, 0.66, 0.48);
    pupil.position.z = WORLD_CELL * 0.38;
    const highlight = createSingleVoxel(
      `${group.name}-archive-highlight`,
      materials.cyan,
      ROLE_COLORS.cyan,
    );
    highlight.scale.set(0.18, 0.2, 0.2);
    highlight.position.set(-side * WORLD_CELL * 0.17, WORLD_CELL * 0.16, WORLD_CELL * 0.69);
    group.add(white, pupil, highlight);
    head.add(group);
    return group;
  }) as [THREE.Group, THREE.Group];
  const mouth = createSingleVoxel(
    "fram-f01-cute-face-details",
    materials.mouth,
    ROLE_COLORS.mouth,
  );
  mouth.scale.set(0.72, 0.32, 0.62);
  mouth.position.set(
    -headPivot.x,
    avatarY(1.595) * WORLD_SCALE - headPivot.y,
    0.164 * WORLD_SCALE - headPivot.z,
  );
  head.add(mouth);
  return {
    eyes,
    meshes: [
      ...eyes.flatMap((eye) => eye.children as THREE.Mesh[]),
      mouth,
    ],
  };
}

function createArchiveHalo(
  equipment: THREE.Group,
  material: THREE.Material,
): {
  readonly group: THREE.Group;
  readonly mesh: VoxelMesh;
  readonly geometry: THREE.BufferGeometry;
} {
  const group = new THREE.Group();
  group.name = "fram-f01-archive-halo-motion";
  group.position.set(0, avatarY(1.18) * WORLD_SCALE, -0.34 * WORLD_SCALE);
  group.rotation.x = Math.PI / 2;
  const geometry = new RoundedBoxGeometry(
    WORLD_CELL * 0.72,
    WORLD_CELL * 0.72,
    WORLD_CELL * 0.72,
    2,
    WORLD_CELL * 0.08,
  );
  const count = 12;
  const mesh = new THREE.InstancedMesh(geometry, material, count);
  mesh.name = "fram-f01-archive-halo-and-core";
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color(ROLE_COLORS.cyan);
  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    matrix.makeTranslation(Math.cos(angle) * 3.85, Math.sin(angle) * 3.85, 0);
    mesh.setMatrixAt(index, matrix);
    mesh.setColorAt(index, color);
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor !== null) mesh.instanceColor.needsUpdate = true;
  group.add(mesh);
  equipment.add(group);
  return { group, mesh, geometry };
}

function representative(
  meshes: Readonly<Record<VoxelPart, readonly VoxelMesh[]>>,
  parts: readonly VoxelPart[],
  preferredRole?: VoxelRole,
): VoxelMesh {
  const candidates = parts.flatMap((part) => meshes[part]);
  const preferred = preferredRole === undefined
    ? undefined
    : candidates.find((mesh) => mesh.name.includes(`-${preferredRole}-`));
  const selected = preferred ?? candidates[0];
  if (selected === undefined) {
    throw new Error(`F.R.A.M. voxel part is empty: ${parts.join(", ")}`);
  }
  return selected;
}

export interface R05FramHeroVisual extends HeroVisual {
  readonly eyeGroups: readonly [THREE.Group, THREE.Group];
  readonly archiveHalo: THREE.Group;
}

/**
 * Builds the visible actor entirely from generated voxel cells. The CC0 base
 * mesh never ships to, loads in, or renders in the game.
 */
export function createR05FramHeroVisual(): R05FramHeroVisual {
  const library = createMaterials();
  const root = new THREE.Group();
  root.name = R05_FRAM_HERO_ASSET_DNA.id;
  root.userData.assetDNA = R05_FRAM_HERO_ASSET_DNA;
  root.userData.frontAxis = R05_FRAM_HERO_ASSET_DNA.frontAxis;
  root.userData.runtimeRepresentation = R05_FRAM_HERO_ASSET_DNA.representation;
  root.userData.visibleVoxelCells = R05_VOXEL_COUNT;

  const motionRoot = new THREE.Group();
  motionRoot.name = "fram-f01-high-density-voxel-motion";
  root.add(motionRoot);
  const rig = createRig(motionRoot);
  const records = decodeVoxelRecords();
  const surfaces = createVoxelMeshes(records, rig, library.byRole);
  const face = createFace(rig.all.head, library.byRole);
  const halo = createArchiveHalo(rig.all.equipment, library.byRole.cyan);

  const runtimePartMeshes: Record<HeroPartId, VoxelMesh> = {
    head: representative(surfaces.byPart, ["head"], "hair"),
    torso: representative(surfaces.byPart, ["torso"], "coatShadow"),
    "left-arm": representative(
      surfaces.byPart,
      ["leftUpperArm", "leftForearm", "leftHand"],
      "coat",
    ),
    "right-arm": representative(
      surfaces.byPart,
      ["rightUpperArm", "rightForearm", "rightHand"],
      "coat",
    ),
    "left-leg": representative(
      surfaces.byPart,
      ["leftThigh", "leftCalf", "leftFoot"],
      "under",
    ),
    "right-leg": representative(
      surfaces.byPart,
      ["rightThigh", "rightCalf", "rightFoot"],
      "under",
    ),
    equipment: representative(surfaces.byPart, ["equipment"], "coat"),
  };
  const partMeshes = runtimePartMeshes as unknown as HeroVisual["partMeshes"];

  const weaponSocket = new THREE.Group();
  weaponSocket.name = "fram-f01-right-hand-voxel-socket";
  weaponSocket.position.set(WORLD_CELL * 4.2, -WORLD_CELL * 0.2, WORLD_CELL * 0.8);
  rig.all.rightHand.add(weaponSocket);

  const baseRotations = {
    leftUpperArm: new THREE.Euler(0.08, 0.03, -1.38),
    rightUpperArm: new THREE.Euler(-0.08, -0.03, 1.38),
    leftForearm: new THREE.Euler(0.08, -0.16, -0.13),
    rightForearm: new THREE.Euler(-0.08, 0.16, 0.13),
    leftHand: new THREE.Euler(0, 0.12, 0),
    rightHand: new THREE.Euler(0, -0.12, 0),
  };

  const applyTint = (color: THREE.ColorRepresentation): void => {
    const tint = new THREE.Color(color);
    for (const [material, original] of library.originals) {
      if (
        material instanceof THREE.MeshStandardMaterial ||
        material instanceof THREE.MeshBasicMaterial
      ) {
        material.color.copy(original).multiply(tint);
      }
    }
  };

  const visual: R05FramHeroVisual = {
    root,
    motionRoot,
    mode: "articulated",
    partGroups: rig.broad,
    partMeshes,
    mergedMesh: null,
    weaponSocket,
    materials: library.contract,
    eyeGroups: face.eyes,
    archiveHalo: halo.group,
    updatePose(input: HeroAnimationInput): void {
      const pose = sampleHeroPose(input);
      motionRoot.position.set(...pose.root.position);
      motionRoot.rotation.set(...pose.root.rotation);
      motionRoot.scale.set(...pose.root.scale);
      rig.all.torso.rotation.set(...pose.parts.torso.rotation);
      rig.all.head.rotation.set(...pose.parts.head.rotation);
      rig.all.head.scale.set(1.25, 1.22, 1.25);
      rig.all.leftUpperArm.rotation.set(
        baseRotations.leftUpperArm.x + pose.parts["left-arm"].rotation[0],
        baseRotations.leftUpperArm.y + pose.parts["left-arm"].rotation[1],
        baseRotations.leftUpperArm.z + pose.parts["left-arm"].rotation[2],
      );
      rig.all.rightUpperArm.rotation.set(
        baseRotations.rightUpperArm.x + pose.parts["right-arm"].rotation[0],
        baseRotations.rightUpperArm.y + pose.parts["right-arm"].rotation[1],
        baseRotations.rightUpperArm.z + pose.parts["right-arm"].rotation[2],
      );
      rig.all.leftForearm.rotation.copy(baseRotations.leftForearm);
      rig.all.rightForearm.rotation.copy(baseRotations.rightForearm);
      rig.all.leftHand.rotation.copy(baseRotations.leftHand);
      rig.all.rightHand.rotation.copy(baseRotations.rightHand);
      rig.all.leftThigh.rotation.set(
        pose.parts["left-leg"].rotation[0],
        pose.parts["left-leg"].rotation[1],
        pose.parts["left-leg"].rotation[2] + 0.065,
      );
      rig.all.rightThigh.rotation.set(
        pose.parts["right-leg"].rotation[0],
        pose.parts["right-leg"].rotation[1],
        pose.parts["right-leg"].rotation[2] - 0.065,
      );
      rig.all.equipment.rotation.set(...pose.parts.equipment.rotation);

      const progress = input.progress ?? 0;
      if (input.motion === "windup" || input.motion === "hit" || input.motion === "skill") {
        const action = Math.sin(THREE.MathUtils.clamp(progress, 0, 1) * Math.PI);
        rig.all.rightUpperArm.rotation.x -= action * 0.72;
        rig.all.rightUpperArm.rotation.z += action * 0.38;
        rig.all.rightForearm.rotation.x -= action * 0.52;
      }
      const blinkClock = ((input.timeSeconds + 0.2) % 4.3 + 4.3) % 4.3;
      const blink = blinkClock < 0.18
        ? Math.sin((blinkClock / 0.18) * Math.PI)
        : 0;
      const skill = input.motion === "skill"
        ? Math.sin(THREE.MathUtils.clamp(progress, 0, 1) * Math.PI)
        : 0;
      const eyeY = Math.max(0.14, 1 - blink * 0.9);
      face.eyes[0].scale.set(1 + skill * 0.08, eyeY + skill * 0.08, 1);
      face.eyes[1].scale.copy(face.eyes[0].scale);
      halo.group.rotation.z = input.timeSeconds * 0.32;
      halo.group.scale.setScalar(1 + skill * 0.16);
      runtimePartMeshes.equipment.scale.setScalar(1 + skill * 0.025);
    },
    attachWeapon(
      object: THREE.Object3D,
      gripLocal: VoxelPoint = { x: 0, y: 0, z: 0 },
    ): void {
      weaponSocket.add(object);
      alignObjectGripToSocket(object, gripLocal);
    },
    setTint(color: THREE.ColorRepresentation): void {
      applyTint(color);
    },
    dispose(): void {
      for (const geometry of surfaces.ownedGeometries) geometry.dispose();
      halo.geometry.dispose();
      for (const mesh of face.meshes) {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
      for (const material of library.owned) material.dispose();
      root.removeFromParent();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}
