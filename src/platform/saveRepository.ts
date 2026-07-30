import {
  createSaveEnvelope,
  parseSaveEnvelope,
  serializeSaveEnvelope,
  type JsonValue,
  type SaveEnvelope,
  type SaveValidationIssue,
  type ValidationResult,
} from "./saveFormat";
import type { StorageBackend } from "./storageBackend";

export type SaveSlot = "a" | "b";

export interface PayloadDecodeSuccess<T> {
  readonly ok: true;
  readonly value: T;
}

export interface PayloadDecodeFailure {
  readonly ok: false;
  readonly message: string;
}

export type PayloadDecodeResult<T> =
  | PayloadDecodeSuccess<T>
  | PayloadDecodeFailure;

export interface SavePayloadCodec<T> {
  encode(value: T): JsonValue;
  decode(value: JsonValue): PayloadDecodeResult<T>;
}

export interface SaveMetadata {
  readonly contentVersion: string;
  readonly seed: number;
}

export interface StoredSave<T> {
  readonly slot: SaveSlot;
  readonly envelope: SaveEnvelope;
  readonly payload: T;
}

export interface InvalidSaveSlot {
  readonly slot: SaveSlot;
  readonly issues: readonly SaveValidationIssue[];
}

export type SaveLoadResult<T> =
  | {
      readonly status: "empty";
      readonly invalidSlots: readonly [];
    }
  | {
      readonly status: "corrupt";
      readonly invalidSlots: readonly InvalidSaveSlot[];
    }
  | {
      readonly status: "loaded";
      readonly save: StoredSave<T>;
      readonly recoveredFromBackup: boolean;
      readonly invalidSlots: readonly InvalidSaveSlot[];
    };

export interface SaveRepositoryOptions<T> {
  readonly storage: StorageBackend;
  readonly codec: SavePayloadCodec<T>;
  readonly namespace?: string;
  readonly now?: () => Date;
}

export class SaveRepositoryError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "SaveRepositoryError";
  }
}

type SlotRead<T> =
  | { readonly status: "empty"; readonly slot: SaveSlot }
  | { readonly status: "invalid"; readonly invalid: InvalidSaveSlot }
  | { readonly status: "valid"; readonly save: StoredSave<T> };

const DEFAULT_NAMESPACE = "small-persistent-world";
const NAMESPACE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;

export class SaveRepository<T> {
  private readonly storage: StorageBackend;
  private readonly codec: SavePayloadCodec<T>;
  private readonly namespace: string;
  private readonly now: () => Date;
  private mutationTail: Promise<void> = Promise.resolve();

  public constructor(options: SaveRepositoryOptions<T>) {
    const namespace = options.namespace ?? DEFAULT_NAMESPACE;

    if (!NAMESPACE_PATTERN.test(namespace)) {
      throw new SaveRepositoryError(
        "Save namespace must be 1-64 letters, digits, dots, underscores, or hyphens.",
      );
    }

    this.storage = options.storage;
    this.codec = options.codec;
    this.namespace = namespace;
    this.now = options.now ?? (() => new Date());
  }

  public async loadLatest(): Promise<SaveLoadResult<T>> {
    const slots = await this.readSlots();
    const validSaves = slots
      .filter(
        (slot): slot is Extract<SlotRead<T>, { status: "valid" }> =>
          slot.status === "valid",
      )
      .map((slot) => slot.save);
    const invalidSlots = slots
      .filter(
        (slot): slot is Extract<SlotRead<T>, { status: "invalid" }> =>
          slot.status === "invalid",
      )
      .map((slot) => slot.invalid);

    if (validSaves.length === 0) {
      if (invalidSlots.length > 0) {
        return { status: "corrupt", invalidSlots };
      }

      return { status: "empty", invalidSlots: [] };
    }

    const save = newest(validSaves);

    return {
      status: "loaded",
      save,
      recoveredFromBackup: invalidSlots.length > 0,
      invalidSlots,
    };
  }

  public save(
    payload: T,
    metadata: SaveMetadata,
  ): Promise<StoredSave<T>> {
    return this.enqueueMutation(() => this.saveNow(payload, metadata));
  }

  public async exportLatest(): Promise<string | null> {
    const current = await this.loadLatest();

    if (current.status === "empty") {
      return null;
    }

    if (current.status === "corrupt") {
      throw new SaveRepositoryError(
        "No valid save can be exported because both save slots are corrupt.",
      );
    }

    return serializeSaveEnvelope(current.save.envelope);
  }

  public importSave(
    text: string,
  ): Promise<ValidationResult<StoredSave<T>>> {
    return this.enqueueMutation(() => this.importNow(text));
  }

  public clear(): Promise<void> {
    return this.enqueueMutation(async () => {
      await Promise.all(
        (["a", "b"] as const).map((slot) =>
          this.storage.remove(getSaveSlotKey(this.namespace, slot)),
        ),
      );
    });
  }

  private async saveNow(
    payload: T,
    metadata: SaveMetadata,
  ): Promise<StoredSave<T>> {
    const current = await this.loadLatest();
    const latest = current.status === "loaded" ? current.save : null;
    const target = nextSlot(latest?.slot ?? null);
    const revision = (latest?.envelope.revision ?? 0) + 1;

    return this.write(target, payload, metadata, revision);
  }

  private async importNow(
    text: string,
  ): Promise<ValidationResult<StoredSave<T>>> {
    const parsed = parseSaveEnvelope(text);

    if (!parsed.ok) {
      return parsed;
    }

    const decoded = this.codec.decode(parsed.value.payload);

    if (!decoded.ok) {
      return invalidPayload(decoded.message);
    }

    const current = await this.loadLatest();
    const latest = current.status === "loaded" ? current.save : null;
    const target = nextSlot(latest?.slot ?? null);
    const revision = (latest?.envelope.revision ?? 0) + 1;
    const imported = await this.write(
      target,
      decoded.value,
      {
        contentVersion: parsed.value.contentVersion,
        seed: parsed.value.seed,
      },
      revision,
    );

    return { ok: true, value: imported };
  }

  private async write(
    slot: SaveSlot,
    payload: T,
    metadata: SaveMetadata,
    revision: number,
  ): Promise<StoredSave<T>> {
    const envelope = createSaveEnvelope({
      contentVersion: metadata.contentVersion,
      seed: metadata.seed,
      revision,
      savedAt: this.now().toISOString(),
      payload: this.codec.encode(payload),
    });
    const key = getSaveSlotKey(this.namespace, slot);

    await this.storage.set(key, serializeSaveEnvelope(envelope));

    const verified = await this.readSlot(slot);

    if (
      verified.status !== "valid" ||
      verified.save.envelope.checksum !== envelope.checksum
    ) {
      throw new SaveRepositoryError(
        `Save slot "${slot}" failed post-write verification.`,
      );
    }

    return verified.save;
  }

  private async readSlots(): Promise<readonly SlotRead<T>[]> {
    return Promise.all(
      (["a", "b"] as const).map((slot) => this.readSlot(slot)),
    );
  }

  private async readSlot(slot: SaveSlot): Promise<SlotRead<T>> {
    const text = await this.storage.get(getSaveSlotKey(this.namespace, slot));

    if (text === null) {
      return { status: "empty", slot };
    }

    const parsed = parseSaveEnvelope(text);

    if (!parsed.ok) {
      return {
        status: "invalid",
        invalid: { slot, issues: parsed.issues },
      };
    }

    const decoded = this.codec.decode(parsed.value.payload);

    if (!decoded.ok) {
      return {
        status: "invalid",
        invalid: {
          slot,
          issues: [
            {
              path: "$.payload",
              code: "invalid_payload",
              message: decoded.message,
            },
          ],
        },
      };
    }

    return {
      status: "valid",
      save: {
        slot,
        envelope: parsed.value,
        payload: decoded.value,
      },
    };
  }

  private enqueueMutation<Result>(
    operation: () => Promise<Result>,
  ): Promise<Result> {
    const result = this.mutationTail.then(operation);

    this.mutationTail = result.then(
      () => undefined,
      () => undefined,
    );

    return result;
  }
}

export function getSaveSlotKey(
  namespace: string,
  slot: SaveSlot,
): string {
  return `${namespace}:save:${slot}`;
}

function nextSlot(current: SaveSlot | null): SaveSlot {
  return current === "a" ? "b" : "a";
}

function newest<T>(saves: readonly StoredSave<T>[]): StoredSave<T> {
  const sorted = [...saves].sort((left, right) => {
    const revisionDifference =
      right.envelope.revision - left.envelope.revision;

    if (revisionDifference !== 0) {
      return revisionDifference;
    }

    const dateDifference = right.envelope.savedAt.localeCompare(
      left.envelope.savedAt,
    );

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return right.slot.localeCompare(left.slot);
  });
  const first = sorted[0];

  if (first === undefined) {
    throw new SaveRepositoryError("Cannot select a save from an empty list.");
  }

  return first;
}

function invalidPayload<T>(message: string): ValidationResult<T> {
  return {
    ok: false,
    issues: [
      {
        path: "$.payload",
        code: "invalid_payload",
        message,
      },
    ],
  };
}
