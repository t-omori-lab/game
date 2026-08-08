import type { HeroVisual } from "./HeroVisual";

export type PrototypeBHeroAssetLoadStatus =
  | "loaded"
  | "disabled"
  | "timeout"
  | "failed";

export interface PrototypeBHeroAssetRuntime {
  readonly id: string;
  readonly representation: string;
  readonly characterPreset: string;
  /** Cells in the immutable compiled source before distance-specific filtering. */
  readonly sourceSurfaceCells?: number;
  /** Cells actually submitted by this gameplay presentation. */
  readonly visibleVoxelCells: number;
  /** Uniform scale from the asset's authored units into PrototypeB world units. */
  readonly worldScale: number;
  createVisual(): HeroVisual;
}

export interface PrototypeBHeroAssetRequest {
  readonly status: PrototypeBHeroAssetLoadStatus;
  readonly runtime?: PrototypeBHeroAssetRuntime;
}

export type PrototypeBHeroAssetResolutionStatus =
  | PrototypeBHeroAssetLoadStatus
  | "factory-failed"
  | "not-requested";

export interface PrototypeBResolvedHeroAsset {
  readonly visual: HeroVisual | null;
  readonly source: "runtime" | "built-in" | "none";
  readonly status: PrototypeBHeroAssetResolutionStatus;
  readonly assetId?: string;
  readonly worldScale?: number;
}

/**
 * Keeps an optional generated asset behind a non-blocking boundary. Loading
 * and construction failures never remove the known-playable built-in actor.
 */
export function resolvePrototypeBHeroAsset(
  request: PrototypeBHeroAssetRequest | undefined,
  createBuiltIn: () => HeroVisual | null,
): PrototypeBResolvedHeroAsset {
  if (request?.status === "loaded" && request.runtime !== undefined) {
    try {
      return {
        visual: request.runtime.createVisual(),
        source: "runtime",
        status: "loaded",
        assetId: request.runtime.id,
        worldScale: request.runtime.worldScale,
      };
    } catch {
      return builtInResolution(createBuiltIn(), "factory-failed");
    }
  }

  return builtInResolution(
    createBuiltIn(),
    request?.status ?? "not-requested",
  );
}

function builtInResolution(
  visual: HeroVisual | null,
  status: PrototypeBHeroAssetResolutionStatus,
): PrototypeBResolvedHeroAsset {
  return {
    visual,
    source: visual === null ? "none" : "built-in",
    status,
    assetId: visual?.root.name,
  };
}
