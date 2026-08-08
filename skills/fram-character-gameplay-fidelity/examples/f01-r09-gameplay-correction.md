# Example: F-01 to R09 without changing the canonical pack

## Observed problem

R09 finally loaded the same 9,454-cell F-01 pack used by Character Forge, but two presentation defects remained at gameplay distance:

- 33 tiny disconnected cells appeared around the feet as compiler debris.
- the authored gaps, rounded bevel and per-cell shadows collapsed into a dark grid.

The character identity was correct. This was not a reason to redraw the head, replace the hair or mutate `f01.surface-pack.json`.

## Source truth

- Asset ID: `fram.character.f01.gameplay-bridge-v1`
- Compiled source cells: `9,454`
- Payload SHA-256: `a77a7e0a15e0d3a62a95fcc87f77edbc8b972a593e41cc8cf673533af901abc1`
- Forge inspection route: `/game/forge/f01/`
- Gameplay route: `/game/r09/`

## Non-destructive gameplay correction

The gameplay adapter:

- rejected only 6-neighbor connected components with at most 64 cells whose maximum grid height was 1;
- retained the canonical payload and digest;
- reported 9,454 source cells and 9,421 visible gameplay cells;
- increased cell fill to `1.01` without moving cell centers;
- reduced the rounded edge radius to `0.012` cell;
- disabled dense per-cell cast/receive shadows because the game already provides a dedicated readable contact shadow.

Forge kept its authored close-up settings. F-02 and F-01R remained available as explicit comparison candidates.

## Reproduction

```bash
pnpm audit:character:f01
pnpm test
pnpm build
pnpm capture:character:r09 -- \
  --profile src/characterForge/f01.gameplay-profile.json \
  --url http://127.0.0.1:4177/game/r09/ \
  --out work/f01_gameplay_pipeline_release_2026-08-09/evidence/local-r09
```

## What this proves

It proves pack identity, deterministic filtering and the observed runtime contract under one camera condition. It does not prove that the character is finally attractive, that every animation preserves the face, or that iPhone Safari has matching quality/performance.
