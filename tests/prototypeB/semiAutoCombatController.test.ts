import { describe, expect, it } from "vitest";

import {
  SEMI_AUTO_COMBAT_PROFILES,
  createPrototypeBState,
  createSemiAutoCombatController,
  stepSemiAutoCombatController,
  type EnemyState,
  type PrototypeBState,
  type SemiAutoCombatControllerState,
  type WeaponId,
} from "../../src/prototypeB/sim";

function hostileEnemy(
  state: PrototypeBState,
  id: string,
  offsetX: number,
  offsetY = 0,
): EnemyState {
  const source = state.enemies[0];

  if (source === undefined) {
    throw new Error("Prototype B must provide an enemy fixture.");
  }

  return {
    ...source,
    id,
    x: state.player.x + offsetX,
    y: state.player.y + offsetY,
    hp: source.maxHp,
    active: true,
    defeated: false,
    disposition: "hostile",
    attack: {
      ...source.attack,
      phase: "idle",
      ticksRemaining: 0,
    },
  };
}

function combatState(
  weaponId: WeaponId = "blade",
): PrototypeBState {
  const initial = createPrototypeBState(`semi-auto-${weaponId}`);

  return {
    ...initial,
    player: {
      ...initial.player,
      facingX: 1,
      facingY: 0,
      weaponId,
      weaponCooldownTicks: 0,
    },
    enemies: [hostileEnemy(initial, "front-target", 72)],
  };
}

function stepUntilHit(
  world: PrototypeBState,
): {
  controller: SemiAutoCombatControllerState;
  phases: string[];
  attackPhases: string[];
  hitProgress: number | null;
} {
  let controller = createSemiAutoCombatController();
  const phases: string[] = [];
  const attackPhases: string[] = [];
  let hitProgress: number | null = null;

  for (let tick = 0; tick < 40; tick += 1) {
    const step = stepSemiAutoCombatController(controller, world);
    controller = step.state;
    phases.push(step.presentation.phase);

    if (step.commandContribution.attack === true) {
      attackPhases.push(step.presentation.phase);
      hitProgress = step.presentation.phaseProgress;
      break;
    }
  }

  return { controller, phases, attackPhases, hitProgress };
}

describe("SemiAutoCombatController", () => {
  it("advances Acquire -> Windup -> Hit and contributes attack only on Hit", () => {
    const world = combatState("blade");
    const run = stepUntilHit(world);

    expect(run.phases.slice(0, 2)).toEqual(["acquire", "windup"]);
    expect(
      run.phases.filter((phase) => phase === "windup"),
    ).toHaveLength(SEMI_AUTO_COMBAT_PROFILES.blade.windupTicks);
    expect(run.attackPhases).toEqual(["hit"]);
    expect(run.hitProgress).toBe(1);
    expect(run.controller.phase).toBe("hit");
  });

  it("gives the breach driver a longer, more committed cycle than the cutter", () => {
    const blade = SEMI_AUTO_COMBAT_PROFILES.blade;
    const impact = SEMI_AUTO_COMBAT_PROFILES.impact;

    expect(impact.windupTicks).toBeGreaterThan(blade.windupTicks);
    expect(impact.recoveryTicks).toBeGreaterThan(blade.recoveryTicks);
    expect(impact.windupMovementScale).toBeLessThan(
      blade.windupMovementScale,
    );
    expect(impact.recoveryMovementScale).toBeLessThan(
      blade.recoveryMovementScale,
    );
  });

  it("acquires an active hostile in front instead of a closer enemy behind", () => {
    const initial = combatState("blade");
    const front = hostileEnemy(initial, "front", 88);
    const behind = hostileEnemy(initial, "behind", -40);
    const inactive = {
      ...hostileEnemy(initial, "inactive", 32),
      active: false,
    };
    const world = {
      ...initial,
      enemies: [behind, inactive, front],
    };

    const step = stepSemiAutoCombatController(
      createSemiAutoCombatController(),
      world,
    );

    expect(step.presentation.phase).toBe("acquire");
    expect(step.presentation.targetId).toBe("front");
    expect(step.commandContribution).toEqual({});
  });

  it("drops a target that leaves range during windup without attacking", () => {
    const world = combatState("blade");
    const acquired = stepSemiAutoCombatController(
      createSemiAutoCombatController(),
      world,
    );
    const windup = stepSemiAutoCombatController(acquired.state, world);
    const movedWorld = {
      ...world,
      enemies: world.enemies.map((enemy) => ({
        ...enemy,
        x:
          world.player.x +
          SEMI_AUTO_COMBAT_PROFILES.blade.dropRange +
          1,
      })),
    };

    const dropped = stepSemiAutoCombatController(
      windup.state,
      movedWorld,
    );

    expect(dropped.presentation.phase).toBe("idle");
    expect(dropped.presentation.targetId).toBeNull();
    expect(dropped.commandContribution).toEqual({});
  });

  it("reports phase-specific movement during impact windup and recovery", () => {
    const world = combatState("impact");
    const acquired = stepSemiAutoCombatController(
      createSemiAutoCombatController(),
      world,
    );
    const windup = stepSemiAutoCombatController(acquired.state, world);
    let controller = windup.state;

    expect(windup.presentation.movementScale).toBe(0.35);

    for (let tick = 0; tick < 18; tick += 1) {
      const step = stepSemiAutoCombatController(controller, world);
      controller = step.state;

      if (step.presentation.phase === "hit") {
        break;
      }
    }

    const recovery = stepSemiAutoCombatController(controller, world);
    expect(recovery.presentation.phase).toBe("recover");
    expect(recovery.presentation.movementScale).toBe(0.75);
    expect(recovery.commandContribution).toEqual({});
  });
});
