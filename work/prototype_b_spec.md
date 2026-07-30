# Prototype B Specification

## Pitch

正体不明のSF遺物が残る小さな辺境を旅し、依頼を選び、装備を拾い、異形を倒すか別の方法で退け、その履歴を町へ持ち帰る固定俯瞰ボクセル・アクションRPG。

世界観はPrototype Bで確定しない。遺物の正体を、旧文明機械、電脳怪異、妖怪と技術の混成のいずれにも展開できる抽象dataで保つ。

## Ten-minute route

1. 町で「廃屋の異形」と未分類遺物について二つの噂と依頼を受ける。
2. 刃物と衝撃武器を持ち替え、遺物機能一つ、回復itemを使い分ける。
3. 分岐路を探索し、通常敵、宝箱、採取物に遭遇する。
4. 廃屋で名付き異形と対峙する。
5. 破壊、鎮静、接続／取引のいずれかで解決する。
6. 町へ戻り、戦利品と選択に応じた短い反応を見る。

## Required player verbs

- 移動
- 基本攻撃。武器ごとに速度、間合い、impactを変える
- 溜め攻撃は次slice候補
- guard／just guard
- direction＋guardによる回避
- skill／魔法
- quick item
- 調べる／話す
- 装備を拾う、比較する、持ち替える
- 帰還する、先へ進む

## Content budget

- 連続scroll map: 町、分岐路、廃屋
- player voxel model: 1
- weapon: 刃物、衝撃武器
- skill／魔法: 1
- consumable: 1
- normal enemy: 3
- named enemy: 1
- meaningful loot: 6
- quest outcome: 3
- procedural sound: 探索loop、戦闘layer、武器2種、guard、遺物、item、結果stinger

## Relic information model

各SF itemは、少なくとも次の情報を持つ。

- 呼称とcatalog番号
- 実際のgameplay効果
- 世界内で信じられている作動原理
- 副作用または誤作動
- 発見者／使用者の短い所感
- 確認済み情報と仮説の区別

AI生成を追加する場合も、この構造へ収め、固有作品の文章や語り口を模倣しない。

## Visual direction

- 固定角度のorthographic camera
- 16×16×16 authoring gridのvoxel character／object
- 1character 4〜6色、silhouette優先
- 上面、左右側面で明度を変えた面色
- 低解像度world renderをnearest-neighbor拡大
- crispなHTML/CSS HUD
- 装備、interactive object、危険予告だけaccent outline
- dynamic shadow mapは初期版で使わず、blob shadowとbaked shadingを使う
- cyberpunk表現をneon一色にせず、土、錆、暗い鉱物色の中へsignal cyanと警告amberを限定使用する

## Sound direction

- 8bit／FM音源の記憶を直接模倣せず、短い波形、noise、低いpulseを用いた独自のretro science音響にする。
- 刃物は短く硬い高域、衝撃武器は遅い低域、guardは金属的な返り音で判別する。
- 未分類遺物には一定でないpitch揺れと通信noiseを使う。
- mobile browserの制約上、最初のplayer入力でaudio contextを開始する。
- 音楽は長い完成曲より、探索layerと危険layerを状態に応じて重ねる。

## Technical boundaries

- TypeScript、Vite、PWA、save、deterministic simulationを継続する。
- world renderはThree.jsへ移行する。
- simulationの平面`x/y`をrenderの`x/z`へ対応し、renderの`y`は高さに使う。
- camera位置はsave／simulation stateへ含めない。
- voxelは隠れ面除去後の単一geometryへ変換する。
- 同一objectはinstancingまたは共有geometryを使う。
- collisionとgameplayは2D平面で判定し、voxel単位physicsは行わない。
- runtime AIや外部APIをPrototype Bの必須条件にしない。

## Acceptance criteria

- iPhone 16 Pro相当の横画面で開始から依頼結果まで操作できる。
- 基本攻撃、防御、回避、魔法、itemの成否が視覚的に判別できる。
- 刃物と衝撃武器で間合い、速度、impactが明確に異なる。
- playerは画面中央付近を保ち、mapが連続してscrollする。
- 名付き異形を三通りの方法で解決でき、町の反応が変わる。
- 画面を見なくても、二つの武器、guard、遺物起動を音で概ね判別できる。
- 10分後、playerが「武器の違い」と「名付き異形のこと」を説明できる設計になっている。
- unit test、strict TypeScript、production buildが合格する。
- iPhone実機性能、PWA install、offlineは未確認なら未確認として残す。

## Implementation evidence: 2026-07-30

### Confirmed locally

- 16³ voxel grid、validator、hidden-face mesher、11 recipesを実装。
- Three.js fixed orthographic renderer、player-follow camera、3,600×1,800 scroll worldを実装。
- 手動攻撃、guard／just guard、回避、relic、item、武器持替、敵telegraph、loot 6種を実装。
- 町、三叉路、廃区、名付き反響体、破壊／鎮静／接続、帰還結果を実装。
- Vitest 85件、strict TypeScript、production buildが合格。
- 初期地点から連続移動して鎮静／接続用遺物を対峙前に回収できるroute testを追加。
- 対峙選択から探索へ戻る導線、縦画面pause、入力順非依存の防御／回避、keyboard focus、音声scheduler復帰を修正。
- 852×393相当browserで開始、依頼受注、武器切替、scroll、敵接近、敗北、再開を確認。60fps表示、console error／warning 0件。
- 比較用Prototype 0.1が`?prototype=0.1`で起動する。

### Pending

- local browserで開始から三結果・町帰還までの通しE2E。
- iPhone 16 Pro実機での10分操作、sound判別、performance、発熱。
- HTTPS PWA install、offline再起動。
- Prototype B結果のsaveと次回world反映。
