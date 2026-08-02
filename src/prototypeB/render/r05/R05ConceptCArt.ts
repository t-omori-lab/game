import * as THREE from "three";
import { ColoredGeometryBuilder } from "../coloredGeometry";
import { createR04ArtSlice } from "../r04/R04Art";
import type { StartTownArtSlice } from "../startTownArt";

const FOLIAGE = [0x1c5538, 0x2e7041, 0x4d8d49, 0x76a953, 0x9abf63] as const;
const FLOWERS = [0xf3c269, 0xe97c62, 0x91bff0, 0xdca8e9, 0xf4e8b0] as const;
function hash(first: number, second: number, third = 0): number {
  return (
    Math.imul(Math.trunc(first) + 0x53, 73_856_093) ^
    Math.imul(Math.trunc(second) + 0x85, 19_349_663) ^
    Math.imul(Math.trunc(third) + 0x505, 83_492_791)
  ) >>> 0;
}

function unit(seed: number, shift = 0): number {
  return ((seed >>> shift) & 0x3ff) / 0x3ff;
}

function color(palette: readonly number[], seed: number): number {
  return palette[seed % palette.length] ?? palette[0] ?? 0xffffff;
}

function horizontalQuad(
  builder: ColoredGeometryBuilder,
  bounds: readonly [number, number, number, number],
  y: number,
  value: THREE.ColorRepresentation,
): void {
  const [minimumX, maximumX, minimumZ, maximumZ] = bounds;
  builder.addQuad({
    corners: [
      [minimumX, y, minimumZ],
      [minimumX, y, maximumZ],
      [maximumX, y, maximumZ],
      [maximumX, y, minimumZ],
    ],
    color: value,
  });
}

function batch(
  builder: ColoredGeometryBuilder,
  options: {
    readonly name: string;
    readonly roughness: number;
    readonly metalness?: number;
    readonly clearcoat?: number;
    readonly clearcoatRoughness?: number;
    readonly transparent?: boolean;
    readonly opacity?: number;
    readonly emissive?: THREE.ColorRepresentation;
    readonly emissiveIntensity?: number;
    readonly castShadow?: boolean;
    readonly receiveShadow?: boolean;
  },
): THREE.Mesh {
  const geometry = builder.build();
  geometry.name = `${options.name}-geometry`;
  const common = {
    color: 0xffffff,
    vertexColors: true,
    roughness: options.roughness,
    metalness: options.metalness ?? 0,
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    depthWrite: !(options.transparent ?? false),
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
  };
  const material = options.clearcoat === undefined
    ? new THREE.MeshStandardMaterial(common)
    : new THREE.MeshPhysicalMaterial({
        ...common,
        clearcoat: options.clearcoat,
        clearcoatRoughness: options.clearcoatRoughness ?? 0.08,
      });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name;
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  return mesh;
}

function addPlant(
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
  x: number,
  y: number,
  z: number,
  seed: number,
  scale = 1,
): void {
  const height = (7 + unit(seed, 5) * 18) * scale;
  foliage.addBox({
    center: [x, y + height * 0.5, z],
    size: [0.9 * scale, height, 0.9 * scale],
    rotation: [0, 0, (unit(seed, 14) - 0.5) * 0.28],
    color: color(FOLIAGE, seed),
  });
  const leaves = 4 + (seed % 4);
  for (let index = 0; index < leaves; index += 1) {
    const phase = unit(seed ^ Math.imul(index + 7, 0x45d9f3b), 3) * Math.PI * 2;
    const radius = (2.8 + unit(seed, 21) * 4.4) * scale;
    foliage.addBox({
      center: [
        x + Math.cos(phase) * radius * 0.46,
        y + height * (0.28 + index / (leaves + 2)),
        z + Math.sin(phase) * radius * 0.46,
      ],
      size: [radius * 1.34, 1.4 * scale, radius * 0.56],
      rotation: [0, -phase, (unit(seed + index, 9) - 0.5) * 0.24],
      color: color(FOLIAGE, seed + index * 11),
    });
  }
  if (seed % 5 === 0) {
    flowers.addBox({
      center: [x, y + height + 0.8 * scale, z],
      size: [3.6 * scale, 1.8 * scale, 3.6 * scale],
      rotation: [0, unit(seed, 18) * Math.PI, 0],
      color: color(FLOWERS, seed),
    });
  }
}

function addRoofHabitats(
  structure: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  const roofs = [
    { x: 255, y: 104, z: 645, width: 228, depth: 118, seed: 41 },
    { x: 265, y: 86, z: 1_155, width: 208, depth: 104, seed: 87 },
    { x: 294, y: 100, z: 704, width: 136, depth: 54, seed: 119 },
    { x: 430, y: 48, z: 739, width: 88, depth: 56, seed: 157 },
  ] as const;
  for (const roof of roofs) {
    structure.addBox({
      center: [roof.x, roof.y + 1.2, roof.z],
      size: [roof.width * 0.76, 2.4, roof.depth * 0.72],
      color: 0x4a5e49,
    });
    for (let index = 0; index < 34; index += 1) {
      const seed = hash(index, roof.seed, 0x173);
      const x = roof.x - roof.width * 0.34 + unit(seed, 3) * roof.width * 0.68;
      const z = roof.z - roof.depth * 0.31 + unit(seed, 14) * roof.depth * 0.62;
      addPlant(foliage, flowers, x, roof.y + 2.3, z, seed, 0.66 + unit(seed, 23) * 0.6);
    }
    for (let index = 0; index < 4; index += 1) {
      const seed = hash(index, roof.seed, 0x889);
      const x = roof.x - roof.width * 0.26 + index * roof.width * 0.17;
      metal.addBox({
        center: [x, roof.y + 7, roof.z + roof.depth * 0.2],
        size: [roof.width * 0.12, 2, 3],
        color: seed % 2 === 0 ? 0x416565 : 0x586d66,
      });
      metal.addBox({
        center: [x, roof.y + 10, roof.z + roof.depth * 0.16],
        size: [roof.width * 0.105, 1.3, roof.depth * 0.18],
        rotation: [-0.13, 0, 0],
        color: 0x416f72,
      });
    }
  }
}

function addRoadFrequency(
  road: ColoredGeometryBuilder,
  aggregate: ColoredGeometryBuilder,
  puddles: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  // A single coherent asphalt field is the material protagonist of Concept C.
  // It sits over inherited low presentation tiles while every collider and
  // simulation coordinate stays authoritative underneath.
  horizontalQuad(road, [260, 840, 792, 1_010], 2.01, 0x263533);
  horizontalQuad(road, [278, 822, 810, 992], 2.025, 0x2c3b38);

  for (let stripe = 0; stripe < 7; stripe += 1) {
    const seed = hash(stripe, 0x505, 0x57);
    const x = 315 + stripe * 25;
    road.addBox({
      center: [x, 2.09, 906 + (unit(seed, 7) - 0.5) * 3.2],
      size: [14 + unit(seed, 17) * 3, 0.11, 58 + unit(seed, 4) * 18],
      rotation: [0, (unit(seed, 14) - 0.5) * 0.026, 0],
      color: stripe % 3 === 1 ? 0x6f7062 : 0x87836e,
      shade: 0.62 + unit(seed, 23) * 0.13,
    });
  }

  // Long, sparse repair seams and crack shadows. They are intentionally
  // irregular and low-frequency; repeated noise would read as a generated tile.
  for (let index = 0; index < 42; index += 1) {
    const seed = hash(index, 0x92a, 0x505);
    const x = 410 + unit(seed, 4) * 390;
    const z = 830 + unit(seed, 16) * 136;
    const length = 5 + unit(seed, 21) * 23;
    road.addBox({
      center: [x, 2.105, z],
      size: [length, 0.08, 0.7 + unit(seed, 8) * 1.3],
      rotation: [0, unit(seed, 11) * Math.PI, 0],
      color: seed % 7 === 0 ? 0x6b6758 : 0x152320,
      shade: 0.62 + unit(seed, 2) * 0.18,
    });
  }

  for (let index = 0; index < 320; index += 1) {
    const seed = hash(index, 0x623, 0x505);
    const x = 172 + unit(seed, 2) * 548;
    const z = 704 + unit(seed, 13) * 382;
    const edge = x < 218 || x > 682 || z < 748 || z > 1_038;
    if (edge && seed % 3 === 0) {
      addPlant(foliage, flowers, x, 2, z, seed, 0.28 + unit(seed, 21) * 0.36);
      continue;
    }
    aggregate.addBox({
      center: [x, 2.11 + unit(seed, 24) * 0.1, z],
      size: [1.3 + unit(seed, 7) * 7.2, 0.2, 0.8 + unit(seed, 18) * 3.2],
      rotation: [0, unit(seed, 10) * Math.PI, 0],
      color: seed % 11 === 0
        ? 0x5e744f
        : color([0x172724, 0x2b3936, 0x3d4842, 0x5b594c], seed),
      shade: 0.72 + unit(seed, 4) * 0.2,
    });
  }
  const wetPatches = [
    [342, 829, 92, 24, -0.12],
    [471, 878, 116, 31, 0.08],
    [597, 950, 128, 27, -0.04],
    [686, 820, 76, 22, 0.15],
    [409, 1_034, 104, 26, -0.1],
  ] as const;
  for (const [x, z, width, depth, rotation] of wetPatches) {
    puddles.addBox({
      center: [x, 2.22, z],
      size: [width, 0.1, depth],
      rotation: [0, rotation, 0],
      color: z < 900 ? 0x78a79d : 0x5f948c,
    });
  }
}

function addBackgroundCanal(
  structure: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  water: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  // The northern canal fills the empty meadow edge with a recognizable former
  // civic-water structure. It remains outside the playable route and is
  // explicitly visual-only, so it cannot create false collision promises.
  horizontalQuad(water, [-150, 238, 522, 650], -0.3, 0x315f66);
  horizontalQuad(water, [-132, 216, 538, 632], -0.16, 0x4f8587);
  structure.addBox({
    center: [44, 8, 656],
    size: [410, 20, 16],
    color: 0x7c8d84,
  });
  structure.addBox({
    center: [44, 5, 516],
    size: [410, 13, 12],
    color: 0x657a74,
  });
  for (let index = 0; index < 11; index += 1) {
    const x = -124 + index * 33.7;
    metal.addBox({
      center: [x, 25, 653],
      size: [2.2, 34, 2.2],
      color: 0x304d4b,
    });
    if (index < 10) {
      metal.addBox({
        center: [x + 16.85, 40, 653],
        size: [33.7, 2.4, 2.4],
        color: 0x3d5954,
      });
    }
  }
  for (let index = 0; index < 64; index += 1) {
    const seed = hash(index, 0x19c, 0x67);
    const side = seed % 2 === 0 ? 1 : -1;
    const x = -144 + unit(seed, 3) * 376;
    const z = side > 0
      ? 650 + unit(seed, 14) * 32
      : 516 - unit(seed, 14) * 27;
    addPlant(foliage, flowers, x, 0, z, seed, 0.48 + unit(seed, 21) * 0.72);
  }
}

function addHumanScaleStories(
  structure: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  emissive: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  // Transit shelter at the Concept C upper-right read.
  for (const x of [398, 430, 462]) {
    metal.addBox({ center: [x, 38, 708], size: [3, 72, 3], color: 0x36504e });
  }
  metal.addBox({ center: [430, 73, 708], size: [70, 4, 48], color: 0x48615d });
  structure.addBox({ center: [430, 12, 718], size: [82, 8, 28], color: 0x7e897e });
  metal.addBox({ center: [430, 24, 720], size: [61, 5, 20], color: 0x685e50 });
  emissive.addBox({ center: [466, 51, 705], size: [5, 26, 2], color: 0x62f1dd });
  emissive.addBox({ center: [466, 34, 704], size: [5, 6, 2], color: 0xffbd68 });
  for (let index = 0; index < 24; index += 1) {
    const seed = hash(index, 0x817);
    const x = 389 + unit(seed, 3) * 84;
    const z = 681 + unit(seed, 15) * 49;
    addPlant(foliage, flowers, x, 75, z, seed, 0.42 + unit(seed, 22) * 0.42);
  }

  // A lived-in analysis table and storage cluster beside the route.
  structure.addBox({ center: [585, 31, 818], size: [110, 7, 44], color: 0x7f765f });
  for (const x of [540, 630]) {
    metal.addBox({ center: [x, 16, 818], size: [5, 28, 5], color: 0x344a47 });
  }
  for (let index = 0; index < 19; index += 1) {
    const seed = hash(index, 0x994);
    structure.addBox({
      center: [540 + unit(seed, 4) * 88, 37 + unit(seed, 18) * 5, 801 + unit(seed, 11) * 29],
      size: [4 + unit(seed, 6) * 13, 1.2 + unit(seed, 20) * 5, 3 + unit(seed, 13) * 10],
      rotation: [0, unit(seed, 2) * Math.PI, 0],
      color: color([0xb69b71, 0x7c8b7d, 0xa65f42, 0x496866], seed),
    });
  }
  emissive.addBox({ center: [604, 45, 798], size: [10, 2, 4], color: 0xffbd68 });
}

function tuneInheritedMaterials(group: THREE.Group): void {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (!(material instanceof THREE.MeshStandardMaterial)) continue;
      if (/foliage|flower|vine|habitat/i.test(object.name)) {
        material.color.offsetHSL(0, 0.07, 0.01);
        material.envMapIntensity = 0.68;
      } else if (/puddle|water|glass|wet/i.test(object.name)) {
        material.envMapIntensity = 1.28;
      } else {
        material.envMapIntensity = Math.max(material.envMapIntensity, 0.54);
      }
      material.needsUpdate = true;
    }
  });
}

export function createR05ConceptCArtSlice(): StartTownArtSlice {
  const base = createR04ArtSlice();
  const structure = new ColoredGeometryBuilder();
  const metal = new ColoredGeometryBuilder();
  const road = new ColoredGeometryBuilder();
  const aggregate = new ColoredGeometryBuilder();
  const puddles = new ColoredGeometryBuilder();
  const water = new ColoredGeometryBuilder();
  const foliage = new ColoredGeometryBuilder();
  const flowers = new ColoredGeometryBuilder();
  const emissive = new ColoredGeometryBuilder();
  addRoofHabitats(structure, metal, foliage, flowers);
  addRoadFrequency(road, aggregate, puddles, foliage, flowers);
  addBackgroundCanal(structure, metal, water, foliage, flowers);
  addHumanScaleStories(structure, metal, emissive, foliage, flowers);

  const structureMesh = batch(structure, {
    name: "r05-c-concrete-and-lived-in-props",
    roughness: 0.78,
    castShadow: true,
    receiveShadow: true,
  });
  const metalMesh = batch(metal, {
    name: "r05-c-transit-and-rooftop-metal",
    roughness: 0.34,
    metalness: 0.65,
    castShadow: true,
    receiveShadow: true,
  });
  const aggregateMesh = batch(aggregate, {
    name: "r05-c-wet-road-micro-frequency",
    roughness: 0.9,
    receiveShadow: true,
  });
  const roadMesh = batch(road, {
    name: "r05-c-worn-asphalt-and-crosswalk",
    roughness: 0.62,
    clearcoat: 0.24,
    clearcoatRoughness: 0.32,
    receiveShadow: true,
  });
  const puddleMesh = batch(puddles, {
    name: "r05-c-irregular-reflective-patches",
    roughness: 0.08,
    clearcoat: 0.98,
    clearcoatRoughness: 0.035,
    transparent: true,
    opacity: 0.66,
    receiveShadow: true,
  });
  const waterMesh = batch(water, {
    name: "r05-c-northern-canal-water",
    roughness: 0.07,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.82,
  });
  waterMesh.userData.causalRole = "visual-only-outside-playable-canal";
  const foliageMesh = batch(foliage, {
    name: "r05-c-multiscale-reclaimed-vegetation",
    roughness: 0.78,
    castShadow: true,
    receiveShadow: true,
  });
  const flowerMesh = batch(flowers, {
    name: "r05-c-human-scale-flower-color",
    roughness: 0.62,
    castShadow: true,
  });
  const emissiveMesh = batch(emissive, {
    name: "r05-c-practical-route-lights",
    roughness: 0.18,
    emissive: 0x806739,
    emissiveIntensity: 3.2,
  });
  base.ground.add(roadMesh, aggregateMesh, puddleMesh, waterMesh);
  base.group.add(
    structureMesh,
    metalMesh,
    foliageMesh,
    flowerMesh,
    emissiveMesh,
  );

  const workLight = new THREE.PointLight(0xffbd71, 7.2, 180, 2);
  workLight.name = "r05-c-warm-lived-in-work-light";
  workLight.position.set(600, 64, 804);
  const archiveLight = new THREE.PointLight(0x6af4e3, 3.6, 125, 2);
  archiveLight.name = "r05-c-cool-shelter-terminal-light";
  archiveLight.position.set(466, 58, 704);
  base.group.add(workLight, archiveLight);

  tuneInheritedMaterials(base.group);
  base.group.name = "r05-concept-c-causal-art-slice";
  base.group.userData.schemaVersion = "2.0.0";
  base.group.userData.stableId = "fram-r05-concept-c-causal-cell-v2";
  base.group.userData.visualTarget = "Concept C miniature-depth high-density voxel screen";
  base.group.userData.visibleSystem = "deterministic-causal-scene-plus-r05-density-pass";
  return base;
}
