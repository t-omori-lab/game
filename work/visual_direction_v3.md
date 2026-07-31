# Visual Direction V3: Luminous Reclaimed World

Status: audit in progress  
Updated: 2026-07-31

## Quality bar

Relative improvementではなく、commercial HD-2D gameの一画面と並べたときに「prototypeの箱」ではなく「意図して作られた場所」に見えることを基準にする。ただし、固有assetや画面構成は複製しない。

## Emotional color script

- defaultはmourningではなく、sunlit resilience、curiosity、work、repair、dry humor。
- ruinは生活を失った背景ではなく、peopleが拾い直し、継ぎ、植え、使っている現在形の場所。
- open grass、warm road、flowers、repair cloth、water、ceramic、signageを使い、危険はdark filterではなくtelegraph／damage／soundへ置く。
- deathは突然かつ簡潔でもよいが、通常探索を長い悲壮感で覆わない。

## Structural reference

Official developer interviews describe HD-2D as the fusion of pixel expression with a 3D environment, and identify the following improvements:

- high-resolution maps that retain an organic pixel-art impression
- dynamic lighting, including day／night variation
- effect-linked point light that changes character and environment shadow
- character proportions and resolution chosen to support denser action

Sources:

- https://www.unrealengine.com/spotlights/octopath-traveler-s-hd-2d-art-style-and-story-make-for-a-jrpg-dream-come-true?lang=ja
- https://www.unrealengine.com/developer-interviews/octopath-traveler-ii-builds-a-bigger-bolder-world-in-its-stunning-hd-2d-style?lang=ja

## Start-town vertical slice

One 852×393 frame must show five separable depth layers:

1. base terrain silhouette and route
2. material breakup: smaller stone, soil, moss, cracks, debris
3. architecture: foundation, wall body, openings, frames, roof, damage, repair history
4. life and use: plants, water edge, board, lamp, containers, cables, signs
5. light and atmosphere: direction, contact shadow, signal glow, aerial depth

No single unbroken 80×80 ground cube or one-box building may dominate the focal area.

## Character and companion-candidate contract

- player and future companion candidates are hero assets, not background recipes.
- face／sensor, hair／shell, hands／manipulator, equipment, front／back, action silhouette must read at the actual 852×393 scale.
- current 16×24×12 is a lower bound, not a final target. Evaluate 20×28×14 and 24×32×16 together with camera scale and internal render resolution.
- player and robot should each remain one main skinned／swapped voxel geometry where possible; visual quality takes priority over preserving 16³.
- the survey-lantern robot is one roster candidate, not the protagonist's unique fixed partner.
- candidate visuals may be authored before gameplay mechanics, but the normal game starts with no companion and must document preview-only rendering explicitly.

## Rendering route to test

- vertex-colored `MeshStandardMaterial` or equivalent lit material for important world／character geometry
- hemisphere plus directional key light; fake contact shadow remains available as mobile fallback
- tone mapping and exposure fixed by a color script
- local point light synchronized with relic／combat effect when performance permits
- depth haze and restrained bloom; do not use blur to hide low-detail geometry
- fixed camera retained unless a small zoom／composition adjustment materially improves hero readability

## HDR-like image contract

- 目標は、単なる高彩度filterではなく、明るい昼光の中でもhighlight、mid-tone、局所shadowの情報が同時に残る画。
- world lightingはlinear spaceで計算し、warm key light、cooler shadow fill、emissive accent、tone mappingでwide dynamic rangeをSDRへ安全に圧縮する。
- baselineはsRGB／SDRでも成立させる。Display P3やtrue HDR canvasはfeature detectionによるprogressive enhancementでのみ有効化し、非対応端末へ同じ値を誤解釈させない。
- highlightは屋根、濡れた石、水、金属、signal、effectへ限定し、UI文字、enemy telegraph、白い地面を同時に最大輝度へしない。
- bloomはscene detailの代替にしない。入れる場合は発光物だけを対象にし、半解像度以下、最大2 full-screen pass、disable可能、attack readability優先とする。
- iPhone 16 Pro相当browserで60fpsを維持しても実機の発熱／batteryは未確認とし、10分試遊で継続fpsと表面温度の体感を再判定する。

## Initial performance gate

- internal render remains at a controlled resolution
- start-town target: 60fps display in local 852×393 Chrome, <=45 draw calls, <=70k visible triangles
- no more than two full-screen post-processing passes in the first slice
- iPhone 16 Pro Safari／PWA remains a separate real-device gate

## Stop rule

Do not spread the style across 3,600×1,800 world until:

- a start-town screenshot passes user review for map, building, object, color, player, and robot
- attack telegraphs remain clearer than decorative light
- local performance stays inside the gate
- visual-only robot status is explicit
