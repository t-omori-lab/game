import {
  EMPTY_VOXEL,
  buildVoxelGrid,
  getVoxelPaletteIndex,
} from "./grid";
import {
  VOXEL_GRID_SIZE,
  type VoxelGrid,
  type VoxelPoint,
  type VoxelRecipe,
} from "./types";

export type VoxelFace =
  | "positive-x"
  | "negative-x"
  | "positive-y"
  | "negative-y"
  | "positive-z"
  | "negative-z";

interface FaceDefinition {
  readonly name: VoxelFace;
  readonly neighbor: readonly [x: number, y: number, z: number];
  readonly normal: readonly [x: number, y: number, z: number];
  readonly vertices: readonly (readonly [x: number, y: number, z: number])[];
  readonly shade: number;
}

const FACES: readonly FaceDefinition[] = [
  {
    name: "positive-x",
    neighbor: [1, 0, 0],
    normal: [1, 0, 0],
    vertices: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    shade: 0.82,
  },
  {
    name: "negative-x",
    neighbor: [-1, 0, 0],
    normal: [-1, 0, 0],
    vertices: [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    shade: 0.68,
  },
  {
    name: "positive-y",
    neighbor: [0, 1, 0],
    normal: [0, 1, 0],
    vertices: [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0],
    ],
    shade: 1,
  },
  {
    name: "negative-y",
    neighbor: [0, -1, 0],
    normal: [0, -1, 0],
    vertices: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
    shade: 0.55,
  },
  {
    name: "positive-z",
    neighbor: [0, 0, 1],
    normal: [0, 0, 1],
    vertices: [
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
      [0, 0, 1],
    ],
    shade: 0.9,
  },
  {
    name: "negative-z",
    neighbor: [0, 0, -1],
    normal: [0, 0, -1],
    vertices: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    shade: 0.74,
  },
];

export interface VoxelMeshOptions {
  readonly voxelSize?: number;
  readonly origin?: VoxelPoint;
  readonly shadeFaces?: boolean;
  readonly faceShades?: Partial<Readonly<Record<VoxelFace, number>>>;
}

export interface VoxelMeshData {
  readonly positions: Float32Array;
  readonly normals: Float32Array;
  readonly colors: Float32Array;
  readonly indices: Uint32Array;
  readonly voxelCount: number;
  readonly faceCount: number;
  readonly vertexCount: number;
  readonly triangleCount: number;
  readonly bounds: {
    readonly min: readonly [x: number, y: number, z: number];
    readonly max: readonly [x: number, y: number, z: number];
  } | null;
}

function colorChannels(color: number): readonly [number, number, number] {
  return [
    ((color >> 16) & 0xff) / 255,
    ((color >> 8) & 0xff) / 255,
    (color & 0xff) / 255,
  ];
}

function isOccupied(grid: VoxelGrid, x: number, y: number, z: number): boolean {
  if (
    x < 0 ||
    x >= VOXEL_GRID_SIZE ||
    y < 0 ||
    y >= VOXEL_GRID_SIZE ||
    z < 0 ||
    z >= VOXEL_GRID_SIZE
  ) {
    return false;
  }
  return getVoxelPaletteIndex(grid, x, y, z) !== EMPTY_VOXEL;
}

function resolvedOptions(options: VoxelMeshOptions): {
  readonly voxelSize: number;
  readonly origin: VoxelPoint;
  readonly shadeFaces: boolean;
} {
  const voxelSize = options.voxelSize ?? 1;
  const origin = options.origin ?? { x: 0, y: 0, z: 0 };
  if (!Number.isFinite(voxelSize) || voxelSize <= 0) {
    throw new RangeError("Voxel size must be a positive finite number.");
  }
  if (
    !Number.isFinite(origin.x) ||
    !Number.isFinite(origin.y) ||
    !Number.isFinite(origin.z)
  ) {
    throw new RangeError("Voxel mesh origin coordinates must be finite.");
  }
  for (const shade of Object.values(options.faceShades ?? {})) {
    if (shade !== undefined && (!Number.isFinite(shade) || shade < 0)) {
      throw new RangeError("Voxel face shades must be finite non-negative numbers.");
    }
  }
  return {
    voxelSize,
    origin,
    shadeFaces: options.shadeFaces ?? true,
  };
}

export function meshVoxelGrid(
  grid: VoxelGrid,
  options: VoxelMeshOptions = {},
): VoxelMeshData {
  const resolved = resolvedOptions(options);
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  let voxelCount = 0;
  let faceCount = 0;
  let minimumX = Number.POSITIVE_INFINITY;
  let minimumY = Number.POSITIVE_INFINITY;
  let minimumZ = Number.POSITIVE_INFINITY;
  let maximumX = Number.NEGATIVE_INFINITY;
  let maximumY = Number.NEGATIVE_INFINITY;
  let maximumZ = Number.NEGATIVE_INFINITY;

  for (let y = 0; y < VOXEL_GRID_SIZE; y += 1) {
    for (let z = 0; z < VOXEL_GRID_SIZE; z += 1) {
      for (let x = 0; x < VOXEL_GRID_SIZE; x += 1) {
        const paletteIndex = getVoxelPaletteIndex(grid, x, y, z);
        if (paletteIndex === EMPTY_VOXEL) {
          continue;
        }
        voxelCount += 1;
        const paletteEntry = grid.palette[paletteIndex - 1];
        if (paletteEntry === undefined) {
          throw new TypeError(
            `Grid cell (${x}, ${y}, ${z}) contains invalid palette index ${paletteIndex}.`,
          );
        }
        const [red, green, blue] = colorChannels(paletteEntry.color);

        for (const face of FACES) {
          const [neighborX, neighborY, neighborZ] = face.neighbor;
          if (
            isOccupied(grid, x + neighborX, y + neighborY, z + neighborZ)
          ) {
            continue;
          }

          const vertexOffset = positions.length / 3;
          const shade = resolved.shadeFaces
            ? (options.faceShades?.[face.name] ?? face.shade)
            : 1;

          for (const vertex of face.vertices) {
            const positionX =
              resolved.origin.x + (x + vertex[0]) * resolved.voxelSize;
            const positionY =
              resolved.origin.y + (y + vertex[1]) * resolved.voxelSize;
            const positionZ =
              resolved.origin.z + (z + vertex[2]) * resolved.voxelSize;
            positions.push(positionX, positionY, positionZ);
            normals.push(...face.normal);
            colors.push(
              Math.min(1, red * shade),
              Math.min(1, green * shade),
              Math.min(1, blue * shade),
            );
            minimumX = Math.min(minimumX, positionX);
            minimumY = Math.min(minimumY, positionY);
            minimumZ = Math.min(minimumZ, positionZ);
            maximumX = Math.max(maximumX, positionX);
            maximumY = Math.max(maximumY, positionY);
            maximumZ = Math.max(maximumZ, positionZ);
          }

          indices.push(
            vertexOffset,
            vertexOffset + 1,
            vertexOffset + 2,
            vertexOffset,
            vertexOffset + 2,
            vertexOffset + 3,
          );
          faceCount += 1;
        }
      }
    }
  }

  const vertexCount = positions.length / 3;
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    colors: new Float32Array(colors),
    indices: new Uint32Array(indices),
    voxelCount,
    faceCount,
    vertexCount,
    triangleCount: indices.length / 3,
    bounds:
      vertexCount === 0
        ? null
        : {
            min: [minimumX, minimumY, minimumZ],
            max: [maximumX, maximumY, maximumZ],
          },
  };
}

export function meshVoxelRecipe(
  recipe: VoxelRecipe,
  options: VoxelMeshOptions = {},
): VoxelMeshData {
  return meshVoxelGrid(buildVoxelGrid(recipe), options);
}
