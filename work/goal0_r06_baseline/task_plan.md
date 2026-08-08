# Task Plan: Goal 0 / R06 Baseline Browser Gate

## Goal

Create the smallest reproducible production-preview browser and performance gate for the current R06 route before R09A, without changing gameplay or central runtime contracts.

## Phases

- [x] Phase 1: Read instructions, project state, and existing test/runtime architecture
- [x] Phase 2: Design the narrow current-R06 observable contract
- [x] Phase 3: Implement the gate and machine-readable evidence workflow
- [x] Phase 4: Run strict TypeScript, Vitest, production build, and repeated browser measurements
- [x] Phase 5: Review scope, run postflight, commit exact owned files, and report

## Key Questions

1. What observable current-R06 state proves the game is playable rather than merely loaded?
2. What visible input/result pair can be measured without changing gameplay code?
3. Can cold/warm first-controllable and frame timing be captured reliably from outside the runtime?
4. How can the legacy Phaser smoke remain available and clearly separated?

## Decisions Made

- Keep the worktree at the delegated baseline commit `0bf397c9cf9e3d988358569daa9c7a24142aa7e4`; do not switch to or modify the dirty main checkout.
- Store all task planning and evidence under `work/goal0_r06_baseline/`.
- Keep `tests/e2e/smoke.py` unchanged as the legacy Phaser/mobile startup smoke.
- Use R06's existing observable DOM contract; do not instrument or modify `src/r06/main.ts`, `startPrototypeB.ts`, or `PrototypeBRenderer.ts`.
- Define first-controllable as the first post-navigation point where R06 boot is ready, the visible start action has been activated, the stage reports `R06` + active + playing, a visible WebGL canvas has nonzero bounds, and the initial HUD/minimap state is present.
- Prove response separately by holding a visible movement key and observing a change in the stage's authoritative `data-player-x/y` projection.
- Sample `requestAnimationFrame` intervals for a fixed 10,000 ms active-gameplay window; report p95 and intervals over 50 ms.
- Run cold and warm navigation in the same isolated browser context. A new context is the cold run; the second navigation reuses HTTP/browser cache and the route-scoped service worker.

## Errors Encountered

- Workspace `project-preflight.sh` exited with a Python `Path.relative_to` error because this isolated worktree is outside `/Users/omoritakashi/Desktop/CodexWorkspace`. Continue with equivalent read-only Git checks and rerun the official tool at the finish boundary; do not modify Workspace tooling in this task.
- System and bundled Python do not include Python Playwright. The bundled Node runtime includes Playwright, but its managed Chromium is absent. Use the already-installed system Google Chrome executable through bundled Node Playwright; do not install dependencies or browsers.
- `pnpm build` tried to reconcile the temporary symlinked `node_modules`, attempted a registry metadata check, then aborted before changing dependencies because the environment was non-interactive. Bypass package-manager dependency reconciliation and invoke the existing `tsc`, `vite`, and `vitest` binaries directly.
- The dependency `.bin/tsc` shim could not find `node` on the restricted shell PATH. Invoke each existing JavaScript CLI with the bundled Node executable explicitly.
- Vite's default bundled-config loader tried to write `.vite-temp` through the dependency symlink into the read-only main checkout and failed with `EPERM`. Use Vite's config runner loader so config evaluation does not write into shared dependencies.
- The first complete gate run forced SwiftShader and passed functionally, but rendered only 8–9 frames per 10-second sample (p95 1.40–1.62 s). A bounded comparison showed headless Chrome's system-auto path uses the Apple M3 Metal renderer and produced 116 frames in 3 seconds with p95 35.2 ms. Use system-auto and record the resolved renderer in JSON; do not use the diagnostic SwiftShader run as the final baseline.
- Official worktree postflight cannot audit a project outside the Workspace root and stopped at `Path.relative_to`. The canonical-project audit passed 36 checks with 0 warnings/failures, then the separate registry freshness check reported the pre-existing `generated section is stale; run --write`. Per Control Room, do not modify the Workspace registry in this task.
- The first exact-file commit attempt was blocked because sandboxed Git could not create the linked-worktree `index.lock` in the canonical repository metadata. Retry the same safe exact-file commit with the required filesystem approval; do not broaden the staged scope.

## Status

**Completed locally** - exact owned diff, verification evidence, and postflight boundary reviewed; final commit SHA is reported in the handoff because a commit cannot contain its own SHA.
