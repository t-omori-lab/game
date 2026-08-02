# Task Plan: F.R.A.M. R06 release

Updated: 2026-08-02

## Goal

R05を独立保存版として残し、直前の監査で確認した読み込み・banded blur・主人公・HUD／navigationの主要欠陥を前進させたR06を`/game/r06/`へ公開し、catalog、保存版、公開動作を実URLで確認する。

## Acceptance contract

- `/game/`の先頭がR06で、R05〜R01の公開URLが保持される。
- R05はsource共有ではなく、snapshot metadataとchecksumを持つ自己完結static保存版になる。
- catalogは原寸card画像を一括eager loadせず、root service workerは全archive routeをinstall時にprecacheしない。
- R06はscreen-Y banded blurを既定利用しない。sharpなworldとUIを基準にする。
- R06はR05よりcompactな高密度voxel少女、初見で読めるPC操作、mini-map、目的地／world markerを持つ。
- R04由来の連続world、collision、quest、loot、半自動通常攻撃、手動大技、二武器を壊さない。
- typecheck、test、production build、保存版checksum、local production browser smokeが合格する。
- exact-file commitを`main`へpushし、GitHub Actions Pages deployと公開`/game/`、`/game/r05/`、`/game/r06/`を確認する。

## Phases

- [x] Phase 1: Current-state and release architecture audit
- [x] Phase 2: R05 freeze and catalog／service-worker performance fix
- [x] Phase 3: R06 sharp visual、compact hero、dynamic HUD／navigation implementation
- [x] Phase 4: Automated checks、production build、same-viewport browser review
- [ ] Phase 5: Project docs、release evidence、exact-file commit／push
- [ ] Phase 6: GitHub Pages and public-browser verification

## Decisions made

- R06はConcept C完成版を名乗らず、`Sharp Navigation Build`として公開する。美しくないbanded blurを残さず、depth-aware DOFは次段の専用gateとする。
- R05公開版は削除せず凍結する。以後のsource変更はR06だけへ反映する。
- UIは常時全部を出さず、必要操作とnavigationを初見で読めるdynamic HUDにする。
- mini-mapは第二の3D cameraではなく、world dataから生成する2D表示とworld-to-screen markerで実装する。
- pre-existing `work/r05_fram_visual_pass/`のuntracked画像18件には触れない。

## Errors encountered

- None yet.

## Status

**Phase 5 in progress** — 191 tests、strict TypeScript、production build、R05 checksum、local catalog／R05／R06 browser smokeは合格。exact-file commit、push、Pages、公開browser確認が残る。
