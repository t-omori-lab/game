# Notes: AI-native Concept C Beauty Cell v1

## Baseline

- Repository: `t-omori-lab/game`
- Branch: `main`
- Start commit: `88d0f2f66cc4f6e531d6fcb875f2395403c360e5`
- Start state: clean, local branch ahead of `origin/main` by 8 commits
- Runtime route: `/game/?prototype=north-star`
- Visual reference: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Public target: `https://t-omori-lab.github.io/game/`
- Version routes: `/game/r01/` current North Star preservation, `/game/r02/` AI-native Beauty Cell, `/game/` newest-first catalog

## Constraints

- Realtime 3D actor and gameplay must remain genuine; no Concept C raster background cheat.
- Preserve baseline prototypes and unrelated assets.
- Maintain deterministic 30Hz simulation and screen-relative input.
- Deploy is explicitly authorized by the user in this task.

## Findings

- Current 1600×900 desktop capture is a clean functional prototype but falls short of C mainly in actor size/detail, vegetation density, material richness, atmospheric depth, selective DoF, warm/cool light composition, and foreground framing.
- Current route already has modern road markings, concrete/water/metal, articulated hero, half-float MSAA, GTAO, bloom, SMAA, AgX, dynamic shadow, screen-relative input, and semi-auto combat. These should be reused rather than rebuilt.
- Baseline capture at 1600×900 reports a 3196×1796 internal buffer at DPR 2; debug FPS during initial capture was unstable and is not yet an accepted performance measurement.
- R02 production preview at 1600×900 reports a 3196×1796 internal buffer, `environment=beauty-cell`, `quality=pc-ultra`, `pipeline=half-float-msaa`, `tiltShift=true`, and stable cell ID `concept-c-beauty-cell-r02`.
- R01 production preview remains `environment=north-star-city`, `pipeline=half-float-msaa`, and loads its own relative `index-Cj67ZGSF.js`; the snapshot predates the tilt-shift dataset/pass and does not share R02 presentation code.
- A route-only R01 was rejected before release because it shared the current main bundle and could drift in future builds. R01 is now a compiled static snapshot of source commit `88d0f2f`, uses relative assets, and carries `SNAPSHOT.json` plus `SHA256SUMS`.
- A release review found that suppressing all fallback terrain for Beauty Cell left authoritative collision and the eastern quest route invisible. R02 now supplies readable fixtures and bounds anchors for every replaced town collider, while all non-replaced terrain／props／landmarks continue to render.
- Actual-camera review caught a beige road, oversized shelter mass, and weak vegetation edge. The accepted local candidate uses a darker wet road, reduced shelter dominance, stronger planter／vegetation framing, and a cyan anomaly in the far depth band.
- Full local verification: strict TypeScript passed; Vitest 26 files／163 tests passed; production Vite build passed; production preview returned HTTP 200 for catalog, R01, R02, service worker, and manifest.
- Vite reports large chunks (main about 880 KB and preserved legacy Phaser about 1.45 MB). This is a future loading／splitting concern, not a blocker for the current visual-first Beauty Cell release.

## Public deployment

- Commit: `e1cdb578e696a8f5e815bec6844c994050df7d8d`
- GitHub Actions: Deploy GitHub Pages run #9 (`30708042163`), build and deploy jobs succeeded.
- HTTPS 200: catalog, R01, R02, root service worker, R01 `SNAPSHOT.json`.
- Public catalog order: R02 then R01.
- Public R01: independent `./assets/index-Cj67ZGSF.js`, `environment=north-star-city`, `quality=pc-ultra`.
- Public R02: `environment=beauty-cell`, `quality=pc-ultra`, `pipeline=half-float-msaa`, `tiltShift=true`, stable ID `concept-c-beauty-cell-r02`, 3196×1796 internal canvas at the 1600×900 review viewport.
