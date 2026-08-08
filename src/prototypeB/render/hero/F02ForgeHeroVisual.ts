import {
  F02_ADDED_SURFACE_CELLS,
  F02_READABILITY_MODULE_IDS,
  attachF02ReadabilityModules,
} from "../../../characterForge/F02ReadabilityModules";
import type { HeroVisual } from "./HeroVisual";
import {
  F01_FORGE_HERO_ASSET_RUNTIME,
  F01_GAMEPLAY_VISIBLE_SURFACE_CELLS,
  createF01ForgeHeroVisual,
} from "./F01ForgeHeroVisual";
import type { PrototypeBHeroAssetRuntime } from "./HeroAssetRuntime";

const F02_VISIBLE_SURFACE_CELLS =
  F01_GAMEPLAY_VISIBLE_SURFACE_CELLS + F02_ADDED_SURFACE_CELLS;
const F02_SOURCE_SURFACE_CELLS =
  (F01_FORGE_HERO_ASSET_RUNTIME.sourceSurfaceCells ??
    F01_FORGE_HERO_ASSET_RUNTIME.visibleVoxelCells) + F02_ADDED_SURFACE_CELLS;

export const F02_FORGE_HERO_ASSET_RUNTIME = Object.freeze({
  id: "fram.character.f02.gameplay-readability-v1",
  representation: "compiled-high-density-voxel-surface-plus-evidence-modules",
  characterPreset: "f02-evidence-corrected",
  sourceSurfaceCells: F02_SOURCE_SURFACE_CELLS,
  visibleVoxelCells: F02_VISIBLE_SURFACE_CELLS,
  worldScale: F01_FORGE_HERO_ASSET_RUNTIME.worldScale,
  createVisual: createF02ForgeHeroVisual,
} satisfies PrototypeBHeroAssetRuntime);

/** Stable export consumed only by R09's dynamic actor loader. */
export const R09_HERO_ASSET_RUNTIME = F02_FORGE_HERO_ASSET_RUNTIME;

export function createF02ForgeHeroVisual(): HeroVisual {
  const base = createF01ForgeHeroVisual();
  const modules = attachF02ReadabilityModules({
    root: base.root,
    partGroups: base.partGroups,
    castShadow: false,
  });
  const baseUpdatePose = base.updatePose.bind(base);
  const baseSetTint = base.setTint.bind(base);
  let disposed = false;

  base.root.userData.assetDNA = F02_FORGE_HERO_ASSET_RUNTIME.id;
  base.root.userData.runtimeRepresentation =
    F02_FORGE_HERO_ASSET_RUNTIME.representation;
  base.root.userData.visibleVoxelCells = F02_VISIBLE_SURFACE_CELLS;
  base.root.userData.characterPreset =
    F02_FORGE_HERO_ASSET_RUNTIME.characterPreset;
  base.root.userData.f02ModuleIds = F02_READABILITY_MODULE_IDS;

  const visual: HeroVisual = {
    root: base.root,
    motionRoot: base.motionRoot,
    mode: base.mode,
    partGroups: base.partGroups,
    partMeshes: base.partMeshes,
    mergedMesh: base.mergedMesh,
    weaponSocket: base.weaponSocket,
    materials: base.materials,
    updatePose(input): void {
      baseUpdatePose(input);
      modules.applyPose(input);
    },
    attachWeapon: base.attachWeapon.bind(base),
    setTint(color): void {
      baseSetTint(color);
      modules.setTint(color);
    },
    dispose(): void {
      if (disposed) return;
      disposed = true;
      modules.dispose();
      base.dispose();
    },
  };
  visual.updatePose({ motion: "idle", timeSeconds: 0, moveAmount: 0 });
  return visual;
}
