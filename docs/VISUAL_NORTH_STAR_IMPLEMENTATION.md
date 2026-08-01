# Visual North Star Implementation

Version: v0.1 draft  
Date: 2026-08-01  
Authority: implementation proposal; user art acceptance pending

## Decision

Adopt [concept E](concepts/visual-fidelity-v03/ideal-screen-e-final-target.png) as the provisional visual target. E preserves D's simple intersection and hybrid production structure, then corrects its crushed lower midtones, undersized actors, and generic white-haired scavenger silhouette. The folded semicircular survey frame, sage/rust clothing, cyan-amber blade, and restrained repair tags are a direction to author and test—not yet a locked protagonist biography or final costume.

The target is not a pixel-for-pixel promise. It establishes a production structure:

- stylized modular 3D humans, companions, enemies, weapons, and effects;
- fixed-camera 3D world shells with high-resolution baked lighting and surface layers;
- modular, causally generated environment components;
- realtime water, wetness, vegetation motion, actor shadow, combat light, and occlusion;
- minimal state-driven HTML UI.

Human characters should no longer use the current literal voxel surface as the default final representation. The voxel compiler remains useful for machines, buildable modules, damage states, procedural proxies, and one comparison candidate.

## Non-negotiable visual contracts

1. **Hero first** — exploration height is 10–14% of the viewport; combat framing may reach 14–18%. Face/hair, coat silhouette, weapon, action phase, and facing remain readable at normal play size.
2. **Bright world, deep range** — the world may be dangerous without a global gray or black veil. Sun, sky, local light, water, flowers, rust, and painted metal keep color in both light and shadow.
3. **Simple geometry must pass** — one road, one wall, one shelter, one water plane, vegetation, hero, companion candidate, and one enemy must produce an attractive frame before city density resumes.
4. **Physical separation** — dry concrete, wet asphalt, cloth, painted metal, bare metal, glass, water, foliage, and emissive signals must react differently to light.
5. **UI yields to the world** — idle UI occupies less than 8%; debug and performance data require an explicit debug state; touch controls appear only on touch layouts.
6. **Gameplay remains authoritative** — collision, target selection, hit timing, interaction, and world state remain in the deterministic simulation. Rendering may anticipate and emphasize but may not redefine results.
7. **Generated is not automatically accepted** — every AI or procedural candidate carries source, prompt/configuration, generator version, seed where applicable, license review, validation, and human approval.

## Runtime architecture

| Layer | Keep | Add or replace | Why |
|---|---|---|---|
| Simulation | 30 Hz deterministic state, semi-auto combat, collision and interaction | no visual rule inside simulation | replay and game logic stay stable |
| Camera | fixed orthographic direction, explore/combat composition | explicit shot profile, stable shadow volume, hero screen-size contract | fixed direction makes baking and art review repeatable |
| Actors | semantic action state and weapon sockets | rigged GLB hero/companions/enemies, `AnimationMixer`, LODs, KTX2 materials | required for face, hair, cloth silhouette and expressive action |
| World | causal city cell, collision proxies, modular IDs | visible 3D shells, baked lightmaps, camera-facing decals, depth/occlusion proxies | scrolling and parallax remain while most light/detail is prepaid |
| Materials | generated PBR surface fields, PMREM experiment | versioned PBR library, outdoor reflection probes, wetness masks, puddle/water materials | target depends on material contrast more than polygon count |
| Vegetation | causal placement | instanced authored clusters, wind phase, distance tiers, density masks | large perceived richness at bounded runtime cost |
| Lighting | warm key, cool rim, reduced fill, GTAO, bloom, AgX | outdoor HDR environment, fitted actor shadow, baked indirect light, local practical lights, color-grade LUT | concept E's depth cannot come from ambient intensity alone |
| UI | HTML/CSS HUD, input-specific controls | explicit intro/explore/combat/inspect/result visibility state | crisp scalable UI without covering the world |

### Concrete repository migration

Add `environmentProfile: "north-star-beauty-cell"` beside the existing city and baseline profiles. Do not overwrite either comparison route. Introduce these bounded modules:

- `RenderTier.ts`: separates visual tier from backend and experience; owns render scale, shadow, foliage, decal, post, and texture profile;
- `EnvironmentArtSlice.ts`: `group`, `ground/mid/roof/foreground` layers, occluders, replaced terrain/prop IDs, field-growth ownership, readiness, and disposal;
- `NorthStarBeautyCell.ts`: loads and assembles the one accepted benchmark cell while preserving simulation collider and interaction IDs;
- `NorthStarLighting.ts`: outdoor environment, sun/sky values, baked/static versus dynamic-shadow ownership, and per-tier shadow fitting;
- `NorthStarWetSurface.ts`: dry/wet mask response and independent deep-water surface;
- `NorthStarVegetation.ts`: baked ground growth plus three or four alpha-tested instanced near clusters;
- `NorthStarOcclusion.ts`: low-poly roof/foreground proxies and cluster fade along the camera-to-hero ray;
- `AssetPackLoader.ts`: asynchronous GLB/KTX2/manifest loading, verification, fallback, and disposal;
- `CompanionVisual.ts`: locomotion-family presentation contract, initially a rigid-part quadruped candidate.

Preserve the 30 Hz deterministic simulation, the orthographic azimuth/elevation and `CameraComposition` pure functions, semi-auto combat, `UltraRenderPipeline` fallback, sRGB baseline/P3 capability probe, hero pose/socket API, current city collision/interaction alignment, baseline route, mobile touch UI, and merged/voxel fallback.

Replace only within the Beauty Cell: the indoor `RoomEnvironment`, box-like architecture and foliage, single transparent water quad, realtime shadows for every static object, synchronous runtime surface generation, and always-visible desktop top HUD. Add a `back/survey-frame` socket to the new hero contract without making the generated concept mesh the source asset.

Do not use E's PNG as a background, depth source, texture sheet, or geometry source. It supplies acceptance relationships; production assets must own backs, depth, normals, UVs, collision, animation, and provenance.

### Fixed-camera hybrid world

A single flat background image cannot support continuous scrolling. Instead, divide the world into `VisualCell` assets:

- low- to mid-detail 3D shell for parallax, depth, occlusion, water boundaries, and collision registration;
- high-resolution albedo/normal/ORM atlas for visible surfaces;
- baked indirect-light/lightmap atlas for the approved sun state;
- camera-facing macro decals for stains, repairs, signage remnants, roots, and puddle edges;
- authored reflection probe and wetness profile;
- instanced vegetation batches driven by water, cracks, soil, light, and current human use;
- `visual-manifest.json` linking every visible object to gameplay IDs and provenance.

Only actors, water highlights, foliage motion, combat effects, local lights, and nearby shadows need full realtime response. This is the main reason the target can remain browser-capable.

The Beauty Cell divides visible content into `ground`, `mid`, `roof`, and `foreground` layers. Each cell package supplies base color, normal, ORM, baked indirect/lightmap, alpha or decal masks, wetness, and low-poly depth/occluder proxies. Small ground vegetation may be baked; nearby clumps use `alphaTest` and alpha-to-coverage rather than large transparent batches. Static shade and dapple are baked. Dynamic shadow casters are limited to hero, companion, enemies, and a few important moving props.

### Lighting and wet-world stack

Initial PC master:

1. legal, versioned outdoor HDR environment converted through PMREM;
2. one stable warm directional sun with a shadow volume fitted around the camera target;
3. cool sky/bounce and a restrained actor rim, never a broad white fill;
4. baked indirect light and AO on static world shells;
5. local repaired lamps and combat lights with strict distance and count;
6. wetness mask blending darker albedo, lower roughness, flattened micro-normal, and controlled clearcoat;
7. puddle/water planes using probe or planar reflection first; SSR is optional later, not a prerequisite;
8. half-float render target, restrained GTAO, selective bloom, SMAA/MSAA, AgX, and an original color-grade LUT;
9. subtle depth separation only after gameplay remains sharp. Do not use strong vignette or blanket blur.

The current neutral `RoomEnvironment` is a technical material probe, not the final outdoor environment.

## Character and companion pipeline

### Runtime contract

Create a versioned `HeroRigContract` shared by art tools and runtime:

- skeleton version and bone names;
- locomotion/action clips and loop rules;
- weapon, pack, hand, effect, and camera-focus sockets;
- material slots: skin/hair, cloth, painted metal, bare metal, glass, emissive;
- silhouette and proportion profile;
- LOD and texture profile;
- hit, windup, active, recovery, and foot-contact markers;
- optional face bones or morph targets;
- palette, wear, and equipment overrides.

Companions use locomotion-family contracts rather than one universal skeleton: humanoid, quadruped, small wheeled, hovering, and multi-legged. Roster identity comes from silhouette, locomotion, replenishment, ability, personality, and joining history, not only palette swaps.

### Offline AI-assisted flow

```text
StyleProfile + gameplay role
  -> image concept variants and turnaround candidates
  -> human silhouette/costume/material selection
  -> AI 3D candidate or modular base mesh
  -> topology/UV/material review
  -> Blender retopology and rig binding
  -> animation candidate import and manual cleanup
  -> PBR bake and texture compression
  -> GLB/KTX2/LOD validation
  -> actual-camera gameplay capture
  -> human accept/reject
  -> versioned asset manifest
```

AI 3D and rigging systems may create candidates, but they do not become canonical assets until topology, deformation, UVs, sockets, material ranges, animation contacts, license, and gameplay-size appearance pass. The repository currently has no GLTF/KTX2/Blender build path; adding that path is explicit work, not an assumed capability.

Use Blender as the canonical editable source for known topology, rigs, actions, UVs, PBR baking, and export. AI 3D is best treated as a donor for hard-surface packs, sensors, tools, robot shells, and static module ideas; deforming body, coat, hair, and animal anatomy should start from controlled modular topology. A generated whole character is never the unreviewed source of truth.

The initial protagonist pilot should own stable modules for body, head, hair, asymmetrical field coat, survey pack, repair parts, and weapon. The first companion pilot is a separate rigid-part quadruped contract; future dog and cat bodies use a quadruped deformation family rather than being forced into the same rig. Simulation remains authoritative for `Acquire -> Windup -> Hit -> Recover`; animation only maps the current phase and progress to a clip.

### Asset contract and provenance

Every accepted runtime asset has an `AssetDNA` record with:

- stable ID, schema/revision, kind, style profile, and gameplay contract;
- silhouette keys, semantic parts, palette roles, material slots, and wear history;
- rig family, required bones, sockets, collision proxy, and animation mapping;
- separate `pc-ultra`, `pc-high`, `mobile-high`, and `mobile-safe` budgets;
- source owner/license, generator/tool/version, prompt or specification, seed where applicable, raw/final SHA-256, human edits, validation report, and accept/reject reason.

Mechanical values such as mass, reach, power, heat, collision, and damage are schema-validated, deterministic records and are never rewritten by a language or image model at runtime. AI-editable fields are explicitly limited to candidates such as motif, surface history, palette variation, and short concept notes.

## Environment generation pipeline

Generate a `CausalWorldCell` before assets:

```text
old use
  + water / sunlight / soil / structural state
  + present human or nonhuman need
  + route / threat / reward / interaction
  -> selected module grammar
  -> deterministic layout and gameplay validation
  -> visual module candidates
  -> material, wear, vegetation and reuse passes
  -> fixed-camera bake
  -> runtime package
```

AI may propose a shelter facade, repair patch, sign remnant, plant cluster, item shape, or material variation. Deterministic rules decide dimensions, sockets, collision, reachability, wetness, vegetation causality, reward, and state mutation. Runtime language generation never determines physics or combat outcomes.

## Delivery formats

Recommended canonical runtime package:

- `.glb` with meshopt or Draco geometry compression;
- KTX2/Basis Universal textures with separate color and data color spaces;
- PC 4K/2K texture sources and derived 2K/1K mobile variants;
- baked lightmap and ORM atlases per `VisualCell`;
- one manifest containing digests, source, generator/tool versions, license review, material slots, LODs, bounds, sockets, and gameplay IDs;
- deterministic fallback materials and proxy geometry when an optional visual asset fails.

The build toolchain should pin Blender, glTF Transform, glTF Validator, KTX-Software, and a JSON Schema validator. Automated gates check required bones/sockets/clips, maximum four weights per vertex, transforms and bounds, material/texture budgets, color spaces, UV/tangent/normal validity, collision/navigation correspondence, placement seed hashes, load/dispose/context restore, and a normal-camera screenshot regression. Image diff detects breakage; human art review decides beauty and originality.

The existing renderer constructs assets synchronously. Introduce an asynchronous `AssetPackLoader` that configures `KTX2Loader` support, attaches Meshopt to `GLTFLoader`, verifies the selected pack, instantiates it, and falls back to the current approved voxel hero/environment if loading fails. The service worker must consume a generated precache manifest so dynamic GLB, KTX2, Basis transcoder, and pack JSON files are available offline; its current HTML-only asset discovery is insufficient for this pipeline.

## Quality tiers

| Feature | PC Ultra master | PC High / browser fallback | Mobile derived tier |
|---|---|---|---|
| Actors | full LOD0, high-resolution KTX2, full animation | LOD1, reduced textures | LOD1/2, reduced bones and texture set |
| World | full shell, lightmap, decals, high vegetation | same composition, reduced density | baked-heavy shell, aggressive instancing and culling |
| Shadows | high-resolution fitted dynamic actor/sun shadow | lower map and range | one nearby shadow or contact/blob fallback |
| Water/wetness | probe/planar reflection, full wetness | probe-only | baked/specular approximation |
| Post | half-float, GTAO, selective bloom, LUT, optional subtle depth | reduced GTAO/bloom | tone mapping + AA; optional bloom |
| Output | 1440p/4K target, P3/HDR capability evaluated separately | 1080p/resolution scaling | adaptive resolution and heat budget |

PC and mobile derive from the same assets and composition. Mobile does not define the artistic ceiling.

## Implementation sequence

### V0 — Direction lock

- Review concepts A–E.
- Approve E, another route, or a named hybrid.
- Lock only silhouette, camera ratio, material families, light direction, palette behavior, and UI coverage; do not lock the protagonist's biography or final face yet.

### V1 — Rigged hero pilot

- Build one stylized modular rigged 3D protagonist, one rigid-part quadruped robot candidate, and one weapon from controlled canonical sources.
- Show the new protagonist beside the current semantic voxel fallback at the same screen size, light, pose, weapon, and animation phase; do not spend a full production pass on a third human surface unless the rigged route fails.
- Include idle, run, windup, hit, hurt, skill, face/hair/coat silhouette, pack and survey-frame socket, contact, and material response.
- Accept the rigged human route only when its normal-camera improvement is visible and its deformation, sockets, license, and production cost pass. Keep voxel machinery independent of the result.

### V2 — Simple Beauty Cell

- Build only a road, wall, shelter, rain collector, puddle/water, small garden, hero, one companion candidate, and one enemy.
- Add the outdoor probe, baked indirect light, wetness, vegetation, fitted shadow, and final UI states.
- Capture 2560×1440 idle, movement, combat, and rain/wet frames.
- Do not resume city expansion until the user accepts the frame as the correct direction.

Acceptance is relational rather than a checklist of object counts: at 2560×1440 actual-camera, the hero occupies 11–13% during exploration; the hero, companion, enemy, route, water edge, and wet/dry difference are immediately readable; bright middle tones retain material/color; contact remains deep without black crush; idle UI stays below 8%; and the frame works in idle, movement, combat, and wet states. E's exact pixels are not the acceptance test.

### V3 — Asset compiler

- Add GLB/KTX2 loading, manifests, digests, LOD policy, socket validation, and fallback.
- Add a headless Blender build step for bake/export and a repository validator.
- Freeze one hero, one companion candidate, one enemy, and one `VisualCell` as golden fixtures.

### V4 — Causal content generation

- Compile two additional cells from world rules, not from free-form images.
- Prove that generated variation preserves routes, interaction, visual language, material scale, wetness, vegetation causality, and performance.

### V5 — Quality derivation

- Derive PC High and mobile tiers from the accepted PC master.
- Compare WebGL2 and Three.js WebGPU only on the same accepted Beauty Cell. A renderer migration is adopted only if the measured visual or performance result wins.

## Do not do next

- add more station or city geometry;
- raise bloom, fog, contrast, or ambient intensity to simulate richness;
- generate a final humanoid mesh in one step and ship it unreviewed;
- make every surface reflective or wet;
- flatten the scrolling world into one background image;
- switch to WebGPU before the actor and Beauty Cell art direction is accepted;
- claim the generated concepts are gameplay captures or commercial-quality completion.

## Primary production references

- Three.js WebGPU migration and compatibility boundary: <https://threejs.org/manual/en/webgpurenderer>
- Three.js PMREM roughness-aware environment lighting: <https://threejs.org/docs/pages/PMREMGenerator.html>
- Fixed-camera HD-2D integration and dynamic lighting production discussion: <https://www.unrealengine.com/developer-interviews/octopath-traveler-ii-builds-a-bigger-bolder-world-in-its-stunning-hd-2d-style?lang=en-US>
- Material, silhouette, lighting, space, and particle decisions in an official action-RPG production retrospective: <https://www.platinumgames.com/official-blog/article/9018>
