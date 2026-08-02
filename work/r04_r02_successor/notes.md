# Notes: R04 R02-successor

## Confirmed starting point

- R02は3,600×1,800 world、30Hz deterministic simulation、collision、enemy、loot、quest、二武器、semi-auto controller、manual relic skillを持つ。
- R03はConcept Cのcamera、palette、density、lighting、material、DOF、actor scaleを固定したvisual benchmarkだが、world causalityを持たない独立Canvas 2D appである。
- 正しい方向はR02のgameplay coreを正本にし、R03をgolden visual referenceとしてrenderer／asset layerを再構築すること。
- 公開versionはR01、R02、R03を保持し、新版はR04とする。

## Evidence to collect

- R02-derived routeが`PrototypeBState`を更新していること。
- scroll、collision、loot、quest、semi-auto、manual skillがR04で動くこと。
- Concept C／R03との同一viewport比較。
- local build/test/browser console結果。
- GitHub Pages runと公開URLの実browser結果。

## Evidence collected so far

- Release shell, R03 freeze, R04 presentation contract, and realtime R04 hero focused suite: 5 files／18 tests passed.
- R03 snapshot source and built output checksums: 19／19 passed in the release worker's verification.
- R04 route is the only live Vite entry; R01／R02／R03 are independent static snapshots.
- Final full check: 30 files／184 tests, strict TypeScript, and production build passed.
- Frozen snapshots: R01 9／9, R02 11／11, R03 19／19 SHA-256 entries matched.
- Production preview `/game/r04/`: `experience=r04`, `environment-profile=r04-live`, `quality=pc-ultra`, half-float 4× MSAA, AgX, Display-P3 capability path, GTAO／bloom／SMAA／tilt-shift were reported by the running scene.
- Browser interaction: quest `briefing → travel-to-fork`, relic `READY → cooldown`, weapon `blade → impact`, W movement `(430,900) → (411,889)`. Browser warning／error: 0.
- Visual evidence: `r04-production-preview-1672x941.png`, `concept-c-vs-r04-pass3.png`, hero-front and roam／combat captures. Design QA passed for an R02-successor deployment candidate, not for Concept C parity or commercial art acceptance.
- Final review caught two P1s before commit. R04 now removes inherited unbound solids／legacy anomaly, classifies every inherited Beauty Cell mesh by causal role, rejects unknown meshes, and uses the simulation anomaly as authority. R04 HTML now preloads the meadow texture; the production HTML contains its hashed WebP URL for first-install service-worker discovery.
- Release commit `ab33dd8` was pushed to `main`; GitHub Pages run #13 completed successfully.
- Public HTTP checks returned 200 for `/game/`, `/game/r04/`, frozen `/game/r03/`, `/game/r02/`, `/game/r01/`, the R04 manifest, root service worker, and hashed meadow WebP.
- Public browser catalog order is R04→R03→R02→R01. Public R04 kept the R02-derived quest, weapon, movement, and manual relic flow; R04 render metadata reported `r04-live`, `pc-ultra`, 2556×1436, PMREM, AgX, half-float 4× MSAA, GTAO／bloom／SMAA／tilt-shift, and ground texture `ready`. Warning／error: 0. Evidence: `r04-public-final-1672x941.png`.

## Open findings

- Runtime inheritance is fixed: `r04/index.html -> src/main.ts -> startPrototypeB({experience: "r04"}) -> PrototypeBState -> PrototypeBRenderer`.
- R04 presentation profile is `r04-live`; no simulation fork and no renderer-owned HP／loot／movement are allowed.
- Camera must begin around a 520–560 view height and preserve the shared fixed-camera basis used by WASD conversion.
- Central road readability requires remapping tall collider markers to low drains／curbs／shelter edges while retaining the same collision footprints.
- R04 PBR must avoid the dark unlit wet-film overlay; wetness belongs in physical material response and local puddles.
- Hero must remain articulated realtime 3D, with readable female face／hair／coat／SF tools at gameplay scale.
- R03 must be frozen as a self-contained relative-base snapshot before R04 becomes the only live route.
- R04 keeps the opening cell as the densest art pass; later continuous-world regions still need equivalent compiler density.
- Public Pages run and public URL behavior are confirmed. User art acceptance remains separate pending evidence.
