# F-01 Gameplay Fidelity Pipeline Release Report

Status: complete

## Result

canonical 9,454-cell packを変更せず、F-01 gameplay presentationとその再現pipelineを実装・公開した。R09は33 detached ground cellsだけをdeterministic filterで除外して9,421 cellsを描画し、sub-pixel gap／bevel／detail shadowを通常camera用に補正する。runtime、audit、browser captureは同じversioned profileを読む。

## Reproducible entry points

- Project skill: `skills/fram-character-gameplay-fidelity/SKILL.md`
- Versioned profile: `src/characterForge/f01.gameplay-profile.json`
- Surface-pack audit: pass
- Same-camera browser capture: pass (`evidence/local-r09/capture.json`)

## Public release

- Game: `https://t-omori-lab.github.io/game/r09/`
- Character Forge F-01: `https://t-omori-lab.github.io/game/forge/f01/`
- Catalog: `https://t-omori-lab.github.io/game/`
- Implementation commit: `f105e09`
- GitHub Pages run: `https://github.com/t-omori-lab/game/actions/runs/31269855944`
- Build／deploy: success
- Public contract capture: pass (`evidence/public-r09/capture.json`)
- Preserved routes checked: R01／R06／R08

## Boundaries

- Public deployment does not mean commercial character-art acceptance.
- Desktop Chrome evidence does not prove iPhone 16 Pro Safari／PWA performance or rendering parity.
