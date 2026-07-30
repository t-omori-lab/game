import { describe, expect, it } from "vitest";
import { rebaseStaleBeatAt } from "../../src/prototypeB/audio/RelicSoundscape";

describe("Prototype B music scheduling", () => {
  it("keeps an already-future beat unchanged", () => {
    expect(rebaseStaleBeatAt(12.4, 12)).toBe(12.4);
  });

  it("rebases a beat left behind during a long pause into the lookahead window", () => {
    expect(rebaseStaleBeatAt(4, 12)).toBeCloseTo(12.08);
  });

  it("recovers from an invalid scheduled time without creating a past beat", () => {
    expect(rebaseStaleBeatAt(Number.NaN, 7, 0.12)).toBeCloseTo(7.12);
  });
});
