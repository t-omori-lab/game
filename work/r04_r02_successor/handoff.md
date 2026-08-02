# Handoff: R04 R02-successor

Status: local deployment candidate; public verification pending

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

## Remaining before completion

- Exact-file commit and push.
- GitHub Pages workflow success for that commit.
- Public catalog, R04 and frozen R01–R03 verification in the in-app browser.
- Record commit SHA, Pages run URL, public URL, and the remaining North Star visual delta.
