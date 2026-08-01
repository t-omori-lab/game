# Character Creator Contract

Version: v0.1 draft  
Date: 2026-08-01  
Authority: user direction plus implementation proposal

## Confirmed direction

- The first/default protagonist preset is a girl/woman character.
- The default is not the only canonical protagonist. The player can create characters with different species, sex/gender presentation, body frame, face, hair, surface, color, augmentation, and equipment.
- Character and weapon language is post-apocalyptic science fiction. Concept C's medieval-fantasy drift is not part of the target.
- The final visual surface aims for high-density micro-voxel / rich pixel-art perception rendered as realtime 3D.
- Character creation must preserve normal gameplay readability, animation, equipment fit, collision, and deterministic rules.

Names, age range, exact selectable species, pronoun vocabulary, voice set, origin list, and whether species changes mechanics remain undecided.

## Product principle

The creator changes who the traveler is without multiplying every animation and item by every combination.

Use a small number of versioned rig families. Start with `humanoid-v1`; express most early variation through compatible body frames, voxel modules, palette masks, attachments, and equipment fit profiles. Tails, ears, horns, eye layouts, skin/shell surfaces, and prosthetics may extend the humanoid rig. Quadrupeds, very large bodies, multi-arm bodies, and other incompatible plans become later rig families rather than exceptions inside `humanoid-v1`.

Sex/gender identity, visual presentation, body frame, voice, and pronoun are separate fields. They do not change combat power, equipment permission, profession, or narrative agency by default. A species may gain mechanical differences only through an explicit GameplayContract with a benefit, cost, counterplay, and world response.

## Default preset

`preset.player.fieldworker_f_01` is the first art and gameplay benchmark:

- feminine default presentation on the standard humanoid frame;
- dark or natural-color hair with a readable normal-camera silhouette;
- asymmetrical modern field jacket derived from urban workwear;
- hard-shell protector, utility harness, measurement sensor, repair marks;
- technical pack with visible power, cooling, service, and attachment interfaces;
- compact resonance cutter used for relic sampling, obstacle cutting, and defense;
- distinct signal roles: operation, hazard, repair, and unknown relic response.

This preset proves the pipeline. It does not make a fixed heroine mandatory for every playthrough.

## CharacterGenome

```ts
type CharacterGenome = {
  schemaVersion: "character-genome/1";
  stableId: string;
  revision: string;
  rigFamilyId: "humanoid-v1" | string;
  speciesId: string;
  bodyFrameId: string;
  identity: {
    displayName: string;
    genderIdentityId: string;
    presentationId: string;
    pronounSetId: string;
    voiceId: string;
    originId: string;
  };
  morphology: {
    staturePreset: string;
    buildPreset: string;
    faceId: string;
    skinOrShellId: string;
    eyeModuleId: string;
    earHornTailModuleIds: string[];
    augmentationModuleIds: string[];
  };
  modules: {
    hair: string;
    head: string;
    inner: string;
    outer: string;
    arms: string;
    legs: string;
    boots: string;
    back: string;
  };
  palette: Record<string, string>;
  equipment: {
    mainHand: string;
    offHand: string | null;
    back: string | null;
    utility: string[];
  };
  provenance: string[];
};
```

The saved game stores stable IDs and revisions, not an opaque generated mesh. A build resolves the genome to an approved content pack. Missing modules fall back to a compatible approved module and produce a visible migration record.

## High-density micro-voxel source

The current 24×32×16 recipe is a functional fallback, not the target character density.

Initial PC benchmark range:

- approximately 96–160 authored cells in character height;
- one cell is authoring information, never one runtime object or draw call;
- hidden faces removed and coplanar/same-material surfaces merged where the final silhouette permits;
- semantic modules assigned to bones or rigid part clusters;
- bevel/normal treatment preserves micro-facet light without Minecraft-scale cubes;
- shared material atlas and palette masks instead of one material per color;
- hair, coat, pack, weapon, and species features remain separable modules;
- PC, desktop-high, mobile-high, and mobile-safe LODs compile from the same source.

Two implementation candidates may be tested under the same camera:

1. voxel-volume-to-skinned-surface: cells compile to an optimized bone-weighted surface;
2. grid-quantized modular mesh: controlled topology carries micro-facet and texel logic without literal cubic volume everywhere.

The choice is made by Concept C resemblance, deformation, creator compatibility, authoring time, and mobile derivation—not by ideological purity.

## Rig, animation, and equipment

`humanoid-v1` owns stable bones and sockets for head, hands, feet, back, weapon, utility, effect, camera focus, and optional tail/ear modules. At minimum it supplies idle, locomotion, auto-attack windup/hit/recovery, skill, dodge, guard, hurt, interact, and tool-use actions.

Simulation remains authoritative for `Acquire -> Windup -> Hit -> Recover`. Animation maps deterministic phase/progress and never produces damage from a clip event.

Rigid equipment attaches to sockets. Close-fitting outer wear uses a body-frame fit profile. Start with a small discrete set of body frames; arbitrary continuous body sliders are deferred until equipment clipping can be solved without multiplying every asset. A creator option is not accepted if idle, run, attack, dodge, and tool-use show visible clipping at the final camera.

## SF equipment language

Every weapon or major tool visibly explains at least one functional system:

- power source or charge path;
- actuator or mechanical transmission;
- sensor or targeting element;
- heat sink, coolant path, or insulation;
- service connector, replaceable cartridge, or field repair;
- relic interface whose uncertain operation is visibly distinct from human engineering.

Purely decorative guards, runes, plate armor, capes, and glowing fantasy blades cannot carry the design alone. Historical shapes may reappear only when their current materials, power, interface, wear, and gameplay function make the SF transformation legible.

## Creator flow

1. Choose species/body-plan family.
2. Choose body frame and presentation.
3. Choose face, hair, surface, eyes, ears/horns/tail, and augmentations.
4. Choose field clothing and protective modules.
5. Choose palette and signal colors.
6. Choose voice/pronouns, name, and origin.
7. Review the character in the actual fixed camera with idle, run, attack, and light/material preview.

The close-up editor may show more detail, but the final approval viewport is normal gameplay scale.

## Acceptance gate

- Default female preset, a different gender presentation, and a different humanoid species run the same core clips without clipping or broken sockets.
- At 2560×1440 and 50% downscale, hair/head, body frame, back equipment, weapon/tool, facing, and action phase remain distinguishable.
- At 100%, micro-grid/facet detail is visible; at gameplay distance it integrates into a rich pixel-art-like silhouette.
- Removing the weapon does not erase character identity.
- Weapon/tool reads as powered technical equipment rather than medieval fantasy.
- All variants share the same collision class unless a GameplayContract explicitly changes it.
- Save/load reproduces the same stable IDs, palette, modules, and equipment.
- PC master and mobile LOD show the same identity and telegraphs.
- Generated candidates carry prompt/spec, tool/model version, hashes, license review, human edits, validation, and acceptance reason.
