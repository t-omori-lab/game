import * as THREE from "three";
import {
  ColoredGeometryBuilder,
  type Vector3Tuple,
} from "./coloredGeometry";
import { TOWN_CONTRACT_BOARD_POSITION } from "../sim/content";

export interface StartTownArtSlice {
  readonly group: THREE.Group;
  readonly ground: THREE.Object3D;
  readonly replacedTerrainIds: ReadonlySet<string>;
  readonly replacedPropIds: ReadonlySet<string>;
  dispose(): void;
}

export interface StartTownArtMetrics {
  readonly drawCalls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly components: number;
}

export interface StartTownLifePassMetrics {
  readonly addedComponents: number;
  readonly addedTriangles: number;
  readonly repairPanelCount: number;
  readonly roofDamageFillRatio: number;
  readonly gardenBedCount: number;
  readonly laundryClothCount: number;
  readonly dangerRedOrangeUsed: false;
  readonly gardenBounds: {
    readonly minimumX: number;
    readonly maximumX: number;
    readonly minimumZ: number;
    readonly maximumZ: number;
  };
}

export const START_TOWN_ART_BUDGET = {
  targetDrawCalls: 16,
  maximumTriangles: 27_000,
} as const;

const REPLACED_TERRAIN_IDS: ReadonlySet<string> = new Set([
  "town-hall",
  "town-well",
  "south-house",
  "town-board-collider",
  "town-hall-workyard-collider",
  "town-repair-bench-collider",
  "town-south-lamp-collider",
  "town-kitchen-garden-collider",
  "town-south-crates-collider",
]);
const REPLACED_PROP_IDS: ReadonlySet<string> = new Set([
  "town-contract-board",
  "town-lamp-a",
  "town-lamp-b",
]);

const X_AXIS = new THREE.Vector3(1, 0, 0);
const segmentDirection = new THREE.Vector3();
const segmentMidpoint = new THREE.Vector3();
const segmentQuaternion = new THREE.Quaternion();
const segmentEuler = new THREE.Euler();

const PALETTE = {
  moss: [0x4f7d48, 0x5d8a50, 0x75975a, 0x3f7044],
  soil: [0x997552, 0x896747, 0xaa8358, 0x785d43],
  stone: [0xa7a58f, 0x929785, 0xb6b19c, 0x7f897b],
  paleWall: [0xc8c4a7, 0xb9b99f, 0xd1cbb2, 0xaeb39a],
  roof: [0xa85e42, 0x934d3a, 0xb66d48, 0x7f4a3e],
  timber: [0x684a35, 0x77543a, 0x4f3d31, 0x876242],
  rust: [0x8b5138, 0xa2613f, 0x6c4b3d, 0xb1764d],
  foliage: [0x3d7b48, 0x57934f, 0x6da553, 0x2f6742],
  paper: [0xd8cfaa, 0xcbbd91, 0xe0d7b9, 0xb8aa7d],
} as const;

type BatchOptions = {
  readonly name: string;
  readonly roughness: number;
  readonly metalness?: number;
  readonly castShadow?: boolean;
  readonly receiveShadow?: boolean;
  readonly emissive?: THREE.ColorRepresentation;
  readonly emissiveIntensity?: number;
};

type RoofOptions = {
  readonly centerX: number;
  readonly ridgeZ: number;
  readonly wallTop: number;
  readonly width: number;
  readonly halfDepth: number;
  readonly rise: number;
  readonly columns: number;
  readonly rows: number;
  readonly seed: number;
  readonly brokenSide: -1 | 1;
};

function hash(first: number, second: number, third = 0): number {
  return (
    Math.imul(Math.trunc(first) + 0x3d, 73_856_093) ^
    Math.imul(Math.trunc(second) + 0x71, 19_349_663) ^
    Math.imul(Math.trunc(third) + 0xb9, 83_492_791)
  ) >>> 0;
}

function hashUnit(value: number, shift = 0): number {
  return ((value >>> shift) & 0x3ff) / 0x3ff;
}

function paletteColor(
  palette: readonly number[],
  seed: number,
): number {
  return palette[seed % palette.length] ?? palette[0] ?? 0xffffff;
}

function ribbonEdges(
  points: readonly Vector3Tuple[],
  widths: readonly number[],
): {
  readonly left: Vector3Tuple[];
  readonly right: Vector3Tuple[];
} {
  const left: Vector3Tuple[] = [];
  const right: Vector3Tuple[] = [];

  points.forEach((point, index) => {
    const previous = points[Math.max(0, index - 1)] ?? point;
    const next = points[Math.min(points.length - 1, index + 1)] ?? point;
    const tangentX = next[0] - previous[0];
    const tangentZ = next[2] - previous[2];
    const tangentLength = Math.hypot(tangentX, tangentZ) || 1;
    const halfWidth = (widths[index] ?? widths[0] ?? 1) / 2;
    const offsetX = (-tangentZ / tangentLength) * halfWidth;
    const offsetZ = (tangentX / tangentLength) * halfWidth;
    left.push([
      point[0] + offsetX,
      point[1],
      point[2] + offsetZ,
    ]);
    right.push([
      point[0] - offsetX,
      point[1],
      point[2] - offsetZ,
    ]);
  });

  return { left, right };
}

function addRibbon(
  builder: ColoredGeometryBuilder,
  points: readonly Vector3Tuple[],
  widths: readonly number[],
  colors: readonly number[],
): void {
  if (points.length < 2 || points.length !== widths.length) {
    throw new RangeError("Ribbon points and widths must have equal length.");
  }

  const edges = ribbonEdges(points, widths);

  for (let index = 0; index < points.length - 1; index += 1) {
    const leftStart = edges.left[index];
    const leftEnd = edges.left[index + 1];
    const rightEnd = edges.right[index + 1];
    const rightStart = edges.right[index];

    if (
      leftStart === undefined ||
      leftEnd === undefined ||
      rightEnd === undefined ||
      rightStart === undefined
    ) {
      continue;
    }

    const firstColor = colors[index % colors.length] ?? 0xffffff;
    const secondColor = colors[(index + 1) % colors.length] ?? firstColor;
    builder.addQuad({
      corners: [leftStart, leftEnd, rightEnd, rightStart],
      color: [firstColor, secondColor, secondColor, firstColor],
    });
  }
}

function withHeight(
  points: readonly (readonly [number, number])[],
  height: number,
): Vector3Tuple[] {
  return points.map(([x, z]) => [x, height, z]);
}

function addRoadNetwork(builder: ColoredGeometryBuilder): void {
  const main = withHeight(
    [
      [24, 930],
      [140, 920],
      [275, 908],
      [415, 900],
      [555, 902],
      [695, 890],
      [824, 876],
    ],
    1.18,
  );
  const mainWidths = [132, 124, 114, 108, 116, 124, 136];
  addRibbon(
    builder,
    main.map(([x, , z]) => [x, 1.05, z]),
    mainWidths.map((width) => width + 22),
    [0x6f5a43, 0x796047, 0x6b5742],
  );
  addRibbon(builder, main, mainWidths, [
    0xa27c55,
    0x98714e,
    0xad855b,
    0x8f694b,
  ]);

  const hallBranch = withHeight(
    [
      [270, 910],
      [265, 850],
      [267, 790],
      [267, 716],
    ],
    1.24,
  );
  addRibbon(builder, hallBranch, [82, 78, 68, 60], [
    0x9b7652,
    0xa78159,
    0x8f6c4c,
  ]);

  const houseBranch = withHeight(
    [
      [292, 908],
      [290, 970],
      [278, 1_025],
      [267, 1_091],
    ],
    1.26,
  );
  addRibbon(builder, houseBranch, [72, 70, 64, 58], [
    0x987250,
    0xa57e56,
    0x8c6849,
  ]);

  addRibbon(
    builder,
    main.map(([x, , z]) => [x, 1.5, z - 27]),
    mainWidths.map(() => 7),
    [0x76563f, 0x684f3d],
  );
  addRibbon(
    builder,
    main.map(([x, , z]) => [x, 1.52, z + 24]),
    mainWidths.map(() => 6),
    [0x6e523e, 0x7b5b42],
  );

  for (let index = 0; index < 74; index += 1) {
    const seed = hash(index, 41, 13);
    const progress = index / 73;
    const x = 45 + progress * 752;
    const z =
      925 -
      progress * 46 +
      (hashUnit(seed, 5) - 0.5) * 126;
    const side = index % 2 === 0 ? -1 : 1;
    builder.addBox({
      center: [
        x,
        2.05 + hashUnit(seed, 17) * 0.4,
        z + side * (57 + hashUnit(seed, 12) * 16),
      ],
      size: [
        8 + hashUnit(seed, 2) * 12,
        1.5 + hashUnit(seed, 20) * 1.2,
        6 + hashUnit(seed, 9) * 9,
      ],
      rotation: [0, hashUnit(seed, 14) * Math.PI, 0],
      color: paletteColor(PALETTE.stone, seed),
      shade: 0.92,
    });
  }
}

function insideStructure(x: number, z: number, margin = 0): boolean {
  return (
    (x > 130 - margin &&
      x < 380 + margin &&
      z > 570 - margin &&
      z < 720 + margin) ||
    (x > 150 - margin &&
      x < 380 + margin &&
      z > 1_090 - margin &&
      z < 1_220 + margin) ||
    (x > 320 - margin &&
      x < 402 + margin &&
      z > 790 - margin &&
      z < 872 + margin)
  );
}

function addGroundPatches(builder: ColoredGeometryBuilder): void {
  const clusters = [
    { x: 105, z: 630, radius: 58, count: 13, palette: PALETTE.moss },
    { x: 407, z: 694, radius: 56, count: 18, palette: PALETTE.stone },
    { x: 207, z: 752, radius: 52, count: 13, palette: PALETTE.soil },
    { x: 361, z: 831, radius: 72, count: 17, palette: PALETTE.moss },
    { x: 500, z: 900, radius: 92, count: 15, palette: PALETTE.stone },
    { x: 471, z: 760, radius: 44, count: 9, palette: PALETTE.soil },
    { x: 471, z: 1_040, radius: 46, count: 9, palette: PALETTE.moss },
    { x: 258, z: 1_058, radius: 54, count: 12, palette: PALETTE.soil },
    { x: 407, z: 1_202, radius: 58, count: 17, palette: PALETTE.stone },
    { x: 126, z: 1_164, radius: 54, count: 12, palette: PALETTE.moss },
    { x: 118, z: 830, radius: 68, count: 12, palette: PALETTE.soil },
    { x: 178, z: 1_004, radius: 72, count: 12, palette: PALETTE.moss },
    { x: 652, z: 801, radius: 76, count: 13, palette: PALETTE.soil },
    { x: 704, z: 977, radius: 78, count: 13, palette: PALETTE.moss },
  ] as const;

  clusters.forEach((cluster, clusterIndex) => {
    for (let index = 0; index < cluster.count; index += 1) {
      const seed = hash(clusterIndex, index, 73);
      const angle =
        hashUnit(seed, 3) * Math.PI * 2 + clusterIndex * 0.37;
      const distance = Math.sqrt(hashUnit(seed, 13)) * cluster.radius;
      const x =
        cluster.x +
        Math.cos(angle) * distance +
        (hashUnit(seed, 19) - 0.5) * 8;
      const z =
        cluster.z +
        Math.sin(angle) * distance +
        (hashUnit(seed, 7) - 0.5) * 8;

      if (insideStructure(x, z, 10)) {
        continue;
      }

      const secondaryPalette =
        clusterIndex % 3 === 0
          ? PALETTE.soil
          : clusterIndex % 3 === 1
            ? PALETTE.moss
            : PALETTE.stone;
      const palette =
        index % 5 === 0 ? secondaryPalette : cluster.palette;
      builder.addBox({
        center: [x, 1.08 + hashUnit(seed, 21) * 0.24, z],
        size: [
          8 + hashUnit(seed, 5) * 24,
          0.75 + hashUnit(seed, 23) * 0.9,
          8 + hashUnit(seed, 15) * 24,
        ],
        rotation: [0, angle + hashUnit(seed, 9) * 0.65, 0],
        color: paletteColor(palette, seed >>> 4),
        shade: 0.9 + hashUnit(seed, 18) * 0.14,
      });
    }
  });

  const plazaStones = [
    [414, 846],
    [446, 838],
    [478, 843],
    [511, 839],
    [540, 849],
    [427, 874],
    [463, 872],
    [501, 875],
    [535, 878],
    [409, 911],
    [444, 908],
    [482, 913],
    [525, 909],
    [555, 913],
    [424, 947],
    [460, 944],
    [500, 948],
    [538, 942],
  ] as const;

  plazaStones.forEach(([x, z], index) => {
    const seed = hash(index, x, z);
    builder.addBox({
      center: [x, 1.7, z],
      size: [
        18 + hashUnit(seed, 4) * 9,
        1.8,
        13 + hashUnit(seed, 12) * 8,
      ],
      rotation: [0, (hashUnit(seed, 20) - 0.5) * 0.24, 0],
      color: paletteColor(PALETTE.stone, seed),
    });
  });
}

function addBoxBetween(
  builder: ColoredGeometryBuilder,
  start: Vector3Tuple,
  end: Vector3Tuple,
  thickness: number,
  color: THREE.ColorRepresentation,
  depth = thickness,
): void {
  segmentDirection
    .set(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
  const length = segmentDirection.length();

  if (length <= Number.EPSILON) {
    return;
  }

  segmentDirection.multiplyScalar(1 / length);
  segmentQuaternion.setFromUnitVectors(X_AXIS, segmentDirection);
  segmentEuler.setFromQuaternion(segmentQuaternion, "XYZ");
  segmentMidpoint.set(
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  );
  builder.addBox({
    center: [
      segmentMidpoint.x,
      segmentMidpoint.y,
      segmentMidpoint.z,
    ],
    size: [length, thickness, depth],
    rotation: [segmentEuler.x, segmentEuler.y, segmentEuler.z],
    color,
  });
}

function addStoneCourse(
  builder: ColoredGeometryBuilder,
  startX: number,
  endX: number,
  z: number,
  y: number,
  seedOffset: number,
): void {
  const count = Math.ceil((endX - startX) / 24);
  const width = (endX - startX) / count;

  for (let index = 0; index < count; index += 1) {
    const seed = hash(index, seedOffset, 19);
    builder.addBox({
      center: [
        startX + (index + 0.5) * width,
        y + (hashUnit(seed, 13) - 0.5) * 0.8,
        z,
      ],
      size: [
        width - 1.2,
        7 + hashUnit(seed, 5) * 2,
        11 + hashUnit(seed, 18) * 2,
      ],
      rotation: [0, (hashUnit(seed, 9) - 0.5) * 0.035, 0],
      color: paletteColor(PALETTE.stone, seed),
    });
  }
}

function addTownHall(
  masonry: ColoredGeometryBuilder,
  walls: ColoredGeometryBuilder,
  roof: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  rubble: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  coolGlow: ColoredGeometryBuilder,
): void {
  masonry.addBox({
    center: [255, 5, 645],
    size: [250, 10, 150],
    color: 0x777d70,
  });
  masonry.addBox({
    center: [255, 14, 578],
    size: [226, 8, 12],
    color: 0x8d9183,
  });
  for (const x of [137, 373]) {
    masonry.addBox({
      center: [x, 14, 645],
      size: [12, 8, 126],
      color: x === 137 ? 0x858c7e : 0x949587,
    });
  }
  addStoneCourse(masonry, 132, 378, 716, 12, 10);
  addStoneCourse(masonry, 132, 378, 574, 12, 11);
  addStoneCourse(masonry, 132, 378, 716, 21, 12);

  for (const x of [139, 371]) {
    for (let tier = 0; tier < 6; tier += 1) {
      const seed = hash(x, tier, 101);
      masonry.addBox({
        center: [x, 21 + tier * 13, 712],
        size: [
          16 + hashUnit(seed, 4) * 2,
          12,
          18 + hashUnit(seed, 14) * 2,
        ],
        rotation: [0, (hashUnit(seed, 20) - 0.5) * 0.045, 0],
        color: paletteColor(PALETTE.stone, seed),
      });
    }
  }

  walls.addBox({
    center: [255, 55, 578],
    size: [226, 76, 10],
    color: 0xbab8a0,
  });
  walls.addBox({
    center: [137, 55, 645],
    size: [10, 76, 126],
    color: 0xb1b39c,
  });

  const eastWallSegments = [
    { z: 596, y: 55, d: 30, h: 76 },
    { z: 626, y: 27, d: 30, h: 22 },
    { z: 626, y: 78, d: 30, h: 24 },
    { z: 680, y: 55, d: 78, h: 76 },
  ] as const;
  eastWallSegments.forEach((segment, index) => {
    walls.addBox({
      center: [373, segment.y, segment.z],
      size: [10, segment.h, segment.d],
      color: paletteColor(PALETTE.paleWall, hash(index, 81)),
    });
  });

  const facadeSegments = [
    { x: 149, y: 54, width: 20, height: 78 },
    { x: 178, y: 24, width: 38, height: 20 },
    { x: 178, y: 78, width: 38, height: 24 },
    { x: 220, y: 54, width: 44, height: 78 },
    { x: 268, y: 81, width: 42, height: 18 },
    { x: 305, y: 54, width: 30, height: 78 },
    { x: 337, y: 24, width: 32, height: 20 },
    { x: 337, y: 78, width: 32, height: 24 },
    { x: 362, y: 54, width: 18, height: 78 },
  ] as const;
  facadeSegments.forEach((segment, index) => {
    walls.addBox({
      center: [segment.x, segment.y, 712],
      size: [segment.width, segment.height, 9],
      color: paletteColor(PALETTE.paleWall, hash(index, 91)),
    });
  });

  const facadeStains = [
    [151, 57, 718, 13, 18, 0x87936f],
    [213, 35, 718, 15, 20, 0x9b8d6d],
    [304, 69, 718, 10, 15, 0x75896b],
    [359, 32, 718, 9, 16, 0x987e61],
  ] as const;
  facadeStains.forEach(([x, y, z, width, height, color]) => {
    walls.addBox({
      center: [x, y, z],
      size: [width, height, 1.5],
      color,
      shade: 0.92,
    });
  });

  const doorCenterX = 268;
  timber.addBox({
    center: [doorCenterX, 40, 707],
    size: [34, 58, 5],
    color: 0x46382f,
  });
  for (let plank = 0; plank < 4; plank += 1) {
    timber.addBox({
      center: [doorCenterX - 12.5 + plank * 8.3, 40, 710],
      size: [6.7, 54, 2],
      color: paletteColor(PALETTE.timber, hash(plank, 140)),
    });
  }
  timber.addBox({
    center: [doorCenterX - 22, 41, 714],
    size: [6, 68, 8],
    color: 0x5e4633,
  });
  timber.addBox({
    center: [doorCenterX + 22, 41, 714],
    size: [6, 68, 8],
    color: 0x5e4633,
  });
  timber.addBox({
    center: [doorCenterX, 74, 714],
    size: [50, 7, 9],
    color: 0x654a35,
  });
  metal.addBox({
    center: [doorCenterX + 10, 39, 713.5],
    size: [3, 4, 3],
    color: 0xb9824c,
  });

  const windows = [
    { x: 178, y: 51, z: 708, rotationY: 0 },
    { x: 337, y: 51, z: 708, rotationY: 0 },
  ] as const;
  windows.forEach((window, index) => {
    const glass = index === 0 ? coolGlow : warmGlow;
    glass.addBox({
      center: [window.x, window.y, window.z],
      size: [28, 24, 2],
      color: index === 0 ? 0x86b8a6 : 0xe1b66e,
    });
    timber.addBox({
      center: [window.x, window.y - 15, window.z + 4],
      size: [36, 5, 5],
      color: 0x594334,
    });
    timber.addBox({
      center: [window.x, window.y + 15, window.z + 4],
      size: [36, 5, 5],
      color: 0x594334,
    });
    timber.addBox({
      center: [window.x - 18, window.y, window.z + 4],
      size: [5, 34, 5],
      color: 0x594334,
    });
    timber.addBox({
      center: [window.x + 18, window.y, window.z + 4],
      size: [5, 34, 5],
      color: 0x594334,
    });
    timber.addBox({
      center: [window.x, window.y, window.z + 5],
      size: [3, 28, 3],
      color: 0x604737,
    });
    timber.addBox({
      center: [window.x, window.y, window.z + 5],
      size: [31, 3, 3],
      color: 0x604737,
    });
  });

  coolGlow.addBox({
    center: [369, 51, 626],
    size: [2, 23, 24],
    color: 0x79ac9d,
  });
  timber.addBox({
    center: [368, 51, 626],
    size: [4, 3, 29],
    color: 0x574233,
  });
  timber.addBox({
    center: [368, 51, 626],
    size: [4, 29, 3],
    color: 0x574233,
  });

  addPitchedRoof(roof, timber, {
    centerX: 255,
    ridgeZ: 645,
    wallTop: 94,
    width: 270,
    halfDepth: 86,
    rise: 34,
    columns: 17,
    rows: 7,
    seed: 211,
    brokenSide: 1,
  });

  masonry.addBox({
    center: [185, 108, 602],
    size: [27, 47, 25],
    color: 0x817f72,
  });
  masonry.addBox({
    center: [185, 133, 602],
    size: [33, 7, 31],
    color: 0x6f7469,
  });

  const steps = [
    { y: 3, z: 726, width: 54, depth: 15 },
    { y: 6, z: 720, width: 48, depth: 12 },
  ] as const;
  steps.forEach((step) => {
    masonry.addBox({
      center: [doorCenterX, step.y, step.z],
      size: [step.width, step.y * 2, step.depth],
      color: 0x8d9184,
    });
  });

  addRubbleArc(rubble, 255, 645, 154, 27, 311);
  addFacadeVines(foliage, 151, 714, 77, 401);
  addFacadeVines(foliage, 350, 714, 62, 402);
  addCrates(timber, metal, 394, 735, 3, 421);
  addTools(timber, metal, 116, 731, 431);
}

function addSouthHouse(
  masonry: ColoredGeometryBuilder,
  walls: ColoredGeometryBuilder,
  roof: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  rubble: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  coolGlow: ColoredGeometryBuilder,
): void {
  masonry.addBox({
    center: [265, 4, 1_155],
    size: [230, 8, 130],
    color: 0x757d70,
  });
  masonry.addBox({
    center: [265, 12, 1_095],
    size: [214, 8, 11],
    color: 0x878e80,
  });
  for (const x of [157, 375]) {
    masonry.addBox({
      center: [x, 12, 1_155],
      size: [11, 8, 112],
      color: x === 157 ? 0x818a7a : 0x909385,
    });
  }
  addStoneCourse(masonry, 152, 378, 1_216, 11, 510);

  walls.addBox({
    center: [265, 44, 1_095],
    size: [214, 66, 9],
    color: 0xb8b99f,
  });
  walls.addBox({
    center: [157, 44, 1_155],
    size: [9, 66, 112],
    color: 0xaeb59b,
  });

  const eastSegments = [
    { z: 1_112, y: 44, d: 28, h: 66 },
    { z: 1_145, y: 23, d: 38, h: 21 },
    { z: 1_145, y: 65, d: 38, h: 22 },
    { z: 1_194, y: 44, d: 52, h: 66 },
  ] as const;
  eastSegments.forEach((segment, index) => {
    walls.addBox({
      center: [375, segment.y, segment.z],
      size: [9, segment.h, segment.d],
      color: paletteColor(PALETTE.paleWall, hash(index, 521)),
    });
  });

  const southFacade = [
    { x: 168, y: 44, width: 24, height: 66 },
    { x: 205, y: 72, width: 50, height: 10 },
    { x: 245, y: 44, width: 30, height: 66 },
    { x: 293, y: 23, width: 66, height: 20 },
    { x: 293, y: 65, width: 66, height: 22 },
    { x: 350, y: 44, width: 46, height: 66 },
  ] as const;
  southFacade.forEach((segment, index) => {
    walls.addBox({
      center: [segment.x, segment.y, 1_215],
      size: [segment.width, segment.height, 9],
      color: paletteColor(PALETTE.paleWall, hash(index, 531)),
    });
  });
  walls.addBox({
    center: [352, 34, 1_221],
    size: [14, 23, 1.5],
    color: 0x84926f,
  });

  timber.addBox({
    center: [205, 38, 1_211],
    size: [40, 56, 5],
    color: 0x513d30,
  });
  for (let plank = 0; plank < 5; plank += 1) {
    timber.addBox({
      center: [190 + plank * 7.5, 38, 1_214],
      size: [5.8, 52, 2],
      color: paletteColor(PALETTE.timber, hash(plank, 540)),
    });
  }
  for (const x of [181, 229]) {
    timber.addBox({
      center: [x, 39, 1_218],
      size: [6, 64, 8],
      color: 0x604734,
    });
  }
  timber.addBox({
    center: [205, 70, 1_218],
    size: [55, 7, 9],
    color: 0x604734,
  });

  coolGlow.addBox({
    center: [293, 49, 1_211],
    size: [56, 28, 2],
    color: 0x8db9a6,
  });
  for (const x of [263, 323]) {
    timber.addBox({
      center: [x, 49, 1_217],
      size: [5, 36, 5],
      color: 0x594234,
    });
  }
  for (const y of [32, 66]) {
    timber.addBox({
      center: [293, y, 1_217],
      size: [64, 5, 5],
      color: 0x594234,
    });
  }
  timber.addBox({
    center: [293, 49, 1_217],
    size: [4, 30, 4],
    color: 0x594234,
  });

  warmGlow.addBox({
    center: [371, 49, 1_145],
    size: [2, 26, 31],
    color: 0xd6ac68,
  });
  timber.addBox({
    center: [369, 49, 1_145],
    size: [4, 34, 4],
    color: 0x584234,
  });
  timber.addBox({
    center: [369, 49, 1_145],
    size: [4, 4, 39],
    color: 0x584234,
  });

  addPitchedRoof(roof, timber, {
    centerX: 265,
    ridgeZ: 1_155,
    wallTop: 78,
    width: 248,
    halfDepth: 74,
    rise: 29,
    columns: 16,
    rows: 6,
    seed: 551,
    brokenSide: 1,
  });

  addRubbleArc(rubble, 265, 1_155, 134, 23, 571);
  addFacadeVines(foliage, 338, 1_219, 54, 581);
  addFacadeVines(foliage, 164, 1_219, 44, 582);
  addCrates(timber, metal, 403, 1_202, 2, 591);
  addTools(timber, metal, 135, 1_210, 601);
}

function addPitchedRoof(
  roof: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  options: RoofOptions,
): void {
  const tileWidth = options.width / options.columns;
  const rowDepth = options.halfDepth / options.rows;
  const slope = Math.atan2(options.rise, options.halfDepth);
  const slopeLength = Math.hypot(options.rise, options.halfDepth);
  const tileDepth = slopeLength / options.rows + 2.2;

  for (const side of [-1, 1] as const) {
    for (let row = 0; row < options.rows; row += 1) {
      for (let column = 0; column < options.columns; column += 1) {
        const seed = hash(column, row, options.seed + side * 17);
        const onBrokenSection =
          side === options.brokenSide &&
          column >= options.columns - 5 &&
          row >= 1 &&
          row <= options.rows - 2;
        const broken =
          onBrokenSection &&
          ((column + row) % 3 !== 0 ||
            column === options.columns - 1);

        if (broken) {
          continue;
        }

        const x =
          options.centerX -
          options.width / 2 +
          (column + 0.5) * tileWidth +
          (hashUnit(seed, 11) - 0.5) * 1.2;
        const distanceFromRidge = (row + 0.5) * rowDepth;
        const z = options.ridgeZ + side * distanceFromRidge;
        const y =
          options.wallTop +
          options.rise -
          (distanceFromRidge / options.halfDepth) * options.rise;
        roof.addBox({
          center: [x, y, z],
          size: [
            tileWidth + 1.4,
            3 + hashUnit(seed, 18) * 1.2,
            tileDepth,
          ],
          rotation: [
            side * slope,
            (hashUnit(seed, 7) - 0.5) * 0.025,
            (hashUnit(seed, 20) - 0.5) * 0.018,
          ],
          color: paletteColor(PALETTE.roof, seed),
        });
      }
    }
  }

  for (let column = 0; column < options.columns; column += 1) {
    const seed = hash(column, options.seed, 631);
    roof.addBox({
      center: [
        options.centerX -
          options.width / 2 +
          (column + 0.5) * tileWidth,
        options.wallTop + options.rise + 1.6,
        options.ridgeZ,
      ],
      size: [tileWidth + 1.2, 5.5, 9],
      rotation: [0, 0, (hashUnit(seed, 12) - 0.5) * 0.025],
      color: paletteColor(PALETTE.roof, seed),
    });
  }

  const exposedStart =
    options.centerX + options.width / 2 - tileWidth * 4.5;
  for (let rafter = 0; rafter < 5; rafter += 1) {
    const x = exposedStart + rafter * tileWidth;
    const start: Vector3Tuple = [
      x,
      options.wallTop + options.rise - 1,
      options.ridgeZ,
    ];
    const end: Vector3Tuple = [
      x,
      options.wallTop - 1,
      options.ridgeZ + options.brokenSide * options.halfDepth,
    ];
    addBoxBetween(timber, start, end, 3.4, 0x5e4431, 4.2);
  }
}

function addRubbleArc(
  builder: ColoredGeometryBuilder,
  centerX: number,
  centerZ: number,
  radius: number,
  count: number,
  seedOffset: number,
): void {
  for (let index = 0; index < count; index += 1) {
    const seed = hash(index, seedOffset, 701);
    const angle =
      (index / count) * Math.PI * 2 +
      (hashUnit(seed, 6) - 0.5) * 0.28;
    const distance =
      radius + (hashUnit(seed, 15) - 0.5) * 25;
    const sizeX = 5 + hashUnit(seed, 3) * 15;
    const sizeZ = 5 + hashUnit(seed, 10) * 13;
    const rubbleHeight = 0.8 + hashUnit(seed, 17) * 0.8;
    builder.addBox({
      center: [
        centerX + Math.cos(angle) * distance,
        0.25 + rubbleHeight / 2,
        centerZ + Math.sin(angle) * distance,
      ],
      size: [sizeX, rubbleHeight, sizeZ],
      rotation: [
        (hashUnit(seed, 1) - 0.5) * 0.05,
        angle + hashUnit(seed, 13),
        (hashUnit(seed, 8) - 0.5) * 0.05,
      ],
      color:
        index % 5 === 0
          ? paletteColor(PALETTE.roof, seed)
          : paletteColor(PALETTE.stone, seed),
    });
  }
}

function addFacadeVines(
  builder: ColoredGeometryBuilder,
  x: number,
  z: number,
  height: number,
  seedOffset: number,
): void {
  const points: Vector3Tuple[] = [];

  for (let segment = 0; segment < 7; segment += 1) {
    const seed = hash(segment, seedOffset, 733);
    points.push([
      x + Math.sin(segment * 1.3 + seedOffset) * 7,
      3 + (segment / 6) * height,
      z + hashUnit(seed, 12) * 1.4,
    ]);
  }

  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index];
    const end = points[index + 1];

    if (start === undefined || end === undefined) {
      continue;
    }

    addBoxBetween(builder, start, end, 2.2, 0x35653d, 1.5);
    const seed = hash(index, seedOffset, 739);
    builder.addBox({
      center: [
        end[0] + (hashUnit(seed, 4) - 0.5) * 9,
        end[1],
        end[2] + 1,
      ],
      size: [
        6 + hashUnit(seed, 12) * 5,
        3 + hashUnit(seed, 18) * 3,
        2.2,
      ],
      rotation: [
        0,
        (hashUnit(seed, 9) - 0.5) * 0.4,
        (hashUnit(seed, 21) - 0.5) * 0.45,
      ],
      color: paletteColor(PALETTE.foliage, seed),
    });
  }
}

function addCrates(
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  startX: number,
  startZ: number,
  count: number,
  seedOffset: number,
): void {
  for (let crate = 0; crate < count; crate += 1) {
    const seed = hash(crate, seedOffset, 751);
    const width = 25 + hashUnit(seed, 5) * 8;
    const height = 22 + hashUnit(seed, 13) * 9;
    const depth = 23 + hashUnit(seed, 19) * 8;
    const x = startX + crate * 25;
    const z = startZ + (crate % 2) * 22;
    const rotationY = (hashUnit(seed, 9) - 0.5) * 0.16;
    timber.addBox({
      center: [x, height / 2, z],
      size: [width, height, depth],
      rotation: [0, rotationY, 0],
      color: paletteColor(PALETTE.timber, seed),
    });

    for (const y of [4, height - 4]) {
      metal.addBox({
        center: [x, y, z],
        size: [width + 2, 2.2, depth + 2],
        rotation: [0, rotationY, 0],
        color: 0x7b5a42,
      });
    }
  }
}

function addTools(
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  x: number,
  z: number,
  seedOffset: number,
): void {
  for (let tool = 0; tool < 3; tool += 1) {
    const seed = hash(tool, seedOffset, 769);
    const base: Vector3Tuple = [x + tool * 9, 2, z + tool * 3];
    const top: Vector3Tuple = [
      base[0] + 7 + hashUnit(seed, 7) * 5,
      35 + hashUnit(seed, 14) * 11,
      base[2] - 3,
    ];
    addBoxBetween(timber, base, top, 3.2, 0x624833, 2.8);
    metal.addBox({
      center: [top[0], top[1] + 2, top[2]],
      size: [tool === 1 ? 15 : 11, 5, tool === 2 ? 9 : 4],
      rotation: [0, hashUnit(seed, 19) * 0.4, 0.18],
      color: paletteColor(PALETTE.rust, seed),
    });
  }
}

function addWell(
  masonry: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  coolGlow: ColoredGeometryBuilder,
): void {
  const centerX = 361;
  const centerZ = 831;
  const segments = 14;

  for (let tier = 0; tier < 3; tier += 1) {
    for (let index = 0; index < segments; index += 1) {
      const seed = hash(index, tier, 811);
      const angle =
        ((index + (tier % 2) * 0.5) / segments) * Math.PI * 2;
      const radius = 31 + (hashUnit(seed, 11) - 0.5) * 1.7;
      masonry.addBox({
        center: [
          centerX + Math.cos(angle) * radius,
          5 + tier * 9,
          centerZ + Math.sin(angle) * radius,
        ],
        size: [
          16.5 + hashUnit(seed, 3) * 2,
          8,
          11 + hashUnit(seed, 17) * 1.5,
        ],
        rotation: [0, -angle, 0],
        color: paletteColor(PALETTE.stone, seed),
      });
    }
  }

  coolGlow.addBox({
    center: [centerX, 16, centerZ],
    size: [42, 1.4, 42],
    color: 0x3f8f91,
    shade: 0.9,
  });
  for (const x of [329, 393]) {
    timber.addBox({
      center: [x, 49, centerZ],
      size: [8, 58, 9],
      color: 0x604532,
    });
    masonry.addBox({
      center: [x, 5, centerZ],
      size: [15, 10, 17],
      color: 0x7b8274,
    });
  }
  timber.addBox({
    center: [centerX, 75, centerZ],
    size: [82, 8, 9],
    color: 0x674a33,
  });
  metal.addBox({
    center: [centerX, 54, centerZ],
    size: [74, 5, 5],
    color: 0x6b5b4d,
  });
  metal.addBox({
    center: [centerX, 54, centerZ],
    size: [10, 16, 10],
    color: 0x9a633e,
  });
  addBoxBetween(
    metal,
    [centerX, 54, centerZ],
    [centerX, 23, centerZ],
    1.8,
    0x4c463f,
    1.8,
  );
  timber.addBox({
    center: [centerX, 21, centerZ],
    size: [18, 12, 16],
    color: 0x76543a,
  });

  for (let index = 0; index < 12; index += 1) {
    const seed = hash(index, 831, 17);
    const angle = (index / 12) * Math.PI * 2;
    foliage.addBox({
      center: [
        centerX + Math.cos(angle) * 39,
        2.5,
        centerZ + Math.sin(angle) * 39,
      ],
      size: [8 + hashUnit(seed, 8) * 7, 3, 5],
      rotation: [0, -angle, (hashUnit(seed, 17) - 0.5) * 0.25],
      color: paletteColor(PALETTE.moss, seed),
    });
  }
}

function addContractBoard(
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  walls: ColoredGeometryBuilder,
  rubble: ColoredGeometryBuilder,
): void {
  const x = TOWN_CONTRACT_BOARD_POSITION.x;
  const z = TOWN_CONTRACT_BOARD_POSITION.y;
  for (const postX of [470, 530]) {
    timber.addBox({
      center: [postX, 34, z],
      size: [8, 68, 9],
      color: 0x58402f,
    });
    rubble.addBox({
      center: [postX, 3, z],
      size: [17, 6, 18],
      color: 0x7e8578,
    });
  }
  timber.addBox({
    center: [x, 49, z],
    size: [76, 48, 8],
    color: 0x664a34,
  });
  for (let plank = 0; plank < 5; plank += 1) {
    timber.addBox({
      center: [x, 31 + plank * 9, z + 5],
      size: [70, 7, 3],
      color: paletteColor(PALETTE.timber, hash(plank, 901)),
    });
  }
  timber.addBox({
    center: [x, 76, z],
    size: [92, 7, 19],
    rotation: [0, 0, -0.035],
    color: 0x765039,
  });
  addBoxBetween(
    timber,
    [470, 10, z],
    [492, 75, z],
    4,
    0x4e392c,
  );
  addBoxBetween(
    timber,
    [530, 10, z],
    [508, 75, z],
    4,
    0x4e392c,
  );

  const notices = [
    { x: 479, y: 57, width: 19, height: 24, color: 0xd8cfaa },
    { x: 503, y: 54, width: 20, height: 29, color: 0xc8b988 },
    { x: 524, y: 59, width: 15, height: 20, color: 0xded5b5 },
    { x: 489, y: 36, width: 22, height: 14, color: 0xb8aa7d },
    { x: 518, y: 38, width: 23, height: 16, color: 0xd2c69f },
  ] as const;
  notices.forEach((notice, index) => {
    walls.addBox({
      center: [notice.x, notice.y, z + 7.1],
      size: [notice.width, notice.height, 0.9],
      rotation: [0, 0, (index - 2) * 0.025],
      color: notice.color,
      shade: 1.03,
    });
    metal.addBox({
      center: [notice.x, notice.y + notice.height / 2 - 3, z + 8],
      size: [2.4, 2.4, 1.8],
      color: index % 2 === 0 ? 0xb05f42 : 0x4e8174,
    });
  });
}

function addLamp(
  metal: ColoredGeometryBuilder,
  masonry: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  x: number,
  z: number,
  lean: number,
): void {
  masonry.addBox({
    center: [x, 4, z],
    size: [20, 8, 20],
    rotation: [0, lean, 0],
    color: 0x82877a,
  });
  metal.addBox({
    center: [x, 35, z],
    size: [7, 62, 7],
    rotation: [0, 0, lean],
    color: 0x554f47,
  });
  metal.addBox({
    center: [x + 9, 66, z],
    size: [25, 5, 6],
    rotation: [0, lean, -0.08],
    color: 0x5b5045,
  });
  metal.addBox({
    center: [x + 19, 57, z],
    size: [3.5, 17, 4],
    color: 0x62554a,
  });
  warmGlow.addBox({
    center: [x + 19, 53, z],
    size: [13, 15, 12],
    rotation: [0, lean, 0],
    color: 0xf2bc68,
    shade: 1.05,
  });
  for (const offsetX of [-7.5, 7.5]) {
    metal.addBox({
      center: [x + 19 + offsetX, 53, z],
      size: [2, 18, 15],
      rotation: [0, lean, 0],
      color: 0x594b40,
    });
  }
  metal.addBox({
    center: [x + 19, 62, z],
    size: [18, 3, 16],
    color: 0x675342,
  });
  metal.addBox({
    center: [x + 19, 44, z],
    size: [18, 3, 16],
    color: 0x675342,
  });
}

function addLampsAndCables(
  metal: ColoredGeometryBuilder,
  masonry: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  group: THREE.Group,
): void {
  addLamp(metal, masonry, warmGlow, 470, 760, -0.025);
  addLamp(metal, masonry, warmGlow, 470, 1_040, 0.018);

  const cableRuns: readonly (readonly Vector3Tuple[])[] = [
    [
      [489, 65, 760],
      [494, 58, 805],
      [498, 56, 850],
      [500, 72, 940],
    ],
    [
      [500, 72, 960],
      [498, 55, 974],
      [494, 57, 997],
      [489, 65, 1_040],
    ],
  ];
  cableRuns.forEach((points) => {
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index];
      const end = points[index + 1];

      if (start !== undefined && end !== undefined) {
        addBoxBetween(metal, start, end, 1.45, 0x3d3c39, 1.45);
      }
    }
  });

  for (const [x, z] of [
    [489, 760],
    [489, 1_040],
  ] as const) {
    const light = new THREE.PointLight(0xffbf72, 46, 155, 2);
    light.position.set(x, 57, z);
    light.castShadow = false;
    light.name = `start-town-lamp-light-${z}`;
    group.add(light);
  }
}

function addFoliageScatter(builder: ColoredGeometryBuilder): void {
  const clusters = 96;

  for (let index = 0; index < clusters; index += 1) {
    const seed = hash(index, 1_101, 29);
    const x = 52 + hashUnit(seed, 2) * 742;
    const z = 446 + hashUnit(seed, 12) * 900;

    if (
      insideStructure(x, z, 22) ||
      (x > 390 && x < 600 && Math.abs(z - 900) < 92)
    ) {
      continue;
    }

    const bladeCount = 2 + (seed % 3);
    for (let blade = 0; blade < bladeCount; blade += 1) {
      const bladeSeed = hash(index, blade, 1_111);
      const height = 7 + hashUnit(bladeSeed, 4) * 13;
      builder.addBox({
        center: [
          x + (hashUnit(bladeSeed, 11) - 0.5) * 10,
          1.8 + height / 2,
          z + (hashUnit(bladeSeed, 18) - 0.5) * 10,
        ],
        size: [2.2 + hashUnit(bladeSeed, 7) * 2, height, 2.2],
        rotation: [
          (hashUnit(bladeSeed, 14) - 0.5) * 0.32,
          hashUnit(bladeSeed, 21) * Math.PI,
          (hashUnit(bladeSeed, 2) - 0.5) * 0.28,
        ],
        color: paletteColor(PALETTE.foliage, bladeSeed),
      });
    }

    if (index % 9 === 0) {
      builder.addBox({
        center: [x, 13, z],
        size: [5, 5, 5],
        rotation: [0.2, hashUnit(seed, 18) * Math.PI, 0.2],
        color: index % 18 === 0 ? 0xe4b550 : 0xd47268,
        shade: 1.04,
      });
    }
  }
}

function addTownHallRepairLife(
  walls: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
): number {
  const repairColors = [
    0x6f9b91,
    0x83aaa0,
    0xc1a34f,
    0xa9bca7,
  ] as const;
  const centerX = 255;
  const ridgeZ = 645;
  const wallTop = 94;
  const width = 270;
  const halfDepth = 86;
  const rise = 34;
  const columns = 17;
  const rows = 7;
  const tileWidth = width / columns;
  const rowDepth = halfDepth / rows;
  const slope = Math.atan2(rise, halfDepth);
  const tileDepth = Math.hypot(rise, halfDepth) / rows + 3.4;
  const repairCells = [
    [16, 2],
    [16, 4],
    [15, 2],
    [14, 3],
    [12, 5],
  ] as const;

  repairCells.forEach(([column, row], index) => {
    const distanceFromRidge = (row + 0.5) * rowDepth;
    const x =
      centerX - width / 2 + (column + 0.5) * tileWidth;
    const z = ridgeZ + distanceFromRidge;
    const y =
      wallTop +
      rise -
      (distanceFromRidge / halfDepth) * rise +
      1.6;
    walls.addBox({
      center: [x, y, z],
      size: [tileWidth + 2.2, 2.4, tileDepth],
      rotation: [slope, 0, (index - 2) * 0.012],
      color: repairColors[index % repairColors.length] ?? 0x6f9b91,
      shade: 1.02,
    });

    for (const offsetX of [-tileWidth * 0.27, tileWidth * 0.27]) {
      metal.addBox({
        center: [x + offsetX, y + 2.1, z],
        size: [2.2, 1.8, 2.2],
        rotation: [slope, 0, 0],
        color: 0x53615d,
      });
    }
  });

  const wallPanels = [
    {
      center: [315, 52, 717.2] as Vector3Tuple,
      size: [27, 30, 1.8] as Vector3Tuple,
      color: 0x73a096,
    },
    {
      center: [214, 35, 717.2] as Vector3Tuple,
      size: [21, 18, 1.8] as Vector3Tuple,
      color: 0xc2a553,
    },
    {
      center: [378.5, 54, 686] as Vector3Tuple,
      size: [1.8, 31, 25] as Vector3Tuple,
      color: 0x91afa4,
    },
  ] as const;
  wallPanels.forEach((panel, index) => {
    walls.addBox({
      center: panel.center,
      size: panel.size,
      color: panel.color,
      rotation: index === 2 ? [0, 0, 0.025] : [0, 0, -0.02],
    });
    metal.addBox({
      center:
        index === 2
          ? [379.8, panel.center[1], panel.center[2] - 7]
          : [panel.center[0], panel.center[1] + 8, 718.4],
      size: index === 2 ? [1.4, 3, 8] : [9, 3, 1.4],
      color: 0x56625e,
    });
  });

  const ladderBottomX = 397;
  const ladderTopX = 379;
  for (const z of [665, 690]) {
    addBoxBetween(
      timber,
      [ladderBottomX, 2, z],
      [ladderTopX, 81, z],
      4,
      0x766044,
      3.5,
    );
  }
  for (let rung = 0; rung < 7; rung += 1) {
    const progress = (rung + 1) / 8;
    const x =
      ladderBottomX + (ladderTopX - ladderBottomX) * progress;
    const y = 2 + (81 - 2) * progress;
    addBoxBetween(
      timber,
      [x, y, 665],
      [x, y, 690],
      2.8,
      0x80694a,
      3,
    );
  }

  timber.addBox({
    center: [386, 47, 704],
    size: [7, 90, 7],
    rotation: [0, 0, -0.018],
    color: 0x685038,
  });
  addBoxBetween(
    timber,
    [389, 5, 697],
    [367, 94, 704],
    5,
    0x72573c,
    5,
  );

  metal.addBox({
    center: [409, 7, 714],
    size: [14, 11, 13],
    color: 0x6f928b,
  });
  for (const x of [402.5, 415.5]) {
    metal.addBox({
      center: [x, 9, 714],
      size: [2, 12, 15],
      color: 0x566c68,
    });
  }
  addBoxBetween(
    metal,
    [402, 13, 714],
    [405, 20, 714],
    1.7,
    0x58645f,
  );
  addBoxBetween(
    metal,
    [405, 20, 714],
    [413, 20, 714],
    1.7,
    0x58645f,
  );
  addBoxBetween(
    metal,
    [413, 20, 714],
    [416, 13, 714],
    1.7,
    0x58645f,
  );

  return repairCells.length + wallPanels.length;
}

function addKitchenGardenLife(
  groundDetails: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
): number {
  const bedCenters = [412, 432, 452, 472] as const;
  const plantZ = [1_132, 1_150, 1_168, 1_186] as const;

  bedCenters.forEach((x, bedIndex) => {
    groundDetails.addBox({
      center: [x, 1.45, 1_155],
      size: [12, 1.6, 74],
      color: bedIndex % 2 === 0 ? 0x74553d : 0x816147,
      shade: 0.94,
    });
    for (const z of [1_117.5, 1_192.5]) {
      timber.addBox({
        center: [x, 2.4, z],
        size: [15, 3, 3],
        color: 0x796244,
      });
    }
    for (const z of [1_125, 1_185]) {
      timber.addBox({
        center: [x, 16, z],
        size: [3, 29, 3],
        color: 0x69563e,
      });
    }
    addBoxBetween(
      timber,
      [x, 28, 1_125],
      [x, 28, 1_185],
      1.6,
      0x84704f,
      1.6,
    );

    plantZ.forEach((z, plantIndex) => {
      const leafColor =
        (bedIndex + plantIndex) % 3 === 0 ? 0x6f9b54 : 0x4f854d;
      foliage.addBox({
        center: [x, 8, z],
        size: [2.4, 13, 2.4],
        rotation: [0.06, bedIndex * 0.2, 0.08],
        color: 0x477749,
      });
      foliage.addBox({
        center: [x - 3.4, 10, z],
        size: [7, 3.5, 3],
        rotation: [0, bedIndex * 0.16, -0.22],
        color: leafColor,
      });
      foliage.addBox({
        center: [x + 3.4, 13, z + 1],
        size: [7, 3.5, 3],
        rotation: [0, -bedIndex * 0.13, 0.22],
        color: leafColor,
      });
    });
  });

  metal.addBox({
    center: [470, 7, 1_116],
    size: [13, 10, 11],
    color: 0x6a9892,
  });
  addBoxBetween(
    metal,
    [476, 9, 1_116],
    [478, 14, 1_116],
    3.2,
    0x739f99,
    3,
  );
  addBoxBetween(
    metal,
    [463, 12, 1_116],
    [464, 20, 1_116],
    2,
    0x596e6a,
  );
  addBoxBetween(
    metal,
    [464, 20, 1_116],
    [473, 20, 1_116],
    2,
    0x596e6a,
  );
  addBoxBetween(
    metal,
    [473, 20, 1_116],
    [476, 12, 1_116],
    2,
    0x596e6a,
  );

  for (let layer = 0; layer < 3; layer += 1) {
    timber.addBox({
      center: [468, 5 + layer * 6, 1_192],
      size: [19 - layer * 2, 6, 14],
      rotation: [0, layer % 2 === 0 ? 0.08 : -0.07, 0],
      color: layer === 1 ? 0xb3924f : 0xc1a75d,
    });
  }
  timber.addBox({
    center: [468, 14, 1_192],
    size: [3, 24, 3],
    color: 0x756344,
  });

  return bedCenters.length;
}

function addLaundryLife(
  walls: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
): number {
  const start: Vector3Tuple = [375, 59, 1_095];
  const end: Vector3Tuple = [470, 59, 1_040];
  for (const [x, z] of [
    [start[0], start[2]],
    [end[0], end[2]],
  ] as const) {
    timber.addBox({
      center: [x, 31, z],
      size: [5, 62, 5],
      color: 0x72583e,
    });
    timber.addBox({
      center: [x, 58, z],
      size: [14, 4, 4],
      color: 0x80664a,
    });
  }
  addBoxBetween(metal, start, end, 1.25, 0x786d59, 1.25);

  const clothColors = [
    0xe2d6b7,
    0x71a7a3,
    0xc2a14f,
    0xa596b6,
  ] as const;
  const widths = [16, 14, 17, 15] as const;
  const heights = [23, 20, 24, 21] as const;
  const deltaX = end[0] - start[0];
  const deltaZ = end[2] - start[2];
  const rotationY = -Math.atan2(deltaZ, deltaX);

  clothColors.forEach((color, index) => {
    const progress = 0.17 + index * 0.22;
    const x = start[0] + deltaX * progress;
    const z = start[2] + deltaZ * progress;
    const height = heights[index] ?? 20;
    walls.addBox({
      center: [x, 57 - height / 2, z],
      size: [widths[index] ?? 15, height, 2],
      rotation: [0, rotationY, (index - 1.5) * 0.025],
      color,
      shade: 1.03,
    });
    for (const offset of [-4, 4]) {
      metal.addBox({
        center: [
          x + Math.cos(-rotationY) * offset,
          58.2,
          z + Math.sin(-rotationY) * offset,
        ],
        size: [2, 3, 2],
        rotation: [0, rotationY, 0],
        color: 0x655e50,
      });
    }
  });

  return clothColors.length;
}

function addRepairBenchLife(
  walls: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  coolGlow: ColoredGeometryBuilder,
): void {
  const benchX = 550;
  const benchZ = 790;
  timber.addBox({
    center: [benchX, 27, benchZ],
    size: [78, 7, 25],
    color: 0x79563a,
  });
  for (const x of [522, 578]) {
    for (const z of [782, 798]) {
      timber.addBox({
        center: [x, 13, z],
        size: [6, 26, 6],
        color: 0x664b36,
      });
    }
  }
  timber.addBox({
    center: [benchX, 10, benchZ],
    size: [63, 4, 19],
    color: 0x6d5139,
  });

  metal.addBox({
    center: [532, 36, 790],
    size: [12, 11, 11],
    color: 0x626c68,
  });
  metal.addBox({
    center: [532, 43, 790],
    size: [8, 3, 8],
    color: 0x4f5956,
  });
  addBoxBetween(
    metal,
    [538, 38, 790],
    [545, 42, 790],
    3,
    0x5a6460,
    3,
  );
  addBoxBetween(
    metal,
    [526, 42, 790],
    [526, 49, 790],
    2,
    0x505a57,
  );
  addBoxBetween(
    metal,
    [526, 49, 790],
    [536, 49, 790],
    2,
    0x505a57,
  );
  addBoxBetween(
    metal,
    [536, 49, 790],
    [538, 42, 790],
    2,
    0x505a57,
  );

  for (let tool = 0; tool < 3; tool += 1) {
    timber.addBox({
      center: [552 + tool * 9, 33, 786 + tool * 3],
      size: [17, 2.2, 2.2],
      rotation: [0, -0.25 + tool * 0.18, 0.08],
      color: 0x71513a,
    });
    metal.addBox({
      center: [560 + tool * 9, 34, 784 + tool * 3],
      size: [6, 4, 4],
      rotation: [0, tool * 0.17, 0],
      color: 0x68716c,
    });
  }
  coolGlow.addBox({
    center: [565, 39, 797],
    size: [4, 12, 4],
    color: 0x78aaa6,
  });
  warmGlow.addBox({
    center: [578, 39, 793],
    size: [7, 10, 7],
    color: 0xe0c274,
  });
  metal.addBox({
    center: [578, 45, 793],
    size: [9, 2, 9],
    color: 0x5b5f59,
  });

  const tubX = 582;
  const tubZ = 815;
  metal.addBox({
    center: [tubX, 19, tubZ],
    size: [39, 6, 25],
    color: 0x627d76,
  });
  for (const z of [822, 846]) {
    metal.addBox({
      center: [tubX, 25, z],
      size: [39, 13, 4],
      rotation: [0, 0, z < tubZ ? -0.1 : 0.1],
      color: z < tubZ ? 0x718f87 : 0x5e746f,
    });
  }
  metal.addBox({
    center: [564, 25, tubZ],
    size: [5, 13, 27],
    color: 0x68837c,
  });
  walls.addBox({
    center: [592, 26, 847.8],
    size: [16, 10, 1.8],
    color: 0xc0a351,
  });
  for (const z of [823, 845]) {
    addBoxBetween(
      timber,
      [568, 19, z],
      [523, 12, z - (z < tubZ ? 5 : -5)],
      4,
      0x715139,
      4,
    );
  }
  for (const z of [824, 844]) {
    addBoxBetween(
      metal,
      [573, 16, z],
      [568, 3, z],
      3,
      0x59615d,
      3,
    );
  }

  const wheelX = 610;
  const wheelY = 12;
  const wheelRadius = 10;
  for (let segment = 0; segment < 8; segment += 1) {
    const angle = (segment / 8) * Math.PI * 2;
    metal.addBox({
      center: [
        wheelX + Math.cos(angle) * wheelRadius,
        wheelY + Math.sin(angle) * wheelRadius,
        tubZ,
      ],
      size: [8.5, 3.8, 5],
      rotation: [0, 0, angle + Math.PI / 2],
      color: segment === 1 ? 0x75a096 : 0x4f5754,
    });
  }
  metal.addBox({
    center: [wheelX, wheelY, tubZ],
    size: [7, 7, 8],
    color: 0x756348,
  });
}

function addOptimisticLifePass(
  walls: ColoredGeometryBuilder,
  timber: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  groundDetails: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
  coolGlow: ColoredGeometryBuilder,
): StartTownLifePassMetrics {
  const before =
    walls.components +
    timber.components +
    metal.components +
    groundDetails.components +
    foliage.components +
    warmGlow.components +
    coolGlow.components;
  const repairPanelCount = addTownHallRepairLife(
    walls,
    timber,
    metal,
  );
  const gardenBedCount = addKitchenGardenLife(
    groundDetails,
    timber,
    metal,
    foliage,
  );
  const laundryClothCount = addLaundryLife(walls, timber, metal);
  addRepairBenchLife(walls, timber, metal, warmGlow, coolGlow);
  const after =
    walls.components +
    timber.components +
    metal.components +
    groundDetails.components +
    foliage.components +
    warmGlow.components +
    coolGlow.components;
  const addedComponents = after - before;

  return {
    addedComponents,
    addedTriangles: addedComponents * 12,
    repairPanelCount,
    roofDamageFillRatio: 5 / 18,
    gardenBedCount,
    laundryClothCount,
    dangerRedOrangeUsed: false,
    gardenBounds: {
      minimumX: 405,
      maximumX: 480,
      minimumZ: 1_110,
      maximumZ: 1_200,
    },
  };
}

function createBatchMesh(
  builder: ColoredGeometryBuilder,
  options: BatchOptions,
): THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial> {
  const geometry = builder.build();
  geometry.name = `${options.name}-geometry`;
  const material = new THREE.MeshStandardMaterial({
    name: `${options.name}-material`,
    color: 0xffffff,
    vertexColors: true,
    roughness: options.roughness,
    metalness: options.metalness ?? 0,
    flatShading: true,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name;
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  return mesh;
}

export function measureStartTownArtSlice(
  object: THREE.Object3D,
): StartTownArtMetrics {
  let drawCalls = 0;
  let triangles = 0;
  let geometries = 0;
  let components = 0;

  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }

    drawCalls += 1;
    geometries += 1;
    const position = child.geometry.getAttribute("position");
    triangles +=
      child.geometry.index === null
        ? position.count / 3
        : child.geometry.index.count / 3;
    const componentCount = child.geometry.userData.componentCount;

    if (typeof componentCount === "number") {
      components += componentCount;
    }
  });

  return { drawCalls, triangles, geometries, components };
}

export function createStartTownArtSlice(): StartTownArtSlice {
  const roads = new ColoredGeometryBuilder();
  const groundDetails = new ColoredGeometryBuilder();
  const masonry = new ColoredGeometryBuilder();
  const walls = new ColoredGeometryBuilder();
  const roof = new ColoredGeometryBuilder();
  const timber = new ColoredGeometryBuilder();
  const metal = new ColoredGeometryBuilder();
  const rubble = new ColoredGeometryBuilder();
  const foliage = new ColoredGeometryBuilder();
  const warmGlow = new ColoredGeometryBuilder();
  const coolGlow = new ColoredGeometryBuilder();
  const group = new THREE.Group();
  group.name = "start-town-art-slice";

  addRoadNetwork(roads);
  addGroundPatches(groundDetails);
  addTownHall(
    masonry,
    walls,
    roof,
    timber,
    metal,
    rubble,
    foliage,
    warmGlow,
    coolGlow,
  );
  addSouthHouse(
    masonry,
    walls,
    roof,
    timber,
    metal,
    rubble,
    foliage,
    warmGlow,
    coolGlow,
  );
  addWell(masonry, timber, metal, foliage, coolGlow);
  addContractBoard(timber, metal, walls, rubble);
  addLampsAndCables(metal, masonry, warmGlow, group);
  addFoliageScatter(foliage);
  const lifePass = addOptimisticLifePass(
    walls,
    timber,
    metal,
    groundDetails,
    foliage,
    warmGlow,
    coolGlow,
  );

  const ground = new THREE.Group();
  ground.name = "start-town-ground";
  const meshes = [
    createBatchMesh(roads, {
      name: "start-town-road-ribbons",
      roughness: 0.98,
      receiveShadow: true,
    }),
    createBatchMesh(groundDetails, {
      name: "start-town-ground-microdetail",
      roughness: 1,
      receiveShadow: true,
    }),
    createBatchMesh(masonry, {
      name: "start-town-masonry",
      roughness: 0.94,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(walls, {
      name: "start-town-wall-panels",
      roughness: 0.98,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(roof, {
      name: "start-town-broken-roofs",
      roughness: 0.88,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(timber, {
      name: "start-town-timber-props",
      roughness: 0.9,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(metal, {
      name: "start-town-metal-props",
      roughness: 0.64,
      metalness: 0.42,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(rubble, {
      name: "start-town-rubble",
      roughness: 1,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(foliage, {
      name: "start-town-foliage",
      roughness: 0.96,
      receiveShadow: true,
    }),
    createBatchMesh(warmGlow, {
      name: "start-town-warm-glass",
      roughness: 0.34,
      metalness: 0.05,
      emissive: 0x8a4a1f,
      emissiveIntensity: 0.72,
    }),
    createBatchMesh(coolGlow, {
      name: "start-town-cool-glass-and-water",
      roughness: 0.3,
      metalness: 0.08,
      emissive: 0x174c4b,
      emissiveIntensity: 0.58,
    }),
  ] as const;

  ground.add(meshes[0], meshes[1]);
  group.add(ground, ...meshes.slice(2));

  const metrics = measureStartTownArtSlice(group);
  group.userData.metrics = metrics;
  group.userData.lifePass = lifePass;
  group.userData.replacedTerrainIds = [...REPLACED_TERRAIN_IDS];
  group.userData.replacedPropIds = [...REPLACED_PROP_IDS];
  group.userData.contractBoardPosition = {
    x: TOWN_CONTRACT_BOARD_POSITION.x,
    y: TOWN_CONTRACT_BOARD_POSITION.y,
  };

  let disposed = false;
  return {
    group,
    ground,
    replacedTerrainIds: REPLACED_TERRAIN_IDS,
    replacedPropIds: REPLACED_PROP_IDS,
    dispose(): void {
      if (disposed) {
        return;
      }

      disposed = true;
      group.removeFromParent();
      group.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) {
          return;
        }

        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      });
      ground.clear();
      group.clear();
    },
  };
}
