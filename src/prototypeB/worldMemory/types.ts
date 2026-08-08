export const WORLD_MEMORY_VERSION = 1 as const;
export const WORLD_MEMORY_CONTENT_VERSION = "fram-world-memory-1" as const;
export const WORLD_MEMORY_SAVE_NAMESPACE = "fram-r09-world-memory" as const;

export type WorldMemorySiteId = "canopy-relay" | "flooded-archive";
export type WorldMemoryModuleId = "pathfinder-array" | "relic-overdrive";
export type ExpeditionEndReason = "returned" | "retreated" | "defeated";

export interface SiteMemory {
  readonly siteId: WorldMemorySiteId;
  readonly firstDiscoveredExpeditionId: string;
  readonly firstDiscoveredTick: number;
}

export interface RecoveredItemMemory {
  readonly itemId: string;
  readonly sourceSiteId: WorldMemorySiteId;
  readonly acquiredExpeditionId: string;
  readonly acquiredTick: number;
  readonly status: "available" | "consumed";
  readonly consumedByModuleId: WorldMemoryModuleId | null;
  readonly consumedExpeditionId: string | null;
  readonly consumedTick: number | null;
}

export interface InstalledModuleMemory {
  readonly moduleId: WorldMemoryModuleId;
  readonly siteId: WorldMemorySiteId;
  readonly installedExpeditionId: string;
  readonly installedTick: number;
  readonly consumedItemId: string;
}

export interface ExpeditionMemory {
  readonly expeditionId: string;
  readonly endedReason: ExpeditionEndReason;
  readonly endedTick: number;
  readonly discoveredSiteIds: readonly WorldMemorySiteId[];
  readonly recoveredItemIds: readonly string[];
  readonly claimedBaseSiteId: WorldMemorySiteId | null;
  readonly installedModuleId: WorldMemoryModuleId | null;
}

export interface WorldMemoryState {
  readonly version: typeof WORLD_MEMORY_VERSION;
  readonly worldSeed: number;
  readonly discoveredSites: readonly SiteMemory[];
  readonly recoveredItems: readonly RecoveredItemMemory[];
  readonly claimedBaseSiteId: WorldMemorySiteId | null;
  readonly installedModule: InstalledModuleMemory | null;
  readonly expeditionHistory: readonly ExpeditionMemory[];
  readonly appliedEventIds: readonly string[];
}

interface WorldEventBase {
  readonly eventId: string;
  readonly expeditionId: string;
  readonly tick: number;
}

export type WorldEvent =
  | (WorldEventBase & {
      readonly type: "site-discovered";
      readonly siteId: WorldMemorySiteId;
    })
  | (WorldEventBase & {
      readonly type: "item-recovered";
      readonly itemId: string;
      readonly siteId: WorldMemorySiteId;
    })
  | (WorldEventBase & {
      readonly type: "base-claimed";
      readonly siteId: WorldMemorySiteId;
    })
  | (WorldEventBase & {
      readonly type: "module-installed";
      readonly siteId: WorldMemorySiteId;
      readonly moduleId: WorldMemoryModuleId;
      readonly consumedItemId: string;
    })
  | (WorldEventBase & {
      readonly type: "expedition-ended";
      readonly reason: ExpeditionEndReason;
    });

export interface WorldMemoryEffects {
  readonly routeOverlay: boolean;
  readonly explorationSpeedMultiplier: number;
  readonly relicAura: boolean;
  readonly relicCooldownMultiplier: number;
}
