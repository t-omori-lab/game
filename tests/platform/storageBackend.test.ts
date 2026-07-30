import { describe, expect, it } from "vitest";
import {
  MemoryStorageBackend,
  ResilientStorageBackend,
  createDefaultStorageBackend,
  type StorageBackend,
} from "../../src/platform/storageBackend";

describe("storage backends", () => {
  it("provides a browser-free in-memory implementation", async () => {
    const storage = new MemoryStorageBackend();

    expect(await storage.get("save")).toBeNull();
    await storage.set("save", "revision-1");
    expect(await storage.get("save")).toBe("revision-1");
    await storage.remove("save");
    expect(await storage.get("save")).toBeNull();
  });

  it("keeps writes in memory when the persistent backend fails", async () => {
    const resilient = new ResilientStorageBackend(new RejectingStorageBackend());
    const persistenceChanges: string[] = [];
    const unsubscribe = resilient.subscribePersistence((persistence) => {
      persistenceChanges.push(persistence);
    });

    await resilient.set("save", "revision-2");

    expect(resilient.usingFallback).toBe(true);
    expect(resilient.persistence).toBe("memory");
    expect(persistenceChanges).toEqual(["indexeddb", "memory"]);
    expect(await resilient.get("save")).toBe("revision-2");
    unsubscribe();
  });

  it("selects memory storage when IndexedDB is unavailable", async () => {
    const selection = await createDefaultStorageBackend();

    expect(selection.persistence).toBe("memory");
    await selection.backend.set("probe", "ok");
    expect(await selection.backend.get("probe")).toBe("ok");
  });
});

class RejectingStorageBackend implements StorageBackend {
  public readonly persistence = "indexeddb" as const;

  public async get(_key: string): Promise<string | null> {
    throw new Error("Persistent storage unavailable.");
  }

  public async set(_key: string, _value: string): Promise<void> {
    throw new Error("Persistent storage unavailable.");
  }

  public async remove(_key: string): Promise<void> {
    throw new Error("Persistent storage unavailable.");
  }

  public subscribePersistence(
    listener: (persistence: "indexeddb" | "memory") => void,
  ): () => void {
    listener(this.persistence);
    return () => undefined;
  }
}
