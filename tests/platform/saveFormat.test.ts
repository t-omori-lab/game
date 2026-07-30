import { describe, expect, it } from "vitest";
import {
  MAX_SAVE_EXPORT_CHARACTERS,
  MAX_SAVE_PAYLOAD_DEPTH,
  SAVE_FORMAT,
  SAVE_VERSION,
  SaveFormatError,
  createSaveEnvelope,
  type JsonValue,
  parseSaveEnvelope,
  serializeSaveEnvelope,
  validateSaveEnvelope,
} from "../../src/platform/saveFormat";

const SAVED_AT = "2026-07-30T01:23:45.000Z";

describe("save envelope format", () => {
  it("creates a versioned envelope with a deterministic checksum", () => {
    const left = createSaveEnvelope({
      contentVersion: "prototype-1",
      seed: 42,
      revision: 7,
      savedAt: SAVED_AT,
      payload: { z: 3, nested: { b: true, a: "trail" } },
    });
    const right = createSaveEnvelope({
      contentVersion: "prototype-1",
      seed: 42,
      revision: 7,
      savedAt: SAVED_AT,
      payload: { nested: { a: "trail", b: true }, z: 3 },
    });

    expect(left.format).toBe(SAVE_FORMAT);
    expect(left.saveVersion).toBe(SAVE_VERSION);
    expect(left.checksum).toBe(right.checksum);
    expect(left.checksum).toMatch(/^fnv1a32:[0-9a-f]{8}$/);
  });

  it("round-trips an exported save without a browser", () => {
    const envelope = createSaveEnvelope({
      contentVersion: "prototype-1",
      seed: 0xffff_ffff,
      revision: 1,
      savedAt: SAVED_AT,
      payload: {
        traveler: "灯",
        inventory: ["map", "relic"],
        alive: true,
      },
    });

    const parsed = parseSaveEnvelope(serializeSaveEnvelope(envelope));

    expect(parsed).toEqual({ ok: true, value: envelope });
  });

  it("detects payload tampering through the checksum", () => {
    const envelope = createSaveEnvelope({
      contentVersion: "prototype-1",
      seed: 19,
      revision: 2,
      savedAt: SAVED_AT,
      payload: { health: 5 },
    });
    const result = validateSaveEnvelope({
      ...envelope,
      payload: { health: 500 },
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.issues).toContainEqual(
        expect.objectContaining({ code: "checksum_mismatch" }),
      );
    }
  });

  it("rejects malformed JSON and unexpected envelope fields", () => {
    const malformed = parseSaveEnvelope("{");
    expect(malformed.ok).toBe(false);

    const envelope = createSaveEnvelope({
      contentVersion: "prototype-1",
      seed: 1,
      revision: 1,
      savedAt: SAVED_AT,
      payload: null,
    });
    const withUnexpectedField = validateSaveEnvelope({
      ...envelope,
      developerOverride: true,
    });

    expect(withUnexpectedField.ok).toBe(false);

    if (!withUnexpectedField.ok) {
      expect(withUnexpectedField.issues).toContainEqual(
        expect.objectContaining({
          code: "unexpected_field",
          path: "$.developerOverride",
        }),
      );
    }
  });

  it("rejects sparse arrays before calculating their checksum", () => {
    const sparsePayload: JsonValue[] = [];
    sparsePayload.length = 2;
    sparsePayload[1] = "relic";

    expect(() =>
      createSaveEnvelope({
        contentVersion: "prototype-1",
        seed: 1,
        revision: 1,
        savedAt: SAVED_AT,
        payload: sparsePayload,
      }),
    ).toThrow(SaveFormatError);

    try {
      createSaveEnvelope({
        contentVersion: "prototype-1",
        seed: 1,
        revision: 1,
        savedAt: SAVED_AT,
        payload: sparsePayload,
      });
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(SaveFormatError);

      if (error instanceof SaveFormatError) {
        expect(error.issues).toContainEqual(
          expect.objectContaining({
            code: "invalid_payload",
            path: "$.payload[0]",
          }),
        );
      }
    }
  });

  it("bounds import size and payload depth", () => {
    const oversized = parseSaveEnvelope(
      "x".repeat(MAX_SAVE_EXPORT_CHARACTERS + 1),
    );
    expect(oversized.ok).toBe(false);

    if (!oversized.ok) {
      expect(oversized.issues).toContainEqual(
        expect.objectContaining({ code: "limit_exceeded" }),
      );
    }

    let deepPayload: JsonValue = null;

    for (let depth = 0; depth <= MAX_SAVE_PAYLOAD_DEPTH; depth += 1) {
      deepPayload = { next: deepPayload };
    }

    expect(() =>
      createSaveEnvelope({
        contentVersion: "prototype-1",
        seed: 1,
        revision: 1,
        savedAt: SAVED_AT,
        payload: deepPayload,
      }),
    ).toThrow(SaveFormatError);
  });
});
