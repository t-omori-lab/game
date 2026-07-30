# Game Brief: 辺境遺物録（仮）

Last updated: 2026-07-31

## Product promise

正体不明の遺物が残る辺境を自由に歩き、自分で武器、防御、道具を使い、敵を倒すか別の方法で対処し、その選択が次の旅へ巡る生活型ハクスラを作る。

豪華な素材量ではなく、武器の手触り、依頼、探索、遺物の奇妙な用途、世界反応の組合せで長く遊べることを目指す。

## Prototype history

### Prototype 0.1「境界調査録」

- 固定arena、自動遠隔攻撃、3択強化、最小WorldLegacyを実装。
- 技術原型としては完成したが、ユーザー試遊は約20点。
- 常時自動攻撃がタワーディフェンス的で、求める放浪・ハクスラ体験と違った。
- `?prototype=0.1`で比較用に保持する。

### Prototype B「辺境遺物録」

local実装済み:

- 町―三叉路―聴取廃区を連続scrollするworld。
- fixed orthographic cameraと16³ voxel character／object。
- 測量刃、杭打機、guard／just guard、回避、斥力環、回復item。
- 通常敵3種、名付き反響体1体、loot 6種。
- 破壊、鎮静、接続の三結果と町への帰還。
- 効果、原理仮説、副作用、使用者メモを持つSF遺物dossier。
- procedural exploration／danger／combat sound。

未実装:

- Prototype B結果の永続saveと次回world反映。
- 宿敵が死亡旅人の装備を拾い、次回に奪還する仕組み。
- 複数依頼、生活技能、経済、NPC関係、長期build。
- AIによる検査済みcontent pipeline。
- iPhone 16 Pro実機の10分性能合格、HTTPS PWA install、Steam包装。

## Confirmed taste signals

- ルナティックドーン、Elona、Kenshi、Oblivionのように、放浪し、生き方や目的を自分で選べる。
- 選ばれた英雄ではない人物から始まり、世界がplayerの外でも続いている。
- Diablo、おっさん or die、Metal Maxのように、装備、能力、乗り物を組み合わせて強くなる。
- Undertaleのように、敵を倒す以外の対処と、その結果への世界反応がある。
- ラグランジュポイントのように、武器system、SF設定、soundが一体で記憶に残る。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsにある、監視、network、身体拡張、都市の裏側という題材が好みに合う。
- 『少女終末旅行』『世界が終わっても生きるのって楽しい』『ウスズミの果て』のように、文明の残骸を旅しながら、食事、修理、補給、休息、小さな発見に生活の楽しさが宿る。
- 『リビルドワールド』のように、危険地帯の旧世界遺物を回収し、解析、換金、装備更新、次の探索へ循環させる。
- 謎のSF道具を妙に具体的な原理と副作用で説明する面白さがある。
- 計算で描くvoxel、線、円弧、粒子を中心にしつつ、画面として美しい。

参考作の固有設定、文章、人物、画面、音楽は複製せず、system上の役割と情報構造だけを抽出する。

## Prototype B playable loop

### First 30 seconds

1. 町の依頼板を調べる。
2. 自分で移動し、測量刃を振る。
3. loadoutをtapして杭打機へ持ち替え、速度、間合い、impact差を知る。
4. 敵の予兆にguard、just guard、方向＋guardの回避で対応する。

### Ten-minute route

1. 町で聴取廃区の未分類信号を受注する。
2. 三叉路までの敵を避けるか倒す。
3. 6種のlootから武器強化、回復、遺物強化、特殊な鍵を拾う。
4. 廃区で名付き反響体《オリソン》と対峙する。
5. 破壊、無音鈴による鎮静、信号鍵による接続から選ぶ。
6. 町へ戻り、異なる帰還記録を見る。

### Multiple runs

次sliceで実装する:

- 前回の対処が町の噂、価格、敵、信号のいずれかを変える。
- 死亡した旅人の装備を宿敵が拾う。
- 次の旅人は装備を奪還、回避、取引できる。
- 前回の結果は次回開始90秒以内に見える。

## Current content budget

- 拠点1、分岐地域1、廃区1。
- player voxel 1、武器voxel 2。
- 通常敵3、名付き異形1。
- meaningful loot 6、回復item 1、active relic 1。
- quest outcome 3。
- procedural sound: 探索、危険、武器2、敵予兆／衝撃、guard、just guard、回避、遺物、item、結果。
- 基準端末はiPhone 16 Pro横画面。

## Theme abstraction

正式themeは未決定。内部では次の対応余地を残す。

| Internal concept | 妖怪寄り | 電脳怪異／旧文明寄り |
|---|---|---|
| traveler | 旅人、退魔師、流れ者 | 調査員、運び屋、辺境技師 |
| anomaly | 妖怪、怪異、付喪神 | 反響体、暴走機械、network残留人格 |
| relic | 札、器、記憶 | 未分類機器、身体拡張、protocol鍵 |
| contract | 退治、封印、回収 | 調査、停止、接続、回収 |
| history | 噂、祟り、土地の記憶 | log、監視記録、地域network |

## Visual direction

- fixed isometric寄りのorthographic camera。自由回転しない。
- 16×16×16 authoring grid、1character 4〜6色、silhouette優先。
- hidden faceを除去したgeometryをrealtime描画する。
- low-resolution world canvasをnearest-neighbor拡大し、HUDはcrispなHTML/CSS。
- 土、錆、暗い鉱物色をbaseに、signal cyan、warning amber、danger redだけを限定使用する。
- dynamic shadow mapではなくblob shadow、面色、fog、attack arc、ring、voxel burstを使う。
- 「neon on black」だけの既視感あるcyberpunkへ寄せない。

## Relic information model

各遺物は次を持つ。

- 呼称とcatalog番号
- 実際のgameplay効果
- 世界内で信じられている作動原理
- 副作用または誤作動
- 発見者／使用者の短い所感
- 確認済み情報と仮説の区別

## AI boundary

- 戦闘判定、数値、報酬、world stateへruntime生成AIを使わない。
- 名前、噂、依頼、VoxelRecipe、遺物解説、来歴の候補生成に使う。
- 出力はschema検査と人間の採否を通したJSONだけを収録する。
- 固有作品の文体模倣、クライアントへのAPI key、無検査live生成は初版対象外。

## Post-prototype concept: companion robot

Prototype Bの評価後に検討し、現行scopeへは追加しない。

- 主人公: 移動、回避、近距離物理、遠距離物理の主体。
- 随伴robot: 機械的／技術的遺物の解析、module組込み、特殊技／大技。
- robotの能力は使用回数またはenergy制とし、補給、修理、充電、遺物分解などの回復判断を作る。
- 現行の斥力環は、robot moduleへ移行できる最初の候補。
- 目的は自動戦闘を増やすことではなく、playerの通常actionと有限resourceの大技を分けること。
- 随伴機の参考感覚はあるが、既存作品の外見、性格、台詞、設定は模倣しない。

この相棒案は、終末的な辺境でも「生きることが楽しい」旅の生活感と接続する。戦闘以外にも、充電、修理、遺物の鑑定、野営時の短い反応を通じ、移動そのものを一回の冒険にする。

## Success gates

- 30秒以内に説明なしで移動と手動攻撃が成立する。
- 90秒以内に二武器の差またはguard／回避の成功を体感できる。
- 10分以内に名付き異形へ到達し、三つの対処の意味を理解できる。
- 遊んだ後に「武器の違い」と「オリソンへ何をしたか」を説明できる。
- 一回の結果が次回90秒以内に見える。
- iPhone 16 Proで10分間、操作不能や継続的な30fps未満がない。
- 15遠征でクラッシュ、進行不能、save破損が0件。
- 8分遊んだ本人が自発的に二回目を始めたくなる。

## Non-goals for the first release

- 広大な完全seamless world。
- 全NPCの常時生活simulation。
- 拠点建築、複雑なcraft、長文AI自由会話。
- multiplayer。
- App Store、Google Play、Steam実績、Steam Cloudの同時対応。
