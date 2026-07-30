# Next Tasks: ゲーム開発

Last updated: 2026-07-30

## P0

- [ ] iPhone 16 Pro実機で10分試遊し、操作感とperformanceを記録する。
  - Safariを横向きにし、開始、左drag移動、脈動スキル、3択強化、死亡またはbossまで確認する。
  - Done when: 操作不能、誤入力、文字の小ささ、発熱、fps低下、もう一度遊びたいかを具体的に記録する。
- [ ] 実機結果を基に、最初の90秒と8分curveを1回だけ調整する。
  - Done when: 30秒以内に説明なしで操作でき、強化3方針のうち少なくとも2つが体感できる。
- [ ] 次の差別化sliceとして「死亡旅人の遺物を宿敵が拾い、次回に奪還する」を実装する。
  - Done when: 前回の死亡結果が次回90秒以内に見え、奪還／回避の選択が生じる。

## P1

- [ ] 同じゲームへ妖怪案と荒野案を仮着せし、視認性、固有性、展開可能性で比較する。
- [ ] 採用themeの名前、噂、依頼文、形状parameter候補を生成するoffline AI pipelineを設計する。
  - AI出力はJSON schema検査と人間の採否を通し、runtime判定には直接つながない。
- [ ] HTTPS previewを用意し、iPhoneのホーム画面追加、offline再起動、IndexedDB保存を確認する。

## P2

- [ ] 戦闘／継承loopが合格した後、ElectronによるSteam候補版を包装する。

## Recently completed

- [x] Prototype 0.1の企画核、architecture、判断記録を作成 — 2026-07-30
- [x] 決定論的simulation、ベクターfrontend、touch操作を実装 — 2026-07-30
- [x] PWA、堅牢なA/B保存、最小WorldLegacyを実装 — 2026-07-30
- [x] unit test 36件、production build、mobile相当browser QAを合格 — 2026-07-30
- [x] 標準構造を作成 — 2026-07-30
