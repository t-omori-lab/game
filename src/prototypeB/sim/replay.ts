import { createPrototypeBState, stepPrototypeB } from "./simulation";
import type {
  PrototypeBCommand,
  PrototypeBReplayResult,
  PrototypeBSeed,
  PrototypeBState,
} from "./types";

function serializeNumber(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError("Prototype B state hashes require finite numbers.");
  }

  return JSON.stringify(value);
}

export function stableSerializePrototypeB(value: unknown): string {
  if (value === null) {
    return "null";
  }

  switch (typeof value) {
    case "boolean":
      return value ? "true" : "false";
    case "number":
      return serializeNumber(value);
    case "string":
      return JSON.stringify(value);
    case "object": {
      if (Array.isArray(value)) {
        return `[${value
          .map((item) => stableSerializePrototypeB(item))
          .join(",")}]`;
      }

      const record = value as Record<string, unknown>;
      const properties = Object.keys(record)
        .sort()
        .map(
          (key) =>
            `${JSON.stringify(key)}:${stableSerializePrototypeB(record[key])}`,
        );

      return `{${properties.join(",")}}`;
    }
    default:
      throw new TypeError(
        `Unsupported value in Prototype B serialization: ${typeof value}`,
      );
  }
}

function hashText(value: string): string {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function hashPrototypeBState(state: PrototypeBState): string {
  return hashText(stableSerializePrototypeB(state));
}

export function runPrototypeBReplay(
  seed: PrototypeBSeed,
  commands: readonly PrototypeBCommand[],
): PrototypeBReplayResult {
  let state = createPrototypeBState(seed);
  const events: PrototypeBReplayResult["events"] = [];
  const hashes = [hashPrototypeBState(state)];

  for (const command of commands) {
    const result = stepPrototypeB(state, command);
    state = result.state;
    events.push(...result.events);
    hashes.push(hashPrototypeBState(state));
  }

  return { state, events, hashes };
}
