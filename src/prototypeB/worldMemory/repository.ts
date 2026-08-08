import {
  SaveRepository,
  type InvalidSaveSlot,
  type SaveRepositoryOptions,
} from "../../platform/saveRepository";
import type { StorageBackend } from "../../platform/storageBackend";
import { createEmptyWorldMemory } from "./model";
import { worldMemoryCodec } from "./codec";
import {
  WORLD_MEMORY_CONTENT_VERSION,
  WORLD_MEMORY_SAVE_NAMESPACE,
  type WorldMemoryState,
} from "./types";

export type WorldMemoryLoadSource =
  | "empty"
  | "loaded"
  | "recovered-backup"
  | "corrupt-fallback"
  | "seed-mismatch-fallback";

export interface LoadedWorldMemory {
  readonly state: WorldMemoryState;
  readonly source: WorldMemoryLoadSource;
  readonly invalidSlots: readonly InvalidSaveSlot[];
}

export function createWorldMemoryRepository(
  storage: StorageBackend,
  options: Pick<SaveRepositoryOptions<WorldMemoryState>, "now"> = {},
): SaveRepository<WorldMemoryState> {
  return new SaveRepository({
    storage,
    codec: worldMemoryCodec,
    namespace: WORLD_MEMORY_SAVE_NAMESPACE,
    ...options,
  });
}

export async function loadWorldMemory(
  repository: SaveRepository<WorldMemoryState>,
  worldSeed: number,
): Promise<LoadedWorldMemory> {
  const loaded = await repository.loadLatest();

  if (loaded.status === "empty") {
    return {
      state: createEmptyWorldMemory(worldSeed),
      source: "empty",
      invalidSlots: [],
    };
  }
  if (loaded.status === "corrupt") {
    return {
      state: createEmptyWorldMemory(worldSeed),
      source: "corrupt-fallback",
      invalidSlots: loaded.invalidSlots,
    };
  }
  if (
    loaded.save.payload.worldSeed !== worldSeed ||
    loaded.save.envelope.seed !== worldSeed
  ) {
    return {
      state: createEmptyWorldMemory(worldSeed),
      source: "seed-mismatch-fallback",
      invalidSlots: loaded.invalidSlots,
    };
  }

  return {
    state: loaded.save.payload,
    source: loaded.recoveredFromBackup ? "recovered-backup" : "loaded",
    invalidSlots: loaded.invalidSlots,
  };
}

export async function saveWorldMemory(
  repository: SaveRepository<WorldMemoryState>,
  state: WorldMemoryState,
): Promise<void> {
  await repository.save(state, {
    contentVersion: WORLD_MEMORY_CONTENT_VERSION,
    seed: state.worldSeed,
  });
}
