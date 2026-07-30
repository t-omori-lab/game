import {
  ANOMALY_ID,
  ENEMY_DEFINITIONS,
  ENEMY_PLACEMENTS,
  LANDMARKS,
  LANDMARK_LIST,
  LOOT_DEFINITIONS,
  LOOT_PLACEMENTS,
  OUTCOME_RESULTS,
  PROP_PLACEMENTS,
  TERRAIN_PLACEMENTS,
  TICK_RATE,
  WEAPON_DEFINITIONS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./content";
import {
  nextPrototypeBRandom,
  normalizePrototypeBSeed,
} from "./random";
import type {
  EnemyAttackState,
  EnemyState,
  LandmarkDefinition,
  LandmarkId,
  LootId,
  PlayerState,
  Point,
  PrototypeBCommand,
  PrototypeBEvent,
  PrototypeBSeed,
  PrototypeBState,
  PrototypeBStepResult,
  QuestOutcome,
  QuestPhase,
  Rect,
  TerrainPlacement,
  WeaponDefinition,
} from "./types";

const PLAYER_RADIUS = 18;
const PLAYER_SPEED = 162;
const PLAYER_MAX_HP = 100;
const DODGE_DISTANCE = 92;
const DODGE_COOLDOWN_TICKS = 30;
const DODGE_INVULNERABLE_TICKS = 8;
const JUST_GUARD_WINDOW_TICKS = 4;
const GUARD_DAMAGE_MULTIPLIER = 0.3;
export const INTERACTION_REACH = 70;
export const ANOMALY_CONFRONTATION_RANGE = 360;
export const ANOMALY_INTERACTION_REACH = 90;
const POSITION_STEP_SIZE = 8;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function finiteAxis(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) {
    return 0;
  }

  return clamp(value, -1, 1);
}

function normalizedVector(x: number, y: number): Point {
  const magnitude = Math.hypot(x, y);

  if (magnitude === 0) {
    return { x: 0, y: 0 };
  }

  return { x: x / magnitude, y: y / magnitude };
}

function distanceBetween(
  firstX: number,
  firstY: number,
  secondX: number,
  secondY: number,
): number {
  return Math.hypot(firstX - secondX, firstY - secondY);
}

function pointInRect(x: number, y: number, rect: Rect): boolean {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}

function circleOverlapsRect(
  x: number,
  y: number,
  radius: number,
  rect: Rect,
): boolean {
  const closestX = clamp(x, rect.x, rect.x + rect.width);
  const closestY = clamp(y, rect.y, rect.y + rect.height);
  const deltaX = x - closestX;
  const deltaY = y - closestY;

  return deltaX * deltaX + deltaY * deltaY < radius * radius;
}

function cloneLandmark(landmark: LandmarkDefinition): LandmarkDefinition {
  return {
    ...landmark,
    bounds: { ...landmark.bounds },
    center: { ...landmark.center },
    interactionPoint: { ...landmark.interactionPoint },
  };
}

function cloneTerrain(terrain: TerrainPlacement): TerrainPlacement {
  return {
    ...terrain,
    bounds: { ...terrain.bounds },
  };
}

function cloneState(state: PrototypeBState): PrototypeBState {
  return {
    ...state,
    player: {
      ...state.player,
      weaponDamageBonuses: { ...state.player.weaponDamageBonuses },
      collectedLootIds: [...state.player.collectedLootIds],
    },
    enemies: state.enemies.map((enemy) => ({
      ...enemy,
      attack: { ...enemy.attack },
    })),
    world: {
      ...state.world,
      landmarks: state.world.landmarks.map(cloneLandmark),
      terrain: state.world.terrain.map(cloneTerrain),
      props: state.world.props.map((prop) => ({ ...prop })),
      loot: state.world.loot.map((pickup) => ({ ...pickup })),
    },
    quest: {
      ...state.quest,
      visitedLandmarkIds: [...state.quest.visitedLandmarkIds],
      result:
        state.quest.result === null ? null : { ...state.quest.result },
    },
  };
}

function createIdleAttack(): EnemyAttackState {
  return {
    phase: "idle",
    ticksRemaining: 0,
    attackId: null,
    targetX: 0,
    targetY: 0,
    directionX: 0,
    directionY: 0,
  };
}

function createPlayer(): PlayerState {
  return {
    id: "player",
    x: 430,
    y: 900,
    radius: PLAYER_RADIUS,
    facingX: 1,
    facingY: 0,
    hp: PLAYER_MAX_HP,
    maxHp: PLAYER_MAX_HP,
    speed: PLAYER_SPEED,
    weaponId: "blade",
    weaponCooldownTicks: 0,
    weaponDamageBonuses: {
      blade: 0,
      impact: 0,
    },
    guarding: false,
    guardStartedTick: null,
    dodgeCooldownTicks: 0,
    invulnerableTicks: 0,
    relicCooldownTicks: 0,
    relicCooldownMaxTicks: 5 * TICK_RATE,
    relicDamage: 14,
    relicRange: 180,
    healingItems: 1,
    healingAmount: 45,
    collectedLootIds: [],
  };
}

function createEnemy(
  kind: EnemyState["kind"],
  id: string,
  x: number,
  y: number,
): EnemyState {
  const definition = ENEMY_DEFINITIONS[kind];
  const named = kind === "named-anomaly";

  return {
    id,
    kind,
    name: definition.name,
    x,
    y,
    radius: definition.radius,
    hp: definition.maxHp,
    maxHp: definition.maxHp,
    active: !named,
    defeated: false,
    disposition: named ? "dormant" : "hostile",
    attack: createIdleAttack(),
  };
}

export function createPrototypeBState(
  seed: PrototypeBSeed,
): PrototypeBState {
  const normalizedSeed = normalizePrototypeBSeed(seed);
  let rngState = normalizedSeed;
  let rngDraws = 0;

  const draw = (): number => {
    const result = nextPrototypeBRandom(rngState);
    rngState = result.state;
    rngDraws += 1;
    return result.value;
  };

  const enemies = ENEMY_PLACEMENTS.map((placement) => {
    if (placement.kind === "named-anomaly") {
      return createEnemy(
        placement.kind,
        placement.id,
        placement.x,
        placement.y,
      );
    }

    const jitterX = (draw() - 0.5) * 72;
    const jitterY = (draw() - 0.5) * 72;
    return createEnemy(
      placement.kind,
      placement.id,
      placement.x + jitterX,
      placement.y + jitterY,
    );
  });

  return {
    saveVersion: 1,
    contentVersion: "prototype-b-1",
    seed: normalizedSeed,
    rngState,
    rngDraws,
    tick: 0,
    status: "playing",
    nextActionId: 1,
    player: createPlayer(),
    enemies,
    world: {
      width: WORLD_WIDTH,
      height: WORLD_HEIGHT,
      landmarks: LANDMARK_LIST.map(cloneLandmark),
      terrain: TERRAIN_PLACEMENTS.map(cloneTerrain),
      props: PROP_PLACEMENTS.map((prop) => ({ ...prop })),
      loot: LOOT_PLACEMENTS.map((pickup) => ({
        ...pickup,
        picked: false,
      })),
    },
    quest: {
      phase: "briefing",
      objective: "Read the town contract board.",
      visitedLandmarkIds: ["town"],
      intent: null,
      outcome: null,
      result: null,
    },
  };
}

function allocateActionId(
  state: PrototypeBState,
  prefix: string,
): string {
  const id = `${prefix}-${state.nextActionId}`;
  state.nextActionId += 1;
  return id;
}

function collidesWithTerrain(
  state: PrototypeBState,
  x: number,
  y: number,
  radius: number,
): boolean {
  return state.world.terrain.some(
    (terrain) =>
      terrain.solid &&
      circleOverlapsRect(x, y, radius, terrain.bounds),
  );
}

function moveCircle(
  state: PrototypeBState,
  startX: number,
  startY: number,
  radius: number,
  deltaX: number,
  deltaY: number,
): Point {
  const stepCount = Math.max(
    1,
    Math.ceil(
      Math.max(Math.abs(deltaX), Math.abs(deltaY)) /
        POSITION_STEP_SIZE,
    ),
  );
  const stepX = deltaX / stepCount;
  const stepY = deltaY / stepCount;
  let x = startX;
  let y = startY;

  for (let step = 0; step < stepCount; step += 1) {
    const candidateX = clamp(x + stepX, radius, state.world.width - radius);

    if (!collidesWithTerrain(state, candidateX, y, radius)) {
      x = candidateX;
    }

    const candidateY = clamp(y + stepY, radius, state.world.height - radius);

    if (!collidesWithTerrain(state, x, candidateY, radius)) {
      y = candidateY;
    }
  }

  return { x, y };
}

function decrementPlayerTimers(player: PlayerState): void {
  player.weaponCooldownTicks = Math.max(
    0,
    player.weaponCooldownTicks - 1,
  );
  player.dodgeCooldownTicks = Math.max(
    0,
    player.dodgeCooldownTicks - 1,
  );
  player.invulnerableTicks = Math.max(0, player.invulnerableTicks - 1);
  player.relicCooldownTicks = Math.max(
    0,
    player.relicCooldownTicks - 1,
  );
}

function updateFacing(
  player: PlayerState,
  moveX: number,
  moveY: number,
): Point {
  const direction = normalizedVector(moveX, moveY);

  if (direction.x !== 0 || direction.y !== 0) {
    player.facingX = direction.x;
    player.facingY = direction.y;
  }

  return direction;
}

function moveOrDodgePlayer(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): boolean {
  const moveX = finiteAxis(command.moveX);
  const moveY = finiteAxis(command.moveY);
  const direction = updateFacing(state.player, moveX, moveY);

  if (command.dodge === true && state.player.dodgeCooldownTicks === 0) {
    const dodgeDirection =
      direction.x === 0 && direction.y === 0
        ? {
            x: state.player.facingX,
            y: state.player.facingY,
          }
        : direction;
    const fromX = state.player.x;
    const fromY = state.player.y;
    const destination = moveCircle(
      state,
      fromX,
      fromY,
      state.player.radius,
      dodgeDirection.x * DODGE_DISTANCE,
      dodgeDirection.y * DODGE_DISTANCE,
    );
    state.player.x = destination.x;
    state.player.y = destination.y;
    state.player.dodgeCooldownTicks = DODGE_COOLDOWN_TICKS;
    state.player.invulnerableTicks = DODGE_INVULNERABLE_TICKS;
    state.player.guarding = false;
    state.player.guardStartedTick = null;
    events.push({
      type: "dodge-started",
      tick: state.tick,
      fromX,
      fromY,
      toX: destination.x,
      toY: destination.y,
      invulnerableTicks: DODGE_INVULNERABLE_TICKS,
      cue: "dodge",
    });
    return true;
  }

  const destination = moveCircle(
    state,
    state.player.x,
    state.player.y,
    state.player.radius,
    direction.x * (state.player.speed / TICK_RATE),
    direction.y * (state.player.speed / TICK_RATE),
  );
  state.player.x = destination.x;
  state.player.y = destination.y;
  return false;
}

function updateGuard(
  state: PrototypeBState,
  command: PrototypeBCommand,
): void {
  const wasGuarding = state.player.guarding;
  const wantsGuard = command.guard === true && command.dodge !== true;
  state.player.guarding = wantsGuard;

  if (wantsGuard && !wasGuarding) {
    state.player.guardStartedTick = state.tick;
  } else if (!wantsGuard) {
    state.player.guardStartedTick = null;
  }
}

function setQuestPhase(
  state: PrototypeBState,
  phase: QuestPhase,
  objective: string,
  events: PrototypeBEvent[],
): void {
  state.quest.phase = phase;
  state.quest.objective = objective;
  events.push({
    type: "quest-advanced",
    tick: state.tick,
    phase,
    objective,
    cue: "quest",
  });
}

function recordLandmarkEntry(
  state: PrototypeBState,
  landmarkId: LandmarkId,
  events: PrototypeBEvent[],
): void {
  if (state.quest.visitedLandmarkIds.includes(landmarkId)) {
    return;
  }

  state.quest.visitedLandmarkIds.push(landmarkId);
  events.push({
    type: "landmark-entered",
    tick: state.tick,
    landmarkId,
  });
}

function findAnomaly(state: PrototypeBState): EnemyState | undefined {
  return state.enemies.find((enemy) => enemy.id === ANOMALY_ID);
}

function updateQuestFromPosition(
  state: PrototypeBState,
  events: PrototypeBEvent[],
): void {
  const { x, y } = state.player;

  if (pointInRect(x, y, LANDMARKS.fork.bounds)) {
    recordLandmarkEntry(state, "fork", events);

    if (state.quest.phase === "travel-to-fork") {
      setQuestPhase(
        state,
        "travel-to-ruin",
        "Follow the eastern route to the Listening Ruin.",
        events,
      );
    }
  }

  if (pointInRect(x, y, LANDMARKS.ruin.bounds)) {
    recordLandmarkEntry(state, "ruin", events);
  }

  const anomaly = findAnomaly(state);

  if (
    state.quest.phase === "travel-to-ruin" &&
    anomaly !== undefined &&
    distanceBetween(x, y, anomaly.x, anomaly.y) <=
      ANOMALY_CONFRONTATION_RANGE
  ) {
    setQuestPhase(
      state,
      "confrontation",
      "Choose how to answer Orison: destroy, calm, or connect.",
      events,
    );
  }
}

function hasLoot(state: PrototypeBState, lootId: LootId): boolean {
  return state.player.collectedLootIds.includes(lootId);
}

function applyLootEffect(
  state: PrototypeBState,
  lootId: LootId,
): void {
  const definition = LOOT_DEFINITIONS[lootId];

  switch (definition.effect) {
    case "blade-damage":
      state.player.weaponDamageBonuses.blade += definition.amount;
      break;
    case "impact-damage":
      state.player.weaponDamageBonuses.impact += definition.amount;
      break;
    case "healing-item":
      state.player.healingItems += definition.amount;
      break;
    case "relic-power":
      state.player.relicDamage += definition.amount;
      state.player.relicCooldownMaxTicks = Math.max(
        2 * TICK_RATE,
        state.player.relicCooldownMaxTicks - TICK_RATE,
      );
      state.player.relicCooldownTicks = Math.min(
        state.player.relicCooldownTicks,
        state.player.relicCooldownMaxTicks,
      );
      break;
    case "calm-key":
    case "connect-key":
      break;
  }
}

function tryPickupLoot(
  state: PrototypeBState,
  events: PrototypeBEvent[],
): boolean {
  const candidates = state.world.loot
    .filter(
      (pickup) =>
        !pickup.picked &&
        distanceBetween(
          state.player.x,
          state.player.y,
          pickup.x,
          pickup.y,
        ) <=
          state.player.radius + pickup.radius + INTERACTION_REACH,
    )
    .sort((first, second) => {
      const firstDistance = distanceBetween(
        state.player.x,
        state.player.y,
        first.x,
        first.y,
      );
      const secondDistance = distanceBetween(
        state.player.x,
        state.player.y,
        second.x,
        second.y,
      );
      return (
        firstDistance - secondDistance ||
        first.id.localeCompare(second.id)
      );
    });
  const pickup = candidates[0];

  if (pickup === undefined) {
    return false;
  }

  pickup.picked = true;

  if (!hasLoot(state, pickup.lootId)) {
    state.player.collectedLootIds.push(pickup.lootId);
    applyLootEffect(state, pickup.lootId);
  }

  events.push({
    type: "loot-picked",
    tick: state.tick,
    pickupId: pickup.id,
    lootId: pickup.lootId,
    cue: "loot",
  });
  return true;
}

function resolveAnomaly(
  state: PrototypeBState,
  outcome: QuestOutcome,
  events: PrototypeBEvent[],
): void {
  if (state.quest.outcome !== null) {
    return;
  }

  const anomaly = findAnomaly(state);

  if (anomaly !== undefined) {
    anomaly.active = false;
    anomaly.attack = createIdleAttack();
    anomaly.disposition =
      outcome === "destroy"
        ? "destroyed"
        : outcome === "calm"
          ? "calmed"
          : "connected";
    anomaly.defeated = outcome === "destroy";

    if (outcome === "destroy") {
      anomaly.hp = 0;
    }
  }

  state.quest.intent = outcome;
  state.quest.outcome = outcome;
  events.push({
    type: "anomaly-resolved",
    tick: state.tick,
    anomalyId: ANOMALY_ID,
    outcome,
    cue:
      outcome === "destroy"
        ? "outcome-destroy"
        : outcome === "calm"
          ? "outcome-calm"
          : "outcome-connect",
  });
  setQuestPhase(
    state,
    "return-town",
    "Return to the Dustwake contract board.",
    events,
  );
}

function handleOutcomeChoice(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): void {
  const outcome = command.chooseOutcome;

  if (outcome === undefined) {
    return;
  }

  if (state.quest.phase !== "confrontation") {
    events.push({
      type: "command-rejected",
      tick: state.tick,
      reason: "wrong-quest-phase",
    });
    return;
  }

  if (state.quest.intent !== null || state.quest.outcome !== null) {
    events.push({
      type: "command-rejected",
      tick: state.tick,
      reason: "outcome-already-chosen",
    });
    return;
  }

  if (
    (outcome === "calm" && !hasLoot(state, "quiet-chime")) ||
    (outcome === "connect" && !hasLoot(state, "signal-key"))
  ) {
    events.push({
      type: "command-rejected",
      tick: state.tick,
      reason: "outcome-not-available",
    });
    return;
  }

  state.quest.intent = outcome;
  const anomaly = findAnomaly(state);

  if (anomaly !== undefined) {
    anomaly.active = true;
    anomaly.disposition = "hostile";
  }

  events.push({
    type: "outcome-committed",
    tick: state.tick,
    outcome,
  });
}

function nearPoint(
  player: PlayerState,
  point: Point,
  reach = INTERACTION_REACH,
): boolean {
  return (
    distanceBetween(player.x, player.y, point.x, point.y) <=
    player.radius + reach
  );
}

export function isWithinAnomalyInteractionReach(
  player: Pick<PlayerState, "x" | "y" | "radius">,
  anomaly: Pick<EnemyState, "x" | "y" | "radius">,
): boolean {
  return (
    distanceBetween(player.x, player.y, anomaly.x, anomaly.y) <=
    player.radius + anomaly.radius + ANOMALY_INTERACTION_REACH
  );
}

function handleInteraction(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): void {
  if (command.interact !== true) {
    return;
  }

  if (tryPickupLoot(state, events)) {
    return;
  }

  if (
    state.quest.phase === "briefing" &&
    nearPoint(state.player, LANDMARKS.town.interactionPoint)
  ) {
    setQuestPhase(
      state,
      "travel-to-fork",
      "Reach the Three-Way Fork.",
      events,
    );
    return;
  }

  const anomaly = findAnomaly(state);

  if (
    state.quest.phase === "confrontation" &&
    state.quest.intent === "connect" &&
    anomaly !== undefined &&
    isWithinAnomalyInteractionReach(state.player, anomaly)
  ) {
    resolveAnomaly(state, "connect", events);
    return;
  }

  if (
    state.quest.phase === "return-town" &&
    state.quest.outcome !== null &&
    nearPoint(state.player, LANDMARKS.town.interactionPoint)
  ) {
    const result = { ...OUTCOME_RESULTS[state.quest.outcome] };
    state.quest.phase = "result";
    state.quest.objective = "Route complete.";
    state.quest.result = result;
    state.status = "result";
    events.push({
      type: "result-reached",
      tick: state.tick,
      result,
      cue: "result",
    });
  }
}

function chooseWeapon(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): void {
  if (
    command.chooseWeapon === undefined ||
    command.chooseWeapon === state.player.weaponId
  ) {
    return;
  }

  state.player.weaponId = command.chooseWeapon;
  events.push({
    type: "weapon-selected",
    tick: state.tick,
    weaponId: command.chooseWeapon,
  });
}

function canDamageEnemy(
  state: PrototypeBState,
  enemy: EnemyState,
): boolean {
  return (
    enemy.active &&
    !enemy.defeated &&
    enemy.disposition === "hostile" &&
    (enemy.kind !== "named-anomaly" ||
      state.quest.intent === "destroy")
  );
}

function markEnemyDefeated(
  state: PrototypeBState,
  enemy: EnemyState,
  events: PrototypeBEvent[],
): void {
  if (enemy.defeated) {
    return;
  }

  enemy.defeated = true;
  enemy.active = false;
  enemy.disposition = "destroyed";
  enemy.attack = createIdleAttack();
  events.push({
    type: "enemy-defeated",
    tick: state.tick,
    enemyId: enemy.id,
    kind: enemy.kind,
  });

  if (enemy.id === ANOMALY_ID) {
    resolveAnomaly(state, "destroy", events);
  }
}

function damageEnemy(
  state: PrototypeBState,
  enemy: EnemyState,
  amount: number,
  source: "blade" | "impact" | "relic",
  events: PrototypeBEvent[],
): void {
  if (!canDamageEnemy(state, enemy)) {
    return;
  }

  const appliedDamage = Math.min(enemy.hp, Math.max(0, amount));
  enemy.hp = Math.max(0, enemy.hp - appliedDamage);
  events.push({
    type: "enemy-damaged",
    tick: state.tick,
    enemyId: enemy.id,
    amount: appliedDamage,
    remainingHp: enemy.hp,
    source,
  });

  if (enemy.hp === 0) {
    markEnemyDefeated(state, enemy, events);
  }
}

function effectiveWeapon(
  state: PrototypeBState,
): WeaponDefinition {
  const base = WEAPON_DEFINITIONS[state.player.weaponId];

  return {
    ...base,
    damage:
      base.damage +
      state.player.weaponDamageBonuses[state.player.weaponId],
  };
}

function attackCandidateScore(
  player: PlayerState,
  enemy: EnemyState,
): number {
  return distanceBetween(player.x, player.y, enemy.x, enemy.y);
}

function enemyWithinWeaponArc(
  player: PlayerState,
  enemy: EnemyState,
  weapon: WeaponDefinition,
): boolean {
  const deltaX = enemy.x - player.x;
  const deltaY = enemy.y - player.y;
  const distance = Math.hypot(deltaX, deltaY);

  if (distance - enemy.radius > weapon.range) {
    return false;
  }

  if (distance === 0) {
    return true;
  }

  const dot =
    (deltaX / distance) * player.facingX +
    (deltaY / distance) * player.facingY;
  return dot >= weapon.arcCosine;
}

function knockEnemyBack(
  state: PrototypeBState,
  enemy: EnemyState,
  amount: number,
): void {
  if (amount <= 0 || enemy.defeated) {
    return;
  }

  const direction = normalizedVector(
    enemy.x - state.player.x,
    enemy.y - state.player.y,
  );
  const destination = moveCircle(
    state,
    enemy.x,
    enemy.y,
    enemy.radius,
    direction.x * amount,
    direction.y * amount,
  );
  enemy.x = destination.x;
  enemy.y = destination.y;
}

function handleAttack(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
  didDodge: boolean,
): void {
  if (
    command.attack !== true ||
    state.player.weaponCooldownTicks > 0 ||
    state.player.guarding ||
    didDodge
  ) {
    return;
  }

  const weapon = effectiveWeapon(state);
  const actionId = allocateActionId(state, "player-attack");
  state.player.weaponCooldownTicks = weapon.cooldownTicks;
  events.push({
    type: "player-attacked",
    tick: state.tick,
    actionId,
    weaponId: weapon.id,
    x: state.player.x,
    y: state.player.y,
    directionX: state.player.facingX,
    directionY: state.player.facingY,
    range: weapon.range,
    damage: weapon.damage,
    cooldownTicks: weapon.cooldownTicks,
    cue: weapon.cue,
  });

  const targets = state.enemies
    .filter(
      (enemy) =>
        canDamageEnemy(state, enemy) &&
        enemyWithinWeaponArc(state.player, enemy, weapon),
    )
    .sort(
      (first, second) =>
        attackCandidateScore(state.player, first) -
          attackCandidateScore(state.player, second) ||
        first.id.localeCompare(second.id),
    )
    .slice(0, weapon.hitLimit);

  for (const enemy of targets) {
    damageEnemy(state, enemy, weapon.damage, weapon.id, events);
    knockEnemyBack(state, enemy, weapon.knockback);
  }
}

function handleRelic(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): void {
  if (
    command.activateRelic !== true ||
    state.player.relicCooldownTicks > 0
  ) {
    return;
  }

  state.player.relicCooldownTicks =
    state.player.relicCooldownMaxTicks;
  events.push({
    type: "relic-activated",
    tick: state.tick,
    x: state.player.x,
    y: state.player.y,
    radius: state.player.relicRange,
    damage: state.player.relicDamage,
    cue: "relic",
  });

  const anomaly = findAnomaly(state);

  if (
    state.quest.phase === "confrontation" &&
    state.quest.intent === "calm" &&
    anomaly !== undefined &&
    distanceBetween(
      state.player.x,
      state.player.y,
      anomaly.x,
      anomaly.y,
    ) <=
      state.player.relicRange + anomaly.radius
  ) {
    resolveAnomaly(state, "calm", events);
  }

  for (const enemy of state.enemies) {
    if (
      canDamageEnemy(state, enemy) &&
      distanceBetween(
        state.player.x,
        state.player.y,
        enemy.x,
        enemy.y,
      ) <=
        state.player.relicRange + enemy.radius
    ) {
      damageEnemy(
        state,
        enemy,
        state.player.relicDamage,
        "relic",
        events,
      );
    }
  }
}

function handleItem(
  state: PrototypeBState,
  command: PrototypeBCommand,
  events: PrototypeBEvent[],
): void {
  if (command.useItem !== true) {
    return;
  }

  if (state.player.healingItems <= 0) {
    events.push({
      type: "command-rejected",
      tick: state.tick,
      reason: "item-empty",
    });
    return;
  }

  if (state.player.hp >= state.player.maxHp) {
    events.push({
      type: "command-rejected",
      tick: state.tick,
      reason: "item-full-health",
    });
    return;
  }

  const previousHp = state.player.hp;
  state.player.hp = Math.min(
    state.player.maxHp,
    state.player.hp + state.player.healingAmount,
  );
  state.player.healingItems -= 1;
  events.push({
    type: "item-used",
    tick: state.tick,
    healed: state.player.hp - previousHp,
    remainingItems: state.player.healingItems,
    cue: "heal",
  });
}

function startEnemyTelegraph(
  state: PrototypeBState,
  enemy: EnemyState,
  events: PrototypeBEvent[],
): void {
  const definition = ENEMY_DEFINITIONS[enemy.kind];
  const direction = normalizedVector(
    state.player.x - enemy.x,
    state.player.y - enemy.y,
  );
  const attackId = allocateActionId(state, "enemy-attack");
  enemy.attack = {
    phase: "telegraph",
    ticksRemaining: definition.telegraphTicks,
    attackId,
    targetX: state.player.x,
    targetY: state.player.y,
    directionX: direction.x,
    directionY: direction.y,
  };
  events.push({
    type: "enemy-attack-telegraphed",
    tick: state.tick,
    enemyId: enemy.id,
    attackId,
    x: enemy.x,
    y: enemy.y,
    directionX: direction.x,
    directionY: direction.y,
    range: definition.attackRange,
    resolveTick: state.tick + definition.telegraphTicks,
    cue: "enemy-warning",
  });
}

function attackStillHitsPlayer(
  state: PrototypeBState,
  enemy: EnemyState,
): boolean {
  const definition = ENEMY_DEFINITIONS[enemy.kind];
  const deltaX = state.player.x - enemy.x;
  const deltaY = state.player.y - enemy.y;
  const distance = Math.hypot(deltaX, deltaY);

  if (
    distance >
    definition.attackRange + enemy.radius + state.player.radius
  ) {
    return false;
  }

  if (distance === 0) {
    return true;
  }

  const dot =
    (deltaX / distance) * enemy.attack.directionX +
    (deltaY / distance) * enemy.attack.directionY;
  return dot >= 0.15;
}

function playerFacesEnemy(
  player: PlayerState,
  enemy: EnemyState,
): boolean {
  const direction = normalizedVector(
    enemy.x - player.x,
    enemy.y - player.y,
  );
  return (
    direction.x * player.facingX + direction.y * player.facingY >=
    0
  );
}

function resolveEnemyAttack(
  state: PrototypeBState,
  enemy: EnemyState,
  events: PrototypeBEvent[],
): void {
  const definition = ENEMY_DEFINITIONS[enemy.kind];
  const attackId =
    enemy.attack.attackId ?? allocateActionId(state, "enemy-attack");
  const hits = attackStillHitsPlayer(state, enemy);
  events.push({
    type: "enemy-attack-resolved",
    tick: state.tick,
    enemyId: enemy.id,
    attackId,
    hit: hits,
    cue: "enemy-impact",
  });

  if (hits) {
    if (state.player.invulnerableTicks > 0) {
      events.push({
        type: "player-dodged",
        tick: state.tick,
        enemyId: enemy.id,
      });
    } else {
      const guarded =
        state.player.guarding &&
        playerFacesEnemy(state.player, enemy);
      let receivedDamage: number = definition.damage;

      if (guarded) {
        const guardAge =
          state.player.guardStartedTick === null
            ? Number.POSITIVE_INFINITY
            : state.tick - state.player.guardStartedTick;
        const justGuard = guardAge <= JUST_GUARD_WINDOW_TICKS;
        receivedDamage = justGuard
          ? 0
          : Math.max(
              1,
              Math.ceil(
                definition.damage * GUARD_DAMAGE_MULTIPLIER,
              ),
            );
        events.push({
          type: "guard-resolved",
          tick: state.tick,
          enemyId: enemy.id,
          justGuard,
          preventedDamage: definition.damage - receivedDamage,
          receivedDamage,
          cue: justGuard ? "just-guard" : "guard",
        });
      }

      if (receivedDamage > 0) {
        state.player.hp = Math.max(
          0,
          state.player.hp - receivedDamage,
        );
        events.push({
          type: "player-damaged",
          tick: state.tick,
          enemyId: enemy.id,
          amount: receivedDamage,
          remainingHp: state.player.hp,
        });
      }
    }
  }

  enemy.attack = {
    ...createIdleAttack(),
    phase: "recovery",
    ticksRemaining: definition.recoveryTicks,
  };
}

function updateEnemy(
  state: PrototypeBState,
  enemy: EnemyState,
  events: PrototypeBEvent[],
): void {
  if (
    !enemy.active ||
    enemy.defeated ||
    enemy.disposition !== "hostile" ||
    state.status !== "playing"
  ) {
    return;
  }

  if (enemy.attack.phase === "telegraph") {
    enemy.attack.ticksRemaining = Math.max(
      0,
      enemy.attack.ticksRemaining - 1,
    );

    if (enemy.attack.ticksRemaining === 0) {
      resolveEnemyAttack(state, enemy, events);
    }
    return;
  }

  if (enemy.attack.phase === "recovery") {
    enemy.attack.ticksRemaining = Math.max(
      0,
      enemy.attack.ticksRemaining - 1,
    );

    if (enemy.attack.ticksRemaining === 0) {
      enemy.attack = createIdleAttack();
    }
    return;
  }

  const definition = ENEMY_DEFINITIONS[enemy.kind];
  const initialDistance = distanceBetween(
    enemy.x,
    enemy.y,
    state.player.x,
    state.player.y,
  );

  if (initialDistance > definition.aggroRange) {
    return;
  }

  const contactRange =
    definition.attackRange + enemy.radius + state.player.radius;

  if (initialDistance > contactRange) {
    const direction = normalizedVector(
      state.player.x - enemy.x,
      state.player.y - enemy.y,
    );
    const destination = moveCircle(
      state,
      enemy.x,
      enemy.y,
      enemy.radius,
      direction.x * (definition.speed / TICK_RATE),
      direction.y * (definition.speed / TICK_RATE),
    );
    enemy.x = destination.x;
    enemy.y = destination.y;
  }

  const updatedDistance = distanceBetween(
    enemy.x,
    enemy.y,
    state.player.x,
    state.player.y,
  );

  if (updatedDistance <= contactRange) {
    startEnemyTelegraph(state, enemy, events);
  }
}

function updateEnemies(
  state: PrototypeBState,
  events: PrototypeBEvent[],
): void {
  for (const enemy of state.enemies) {
    updateEnemy(state, enemy, events);

    if (state.player.hp === 0) {
      state.status = "lost";
      events.push({
        type: "player-defeated",
        tick: state.tick,
      });
      break;
    }
  }
}

export function stepPrototypeB(
  previousState: PrototypeBState,
  command: PrototypeBCommand = {},
): PrototypeBStepResult {
  if (previousState.status !== "playing") {
    return { state: previousState, events: [] };
  }

  const state = cloneState(previousState);
  const events: PrototypeBEvent[] = [];
  state.tick += 1;
  decrementPlayerTimers(state.player);
  updateGuard(state, command);
  const didDodge = moveOrDodgePlayer(state, command, events);
  updateQuestFromPosition(state, events);
  chooseWeapon(state, command, events);
  handleOutcomeChoice(state, command, events);
  handleInteraction(state, command, events);
  handleAttack(state, command, events, didDodge);
  handleRelic(state, command, events);
  handleItem(state, command, events);
  updateEnemies(state, events);

  return { state, events };
}
