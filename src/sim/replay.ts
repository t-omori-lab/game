import { hashSimulationState } from "./hash";
import { createInitialState, stepSimulation } from "./simulation";
import type {
  ReplayResult,
  SimulationCommand,
  SimulationSeed,
  SimulationState,
} from "./types";

export function runReplay(
  seed: SimulationSeed,
  commands: readonly SimulationCommand[],
): ReplayResult {
  let state = createInitialState(seed);
  const events: ReplayResult["events"] = [];
  const hashes = [hashSimulationState(state)];

  for (const command of commands) {
    const result = stepSimulation(state, command);
    state = result.state;
    events.push(...result.events);
    hashes.push(hashSimulationState(state));
  }

  return { state, events, hashes };
}

export function replayCommands(
  seed: SimulationSeed,
  commands: readonly SimulationCommand[],
): SimulationState {
  return runReplay(seed, commands).state;
}

export function hashReplay(
  seed: SimulationSeed,
  commands: readonly SimulationCommand[],
): string {
  return hashSimulationState(replayCommands(seed, commands));
}
