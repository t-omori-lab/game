import {
  F01R_ASSET_CONTRACT,
  createF01RCharacter,
} from "../../../characterForge/F01RCharacter";
import type { HeroVisual } from "./HeroVisual";
import {
  F01_GAMEPLAY_WORLD_SCALE,
  createCompiledForgeHeroVisual,
} from "./F01ForgeHeroVisual";
import type { PrototypeBHeroAssetRuntime } from "./HeroAssetRuntime";

export const F01R_FORGE_HERO_ASSET_RUNTIME = Object.freeze({
  id: F01R_ASSET_CONTRACT.id,
  representation: F01R_ASSET_CONTRACT.representation,
  characterPreset: F01R_ASSET_CONTRACT.characterPreset,
  visibleVoxelCells: F01R_ASSET_CONTRACT.visibleSurfaceCells,
  worldScale: F01_GAMEPLAY_WORLD_SCALE,
  payloadSha256: F01R_ASSET_CONTRACT.payloadSha256,
  sourceSha256: F01R_ASSET_CONTRACT.sourceSha256,
  createVisual: createF01RForgeHeroVisual,
} satisfies PrototypeBHeroAssetRuntime & {
  readonly payloadSha256: string;
  readonly sourceSha256: string;
});

/** Default generated actor consumed by R09. */
export const R09_HERO_ASSET_RUNTIME = F01R_FORGE_HERO_ASSET_RUNTIME;

export function createF01RForgeHeroVisual(): HeroVisual {
  return createCompiledForgeHeroVisual(
    F01R_FORGE_HERO_ASSET_RUNTIME,
    () => createF01RCharacter({ castShadow: false }),
  );
}
