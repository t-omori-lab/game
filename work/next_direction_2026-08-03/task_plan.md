# Task Plan: F.R.A.M. 次期方針整理

## Goal

公開済みF-01／game-first catalogを現在地として、次の開発を一つの主線と検証可能なタスクへ再編し、`docs/NEXT_TASKS.md`の再開点を明確にする。

## Phases

- [x] Phase 1: project正本、公開結果、未完了タスク、既存のdirty filesを確認する
- [x] Phase 2: gameplay、visual／character、runtime／releaseの三面から不足を監査する
- [x] Phase 3: 優先順位、非目標、milestone、acceptance gateを統合する
- [x] Phase 4: project正本を更新し、scope限定commitで完了する

## Key Questions

1. 次の一手はF-02 character改善か、playable gameへの統合か、gameplay loop強化か。
2. 「美しい技術demo」を増やさず、North Starとゲーム体験をどう同じsliceで検証するか。
3. 重い初回loadを悪化させず、AI-native asset pipelineを次のproduction stepへどう進めるか。

## Decisions Made

- 過去版R01〜R06／F-01は保持し、今回の整理ではruntimeや公開状態を変更しない。
- 現在の`NEXT_TASKS.md`を列挙型backlogから、主線＋gate＋後回しへ圧縮する。
- 次の主milestoneは`R09 First Memory Expedition`とする。First Memory Loopを主product gateにし、F-01 bridge → evidence-driven F-02を同じplayable sceneのvisual gateとして進める。
- First Memory Loopのlogic proofは現行actorで先行できるようにし、F-02の完成待ちで止めない。
- F-02はStandalone Forgeとして先に作らず、R09の通常gameplay captureで露呈したmoduleだけを再構築する。
- R09A First Memory Logic ProofとR09B Visual Review Candidateを別checkpointにし、completion境界を分離する。
- R09は専用save namespaceから開始し、旧saveを保持する。二site×二module、回収物消費、撤退、actor fallbackをhard gateにする。

## Errors Encountered

- None.

## Status

**Complete** - 次期方針、合格条件、実装再開点をproject正本へ反映し、postflightを通過した。
