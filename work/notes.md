# Working Notes

## Confirmed input

- 2026-07-30、ユーザーは新規ゲーム開発の開始を承認した。
- 基準端末はiPhone 16 Pro。
- 初版はブラウザ／PWAで遊べる形を採用する。
- 好みとして、ルナティックドーン、巡り廻る。、おっさん or die、Diablo、Kenshi、Oblivion、Metal Max、Vampire Survivorsが挙がった。
- 妖怪は有力候補だが、世界観、舞台、主人公は未決定。
- リッチな素材量より、計算描画されたベクター表現と仕組みの面白さを重視する。

## Initialization evidence

- Project ID: `P-20260730-28501297`
- Initial local commit: `bce481fde7a00062f76f540aadd16762c93dd2cb`
- Remote: none
- Push: not performed
- Initial preflight after registration: `PASS=36 WARNING=0 FAIL=0`
- Workspace registryの初期化前後差分は、生成日更新と本project行の追加だけだった。

## Working hypotheses

- 好みの中心は「周回」そのものより、自分がいなくても続く世界、自由な放浪、装備や乗り物の履歴にある。
- 初期版では常時世界simulationを作らず、帰還時に世界をまとめて進めるevent-driven更新で感覚を再現する。
- 最初の評価対象は、世界観なしでも8分遊べる戦闘と強化選択である。

## Prototype 0.1 evidence

- 30Hz deterministic simulation、vector frontend、touch input、3択upgrade、8分bossを実装した。
- 遠征終了時の討伐跡、累計遠征、最高討伐数を`WorldLegacy v1`として次回へ継承する。
- PWA shell、初回install asset precache、A/B save、checksum、IndexedDB／memory fallbackを実装した。
- 2026-07-30、Vitest 36/36、strict TypeScript、Vite production buildが合格した。
- 852×393相当browserで開始、戦闘、強化、再開、縦画面案内を確認した。
- Python Playwright packageがないため、root側のscript E2Eは未実行。worker browser QAと保存済みscreenshotを証拠とする。
- iPhone 16 Pro実機10分試遊、HTTPS PWA install、offline実機再起動は未確認。

確認済みの現在状態は最終的に `docs/PROJECT_CONTEXT.md`、長期的な判断は `docs/DECISIONS.md` へ移します。
