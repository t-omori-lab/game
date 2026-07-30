# Working Notes

## Post-prototype companion robot concept

- 2026-07-31、ユーザーはPrototype B完成後に検討する参考メモとして、主人公へ随伴robotを付ける案を追加した。
- 参考感覚は『NieR:Automata』の随伴機と『攻殻機動隊』のタチコマ。ただし固有の外見、人物像、台詞、設定は模倣しない。
- 主人公は移動とactionの主体で、近距離物理／遠距離物理を担当する。
- 随伴robotは機械的・技術的な遺物を解析し、自身へ組み込んで使用する。
- 随伴robotは特殊技／大技の担当候補。使用回数またはenergyに制限があり、field中または拠点で回復手段を必要とする。
- この分担により、主人公の手動combatを保ったまま、遺物build、解析情報、有限resource、相棒への愛着を一つのsystemへ束ねられる可能性がある。
- 現行Prototype Bの斥力環は、後続検討で随伴robot側のmoduleへ移せる候補。ただしPrototype B試遊前には実装しない。

## Post-prototype journey and daily-life references

- 2026-07-31、ユーザーは漫画『少女終末旅行』『世界が終わっても生きるのって楽しい』『ウスズミの果て』を、世界観、旅、生活感の参考として追加した。
- 抽出する軸は、終末の大事件そのものではなく、文明の残骸を移動し、食べる、直す、補給する、拾う、休む、小さな発見を語るという日常の手触り。
- 暗く静かな世界でも「生きる行為そのものが楽しい」という感触を、探索resource、野営、遺物解析、随伴robotとの短い反応へ翻訳できる。
- 漫画『リビルドワールド』も参考に加え、危険地帯で旧世界の遺物を回収し、解析、換金、装備更新、次の探索資金へ循環させる生活型ハクスラの経済loopを抽出する。
- 高性能な相棒／案内役を置く場合も、戦闘と進路の最終判断は主人公＝playerに残す。
- 固有の人物、乗り物、景観、台詞、出来事は模倣せず、旅と生活をgame loopへ接続する情報構造だけを参照する。

## Prototype B confirmed feedback

- 2026-07-30、ユーザーはprototype 0.1を「ゲームとして一応出来上がっている」点は評価しつつ、約20点と評価した。
- 常時自動遠隔攻撃はタワーディフェンス的で面白くなく、攻撃、防御、item、skill／魔法を自分で使いたい。
- mapは固定arenaではなく、自characterをほぼ中心にしてscrollする。
- キャラクターとobjectを16×16×16の着色boxから作り、固定斜め見下ろしでrealtime 3D描画する案を採用候補とする。
- Elonaが、ルナティックドーンと並んで目指す自由世界の中核に近い。
- Undertaleからは弾幕の模倣ではなく、敵の事情、非戦闘解決、行動結果を世界が覚える仕組みを参照する。
- 2026-07-30、ユーザーは上記を反映した次のPrototype B実装を承認した。
- 追加参考として、ラグランジュポイントの武器system、SF設定、soundが高く評価された。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsのcyberpunk世界観も好みとして追加された。
- 漫画『上野さんは不器用』は、謎のSF itemと、その原理・用途を妙に具体的に解説する発想源の候補として追加された。

## Prototype B working hypothesis

- 企画の合成式は「Elonaの生活自由度 × ルナティックドーン／CardWirthの依頼人生 × Diablo／イニシエダンジョン／RoLの手動ハクスラ × Undertale／moonの世界反応」。
- 長く遊べる核はcontent量ではなく、依頼、装備、敵への対処、帰還判断、世界履歴が相互作用することに置く。
- AI生成は完成画像より、schema検査できるVoxelRecipe、名前、噂、依頼候補へ使う。
- 本編規模へ広げる前に、renderer性能と10分のgameplay loopを同じPrototype Bで判定する。
- 妖怪とcyberpunkを二者択一にせず、「辺境に残る旧文明技術／電脳怪異」という接続余地を残す。
- SF itemは単なる数値modifierではなく、使用法と副作用がplayerの行動を変える道具にする。
- 参考作の固有設定、台詞、画面、音楽を複製せず、system上の役割と情報構造だけを抽出する。

## Prototype B local evidence

- 2026-07-30、既定runtimeをPrototype B「辺境遺物録」へ切り替えた。
- Prototype 0.1は`?prototype=0.1`で比較起動でき、Phaser chunkはそのrouteだけで読む。
- 16³ voxel core、validator、hidden-face mesher、player／武器2／敵4／object4の11 recipesを実装した。
- Three.js fixed orthographic renderer、3,600×1,800 world、camera follow、ground instancing、voxel burst、attack／guard／relic ringを実装した。
- Prototype B simulationは手動combat、二武器、guard／just guard、回避、relic、healing、loot 6、quest三結果を持つ。
- Web Audioで探索pulse、危険layer、武器、guard、回避、遺物、item、結果cueを実装した。
- Vitest 85/85、strict TypeScript、Vite production buildが合格した。
- 対峙用の二つの鍵をtrigger圏外で回収できる配置へ直し、初期地点から敵を残した連続移動testで回収可能性を固定した。
- 対峙modalから探索へ戻って選択を再開できるようにし、縦画面pause、入力順に依存しない防御／回避、keyboard focus、音声scheduler復帰を修正した。
- 852×393相当browserで、開始、依頼受注、武器切替、scroll、敵target、敗北、再開を確認した。初期画面60fps、約25 calls、約18k triangles、console error／warning 0件。
- browserの短いArrow keypressが30Hz tick間で失われたため、移動tapを一tick queueする入力改善を加え、x=430→435の移動を再確認した。
- 戦闘せず最初のlootへ進むと屑鉄猟犬に敗北した。手動対応が必要な設計は確認できたが、初回難易度は実機試遊で再評価する。
- local browserの10分通し、iPhone 16 Pro実機、PWA install／offline、Prototype B saveは未確認。

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
