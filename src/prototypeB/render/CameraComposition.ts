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

export type CameraCompositionProfile = "baseline" | "north-star";

const EXPLORE_LOOK_AHEAD = 46;
const COMBAT_TARGET_WEIGHT = 0.38;
const MAX_COMBAT_OFFSET = 72;

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

  if (!hasCombatTarget) {
    return {
      mode: "explore",
      targetX: input.playerX + facingX * EXPLORE_LOOK_AHEAD,
      targetY: input.playerY + facingY * EXPLORE_LOOK_AHEAD,
    };
  }

  const targetOffset = clampVectorMagnitude(
    (input.targetX as number) - input.playerX,
    (input.targetY as number) - input.playerY,
    MAX_COMBAT_OFFSET,
  );
  return {
    mode: "combat",
    targetX: input.playerX + targetOffset.x * COMBAT_TARGET_WEIGHT,
    targetY: input.playerY + targetOffset.y * COMBAT_TARGET_WEIGHT,
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
