import * as THREE from "three";
import type { HeroAnimationInput, HeroVisual } from "./HeroVisual";
import {
  createR05FramHeroVisual,
  R05_FRAM_HERO_ASSET_DNA,
  type R05FramHeroVisual,
} from "./R05FramHeroVisual";

const CELL = 0.0195 * 42.5;
const HEAD_CELL = CELL * 0.56;

type DetailRole =
  | "skin"
  | "hair"
  | "hairShade"
  | "eye"
  | "eyeLight"
  | "cheek"
  | "jacket"
  | "jacketShade"
  | "graphite"
  | "coral"
  | "cyan";

type DetailCell = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly role: DetailRole;
};

const DETAIL_COLORS = Object.freeze({
  skin: 0xf1b095,
  hair: 0xf0eadf,
  hairShade: 0x9da99f,
  eye: 0x163b40,
  eyeLight: 0x8effef,
  cheek: 0xe69a91,
  jacket: 0xc2cab8,
  jacketShade: 0x718179,
  graphite: 0x263238,
  coral: 0xd95c4d,
  cyan: 0x65f5e5,
} as const satisfies Readonly<Record<DetailRole, number>>);

export const R07_FRAM_HERO_ASSET_DNA = Object.freeze({
  ...R05_FRAM_HERO_ASSET_DNA,
  schemaVersion: 4,
  id: "actor.fram.module-f01a.semantic-micro-voxel-girl",
  generatorVersion: "semantic-volume-overlay-v1",
  rigFamily: "humanoid-fram-compact-voxel-v4",
  bodyRatioHeads: 3.6,
  characterPreset: "semantic-micro-voxel-girl-a",
  semanticVolumes: [
    "broad asymmetric bob and separated side locks",
    "front-readable face, eye, cheek and mouth clusters",
    "short technical jacket and split utility hip panels",
    "compact gloves, boots, archive signal and analysis pack",
  ],
  artDirectionReference:
    "work/r07_character_depth/fram-r07-character-direction.png",
} as const);

export interface R07FramHeroVisual extends HeroVisual {
  readonly semanticCellCount: number;
  readonly sourceVisual: R05FramHeroVisual;
}

interface DetailMaterials {
  readonly byRole: Readonly<Record<DetailRole, THREE.Material>>;
  readonly owned: ReadonlySet<THREE.Material>;
}

function physical(
  color: THREE.ColorRepresentation,
  roughness: number,
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness,
    metalness: 0,
    sheen: 0.34,
    sheenColor: color,
    sheenRoughness: 0.72,
  });
}

function createDetailMaterials(): DetailMaterials {
  const byRole: Record<DetailRole, THREE.Material> = {
    skin: physical(DETAIL_COLORS.skin, 0.58),
    hair: physical(DETAIL_COLORS.hair, 0.4),
    hairShade: physical(DETAIL_COLORS.hairShade, 0.56),
    eye: physical(DETAIL_COLORS.eye, 0.38),
    eyeLight: physical(0xd8fff4, 0.34),
    cheek: physical(DETAIL_COLORS.cheek, 0.62),
    jacket: physical(DETAIL_COLORS.jacket, 0.74),
    jacketShade: physical(DETAIL_COLORS.jacketShade, 0.78),
    graphite: physical(DETAIL_COLORS.graphite, 0.7),
    coral: physical(DETAIL_COLORS.coral, 0.76),
    cyan: new THREE.MeshBasicMaterial({
      color: DETAIL_COLORS.cyan,
      toneMapped: false,
    }),
  };
  return { byRole, owned: new Set(Object.values(byRole)) };
}

function addCell(
  cells: DetailCell[],
  x: number,
  y: number,
  z: number,
  role: DetailRole,
): void {
  cells.push({ x, y, z, role });
}

function createHeadCells(): readonly DetailCell[] {
  const cells: DetailCell[] = [];

  // The character-direction sheet needs more than a dozen cells across the
  // head. R07 therefore uses a 0.56x micro-cell grid for the face and hair,
  // while the inherited body retains its original articulated voxel grid.
  for (let y = -11; y <= 12; y += 1) {
    for (let x = -10; x <= 10; x += 1) {
      for (let z = -9; z <= 9; z += 1) {
        const nx = x / 10.3;
        const ny = (y - 0.6) / 11.8;
        const nz = z / 9.35;
        const distance = nx * nx + ny * ny + nz * nz;
        if (distance > 1 || distance < 0.76) continue;
        const faceWindow = z >= 4 && x >= -7 && x <= 7 && y >= -6 && y <= 6;
        if (faceWindow) continue;
        const shade = x >= 6 || z < -4 || y < -6;
        addCell(cells, x, y + 8, z, shade ? "hairShade" : "hair");
      }
    }
  }

  // A single front face plane turns with the articulated head. It is rounded
  // by the hair opening instead of wrapping extra eyes around the side.
  for (let y = -6; y <= 6; y += 1) {
    for (let x = -7; x <= 7; x += 1) {
      if ((Math.abs(x) === 7 && (y <= -4 || y >= 5)) ||
        (Math.abs(x) === 6 && y === -6)) {
        continue;
      }
      addCell(cells, x, y + 8, 9.35, "skin");
    }
  }

  for (const side of [-1, 1] as const) {
    for (let y = -1; y <= 2; y += 1) {
      for (let x = 2; x <= 5; x += 1) {
        addCell(cells, side * x, y + 8, 9.95, "eye");
      }
    }
    addCell(cells, side * 2, 10, 10.25, "eyeLight");
    addCell(cells, side * 5, 6, 9.95, "cheek");
    for (let x = 2; x <= 5; x += 1) {
      addCell(cells, side * x, 11, 9.96, "graphite");
    }
  }
  addCell(cells, 0, 4, 10.04, "graphite");
  addCell(cells, 1, 4, 10.04, "graphite");

  // Layered fringe stays clear of the pupils, with one asymmetric lock that
  // breaks the helmet silhouette without covering the face.
  for (let x = -8; x <= 8; x += 1) {
    const fringeBottom = x <= -5 ? 9 : x <= -1 ? 12 : x <= 4 ? 13 : 11;
    for (let y = fringeBottom; y <= 18; y += 1) {
      addCell(cells, x, y, 9.75, x >= 6 ? "hairShade" : "hair");
    }
  }
  for (const side of [-1, 1] as const) {
    for (let y = -5; y <= 4; y += 1) {
      for (let x = 0; x <= 1; x += 1) {
        addCell(
          cells,
          side * (9 + x),
          y + 8,
          7.6,
          side > 0 ? "hairShade" : "hair",
        );
      }
    }
  }
  for (let y = 20; y <= 24; y += 1) {
    addCell(cells, -2, y, 0, "hair");
    if (y >= 22) addCell(cells, -1, y, 0, "hair");
  }

  return cells;
}

function createGarmentCells(): readonly DetailCell[] {
  const cells: DetailCell[] = [];
  // Short jacket shoulder line and cropped hem. The old long A-line coat is
  // hidden for R07 so the silhouette cannot drift back to medieval robes.
  for (let x = -7; x <= 7; x += 1) {
    for (const z of [-4.6, 4.8]) {
      addCell(cells, x, 47, z, Math.abs(x) >= 6 ? "jacketShade" : "jacket");
      if (Math.abs(x) <= 5) addCell(cells, x, 36, z, "jacketShade");
    }
  }
  for (let y = 37; y <= 46; y += 1) {
    for (const x of [-7, 7]) {
      addCell(cells, x, y, 0, x > 0 ? "jacketShade" : "jacket");
    }
  }

  // Split utility panels keep motion readable and leave the legs visible.
  for (const side of [-1, 1] as const) {
    for (let y = 25; y <= 35; y += 1) {
      for (let x = 2; x <= 5; x += 1) {
        if (y <= 27 && x === 5) continue;
        addCell(cells, side * x, y, 4.5, side < 0 ? "jacket" : "jacketShade");
      }
    }
  }

  for (let y = 28; y <= 36; y += 1) {
    addCell(cells, -6.2, y, -1, "coral");
    if (y <= 33) addCell(cells, -7.1, y, -1, "coral");
  }
  addCell(cells, 0, 43, 5.35, "cyan");
  addCell(cells, 0, 42, 5.35, "cyan");
  return cells;
}

function createCellSurface(
  name: string,
  cells: readonly DetailCell[],
  materials: DetailMaterials,
  cellSize = CELL,
): {
  readonly group: THREE.Group;
  readonly geometries: ReadonlySet<THREE.BufferGeometry>;
} {
  const group = new THREE.Group();
  group.name = name;
  const geometry = new THREE.BoxGeometry(
    cellSize * 0.94,
    cellSize * 0.94,
    cellSize * 0.94,
  );
  const geometries = new Set<THREE.BufferGeometry>([geometry]);
  const matrix = new THREE.Matrix4();
  for (const role of Object.keys(DETAIL_COLORS) as DetailRole[]) {
    const selected = cells.filter((cell) => cell.role === role);
    if (selected.length === 0) continue;
    const mesh = new THREE.InstancedMesh(geometry, materials.byRole[role], selected.length);
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
      const value = 0.92 + ((seed >>> 8) & 0xff) / 255 * 0.08;
      mesh.setColorAt(index, new THREE.Color(value, value, value));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor !== null) mesh.instanceColor.needsUpdate = true;
    group.add(mesh);
  }
  return { group, geometries };
}

function findRequiredGroup(root: THREE.Object3D, name: string): THREE.Group {
  const object = root.getObjectByName(name);
  if (!(object instanceof THREE.Group)) {
    throw new Error(`R07 semantic voxel group was not found: ${name}`);
  }
  return object;
}

export function createR07FramHeroVisual(): R07FramHeroVisual {
  const sourceVisual = createR05FramHeroVisual();
  const materials = createDetailMaterials();
  const headCells = createHeadCells();
  const garmentCells = createGarmentCells();
  const headSurface = createCellSurface(
    "fram-f01a-semantic-head",
    headCells,
    materials,
    HEAD_CELL,
  );
  const garmentSurface = createCellSurface(
    "fram-f01a-short-tech-jacket",
    garmentCells,
    materials,
  );
  const head = findRequiredGroup(sourceVisual.root, "fram-f01-head-voxel-pivot");
  const torso = findRequiredGroup(sourceVisual.root, "fram-f01-torso-voxel-pivot");
  const leftLeg = findRequiredGroup(sourceVisual.root, "fram-f01-leftThigh-voxel-pivot");
  const rightLeg = findRequiredGroup(sourceVisual.root, "fram-f01-rightThigh-voxel-pivot");

  for (const object of [...head.children]) {
    if (object.name.includes("voxel-surface") || object.name.includes("expressive-eye") || object.name === "fram-f01-cute-face-details") {
      object.visible = false;
    }
  }
  const longCoat = sourceVisual.root.getObjectByName("fram-f01-a-line-field-coat");
  if (longCoat !== undefined) longCoat.visible = false;

  head.add(headSurface.group);
  torso.add(garmentSurface.group);
  headSurface.group.position.set(0, -HEAD_CELL * 1.5, 0);

  const leftLegBase = leftLeg.position.clone();
  const rightLegBase = rightLeg.position.clone();
  const baseUpdatePose = sourceVisual.updatePose.bind(sourceVisual);
  const baseDispose = sourceVisual.dispose.bind(sourceVisual);
  const semanticCellCount = headCells.length + garmentCells.length;

  sourceVisual.root.name = R07_FRAM_HERO_ASSET_DNA.id;
  sourceVisual.root.userData.assetDNA = R07_FRAM_HERO_ASSET_DNA;
  sourceVisual.root.userData.visibleVoxelCells =
    Number(sourceVisual.root.userData.visibleVoxelCells ?? 0) + semanticCellCount;
  sourceVisual.root.userData.runtimeRepresentation =
    "semantic-high-density-articulated-voxel-girl";
  sourceVisual.root.userData.characterPreset =
    R07_FRAM_HERO_ASSET_DNA.characterPreset;

  const visual: R07FramHeroVisual = {
    ...sourceVisual,
    sourceVisual,
    semanticCellCount,
    updatePose(input: HeroAnimationInput): void {
      baseUpdatePose(input);
      head.scale.set(1.43, 1.38, 1.42);
      head.rotation.z += 0.025;
      leftLeg.scale.set(0.94, 0.78, 0.96);
      rightLeg.scale.set(0.94, 0.78, 0.96);
      leftLeg.position.copy(leftLegBase).add(new THREE.Vector3(1.25, -4.8, 0));
      rightLeg.position.copy(rightLegBase).add(new THREE.Vector3(-1.25, -4.8, 0));
      const breathe = Math.sin(input.timeSeconds * 2.1) * 0.018;
      headSurface.group.rotation.y = breathe;
      garmentSurface.group.rotation.z = -breathe * 0.35;
    },
    dispose(): void {
      for (const geometry of headSurface.geometries) geometry.dispose();
      for (const geometry of garmentSurface.geometries) geometry.dispose();
      for (const material of materials.owned) material.dispose();
      baseDispose();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}
