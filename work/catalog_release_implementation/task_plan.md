# Task Plan: F.R.A.M. catalog and Forge FIELD release

## Goal

`/game/`をF.R.A.M.のgame-first landingとして軽量化し、Character Forge F-01へactual gameplay-distanceのFIELD表示を追加し、既存R01〜R06／F-01を保持したままGitHub Pagesへ公開・実URL確認する。

## Phases

- [x] Phase 1: current source、dirty files、release contractを監査する
- [x] Phase 2: catalog identity／performanceとF-01 FIELDを実装する
- [x] Phase 3: test、production build、desktop／mobile browser QAを通す
- [x] Phase 4: project docs／release evidenceを更新し、scope限定commit／pushする
- [x] Phase 5: GitHub Pages完了と公開URLを確認する

## Acceptance Contract

1. First viewでF.R.A.M.がゲーム名、放浪RPG、AI-native開発研究であると読める。
2. `最新版を遊ぶ`と`AI開発実験を見る`がfirst viewにある。
3. public見出しは`遊べるAI開発実験`、分類名は`TECHNICAL EPOCHS / 技術エポック`とする。
4. 初回はvisible raster 1件、scroll前archive画像0 byte、first-view transfer 150 KB以下を目標とする。
5. F-01は`CLOSE / FULL / FIELD`を持ち、FIELDはactual game angle、actor画面高14〜18%／target 16%、world-scale reference付きとする。
6. 既存`/game/r01/`〜`/game/r06/`と`/game/forge/f01/`を保持する。
7. local test／build／browser QA後にmainへpushし、GitHub Pagesと公開URLを確認する。

## Decisions Made

- Heroの主画像はactual gameplay captureであるR06を使い、F-01は研究sectionへ下げる。
- canonical screenshotは保持し、catalog用derivativeだけを軽量化する。
- native lazy load単独ではなく、real `src`をintersection直前に設定する。
- current Forge `GAME`は`FULL`へ改名し、新しい`FIELD`を追加する。

## Errors Encountered

- bundled `pnpm`の初回testがTTYなしのmodules purge確認で停止した。`CI=true`を明示して非対話実行へ切り替える。
- targeted testの初回は、`data-deferred-src`内にも`src=`文字列が含まれるため過剰なnegative assertionが1件失敗した。独立`src`行だけを検出するassertionへ限定した。
- strict TypeScriptの初回は未使用`epochHref`を検出した。重複変数を削除し、card生成側の正規URL関数へ一本化した。
- bundled `pnpm check`は、子scriptの`node`探索PATHを継承せず`node: not found`で停止した。公開workflowと同じ検査内容はbundled NodeからVitest／TypeScript／Viteを個別に直接起動して確認する。

## Status

**Complete** - commit `026970f`をmainへpushし、GitHub Pages run #21のbuild／deploy成功、公開catalog／Forge、保存版routeを確認した。
