import { describe, expect, it } from "vitest";
import {
  MAX_LEGACY_FIELD_MARKS,
  WORLD_LEGACY_CONTENT_VERSION,
  createEmptyWorldLegacy,
  recordCompletedRun,
  worldLegacyCodec,
  type LegacyFieldMark,
  type WorldLegacy,
} from "../../src/session";
import { createInitialState, type SimulationState } from "../../src/sim";

function completedState(
  overrides: {
    readonly status?: "won" | "lost";
    readonly kills?: number;
    readonly level?: number;
    readonly elapsedTicks?: number;
    readonly seed?: number;
  } = {},
): SimulationState {
  const initial = createInitialState(overrides.seed ?? 91);

  return {
    ...initial,
    status: overrides.status ?? "lost",
    kills: overrides.kills ?? 7,
    elapsedTicks: overrides.elapsedTicks ?? 1_234,
    player: {
      ...initial.player,
      level: overrides.level ?? 3,
    },
  };
}

function makeMark(index: number): LegacyFieldMark {
  return {
    x: 40 + index * 10,
    y: 30 + index * 5,
    boss: index % 5 === 0,
    rotation: (index * 0.3) % (Math.PI * 2),
  };
}

describe("WorldLegacy", () => {
  it("creates an explicit no-runs-yet state", () => {
    expect(WORLD_LEGACY_CONTENT_VERSION).toBe("world-legacy-1");
    expect(createEmptyWorldLegacy()).toEqual({
      version: 1,
      totalRuns: 0,
      bestKills: 0,
      lastOutcome: null,
      lastKills: 0,
      lastLevel: 0,
      lastElapsedTicks: 0,
      lastSeed: null,
      fieldMarks: [],
    });
  });

  it("records a completed run and retains only the latest twelve marks", () => {
    const state = completedState({
      status: "won",
      kills: 24,
      level: 6,
      elapsedTicks: 15_020,
      seed: 4_294_967_295,
    });
    const marks = Array.from(
      { length: MAX_LEGACY_FIELD_MARKS + 3 },
      (_, index) => makeMark(index),
    );

    const result = recordCompletedRun(
      createEmptyWorldLegacy(),
      state,
      marks,
    );

    expect(result).toEqual({
      version: 1,
      totalRuns: 1,
      bestKills: 24,
      lastOutcome: "won",
      lastKills: 24,
      lastLevel: 6,
      lastElapsedTicks: 15_020,
      lastSeed: 4_294_967_295,
      fieldMarks: marks.slice(-MAX_LEGACY_FIELD_MARKS),
    });
    expect(result.fieldMarks[0]).not.toBe(
      marks[marks.length - MAX_LEGACY_FIELD_MARKS],
    );
  });

  it("keeps the historic best while replacing last-run facts", () => {
    const first = recordCompletedRun(
      createEmptyWorldLegacy(),
      completedState({ kills: 38, level: 8 }),
      [makeMark(0)],
    );
    const second = recordCompletedRun(
      first,
      completedState({
        status: "lost",
        kills: 11,
        level: 4,
        elapsedTicks: 777,
        seed: 72,
      }),
      [makeMark(1)],
    );

    expect(second.totalRuns).toBe(2);
    expect(second.bestKills).toBe(38);
    expect(second.lastKills).toBe(11);
    expect(second.lastOutcome).toBe("lost");
    expect(second.lastSeed).toBe(72);
    expect(second.fieldMarks).toEqual([makeMark(1)]);
  });

  it("round-trips through the save payload codec without sharing arrays", () => {
    const legacy = recordCompletedRun(
      createEmptyWorldLegacy(),
      completedState({ status: "won", kills: 19 }),
      [makeMark(2), makeMark(3)],
    );
    const encoded = worldLegacyCodec.encode(legacy);
    const decoded = worldLegacyCodec.decode(encoded);

    expect(decoded).toEqual({ ok: true, value: legacy });

    if (decoded.ok) {
      expect(decoded.value).not.toBe(legacy);
      expect(decoded.value.fieldMarks).not.toBe(legacy.fieldMarks);
      expect(decoded.value.fieldMarks[0]).not.toBe(legacy.fieldMarks[0]);
    }
  });

  it.each([
    ["unexpected root field", { unexpected: true }],
    ["non-finite coordinate", { markX: Number.NaN }],
    ["out-of-range coordinate", { markX: 961 }],
    ["out-of-range rotation", { rotation: Math.PI * 2 }],
    ["too many marks", { markCount: MAX_LEGACY_FIELD_MARKS + 1 }],
    ["fractional counter", { totalRuns: 1.5 }],
    ["invalid empty invariant", { lastOutcome: "lost" }],
  ])("rejects %s", (_label, mutation) => {
    const empty = createEmptyWorldLegacy();
    const markCount =
      "markCount" in mutation && typeof mutation.markCount === "number"
        ? mutation.markCount
        : 0;
    const marks = Array.from({ length: markCount }, (_, index) => ({
      ...makeMark(index),
      ...("markX" in mutation ? { x: mutation.markX } : {}),
      ...("rotation" in mutation
        ? { rotation: mutation.rotation }
        : {}),
    }));
    const candidate: Record<string, unknown> = {
      ...empty,
      ...("totalRuns" in mutation
        ? { totalRuns: mutation.totalRuns }
        : {}),
      ...("lastOutcome" in mutation
        ? { lastOutcome: mutation.lastOutcome }
        : {}),
      fieldMarks:
        marks.length > 0
          ? marks
          : "markX" in mutation || "rotation" in mutation
            ? [
                {
                  ...makeMark(0),
                  ...("markX" in mutation ? { x: mutation.markX } : {}),
                  ...("rotation" in mutation
                    ? { rotation: mutation.rotation }
                    : {}),
                },
              ]
            : [],
      ...("unexpected" in mutation ? { unexpected: mutation.unexpected } : {}),
    };

    expect(
      worldLegacyCodec.decode(
        candidate as ReturnType<typeof worldLegacyCodec.encode>,
      ).ok,
    ).toBe(false);
  });

  it("rejects unfinished runs and invalid runtime marks", () => {
    expect(() =>
      recordCompletedRun(
        createEmptyWorldLegacy(),
        createInitialState(1),
        [],
      ),
    ).toThrow(/completed run/i);
    expect(() =>
      recordCompletedRun(
        createEmptyWorldLegacy(),
        completedState(),
        [{ ...makeMark(0), y: Number.POSITIVE_INFINITY }],
      ),
    ).toThrow(/finite/i);
  });

  it("rejects inconsistent non-empty payloads", () => {
    const candidate: WorldLegacy = {
      ...createEmptyWorldLegacy(),
      totalRuns: 1,
      bestKills: 1,
      lastKills: 2,
      lastLevel: 1,
      lastElapsedTicks: 12,
      lastOutcome: "lost",
      lastSeed: 1,
    };

    expect(
      worldLegacyCodec.decode(
        candidate as unknown as ReturnType<
          typeof worldLegacyCodec.encode
        >,
      ),
    ).toEqual(expect.objectContaining({ ok: false }));
  });
});
