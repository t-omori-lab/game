# Handoff: R04 R02-successor

Status: publicly deployed and browser-verified; user visual review pending

## Implemented

- `/game/r04/` is a live R02-derived Three.js route. It keeps the deterministic continuous world, collision, quest, loot, two weapons, semi-auto basic combat, and manual relic skill.
- Camera, lighting, PBR response, tilt-shift, road／building／vegetation density, and the articulated realtime 3D female SF hero were rebuilt toward Concept C／R03.
- R01／R02／R03 remain frozen snapshots. The root catalog lists newest first and uses actual captures. R04 has a dedicated manifest and service-worker cache entry.
- Solid-looking R04 structures are constrained to authoritative colliders; non-collision skyline layers are outside the reachable world and visually non-solid. The unjoined companion is neither created nor updated.

## Local verification

- 30 test files／184 tests passed.
- strict TypeScript passed.
- production build passed; only existing large-chunk advisory remains.
- R01 9／9, R02 11／11, R03 19／19 checksums matched.
- Production browser: quest acceptance, manual relic cooldown, weapon switch, movement／scroll and R04 render metadata passed; warning／error 0.
- Design QA passed for this versioned R02-successor deployment candidate. It does not claim exact Concept C parity, commercial-quality art acceptance, WebGPU, true HDR, native Steam, or iPhone 16 Pro performance.
- Final P1 fixes remove inherited false-solid shells／legacy anomaly, enforce causal classification for all inherited meshes, and expose the hashed ground texture in built R04 HTML for first-install offline caching.

## Public verification

- Release commit: `ab33dd8cef35c588b24b7e65365fe2c25b148dd4` on `main`.
- GitHub Pages: run #13, success — `https://github.com/t-omori-lab/game/actions/runs/30730721269`.
- Public catalog: `https://t-omori-lab.github.io/game/`; R04: `https://t-omori-lab.github.io/game/r04/`.
- Catalog order and direct routes R04→R03→R02→R01 were browser-verified. All four routes, R04 manifest, root service worker, and hashed meadow texture returned HTTPS 200.
- Public R04 kept quest acceptance, weapon switch, movement／scroll, and manual relic cooldown. R04 renderer metadata and ground texture `ready` were present; browser warning／error: 0.
- Evidence capture: `r04-public-final-1672x941.png`.

## Remaining art gate

- User visual acceptance against Concept C／commercial HD-2D remains pending.
- Richer authored materials, curved vegetation, reflected light, atmospheric depth, the final commercial character rig／animation, and equivalent density across later continuous-world regions remain the largest visual delta.
- `F.R.A.M. (Frontier Relics Archive Module)`／「辺境遺物記録モジュール」／「フラム」は a strong naming candidate, not an adopted title.
