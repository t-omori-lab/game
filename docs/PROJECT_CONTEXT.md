# Project Context: ゲーム開発

Last updated: 2026-07-31  
Status: active  
Phase: Prototype B public playable

## Purpose

仕組みと遊び方で長く遊べる、スマホ対応の生活型ハクスラを開発する。短い依頼と手動戦闘を入口に、装備、異形への対処、帰還結果が次の旅へ巡る小さな自由世界を目指す。初版はブラウザ／PWAで反復し、ゲーム核の合格後にSteam向けdesktop包装を検討する。

## Confirmed current state

- 既定起動をPrototype B「辺境遺物録」へ切り替えた。Prototype 0.1「境界調査録」は比較用に`?prototype=0.1`で起動できる。
- Prototype Bは、町―三叉路―聴取廃区を連続scrollする3,600×1,800のworld、固定斜め俯瞰camera、16³ authoring grid由来のrealtime voxelを持つ。
- 30Hzの決定論的simulationに、手動攻撃、guard／just guard、回避、遺物skill、回復item、武器持替、敵予兆、loot、地形collisionを実装した。
- 武器は、速く間合いの長い測量刃と、遅く高威力・高knockbackの杭打機の二系統。
- 通常敵3種と名付き反響体1体があり、名付き反響体は破壊、鎮静、接続の三経路で解決できる。結果を町へ報告すると異なる帰還記録が出る。
- lootは6種。各SF遺物を、効果、世界内の原理仮説、副作用、使用者の所感に分けて表示する。
- 音はWeb Audioによる独自のprocedural soundscapeで、探索pulse、危険layer、武器2種、予兆、guard、回避、遺物、item、三結果を分けた。
- 2026-07-31時点でVitest 85件、strict TypeScript、production buildが合格。
- 公開repositoryは`https://github.com/t-omori-lab/game`。GitHub Pagesの公開URLは`https://t-omori-lab.github.io/game/`。
- GitHub Actions run #3でcommit `3375470`のbuild／deploy成功を確認し、公開URL、manifest、service worker、共有画像がHTTPSで200応答することを確認した。
- 公開URLをChromeで開き、タイトル、縦向き案内、PWA install候補の表示を確認した。
- 必要遺物は対峙開始前に連続移動で回収できる配置へ修正し、取り逃した場合も選択画面から探索へ戻り、反響体の近くで開き直せる。
- 防御と移動は押す順にかかわらず一度だけ回避へなり、保持中は防御へ戻る。縦画面／background中はsimulationと操作を止め、復帰時の入力と音の蓄積をresetする。
- 852×393相当のlocal browserで、60fps表示、開始、依頼受注、武器切替、scroll移動、敵接近、敗北、再開を確認。観測値は初期画面で約25 draw calls／約18k triangles。browser consoleのerror／warningは0件。

## Creative reference notes

- 探索場面のBGMイメージとして、MYUKKE.「Go, Go, Heartbreaker!」を参照する。
- 参照するのは、移動を前へ押すテンポ感、高揚感の中にある切なさ、探索を「旅の時間」として感じさせる感情設計。旋律、編曲、音色は直接模倣せず、オリジナルのprocedural music／soundscapeへ翻訳する。

## Boundaries

- Prototype Bは新しい遊びの核を評価する原型であり、完成ゲームではない。
- local mobile相当browserの結果は、iPhone 16 Pro実機性能、発熱、touch感触、音量balance、Safari/PWA適合の証明ではない。
- 三つの依頼結果はsimulation testで到達確認済みだが、local browserで開始から帰還までの10分通し試遊は未完了。
- Prototype 0.1の`WorldLegacy v1`、A/B save、IndexedDBはrepository内に残るが、Prototype Bの依頼結果／途中状態にはまだ接続していない。
- PWA shellは公開HTTPS上で配信され、Chromeのinstall候補までは確認済み。iPhoneでのホーム画面追加、offline再起動、Prototype B asset cacheは実機未確認。
- 世界観、舞台、主人公、妖怪と電脳怪異の比率は未確定。現在のSF辺境は着せ替え可能な仮設定。
- AI生成はまだruntimeへ接続していない。後続ではschema検査済みのVoxelRecipe、名前、噂、依頼、遺物解説候補へ限定する。
- Git remoteとGitHub Pagesへのpublic deployは完了した。Steam公開は行っていない。

## Canonical handoff

- Next work: `docs/NEXT_TASKS.md`
- Real-world results: `docs/OUTCOMES.md`
- Reusable observations: `docs/LEARNINGS.md`
