# Task Plan: iPhone向けベクターゲーム原型

## Goal

iPhone 16 Proのブラウザで触れられる、ベクター表現・移動・自動攻撃・敵群・強化選択を備えた最初の原型を作り、決定論的なゲーム核と今後の開発計画を再開可能な状態にする。

## Phases

- [x] Phase 1: Workspaceへ正式登録し、初期状態を確認する
- [x] Phase 2: 企画核・アーキテクチャ・検証条件を文書化する
- [x] Phase 3: TypeScript / Phaser / PWAの基盤と決定論的simulation coreを実装する
- [x] Phase 4: ベクター原型、タッチ操作、戦闘、強化選択を実装する
- [x] Phase 5: 自動テスト、ブラウザQA、iPhone 16 Pro相当表示を検証する
- [x] Phase 6: durable docsを更新し、postflightとscope限定commitを行う

## Decisions

- 初版の基準端末はiPhone 16 Pro。
- 初版はブラウザ／PWAで遊べる形とし、Steam候補版はゲーム核の検証後にElectronで包む。
- 世界観は現段階で固定せず、旅人・同行体・異形・遺物・依頼という抽象語彙で実装する。
- ゲーム規則はPhaserから分離した決定論的simulation coreに置く。
- AI生成は初期の戦闘核に入れず、検査済みコンテンツ生成として後段に追加する。

## Errors

- sandbox内の依存取得がDNS `ENOTFOUND`で停止した。処理を中断し、許可付きの同一`pnpm install`で再実行した。
- pnpmが`esbuild`のinstall scriptを未承認として終了した。生成された`pnpm-workspace.yaml`で`esbuild`だけを明示許可した。
- `esbuild` postinstallが`node: command not found`で停止した。bundle済みNodeのbinをそのinstall commandの`PATH`へ明示し、依存設定を完了した。
- sandbox内ではlocalhost listenが`EPERM`となり、許可付きpreviewで起動した。
- Python Playwrightは環境に存在せず、in-app browserからのlocalhost接続もpolicyで拒否された。担当workerが別の実ブラウザで852×393の主要flowと縦画面案内を確認済み。root側のE2E再実行は未確認として残す。

## Status

全phase完了。prototype 0.1はlocalで再開可能。次はiPhone 16 Pro実機10分試遊で、操作感とperformanceを確認する。

## Checkpoint rule

Update `work/CHECKPOINT.md` after each completed phase, before changing subproblems, and before reading or emitting high-volume material.
