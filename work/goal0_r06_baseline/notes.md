# Notes: Goal 0 / R06 Baseline

## Confirmed Inputs

- Baseline commit: `0bf397c9cf9e3d988358569daa9c7a24142aa7e4`
- Worktree starts detached and clean.
- Scope is a browser/performance gate for existing R06, not R09 gameplay.
- Production route is expected to be `/game/r06/`; local Vite base behavior must be inspected.

## Findings

- `vite.config.ts` fixes production `base` to `/game/`, includes `r06/index.html` as a multi-page entry, and previews on port 4173.
- `src/r06/main.ts` changes `#app[data-boot-state]` from `shell` to `initializing` to `ready`; `ready` is set only after synchronous Three.js/game application setup completes.
- R06's existing application stage exposes `data-experience="r06"`, `data-prototype-version="R06"`, `data-presentation-state`, `data-status`, `data-player-x`, and `data-player-y`.
- The visible start action is `[data-testid="start-game"]`. Activating it changes the stage to active and enables controls.
- `PrototypeBControls` listens to visible keyboard movement and the stage dataset is refreshed from the actual simulation state, so coordinate change proves current game response without adding instrumentation.
- Existing `tests/e2e/smoke.py` is a legacy Phaser/mobile test against the old root flow. It stays unchanged and available.
- No repository-local browser dependency exists. No install is authorized. The Codex bundled Node runtime provides Playwright and the machine already has Google Chrome; the gate can accept explicit module/browser paths with safe local fallbacks.
- The main checkout already has the exact package dependencies in `node_modules`; this isolated worktree can use a temporary ignored symlink for verification without installing or modifying the main checkout.
- Forced SwiftShader is functionally reproducible but too slow on this R06 scene to be a useful local R09 comparison baseline. Headless Chrome's normal path resolves to `ANGLE Metal Renderer: Apple M3`; the gate therefore lets Chrome select the system path and records the actual WebGL renderer/vendor in every run.

## Verification Evidence

- Production route inspection: `/game/r06/` returned HTTP 200; `/r06/` returned the Vite base warning with HTTP 404.
- Strict TypeScript: PASS.
- Vitest: PASS, 38 files and 205 tests.
- Production build: PASS, 119 modules transformed. Existing chunk-size warnings remain informational.
- Browser gate run 01: PASS.
  - cold first-controllable 1,278.0 ms; frame p95 33.4 ms; >50 ms frames 0.
  - warm first-controllable 918.9 ms; frame p95 33.4 ms; >50 ms frames 0.
  - input movement 67.72 / 71.57 world units; console errors 0; page errors 0.
- Browser gate run 02: PASS.
  - cold first-controllable 1,185.5 ms; frame p95 33.4 ms; >50 ms frames 0.
  - warm first-controllable 895.4 ms; frame p95 34.3 ms; >50 ms frames 0.
  - input movement 71.57 / 67.72 world units; console errors 0; page errors 0.
- Both runs used 1,280×720 / DPR 1, headless Chrome 151.0.7922.76, Playwright 1.62.0, and the Apple M3 Metal WebGL renderer.
- Both runs sampled 24 nontransparent / 24 unique WebGL pixels, a live 320×168 minimap, and a non-lost WebGL context.
- Temporary dependency symlink removed before final diff; `node_modules` is absent from Git status.
- Official postflight boundary:
  - isolated-worktree invocation: tool path-assumption failure before checks (`Path.relative_to`);
  - canonical project audit: PASS=36, WARNING=0, FAIL=0;
  - following Workspace registry check: pre-existing stale generated section, left unchanged as directed.
- Evidence:
  - `work/goal0_r06_baseline/evidence/run-01/baseline.json`
  - `work/goal0_r06_baseline/evidence/run-01/verified-r06.png`
  - `work/goal0_r06_baseline/evidence/run-02/baseline.json`
  - `work/goal0_r06_baseline/evidence/run-02/verified-r06.png`
