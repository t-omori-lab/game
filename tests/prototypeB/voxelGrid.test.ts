import { describe, expect, it } from "vitest";
import {
  DEFAULT_VOXEL_DIMENSIONS,
  EMPTY_VOXEL,
  VOXEL_GRID_SIZE,
  buildVoxelGrid,
  copyVoxelGrid,
  countVoxels,
  createVoxelGrid,
  defineVoxelPalette,
  fillVoxelBox,
  fillVoxelLine,
  getVoxel,
  getVoxelPaletteIndex,
  gridToVoxels,
  setVoxel,
  voxelIndex,
  type VoxelRecipe,
} from "../../src/prototypeB/voxel";

const TALL_DIMENSIONS = {
  width: 16,
  height: 24,
  depth: 12,
} as const;

const TEST_PALETTE = defineVoxelPalette([
  { id: "dark", color: 0x102030 },
  { id: "light", color: 0xa0b0c0 },
] as const);

function validRecipe(): VoxelRecipe {
  return {
    schemaVersion: 2,
    id: "test-column",
    name: "Test Column",
    kind: "prop",
    dimensions: DEFAULT_VOXEL_DIMENSIONS,
    palette: TEST_PALETTE,
    voxels: [
      { x: 1, y: 0, z: 1, paletteId: "dark" },
      { x: 1, y: 1, z: 1, paletteId: "light" },
    ],
    anchors: [{ id: "ground", x: 1, y: 0, z: 1 }],
    validation: { requiredAnchors: ["ground"] },
  };
}

describe("voxel grid helpers", () => {
  it("uses a stable x-major index inside a fixed 16-cube", () => {
    expect(voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 0, 0, 0)).toBe(0);
    expect(voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 1, 0, 0)).toBe(1);
    expect(voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 0, 0, 1)).toBe(
      VOXEL_GRID_SIZE,
    );
    expect(voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 0, 1, 0)).toBe(
      VOXEL_GRID_SIZE * VOXEL_GRID_SIZE,
    );
    expect(() =>
      voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 16, 0, 0),
    ).toThrow(RangeError);
    expect(() =>
      voxelIndex(DEFAULT_VOXEL_DIMENSIONS, 0.5, 0, 0),
    ).toThrow(RangeError);
    expect(() =>
      voxelIndex({ width: 15.5, height: 16, depth: 16 }, 0, 0, 0),
    ).toThrow(RangeError);
  });

  it("uses rectangular width and depth strides without changing legacy order", () => {
    const grid = createVoxelGrid(TEST_PALETTE, {
      dimensions: TALL_DIMENSIONS,
    });

    expect(grid.dimensions).toEqual(TALL_DIMENSIONS);
    expect(grid.cells).toHaveLength(16 * 24 * 12);
    expect(voxelIndex(TALL_DIMENSIONS, 0, 0, 1)).toBe(16);
    expect(voxelIndex(TALL_DIMENSIONS, 0, 1, 0)).toBe(16 * 12);
    expect(voxelIndex(TALL_DIMENSIONS, 15, 23, 11)).toBe(
      16 * 24 * 12 - 1,
    );
    expect(() => voxelIndex(TALL_DIMENSIONS, 16, 0, 0)).toThrow(RangeError);
    expect(() => voxelIndex(TALL_DIMENSIONS, 0, 24, 0)).toThrow(RangeError);
    expect(() => voxelIndex(TALL_DIMENSIONS, 0, 0, 12)).toThrow(RangeError);
  });

  it("sets, replaces, clears, and reads palette-indexed voxels", () => {
    const grid = createVoxelGrid(TEST_PALETTE);

    expect(getVoxel(grid, 2, 3, 4)).toBeNull();
    expect(getVoxelPaletteIndex(grid, 2, 3, 4)).toBe(EMPTY_VOXEL);

    setVoxel(grid, 2, 3, 4, "dark");
    expect(getVoxel(grid, 2, 3, 4)).toBe("dark");
    expect(countVoxels(grid)).toBe(1);

    setVoxel(grid, 2, 3, 4, "light");
    expect(getVoxel(grid, 2, 3, 4)).toBe("light");
    expect(countVoxels(grid)).toBe(1);

    setVoxel(grid, 2, 3, 4, null);
    expect(getVoxel(grid, 2, 3, 4)).toBeNull();
    expect(countVoxels(grid)).toBe(0);
  });

  it("fills inclusive boxes and deterministic lines", () => {
    const grid = createVoxelGrid(TEST_PALETTE);
    fillVoxelBox(
      grid,
      { x: 3, y: 2, z: 1 },
      { x: 2, y: 1, z: 0 },
      "dark",
    );
    expect(countVoxels(grid)).toBe(8);

    fillVoxelLine(
      grid,
      { x: 8, y: 0, z: 8 },
      { x: 8, y: 3, z: 8 },
      "light",
    );
    expect(countVoxels(grid)).toBe(12);
    expect(getVoxel(grid, 8, 2, 8)).toBe("light");
  });

  it("rejects invalid palette data, unknown ids, and invalid endpoints", () => {
    expect(() =>
      createVoxelGrid([
        { id: "same", color: 0 },
        { id: "same", color: 0xffffff },
      ]),
    ).toThrow(/Duplicate/);
    expect(() =>
      createVoxelGrid([{ id: "bad", color: 0x1000000 }]),
    ).toThrow(/0xFFFFFF/);

    const grid = createVoxelGrid(TEST_PALETTE);
    expect(() => setVoxel(grid, 0, 0, 0, "missing")).toThrow(/Unknown/);
    expect(() =>
      fillVoxelBox(
        grid,
        { x: 0, y: 0, z: 0 },
        { x: 16, y: 0, z: 0 },
        "dark",
      ),
    ).toThrow(RangeError);
  });

  it("rejects zero, fractional, oversized-axis, and oversized-volume dimensions", () => {
    expect(() =>
      createVoxelGrid(TEST_PALETTE, {
        dimensions: { width: 0, height: 16, depth: 16 },
      }),
    ).toThrow(RangeError);
    expect(() =>
      createVoxelGrid(TEST_PALETTE, {
        dimensions: { width: 16, height: 23.5, depth: 12 },
      }),
    ).toThrow(RangeError);
    expect(() =>
      createVoxelGrid(TEST_PALETTE, {
        dimensions: { width: 65, height: 1, depth: 1 },
      }),
    ).toThrow(RangeError);
    expect(() =>
      createVoxelGrid(TEST_PALETTE, {
        dimensions: { width: 64, height: 64, depth: 64 },
      }),
    ).toThrow(RangeError);
  });

  it("builds a recipe into an isolated grid and serializes in stable order", () => {
    const recipe = validRecipe();
    const grid = buildVoxelGrid(recipe);
    const copy = copyVoxelGrid(grid);

    expect(grid.recipeId).toBe(recipe.id);
    expect(grid.dimensions).toEqual(recipe.dimensions);
    expect(copy.dimensions).toEqual(recipe.dimensions);
    expect(copy.dimensions).not.toBe(grid.dimensions);
    expect(grid.anchors).toEqual(recipe.anchors);
    expect(gridToVoxels(grid)).toEqual(recipe.voxels);

    setVoxel(copy, 1, 0, 1, null);
    expect(getVoxel(copy, 1, 0, 1)).toBeNull();
    expect(getVoxel(grid, 1, 0, 1)).toBe("dark");
  });

  it("refuses to build invalid recipes unless validation is explicitly skipped", () => {
    const invalid: VoxelRecipe = {
      ...validRecipe(),
      id: "invalid",
      voxels: [{ x: 1, y: 2, z: 1, paletteId: "dark" }],
    };

    expect(() => buildVoxelGrid(invalid)).toThrow(/Invalid voxel recipe/);
    expect(() => buildVoxelGrid(invalid, { validate: false })).not.toThrow();
  });
});
