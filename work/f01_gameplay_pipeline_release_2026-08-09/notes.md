# F-01 Gameplay Fidelity Pipeline Release Notes

## Starting state

- Worktree: `/tmp/fram-r09b`
- Branch: `codex/f01r-fidelity-reconstruction`
- R09 local preview: `http://127.0.0.1:4177/game/r09/`
- Canonical F-01 pack: 9,454 cells
- Canonical payload SHA-256: `a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1`
- Gameplay derivative: 9,421 visible cells; 33 detached ground-only cells excluded
- Render profile candidate: fill `1.01`, edge radius `0.012 cell`, detailed cast／receive shadow disabled
- Local verification: 46 files／238 tests, strict TypeScript, production build, Chrome console／page error 0

## Reproducibility proof

- Profile: `src/characterForge/f01.gameplay-profile.json`
- Pack audit: pass; digest／9,454 cells／33 detached ground cells reproduced from the profile
- Browser capture: pass; 1280×720; source 9,454／visible 9,421; console／page error 0
- Evidence: `evidence/local-r09/capture.json` and its two screenshots
- Skill integrity: every referenced file exists; no cache／editor noise; regression test included in the full suite

## Pipeline contract

1. Beauty Sheet is art authority; Build Sheet is machine input.
2. Compiled surface pack and payload digest are immutable source truth for a released epoch.
3. Gameplay adapter may apply world scale, facing, sockets, animation and distance-specific rendering only.
4. Morphology changes require a new source／pack version; they cannot be hidden inside the runtime adapter.
5. Same actor ID, source／payload digest, cell counts and same-camera screenshots are compared before human review.
6. Machine pass does not replace the user’s same-person／cute／commercial-quality judgment.

## Release evidence

- Implementation commit: `f105e09f4f7b9a771e645b16c0edf7a7e5817773`, pushed to `origin/main`
- GitHub Pages: run 27, ID `31269855944`; build／deploy jobs both `success`
- Public R09 capture: pass; actor `fram.character.f01.gameplay-bridge-v1`; source 9,454／visible 9,421; canonical digest matched; console／page error 0
- Public HTTP 200: `/game/`, `/game/r09/`, `/game/forge/f01/`, `/game/r01/`, `/game/r06/`, `/game/r08/`
- Public evidence: `evidence/public-r09/capture.json` and its two screenshots
- Public pages reported `Last-Modified: Sat, 08 Aug 2026 17:37:46 GMT`
