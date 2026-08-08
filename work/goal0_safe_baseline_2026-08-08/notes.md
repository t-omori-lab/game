# Notes: Goal 0 Safe Baseline

## Starting State

- Date: 2026-08-08
- Branch: `main`
- HEAD: `0bf397c9cf9e3d988358569daa9c7a24142aa7e4`
- Remote relation: `main` is one local documentation commit ahead of `origin/main` (`b6cd199`).
- Workspace preflight: 36 PASS, 0 WARNING, 0 FAIL; Git warning only for uncommitted changes.
- Existing dirty state at start: staged 0, modified 3, untracked 24.
- Modified files at start: `docs/LEARNINGS.md`, `docs/NEXT_TASKS.md`, `docs/PROJECT_CONTEXT.md`.
- The existing dirty state predates Goal 0 and must not be staged or overwritten as a group.

## Scope

Goal 0 establishes evidence and an execution boundary. It does not implement R09 gameplay, Product Shell, authentication, cloud save, automatic quality selection, engine migration, or public deployment.

## Evidence To Collect

- Exact R06 route and boot path.
- Current browser automation and why it is stale.
- Performance signals already exposed by runtime.
- Cold and warm first-controllable measurement.
- Frame-time p95 and >50 ms long-frame count during a fixed scenario.
- Input-to-visible confirmation and console errors.
- Documentation conflicts against the 2026-08-08 development brief.

## Audit Findings

- Current R06 production path is `/game/r06/`: `r06/index.html` → `src/r06/main.ts` → shared Three.js Prototype B with `experience: "r06"`.
- `tests/e2e/smoke.py` is a legacy Phaser smoke. It expects obsolete start/status/orientation behavior and is not a current R06 gate.
- Existing R06 `data-ready-ms` measures module-evaluation-to-construction, not navigation-to-first-controllable.
- Existing debug FPS is a half-second average, not frame-time p95 or a long-frame count.
- A current R06 gate can use the existing `data-player-x`／`data-player-y` presentation state to prove visible movement without changing gameplay authority.
- Canonical documentation conflicts are concentrated in README's Phaser-primary description, Architecture's stale runtime loading description, and the 2026-08-05 Product Foundation additions that still include Local Trial, broad cloud sync, early auto-quality, and an early engine gate.

## Active Writer

- Task: `F.R.A.M. R06基準ゲート作成`
- Thread: `019fe05d-6c12-7673-930d-8c594e752b6a`
- Environment: isolated Codex worktree
- Model: `gpt-5.6-sol`
- Reasoning: `xhigh`
- Ownership: current-R06 E2E, reproducible measurement, narrow test tooling, Goal-0 writer evidence

## First Writer Review

- First commit: `fc4268644ec4e9d1b5ca42917aafeb7a55c85464`.
- Functional evidence passed twice: R06 active state, nonblank WebGL/minimap, coordinate response, page console/page error 0, cold/warm timing, 10-second frame sample.
- Independent `gpt-5.6-terra / high` review returned `revise before cherry-pick` with no P0.
- Required revisions: full-route resource transfer, enforced R06 Service Worker controller for warm run, visible WASD input, safe output containment, loopback provenance, build/source binding, locked Playwright workflow, aligned first-controllable definition, leaner screenshot evidence.
- The first commit stayed isolated until the hardened follow-up passed independent QA; the final two-commit series was integrated later as recorded below.

## Risks And Resolutions

- Project docs already contained uncommitted work. Their full diffs were audited as Goal 0／Product Foundation scope, independently reviewed, and included only after the user approved main integration.
- The main runtime chunks exceed Vite's 500 KB warning threshold.
- iPhone 16 Pro validation is outside Goal 0; browser emulation is not a substitute.
- JavaScript Playwright 1.62.0 is now exactly locked. The approved install used the fixed lockfile with browser-download hooks disabled.
- The registry freshness failure was resolved after explicit user approval. Regeneration changed only the generated date and the F.R.A.M. row date relative to the pre-write backup; the shared file was not mixed into the project commit.

## Canonical Integration And Finish

- User explicitly approved both the two-commit main integration and the limited shared-registry refresh.
- Isolated commits `fc426864`／`c325d2f` were integrated as canonical main commits `7166c82`／`1c9d355` without overlapping the pre-existing dirty paths.
- Canonical main verification passed: strict TypeScript, Vitest 38 files／205 tests, production build, and the R06 production-preview browser gate.
- Canonical browser evidence: cold／warm first-controllable 1,448.3／988.9 ms; frame p95 18.6／18.6 ms; >50 ms frames 1／0; route transfer 779,580／5,912 bytes; page console／page error 0; expected Service Worker controller before and immediately after warm navigation.
- `PROJECT_MANIFEST.json` was advanced to 2026-08-08. Registry regeneration changed only `Last generated` from 2026-08-03 to 2026-08-08 and the F.R.A.M. project row from 2026-08-03 to 2026-08-08; the pre-existing shared registry diff was otherwise preserved.
- Canonical postflight passed 36 project checks, current registry, and Git-state reporting. Pre-existing untracked planning／art files remain outside the Goal 0 commit scope.
