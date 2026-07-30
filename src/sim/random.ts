import type { SimulationSeed } from "./types";

const NON_ZERO_FALLBACK = 0x6d2b79f5;
const UINT32_RANGE = 0x1_0000_0000;

function hashSeedText(value: string): number {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return hash >>> 0;
}

export function normalizeSeed(seed: SimulationSeed): number {
  const normalized =
    typeof seed === "number" && Number.isFinite(seed)
      ? Math.trunc(seed) >>> 0
      : hashSeedText(String(seed));

  return normalized === 0 ? NON_ZERO_FALLBACK : normalized;
}

export interface RandomDraw {
  state: number;
  value: number;
}

export function nextRandom(randomState: number): RandomDraw {
  let nextState = randomState >>> 0;

  if (nextState === 0) {
    nextState = NON_ZERO_FALLBACK;
  }

  nextState ^= nextState << 13;
  nextState ^= nextState >>> 17;
  nextState ^= nextState << 5;
  nextState >>>= 0;

  return {
    state: nextState,
    value: nextState / UINT32_RANGE,
  };
}
