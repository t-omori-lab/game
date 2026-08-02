import { R04_LIVE_PROFILE } from "./r04/R04LiveProfile";

export type CameraCompositionPhase =
  | "idle"
  | "acquire"
  | "windup"
  | "hit"
  | "recover";

export interface CameraCompositionInput {
  readonly playerX: number;
  readonly playerY: number;
  readonly facingX: number;
  readonly facingY: number;
  readonly phase?: CameraCompositionPhase;
  readonly targetX?: number;
  readonly targetY?: number;
}

export interface CameraComposition {
  readonly mode: "centered" | "explore" | "combat";
  readonly targetX: number;
  readonly targetY: number;
}

export type CameraCompositionProfile = "baseline" | "north-star" | "r04";

export interface FixedCameraOffset {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface MovementVector {
  readonly moveX: number;
  readonly moveY: number;
}

export type ActorFrontAxis = "+z" | "-z";

/** Shared by rendering and screen-relative controls so their axes cannot drift. */
export const FIXED_CAMERA_OFFSET: FixedCameraOffset = Object.freeze({
  x: 510,
  y: 680,
  z: 510,
});

const EXPLORE_LOOK_AHEAD = 46;
const COMBAT_TARGET_WEIGHT = 0.38;
const MAX_COMBAT_OFFSET = 72;

/**
 * Rotates screen-space input onto the ground plane of the fixed camera.
 *
 * `screenY` follows DOM/gamepad convention: negative is screen-up. The
 * simulation continues to own world X/Y, so replays and collision remain
 * independent of the renderer while Up/W always moves visually upward.
 */
export function screenMovementToWorld(
  screenX: number,
  screenY: number,
  cameraOffset: Pick<FixedCameraOffset, "x" | "z"> = FIXED_CAMERA_OFFSET,
): MovementVector {
  const offsetLength = Math.hypot(cameraOffset.x, cameraOffset.z);
  if (offsetLength <= Number.EPSILON) {
    return { moveX: screenX, moveY: screenY };
  }

  const rightX = cameraOffset.z / offsetLength;
  const rightY = -cameraOffset.x / offsetLength;
  const downX = cameraOffset.x / offsetLength;
  const downY = cameraOffset.z / offsetLength;

  return {
    moveX: screenX * rightX + screenY * downX,
    moveY: screenX * rightY + screenY * downY,
  };
}

/** Rotates an authored local front axis onto the simulation facing vector. */
export function composeActorFacingRotation(
  facingX: number,
  facingY: number,
  frontAxis: ActorFrontAxis = "-z",
): number {
  return frontAxis === "+z"
    ? Math.atan2(facingX, facingY)
    : Math.atan2(-facingX, -facingY);
}

/**
 * Keeps the hero out of a mechanically centered framing while remaining a
 * pure presentation rule. Simulation coordinates and combat targeting stay
 * authoritative elsewhere.
 */
export function composeCameraTarget(
  input: CameraCompositionInput,
  profile: CameraCompositionProfile = "north-star",
): CameraComposition {
  if (profile === "baseline") {
    return {
      mode: "centered",
      targetX: input.playerX,
      targetY: input.playerY,
    };
  }

  const facingLength = Math.hypot(input.facingX, input.facingY);
  const facingX = facingLength > Number.EPSILON
    ? input.facingX / facingLength
    : 0;
  const facingY = facingLength > Number.EPSILON
    ? input.facingY / facingLength
    : -1;
  const hasCombatTarget =
    input.phase !== undefined &&
    input.phase !== "idle" &&
    Number.isFinite(input.targetX) &&
    Number.isFinite(input.targetY);
  const exploreLookAhead = profile === "r04"
    ? R04_LIVE_PROFILE.camera.exploreLookAhead
    : EXPLORE_LOOK_AHEAD;
  const combatTargetWeight = profile === "r04"
    ? R04_LIVE_PROFILE.camera.combatTargetWeight
    : COMBAT_TARGET_WEIGHT;
  const maximumCombatOffset = profile === "r04"
    ? R04_LIVE_PROFILE.camera.maximumCombatOffset
    : MAX_COMBAT_OFFSET;

  if (!hasCombatTarget) {
    return {
      mode: "explore",
      targetX: input.playerX + facingX * exploreLookAhead,
      targetY: input.playerY + facingY * exploreLookAhead,
    };
  }

  const targetOffset = clampVectorMagnitude(
    (input.targetX as number) - input.playerX,
    (input.targetY as number) - input.playerY,
    maximumCombatOffset,
  );
  return {
    mode: "combat",
    targetX: input.playerX + targetOffset.x * combatTargetWeight,
    targetY: input.playerY + targetOffset.y * combatTargetWeight,
  };
}

function clampVectorMagnitude(
  x: number,
  y: number,
  maximum: number,
): { readonly x: number; readonly y: number } {
  const length = Math.hypot(x, y);
  if (length <= maximum || length <= Number.EPSILON) {
    return { x, y };
  }

  const scale = maximum / length;
  return { x: x * scale, y: y * scale };
}
