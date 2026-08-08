import { describe, expect, it } from "vitest";
import {
  SaveRepository,
  getSaveSlotKey,
} from "../../src/platform/saveRepository";
import { MemoryStorageBackend } from "../../src/platform/storageBackend";
import {
  WORLD_MEMORY_CONTENT_VERSION,
  WORLD_MEMORY_SAVE_NAMESPACE,
  createEmptyWorldMemory,
  createWorldMemoryRepository,
  deriveWorldMemoryEffects,
  loadWorldMemory,
  reduceWorldMemoryEvents,
  saveWorldMemory,
  unresolvedWorldMemorySiteIds,
  worldMemoryCodec,
  type WorldEvent,
  type WorldMemoryModuleId,
  type WorldMemorySiteId,
  type WorldMemoryState,
} from "../../src/prototypeB/worldMemory";

const WORLD_SEED = 0x4652_414d;

describe("R09 WorldMemory", () => {
  it("creates a separate deterministic v1 world authority", () => {
    expect(createEmptyWorldMemory(WORLD_SEED)).toEqual({
      version: 1,
      worldSeed: WORLD_SEED,
      discoveredSites: [],
      recoveredItems: [],
      claimedBaseSiteId: null,
      installedModule: null,
      expeditionHistory: [],
      appliedEventIds: [],
    });
    expect(() => createEmptyWorldMemory(-1)).toThrow(/worldSeed/);
  });

  it.each([
    ["canopy-relay", "pathfinder-array"],
    ["canopy-relay", "relic-overdrive"],
    ["flooded-archive", "pathfinder-array"],
    ["flooded-archive", "relic-overdrive"],
  ] as const)(
    "commits and reloads base %s with module %s",
    async (baseSiteId, moduleId) => {
      const storage = new MemoryStorageBackend();
      const repository = createWorldMemoryRepository(storage, {
        now: () => new Date("2026-08-08T09:00:00.000Z"),
      });
      const completed = completeFirstExpedition(baseSiteId, moduleId);

      await saveWorldMemory(repository, completed);
      const reloaded = await loadWorldMemory(repository, WORLD_SEED);

      expect(reloaded.source).toBe("loaded");
      expect(reloaded.state).toEqual(completed);
      expect(reloaded.state.claimedBaseSiteId).toBe(baseSiteId);
      expect(reloaded.state.installedModule?.moduleId).toBe(moduleId);
      expect(reloaded.state.recoveredItems).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            itemId: `core-${baseSiteId}`,
            status: "consumed",
            consumedByModuleId: moduleId,
          }),
        ]),
      );
      expect(unresolvedWorldMemorySiteIds(reloaded.state)).toEqual([
        baseSiteId === "canopy-relay"
          ? "flooded-archive"
          : "canopy-relay",
      ]);
    },
  );

  it("keeps discoveries and recovered items on retreat without session state", () => {
    const previous = createEmptyWorldMemory(WORLD_SEED);
    const retreated = reduceWorldMemoryEvents(previous, [
      event("site-discovered", 10, {
        siteId: "canopy-relay",
      }),
      event("item-recovered", 30, {
        itemId: "core-canopy-relay",
        siteId: "canopy-relay",
      }),
      event("expedition-ended", 90, { reason: "retreated" }),
    ]);

    expect(retreated.discoveredSites.map((site) => site.siteId)).toEqual([
      "canopy-relay",
    ]);
    expect(retreated.recoveredItems).toEqual([
      expect.objectContaining({
        itemId: "core-canopy-relay",
        status: "available",
      }),
    ]);
    expect(retreated.claimedBaseSiteId).toBeNull();
    expect(retreated.installedModule).toBeNull();
    expect(retreated.expeditionHistory).toEqual([
      expect.objectContaining({
        endedReason: "retreated",
        discoveredSiteIds: ["canopy-relay"],
        recoveredItemIds: ["core-canopy-relay"],
        claimedBaseSiteId: null,
        installedModuleId: null,
      }),
    ]);
    expect(retreated).not.toHaveProperty("player");
    expect(retreated).not.toHaveProperty("enemies");
    expect(retreated).not.toHaveProperty("position");
  });

  it("rejects invalid event ordering and incomplete expedition commits", () => {
    const empty = createEmptyWorldMemory(WORLD_SEED);

    expect(() =>
      reduceWorldMemoryEvents(empty, [
        event("item-recovered", 20, {
          itemId: "orphan-core",
          siteId: "flooded-archive",
        }),
        event("expedition-ended", 30, { reason: "retreated" }),
      ]),
    ).toThrow(/undiscovered/);
    expect(() =>
      reduceWorldMemoryEvents(empty, [
        event("site-discovered", 10, { siteId: "canopy-relay" }),
      ]),
    ).toThrow(/expedition-ended/);
    expect(() =>
      reduceWorldMemoryEvents(empty, [
        event("site-discovered", 10, { siteId: "canopy-relay" }),
        event("base-claimed", 20, { siteId: "canopy-relay" }),
        event("expedition-ended", 30, { reason: "retreated" }),
      ]),
    ).toThrow(/withdrawal/);
  });

  it("derives immediate, distinct visual and gameplay effects for both modules", () => {
    const pathfinder = deriveWorldMemoryEffects(
      completeFirstExpedition("canopy-relay", "pathfinder-array"),
    );
    const overdrive = deriveWorldMemoryEffects(
      completeFirstExpedition("canopy-relay", "relic-overdrive"),
    );

    expect(pathfinder).toEqual({
      routeOverlay: true,
      explorationSpeedMultiplier: 1.12,
      relicAura: false,
      relicCooldownMultiplier: 1,
    });
    expect(overdrive).toEqual({
      routeOverlay: false,
      explorationSpeedMultiplier: 1,
      relicAura: true,
      relicCooldownMultiplier: 0.65,
    });
  });

  it("round-trips with an exact-key v1 codec and rejects drift", () => {
    const memory = completeFirstExpedition(
      "flooded-archive",
      "relic-overdrive",
    );
    const encoded = worldMemoryCodec.encode(memory);
    const decoded = worldMemoryCodec.decode(encoded);

    expect(decoded).toEqual({ ok: true, value: memory });
    if (decoded.ok) {
      expect(decoded.value).not.toBe(memory);
      expect(decoded.value.recoveredItems).not.toBe(memory.recoveredItems);
    }

    expect(
      worldMemoryCodec.decode({
        ...asRecord(encoded),
        unexpected: true,
      }).ok,
    ).toBe(false);
    expect(
      worldMemoryCodec.decode({
        ...asRecord(encoded),
        version: 2,
      }).ok,
    ).toBe(false);
    expect(
      worldMemoryCodec.decode({
        ...asRecord(encoded),
        installedModule: null,
      }).ok,
    ).toBe(false);
  });

  it("uses an R09-only namespace and falls back deterministically without overwriting", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createWorldMemoryRepository(storage, {
      now: () => new Date("2026-08-08T09:30:00.000Z"),
    });
    const memory = completeFirstExpedition(
      "canopy-relay",
      "pathfinder-array",
    );

    await saveWorldMemory(repository, memory);
    expect(
      await storage.get(getSaveSlotKey(WORLD_MEMORY_SAVE_NAMESPACE, "a")),
    ).not.toBeNull();
    expect(
      await storage.get(getSaveSlotKey("small-persistent-world", "a")),
    ).toBeNull();

    await storage.set(
      getSaveSlotKey(WORLD_MEMORY_SAVE_NAMESPACE, "a"),
      "not-json",
    );
    const fallback = await loadWorldMemory(repository, WORLD_SEED);

    expect(fallback.source).toBe("corrupt-fallback");
    expect(fallback.state).toEqual(createEmptyWorldMemory(WORLD_SEED));
    expect(
      await storage.get(getSaveSlotKey(WORLD_MEMORY_SAVE_NAMESPACE, "a")),
    ).toBe("not-json");
  });

  it("does not load a valid save from a different deterministic world", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createWorldMemoryRepository(storage);
    const memory = completeFirstExpedition(
      "canopy-relay",
      "pathfinder-array",
    );
    await saveWorldMemory(repository, memory);

    const fallback = await loadWorldMemory(repository, WORLD_SEED + 1);
    expect(fallback.source).toBe("seed-mismatch-fallback");
    expect(fallback.state.worldSeed).toBe(WORLD_SEED + 1);
  });

  it("keeps the repository content version explicit", async () => {
    const storage = new MemoryStorageBackend();
    const repository: SaveRepository<WorldMemoryState> =
      createWorldMemoryRepository(storage);
    const memory = completeFirstExpedition(
      "canopy-relay",
      "pathfinder-array",
    );
    await saveWorldMemory(repository, memory);
    const loaded = await repository.loadLatest();

    expect(loaded.status).toBe("loaded");
    if (loaded.status === "loaded") {
      expect(loaded.save.envelope.contentVersion).toBe(
        WORLD_MEMORY_CONTENT_VERSION,
      );
    }
  });
});

function completeFirstExpedition(
  baseSiteId: WorldMemorySiteId,
  moduleId: WorldMemoryModuleId,
): WorldMemoryState {
  return reduceWorldMemoryEvents(createEmptyWorldMemory(WORLD_SEED), [
    event("site-discovered", 10, { siteId: "canopy-relay" }),
    event("item-recovered", 20, {
      itemId: "core-canopy-relay",
      siteId: "canopy-relay",
    }),
    event("site-discovered", 30, { siteId: "flooded-archive" }),
    event("item-recovered", 40, {
      itemId: "core-flooded-archive",
      siteId: "flooded-archive",
    }),
    event("base-claimed", 50, { siteId: baseSiteId }),
    event("module-installed", 60, {
      siteId: baseSiteId,
      moduleId,
      consumedItemId: `core-${baseSiteId}`,
    }),
    event("expedition-ended", 70, { reason: "returned" }),
  ]);
}

type EventPayload<T extends WorldEvent["type"]> = Omit<
  Extract<WorldEvent, { type: T }>,
  "type" | "eventId" | "expeditionId" | "tick"
>;

function event<T extends WorldEvent["type"]>(
  type: T,
  tick: number,
  payload: EventPayload<T>,
): Extract<WorldEvent, { type: T }> {
  return {
    type,
    eventId: `event-${tick}-${type}`,
    expeditionId: "expedition-1",
    tick,
    ...payload,
  } as Extract<WorldEvent, { type: T }>;
}

function asRecord(value: ReturnType<typeof worldMemoryCodec.encode>) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("Expected an encoded object.");
  }
  return value;
}
