import { describe, expect, it } from "vitest";
import {
  COMPANION_RECIPE,
  COMPANION_TRIANGLE_CAP,
  COMPANION_VISUAL_HEIGHT,
  COMPANION_VOXEL_CAP,
  COMPANION_VOXEL_DIMENSIONS,
  COMPANION_VOXEL_PALETTE,
  COMPANION_VOXEL_SIZE,
  PLAYER_RECIPE,
  PLAYER_TRIANGLE_CAP,
  PLAYER_VISUAL_HEIGHT,
  PLAYER_VOXEL_CAP,
  PLAYER_VOXEL_DIMENSIONS,
  PLAYER_VOXEL_PALETTE,
  PLAYER_VOXEL_SIZE,
  VOXEL_RECIPES,
  buildVoxelGrid,
  findVoxelRecipe,
  getVoxel,
  getVoxelRecipe,
  meshVoxelRecipe,
  validateVoxelRecipe,
  type VoxelPalette,
  type VoxelRecipe,
} from "../../src/prototypeB/voxel";

function expectAnchorsOccupied(recipe: VoxelRecipe): void {
  const grid = buildVoxelGrid(recipe);
  for (const anchor of recipe.anchors) {
    expect(anchor.x, `${recipe.id}:${anchor.id}:x`).toBeGreaterThanOrEqual(0);
    expect(anchor.x, `${recipe.id}:${anchor.id}:x`).toBeLessThan(
      recipe.dimensions.width,
    );
    expect(anchor.y, `${recipe.id}:${anchor.id}:y`).toBeGreaterThanOrEqual(0);
    expect(anchor.y, `${recipe.id}:${anchor.id}:y`).toBeLessThan(
      recipe.dimensions.height,
    );
    expect(anchor.z, `${recipe.id}:${anchor.id}:z`).toBeGreaterThanOrEqual(0);
    expect(anchor.z, `${recipe.id}:${anchor.id}:z`).toBeLessThan(
      recipe.dimensions.depth,
    );
    expect(
      getVoxel(grid, anchor.x, anchor.y, anchor.z),
      `${recipe.id}:${anchor.id}`,
    ).not.toBeNull();
  }
}

function expectFunctionalPalette(
  palette: VoxelPalette,
  recipe: VoxelRecipe,
  expectedUsedRange: readonly [minimum: number, maximum: number],
): void {
  expect(new Set(palette.map((entry) => entry.id)).size).toBe(palette.length);
  expect(new Set(palette.map((entry) => entry.color)).size).toBe(palette.length);
  expect(palette.every((entry) => entry.materialRole !== undefined)).toBe(true);
  expect(new Set(palette.map((entry) => entry.materialRole))).toEqual(
    new Set(["matte", "metal", "emissive"]),
  );

  const usedIds = new Set(recipe.voxels.map((voxel) => voxel.paletteId));
  expect(usedIds.size).toBeGreaterThanOrEqual(expectedUsedRange[0]);
  expect(usedIds.size).toBeLessThanOrEqual(expectedUsedRange[1]);
  expect(usedIds).toEqual(new Set(palette.map((entry) => entry.id)));
}

function visiblePaletteIds(
  recipe: VoxelRecipe,
  view: "front" | "back" | "left" | "right",
): ReadonlySet<string> {
  const grid = buildVoxelGrid(recipe);
  const visible = new Set<string>();
  const alongZ = view === "front" || view === "back";
  const outerLimit = alongZ
    ? recipe.dimensions.depth
    : recipe.dimensions.width;
  const span = alongZ
    ? recipe.dimensions.width
    : recipe.dimensions.depth;
  const reverse = view === "back" || view === "right";

  for (let y = 0; y < recipe.dimensions.height; y += 1) {
    for (let across = 0; across < span; across += 1) {
      for (let offset = 0; offset < outerLimit; offset += 1) {
        const depth = reverse ? outerLimit - 1 - offset : offset;
        const paletteId = alongZ
          ? getVoxel(grid, across, y, depth)
          : getVoxel(grid, depth, y, across);
        if (paletteId !== null) {
          visible.add(paletteId);
          break;
        }
      }
    }
  }
  return visible;
}

function expectVisiblePaletteIds(
  visible: ReadonlySet<string>,
  expected: readonly string[],
): void {
  for (const paletteId of expected) {
    expect(visible, paletteId).toContain(paletteId);
  }
}

describe("Visual Pass D canonical hero recipes", () => {
  it("registers stable player and visual-only companion lookups", () => {
    expect(PLAYER_RECIPE.id).toBe("player-relic-surveyor");
    expect(PLAYER_RECIPE.kind).toBe("player");
    expect(COMPANION_RECIPE.id).toBe("companion-survey-lantern");
    expect(COMPANION_RECIPE.kind).toBe("companion");
    expect(VOXEL_RECIPES).toContain(PLAYER_RECIPE);
    expect(VOXEL_RECIPES).toContain(COMPANION_RECIPE);
    expect(getVoxelRecipe("player")).toBe(PLAYER_RECIPE);
    expect(getVoxelRecipe("companion")).toBe(COMPANION_RECIPE);
    expect(getVoxelRecipe(PLAYER_RECIPE.id)).toBe(PLAYER_RECIPE);
    expect(getVoxelRecipe(COMPANION_RECIPE.id)).toBe(COMPANION_RECIPE);
    expect(findVoxelRecipe("missing-asset")).toBeUndefined();
    expect(() => getVoxelRecipe("missing-asset")).toThrow(/Unknown voxel recipe/);
  });

  it("uses the canonical grids and exact authored visual heights", () => {
    expect(PLAYER_RECIPE.dimensions).toEqual(PLAYER_VOXEL_DIMENSIONS);
    expect(PLAYER_VOXEL_DIMENSIONS).toEqual({
      width: 24,
      height: 32,
      depth: 16,
    });
    expect(PLAYER_VOXEL_SIZE).toBe(2.25);
    expect(PLAYER_VISUAL_HEIGHT).toBe(72);

    expect(COMPANION_RECIPE.dimensions).toEqual(COMPANION_VOXEL_DIMENSIONS);
    expect(COMPANION_VOXEL_DIMENSIONS).toEqual({
      width: 20,
      height: 20,
      depth: 18,
    });
    expect(COMPANION_VOXEL_SIZE).toBe(2.1);
    expect(COMPANION_VISUAL_HEIGHT).toBe(42);
  });

  it("keeps both bodies valid, grounded, anchored, and within hard budgets", () => {
    const playerMesh = meshVoxelRecipe(PLAYER_RECIPE, {
      voxelSize: PLAYER_VOXEL_SIZE,
    });
    const companionMesh = meshVoxelRecipe(COMPANION_RECIPE, {
      voxelSize: COMPANION_VOXEL_SIZE,
    });

    expect(playerMesh).toMatchObject({
      voxelCount: 1_656,
      faceCount: 1_928,
      triangleCount: 3_856,
    });
    expect(companionMesh).toMatchObject({
      voxelCount: 904,
      faceCount: 1_394,
      triangleCount: 2_788,
    });
    expect(validateVoxelRecipe(PLAYER_RECIPE).valid).toBe(true);
    expect(validateVoxelRecipe(COMPANION_RECIPE).valid).toBe(true);
    expectAnchorsOccupied(PLAYER_RECIPE);
    expectAnchorsOccupied(COMPANION_RECIPE);
    expect(playerMesh.voxelCount).toBeLessThanOrEqual(PLAYER_VOXEL_CAP);
    expect(playerMesh.triangleCount).toBeLessThanOrEqual(PLAYER_TRIANGLE_CAP);
    expect(companionMesh.voxelCount).toBeLessThanOrEqual(COMPANION_VOXEL_CAP);
    expect(companionMesh.triangleCount).toBeLessThanOrEqual(
      COMPANION_TRIANGLE_CAP,
    );
  });

  it("uses role-complete palettes and shares the rust/cyan visual language", () => {
    expectFunctionalPalette(PLAYER_VOXEL_PALETTE, PLAYER_RECIPE, [8, 10]);
    expectFunctionalPalette(
      COMPANION_VOXEL_PALETTE,
      COMPANION_RECIPE,
      [6, 8],
    );
    for (const sharedId of ["rust", "cyan"]) {
      expect(
        COMPANION_VOXEL_PALETTE.find((entry) => entry.id === sharedId)?.color,
      ).toBe(
        PLAYER_VOXEL_PALETTE.find((entry) => entry.id === sharedId)?.color,
      );
    }
  });

  it("authors readable hero and lantern silhouette landmarks", () => {
    const player = buildVoxelGrid(PLAYER_RECIPE);
    expect(getVoxel(player, 11, 6, 6)).toBeNull();
    expect(getVoxel(player, 7, 6, 6)).toBe("cloth-dark");
    expect(getVoxel(player, 14, 6, 6)).toBe("cloth-dark");
    expect(getVoxel(player, 11, 11, 9)).toBeNull();
    expect(getVoxel(player, 8, 11, 9)).not.toBeNull();
    expect(getVoxel(player, 14, 11, 9)).not.toBeNull();
    expect(
      PLAYER_RECIPE.anchors.find((anchor) => anchor.id === "weapon-grip")?.y,
    ).toBeLessThan(24);

    const companion = buildVoxelGrid(COMPANION_RECIPE);
    expect(getVoxel(companion, 4, 0, 4)).not.toBeNull();
    expect(getVoxel(companion, 14, 0, 4)).not.toBeNull();
    expect(getVoxel(companion, 9, 0, 14)).not.toBeNull();
    expect(getVoxel(companion, 9, 0, 9)).toBeNull();
    expect(getVoxel(companion, 9, 11, 4)).toBeNull();
    expect(getVoxel(companion, 9, 11, 5)).toBeNull();
    expect(getVoxel(companion, 9, 11, 6)).toBe("cyan");
    expect(getVoxel(companion, 13, 19, 9)).toBe("cyan");
  });

  it("keeps directional color anchors exposed in all four authored views", () => {
    const playerFront = visiblePaletteIds(PLAYER_RECIPE, "front");
    const playerBack = visiblePaletteIds(PLAYER_RECIPE, "back");
    const playerLeft = visiblePaletteIds(PLAYER_RECIPE, "left");
    const playerRight = visiblePaletteIds(PLAYER_RECIPE, "right");
    expectVisiblePaletteIds(playerFront, ["skin", "rust", "cyan", "amber"]);
    expectVisiblePaletteIds(playerBack, ["pack-pale", "rust", "steel"]);
    expectVisiblePaletteIds(playerLeft, ["cyan", "amber", "steel"]);
    expectVisiblePaletteIds(playerRight, ["skin", "rust", "pack-pale"]);

    const companionFront = visiblePaletteIds(COMPANION_RECIPE, "front");
    const companionBack = visiblePaletteIds(COMPANION_RECIPE, "back");
    const companionLeft = visiblePaletteIds(COMPANION_RECIPE, "left");
    const companionRight = visiblePaletteIds(COMPANION_RECIPE, "right");
    expectVisiblePaletteIds(companionFront, [
      "shell-light",
      "inner",
      "cyan",
    ]);
    expectVisiblePaletteIds(companionBack, [
      "rust",
      "steel",
      "cyan",
      "amber",
    ]);
    expectVisiblePaletteIds(companionLeft, [
      "shell-light",
      "shell-shadow",
      "rust",
    ]);
    expectVisiblePaletteIds(companionRight, ["steel", "rust", "amber"]);
  });
});
