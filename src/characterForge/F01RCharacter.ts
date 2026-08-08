import sourceDefinition from "./f01r.source.json";
import surfacePackDefinition from "./f01r.surface-pack.json";
import {
  createCompiledCharacter,
  type CompiledCharacterSource,
  type F01Character,
  type F01CharacterRenderOptions,
  type SurfacePack,
} from "./F01Character";

const source = sourceDefinition as CompiledCharacterSource;
const surfacePack = surfacePackDefinition as SurfacePack;

export const F01R_ASSET_CONTRACT = Object.freeze({
  id: "fram.character.f01r.source-faithful-head-v1",
  sourceId: source.id,
  sourceSha256: surfacePack.sourceSha256 ?? "unavailable",
  payloadSha256: surfacePack.payloadSha256,
  visibleSurfaceCells: surfacePack.renderedSurfaceCells,
  sourceVoxels: surfacePack.sourceVoxels,
  moduleIds: Object.freeze([...(surfacePack.moduleIds ?? [])]),
  representation: "compiled-module-indexed-high-density-voxel-surface",
  characterPreset: "f01r-source-faithful-head",
});

export function createF01RCharacter(
  options: F01CharacterRenderOptions = {},
): F01Character {
  const character = createCompiledCharacter({
    ...options,
    source,
    surfacePack,
    reconstruction: "compiled semantic-module head plus F-01 body base",
  });
  character.root.userData.assetDNA = F01R_ASSET_CONTRACT.id;
  character.root.userData.packDigest = F01R_ASSET_CONTRACT.payloadSha256;
  character.root.userData.sourceDigest = F01R_ASSET_CONTRACT.sourceSha256;
  return character;
}
