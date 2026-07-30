# ゲーム開発

短い遠征でビルドを作り、成功・失敗・落とした装備が次の旅人の世界へ残る、スマホ対応の小さな永続世界ゲームです。

初版はTypeScript、Phaser 4、Viteによるブラウザ／PWA版として開発し、基準端末をiPhone 16 Proにします。ゲーム規則は表示から分離した決定論的simulationとして実装し、同じseedと入力から同じ結果を再現できるようにします。

## Playable prototype

- 横画面960×540の「動く地図／野帳」ベクター表現。
- 左ドラッグ／WASD移動、自動攻撃、右側の脈動スキル。
- 敵3種、エリート、8分後のボス、経験値と3択強化。
- 同じseedと入力を再現できる30Hzの決定論的simulation。
- 遠征の討伐跡、累計遠征、最高討伐数が次の旅人へ残る。
- checksum付きA/B保存、IndexedDB、破損時fallback、offline PWA shell。

詳細は[`docs/GAME_BRIEF.md`](docs/GAME_BRIEF.md)と[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)を参照してください。

まだ完成版ではありません。拠点、依頼、遺物の奪還、正式な世界観、AI生成コンテンツ、Steam包装は次段階です。

## Start

1. `AGENTS.md`を読む。
2. `PROJECT_MANIFEST.json`を確認する。
3. `docs/PROJECT_CONTEXT.md`と`docs/NEXT_TASKS.md`から再開する。
4. `../../tools/project-preflight.sh .`で文書とGit状態を読み取り確認する。

依存関係の準備後、開発版を起動します。

```bash
pnpm install
pnpm dev
```

同じWi-Fi内のiPhoneから、起動時に表示されるMacのネットワークURLを開いて試遊します。
LAN内のHTTP URLではゲーム試遊はできますが、iPhoneのPWA保存・offline確認にはHTTPS環境が必要です。まずSafari横画面で操作感を確認し、公開前のHTTPS previewは別工程で用意します。

## App checks

```bash
pnpm test
pnpm build
```

## Verify

Workspace内では次を実行します。

```bash
../../tools/project-preflight.sh .
../../tools/project-postflight.sh .
../../tools/project-finish.sh . 'type(scope): subject' path/to/exact-file
```

`project-finish.sh`は明示した変更ファイルだけをローカルcommitします。GitHubへはpushしません。

## Documentation

- 現在状態: `docs/PROJECT_CONTEXT.md`
- 次の作業: `docs/NEXT_TASKS.md`
- 現実世界の結果: `docs/OUTCOMES.md`
- 再利用可能な学び: `docs/LEARNINGS.md`
- アーキテクチャ: `docs/ARCHITECTURE.md`
- 重要判断: `docs/DECISIONS.md`
