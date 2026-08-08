# F-01 Gameplay Fidelity Pipeline Release Plan

## Goal

F-01のgameplay-distance surface correctionを安全にcommit／GitHub Pages deployし、canonical packから同一条件の実画面比較までをproject-local skillとdeterministic scriptsで再現可能にする。

## Phases

- [x] Phase 1: 現在のF-01修正、正本digest、local browser、tests／buildを確認する
- [x] Phase 2: skill contractとcanonical／gameplay derivative境界を固定する
- [x] Phase 3: surface-pack auditとsame-camera capture scriptsを実装・検証する
- [ ] Phase 4: exact filesだけをcommitし、mainへ安全に統合してpushする
- [ ] Phase 5: GitHub Actions、公開R09、保存版route非干渉を確認し、outcomeを確定する

## Guardrails

- `src/characterForge/f01.surface-pack.json`と公開Forge F-01の正本payloadを変更しない。
- R01〜R08、Forge F-01、F-02／F-01R comparison routeを削除・置換しない。
- close-up Forge、gameplay capture、machine gate、人間のart採否を混同しない。
- public deploy、Actions成功、公開browser確認を別々の事実として検証する。
- 未追跡`node_modules` symlinkと他taskの変更をcommitしない。

## Decisions Made

- skill sourceはrepository内`skills/fram-character-gameplay-fidelity/`を正本にし、`AGENTS.md`から必読routeを設定する。
- F-01 packの9,454 cells／payload digestをsource truth、R09の9,421 cellsをdistance-specific presentation derivativeとして記録する。
- deployは現在のrepository workflowを使い、過去route保持をrelease gateに含める。

## Errors Encountered

- `pnpm run build`は非TTYでmodules purge確認により停止した。bundled Nodeからlocal TypeScript／Vite entryを直接実行して検証済み。
- Workspace postflightは`/tmp` worktreeをWorkspace外と判定して実行不能。commit前にcanonical integration側で再実行する。

## Status

**Currently in Phase 4** — versioned profile、project-local skill、deterministic pack audit、same-camera captureがlocal合格。exact filesをcommitし、canonical mainへ統合する。
