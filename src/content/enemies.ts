export type EnemyKind = "skitter" | "brute" | "wisp" | "boss";

export interface EnemyDefinition {
  kind: EnemyKind;
  radius: number;
  maxHp: number;
  speed: number;
  damage: number;
  attackIntervalTicks: number;
  xpReward: number;
}

export const REGULAR_ENEMY_KINDS: readonly EnemyKind[] = [
  "skitter",
  "brute",
  "wisp",
];

export const ENEMY_DEFINITIONS: Readonly<Record<EnemyKind, EnemyDefinition>> = {
  skitter: {
    kind: "skitter",
    radius: 10,
    maxHp: 24,
    speed: 72,
    damage: 8,
    attackIntervalTicks: 30,
    xpReward: 10,
  },
  brute: {
    kind: "brute",
    radius: 16,
    maxHp: 64,
    speed: 40,
    damage: 14,
    attackIntervalTicks: 42,
    xpReward: 22,
  },
  wisp: {
    kind: "wisp",
    radius: 8,
    maxHp: 36,
    speed: 92,
    damage: 10,
    attackIntervalTicks: 24,
    xpReward: 16,
  },
  boss: {
    kind: "boss",
    radius: 32,
    maxHp: 520,
    speed: 32,
    damage: 20,
    attackIntervalTicks: 24,
    xpReward: 200,
  },
};
