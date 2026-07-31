export const VOXEL_GRID_SIZE = 16 as const;
export const VOXEL_GRID_VOLUME =
  VOXEL_GRID_SIZE * VOXEL_GRID_SIZE * VOXEL_GRID_SIZE;
export const MAX_VOXEL_GRID_AXIS = 64 as const;
export const MAX_VOXEL_GRID_VOLUME = 32 * 32 * 32;
export const MAX_VOXELS = MAX_VOXEL_GRID_VOLUME;

export interface VoxelDimensions {
  readonly width: number;
  readonly height: number;
  readonly depth: number;
}

export const DEFAULT_VOXEL_DIMENSIONS = Object.freeze({
  width: VOXEL_GRID_SIZE,
  height: VOXEL_GRID_SIZE,
  depth: VOXEL_GRID_SIZE,
}) satisfies VoxelDimensions;

export function voxelGridVolume(dimensions: VoxelDimensions): number {
  return dimensions.width * dimensions.height * dimensions.depth;
}

export function isValidVoxelDimensions(
  dimensions: unknown,
): dimensions is VoxelDimensions {
  if (
    typeof dimensions !== "object" ||
    dimensions === null ||
    !("width" in dimensions) ||
    !("height" in dimensions) ||
    !("depth" in dimensions)
  ) {
    return false;
  }

  const candidate = dimensions as Partial<VoxelDimensions>;
  return (
    Number.isInteger(candidate.width) &&
    Number.isInteger(candidate.height) &&
    Number.isInteger(candidate.depth) &&
    (candidate.width ?? 0) > 0 &&
    (candidate.height ?? 0) > 0 &&
    (candidate.depth ?? 0) > 0 &&
    (candidate.width ?? Number.POSITIVE_INFINITY) <= MAX_VOXEL_GRID_AXIS &&
    (candidate.height ?? Number.POSITIVE_INFINITY) <= MAX_VOXEL_GRID_AXIS &&
    (candidate.depth ?? Number.POSITIVE_INFINITY) <= MAX_VOXEL_GRID_AXIS &&
    voxelGridVolume(candidate as VoxelDimensions) <= MAX_VOXEL_GRID_VOLUME
  );
}

export type VoxelAssetKind =
  | "player"
  | "companion"
  | "weapon"
  | "enemy"
  | "named-anomaly"
  | "prop";

export type VoxelMaterialRole = "matte" | "metal" | "emissive";

export interface VoxelPoint {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface AuthoredVoxel extends VoxelPoint {
  readonly paletteId: string;
}

export interface VoxelAnchor extends VoxelPoint {
  readonly id: string;
}

/**
 * Colors are encoded as unsigned 24-bit RGB integers (`0xRRGGBB`).
 * The mesher converts them to normalized per-vertex RGB values.
 */
export interface VoxelPaletteEntry {
  readonly id: string;
  readonly color: number;
  readonly label?: string;
  /**
   * Rendering intent for future palette-grouped materials. The current mesher
   * still emits one geometry and preserves this as authored metadata.
   */
  readonly materialRole?: VoxelMaterialRole;
}

export type VoxelPalette = readonly VoxelPaletteEntry[];

export interface VoxelValidationRules {
  readonly minVoxelCount?: number;
  readonly maxVoxelCount?: number;
  readonly requireGroundContact?: boolean;
  readonly requireConnectedBody?: boolean;
  readonly requiredAnchors?: readonly string[];
}

export interface VoxelRecipe {
  readonly schemaVersion: 2;
  readonly id: string;
  readonly name: string;
  readonly kind: VoxelAssetKind;
  readonly dimensions: VoxelDimensions;
  readonly palette: VoxelPalette;
  readonly voxels: readonly AuthoredVoxel[];
  readonly anchors: readonly VoxelAnchor[];
  readonly validation?: VoxelValidationRules;
}

export interface VoxelGrid {
  readonly dimensions: VoxelDimensions;
  readonly cells: Uint16Array;
  readonly palette: VoxelPalette;
  /**
   * Palette indices are one-based because zero represents an empty cell.
   */
  readonly paletteIndexById: ReadonlyMap<string, number>;
  readonly anchors: readonly VoxelAnchor[];
  readonly recipeId?: string;
}

export function defineVoxelPalette<const T extends VoxelPalette>(
  palette: T,
): T {
  return palette;
}

export function defineVoxelRecipe<const T extends VoxelRecipe>(recipe: T): T {
  return recipe;
}
