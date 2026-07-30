import type { JsonValue } from "../platform/saveFormat";
import type {
  PayloadDecodeResult,
  SavePayloadCodec,
} from "../platform/saveRepository";
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  type SimulationState,
} from "../sim";

export const WORLD_LEGACY_VERSION = 1 as const;
export const WORLD_LEGACY_CONTENT_VERSION = "world-legacy-1" as const;
export const MAX_LEGACY_FIELD_MARKS = 12;

const MAX_COUNTER = 0xffff_ffff;
const MAX_LEVEL = 10_000;
const FULL_ROTATION = Math.PI * 2;

export type WorldLegacyOutcome = "won" | "lost";

export interface LegacyFieldMark {
  readonly x: number;
  readonly y: number;
  readonly boss: boolean;
  readonly rotation: number;
}

export interface WorldLegacy {
  readonly version: typeof WORLD_LEGACY_VERSION;
  readonly totalRuns: number;
  readonly bestKills: number;
  readonly lastOutcome: WorldLegacyOutcome | null;
  readonly lastKills: number;
  readonly lastLevel: number;
  readonly lastElapsedTicks: number;
  readonly lastSeed: number | null;
  readonly fieldMarks: readonly LegacyFieldMark[];
}

const ROOT_KEYS = new Set([
  "version",
  "totalRuns",
  "bestKills",
  "lastOutcome",
  "lastKills",
  "lastLevel",
  "lastElapsedTicks",
  "lastSeed",
  "fieldMarks",
]);

const FIELD_MARK_KEYS = new Set(["x", "y", "boss", "rotation"]);

export function createEmptyWorldLegacy(): WorldLegacy {
  return {
    version: WORLD_LEGACY_VERSION,
    totalRuns: 0,
    bestKills: 0,
    lastOutcome: null,
    lastKills: 0,
    lastLevel: 0,
    lastElapsedTicks: 0,
    lastSeed: null,
    fieldMarks: [],
  };
}

export function recordCompletedRun(
  previous: WorldLegacy,
  completedState: SimulationState,
  fieldMarks: readonly LegacyFieldMark[],
): WorldLegacy {
  assertValidLegacy(previous);

  if (
    completedState.status !== "won" &&
    completedState.status !== "lost"
  ) {
    throw new TypeError("A world legacy can only record a completed run.");
  }

  assertIntegerInRange(
    completedState.kills,
    0,
    MAX_COUNTER,
    "completedState.kills",
  );
  assertIntegerInRange(
    completedState.player.level,
    1,
    MAX_LEVEL,
    "completedState.player.level",
  );
  assertIntegerInRange(
    completedState.elapsedTicks,
    0,
    MAX_COUNTER,
    "completedState.elapsedTicks",
  );
  assertIntegerInRange(
    completedState.seed,
    0,
    MAX_COUNTER,
    "completedState.seed",
  );

  if (previous.totalRuns === MAX_COUNTER) {
    throw new RangeError("World legacy run counter is exhausted.");
  }

  const retainedMarks = fieldMarks.slice(-MAX_LEGACY_FIELD_MARKS);
  retainedMarks.forEach((mark, index) => {
    assertValidFieldMark(mark, `fieldMarks[${index}]`);
  });

  return {
    version: WORLD_LEGACY_VERSION,
    totalRuns: previous.totalRuns + 1,
    bestKills: Math.max(previous.bestKills, completedState.kills),
    lastOutcome: completedState.status,
    lastKills: completedState.kills,
    lastLevel: completedState.player.level,
    lastElapsedTicks: completedState.elapsedTicks,
    lastSeed: completedState.seed,
    fieldMarks: retainedMarks.map((mark) => ({ ...mark })),
  };
}

export const worldLegacyCodec: SavePayloadCodec<WorldLegacy> = {
  encode(value): JsonValue {
    assertValidLegacy(value);

    return {
      version: value.version,
      totalRuns: value.totalRuns,
      bestKills: value.bestKills,
      lastOutcome: value.lastOutcome,
      lastKills: value.lastKills,
      lastLevel: value.lastLevel,
      lastElapsedTicks: value.lastElapsedTicks,
      lastSeed: value.lastSeed,
      fieldMarks: value.fieldMarks.map((mark) => ({
        x: mark.x,
        y: mark.y,
        boss: mark.boss,
        rotation: mark.rotation,
      })),
    };
  },

  decode(value): PayloadDecodeResult<WorldLegacy> {
    try {
      return { ok: true, value: decodeWorldLegacy(value) };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "World legacy payload is invalid.",
      };
    }
  },
};

function decodeWorldLegacy(value: JsonValue): WorldLegacy {
  if (!isRecord(value)) {
    throw new TypeError("World legacy payload must be an object.");
  }

  assertExactKeys(value, ROOT_KEYS, "World legacy payload");

  if (value["version"] !== WORLD_LEGACY_VERSION) {
    throw new TypeError(
      `World legacy version must be ${WORLD_LEGACY_VERSION}.`,
    );
  }

  const totalRuns = readInteger(
    value["totalRuns"],
    0,
    MAX_COUNTER,
    "totalRuns",
  );
  const bestKills = readInteger(
    value["bestKills"],
    0,
    MAX_COUNTER,
    "bestKills",
  );
  const lastKills = readInteger(
    value["lastKills"],
    0,
    MAX_COUNTER,
    "lastKills",
  );
  const lastLevel = readInteger(
    value["lastLevel"],
    0,
    MAX_LEVEL,
    "lastLevel",
  );
  const lastElapsedTicks = readInteger(
    value["lastElapsedTicks"],
    0,
    MAX_COUNTER,
    "lastElapsedTicks",
  );
  const lastOutcome = readOutcome(value["lastOutcome"]);
  const lastSeed = readNullableSeed(value["lastSeed"]);
  const fieldMarks = readFieldMarks(value["fieldMarks"]);

  const legacy: WorldLegacy = {
    version: WORLD_LEGACY_VERSION,
    totalRuns,
    bestKills,
    lastOutcome,
    lastKills,
    lastLevel,
    lastElapsedTicks,
    lastSeed,
    fieldMarks,
  };

  assertLegacyInvariants(legacy);
  return legacy;
}

function readFieldMarks(value: JsonValue | undefined): LegacyFieldMark[] {
  if (!Array.isArray(value)) {
    throw new TypeError("fieldMarks must be an array.");
  }

  if (value.length > MAX_LEGACY_FIELD_MARKS) {
    throw new RangeError(
      `fieldMarks must contain at most ${MAX_LEGACY_FIELD_MARKS} entries.`,
    );
  }

  const marks: LegacyFieldMark[] = [];

  for (let index = 0; index < value.length; index += 1) {
    if (!(index in value)) {
      throw new TypeError("fieldMarks must not be a sparse array.");
    }

    const candidate = value[index];

    if (!isRecord(candidate)) {
      throw new TypeError(`fieldMarks[${index}] must be an object.`);
    }

    assertExactKeys(
      candidate,
      FIELD_MARK_KEYS,
      `fieldMarks[${index}]`,
    );

    const boss = candidate["boss"];

    if (typeof boss !== "boolean") {
      throw new TypeError(`fieldMarks[${index}].boss must be boolean.`);
    }

    const mark: LegacyFieldMark = {
      x: readFiniteNumber(
        candidate["x"],
        0,
        ARENA_WIDTH,
        `fieldMarks[${index}].x`,
      ),
      y: readFiniteNumber(
        candidate["y"],
        0,
        ARENA_HEIGHT,
        `fieldMarks[${index}].y`,
      ),
      boss,
      rotation: readFiniteNumber(
        candidate["rotation"],
        0,
        FULL_ROTATION,
        `fieldMarks[${index}].rotation`,
        false,
      ),
    };

    marks.push(mark);
  }

  return marks;
}

function readOutcome(
  value: JsonValue | undefined,
): WorldLegacyOutcome | null {
  if (value === null || value === "won" || value === "lost") {
    return value;
  }

  throw new TypeError('lastOutcome must be "won", "lost", or null.');
}

function readNullableSeed(value: JsonValue | undefined): number | null {
  if (value === null) {
    return null;
  }

  return readInteger(value, 0, MAX_COUNTER, "lastSeed");
}

function readInteger(
  value: JsonValue | undefined,
  minimum: number,
  maximum: number,
  label: string,
): number {
  assertIntegerInRange(value, minimum, maximum, label);
  return value;
}

function readFiniteNumber(
  value: JsonValue | undefined,
  minimum: number,
  maximum: number,
  label: string,
  includeMaximum = true,
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < minimum ||
    (includeMaximum ? value > maximum : value >= maximum)
  ) {
    const upper = includeMaximum ? "at most" : "less than";
    throw new RangeError(
      `${label} must be finite, at least ${minimum}, and ${upper} ${maximum}.`,
    );
  }

  return value;
}

function assertValidLegacy(legacy: WorldLegacy): void {
  const decoded = worldLegacyCodec.decode(legacy as unknown as JsonValue);

  if (!decoded.ok) {
    throw new TypeError(decoded.message);
  }
}

function assertLegacyInvariants(legacy: WorldLegacy): void {
  if (legacy.bestKills < legacy.lastKills) {
    throw new RangeError("bestKills cannot be lower than lastKills.");
  }

  if (legacy.totalRuns === 0) {
    if (
      legacy.bestKills !== 0 ||
      legacy.lastOutcome !== null ||
      legacy.lastKills !== 0 ||
      legacy.lastLevel !== 0 ||
      legacy.lastElapsedTicks !== 0 ||
      legacy.lastSeed !== null ||
      legacy.fieldMarks.length !== 0
    ) {
      throw new TypeError(
        "An empty world legacy cannot contain completed-run data.",
      );
    }
    return;
  }

  if (legacy.lastOutcome === null || legacy.lastSeed === null) {
    throw new TypeError(
      "A non-empty world legacy requires an outcome and seed.",
    );
  }

  if (legacy.lastLevel < 1) {
    throw new RangeError(
      "A non-empty world legacy requires lastLevel to be at least 1.",
    );
  }
}

function assertValidFieldMark(
  mark: LegacyFieldMark,
  label: string,
): void {
  readFiniteNumber(mark.x, 0, ARENA_WIDTH, `${label}.x`);
  readFiniteNumber(mark.y, 0, ARENA_HEIGHT, `${label}.y`);
  readFiniteNumber(
    mark.rotation,
    0,
    FULL_ROTATION,
    `${label}.rotation`,
    false,
  );

  if (typeof mark.boss !== "boolean") {
    throw new TypeError(`${label}.boss must be boolean.`);
  }
}

function assertIntegerInRange(
  value: unknown,
  minimum: number,
  maximum: number,
  label: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < minimum ||
    value > maximum
  ) {
    throw new RangeError(
      `${label} must be an integer from ${minimum} through ${maximum}.`,
    );
  }
}

function assertExactKeys(
  value: Readonly<Record<string, JsonValue>>,
  expected: ReadonlySet<string>,
  label: string,
): void {
  const actualKeys = Object.keys(value);

  for (const key of actualKeys) {
    if (!expected.has(key)) {
      throw new TypeError(`${label} contains unexpected field "${key}".`);
    }
  }

  for (const key of expected) {
    if (!(key in value)) {
      throw new TypeError(`${label} is missing field "${key}".`);
    }
  }
}

function isRecord(
  value: unknown,
): value is Readonly<Record<string, JsonValue>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
