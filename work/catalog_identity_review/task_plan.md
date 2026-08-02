# Task Plan: F.R.A.M. catalog identity, performance, and Forge camera review

## Goal

公開catalogを「F.R.A.M.というゲーム」と「AI-native game development research」の入口として再設計し、F-01のgameplay-distance確認と初回表示の重さを次版で解消するための実装判断をまとめる。

## Phases

- [x] Phase 1: 現行project契約、公開状態、既存課題を確認する
- [x] Phase 2: catalogのidentity／copy／visual hierarchyを監査する
- [x] Phase 3: catalog loadとF-01 camera実装を診断する
- [x] Phase 4: 優先順位つきの次版仕様と文言案をまとめる
- [x] Phase 5: review結果を検証してhandoffする

## Key Questions

1. 最初の一画面で、ゲーム名、ゲーム内容、AI-native研究の三つをどう同時に伝えるか。
2. 公開catalogの初回表示を重くしている実asset／worker／bundleは何か。
3. F-01を現在のclose viewから約3倍小さいgameplay scaleまで引けるcamera contractは何か。
4. `Technology Epoch`を日本語で何と呼ぶと、格好よさと意味の明瞭さを両立できるか。

## Decisions Made

- 今回は診断と意見書までとし、catalog／runtime／公開環境は変更しない。
- ユーザーが意味不明と評価した現copyは保持対象にせず、目的から書き直す。
- root pageはgame landing → AI-native research → technical/archiveの順に再構築する。
- public sectionの見出しは`遊べるAI開発実験`、分類名は`TECHNICAL EPOCHS / 技術エポック`を第一候補とする。
- F-01は`CLOSE / FULL / FIELD`へ分け、FIELDをactor screen占有率16%で定義する。

## Errors Encountered

- なし。

## Status

**Completed** - 独立監査、公開asset inventory、camera source確認を統合し、実装前handoffを確定した。
