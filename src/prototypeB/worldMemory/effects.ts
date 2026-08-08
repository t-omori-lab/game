import type { WorldMemoryEffects, WorldMemoryState } from "./types";

export function deriveWorldMemoryEffects(
  memory: WorldMemoryState,
): WorldMemoryEffects {
  switch (memory.installedModule?.moduleId) {
    case "pathfinder-array":
      return {
        routeOverlay: true,
        explorationSpeedMultiplier: 1.12,
        relicAura: false,
        relicCooldownMultiplier: 1,
      };
    case "relic-overdrive":
      return {
        routeOverlay: false,
        explorationSpeedMultiplier: 1,
        relicAura: true,
        relicCooldownMultiplier: 0.65,
      };
    default:
      return {
        routeOverlay: false,
        explorationSpeedMultiplier: 1,
        relicAura: false,
        relicCooldownMultiplier: 1,
      };
  }
}
