# Reclaimed Meadow V1 — Asset Record

- Status: selected for intermediate public prototype
- Generated: 2026-07-31
- Generator: OpenAI built-in image generation
- Generation ID: `call_B2dOYTUGOEa1lgJcYZDc672C`
- Human review: accepted as a first high-resolution ground source; not accepted as final commercial art
- Runtime role: albedo map for non-road ground beneath realtime lighting and shadows
- Color space: sRGB input, converted by the renderer's linear-light pipeline
- Delivery: 1024×1024 WebP, quality 88, approximately 453 KB
- World scale: one repeat per 720 world units

## Generation constraints

- perfectly top-down ground material
- luminous sage／olive reclaimed vegetation with warm dry soil
- fine multi-scale fibers, leaf fragments, grains, lichen, and sparse tiny color flecks
- no baked directional light, cast shadow, horizon, character, building, path, text, logo, or large focal object
- plausible four-edge repetition without an obvious square grid
- original material language; no existing game's texture or composition was requested

## Validation boundary

- The texture removes the flat-color ground appearance and remains readable with realtime shadows.
- Chrome at the iPhone 16 Pro reference viewport loads the asset without console errors.
- Visual edge repetition is acceptable for this intermediate slice, but mathematical seamlessness and real-device memory／thermal cost remain unverified.
- Future versions should be generated as an authored material set: albedo, normal, roughness, macro mask, and biome transition mask from one shared scale contract.
