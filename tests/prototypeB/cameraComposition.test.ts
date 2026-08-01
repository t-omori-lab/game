import { describe, expect, it } from "vitest";
import * as THREE from "three";

import {
  FIXED_CAMERA_OFFSET,
  composeCameraTarget,
  screenMovementToWorld,
} from "../../src/prototypeB/render/CameraComposition";

describe("North Star camera composition", () => {
  it("maps cardinal controls to cardinal screen movement under the diagonal camera", () => {
    const up = screenMovementToWorld(0, -1);
    const down = screenMovementToWorld(0, 1);
    const left = screenMovementToWorld(-1, 0);
    const right = screenMovementToWorld(1, 0);

    expect(up.moveX).toBeCloseTo(-Math.SQRT1_2);
    expect(up.moveY).toBeCloseTo(-Math.SQRT1_2);
    expect(down.moveX).toBeCloseTo(Math.SQRT1_2);
    expect(down.moveY).toBeCloseTo(Math.SQRT1_2);
    expect(left.moveX).toBeCloseTo(-Math.SQRT1_2);
    expect(left.moveY).toBeCloseTo(Math.SQRT1_2);
    expect(right.moveX).toBeCloseTo(Math.SQRT1_2);
    expect(right.moveY).toBeCloseTo(-Math.SQRT1_2);
  });

  it("preserves analog magnitude while rotating screen input into world space", () => {
    const movement = screenMovementToWorld(0.6, -0.4);

    expect(Math.hypot(movement.moveX, movement.moveY)).toBeCloseTo(
      Math.hypot(0.6, -0.4),
    );
  });

  it("projects Up and Right toward the matching screen edges", () => {
    const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 2_000);
    camera.position.set(
      FIXED_CAMERA_OFFSET.x,
      FIXED_CAMERA_OFFSET.y,
      FIXED_CAMERA_OFFSET.z,
    );
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld(true);

    const origin = new THREE.Vector3(0, 0, 0).project(camera);
    const up = screenMovementToWorld(0, -1);
    const right = screenMovementToWorld(1, 0);
    const projectedUp = new THREE.Vector3(
      up.moveX * 10,
      0,
      up.moveY * 10,
    ).project(camera);
    const projectedRight = new THREE.Vector3(
      right.moveX * 10,
      0,
      right.moveY * 10,
    ).project(camera);

    expect(projectedUp.y).toBeGreaterThan(origin.y);
    expect(projectedUp.x).toBeCloseTo(origin.x);
    expect(projectedRight.x).toBeGreaterThan(origin.x);
    expect(projectedRight.y).toBeCloseTo(origin.y);
  });

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
