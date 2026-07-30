# Next Tasks: ゲーム開発

Last updated: 2026-07-31

## P0

- [ ] Prototype BをiPhone 16 Pro実機で10分通し試遊する。
  - 開始、依頼板、移動、二武器、guard／回避、遺物、item、loot、名付き反響体、帰還の順に確認する。
  - Done when: 操作不能、誤入力、文字、safe area、音の判別、発熱、fps低下、もう一度遊びたいか、100点中の評価を記録する。
- [ ] 実機結果を基に、最初の敵とtouch操作を一度だけ調整する。
  - 特に「移動しながら防御で回避」が説明なしで伝わるか、最初の屑鉄猟犬が練習相手として強すぎないかを見る。
  - Done when: 30秒以内に移動と手動攻撃が成立し、90秒以内に武器差またはguard成功を体感できる。
- [ ] Prototype Bの開始から三結果・町帰還までをbrowser E2Eで固定する。
  - Done when: 破壊、鎮静、接続の三経路で進行不能がなく、結果画面まで自動検査できる。
- [ ] Prototype Bの依頼結果をversion付きsaveへ接続する。
  - Done when: 再起動後に前回の対処と町の反応が見え、Prototype 0.1 saveを壊さない。

## P1

- [ ] Prototype B評価後、随伴robot案を一枚の役割表と紙上buildで検討する。
  - 主人公は移動、回避、近距離／遠距離の通常物理。robotは遺物解析、module組込み、回数制の特殊技／大技を担当する。
  - Done when: robotが自動戦闘化せずplayerのactionを補強すること、energy回復が探索判断になること、現行斥力環を移す価値が説明できる。
- [ ] 同じsystemへ「妖怪寄り」と「電脳怪異／旧文明寄り」のtheme profileを仮着せし、固有性、読みやすさ、展開可能性で比較する。
- [ ] 名前、噂、依頼文、VoxelRecipe、遺物解説を生成するoffline AI pipelineを設計する。
  - AI出力はJSON schema検査と人間の採否を通し、runtime判定へ直接つながない。
- [ ] 「死亡旅人の遺物を宿敵が拾い、次回に奪還する」永続sliceをPrototype Bへ移植する。
- [ ] HTTPS previewでホーム画面追加、offline再起動、Prototype B saveを確認する。

## P2

- [ ] 戦闘／依頼／継承loopが合格した後、ElectronまたはTauriによるSteam候補版を比較して包装する。

## Recently completed

- [x] Prototype 0.1を比較用のlocal commitとquery routeに保存 — 2026-07-30
- [x] 16³ voxel core、hidden-face mesher、11 recipeを実装 — 2026-07-30
- [x] Three.js固定俯瞰renderer、追従camera、連続scroll worldを実装 — 2026-07-30
- [x] 手動戦闘、二武器、guard／回避、遺物、item、lootを実装 — 2026-07-30
- [x] 町―三叉路―廃区、名付き反響体、三結果、procedural soundを実装 — 2026-07-30
- [x] Vitest 85件、strict TypeScript、production build、mobile相当browser QAを合格 — 2026-07-31
- [x] 分岐鍵の経路、探索へ戻る導線、縦画面pause、防御／回避、keyboard、音声復帰をreview修正 — 2026-07-31
