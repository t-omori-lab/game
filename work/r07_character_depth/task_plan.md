# Task Plan: F.R.A.M. R07 Character and Depth Pass

Updated: 2026-08-02

## Goal

R06と因果world／gameplayを共有しながら、通常のゲーム画面で可愛く読める高密度voxel少女と、画面上下の帯ではなくscene depthに基づく弱いminiature softnessを持つR07 local candidateを作る。

## Acceptance contract

- R06と公開R01〜R06を変更しない。R07は独立local route／entryとして追加する。
- 同じ1280×720 gameplay viewportでR06とR07を比較できる。
- 主人公はordinary smooth 3Dへ戻さず、visible voxel／pixel-art-like surfaceを維持する。
- 頭身だけでなく、顔、前髪、横髪、後髪、目、頬、首、肩、手、脚、coat、SF装備をsemantic volumeとして再構築する。
- 正面寄りの通常gameplay facingで、顔と髪のsilhouetteが一目で読める。
- blurはscreen-Y bandを使わず、scene depth／CoC／edge rejection／actor maskに基づく。sharp baselineへ即時fallbackできる。
- R06のmini-map、objective、操作guide、半自動戦闘、二武器、quest、lootを維持する。
- strict TypeScript、tests、production build、local production browser comparisonが合格する。
- public deploy／pushはユーザーの明示指示があるまで行わない。

## Phases

- [x] Phase 1: Project state and requirements refresh
- [x] Phase 2: R06 character／post-processing architecture audit
- [x] Phase 3: R07 semantic voxel girl and depth pipeline implementation
- [x] Phase 4: Same-viewport visual comparison and revision
- [x] Phase 5: Automated checks, docs, and exact-file local commit

## Key questions

1. 現在の主人公が可愛く見えない原因は、頭身、顔cluster、髪silhouette、衣装比率、camera facingのどこにあるか。
2. 現post stackでdepth textureを安全に利用し、actor／UIを汚さない弱いDOFをどう構成するか。
3. character densityを保ちながら、初回停止とtriangle costをどう抑えるか。

## Decisions made

- R07はcharacter artを主目的とし、都市partの追加をしない。
- depth-aware softnessはsharp画面が成立した後に比較可能な小さな効果として実装する。
- R06と公開版を不変の比較対象として扱う。

## Errors encountered

- bundled fallback `pnpm test` attempted a non-interactive modules purge and stopped with `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`。既存dependenciesは変更せず、bundled Nodeからlocal TypeScript／Vitest／Vite entryを直接実行する。
- First Vitest run: R07 tests passed, but three source-text contract tests still expected R06 to be the final ternary branch。R07を含むversion／environment／sharp contractへ更新した。

## Status

**Implementation complete; user review pending** — R07 local production candidate、同一viewport比較、全自動check、project handoffを完了した。public deploy／pushは未実施。
