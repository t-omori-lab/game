# Visual North Star Implementation

Version: v0.2 draft  
Date: 2026-08-01  
Authority: concept C selected by the user; implementation details remain a proposal until proven in runtime

## Decision

Adopt [concept C](concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png) as the user-selected visual North Star. The runtime benchmark must reproduce C's fixed gameplay camera, actor scale, composition, dense miniature-like forms, material response, light, modern-city reclamation, and HD-2D-like depth separation. E remains an exposure/readability comparison, not the selected target.

C is a generated raster whose prompt requested stylized non-voxel 3D; it does not reveal literal topology. The user selected the *perceived result*: a high-quality pixel-art impression created by dense small forms, stepped and rectilinear detail, miniature scale, and selective bokeh. Implement that perception with high-density micro-voxel source forms compiled into efficient realtime meshes. Do not copy the PNG into the scene or create one runtime object per cube.

The production structure is:

- high-density micro-voxel or grid-quantized modular 3D humans, companions, enemies, SF equipment, and effects, compiled into optimized skinned or rigid meshes;
- fixed-camera 3D world shells with high-resolution baked lighting and surface layers;
- modular, causally generated environment components;
- realtime water, wetness, vegetation motion, actor shadow, combat light, and occlusion;
- gameplay-safe multi-layer depth of field that keeps active actors sharp while giving noninteractive foreground and distance stronger bokeh;
- minimal state-driven HTML UI.

The current 16-cells-per-edge human representation is a prototype fallback, not the density target. Final humans use enough source resolution to preserve face, hair, body frame, equipment, and action silhouette at the normal camera, then merge that source into a bounded number of draw calls and stable LODs.

## Non-negotiable visual contracts

1. **C is the benchmark frame** — the runtime Beauty Cell must match C's fixed three-quarter camera, 14–17% hero height, open route, depth layers, light direction, material contrast, selective detail, and miniature-like bokeh at 2560×1440.
2. **Hero first** — face/hair, body frame, equipment, action phase, and facing remain readable at normal play size. High-density cells aggregate into a smooth expressive silhouette rather than Minecraft-scale cubes.
3. **Bright world, deep range** — the world may be dangerous without a global gray or black veil. Sun, sky, local light, water, flowers, rust, and painted metal keep color in both light and shadow.
4. **Simple geometry must pass** — C's road, retaining wall and stair, transit shelter, water edge, workbench, garden bed, vegetation, hero, companion candidate, and one distant anomaly must produce an attractive frame before city density resumes.
5. **Physical separation** — dry concrete, wet asphalt, technical cloth, painted metal, bare metal, glass, water, foliage, and emissive signals must react differently to light.
6. **Bokeh never hides play** — the hero, current companion, relevant enemies, attack telegraphs, projectiles, interactables, and route cues stay within the sharp gameplay band. Only noninteractive foreground and distance receive the strongest blur.
7. **Female default, free protagonist** — character creation opens on a young adult female presentation, but sex/gender presentation, body frame, face, hair, palette, and initially humanoid species traits remain player-selectable.
8. **SF equipment, not fantasy drift** — C's white-haired long-coat and glowing straight-blade appearance is not canon. Accepted weapons and field gear expose at least one legible functional system: power, actuation, sensing, cooling, or service connection.
9. **UI yields to the world** — idle UI occupies less than 8%; debug and performance data require an explicit debug state; touch controls appear only on touch layouts; HTML UI is never blurred by world depth of field.
10. **Gameplay remains authoritative** — collision, target selection, hit timing, interaction, and world state remain in the deterministic simulation. Rendering may anticipate and emphasize but may not redefine results.
11. **Screen-relative control** — movement and aim follow the visible camera axes, then transform deterministically onto the world plane; changing a world heading may never make the same screen input feel reversed.
12. **Generated is not automatically accepted** — every AI or procedural candidate carries source, prompt/configuration, generator version, seed where applicable, license review, validation, and human approval.

## Runtime architecture

| Layer | Keep | Add or replace | Why |
|---|---|---|---|
| Simulation | 30 Hz deterministic state, semi-auto combat, collision and interaction | no visual rule inside simulation | replay and game logic stay stable |
| Input | current semantic movement/aim intent | camera-basis-to-world-plane transform before simulation commands | controls follow the screen while simulation stays deterministic |
| Camera | fixed orthographic direction, explore/combat composition | explicit C shot profile, stable shadow volume, hero screen-size contract, actor/interaction focus masks | fixed direction makes baking, bokeh, input, and art review repeatable |
| Actors | semantic action state and weapon sockets | high-density source forms compiled to rigged/rigid GLB meshes, `AnimationMixer`, appearance modules, LODs, KTX2 materials | required for the selected micro-voxel impression, character creation, readable face/hair, and expressive action |
| World | causal city cell, collision proxies, modular IDs | visible 3D shells, baked lightmaps, camera-facing decals, depth/occlusion proxies | scrolling and parallax remain while most light/detail is prepaid |
| Materials | generated PBR surface fields, PMREM experiment | versioned PBR library, outdoor reflection probes, wetness masks, puddle/water materials | target depends on material contrast more than polygon count |
| Vegetation | causal placement | instanced authored clusters, wind phase, distance tiers, density masks | large perceived richness at bounded runtime cost |
| Lighting | warm key, cool rim, reduced fill, GTAO, bloom, AgX | outdoor HDR environment, fitted actor shadow, baked indirect light, local practical lights, color-grade LUT | concept C's depth cannot come from ambient intensity alone |
| Post | current AA, GTAO, bloom, tone mapping | multi-layer depth of field using depth plus actor/interaction masks | increases C's miniature bokeh without hiding gameplay information |
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
- `NorthStarDepthOfField.ts`: depth plus actor/interaction masks, state-dependent focus bands, blur caps, and tier fallback;
- `ScreenRelativeInput.ts`: derives camera-right/camera-forward projected axes and converts movement/aim intent into deterministic world-plane commands;
- `CharacterAppearance.ts`: validates body preset, humanoid species traits, morphs, palette, equipment modules, compatibility, and stable sockets;
- `AssetPackLoader.ts`: asynchronous GLB/KTX2/manifest loading, verification, fallback, and disposal;
- `CompanionVisual.ts`: locomotion-family presentation contract, initially a rigid-part quadruped candidate.

Preserve the 30 Hz deterministic simulation, the orthographic azimuth/elevation and `CameraComposition` pure functions, semi-auto combat, `UltraRenderPipeline` fallback, sRGB baseline/P3 capability probe, hero pose/socket API, current city collision/interaction alignment, baseline route, mobile touch UI, and merged/voxel fallback.

Replace only within the Beauty Cell: the indoor `RoomEnvironment`, box-like architecture and foliage, single transparent water quad, realtime shadows for every static object, synchronous runtime surface generation, and always-visible desktop top HUD. Add stable `back/utility-pack`, `hand-tool`, `weapon`, and `effect-source` sockets without making the generated concept figure the source asset.

Do not use C's PNG as a background, depth source, texture sheet, or geometry source. It supplies the benchmark frame and acceptance relationships; production assets must own backs, depth, normals, UVs, collision, animation, customization compatibility, and provenance.

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

### Screen-relative input

At each fixed camera-profile change, derive `screenRight` from the camera's right axis projected onto the gameplay plane and `screenUp` from its up axis projected onto that plane, then normalize and orthogonalize them. Convert a stick, keyboard, or drag vector with `worldIntent = screenRight * inputX + screenUp * inputY`; quantize and submit that world intent through the existing deterministic command path. Pointer/touch aiming first raycasts the gameplay plane, with the same basis used as a fallback when no world hit exists. Rendering code never directly moves the actor.

Automated tests cover all four cardinal screen inputs, diagonal normalization, camera-profile changes, zero-length projection fallback, and parity between keyboard, gamepad, and touch. Pressing screen-up must always move the actor toward the upper screen region in the selected C camera.

### High-density micro-voxel interpretation

The target is the visual aggregation seen in C, not visible cube count for its own sake:

- author character source forms at an initial 96–160 micro-cells of standing height, or use a grid-quantized sculpt with equivalent silhouette frequency;
- compile contiguous cells into indexed surfaces grouped by material and rig, with bevel/weighted-normal data where it survives the gameplay camera;
- skin the compiled shell to one controlled humanoid rig; do not attach a runtime transform or draw call to every cell;
- preserve micro-cell rhythm most strongly in hair masses, equipment, robot shells, damaged edges, repairs, and hard-surface transitions; allow skin and technical cloth to aggregate into calmer larger forms;
- use LODs that merge fine cells before they become subpixel shimmer, while keeping face, hair, hands, weapon, and action silhouette stable;
- render the world at a resolution and AA quality that preserves clean edges. Do not pixelate the whole framebuffer to imitate pixel art;
- use merged meshes, `InstancedMesh`, texture atlases, baked normals, and impostors for static density. Only interaction-dependent depth, motion, lighting, shadow, and state must remain realtime.

This hybrid has a gameplay purpose: character creation, equipment replacement, companions, animation, continuous scrolling, occlusion, dynamic combat light, and base-building state can change without regenerating a complete 2D frame.

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
9. multi-layer depth of field after all opaque/translucent gameplay masks are resolved: at 2560×1440 the hero stays below roughly 0.75 px circle of confusion, relevant actors and interactables below 1.5 px, noninteractive distance may reach 4–6 px, and extreme foreground may reach 8 px;
10. combat, aiming, inspection, and dense threat states widen the sharp band or reduce blur by 30–50%; UI, target marks, attack telegraphs, projectiles, and interaction prompts are composited outside world blur;
11. no strong vignette, global framebuffer blur, or physical single-focus effect that makes a valid target unreadable.

The current neutral `RoomEnvironment` is a technical material probe, not the final outdoor environment.

## Character and companion pipeline

### Runtime contract

Create a versioned `HeroRigContract` shared by art tools and runtime:

- skeleton version and bone names;
- source micro-cell scale, compiled mesh revision, aggregation rules, and LOD cell-collapse profile;
- locomotion/action clips and loop rules;
- weapon, utility-pack, hand-tool, effect, and camera-focus sockets;
- material slots: skin/hair, technical cloth, painted metal, bare metal, polymer, glass, emissive;
- silhouette and proportion profile;
- LOD and texture profile;
- hit, windup, active, recovery, and foot-contact markers;
- face/body morph targets and validated ranges;
- appearance-module compatibility, palette, wear, and equipment overrides.

### Character creation contract

The first selectable preset is a young adult female presentation and supplies the benchmark silhouette for C. It is a default, not the protagonist's fixed identity. Character creation v1 uses one controlled humanoid rig and supports:

- sex/gender presentation and body-frame presets without changing combat reach or collision;
- face, skin, hair, eyes, palette, wear, and prosthetic/technical details;
- initially humanoid species traits such as ears, horns, eyes, skin structures, and compatible limb shells;
- stable `body`, `head`, `hair`, `inner`, `outer`, `arms`, `legs`, `boots`, `utility-pack`, and `weapon` modules;
- generated or authored candidates only through an explicit compatibility manifest; invalid clipping or socket combinations never enter random generation;
- the same idle, run, hit, skill, equipment, and camera-focus contracts for every accepted combination.

More radical species with nonhumanoid proportions use later rig families rather than multiplying every v1 animation and equipment asset. The default female preset, one alternative gender presentation, and one visibly different humanoid species combination must all pass the same actual-camera deformation and clipping capture before the system is accepted.

### SF equipment contract

C's current white-haired figure, long pale coat, and blue straight blade drift toward a generic medieval-fantasy action RPG. Preserve only the readable scale, stance, and equipment silhouette. The authored default replaces that drift with contemporary/relic-engineering field gear: practical asymmetric work layers, hard-shell protection, sensor or diagnostic surfaces, repairable fasteners, and a technical utility pack.

A blade-shaped tool is allowed, but it must read as a resonance cutter, industrial sampling edge, powered rescue tool, or recovered machine interface rather than an unexplained magic sword. Every accepted weapon exposes at least one functional cue—power cell, actuator, sensor, cooling path, conductor, service connector, or replaceable working head—and its generated flavor text must remain consistent with those visible systems and deterministic mechanics.

Companions use locomotion-family contracts rather than one universal skeleton: humanoid, quadruped, small wheeled, hovering, and multi-legged. Roster identity comes from silhouette, locomotion, replenishment, ability, personality, and joining history, not only palette swaps.

### Offline AI-assisted flow

```text
StyleProfile + gameplay role
  -> image concept variants and turnaround candidates
  -> human silhouette/costume/material selection
  -> micro-voxel volume or grid-quantized modular base-mesh candidate
  -> topology/UV/material/appearance-compatibility review
  -> Blender cleanup, surface compilation and rig binding
  -> animation candidate import and manual cleanup
  -> PBR bake and texture compression
  -> GLB/KTX2/LOD validation
  -> actual-camera gameplay capture
  -> human accept/reject
  -> versioned asset manifest
```

AI 3D and rigging systems may create candidates, but they do not become canonical assets until topology, deformation, UVs, sockets, material ranges, animation contacts, license, and gameplay-size appearance pass. The repository currently has no GLTF/KTX2/Blender build path; adding that path is explicit work, not an assumed capability.

Use Blender as the canonical editable source for known topology or source volumes, rigs, actions, UVs, PBR baking, appearance modules, and export. AI 3D is best treated as a donor for hard-surface packs, sensors, tools, robot shells, and static module ideas; deforming body, technical clothing, hair, and animal anatomy should start from controlled modular forms. A generated whole character is never the unreviewed source of truth.

The initial protagonist pilot is the default female preset and owns stable modules for body, head, hair, technical outer layer, utility pack, repair parts, and one SF field tool. The first companion pilot is a separate rigid-part quadruped contract; future dog and cat bodies use a quadruped deformation family rather than being forced into the same rig. Simulation remains authoritative for `Acquire -> Windup -> Hit -> Recover`; animation only maps the current phase and progress to a clip.

### Asset contract and provenance

Every accepted runtime asset has an `AssetDNA` record with:

- stable ID, schema/revision, kind, style profile, and gameplay contract;
- source-cell or quantization profile, compiled-mesh revision, silhouette keys, semantic parts, palette roles, material slots, and wear history;
- rig family, required bones, sockets, appearance compatibility, morph ranges, collision proxy, and animation mapping;
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
| Actors | compiled micro-voxel LOD0, high-resolution KTX2, full appearance modules and animation | cell-merged LOD1, reduced textures | LOD1/2, reduced cell frequency, bones, and texture set |
| World | full shell, lightmap, decals, high vegetation | same composition, reduced density | baked-heavy shell, aggressive instancing and culling |
| Shadows | high-resolution fitted dynamic actor/sun shadow | lower map and range | one nearby shadow or contact/blob fallback |
| Water/wetness | probe/planar reflection, full wetness | probe-only | baked/specular approximation |
| Post | half-float, GTAO, selective bloom, LUT, full masked multi-layer DoF | reduced samples/radius while preserving focus masks | tone mapping + AA; optional bloom and shallow masked DoF |
| Output | 1440p/4K target, P3/HDR capability evaluated separately | 1080p/resolution scaling | adaptive resolution and heat budget |

PC and mobile derive from the same assets and composition. Mobile does not define the artistic ceiling.

## Implementation sequence

### V0 — Direction lock

- Concept C is selected; A, B, D, and E remain comparison evidence.
- Lock C's camera ratio, 14–17% actor scale, composition, modern-city material families, light direction, selective density, depth bands, and UI coverage.
- Lock the default preset as a young adult female presentation without locking the player's sex/gender, species traits, face, body frame, or biography.

### V1 — High-density hero and character-creation pilot

- Build one high-density micro-voxel/grid-quantized rigged default female preset, one rigid-part quadruped robot candidate, and one visibly technological field tool from controlled canonical sources.
- Compile source cells to optimized skinned/rigid meshes and show them beside the current 16-cell fallback at the same screen size, light, pose, equipment, and animation phase.
- Prove two additional compatible appearances: another gender presentation and one visibly different humanoid species-trait combination. Include idle, run, windup, hit, hurt, skill, face/hair/body-frame silhouette, utility-pack and equipment sockets, contact, and material response.
- Accept the route only when the selected micro-voxel impression survives the normal camera without subpixel shimmer, all three appearances deform without clipping, SF equipment reads without flavor text, and sockets, license, draw calls, memory, and production cost pass.

### V2 — Concept C Beauty Cell

- Reconstruct C's screen as a playable cell: road/crosswalk, retaining wall and left stair, transit shelter, water edge, workbench, garden bed, vegetation, hero, one companion candidate, and one distant anomaly. Do not expand the surrounding city yet.
- Add the outdoor probe, baked indirect light, wetness, vegetation, fitted shadow, masked multi-layer DoF, screen-relative movement/aim, and final UI states.
- Capture 2560×1440 idle, movement, combat, and rain/wet frames.
- Do not resume city expansion until the user accepts the frame as the correct direction.

At 2560×1440 actual-camera, the hero occupies 14–17% during exploration; hero, companion, anomaly, route, water edge, and wet/dry difference are immediately readable; 100% capture shows stable micro-cell/grid rhythm while 50% scale aggregates into a smooth high-quality pixel-art impression; the hero and actionable plane remain sharp while noninteractive distance reaches visibly stronger bokeh than C; bright middle tones retain material/color; contact remains deep without black crush; idle UI stays below 8%; and the frame works in idle, movement, combat, and wet states. A benchmark overlay should compare C's camera, major masses, depth bands, value distribution, and light direction, while runtime movement, occlusion, equipment, and customization prove that the result is not a moving background image.

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
- spawn one mesh/object/draw call per micro-voxel or pixelate the entire framebuffer;
- apply a global or single-focus blur that hides a valid enemy, telegraph, projectile, route, or interactable;
- carry C's generic white-hair, long-coat, or magic-sword drift into the authored protagonist and equipment;
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
