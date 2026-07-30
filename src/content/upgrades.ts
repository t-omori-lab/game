export type UpgradeId =
  | "rapid-fire"
  | "heavy-shot"
  | "swift-boots"
  | "vitality"
  | "pulse-core"
  | "field-repair";

export interface UpgradeDefinition {
  id: UpgradeId;
  title: string;
  description: string;
}

export const UPGRADE_IDS: readonly UpgradeId[] = [
  "rapid-fire",
  "heavy-shot",
  "swift-boots",
  "vitality",
  "pulse-core",
  "field-repair",
];

export const UPGRADE_DEFINITIONS: Readonly<
  Record<UpgradeId, UpgradeDefinition>
> = {
  "rapid-fire": {
    id: "rapid-fire",
    title: "Quick Mechanism",
    description: "Automatic attacks recharge 20% faster.",
  },
  "heavy-shot": {
    id: "heavy-shot",
    title: "Heavy Shot",
    description: "Projectiles deal 8 more damage.",
  },
  "swift-boots": {
    id: "swift-boots",
    title: "Roadrunner",
    description: "Movement speed increases by 20.",
  },
  vitality: {
    id: "vitality",
    title: "Travel-Worn Heart",
    description: "Maximum and current health increase by 20.",
  },
  "pulse-core": {
    id: "pulse-core",
    title: "Resonant Core",
    description: "The active pulse grows wider and deals 15 more damage.",
  },
  "field-repair": {
    id: "field-repair",
    title: "Field Repair",
    description: "Restore 35 health immediately.",
  },
};

export function createEmptyUpgradeRanks(): Record<UpgradeId, number> {
  return {
    "rapid-fire": 0,
    "heavy-shot": 0,
    "swift-boots": 0,
    vitality: 0,
    "pulse-core": 0,
    "field-repair": 0,
  };
}
