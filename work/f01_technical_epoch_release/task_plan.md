# F-01 Technical Epoch Release Plan

## Goal

Character Forge F-01を、既存のR版prototypeを置き換えない独立した「技術エポック」としてGitHub Pagesへ保存公開し、次のF-02（module-first reconstruction）へ安全につなぐ。

## Phases

- [completed] 公開構成、catalog、build／Pages workflow、dirty worktreeを確認する
- [completed] catalogへTechnology Epochs枠とF-01 cardを追加し、保存公開ルールをproject docsへ記録する
- [completed] tests、strict TypeScript、production build、local browser表示を検証する
- [completed] exact filesだけをcommit／pushし、GitHub Actionsと公開URLを確認する
- [completed] confirmed outcomeとF-02のrestart pointをdocsへ反映する

## Guardrails

- R01〜R08と公開R06を削除・上書きしない。
- F-01をR09や完成版として表示しない。
- `work/r05_fram_visual_pass/`の既存18未追跡画像には触れない。
- push、Actions成功、公開URL実表示を別々の事実として検証する。
