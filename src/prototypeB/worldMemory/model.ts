import {
  WORLD_MEMORY_VERSION,
  type ExpeditionMemory,
  type InstalledModuleMemory,
  type RecoveredItemMemory,
  type SiteMemory,
  type WorldMemoryModuleId,
  type WorldMemorySiteId,
  type WorldMemoryState,
} from "./types";

export const WORLD_MEMORY_SITE_IDS = [
  "canopy-relay",
  "flooded-archive",
] as const satisfies readonly WorldMemorySiteId[];

export const WORLD_MEMORY_MODULE_IDS = [
  "pathfinder-array",
  "relic-overdrive",
] as const satisfies readonly WorldMemoryModuleId[];

export const MAX_WORLD_MEMORY_EVENTS = 2_048;
export const MAX_WORLD_MEMORY_EXPEDITIONS = 256;
export const MAX_WORLD_MEMORY_ITEMS = 512;
const UINT32_MAX = 0xffff_ffff;
const IDENTIFIER_PATTERN = /^[a-z0-9][a-z0-9._:-]{0,95}$/;

export class WorldMemoryInvariantError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "WorldMemoryInvariantError";
  }
}

export function createEmptyWorldMemory(worldSeed: number): WorldMemoryState {
  assertIntegerInRange(worldSeed, 0, UINT32_MAX, "worldSeed");

  return {
    version: WORLD_MEMORY_VERSION,
    worldSeed,
    discoveredSites: [],
    recoveredItems: [],
    claimedBaseSiteId: null,
    installedModule: null,
    expeditionHistory: [],
    appliedEventIds: [],
  };
}

export function assertValidWorldMemory(state: WorldMemoryState): void {
  if (state.version !== WORLD_MEMORY_VERSION) {
    fail(`version must be ${WORLD_MEMORY_VERSION}.`);
  }
  assertIntegerInRange(state.worldSeed, 0, UINT32_MAX, "worldSeed");
  assertArrayLimit(
    state.discoveredSites,
    WORLD_MEMORY_SITE_IDS.length,
    "discoveredSites",
  );
  assertArrayLimit(state.recoveredItems, MAX_WORLD_MEMORY_ITEMS, "recoveredItems");
  assertArrayLimit(
    state.expeditionHistory,
    MAX_WORLD_MEMORY_EXPEDITIONS,
    "expeditionHistory",
  );
  assertArrayLimit(
    state.appliedEventIds,
    MAX_WORLD_MEMORY_EVENTS,
    "appliedEventIds",
  );

  const siteIds = new Set<WorldMemorySiteId>();
  state.discoveredSites.forEach((site, index) => {
    assertSiteMemory(site, `discoveredSites[${index}]`);
    if (siteIds.has(site.siteId)) {
      fail(`discoveredSites contains duplicate site "${site.siteId}".`);
    }
    siteIds.add(site.siteId);
  });

  const eventIds = new Set<string>();
  state.appliedEventIds.forEach((eventId, index) => {
    assertIdentifier(eventId, `appliedEventIds[${index}]`);
    if (eventIds.has(eventId)) {
      fail(`appliedEventIds contains duplicate event "${eventId}".`);
    }
    eventIds.add(eventId);
  });

  const expeditionIds = new Set<string>();
  state.expeditionHistory.forEach((expedition, index) => {
    assertExpeditionMemory(expedition, `expeditionHistory[${index}]`);
    if (expeditionIds.has(expedition.expeditionId)) {
      fail(
        `expeditionHistory contains duplicate expedition "${expedition.expeditionId}".`,
      );
    }
    expeditionIds.add(expedition.expeditionId);
  });

  const itemIds = new Set<string>();
  state.recoveredItems.forEach((item, index) => {
    assertRecoveredItem(item, `recoveredItems[${index}]`);
    if (!siteIds.has(item.sourceSiteId)) {
      fail(`Recovered item "${item.itemId}" refers to an undiscovered site.`);
    }
    if (itemIds.has(item.itemId)) {
      fail(`recoveredItems contains duplicate item "${item.itemId}".`);
    }
    itemIds.add(item.itemId);
  });

  if (
    state.claimedBaseSiteId !== null &&
    !siteIds.has(state.claimedBaseSiteId)
  ) {
    fail("claimedBaseSiteId must refer to a discovered site.");
  }

  if (state.installedModule !== null) {
    assertInstalledModule(state.installedModule, "installedModule");
    if (state.claimedBaseSiteId !== state.installedModule.siteId) {
      fail("installedModule must be attached to the claimed base.");
    }
    const consumed = state.recoveredItems.find(
      (item) => item.itemId === state.installedModule?.consumedItemId,
    );
    if (
      consumed === undefined ||
      consumed.status !== "consumed" ||
      consumed.consumedByModuleId !== state.installedModule.moduleId ||
      consumed.consumedExpeditionId !==
        state.installedModule.installedExpeditionId ||
      consumed.consumedTick !== state.installedModule.installedTick
    ) {
      fail("installedModule must have one matching consumed item record.");
    }
  } else if (state.recoveredItems.some((item) => item.status === "consumed")) {
    fail("Recovered items cannot be consumed without an installed module.");
  }
}

export function isWorldMemorySiteId(value: unknown): value is WorldMemorySiteId {
  return value === "canopy-relay" || value === "flooded-archive";
}

export function isWorldMemoryModuleId(
  value: unknown,
): value is WorldMemoryModuleId {
  return value === "pathfinder-array" || value === "relic-overdrive";
}

export function assertIdentifier(value: unknown, path: string): asserts value is string {
  if (typeof value !== "string" || !IDENTIFIER_PATTERN.test(value)) {
    fail(`${path} must be a 1-96 character lowercase identifier.`);
  }
}

export function assertTick(value: unknown, path: string): asserts value is number {
  assertIntegerInRange(value, 0, UINT32_MAX, path);
}

function assertSiteMemory(site: SiteMemory, path: string): void {
  if (!isWorldMemorySiteId(site.siteId)) {
    fail(`${path}.siteId is not supported.`);
  }
  assertIdentifier(
    site.firstDiscoveredExpeditionId,
    `${path}.firstDiscoveredExpeditionId`,
  );
  assertTick(site.firstDiscoveredTick, `${path}.firstDiscoveredTick`);
}

function assertRecoveredItem(item: RecoveredItemMemory, path: string): void {
  assertIdentifier(item.itemId, `${path}.itemId`);
  if (!isWorldMemorySiteId(item.sourceSiteId)) {
    fail(`${path}.sourceSiteId is not supported.`);
  }
  assertIdentifier(item.acquiredExpeditionId, `${path}.acquiredExpeditionId`);
  assertTick(item.acquiredTick, `${path}.acquiredTick`);
  if (item.status !== "available" && item.status !== "consumed") {
    fail(`${path}.status is not supported.`);
  }

  if (item.status === "available") {
    if (
      item.consumedByModuleId !== null ||
      item.consumedExpeditionId !== null ||
      item.consumedTick !== null
    ) {
      fail(`${path} has consumption data while still available.`);
    }
    return;
  }

  if (!isWorldMemoryModuleId(item.consumedByModuleId)) {
    fail(`${path}.consumedByModuleId is not supported.`);
  }
  assertIdentifier(item.consumedExpeditionId, `${path}.consumedExpeditionId`);
  assertTick(item.consumedTick, `${path}.consumedTick`);
}

function assertInstalledModule(module: InstalledModuleMemory, path: string): void {
  if (!isWorldMemoryModuleId(module.moduleId)) {
    fail(`${path}.moduleId is not supported.`);
  }
  if (!isWorldMemorySiteId(module.siteId)) {
    fail(`${path}.siteId is not supported.`);
  }
  assertIdentifier(module.installedExpeditionId, `${path}.installedExpeditionId`);
  assertTick(module.installedTick, `${path}.installedTick`);
  assertIdentifier(module.consumedItemId, `${path}.consumedItemId`);
}

function assertExpeditionMemory(expedition: ExpeditionMemory, path: string): void {
  assertIdentifier(expedition.expeditionId, `${path}.expeditionId`);
  if (
    expedition.endedReason !== "returned" &&
    expedition.endedReason !== "retreated" &&
    expedition.endedReason !== "defeated"
  ) {
    fail(`${path}.endedReason is not supported.`);
  }
  assertTick(expedition.endedTick, `${path}.endedTick`);
  assertUniqueSiteArray(expedition.discoveredSiteIds, `${path}.discoveredSiteIds`);
  assertUniqueIdentifierArray(
    expedition.recoveredItemIds,
    `${path}.recoveredItemIds`,
  );
  if (
    expedition.claimedBaseSiteId !== null &&
    !isWorldMemorySiteId(expedition.claimedBaseSiteId)
  ) {
    fail(`${path}.claimedBaseSiteId is not supported.`);
  }
  if (
    expedition.installedModuleId !== null &&
    !isWorldMemoryModuleId(expedition.installedModuleId)
  ) {
    fail(`${path}.installedModuleId is not supported.`);
  }
  if (
    expedition.endedReason !== "returned" &&
    (expedition.claimedBaseSiteId !== null ||
      expedition.installedModuleId !== null)
  ) {
    fail(`${path} cannot claim a base or install a module after withdrawal.`);
  }
}

function assertUniqueSiteArray(
  values: readonly WorldMemorySiteId[],
  path: string,
): void {
  const unique = new Set<WorldMemorySiteId>();
  values.forEach((value, index) => {
    if (!isWorldMemorySiteId(value)) {
      fail(`${path}[${index}] is not supported.`);
    }
    if (unique.has(value)) {
      fail(`${path} contains duplicate site "${value}".`);
    }
    unique.add(value);
  });
}

function assertUniqueIdentifierArray(values: readonly string[], path: string): void {
  const unique = new Set<string>();
  values.forEach((value, index) => {
    assertIdentifier(value, `${path}[${index}]`);
    if (unique.has(value)) {
      fail(`${path} contains duplicate identifier "${value}".`);
    }
    unique.add(value);
  });
}

function assertArrayLimit(
  value: readonly unknown[],
  maximum: number,
  path: string,
): void {
  if (!Array.isArray(value) || value.length > maximum) {
    fail(`${path} must contain at most ${maximum} entries.`);
  }
}

function assertIntegerInRange(
  value: unknown,
  minimum: number,
  maximum: number,
  path: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < minimum ||
    value > maximum
  ) {
    fail(`${path} must be an integer from ${minimum} to ${maximum}.`);
  }
}

function fail(message: string): never {
  throw new WorldMemoryInvariantError(message);
}
