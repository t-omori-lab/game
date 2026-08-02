# R05 improvement strategy — evidence notes

Updated: 2026-08-02

## Confirmed evidence

### Public visual capture

- Captured current public catalog, R05 intro, and R05 gameplay at 1280×720 in the user-selected browser.
- Current-session direct navigation to R05 was approximately 7.2 seconds in one observation. A separate cold public transition exceeded the 10-second observation window and temporarily blocked state capture. These are diagnostic observations, not a controlled benchmark.
- Public R05 shows strong horizontal top／bottom blur bands. The center road and hero are sharper, but geometry at the same screen height is blurred regardless of scene depth.
- R05 gameplay exposes location／mission, HP, weapon, skill, item, and contextual `E` interaction, but no mini-map, route marker, pause／controls, or persistent PC input guidance.
- Concept C at the same viewport keeps the main route／actor almost sharp and applies softness mainly to actual near／far layers and light.

### Catalog／service worker

- Catalog JS is approximately 2.64 KB gzip 1.31 KB; CSS approximately 6.23 KB gzip 1.98 KB. Code size is not the catalog bottleneck.
- CSS background card images total approximately 7.93 MB:
  - R01 OG: 2,478,394 bytes.
  - R02 OG: 2,478,394 bytes.
  - R03 Concept C image: 2,656,918 bytes.
  - R04 cover: 157,117 bytes.
  - R05 OG: 161,711 bytes.
- CSS background images are present for all five cards at once and are not `img loading=lazy` candidates.
- Root service worker install iterates catalog and R01–R05 HTML documents and `cache.addAll()` for linked assets.
- Current production artifact audit counted 38 precache files, approximately 8.29 MB raw／5.61 MB gzip transfer estimate. Combined first-load transfer estimate after overlap is approximately 10.9 MB.

### R05 boot／render

- R05 entry: 1,019,606 bytes raw／304,317 bytes gzip.
- Runtime synchronously generates 1024²／512² surface DataTextures, R04-derived procedural geometry, 7,734 hero cells, post stack, and first shader render.
- Standalone texture-library generation measured approximately 2.27 seconds and approximately 32 MB ArrayBuffer on the current local machine.
- Hero construction measured approximately 101 ms, 24 InstancedMesh／31 draw-capable meshes, 7,741 runtime instances, and approximately 840,432 triangles. Shadow rendering repeats most of this geometry.
- Current post path renders around 1917×1077 with 4× MSAA, GTAO, horizontal／vertical blur, bloom, and SMAA.

### Blur implementation

- `BandedTiltShiftShader` derives signed blur distance from `vUv.y`, not scene depth.
- R05 profile sets focus 0.57, clear band 0.30, far 6.5 px, near 8.5 px at DPR cap 1.5.
- Considering the outer 3.230769 tap, the current maximum sample reach is roughly 14／18 CSS px at the frame edges.
- CSS `contrast(1.14)` further emphasizes halo and band boundaries.

### Character

- AssetDNA declares 4.8 heads, but decoded geometry is approximately 4.27 heads; runtime head Y scale gives a simple assembled ratio around 3.66 heads.
- Perceived tallness remains because lower-body region is approximately 49%, long pale coat／dark legs form one vertical column, hands are oversized, pose is symmetric, and twin buns read as ears from behind.
- Each cell receives pseudo-random lightness and uses rounded boxes with gaps, creating a beaded／fuzzy surface instead of deliberate pixel-art planes.
- Current generation samples a generic body surface. It does not author face, hair, ribcage, pelvis, limbs, coat, and pack as semantic voxel volumes.

### HUD／controls

- Existing inputs include WASD／arrows, Q／L manual skill, Shift guard, K dodge, R item, E interact, 1 weapon switch.
- PC CSS hides `.relic-controls` and equipment hints; tests currently lock parts of this hidden presentation.
- R05 start copy mentions only movement, auto basic, and manual skill.
- Mini-map, goal marker, pause／controls, gamepad, and R05 tap-to-move are absent.
- Destruction prompt still says `J` manual weapon use although the R05 combat presentation overwrites manual attack with semi-auto combat.
- Enemy HP currently selects a nearest enemy independently of the semi-auto target scoring, so displayed and attacked targets can diverge.

## Decisions

- Disable banded screen-Y blur before tuning any new DOF.
- Keep visible high-density voxel art, but compile authoring cells to a lower-cost outer surface and shadow proxy.
- Use F-01B Archive Surveyor, 4.05 heads, as the recommended comparison preset; retain A／C until user selection.
- Design UI as dynamic HUD, not permanent minimal HUD.
- Use a generated 2D minimap plus projected world markers rather than a second 3D camera.
- Use Figma for five information／interaction states before runtime UI implementation; use ImageGen for constrained character and HUD-surface comparisons.

## Unknowns

- iPhone 16 Pro cold／warm network, CPU／GPU compile, Safari／PWA, heat, battery.
- Actual HTTP transfer under GitHub Pages compression and a fully empty service-worker cache.
- GPU time per pass on representative PC Ultra hardware.
- Whether F-01A, B, or C meets the user's visual preference; code should not pre-empt selection.
- Whether depth-aware DOF can meet the C comparison and mobile performance budget simultaneously.

## Sources

### Project evidence

- `src/catalog.css`
- `src/catalog.ts`
- `public/sw.js`
- `src/prototypeB/render/UltraRenderPipeline.ts`
- `src/prototypeB/render/r05/R05FramProfile.ts`
- `src/prototypeB/render/hero/R05FramHeroVisual.ts`
- `tools/generate-r05-voxel-avatar.mjs`
- `src/prototypeB/render/northStarSurfaceTextures.ts`
- `src/prototypeB/app/layout.ts`
- `src/prototypeB/app/startPrototypeB.ts`
- `src/prototypeB/sim/SemiAutoCombatController.ts`
- `src/styles.css`
- `tests/prototypeB/northStarPresentation.test.ts`
- `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`

### Current-run screenshots

- `evidence/public-root-1280x720.jpg`
- `evidence/public-r05-intro-1280x720.jpg`
- `evidence/public-r05-gameplay-1280x720.jpg`

### Official external references

- Three.js WebGLRenderer／compileAsync: https://threejs.org/docs/pages/WebGLRenderer.html
- Three.js KTX2Loader: https://threejs.org/docs/pages/KTX2Loader.html
- Three.js BokehPass: https://threejs.org/docs/pages/BokehPass.html
- Vite dynamic import: https://vite.dev/guide/features.html
- MDN Cache.addAll: https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll
- Returnal UX: https://blog.playstation.com/2021/05/11/unpacking-returnals-ux-design-gameplay-first-ui-retro-futuristic-tech-and-accessibility/
- Diablo Immortal PC UI／controls: https://news.blizzard.com/en-gb/article/23797159/making-diablo-immortal-for-pc
- Diablo Immortal accessibility／controller／touch layout: https://news.blizzard.com/en-us/article/23805083/making-a-game-for-everyonediablo-immortals-accessibility-features
- Zelda TOTK controls／map／mini-map: https://www.nintendo.com/jp/zelda/totk/guide/en/index.html
