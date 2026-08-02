# Design QA — F.R.A.M. R05 / Concept C fidelity gate

## Comparison contract

- Source visual truth: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Browser-rendered implementation: `work/r05_fram_visual_pass/r05-current-final-1280x720.png`
- Full-view same-frame comparison: `work/r05_fram_visual_pass/concept-c-vs-r05-current.png`
- Focused actor comparison: `work/r05_fram_visual_pass/concept-c-vs-r05-hero-current.png`
- Route: `http://127.0.0.1:5174/game/r05/`
- State: initial active gameplay, fixed diagonal camera, F.R.A.M. F-01 in front three-quarter idle
- CSS viewport / screenshot: 1280 × 720 px
- Source pixels: 1672 × 941 px; normalized to 1280 × 720 with Lanczos resampling
- Implementation screenshot: 1280 × 720 px; browser DPR 2; canvas 1917 × 1077 px capped at 1.5 render scale
- Runtime: `presentation=r05-fram`, `environment=r04-live`, `art=fram-r05-concept-c-causal-cell-v2`, Display-P3, AgX, banded focus 0.57 / clear band 0.30 / far 6.5 / near 8.5

The Concept C image is the visual North Star, not a runtime texture. R05 must nevertheless be judged against its visible result: high-density voxel/pixel-derived actor, coherent street-scale composition, wet material response, warm/cool lighting hierarchy, reclaimed-city density, restrained miniature depth, and unobtrusive HUD.

## Findings

- [P0] The macro scene is still a different composition.
  Location: complete playable cell.
  Evidence: Concept C is organized around one open wet road with a left retaining stair, upper-left water, one small shelter, right work area and edge-to-edge ruins. R05 is still dominated by two large roof volumes, a rectangular lot boundary and uniform meadow outside the cell.
  Impact: the screen reads as an upgraded R04 prototype rather than the selected C game screen.
  Fix: make a C-shaped graybox/collider cell the next authoritative layout before adding more props; reduce roof dominance and crop or replace empty outer meadow.

- [P0] Road, water, façade and foliage materials remain below the source.
  Location: center road, northern canal, roofs, façades and vegetation.
  Evidence: R05 now has one dark asphalt field, worn markings, repair seams, puddles and a visual-only canal, but surfaces remain flat colored geometry. Concept C shows rough asphalt grain, dry/wet roughness variation, reflection, masonry breakup, translucent leaf edges and materially distinct small props.
  Impact: lighting and DOF cannot create commercial HD-2D richness from low-frequency surfaces.
  Fix: replace the road and one shelter/façade with authored/baked albedo-normal-roughness-lightmap assets; keep procedural geometry as collision and generation proxy.

- [P0] Light hierarchy is still too green and even.
  Location: full frame.
  Evidence: R05 has a stronger warm key, cooler fog and reduced ambient/IBL, yet most world materials remain in the same olive middle-value band. Concept C separates warm sun, deep cool shadow, teal water bounce, local practical light and bright wet highlights.
  Impact: spatial depth, material identity and the character focal point remain weak.
  Fix: rebuild the cell around one baked warm-sun/cool-shadow lighting contract, then tune hero rim/contact shadow to the same source.

- [P1] The protagonist representation is now correct in kind but not final in art direction.
  Location: F.R.A.M. F-01.
  Evidence: the visible actor is now 7,734 deterministic micro-voxel cells, about 4.8 heads tall, with twin hair masses, separated face pixels, fitted/split coat, coral textile, slim limbs, small archive module and weapon socket. No smooth source mesh is loaded or rendered. At normal scale the actor reads as a small voxel girl, but her cloth volumes, hands, pose and facial appeal still lack Concept C's production finish.
  Impact: the user-requested voxel/dot direction is preserved, but the default heroine is not yet an accepted key character asset.
  Fix: make three generated voxel presets at the same camera/pose, art-direct one silhouette, then add authored voxel hair/face/coat clusters and secondary motion without changing representation.

- [P1] The HUD remains heavier than Concept C.
  Location: top-left mission/vitals, center interaction prompt, bottom loadout.
  Evidence: Concept C uses a small bar cluster and compact diamond actions. R05 covers more of the world with mission text and a centered prompt.
  Impact: the visual benchmark reads as a development/gameplay overlay instead of a cinematic exploration frame.
  Fix: collapse the mission to one line, move contextual prompts off the actor silhouette, and keep detailed text for pause/catalog states.

## Required fidelity surfaces

- Fonts and typography: readable and technically stable, but the mission/prompt hierarchy is more verbose and heavier than C. P1 remains.
- Spacing and layout rhythm: camera is wider and lower than the earlier R05, but the large roofs and outer meadow still determine the frame. P0 remains.
- Colors and visual tokens: F.R.A.M. white hair, sage coat, coral textile, graphite under-suit and restrained cyan signal separate better than before. World olive wash still compresses the palette. P0 remains.
- Image quality and asset fidelity: actor is genuine realtime micro-voxel geometry; Concept C is not used at runtime. Environment surface fidelity is still insufficient. P0 remains.
- Copy and content: official F.R.A.M. identity and Japanese game text are present. The quantity of visible copy is above the source benchmark. P1 remains.

## Comparison history

1. Primitive-hero pass — `r05-active-1280x720.png`
   - Earlier scoped pass was withdrawn after user review. Smooth rounded primitives, narrow blur band and inherited environment were P0.
2. First high-density voxel pass — `r05-concept-c-voxel-final-1280x720.png`
   - Replaced the smooth actor with a rig-guided voxel surface, widened the clear band and added density props. The actor still read as a broad archive box and the scene remained green/flat.
3. Voxel-girl silhouette pass — `r05-voxel-girl-05-final-1280x720.png`
   - Reduced the pack, split the coat, added white hair/twin silhouette, face pixels, coral textile, slimmer limbs, a lower camera and stronger warm/cool lighting.
4. Current pass — `r05-current-final-1280x720.png`
   - Recompiled the actor to 4.8-head proportions using 7,734 visible cells, added a coherent asphalt overlay, worn markings, sparse repair seams and a northern visual-only canal. The same-frame comparison still shows P0 scene/material/light mismatch.

## Primary interactions and runtime checks

- Started from `F.R.A.M.を起動`.
- Pressed ArrowUp and confirmed screen-relative movement remained active.
- Pressed Q and confirmed the manual relic-skill path remained active.
- Confirmed 1917 × 1077 internal canvas, Display-P3 capability path, AgX, `r05-fram`, R05 art ID, banded miniature-depth, `high-density-articulated-voxel-surface` and 7,734 visible-cell metadata.
- Full automated regression and production build are recorded separately; this visual gate does not convert technical success into art acceptance.

## Implementation checklist

- [x] Keep R01–R04 and public R04 unchanged.
- [x] Remove smooth primitive hero from R05 runtime.
- [x] Preserve visible micro-voxel/dot construction through pose, equipment and lighting changes.
- [x] Rebuild the default actor as a short-proportion voxel girl with articulated parts and socketed weapon.
- [x] Reduce the conspicuous blur band and lower the R05 camera angle.
- [x] Add a coherent road material layer and water/vegetation composition cues.
- [ ] Replace the inherited macro layout with a C-shaped causal graybox.
- [ ] Produce one baked PBR/lightmap road-shelter-façade material benchmark.
- [ ] Pass the next same-frame full-view and actor-focused comparison.

## Open questions

- Which of three future voxel-girl silhouette presets should become the default F.R.A.M. body preset.
- Whether the C-shaped layout becomes R05 itself or a clean R06 successor while this local R05 remains comparison history.

final result: blocked
