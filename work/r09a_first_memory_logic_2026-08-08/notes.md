# R09A Notes

## Baseline

- Source branch: `main`
- Baseline HEAD: `87606d4d2010274df089a56c79fc6634ddbe694d`
- Baseline code SHA: `1c9d355`
- Canonical R06: cold／warm first-controllable 1,448.3／988.9 ms; frame p95 18.6／18.6 ms; long frame 1／0; console／page error 0.
- Preflight: PASS 36, WARNING 0, FAIL 0. Git warning only for preserved untracked 24 files in the main worktree.

## Initial architecture observations

- `PrototypeBState` currently owns only a single expedition and a linear briefing→fork→ruin→return quest.
- `SaveRepository` already provides A/B rotation, revision, checksum, corruption recovery, import/export, and post-write verification. R09 should reuse it under a separate namespace.
- `WorldLegacy` demonstrates strict exact-key decoding but belongs to the older Phaser run model and must not be imported automatically.
- R06 has a dedicated static route and boot shell. R09 should get its own route so the archived R06 remains reproducible.

## Evidence log

- 2026-08-08: Project preflight passed before writes.
- 2026-08-08: `tests/prototypeB/worldMemory.test.ts` 12/12 passed。
- 2026-08-08: strict TypeScript passed after the core WorldMemory slice。
- WorldMemory v1 stores only durable site／item／base／module／expedition history and event IDs. It contains no player HP, enemies, or position.
- Both modules already have deterministic derived effects: Pathfinder Array = route overlay + 1.12 exploration speed; Relic Overdrive = coral aura + 0.65 relic cooldown multiplier.
- 2026-08-08: strict TypeScript passed; production Vite build passed.
- 2026-08-08: full Vitest passed: 39 files／217 tests.
- 2026-08-08: production-preview browser gate passed all four `2 site × 2 module` branches plus retreat. Each branch included real movement, range-based auto-basic, manual relic skill, save, second expedition, full reload, and zero console／page errors.
- 2026-08-08: retreat retained `canopy-relay` and one recovered item, retained no base／module, ended with `retreated`, and reloaded as a fresh second expedition.
- 2026-08-08: R09 versus R06 local performance gate passed. First-controllable median 988.0／985.0 ms, transfer 794,338／789,565 bytes, frame p95 18.5／18.6 ms, long frames over 50 ms 0／0. Hashed production resource lists fingerprint both route artifacts in the evidence JSON.
- 2026-08-08: final actual-play screenshots and machine-readable evidence are under `evidence/browser/` and `evidence/performance/`.
