import { WEAPON_DEFINITIONS } from "./content";
import type {
  EnemyState,
  PrototypeBCommand,
  PrototypeBState,
  WeaponId,
} from "./types";

export type SemiAutoCombatPhase =
  | "idle"
  | "acquire"
  | "windup"
  | "hit"
  | "recover";

export interface SemiAutoCombatProfile {
  readonly buildId: "counter-cutter" | "breach-driver";
  readonly acquireRange: number;
  readonly dropRange: number;
  readonly hitRange: number;
  readonly minimumFacingAlignment: number;
  readonly windupTicks: number;
  readonly recoveryTicks: number;
  readonly windupMovementScale: number;
  readonly hitMovementScale: number;
  readonly recoveryMovementScale: number;
}

export const SEMI_AUTO_COMBAT_PROFILES = {
  blade: {
    buildId: "counter-cutter",
    acquireRange: 132,
    dropRange: 164,
    hitRange: 108,
    minimumFacingAlignment: Math.max(
      0,
      WEAPON_DEFINITIONS.blade.arcCosine,
    ),
    windupTicks: 5,
    recoveryTicks: 9,
    windupMovementScale: 1,
    hitMovementScale: 0.9,
    recoveryMovementScale: 1,
  },
  impact: {
    buildId: "breach-driver",
    acquireRange: 96,
    dropRange: 128,
    hitRange: 82,
    minimumFacingAlignment: Math.max(
      0,
      WEAPON_DEFINITIONS.impact.arcCosine,
    ),
    windupTicks: 18,
    recoveryTicks: 16,
    windupMovementScale: 0.35,
    hitMovementScale: 0.2,
    recoveryMovementScale: 0.75,
  },
} as const satisfies Record<WeaponId, SemiAutoCombatProfile>;

export interface SemiAutoCombatControllerState {
  readonly phase: SemiAutoCombatPhase;
  readonly targetId: string | null;
  readonly weaponId: WeaponId | null;
  readonly phaseTicksRemaining: number;
  readonly phaseTicksTotal: number;
}

export interface CombatPresentationState {
  readonly phase: SemiAutoCombatPhase;
  readonly buildId: SemiAutoCombatProfile["buildId"] | null;
  readonly weaponId: WeaponId | null;
  readonly targetId: string | null;
  readonly phaseTicksRemaining: number;
  readonly phaseTicksTotal: number;
  readonly phaseProgress: number;
  readonly movementScale: number;
  readonly targetInHitRange: boolean;
}

export type SemiAutoCombatCommandContribution = Pick<
  PrototypeBCommand,
  "attack"
>;

export interface SemiAutoCombatStepResult {
  readonly state: SemiAutoCombatControllerState;
  readonly presentation: CombatPresentationState;
  readonly commandContribution: SemiAutoCombatCommandContribution;
}

const IDLE_STATE: SemiAutoCombatControllerState = {
  phase: "idle",
  targetId: null,
  weaponId: null,
  phaseTicksRemaining: 0,
  phaseTicksTotal: 0,
};

function distanceToEnemy(
  state: PrototypeBState,
  enemy: EnemyState,
): number {
  return Math.hypot(
    enemy.x - state.player.x,
    enemy.y - state.player.y,
  );
}

function facingAlignment(
  state: PrototypeBState,
  enemy: EnemyState,
): number {
  const deltaX = enemy.x - state.player.x;
  const deltaY = enemy.y - state.player.y;
  const distance = Math.hypot(deltaX, deltaY);

  if (distance === 0) {
    return 1;
  }

  const facingLength = Math.hypot(
    state.player.facingX,
    state.player.facingY,
  );

  if (facingLength === 0) {
    return -1;
  }

  return (
    (deltaX / distance) * (state.player.facingX / facingLength) +
    (deltaY / distance) * (state.player.facingY / facingLength)
  );
}

function isHostileTarget(
  state: PrototypeBState,
  enemy: EnemyState,
): boolean {
  return (
    state.status === "playing" &&
    enemy.active &&
    !enemy.defeated &&
    enemy.hp > 0 &&
    enemy.disposition === "hostile" &&
    (enemy.kind !== "named-anomaly" ||
      state.quest.intent === "destroy")
  );
}

function isTargetValid(
  state: PrototypeBState,
  enemy: EnemyState,
  profile: SemiAutoCombatProfile,
  maximumDistance: number,
): boolean {
  return (
    isHostileTarget(state, enemy) &&
    distanceToEnemy(state, enemy) <= maximumDistance &&
    facingAlignment(state, enemy) >= profile.minimumFacingAlignment
  );
}

function targetById(
  state: PrototypeBState,
  targetId: string | null,
): EnemyState | undefined {
  if (targetId === null) {
    return undefined;
  }

  return state.enemies.find((enemy) => enemy.id === targetId);
}

function targetScore(
  state: PrototypeBState,
  enemy: EnemyState,
  currentTargetId: string | null,
): number {
  const threat = enemy.attack.phase === "telegraph" ? 1 : 0;
  const retainedTarget = enemy.id === currentTargetId ? 1 : 0;

  return (
    1_000 -
    distanceToEnemy(state, enemy) * 2 +
    facingAlignment(state, enemy) * 120 +
    threat * 160 +
    retainedTarget * 80
  );
}

function acquireTarget(
  state: PrototypeBState,
  profile: SemiAutoCombatProfile,
  currentTargetId: string | null,
): EnemyState | undefined {
  return state.enemies
    .filter((enemy) =>
      isTargetValid(state, enemy, profile, profile.acquireRange),
    )
    .sort((first, second) => {
      const scoreDifference =
        targetScore(state, second, currentTargetId) -
        targetScore(state, first, currentTargetId);

      return scoreDifference || first.id.localeCompare(second.id);
    })[0];
}

function phaseState(
  phase: SemiAutoCombatPhase,
  weaponId: WeaponId,
  targetId: string | null,
  ticks: number,
): SemiAutoCombatControllerState {
  return {
    phase,
    targetId,
    weaponId,
    phaseTicksRemaining: ticks,
    phaseTicksTotal: ticks,
  };
}

function idleState(weaponId: WeaponId): SemiAutoCombatControllerState {
  return {
    ...IDLE_STATE,
    weaponId,
  };
}

function beginAcquire(
  state: PrototypeBState,
  currentTargetId: string | null,
): SemiAutoCombatControllerState {
  const weaponId = state.player.weaponId;
  const profile = SEMI_AUTO_COMBAT_PROFILES[weaponId];

  if (
    state.status !== "playing" ||
    state.player.guarding ||
    state.player.weaponCooldownTicks > 0
  ) {
    return idleState(weaponId);
  }

  const target = acquireTarget(state, profile, currentTargetId);

  if (target === undefined) {
    return idleState(weaponId);
  }

  return phaseState("acquire", weaponId, target.id, 1);
}

function movementScale(
  controller: SemiAutoCombatControllerState,
  profile: SemiAutoCombatProfile | null,
): number {
  if (profile === null) {
    return 1;
  }

  switch (controller.phase) {
    case "windup":
      return profile.windupMovementScale;
    case "hit":
      return profile.hitMovementScale;
    case "recover":
      return profile.recoveryMovementScale;
    case "idle":
    case "acquire":
      return 1;
  }
}

function presentationFor(
  controller: SemiAutoCombatControllerState,
  state: PrototypeBState,
): CombatPresentationState {
  const profile =
    controller.weaponId === null
      ? null
      : SEMI_AUTO_COMBAT_PROFILES[controller.weaponId];
  const target = targetById(state, controller.targetId);
  let phaseProgress = 0;
  if (controller.phase === "hit") {
    phaseProgress = 1;
  } else if (controller.phaseTicksTotal > 0) {
    phaseProgress =
      1 -
      controller.phaseTicksRemaining / controller.phaseTicksTotal;
  }

  return {
    phase: controller.phase,
    buildId: profile?.buildId ?? null,
    weaponId: controller.weaponId,
    targetId: controller.targetId,
    phaseTicksRemaining: controller.phaseTicksRemaining,
    phaseTicksTotal: controller.phaseTicksTotal,
    phaseProgress,
    movementScale: movementScale(controller, profile),
    targetInHitRange:
      profile !== null &&
      target !== undefined &&
      isTargetValid(state, target, profile, profile.hitRange),
  };
}

function result(
  controller: SemiAutoCombatControllerState,
  state: PrototypeBState,
  attack = false,
): SemiAutoCombatStepResult {
  return {
    state: controller,
    presentation: presentationFor(controller, state),
    commandContribution: attack ? { attack: true } : {},
  };
}

export function createSemiAutoCombatController(): SemiAutoCombatControllerState {
  return { ...IDLE_STATE };
}

export function stepSemiAutoCombatController(
  previous: SemiAutoCombatControllerState,
  state: PrototypeBState,
): SemiAutoCombatStepResult {
  const weaponId = state.player.weaponId;
  const profile = SEMI_AUTO_COMBAT_PROFILES[weaponId];

  if (
    state.status !== "playing" ||
    state.player.guarding ||
    (previous.weaponId !== null && previous.weaponId !== weaponId)
  ) {
    return result(beginAcquire(state, null), state);
  }

  switch (previous.phase) {
    case "idle":
      return result(beginAcquire(state, previous.targetId), state);

    case "acquire": {
      const target = targetById(state, previous.targetId);

      if (
        target === undefined ||
        !isTargetValid(state, target, profile, profile.dropRange)
      ) {
        return result(beginAcquire(state, previous.targetId), state);
      }

      return result(
        phaseState(
          "windup",
          weaponId,
          target.id,
          profile.windupTicks,
        ),
        state,
      );
    }

    case "windup": {
      const target = targetById(state, previous.targetId);

      if (
        target === undefined ||
        !isTargetValid(state, target, profile, profile.dropRange)
      ) {
        return result(beginAcquire(state, previous.targetId), state);
      }

      if (previous.phaseTicksRemaining > 1) {
        const next = {
          ...previous,
          phaseTicksRemaining: previous.phaseTicksRemaining - 1,
        };
        return result(next, state);
      }

      if (
        state.player.weaponCooldownTicks > 0 ||
        !isTargetValid(state, target, profile, profile.hitRange)
      ) {
        return result(beginAcquire(state, previous.targetId), state);
      }

      return result(
        phaseState("hit", weaponId, target.id, 1),
        state,
        true,
      );
    }

    case "hit": {
      const target = targetById(state, previous.targetId);
      return result(
        phaseState(
          "recover",
          weaponId,
          target !== undefined &&
            isTargetValid(state, target, profile, profile.dropRange)
            ? target.id
            : null,
          profile.recoveryTicks,
        ),
        state,
      );
    }

    case "recover": {
      if (previous.phaseTicksRemaining > 1) {
        const target = targetById(state, previous.targetId);
        const next = {
          ...previous,
          targetId:
            target !== undefined &&
            isTargetValid(state, target, profile, profile.dropRange)
              ? target.id
              : null,
          phaseTicksRemaining: previous.phaseTicksRemaining - 1,
        };
        return result(next, state);
      }

      return result(beginAcquire(state, previous.targetId), state);
    }
  }
}
