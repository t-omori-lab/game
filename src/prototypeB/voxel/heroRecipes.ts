import {
  createVoxelGrid,
  fillVoxelBox,
  fillVoxelLine,
  gridToVoxels,
  setVoxel,
} from "./grid";
import {
  defineVoxelPalette,
  defineVoxelRecipe,
  type VoxelAnchor,
  type VoxelAssetKind,
  type VoxelDimensions,
  type VoxelGrid,
  type VoxelPalette,
  type VoxelRecipe,
} from "./types";
import { assertValidVoxelRecipe } from "./validator";

const SHARED_RUST_COLOR = 0xa65338;
const SHARED_CYAN_COLOR = 0x55e1dc;

export const PLAYER_VOXEL_DIMENSIONS = Object.freeze({
  width: 24,
  height: 32,
  depth: 16,
}) satisfies VoxelDimensions;

export const PLAYER_VOXEL_SIZE = 2.25;
export const PLAYER_VISUAL_HEIGHT =
  PLAYER_VOXEL_DIMENSIONS.height * PLAYER_VOXEL_SIZE;
export const PLAYER_VOXEL_CAP = 2_000;
export const PLAYER_TRIANGLE_CAP = 4_400;

export const COMPANION_VOXEL_DIMENSIONS = Object.freeze({
  width: 20,
  height: 20,
  depth: 18,
}) satisfies VoxelDimensions;

export const COMPANION_VOXEL_SIZE = 2.1;
export const COMPANION_VISUAL_HEIGHT =
  COMPANION_VOXEL_DIMENSIONS.height * COMPANION_VOXEL_SIZE;
export const COMPANION_VOXEL_CAP = 1_200;
export const COMPANION_TRIANGLE_CAP = 3_200;

export const PLAYER_VOXEL_PALETTE = defineVoxelPalette([
  {
    id: "ink",
    color: 0x20282a,
    label: "Deep silhouette",
    materialRole: "matte",
  },
  {
    id: "hair",
    color: 0x343036,
    label: "Weathered dark hair",
    materialRole: "matte",
  },
  {
    id: "skin",
    color: 0xc99675,
    label: "Sun-warmed skin",
    materialRole: "matte",
  },
  {
    id: "cloth-dark",
    color: 0x294446,
    label: "Deep field cloth",
    materialRole: "matte",
  },
  {
    id: "cloth-sage",
    color: 0x607a70,
    label: "Faded survey coat",
    materialRole: "matte",
  },
  {
    id: "pack-pale",
    color: 0xcecdbd,
    label: "Bleached field pack",
    materialRole: "matte",
  },
  {
    id: "rust",
    color: SHARED_RUST_COLOR,
    label: "Rust repair hardware",
    materialRole: "metal",
  },
  {
    id: "steel",
    color: 0x798b88,
    label: "Dull survey steel",
    materialRole: "metal",
  },
  {
    id: "cyan",
    color: SHARED_CYAN_COLOR,
    label: "Live survey signal",
    materialRole: "emissive",
  },
  {
    id: "amber",
    color: 0xf0b34a,
    label: "Relic warning light",
    materialRole: "emissive",
  },
] as const);

export const COMPANION_VOXEL_PALETTE = defineVoxelPalette([
  {
    id: "shell-light",
    color: 0xdad7c7,
    label: "Light ceramic cage",
    materialRole: "matte",
  },
  {
    id: "shell-shadow",
    color: 0x9eaa9f,
    label: "Ceramic edge shade",
    materialRole: "matte",
  },
  {
    id: "inner",
    color: 0x202a2c,
    label: "Hollow lantern interior",
    materialRole: "matte",
  },
  {
    id: "steel",
    color: 0x71827f,
    label: "Tripod steel",
    materialRole: "metal",
  },
  {
    id: "rust",
    color: SHARED_RUST_COLOR,
    label: "Rust repair hardware",
    materialRole: "metal",
  },
  {
    id: "cyan",
    color: SHARED_CYAN_COLOR,
    label: "Survey sensor",
    materialRole: "emissive",
  },
  {
    id: "amber",
    color: 0xf0b34a,
    label: "Lantern status light",
    materialRole: "emissive",
  },
] as const);

interface HeroRecipeDraft<Id extends string> {
  readonly id: Id;
  readonly name: string;
  readonly kind: VoxelAssetKind;
  readonly dimensions: VoxelDimensions;
  readonly palette: VoxelPalette;
  readonly maxVoxelCount: number;
  readonly anchors: readonly VoxelAnchor[];
  readonly requiredAnchors: readonly string[];
  readonly author: (grid: VoxelGrid) => void;
}

function authorHeroRecipe<const Id extends string>(
  draft: HeroRecipeDraft<Id>,
): VoxelRecipe & { readonly id: Id } {
  const grid = createVoxelGrid(draft.palette, {
    dimensions: draft.dimensions,
  });
  draft.author(grid);

  const recipe = defineVoxelRecipe({
    schemaVersion: 2,
    id: draft.id,
    name: draft.name,
    kind: draft.kind,
    dimensions: draft.dimensions,
    palette: draft.palette,
    voxels: gridToVoxels(grid),
    anchors: draft.anchors,
    validation: {
      minVoxelCount: 1,
      maxVoxelCount: draft.maxVoxelCount,
      requireGroundContact: true,
      requireConnectedBody: true,
      requiredAnchors: draft.requiredAnchors,
    },
  });
  assertValidVoxelRecipe(recipe);
  return recipe;
}

function authorPlayer(grid: VoxelGrid): void {
  // Offset boots and separate legs preserve a clear stride from every side.
  fillVoxelBox(grid, { x: 5, y: 0, z: 4 }, { x: 9, y: 2, z: 7 }, "ink");
  fillVoxelBox(grid, { x: 14, y: 0, z: 5 }, { x: 18, y: 2, z: 8 }, "ink");
  fillVoxelBox(grid, { x: 5, y: 0, z: 3 }, { x: 9, y: 0, z: 8 }, "steel");
  fillVoxelBox(grid, { x: 14, y: 0, z: 4 }, { x: 18, y: 0, z: 9 }, "steel");
  fillVoxelBox(grid, { x: 6, y: 2, z: 5 }, { x: 9, y: 3, z: 7 }, "rust");
  fillVoxelBox(grid, { x: 14, y: 2, z: 6 }, { x: 17, y: 3, z: 8 }, "rust");
  fillVoxelBox(grid, { x: 7, y: 3, z: 6 }, { x: 9, y: 11, z: 7 }, "cloth-dark");
  fillVoxelBox(grid, { x: 14, y: 3, z: 6 }, { x: 16, y: 11, z: 7 }, "cloth-dark");
  fillVoxelBox(grid, { x: 7, y: 7, z: 5 }, { x: 9, y: 8, z: 6 }, "steel");
  fillVoxelBox(grid, { x: 14, y: 8, z: 5 }, { x: 16, y: 9, z: 6 }, "steel");

  // Unequal split coat tails overlap the hips but stay separated below them.
  fillVoxelBox(grid, { x: 7, y: 10, z: 8 }, { x: 10, y: 14, z: 10 }, "cloth-sage");
  fillVoxelBox(grid, { x: 13, y: 11, z: 8 }, { x: 16, y: 14, z: 10 }, "cloth-sage");
  fillVoxelBox(grid, { x: 7, y: 10, z: 10 }, { x: 9, y: 12, z: 11 }, "cloth-dark");
  fillVoxelBox(grid, { x: 14, y: 11, z: 10 }, { x: 16, y: 13, z: 11 }, "cloth-dark");
  fillVoxelBox(grid, { x: 8, y: 13, z: 6 }, { x: 16, y: 16, z: 9 }, "cloth-dark");
  fillVoxelBox(grid, { x: 9, y: 16, z: 6 }, { x: 15, y: 21, z: 9 }, "cloth-sage");
  fillVoxelBox(grid, { x: 9, y: 16, z: 5 }, { x: 10, y: 21, z: 5 }, "cloth-dark");
  fillVoxelBox(grid, { x: 14, y: 16, z: 5 }, { x: 15, y: 21, z: 5 }, "cloth-dark");
  fillVoxelBox(grid, { x: 8, y: 22, z: 6 }, { x: 16, y: 23, z: 9 }, "cloth-dark");
  fillVoxelBox(grid, { x: 8, y: 22, z: 5 }, { x: 16, y: 23, z: 6 }, "pack-pale");

  // The free hand hangs away from the torso; the opposite hand sits below the face.
  fillVoxelBox(grid, { x: 5, y: 20, z: 6 }, { x: 8, y: 22, z: 9 }, "cloth-dark");
  fillVoxelBox(grid, { x: 4, y: 17, z: 6 }, { x: 6, y: 20, z: 8 }, "cloth-sage");
  fillVoxelBox(grid, { x: 3, y: 14, z: 4 }, { x: 5, y: 18, z: 7 }, "cloth-dark");
  fillVoxelBox(grid, { x: 2, y: 13, z: 3 }, { x: 4, y: 15, z: 6 }, "skin");
  fillVoxelBox(grid, { x: 16, y: 20, z: 6 }, { x: 18, y: 22, z: 9 }, "cloth-dark");
  fillVoxelBox(grid, { x: 17, y: 17, z: 5 }, { x: 19, y: 20, z: 8 }, "cloth-sage");
  fillVoxelBox(grid, { x: 18, y: 14, z: 4 }, { x: 20, y: 18, z: 7 }, "steel");
  fillVoxelBox(grid, { x: 19, y: 13, z: 3 }, { x: 21, y: 15, z: 6 }, "skin");
  fillVoxelBox(grid, { x: 20, y: 13, z: 3 }, { x: 21, y: 14, z: 5 }, "ink");

  // A pale rear pack and offset survey frame distinguish the back and left side.
  fillVoxelBox(grid, { x: 10, y: 16, z: 10 }, { x: 15, y: 22, z: 11 }, "pack-pale");
  fillVoxelBox(grid, { x: 11, y: 17, z: 13 }, { x: 14, y: 21, z: 13 }, "cloth-dark");
  fillVoxelBox(grid, { x: 10, y: 16, z: 12 }, { x: 10, y: 22, z: 13 }, "steel");
  fillVoxelBox(grid, { x: 14, y: 16, z: 12 }, { x: 15, y: 22, z: 13 }, "rust");
  fillVoxelBox(grid, { x: 5, y: 21, z: 9 }, { x: 6, y: 27, z: 10 }, "steel");
  fillVoxelBox(grid, { x: 6, y: 26, z: 9 }, { x: 8, y: 27, z: 10 }, "steel");
  fillVoxelBox(grid, { x: 6, y: 21, z: 9 }, { x: 8, y: 22, z: 10 }, "rust");
  setVoxel(grid, 5, 27, 9, "cyan");
  setVoxel(grid, 5, 27, 10, "amber");

  // An exposed face, asymmetric hair, and side scarf tab keep the head readable.
  fillVoxelBox(grid, { x: 10, y: 22, z: 7 }, { x: 13, y: 24, z: 9 }, "skin");
  fillVoxelBox(grid, { x: 9, y: 24, z: 5 }, { x: 14, y: 29, z: 9 }, "skin");
  fillVoxelBox(grid, { x: 8, y: 29, z: 5 }, { x: 15, y: 31, z: 10 }, "hair");
  fillVoxelBox(grid, { x: 8, y: 27, z: 9 }, { x: 10, y: 30, z: 11 }, "hair");
  fillVoxelBox(grid, { x: 14, y: 27, z: 9 }, { x: 16, y: 30, z: 10 }, "hair");
  fillVoxelBox(grid, { x: 9, y: 29, z: 4 }, { x: 11, y: 30, z: 5 }, "hair");
  fillVoxelBox(grid, { x: 14, y: 28, z: 4 }, { x: 15, y: 30, z: 5 }, "hair");
  setVoxel(grid, 10, 27, 4, "cyan");
  setVoxel(grid, 13, 27, 4, "cyan");
  fillVoxelBox(grid, { x: 11, y: 25, z: 4 }, { x: 12, y: 25, z: 5 }, "rust");
  fillVoxelBox(grid, { x: 7, y: 23, z: 7 }, { x: 16, y: 24, z: 9 }, "rust");
  fillVoxelBox(grid, { x: 16, y: 23, z: 8 }, { x: 18, y: 25, z: 9 }, "rust");
  fillVoxelBox(grid, { x: 18, y: 21, z: 9 }, { x: 19, y: 24, z: 10 }, "pack-pale");

  // A diagonal repair strap and two-tone clasp identify the front at game scale.
  fillVoxelLine(grid, { x: 8, y: 22, z: 4 }, { x: 15, y: 15, z: 4 }, "rust");
  fillVoxelLine(grid, { x: 9, y: 22, z: 4 }, { x: 16, y: 15, z: 4 }, "rust");
  fillVoxelBox(grid, { x: 10, y: 18, z: 4 }, { x: 11, y: 20, z: 5 }, "cyan");
  fillVoxelBox(grid, { x: 12, y: 18, z: 4 }, { x: 13, y: 20, z: 5 }, "amber");
}

function authorCompanion(grid: VoxelGrid): void {
  // Three short feet keep the survey lantern grounded rather than hovering.
  fillVoxelBox(grid, { x: 3, y: 0, z: 3 }, { x: 6, y: 0, z: 6 }, "steel");
  fillVoxelBox(grid, { x: 13, y: 0, z: 3 }, { x: 16, y: 0, z: 6 }, "steel");
  fillVoxelBox(grid, { x: 8, y: 0, z: 13 }, { x: 11, y: 0, z: 16 }, "steel");
  fillVoxelBox(grid, { x: 4, y: 1, z: 4 }, { x: 5, y: 4, z: 5 }, "rust");
  fillVoxelBox(grid, { x: 14, y: 1, z: 4 }, { x: 15, y: 4, z: 5 }, "rust");
  fillVoxelBox(grid, { x: 9, y: 1, z: 14 }, { x: 10, y: 4, z: 15 }, "rust");
  fillVoxelBox(grid, { x: 5, y: 4, z: 5 }, { x: 8, y: 5, z: 7 }, "steel");
  fillVoxelBox(grid, { x: 11, y: 4, z: 5 }, { x: 14, y: 5, z: 7 }, "steel");
  fillVoxelBox(grid, { x: 8, y: 4, z: 11 }, { x: 11, y: 5, z: 14 }, "steel");
  fillVoxelBox(grid, { x: 7, y: 5, z: 7 }, { x: 12, y: 7, z: 11 }, "inner");

  // Dark inner lantern volume sits behind a light, open ceramic cage.
  fillVoxelBox(grid, { x: 8, y: 8, z: 7 }, { x: 11, y: 13, z: 11 }, "inner");
  fillVoxelBox(grid, { x: 5, y: 8, z: 6 }, { x: 6, y: 14, z: 7 }, "shell-light");
  fillVoxelBox(grid, { x: 13, y: 8, z: 6 }, { x: 14, y: 14, z: 7 }, "shell-light");
  fillVoxelBox(grid, { x: 5, y: 8, z: 12 }, { x: 6, y: 14, z: 13 }, "shell-shadow");
  fillVoxelBox(grid, { x: 13, y: 8, z: 12 }, { x: 14, y: 14, z: 13 }, "shell-shadow");
  fillVoxelBox(grid, { x: 7, y: 7, z: 6 }, { x: 12, y: 8, z: 13 }, "shell-shadow");
  fillVoxelBox(grid, { x: 7, y: 14, z: 6 }, { x: 12, y: 15, z: 13 }, "shell-light");
  fillVoxelBox(grid, { x: 6, y: 9, z: 13 }, { x: 13, y: 13, z: 14 }, "shell-shadow");

  // A two-voxel ceramic diamond frames a genuinely open front aperture.
  for (let y = 8; y <= 14; y += 1) {
    for (let x = 6; x <= 13; x += 1) {
      const distance = Math.abs(x - 9.5) + Math.abs(y - 11);
      if (distance >= 2.5 && distance <= 4.5) {
        setVoxel(grid, x, y, 4, "shell-light");
        setVoxel(grid, x, y, 5, "shell-shadow");
      }
    }
  }
  fillVoxelBox(grid, { x: 9, y: 10, z: 6 }, { x: 10, y: 12, z: 6 }, "cyan");
  setVoxel(grid, 9, 11, 5, null);
  setVoxel(grid, 10, 11, 5, null);

  // A folded mast, one manipulator, and rear coil make every side non-symmetric.
  fillVoxelBox(grid, { x: 9, y: 15, z: 9 }, { x: 11, y: 17, z: 11 }, "steel");
  fillVoxelBox(grid, { x: 11, y: 16, z: 9 }, { x: 14, y: 17, z: 10 }, "rust");
  fillVoxelBox(grid, { x: 13, y: 17, z: 9 }, { x: 14, y: 19, z: 10 }, "steel");
  fillVoxelBox(grid, { x: 12, y: 19, z: 8 }, { x: 15, y: 19, z: 11 }, "cyan");
  fillVoxelBox(grid, { x: 14, y: 10, z: 7 }, { x: 16, y: 12, z: 9 }, "rust");
  fillVoxelBox(grid, { x: 16, y: 8, z: 7 }, { x: 17, y: 11, z: 8 }, "steel");
  fillVoxelBox(grid, { x: 17, y: 7, z: 6 }, { x: 18, y: 8, z: 9 }, "steel");
  setVoxel(grid, 18, 7, 6, "amber");
  setVoxel(grid, 18, 7, 9, "amber");
  fillVoxelBox(grid, { x: 8, y: 9, z: 14 }, { x: 11, y: 13, z: 15 }, "rust");
  fillVoxelBox(grid, { x: 9, y: 10, z: 16 }, { x: 10, y: 12, z: 16 }, "steel");
  setVoxel(grid, 9, 9, 16, "cyan");
  setVoxel(grid, 10, 13, 16, "amber");
}

export const PLAYER_RECIPE = authorHeroRecipe({
  id: "player-relic-surveyor",
  name: "Relic Surveyor",
  kind: "player",
  dimensions: PLAYER_VOXEL_DIMENSIONS,
  palette: PLAYER_VOXEL_PALETTE,
  maxVoxelCount: PLAYER_VOXEL_CAP,
  anchors: [
    { id: "ground", x: 7, y: 0, z: 6 },
    { id: "weapon", x: 20, y: 14, z: 4 },
    { id: "weapon-grip", x: 20, y: 14, z: 4 },
    { id: "free-hand", x: 3, y: 14, z: 4 },
    { id: "focus", x: 11, y: 19, z: 4 },
  ],
  requiredAnchors: [
    "ground",
    "weapon",
    "weapon-grip",
    "free-hand",
    "focus",
  ],
  author: authorPlayer,
});

export const COMPANION_RECIPE = authorHeroRecipe({
  id: "companion-survey-lantern",
  name: "Three-Foot Survey Lantern",
  kind: "companion",
  dimensions: COMPANION_VOXEL_DIMENSIONS,
  palette: COMPANION_VOXEL_PALETTE,
  maxVoxelCount: COMPANION_VOXEL_CAP,
  anchors: [
    { id: "ground", x: 4, y: 0, z: 4 },
    { id: "sensor", x: 9, y: 11, z: 6 },
    { id: "mast", x: 13, y: 19, z: 9 },
    { id: "manipulator", x: 17, y: 8, z: 7 },
    { id: "rear-coil", x: 9, y: 10, z: 16 },
  ],
  requiredAnchors: [
    "ground",
    "sensor",
    "mast",
    "manipulator",
    "rear-coil",
  ],
  author: authorCompanion,
});
