# Task Plan: Goal 0 / R06 Baseline Browser Gate

## Goal

Create the smallest reproducible production-preview browser and performance gate for the current R06 route before R09A, without changing gameplay or central runtime contracts.

## Phases

- [x] Phase 1: Read instructions, project state, and existing test/runtime architecture
- [x] Phase 2: Design the narrow current-R06 observable contract
- [x] Phase 3: Implement the gate and machine-readable evidence workflow
- [x] Phase 4: Run strict TypeScript, Vitest, production build, and repeated browser measurements
- [x] Phase 5: Review scope, run postflight, commit exact owned files, and report
- [x] Phase 6: Re-open the committed gate at `fc426864` and translate independent QA findings into bounded P1 contracts
- [x] Phase 7: Add locked repository-local browser automation and harden build, provenance, output, URL, route-transfer, service-worker, and WASD checks
- [x] Phase 8: Run syntax, strict TypeScript, 205 tests, production build, and two complete current-R06 gates
- [x] Phase 9: Replace evidence/report values, remove temporary infrastructure, audit exact scope, and run postflight before the scope-limited commit on top of `fc426864`

## Key Questions

1. What observable current-R06 state proves the game is playable rather than merely loaded?
2. What visible input/result pair can be measured without changing gameplay code?
3. Can cold/warm first-controllable and frame timing be captured reliably from outside the runtime?
4. How can the legacy Phaser smoke remain available and clearly separated?

## Decisions Made

- Keep the worktree isolated from the dirty main checkout. The original baseline is `0bf397c...`; this P1 revision is a new commit on top of reviewed gate commit `fc426864...`.
- Store all task planning and evidence under `work/goal0_r06_baseline/`.
- Keep `tests/e2e/smoke.py` unchanged as the legacy Phaser/mobile startup smoke.
- Use R06's existing observable DOM contract; do not instrument or modify `src/r06/main.ts`, `startPrototypeB.ts`, or `PrototypeBRenderer.ts`.
- Define first-controllable as the first post-navigation point after R06 boot is ready, the visible start action has activated the stage, the visible desktop guide contains `WASD`, and the WebGL/minimap nonblank checks pass.
- Prove response separately by holding a visible movement key and observing a change in the stage's authoritative `data-player-x/y` projection.
- Sample `requestAnimationFrame` intervals for a fixed 10,000 ms active-gameplay window; report p95 and intervals over 50 ms.
- Run cold and warm navigation in the same isolated browser context. A new context is the cold run; the second navigation reuses HTTP/browser cache and the route-scoped service worker.
- The normal gate command will build production itself, fingerprint the resulting `dist/client` tree, and record both `HEAD` and porcelain dirty state; a dirty measurement will be labelled dirty rather than represented as a clean build SHA.
- Default evidence will be created under the operating-system temporary directory. Explicit `--output` values must remain project-relative and inside `work/goal0_r06_baseline/evidence/`.
- The gate remains local-only: loopback HTTP, no credentials/query/hash, and the exact `/game/r06/` route. `--reuse-server` does not relax that boundary.
- First-controllable will be timestamped only after the desktop control guide is visible and contains `WASD`, the R06 stage is active, and the WebGL/minimap blank-state checks pass. KeyS response stays a separate assertion.
- Warm evidence is valid only when the R06 worker has the expected scope/script/active state after cold, and controls the page before and after the warm navigation.

## Errors Encountered

- Workspace `project-preflight.sh` exited with a Python `Path.relative_to` error because this isolated worktree is outside `/Users/omoritakashi/Desktop/CodexWorkspace`. Continue with equivalent read-only Git checks and rerun the official tool at the finish boundary; do not modify Workspace tooling in this task.
- During the original `fc426864` pass, system and bundled Python lacked Python Playwright and the bundled managed Chromium was absent, so existing system Chrome was used. The P1 revision now locks Node Playwright in the repository; this run still used system Chrome without downloading a browser.
- During the original pass, `pnpm build` tried to reconcile a temporary symlinked `node_modules` and aborted before changing dependencies. The P1 revision uses a real isolated install and removes it after verification.
- The dependency `.bin/tsc` shim could not find `node` on the restricted shell PATH. Invoke each existing JavaScript CLI with the bundled Node executable explicitly.
- Vite's default bundled-config loader tried to write `.vite-temp` through the dependency symlink into the read-only main checkout and failed with `EPERM`. Use Vite's config runner loader so config evaluation does not write into shared dependencies.
- The first complete gate run forced SwiftShader and passed functionally, but rendered only 8–9 frames per 10-second sample (p95 1.40–1.62 s). A bounded comparison showed headless Chrome's system-auto path uses the Apple M3 Metal renderer and produced 116 frames in 3 seconds with p95 35.2 ms. Use system-auto and record the resolved renderer in JSON; do not use the diagnostic SwiftShader run as the final baseline.
- Official worktree postflight cannot audit a project outside the Workspace root and stopped at `Path.relative_to`. The canonical-project audit passed 36 checks with 0 warnings/failures, then the separate registry freshness check reported the pre-existing `generated section is stale; run --write`. Per Control Room, do not modify the Workspace registry in this task.
- The first exact-file commit attempt was blocked because sandboxed Git could not create the linked-worktree `index.lock` in the canonical repository metadata. Retry the same safe exact-file commit with the required filesystem approval; do not broaden the staged scope.
- The first locked-dependency install attempt could not reach npm inside the network sandbox. The explicitly approved dependency was then resolved with narrow network approval; browser download hooks remained disabled.
- Codex's restricted shell omits Node and pnpm from its normal PATH. Verification supplied the bundled runtime directories explicitly; this is an execution-environment workaround, not part of the normal repository commands.
- The first package-script trial used an npm-style `--` separator, which pnpm passed through to the gate as an argument. The successful repository command omits that separator: `pnpm test:e2e:r06 --output ...`.

## Status

**Verified and ready for the scope-limited local commit** - final SHA is reported in the handoff; gameplay/runtime/project docs remained out of scope.
