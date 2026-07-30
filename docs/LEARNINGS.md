# Learnings: ゲーム開発

Last updated: 2026-07-30

## Validated project learnings

- 世界観を抽象語彙に保ったままでも、移動、攻撃、強化、継承という評価対象は実装できた。theme決定を待つ必要はない。
- simulationをPhaserから分離し、seedとtickに限定すると、戦闘、upgrade、boss、replayをbrowserなしで再現検査できる。
- 素材画像を増やさず、5色、輪郭、等高線、円弧、軌跡、形状文法で敵と操作を判別できる画面を構成できる。
- PWAはstatic shellだけでなく、初回install中にbuild済みのhash付きJS／CSSまで発見してprecacheしないと、初回online訪問直後のoffline起動を保証できない。
- 長期saveの土台では、versionとchecksumだけでなく、A/B slot、書込後検証、mutation直列化、import size／depth制限、永続層fallbackの可視化が必要。
- 960×540の16:9 stageは852×393相当viewport内で698×393となり、safe areaを守れる一方、横長端末では左右の余白が生じる。実機試遊で許容性を判断する。

## Improvement candidates

- iPhoneへのLAN内HTTP共有とPWA install／offline検証を分け、後者にはHTTPS previewを標準手順として用意する。
  - reuse_count: 1
  - promotion_status: observed

## Candidate template

```yaml
observed_at:
problem:
observation:
evidence:
applies_to:
does_not_apply_to:
proposed_change:
validation:
reuse_count: 1
promotion_status: observed
```

1案件の観察は自動的に共通ルールへ昇格させません。
