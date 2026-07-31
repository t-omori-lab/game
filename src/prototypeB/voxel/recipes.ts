import {
  createVoxelGrid,
  fillVoxelBox,
  fillVoxelLine,
  gridToVoxels,
  setVoxel,
} from "./grid";
import {
  DEFAULT_VOXEL_DIMENSIONS,
  defineVoxelPalette,
  defineVoxelRecipe,
  type VoxelAnchor,
  type VoxelAssetKind,
  type VoxelDimensions,
  type VoxelGrid,
  type VoxelRecipe,
} from "./types";
import { assertValidVoxelRecipe } from "./validator";
import {
  COMPANION_RECIPE,
  PLAYER_RECIPE,
} from "./heroRecipes";

export {
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
} from "./heroRecipes";

export const FRONTIER_VOXEL_PALETTE = defineVoxelPalette([
  { id: "shadow", color: 0x17201f, label: "Mineral shadow" },
  { id: "soil", color: 0x4b3d32, label: "Dark soil" },
  { id: "bone", color: 0xd8c8a4, label: "Bone cloth" },
  { id: "rust", color: 0x984d32, label: "Oxidized red" },
  { id: "cyan", color: 0x4fcbd4, label: "Signal cyan" },
  { id: "amber", color: 0xe3a64a, label: "Warning amber" },
  { id: "cloth", color: 0x354a49, label: "Field cloth" },
  { id: "steel", color: 0x7f8d88, label: "Dull steel" },
  { id: "leaf-dark", color: 0x26432e, label: "Dark foliage" },
  { id: "leaf", color: 0x4f7245, label: "Dry foliage" },
  { id: "wood", color: 0x704b34, label: "Weathered wood" },
  { id: "violet", color: 0x8269a5, label: "Anomaly violet" },
] as const);

interface RecipeDraft<Id extends string> {
  readonly id: Id;
  readonly name: string;
  readonly kind: VoxelAssetKind;
  readonly dimensions?: VoxelDimensions;
  readonly anchors: readonly VoxelAnchor[];
  readonly requiredAnchors: readonly string[];
  readonly author: (grid: VoxelGrid) => void;
}

function authorRecipe<const Id extends string>(
  draft: RecipeDraft<Id>,
): VoxelRecipe & { readonly id: Id } {
  const dimensions = draft.dimensions ?? DEFAULT_VOXEL_DIMENSIONS;
  const grid = createVoxelGrid(FRONTIER_VOXEL_PALETTE, { dimensions });
  draft.author(grid);
  const recipe = defineVoxelRecipe({
    schemaVersion: 2,
    id: draft.id,
    name: draft.name,
    kind: draft.kind,
    dimensions,
    palette: FRONTIER_VOXEL_PALETTE,
    voxels: gridToVoxels(grid),
    anchors: draft.anchors,
    validation: {
      minVoxelCount: 1,
      requireGroundContact: true,
      requireConnectedBody: true,
      requiredAnchors: draft.requiredAnchors,
    },
  });
  assertValidVoxelRecipe(recipe);
  return recipe;
}

export const BLADE_WEAPON_RECIPE = authorRecipe({
  id: "weapon-signal-blade",
  name: "Signal Blade",
  kind: "weapon",
  anchors: [
    { id: "grip", x: 7, y: 1, z: 7 },
    { id: "tip", x: 7, y: 15, z: 7 },
  ],
  requiredAnchors: ["grip", "tip"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 7, y: 0, z: 7 }, { x: 8, y: 3, z: 8 }, "bone");
    fillVoxelBox(grid, { x: 6, y: 0, z: 7 }, { x: 9, y: 0, z: 8 }, "rust");
    fillVoxelBox(grid, { x: 5, y: 4, z: 7 }, { x: 10, y: 4, z: 8 }, "rust");
    fillVoxelBox(grid, { x: 7, y: 5, z: 7 }, { x: 8, y: 14, z: 8 }, "steel");
    fillVoxelBox(grid, { x: 7, y: 6, z: 7 }, { x: 7, y: 13, z: 7 }, "cyan");
    setVoxel(grid, 7, 15, 7, "steel");
    setVoxel(grid, 8, 15, 8, "steel");
  },
});

export const IMPACT_WEAPON_RECIPE = authorRecipe({
  id: "weapon-impact-maul",
  name: "Impact Maul",
  kind: "weapon",
  anchors: [
    { id: "grip", x: 7, y: 1, z: 7 },
    { id: "impact", x: 3, y: 9, z: 7 },
  ],
  requiredAnchors: ["grip", "impact"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 7, y: 0, z: 7 }, { x: 8, y: 9, z: 8 }, "wood");
    fillVoxelBox(grid, { x: 6, y: 0, z: 7 }, { x: 9, y: 1, z: 8 }, "bone");
    fillVoxelBox(grid, { x: 7, y: 4, z: 7 }, { x: 8, y: 5, z: 8 }, "steel");
    fillVoxelBox(grid, { x: 4, y: 8, z: 5 }, { x: 11, y: 12, z: 10 }, "steel");
    fillVoxelBox(grid, { x: 3, y: 8, z: 5 }, { x: 4, y: 12, z: 10 }, "rust");
    fillVoxelBox(grid, { x: 11, y: 8, z: 5 }, { x: 12, y: 12, z: 10 }, "rust");
    fillVoxelBox(grid, { x: 6, y: 12, z: 6 }, { x: 9, y: 12, z: 9 }, "cyan");
  },
});

export const SCRAP_HOUND_ENEMY_RECIPE = authorRecipe({
  id: "scrap-hound",
  name: "Scrap Hound",
  kind: "enemy",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "target", x: 7, y: 3, z: 7 },
  ],
  requiredAnchors: ["ground", "target"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 5, y: 2, z: 5 }, { x: 10, y: 5, z: 10 }, "rust");
    fillVoxelBox(grid, { x: 6, y: 3, z: 5 }, { x: 9, y: 4, z: 5 }, "shadow");
    setVoxel(grid, 6, 4, 5, "amber");
    setVoxel(grid, 9, 4, 5, "amber");
    fillVoxelBox(grid, { x: 3, y: 0, z: 5 }, { x: 4, y: 2, z: 6 }, "shadow");
    fillVoxelBox(grid, { x: 11, y: 0, z: 5 }, { x: 12, y: 2, z: 6 }, "shadow");
    fillVoxelBox(grid, { x: 5, y: 0, z: 3 }, { x: 6, y: 2, z: 4 }, "shadow");
    fillVoxelBox(grid, { x: 9, y: 0, z: 11 }, { x: 10, y: 2, z: 12 }, "shadow");
    fillVoxelLine(grid, { x: 6, y: 5, z: 2 }, { x: 6, y: 5, z: 5 }, "steel");
    fillVoxelLine(grid, { x: 9, y: 5, z: 2 }, { x: 9, y: 5, z: 5 }, "steel");
  },
});

export const RELAY_SHELL_ENEMY_RECIPE = authorRecipe({
  id: "relay-shell",
  name: "Relay Shell",
  kind: "enemy",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "target", x: 7, y: 7, z: 7 },
  ],
  requiredAnchors: ["ground", "target"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 4, y: 0, z: 5 }, { x: 6, y: 3, z: 10 }, "shadow");
    fillVoxelBox(grid, { x: 9, y: 0, z: 5 }, { x: 11, y: 3, z: 10 }, "shadow");
    fillVoxelBox(grid, { x: 3, y: 2, z: 4 }, { x: 12, y: 9, z: 11 }, "rust");
    fillVoxelBox(grid, { x: 3, y: 5, z: 4 }, { x: 12, y: 8, z: 5 }, "steel");
    fillVoxelBox(grid, { x: 5, y: 9, z: 5 }, { x: 10, y: 12, z: 10 }, "bone");
    fillVoxelBox(grid, { x: 6, y: 10, z: 5 }, { x: 9, y: 11, z: 5 }, "shadow");
    setVoxel(grid, 6, 11, 5, "amber");
    setVoxel(grid, 9, 11, 5, "amber");
    fillVoxelLine(grid, { x: 5, y: 12, z: 7 }, { x: 5, y: 14, z: 7 }, "steel");
    fillVoxelLine(grid, { x: 10, y: 12, z: 7 }, { x: 10, y: 14, z: 7 }, "steel");
  },
});

export const MURMUR_ENEMY_RECIPE = authorRecipe({
  id: "murmur",
  name: "Murmur",
  kind: "enemy",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "target", x: 7, y: 8, z: 7 },
  ],
  requiredAnchors: ["ground", "target"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 7, y: 0, z: 7 }, { x: 8, y: 5, z: 8 }, "shadow");
    fillVoxelBox(grid, { x: 5, y: 5, z: 5 }, { x: 10, y: 10, z: 10 }, "violet");
    fillVoxelBox(grid, { x: 6, y: 6, z: 5 }, { x: 9, y: 9, z: 5 }, "cyan");
    fillVoxelBox(grid, { x: 3, y: 7, z: 7 }, { x: 5, y: 8, z: 8 }, "steel");
    fillVoxelBox(grid, { x: 10, y: 7, z: 7 }, { x: 12, y: 8, z: 8 }, "steel");
    fillVoxelBox(grid, { x: 7, y: 11, z: 7 }, { x: 8, y: 14, z: 8 }, "cyan");
    setVoxel(grid, 7, 15, 7, "amber");
  },
});

export const NAMED_ANOMALY_RECIPE = authorRecipe({
  id: "anomaly-orison",
  name: "Orison, the Listening Fault",
  kind: "named-anomaly",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "target", x: 7, y: 8, z: 7 },
    { id: "interact", x: 7, y: 6, z: 4 },
  ],
  requiredAnchors: ["ground", "target", "interact"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 3, y: 0, z: 5 }, { x: 6, y: 5, z: 10 }, "shadow");
    fillVoxelBox(grid, { x: 9, y: 0, z: 5 }, { x: 12, y: 5, z: 10 }, "shadow");
    fillVoxelBox(grid, { x: 3, y: 4, z: 4 }, { x: 12, y: 10, z: 11 }, "violet");
    fillVoxelBox(grid, { x: 1, y: 6, z: 6 }, { x: 3, y: 9, z: 9 }, "steel");
    fillVoxelBox(grid, { x: 12, y: 6, z: 6 }, { x: 14, y: 9, z: 9 }, "steel");
    fillVoxelBox(grid, { x: 5, y: 10, z: 5 }, { x: 10, y: 14, z: 10 }, "bone");
    fillVoxelBox(grid, { x: 5, y: 11, z: 5 }, { x: 10, y: 13, z: 5 }, "shadow");
    fillVoxelBox(grid, { x: 6, y: 11, z: 4 }, { x: 9, y: 12, z: 5 }, "cyan");
    setVoxel(grid, 6, 12, 4, "amber");
    setVoxel(grid, 9, 12, 4, "amber");
    fillVoxelBox(grid, { x: 6, y: 15, z: 6 }, { x: 9, y: 15, z: 9 }, "steel");
    fillVoxelBox(grid, { x: 6, y: 7, z: 3 }, { x: 9, y: 9, z: 4 }, "cyan");
  },
});

export const TREE_RECIPE = authorRecipe({
  id: "prop-dry-tree",
  name: "Dry Signal Tree",
  kind: "prop",
  anchors: [{ id: "ground", x: 7, y: 0, z: 7 }],
  requiredAnchors: ["ground"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 7, y: 0, z: 7 }, { x: 8, y: 9, z: 8 }, "wood");
    fillVoxelBox(grid, { x: 4, y: 0, z: 7 }, { x: 11, y: 0, z: 8 }, "wood");
    fillVoxelBox(grid, { x: 7, y: 0, z: 4 }, { x: 8, y: 0, z: 11 }, "wood");
    fillVoxelBox(grid, { x: 4, y: 7, z: 7 }, { x: 11, y: 8, z: 8 }, "wood");
    fillVoxelBox(grid, { x: 7, y: 7, z: 4 }, { x: 8, y: 8, z: 11 }, "wood");
    fillVoxelBox(grid, { x: 3, y: 9, z: 4 }, { x: 12, y: 12, z: 11 }, "leaf-dark");
    fillVoxelBox(grid, { x: 5, y: 13, z: 5 }, { x: 10, y: 15, z: 10 }, "leaf");
    fillVoxelBox(grid, { x: 5, y: 10, z: 3 }, { x: 10, y: 11, z: 12 }, "leaf");
    setVoxel(grid, 7, 15, 7, "cyan");
  },
});

export const ROCK_RECIPE = authorRecipe({
  id: "prop-rift-rock",
  name: "Rift Rock",
  kind: "prop",
  anchors: [{ id: "ground", x: 7, y: 0, z: 7 }],
  requiredAnchors: ["ground"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 3, y: 0, z: 4 }, { x: 12, y: 2, z: 11 }, "soil");
    fillVoxelBox(grid, { x: 4, y: 3, z: 5 }, { x: 11, y: 5, z: 10 }, "shadow");
    fillVoxelBox(grid, { x: 6, y: 6, z: 6 }, { x: 9, y: 7, z: 9 }, "steel");
    fillVoxelLine(grid, { x: 5, y: 3, z: 5 }, { x: 8, y: 6, z: 5 }, "cyan");
  },
});

export const CHEST_RECIPE = authorRecipe({
  id: "prop-field-chest",
  name: "Field Chest",
  kind: "prop",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "interact", x: 7, y: 4, z: 4 },
  ],
  requiredAnchors: ["ground", "interact"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 3, y: 0, z: 4 }, { x: 12, y: 5, z: 11 }, "wood");
    fillVoxelBox(grid, { x: 3, y: 0, z: 4 }, { x: 4, y: 7, z: 11 }, "steel");
    fillVoxelBox(grid, { x: 11, y: 0, z: 4 }, { x: 12, y: 7, z: 11 }, "steel");
    fillVoxelBox(grid, { x: 3, y: 6, z: 4 }, { x: 12, y: 7, z: 11 }, "rust");
    fillVoxelBox(grid, { x: 7, y: 3, z: 3 }, { x: 8, y: 5, z: 4 }, "amber");
  },
});

export const RELIC_RECIPE = authorRecipe({
  id: "prop-unclassified-relic",
  name: "Unclassified Relic",
  kind: "prop",
  anchors: [
    { id: "ground", x: 7, y: 0, z: 7 },
    { id: "interact", x: 7, y: 7, z: 5 },
    { id: "core", x: 7, y: 8, z: 7 },
  ],
  requiredAnchors: ["ground", "interact", "core"],
  author: (grid) => {
    fillVoxelBox(grid, { x: 5, y: 0, z: 5 }, { x: 10, y: 2, z: 10 }, "soil");
    fillVoxelBox(grid, { x: 7, y: 3, z: 7 }, { x: 8, y: 6, z: 8 }, "steel");
    fillVoxelBox(grid, { x: 5, y: 6, z: 5 }, { x: 10, y: 11, z: 10 }, "violet");
    fillVoxelBox(grid, { x: 6, y: 7, z: 5 }, { x: 9, y: 10, z: 5 }, "cyan");
    fillVoxelBox(grid, { x: 7, y: 8, z: 4 }, { x: 8, y: 9, z: 5 }, "amber");
    fillVoxelBox(grid, { x: 7, y: 12, z: 7 }, { x: 8, y: 14, z: 8 }, "cyan");
  },
});

/**
 * Shape-oriented aliases keep callers readable while the canonical ids stay
 * aligned with deterministic simulation content ids.
 */
export const SKITTER_ENEMY_RECIPE = SCRAP_HOUND_ENEMY_RECIPE;
export const BULWARK_ENEMY_RECIPE = RELAY_SHELL_ENEMY_RECIPE;
export const WISP_ENEMY_RECIPE = MURMUR_ENEMY_RECIPE;

export const VOXEL_RECIPES = [
  PLAYER_RECIPE,
  COMPANION_RECIPE,
  BLADE_WEAPON_RECIPE,
  IMPACT_WEAPON_RECIPE,
  SCRAP_HOUND_ENEMY_RECIPE,
  RELAY_SHELL_ENEMY_RECIPE,
  MURMUR_ENEMY_RECIPE,
  NAMED_ANOMALY_RECIPE,
  TREE_RECIPE,
  ROCK_RECIPE,
  CHEST_RECIPE,
  RELIC_RECIPE,
] as const;

export type PredefinedVoxelRecipe = (typeof VOXEL_RECIPES)[number];
export type PredefinedVoxelRecipeId = PredefinedVoxelRecipe["id"];
export type VoxelRecipeLookupId =
  | PredefinedVoxelRecipeId
  | "player"
  | "companion"
  | "blade"
  | "impact"
  | "named-anomaly"
  | "tree"
  | "dead-tree"
  | "rock"
  | "chest"
  | "relic"
  | "unclassified-relic";

export const WEAPON_VOXEL_RECIPES = Object.freeze({
  blade: BLADE_WEAPON_RECIPE,
  impact: IMPACT_WEAPON_RECIPE,
});

export const ENEMY_VOXEL_RECIPES = Object.freeze({
  "scrap-hound": SCRAP_HOUND_ENEMY_RECIPE,
  "relay-shell": RELAY_SHELL_ENEMY_RECIPE,
  murmur: MURMUR_ENEMY_RECIPE,
  "named-anomaly": NAMED_ANOMALY_RECIPE,
});

export const PROP_VOXEL_RECIPES = Object.freeze({
  tree: TREE_RECIPE,
  rock: ROCK_RECIPE,
  chest: CHEST_RECIPE,
  relic: RELIC_RECIPE,
});

export const VOXEL_RECIPE_BY_ID = Object.freeze(
  {
    ...Object.fromEntries(
      VOXEL_RECIPES.map((recipe) => [recipe.id, recipe]),
    ),
    player: PLAYER_RECIPE,
    companion: COMPANION_RECIPE,
    ...WEAPON_VOXEL_RECIPES,
    ...ENEMY_VOXEL_RECIPES,
    ...PROP_VOXEL_RECIPES,
    "dead-tree": TREE_RECIPE,
    "unclassified-relic": RELIC_RECIPE,
  } as Readonly<Record<VoxelRecipeLookupId, PredefinedVoxelRecipe>>,
);

export const VOXEL_RECIPES_BY_ID = VOXEL_RECIPE_BY_ID;

export function findVoxelRecipe(id: string): VoxelRecipe | undefined {
  return Object.hasOwn(VOXEL_RECIPE_BY_ID, id)
    ? VOXEL_RECIPE_BY_ID[id as VoxelRecipeLookupId]
    : undefined;
}

export function getVoxelRecipe(id: string): VoxelRecipe {
  const recipe = findVoxelRecipe(id);
  if (recipe === undefined) {
    throw new RangeError(`Unknown voxel recipe "${id}".`);
  }
  return recipe;
}
