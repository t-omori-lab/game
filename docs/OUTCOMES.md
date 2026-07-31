# Outcomes: ゲーム開発

Last updated: 2026-07-31

## Confirmed

- Prototype 0.1はユーザー試遊で「ゲームとして一応出来上がっている」点を認められた一方、評価は約20点だった。
- 主な不一致は、固定arena、常時自動遠隔攻撃、タワーディフェンス的な手触りであり、ユーザーは自分で攻撃、防御、item、skillを使うハクスラを求めている。
- ユーザーは、固定俯瞰voxel、scroll探索、手動戦闘、Elona／ルナティックドーン寄りのPrototype B実装を承認した。
- 公開repository `https://github.com/t-omori-lab/game`を作成し、Prototype Bを`https://t-omori-lab.github.io/game/`へ公開した。
- GitHub Actions run #3はcommit `3375470`のbuild／deployに成功した。公開URL、manifest、service worker、共有画像はHTTPSで200応答し、Chromeでタイトル、縦向き案内、PWA install候補を確認した。
- iPhone 16 Proの実機試遊で、double tapにより画面が拡大し、元の倍率へ戻せなくなる不具合が確認された。

## Pending confirmation

- [ ] Prototype Bのユーザー試遊評価がPrototype 0.1の約20点から改善するか。
- [ ] iPhone 16 Pro実機で10分間の操作・performance・発熱基準を満たすか。
- [ ] 二武器、guard／回避、遺物、三つの対処が説明なしで判別できるか。
- [ ] 10分遊んだ本人が自発的に二回目を始めたくなるか。
- [ ] 前回の依頼結果を次回90秒以内に認識できる永続loopが成立するか。
- [ ] HTTPS環境でPWA install、offline再起動、IndexedDB保存が成立するか。
- [ ] local修正版で、iPhone 16 ProのSafari／ホーム画面PWAともdouble tap拡大が再発しないか。
- [ ] 公開後の実利用、Steam審査、販売が生じた場合は別途記録する。

## Rule

local実装・browser検査と、実機試遊・公開・実利用を分け、未確認事項を推測で完了にしません。
