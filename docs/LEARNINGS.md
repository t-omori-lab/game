# Learnings: ゲーム開発

Last updated: 2026-07-31

## Validated project learnings

- Prototype 0.1の「遊べるが約20点」という評価から、技術的完成とゲーム核の適合は別であると確認できた。固定arenaと常時自動攻撃を磨くより、手動verbとscroll探索へ核を入れ替える方が目的に近い。
- simulationを表示から分離し、seedと30Hz tickへ限定すると、rendererをPhaserからThree.jsへ変えても、戦闘、分岐、replayをbrowserなしで再現検査できる。
- 16×16×16を実行時のcube数ではなくauthoring gridとして扱い、隠れ面を除去した単一geometryへ変換すると、画像assetなしで立体silhouetteを作れる。
- fixed orthographic camera、low-resolution world canvas、crisp HTML HUD、blob shadowの組合せは、自由回転cameraやdynamic shadowなしでも奥行きと操作視認性を出せる。
- 既定runtimeをThree.js、旧runtimeをquery指定のdynamic importに分けると、旧試作を比較用に残しながらPhaserを既定bundleから分離できる。
- dynamic importした既定runtimeは、HTMLからassetを発見する現在のservice workerではinstall時precache対象にならない。既定runtimeはstatic importにし、比較用の旧runtimeだけをdynamic importする。
- SF itemを「効果／原理仮説／副作用／使用者メモ」に分けると、単なる数値modifierへ世界観と収集欲を載せられる。AI候補生成にもschemaを与えられる。
- procedurally生成した短い波形とnoiseでも、速い刃、重い衝撃、guard、遺物、結果の役割を分けられる。実機ではspeaker特性と音量balanceの再確認が必要。
- 852×393相当のlocal browserでは初期画面約25 draw calls／約18k triangles、表示60fps、console error 0件だった。これは実機性能の証明ではない。
- keyboard／pointerの非常に短いtapは30Hz tick間にdown/upが終わり得る。移動tapを一tickだけqueueすると、操作とE2Eの取りこぼしを防げる。
- 複数buttonを同時に使うtouch actionは入力順へ依存させず、保持状態と「組合せが成立した瞬間」を分離すると、回避後も防御へ自然に戻せる。
- quest分岐の必要itemは、対峙triggerより十分外で取得可能かを配置invariantと初期地点からの連続移動testで検証する。選択modalにも探索へ戻る出口が必要。
- mobileの縦向き案内は画面を覆うだけでなく、simulationと保持入力も止める。Web Audioのschedulerはmute／background復帰時に過去時刻を再生せず現在時刻へrebaseする。
- local browserで戦闘せず街道のlootへ向かうと、最初の敵に敗北した。手動対応を要求する設計は成立している一方、練習敵としての強さは実機試遊で調整が必要。
- GitHub Pagesのproject siteでは、Viteの`base`とWeb App Manifestの`id`を公開subpathへ固定する。asset URLが偶然動いても、manifestの相対`id`は別の基準で解決され、PWA identityがorigin rootを指し得る。
- 新規repositoryのPages sourceをGitHub Actionsへ切り替える前に初回workflowを走らせると、buildが正しくてもdeployは失敗する。source保存後に再実行し、最新commitの成功runと公開HTTP応答を別々に確認する。

## Improvement candidates

- iPhoneへのLAN内HTTP共有とPWA install／offline検証を分け、後者にはHTTPS previewを標準手順として用意する。
  - reuse_count: 1
  - promotion_status: observed
- hidden-face voxel geometryのtriangle／draw-call budgetをasset validationへ追加する。
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
