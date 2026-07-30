# Project Context: ゲーム開発

Last updated: 2026-07-30  
Status: active

## Purpose

仕組みと遊び方で長く遊べる、スマホ対応の小さな永続世界ローグライトを開発する。初版はブラウザ／PWAで反復し、ゲーム核の合格後にSteam向けdesktop包装を検討する。

## Confirmed current state

- iPhone横画面向けのprototype 0.1「境界調査録」をローカル実装済み。
- 30Hz固定の決定論的simulationに、移動、敵spawn／追跡、自動射撃、脈動スキル、damage、XP、3択強化、8分boss、勝敗がある。
- Phaser表示には、計算描画した地図、敵3種＋boss、軌跡、討伐印、警戒輪、touch controls、開始／強化／終了画面がある。
- 遠征終了時、討伐跡、累計遠征、最高討伐数を`WorldLegacy v1`へ記録し、次の遠征へ最大12件の跡を継承する。
- PWA shell、初回install時のbuild asset precache、checksum付きA/B保存、IndexedDBとmemory fallbackを実装済み。
- 2026-07-30時点でunit test 36件、strict TypeScript、production buildが合格。852×393相当のブラウザで開始、戦闘、強化、縦画面案内を確認済み。

## Boundaries

- これは戦闘と最小継承を検証する原型であり、完成ゲームではない。
- 世界観、主人公、妖怪／荒野案は未確定。コードは抽象語彙を使う。
- AI生成はまだruntimeへ接続していない。戦闘核の合格後、schema検査済みの名前、噂、依頼、形状候補へ限定して追加する。
- 拠点、依頼、遺物奪還、宿敵、途中save、音、Steam wrapperは未実装。
- iPhone 16 Pro実機での10分操作、performance、PWA install／offlineは未確認。
- public deploy、Git remote、push、Steam公開は行っていない。

## Canonical handoff

- Next work: `docs/NEXT_TASKS.md`
- Real-world results: `docs/OUTCOMES.md`
- Reusable observations: `docs/LEARNINGS.md`
