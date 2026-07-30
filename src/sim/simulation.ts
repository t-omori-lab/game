import {
  ENEMY_DEFINITIONS,
  PLAYER_BASE_STATS,
  REGULAR_ENEMY_KINDS,
  UPGRADE_DEFINITIONS,
  UPGRADE_IDS,
  createEmptyUpgradeRanks,
  type EnemyKind,
  type UpgradeId,
} from "../content";
import { nextRandom, normalizeSeed } from "./random";
import type {
  DamageSource,
  EnemyState,
  PlayerState,
  ProjectileState,
  PulseState,
  SimulationCommand,
  SimulationEvent,
  SimulationSeed,
  SimulationState,
  SimulationStepResult,
  UpgradeChoice,
} from "./types";

export const TICK_RATE = 30;
export const ARENA_WIDTH = 960;
export const ARENA_HEIGHT = 540;
export const RUN_DURATION_TICKS = 8 * 60 * TICK_RATE;

const REGULAR_SPAWN_INTERVAL_TICKS = 45;
const MAX_REGULAR_ENEMIES = 80;
const INITIAL_ENEMY_COUNT = 3;
const MIN_ATTACK_INTERVAL_TICKS = 5;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function cloneState(state: SimulationState): SimulationState {
  return {
    ...state,
    player: { ...state.player },
    enemies: state.enemies.map((enemy) => ({ ...enemy })),
    projectiles: state.projectiles.map((projectile) => ({ ...projectile })),
    pulses: state.pulses.map((pulse) => ({
      ...pulse,
      hitEnemyIds: [...pulse.hitEnemyIds],
    })),
    upgradeChoices:
      state.upgradeChoices === null
        ? null
        : state.upgradeChoices.map((choice) => ({ ...choice })),
    upgradeRanks: { ...state.upgradeRanks },
  };
}

function drawRandom(state: SimulationState): number {
  const draw = nextRandom(state.rngState);
  state.rngState = draw.state;
  state.rngDraws += 1;
  return draw.value;
}

function allocateId(state: SimulationState, prefix: string): string {
  const id = `${prefix}-${state.nextEntityId}`;
  state.nextEntityId += 1;
  return id;
}

function createPlayer(): PlayerState {
  return {
    id: "player",
    x: ARENA_WIDTH / 2,
    y: ARENA_HEIGHT / 2,
    radius: PLAYER_BASE_STATS.radius,
    hp: PLAYER_BASE_STATS.maxHp,
    maxHp: PLAYER_BASE_STATS.maxHp,
    speed: PLAYER_BASE_STATS.speed,
    level: 1,
    xp: 0,
    xpToNext: PLAYER_BASE_STATS.xpToNext,
    attackDamage: PLAYER_BASE_STATS.attackDamage,
    attackRange: PLAYER_BASE_STATS.attackRange,
    attackIntervalTicks: PLAYER_BASE_STATS.attackIntervalTicks,
    attackCooldownTicks: 0,
    projectileSpeed: PLAYER_BASE_STATS.projectileSpeed,
    projectileRadius: PLAYER_BASE_STATS.projectileRadius,
    skillDamage: PLAYER_BASE_STATS.skillDamage,
    skillRadius: PLAYER_BASE_STATS.skillRadius,
    skillDurationTicks: PLAYER_BASE_STATS.skillDurationTicks,
    skillCooldownTicks: 0,
    skillCooldownMaxTicks: PLAYER_BASE_STATS.skillCooldownTicks,
  };
}

function chooseRegularEnemyKind(state: SimulationState): EnemyKind {
  const progress = clamp(
    state.elapsedTicks / state.runDurationTicks,
    0,
    1,
  );
  const roll = drawRandom(state);
  const skitterThreshold = 0.62 - progress * 0.22;
  const bruteThreshold = skitterThreshold + 0.25 + progress * 0.08;

  if (roll < skitterThreshold) {
    return REGULAR_ENEMY_KINDS[0] ?? "skitter";
  }

  if (roll < bruteThreshold) {
    return REGULAR_ENEMY_KINDS[1] ?? "brute";
  }

  return REGULAR_ENEMY_KINDS[2] ?? "wisp";
}

function createEnemy(
  state: SimulationState,
  kind: EnemyKind,
  elite: boolean,
): EnemyState {
  const definition = ENEMY_DEFINITIONS[kind];
  const radiusMultiplier = elite ? 1.15 : 1;
  const radius = definition.radius * radiusMultiplier;
  const side = Math.floor(drawRandom(state) * 4);
  const alongEdge = drawRandom(state);
  let x = radius;
  let y = radius;

  switch (side) {
    case 0:
      x = radius;
      y = radius + alongEdge * (ARENA_HEIGHT - radius * 2);
      break;
    case 1:
      x = ARENA_WIDTH - radius;
      y = radius + alongEdge * (ARENA_HEIGHT - radius * 2);
      break;
    case 2:
      x = radius + alongEdge * (ARENA_WIDTH - radius * 2);
      y = radius;
      break;
    case 3:
      x = radius + alongEdge * (ARENA_WIDTH - radius * 2);
      y = ARENA_HEIGHT - radius;
      break;
  }

  const maxHp = Math.round(definition.maxHp * (elite ? 1.8 : 1));

  return {
    id: allocateId(state, "enemy"),
    kind,
    x,
    y,
    radius,
    hp: maxHp,
    maxHp,
    speed: definition.speed * (elite ? 1.12 : 1),
    damage: Math.round(definition.damage * (elite ? 1.5 : 1)),
    attackCooldownTicks: 0,
    attackCooldownMaxTicks: definition.attackIntervalTicks,
    xpReward: Math.round(definition.xpReward * (elite ? 2 : 1)),
    elite,
    boss: kind === "boss",
  };
}

function spawnRegularEnemy(
  state: SimulationState,
  events: SimulationEvent[] | null,
  allowElite: boolean,
): void {
  const kind = chooseRegularEnemyKind(state);
  const eliteChance = clamp(
    (state.elapsedTicks - 60 * TICK_RATE) / state.runDurationTicks,
    0,
    0.18,
  );
  const elite = allowElite && drawRandom(state) < eliteChance;
  const enemy = createEnemy(state, kind, elite);
  state.enemies.push(enemy);

  events?.push({
    type: "enemy-spawned",
    tick: state.tick,
    enemyId: enemy.id,
    kind: enemy.kind,
    elite: enemy.elite,
    boss: false,
  });
}

function spawnBoss(
  state: SimulationState,
  events: SimulationEvent[],
): void {
  const boss = createEnemy(state, "boss", false);
  state.enemies.push(boss);
  state.bossSpawned = true;
  events.push({
    type: "enemy-spawned",
    tick: state.tick,
    enemyId: boss.id,
    kind: boss.kind,
    elite: false,
    boss: true,
  });
  events.push({
    type: "boss-triggered",
    tick: state.tick,
    enemyId: boss.id,
  });
}

function normalizedAxis(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) {
    return 0;
  }

  return clamp(value, -1, 1);
}

function movePlayer(player: PlayerState, command: SimulationCommand): void {
  let moveX = normalizedAxis(command.moveX);
  let moveY = normalizedAxis(command.moveY);
  const magnitude = Math.hypot(moveX, moveY);

  if (magnitude > 1) {
    moveX /= magnitude;
    moveY /= magnitude;
  }

  const distance = player.speed / TICK_RATE;
  player.x = clamp(
    player.x + moveX * distance,
    player.radius,
    ARENA_WIDTH - player.radius,
  );
  player.y = clamp(
    player.y + moveY * distance,
    player.radius,
    ARENA_HEIGHT - player.radius,
  );
}

function moveEnemiesAndResolveContact(
  state: SimulationState,
  events: SimulationEvent[],
): boolean {
  for (const enemy of state.enemies) {
    enemy.attackCooldownTicks = Math.max(
      0,
      enemy.attackCooldownTicks - 1,
    );

    const deltaX = state.player.x - enemy.x;
    const deltaY = state.player.y - enemy.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > 0) {
      const stepDistance = Math.min(enemy.speed / TICK_RATE, distance);
      enemy.x = clamp(
        enemy.x + (deltaX / distance) * stepDistance,
        enemy.radius,
        ARENA_WIDTH - enemy.radius,
      );
      enemy.y = clamp(
        enemy.y + (deltaY / distance) * stepDistance,
        enemy.radius,
        ARENA_HEIGHT - enemy.radius,
      );
    }

    const contactDistance = Math.hypot(
      state.player.x - enemy.x,
      state.player.y - enemy.y,
    );

    if (
      contactDistance <= state.player.radius + enemy.radius &&
      enemy.attackCooldownTicks === 0
    ) {
      state.player.hp = Math.max(0, state.player.hp - enemy.damage);
      enemy.attackCooldownTicks = enemy.attackCooldownMaxTicks;
      events.push({
        type: "player-damaged",
        tick: state.tick,
        enemyId: enemy.id,
        amount: enemy.damage,
        remainingHp: state.player.hp,
      });

      if (state.player.hp === 0) {
        state.status = "lost";
        events.push({
          type: "player-defeated",
          tick: state.tick,
        });
        return true;
      }
    }
  }

  return false;
}

function findNearestTarget(state: SimulationState): EnemyState | null {
  let nearest: EnemyState | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const enemy of state.enemies) {
    const distance = Math.hypot(
      enemy.x - state.player.x,
      enemy.y - state.player.y,
    );

    if (
      distance <= state.player.attackRange + enemy.radius &&
      distance < nearestDistance
    ) {
      nearest = enemy;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function fireAutomaticAttack(
  state: SimulationState,
  events: SimulationEvent[],
): void {
  if (state.player.attackCooldownTicks > 0) {
    return;
  }

  const target = findNearestTarget(state);

  if (target === null) {
    return;
  }

  const deltaX = target.x - state.player.x;
  const deltaY = target.y - state.player.y;
  const distance = Math.hypot(deltaX, deltaY);
  const directionX = distance === 0 ? 1 : deltaX / distance;
  const directionY = distance === 0 ? 0 : deltaY / distance;
  const projectile: ProjectileState = {
    id: allocateId(state, "projectile"),
    targetId: target.id,
    x: state.player.x,
    y: state.player.y,
    velocityX: directionX * state.player.projectileSpeed,
    velocityY: directionY * state.player.projectileSpeed,
    angle: Math.atan2(directionY, directionX),
    radius: state.player.projectileRadius,
    damage: state.player.attackDamage,
    remainingTicks:
      Math.ceil(
        (state.player.attackRange / state.player.projectileSpeed) * TICK_RATE,
      ) + 2,
  };

  state.projectiles.push(projectile);
  state.player.attackCooldownTicks = state.player.attackIntervalTicks;
  events.push({
    type: "projectile-fired",
    tick: state.tick,
    projectileId: projectile.id,
    targetId: target.id,
  });
}

function activateSkill(
  state: SimulationState,
  command: SimulationCommand,
  events: SimulationEvent[],
): void {
  if (command.activateSkill !== true || state.player.skillCooldownTicks > 0) {
    return;
  }

  const pulse: PulseState = {
    id: allocateId(state, "pulse"),
    x: state.player.x,
    y: state.player.y,
    radius: 0,
    maxRadius: state.player.skillRadius,
    damage: state.player.skillDamage,
    remainingTicks: state.player.skillDurationTicks,
    totalTicks: state.player.skillDurationTicks,
    hitEnemyIds: [],
  };

  state.pulses.push(pulse);
  state.player.skillCooldownTicks = state.player.skillCooldownMaxTicks;
  events.push({
    type: "pulse-activated",
    tick: state.tick,
    pulseId: pulse.id,
  });
}

function defeatEnemy(
  state: SimulationState,
  enemy: EnemyState,
  events: SimulationEvent[],
): void {
  state.kills += 1;
  state.player.xp += enemy.xpReward;
  events.push({
    type: "enemy-defeated",
    tick: state.tick,
    enemyId: enemy.id,
    kind: enemy.kind,
    xpReward: enemy.xpReward,
    boss: enemy.boss,
  });
  events.push({
    type: "xp-gained",
    tick: state.tick,
    amount: enemy.xpReward,
    totalXp: state.player.xp,
  });

  if (enemy.boss) {
    state.bossDefeated = true;
  }
}

function damageEnemy(
  state: SimulationState,
  enemyId: string,
  amount: number,
  source: DamageSource,
  events: SimulationEvent[],
): void {
  const enemyIndex = state.enemies.findIndex((enemy) => enemy.id === enemyId);

  if (enemyIndex < 0) {
    return;
  }

  const enemy = state.enemies[enemyIndex];

  if (enemy === undefined) {
    return;
  }

  enemy.hp = Math.max(0, enemy.hp - amount);
  events.push({
    type: "enemy-damaged",
    tick: state.tick,
    enemyId: enemy.id,
    amount,
    remainingHp: enemy.hp,
    source,
  });

  if (enemy.hp === 0) {
    state.enemies.splice(enemyIndex, 1);
    defeatEnemy(state, enemy, events);
  }
}

function updateProjectiles(
  state: SimulationState,
  events: SimulationEvent[],
): void {
  const survivingProjectiles: ProjectileState[] = [];

  for (const projectile of state.projectiles) {
    projectile.x += projectile.velocityX / TICK_RATE;
    projectile.y += projectile.velocityY / TICK_RATE;
    projectile.remainingTicks -= 1;

    const hitEnemy = state.enemies.find(
      (enemy) =>
        Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y) <=
        enemy.radius + projectile.radius,
    );

    if (hitEnemy !== undefined) {
      damageEnemy(
        state,
        hitEnemy.id,
        projectile.damage,
        "projectile",
        events,
      );
      continue;
    }

    const isInsideArena =
      projectile.x >= 0 &&
      projectile.x <= ARENA_WIDTH &&
      projectile.y >= 0 &&
      projectile.y <= ARENA_HEIGHT;

    if (projectile.remainingTicks > 0 && isInsideArena) {
      survivingProjectiles.push(projectile);
    }
  }

  state.projectiles = survivingProjectiles;
}

function updatePulses(
  state: SimulationState,
  events: SimulationEvent[],
): void {
  const survivingPulses: PulseState[] = [];

  for (const pulse of state.pulses) {
    pulse.remainingTicks -= 1;
    const elapsedTicks = pulse.totalTicks - pulse.remainingTicks;
    pulse.radius = pulse.maxRadius * (elapsedTicks / pulse.totalTicks);
    const alreadyHit = new Set(pulse.hitEnemyIds);
    const hitEnemyIds = state.enemies
      .filter(
        (enemy) =>
          !alreadyHit.has(enemy.id) &&
          Math.hypot(enemy.x - pulse.x, enemy.y - pulse.y) <=
            pulse.radius + enemy.radius,
      )
      .map((enemy) => enemy.id);

    for (const enemyId of hitEnemyIds) {
      pulse.hitEnemyIds.push(enemyId);
      damageEnemy(state, enemyId, pulse.damage, "pulse", events);
    }

    if (pulse.remainingTicks > 0) {
      survivingPulses.push(pulse);
    }
  }

  state.pulses = survivingPulses;
}

function rollUpgradeChoices(state: SimulationState): UpgradeChoice[] {
  const available = [...UPGRADE_IDS];
  const choices: UpgradeChoice[] = [];

  while (choices.length < 3 && available.length > 0) {
    const index = Math.floor(drawRandom(state) * available.length);
    const [upgradeId] = available.splice(index, 1);

    if (upgradeId === undefined) {
      continue;
    }

    const definition = UPGRADE_DEFINITIONS[upgradeId];
    choices.push({
      id: definition.id,
      title: definition.title,
      description: definition.description,
      nextRank: state.upgradeRanks[upgradeId] + 1,
    });
  }

  return choices;
}

function offerUpgrade(
  state: SimulationState,
  events: SimulationEvent[],
): void {
  if (state.player.xp < state.player.xpToNext || state.bossDefeated) {
    return;
  }

  state.player.xp -= state.player.xpToNext;
  state.player.level += 1;
  state.player.xpToNext = Math.round(state.player.xpToNext * 1.4 + 10);
  state.upgradeChoices = rollUpgradeChoices(state);
  state.status = "upgrade";
  events.push({
    type: "upgrade-offered",
    tick: state.tick,
    level: state.player.level,
    choices: state.upgradeChoices.map((choice) => ({ ...choice })),
  });
}

function applyUpgrade(
  state: SimulationState,
  upgradeId: UpgradeId,
): number {
  const rank = state.upgradeRanks[upgradeId] + 1;
  state.upgradeRanks[upgradeId] = rank;

  switch (upgradeId) {
    case "rapid-fire":
      state.player.attackIntervalTicks = Math.max(
        MIN_ATTACK_INTERVAL_TICKS,
        Math.floor(state.player.attackIntervalTicks * 0.8),
      );
      state.player.attackCooldownTicks = Math.min(
        state.player.attackCooldownTicks,
        state.player.attackIntervalTicks,
      );
      break;
    case "heavy-shot":
      state.player.attackDamage += 8;
      break;
    case "swift-boots":
      state.player.speed += 20;
      break;
    case "vitality":
      state.player.maxHp += 20;
      state.player.hp += 20;
      break;
    case "pulse-core":
      state.player.skillDamage += 15;
      state.player.skillRadius += 16;
      break;
    case "field-repair":
      state.player.hp = Math.min(state.player.maxHp, state.player.hp + 35);
      break;
  }

  return rank;
}

function resolvePausedUpgrade(
  state: SimulationState,
  command: SimulationCommand,
): SimulationStepResult {
  const events: SimulationEvent[] = [];
  const choiceIndex = command.upgradeChoice;

  if (
    choiceIndex === undefined ||
    !Number.isInteger(choiceIndex) ||
    choiceIndex < 0 ||
    choiceIndex >= (state.upgradeChoices?.length ?? 0)
  ) {
    if (choiceIndex !== undefined) {
      events.push({
        type: "command-rejected",
        tick: state.tick,
        reason: "invalid-upgrade-choice",
      });
    }

    return { state, events };
  }

  const choice = state.upgradeChoices?.[choiceIndex];

  if (choice === undefined) {
    return { state, events };
  }

  const rank = applyUpgrade(state, choice.id);
  state.upgradeChoices = null;
  state.status = "running";
  events.push({
    type: "upgrade-applied",
    tick: state.tick,
    upgradeId: choice.id,
    rank,
  });
  offerUpgrade(state, events);

  return { state, events };
}

export function createInitialState(seed: SimulationSeed): SimulationState {
  const normalizedSeed = normalizeSeed(seed);
  const state: SimulationState = {
    saveVersion: 1,
    contentVersion: "first-slice-1",
    seed: normalizedSeed,
    rngState: normalizedSeed,
    rngDraws: 0,
    tick: 0,
    elapsedTicks: 0,
    runDurationTicks: RUN_DURATION_TICKS,
    status: "running",
    nextEntityId: 1,
    kills: 0,
    bossSpawned: false,
    bossDefeated: false,
    player: createPlayer(),
    enemies: [],
    projectiles: [],
    pulses: [],
    upgradeChoices: null,
    upgradeRanks: createEmptyUpgradeRanks(),
  };

  for (let index = 0; index < INITIAL_ENEMY_COUNT; index += 1) {
    spawnRegularEnemy(state, null, false);
  }

  return state;
}

export function stepSimulation(
  inputState: SimulationState,
  command: SimulationCommand = {},
): SimulationStepResult {
  const state = cloneState(inputState);

  if (state.status === "upgrade") {
    return resolvePausedUpgrade(state, command);
  }

  if (state.status === "won" || state.status === "lost") {
    return { state, events: [] };
  }

  const events: SimulationEvent[] = [];
  state.tick += 1;
  state.elapsedTicks += 1;
  state.player.attackCooldownTicks = Math.max(
    0,
    state.player.attackCooldownTicks - 1,
  );
  state.player.skillCooldownTicks = Math.max(
    0,
    state.player.skillCooldownTicks - 1,
  );
  movePlayer(state.player, command);

  if (
    state.elapsedTicks < state.runDurationTicks &&
    state.elapsedTicks % REGULAR_SPAWN_INTERVAL_TICKS === 0 &&
    state.enemies.filter((enemy) => !enemy.boss).length <
      MAX_REGULAR_ENEMIES
  ) {
    spawnRegularEnemy(state, events, true);
  }

  if (
    state.elapsedTicks >= state.runDurationTicks &&
    !state.bossSpawned
  ) {
    spawnBoss(state, events);
  }

  const playerWasDefeated = moveEnemiesAndResolveContact(state, events);

  if (playerWasDefeated) {
    return { state, events };
  }

  activateSkill(state, command, events);
  fireAutomaticAttack(state, events);
  updateProjectiles(state, events);
  updatePulses(state, events);

  if (state.bossDefeated) {
    state.status = "won";
    state.upgradeChoices = null;
    events.push({
      type: "run-won",
      tick: state.tick,
    });
    return { state, events };
  }

  offerUpgrade(state, events);

  return { state, events };
}
