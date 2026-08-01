# R03 Concept C Design QA

Date: 2026-08-02

## Comparison contract

- Reference: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png`
- Reference SHA-256: `9190e60398b794f5e423e40f9084f1988a7c2b055d06304e4aee43c3fce57e02`
- Candidate: `work/concept_c_r03/r03-local-p1-fixed-1672x941.jpg`
- Combined comparison: `work/concept_c_r03/concept-c-vs-r03-p1-fixed-1672x941.png`
- Viewport: 1672 × 941 for both halves
- State: initial gameplay state after transient title/help UI has faded
- Intentional variance: the reference actor is replaced by the user-requested cute female science-fiction explorer; the companion and anomaly remain dynamic gameplay layers.

## Visual gate

| Area | Result | Evidence |
| --- | --- | --- |
| Camera / world occupancy | passed | Wide fixed 3/4 composition, hero anchor near 45% W / 69% H, world fills more than 95% of the frame. |
| Environment structure | passed | Road, left stairs, water, transit shelter, workbench, garden, props, and vegetation retain the Concept C composition and density. |
| Light / color / material / DOF | passed | Warm upper-right light, cool distance, wet road response, sharp central band, and blurred foreground/far field remain visually coherent. |
| Female hero | passed | Front-facing face, hair, slim female silhouette, pale coat, red accent, backpack, and cyan tool are readable at gameplay scale. |
| Dynamic actor integration | passed | Hero and robot dog receive warm rim separation, lower-left cast/contact shadows, and restrained wet-road reflection. |
| Anomaly | passed | Enlarged silhouette, depth blur, reduced saturation, atmospheric pink bloom, particles, and water-side glow place it in the far field. |
| HUD | passed | HUD remains restricted to the top-left and bottom-left with footprint comparable to Concept C and no central obstruction. |

## Interaction and responsive checks

- `tests/r03/logic.test.ts` verifies W/up, D/right, S/down, A/left mapping and matching four-direction facing.
- In-app browser tap-to-move verified all four dynamic facings: initial/down `(757.00,651.00)`, right `(779.72,651.00)`, up `(757.00,633.96)`, left `(745.64,651.00)`, and down `(757.00,662.36)`.
- Manual relic skill activated from the bottom-left HUD and rendered its effect.
- iPhone 16 Pro landscape policy was checked at 874 × 402; the HUD uses a separate contain transform and the manual `RELIC / SPACE` control remains available.
- Double-click at 874 × 402 retained `visualViewport.scale === 1` and `innerWidth === 874`.
- Follow camera is clamped to the environment plate's real cover overscan; at 1672 × 941 both axes remain zero, so movement cannot reveal an unrendered edge.
- Keyboard movement and tap destinations share one inset 10-point road polygon, preventing the hero from crossing the shelter, wall, vegetation, or foreground parapet baked into the plate.
- At 1672 × 941, tapping the forbidden shelter-roof point `(950,260)` stopped the hero at road edge `(877.06,441.44)` with camera `(0.00,0.00)`.
- Final read-only code re-review: P0 0, P1 0, public GO.

## Non-blocking P2 observations

- The anomaly could receive stronger core particles and water spill in a later depth-aware renderer.
- Sprite rim and reflection remain an authored 2.5D approximation rather than physically derived lighting.
- HUD item colors can gain stronger semantic differentiation when inventory categories are implemented.

## Architecture boundary

R03 passes as a Beauty Benchmark and playable 2.5D cell. It is not evidence that the complete HD-2D world engine is finished. `docs/R03_HD2D_ARCHITECTURE.md` defines the transition from this visual contract to depth-aware modular geometry, generated PBR assets, occlusion, navigation, lighting, and adjacent-cell generation.

P0: 0

P1: 0

P2: 3 (non-blocking)

final result: passed
