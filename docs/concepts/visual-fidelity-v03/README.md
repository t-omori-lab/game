# Visual Fidelity Concepts v0.3

Status: AI-generated visual targets for art-direction and implementation planning. These are not runtime screenshots, shipped assets, or evidence that commercial quality has been achieved.

Generation mode: Codex built-in `image_gen`, 2026-08-01. The current local North Star gameplay screenshot was used only as a reference for camera and game semantics. All five concepts request original characters, costumes, UI, palette, and composition.

## Variants

| ID | Image | Route | Strongest contribution | Main risk |
|---|---|---|---|---|
| A | [Hybrid HD-2D](ideal-screen-a-hybrid-hd2d.png) | high-resolution baked environment + realtime stylized 3D actors | wet surfaces, water, material realism, natural light | hero is too small; environment production cost is high |
| B | [Precision micro-voxel](ideal-screen-b-micro-voxel.png) | 80–110-cell characters + dense modular voxel environment | generatable grammar, coherent miniature world, infrastructure detail | hero identity still reads weakly at gameplay scale; density can become noise |
| C | [Stylized 3D](ideal-screen-c-stylized-3d.png) | modular non-voxel actor meshes + baked hybrid environment | strongest hero silhouette, companion readability, combat composition | generic stylized-RPG drift unless AssetDNA and palette are tightly authored |
| D | [Recommended synthesis](ideal-screen-d-recommended-synthesis.png) | C actor language + A material/light + B modular environment logic | best target for this project | still a concept; generated hero scale is smaller than the runtime target |
| E | [Final target refinement](ideal-screen-e-final-target.png) | D corrected for exposure, actor scale, original survey motif, and restrained world-specific markings | strongest current North Star: luminous world, readable hero and companion, implementable simple cell | still an AI concept; final silhouette, topology, animation, material response, and actual-camera play must be authored and accepted |

## Recommendation

Use E as the provisional visual North Star. It is D revised to correct the problems found in the four-way audit:

- brighter middle tones and no global dark vignette, while keeping deep contact and material separation;
- protagonist and companion enlarged at the same gameplay camera scale;
- an original survey identity: dark windswept hair, pale sage asymmetrical field coat, rust-orange panel, folded semicircular survey frame, and cyan-amber short blade;
- only two restrained cyan-and-amber repair/relic marks, so world identity begins without clutter;
- exploration hero height remains 10–14% of the viewport; combat framing may reach 14–18%;
- architecture remains simple until light, wetness, water, vegetation, contact, hero, and UI pass the benchmark;
- companion shown here is a discovered roster candidate, not a mandatory starting partner;
- UI occupies less than 8% at idle and appears by state, input device, and threat.

The final implementation should combine a stylized modular 3D hero and companions with fixed-camera baked environment layers. The precision-voxel route remains useful for props, machines, buildable modules, destruction masks, and procedural authoring, but not as the default final human-character surface unless a later same-scale comparison wins.

## Prompt set

### A — Hybrid HD-2D

```text
Use case: stylized-concept
Asset type: ideal final gameplay screen concept, 16:9 landscape
Input images: Image 1 is the current playable prototype; use only its fixed three-quarter top-down camera, basic route, and gameplay semantics as reference, then redraw the entire image at a frontier commercial quality level.
Primary request: an original premium Japanese action-RPG gameplay screen using a luminous hybrid HD-2D production approach.
Scene/backdrop: an identifiable modern city district decades after population collapse, reclaimed by colorful vegetation and clean rainwater; weathered asphalt, crosswalk, modest clinic or service building, elevated rail fragments, repaired lamps, rain collection, a tiny food garden, and signs of people confidently reusing the ruins. Optimistic and adventurous, not tragic or grim.
Subject: one unmistakable original field scavenger protagonist, about 13–15% of screen height, moving along the route with a compact survey blade; practical asymmetrical pale utility coat, rust-red scarf, layered technical backpack and readable face/hair silhouette. A small discovered interchangeable survey robot follows nearby. One restrained hostile silhouette is visible farther ahead.
Style/medium: cohesive hybrid 2.5D game rendering; high-resolution painterly baked environment surfaces plus realtime-quality stylized 3D characters, weapons, shadows and effects; extremely polished; selective detail; organic materials; no pixelated placeholder look.
Composition/framing: fixed orthographic three-quarter top-down gameplay camera; protagonist slightly off center with open route ahead; strong foreground/midground/background separation; clear navigation and combat readability.
Lighting/mood: rich late-afternoon HDR-like sunlight, warm directional key, cool skylight, crisp soft-edged contact shadows, subtle volumetric air, glass and wet-surface highlights, foliage translucency, controlled bloom, deep but colorful shadows.
UI: tiny refined diegetic HUD islands occupying under 8% of the frame, bars and abstract icons only, no readable text.
Constraints: original visual language; do not reproduce any existing game's characters, costumes, UI, logo, exact palette or composition; no watermark; no text; no muddy darkness; no Minecraft-like large cubes; no excessive fog; show an actual playable camera view, not poster art or a cinematic close-up.
```

### B — Precision micro-voxel

```text
Use case: stylized-concept
Asset type: ideal final gameplay screen concept, 16:9 landscape
Input images: Image 1 is the current playable prototype; preserve only the fixed three-quarter top-down gameplay logic and world premise, then fully redesign it.
Primary request: an original commercial-quality post-apocalyptic action-RPG screen proving that a precision micro-voxel visual language can look luxurious rather than blocky.
Scene/backdrop: a bright overgrown modern city service intersection with cracked asphalt, crosswalk, concrete, metal kiosk, rail infrastructure, shallow water, flowering plants, repair patches, working lamps, rain catchment and a small community garden. Humanity is diminished but resourceful and optimistic.
Subject: a distinctive original field scavenger protagonist, 13–15% of screen height, built from extremely fine high-density micro-voxels with an expressive face/hair silhouette, fitted pale field coat, rust scarf, layered backpack, gloves, boots and survey blade. A compact high-density modular robot companion follows. One enemy is readable in the middle distance.
Style/medium: precision micro-voxel diorama rendered in realtime-quality PBR; characters roughly 80–110 micro-voxels tall; beveled micro-cells, curved aggregate silhouettes, semantic body parts, cloth/painted metal/glass/emissive material separation, baked global illumination plus dynamic hero light and shadow; miniature-photography refinement without toy-like plastic.
Composition/framing: fixed orthographic three-quarter top-down gameplay view; hero clearly dominant; path and threat readable; layered city depth with selective high-frequency detail only near focal areas.
Lighting/mood: luminous morning after rain, warm sun and cool sky contrast, sharp material response, rich saturated vegetation, wet sparkle, soft atmospheric perspective, strong contact shadows, restrained depth of field and bloom.
UI: minimal premium HUD islands using small bars and icons only, no readable text, under 8% frame coverage.
Constraints: original design; no copying existing game characters, costumes, UI or composition; no logos; no watermark; no text; avoid Minecraft-scale cubes, chunky 16-voxel characters, flat ambient lighting, gray desaturation, excessive blur or a model-sheet presentation; this must look like a playable screen.
```

### C — Stylized 3D

```text
Use case: stylized-concept
Asset type: ideal final gameplay screen concept, 16:9 landscape
Input images: Image 1 is the current playable prototype; retain only the gameplay camera and optimistic reclaimed-city premise, and redraw everything else.
Primary request: an original frontier-quality gameplay screen using stylized modular 3D characters and a baked hybrid environment, prioritizing expressive silhouette, animation and production feasibility.
Scene/backdrop: a recognizable contemporary city block reclaimed by vivid grasses, vines, flowers and water; faded road paint, concrete retaining walls, a repurposed transit structure, repaired power and lights, scavenger worktables and small growing beds. The world is dangerous but colorful, inhabited and forward-looking.
Subject: one charismatic original field scavenger protagonist, 14–17% of screen height, in a dynamic ready stance with a compact blade; elegant stylized proportions, readable face, windswept hair, asymmetrical pale field coat with rust-red textile accent, modular technical pack and believable wear. A small animal-like modular robot companion watches the route. A distant biomechanical anomaly telegraphs danger.
Style/medium: sophisticated stylized 3D action-RPG rendering with clean non-voxel silhouettes, handcrafted low-to-mid-poly topology, hand-painted PBR textures, cloth sheen, worn metal, glass and emissive accents; painterly baked environment layers blend perfectly with realtime characters; subtle graphic edge control, not hard cartoon outlines.
Composition/framing: fixed orthographic three-quarter top-down gameplay camera; hero as visual protagonist, off-center with meaningful negative space along the movement direction; simple architecture made beautiful by composition, light, material and scale.
Lighting/mood: brilliant golden-hour HDR-like light, long graphic shadows, cool bounced skylight, local practical lights, volumetric sun shafts, controlled bloom, cinematic color separation while preserving gameplay readability.
UI: elegant minimal translucent HUD islands with abstract icons and bars only, no readable text, under 8% of the frame.
Constraints: fully original art direction; do not imitate any existing game's specific character, costume, interface, palette or layout; no logo; no watermark; no text; no grim monochrome; no giant voxel blocks; no clutter wall; no promotional key art—show a believable in-game screen.
```

### D — Recommended synthesis

```text
Use case: stylized-concept
Asset type: recommended final gameplay screen concept, 16:9 landscape
Input images: Images 1–3 are three alternative concepts generated for this same original game. Create a new synthesis, not a collage and not a direct edit.
Primary request: make the single best implementable visual North Star for this game.
Preserve from the stylized 3D concept: the protagonist's strong readable silhouette, expressive non-voxel face and hair, pale asymmetrical field coat, rust textile accent, compact glowing survey blade, animal-like modular robot companion, restrained HUD, and clear threat/route composition.
Preserve from the luminous hybrid concept: physically convincing wet asphalt, clear rainwater, old concrete and metal, rich vegetation ecology, warm sunlight versus cool skylight, deep contact shadows and subtle volumetric air.
Preserve from the micro-voxel concept: modular, generatable environment construction, precise repeating infrastructure detail, small reusable city components, and selective density near focal areas.
Scene/backdrop: a simple recognizable contemporary city intersection after population collapse, reclaimed by colorful plants and water, with one repurposed transit shelter, a repaired lamp, a rain collector and a tiny growing bed. Keep architecture deliberately simple; prove beauty through light, material, composition and character rather than clutter.
Subject: one original field scavenger protagonist at 14–17% of screen height, slightly off center facing a distant biomechanical anomaly; one discovered animal-like robot companion; all immediately readable as gameplay actors.
Style/medium: premium original hybrid game rendering: handcrafted stylized 3D realtime characters and effects integrated with high-resolution baked 2.5D environment layers, hand-painted PBR textures, clean silhouette control, no hard cartoon outline.
Composition/framing: fixed orthographic three-quarter top-down gameplay camera, open movement route ahead, foreground/midground/background separation, no cinematic crop.
Lighting/mood: luminous late afternoon after rain; golden direct sun, cool skylight and bounce, wet reflections, foliage translucency, local practical light, restrained bloom and depth of field, colorful shadows, optimistic but dangerous.
UI: elegant minimal HUD islands, abstract bars and icons only, no readable text, under 6% of frame.
Constraints: fully original; no existing game logos, characters, costumes, UI, exact palette or composition; no watermark; no text; no giant voxel blocks; no dark vignette swallowing the world; no clutter; no poster composition; it must look like a believable playable PC screen and a realistic production target.
```

### E — Final target refinement

```text
Use case: lighting-weather plus precise visual-direction revision
Asset type: final recommended gameplay screen concept, 16:9 landscape
Input image: Image 1 is the selected composition and environment target.
Primary request: revise only four things while preserving the same fixed top-down camera, intersection layout, water, shelter, vegetation distribution, enemy position, gameplay framing and minimal UI.
1. Lift the shadow and middle-tone exposure by roughly one stop so concrete, foliage, water edges and route information remain colorful and readable; remove the heavy dark lower-edge vignette. Keep warm sun versus cool sky separation and deep contact shadows without black crush.
2. Enlarge the protagonist and nearby animal-like robot companion by about 35%, keeping their feet and world positions coherent, so the protagonist reads at 11–13% of frame height. Improve face/hair/coat/weapon silhouette at normal gameplay scale.
3. Make the protagonist more original without changing the practical scavenger role: dark windswept hair, pale sage asymmetrical field coat, rust-orange fabric panel, compact technical pack with a folded semicircular survey frame, and a short cyan-amber survey blade. Avoid the generic white-hair/white-coat/blue-sword combination.
4. Add only two small consistent world-specific repair/relic marks: cyan-and-amber modular repair tags on the shelter and rain collector, physically attached and weathered. Do not add clutter.
Style/medium: premium original hybrid game rendering, stylized realtime 3D actors integrated with high-resolution baked 2.5D PBR environment.
Constraints: change only the four items above; preserve geometry, camera, water coverage, enemy, navigation space and UI placement; no text; no logo; no watermark; no extra characters; no poster crop; no hard cartoon outline; keep it a believable playable PC screen.
```
