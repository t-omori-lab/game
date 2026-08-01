import * as THREE from "three";
import { TOWN_CONTRACT_BOARD_POSITION } from "../../sim/content";
import {
  ColoredGeometryBuilder,
  type Vector3Tuple,
} from "../coloredGeometry";
import {
  NORTH_STAR_SURFACE_PROFILE,
  createNorthStarSurfaceLibrary,
  type NorthStarSurfaceLibrary,
  type NorthStarSurfaceSet,
} from "../northStarSurfaceTextures";
import type { StartTownArtSlice } from "../startTownArt";
import { BEAUTY_CELL_SPEC } from "./BeautyCellSpec";

export interface BeautyCellArtMetrics {
  readonly drawCalls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly components: number;
}

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

const COLORS = {
  concrete: [0xaeb4a2, 0x909b8c, 0xc1bea7, 0x7b8980],
  concreteDark: [0x66756e, 0x586860, 0x748078],
  roadPaint: [0xd8d5bd, 0xc7c8b3, 0xe1d9b8],
  foliage: [0x1f603e, 0x2f7746, 0x4c8d50, 0x6c9f58, 0x8cab62],
  foliageShadow: [0x173d32, 0x20533a, 0x315f3e],
  metal: [0x344b49, 0x526660, 0x263a3a, 0x718079],
  rust: [0x8f5537, 0xa9693f, 0x6e4738],
  warm: [0xffb45e, 0xe98938, 0xf4cc76],
  cyan: [0x5ce6cc, 0x77f0dc, 0x3aaea6],
  flower: [0xffaa64, 0xf47b68, 0xe4c56a],
} as const;

type BatchOptions = {
  readonly name: string;
  readonly roughness: number;
  readonly metalness?: number;
  readonly castShadow?: boolean;
  readonly receiveShadow?: boolean;
  readonly emissive?: THREE.ColorRepresentation;
  readonly emissiveIntensity?: number;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly depthWrite?: boolean;
  readonly physical?: boolean;
  readonly clearcoat?: number;
  readonly clearcoatRoughness?: number;
  readonly doubleSided?: boolean;
  readonly unlit?: boolean;
};

function hash(first: number, second: number, third = 0): number {
  return (
    Math.imul(Math.trunc(first) + 0x63, 73_856_093) ^
    Math.imul(Math.trunc(second) + 0xa9, 19_349_663) ^
    Math.imul(Math.trunc(third) + 0x101, 83_492_791)
  ) >>> 0;
}

function hashUnit(value: number, shift = 0): number {
  return ((value >>> shift) & 0x3ff) / 0x3ff;
}

function palette(
  colors: readonly number[],
  seed: number,
): number {
  return colors[seed % colors.length] ?? colors[0] ?? 0xffffff;
}

function addHorizontalQuad(
  builder: ColoredGeometryBuilder,
  bounds: readonly [number, number, number, number],
  y: number,
  color: THREE.ColorRepresentation,
): void {
  const [minimumX, maximumX, minimumZ, maximumZ] = bounds;
  builder.addQuad({
    corners: [
      [minimumX, y, minimumZ],
      [minimumX, y, maximumZ],
      [maximumX, y, maximumZ],
      [maximumX, y, minimumZ],
    ],
    color,
  });
}

function addSegment(
  builder: ColoredGeometryBuilder,
  start: readonly [number, number],
  end: readonly [number, number],
  y: number,
  width: number,
  color: THREE.ColorRepresentation,
): void {
  const deltaX = end[0] - start[0];
  const deltaZ = end[1] - start[1];
  const length = Math.hypot(deltaX, deltaZ);
  builder.addBox({
    center: [(start[0] + end[0]) / 2, y, (start[1] + end[1]) / 2],
    size: [length, Math.max(0.35, width * 0.12), width],
    rotation: [0, -Math.atan2(deltaZ, deltaX), 0],
    color,
  });
}

function addRoadDetails(
  surfaces: ColoredGeometryBuilder,
  wetFilm: ColoredGeometryBuilder,
  markings: ColoredGeometryBuilder,
  puddles: ColoredGeometryBuilder,
  debris: ColoredGeometryBuilder,
): void {
  // Layered sidewalks and curbs make the dark road feel inset rather than a
  // single plane. The open east-west band is the gameplay corridor.
  addHorizontalQuad(surfaces, [25, 875, 555, 690], 1.08, 0x65766f);
  addHorizontalQuad(surfaces, [25, 875, 1_100, 1_270], 1.08, 0x68796c);
  addHorizontalQuad(surfaces, [32, 155, 690, 1_100], 1.05, 0x5f7469);
  addHorizontalQuad(surfaces, [735, 875, 690, 1_100], 1.05, 0x607169);
  surfaces.addBox({ center: [450, 4, 695], size: [850, 8, 12], color: 0x87948a });
  surfaces.addBox({ center: [450, 4, 1_096], size: [850, 8, 12], color: 0x7e8d81 });
  surfaces.addBox({ center: [159, 4, 895], size: [12, 8, 400], color: 0x94a091 });
  surfaces.addBox({ center: [731, 4, 895], size: [12, 8, 400], color: 0x89998b });
  addHorizontalQuad(wetFilm, [160, 730, 690, 1_100], 0.96, 0x061613);

  // Offset, incomplete markings avoid the clean toy-road look.
  for (let index = 0; index < 9; index += 1) {
    const seed = hash(index, 823, 7);
    const x = 304 + index * 24;
    const length = 74 + hashUnit(seed, 8) * 25;
    markings.addBox({
      center: [x, 1.52, 914 + (index % 2) * 2.5],
      size: [13 + hashUnit(seed, 16) * 4, 0.65, length],
      rotation: [0, (hashUnit(seed, 22) - 0.5) * 0.035, 0],
      color: palette(COLORS.roadPaint, seed),
      shade: index === 3 || index === 7 ? 0.42 : 0.57,
    });
  }
  for (let index = 0; index < 12; index += 1) {
    const seed = hash(index, 313, 19);
    markings.addBox({
      center: [190 + index * 12.5, 1.55, 972],
      size: [8.5, 0.75, 13],
      color: index % 4 === 0 ? 0xb4853e : 0xd0a447,
      shade: 0.9 + hashUnit(seed, 10) * 0.12,
    });
  }

  const puddleSpecs = [
    [225, 835, 76, 31, -0.08],
    [538, 775, 118, 24, 0.1],
    [610, 1_015, 84, 34, -0.16],
    [370, 1_063, 110, 20, 0.05],
    [685, 905, 62, 20, 0.18],
  ] as const;
  for (const [x, z, width, depth, rotation] of puddleSpecs) {
    puddles.addBox({
      center: [x, 1.7, z],
      size: [width, 0.18, depth],
      rotation: [0, rotation, 0],
      color: z > 950 ? 0x4f8a82 : 0x5d9690,
    });
  }

  for (let index = 0; index < 118; index += 1) {
    const seed = hash(index, 557, 41);
    const upper = index < 62;
    const x = 45 + hashUnit(seed, 2) * 805;
    const z = upper
      ? 605 + hashUnit(seed, 12) * 145
      : 1_045 + hashUnit(seed, 12) * 185;
    debris.addBox({
      center: [x, 2.1 + hashUnit(seed, 21) * 1.8, z],
      size: [
        3 + hashUnit(seed, 5) * 12,
        1.1 + hashUnit(seed, 17) * 2.4,
        3 + hashUnit(seed, 25) * 9,
      ],
      rotation: [
        (hashUnit(seed, 7) - 0.5) * 0.25,
        hashUnit(seed, 14) * Math.PI,
        (hashUnit(seed, 23) - 0.5) * 0.2,
      ],
      color: palette(COLORS.concreteDark, seed),
    });
  }
}

function addStairThreshold(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  moss: ColoredGeometryBuilder,
): void {
  for (let index = 0; index < 11; index += 1) {
    concrete.addBox({
      center: [245, 4.5 + index * 2.8, 1_102 - index * 13],
      size: [172 - index * 1.8, 9 + index * 5.6, 14],
      color: palette(COLORS.concrete, hash(index, 701)),
    });
    if (index % 2 === 0) {
      moss.addBox({
        center: [180 + (index % 3) * 26, 10 + index * 5.5, 1_095 - index * 13],
        size: [26, 1.4, 6],
        rotation: [0, (index - 4) * 0.08, 0],
        color: palette(COLORS.foliageShadow, hash(index, 719)),
      });
    }
  }
  concrete.addBox({ center: [151, 31, 1_025], size: [17, 62, 220], color: 0x697c73 });
  concrete.addBox({ center: [340, 27, 1_050], size: [26, 54, 185], color: 0x909a8e });
  for (const x of [170, 319]) {
    metal.addBox({ center: [x, 45, 1_035], size: [3.2, 74, 3.2], color: 0x415651 });
    metal.addBox({
      center: [x, 78, 1_028],
      size: [3.2, 3.2, 165],
      rotation: [-0.18, 0, 0],
      color: 0x586b64,
    });
  }
}

function addTransitShelter(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  emissive: ColoredGeometryBuilder,
): void {
  concrete.addBox({ center: [294, 4, 718], size: [182, 8, 106], color: 0x9ea999 });
  concrete.addBox({ center: [294, 7, 776], size: [184, 14, 12], color: 0x7d8c83 });
  for (const x of [220, 276, 348]) {
    metal.addBox({ center: [x, 51, 704], size: [5, 92, 5], color: 0x3b5350 });
  }
  metal.addBox({ center: [294, 92, 676], size: [142, 4, 5], color: 0x405955 });
  metal.addBox({ center: [294, 92, 732], size: [142, 4, 5], color: 0x405955 });
  metal.addBox({ center: [225, 92, 704], size: [5, 4, 58], color: 0x526660 });
  metal.addBox({ center: [363, 92, 704], size: [5, 4, 58], color: 0x526660 });
  glass.addBox({ center: [248, 53, 707], size: [50, 75, 2.6], color: 0x87b5ad });
  glass.addBox({ center: [322, 53, 707], size: [70, 75, 2.6], color: 0x79aaa3 });
  glass.addBox({ center: [210, 53, 733], size: [2.6, 75, 48], color: 0x73a29c });
  metal.addBox({ center: [284, 21, 737], size: [104, 8, 24], color: 0x6b6252 });
  metal.addBox({ center: [371, 63, 700], size: [10, 70, 8], color: 0x344d49 });
  emissive.addBox({ center: [371, 76, 694], size: [7, 21, 1.2], color: 0x5ce6cc });
  emissive.addBox({ center: [371, 55, 694], size: [7, 9, 1.2], color: 0xffb45e });
}

function addWorkAndContractArea(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  emissive: ColoredGeometryBuilder,
): void {
  // Repair bench aligns with the simulation collider at x510..625,z777..853.
  concrete.addBox({ center: [568, 5, 815], size: [118, 10, 82], color: 0x87948a });
  metal.addBox({ center: [585, 34, 823], size: [102, 8, 42], color: 0x5c5144 });
  for (const x of [542, 628]) {
    metal.addBox({ center: [x, 18, 823], size: [6, 30, 6], color: 0x3a4a48 });
  }
  metal.addBox({ center: [612, 53, 810], size: [38, 31, 9], color: 0x2e4543 });
  glass.addBox({ center: [612, 55, 804.8], size: [30, 19, 1.5], color: 0x5b9f99 });
  emissive.addBox({ center: [612, 55, 803.8], size: [24, 2, 0.7], color: 0x5ce6cc });
  emissive.addBox({ center: [585, 43, 812], size: [5, 5, 5], color: 0xffb45e });
  addSegment(metal, [548, 845], [585, 868], 3.2, 2.2, 0x263a3a);
  addSegment(metal, [585, 868], [636, 850], 3.2, 2.2, 0x344b49);
  for (let index = 0; index < 8; index += 1) {
    const seed = hash(index, 991);
    metal.addBox({
      center: [542 + index * 11, 42 + (index % 2) * 3, 818],
      size: [3 + hashUnit(seed, 4) * 5, 12 + hashUnit(seed, 16) * 9, 3],
      rotation: [0, 0, (hashUnit(seed, 23) - 0.5) * 0.4],
      color: palette(COLORS.rust, seed),
    });
  }

  // The contract console occupies the exact interaction collider.
  const boardX = TOWN_CONTRACT_BOARD_POSITION.x;
  const boardZ = TOWN_CONTRACT_BOARD_POSITION.y;
  concrete.addBox({ center: [boardX, 4, boardZ], size: [92, 8, 28], color: 0x88968c });
  for (const x of [boardX - 38, boardX + 38]) {
    metal.addBox({ center: [x, 36, boardZ], size: [6, 62, 7], color: 0x334944 });
  }
  metal.addBox({ center: [boardX, 63, boardZ], size: [90, 8, 9], color: 0x435955 });
  glass.addBox({ center: [boardX, 43, boardZ - 4.7], size: [72, 31, 2], color: 0x355e5b });
  emissive.addBox({ center: [boardX - 15, 48, boardZ - 5.9], size: [34, 2.2, 0.7], color: 0x5ce6cc });
  emissive.addBox({ center: [boardX + 26, 36, boardZ - 5.9], size: [12, 12, 0.7], color: 0xffb45e });
}

function addPlanterHabitat(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  for (let index = 0; index < 5; index += 1) {
    const x = 520 + (index % 3) * 86;
    const z = 1_042 + Math.floor(index / 3) * 76;
    concrete.addBox({ center: [x, 10, z], size: [68, 20, 48], color: index % 2 === 0 ? 0x8d998b : 0x77887d });
    metal.addBox({ center: [x, 20, z], size: [72, 3, 52], color: 0x5c6457 });
    concrete.addBox({ center: [x, 21.7, z], size: [59, 2.2, 39], color: 0x354a3b });
    for (let plant = 0; plant < 15; plant += 1) {
      const seed = hash(index, plant, 1_129);
      addPlant(
        foliage,
        flowers,
        x - 24 + (plant % 5) * 12 + (hashUnit(seed, 4) - 0.5) * 5,
        z - 13 + Math.floor(plant / 5) * 13,
        0.72 + hashUnit(seed, 15) * 0.5,
        seed,
        23,
        plant % 5 === 0,
      );
    }
  }
}

function addColliderReadableFixtures(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  water: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
  emissive: ColoredGeometryBuilder,
): void {
  // Rain-analysis cistern: exactly occupies town-well x320..402,z790..872.
  concrete.addBox({ center: [361, 5, 831], size: [84, 10, 84], color: 0x788c84 });
  for (const [x, z, width, depth] of [
    [361, 791, 84, 6],
    [361, 871, 84, 6],
    [321, 831, 6, 84],
    [401, 831, 6, 84],
  ] as const) {
    concrete.addBox({ center: [x, 18, z], size: [width, 26, depth], color: 0x697c75 });
  }
  water.addBox({ center: [361, 12.4, 831], size: [70, 1.2, 70], color: 0x4f918a });
  metal.addBox({ center: [361, 31, 831], size: [66, 4, 4], color: 0x415854 });
  metal.addBox({ center: [394, 33, 831], size: [4, 36, 58], color: 0x334b48 });
  emissive.addBox({ center: [394, 48, 803], size: [3, 10, 2], color: 0x5ce6cc });

  // Open service rack and pad: town-hall-workyard x380..480,z707..771.
  concrete.addBox({ center: [430, 3, 739], size: [102, 6, 66], color: 0x7f8d85 });
  for (const x of [386, 474]) {
    metal.addBox({ center: [x, 24, 739], size: [5, 42, 58], color: 0x344c49 });
  }
  metal.addBox({ center: [430, 44, 739], size: [92, 5, 60], color: 0x53635d });
  for (let index = 0; index < 7; index += 1) {
    metal.addBox({
      center: [399 + index * 10, 22 + (index % 2) * 5, 722],
      size: [5, 23 + (index % 3) * 5, 5],
      rotation: [0, 0, (index - 3) * 0.035],
      color: palette(COLORS.rust, hash(index, 1_423)),
    });
  }

  // Repaired signal mast: town-south-lamp x460..480,z1030..1053.
  concrete.addBox({ center: [470, 4, 1_041], size: [20, 8, 24], color: 0x75857d });
  metal.addBox({ center: [470, 42, 1_041], size: [5, 76, 5], color: 0x314947 });
  metal.addBox({ center: [480, 76, 1_041], size: [23, 4, 4], color: 0x435b56 });
  emissive.addBox({ center: [491, 73, 1_041], size: [4, 12, 7], color: 0xffb45e });

  // Community seed bed: town-kitchen-garden x405..480,z1110..1200.
  concrete.addBox({ center: [442.5, 9, 1_155], size: [77, 18, 92], color: 0x718178 });
  concrete.addBox({ center: [442.5, 19, 1_155], size: [66, 3, 80], color: 0x30463a });
  for (let plant = 0; plant < 18; plant += 1) {
    const seed = hash(plant, 1_551, BEAUTY_CELL_SPEC.seed);
    addPlant(
      foliage,
      flowers,
      416 + (plant % 6) * 10.5,
      1_125 + Math.floor(plant / 6) * 29,
      0.58 + hashUnit(seed, 13) * 0.32,
      seed,
      20,
      plant % 7 === 0,
    );
  }

  // Salvage crates: town-south-crates x385..446,z1186..1239.
  const crateSpecs = [
    [398, 18, 1_201, 24, 34, 26],
    [427, 14, 1_201, 28, 27, 26],
    [411, 12, 1_226, 32, 23, 22],
  ] as const;
  crateSpecs.forEach(([x, y, z, width, height, depth], index) => {
    metal.addBox({
      center: [x, y, z],
      size: [width, height, depth],
      rotation: [0, (index - 1) * 0.08, 0],
      color: index === 1 ? 0x56655d : 0x765741,
    });
    metal.addBox({ center: [x, y + height * 0.18, z - depth * 0.51], size: [width * 0.72, 3, 2], color: 0xa56b3d });
  });
}

const COLLIDER_VISUAL_BOUNDS = [
  ["town-hall", 130, 570, 250, 150],
  ["town-well", 320, 790, 82, 82],
  ["south-house", 150, 1_090, 230, 130],
  ["town-board-collider", 454, 940, 92, 20],
  ["town-hall-workyard-collider", 380, 707, 100, 64],
  ["town-repair-bench-collider", 510, 777, 115, 76],
  ["town-south-lamp-collider", 460, 1_030, 20, 23],
  ["town-kitchen-garden-collider", 405, 1_110, 75, 90],
  ["town-south-crates-collider", 385, 1_186, 61, 53],
] as const;

function createColliderVisualAnchors(): THREE.Group {
  const group = new THREE.Group();
  group.name = "beauty-cell-collider-visual-anchors";
  COLLIDER_VISUAL_BOUNDS.forEach(([id, x, z, width, height]) => {
    const anchor = new THREE.Object3D();
    anchor.name = `beauty-cell-collider-visual-${id}`;
    anchor.position.set(x + width / 2, 0, z + height / 2);
    anchor.userData.bounds = { x, y: z, width, height };
    group.add(anchor);
  });
  return group;
}

function addPlant(
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
  x: number,
  z: number,
  scale: number,
  seed: number,
  baseY = 1.5,
  flowering = false,
): void {
  const height = (12 + hashUnit(seed, 3) * 23) * scale;
  foliage.addBox({
    center: [x, baseY + height * 0.5, z],
    size: [1.2 * scale, height, 1.2 * scale],
    rotation: [(hashUnit(seed, 9) - 0.5) * 0.14, 0, (hashUnit(seed, 19) - 0.5) * 0.18],
    color: palette(COLORS.foliageShadow, seed),
  });
  for (let leaf = 0; leaf < 6; leaf += 1) {
    const phase = hashUnit(seed ^ Math.imul(leaf + 1, 0x45d9f3b), 4) * Math.PI * 2;
    const leafY = baseY + height * (0.28 + leaf * 0.17);
    const radius = (4.2 + hashUnit(seed, leaf * 5) * 5.2) * scale;
    foliage.addBox({
      center: [x + Math.cos(phase) * radius * 0.48, leafY, z + Math.sin(phase) * radius * 0.48],
      size: [radius * 1.62, 2.4 + scale * 1.6, radius * 0.62],
      rotation: [0, -phase, (hashUnit(seed, leaf * 7 + 2) - 0.5) * 0.35],
      color: palette(COLORS.foliage, seed + leaf),
    });
  }
  if (flowering) {
    flowers.addBox({
      center: [x, baseY + height + 1.3, z],
      size: [4.5 * scale, 2.6 * scale, 4.5 * scale],
      rotation: [0, hashUnit(seed, 11) * Math.PI, 0],
      color: palette(COLORS.flower, seed),
    });
  }
}

function addCausalVegetation(
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  const bands = [
    { count: 120, minX: -20, maxX: 235, minZ: 555, maxZ: 835, wet: true },
    { count: 92, minX: 40, maxX: 355, minZ: 965, maxZ: 1_250, wet: true },
    { count: 116, minX: 550, maxX: 880, minZ: 1_025, maxZ: 1_285, wet: false },
    { count: 95, minX: 50, maxX: 880, minZ: 520, maxZ: 665, wet: false },
  ] as const;
  bands.forEach((band, bandIndex) => {
    for (let index = 0; index < band.count; index += 1) {
      const seed = hash(index, bandIndex, BEAUTY_CELL_SPEC.seed);
      const x = band.minX + hashUnit(seed, 2) * (band.maxX - band.minX);
      const z = band.minZ + hashUnit(seed, 13) * (band.maxZ - band.minZ);
      // Keep the open route and hero focus readable.
      if (x > 365 && x < 825 && Math.abs(z - 900) < 82) {
        continue;
      }
      addPlant(
        foliage,
        flowers,
        x,
        z,
        (band.wet ? 0.9 : 0.68) + hashUnit(seed, 22) * 0.9,
        seed,
        1.5,
        index % (band.wet ? 17 : 23) === 0,
      );
    }
  });
}

function addWaterSpillway(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  water: ColoredGeometryBuilder,
): void {
  addHorizontalQuad(water, [-45, 235, 558, 808], 1.9, 0x4d8984);
  concrete.addBox({ center: [96, -1, 557], size: [286, 17, 14], color: 0x71857d });
  concrete.addBox({ center: [96, -1, 810], size: [286, 17, 14], color: 0x657a72 });
  concrete.addBox({ center: [-43, 0, 683], size: [14, 18, 240], color: 0x6e827a });
  concrete.addBox({ center: [238, 0, 683], size: [14, 18, 240], color: 0x7f9086 });
  for (let index = 0; index < 9; index += 1) {
    metal.addBox({
      center: [-4 + index * 27, 4, 790 + (index % 2) * 3],
      size: [18, 3, 24],
      color: index % 3 === 0 ? 0x8d593c : 0x52635d,
    });
  }
}

function addBackgroundFrames(
  concrete: ColoredGeometryBuilder,
  facade: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
): void {
  // Layered broken shells are kept outside the route and seen through the
  // shelter/anomaly, providing C's depth without making a Minecraft skyline.
  concrete.addBox({ center: [150, 64, 540], size: [185, 128, 82], color: 0x87938b });
  concrete.addBox({ center: [84, 122, 548], size: [55, 116, 74], color: 0x6c7d76 });
  facade.addBox({ center: [161, 69, 582], size: [148, 90, 5], color: 0x9c9a83 });
  concrete.addBox({ center: [730, 71, 622], size: [170, 142, 92], color: 0x74837d });
  facade.addBox({ center: [720, 72, 670], size: [142, 105, 5], color: 0x999b88 });
  concrete.addBox({ center: [790, 133, 620], size: [46, 118, 86], color: 0x5d706b });

  for (const specification of [
    { baseX: 104, z: 585, columns: 4, rows: 3 },
    { baseX: 665, z: 674, columns: 4, rows: 4 },
  ]) {
    for (let row = 0; row < specification.rows; row += 1) {
      for (let column = 0; column < specification.columns; column += 1) {
        const broken = (row * 7 + column * 3) % 9 === 4;
        if (broken) {
          continue;
        }
        const x = specification.baseX + column * 32;
        const y = 42 + row * 28;
        metal.addBox({ center: [x, y, specification.z - 2], size: [26, 3, 3], color: 0x415651 });
        glass.addBox({ center: [x, y - 10, specification.z - 2.5], size: [23, 18, 2], color: 0x557e78 });
      }
    }
  }
  for (let index = 0; index < 8; index += 1) {
    metal.addBox({
      center: [60 + index * 24, 137 + (index % 3) * 2, 540],
      size: [19, 3, 56],
      rotation: [0, (index - 4) * 0.035, 0],
      color: index % 3 === 0 ? 0x87583f : 0x53645e,
    });
  }
}

function createAnomaly(): THREE.Group {
  const group = new THREE.Group();
  group.name = "beauty-cell-world-space-anomaly";
  group.position.set(575, 50, 565);
  group.rotation.y = Math.PI / 4;
  group.userData.moduleId = "cbc-landmark-real-anomaly";
  const material = new THREE.MeshStandardMaterial({
    name: "beauty-cell-anomaly-ring-material",
    color: 0x244f50,
    metalness: 0.74,
    roughness: 0.24,
    emissive: 0x0a6f69,
    emissiveIntensity: 2.2,
  });
  for (let index = 0; index < 4; index += 1) {
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(27, 2.3, 8, 28, Math.PI * 0.37),
      material,
    );
    arc.name = `beauty-cell-anomaly-ring-${index}`;
    arc.rotation.z = index * (Math.PI / 2) + 0.12;
    arc.castShadow = true;
    group.add(arc);
  }
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(8.5, 1),
    new THREE.MeshBasicMaterial({
      name: "beauty-cell-anomaly-core-material",
      color: new THREE.Color(0x5ce6cc).multiplyScalar(2.4),
      toneMapped: false,
    }),
  );
  core.name = "beauty-cell-anomaly-core";
  group.add(core);
  for (let index = 0; index < 7; index += 1) {
    const shard = new THREE.Mesh(
      new THREE.TetrahedronGeometry(2.2 + (index % 3), 0),
      material,
    );
    const phase = (index / 7) * Math.PI * 2;
    shard.position.set(Math.cos(phase) * 18, Math.sin(phase * 2) * 8, Math.sin(phase) * 18);
    shard.rotation.set(phase * 0.7, phase, -phase * 0.4);
    group.add(shard);
  }
  const light = new THREE.PointLight(0x5ce6cc, 12, 135, 2);
  light.name = "beauty-cell-anomaly-light";
  group.add(light);
  return group;
}

function createAsphaltMesh(surface: NorthStarSurfaceSet): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(960, 800, 56, 46);
  geometry.name = "beauty-cell-wet-asphalt-geometry";
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(430, 0.72, 900);
  geometry.userData.componentCount = 1;
  const material = new THREE.MeshPhysicalMaterial({
    name: "beauty-cell-wet-asphalt-material",
    color: 0x182a26,
    map: surface.albedoMap,
    normalMap: surface.normalMap,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughnessMap: surface.roughnessMap,
    roughness: 0.86,
    metalness: 0.03,
    clearcoat: 0.38,
    clearcoatRoughness: 0.2,
  });
  material.userData.surfaceProfile = NORTH_STAR_SURFACE_PROFILE;
  material.userData.wetnessModel = "clearcoat-puddles-and-drainage";
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "beauty-cell-wet-asphalt";
  mesh.receiveShadow = true;
  return mesh;
}

function createTexturedBox(
  name: string,
  center: Vector3Tuple,
  size: Vector3Tuple,
  surface: NorthStarSurfaceSet,
  kind: "concrete" | "roof",
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(...size, 1, 1, 1);
  geometry.name = `${name}-geometry`;
  geometry.userData.componentCount = 1;
  const material = new THREE.MeshStandardMaterial({
    name: `${name}-material`,
    color: kind === "concrete" ? 0xb0b7a8 : 0x788a7b,
    map: surface.albedoMap,
    normalMap: surface.normalMap,
    normalScale: new THREE.Vector2(kind === "concrete" ? 0.34 : 0.52, kind === "concrete" ? 0.34 : 0.52),
    roughnessMap: surface.roughnessMap,
    roughness: 0.92,
    metalness: 0.01,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...center);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createBatchMesh(
  builder: ColoredGeometryBuilder,
  options: BatchOptions,
): THREE.Mesh {
  const geometry = builder.build();
  geometry.name = `${options.name}-geometry`;
  const common = {
    name: `${options.name}-material`,
    color: 0xffffff,
    vertexColors: true,
    roughness: options.roughness,
    metalness: options.metalness ?? 0,
    flatShading: false,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    depthWrite: options.depthWrite ?? true,
    side: options.doubleSided ? THREE.DoubleSide : THREE.FrontSide,
  } as const;
  const material = options.unlit
    ? new THREE.MeshBasicMaterial({
        name: common.name,
        color: common.color,
        vertexColors: true,
        transparent: common.transparent,
        opacity: common.opacity,
        side: common.side,
        depthWrite: common.depthWrite,
      })
    : options.physical
      ? new THREE.MeshPhysicalMaterial({
        ...common,
        clearcoat: options.clearcoat ?? 0,
        clearcoatRoughness: options.clearcoatRoughness ?? 0,
      })
      : new THREE.MeshStandardMaterial(common);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name;
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  return mesh;
}

export function measureBeautyCellArt(
  object: THREE.Object3D,
): BeautyCellArtMetrics {
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
    triangles += child.geometry.index === null
      ? position.count / 3
      : (child.geometry.index?.count ?? 0) / 3;
    const count = child.geometry.userData.componentCount;
    if (typeof count === "number") {
      components += count;
    }
  });
  return { drawCalls, triangles, geometries, components };
}

/** Compiles the versioned R02 scene grammar into a deterministic art slice. */
export function createBeautyCellArtSlice(): StartTownArtSlice {
  const surfaces = new ColoredGeometryBuilder();
  const wetFilm = new ColoredGeometryBuilder();
  const markings = new ColoredGeometryBuilder();
  const puddles = new ColoredGeometryBuilder();
  const debris = new ColoredGeometryBuilder();
  const concrete = new ColoredGeometryBuilder();
  const facade = new ColoredGeometryBuilder();
  const metal = new ColoredGeometryBuilder();
  const glass = new ColoredGeometryBuilder();
  const emissive = new ColoredGeometryBuilder();
  const water = new ColoredGeometryBuilder();
  const foliage = new ColoredGeometryBuilder();
  const flowers = new ColoredGeometryBuilder();

  addRoadDetails(surfaces, wetFilm, markings, puddles, debris);
  addStairThreshold(concrete, metal, foliage);
  addTransitShelter(concrete, metal, glass, emissive);
  addWorkAndContractArea(concrete, metal, glass, emissive);
  addColliderReadableFixtures(
    concrete,
    metal,
    water,
    foliage,
    flowers,
    emissive,
  );
  addPlanterHabitat(concrete, metal, foliage, flowers);
  addWaterSpillway(concrete, metal, water);
  addBackgroundFrames(concrete, facade, glass, metal);
  addCausalVegetation(foliage, flowers);

  const surfaceLibrary: NorthStarSurfaceLibrary = createNorthStarSurfaceLibrary();
  const asphalt = createAsphaltMesh(surfaceLibrary.asphalt);
  const texturedArchitecture = [
    createTexturedBox(
      "beauty-cell-stair-retaining-shell",
      [134, 36, 1_028],
      [28, 72, 220],
      surfaceLibrary.concrete,
      "concrete",
    ),
    createTexturedBox(
      "beauty-cell-transit-roof",
      [294, 96, 704],
      [142, 7, 58],
      surfaceLibrary.roof,
      "roof",
    ),
    createTexturedBox(
      "beauty-cell-far-left-shell",
      [150, 64, 541],
      [186, 128, 84],
      surfaceLibrary.concrete,
      "concrete",
    ),
    createTexturedBox(
      "beauty-cell-far-right-shell",
      [730, 72, 623],
      [172, 144, 94],
      surfaceLibrary.concrete,
      "concrete",
    ),
  ];
  const batches = [
    createBatchMesh(surfaces, {
      name: "beauty-cell-sidewalks-curbs",
      roughness: 0.9,
      receiveShadow: true,
    }),
    createBatchMesh(wetFilm, {
      name: "beauty-cell-wet-road-film",
      roughness: 0.31,
      unlit: true,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      receiveShadow: true,
    }),
    createBatchMesh(markings, {
      name: "beauty-cell-worn-road-markings",
      roughness: 0.75,
      receiveShadow: true,
    }),
    createBatchMesh(puddles, {
      name: "beauty-cell-road-puddles",
      roughness: 0.12,
      physical: true,
      clearcoat: 0.92,
      clearcoatRoughness: 0.06,
      transparent: true,
      opacity: 0.72,
      emissive: 0x183a36,
      emissiveIntensity: 0.34,
      receiveShadow: true,
    }),
    createBatchMesh(debris, {
      name: "beauty-cell-road-aggregate",
      roughness: 0.96,
      receiveShadow: true,
    }),
    createBatchMesh(concrete, {
      name: "beauty-cell-structural-concrete",
      roughness: 0.88,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(facade, {
      name: "beauty-cell-layered-facades",
      roughness: 0.79,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(metal, {
      name: "beauty-cell-metal-infrastructure",
      roughness: 0.39,
      metalness: 0.64,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(glass, {
      name: "beauty-cell-laminated-glass",
      roughness: 0.13,
      metalness: 0.05,
      physical: true,
      clearcoat: 0.75,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.66,
    }),
    createBatchMesh(emissive, {
      name: "beauty-cell-working-signals",
      roughness: 0.2,
      emissive: 0x427f68,
      emissiveIntensity: 2.7,
      physical: true,
      clearcoat: 0.48,
      clearcoatRoughness: 0.1,
    }),
    createBatchMesh(water, {
      name: "beauty-cell-spillway-water",
      roughness: 0.08,
      physical: true,
      clearcoat: 0.96,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.76,
      doubleSided: true,
    }),
    createBatchMesh(foliage, {
      name: "beauty-cell-causal-foliage",
      roughness: 0.84,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(flowers, {
      name: "beauty-cell-human-flower-accents",
      roughness: 0.68,
      castShadow: true,
    }),
  ] as const;

  const ground = new THREE.Group();
  ground.name = "beauty-cell-ground";
  ground.add(asphalt, ...batches.slice(0, 5), batches[10]);

  const group = new THREE.Group();
  group.name = "beauty-cell-art-slice";
  group.add(
    ground,
    ...texturedArchitecture,
    ...batches.slice(5, 10),
    ...batches.slice(11),
    createColliderVisualAnchors(),
    createAnomaly(),
  );

  const warmWorkLight = new THREE.PointLight(0xffb45e, 5.5, 145, 2);
  warmWorkLight.name = "beauty-cell-workbench-life-light";
  warmWorkLight.position.set(585, 56, 810);
  group.add(warmWorkLight);

  const contractAnchor = new THREE.Group();
  contractAnchor.name = "beauty-cell-contract-anchor";
  contractAnchor.position.set(
    TOWN_CONTRACT_BOARD_POSITION.x,
    0,
    TOWN_CONTRACT_BOARD_POSITION.y,
  );
  contractAnchor.userData.interactionPoint = {
    x: TOWN_CONTRACT_BOARD_POSITION.x,
    y: TOWN_CONTRACT_BOARD_POSITION.y,
  };
  group.add(contractAnchor);

  const metrics = measureBeautyCellArt(group);
  group.userData.schemaVersion = BEAUTY_CELL_SPEC.schemaVersion;
  group.userData.stableId = BEAUTY_CELL_SPEC.stableId;
  group.userData.seed = BEAUTY_CELL_SPEC.seed;
  group.userData.environmentKind = BEAUTY_CELL_SPEC.environmentKind;
  group.userData.visualGrammar = BEAUTY_CELL_SPEC.composition;
  group.userData.materialGrammar = BEAUTY_CELL_SPEC.materialGrammar;
  group.userData.generationProvenance = BEAUTY_CELL_SPEC.generationProvenance;
  group.userData.modules = BEAUTY_CELL_SPEC.modules.map((module) => ({
    stableId: module.stableId,
    role: module.role,
    causalRule: module.causalRule,
    gameplayPromise: module.gameplayPromise,
  }));
  group.userData.surfaceProvenance = surfaceLibrary.provenance;
  group.userData.metrics = metrics;
  group.userData.spawnPosition = { x: 430, y: 900 };
  group.userData.playerCorridor = BEAUTY_CELL_SPEC.clearPlayerCorridor;
  group.userData.replacedTerrainIds = [...REPLACED_TERRAIN_IDS];
  group.userData.replacedPropIds = [...REPLACED_PROP_IDS];

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
      surfaceLibrary.dispose();
      ground.clear();
      group.clear();
    },
  };
}
