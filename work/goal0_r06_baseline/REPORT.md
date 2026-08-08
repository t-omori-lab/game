# Goal 0 / R06 Baseline Report

Status: complete locally; final commit SHA is reported in the handoff because a commit cannot contain its own SHA.

## Conclusion

The current R06 now has a narrow, external production-preview gate at `tests/e2e/r06_baseline.mjs`. It proves the real R06 reaches an active, controllable state, renders nonblank WebGL and minimap canvases, responds to visible keyboard movement, reports cold/warm first-controllable timing, samples a fixed 10-second gameplay interval, fails on console/page errors, and writes JSON plus a verified screenshot.

No gameplay, simulation, renderer, save, service-worker, or visual-asset source was changed. The legacy `tests/e2e/smoke.py` remains unchanged.

## Observable contract

First-controllable is measured after all of the following are true:

1. `#app[data-boot-state="ready"]` is reached.
2. The visible `[data-testid="start-game"]` control is activated.
3. The stage reports R06, active presentation, and playing status.
4. One post-start animation frame has completed.
5. The WebGL canvas is visible and the HUD/minimap state exists.

Player response is a separate assertion: hold visible `ArrowDown` input for 600 ms and require the stage's simulation-derived `data-player-x/y` projection to move by at least 2 world units.

Blank/canvas failure is rejected when the WebGL canvas is missing, too small, has a lost context, has fewer than 8/24 nontransparent sampled pixels, has fewer than 3 sampled colors, or when the minimap has not painted.

## Route and environment

- Production preview: `http://127.0.0.1:4173/game/r06/` — HTTP 200.
- `/r06/` under this production preview: HTTP 404 with Vite's `/game/` base warning.
- Build SHA: `0bf397c9cf9e3d988358569daa9c7a24142aa7e4`.
- Viewport: 1,280×720, DPR 1.
- Browser: headless Google Chrome 151.0.7922.76 through Playwright 1.62.0.
- Renderer: `ANGLE Metal Renderer: Apple M3` (`system-auto`).
- Cold/warm definition: a fresh browser context followed by a second navigation in the same context after the route service worker is ready.

## Measured values

| Evidence | Cache | First-controllable | Frame p95 | >50 ms frames | Frames / 10 s | Input movement |
|---|---:|---:|---:|---:|---:|---:|
| run-01 | cold | 1,278.0 ms | 33.4 ms | 0 | 467 | 67.72 |
| run-01 | warm | 918.9 ms | 33.4 ms | 0 | 469 | 71.57 |
| run-02 | cold | 1,185.5 ms | 33.4 ms | 0 | 473 | 71.57 |
| run-02 | warm | 895.4 ms | 34.3 ms | 0 | 470 | 67.72 |

All four measurements had console errors 0, page errors 0, a non-lost WebGL context, 24/24 nontransparent sampled pixels, 24 unique sampled colors, and a painted 320×168 minimap.

## Evidence artifacts

- `work/goal0_r06_baseline/evidence/run-01/baseline.json`
- `work/goal0_r06_baseline/evidence/run-01/verified-r06.png`
- `work/goal0_r06_baseline/evidence/run-02/baseline.json`
- `work/goal0_r06_baseline/evidence/run-02/verified-r06.png`

Each JSON file records environment, viewport, URL, build SHA, cold/warm timing, canvas proof, input before/after, frame timing, and browser-error arrays.

## Checks

- Node syntax check for `tests/e2e/r06_baseline.mjs`: PASS.
- Strict TypeScript: PASS.
- Vitest: PASS — 38 files, 205 tests.
- Production build: PASS — 119 modules transformed.
- Current-R06 browser gate: PASS twice against a production preview started by the gate.
- Screenshot visual inspection: PASS; R06 world, player, HUD, minimap, objective marker, and interaction prompt are visible.
- Canonical Workspace project audit: PASS=36, WARNING=0, FAIL=0. The following pre-existing registry freshness check failed and was not changed. The isolated worktree path itself is unsupported by the audit tool's `relative_to` assumption.

## Reproduction command used in this isolated worktree

The worktree reused already-installed dependencies and browsers; nothing was installed:

```text
<bundled-node> tests/e2e/r06_baseline.mjs \
  --playwright-module <existing-playwright-package> \
  --browser-executable "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --output work/goal0_r06_baseline/evidence/run-XX
```

The gate starts `vite preview --configLoader runner --host 127.0.0.1 --port 4173 --strictPort` itself. In a normal checkout with Playwright available as a local module and its Chromium installed, both explicit browser arguments can be omitted.

## Risks and boundaries

- This is a local desktop/headless-Chrome baseline, not iPhone, Safari, PWA, touch, thermal, battery, public-deploy, or real-device readiness.
- No pass/fail performance budget was invented. Functional observability is gated; timing values are recorded as the R06 comparison baseline for later R09 measurement under the same environment.
- Playwright and Chrome are external existing prerequisites, matching the repository's current external-browser-test pattern. No dependency or package file was changed.
- Vite's existing chunk-size warnings remain. This task did not alter production chunks or gameplay.
- Workspace audit tooling assumes the project is physically under the Workspace root; this isolated worktree causes its path check to fail before repository checks. The pre-existing Workspace registry freshness failure is separately tracked and is not changed by this task.
