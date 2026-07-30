import { describe, expect, it } from "vitest";
import {
  ANOMALY_CONFRONTATION_RANGE,
  ANOMALY_ID,
  ANOMALY_INTERACTION_REACH,
  ENEMY_DEFINITIONS,
  INTERACTION_REACH,
  LANDMARKS,
  LOOT_DEFINITIONS,
  LOOT_PLACEMENTS,
  PROP_PLACEMENTS,
  TERRAIN_PLACEMENTS,
  TICK_RATE,
  WEAPON_DEFINITIONS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  createPrototypeBState,
  hashPrototypeBState,
  isWithinAnomalyInteractionReach,
  runPrototypeBReplay,
  stepPrototypeB,
  type EnemyState,
  type LootId,
  type PrototypeBCommand,
  type PrototypeBEvent,
  type PrototypeBState,
  type QuestOutcome,
} from "../../src/prototypeB/sim";

function enemyOfKind(
  state: PrototypeBState,
  kind: EnemyState["kind"],
): EnemyState {
  const enemy = state.enemies.find(
    (candidate) => candidate.kind === kind,
  );

  if (enemy === undefined) {
    throw new Error(`Missing test enemy: ${kind}`);
  }

  return enemy;
}

function isolatedEnemyState(
  seed: string,
  kind: EnemyState["kind"] = "scrap-hound",
  overrides: Partial<EnemyState> = {},
): PrototypeBState {
  const initial = createPrototypeBState(seed);
  const source = enemyOfKind(initial, kind);
  const enemy: EnemyState = {
    ...source,
    x: initial.player.x + 50,
    y: initial.player.y,
    active: true,
    defeated: false,
    disposition: "hostile",
    attack: {
      phase: "idle",
      ticksRemaining: 0,
      attackId: null,
      targetX: 0,
      targetY: 0,
      directionX: 0,
      directionY: 0,
    },
    ...overrides,
  };

  return {
    ...initial,
    enemies: [enemy],
  };
}

function runUntilEvent(
  initial: PrototypeBState,
  eventType: PrototypeBEvent["type"],
  command: PrototypeBCommand | ((state: PrototypeBState) => PrototypeBCommand),
  maximumSteps = 120,
): { state: PrototypeBState; events: PrototypeBEvent[] } {
  let state = initial;
  const events: PrototypeBEvent[] = [];

  for (let step = 0; step < maximumSteps; step += 1) {
    const next = stepPrototypeB(
      state,
      typeof command === "function" ? command(state) : command,
    );
    state = next.state;
    events.push(...next.events);

    if (next.events.some((event) => event.type === eventType)) {
      return { state, events };
    }
  }

  throw new Error(
    `Event ${eventType} did not occur within ${maximumSteps} steps.`,
  );
}

function walkUntil(
  initial: PrototypeBState,
  target: { x: number; y: number },
  reached: (state: PrototypeBState) => boolean,
  maximumSteps = 900,
): PrototypeBState {
  let state = initial;

  for (let step = 0; step < maximumSteps; step += 1) {
    if (reached(state)) {
      return state;
    }

    const deltaX = target.x - state.player.x;
    const deltaY = target.y - state.player.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance === 0) {
      break;
    }

    state = stepPrototypeB(state, {
      moveX: deltaX / distance,
      moveY: deltaY / distance,
      guard: true,
    }).state;

    if (state.status !== "playing") {
      throw new Error(
        `Route became ${state.status} before reaching (${target.x}, ${target.y}).`,
      );
    }
  }

  throw new Error(
    `Route did not reach (${target.x}, ${target.y}) within ${maximumSteps} steps.`,
  );
}

function prepareConfrontation(seed: string): PrototypeBState {
  let state = createPrototypeBState(seed);
  state = stepPrototypeB(state, { interact: true }).state;
  state = {
    ...state,
    player: {
      ...state.player,
      x: LANDMARKS.fork.center.x,
      y: LANDMARKS.fork.center.y,
    },
  };
  state = stepPrototypeB(state, {}).state;
  const anomaly = enemyOfKind(state, "named-anomaly");
  state = {
    ...state,
    player: {
      ...state.player,
      x: anomaly.x - 96,
      y: anomaly.y,
      facingX: 1,
      facingY: 0,
    },
  };
  state = stepPrototypeB(state, {}).state;

  expect(state.quest.phase).toBe("confrontation");
  expect(state.quest.visitedLandmarkIds).toEqual([
    "town",
    "fork",
    "ruin",
  ]);
  return state;
}

function grantLoot(
  state: PrototypeBState,
  lootId: LootId,
): PrototypeBState {
  return {
    ...state,
    player: {
      ...state.player,
      collectedLootIds: state.player.collectedLootIds.includes(lootId)
        ? [...state.player.collectedLootIds]
        : [...state.player.collectedLootIds, lootId],
    },
    world: {
      ...state.world,
      loot: state.world.loot.map((pickup) => ({
        ...pickup,
        picked: pickup.picked || pickup.lootId === lootId,
      })),
    },
  };
}

function returnToTown(state: PrototypeBState): PrototypeBState {
  const atTown = {
    ...state,
    player: {
      ...state.player,
      x: LANDMARKS.town.interactionPoint.x,
      y: LANDMARKS.town.interactionPoint.y,
    },
  };
  return stepPrototypeB(atTown, { interact: true }).state;
}

describe("Prototype B world contract", () => {
  it("exposes a large bounded 30 Hz world and renderer-ready placements", () => {
    const state = createPrototypeBState("world-contract");

    expect(TICK_RATE).toBe(30);
    expect(WORLD_WIDTH).toBeGreaterThan(3_000);
    expect(WORLD_HEIGHT).toBeGreaterThan(1_500);
    expect(state.world.width).toBe(WORLD_WIDTH);
    expect(state.world.height).toBe(WORLD_HEIGHT);
    expect(state.world.landmarks.map((landmark) => landmark.id)).toEqual([
      "town",
      "fork",
      "ruin",
    ]);
    expect(TERRAIN_PLACEMENTS.some((terrain) => terrain.solid)).toBe(true);
    expect(PROP_PLACEMENTS.some((prop) => prop.interactive)).toBe(true);
    expect(Object.keys(LOOT_DEFINITIONS)).toHaveLength(6);
    expect(LOOT_PLACEMENTS).toHaveLength(6);
    expect(state.world.loot).toHaveLength(6);
    expect(state.enemies.map((enemy) => enemy.kind)).toEqual([
      "scrap-hound",
      "relay-shell",
      "murmur",
      "named-anomaly",
    ]);
  });

  it("progresses through town, fork, and ruin only through player actions", () => {
    const state = prepareConfrontation("route");

    expect(state.quest.phase).toBe("confrontation");
    expect(state.quest.objective).toContain("Orison");
    expect(state.status).toBe("playing");
  });

  it("collects both outcome keys on a continuous route before confrontation", () => {
    let state = createPrototypeBState("continuous-key-route");
    state = stepPrototypeB(state, { interact: true }).state;

    expect(state.quest.phase).toBe("travel-to-fork");

    state = walkUntil(
      state,
      LANDMARKS.fork.center,
      (candidate) => candidate.quest.phase === "travel-to-ruin",
    );

    for (const lootId of ["quiet-chime", "signal-key"] as const) {
      const placement = LOOT_PLACEMENTS.find(
        (candidate) => candidate.lootId === lootId,
      );

      if (placement === undefined) {
        throw new Error(`Missing route pickup: ${lootId}`);
      }

      state = walkUntil(
        state,
        placement,
        (candidate) =>
          Math.hypot(
            candidate.player.x - placement.x,
            candidate.player.y - placement.y,
          ) <=
          candidate.player.radius + placement.radius + INTERACTION_REACH,
      );
      const pickup = stepPrototypeB(state, {
        interact: true,
        guard: true,
      });
      state = pickup.state;

      expect(
        pickup.events.find((event) => event.type === "loot-picked"),
      ).toMatchObject({ lootId });
      expect(state.quest.phase).toBe("travel-to-ruin");
    }

    const anomaly = enemyOfKind(state, "named-anomaly");
    state = walkUntil(
      state,
      anomaly,
      (candidate) => candidate.quest.phase === "confrontation",
    );

    expect(state.player.collectedLootIds).toEqual(
      expect.arrayContaining(["quiet-chime", "signal-key"]),
    );
    expect(state.quest.phase).toBe("confrontation");
    expect(state.status).toBe("playing");
  });

  it("places every outcome key wholly outside the confrontation trigger", () => {
    const state = createPrototypeBState("key-placement");
    const anomaly = enemyOfKind(state, "named-anomaly");

    for (const lootId of ["quiet-chime", "signal-key"] as const) {
      const placement = LOOT_PLACEMENTS.find(
        (candidate) => candidate.lootId === lootId,
      );

      if (placement === undefined) {
        throw new Error(`Missing outcome key placement: ${lootId}`);
      }

      const pickupReach =
        state.player.radius + placement.radius + INTERACTION_REACH;
      const closestPossiblePickupPosition =
        Math.hypot(placement.x - anomaly.x, placement.y - anomaly.y) -
        pickupReach;

      expect(closestPossiblePickupPosition).toBeGreaterThan(
        ANOMALY_CONFRONTATION_RANGE,
      );
    }
  });

  it("shares the exact anomaly interaction boundary with UI consumers", () => {
    const state = createPrototypeBState("anomaly-reach");
    const anomaly = enemyOfKind(state, "named-anomaly");
    const exactBoundary = {
      ...anomaly,
      x:
        state.player.x +
        state.player.radius +
        anomaly.radius +
        ANOMALY_INTERACTION_REACH,
      y: state.player.y,
    };

    expect(
      isWithinAnomalyInteractionReach(state.player, exactBoundary),
    ).toBe(true);
    expect(
      isWithinAnomalyInteractionReach(state.player, {
        ...exactBoundary,
        x: exactBoundary.x + 0.01,
      }),
    ).toBe(false);
  });
});

describe("manual combat", () => {
  it("never attacks or damages an enemy without an attack command", () => {
    let state = isolatedEnemyState("manual-only", "scrap-hound", {
      attack: {
        phase: "recovery",
        ticksRemaining: 999,
        attackId: null,
        targetX: 0,
        targetY: 0,
        directionX: 0,
        directionY: 0,
      },
    });
    const initialHp = state.enemies[0]?.hp;
    const idleEvents: PrototypeBEvent[] = [];

    for (let tick = 0; tick < 90; tick += 1) {
      const next = stepPrototypeB(state, {});
      state = next.state;
      idleEvents.push(...next.events);
    }

    expect(state.enemies[0]?.hp).toBe(initialHp);
    expect(
      idleEvents.some((event) => event.type === "player-attacked"),
    ).toBe(false);
    expect(
      idleEvents.some((event) => event.type === "enemy-damaged"),
    ).toBe(false);
    expect("xp" in state.player).toBe(false);

    const attacked = stepPrototypeB(state, { attack: true });
    expect(
      attacked.events.some((event) => event.type === "player-attacked"),
    ).toBe(true);
    expect(attacked.state.enemies[0]?.hp).toBeLessThan(initialHp ?? 0);
  });

  it("makes blade and impact range, speed, damage, and sound distinct", () => {
    expect(WEAPON_DEFINITIONS.blade.range).toBeGreaterThan(
      WEAPON_DEFINITIONS.impact.range,
    );
    expect(WEAPON_DEFINITIONS.blade.cooldownTicks).toBeLessThan(
      WEAPON_DEFINITIONS.impact.cooldownTicks,
    );
    expect(WEAPON_DEFINITIONS.blade.damage).toBeLessThan(
      WEAPON_DEFINITIONS.impact.damage,
    );
    expect(WEAPON_DEFINITIONS.blade.cue).not.toBe(
      WEAPON_DEFINITIONS.impact.cue,
    );

    const distant = isolatedEnemyState("weapon-range", "relay-shell", {
      x: createPrototypeBState("weapon-range").player.x + 100,
      attack: {
        phase: "recovery",
        ticksRemaining: 999,
        attackId: null,
        targetX: 0,
        targetY: 0,
        directionX: 0,
        directionY: 0,
      },
    });
    const targetHp = distant.enemies[0]?.hp ?? 0;
    const blade = stepPrototypeB(distant, { attack: true });
    const impactReady = stepPrototypeB(
      {
        ...distant,
        player: {
          ...distant.player,
          weaponId: "impact",
        },
      },
      { attack: true },
    );

    expect(blade.state.enemies[0]?.hp).toBe(
      targetHp - WEAPON_DEFINITIONS.blade.damage,
    );
    expect(impactReady.state.enemies[0]?.hp).toBe(targetHp);

    const close = isolatedEnemyState("weapon-damage", "relay-shell");
    const bladeClose = stepPrototypeB(close, { attack: true });
    const impactClose = stepPrototypeB(close, {
      chooseWeapon: "impact",
      attack: true,
    });
    expect(
      (impactClose.events.find(
        (event) => event.type === "enemy-damaged",
      ) as Extract<PrototypeBEvent, { type: "enemy-damaged" }> | undefined)
        ?.amount,
    ).toBeGreaterThan(
      (bladeClose.events.find(
        (event) => event.type === "enemy-damaged",
      ) as Extract<PrototypeBEvent, { type: "enemy-damaged" }> | undefined)
        ?.amount ?? 0,
    );
  });

  it("telegraphs every enemy attack before resolving it", () => {
    const state = isolatedEnemyState("telegraph");
    const first = stepPrototypeB(state, {});
    const warning = first.events.find(
      (event) => event.type === "enemy-attack-telegraphed",
    );

    expect(warning).toMatchObject({
      type: "enemy-attack-telegraphed",
      cue: "enemy-warning",
      resolveTick:
        first.state.tick +
        ENEMY_DEFINITIONS["scrap-hound"].telegraphTicks,
    });
    expect(first.state.player.hp).toBe(first.state.player.maxHp);

    const resolved = runUntilEvent(
      first.state,
      "enemy-attack-resolved",
      {},
    );
    expect(
      resolved.events.some((event) => event.type === "player-damaged"),
    ).toBe(true);
  });

  it("reduces damage with guard and cancels it inside the just-guard window", () => {
    const start = stepPrototypeB(
      isolatedEnemyState("guard"),
      {},
    ).state;
    const normal = runUntilEvent(
      start,
      "enemy-attack-resolved",
      { guard: true },
    );
    const normalGuard = normal.events.find(
      (event) => event.type === "guard-resolved",
    );

    expect(normalGuard).toMatchObject({
      type: "guard-resolved",
      justGuard: false,
    });
    expect(normal.state.player.hp).toBeGreaterThan(
      normal.state.player.maxHp -
        ENEMY_DEFINITIONS["scrap-hound"].damage,
    );
    expect(normal.state.player.hp).toBeLessThan(normal.state.player.maxHp);

    let justState = stepPrototypeB(
      isolatedEnemyState("just-guard"),
      {},
    ).state;

    while (
      justState.enemies[0]?.attack.phase === "telegraph" &&
      (justState.enemies[0]?.attack.ticksRemaining ?? 0) > 4
    ) {
      justState = stepPrototypeB(justState, {}).state;
    }

    const just = runUntilEvent(
      justState,
      "enemy-attack-resolved",
      { guard: true },
    );
    expect(
      just.events.find((event) => event.type === "guard-resolved"),
    ).toMatchObject({
      type: "guard-resolved",
      justGuard: true,
      receivedDamage: 0,
      cue: "just-guard",
    });
    expect(just.state.player.hp).toBe(just.state.player.maxHp);
  });

  it("gives dodge invulnerability against a resolving telegraph", () => {
    let state = stepPrototypeB(
      isolatedEnemyState("dodge"),
      {},
    ).state;

    while (
      state.enemies[0]?.attack.phase === "telegraph" &&
      (state.enemies[0]?.attack.ticksRemaining ?? 0) > 1
    ) {
      state = stepPrototypeB(state, {}).state;
    }

    const dodged = stepPrototypeB(state, {
      moveY: 1,
      dodge: true,
    });
    expect(
      dodged.events.some((event) => event.type === "dodge-started"),
    ).toBe(true);
    expect(
      dodged.events.some((event) => event.type === "player-dodged") ||
        dodged.events.some(
          (event) =>
            event.type === "enemy-attack-resolved" && !event.hit,
        ),
    ).toBe(true);
    expect(dodged.state.player.hp).toBe(dodged.state.player.maxHp);
  });

  it("uses a finite healing item manually and rejects waste", () => {
    const initial = createPrototypeBState("healing");
    const hurt: PrototypeBState = {
      ...initial,
      player: {
        ...initial.player,
        hp: 22,
        healingItems: 1,
      },
      enemies: initial.enemies.map((enemy) => ({
        ...enemy,
        active: false,
      })),
    };
    const healed = stepPrototypeB(hurt, { useItem: true });

    expect(healed.state.player.hp).toBe(67);
    expect(healed.state.player.healingItems).toBe(0);
    expect(
      healed.events.find((event) => event.type === "item-used"),
    ).toMatchObject({
      type: "item-used",
      healed: 45,
      remainingItems: 0,
      cue: "heal",
    });

    const empty = stepPrototypeB(healed.state, { useItem: true });
    expect(
      empty.events.find((event) => event.type === "command-rejected"),
    ).toMatchObject({ reason: "item-empty" });
  });
});

describe("loot and relics", () => {
  it("applies all six deterministic pickups as meaningful state changes or keys", () => {
    let state = createPrototypeBState("loot");
    state = {
      ...state,
      enemies: state.enemies.map((enemy) => ({
        ...enemy,
        active: false,
      })),
    };

    for (const placement of LOOT_PLACEMENTS) {
      state = {
        ...state,
        player: {
          ...state.player,
          x: placement.x,
          y: placement.y,
        },
      };
      state = stepPrototypeB(state, { interact: true }).state;
    }

    expect(state.player.collectedLootIds).toHaveLength(6);
    expect(state.world.loot.every((pickup) => pickup.picked)).toBe(true);
    expect(state.player.weaponDamageBonuses.blade).toBe(6);
    expect(state.player.weaponDamageBonuses.impact).toBe(12);
    expect(state.player.healingItems).toBe(2);
    expect(state.player.relicDamage).toBe(24);
    expect(state.player.relicCooldownMaxTicks).toBe(4 * TICK_RATE);
    expect(state.player.collectedLootIds).toEqual(
      expect.arrayContaining(["quiet-chime", "signal-key"]),
    );
  });

  it("activates the relic only on command and emits its render/audio envelope", () => {
    const initial = isolatedEnemyState("relic", "relay-shell", {
      x: createPrototypeBState("relic").player.x + 120,
      attack: {
        phase: "recovery",
        ticksRemaining: 999,
        attackId: null,
        targetX: 0,
        targetY: 0,
        directionX: 0,
        directionY: 0,
      },
    });
    const targetHp = initial.enemies[0]?.hp ?? 0;
    const idle = stepPrototypeB(initial, {});
    expect(idle.state.enemies[0]?.hp).toBe(targetHp);

    const pulse = stepPrototypeB(initial, { activateRelic: true });
    expect(pulse.state.enemies[0]?.hp).toBe(
      targetHp - initial.player.relicDamage,
    );
    expect(
      pulse.events.find((event) => event.type === "relic-activated"),
    ).toMatchObject({
      radius: initial.player.relicRange,
      damage: initial.player.relicDamage,
      cue: "relic",
    });
  });
});

describe.each([
  ["destroy", null, { attack: true }],
  ["calm", "quiet-chime", { activateRelic: true }],
  ["connect", "signal-key", { interact: true }],
] as const)(
  "named anomaly %s outcome",
  (
    outcome: QuestOutcome,
    requiredLoot: LootId | null,
    resolutionCommand: PrototypeBCommand,
  ) => {
    it("resolves the anomaly and produces a distinct town result", () => {
      let state = prepareConfrontation(`outcome-${outcome}`);

      if (requiredLoot !== null) {
        state = grantLoot(state, requiredLoot);
      }

      if (outcome === "destroy") {
        state = {
          ...state,
          enemies: state.enemies.map((enemy) =>
            enemy.id === ANOMALY_ID
              ? {
                  ...enemy,
                  x: state.player.x + 50,
                  y: state.player.y,
                  hp: 1,
                  maxHp: enemy.maxHp,
                }
              : { ...enemy, active: false },
          ),
        };
      }

      state = stepPrototypeB(state, {
        chooseOutcome: outcome,
      }).state;
      const resolved = stepPrototypeB(state, resolutionCommand);
      expect(resolved.state.quest.phase).toBe("return-town");
      expect(resolved.state.quest.outcome).toBe(outcome);
      expect(
        resolved.events.find(
          (event) => event.type === "anomaly-resolved",
        ),
      ).toMatchObject({
        anomalyId: ANOMALY_ID,
        outcome,
        cue: `outcome-${outcome}`,
      });

      const result = returnToTown(resolved.state);
      expect(result.status).toBe("result");
      expect(result.quest.phase).toBe("result");
      expect(result.quest.result?.outcome).toBe(outcome);
      expect(result.quest.result?.title.length).toBeGreaterThan(0);
      expect(result.quest.result?.townReaction.length).toBeGreaterThan(0);
    });
  },
);

describe("determinism and spatial invariants", () => {
  it("replays identical seeds and commands to identical state hashes", () => {
    const commands: PrototypeBCommand[] = Array.from(
      { length: 420 },
      (_, tick) => ({
        moveX: Math.sin(tick / 19),
        moveY: Math.cos(tick / 31),
        attack: tick % 17 === 0,
        guard: tick % 47 >= 39,
        dodge: tick % 101 === 0,
        activateRelic: tick % 163 === 0,
        chooseWeapon: tick % 89 === 0 ? "impact" : undefined,
      }),
    );
    const first = runPrototypeBReplay("same-route", commands);
    const second = runPrototypeBReplay("same-route", commands);

    expect(second.hashes).toEqual(first.hashes);
    expect(second.events).toEqual(first.events);
    expect(hashPrototypeBState(second.state)).toBe(
      hashPrototypeBState(first.state),
    );
    expect(
      hashPrototypeBState(
        runPrototypeBReplay("different-route", commands).state,
      ),
    ).not.toBe(hashPrototypeBState(first.state));
  });

  it("never mutates the supplied state", () => {
    const state = createPrototypeBState("immutable");
    const before = hashPrototypeBState(state);
    const result = stepPrototypeB(state, {
      moveX: 1,
      attack: true,
      activateRelic: true,
    });

    expect(hashPrototypeBState(state)).toBe(before);
    expect(result.state).not.toBe(state);
    expect(result.state.player).not.toBe(state.player);
    expect(result.state.world.loot).not.toBe(state.world.loot);
  });

  it("keeps the player inside world bounds and outside solid terrain", () => {
    let state = createPrototypeBState("bounds");
    state = {
      ...state,
      enemies: state.enemies.map((enemy) => ({
        ...enemy,
        active: false,
      })),
    };

    const directions: readonly PrototypeBCommand[] = [
      { moveX: 1, moveY: 1 },
      { moveX: -1, moveY: 1 },
      { moveX: -1, moveY: -1 },
      { moveX: 1, moveY: -1 },
    ];

    for (const direction of directions) {
      for (let tick = 0; tick < 900; tick += 1) {
        state = stepPrototypeB(state, direction).state;
        expect(state.player.x).toBeGreaterThanOrEqual(
          state.player.radius,
        );
        expect(state.player.x).toBeLessThanOrEqual(
          WORLD_WIDTH - state.player.radius,
        );
        expect(state.player.y).toBeGreaterThanOrEqual(
          state.player.radius,
        );
        expect(state.player.y).toBeLessThanOrEqual(
          WORLD_HEIGHT - state.player.radius,
        );
        expect(Number.isFinite(state.player.x)).toBe(true);
        expect(Number.isFinite(state.player.y)).toBe(true);
      }
    }

    const well = TERRAIN_PLACEMENTS.find(
      (terrain) => terrain.id === "town-well",
    );

    if (well === undefined) {
      throw new Error("Town well collision fixture is missing.");
    }

    state = {
      ...state,
      player: {
        ...state.player,
        x: well.bounds.x - state.player.radius - 2,
        y: well.bounds.y + well.bounds.height / 2,
      },
    };

    for (let tick = 0; tick < 60; tick += 1) {
      state = stepPrototypeB(state, { moveX: 1 }).state;
    }

    expect(state.player.x).toBeLessThanOrEqual(
      well.bounds.x - state.player.radius,
    );
  });
});
