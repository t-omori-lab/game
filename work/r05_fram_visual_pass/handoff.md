# Handoff: F.R.A.M. R05 visual pass

Status: public R05 evaluation build verified; visual gate blocked

## What is now true

- R05 keeps the R04 causal world, movement, collision, quest, loot, semi-auto basic attack and manual skill.
- The visible protagonist is a 7,734-cell articulated high-density voxel girl. A CC0 mesh is used only offline as anatomy/rig scaffold; no smooth source mesh ships or renders.
- The actor has 4.8-head proportions, white twin hair silhouette, face pixels, split sage coat, coral field textile, graphite under-suit, compact archive module and right-hand weapon socket.
- The camera is lower and wide, the clear play plane is broader, and near/far miniature blur is restrained.
- R05 adds a coherent asphalt overlay, worn markings, sparse repair seams, puddles, a visual-only northern canal, vegetation and lived-in props.
- Public R01–R03 remain frozen. The last public R04 commit has been rebuilt as a self-contained frozen snapshot so R05 source changes cannot alter it.

## Current evidence

- Public route: `https://t-omori-lab.github.io/game/r05/`
- Current frame: `r05-current-final-1280x720.png`
- Same-frame Concept C comparison: `concept-c-vs-r05-current.png`
- Focused actor comparison: `concept-c-vs-r05-hero-current.png`
- Runtime: 1280×720 CSS, 1917×1077 canvas, DPR 2, Display-P3, AgX, `r05-fram`, art ID `fram-r05-concept-c-causal-cell-v2`, banded focus 0.57 / clear 0.30 / far 6.5 / near 8.5.
- Interaction smoke: start, ArrowUp, Q.
- Design QA: project-root `design-qa.md`, `final result: blocked`.
- Release checks: 32 files／190 tests, strict TypeScript, production build and R01–R04 SHA-256 manifests pass.
- Production artifact browser: catalog order R05→R04→R03→R02→R01; frozen R04 bundle starts; R05 starts, moves and accepts Q with zero warning／error.
- Public deployment: commits `0980f0f`／`35cf75f`; GitHub Pages run #15 succeeded. Catalog and R01–R05, R04 snapshot, R05 manifest／OG and root service worker return HTTPS 200.
- Public browser: R04 frozen bundle reports `r04-live`／`pc-ultra`／2556×1436. R05 moves `430,900 → 426,896` and reports `r05-fram`／`r04-live`／1917×1077／`high-density-articulated-voxel-surface`／7,734 cells with zero warning／error.

## Remaining blockers

- C-shaped macro layout is not yet authoritative; large roofs and meadow still dominate.
- Road, water, façade and foliage need authored/baked PBR and lightmap quality rather than flat colored geometry.
- Warm sun, cool shadow, wet highlight and practical-light hierarchy still do not match Concept C.
- The default voxel heroine needs one more art-directed preset comparison before acceptance.
- HUD density remains above the source.

## Deliberate non-claims

- Not Concept C complete reproduction.
- Not commercial HD-2D art acceptance.
- Public availability is verified, but it remains an evaluation build rather than an art-accepted release.
- Not iPhone 16 Pro real-device validation.
