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
- Playwright `1.62.0` is now an exact repository-local development dependency and `test:e2e:r06` is a narrow package script. Standard setup is `pnpm install --frozen-lockfile` followed by `pnpm exec playwright install chromium`; this validation run used the existing system Chrome as an explicit override.
- A real isolated-worktree `node_modules` was installed only for verification. It must be removed before the final scope audit and commit; no symlink is used.
- Forced SwiftShader is functionally reproducible but too slow on this R06 scene to be a useful local R09 comparison baseline. Headless Chrome's normal path resolves to `ANGLE Metal Renderer: Apple M3`; the gate therefore lets Chrome select the system path and records the actual WebGL renderer/vendor in every run.

## Independent QA revision (`fc426864`)

- The original `transferSizeBytes` field came only from `PerformanceNavigationTiming` and therefore described the HTML navigation, not the full route. The revision must aggregate same-origin navigation and resource entries and group scripts, styles, images, fonts, manifest/service-worker, and other resources.
- A bounded wait for `navigator.serviceWorker.ready` was insufficient proof. The revision must fail unless the `/game/r06/` registration is activated with `/game/r06/sw.js`, and the page controller matches that script before and after warm navigation.
- The visible desktop guide advertises `WASD`; the response proof must assert that guide and use KeyS rather than ArrowDown.
- Repository-local evidence as a default dirtied the checkout. Temporary output is now the default, while explicit retained evidence is restricted to the project-relative Goal-0 evidence root.
- Production-preview provenance must include a gate-run build, `HEAD`, porcelain dirty state, and an artifact tree fingerprint. Measurements made while developing this revision are expected to say `dirty: true`.
- The repository must own a locked Playwright development dependency and a narrow `test:e2e:r06` script. Standard browser installation will be documented as `pnpm exec playwright install chromium`; this validation run may use the already-installed system Chrome.

## Verification Evidence

- Local-only production route: `/game/r06/` returned HTTP 200. Unsafe output and URL variants were rejected before build/preview.
- Strict TypeScript: PASS.
- Vitest: PASS, 38 files and 205 tests.
- Production build: PASS, 119 modules transformed. Existing chunk-size warnings remain informational.
- Browser gate run 01: PASS.
  - cold first-controllable 1,252.3 ms; frame p95 18.6 ms; >50 ms frames 0; route transfer 779,580 bytes / 9 entries.
  - warm first-controllable 1,034.6 ms; frame p95 18.6 ms; >50 ms frames 0; route transfer 5,912 bytes / 9 entries.
  - KeyS movement 71.57 / 71.57 world units; console errors 0; page errors 0.
- Browser gate run 02: PASS.
  - cold first-controllable 1,338.6 ms; frame p95 18.5 ms; >50 ms frames 0; route transfer 779,580 bytes / 9 entries.
  - warm first-controllable 936.2 ms; frame p95 18.7 ms; >50 ms frames 0; route transfer 5,912 bytes / 9 entries.
  - KeyS movement 71.57 / 75.43 world units; console errors 0; page errors 0.
- Both runs used 1,280×720 / DPR 1, headless Chrome 151.0.7922.76, Playwright 1.62.0, and the Apple M3 Metal WebGL renderer. Both recorded the same production-tree fingerprint `3b486613…b5053` and explicitly labelled the source tree dirty at `fc426864...`.
- Both runs proved the R06 service worker active after cold and the expected `/game/r06/sw.js` controller immediately before warm navigation and at DOMContentLoaded immediately after it, before R06 boot/playability waits.
- Both runs sampled 24 nontransparent / 24 unique WebGL pixels, a live 320×168 minimap, and a non-lost WebGL context.
- One representative screenshot is retained; run-02 records `screenshot: null`.
- Official postflight boundary:
  - isolated-worktree invocation: tool path-assumption failure before checks (`Path.relative_to`);
  - canonical project audit: PASS=36, WARNING=0, FAIL=0;
  - following Workspace registry check: pre-existing stale generated section, left unchanged as directed.
- Evidence:
  - `work/goal0_r06_baseline/evidence/run-01/baseline.json`
  - `work/goal0_r06_baseline/evidence/run-01/verified-r06.png`
  - `work/goal0_r06_baseline/evidence/run-02/baseline.json`
