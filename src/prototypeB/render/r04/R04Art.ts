import * as THREE from "three";
import {
  ANOMALY_ID,
  ENEMY_PLACEMENTS,
  TERRAIN_PLACEMENTS,
  TOWN_CONTRACT_BOARD_POSITION,
} from "../../sim/content";
import { createBeautyCellArtSlice } from "../beautyCell";
import { ColoredGeometryBuilder } from "../coloredGeometry";
import type { StartTownArtSlice } from "../startTownArt";
import { R04_LIVE_PROFILE } from "./R04LiveProfile";

type BatchOptions = {
  readonly name: string;
  readonly roughness: number;
  readonly metalness?: number;
  readonly castShadow?: boolean;
  readonly receiveShadow?: boolean;
  readonly transparent?: boolean;
  readonly opacity?: number;
  readonly clearcoat?: number;
  readonly clearcoatRoughness?: number;
  readonly emissive?: THREE.ColorRepresentation;
  readonly emissiveIntensity?: number;
};

const COLORS = {
  curb: [0xa9b7aa, 0x889d91, 0xc0c6ae],
  concrete: [0xbac2ac, 0x98a999, 0xc9c4a8, 0x7f9489],
  metal: [0x49645f, 0x6e7c70, 0x3c5553, 0x8b765a],
  glass: [0x6da99f, 0x93c1b0, 0x527f7c],
  foliage: [0x28664a, 0x3d7c4c, 0x5b9250, 0x79a456],
  flower: [0xe9b765, 0xe6806c, 0xf0d98b],
  repair: [0xbd7851, 0xd39b61, 0x7a6e58],
} as const;

type FacadeSpecification = {
  readonly colliderId: "town-hall" | "south-house";
  readonly x: number;
  readonly z: number;
  readonly width: number;
  readonly height: number;
  readonly frontZ: number;
  readonly columns: number;
  readonly rows: number;
  readonly seed: number;
};

type FacadeGroundFootprint = {
  readonly colliderId: FacadeSpecification["colliderId"];
  readonly minimumX: number;
  readonly maximumX: number;
  readonly minimumZ: number;
  readonly maximumZ: number;
};

const CAUSAL_FACADE_SPECIFICATIONS = [
  {
    colliderId: "town-hall",
    x: 255,
    z: 645,
    width: 250,
    height: 96,
    frontZ: 720,
    columns: 6,
    rows: 3,
    seed: 41,
  },
  {
    colliderId: "south-house",
    x: 265,
    z: 1_155,
    width: 230,
    height: 78,
    frontZ: 1_220,
    columns: 5,
    rows: 3,
    seed: 87,
  },
] as const satisfies readonly FacadeSpecification[];

const DISTANT_SCRIM_CONTRACT = Object.freeze({
  collisionRole: "non-solid-distant-ghost-scrim" as const,
  worldBoundary: "west" as const,
  maximumReachableX: 0,
});

type InheritedCausalRole =
  | "walkable-surface"
  | "walkable-low-surface"
  | "surface-decal"
  | "surface-fluid"
  | "non-solid-debris"
  | "non-solid-atmospheric"
  | "non-solid-transparent"
  | "non-solid-ecology"
  | "non-solid-effect"
  | "overhead-nonblocking";

const INHERITED_CAUSAL_ROLES = {
  "beauty-cell-wet-asphalt": "walkable-surface",
  "beauty-cell-sidewalks-curbs": "walkable-low-surface",
  "beauty-cell-worn-road-markings": "surface-decal",
  "beauty-cell-road-puddles": "surface-fluid",
  "beauty-cell-road-aggregate": "non-solid-debris",
  "beauty-cell-structural-concrete": "non-solid-atmospheric",
  "beauty-cell-layered-facades": "non-solid-atmospheric",
  "beauty-cell-metal-infrastructure": "non-solid-atmospheric",
  "beauty-cell-laminated-glass": "non-solid-transparent",
  "beauty-cell-working-signals": "non-solid-effect",
  "beauty-cell-spillway-water": "surface-fluid",
  "beauty-cell-causal-foliage": "non-solid-ecology",
  "beauty-cell-human-flower-accents": "non-solid-ecology",
  "beauty-cell-transit-roof": "overhead-nonblocking",
} as const satisfies Readonly<Record<string, InheritedCausalRole>>;

const REMOVED_UNBOUND_INHERITED_OBJECTS = [
  "beauty-cell-stair-retaining-shell",
  "beauty-cell-far-left-shell",
  "beauty-cell-far-right-shell",
  "beauty-cell-world-space-anomaly",
] as const;

function hash(first: number, second: number, third = 0): number {
  return (
    Math.imul(Math.trunc(first) + 0x52, 73_856_093) ^
    Math.imul(Math.trunc(second) + 0x304, 19_349_663) ^
    Math.imul(Math.trunc(third) + R04_LIVE_PROFILE.seed, 83_492_791)
  ) >>> 0;
}

function unit(seed: number, shift = 0): number {
  return ((seed >>> shift) & 0x3ff) / 0x3ff;
}

function color(
  palette: readonly number[],
  seed: number,
): number {
  return palette[seed % palette.length] ?? palette[0] ?? 0xffffff;
}

function addHorizontalQuad(
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

function createBatch(
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
    transparent: options.transparent ?? false,
    opacity: options.opacity ?? 1,
    depthWrite: !(options.transparent ?? false),
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 1,
  } as const;
  const material = options.clearcoat === undefined
    ? new THREE.MeshStandardMaterial(common)
    : new THREE.MeshPhysicalMaterial({
        ...common,
        clearcoat: options.clearcoat,
        clearcoatRoughness: options.clearcoatRoughness ?? 0.1,
      });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = options.name;
  mesh.castShadow = options.castShadow ?? false;
  mesh.receiveShadow = options.receiveShadow ?? false;
  return mesh;
}

function validateCausalFacade(
  specification: FacadeSpecification,
): FacadeGroundFootprint {
  const collider = TERRAIN_PLACEMENTS.find(
    (terrain) => terrain.id === specification.colliderId,
  );
  if (collider === undefined || !collider.solid) {
    throw new Error(
      `R04 facade ${specification.colliderId} has no authoritative collider.`,
    );
  }

  const halfDepth = Math.abs(specification.frontZ - specification.z);
  const footprint: FacadeGroundFootprint = {
    colliderId: specification.colliderId,
    minimumX: specification.x - specification.width / 2,
    maximumX: specification.x + specification.width / 2,
    minimumZ: specification.z - halfDepth,
    maximumZ: specification.z + halfDepth,
  };
  const colliderMaximumX = collider.bounds.x + collider.bounds.width;
  const colliderMaximumZ = collider.bounds.y + collider.bounds.height;
  const epsilon = 0.001;
  if (
    footprint.minimumX < collider.bounds.x - epsilon ||
    footprint.maximumX > colliderMaximumX + epsilon ||
    footprint.minimumZ < collider.bounds.y - epsilon ||
    footprint.maximumZ > colliderMaximumZ + epsilon
  ) {
    throw new Error(
      `R04 facade ${specification.colliderId} exceeds its authoritative collider.`,
    );
  }
  return footprint;
}

function disposeMesh(mesh: THREE.Mesh): void {
  mesh.removeFromParent();
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => material.dispose());
  } else {
    mesh.material.dispose();
  }
}

function disposeObjectTree(object: THREE.Object3D): void {
  object.removeFromParent();
  object.traverse((child) => {
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
}

function makeAtmosphericGhost(mesh: THREE.Mesh): void {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material];
  materials.forEach((material) => {
    material.transparent = true;
    material.opacity = material instanceof THREE.MeshStandardMaterial &&
      material.metalness > 0.3
      ? 0.48
      : 0.34;
    material.depthWrite = false;
    material.needsUpdate = true;
  });
  mesh.castShadow = false;
  mesh.receiveShadow = false;
}

function auditInheritedBeautyCellMeshes(group: THREE.Group): {
  readonly classifiedMeshNames: readonly string[];
  readonly ghostedMeshNames: readonly string[];
} {
  const classifiedMeshNames: string[] = [];
  const ghostedMeshNames: string[] = [];
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || !object.name.startsWith("beauty-cell-")) {
      return;
    }
    const role = INHERITED_CAUSAL_ROLES[
      object.name as keyof typeof INHERITED_CAUSAL_ROLES
    ];
    if (role === undefined) {
      throw new Error(
        `R04 inherited mesh ${object.name} has no causal classification.`,
      );
    }
    object.userData.r04CausalRole = role;
    classifiedMeshNames.push(object.name);
    if (role === "non-solid-atmospheric") {
      makeAtmosphericGhost(object);
      object.userData.outsideSimulationAuthority = true;
      ghostedMeshNames.push(object.name);
    }
    if (role === "overhead-nonblocking") {
      object.userData.minimumClearance = 60;
    }
  });
  return {
    classifiedMeshNames,
    ghostedMeshNames,
  };
}

function removeUnboundInheritedObjects(group: THREE.Group): readonly string[] {
  const removed: string[] = [];
  for (const name of REMOVED_UNBOUND_INHERITED_OBJECTS) {
    const object = group.getObjectByName(name);
    if (object === undefined) {
      throw new Error(`R04 expected inherited object ${name} is missing.`);
    }
    disposeObjectTree(object);
    removed.push(name);
  }
  return removed;
}

function addRoutePass(
  curbs: ColoredGeometryBuilder,
  puddles: ColoredGeometryBuilder,
  details: ColoredGeometryBuilder,
): void {
  const route = R04_LIVE_PROFILE.composition.openRoute;
  const northEdge = route.centerZ - route.halfWidth;
  const southEdge = route.centerZ + route.halfWidth;

  // The lane itself remains empty. These low elements sit at its edges and
  // communicate drainage without looking like waist-high voxel walls.
  addHorizontalQuad(
    curbs,
    [route.minimumX, route.maximumX, northEdge - 8, northEdge - 3.6],
    1.31,
    0x728b80,
  );
  addHorizontalQuad(
    curbs,
    [route.minimumX, route.maximumX, southEdge + 3.6, southEdge + 8],
    1.31,
    0x6a8278,
  );
  for (const edge of [northEdge, southEdge] as const) {
    curbs.addBox({
      center: [(route.minimumX + route.maximumX) / 2, 2.1, edge],
      size: [route.maximumX - route.minimumX, 4.2, 7],
      color: edge === northEdge ? 0xa5b4a6 : 0x91a394,
    });
    for (let index = 0; index < 19; index += 1) {
      const x = route.minimumX + 12 + index * 23;
      details.addBox({
        center: [x, 1.52, edge + (edge === northEdge ? 5.8 : -5.8)],
        size: [13.5, 0.85, 5.5],
        color: index % 4 === 0 ? 0x55716b : 0x405d59,
      });
    }
  }

  const puddleSpecs = [
    [414, 866, 52, 18, -0.08],
    [505, 921, 83, 23, 0.07],
    [612, 858, 62, 16, 0.12],
    [730, 934, 91, 20, -0.05],
    [796, 875, 38, 14, 0.16],
  ] as const;
  for (const [x, z, width, depth, rotation] of puddleSpecs) {
    puddles.addBox({
      center: [x, 1.64, z],
      size: [width, 0.2, depth],
      rotation: [0, rotation, 0],
      color: z > route.centerZ ? 0x86b8ae : 0x72a79f,
    });
  }

  // Fine paving modules keep the open lane mechanically empty while giving
  // the fixed camera enough surface frequency for wet highlights and GTAO.
  // Every piece is sub-centimetre presentation geometry, never a collider.
  for (let row = 0; row < 5; row += 1) {
    for (let column = 0; column < 12; column += 1) {
      const tileSeed = hash(column, row, 0x404);
      const x = 405 + column * 35.2 + (unit(tileSeed, 5) - 0.5) * 3.2;
      const z = 842 + row * 29.4 + (unit(tileSeed, 16) - 0.5) * 2.6;
      details.addBox({
        center: [x, 1.48 + unit(tileSeed, 24) * 0.08, z],
        size: [29 + unit(tileSeed, 3) * 3, 0.18, 22 + unit(tileSeed, 12) * 3],
        rotation: [0, (unit(tileSeed, 20) - 0.5) * 0.025, 0],
        color: color(
          [0x35433f, 0x43544f, 0x53645d, 0x6c6f5d],
          tileSeed,
        ),
        shade: 0.62 + unit(tileSeed, 8) * 0.18,
      });
      if ((row * 12 + column) % 7 === 0) {
        details.addBox({
          center: [x + 3, 1.61, z - 2],
          size: [17 + unit(tileSeed, 14) * 11, 0.16, 1.1],
          rotation: [0, -0.42 + unit(tileSeed, 2) * 0.84, 0],
          color: 0x263a36,
        });
      }
    }
  }

  // Warm, worn crossing marks keep the road readable in the pulled-back view.
  for (let index = 0; index < 8; index += 1) {
    details.addBox({
      center: [668 + index * 14, 1.57, 898],
      size: [8.5, 0.36, 44 - (index % 3) * 4],
      rotation: [0, (index - 4) * 0.006, 0],
      color: index % 3 === 0 ? 0xc1a867 : 0xd1c79d,
      shade: 0.72,
    });
  }
}

function addFacade(
  architecture: ColoredGeometryBuilder,
  glass: ColoredGeometryBuilder,
  metal: ColoredGeometryBuilder,
  vines: ColoredGeometryBuilder,
  specification: FacadeSpecification,
): void {
  const { x, z, width, height, frontZ, columns, rows, seed } = specification;
  architecture.addBox({
    center: [x, height / 2, z],
    size: [width, height, Math.abs(frontZ - z) * 2],
    color: color(COLORS.concrete, seed),
  });
  architecture.addBox({
    center: [x, height + 3, z],
    size: [width + 10, 6, Math.abs(frontZ - z) * 2 + 10],
    color: 0x70867a,
  });

  const depth = Math.abs(frontZ - z) * 2;
  const roofY = height + 6.3;
  // Parapets, patched roof plates, solar glass and tiny roof habitats break
  // the largest orthographic silhouette without changing the collider-backed
  // footprint below.
  for (const [edgeX, edgeZ, edgeWidth, edgeDepth] of [
    [x, z - depth / 2 + 4, width - 12, 4],
    [x, z + depth / 2 - 4, width - 12, 4],
    [x - width / 2 + 4, z, 4, depth - 12],
    [x + width / 2 - 4, z, 4, depth - 12],
  ] as const) {
    metal.addBox({
      center: [edgeX, roofY + 4.2, edgeZ],
      size: [edgeWidth, 8.4, edgeDepth],
      color: 0x5a7068,
    });
  }
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      const roofSeed = hash(column, row, seed + 0x177);
      const panelX = x - width * 0.36 + column * (width * 0.145);
      const panelZ = z - depth * 0.27 + row * (depth * 0.27);
      architecture.addBox({
        center: [panelX, roofY + 0.28, panelZ],
        size: [width * 0.115, 0.42, depth * 0.2],
        rotation: [0, (unit(roofSeed, 11) - 0.5) * 0.035, 0],
        color: color([0x788a7c, 0x879687, 0x9b9277, 0x657b73], roofSeed),
        shade: 0.78 + unit(roofSeed, 19) * 0.16,
      });
    }
  }
  for (let index = 0; index < 4; index += 1) {
    const roofSeed = hash(index, seed, 0x55a);
    const panelX = x - width * 0.23 + index * width * 0.16;
    const panelZ = z - depth * 0.12 + (index % 2) * depth * 0.18;
    metal.addBox({
      center: [panelX, roofY + 5.6, panelZ],
      size: [width * 0.115, 2.4, 4.2],
      color: 0x4a5f5b,
    });
    glass.addBox({
      center: [panelX, roofY + 8.3, panelZ + 3.5],
      size: [width * 0.1, 1.1, depth * 0.16],
      rotation: [-0.14, 0, 0],
      color: index % 2 === 0 ? 0x426f72 : 0x5b8580,
      shade: 0.86 + unit(roofSeed, 13) * 0.12,
    });
  }
  for (let index = 0; index < 12; index += 1) {
    const roofSeed = hash(index, seed, 0x733);
    const plantX = x - width * 0.38 + unit(roofSeed, 4) * width * 0.76;
    const plantZ = z - depth * 0.34 + unit(roofSeed, 15) * depth * 0.68;
    const plantHeight = 8 + unit(roofSeed, 23) * 12;
    vines.addBox({
      center: [plantX, roofY + plantHeight / 2, plantZ],
      size: [1.1, plantHeight, 1.1],
      rotation: [0, 0, (unit(roofSeed, 8) - 0.5) * 0.24],
      color: 0x275f42,
    });
    for (let leaf = 0; leaf < 4; leaf += 1) {
      const leafPhase = unit(roofSeed ^ Math.imul(leaf + 3, 0x45d9f3b), 5) * Math.PI * 2;
      vines.addBox({
        center: [
          plantX + Math.cos(leafPhase) * 3.4,
          roofY + 3 + leaf * (plantHeight / 4),
          plantZ + Math.sin(leafPhase) * 3.4,
        ],
        size: [7.2, 1.7, 2.8],
        rotation: [0, -leafPhase, 0.16],
        color: color(COLORS.foliage, roofSeed + leaf),
      });
    }
  }

  const usableWidth = width - 32;
  for (let column = 0; column < columns; column += 1) {
    const ribX = x - usableWidth / 2 +
      (usableWidth / Math.max(1, columns - 1)) * column;
    architecture.addBox({
      center: [ribX, height / 2, frontZ - 1.1],
      size: [2.4, height - 8, 2.2],
      color: column % 2 === 0 ? 0x84968a : 0xa8b29f,
      shade: 0.88,
    });
  }
  for (let row = 0; row < rows; row += 1) {
    const y = 28 + row * ((height - 38) / Math.max(1, rows - 1));
    for (let column = 0; column < columns; column += 1) {
      const windowSeed = hash(column, row, seed);
      if (unit(windowSeed, 8) < 0.09) {
        continue;
      }
      const windowX = x - usableWidth / 2 +
        (usableWidth / Math.max(1, columns - 1)) * column;
      glass.addBox({
        center: [windowX, y, frontZ + 1.2],
        size: [Math.min(28, usableWidth / columns - 5), 17, 2.2],
        color: color(COLORS.glass, windowSeed),
        shade: 0.9 + unit(windowSeed, 17) * 0.16,
      });
      metal.addBox({
        center: [windowX, y + 10, frontZ + 2.2],
        size: [Math.min(32, usableWidth / columns), 2.2, 3.2],
        color: 0x405b57,
      });
    }
    metal.addBox({
      center: [x, y - 13, frontZ + 3.2],
      size: [width - 18, 3.5, 4],
      color: row % 2 === 0 ? 0x5d746c : 0x806e56,
    });
  }

  // Awnings and repair plates break the box silhouette into HD-2D-like bands.
  for (let index = 0; index < Math.max(2, columns - 1); index += 1) {
    const localSeed = hash(index, seed, 91);
    const awningX = x - width * 0.34 + index * width * 0.22;
    metal.addBox({
      center: [awningX, 23 + (index % 2) * 2, frontZ + 10],
      size: [31, 3.2, 18],
      rotation: [0.09, 0, 0],
      color: color(COLORS.repair, localSeed),
    });
    architecture.addBox({
      center: [awningX + 8, 43 + index * 6, frontZ + 2.2],
      size: [17 + unit(localSeed, 4) * 15, 11, 2],
      rotation: [0, 0, (unit(localSeed, 13) - 0.5) * 0.08],
      color: color(COLORS.repair, localSeed + 1),
    });
  }

  for (let index = 0; index < 9; index += 1) {
    const vineSeed = hash(index, seed, 177);
    const vineX = x - width / 2 + 8 + unit(vineSeed, 3) * (width - 16);
    const vineHeight = 18 + unit(vineSeed, 15) * (height * 0.7);
    vines.addBox({
      center: [vineX, height - vineHeight / 2, frontZ + 4],
      size: [1.6, vineHeight, 1.6],
      rotation: [0, 0, (unit(vineSeed, 22) - 0.5) * 0.18],
      color: 0x285f43,
    });
    for (let leaf = 0; leaf < 4; leaf += 1) {
      vines.addBox({
        center: [
          vineX + (leaf % 2 === 0 ? -1 : 1) * (3 + unit(vineSeed, leaf + 5) * 4),
          height - 8 - leaf * (vineHeight / 4),
          frontZ + 4.5,
        ],
        size: [9, 2.4, 5],
        rotation: [0, (leaf % 2 === 0 ? -1 : 1) * 0.45, 0.12],
        color: color(COLORS.foliage, vineSeed + leaf),
      });
    }
  }
}

function addDistantGhostScrims(
  scrims: ColoredGeometryBuilder,
  frames: ColoredGeometryBuilder,
): void {
  // These layers live wholly west of the reachable world (x < 0). Their
  // translucent, paper-thin construction reads as atmospheric skyline
  // framing rather than a wall the player should collide with.
  for (let index = 0; index < 9; index += 1) {
    const seed = hash(index, 903);
    const z = 535 + index * 92;
    const width = 42 + unit(seed, 4) * 24;
    const height = 92 + unit(seed, 12) * 72;
    scrims.addBox({
      center: [-8, height / 2 + 18 + (index % 3) * 8, z],
      size: [7, height, width],
      color: color(COLORS.concrete, seed),
      shade: 0.76 + unit(seed, 18) * 0.14,
    });
    for (let band = 0; band < 4; band += 1) {
      frames.addBox({
        center: [-4.1, 45 + band * (height / 5), z],
        size: [0.8, 2.4, width - 8],
        color: band % 2 === 0 ? 0x79968b : 0xa27f62,
      });
    }
    frames.addBox({
      center: [-4.1, height + 20 + (index % 3) * 8, z],
      size: [0.8, 4, width + 6],
      color: 0x71847a,
    });
  }
}

function addEdgeVegetation(
  foliage: ColoredGeometryBuilder,
  flowers: ColoredGeometryBuilder,
): void {
  const bands = [
    { count: 82, minX: 48, maxX: 355, minZ: 515, maxZ: 760 },
    { count: 72, minX: 75, maxX: 385, minZ: 1_050, maxZ: 1_285 },
    { count: 64, minX: 620, maxX: 930, minZ: 505, maxZ: 730 },
    { count: 58, minX: 650, maxX: 955, minZ: 1_070, maxZ: 1_300 },
  ] as const;
  bands.forEach((band, bandIndex) => {
    for (let index = 0; index < band.count; index += 1) {
      const seed = hash(index, bandIndex, R04_LIVE_PROFILE.seed);
      const x = band.minX + unit(seed, 2) * (band.maxX - band.minX);
      const z = band.minZ + unit(seed, 13) * (band.maxZ - band.minZ);
      const height = 9 + unit(seed, 20) * 24;
      foliage.addBox({
        center: [x, height / 2 + 1.4, z],
        size: [1.2, height, 1.2],
        rotation: [0, 0, (unit(seed, 7) - 0.5) * 0.22],
        color: 0x275f42,
      });
      for (let leaf = 0; leaf < 7; leaf += 1) {
        const phase = unit(seed ^ Math.imul(leaf + 1, 0x45d9f3b), 4) * Math.PI * 2;
        const radius = 4 + unit(seed, leaf * 4 + 3) * 5.5;
        foliage.addBox({
          center: [
            x + Math.cos(phase) * radius * 0.4,
            5 + leaf * (height / 5),
            z + Math.sin(phase) * radius * 0.4,
          ],
          size: [radius * 1.22, 1.9, radius * 0.44],
          rotation: [0, -phase, (unit(seed, leaf + 19) - 0.5) * 0.3],
          color: color(COLORS.foliage, seed + leaf),
        });
      }
      if (index % 19 === 0) {
        flowers.addBox({
          center: [x, height + 2, z],
          size: [5.5, 2.5, 5.5],
          color: color(COLORS.flower, seed),
        });
      }
    }
  });
}

function createAnchors(): THREE.Group {
  const anchors = new THREE.Group();
  anchors.name = "r04-composition-anchors";
  const route = new THREE.Object3D();
  route.name = "r04-open-route-anchor";
  route.position.set(
    (R04_LIVE_PROFILE.composition.openRoute.minimumX +
      R04_LIVE_PROFILE.composition.openRoute.maximumX) / 2,
    0,
    R04_LIVE_PROFILE.composition.openRoute.centerZ,
  );
  route.userData.bounds = { ...R04_LIVE_PROFILE.composition.openRoute };
  anchors.add(route);

  const contract = new THREE.Object3D();
  contract.name = "r04-contract-anchor";
  contract.position.set(
    TOWN_CONTRACT_BOARD_POSITION.x,
    0,
    TOWN_CONTRACT_BOARD_POSITION.y,
  );
  contract.userData.interactionPoint = { ...TOWN_CONTRACT_BOARD_POSITION };
  anchors.add(contract);
  return anchors;
}

/**
 * R04 keeps the R02 causal scene and collider contract, then recompiles the
 * presentation pass: a brighter physical road, low route edges, layered urban
 * facades and dense edge vegetation. No reference plate is used at runtime.
 */
export function createR04ArtSlice(): StartTownArtSlice {
  const base = createBeautyCellArtSlice();
  const obsoleteFilm = base.group.getObjectByName("beauty-cell-wet-road-film");
  if (obsoleteFilm instanceof THREE.Mesh) {
    disposeMesh(obsoleteFilm);
  }
  const removedUnboundObjects = removeUnboundInheritedObjects(base.group);
  const inheritedCausalAudit = auditInheritedBeautyCellMeshes(base.group);
  const authoritativeAnomaly = ENEMY_PLACEMENTS.find(
    (placement) => placement.id === ANOMALY_ID,
  );
  if (authoritativeAnomaly === undefined) {
    throw new Error("R04 simulation anomaly placement is missing.");
  }

  const curbs = new ColoredGeometryBuilder();
  const puddles = new ColoredGeometryBuilder();
  const routeDetails = new ColoredGeometryBuilder();
  const architecture = new ColoredGeometryBuilder();
  const glass = new ColoredGeometryBuilder();
  const metal = new ColoredGeometryBuilder();
  const vines = new ColoredGeometryBuilder();
  const foliage = new ColoredGeometryBuilder();
  const flowers = new ColoredGeometryBuilder();
  const distantScrims = new ColoredGeometryBuilder();
  const distantScrimFrames = new ColoredGeometryBuilder();

  addRoutePass(curbs, puddles, routeDetails);
  const causalFacadeFootprints = CAUSAL_FACADE_SPECIFICATIONS.map(
    (specification) => {
      const footprint = validateCausalFacade(specification);
      addFacade(architecture, glass, metal, vines, specification);
      return footprint;
    },
  );
  addDistantGhostScrims(distantScrims, distantScrimFrames);
  addEdgeVegetation(foliage, flowers);

  const additions = [
    createBatch(curbs, {
      name: "r04-low-collider-readable-drains-curbs",
      roughness: 0.84,
      receiveShadow: true,
    }),
    createBatch(puddles, {
      name: "r04-localized-physical-puddles",
      roughness: 0.12,
      transparent: true,
      opacity: 0.7,
      clearcoat: 0.96,
      clearcoatRoughness: 0.045,
      receiveShadow: true,
    }),
    createBatch(routeDetails, {
      name: "r04-route-drains-and-worn-markings",
      roughness: 0.62,
      metalness: 0.18,
      receiveShadow: true,
    }),
    createBatch(architecture, {
      name: "r04-layered-fixed-camera-facades",
      roughness: 0.88,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatch(glass, {
      name: "r04-window-bands",
      roughness: 0.2,
      metalness: 0.08,
      clearcoat: 0.72,
      clearcoatRoughness: 0.12,
    }),
    createBatch(metal, {
      name: "r04-rails-awnings-roof-edges",
      roughness: 0.42,
      metalness: 0.58,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatch(vines, {
      name: "r04-facade-vines-repair-decals",
      roughness: 0.81,
      castShadow: true,
    }),
    createBatch(foliage, {
      name: "r04-high-density-edge-vegetation",
      roughness: 0.82,
      castShadow: true,
      receiveShadow: true,
    }),
    createBatch(flowers, {
      name: "r04-foreground-flower-framing",
      roughness: 0.66,
      castShadow: true,
    }),
    createBatch(distantScrims, {
      name: "r04-nonsolid-distant-ghost-scrims",
      roughness: 0.94,
      transparent: true,
      opacity: 0.34,
      emissive: 0x48675f,
      emissiveIntensity: 0.12,
    }),
    createBatch(distantScrimFrames, {
      name: "r04-nonsolid-distant-scrim-frames",
      roughness: 0.78,
      metalness: 0.18,
      transparent: true,
      opacity: 0.42,
      emissive: 0x5d746c,
      emissiveIntensity: 0.1,
    }),
  ] as const;

  additions[3].userData.collisionRole =
    "authoritative-collider-backed-facade";
  additions[3].userData.authoritativeColliderIds =
    CAUSAL_FACADE_SPECIFICATIONS.map(({ colliderId }) => colliderId);
  additions[3].userData.groundFootprints = causalFacadeFootprints;
  for (const scrim of [additions[9], additions[10]] as const) {
    Object.assign(scrim.userData, DISTANT_SCRIM_CONTRACT, {
      outsideReachableWorld: true,
    });
  }

  base.ground.add(additions[0], additions[1], additions[2]);
  base.group.add(...additions.slice(3), createAnchors());
  base.group.name = "r04-art-slice";
  base.ground.name = "r04-ground";
  base.group.userData.schemaVersion = R04_LIVE_PROFILE.schemaVersion;
  base.group.userData.stableId = R04_LIVE_PROFILE.stableId;
  base.group.userData.seed = R04_LIVE_PROFILE.seed;
  base.group.userData.environmentProfile = R04_LIVE_PROFILE.environmentProfile;
  base.group.userData.compositionRule = R04_LIVE_PROFILE.composition.rule;
  base.group.userData.generationProvenance = {
    ...R04_LIVE_PROFILE.generation,
    source: "r02-causal-scene-plus-r04-procedural-presentation",
    solidFacadePolicy: "authoritative-collider-backed-only",
    decorativeFacadePolicy: "non-solid-scrims-outside-reachable-world",
    inheritedGeometryPolicy: "classified-or-rejected-at-construction",
    anomalyPolicy: "simulation-enemy-state-only",
  };
  base.group.userData.openRoute = {
    ...R04_LIVE_PROFILE.composition.openRoute,
  };
  base.group.userData.removedLegacyWetFilm = true;
  base.group.userData.removedUnboundInheritedObjects = removedUnboundObjects;
  base.group.userData.inheritedCausalAudit = inheritedCausalAudit;
  base.group.userData.authoritativeAnomaly = {
    id: authoritativeAnomaly.id,
    initialX: authoritativeAnomaly.x,
    initialZ: authoritativeAnomaly.y,
    source: "simulation-enemy-state",
  };
  base.group.userData.contractBoardPosition = {
    ...TOWN_CONTRACT_BOARD_POSITION,
  };
  base.group.userData.replacedTerrainIds = [...base.replacedTerrainIds];
  base.group.userData.replacedPropIds = [...base.replacedPropIds];

  return base;
}
