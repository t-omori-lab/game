# 作品憲法 v0.3

Last updated: 2026-08-01  
Status: v0.3。`確定要求`と`設計提案`を分け、詳細未検証の案を作品設定として固定しない。

## 体験の一文

`設計提案`

> 自然に呑まれた現代都市を、自分で目的を選ぶ旅人として歩く。通常戦闘は装備に任せ、位置取りと大技の判断を自分で担い、遺物を持ち帰って選んだ土地に拠点を築く。その旅と暮らしが次の世界を変える放浪ハクスラ。

## 確定要求

- visualのNorth Starは、PC playを前提に端末性能を先に制限しない先端的な最高品質master sceneとする。iPhone 16 Pro対応は必須だが、PC masterから自動／手動quality tierで縮退させ、制作時の表現上限にはしない。将来はSteam公開を視野に入れる。
- 移動、接敵、位置取り、撤退はplayerが行い、通常戦闘は自動、大技skillは手動で発動する半自動戦闘を目標にする。
- 固定arenaで常時自動遠隔攻撃を眺める遊びには戻さない。自動戦闘は、playerが作った位置関係、装備のtarget条件、武器build、有限resourceの判断を実行する層として使う。
- cameraは固定の斜め俯瞰、mapは主人公を中心にscrollする。keyboard、virtual stick、将来のgamepadの移動入力はscreen-relativeとし、上入力は常に画面上方へ移動させる。
- 人類は激減している。識別可能な現代都市、道路、鉄道、住宅、商業／公共施設が、植物、水、動物、新しい生活に侵食・転用されたpost-apocalypseを基調にする。
- 崩壊世界でも画面と基調感情は暗くしすぎない。自然、生活、修理、色、好奇心、乾いたhumorを残す。
- 既存の遺構を復旧するか、条件の合う土地を選び、自分の拠点を築けるようにする。配置自由度と建築粒度は試遊で決める。
- visual North Starはconcept C。固定俯瞰のdiorama構図、高密度micro-voxel／上質なpixel-artの知覚、PBR素材、光と接地、HD-2D的な奥行きとボケ味を、realtime 3D actorと固定camera用のbaked／3D hybrid worldで再現する。
- 主人公と同行者はhero assetとして特別扱いし、精密なsilhouette、顔／sensor、衣装、装備、material、part変形、signature motionまで作る。背景と同じ生成密度や単一merged voxel meshへ品質上限を合わせない。
- 最初の主人公benchmarkは女性型preset。ただし固定heroineに限定せず、種族、性別／gender表現、体格、顔、髪、surface／色、身体拡張、装備を選ぶcharacter creationを作品の前提にする。genderや体格を、能力、職業、装備制限へ自動的に結び付けない。
- 主人公と武器の造形はpost-apocalyptic SFとし、中世fantasy風のcoat、甲冑、装飾剣、理由のない発光刃をdefaultにしない。動力、作用部、sensor、冷却、交換部品、修理痕のいずれかから作動原理を読ませる。
- 同行者は開始時の固定相棒ではない。world内で発見・加入し、人、robot、犬、猫、動物型robotなどから交代できるrosterを目指す。
- 世界、人物、遺跡、item、monster、visual、audioは開発時に生成を活用する。ただし世界法則、科学的／技術的制約、gameplay上の役割、権利情報、人間の採否を持たせる。
- 参考作品の固有設定、人物、台詞、画面、音楽を複製せず、好みの構造だけを抽出する。

## 確認済みの二つの核

上位方向は確認済み。実装の手触りは別々に試遊し、別々に採否を決める。

1. **瞬間〜一遠征の核** — 自動通常戦闘と手動の位置取り／大技を組み合わせ、拾う・比較する・組む・試すで交戦規則まで変わるloot／build。
2. **複数遠征の独自性** — 自分で目的と居場所を選ぶ放浪、拠点づくり、以前の帰還・対処・死亡・売買を見た目と遊びで記憶するworld。

仮称「世界記憶型・放浪生活ハクスラ」はこの二軸を統合する設計案であり、正式genre名や設定の確定ではない。

## Visual constitution

- concept CのPNGは完成assetや実機screenshotではない。採用するのは、characterの画面占有、固定camera、空間の密度と抜け、光／material／DoFの関係であり、scroll、occlusion、animation、戦闘effect、装備交換の成立するrealtime画面で合格させる。
- PC Ultra masterを先に定義し、WebGPU、half-float lighting、HDR／wide color、PBR、baked indirect light、高解像度surface、選択的post effectを同じbenchmark sceneで比較する。名称ではなく最終画面の知覚品質で採否を決める。
- 最終cameraの小画面でsilhouette、向き、予兆、interactionが最初に読めること。
- 固定cameraを活かし、dynamic character／item／effectと、高品質にbakeした地面／建物／遠景を統合する。
- ボケ味は主人公周辺のactive gameplay planeを常に鮮明に保ち、近景とdeep backgroundの奥行き分離に使う。敵の予兆、interaction、routeを画面全体のblurで隠さない。
- 鮮やかさはneonやbloomの量ではなく、自然光、material差、奥行き、生活痕跡、色の意味、animation、音の一貫性で作る。
- 主人公は武器を外しても識別でき、同行者は機能、感情、加入経緯が形と動きに現れる。
- `StyleProfile`を全assetの正本にし、同じcamera、scale、光、palette、material、摩耗、edge、LOD、effect密度で生成・検査する。
- PC masterで成立したlight、material、character、compositionを正本とし、WebGL2／SDRとmobileは機能を順に削るfallbackとする。fallbackでもgameplayの読みやすさは失わない。

## Generation constitution

```text
遊ばせたい判断
→ gameplay contractと因果graph
→ world法則・物理budget・空間
→ AssetDNA／StyleProfile
→ AI／procedural候補
→ deterministic検証とsimulation
→ 最終cameraで人間が採否
→ 承認済みcontentだけを収録
```

- AIは候補を増やす。戦闘判定、数値、save、報酬、因果、合否の権威にはしない。
- 説明文、形、音、性能、入手場所、worldへの結果を同じ原因から派生させる。
- gameplay contractにも、承認済みの生活／環境演出目的にも接続しない生成物は「装飾的孤児」として不採用にする。
- runtime live生成は初版へ入れない。

## 絶対にしないこと

- 固定arenaで常時自動遠隔攻撃を眺めるだけの遊びへ戻す。
- 自動戦闘だけで、位置取り、大技、build、撤退の判断まで消す。
- 数値だけが増える完全上位互換lootを量産する。
- 一本道を進み、最後のmodal三択だけで自由度を表現する。
- 一発生成した3D assetや設定文を、rig、性能、由来、権利の検査なしに正本へする。
- renderer、voxel、HDR、生成AIのdemoをgameplay完成と呼ぶ。
- local／desktop browser合格をiPhone実機合格や公開完了と呼ぶ。

## 次に証明する三gate

### Gate A — Position-and-build proof

iPhone実機で、移動だけで通常交戦が理解でき、大技を使う瞬間に明確な判断と手応えがある。最低2・目標3のbuildが、target取得、間合い、移動、攻撃周期、resource判断を変える。格下は自動処理できる一方、名付き敵は立ち止まり／大技なしでは安定して倒せず、位置変更、撤退、大技の判断を要求する。lootの比較、装備、分解が小画面で苦にならない。防御、item、target指定、同行者命令をどこまで手動に残すかもここで比較する。

### Gate B — Roam／settle／remember proof

同じ小mapに、性質の異なる拠点候補地を二つの自己目的として置く。playerはどちらを調査／確保するかを選び、途中撤退もできる。既存遺構の復旧または新規設営を選び、持ち帰った資源で機能moduleを一つ導入する。その選択が二回目90秒以内に外見と遊びを一件ずつ変える。

### Gate C — Visual benchmark

Concept Cの選定により、三表現の方向比較は終了した。次は高密度micro-voxel知覚のrealtime 3D character、SF装備、固定俯瞰の光とDoF、自然侵食都市を、主人公＋同行者candidate＋小背景vignetteで実装する。PC Ultraのactual gameplay captureがconcept Cの構図、silhouette、material、奥行き、ボケ味へ到達した後、同じassetとcameraからmobile tierを派生する。これはA／Bと並行し、visualとgameplayをどちらも後回しにしない。

内部gameplay proofの必須条件はA＋B。ユーザーへ目標品質の完成候補として公開する版はA＋B＋Cに加え、save／migration／実機安定性のrelease durability合格を必要とする。CはA／Bの実装順を塞がないが、商業級visual達成の主張と完成候補公開を塞ぐ独立gateである。

## 次に詰める六項

1. 防御／回避、item、target指定、通常の同行者行動を、どこまで手動介入として残すか。
2. 拠点を任意地点へ細かく配置できる方式と、条件付き候補地を選ぶ方式のどちらから始めるか。
3. character creationした一人を継続するか、死亡／継承で複数旅人を巡らせるか。
4. 死を完全死亡、行方不明／救出、重傷復帰のどれにするか。
5. 人類激減と都市崩壊の原因、年代、地域、現在の共同体密度をどうするか。
6. 「残響基盤」、妖怪、旧文明技術の関係と、夏の同行者を加入proof／交代proofのどこまで作るか。

詳細設計、根拠、schema、技術候補は[DESIGN_SYNTHESIS.md](./DESIGN_SYNTHESIS.md)、character creationの分離とasset契約は[CHARACTER_CREATOR_CONTRACT.md](./CHARACTER_CREATOR_CONTRACT.md)を参照する。
