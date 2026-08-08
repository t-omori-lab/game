# R09B Playable Character Bridge — Notes

## Baseline

- Source branch: `main`
- Baseline HEAD: `9cf1765b06d21de5eeb5a75b557647e689cfabba`
- Isolated branch/worktree: `codex/r09-character-bridge` / `/tmp/fram-r09b`
- R09A authority: `work/r09a_first_memory_logic_2026-08-08/R09A_FIRST_MEMORY_LOGIC_REPORT.md`
- Workspace preflight before implementation: 36/36. The main worktree's 24 user-owned untracked files were preserved.

## Confirmed source facts

- F-01 is a compiled payload, not runtime image sampling: 37,990 source voxels become 9,454 visible surface cells across 7 semantic rig parts and 9 materials.
- `createF01Character()` can be shared by Forge and gameplay without rebuilding a volume.
- PrototypeB requires `idle | run | windup | hit | recovery | hurt | skill`, a weapon socket, and tint support; the Forge-only F-01 interface initially supplied only `idle | run | hit`.
- R06 and R09 share `PrototypeBRenderer`. A static F-01/F-02 import inside the renderer would unnecessarily add the character payload to R06.

## Boundary decisions

- R09 alone dynamically loads a small `PrototypeBHeroAssetRuntime`; the renderer receives a factory result rather than importing a candidate.
- `?actor=legacy`, a bounded load failure/timeout, or a factory exception returns to the built-in R05 actor without changing the R09A simulation or save schema.
- Actor source, load status, asset ID, representation, surface-cell count and preset are exposed as finite canvas datasets for evidence.
- The F-01 adapter owns scale conversion, complete PrototypeB pose mapping and the right-hand tool socket. World-unit tools cancel the actor's 24x authored-unit bridge scale.

## Red/green evidence

- Red: the initial suites failed because `HeroAssetRuntime`, `F01ForgeHeroVisual`, and `loadR09HeroAsset` did not exist.
- Green: the new runtime boundary, F-01/F-02 adapters, full motion mapping, socket, tint and R09-only loader pass alongside the full repository suite.
- The first actual capture found a giant black weapon occluder caused by inherited actor scale. The inverse-scale socket fix has a world-size regression assertion.
- The first F-02 Forge run found a favicon 404; the Forge document now declares the project icon and the zero-browser-error gate passes.

## F-01 to F-02 evidence loop

- F-01 passed surface density, gameplay scale, hair silhouette, weapon socket/scale, locomotion and fallback.
- F-01 failed only face readability, torso/jacket separation, limb silhouette, backpack signal and combat-pose readability.
- F-02 preserves the complete F-01 pack and adds 706 cells limited to those five failed modules. Final runtime size is 10,160 visible cells.
- R09 at 1280×720 and 2560×1440 records the same F-02 asset ID, manual skill, auto-basic combat and no console/page errors.
- Forge `?candidate=f02` exposes the same asset ID/cell count; its back capture verifies the archive pack and its FIELD view measures 17.2% actor screen height.
- This is a local visual-review candidate. It is not yet user art-direction acceptance or a claim of final commercial quality.

## Regression and performance

- R09A: all 2-site × 2-module branches, second-expedition effect, reload, and retreat passed after the character change.
- First performance attempt: first-controllable and transfer passed, but detailed actor shadows produced frame p95 50.0 ms and 17 frames over 50 ms.
- Final approach: keep every visible voxel and Forge shadow, but skip the per-part detailed shadow pass in gameplay, which already has a dedicated blob shadow.
- Final local desktop Chrome medians, three runs per route:
  - R06: first-controllable 990.7 ms; transfer 789,795 B; frame p95 33.5 ms.
  - R09: first-controllable 928.8 ms; transfer 832,444 B; frame p95 34.2 ms.
  - R09/R06 ratios: 0.938, 1.054, 1.021; long frames 0; browser errors 0.
- These measurements are local desktop evidence only, not iPhone 16 Pro or public-deployment acceptance.
