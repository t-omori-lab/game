import type {
  EnemyDefinition,
  EnemyKind,
  LandmarkDefinition,
  LootDefinition,
  LootId,
  LootPlacement,
  PropPlacement,
  QuestOutcome,
  QuestResult,
  TerrainPlacement,
  WeaponDefinition,
  WeaponId,
} from "./types";

export const TICK_RATE = 30;
export const WORLD_WIDTH = 3_600;
export const WORLD_HEIGHT = 1_800;
export const TOWN_CONTRACT_BOARD_POSITION = {
  x: 500,
  y: 950,
} as const;

export const LANDMARKS = {
  town: {
    id: "town",
    name: "Dustwake Town",
    bounds: { x: 80, y: 500, width: 620, height: 800 },
    center: { x: 390, y: 900 },
    interactionPoint: TOWN_CONTRACT_BOARD_POSITION,
  },
  fork: {
    id: "fork",
    name: "Three-Way Fork",
    bounds: { x: 1_180, y: 550, width: 680, height: 700 },
    center: { x: 1_520, y: 900 },
    interactionPoint: { x: 1_520, y: 900 },
  },
  ruin: {
    id: "ruin",
    name: "Listening Ruin",
    bounds: { x: 2_450, y: 420, width: 850, height: 960 },
    center: { x: 2_875, y: 900 },
    interactionPoint: { x: 2_930, y: 900 },
  },
} as const satisfies Record<"town" | "fork" | "ruin", LandmarkDefinition>;

export const LANDMARK_LIST: readonly LandmarkDefinition[] = [
  LANDMARKS.town,
  LANDMARKS.fork,
  LANDMARKS.ruin,
];

export const TERRAIN_PLACEMENTS = [
  {
    id: "town-hall",
    kind: "building",
    bounds: { x: 130, y: 570, width: 250, height: 150 },
    solid: true,
    height: 96,
  },
  {
    id: "town-well",
    kind: "rock",
    bounds: { x: 320, y: 790, width: 82, height: 82 },
    solid: true,
    height: 34,
  },
  {
    id: "south-house",
    kind: "building",
    bounds: { x: 150, y: 1_090, width: 230, height: 130 },
    solid: true,
    height: 78,
  },
  // Renderer-authored town fixtures use these zero-height terrain entries
  // only as deterministic movement colliders. Their visible geometry is
  // supplied by startTownArt and excluded from the fallback terrain renderer.
  {
    id: "town-board-collider",
    kind: "rock",
    bounds: {
      x: TOWN_CONTRACT_BOARD_POSITION.x - 46,
      y: TOWN_CONTRACT_BOARD_POSITION.y - 10,
      width: 92,
      height: 20,
    },
    solid: true,
    height: 0,
  },
  {
    id: "town-hall-workyard-collider",
    kind: "rock",
    bounds: { x: 380, y: 707, width: 100, height: 64 },
    solid: true,
    height: 0,
  },
  {
    id: "town-repair-bench-collider",
    kind: "rock",
    bounds: { x: 510, y: 777, width: 115, height: 76 },
    solid: true,
    height: 0,
  },
  {
    id: "town-south-lamp-collider",
    kind: "rock",
    bounds: { x: 460, y: 1_030, width: 20, height: 23 },
    solid: true,
    height: 0,
  },
  {
    id: "town-kitchen-garden-collider",
    kind: "rock",
    bounds: { x: 405, y: 1_110, width: 75, height: 90 },
    solid: true,
    height: 0,
  },
  {
    id: "town-south-crates-collider",
    kind: "rock",
    bounds: { x: 385, y: 1_186, width: 61, height: 53 },
    solid: true,
    height: 0,
  },
  {
    id: "fork-boulder",
    kind: "rock",
    bounds: { x: 1_405, y: 665, width: 130, height: 120 },
    solid: true,
    height: 64,
  },
  {
    id: "shallow-basin",
    kind: "water",
    bounds: { x: 1_900, y: 1_125, width: 300, height: 170 },
    solid: true,
    height: 4,
  },
  {
    id: "ruin-west-wall-north",
    kind: "wall",
    bounds: { x: 2_500, y: 500, width: 48, height: 320 },
    solid: true,
    height: 84,
  },
  {
    id: "ruin-west-wall-south",
    kind: "wall",
    bounds: { x: 2_500, y: 980, width: 48, height: 320 },
    solid: true,
    height: 84,
  },
  {
    id: "ruin-north-wall",
    kind: "wall",
    bounds: { x: 2_500, y: 500, width: 700, height: 48 },
    solid: true,
    height: 84,
  },
  {
    id: "ruin-south-wall",
    kind: "wall",
    bounds: { x: 2_500, y: 1_252, width: 700, height: 48 },
    solid: true,
    height: 84,
  },
  {
    id: "ruin-pillar-north",
    kind: "pillar",
    bounds: { x: 2_720, y: 690, width: 68, height: 68 },
    solid: true,
    height: 100,
  },
  {
    id: "ruin-pillar-south",
    kind: "pillar",
    bounds: { x: 2_720, y: 1_042, width: 68, height: 68 },
    solid: true,
    height: 100,
  },
] as const satisfies readonly TerrainPlacement[];

export const PROP_PLACEMENTS = [
  {
    id: "town-contract-board",
    kind: "contract-board",
    x: TOWN_CONTRACT_BOARD_POSITION.x,
    y: TOWN_CONTRACT_BOARD_POSITION.y,
    rotation: 0,
    landmarkId: "town",
    interactive: true,
  },
  {
    id: "town-lamp-a",
    kind: "lamp",
    x: 470,
    y: 760,
    rotation: 0,
    landmarkId: "town",
    interactive: false,
  },
  {
    id: "town-lamp-b",
    kind: "lamp",
    x: 470,
    y: 1_040,
    rotation: 0,
    landmarkId: "town",
    interactive: false,
  },
  {
    id: "fork-sign",
    kind: "signpost",
    x: 1_520,
    y: 900,
    rotation: 0.15,
    landmarkId: "fork",
    interactive: false,
  },
  {
    id: "fork-dead-tree",
    kind: "dead-tree",
    x: 1_670,
    y: 710,
    rotation: -0.4,
    landmarkId: "fork",
    interactive: false,
  },
  {
    id: "ruin-relay",
    kind: "relay",
    x: 2_790,
    y: 900,
    rotation: 0,
    landmarkId: "ruin",
    interactive: false,
  },
  {
    id: "ruin-anomaly-marker",
    kind: "anomaly-marker",
    x: 2_930,
    y: 900,
    rotation: 0,
    landmarkId: "ruin",
    interactive: true,
  },
] as const satisfies readonly PropPlacement[];

export const WEAPON_DEFINITIONS = {
  blade: {
    id: "blade",
    name: "Survey Blade",
    range: 104,
    damage: 16,
    cooldownTicks: 10,
    arcCosine: 0.25,
    hitLimit: 2,
    knockback: 12,
    cue: "blade-swing",
  },
  impact: {
    id: "impact",
    name: "Pile Driver",
    range: 66,
    damage: 38,
    cooldownTicks: 25,
    arcCosine: -0.2,
    hitLimit: 3,
    knockback: 38,
    cue: "impact-swing",
  },
} as const satisfies Record<WeaponId, WeaponDefinition>;

export const ENEMY_DEFINITIONS = {
  "scrap-hound": {
    kind: "scrap-hound",
    name: "Scrap Hound",
    radius: 18,
    maxHp: 38,
    speed: 132,
    damage: 12,
    attackRange: 42,
    aggroRange: 340,
    telegraphTicks: 9,
    recoveryTicks: 24,
  },
  "relay-shell": {
    kind: "relay-shell",
    name: "Relay Shell",
    radius: 27,
    maxHp: 92,
    speed: 62,
    damage: 22,
    attackRange: 54,
    aggroRange: 300,
    telegraphTicks: 20,
    recoveryTicks: 39,
  },
  murmur: {
    kind: "murmur",
    name: "Murmur",
    radius: 21,
    maxHp: 54,
    speed: 88,
    damage: 16,
    attackRange: 68,
    aggroRange: 420,
    telegraphTicks: 15,
    recoveryTicks: 30,
  },
  "named-anomaly": {
    kind: "named-anomaly",
    name: "Orison, the Listening Fault",
    radius: 42,
    maxHp: 124,
    speed: 54,
    damage: 28,
    attackRange: 88,
    aggroRange: 520,
    telegraphTicks: 24,
    recoveryTicks: 42,
  },
} as const satisfies Record<EnemyKind, EnemyDefinition>;

export const ANOMALY_ID = "anomaly-orison";
export const ANOMALY_NAME = ENEMY_DEFINITIONS["named-anomaly"].name;

export const ENEMY_PLACEMENTS = [
  { id: "enemy-hound", kind: "scrap-hound", x: 940, y: 835 },
  { id: "enemy-shell", kind: "relay-shell", x: 1_820, y: 1_000 },
  { id: "enemy-murmur", kind: "murmur", x: 2_270, y: 760 },
  {
    id: ANOMALY_ID,
    kind: "named-anomaly",
    x: LANDMARKS.ruin.interactionPoint.x,
    y: LANDMARKS.ruin.interactionPoint.y,
  },
] as const satisfies readonly {
  id: string;
  kind: EnemyKind;
  x: number;
  y: number;
}[];

export const LOOT_DEFINITIONS = {
  "edge-coil": {
    id: "edge-coil",
    name: "Edge Coil",
    description: "Adds 6 damage to the fast, long-reaching blade.",
    effect: "blade-damage",
    amount: 6,
  },
  "gravity-weight": {
    id: "gravity-weight",
    name: "Gravity Weight",
    description: "Adds 12 damage to the slow, close impact weapon.",
    effect: "impact-damage",
    amount: 12,
  },
  "field-tonic": {
    id: "field-tonic",
    name: "Field Tonic",
    description: "Adds one 45 HP healing item.",
    effect: "healing-item",
    amount: 1,
  },
  "relay-capacitor": {
    id: "relay-capacitor",
    name: "Relay Capacitor",
    description: "Adds 10 relic damage and shortens its cooldown by one second.",
    effect: "relic-power",
    amount: 10,
  },
  "quiet-chime": {
    id: "quiet-chime",
    name: "Quiet Chime",
    description: "Allows the relic pulse to calm the named anomaly.",
    effect: "calm-key",
    amount: 1,
  },
  "signal-key": {
    id: "signal-key",
    name: "Signal Key",
    description: "Allows a direct connection with the named anomaly.",
    effect: "connect-key",
    amount: 1,
  },
} as const satisfies Record<LootId, LootDefinition>;

export const LOOT_PLACEMENTS = [
  {
    id: "pickup-edge-coil",
    lootId: "edge-coil",
    x: 665,
    y: 760,
    radius: 18,
  },
  {
    id: "pickup-field-tonic",
    lootId: "field-tonic",
    x: 1_050,
    y: 1_020,
    radius: 18,
  },
  {
    id: "pickup-gravity-weight",
    lootId: "gravity-weight",
    x: 1_640,
    y: 1_105,
    radius: 18,
  },
  {
    id: "pickup-relay-capacitor",
    lootId: "relay-capacitor",
    x: 2_030,
    y: 720,
    radius: 18,
  },
  {
    id: "pickup-quiet-chime",
    lootId: "quiet-chime",
    x: 2_360,
    y: 1_030,
    radius: 18,
  },
  {
    id: "pickup-signal-key",
    lootId: "signal-key",
    x: 2_350,
    y: 900,
    radius: 18,
  },
] as const satisfies readonly LootPlacement[];

export const OUTCOME_RESULTS = {
  destroy: {
    outcome: "destroy",
    title: "Fault Silenced",
    townReaction:
      "The town accepts the quiet, but the relay keepers mourn the lost signal.",
  },
  calm: {
    outcome: "calm",
    title: "Fault at Rest",
    townReaction:
      "The ruin grows still. Travelers begin leaving offerings at the fork.",
  },
  connect: {
    outcome: "connect",
    title: "A Line Left Open",
    townReaction:
      "Messages arrive from the ruin, and the town argues over who may answer.",
  },
} as const satisfies Record<QuestOutcome, QuestResult>;
