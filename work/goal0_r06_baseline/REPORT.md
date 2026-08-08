# Goal 0 / R06 Baseline Report

Status: integrated into canonical `main` and reverified locally; final documentation commit SHA is reported in the handoff because a commit cannot contain its own SHA.

## Conclusion

The current R06 has a repository-reproducible, local-only production-preview gate at `tests/e2e/r06_baseline.mjs`. The normal command builds production itself, fingerprints `dist/client`, starts the local preview, verifies an active/controllable/nonblank R06, proves the visible desktop `WASD` control with KeyS and `data-player-x/y`, records cold/warm timing and full same-origin route resources, and requires the R06 service worker to control the warm navigation.

No gameplay, simulation, renderer, save, service-worker, or visual-asset source changed. The legacy `tests/e2e/smoke.py` remains unchanged.

## Canonical main integration

The reviewed series was integrated onto canonical `main` as `7166c82` and `1c9d355`. From `1c9d355`, the canonical checkout passed strict TypeScript, Vitest 38 files／205 tests, production build, and the current-R06 gate. The browser run reported cold／warm first-controllable 1,448.3／988.9 ms, frame p95 18.6／18.6 ms, >50 ms frames 1／0, full-route transfer 779,580／5,912 bytes, KeyS movement 75.43／71.57, and page console／page errors 0. Its artifact fingerprint remained `3b486613dc8bef95f432e9e635ba10763092cd2cb85febcb1b5c970fbc6b5053`.

The canonical run correctly labelled the source dirty because pre-existing／Goal-0 documentation and untracked art／planning files remained in the checkout. A separate clean exact-commit run at source commit `c325d2f` had already passed with the same artifact fingerprint, so the retained runtime artifact has clean-source provenance as well as canonical-main integration evidence.

## Observable contract

`firstControllableMs` is timestamped only after all of the following have passed:

1. `#app[data-boot-state="ready"]` is reached.
2. The visible `[data-testid="start-game"]` control is activated.
3. The stage reports R06, active presentation, and playing status.
4. The visible desktop control guide has nonzero bounds and contains `WASD`.
5. The WebGL canvas is visible, has a live context and diverse nontransparent sampled pixels, and the minimap has painted.

Input response is measured separately: hold KeyS for 600 ms and require the simulation-derived `data-player-x/y` projection to move by at least 2 world units.

Each run then samples `requestAnimationFrame` for 10,000 ms. Full-route resource evidence is collected at the end of that interval from same-origin navigation plus `PerformanceResourceTiming` entries, reporting count, `transferSize`, `encodedBodySize`, and `decodedBodySize` in total and by navigation/script/stylesheet/image group. The navigation HTML remains a separate group and is not labelled as the route total.

## Local, output, and provenance boundaries

- Accepted target: loopback HTTP at exactly `/game/r06/`; credentials, remote hosts, HTTPS, query strings, fragments, and path variants are rejected. A self-started server uses `http://127.0.0.1:4173/game/r06/`.
- Default evidence output: a new operating-system temporary directory, so the normal gate does not dirty the repository.
- Explicit retained output: project-relative paths inside `work/goal0_r06_baseline/evidence/` only; absolute paths, `..` segments, and traversed symlinks are rejected.
- Every normal run performs strict TypeScript plus the Vite production build before preview.
- JSON records `HEAD`, porcelain dirty state and an explicit clean/dirty statement. Both retained runs correctly say the source tree was dirty while this P1 revision was under development; `fc426864...` alone is not claimed to identify the measured source.
- Both retained runs fingerprinted the same production tree: SHA-256 tree digest `3b486613dc8bef95f432e9e635ba10763092cd2cb85febcb1b5c970fbc6b5053`, 109 files, 35,937,569 bytes.

## Service-worker warm proof

After each cold run, the gate required:

- registration scope `http://127.0.0.1:4173/game/r06/`;
- active script `http://127.0.0.1:4173/game/r06/sw.js`;
- active state `activated`.

Immediately before and after each second navigation, the page controller was required to be the same `/game/r06/sw.js` script in `activated` state. Missing registration, inactive/mismatched script, or missing/mismatched controller fails the gate.

Error-level messages surfaced by Playwright's `BrowserContext` and page errors fail the gate. Playwright does not provide a separate exhaustive service-worker exception event; service-worker-origin console errors are covered only when Playwright surfaces them, while active registration and controller identity are proved independently.

## Measured values

| Evidence | Cache | First-controllable | Frame p95 | >50 ms | Frames / 10 s | Route entries | Transfer | Encoded | Decoded | KeyS movement |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| run-01 | cold | 1,252.3 ms | 18.6 ms | 0 | 601 | 9 | 779,580 B | 781,648 B | 1,545,751 B | 71.57 |
| run-01 | warm | 1,034.6 ms | 18.6 ms | 0 | 601 | 9 | 5,912 B | 783,665 B | 1,545,751 B | 71.57 |
| run-02 | cold | 1,338.6 ms | 18.5 ms | 0 | 601 | 9 | 779,580 B | 781,648 B | 1,545,751 B | 71.57 |
| run-02 | warm | 936.2 ms | 18.7 ms | 0 | 601 | 9 | 5,912 B | 783,665 B | 1,545,751 B | 75.43 |

Cold grouping in both runs was navigation 2,095 B / 1 entry, scripts 315,736 B / 4, stylesheet 8,729 B / 1, and images 453,020 B / 3. Warm grouping was navigation 4,112 B / 1, scripts 1,200 B / 4, stylesheet 300 B / 1, and images 300 B / 3.

All four measurements had console errors 0, page errors 0, a visible `WASD` guide, a non-lost WebGL context, 24/24 nontransparent sampled pixels, 24 unique sampled colors, and a painted 320×168 minimap.

## Environment and evidence

- Route: `http://127.0.0.1:4173/game/r06/`
- Viewport: 1,280×720, DPR 1
- Host: macOS 25.5.0, arm64
- Runtime: Node 24.14.0, Playwright 1.62.0 (exact dev dependency)
- Browser: headless Google Chrome 151.0.7922.76, system-auto graphics
- Renderer: `ANGLE Metal Renderer: Apple M3`

Retained artifacts:

- `work/goal0_r06_baseline/evidence/run-01/baseline.json`
- `work/goal0_r06_baseline/evidence/run-01/verified-r06.png`
- `work/goal0_r06_baseline/evidence/run-02/baseline.json`

The second JSON intentionally records `screenshot: null`; one representative screenshot is retained.

## Checks

- Node syntax check: PASS.
- Strict TypeScript: PASS.
- Vitest: PASS — 38 files, 205 tests.
- Production build: PASS — 119 modules transformed; existing chunk-size warnings remain informational.
- Current-R06 browser gate: PASS twice, with a fresh gate-started production preview and production build each time.
- Output/URL rejection checks: PASS for absolute output, `..` escape, remote HTTPS URL, and URL credentials.
- Representative screenshot visual inspection: PASS.

## Reproduction

Standard prerequisite and default temporary-output run:

```text
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm test:e2e:r06
```

Retain two machine-readable runs and one representative screenshot:

```text
pnpm test:e2e:r06 --output work/goal0_r06_baseline/evidence/run-01
pnpm test:e2e:r06 --output work/goal0_r06_baseline/evidence/run-02 --no-screenshot
```

This validation machine used its existing Chrome by adding `--browser-executable "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`; that is an optional local override, not the normal repository workflow.

## Risks and boundaries

- This is a local desktop/headless-Chrome baseline. It does not establish iPhone, Safari, touch, PWA-install, thermal, battery, public-deploy, or real-device readiness.
- No pass/fail performance budget was invented. Functional observability, resource coverage, and warm service-worker control are gated; measured timing is a comparison baseline for R09 under the same environment.
- `transferSize` follows the browser Resource Timing API and may include protocol/header accounting or report cache/service-worker effects differently from encoded body size. Entry-level and grouped values are retained for interpretation.
- Vite's existing chunk-size warnings remain. This task did not change production chunks or gameplay.
- The isolated writer worktree was outside the Workspace audit tool's supported path. Canonical-main postflight is the authoritative finish gate and is recorded in the Goal 0 handoff report.
