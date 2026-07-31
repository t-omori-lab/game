import {
  DEFAULT_VOXEL_DIMENSIONS,
  isValidVoxelDimensions,
  type AuthoredVoxel,
  type VoxelDimensions,
  type VoxelGrid,
  type VoxelPalette,
  type VoxelPoint,
  type VoxelRecipe,
  voxelGridVolume,
} from "./types";
import { assertValidVoxelRecipe } from "./validator";

export const EMPTY_VOXEL = 0;

export function isVoxelCoordinateInBounds(
  dimensions: VoxelDimensions,
  x: number,
  y: number,
  z: number,
): boolean {
  return (
    isValidVoxelDimensions(dimensions) &&
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    Number.isInteger(z) &&
    x >= 0 &&
    x < dimensions.width &&
    y >= 0 &&
    y < dimensions.height &&
    z >= 0 &&
    z < dimensions.depth
  );
}

export function voxelIndex(
  dimensions: VoxelDimensions,
  x: number,
  y: number,
  z: number,
): number {
  if (!isVoxelCoordinateInBounds(dimensions, x, y, z)) {
    throw new RangeError(
      `Voxel coordinate (${x}, ${y}, ${z}) is outside the ${dimensions.width}×${dimensions.height}×${dimensions.depth} grid.`,
    );
  }
  return x + dimensions.width * (z + dimensions.depth * y);
}

function createPaletteLookup(palette: VoxelPalette): ReadonlyMap<string, number> {
  if (palette.length > 0xffff) {
    throw new RangeError("A voxel palette cannot contain more than 65,535 entries.");
  }

  const lookup = new Map<string, number>();
  palette.forEach((entry, index) => {
    if (entry.id.trim().length === 0) {
      throw new TypeError("Voxel palette ids must not be empty.");
    }
    if (lookup.has(entry.id)) {
      throw new TypeError(`Duplicate voxel palette id "${entry.id}".`);
    }
    if (
      !Number.isInteger(entry.color) ||
      entry.color < 0 ||
      entry.color > 0xffffff
    ) {
      throw new TypeError(
        `Voxel palette color for "${entry.id}" must be an integer from 0x000000 to 0xFFFFFF.`,
      );
    }
    lookup.set(entry.id, index + 1);
  });
  return lookup;
}

export function createVoxelGrid(
  palette: VoxelPalette,
  options: {
    readonly dimensions?: VoxelDimensions;
    readonly anchors?: readonly VoxelGrid["anchors"][number][];
    readonly recipeId?: string;
  } = {},
): VoxelGrid {
  const dimensions = options.dimensions ?? DEFAULT_VOXEL_DIMENSIONS;
  if (!isValidVoxelDimensions(dimensions)) {
    throw new RangeError(
      "Voxel dimensions must use positive integer axes no larger than 64 and contain no more than 32,768 cells.",
    );
  }

  return {
    dimensions: { ...dimensions },
    cells: new Uint16Array(voxelGridVolume(dimensions)),
    palette,
    paletteIndexById: createPaletteLookup(palette),
    anchors: options.anchors ?? [],
    ...(options.recipeId === undefined ? {} : { recipeId: options.recipeId }),
  };
}

export function copyVoxelGrid(grid: VoxelGrid): VoxelGrid {
  return {
    ...grid,
    dimensions: { ...grid.dimensions },
    cells: grid.cells.slice(),
    anchors: grid.anchors.map((anchor) => ({ ...anchor })),
  };
}

export function getVoxelPaletteIndex(
  grid: VoxelGrid,
  x: number,
  y: number,
  z: number,
): number {
  return grid.cells[voxelIndex(grid.dimensions, x, y, z)] ?? EMPTY_VOXEL;
}

export function getVoxel(
  grid: VoxelGrid,
  x: number,
  y: number,
  z: number,
): string | null {
  const paletteIndex = getVoxelPaletteIndex(grid, x, y, z);
  if (paletteIndex === EMPTY_VOXEL) {
    return null;
  }
  return grid.palette[paletteIndex - 1]?.id ?? null;
}

export function setVoxel(
  grid: VoxelGrid,
  x: number,
  y: number,
  z: number,
  paletteId: string | null,
): void {
  const index = voxelIndex(grid.dimensions, x, y, z);
  if (paletteId === null) {
    grid.cells[index] = EMPTY_VOXEL;
    return;
  }

  const paletteIndex = grid.paletteIndexById.get(paletteId);
  if (paletteIndex === undefined) {
    throw new TypeError(`Unknown voxel palette id "${paletteId}".`);
  }
  grid.cells[index] = paletteIndex;
}

export function setVoxelAt(
  grid: VoxelGrid,
  point: VoxelPoint,
  paletteId: string | null,
): void {
  setVoxel(grid, point.x, point.y, point.z, paletteId);
}

export function fillVoxelBox(
  grid: VoxelGrid,
  from: VoxelPoint,
  to: VoxelPoint,
  paletteId: string,
): void {
  if (
    !isVoxelCoordinateInBounds(grid.dimensions, from.x, from.y, from.z) ||
    !isVoxelCoordinateInBounds(grid.dimensions, to.x, to.y, to.z)
  ) {
    throw new RangeError("Voxel box endpoints must both be inside the grid.");
  }

  const minX = Math.min(from.x, to.x);
  const maxX = Math.max(from.x, to.x);
  const minY = Math.min(from.y, to.y);
  const maxY = Math.max(from.y, to.y);
  const minZ = Math.min(from.z, to.z);
  const maxZ = Math.max(from.z, to.z);

  for (let y = minY; y <= maxY; y += 1) {
    for (let z = minZ; z <= maxZ; z += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        setVoxel(grid, x, y, z, paletteId);
      }
    }
  }
}

/**
 * Draws a deterministic nearest-cell line between two integer grid points.
 * Axis-aligned lines are six-directionally connected; diagonal lines should be
 * validated if they are intended to be part of one authored body.
 */
export function fillVoxelLine(
  grid: VoxelGrid,
  from: VoxelPoint,
  to: VoxelPoint,
  paletteId: string,
): void {
  if (
    !isVoxelCoordinateInBounds(grid.dimensions, from.x, from.y, from.z) ||
    !isVoxelCoordinateInBounds(grid.dimensions, to.x, to.y, to.z)
  ) {
    throw new RangeError("Voxel line endpoints must both be inside the grid.");
  }

  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const deltaZ = to.z - from.z;
  const steps = Math.max(
    Math.abs(deltaX),
    Math.abs(deltaY),
    Math.abs(deltaZ),
  );

  if (steps === 0) {
    setVoxelAt(grid, from, paletteId);
    return;
  }

  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps;
    setVoxel(
      grid,
      Math.round(from.x + deltaX * progress),
      Math.round(from.y + deltaY * progress),
      Math.round(from.z + deltaZ * progress),
      paletteId,
    );
  }
}

export function countVoxels(grid: VoxelGrid): number {
  let count = 0;
  for (const cell of grid.cells) {
    if (cell !== EMPTY_VOXEL) {
      count += 1;
    }
  }
  return count;
}

export function gridToVoxels(grid: VoxelGrid): readonly AuthoredVoxel[] {
  const voxels: AuthoredVoxel[] = [];
  for (let y = 0; y < grid.dimensions.height; y += 1) {
    for (let z = 0; z < grid.dimensions.depth; z += 1) {
      for (let x = 0; x < grid.dimensions.width; x += 1) {
        const paletteIndex = getVoxelPaletteIndex(grid, x, y, z);
        if (paletteIndex === EMPTY_VOXEL) {
          continue;
        }
        const entry = grid.palette[paletteIndex - 1];
        if (entry === undefined) {
          throw new TypeError(
            `Grid cell (${x}, ${y}, ${z}) contains invalid palette index ${paletteIndex}.`,
          );
        }
        voxels.push({ x, y, z, paletteId: entry.id });
      }
    }
  }
  return voxels;
}

export function buildVoxelGrid(
  recipe: VoxelRecipe,
  options: { readonly validate?: boolean } = {},
): VoxelGrid {
  if (options.validate ?? true) {
    assertValidVoxelRecipe(recipe);
  }

  const grid = createVoxelGrid(recipe.palette, {
    dimensions: recipe.dimensions,
    anchors: recipe.anchors,
    recipeId: recipe.id,
  });
  for (const voxel of recipe.voxels) {
    setVoxel(grid, voxel.x, voxel.y, voxel.z, voxel.paletteId);
  }
  return grid;
}
