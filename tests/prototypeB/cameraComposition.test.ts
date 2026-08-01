import { describe, expect, it } from "vitest";

import {
  composeCameraTarget,
} from "../../src/prototypeB/render/CameraComposition";

describe("North Star camera composition", () => {
  it("preserves the centered camera contract for the baseline route", () => {
    expect(
      composeCameraTarget(
        {
          playerX: 400,
          playerY: 700,
          facingX: 1,
          facingY: 0,
          phase: "windup",
          targetX: 620,
          targetY: 500,
        },
        "baseline",
      ),
    ).toEqual({
      mode: "centered",
      targetX: 400,
      targetY: 700,
    });
  });

  it("frames open exploration ahead of the hero instead of dead center", () => {
    expect(
      composeCameraTarget({
        playerX: 400,
        playerY: 700,
        facingX: 3,
        facingY: 4,
        phase: "idle",
      }),
    ).toEqual({
      mode: "explore",
      targetX: 427.6,
      targetY: 736.8,
    });
  });

  it("shares combat framing with the target but caps distant pull", () => {
    const composition = composeCameraTarget({
      playerX: 400,
      playerY: 700,
      facingX: 1,
      facingY: 0,
      phase: "windup",
      targetX: 620,
      targetY: 500,
    });

    expect(composition.mode).toBe("combat");
    expect(composition.targetX).toBeCloseTo(420.2448, 4);
    expect(composition.targetY).toBeCloseTo(681.5957, 4);
    expect(
      Math.hypot(
        composition.targetX - 400,
        composition.targetY - 700,
      ),
    ).toBeCloseTo(72 * 0.38);
  });

  it("falls back to exploration when presentation lacks a usable target", () => {
    expect(
      composeCameraTarget({
        playerX: 12,
        playerY: 34,
        facingX: 0,
        facingY: 0,
        phase: "acquire",
      }),
    ).toEqual({
      mode: "explore",
      targetX: 12,
      targetY: -12,
    });
  });
});
