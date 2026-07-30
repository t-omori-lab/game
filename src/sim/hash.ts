import type { SimulationState } from "./types";

function serializeNumber(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError("Simulation hashes require finite numbers.");
  }

  return JSON.stringify(value);
}

export function stableSerialize(value: unknown): string {
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
        return `[${value.map((item) => stableSerialize(item)).join(",")}]`;
      }

      const record = value as Record<string, unknown>;
      const properties = Object.keys(record)
        .sort()
        .map(
          (key) =>
            `${JSON.stringify(key)}:${stableSerialize(record[key])}`,
        );

      return `{${properties.join(",")}}`;
    }
    default:
      throw new TypeError(`Unsupported value in stable serialization: ${typeof value}`);
  }
}

export function hashText(value: string): string {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function hashSimulationState(state: SimulationState): string {
  return hashText(stableSerialize(state));
}
