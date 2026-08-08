# F.R.A.M.

<small>Frontier Relics Archive Module / 辺境遺物記録モジュール</small>

人類が激減し、自然に侵食された現代都市を放浪する、世界記憶型・放浪生活ハクスラです。遺物を回収して戦い方を組み替え、帰還や撤退の結果が拠点と次の遠征へ残るゲームを目指します。

現行の既定runtimeはTypeScript、Vite、Three.jsによる固定斜め俯瞰のPrototype Bです。Phaser版Prototype 0.1は比較用legacyとして残しています。ゲーム規則は表示から分離した30Hzの決定論的simulationで、同じseedと入力から同じ結果を再現できる構造を維持します。

## Current playable

- 公開最新版はR06 `Sharp Navigation Build`。連続worldを歩き、mini-mapとmarkerで目的地を探せます。
- local最新版R09 `First Memory Expedition`は、二つのsiteを探索し、回収物を使って拠点とmoduleを選び、その結果を二回目の遠征と再読み込み後へ残せます。F-02高密度voxel探索者を通常camera、装備、移動、半自動戦闘へ接続したvisual review candidateです。公開版ではありません。
- 通常攻撃は装備条件を満たすと自動で進み、移動、位置取り、武器持替、guard／回避、有限resourceの大技、item、調査はplayerが操作します。
- 通常敵、名付き異形、loot、遺物dossier、破壊／鎮静／接続の複数結果があります。
- R01〜R06は比較可能なplayable archiveとして保持しています。R07／R08はlocal character比較候補で、公開最新版や完成版ではありません。
- Character Forge F-01／F-02は、AI生成sheetからcompiled high-density voxel character、semantic rig、animationを作り、同じruntime packをForgeと実gameplayで検証する制作pipelineです。

World Memory v1、R09専用local save／reload、F-01 bridge、実gameplay証拠からfailed 5 moduleだけを補正したF-02までlocal実装済みです。F-02は10,160 visible cellsで、R09Aの全四分岐、旧actor fallback、R06比performance gateを通過しました。ユーザーによる造形採択、Product Shell、Google sign-in、Cloud Test Save、R10 Relic Buildcraft、公開deployは未完了です。

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

R09はローカルでは`http://127.0.0.1:5173/game/r09/`です。公開最新版R06はローカルでは`http://127.0.0.1:5173/game/r06/`、公開版は`https://t-omori-lab.github.io/game/r06/`です。

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
