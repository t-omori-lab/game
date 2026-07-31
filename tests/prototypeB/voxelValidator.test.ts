import { describe, expect, it } from "vitest";
import {
  COMPANION_RECIPE,
  COMPANION_VOXEL_DIMENSIONS,
  COMPANION_VOXEL_PALETTE,
  DEFAULT_VOXEL_DIMENSIONS,
  FRONTIER_VOXEL_PALETTE,
  ENEMY_VOXEL_RECIPES,
  MAX_VOXELS,
  NAMED_ANOMALY_RECIPE,
  PLAYER_RECIPE,
  PLAYER_VOXEL_DIMENSIONS,
  PLAYER_VOXEL_PALETTE,
  PROP_VOXEL_RECIPES,
  SCRAP_HOUND_ENEMY_RECIPE,
  VOXEL_GRID_SIZE,
  VOXEL_RECIPES,
  VOXEL_RECIPE_BY_ID,
  WEAPON_VOXEL_RECIPES,
  assertValidVoxelRecipe,
  buildVoxelGrid,
  findVoxelRecipe,
  getVoxel,
  validateVoxelRecipe,
  type VoxelRecipe,
  type VoxelValidationIssueCode,
} from "../../src/prototypeB/voxel";

const RECTANGULAR_DIMENSIONS = {
  width: 16,
  height: 24,
  depth: 12,
} as const;

function baseRecipe(overrides: Partial<VoxelRecipe> = {}): VoxelRecipe {
  return {
    schemaVersion: 2,
    id: "validator-subject",
    name: "Validator Subject",
    kind: "prop",
    dimensions: DEFAULT_VOXEL_DIMENSIONS,
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

  it("rejects stale schemas and legacy recipes without crashing", () => {
    const staleSchema = {
      ...baseRecipe(),
      schemaVersion: 1,
    } as unknown as VoxelRecipe;
    expect(issueCodes(staleSchema)).toContain("schema-version");

    const legacyRecipe = {
      ...baseRecipe(),
      schemaVersion: 1,
      dimensions: undefined,
      gridSize: VOXEL_GRID_SIZE,
    } as unknown as VoxelRecipe;

    expect(() => validateVoxelRecipe(legacyRecipe)).not.toThrow();
    const codes = issueCodes(legacyRecipe);
    expect(codes).toContain("schema-version");
    expect(codes).toContain("grid-dimensions");
    expect(codes).toContain("voxel-bounds");
    expect(codes).toContain("anchor-bounds");
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

  it("rejects untrusted palette material roles before meshing", () => {
    const recipe = baseRecipe({
      palette: [
        {
          id: "solid",
          color: 0xabcdef,
          materialRole: "glass",
        },
      ] as unknown as VoxelRecipe["palette"],
    });
    const result = validateVoxelRecipe(recipe);

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual(
      expect.objectContaining({
        code: "palette",
        path: "palette[0].materialRole",
      }),
    );
    expect(() => assertValidVoxelRecipe(recipe)).toThrow(
      /material roles/,
    );
  });

  it("validates each rectangular axis independently", () => {
    const recipe = baseRecipe({
      dimensions: RECTANGULAR_DIMENSIONS,
      voxels: [
        { x: 15, y: 0, z: 11, paletteId: "solid" },
        { x: 16, y: 0, z: 0, paletteId: "solid" },
        { x: 0, y: 24, z: 0, paletteId: "solid" },
        { x: 0, y: 0, z: 12, paletteId: "solid" },
      ],
      validation: {
        requireGroundContact: false,
        requireConnectedBody: false,
      },
    });
    const result = validateVoxelRecipe(recipe);

    expect(
      result.issues.filter((issue) => issue.code === "voxel-bounds"),
    ).toHaveLength(3);
    expect(result.uniqueVoxelCount).toBe(1);
  });

  it("rejects invalid grid dimensions before allocating a grid", () => {
    const invalidDimensions = [
      { width: 0, height: 16, depth: 16 },
      { width: 16, height: 23.5, depth: 12 },
      { width: 65, height: 1, depth: 1 },
      { width: 64, height: 64, depth: 64 },
    ];

    for (const dimensions of invalidDimensions) {
      const recipe = baseRecipe({ dimensions });
      expect(issueCodes(recipe)).toContain("grid-dimensions");
      expect(() => assertValidVoxelRecipe(recipe)).toThrow(
        /Invalid voxel recipe/,
      );
    }
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

    const largerThanRecipeGrid = baseRecipe({
      validation: { maxVoxelCount: 16 ** 3 + 1 },
    });
    expect(issueCodes(largerThanRecipeGrid)).toContain("voxel-count");

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
  const legacyVoxelCounts = {
    "weapon-signal-blade": 74,
    "weapon-impact-maul": 340,
    "scrap-hound": 198,
    "relay-shell": 824,
    murmur: 269,
    "anomaly-orison": 996,
    "prop-dry-tree": 560,
    "prop-rift-rock": 417,
    "prop-field-chest": 646,
    "prop-unclassified-relic": 352,
  } as const;

  function voxelFingerprint(recipe: VoxelRecipe): string {
    let hash = 0x811c9dc5;
    for (const voxel of recipe.voxels) {
      const encoded =
        `${voxel.x},${voxel.y},${voxel.z}:${voxel.paletteId};`;
      for (let index = 0; index < encoded.length; index += 1) {
        hash ^= encoded.charCodeAt(index);
        hash = Math.imul(hash, 0x01000193);
      }
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  it("provides the complete deterministic Prototype B content set", () => {
    expect(VOXEL_RECIPES).toHaveLength(12);
    expect(
      VOXEL_RECIPES.map((recipe) => recipe.kind).filter(
        (kind) => kind === "player",
      ),
    ).toHaveLength(1);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "weapon"),
    ).toHaveLength(2);
    expect(
      VOXEL_RECIPES.filter((recipe) => recipe.kind === "companion"),
    ).toEqual([COMPANION_RECIPE]);
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
    expect(VOXEL_RECIPE_BY_ID[COMPANION_RECIPE.id]).toBe(COMPANION_RECIPE);
    expect(VOXEL_RECIPE_BY_ID["scrap-hound"]).toBe(
      SCRAP_HOUND_ENEMY_RECIPE,
    );
    expect(VOXEL_RECIPE_BY_ID["named-anomaly"]).toBe(
      NAMED_ANOMALY_RECIPE,
    );
    expect(VOXEL_RECIPE_BY_ID.player).toBe(PLAYER_RECIPE);
    expect(VOXEL_RECIPE_BY_ID.companion).toBe(COMPANION_RECIPE);
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
      expect(recipe.schemaVersion).toBe(2);
      expect(recipe.dimensions).toEqual(
        recipe === PLAYER_RECIPE
          ? PLAYER_VOXEL_DIMENSIONS
          : recipe === COMPANION_RECIPE
            ? COMPANION_VOXEL_DIMENSIONS
            : DEFAULT_VOXEL_DIMENSIONS,
      );
      expect(recipe.palette).toBe(
        recipe === PLAYER_RECIPE
          ? PLAYER_VOXEL_PALETTE
          : recipe === COMPANION_RECIPE
            ? COMPANION_VOXEL_PALETTE
            : FRONTIER_VOXEL_PALETTE,
      );

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

  it("preserves the ten legacy 16-cube recipes and their authored cell counts", () => {
    const legacyRecipes = VOXEL_RECIPES.filter(
      (recipe) =>
        recipe !== PLAYER_RECIPE && recipe !== COMPANION_RECIPE,
    );

    expect(legacyRecipes).toHaveLength(10);
    for (const recipe of legacyRecipes) {
      expect(recipe.dimensions, recipe.id).toEqual(DEFAULT_VOXEL_DIMENSIONS);
      expect(recipe.voxels, recipe.id).toHaveLength(
        legacyVoxelCounts[recipe.id as keyof typeof legacyVoxelCounts],
      );
    }
  });

  it("preserves exact coordinates, palette ids, and order for legacy recipes", () => {
    const fingerprints = Object.fromEntries(
      VOXEL_RECIPES.filter(
        (recipe) =>
          recipe !== PLAYER_RECIPE && recipe !== COMPANION_RECIPE,
      ).map((recipe) => [recipe.id, voxelFingerprint(recipe)]),
    );

    expect(fingerprints).toEqual({
      "weapon-signal-blade": "c2b4987b",
      "weapon-impact-maul": "e91a0551",
      "scrap-hound": "9697d0b2",
      "relay-shell": "569c5e57",
      murmur: "6c065013",
      "anomaly-orison": "e5f10c27",
      "prop-dry-tree": "4a9d8970",
      "prop-rift-rock": "d250176d",
      "prop-field-chest": "ccee9126",
      "prop-unclassified-relic": "0b767fff",
    });
  });

  it("preserves four to seven visible colors for legacy combatants", () => {
    const characters = VOXEL_RECIPES.filter(
      (recipe) =>
        recipe.kind !== "prop" &&
        recipe !== PLAYER_RECIPE &&
        recipe !== COMPANION_RECIPE,
    );
    for (const recipe of characters) {
      const usedColors = new Set(
        recipe.voxels.map((voxel) => voxel.paletteId),
      );
      expect(usedColors.size, recipe.id).toBeGreaterThanOrEqual(4);
      expect(usedColors.size, recipe.id).toBeLessThanOrEqual(7);
    }
  });

  it("keeps the tall player grounded with real equipment anchors", () => {
    const grid = buildVoxelGrid(PLAYER_RECIPE);

    expect(PLAYER_RECIPE.dimensions).toEqual(PLAYER_VOXEL_DIMENSIONS);
    expect(PLAYER_RECIPE.anchors.map((anchor) => anchor.id)).toEqual([
      "ground",
      "weapon",
      "weapon-grip",
      "free-hand",
      "focus",
    ]);
    for (const anchor of PLAYER_RECIPE.anchors) {
      expect(
        getVoxel(grid, anchor.x, anchor.y, anchor.z),
        anchor.id,
      ).not.toBeNull();
    }
    expect(getVoxel(grid, 11, 6, 6)).toBeNull();
    expect(getVoxel(grid, 12, 6, 6)).toBeNull();
    expect(getVoxel(grid, 7, 6, 6)).toBe("cloth-dark");
    expect(getVoxel(grid, 14, 6, 6)).toBe("cloth-dark");
    expect(PLAYER_RECIPE.voxels.some((voxel) => voxel.y === 0)).toBe(true);
    expect(Math.max(...PLAYER_RECIPE.voxels.map((voxel) => voxel.y))).toBe(31);
    expect(validateVoxelRecipe(PLAYER_RECIPE).valid).toBe(true);
  });
});
