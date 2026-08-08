# F.R.A.M.

<small>Frontier Relics Archive Module / 辺境遺物記録モジュール</small>

人類が激減し、自然に侵食された現代都市を放浪する、世界記憶型・放浪生活ハクスラです。遺物を回収して戦い方を組み替え、帰還や撤退の結果が拠点と次の遠征へ残るゲームを目指します。

現行の既定runtimeはTypeScript、Vite、Three.jsによる固定斜め俯瞰のPrototype Bです。Phaser版Prototype 0.1は比較用legacyとして残しています。ゲーム規則は表示から分離した30Hzの決定論的simulationで、同じseedと入力から同じ結果を再現できる構造を維持します。

## Current playable

- 公開最新版はR06 `Sharp Navigation Build`。連続worldを歩き、mini-mapとmarkerで目的地を探せます。
- 通常攻撃は装備条件を満たすと自動で進み、移動、位置取り、武器持替、guard／回避、有限resourceの大技、item、調査はplayerが操作します。
- 通常敵、名付き異形、loot、遺物dossier、破壊／鎮静／接続の複数結果があります。
- R01〜R06は比較可能なplayable archiveとして保持しています。R07／R08はlocal character比較候補で、公開最新版や完成版ではありません。
- Character Forge F-01は、AI生成sheetから高密度voxel character、semantic rig、animationへ変換する独立した技術実験です。

World Memory、R09専用save／reload、Product Shell、Google sign-in、Cloud Test Save、R10 Relic Buildcraftは未実装です。次の製品proofは、二つの拠点候補と二つのmodule選択が二回目の遠征を変えるR09Aです。

詳細は[`docs/GAME_BRIEF.md`](docs/GAME_BRIEF.md)、[`docs/GAME_CONSTITUTION.md`](docs/GAME_CONSTITUTION.md)、[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)を参照してください。

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

R06はローカルでは`http://127.0.0.1:5173/game/r06/`、公開版は`https://t-omori-lab.github.io/game/r06/`です。

同じWi-Fi内のiPhoneからMacのnetwork URLを開いてbrowser試遊できます。ただしiPhone 16 Proは必須target tierであり、Safari／Home Screen PWA、offline、発熱、battery、色、audioの実機gateは未通過です。desktop browserやmobile emulationの合格を実機合格とは扱いません。

## App checks

```bash
pnpm test
pnpm build
pnpm test:e2e:r06
```

`test:e2e:r06`はproduction buildを作り、loopback preview上の現行R06でcold／warm起動、WASD入力、WebGL／mini-map、frame-time、route転送量、Service Worker controlを検査します。初回だけ`pnpm exec playwright install chromium`が必要です。既定の証拠出力はOSの一時directoryで、repositoryを汚しません。

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
- 世界設定: `docs/WORLD_BIBLE.md`
- 生成規則: `docs/GENERATION_RULES.md`
