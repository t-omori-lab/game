export type PrototypeBSeed = number | string;

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type LandmarkId = "town" | "fork" | "ruin";
export type WeaponId = "blade" | "impact";
export type EnemyKind =
  | "scrap-hound"
  | "relay-shell"
  | "murmur"
  | "named-anomaly";
export type LootId =
  | "edge-coil"
  | "gravity-weight"
  | "field-tonic"
  | "relay-capacitor"
  | "quiet-chime"
  | "signal-key";
export type QuestOutcome = "destroy" | "calm" | "connect";
export type QuestPhase =
  | "briefing"
  | "travel-to-fork"
  | "travel-to-ruin"
  | "confrontation"
  | "return-town"
  | "result";
export type PrototypeBStatus = "playing" | "lost" | "result";

export interface LandmarkDefinition {
  id: LandmarkId;
  name: string;
  bounds: Rect;
  center: Point;
  interactionPoint: Point;
}

export type TerrainKind =
  | "building"
  | "wall"
  | "rock"
  | "pillar"
  | "water";

export interface TerrainPlacement {
  id: string;
  kind: TerrainKind;
  bounds: Rect;
  solid: boolean;
  height: number;
}

export type PropKind =
  | "contract-board"
  | "lamp"
  | "signpost"
  | "dead-tree"
  | "relay"
  | "anomaly-marker";

export interface PropPlacement {
  id: string;
  kind: PropKind;
  x: number;
  y: number;
  rotation: number;
  landmarkId: LandmarkId;
  interactive: boolean;
}

export interface LootDefinition {
  id: LootId;
  name: string;
  description: string;
  effect:
    | "blade-damage"
    | "impact-damage"
    | "healing-item"
    | "relic-power"
    | "calm-key"
    | "connect-key";
  amount: number;
}

export interface LootPlacement {
  id: string;
  lootId: LootId;
  x: number;
  y: number;
  radius: number;
}

export interface LootPickupState extends LootPlacement {
  picked: boolean;
}

export interface WeaponDefinition {
  id: WeaponId;
  name: string;
  range: number;
  damage: number;
  cooldownTicks: number;
  arcCosine: number;
  hitLimit: number;
  knockback: number;
  cue: "blade-swing" | "impact-swing";
}

export interface EnemyDefinition {
  kind: EnemyKind;
  name: string;
  radius: number;
  maxHp: number;
  speed: number;
  damage: number;
  attackRange: number;
  aggroRange: number;
  telegraphTicks: number;
  recoveryTicks: number;
}

export type EnemyAttackPhase = "idle" | "telegraph" | "recovery";
export type EnemyDisposition =
  | "hostile"
  | "dormant"
  | "destroyed"
  | "calmed"
  | "connected";

export interface EnemyAttackState {
  phase: EnemyAttackPhase;
  ticksRemaining: number;
  attackId: string | null;
  targetX: number;
  targetY: number;
  directionX: number;
  directionY: number;
}

export interface EnemyState {
  id: string;
  kind: EnemyKind;
  name: string;
  x: number;
  y: number;
  radius: number;
  hp: number;
  maxHp: number;
  active: boolean;
  defeated: boolean;
  disposition: EnemyDisposition;
  attack: EnemyAttackState;
}

export interface PlayerState {
  id: "player";
  x: number;
  y: number;
  radius: number;
  facingX: number;
  facingY: number;
  hp: number;
  maxHp: number;
  speed: number;
  weaponId: WeaponId;
  weaponCooldownTicks: number;
  weaponDamageBonuses: Record<WeaponId, number>;
  guarding: boolean;
  guardStartedTick: number | null;
  dodgeCooldownTicks: number;
  invulnerableTicks: number;
  relicCooldownTicks: number;
  relicCooldownMaxTicks: number;
  relicDamage: number;
  relicRange: number;
  healingItems: number;
  healingAmount: number;
  collectedLootIds: LootId[];
}

export interface WorldState {
  width: number;
  height: number;
  landmarks: LandmarkDefinition[];
  terrain: TerrainPlacement[];
  props: PropPlacement[];
  loot: LootPickupState[];
}

export interface QuestResult {
  outcome: QuestOutcome;
  title: string;
  townReaction: string;
}

export interface QuestState {
  phase: QuestPhase;
  objective: string;
  visitedLandmarkIds: LandmarkId[];
  intent: QuestOutcome | null;
  outcome: QuestOutcome | null;
  result: QuestResult | null;
}

export interface PrototypeBState {
  saveVersion: 1;
  contentVersion: "prototype-b-1";
  seed: number;
  rngState: number;
  rngDraws: number;
  tick: number;
  status: PrototypeBStatus;
  nextActionId: number;
  player: PlayerState;
  enemies: EnemyState[];
  world: WorldState;
  quest: QuestState;
}

export interface PrototypeBCommand {
  moveX?: number;
  moveY?: number;
  moveSpeedScale?: number;
  attack?: boolean;
  guard?: boolean;
  dodge?: boolean;
  activateRelic?: boolean;
  useItem?: boolean;
  interact?: boolean;
  chooseWeapon?: WeaponId;
  chooseOutcome?: QuestOutcome;
}

export type DamageSource = WeaponId | "relic";

export type AudioCue =
  | "blade-swing"
  | "impact-swing"
  | "enemy-warning"
  | "enemy-impact"
  | "guard"
  | "just-guard"
  | "dodge"
  | "relic"
  | "heal"
  | "loot"
  | "quest"
  | "outcome-destroy"
  | "outcome-calm"
  | "outcome-connect"
  | "result";

export type CommandRejectionReason =
  | "item-full-health"
  | "item-empty"
  | "outcome-already-chosen"
  | "outcome-not-available"
  | "wrong-quest-phase";

export type PrototypeBEvent =
  | {
      type: "weapon-selected";
      tick: number;
      weaponId: WeaponId;
    }
  | {
      type: "player-attacked";
      tick: number;
      actionId: string;
      weaponId: WeaponId;
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      range: number;
      damage: number;
      cooldownTicks: number;
      cue: "blade-swing" | "impact-swing";
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
    }
  | {
      type: "enemy-attack-telegraphed";
      tick: number;
      enemyId: string;
      attackId: string;
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      range: number;
      resolveTick: number;
      cue: "enemy-warning";
    }
  | {
      type: "enemy-attack-resolved";
      tick: number;
      enemyId: string;
      attackId: string;
      hit: boolean;
      cue: "enemy-impact";
    }
  | {
      type: "player-damaged";
      tick: number;
      enemyId: string;
      amount: number;
      remainingHp: number;
    }
  | {
      type: "guard-resolved";
      tick: number;
      enemyId: string;
      justGuard: boolean;
      preventedDamage: number;
      receivedDamage: number;
      cue: "guard" | "just-guard";
    }
  | {
      type: "player-dodged";
      tick: number;
      enemyId: string;
    }
  | {
      type: "dodge-started";
      tick: number;
      fromX: number;
      fromY: number;
      toX: number;
      toY: number;
      invulnerableTicks: number;
      cue: "dodge";
    }
  | {
      type: "relic-activated";
      tick: number;
      x: number;
      y: number;
      radius: number;
      damage: number;
      cue: "relic";
    }
  | {
      type: "item-used";
      tick: number;
      healed: number;
      remainingItems: number;
      cue: "heal";
    }
  | {
      type: "loot-picked";
      tick: number;
      pickupId: string;
      lootId: LootId;
      cue: "loot";
    }
  | {
      type: "landmark-entered";
      tick: number;
      landmarkId: LandmarkId;
    }
  | {
      type: "quest-advanced";
      tick: number;
      phase: QuestPhase;
      objective: string;
      cue: "quest";
    }
  | {
      type: "outcome-committed";
      tick: number;
      outcome: QuestOutcome;
    }
  | {
      type: "anomaly-resolved";
      tick: number;
      anomalyId: string;
      outcome: QuestOutcome;
      cue:
        | "outcome-destroy"
        | "outcome-calm"
        | "outcome-connect";
    }
  | {
      type: "result-reached";
      tick: number;
      result: QuestResult;
      cue: "result";
    }
  | {
      type: "player-defeated";
      tick: number;
    }
  | {
      type: "command-rejected";
      tick: number;
      reason: CommandRejectionReason;
    };

export interface PrototypeBStepResult {
  state: PrototypeBState;
  events: PrototypeBEvent[];
}

export interface PrototypeBReplayResult {
  state: PrototypeBState;
  events: PrototypeBEvent[];
  hashes: string[];
}
