import * as THREE from "three";
import { ColoredGeometryBuilder } from "./coloredGeometry";
import { TOWN_CONTRACT_BOARD_POSITION } from "../sim/content";

export interface NorthStarCityArtSlice {
  readonly group: THREE.Group;
  readonly ground: THREE.Object3D;
  readonly replacedTerrainIds: ReadonlySet<string>;
  readonly replacedPropIds: ReadonlySet<string>;
  dispose(): void;
}

export interface NorthStarCityArtMetrics {
  readonly drawCalls: number;
  readonly triangles: number;
  readonly geometries: number;
  readonly components: number;
}

export const NORTH_STAR_CITY_ART_BUDGET = {
  maximumDrawCalls: 24,
  maximumTriangles: 80_000,
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

const OLD_USE_SIGNALS = [
  "crosswalk-and-lane-markings",
  "mixed-use-apartment-balconies",
  "ground-floor-shop-canopy",
  "elevated-rail-platform-fragment",
  "utility-pipes-and-drainage",
  "public-information-kiosk",
] as const;

const CAUSAL_GROWTH_ZONES = [
  {
    id: "north-facade-runoff",
    cause: "broken gutters feed the shaded apartment wall",
    bounds: { minimumX: 130, maximumX: 380, minimumZ: 700, maximumZ: 756 },
  },
  {
    id: "utility-basin-seep",
    cause: "a cracked rain cistern keeps the old utility apron wet",
    bounds: { minimumX: 320, maximumX: 402, minimumZ: 790, maximumZ: 872 },
  },
  {
    id: "south-drain-garden",
    cause: "road runoff is diverted into repaired food-growing beds",
    bounds: { minimumX: 405, maximumX: 480, minimumZ: 1_110, maximumZ: 1_200 },
  },
] as const;

const LIFE_SIGNALS = [
  "rain-capture-and-filter",
  "patched-solar-panels",
  "kitchen-garden",
  "working-amber-lights",
  "laundry-line",
  "repaired-public-kiosk",
] as const;

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
  readonly physical?: boolean;
  readonly clearcoat?: number;
  readonly clearcoatRoughness?: number;
};

function hash(first: number, second: number, third = 0): number {
  return (
    Math.imul(Math.trunc(first) + 0x51, 73_856_093) ^
    Math.imul(Math.trunc(second) + 0xa7, 19_349_663) ^
    Math.imul(Math.trunc(third) + 0x109, 83_492_791)
  ) >>> 0;
}

function hashUnit(value: number, shift = 0): number {
  return ((value >>> shift) & 0x3ff) / 0x3ff;
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
    size: [length, 0.42, width],
    rotation: [0, -Math.atan2(deltaZ, deltaX), 0],
    color,
  });
}

function createAsphaltTexture(): THREE.DataTexture {
  const width = 512;
  const height = 512;
  const data = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const seed = hash(x, y, 91);
      const coarse = Math.floor(hashUnit(seed) * 24);
      const grain = Math.floor(hashUnit(seed, 10) * 14);
      const seam = (x + Math.floor(y * 0.37)) % 71 < 2;
      const aggregate = (seed & 0x3f) === 0;
      const index = (y * width + x) * 4;
      const shade = THREE.MathUtils.clamp(
        91 + coarse + grain - (seam ? 27 : 0) + (aggregate ? 31 : 0),
        48,
        142,
      );
      data[index] = shade - 7;
      data[index + 1] = shade + 1;
      data[index + 2] = shade + 3;
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
  );
  texture.name = "north-star-city-asphalt-texture";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5.4, 4.7);
  texture.anisotropy = 8;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function createAsphaltMesh(texture: THREE.Texture): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(860, 760, 48, 40);
  geometry.name = "north-star-city-asphalt-geometry";
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(430, 0.62, 900);
  geometry.userData.componentCount = 1;
  const material = new THREE.MeshStandardMaterial({
    name: "north-star-city-asphalt-material",
    color: 0xffffff,
    map: texture,
    roughness: 0.88,
    metalness: 0.04,
    flatShading: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "north-star-city-asphalt";
  mesh.receiveShadow = true;
  return mesh;
}

function addRoadAndSidewalk(
  surfaces: ColoredGeometryBuilder,
  markings: ColoredGeometryBuilder,
  debris: ColoredGeometryBuilder,
): void {
  // Sidewalks frame a broad east-west road while leaving the z=900 route open.
  surfaces.addBox({
    center: [430, 2.5, 778],
    size: [820, 4, 76],
    color: 0x9ca8a4,
  });
  surfaces.addBox({
    center: [430, 2.5, 1_030],
    size: [820, 4, 72],
    color: 0xa7aea4,
  });
  surfaces.addBox({
    center: [72, 2.1, 900],
    size: [66, 3.2, 330],
    color: 0x929c98,
  });
  surfaces.addBox({
    center: [430, 3.2, 816],
    size: [820, 5.2, 7],
    color: 0xc4c5b7,
  });
  surfaces.addBox({
    center: [430, 3.2, 994],
    size: [820, 5.2, 7],
    color: 0xc6c7b9,
  });

  // Japanese urban-road signals: faded center line, stop bar, and crosswalk.
  for (let x = 95; x <= 795; x += 78) {
    markings.addBox({
      center: [x, 1.35, 904],
      size: [42, 0.65, 4.6],
      color: x % 156 === 17 ? 0xc8b763 : 0xd6d3b6,
    });
  }
  for (let x = 560; x <= 656; x += 16) {
    for (let segment = 0; segment < 3; segment += 1) {
      markings.addBox({
        center: [x, 1.42, 853 + segment * 51],
        size: [8.5, 0.7, 38],
        color: (x / 16 + segment) % 3 === 0 ? 0xb4bcb1 : 0xc1c5b8,
      });
    }
  }
  markings.addBox({
    center: [542, 1.4, 904],
    size: [4.5, 0.65, 140],
    color: 0xbfc3b5,
  });
  markings.addBox({
    center: [674, 1.4, 904],
    size: [4.5, 0.65, 140],
    color: 0xbfc3b5,
  });

  const crackPaths: readonly (readonly [number, number])[][] = [
    [[115, 876], [168, 865], [205, 881], [249, 872]],
    [[301, 955], [337, 943], [358, 922], [390, 914]],
    [[421, 853], [444, 869], [467, 866], [490, 883]],
    [[706, 947], [739, 931], [779, 936], [811, 920]],
    [[180, 1_010], [205, 1_001], [232, 1_008]],
  ];
  crackPaths.forEach((points, pathIndex) => {
    for (let index = 0; index < points.length - 1; index += 1) {
      const start = points[index];
      const end = points[index + 1];
      if (start !== undefined && end !== undefined) {
        addSegment(debris, start, end, 1.3, pathIndex % 2 === 0 ? 2.4 : 1.7, 0x3f4d4b);
      }
    }
  });

  for (let index = 0; index < 44; index += 1) {
    const seed = hash(index, 314, 27);
    const x = 92 + hashUnit(seed) * 720;
    const z = 828 + hashUnit(seed, 10) * 150;
    debris.addBox({
      center: [x, 1.42, z],
      size: [2.2 + hashUnit(seed, 20) * 7, 0.55, 1.3 + hashUnit(seed, 5) * 3.5],
      rotation: [0, hashUnit(seed, 15) * Math.PI, 0],
      color: index % 5 === 0 ? 0x9d9a85 : 0x5a6864,
    });
  }
}

function addNorthMixedUseBlock(
  concrete: ColoredGeometryBuilder,
  facade: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  signs: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
): void {
  concrete.addBox({
    center: [255, 78, 645],
    size: [244, 152, 140],
    color: 0xb7b8aa,
    faceShades: { "positive-z": 1.08, "positive-y": 1.06 },
  });
  concrete.addBox({
    center: [268, 161, 646],
    size: [210, 18, 136],
    color: 0x969f9b,
  });
  concrete.addBox({
    center: [141, 118, 647],
    size: [18, 82, 136],
    color: 0xc0b9a6,
  });

  // Panel seams make the building read as an occupied former apartment block.
  for (let floor = 0; floor < 4; floor += 1) {
    const y = 45 + floor * 31;
    for (let column = 0; column < 5; column += 1) {
      const x = 168 + column * 43;
      facade.addBox({
        center: [x, y, 716.15],
        size: [39, 27, 2.2],
        color: (floor + column) % 3 === 0 ? 0xc8c5b3 : 0xaaaead,
      });
      glass.addBox({
        center: [x, y + 2, 717.6],
        size: [24, 14.5, 1.5],
        color: (floor + column) % 4 === 0 ? 0x8fbbc3 : 0x5c8993,
      });
      facade.addBox({
        center: [x, y - 7.2, 718.2],
        size: [27.5, 2.2, 2.5],
        color: 0xd7d0b8,
      });
    }
  }

  for (let floor = 0; floor < 3; floor += 1) {
    const y = 60 + floor * 31;
    concrete.addBox({
      center: [255, y, 727],
      size: [222, 4.2, 22],
      color: 0xa6aaa2,
    });
    metal.addBox({
      center: [255, y + 11, 736.7],
      size: [222, 2.1, 2.1],
      color: 0x697c7b,
    });
    for (let column = 0; column <= 22; column += 1) {
      metal.addBox({
        center: [145 + column * 10, y + 6.3, 736.7],
        size: [1.45, 11, 1.45],
        color: column % 5 === 0 ? 0x8b9996 : 0x657675,
      });
    }
  }

  // Ground-floor shopfront with a generic repaired canopy and no branding.
  glass.addBox({
    center: [215, 20, 717.8],
    size: [72, 30, 2],
    color: 0x4f7f87,
  });
  facade.addBox({
    center: [302, 20, 717.7],
    size: [84, 30, 2.2],
    color: 0x7d8986,
  });
  for (let slat = 0; slat < 9; slat += 1) {
    metal.addBox({
      center: [264 + slat * 10, 20, 719],
      size: [1.2, 29, 1.3],
      color: 0xa6aaa2,
    });
  }
  signs.addBox({
    center: [248, 38, 730],
    size: [194, 5.5, 28],
    rotation: [-0.08, 0, 0],
    color: 0x5fa6a0,
  });
  signs.addBox({
    center: [176, 43, 746],
    size: [42, 20, 3],
    color: 0xe0c66b,
  });
  signs.addBox({
    center: [176, 43, 748],
    size: [31, 3, 1.1],
    color: 0x426c6a,
  });

  // Drainpipes and air-conditioning units reinforce scale and old use.
  for (const x of [153, 244, 352]) {
    metal.addBox({
      center: [x, 85, 739],
      size: [3.4, 134, 3.4],
      color: 0x6e7c78,
    });
  }
  for (let index = 0; index < 5; index += 1) {
    metal.addBox({
      center: [164 + index * 44, 75 + (index % 2) * 31, 741],
      size: [18, 12, 7],
      color: 0x9ba49f,
    });
    metal.addBox({
      center: [164 + index * 44, 75 + (index % 2) * 31, 745],
      size: [11, 6, 1],
      color: 0x657773,
    });
  }

  addGrowthCluster(foliage, 141, 708, 42, 32, 38, 401);
  addGrowthCluster(foliage, 354, 718, 30, 24, 31, 409);
  addFacadeVines(foliage, 151, 717.5, 32, 136, 14, 421);
  addFacadeVines(foliage, 350, 717.7, 54, 126, 18, 427);
}

function addSouthStoreResidence(
  concrete: ColoredGeometryBuilder,
  facade: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  signs: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
): void {
  concrete.addBox({
    center: [265, 57, 1_155],
    size: [224, 110, 126],
    color: 0xc1bfae,
    faceShades: { "negative-z": 1.07 },
  });
  concrete.addBox({
    center: [265, 116, 1_155],
    size: [232, 10, 132],
    color: 0x7f9690,
  });
  facade.addBox({
    center: [265, 61, 1_219.2],
    size: [215, 100, 2.5],
    color: 0xc3bda9,
  });

  // Celadon tile courses keep the low former clinic/shop distinct from concrete.
  for (let column = 0; column < 11; column += 1) {
    facade.addBox({
      center: [166 + column * 20, 53 + (column % 2) * 2, 1_220.8],
      size: [17, 5.5, 1.2],
      color: column % 3 === 0 ? 0x6f9f93 : 0x8aafa3,
    });
  }

  for (let column = 0; column < 4; column += 1) {
    const x = 178 + column * 58;
    glass.addBox({
      center: [x, 79, 1_220.7],
      size: [31, 23, 2],
      color: column === 2 ? 0x93bfc1 : 0x648c94,
    });
    metal.addBox({
      center: [x, 79, 1_222.1],
      size: [34, 2, 2.5],
      color: 0x6e7f7c,
    });
  }
  glass.addBox({
    center: [216, 29, 1_220.9],
    size: [92, 42, 2],
    color: 0x527f86,
  });
  metal.addBox({
    center: [310, 28, 1_221.2],
    size: [67, 42, 2.4],
    color: 0x84908d,
  });
  for (let slat = 0; slat < 7; slat += 1) {
    metal.addBox({
      center: [281 + slat * 10, 28, 1_222.7],
      size: [1.2, 40, 1.1],
      color: 0xb0b2a8,
    });
  }

  signs.addBox({
    center: [260, 50, 1_225],
    size: [212, 5, 16],
    rotation: [-0.1, 0, 0],
    color: 0xcf9f62,
  });
  signs.addBox({
    center: [343, 63, 1_222.7],
    size: [36, 28, 3.2],
    color: 0x5f9ca0,
  });
  signs.addBox({
    center: [343, 63, 1_224.7],
    size: [24, 3, 1],
    color: 0xd3dfc8,
  });

  // Repaired rust-toned kick plates break the facade without reading as rubble.
  for (let index = 0; index < 5; index += 1) {
    metal.addBox({
      center: [174 + index * 42, 7, 1_223.1],
      size: [30, 10, 1.5],
      color: index % 2 === 0 ? 0x9a654d : 0x7d7665,
    });
  }

  // Roof repair panels are intentionally irregular but deterministic.
  for (let index = 0; index < 7; index += 1) {
    const seed = hash(index, 571, 33);
    metal.addBox({
      center: [179 + index * 28, 124, 1_122 + (index % 2) * 33],
      size: [23, 2.5, 27],
      rotation: [0.1, (hashUnit(seed) - 0.5) * 0.08, 0],
      color: index % 3 === 0 ? 0x416d76 : 0x557d83,
    });
    metal.addBox({
      center: [179 + index * 28, 122.2, 1_122 + (index % 2) * 33],
      size: [2, 6, 31],
      color: 0x667771,
    });
  }

  addGrowthCluster(foliage, 163, 1_207, 28, 12, 29, 577);
  addGrowthCluster(foliage, 362, 1_202, 30, 15, 34, 581);
}

function addElevatedRailFragment(
  station: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  concrete: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
): void {
  // The deck is overhead and its visible supports land inside existing colliders.
  station.addBox({
    center: [480, 171, 625],
    size: [470, 17, 58],
    color: 0x8c9692,
  });
  station.addBox({
    center: [468, 159, 625],
    size: [446, 9, 38],
    color: 0x697976,
  });
  for (const z of [608, 642]) {
    metal.addBox({
      center: [474, 183, z],
      size: [454, 3, 3.4],
      color: 0x758786,
    });
    for (let x = 275; x <= 689; x += 23) {
      station.addBox({
        center: [x, 180.2, z],
        size: [5, 2.3, 48],
        color: 0x778480,
      });
    }
  }
  concrete.addBox({
    center: [342, 91, 648],
    size: [25, 158, 36],
    color: 0x929b98,
  });
  concrete.addBox({
    center: [418, 91, 737],
    size: [24, 148, 32],
    color: 0x8b9590,
    rotation: [0.55, 0, 0],
  });

  // A surviving translucent platform canopy creates a recognisable station silhouette.
  glass.addBox({
    center: [490, 201, 623],
    size: [282, 4, 83],
    rotation: [0, 0, -0.03],
    color: 0x88b8b5,
  });
  for (let x = 363; x <= 620; x += 43) {
    metal.addBox({
      center: [x, 190, 625],
      size: [3.2, 24, 71],
      color: 0x617774,
    });
  }
  station.addBox({
    center: [706, 170, 625],
    size: [13, 15, 58],
    color: 0x6f7772,
    rotation: [0, 0, 0.17],
  });
  for (let index = 0; index < 9; index += 1) {
    metal.addBox({
      center: [716 + index * 3.4, 170 + (index % 3) * 3, 606 + (index % 2) * 34],
      size: [18, 1.3, 1.3],
      rotation: [0, (index % 2) * 0.1, (index - 4) * 0.035],
      color: 0x8b735d,
    });
  }
  addGrowthCluster(foliage, 341, 681, 24, 28, 38, 607);
  addFacadeVines(foliage, 418, 734, 38, 126, 12, 613);
}

function addUtilityBasinAndWater(
  concrete: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  water: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
): void {
  concrete.addBox({
    center: [361, 8, 831],
    size: [80, 14, 80],
    color: 0x87918e,
  });
  addHorizontalQuad(water, [327, 395, 797, 865], 15.4, 0x69b5b1);
  for (const x of [328, 394]) {
    concrete.addBox({
      center: [x, 18, 831],
      size: [7, 22, 79],
      color: 0xb0b3aa,
    });
  }
  for (const z of [798, 864]) {
    concrete.addBox({
      center: [361, 18, z],
      size: [79, 22, 7],
      color: 0xb0b3aa,
    });
  }

  // Rain collector and filter unit occupy the existing workyard collider.
  metal.addBox({
    center: [420, 42, 739],
    size: [45, 70, 36],
    color: 0x6e9993,
  });
  metal.addBox({
    center: [420, 78, 739],
    size: [49, 4, 40],
    color: 0x9ab3a8,
  });
  glass.addBox({
    center: [420, 49, 720.5],
    size: [24, 13, 2],
    color: 0x8cc0bd,
  });
  metal.addBox({
    center: [398, 56, 759],
    size: [4, 45, 4],
    color: 0x6b7974,
  });
  addSegment(metal, [398, 759], [376, 792], 35, 4, 0x6b7974);

  for (let index = 0; index < 18; index += 1) {
    const seed = hash(index, 641, 17);
    const angle = hashUnit(seed) * Math.PI * 2;
    const radius = 30 + hashUnit(seed, 10) * 16;
    foliage.addBox({
      center: [361 + Math.cos(angle) * radius, 17 + hashUnit(seed, 20) * 5, 831 + Math.sin(angle) * radius],
      size: [3 + hashUnit(seed, 5) * 4, 8 + hashUnit(seed, 15) * 8, 3 + hashUnit(seed, 7) * 4],
      rotation: [0.1, angle, (hashUnit(seed, 12) - 0.5) * 0.35],
      color: index % 4 === 0 ? 0x86ae58 : 0x4c8d5b,
    });
  }
}

function addContractKiosk(
  metal: ColoredGeometryBuilder,
  signs: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
): void {
  const x = TOWN_CONTRACT_BOARD_POSITION.x;
  const z = TOWN_CONTRACT_BOARD_POSITION.y;
  for (const postX of [x - 35, x + 35]) {
    metal.addBox({
      center: [postX, 34, z],
      size: [5, 66, 5],
      color: 0x667876,
    });
  }
  signs.addBox({
    center: [x, 57, z],
    size: [84, 45, 7],
    color: 0x516c6d,
  });
  glass.addBox({
    center: [x, 58, z + 4],
    size: [73, 34, 2],
    color: 0x74a9a8,
  });
  signs.addBox({
    center: [x, 57, z + 5.3],
    size: [58, 2.2, 1],
    color: 0xd9d7bc,
  });
  signs.addBox({
    center: [x - 16, 49, z + 5.4],
    size: [25, 2, 1],
    color: 0xc6c5ae,
  });
  signs.addBox({
    center: [x + 18, 65, z + 5.4],
    size: [20, 2, 1],
    color: 0xc6c5ae,
  });
  warmGlow.addBox({
    center: [x, 78, z + 1],
    size: [45, 4, 5],
    color: 0xffcf76,
  });
  metal.addBox({
    center: [x - 24, 42, z + 5.6],
    size: [13, 10, 1.4],
    color: 0xd4a858,
  });
}

function addOptimisticLifeLayer(
  metal: ColoredGeometryBuilder,
  signs: ColoredGeometryBuilder,
  foliage: ColoredGeometryBuilder,
  warmGlow: ColoredGeometryBuilder,
): void {
  // Two repaired work lights reuse the authoritative lamp/collider positions.
  for (const z of [760, 1_040]) {
    metal.addBox({
      center: [470, 34, z],
      size: [4, 63, 4],
      color: 0x596d6a,
    });
    metal.addBox({
      center: [470, 67, z],
      size: [20, 5, 9],
      rotation: [0, 0, -0.12],
      color: 0x76908b,
    });
    warmGlow.addBox({
      center: [476, 65, z + 0.5],
      size: [9, 3.5, 7],
      color: 0xffd17d,
    });
  }

  // Food garden: runoff from the south curb is intentionally channelled here.
  for (let row = 0; row < 4; row += 1) {
    const z = 1_120 + row * 22;
    signs.addBox({
      center: [442.5, 5, z],
      size: [70, 8, 14],
      color: 0x816a4d,
    });
    for (let plant = 0; plant < 7; plant += 1) {
      const seed = hash(row, plant, 701);
      foliage.addBox({
        center: [413 + plant * 9.7, 12 + hashUnit(seed) * 3, z],
        size: [5 + hashUnit(seed, 10) * 3, 12 + hashUnit(seed, 20) * 6, 5 + hashUnit(seed, 5) * 3],
        rotation: [0, hashUnit(seed, 15) * Math.PI, (hashUnit(seed, 8) - 0.5) * 0.3],
        color: plant % 3 === 0 ? 0x8eb557 : 0x4f9757,
      });
    }
  }
  addSegment(signs, [403, 1_100], [481, 1_100], 3.4, 5, 0x728c87);
  addSegment(signs, [403, 1_100], [403, 1_195], 3.4, 5, 0x728c87);

  // Laundry and blue repair patches keep the settlement visually matter-of-fact.
  addSegment(metal, [170, 1_222], [350, 1_222], 91, 1.5, 0x6d7c77);
  for (let index = 0; index < 6; index += 1) {
    signs.addBox({
      center: [188 + index * 28, 82 - (index % 2) * 3, 1_224],
      size: [18, 17 + (index % 3) * 4, 1.2],
      rotation: [0, 0, (index % 2 === 0 ? -1 : 1) * 0.045],
      color: [0xe4c66f, 0x6fa7a2, 0xd9d0b2][index % 3] ?? 0xd9d0b2,
    });
  }

  for (let index = 0; index < 14; index += 1) {
    const seed = hash(index, 719, 41);
    foliage.addBox({
      center: [412 + hashUnit(seed) * 60, 20 + hashUnit(seed, 10) * 5, 1_116 + hashUnit(seed, 20) * 76],
      size: [3.2, 5.5, 3.2],
      rotation: [0, hashUnit(seed, 6) * Math.PI, 0],
      color: [0xe2b65e, 0xb96f78, 0x78b9ae][index % 3] ?? 0xe2b65e,
    });
  }

  // A repaired transformer bay occupies the authoritative repair collider.
  metal.addBox({
    center: [568, 31, 814],
    size: [82, 58, 38],
    color: 0x627c79,
  });
  signs.addBox({
    center: [568, 35, 833.6],
    size: [68, 39, 2],
    color: 0x8fa9a0,
  });
  for (let fin = 0; fin < 8; fin += 1) {
    metal.addBox({
      center: [540 + fin * 8, 34, 835.2],
      size: [2.1, 30, 2.2],
      color: fin % 3 === 0 ? 0x9c684e : 0x536966,
    });
  }
  warmGlow.addBox({
    center: [593, 47, 835.6],
    size: [8, 4, 1.5],
    color: 0xffc86c,
  });
  signs.addBox({
    center: [527, 10, 791],
    size: [30, 18, 24],
    color: 0x9a7655,
  });
  addSegment(metal, [526, 801], [542, 833], 7, 3.2, 0x4f6663);

  // Patched storage stays inside the existing south service collider.
  for (let index = 0; index < 4; index += 1) {
    signs.addBox({
      center: [397 + index * 14, 9 + (index % 2) * 9, 1_204],
      size: [13, 17, 16],
      color: index % 2 === 0 ? 0xb08d5b : 0x718d86,
    });
  }
}

function addGrowthCluster(
  foliage: ColoredGeometryBuilder,
  centerX: number,
  centerZ: number,
  halfWidth: number,
  halfDepth: number,
  count: number,
  seedBase: number,
): void {
  for (let index = 0; index < count; index += 1) {
    const seed = hash(index, seedBase, 19);
    const x = centerX + (hashUnit(seed) * 2 - 1) * halfWidth;
    const z = centerZ + (hashUnit(seed, 10) * 2 - 1) * halfDepth;
    const height = 7 + hashUnit(seed, 20) * 17;
    foliage.addBox({
      center: [x, height / 2 + 2.2, z],
      size: [3.5 + hashUnit(seed, 5) * 6, height, 3.5 + hashUnit(seed, 15) * 6],
      rotation: [0.08, hashUnit(seed, 8) * Math.PI, (hashUnit(seed, 17) - 0.5) * 0.42],
      color: [0x3f8354, 0x5c9854, 0x78a957, 0x4c7650][index % 4] ?? 0x4c7650,
    });
  }
}

function addFacadeVines(
  foliage: ColoredGeometryBuilder,
  x: number,
  z: number,
  width: number,
  height: number,
  count: number,
  seedBase: number,
): void {
  for (let index = 0; index < count; index += 1) {
    const seed = hash(index, seedBase, 23);
    const vineX = x + (hashUnit(seed) - 0.5) * width;
    const vineY = 8 + hashUnit(seed, 10) * height;
    foliage.addBox({
      center: [vineX, vineY, z],
      size: [3 + hashUnit(seed, 20) * 5, 9 + hashUnit(seed, 6) * 13, 2.8],
      rotation: [0, 0, (hashUnit(seed, 16) - 0.5) * 0.55],
      color: index % 3 === 0 ? 0x83a956 : 0x477d50,
    });
  }
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
  } as const;
  const material = options.physical
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

export function measureNorthStarCityArtSlice(
  object: THREE.Object3D,
): NorthStarCityArtMetrics {
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
    const componentCount = child.geometry.userData.componentCount;
    if (typeof componentCount === "number") {
      components += componentCount;
    }
  });

  return { drawCalls, triangles, geometries, components };
}

export function createNorthStarCityArtSlice(): NorthStarCityArtSlice {
  const surfaces = new ColoredGeometryBuilder();
  const markings = new ColoredGeometryBuilder();
  const concrete = new ColoredGeometryBuilder();
  const facade = new ColoredGeometryBuilder();
  const glass = new ColoredGeometryBuilder();
  const metal = new ColoredGeometryBuilder();
  const station = new ColoredGeometryBuilder();
  const signs = new ColoredGeometryBuilder();
  const foliage = new ColoredGeometryBuilder();
  const warmGlow = new ColoredGeometryBuilder();
  const water = new ColoredGeometryBuilder();
  const debris = new ColoredGeometryBuilder();
  const group = new THREE.Group();
  group.name = "north-star-city-art-slice";

  addRoadAndSidewalk(surfaces, markings, debris);
  addNorthMixedUseBlock(concrete, facade, glass, metal, signs, foliage);
  addSouthStoreResidence(concrete, facade, glass, metal, signs, foliage);
  addElevatedRailFragment(station, metal, concrete, glass, foliage);
  addUtilityBasinAndWater(concrete, metal, glass, water, foliage);
  addContractKiosk(metal, signs, glass, warmGlow);
  addOptimisticLifeLayer(metal, signs, foliage, warmGlow);
  addGrowthCluster(foliage, 96, 822, 38, 52, 44, 733);
  addGrowthCluster(foliage, 775, 1_015, 48, 38, 38, 739);

  const asphaltTexture = createAsphaltTexture();
  const asphalt = createAsphaltMesh(asphaltTexture);
  const meshes = [
    createBatchMesh(surfaces, {
      name: "north-star-city-curbs-and-sidewalks",
      roughness: 0.9,
      receiveShadow: true,
    }),
    createBatchMesh(markings, {
      name: "north-star-city-road-markings",
      roughness: 0.78,
      receiveShadow: true,
    }),
    createBatchMesh(concrete, {
      name: "north-star-city-structural-concrete",
      roughness: 0.82,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(facade, {
      name: "north-star-city-layered-facades",
      roughness: 0.72,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(glass, {
      name: "north-star-city-glass",
      roughness: 0.2,
      metalness: 0.08,
      transparent: true,
      opacity: 0.82,
      physical: true,
      clearcoat: 0.48,
      clearcoatRoughness: 0.16,
    }),
    createBatchMesh(metal, {
      name: "north-star-city-metal-infrastructure",
      roughness: 0.47,
      metalness: 0.58,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(station, {
      name: "north-star-city-elevated-station",
      roughness: 0.68,
      metalness: 0.28,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(signs, {
      name: "north-star-city-signs-and-life",
      roughness: 0.61,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(foliage, {
      name: "north-star-city-causal-foliage",
      roughness: 0.86,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatchMesh(warmGlow, {
      name: "north-star-city-working-lights",
      roughness: 0.24,
      emissive: 0x9a541f,
      emissiveIntensity: 1.35,
      physical: true,
      clearcoat: 0.35,
      clearcoatRoughness: 0.18,
    }),
    createBatchMesh(water, {
      name: "north-star-city-shallow-water",
      roughness: 0.13,
      metalness: 0.04,
      transparent: true,
      opacity: 0.78,
      physical: true,
      clearcoat: 0.86,
      clearcoatRoughness: 0.08,
      receiveShadow: true,
    }),
    createBatchMesh(debris, {
      name: "north-star-city-cracks-and-aggregate",
      roughness: 0.96,
      receiveShadow: true,
    }),
  ] as const;

  const ground = new THREE.Group();
  ground.name = "north-star-city-ground";
  ground.add(asphalt, meshes[0], meshes[1], meshes[10], meshes[11]);
  group.add(ground, ...meshes.slice(2, 10));

  const contractAnchor = new THREE.Group();
  contractAnchor.name = "north-star-contract-kiosk-anchor";
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

  const metrics = measureNorthStarCityArtSlice(group);
  group.userData.environmentKind = "overgrown-modern-city";
  group.userData.oldUseSignals = [...OLD_USE_SIGNALS];
  group.userData.causalGrowthZones = CAUSAL_GROWTH_ZONES.map((zone) => ({
    ...zone,
    bounds: { ...zone.bounds },
  }));
  group.userData.lifeSignals = [...LIFE_SIGNALS];
  group.userData.metrics = metrics;
  group.userData.replacedTerrainIds = [...REPLACED_TERRAIN_IDS];
  group.userData.replacedPropIds = [...REPLACED_PROP_IDS];
  group.userData.contractBoardPosition = {
    x: TOWN_CONTRACT_BOARD_POSITION.x,
    y: TOWN_CONTRACT_BOARD_POSITION.y,
  };
  group.userData.spawnPosition = { x: 430, y: 900 };
  group.userData.playerCorridor = {
    centerZ: 900,
    minimumX: 390,
    maximumX: 820,
    clearHalfWidth: 70,
  };
  group.userData.nonBlockingOverheadBounds = {
    minimumX: 245,
    maximumX: 715,
    minimumZ: 596,
    maximumZ: 654,
    minimumY: 150,
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
      asphaltTexture.dispose();
      ground.clear();
      group.clear();
    },
  };
}
