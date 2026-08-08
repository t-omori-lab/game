import * as THREE from "three";
import type { F01PartId } from "./F01Character";

export const F02_READABILITY_MODULE_IDS = [
  "face-readability",
  "torso-jacket-separation",
  "limb-silhouette",
  "backpack-signal",
  "combat-pose-readability",
] as const;

export type F02ReadabilityModuleId =
  (typeof F02_READABILITY_MODULE_IDS)[number];

export type F02GameplayMotion =
  | "idle"
  | "run"
  | "windup"
  | "hit"
  | "recovery"
  | "hurt"
  | "skill";

export interface F02PoseInput {
  readonly motion: F02GameplayMotion;
  readonly timeSeconds: number;
  readonly progress?: number;
  readonly moveAmount?: number;
}

export interface F02ReadabilityTarget {
  readonly root: THREE.Group;
  readonly partGroups: Readonly<Record<F01PartId, THREE.Group>>;
  readonly castShadow?: boolean;
  readonly receiveShadow?: boolean;
}

export interface F02ReadabilityModules {
  readonly addedSurfaceCells: number;
  applyPose(input: F02PoseInput): void;
  setTint(color: THREE.ColorRepresentation): void;
  setWireframe(enabled: boolean): void;
  dispose(): void;
}

type Cell = readonly [x: number, y: number, z: number];
type PatchMaterialId =
  | "skin"
  | "eye-dark"
  | "eye-teal"
  | "highlight"
  | "ivory"
  | "warm-gray"
  | "near-black"
  | "coral"
  | "cyan"
  | "cyan-signal";

interface PatchDefinition {
  readonly name: string;
  readonly part: F01PartId;
  readonly material: PatchMaterialId;
  readonly cells: readonly Cell[];
  readonly groupName?: string;
}

const CELL = 0.058;
const FRONT_FACE_Z = 0.98;
const HEAD_PROPORTION = new THREE.Vector3(1.065, 1.035, 1.065);
const TORSO_PROPORTION = new THREE.Vector3(1.035, 1, 1.035);

function grid(
  columns: number,
  rows: number,
  centerX: number,
  startY: number,
  z: number,
): Cell[] {
  const cells: Cell[] = [];
  const xStart = centerX - ((columns - 1) * CELL) / 2;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      cells.push([xStart + column * CELL, startY + row * CELL, z]);
    }
  }
  return cells;
}

function facePlane(): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < 8; row += 1) {
    const halfWidth = row === 0 || row === 7 ? 4 : 5;
    for (let column = -halfWidth; column <= halfWidth; column += 1) {
      cells.push([column * CELL, 0.43 + row * CELL, FRONT_FACE_Z]);
    }
  }
  return cells;
}

function coatPanel(side: -1 | 1): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < 21; row += 1) {
    const flare = (1 - row / 20) * 0.08;
    const centerX = side * (0.39 + flare);
    for (let column = -1; column <= 1; column += 1) {
      cells.push([
        centerX + column * CELL,
        -0.86 + row * CELL,
        0.52,
      ]);
    }
  }
  return cells;
}

function torsoPanel(): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < 14; row += 1) {
    const halfWidth = row > 10 ? 4 : 5;
    for (let column = -halfWidth; column <= halfWidth; column += 1) {
      cells.push([column * CELL, -0.02 + row * CELL, 0.55]);
    }
  }
  return cells;
}

function fringe(): Cell[] {
  const cells: Cell[] = [];
  const strands = [
    [-0.3, 4],
    [-0.16, 5],
    [0, 3],
    [0.16, 5],
    [0.3, 4],
  ] as const;
  for (const [x, length] of strands) {
    for (let index = 0; index < length; index += 1) {
      cells.push([x, 0.84 + index * CELL, FRONT_FACE_Z + 0.055]);
    }
  }
  return cells;
}

const PATCHES: readonly PatchDefinition[] = [
  {
    name: "fram-f02-face-skin-plane",
    part: "head",
    material: "skin",
    cells: facePlane(),
  },
  {
    name: "fram-f02-left-eye-cells",
    groupName: "fram-f02-left-eye",
    part: "head",
    material: "eye-dark",
    cells: grid(3, 4, -0.2, 0.58, FRONT_FACE_Z + 0.055),
  },
  {
    name: "fram-f02-right-eye-cells",
    groupName: "fram-f02-right-eye",
    part: "head",
    material: "eye-dark",
    cells: grid(3, 4, 0.2, 0.58, FRONT_FACE_Z + 0.055),
  },
  {
    name: "fram-f02-left-eye-teal",
    part: "head",
    material: "eye-teal",
    cells: grid(2, 2, -0.2, 0.58, FRONT_FACE_Z + 0.09),
  },
  {
    name: "fram-f02-right-eye-teal",
    part: "head",
    material: "eye-teal",
    cells: grid(2, 2, 0.2, 0.58, FRONT_FACE_Z + 0.09),
  },
  {
    name: "fram-f02-eye-highlights",
    part: "head",
    material: "highlight",
    cells: [
      [-0.225, 0.67, FRONT_FACE_Z + 0.12],
      [0.175, 0.67, FRONT_FACE_Z + 0.12],
    ],
  },
  {
    name: "fram-f02-mouth",
    part: "head",
    material: "coral",
    cells: grid(2, 1, 0, 0.43, FRONT_FACE_Z + 0.065),
  },
  {
    name: "fram-f02-blush",
    part: "head",
    material: "coral",
    cells: [
      [-0.32, 0.51, FRONT_FACE_Z + 0.06],
      [0.32, 0.51, FRONT_FACE_Z + 0.06],
    ],
  },
  {
    name: "fram-f02-fringe",
    part: "head",
    material: "ivory",
    cells: fringe(),
  },
  {
    name: "fram-f02-inner-suit",
    part: "torso",
    material: "near-black",
    cells: torsoPanel(),
  },
  {
    name: "fram-f02-coat-left",
    part: "torso",
    material: "ivory",
    cells: coatPanel(-1),
  },
  {
    name: "fram-f02-coat-right",
    part: "torso",
    material: "warm-gray",
    cells: coatPanel(1),
  },
  {
    name: "fram-f02-collar",
    part: "torso",
    material: "warm-gray",
    cells: grid(11, 3, 0, 0.75, 0.57),
  },
  {
    name: "fram-f02-chest-signal",
    groupName: "fram-f02-skill-signal",
    part: "torso",
    material: "cyan-signal",
    cells: grid(4, 3, 0.27, 0.51, 0.61),
  },
  {
    name: "fram-f02-belt-accent",
    part: "torso",
    material: "coral",
    cells: grid(4, 2, -0.27, -0.13, 0.59),
  },
  {
    name: "fram-f02-left-glove-read",
    part: "left-arm",
    material: "near-black",
    cells: grid(4, 4, 0, -1.18, 0.25),
  },
  {
    name: "fram-f02-right-glove-read",
    part: "right-arm",
    material: "near-black",
    cells: grid(4, 4, 0, -1.18, 0.25),
  },
  {
    name: "fram-f02-left-cuff-signal",
    part: "left-arm",
    material: "cyan",
    cells: grid(3, 1, 0, -0.96, 0.29),
  },
  {
    name: "fram-f02-right-cuff-signal",
    part: "right-arm",
    material: "cyan",
    cells: grid(3, 1, 0, -0.96, 0.29),
  },
  {
    name: "fram-f02-backpack-shell",
    part: "equipment",
    material: "near-black",
    cells: grid(12, 13, 0, -0.48, -0.67),
  },
  {
    name: "fram-f02-archive-screen",
    part: "equipment",
    material: "cyan",
    cells: grid(8, 3, 0, -0.05, -0.71),
  },
  {
    name: "fram-f02-backpack-coral-rail",
    part: "equipment",
    material: "coral",
    cells: grid(2, 9, -0.39, -0.34, -0.7),
  },
];

export const F02_ADDED_SURFACE_CELLS = PATCHES.reduce(
  (total, patch) => total + patch.cells.length,
  0,
);

const PART_RETONE: Readonly<
  Partial<Record<F01PartId, Readonly<Record<string, string>>>>
> = {
  head: {
    ivory: "#fff8e8",
    "warm-gray": "#e7e2d6",
    "sage-gray": "#c8c8bc",
    graphite: "#929990",
    "near-black": "#424a49",
    skin: "#f3a77f",
    "eye-teal": "#0d555c",
    coral: "#f26f62",
    cyan: "#3eeef2",
  },
  torso: {
    ivory: "#f5f0e4",
    "warm-gray": "#d9d5ca",
    "sage-gray": "#9fa69a",
    graphite: "#3e4646",
    "near-black": "#171d1f",
    coral: "#f05f50",
    cyan: "#34e6ee",
  },
  "left-arm": {
    ivory: "#f5f0e4",
    "warm-gray": "#d9d5ca",
    "sage-gray": "#a6ad9f",
    graphite: "#505857",
    "near-black": "#202628",
  },
  "right-arm": {
    ivory: "#f5f0e4",
    "warm-gray": "#d9d5ca",
    "sage-gray": "#a6ad9f",
    graphite: "#505857",
    "near-black": "#202628",
  },
  equipment: {
    "near-black": "#202628",
    graphite: "#4c5554",
    coral: "#f05f50",
    cyan: "#34e6ee",
  },
};

export function attachF02ReadabilityModules(
  target: F02ReadabilityTarget,
): F02ReadabilityModules {
  target.root.userData.f02ModuleIds = F02_READABILITY_MODULE_IDS;
  const geometry = new THREE.BoxGeometry(CELL * 0.9, CELL * 0.9, CELL * 0.72);
  const materials = createMaterials();
  const ownedMaterials = new Set<THREE.MeshPhysicalMaterial>(
    Object.values(materials),
  );
  const moduleObjects: THREE.Object3D[] = [];
  const namedGroups = new Map<string, THREE.Group>();
  const matrix = new THREE.Matrix4();

  retonePartMaterials(target.partGroups, ownedMaterials);
  for (const patch of PATCHES) {
    const parent = patch.groupName === undefined
      ? target.partGroups[patch.part]
      : requireNamedGroup(
        namedGroups,
        target.partGroups[patch.part],
        patch.groupName,
        moduleObjects,
      );
    const mesh = new THREE.InstancedMesh(
      geometry,
      materials[patch.material],
      patch.cells.length,
    );
    mesh.name = patch.name;
    mesh.castShadow = target.castShadow ?? true;
    mesh.receiveShadow = target.receiveShadow ?? true;
    mesh.frustumCulled = false;
    patch.cells.forEach((cell, index) => {
      matrix.makeTranslation(cell[0], cell[1], cell[2]);
      mesh.setMatrixAt(index, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    moduleObjects.push(mesh);
  }

  const originals = new Map(
    [...ownedMaterials].map((material) => [
      material,
      {
        color: material.color.clone(),
        emissive: material.emissive.clone(),
      },
    ] as const),
  );
  const leftEye = requireGroup(namedGroups, "fram-f02-left-eye");
  const rightEye = requireGroup(namedGroups, "fram-f02-right-eye");
  const skillSignal = requireGroup(namedGroups, "fram-f02-skill-signal");
  const signalMaterial = materials["cyan-signal"];
  let disposed = false;

  return {
    addedSurfaceCells: F02_ADDED_SURFACE_CELLS,
    applyPose(input): void {
      const time = Number.isFinite(input.timeSeconds) ? input.timeSeconds : 0;
      const progress = THREE.MathUtils.clamp(
        Number.isFinite(input.progress) ? input.progress ?? 0 : 0,
        0,
        1,
      );
      target.partGroups.head.scale.multiply(HEAD_PROPORTION);
      target.partGroups.torso.scale.multiply(TORSO_PROPORTION);
      target.partGroups["left-arm"].rotation.z -= 0.075;
      target.partGroups["right-arm"].rotation.z += 0.075;

      const blinkClock = ((time + 0.25) % 4.4 + 4.4) % 4.4;
      const blink = blinkClock < 0.18
        ? Math.sin((blinkClock / 0.18) * Math.PI)
        : 0;
      const eyeScaleY = Math.max(0.16, 1 - blink * 0.88);
      leftEye.scale.set(1, eyeScaleY, 1);
      rightEye.scale.copy(leftEye.scale);

      let signalPulse = 0;
      switch (input.motion) {
        case "windup":
          target.partGroups.torso.rotation.y -= progress * 0.1;
          target.partGroups["right-arm"].rotation.x -= progress * 0.22;
          break;
        case "hit": {
          const strike = Math.sin(progress * Math.PI);
          target.partGroups.torso.rotation.y += strike * 0.12;
          target.partGroups["right-arm"].rotation.x += strike * 0.34;
          break;
        }
        case "recovery":
          target.partGroups["right-arm"].rotation.x += (1 - progress) * 0.18;
          break;
        case "hurt":
          target.partGroups["left-arm"].rotation.z -=
            Math.sin(progress * Math.PI) * 0.2;
          target.partGroups["right-arm"].rotation.z +=
            Math.sin(progress * Math.PI) * 0.2;
          break;
        case "skill":
          signalPulse = Math.sin(progress * Math.PI);
          target.partGroups["left-arm"].rotation.z -= signalPulse * 0.26;
          target.partGroups["right-arm"].rotation.z += signalPulse * 0.26;
          break;
        case "idle":
        case "run":
          break;
      }
      skillSignal.scale.setScalar(1 + signalPulse * 0.42);
      signalMaterial.emissiveIntensity = 1.15 + signalPulse * 3.1;
    },
    setTint(color): void {
      const tint = new THREE.Color(color);
      for (const [material, original] of originals) {
        material.color.copy(original.color).multiply(tint);
        material.emissive.copy(original.emissive).multiply(tint);
      }
    },
    setWireframe(enabled): void {
      for (const material of ownedMaterials) material.wireframe = enabled;
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      for (const object of moduleObjects) object.removeFromParent();
      geometry.dispose();
      for (const material of ownedMaterials) material.dispose();
    },
  };
}

function createMaterials(): Record<PatchMaterialId, THREE.MeshPhysicalMaterial> {
  return {
    skin: material("#f3a77f", 0.54),
    "eye-dark": material("#132e32", 0.36, 0.08),
    "eye-teal": material("#0b6268", 0.3, 0.14),
    highlight: material("#f2fff9", 0.38),
    ivory: material("#f7f1e5", 0.68),
    "warm-gray": material("#d5d2c8", 0.7),
    "near-black": material("#1a2022", 0.42, 0.16),
    coral: material("#f06454", 0.62),
    cyan: material("#39e7ed", 0.3, 0.18, "#39e7ed", 1.15),
    "cyan-signal": material("#42f0f3", 0.22, 0.2, "#42f0f3", 1.15),
  };
}

function material(
  color: THREE.ColorRepresentation,
  roughness: number,
  metalness = 0,
  emissive: THREE.ColorRepresentation = 0x000000,
  emissiveIntensity = 0,
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness,
    metalness,
    emissive,
    emissiveIntensity,
    clearcoat: metalness > 0 ? 0.16 : 0.04,
    clearcoatRoughness: 0.42,
  });
}

function retonePartMaterials(
  partGroups: Readonly<Record<F01PartId, THREE.Group>>,
  ownedMaterials: Set<THREE.MeshPhysicalMaterial>,
): void {
  for (const [partId, colors] of Object.entries(PART_RETONE) as Array<
    [F01PartId, Readonly<Record<string, string>>]
  >) {
    partGroups[partId].traverse((object) => {
      if (!(object instanceof THREE.InstancedMesh)) return;
      const paletteId = object.name.split(":").at(-1);
      const color = paletteId === undefined ? undefined : colors[paletteId];
      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      const clones = sourceMaterials.map((sourceMaterial) => {
        if (!(sourceMaterial instanceof THREE.MeshPhysicalMaterial)) {
          return sourceMaterial;
        }
        const clone = sourceMaterial.clone();
        if (color !== undefined) clone.color.set(color);
        ownedMaterials.add(clone);
        return clone;
      });
      object.material = Array.isArray(object.material) ? clones : clones[0];
    });
  }
}

function requireNamedGroup(
  groups: Map<string, THREE.Group>,
  parent: THREE.Group,
  name: string,
  ownedObjects: THREE.Object3D[],
): THREE.Group {
  const existing = groups.get(name);
  if (existing !== undefined) return existing;
  const group = new THREE.Group();
  group.name = name;
  parent.add(group);
  groups.set(name, group);
  ownedObjects.push(group);
  return group;
}

function requireGroup(
  groups: ReadonlyMap<string, THREE.Group>,
  name: string,
): THREE.Group {
  const group = groups.get(name);
  if (group === undefined) {
    throw new Error(`F-02 module group is missing: ${name}`);
  }
  return group;
}
