import {
  MAX_VOXELS,
  VOXEL_GRID_SIZE,
  type AuthoredVoxel,
  type VoxelPoint,
  type VoxelRecipe,
  type VoxelValidationRules,
} from "./types";

export type VoxelValidationIssueCode =
  | "grid-size"
  | "palette"
  | "voxel-count"
  | "voxel-bounds"
  | "duplicate-voxel"
  | "ground-contact"
  | "connected-body"
  | "required-anchor"
  | "anchor-bounds"
  | "duplicate-anchor";

export interface VoxelValidationIssue {
  readonly code: VoxelValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface VoxelValidationResult {
  readonly valid: boolean;
  readonly issues: readonly VoxelValidationIssue[];
  readonly voxelCount: number;
  readonly uniqueVoxelCount: number;
}

export interface ValidateVoxelRecipeOptions extends VoxelValidationRules {}

const NEIGHBOR_OFFSETS: readonly VoxelPoint[] = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];

function coordinateKey(point: VoxelPoint): string {
  return `${point.x},${point.y},${point.z}`;
}

function isIntegerPoint(point: VoxelPoint): boolean {
  return (
    Number.isInteger(point.x) &&
    Number.isInteger(point.y) &&
    Number.isInteger(point.z)
  );
}

function isPointInBounds(point: VoxelPoint): boolean {
  return (
    isIntegerPoint(point) &&
    point.x >= 0 &&
    point.x < VOXEL_GRID_SIZE &&
    point.y >= 0 &&
    point.y < VOXEL_GRID_SIZE &&
    point.z >= 0 &&
    point.z < VOXEL_GRID_SIZE
  );
}

function resolvedRule<T>(
  optionValue: T | undefined,
  recipeValue: T | undefined,
  fallback: T,
): T {
  return optionValue ?? recipeValue ?? fallback;
}

function addPaletteIssues(
  recipe: VoxelRecipe,
  issues: VoxelValidationIssue[],
): Set<string> {
  const paletteIds = new Set<string>();

  recipe.palette.forEach((entry, index) => {
    const path = `palette[${index}]`;
    if (entry.id.trim().length === 0) {
      issues.push({
        code: "palette",
        path: `${path}.id`,
        message: "Palette ids must not be empty.",
      });
    } else if (paletteIds.has(entry.id)) {
      issues.push({
        code: "palette",
        path: `${path}.id`,
        message: `Palette id "${entry.id}" is duplicated.`,
      });
    }
    paletteIds.add(entry.id);

    if (
      !Number.isInteger(entry.color) ||
      entry.color < 0 ||
      entry.color > 0xffffff
    ) {
      issues.push({
        code: "palette",
        path: `${path}.color`,
        message: "Palette colors must be integers from 0x000000 to 0xFFFFFF.",
      });
    }
  });

  return paletteIds;
}

function addVoxelIssues(
  recipe: VoxelRecipe,
  paletteIds: ReadonlySet<string>,
  issues: VoxelValidationIssue[],
): Map<string, AuthoredVoxel> {
  const validVoxels = new Map<string, AuthoredVoxel>();

  recipe.voxels.forEach((voxel, index) => {
    const path = `voxels[${index}]`;
    if (!isPointInBounds(voxel)) {
      issues.push({
        code: "voxel-bounds",
        path,
        message: `Voxel coordinates must be integers inside the ${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE} grid.`,
      });
      return;
    }

    if (!paletteIds.has(voxel.paletteId)) {
      issues.push({
        code: "palette",
        path: `${path}.paletteId`,
        message: `Voxel references unknown palette id "${voxel.paletteId}".`,
      });
    }

    const key = coordinateKey(voxel);
    if (validVoxels.has(key)) {
      issues.push({
        code: "duplicate-voxel",
        path,
        message: `More than one voxel occupies (${key}).`,
      });
      return;
    }
    validVoxels.set(key, voxel);
  });

  return validVoxels;
}

function addAnchorIssues(
  recipe: VoxelRecipe,
  requiredAnchors: readonly string[],
  issues: VoxelValidationIssue[],
): void {
  const anchorIds = new Set<string>();

  recipe.anchors.forEach((anchor, index) => {
    const path = `anchors[${index}]`;
    if (anchor.id.trim().length === 0 || anchorIds.has(anchor.id)) {
      issues.push({
        code: "duplicate-anchor",
        path: `${path}.id`,
        message:
          anchor.id.trim().length === 0
            ? "Anchor ids must not be empty."
            : `Anchor id "${anchor.id}" is duplicated.`,
      });
    }
    anchorIds.add(anchor.id);

    if (!isPointInBounds(anchor)) {
      issues.push({
        code: "anchor-bounds",
        path,
        message: `Anchor coordinates must be integers inside the ${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE} grid.`,
      });
    }
  });

  for (const requiredAnchor of new Set(requiredAnchors)) {
    if (!anchorIds.has(requiredAnchor)) {
      issues.push({
        code: "required-anchor",
        path: "anchors",
        message: `Required anchor "${requiredAnchor}" is missing.`,
      });
    }
  }
}

function isConnected(voxels: ReadonlyMap<string, AuthoredVoxel>): boolean {
  const first = voxels.values().next().value as AuthoredVoxel | undefined;
  if (first === undefined) {
    return true;
  }

  const visited = new Set<string>();
  const queue: AuthoredVoxel[] = [first];
  visited.add(coordinateKey(first));

  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    if (current === undefined) {
      continue;
    }

    for (const offset of NEIGHBOR_OFFSETS) {
      const key = coordinateKey({
        x: current.x + offset.x,
        y: current.y + offset.y,
        z: current.z + offset.z,
      });
      const neighbor = voxels.get(key);
      if (neighbor !== undefined && !visited.has(key)) {
        visited.add(key);
        queue.push(neighbor);
      }
    }
  }

  return visited.size === voxels.size;
}

export function validateVoxelRecipe(
  recipe: VoxelRecipe,
  options: ValidateVoxelRecipeOptions = {},
): VoxelValidationResult {
  const issues: VoxelValidationIssue[] = [];
  if (recipe.gridSize !== VOXEL_GRID_SIZE) {
    issues.push({
      code: "grid-size",
      path: "gridSize",
      message: `Voxel recipes must use a ${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE}×${VOXEL_GRID_SIZE} authoring grid.`,
    });
  }

  const minVoxelCount = resolvedRule(
    options.minVoxelCount,
    recipe.validation?.minVoxelCount,
    1,
  );
  const maxVoxelCount = resolvedRule(
    options.maxVoxelCount,
    recipe.validation?.maxVoxelCount,
    MAX_VOXELS,
  );
  if (
    !Number.isInteger(minVoxelCount) ||
    !Number.isInteger(maxVoxelCount) ||
    minVoxelCount < 0 ||
    maxVoxelCount > MAX_VOXELS ||
    minVoxelCount > maxVoxelCount ||
    recipe.voxels.length < minVoxelCount ||
    recipe.voxels.length > maxVoxelCount
  ) {
    issues.push({
      code: "voxel-count",
      path: "voxels",
      message: `Voxel count ${recipe.voxels.length} must be between ${minVoxelCount} and ${maxVoxelCount}, with an absolute maximum of ${MAX_VOXELS}.`,
    });
  }

  const paletteIds = addPaletteIssues(recipe, issues);
  const validVoxels = addVoxelIssues(recipe, paletteIds, issues);

  const requireGroundContact = resolvedRule(
    options.requireGroundContact,
    recipe.validation?.requireGroundContact,
    true,
  );
  if (
    requireGroundContact &&
    ![...validVoxels.values()].some((voxel) => voxel.y === 0)
  ) {
    issues.push({
      code: "ground-contact",
      path: "voxels",
      message: "At least one voxel must touch the y=0 ground plane.",
    });
  }

  const requireConnectedBody = resolvedRule(
    options.requireConnectedBody,
    recipe.validation?.requireConnectedBody,
    true,
  );
  if (requireConnectedBody && !isConnected(validVoxels)) {
    issues.push({
      code: "connected-body",
      path: "voxels",
      message: "All voxels must form one six-directionally connected body.",
    });
  }

  const requiredAnchors = resolvedRule(
    options.requiredAnchors,
    recipe.validation?.requiredAnchors,
    [],
  );
  addAnchorIssues(recipe, requiredAnchors, issues);

  return {
    valid: issues.length === 0,
    issues,
    voxelCount: recipe.voxels.length,
    uniqueVoxelCount: validVoxels.size,
  };
}

export class VoxelRecipeValidationError extends Error {
  readonly result: VoxelValidationResult;

  constructor(recipeId: string, result: VoxelValidationResult) {
    const summary = result.issues
      .map((issue) => `${issue.path}: ${issue.message}`)
      .join("; ");
    super(`Invalid voxel recipe "${recipeId}": ${summary}`);
    this.name = "VoxelRecipeValidationError";
    this.result = result;
  }
}

export function assertValidVoxelRecipe(
  recipe: VoxelRecipe,
  options: ValidateVoxelRecipeOptions = {},
): void {
  const result = validateVoxelRecipe(recipe, options);
  if (!result.valid) {
    throw new VoxelRecipeValidationError(recipe.id, result);
  }
}
