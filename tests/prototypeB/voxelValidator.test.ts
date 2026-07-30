import { describe, expect, it } from "vitest";
import {
  FRONTIER_VOXEL_PALETTE,
  ENEMY_VOXEL_RECIPES,
  MAX_VOXELS,
  NAMED_ANOMALY_RECIPE,
  PLAYER_RECIPE,
  PROP_VOXEL_RECIPES,
  SCRAP_HOUND_ENEMY_RECIPE,
  VOXEL_GRID_SIZE,
  VOXEL_RECIPES,
  VOXEL_RECIPE_BY_ID,
  WEAPON_VOXEL_RECIPES,
  assertValidVoxelRecipe,
  findVoxelRecipe,
  validateVoxelRecipe,
  type VoxelRecipe,
  type VoxelValidationIssueCode,
} from "../../src/prototypeB/voxel";

function baseRecipe(overrides: Partial<VoxelRecipe> = {}): VoxelRecipe {
  return {
    schemaVersion: 1,
    id: "validator-subject",
    name: "Validator Subject",
    kind: "prop",
    gridSize: VOXEL_GRID_SIZE,
    palette: [{ id: "solid", color: 0xabcdef }],
    voxels: [
      { x: 1, y: 0, z: 1, paletteId: "solid" },
      { x: 1, y: 1, z: 1, paletteId: "solid" },
    ],
    anchors: [{ id: "ground", x: 1, y: 0, z: 1 }],
    validation: {
      requiredAnchors: ["ground"],
      requireGroundContact: true,
      requireConnectedBody: true,
    },
    ...overrides,
  };
}

function issueCodes(recipe: VoxelRecipe): VoxelValidationIssueCode[] {
  return validateVoxelRecipe(recipe).issues.map((issue) => issue.code);
}

describe("voxel recipe validation", () => {
  it("accepts a bounded, grounded, connected recipe with its anchors", () => {
    const result = validateVoxelRecipe(baseRecipe());

    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.voxelCount).toBe(2);
    expect(result.uniqueVoxelCount).toBe(2);
    expect(() => assertValidVoxelRecipe(baseRecipe())).not.toThrow();
  });

  it("reports authoring-grid bounds and palette references together", () => {
    const recipe = baseRecipe({
      palette: [
        { id: "solid", color: 0xabcdef },
        { id: "solid", color: -1 },
      ],
      voxels: [
        { x: 16, y: 0, z: 0, paletteId: "solid" },
        { x: 0, y: 0, z: 0, paletteId: "missing" },
      ],
    });
    const codes = issueCodes(recipe);

    expect(codes).toContain("voxel-bounds");
    expect(codes).toContain("palette");
  });

  it("enforces configured and absolute voxel-count limits", () => {
    const tooManyForRecipe = baseRecipe({
      validation: { maxVoxelCount: 1 },
    });
    expect(issueCodes(tooManyForRecipe)).toContain("voxel-count");

    const impossibleLimit = baseRecipe({
      validation: { maxVoxelCount: MAX_VOXELS + 1 },
    });
    expect(issueCodes(impossibleLimit)).toContain("voxel-count");

    const empty = baseRecipe({ voxels: [] });
    expect(issueCodes(empty)).toContain("voxel-count");
  });

  it("detects duplicate occupancy, missing ground contact, and split bodies", () => {
    const recipe = baseRecipe({
      voxels: [
        { x: 1, y: 2, z: 1, paletteId: "solid" },
        { x: 1, y: 2, z: 1, paletteId: "solid" },
        { x: 14, y: 2, z: 14, paletteId: "solid" },
      ],
    });
    const result = validateVoxelRecipe(recipe);
    const codes = result.issues.map((issue) => issue.code);

    expect(codes).toContain("duplicate-voxel");
    expect(codes).toContain("ground-contact");
    expect(codes).toContain("connected-body");
    expect(result.uniqueVoxelCount).toBe(2);
  });

  it("enforces required anchors and validates anchor identity and bounds", () => {
    const recipe = baseRecipe({
      anchors: [
        { id: "duplicate", x: 0, y: 0, z: 0 },
        { id: "duplicate", x: 16, y: 0, z: 0 },
      ],
      validation: { requiredAnchors: ["ground", "interact"] },
    });
    const codes = issueCodes(recipe);

    expect(codes).toContain("required-anchor");
    expect(codes).toContain("duplicate-anchor");
    expect(codes).toContain("anchor-bounds");
  });

  it("supports stricter call-site rules without mutating the recipe", () => {
    const recipe = baseRecipe();
    const before = JSON.stringify(recipe);
    const result = validateVoxelRecipe(recipe, {
      maxVoxelCount: 1,
      requiredAnchors: ["ground", "socket"],
    });

    expect(result.issues.map((issue) => issue.code)).toContain("voxel-count");
    expect(result.issues.map((issue) => issue.code)).toContain(
      "required-anchor",
    );
    expect(JSON.stringify(recipe)).toBe(before);
  });
});

describe("predefined voxel recipes", () => {
  it("provides the complete deterministic Prototype B content set", () => {
    expect(VOXEL_RECIPES).toHaveLength(11);
    expect(
      VOXEL_RECIPES.map((recipe) => recipe.kind).filter(
        (kind) => kind === "player",
      ),
    ).toHaveLength(1);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "weapon"),
    ).toHaveLength(2);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "enemy"),
    ).toHaveLength(3);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "named-anomaly"),
    ).toEqual([NAMED_ANOMALY_RECIPE]);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "prop"),
    ).toHaveLength(4);
    expect(new Set(VOXEL_RECIPES.map((recipe) => recipe.id)).size).toBe(
      VOXEL_RECIPES.length,
    );
    expect(VOXEL_RECIPE_BY_ID[PLAYER_RECIPE.id]).toBe(PLAYER_RECIPE);
    expect(VOXEL_RECIPE_BY_ID["scrap-hound"]).toBe(
      SCRAP_HOUND_ENEMY_RECIPE,
    );
    expect(VOXEL_RECIPE_BY_ID["named-anomaly"]).toBe(
      NAMED_ANOMALY_RECIPE,
    );
    expect(VOXEL_RECIPE_BY_ID.player).toBe(PLAYER_RECIPE);
    expect(VOXEL_RECIPE_BY_ID.blade).toBe(WEAPON_VOXEL_RECIPES.blade);
    expect(VOXEL_RECIPE_BY_ID["relay-shell"]).toBe(
      ENEMY_VOXEL_RECIPES["relay-shell"],
    );
    expect(VOXEL_RECIPE_BY_ID["dead-tree"]).toBe(
      PROP_VOXEL_RECIPES.tree,
    );
    expect(findVoxelRecipe("named-anomaly")).toBe(NAMED_ANOMALY_RECIPE);
    expect(findVoxelRecipe("toString")).toBeUndefined();
  });

  it("keeps every predefined body valid, grounded, and deterministically ordered", () => {
    for (const recipe of VOXEL_RECIPES) {
      const first = validateVoxelRecipe(recipe);
      const second = validateVoxelRecipe(recipe);

      expect(first, recipe.id).toEqual(second);
      expect(first.valid, recipe.id).toBe(true);
      expect(recipe.gridSize).toBe(16);
      expect(recipe.palette).toBe(FRONTIER_VOXEL_PALETTE);

      const coordinates = recipe.voxels.map(({ x, y, z }) => [y, z, x]);
      expect(coordinates, recipe.id).toEqual(
        [...coordinates].sort(
          (left, right) =>
            (left[0] ?? 0) - (right[0] ?? 0) ||
            (left[1] ?? 0) - (right[1] ?? 0) ||
            (left[2] ?? 0) - (right[2] ?? 0),
        ),
      );
    }
  });

  it("uses four to six visible colors for characters and combatants", () => {
    const characters = VOXEL_RECIPES.filter(
      (recipe) => recipe.kind !== "prop",
    );
    for (const recipe of characters) {
      const usedColors = new Set(
        recipe.voxels.map((voxel) => voxel.paletteId),
      );
      expect(usedColors.size, recipe.id).toBeGreaterThanOrEqual(4);
      expect(usedColors.size, recipe.id).toBeLessThanOrEqual(6);
    }
  });
});
