# R04 Design QA

## Target and method

- Reference: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Implementation: `/game/r04/?debug=1`
- Comparison viewport: 1672 × 941
- State: initial playable field, quest board prompt visible, PC Ultra profile
- Combined evidence: `work/r04_r02_successor/concept-c-vs-r04-pass1.png`
- Contract: R02 gameplay causality remains authoritative; Concept C defines composition, density, light, material, DOF, and hero-readability direction.

## Pass 1 — not passed

### P0

- None.

### P1

- The hero is too small and initially reads as a dark-backed generic block figure. The face, hair silhouette, feminine proportions, coat layering, and SF equipment do not reach the reference's immediate character readability.
- Large unbroken gray roof and wall masses dominate the frame. They read as primitive construction blocks instead of weathered, inhabited ruins with micro-detail, material breakup, and vegetation integration.
- Scene composition is an overview of a compact diorama rather than the reference's traversable wet street. The hero sits near the middle under major architectural masses; the reference uses an open route, lower-left actor anchor, and layered distant threat.
- Solid-looking decorative facade layers are not represented in authoritative collision. This contradicts the stated causal-collider parity and can make traversal visually dishonest.

### P2

- Tilt-shift is strong enough to erase useful midground texture and makes the implementation feel miniature rather than cinematic.
- Reflected light and wet-surface highlights are too weak and flat compared with the reference's amber/teal contrast.
- Vegetation density is improved, but repeated large cuboids reveal the generator grammar too quickly; scale and cluster variation need another pass.
- Debug/prototype UI is readable, but it competes with the scene more than the sparse reference HUD.

## Required iteration before release gate

1. Increase hero readability and correct the R04-facing basis without altering R02.
2. Reduce blur, rebalance framing, and keep an open traversable route around the hero.
3. Break up dominant plain surfaces with authored deterministic detail and material variation.
4. Resolve visual-solid/collider parity for added R04 structures.
5. Repeat the combined same-viewport comparison and run gameplay/console checks.

## Pass 2–6 — release candidate

- Same-viewport implementation evidence: `work/r04_r02_successor/r04-local-pass3-1672x941.png`
- Combined comparison: `work/r04_r02_successor/concept-c-vs-r04-pass3.png`
- Hero front-read evidence: `work/r04_r02_successor/r04-local-hero-front-final-1672x941.png`
- Scrolling gameplay evidence: `work/r04_r02_successor/r04-local-roam-combat-1672x941.png`

### Resolved P1

- Hero scale increased from 1.68 to 2.02. The local `+Z` facing basis is aligned to four-direction movement while R02 keeps its original `-Z` basis.
- The realtime actor now has a pale-hair female silhouette, lighter face, larger luminous eyes, narrower shoulders and limbs, coat layers, tool pack, and readable SF weapon socket. The inherited dark visor was neutralized so it no longer masks the face.
- Dominant roof slabs now carry deterministic parapets, repair tiles, solar glass, rooftop plants, facade ribs, window bands, awnings, and vines. The open road received fine paving modules, cracks, drains, worn markings, and local physical puddles.
- Every solid R04 facade is constrained to the `town-hall` or `south-house` authoritative collider footprint. Decorative skyline layers are translucent, shadowless, and wholly outside the reachable world.
- Inherited Beauty Cell false-solid shells and the renderer-owned legacy anomaly were removed from R04. Every remaining inherited mesh receives a causal role; unknown meshes fail generation, atmospheric layers are translucent／shadowless, and anomaly authority stays in simulation state.

### Resolved P2

- Tilt-shift strength was reduced from 4.1 to 2.45 and focused around the playable midground.
- Lighting now separates warm key light, teal rim light, darker ambient fill, and less desaturated ground color.
- Edge vegetation uses smaller leaves and more scale/cluster variation; component density increased while the open route remains clear.
- The catalog uses real R01–R04 screenshots instead of generated CSS scenery. R04 has its own install manifest and social preview.

### Remaining North Star delta (non-blocking for this versioned prototype)

- Concept C still has substantially richer authored materials, curved vegetation, reflected light, atmospheric depth, and commercial character animation. R04 does not claim pixel-level Concept C parity or commercial-quality acceptance.
- The highest-density art pass currently covers the opening beauty cell. The continuous R02-derived world remains playable beyond it, but later regions still need the same compiler density.
- These are the next art-production milestones, not evidence that the R04 deployment candidate is broken.

## Final result

**Passed for an R02-successor R04 deployment candidate.** This local visual deployability gate does not include full public verification, pixel-level Concept C parity, commercial art acceptance, or user acceptance.
