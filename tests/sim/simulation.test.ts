import { describe, expect, it } from "vitest";
import {
  ARENA_HEIGHT,
  ARENA_WIDTH,
  RUN_DURATION_TICKS,
  createInitialState,
  hashReplay,
  hashSimulationState,
  runReplay,
  stableSerialize,
  stepSimulation,
  type EnemyState,
  type SimulationCommand,
  type SimulationEvent,
  type SimulationState,
  type UpgradeId,
} from "../../src/sim";

function createTestEnemy(
  state: SimulationState,
  overrides: Partial<EnemyState> = {},
): EnemyState {
  return {
    id: "enemy-test",
    kind: "skitter",
    x: state.player.x + 48,
    y: state.player.y,
    radius: 10,
    hp: 1,
    maxHp: 1,
    speed: 0,
    damage: 0,
    attackCooldownTicks: 0,
    attackCooldownMaxTicks: 30,
    xpReward: 12,
    elite: false,
    boss: false,
    ...overrides,
  };
}

function stepUntil(
  initialState: SimulationState,
  predicate: (state: SimulationState) => boolean,
  maximumSteps = 120,
  command: SimulationCommand = {},
): { state: SimulationState; events: SimulationEvent[] } {
  let state = initialState;
  const events: SimulationEvent[] = [];

  for (let index = 0; index < maximumSteps; index += 1) {
    const result = stepSimulation(state, command);
    state = result.state;
    events.push(...result.events);

    if (predicate(state)) {
      return { state, events };
    }
  }

  throw new Error(`Condition was not reached within ${maximumSteps} steps.`);
}

function assertUpgradeEffect(
  before: SimulationState["player"],
  after: SimulationState["player"],
  upgradeId: UpgradeId,
): void {
  switch (upgradeId) {
    case "rapid-fire":
      expect(after.attackIntervalTicks).toBeLessThan(
        before.attackIntervalTicks,
      );
      break;
    case "heavy-shot":
      expect(after.attackDamage).toBe(before.attackDamage + 8);
      break;
    case "swift-boots":
      expect(after.speed).toBe(before.speed + 20);
      break;
    case "vitality":
      expect(after.maxHp).toBe(before.maxHp + 20);
      expect(after.hp).toBe(before.hp + 20);
      break;
    case "pulse-core":
      expect(after.skillDamage).toBe(before.skillDamage + 15);
      expect(after.skillRadius).toBe(before.skillRadius + 16);
      break;
    case "field-repair":
      expect(after.hp).toBe(Math.min(before.maxHp, before.hp + 35));
      break;
  }
}

describe("deterministic simulation", () => {
  it("replays the same seed and commands to identical hashes", () => {
    const commands: SimulationCommand[] = Array.from(
      { length: 360 },
      (_, tick) => ({
        moveX: Math.sin(tick / 17),
        moveY: Math.cos(tick / 23),
        activateSkill: tick % 97 === 0,
        upgradeChoice: tick % 41 === 0 ? 0 : undefined,
      }),
    );

    const first = runReplay("route-amber", commands);
    const second = runReplay("route-amber", commands);

    expect(second.hashes).toEqual(first.hashes);
    expect(hashSimulationState(second.state)).toBe(
      hashSimulationState(first.state),
    );
    expect(hashReplay("route-cobalt", commands)).not.toBe(
      hashReplay("route-amber", commands),
    );
    expect(structuredClone(first.state)).toEqual(first.state);
  });

  it("does not mutate the input state and serializes object keys stably", () => {
    const state = createInitialState(42);
    const before = hashSimulationState(state);
    const result = stepSimulation(state, { moveX: 1, activateSkill: true });

    expect(hashSimulationState(state)).toBe(before);
    expect(result.state).not.toBe(state);
    expect(stableSerialize({ z: 1, a: 2 })).toBe(
      stableSerialize({ a: 2, z: 1 }),
    );
  });
});

describe("movement and arena invariants", () => {
  it("keeps every retained entity finite and within the 960x540 arena", () => {
    const initial = createInitialState("bounds");
    let state: SimulationState = {
      ...initial,
      player: {
        ...initial.player,
        hp: 1_000_000,
        maxHp: 1_000_000,
      },
    };

    for (let index = 0; index < 1_200; index += 1) {
      const command: SimulationCommand =
        state.status === "upgrade"
          ? { upgradeChoice: 0 }
          : {
              moveX: index % 2 === 0 ? 999 : -999,
              moveY: index % 3 === 0 ? -999 : 999,
              activateSkill: index % 181 === 0,
            };
      state = stepSimulation(state, command).state;

      expect(state.player.x).toBeGreaterThanOrEqual(state.player.radius);
      expect(state.player.x).toBeLessThanOrEqual(
        ARENA_WIDTH - state.player.radius,
      );
      expect(state.player.y).toBeGreaterThanOrEqual(state.player.radius);
      expect(state.player.y).toBeLessThanOrEqual(
        ARENA_HEIGHT - state.player.radius,
      );

      for (const enemy of state.enemies) {
        expect(Number.isFinite(enemy.x)).toBe(true);
        expect(Number.isFinite(enemy.y)).toBe(true);
        expect(enemy.x).toBeGreaterThanOrEqual(enemy.radius);
        expect(enemy.x).toBeLessThanOrEqual(ARENA_WIDTH - enemy.radius);
        expect(enemy.y).toBeGreaterThanOrEqual(enemy.radius);
        expect(enemy.y).toBeLessThanOrEqual(ARENA_HEIGHT - enemy.radius);
      }

      for (const projectile of state.projectiles) {
        expect(projectile.x).toBeGreaterThanOrEqual(0);
        expect(projectile.x).toBeLessThanOrEqual(ARENA_WIDTH);
        expect(projectile.y).toBeGreaterThanOrEqual(0);
        expect(projectile.y).toBeLessThanOrEqual(ARENA_HEIGHT);
      }

      for (const pulse of state.pulses) {
        expect(pulse.radius).toBeGreaterThanOrEqual(0);
        expect(pulse.radius).toBeLessThanOrEqual(pulse.maxRadius);
      }
    }
  });
});

describe("combat and progression", () => {
  it("fires automatically, defeats an enemy, and awards XP", () => {
    const initial = createInitialState("combat");
    const target = createTestEnemy(initial, { xpReward: 17 });
    const state: SimulationState = {
      ...initial,
      enemies: [target],
      projectiles: [],
      pulses: [],
      nextEntityId: 100,
    };
    const result = stepUntil(
      state,
      (candidate) => candidate.kills === 1,
      20,
    );

    expect(result.state.enemies).toHaveLength(0);
    expect(result.state.player.xp).toBe(17);
    expect(result.state.kills).toBe(1);
    expect(
      result.events.some(
        (event) =>
          event.type === "enemy-damaged" &&
          event.source === "projectile",
      ),
    ).toBe(true);
    expect(
      result.events.some((event) => event.type === "enemy-defeated"),
    ).toBe(true);
  });

  it("resolves contact damage and enters the lost state on death", () => {
    const initial = createInitialState("contact");
    const lethalEnemy = createTestEnemy(initial, {
      x: initial.player.x,
      y: initial.player.y,
      hp: 999,
      maxHp: 999,
      damage: initial.player.hp,
    });
    const result = stepSimulation(
      {
        ...initial,
        enemies: [lethalEnemy],
        projectiles: [],
        pulses: [],
      },
      {},
    );

    expect(result.state.status).toBe("lost");
    expect(result.state.player.hp).toBe(0);
    expect(
      result.events.some((event) => event.type === "player-defeated"),
    ).toBe(true);

    const terminalStep = stepSimulation(result.state, { moveX: 1 });
    expect(terminalStep.state.tick).toBe(result.state.tick);
    expect(terminalStep.events).toEqual([]);
  });

  it("activates a pulse with cooldown and damages nearby enemies once", () => {
    const initial = createInitialState("pulse");
    const target = createTestEnemy(initial, {
      x: initial.player.x + 26,
      radius: 5,
      hp: 30,
      maxHp: 30,
    });
    const state: SimulationState = {
      ...initial,
      player: {
        ...initial.player,
        attackCooldownTicks: 999,
      },
      enemies: [target],
      projectiles: [],
      pulses: [],
    };
    const first = stepSimulation(state, { activateSkill: true });
    const result = stepUntil(
      first.state,
      (candidate) => candidate.kills === 1,
      12,
    );
    const events = [...first.events, ...result.events];

    expect(
      events.some((event) => event.type === "pulse-activated"),
    ).toBe(true);
    expect(
      events.some(
        (event) =>
          event.type === "enemy-damaged" && event.source === "pulse",
      ),
    ).toBe(true);
    expect(result.state.player.skillCooldownTicks).toBeGreaterThan(0);
    expect(result.state.kills).toBe(1);
  });

  it("pauses on a three-choice level-up and applies the chosen upgrade", () => {
    const initial = createInitialState("upgrade");
    const target = createTestEnemy(initial, {
      xpReward: initial.player.xpToNext,
    });
    const state: SimulationState = {
      ...initial,
      player: {
        ...initial.player,
        hp: 50,
      },
      enemies: [target],
      projectiles: [],
      pulses: [],
    };
    const leveled = stepUntil(
      state,
      (candidate) => candidate.status === "upgrade",
      20,
    ).state;

    expect(leveled.upgradeChoices).toHaveLength(3);
    expect(new Set(leveled.upgradeChoices?.map((choice) => choice.id)).size).toBe(
      3,
    );

    const pausedHash = hashSimulationState(leveled);
    const paused = stepSimulation(leveled, {
      moveX: 1,
      activateSkill: true,
    });
    expect(hashSimulationState(paused.state)).toBe(pausedHash);
    expect(paused.state.tick).toBe(leveled.tick);

    const chosen = leveled.upgradeChoices?.[0];
    expect(chosen).toBeDefined();

    if (chosen === undefined) {
      throw new Error("Expected a generated upgrade choice.");
    }

    const beforePlayer = { ...leveled.player };
    const applied = stepSimulation(leveled, { upgradeChoice: 0 });

    expect(applied.state.status).toBe("running");
    expect(applied.state.tick).toBe(leveled.tick);
    expect(applied.state.upgradeChoices).toBeNull();
    expect(applied.state.upgradeRanks[chosen.id]).toBe(1);
    expect(
      applied.events.some(
        (event) =>
          event.type === "upgrade-applied" &&
          event.upgradeId === chosen.id,
      ),
    ).toBe(true);
    assertUpgradeEffect(beforePlayer, applied.state.player, chosen.id);
  });

  it("triggers the boss exactly when the active clock reaches eight minutes", () => {
    const initial = createInitialState("boss-clock");
    const state: SimulationState = {
      ...initial,
      tick: RUN_DURATION_TICKS - 1,
      elapsedTicks: RUN_DURATION_TICKS - 1,
      enemies: [],
      projectiles: [],
      pulses: [],
    };
    const result = stepSimulation(state, {});
    const bosses = result.state.enemies.filter((enemy) => enemy.boss);

    expect(result.state.elapsedTicks).toBe(RUN_DURATION_TICKS);
    expect(result.state.bossSpawned).toBe(true);
    expect(bosses).toHaveLength(1);
    expect(
      result.events.some((event) => event.type === "boss-triggered"),
    ).toBe(true);
  });

  it("marks the run won when the boss is defeated", () => {
    const initial = createInitialState("boss-fight");
    const boss = createTestEnemy(initial, {
      id: "boss-test",
      kind: "boss",
      x: initial.player.x + 40,
      radius: 20,
      hp: 1,
      maxHp: 1,
      xpReward: 200,
      boss: true,
    });
    const state: SimulationState = {
      ...initial,
      bossSpawned: true,
      enemies: [boss],
      projectiles: [],
      pulses: [],
    };
    const result = stepUntil(
      state,
      (candidate) => candidate.status === "won",
      20,
    );

    expect(result.state.bossDefeated).toBe(true);
    expect(result.state.status).toBe("won");
    expect(result.events.some((event) => event.type === "run-won")).toBe(
      true,
    );
  });
});
