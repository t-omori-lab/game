# R09A First Memory Logic Proof — Report

Status: **LOCAL CANDIDATE COMPLETE**

This report will record only verified implementation and browser evidence. Public deployment and iPhone 16 Pro acceptance remain separate, pending outcomes.

## Implemented

- Added a dedicated local `/game/r09/` route and static boot entry while preserving R06 and older routes.
- Added `WorldMemoryState v1`, five durable event families, a pure reducer, an exact-key strict codec, a migration seam, and an R09-only `SaveRepository` namespace with IndexedDB／memory fallback.
- Kept expedition HP, enemies, position, and transient cooldown out of the durable save.
- Connected two simultaneously reachable sites, item recovery, one base claim, two mutually distinct modules, item consumption history, return, retreat, and a fresh second expedition to the existing R06-derived playable scene.
- Pathfinder Array adds route markers and 1.12× exploration speed. Relic Overdrive adds a coral aura and applies a 0.65× manual-relic cooldown multiplier.
- Preserved the unchosen site as an unresolved world-memory objective.

## Verification

- Strict TypeScript: passed.
- Vitest: 39 files／217 tests passed, including 12 World Memory contract tests and legacy-route regressions.
- Production build: passed.
- Desktop Chrome, 1280×720 production preview: all four `2 site × 2 module` branches passed from clean saves; each run included map traversal, auto-basic combat events, manual relic events, return, module installation, second-expedition effect, and full-page reload. Retreat also passed. Console／page errors: 0.
- R09 versus R06 local performance gate: first-controllable median 988.0 versus 985.0 ms; same-origin transfer 794,338 versus 789,565 bytes; frame-time p95 18.5 versus 18.6 ms; frames over 50 ms: 0. All 10% regression gates passed. Hashed production resource lists identify both route artifacts.
- Evidence: `evidence/browser/r09-memory-loop.json`, eight actual-play screenshots, and `evidence/performance/r09-vs-r06.json`.

## Known limits

- No Product Shell, Google SSO, cloud save, F-02 rebuild, or engine decision is included in R09A.
- Local verification does not establish public deployment or iPhone 16 Pro acceptance.
- Automated evidence proves that the difference appears; it does not prove that an unbriefed player understands it within 90 seconds or finds the loop compelling. Those remain playtest gates.
- R09 intentionally uses the R06 presentation profile for an apples-to-apples logic and performance proof. Character／lighting advancement resumes in R09B.
