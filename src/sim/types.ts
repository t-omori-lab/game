import type { EnemyKind, UpgradeId } from "../content";

export type SimulationSeed = number | string;
export type SimulationStatus = "running" | "upgrade" | "won" | "lost";
export type DamageSource = "projectile" | "pulse";

export interface PlayerState {
  id: "player";
  x: number;
  y: number;
  radius: number;
  hp: number;
  maxHp: number;
  speed: number;
  level: number;
  xp: number;
  xpToNext: number;
  attackDamage: number;
  attackRange: number;
  attackIntervalTicks: number;
  attackCooldownTicks: number;
  projectileSpeed: number;
  projectileRadius: number;
  skillDamage: number;
  skillRadius: number;
  skillDurationTicks: number;
  skillCooldownTicks: number;
  skillCooldownMaxTicks: number;
}

export interface EnemyState {
  id: string;
  kind: EnemyKind;
  x: number;
  y: number;
  radius: number;
  hp: number;
  maxHp: number;
  speed: number;
  damage: number;
  attackCooldownTicks: number;
  attackCooldownMaxTicks: number;
  xpReward: number;
  elite: boolean;
  boss: boolean;
}

export interface ProjectileState {
  id: string;
  targetId: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  angle: number;
  radius: number;
  damage: number;
  remainingTicks: number;
}

export interface PulseState {
  id: string;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  damage: number;
  remainingTicks: number;
  totalTicks: number;
  hitEnemyIds: string[];
}

export interface UpgradeChoice {
  id: UpgradeId;
  title: string;
  description: string;
  nextRank: number;
}

export interface SimulationState {
  saveVersion: 1;
  contentVersion: "first-slice-1";
  seed: number;
  rngState: number;
  rngDraws: number;
  tick: number;
  elapsedTicks: number;
  runDurationTicks: number;
  status: SimulationStatus;
  nextEntityId: number;
  kills: number;
  bossSpawned: boolean;
  bossDefeated: boolean;
  player: PlayerState;
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  pulses: PulseState[];
  upgradeChoices: UpgradeChoice[] | null;
  upgradeRanks: Record<UpgradeId, number>;
}

export interface SimulationCommand {
  moveX?: number;
  moveY?: number;
  activateSkill?: boolean;
  upgradeChoice?: number;
}

export type SimulationEvent =
  | {
      type: "enemy-spawned";
      tick: number;
      enemyId: string;
      kind: EnemyKind;
      elite: boolean;
      boss: boolean;
    }
  | {
      type: "projectile-fired";
      tick: number;
      projectileId: string;
      targetId: string;
    }
  | {
      type: "pulse-activated";
      tick: number;
      pulseId: string;
    }
  | {
      type: "enemy-damaged";
      tick: number;
      enemyId: string;
      amount: number;
      remainingHp: number;
      source: DamageSource;
    }
  | {
      type: "enemy-defeated";
      tick: number;
      enemyId: string;
      kind: EnemyKind;
      xpReward: number;
      boss: boolean;
    }
  | {
      type: "player-damaged";
      tick: number;
      enemyId: string;
      amount: number;
      remainingHp: number;
    }
  | {
      type: "player-defeated";
      tick: number;
    }
  | {
      type: "xp-gained";
      tick: number;
      amount: number;
      totalXp: number;
    }
  | {
      type: "upgrade-offered";
      tick: number;
      level: number;
      choices: UpgradeChoice[];
    }
  | {
      type: "upgrade-applied";
      tick: number;
      upgradeId: UpgradeId;
      rank: number;
    }
  | {
      type: "boss-triggered";
      tick: number;
      enemyId: string;
    }
  | {
      type: "run-won";
      tick: number;
    }
  | {
      type: "command-rejected";
      tick: number;
      reason: "invalid-upgrade-choice";
    };

export interface SimulationStepResult {
  state: SimulationState;
  events: SimulationEvent[];
}

export interface ReplayResult {
  state: SimulationState;
  events: SimulationEvent[];
  hashes: string[];
}
