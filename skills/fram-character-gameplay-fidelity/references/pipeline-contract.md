# Character Gameplay Fidelity Pipeline Contract

## Authority layers

| Layer | Authority | May change here | Must not be decided here |
|---|---|---|---|
| Beauty Sheet | identity, appeal, silhouette, color/material intent | art direction and approved design | voxel coordinates, runtime performance |
| Build Sheet | aligned views, landmarks, module masks, depth/order hints | machine-readable projections | final in-game beauty by itself |
| Source / Asset DNA | grid, palette roles, modules, rig, sockets, provenance | versioned semantic corrections | camera-specific cosmetics |
| Compiled surface pack | exact cells and immutable payload digest | only through a new compiler/source version | silent hand edits after release |
| Gameplay adapter | world scale, facing, pose, sockets, LOD and presentation profile | reversible distance-specific presentation | identity-changing morphology |
| Game capture | actual camera, lighting, weather, effects and UI | evidence collection | art acceptance |

## Required identity contract

Every runtime-generated actor must expose these values on the rendered canvas:

- `data-hero-asset-id`
- `data-hero-source-surface-cells`
- `data-hero-voxel-cells`
- `data-hero-pack-digest`
- `data-hero-source-digest` when the source supplies one
- `data-hero-asset-source` and `data-hero-asset-status`

`source surface cells` counts the immutable compiled pack. `visible cells` counts the geometry actually submitted after a declared gameplay presentation filter. The two values may differ, but the reason and exact filter must be versioned and tested.

The versioned gameplay profile binds the source pack, digest, source/visible counts, topology filter, render settings, viewport and routes. Runtime code, integrity audit and browser capture must consume that same profile instead of copying its numbers into separate scripts.

## Defect classification

### Source mismatch

Symptoms: wrong actor ID/digest, Forge and game load different packs, an additive patch masks the source, or a fallback actor is shown.

Action: stop visual tweaking. Repair the loader/registry/adapter boundary first.

### Reconstruction loss

Symptoms: Beauty Sheet landmarks, face, hair, silhouette or module depth never entered the compiled pack.

Action: return to Build Sheet, masks, landmarks, Asset DNA or compiler. Produce a new pack version. Do not hide the loss with TypeScript voxel patches.

### Gameplay presentation defect

Symptoms: the correct pack is present, but sub-pixel gaps, bevels, shadow maps, distance, tone mapping or camera make it dirty or unreadable.

Action: fix the gameplay render profile without mutating the pack. Safe examples include a bounded `surfaceFill`, distance-specific bevel radius, baked/contact shadow strategy, declared LOD, or a deterministic filter for tiny disconnected compiler fragments.

## Presentation correction rules

- Keep voxel centers fixed when closing sub-pixel seams.
- Clamp cell fill so adjacent cells do not visibly inflate into a smooth non-voxel mass.
- At gameplay distance, prefer shallow bevels and one readable contact shadow over thousands of high-contrast per-cell shadow edges.
- A disconnected-fragment filter must be deterministic, topology-based and separately report source versus visible cell counts.
- Never erase connected boots, coat tails, hair locks, weapons or equipment merely because they are close to the ground.
- Keep Forge inspection defaults unchanged unless the defect is also present in the canonical inspection view.

## Acceptance gates

1. **Integrity:** decoded payload length, digest, semantic indices and expected source cells match.
2. **Bridge:** actor ID and digest match between the selected source and actual runtime.
3. **Presentation:** fixed-camera capture has expected visible cells and no browser/page errors.
4. **Motion:** idle, movement, facing and combat keep identity and rig/socket integrity.
5. **Performance:** frame-time and memory are measured independently of visual acceptance.
6. **Human art gate:** the user accepts same-person identity, cuteness, silhouette and commercial-quality direction.

Passing gates 1–5 does not imply gate 6.

## Release discipline

- Preserve every published prototype route unless the user explicitly approves removal.
- Record local build, pushed commit, Pages workflow and public browser observation as separate facts.
- Do not publish merely because the pipeline passes; deployment still requires explicit authorization.
