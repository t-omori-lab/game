import type { JsonObject, JsonValue } from "../../platform/saveFormat";
import type {
  PayloadDecodeResult,
  SavePayloadCodec,
} from "../../platform/saveRepository";
import {
  assertValidWorldMemory,
  isWorldMemoryModuleId,
  isWorldMemorySiteId,
} from "./model";
import {
  WORLD_MEMORY_VERSION,
  type ExpeditionEndReason,
  type ExpeditionMemory,
  type InstalledModuleMemory,
  type RecoveredItemMemory,
  type SiteMemory,
  type WorldMemoryState,
} from "./types";

const ROOT_KEYS = new Set([
  "version",
  "worldSeed",
  "discoveredSites",
  "recoveredItems",
  "claimedBaseSiteId",
  "installedModule",
  "expeditionHistory",
  "appliedEventIds",
]);
const SITE_KEYS = new Set([
  "siteId",
  "firstDiscoveredExpeditionId",
  "firstDiscoveredTick",
]);
const ITEM_KEYS = new Set([
  "itemId",
  "sourceSiteId",
  "acquiredExpeditionId",
  "acquiredTick",
  "status",
  "consumedByModuleId",
  "consumedExpeditionId",
  "consumedTick",
]);
const MODULE_KEYS = new Set([
  "moduleId",
  "siteId",
  "installedExpeditionId",
  "installedTick",
  "consumedItemId",
]);
const EXPEDITION_KEYS = new Set([
  "expeditionId",
  "endedReason",
  "endedTick",
  "discoveredSiteIds",
  "recoveredItemIds",
  "claimedBaseSiteId",
  "installedModuleId",
]);

export const WORLD_MEMORY_MIGRATION_SOURCES = [] as const;

export const worldMemoryCodec: SavePayloadCodec<WorldMemoryState> = {
  encode(value): JsonValue {
    assertValidWorldMemory(value);

    return {
      version: value.version,
      worldSeed: value.worldSeed,
      discoveredSites: value.discoveredSites.map((site) => ({
        siteId: site.siteId,
        firstDiscoveredExpeditionId: site.firstDiscoveredExpeditionId,
        firstDiscoveredTick: site.firstDiscoveredTick,
      })),
      recoveredItems: value.recoveredItems.map((item) => ({
        itemId: item.itemId,
        sourceSiteId: item.sourceSiteId,
        acquiredExpeditionId: item.acquiredExpeditionId,
        acquiredTick: item.acquiredTick,
        status: item.status,
        consumedByModuleId: item.consumedByModuleId,
        consumedExpeditionId: item.consumedExpeditionId,
        consumedTick: item.consumedTick,
      })),
      claimedBaseSiteId: value.claimedBaseSiteId,
      installedModule:
        value.installedModule === null
          ? null
          : {
              moduleId: value.installedModule.moduleId,
              siteId: value.installedModule.siteId,
              installedExpeditionId:
                value.installedModule.installedExpeditionId,
              installedTick: value.installedModule.installedTick,
              consumedItemId: value.installedModule.consumedItemId,
            },
      expeditionHistory: value.expeditionHistory.map((expedition) => ({
        expeditionId: expedition.expeditionId,
        endedReason: expedition.endedReason,
        endedTick: expedition.endedTick,
        discoveredSiteIds: [...expedition.discoveredSiteIds],
        recoveredItemIds: [...expedition.recoveredItemIds],
        claimedBaseSiteId: expedition.claimedBaseSiteId,
        installedModuleId: expedition.installedModuleId,
      })),
      appliedEventIds: [...value.appliedEventIds],
    };
  },

  decode(value): PayloadDecodeResult<WorldMemoryState> {
    try {
      return { ok: true, value: decodeWorldMemory(value) };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "World memory payload is invalid.",
      };
    }
  },
};

export function migrateWorldMemoryPayload(value: JsonValue): JsonValue {
  const root = readRecord(value, "$", ROOT_KEYS);
  const version = root["version"];

  if (version === WORLD_MEMORY_VERSION) {
    return value;
  }

  throw new TypeError(
    `World memory version ${String(version)} is unsupported; no migration is registered.`,
  );
}

function decodeWorldMemory(value: JsonValue): WorldMemoryState {
  const migrated = migrateWorldMemoryPayload(value);
  const root = readRecord(migrated, "$", ROOT_KEYS);
  const version = readInteger(root["version"], "$.version");

  if (version !== WORLD_MEMORY_VERSION) {
    throw new TypeError(`$.version must be ${WORLD_MEMORY_VERSION}.`);
  }

  const candidate: WorldMemoryState = {
    version: WORLD_MEMORY_VERSION,
    worldSeed: readInteger(root["worldSeed"], "$.worldSeed"),
    discoveredSites: readArray(
      root["discoveredSites"],
      "$.discoveredSites",
      readSiteMemory,
    ),
    recoveredItems: readArray(
      root["recoveredItems"],
      "$.recoveredItems",
      readRecoveredItem,
    ),
    claimedBaseSiteId: readNullableSiteId(
      root["claimedBaseSiteId"],
      "$.claimedBaseSiteId",
    ),
    installedModule: readNullableInstalledModule(
      root["installedModule"],
      "$.installedModule",
    ),
    expeditionHistory: readArray(
      root["expeditionHistory"],
      "$.expeditionHistory",
      readExpeditionMemory,
    ),
    appliedEventIds: readArray(
      root["appliedEventIds"],
      "$.appliedEventIds",
      (entry, path) => readString(entry, path),
    ),
  };

  assertValidWorldMemory(candidate);
  return candidate;
}

function readSiteMemory(value: JsonValue, path: string): SiteMemory {
  const record = readRecord(value, path, SITE_KEYS);
  const siteId = record["siteId"];
  if (!isWorldMemorySiteId(siteId)) {
    throw new TypeError(`${path}.siteId is not supported.`);
  }
  return {
    siteId,
    firstDiscoveredExpeditionId: readString(
      record["firstDiscoveredExpeditionId"],
      `${path}.firstDiscoveredExpeditionId`,
    ),
    firstDiscoveredTick: readInteger(
      record["firstDiscoveredTick"],
      `${path}.firstDiscoveredTick`,
    ),
  };
}

function readRecoveredItem(
  value: JsonValue,
  path: string,
): RecoveredItemMemory {
  const record = readRecord(value, path, ITEM_KEYS);
  const sourceSiteId = record["sourceSiteId"];
  const status = record["status"];
  const consumedByModuleId = record["consumedByModuleId"];

  if (!isWorldMemorySiteId(sourceSiteId)) {
    throw new TypeError(`${path}.sourceSiteId is not supported.`);
  }
  if (status !== "available" && status !== "consumed") {
    throw new TypeError(`${path}.status is not supported.`);
  }
  if (
    consumedByModuleId !== null &&
    !isWorldMemoryModuleId(consumedByModuleId)
  ) {
    throw new TypeError(`${path}.consumedByModuleId is not supported.`);
  }

  return {
    itemId: readString(record["itemId"], `${path}.itemId`),
    sourceSiteId,
    acquiredExpeditionId: readString(
      record["acquiredExpeditionId"],
      `${path}.acquiredExpeditionId`,
    ),
    acquiredTick: readInteger(
      record["acquiredTick"],
      `${path}.acquiredTick`,
    ),
    status,
    consumedByModuleId,
    consumedExpeditionId: readNullableString(
      record["consumedExpeditionId"],
      `${path}.consumedExpeditionId`,
    ),
    consumedTick: readNullableInteger(
      record["consumedTick"],
      `${path}.consumedTick`,
    ),
  };
}

function readNullableInstalledModule(
  value: JsonValue | undefined,
  path: string,
): InstalledModuleMemory | null {
  if (value === null) {
    return null;
  }
  const record = readRecord(value, path, MODULE_KEYS);
  const moduleId = record["moduleId"];
  const siteId = record["siteId"];
  if (!isWorldMemoryModuleId(moduleId)) {
    throw new TypeError(`${path}.moduleId is not supported.`);
  }
  if (!isWorldMemorySiteId(siteId)) {
    throw new TypeError(`${path}.siteId is not supported.`);
  }
  return {
    moduleId,
    siteId,
    installedExpeditionId: readString(
      record["installedExpeditionId"],
      `${path}.installedExpeditionId`,
    ),
    installedTick: readInteger(
      record["installedTick"],
      `${path}.installedTick`,
    ),
    consumedItemId: readString(
      record["consumedItemId"],
      `${path}.consumedItemId`,
    ),
  };
}

function readExpeditionMemory(value: JsonValue, path: string): ExpeditionMemory {
  const record = readRecord(value, path, EXPEDITION_KEYS);
  const endedReason = readExpeditionReason(
    record["endedReason"],
    `${path}.endedReason`,
  );
  const discoveredSiteIds = readArray(
    record["discoveredSiteIds"],
    `${path}.discoveredSiteIds`,
    (entry, entryPath) => {
      if (!isWorldMemorySiteId(entry)) {
        throw new TypeError(`${entryPath} is not supported.`);
      }
      return entry;
    },
  );
  const installedModuleId = record["installedModuleId"];
  if (
    installedModuleId !== null &&
    !isWorldMemoryModuleId(installedModuleId)
  ) {
    throw new TypeError(`${path}.installedModuleId is not supported.`);
  }
  return {
    expeditionId: readString(
      record["expeditionId"],
      `${path}.expeditionId`,
    ),
    endedReason,
    endedTick: readInteger(record["endedTick"], `${path}.endedTick`),
    discoveredSiteIds,
    recoveredItemIds: readArray(
      record["recoveredItemIds"],
      `${path}.recoveredItemIds`,
      (entry, entryPath) => readString(entry, entryPath),
    ),
    claimedBaseSiteId: readNullableSiteId(
      record["claimedBaseSiteId"],
      `${path}.claimedBaseSiteId`,
    ),
    installedModuleId,
  };
}

function readRecord(
  value: JsonValue | undefined,
  path: string,
  expectedKeys: ReadonlySet<string>,
): JsonObject {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`${path} must be an object.`);
  }
  const actualKeys = Object.keys(value);
  const missing = [...expectedKeys].filter((key) => !(key in value));
  const unexpected = actualKeys.filter((key) => !expectedKeys.has(key));
  if (missing.length > 0 || unexpected.length > 0) {
    throw new TypeError(
      `${path} has invalid keys (missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.join(", ") || "none"}).`,
    );
  }
  return value as JsonObject;
}

function readArray<T>(
  value: JsonValue | undefined,
  path: string,
  readEntry: (entry: JsonValue, path: string) => T,
): T[] {
  if (!Array.isArray(value)) {
    throw new TypeError(`${path} must be an array.`);
  }
  return value.map((entry, index) => readEntry(entry, `${path}[${index}]`));
}

function readString(value: JsonValue | undefined, path: string): string {
  if (typeof value !== "string") {
    throw new TypeError(`${path} must be a string.`);
  }
  return value;
}

function readNullableString(
  value: JsonValue | undefined,
  path: string,
): string | null {
  return value === null ? null : readString(value, path);
}

function readInteger(value: JsonValue | undefined, path: string): number {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    throw new TypeError(`${path} must be an integer.`);
  }
  return value;
}

function readNullableInteger(
  value: JsonValue | undefined,
  path: string,
): number | null {
  return value === null ? null : readInteger(value, path);
}

function readNullableSiteId(
  value: JsonValue | undefined,
  path: string,
): WorldMemoryState["claimedBaseSiteId"] {
  if (value === null) {
    return null;
  }
  if (!isWorldMemorySiteId(value)) {
    throw new TypeError(`${path} is not supported.`);
  }
  return value;
}

function readExpeditionReason(
  value: JsonValue | undefined,
  path: string,
): ExpeditionEndReason {
  if (value !== "returned" && value !== "retreated" && value !== "defeated") {
    throw new TypeError(`${path} is not supported.`);
  }
  return value;
}
