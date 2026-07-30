export const VOXEL_GRID_SIZE = 16 as const;
export const VOXEL_GRID_VOLUME =
  VOXEL_GRID_SIZE * VOXEL_GRID_SIZE * VOXEL_GRID_SIZE;
export const MAX_VOXELS = VOXEL_GRID_VOLUME;

export type VoxelAssetKind =
  | "player"
  | "weapon"
  | "enemy"
  | "named-anomaly"
  | "prop";

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
  readonly schemaVersion: 1;
  readonly id: string;
  readonly name: string;
  readonly kind: VoxelAssetKind;
  readonly gridSize: typeof VOXEL_GRID_SIZE;
  readonly palette: VoxelPalette;
  readonly voxels: readonly AuthoredVoxel[];
  readonly anchors: readonly VoxelAnchor[];
  readonly validation?: VoxelValidationRules;
}

export interface VoxelGrid {
  readonly size: typeof VOXEL_GRID_SIZE;
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
