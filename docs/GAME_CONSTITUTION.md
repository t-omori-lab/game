# 作品憲法 v0.1

Last updated: 2026-07-31  
Status: 方針確認用。`確定要求`と`設計提案`を分け、未承認の提案を作品設定として固定しない。

## 体験の一文

`設計提案`

> 明るく生活の続く崩壊世界を、自分で目的を選ぶ旅人として歩き、手動actionと原理のあるloot buildで危機へ対処し、その結果が次の旅の世界と選択肢を変える放浪ハクスラ。

## 確定要求

- iPhone 16 Proを基準端末とするsmartphone-first。将来はSteam公開も視野に入れる。
- 常時自動遠隔攻撃を中心にせず、移動、攻撃、防御、回避、item、skill／同行者支援をplayerが使う。
- cameraは固定俯瞰、mapは主人公を中心にscrollする。
- 崩壊世界でも画面と基調感情は暗くしすぎない。自然、生活、修理、色、好奇心、乾いたhumorを残す。
- 主人公、同行者、地面、建物を含む画面全体を、商業HD-2D作品を基準に美しくする。voxelは目的ではなく、整合するなら別表現も比較する。
- 同行者は開始時の固定相棒ではない。world内で発見・加入し、人、robot、犬、猫、動物型robotなどから交代できるrosterを目指す。
- 世界、人物、遺跡、item、monster、visual、audioは開発時に生成を活用する。ただし世界法則、科学的／技術的制約、gameplay上の役割、権利情報、人間の採否を持たせる。
- 参考作品の固有設定、人物、台詞、画面、音楽を複製せず、好みの構造だけを抽出する。

## 提案中の二つの核

別々に試遊し、別々に承認する。

1. **瞬間〜一遠征の核** — 手動actionの手触りと、拾う・比較する・組む・試すが明確に異なるloot／build。
2. **複数遠征の独自性** — 自分で目的を選ぶ放浪と、以前の帰還・対処・死亡・売買を見た目と遊びで記憶するworld。

仮称「世界記憶型・放浪生活ハクスラ」はこの二軸を統合する設計案であり、正式genre名や設定の確定ではない。

## Visual constitution

- 最終cameraの小画面でsilhouette、向き、予兆、interactionが最初に読めること。
- 固定cameraを活かし、dynamic character／item／effectと、高品質にbakeした地面／建物／遠景を統合する。
- 鮮やかさはneonやbloomの量ではなく、自然光、material差、奥行き、生活痕跡、色の意味、animation、音の一貫性で作る。
- 主人公は武器を外しても識別でき、同行者は機能、感情、加入経緯が形と動きに現れる。
- `StyleProfile`を全assetの正本にし、同じcamera、scale、光、palette、material、摩耗、edge、LOD、effect密度で生成・検査する。
- true HDR／WebGPUは対応端末のenhancement。美しさと操作性をWebGL2／SDRでも成立させる。

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

- 常時自動攻撃を眺めるだけのarenaへ戻す。
- 数値だけが増える完全上位互換lootを量産する。
- 一本道を進み、最後のmodal三択だけで自由度を表現する。
- 一発生成した3D assetや設定文を、rig、性能、由来、権利の検査なしに正本へする。
- renderer、voxel、HDR、生成AIのdemoをgameplay完成と呼ぶ。
- local／desktop browser合格をiPhone実機合格や公開完了と呼ぶ。

## 次に証明する三gate

### Gate A — Hack-and-build proof

iPhone実機で、攻撃、guard、回避が気持ちよく、最低2・目標3のbuildが間合い、timing、resource判断を変える。lootの比較、装備、分解が小画面で苦にならない。

### Gate B — Roam-and-memory proof

同じ小mapに二つ以上の同時目的を置き、playerが依頼、噂の遺物、遺品奪還などから選び、撤退／放棄もできる。一回目の選択が二回目90秒以内に外見と遊びを変える。

### Gate C — Visual benchmark

まず主人公＋同行者blockout＋小背景vignetteだけを同じcameraと照明で制作し、literal high-density voxel、semantic voxel surface、stylized low-polyを比較する。方式決定後、勝った一案だけで開始町一画面を仕上げる。これはA／Bと並行でき、visual未完成を理由にcore testを止めない。

内部gameplay proofの必須条件はA＋B。ユーザーへ目標品質の完成候補として公開する版はA＋B＋Cを必要とする。CはA／Bの実装順を塞がないが、商業級visual達成の主張と完成候補公開を塞ぐ独立gateである。

## ユーザー判断が必要な六項

1. 瞬間の核を「近接主体の手動hack-and-slash＋module build」として進めてよいか。
2. 長期の独自性を「自由な放浪＋世界の記憶」として進めてよいか。
3. 主人公を固有人物一人にするか、複数旅人の人生が巡る形式にするか。
4. 死を完全死亡、行方不明／救出、重傷復帰のどれにするか。
5. 「残響基盤」を世界法則の比較案として育てるか、妖怪をより独立した存在にするか。
6. 夏の同行者を一体の加入proofに留めるか、低costの二体目を加えて交代まで証明するか。

詳細設計、根拠、schema、技術候補は[DESIGN_SYNTHESIS.md](./DESIGN_SYNTHESIS.md)を参照する。
