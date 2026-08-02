import * as THREE from "three";
import type { HeroAnimationInput, HeroVisual } from "./HeroVisual";
import {
  createR07FramHeroVisual,
  R07_FRAM_HERO_ASSET_DNA,
  type R07FramHeroVisual,
} from "./R07FramHeroVisual";

const LEGACY_CELL = 0.0195 * 42.5;
const HEAD_CELL = LEGACY_CELL * 0.55;
const BODY_CELL = LEGACY_CELL * 0.7;

type CellRole =
  | "skin"
  | "skinShade"
  | "hairLight"
  | "hair"
  | "hairShade"
  | "eye"
  | "eyeLight"
  | "cheek"
  | "jacketLight"
  | "jacket"
  | "jacketShade"
  | "graphite"
  | "graphiteLight"
  | "metal"
  | "coral"
  | "cyan";

type Cell = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly role: CellRole;
};

const COLORS = Object.freeze({
  skin: 0xf1b49b,
  skinShade: 0xd88d79,
  hairLight: 0xfff6e8,
  hair: 0xdedfd3,
  hairShade: 0x87938d,
  eye: 0x112f35,
  eyeLight: 0xbafff4,
  cheek: 0xe98f8d,
  jacketLight: 0xfff8e8,
  jacket: 0xd8dbc9,
  jacketShade: 0x929d93,
  graphite: 0x202c32,
  graphiteLight: 0x44545a,
  metal: 0x70858a,
  coral: 0xd65a48,
  cyan: 0x58f4e3,
} as const satisfies Readonly<Record<CellRole, number>>);

export const R08_FRAM_HERO_ASSET_DNA = Object.freeze({
  ...R07_FRAM_HERO_ASSET_DNA,
  schemaVersion: 5,
  id: "actor.fram.module-f01b.unified-semantic-voxel-girl",
  generatorVersion: "semantic-full-body-volume-v1",
  rigFamily: "humanoid-fram-compact-voxel-v5",
  bodyRatioHeads: 3.55,
  characterPreset: "unified-semantic-micro-voxel-girl-b",
  semanticVolumes: [
    "large asymmetric layered bob framing a small readable face",
    "short pale technical jacket over a narrow graphite under-suit",
    "compact articulated limbs with oversized field boots",
    "archive analysis pack, cyan record signals and coral field textile",
  ],
  artDirectionReference:
    "work/r07_character_depth/fram-r07-character-direction.png",
} as const);

export interface R08FramHeroVisual extends HeroVisual {
  readonly semanticCellCount: number;
  readonly sourceVisual: R07FramHeroVisual;
}

interface MaterialLibrary {
  readonly byRole: Readonly<Record<CellRole, THREE.Material>>;
  readonly originals: ReadonlyMap<THREE.Material, THREE.Color>;
  readonly owned: ReadonlySet<THREE.Material>;
}

interface Surface {
  readonly group: THREE.Group;
  readonly geometry: THREE.BufferGeometry;
  readonly cellCount: number;
}

function physical(
  color: THREE.ColorRepresentation,
  roughness: number,
  metalness = 0,
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness,
    metalness,
    sheen: metalness === 0 ? 0.32 : 0.08,
    sheenColor: color,
    sheenRoughness: 0.68,
  });
}

function createMaterials(): MaterialLibrary {
  const byRole: Record<CellRole, THREE.Material> = {
    skin: physical(COLORS.skin, 0.58),
    skinShade: physical(COLORS.skinShade, 0.62),
    hairLight: physical(COLORS.hairLight, 0.34),
    hair: physical(COLORS.hair, 0.42),
    hairShade: physical(COLORS.hairShade, 0.58),
    eye: physical(COLORS.eye, 0.4),
    eyeLight: physical(COLORS.eyeLight, 0.34),
    cheek: physical(COLORS.cheek, 0.66),
    jacketLight: physical(COLORS.jacketLight, 0.7),
    jacket: physical(COLORS.jacket, 0.74),
    jacketShade: physical(COLORS.jacketShade, 0.78),
    graphite: physical(COLORS.graphite, 0.71),
    graphiteLight: physical(COLORS.graphiteLight, 0.65),
    metal: physical(COLORS.metal, 0.42, 0.42),
    coral: physical(COLORS.coral, 0.72),
    cyan: new THREE.MeshBasicMaterial({
      color: COLORS.cyan,
      toneMapped: false,
    }),
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
    originals,
    owned: new Set(Object.values(byRole)),
  };
}

function add(
  cells: Cell[],
  x: number,
  y: number,
  z: number,
  role: CellRole,
): void {
  cells.push({ x, y, z, role });
}

function addBoxShell(
  cells: Cell[],
  bounds: readonly [number, number, number, number, number, number],
  role: CellRole,
  skip?: (x: number, y: number, z: number) => boolean,
): void {
  const [minX, maxX, minY, maxY, minZ, maxZ] = bounds;
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      for (let z = minZ; z <= maxZ; z += 1) {
        const boundary =
          x === minX || x === maxX ||
          y === minY || y === maxY ||
          z === minZ || z === maxZ;
        if (!boundary || skip?.(x, y, z) === true) continue;
        add(cells, x, y, z, role);
      }
    }
  }
}

function createHeadCells(): readonly Cell[] {
  const cells: Cell[] = [];

  // A wide, stepped bob creates the dominant chibi silhouette. The face is a
  // small inset plane instead of a pale sphere with features painted on top.
  for (let y = -11; y <= 13; y += 1) {
    for (let x = -12; x <= 12; x += 1) {
      for (let z = -10; z <= 10; z += 1) {
        const nx = x / (y < -6 ? 9.8 : 12.2);
        const ny = (y - 0.5) / 13.1;
        const nz = z / 10.3;
        const distance = nx * nx + ny * ny + nz * nz;
        if (distance > 1 || distance < 0.77) continue;
        const faceOpening = z >= 5 && Math.abs(x) <= 8 && y >= -7 && y <= 6;
        if (faceOpening) continue;
        const role = y >= 8 || x <= -7 || (z >= 3 && x <= 2)
          ? "hairLight"
          : x >= 7 || z <= -5 || y <= -7
            ? "hairShade"
            : "hair";
        add(cells, x, y + 7, z, role);
      }
    }
  }

  for (let y = -9; y <= 7; y += 1) {
    const width = y <= -8 ? 4 : y <= -5 ? 7 : y >= 7 ? 7 : 8;
    for (let x = -width; x <= width; x += 1) {
      add(cells, x, y + 7, 10.05, Math.abs(x) === width ? "skinShade" : "skin");
    }
  }

  for (const side of [-1, 1] as const) {
    for (let y = -1; y <= 2; y += 1) {
      for (let x = 2; x <= 5; x += 1) {
        add(cells, side * x, y + 7, 10.65, "eye");
      }
    }
    add(cells, side * 2, 9, 10.95, "eyeLight");
    add(cells, side * 6, 5, 10.55, "cheek");
    for (let x = 2; x <= 5; x += 1) {
      add(cells, side * x, 10, 10.55, "graphite");
    }
  }
  add(cells, -1, 3, 10.72, "graphite");
  add(cells, 0, 3, 10.72, "graphite");

  // Layered fringe and side locks break the helmet outline at gameplay scale.
  for (let x = -9; x <= 9; x += 1) {
    const lower = x <= -5 ? 12 : x <= 0 ? 15 : x <= 4 ? 14 : 11;
    for (let y = lower; y <= 19; y += 1) {
      add(cells, x, y, 10.35, x >= 6 ? "hairShade" : "hairLight");
    }
  }
  for (const side of [-1, 1] as const) {
    const length = side < 0 ? 12 : 9;
    for (let y = -4; y <= length; y += 1) {
      add(cells, side * 10, y, 8.4, side < 0 ? "hairLight" : "hairShade");
      add(cells, side * 11, y, 7.8, side < 0 ? "hairLight" : "hairShade");
      if (y <= 7) add(cells, side * 12, y, 6.9, "hairShade");
    }
    add(cells, side * 11, -5, 7.8, "coral");
  }
  for (let y = 20; y <= 24; y += 1) {
    add(cells, -3, y, -1, "hairLight");
    if (y >= 22) add(cells, -2, y, -1, "hairLight");
  }
  for (let x = 8; x <= 10; x += 1) {
    for (let y = 9; y <= 11; y += 1) add(cells, x, y, 10.8, "cyan");
  }
  return cells;
}

function createTorsoCells(): readonly Cell[] {
  const cells: Cell[] = [];
  addBoxShell(cells, [-6, 6, 45, 87, -4, 4], "graphite", (x, y, z) =>
    z === 4 && y >= 63 && Math.abs(x) <= 1,
  );
  addBoxShell(cells, [-9, 9, 50, 90, -6, 6], "jacket", (x, y, z) => {
    if (z === 6 && Math.abs(x) <= 3) return true;
    if (y <= 58 && Math.abs(x) <= 4) return true;
    return false;
  });
  for (let y = 58; y <= 87; y += 1) {
    for (const x of [-9, 9]) add(cells, x, y, 6.5, x < 0 ? "jacketLight" : "jacketShade");
    for (let x = -8; x <= -4; x += 1) add(cells, x, y, 6.55, "jacketLight");
    for (let x = 4; x <= 8; x += 1) add(cells, x, y, 6.55, "jacket");
  }
  addBoxShell(cells, [-10, 10, 84, 95, -5, 5], "jacketLight", (x, y, z) =>
    z === 5 && Math.abs(x) <= 3 && y <= 91,
  );
  for (let x = -7; x <= 7; x += 1) {
    add(cells, x, 90, 0, Math.abs(x) >= 6 ? "jacketShade" : "jacketLight");
  }
  addBoxShell(cells, [-8, 8, 42, 50, -5, 5], "graphiteLight");
  for (let y = 20; y <= 48; y += 1) {
    for (let x = 3; x <= 7; x += 1) {
      const role = x === 7 ? "jacketShade" : "jacket";
      add(cells, -x, y, 5.5, role);
      add(cells, x, y, 5.5, role);
    }
  }
  for (let y = 18; y <= 46; y += 1) {
    add(cells, -8, y, -3.5, "coral");
    if (y <= 25) add(cells, -9, y, -3.5, "coral");
  }
  add(cells, 0, 72, 6.7, "cyan");
  add(cells, 0, 73, 6.7, "cyan");
  return cells;
}

function createUpperArmCells(direction: -1 | 1): readonly Cell[] {
  const cells: Cell[] = [];
  const minX = direction > 0 ? 0 : -17;
  const maxX = direction > 0 ? 17 : 0;
  addBoxShell(cells, [minX, maxX, -4, 4, -4, 4], direction > 0 ? "jacketLight" : "jacket", (x) =>
    direction > 0 ? x >= 12 : x <= -12,
  );
  const cuffMin = direction > 0 ? 12 : -17;
  const cuffMax = direction > 0 ? 17 : -12;
  addBoxShell(cells, [cuffMin, cuffMax, -3, 3, -3, 3], "graphiteLight");
  for (let x = direction > 0 ? 2 : -2; direction > 0 ? x <= 8 : x >= -8; x += direction) {
    add(cells, x, 4.5, 0, direction > 0 ? "jacketLight" : "jacketShade");
  }
  return cells;
}

function createForearmCells(direction: -1 | 1): readonly Cell[] {
  const cells: Cell[] = [];
  const minX = direction > 0 ? 0 : -16;
  const maxX = direction > 0 ? 16 : 0;
  addBoxShell(cells, [minX, maxX, -3, 3, -3, 3], "graphite");
  const signalX = direction > 0 ? 7 : -7;
  for (let y = -2; y <= 2; y += 1) add(cells, signalX, y, 3.5, "cyan");
  return cells;
}

function createHandCells(direction: -1 | 1): readonly Cell[] {
  const cells: Cell[] = [];
  const minX = direction > 0 ? 0 : -6;
  const maxX = direction > 0 ? 6 : 0;
  addBoxShell(cells, [minX, maxX, -3, 3, -3, 3], "graphite");
  return cells;
}

function createThighCells(): readonly Cell[] {
  const cells: Cell[] = [];
  addBoxShell(cells, [-4, 4, -22, 1, -4, 4], "graphite");
  for (let y = -6; y <= 0; y += 1) {
    add(cells, -4.5, y, 0, "jacketShade");
    add(cells, 4.5, y, 0, "jacket");
  }
  return cells;
}

function createCalfCells(): readonly Cell[] {
  const cells: Cell[] = [];
  addBoxShell(cells, [-3, 3, -24, 1, -3, 3], "graphiteLight");
  addBoxShell(cells, [-4, 4, -18, -8, -4, 4], "graphite");
  return cells;
}

function createFootCells(): readonly Cell[] {
  const cells: Cell[] = [];
  addBoxShell(cells, [-5, 5, -5, 2, -4, 7], "graphite");
  for (let x = -4; x <= 4; x += 1) {
    for (let z = -3; z <= 6; z += 1) add(cells, x, -6, z, "jacketLight");
  }
  add(cells, 5, -3, 7.5, "cyan");
  return cells;
}

function createEquipmentCells(): readonly Cell[] {
  const cells: Cell[] = [];
  addBoxShell(cells, [-8, 8, 47, 81, -14, -8], "graphiteLight");
  addBoxShell(cells, [-6, 6, 52, 76, -15, -14], "metal");
  for (let x = -4; x <= 4; x += 1) {
    for (let y = 59; y <= 69; y += 1) add(cells, x, y, -15.6, "cyan");
  }
  for (let y = 49; y <= 78; y += 1) {
    add(cells, -9, y, -11, y % 4 === 0 ? "coral" : "metal");
    add(cells, 9, y, -11, y % 5 === 0 ? "coral" : "metal");
  }
  return cells;
}

function createSurface(
  name: string,
  cells: readonly Cell[],
  materials: MaterialLibrary,
  cellSize: number,
): Surface {
  const group = new THREE.Group();
  group.name = name;
  const geometry = new THREE.BoxGeometry(
    cellSize * 0.94,
    cellSize * 0.94,
    cellSize * 0.94,
  );
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  for (const role of Object.keys(COLORS) as CellRole[]) {
    const selected = cells.filter((cell) => cell.role === role);
    if (selected.length === 0) continue;
    const mesh = new THREE.InstancedMesh(
      geometry,
      materials.byRole[role],
      selected.length,
    );
    mesh.name = `${name}-${role}`;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    selected.forEach((cell, index) => {
      matrix.makeTranslation(cell.x * cellSize, cell.y * cellSize, cell.z * cellSize);
      mesh.setMatrixAt(index, matrix);
      const seed = (
        Math.imul(Math.round(cell.x * 10) + 127, 73_856_093) ^
        Math.imul(Math.round(cell.y * 10) + 263, 19_349_663) ^
        Math.imul(Math.round(cell.z * 10) + 401, 83_492_791)
      ) >>> 0;
      // The material owns the palette. Instance color is only a subtle value
      // variation; applying the palette twice made the pale jacket and skin
      // collapse into the graphite silhouette at gameplay distance.
      const value = 0.92 + ((seed >>> 8) & 0xff) / 255 * 0.08;
      color.setRGB(value, value, value);
      mesh.setColorAt(index, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor !== null) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
  }
  return { group, geometry, cellCount: cells.length };
}

function findGroup(root: THREE.Object3D, name: string): THREE.Group {
  const object = root.getObjectByName(name);
  if (!(object instanceof THREE.Group)) {
    throw new Error(`R08 semantic voxel group was not found: ${name}`);
  }
  return object;
}

function hideInheritedSurfaces(root: THREE.Object3D): void {
  root.traverse((object) => {
    if (
      object.name.includes("voxel-surface") ||
      object.name.includes("expressive-eye") ||
      object.name === "fram-f01-cute-face-details" ||
      object.name === "fram-f01-a-line-field-coat" ||
      object.name === "fram-f01a-semantic-head" ||
      object.name === "fram-f01a-short-tech-jacket"
    ) {
      object.visible = false;
    }
  });
}

export function createR08FramHeroVisual(): R08FramHeroVisual {
  const sourceVisual = createR07FramHeroVisual();
  const library = createMaterials();
  hideInheritedSurfaces(sourceVisual.root);

  const groups = {
    head: findGroup(sourceVisual.root, "fram-f01-head-voxel-pivot"),
    torso: findGroup(sourceVisual.root, "fram-f01-torso-voxel-pivot"),
    leftUpperArm: findGroup(sourceVisual.root, "fram-f01-leftUpperArm-voxel-pivot"),
    leftForearm: findGroup(sourceVisual.root, "fram-f01-leftForearm-voxel-pivot"),
    leftHand: findGroup(sourceVisual.root, "fram-f01-leftHand-voxel-pivot"),
    rightUpperArm: findGroup(sourceVisual.root, "fram-f01-rightUpperArm-voxel-pivot"),
    rightForearm: findGroup(sourceVisual.root, "fram-f01-rightForearm-voxel-pivot"),
    rightHand: findGroup(sourceVisual.root, "fram-f01-rightHand-voxel-pivot"),
    leftThigh: findGroup(sourceVisual.root, "fram-f01-leftThigh-voxel-pivot"),
    leftCalf: findGroup(sourceVisual.root, "fram-f01-leftCalf-voxel-pivot"),
    leftFoot: findGroup(sourceVisual.root, "fram-f01-leftFoot-voxel-pivot"),
    rightThigh: findGroup(sourceVisual.root, "fram-f01-rightThigh-voxel-pivot"),
    rightCalf: findGroup(sourceVisual.root, "fram-f01-rightCalf-voxel-pivot"),
    rightFoot: findGroup(sourceVisual.root, "fram-f01-rightFoot-voxel-pivot"),
    equipment: findGroup(sourceVisual.root, "fram-f01-equipment-voxel-pivot"),
  };

  const surfaces = {
    head: createSurface("fram-f01b-head", createHeadCells(), library, HEAD_CELL),
    torso: createSurface("fram-f01b-torso", createTorsoCells(), library, BODY_CELL),
    leftUpperArm: createSurface("fram-f01b-left-upper-arm", createUpperArmCells(1), library, BODY_CELL),
    leftForearm: createSurface("fram-f01b-left-forearm", createForearmCells(1), library, BODY_CELL),
    leftHand: createSurface("fram-f01b-left-hand", createHandCells(1), library, BODY_CELL),
    rightUpperArm: createSurface("fram-f01b-right-upper-arm", createUpperArmCells(-1), library, BODY_CELL),
    rightForearm: createSurface("fram-f01b-right-forearm", createForearmCells(-1), library, BODY_CELL),
    rightHand: createSurface("fram-f01b-right-hand", createHandCells(-1), library, BODY_CELL),
    leftThigh: createSurface("fram-f01b-left-thigh", createThighCells(), library, BODY_CELL),
    leftCalf: createSurface("fram-f01b-left-calf", createCalfCells(), library, BODY_CELL),
    leftFoot: createSurface("fram-f01b-left-foot", createFootCells(), library, BODY_CELL),
    rightThigh: createSurface("fram-f01b-right-thigh", createThighCells(), library, BODY_CELL),
    rightCalf: createSurface("fram-f01b-right-calf", createCalfCells(), library, BODY_CELL),
    rightFoot: createSurface("fram-f01b-right-foot", createFootCells(), library, BODY_CELL),
    equipment: createSurface("fram-f01b-archive-pack", createEquipmentCells(), library, BODY_CELL),
  };

  for (const key of Object.keys(surfaces) as (keyof typeof surfaces)[]) {
    groups[key].add(surfaces[key].group);
  }
  surfaces.head.group.position.set(0, -HEAD_CELL * 1.4, 0);

  const baseUpdatePose = sourceVisual.updatePose.bind(sourceVisual);
  const baseSetTint = sourceVisual.setTint.bind(sourceVisual);
  const baseDispose = sourceVisual.dispose.bind(sourceVisual);
  const semanticCellCount = Object.values(surfaces)
    .reduce((sum, surface) => sum + surface.cellCount, 0);

  sourceVisual.root.name = R08_FRAM_HERO_ASSET_DNA.id;
  sourceVisual.root.userData.assetDNA = R08_FRAM_HERO_ASSET_DNA;
  sourceVisual.root.userData.visibleVoxelCells = semanticCellCount;
  sourceVisual.root.userData.runtimeRepresentation =
    "unified-semantic-high-density-articulated-voxel-girl";
  sourceVisual.root.userData.characterPreset =
    R08_FRAM_HERO_ASSET_DNA.characterPreset;

  const visual: R08FramHeroVisual = {
    ...sourceVisual,
    sourceVisual,
    semanticCellCount,
    updatePose(input: HeroAnimationInput): void {
      baseUpdatePose(input);
      // Counter the inherited R05 compact-root Y compression so the head is
      // a small rounded-square bob instead of a wide helmet disc.
      groups.head.scale.set(1.02, 1.43, 1.02);
      groups.head.rotation.z += 0.018;
      const breathe = Math.sin(input.timeSeconds * 2.05) * 0.014;
      surfaces.head.group.rotation.y = breathe;
      surfaces.torso.group.rotation.z = -breathe * 0.18;
      surfaces.equipment.group.rotation.z = breathe * 0.12;
    },
    setTint(color: THREE.ColorRepresentation): void {
      baseSetTint(color);
      const tint = new THREE.Color(color);
      for (const [material, original] of library.originals) {
        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshBasicMaterial
        ) {
          material.color.copy(original).multiply(tint);
        }
      }
    },
    dispose(): void {
      for (const surface of Object.values(surfaces)) surface.geometry.dispose();
      for (const material of library.owned) material.dispose();
      baseDispose();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}
