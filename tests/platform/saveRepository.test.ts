import { describe, expect, it } from "vitest";
import {
  SaveRepository,
  getSaveSlotKey,
  type PayloadDecodeResult,
  type SavePayloadCodec,
} from "../../src/platform/saveRepository";
import {
  createSaveEnvelope,
  type JsonObject,
  type JsonValue,
  serializeSaveEnvelope,
} from "../../src/platform/saveFormat";
import { MemoryStorageBackend } from "../../src/platform/storageBackend";

interface TestPayload {
  readonly traveler: string;
  readonly health: number;
  readonly inventory: readonly string[];
}

const codec: SavePayloadCodec<TestPayload> = {
  encode: (value) => ({
    traveler: value.traveler,
    health: value.health,
    inventory: value.inventory,
  }),
  decode: decodeTestPayload,
};

const firstPayload: TestPayload = {
  traveler: "mapmaker",
  health: 8,
  inventory: ["compass"],
};

const secondPayload: TestPayload = {
  traveler: "mapmaker",
  health: 5,
  inventory: ["compass", "relic"],
};

describe("SaveRepository", () => {
  it("alternates A/B slots while revisions increase", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createRepository(storage);

    const first = await repository.save(firstPayload, {
      contentVersion: "prototype-1",
      seed: 12,
    });
    const second = await repository.save(secondPayload, {
      contentVersion: "prototype-1",
      seed: 12,
    });
    const third = await repository.save(firstPayload, {
      contentVersion: "prototype-2",
      seed: 88,
    });

    expect(first.slot).toBe("a");
    expect(first.envelope.revision).toBe(1);
    expect(second.slot).toBe("b");
    expect(second.envelope.revision).toBe(2);
    expect(third.slot).toBe("a");
    expect(third.envelope.revision).toBe(3);

    const latest = await repository.loadLatest();
    expect(latest.status).toBe("loaded");

    if (latest.status === "loaded") {
      expect(latest.save).toEqual(third);
      expect(latest.recoveredFromBackup).toBe(false);
    }
  });

  it("loads the previous slot when the newest slot is corrupt", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createRepository(storage);

    await repository.save(firstPayload, {
      contentVersion: "prototype-1",
      seed: 12,
    });
    const latest = await repository.save(secondPayload, {
      contentVersion: "prototype-1",
      seed: 12,
    });
    await storage.set(
      getSaveSlotKey("test-world", latest.slot),
      '{"corrupt":true}',
    );

    const recovered = await repository.loadLatest();

    expect(recovered.status).toBe("loaded");

    if (recovered.status === "loaded") {
      expect(recovered.save.slot).toBe("a");
      expect(recovered.save.payload).toEqual(firstPayload);
      expect(recovered.recoveredFromBackup).toBe(true);
      expect(recovered.invalidSlots).toHaveLength(1);
    }
  });

  it("validates imports and promotes a valid import to the next revision", async () => {
    const source = createRepository(new MemoryStorageBackend());
    await source.save(secondPayload, {
      contentVersion: "prototype-4",
      seed: 991,
    });
    const exported = await source.exportLatest();
    expect(exported).not.toBeNull();

    const target = createRepository(new MemoryStorageBackend());
    await target.save(firstPayload, {
      contentVersion: "prototype-1",
      seed: 2,
    });
    const imported = await target.importSave(exported ?? "");

    expect(imported.ok).toBe(true);

    if (imported.ok) {
      expect(imported.value.slot).toBe("b");
      expect(imported.value.envelope.revision).toBe(2);
      expect(imported.value.envelope.contentVersion).toBe("prototype-4");
      expect(imported.value.envelope.seed).toBe(991);
      expect(imported.value.payload).toEqual(secondPayload);
    }

    const wrongDomainPayload = createSaveEnvelope({
      contentVersion: "prototype-4",
      seed: 991,
      revision: 1,
      savedAt: "2026-07-30T01:00:00.000Z",
      payload: { traveler: "mapmaker", health: "unlimited" },
    });
    const rejected = await target.importSave(
      serializeSaveEnvelope(wrongDomainPayload),
    );
    expect(rejected.ok).toBe(false);

    if (!rejected.ok) {
      expect(rejected.issues).toContainEqual(
        expect.objectContaining({
          code: "invalid_payload",
          path: "$.payload",
        }),
      );
    }
  });

  it("reports corrupt when neither slot has a valid envelope", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createRepository(storage);

    await storage.set(getSaveSlotKey("test-world", "a"), "not-json");
    await storage.set(getSaveSlotKey("test-world", "b"), "{}");

    const result = await repository.loadLatest();

    expect(result.status).toBe("corrupt");

    if (result.status === "corrupt") {
      expect(result.invalidSlots.map((slot) => slot.slot).sort()).toEqual([
        "a",
        "b",
      ]);
    }
  });

  it("serializes concurrent saves so revisions cannot overwrite each other", async () => {
    const storage = new MemoryStorageBackend();
    const repository = createRepository(storage);
    const payloads: readonly TestPayload[] = [
      firstPayload,
      secondPayload,
      {
        traveler: "mapmaker",
        health: 3,
        inventory: ["compass", "relic", "field-note"],
      },
    ];

    const saves = await Promise.all(
      payloads.map((payload) =>
        repository.save(payload, {
          contentVersion: "prototype-1",
          seed: 12,
        }),
      ),
    );

    expect(saves.map((save) => save.envelope.revision)).toEqual([1, 2, 3]);
    expect(saves.map((save) => save.slot)).toEqual(["a", "b", "a"]);

    const latest = await repository.loadLatest();
    expect(latest.status).toBe("loaded");

    if (latest.status === "loaded") {
      expect(latest.save.envelope.revision).toBe(3);
      expect(latest.save.payload).toEqual(payloads[2]);
    }
  });
});

function createRepository(
  storage: MemoryStorageBackend,
): SaveRepository<TestPayload> {
  let tick = 0;

  return new SaveRepository({
    storage,
    codec,
    namespace: "test-world",
    now: () => new Date(Date.UTC(2026, 6, 30, 1, 0, tick++)),
  });
}

function decodeTestPayload(value: JsonValue): PayloadDecodeResult<TestPayload> {
  if (!isJsonObject(value)) {
    return { ok: false, message: "Payload must be an object." };
  }

  const traveler = value["traveler"];
  const health = value["health"];
  const inventory = value["inventory"];

  if (
    typeof traveler !== "string" ||
    typeof health !== "number" ||
    !Array.isArray(inventory) ||
    !inventory.every((item) => typeof item === "string")
  ) {
    return { ok: false, message: "Payload fields are invalid." };
  }

  return {
    ok: true,
    value: {
      traveler,
      health,
      inventory,
    },
  };
}

function isJsonObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
