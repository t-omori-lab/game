import {
  MAX_WORLD_MEMORY_EVENTS,
  MAX_WORLD_MEMORY_EXPEDITIONS,
  MAX_WORLD_MEMORY_ITEMS,
  WorldMemoryInvariantError,
  assertIdentifier,
  assertTick,
  assertValidWorldMemory,
  isWorldMemoryModuleId,
  isWorldMemorySiteId,
  WORLD_MEMORY_SITE_IDS,
} from "./model";
import type {
  ExpeditionMemory,
  WorldEvent,
  WorldMemorySiteId,
  WorldMemoryState,
} from "./types";

export function reduceWorldMemory(
  previous: WorldMemoryState,
  event: WorldEvent,
): WorldMemoryState {
  assertValidWorldMemory(previous);
  assertValidEvent(event);

  if (previous.appliedEventIds.includes(event.eventId)) {
    throw new WorldMemoryInvariantError(
      `World event "${event.eventId}" was already applied.`,
    );
  }
  if (previous.appliedEventIds.length >= MAX_WORLD_MEMORY_EVENTS) {
    throw new WorldMemoryInvariantError("World event history is full.");
  }
  if (
    previous.expeditionHistory.some(
      (entry) => entry.expeditionId === event.expeditionId,
    )
  ) {
    throw new WorldMemoryInvariantError(
      `Expedition "${event.expeditionId}" has already ended.`,
    );
  }

  const appliedEventIds = [...previous.appliedEventIds, event.eventId];
  let next: WorldMemoryState;

  switch (event.type) {
    case "site-discovered": {
      if (
        previous.discoveredSites.some((site) => site.siteId === event.siteId)
      ) {
        throw new WorldMemoryInvariantError(
          `Site "${event.siteId}" is already discovered.`,
        );
      }
      next = {
        ...previous,
        discoveredSites: [
          ...previous.discoveredSites,
          {
            siteId: event.siteId,
            firstDiscoveredExpeditionId: event.expeditionId,
            firstDiscoveredTick: event.tick,
          },
        ],
        appliedEventIds,
      };
      break;
    }
    case "item-recovered": {
      if (previous.recoveredItems.length >= MAX_WORLD_MEMORY_ITEMS) {
        throw new WorldMemoryInvariantError("Recovered item history is full.");
      }
      if (
        !previous.discoveredSites.some((site) => site.siteId === event.siteId)
      ) {
        throw new WorldMemoryInvariantError(
          `Cannot recover an item from undiscovered site "${event.siteId}".`,
        );
      }
      if (
        previous.recoveredItems.some((item) => item.itemId === event.itemId)
      ) {
        throw new WorldMemoryInvariantError(
          `Recovered item "${event.itemId}" already exists.`,
        );
      }
      next = {
        ...previous,
        recoveredItems: [
          ...previous.recoveredItems,
          {
            itemId: event.itemId,
            sourceSiteId: event.siteId,
            acquiredExpeditionId: event.expeditionId,
            acquiredTick: event.tick,
            status: "available",
            consumedByModuleId: null,
            consumedExpeditionId: null,
            consumedTick: null,
          },
        ],
        appliedEventIds,
      };
      break;
    }
    case "base-claimed": {
      if (previous.claimedBaseSiteId !== null) {
        throw new WorldMemoryInvariantError("A base has already been claimed.");
      }
      if (
        !previous.discoveredSites.some((site) => site.siteId === event.siteId)
      ) {
        throw new WorldMemoryInvariantError(
          `Cannot claim undiscovered site "${event.siteId}".`,
        );
      }
      next = {
        ...previous,
        claimedBaseSiteId: event.siteId,
        appliedEventIds,
      };
      break;
    }
    case "module-installed": {
      if (previous.installedModule !== null) {
        throw new WorldMemoryInvariantError("A module is already installed.");
      }
      if (previous.claimedBaseSiteId !== event.siteId) {
        throw new WorldMemoryInvariantError(
          "A module can only be installed at the claimed base.",
        );
      }
      const consumedIndex = previous.recoveredItems.findIndex(
        (item) => item.itemId === event.consumedItemId,
      );
      const consumed = previous.recoveredItems[consumedIndex];
      if (consumed === undefined || consumed.status !== "available") {
        throw new WorldMemoryInvariantError(
          `Module installation requires available item "${event.consumedItemId}".`,
        );
      }
      next = {
        ...previous,
        recoveredItems: previous.recoveredItems.map((item, index) =>
          index === consumedIndex
            ? {
                ...item,
                status: "consumed",
                consumedByModuleId: event.moduleId,
                consumedExpeditionId: event.expeditionId,
                consumedTick: event.tick,
              }
            : item,
        ),
        installedModule: {
          moduleId: event.moduleId,
          siteId: event.siteId,
          installedExpeditionId: event.expeditionId,
          installedTick: event.tick,
          consumedItemId: event.consumedItemId,
        },
        appliedEventIds,
      };
      break;
    }
    case "expedition-ended": {
      if (previous.expeditionHistory.length >= MAX_WORLD_MEMORY_EXPEDITIONS) {
        throw new WorldMemoryInvariantError("Expedition history is full.");
      }
      const summary = summarizeExpedition(previous, event);
      if (
        event.reason !== "returned" &&
        (summary.claimedBaseSiteId !== null ||
          summary.installedModuleId !== null)
      ) {
        throw new WorldMemoryInvariantError(
          "A withdrawal cannot commit a base or module.",
        );
      }
      next = {
        ...previous,
        expeditionHistory: [...previous.expeditionHistory, summary],
        appliedEventIds,
      };
      break;
    }
  }

  assertValidWorldMemory(next);
  return next;
}

export function reduceWorldMemoryEvents(
  previous: WorldMemoryState,
  events: readonly WorldEvent[],
): WorldMemoryState {
  if (events.length === 0) {
    throw new WorldMemoryInvariantError(
      "An expedition commit requires at least one world event.",
    );
  }
  const expeditionId = events[0]?.expeditionId;
  if (
    expeditionId === undefined ||
    events.some((event) => event.expeditionId !== expeditionId)
  ) {
    throw new WorldMemoryInvariantError(
      "An expedition commit cannot mix expedition identifiers.",
    );
  }
  const endEvents = events.filter((event) => event.type === "expedition-ended");
  if (
    endEvents.length !== 1 ||
    events[events.length - 1]?.type !== "expedition-ended"
  ) {
    throw new WorldMemoryInvariantError(
      "An expedition commit must end with exactly one expedition-ended event.",
    );
  }

  return events.reduce(reduceWorldMemory, previous);
}

function summarizeExpedition(
  state: WorldMemoryState,
  event: Extract<WorldEvent, { type: "expedition-ended" }>,
): ExpeditionMemory {
  const discoveredSiteIds = state.discoveredSites
    .filter(
      (site) => site.firstDiscoveredExpeditionId === event.expeditionId,
    )
    .map((site) => site.siteId);
  const recoveredItemIds = state.recoveredItems
    .filter((item) => item.acquiredExpeditionId === event.expeditionId)
    .map((item) => item.itemId);
  const claimedBaseSiteId =
    state.installedModule?.installedExpeditionId === event.expeditionId
      ? state.installedModule.siteId
      : state.claimedBaseSiteId !== null &&
          state.expeditionHistory.length === 0
        ? state.claimedBaseSiteId
        : null;
  const installedModuleId =
    state.installedModule?.installedExpeditionId === event.expeditionId
      ? state.installedModule.moduleId
      : null;

  return {
    expeditionId: event.expeditionId,
    endedReason: event.reason,
    endedTick: event.tick,
    discoveredSiteIds,
    recoveredItemIds,
    claimedBaseSiteId,
    installedModuleId,
  };
}

function assertValidEvent(event: WorldEvent): void {
  assertIdentifier(event.eventId, "event.eventId");
  assertIdentifier(event.expeditionId, "event.expeditionId");
  assertTick(event.tick, "event.tick");

  if (
    (event.type === "site-discovered" ||
      event.type === "item-recovered" ||
      event.type === "base-claimed" ||
      event.type === "module-installed") &&
    !isWorldMemorySiteId(event.siteId)
  ) {
    throw new WorldMemoryInvariantError("event.siteId is not supported.");
  }
  if (event.type === "item-recovered") {
    assertIdentifier(event.itemId, "event.itemId");
  }
  if (event.type === "module-installed") {
    if (!isWorldMemoryModuleId(event.moduleId)) {
      throw new WorldMemoryInvariantError("event.moduleId is not supported.");
    }
    assertIdentifier(event.consumedItemId, "event.consumedItemId");
  }
  if (
    event.type === "expedition-ended" &&
    event.reason !== "returned" &&
    event.reason !== "retreated" &&
    event.reason !== "defeated"
  ) {
    throw new WorldMemoryInvariantError("event.reason is not supported.");
  }
}

export function unresolvedWorldMemorySiteIds(
  state: WorldMemoryState,
): readonly WorldMemorySiteId[] {
  const claimed = state.claimedBaseSiteId;
  return WORLD_MEMORY_SITE_IDS.filter((siteId) => siteId !== claimed);
}
