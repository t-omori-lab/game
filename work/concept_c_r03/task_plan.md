# Task Plan: Concept C Complete Reconstruction R03

## Goal

Concept Cの画面を知覚的・構造的な唯一のvisual truthとして再現し、既存R02の延長ではなく必要な層を再設計・再構築したR03を、同一条件の画像比較、操作検証、production build、GitHub Pages公開確認まで完了する。

## Non-negotiable acceptance gates

- C原画とR03を同一viewport、同一camera、同一gameplay stateで並べて比較できる。
- cameraはCと同じworld占有率と周辺視野を持ち、R02の寄りすぎを残さない。
- default主人公は女性として一目で読め、顔、髪、体形、衣装、装備、poseに可愛さと精密さがある。
- WASD／stickのscreen directionと画面上の移動・キャラクターの向きが一致する。
- Cの高密度micro-voxel感、自然に侵食された都市、wet material、光、色、DOF、背景密度を一つの画面として再現する。
- `design-qa.md`はC原画と実装captureを同じcomparison inputで評価し、P0/P1がゼロ、残るP2が明示的にnon-blockingと判定された`final result: passed`になるまで公開しない。
- R01とR02は保持し、`/game/`はR03、R02、R01の新しい順に表示する。

## Phases

- [x] Phase 0: C原画の正本を特定し、R02との同条件captureを揃える
- [x] Phase 1: Cを画面比率、camera、actor、environment、material、lighting、DOF、UIへ測定分解する
- [x] Phase 2: 現行基盤で到達不能な制約を特定し、R03のrebuild boundaryとarchitectureを確定する
- [x] Phase 3: R03専用scene、camera、hero、environment、render pipeline、controlsを実装する
- [x] Phase 4: 同一条件のvisual comparisonを反復し、P0/P1差分を解消してP2を分類する
- [x] Phase 5: 型検査、test、build、操作、公開版保持、route一覧を検証する
- [ ] Phase 6: exact-file commit、GitHub push、Pages deployment、公開R03実ブラウザ確認を完了する（進行中）

## Key questions

1. 選択済みConcept C原画の正本ファイルはどれか。
2. Cの知覚品質を作る主要因のうち、R02で欠落した構造要因は何か。
3. heroをprocedural cube recipeから離し、どのrepresentationでCの顔・髪・衣装密度を成立させるか。
4. dynamic gameplayを維持しつつ、Cのbaked-quality compositionをどう保つか。
5. どの差分を数値／画像比較で公開blocking gateにできるか。

## Decisions made

- R02のscene graphとasset grammarを既定解にしない。
- visual fidelityを機能追加や既存code再利用より優先する。
- C原画を解決するまでR03のvisual実装を始めない。
- 旧版は明示削除がない限り保持する。
- R02はlive source参照を廃止し、commit `0b5fd9f6…` の静的bundleとして凍結する。
- R03はR02 rendererを継承しない。Cからactor/UIだけを除いた高品質environment plateと、独立した4方向actor、Canvas 2Dの動的戦闘／大気effectを重ねる2.5D hybridとする。
- この方式は最終world engineの完成ではなく、Cの知覚品質を動的gameplay中に守れるかを先に証明するbenchmark cellである。
- control frameはscreen-relativeとし、W/↑=画面上、D/→=画面右、S/↓=画面下、A/←=画面左をsprite facingへ直接対応させる。

## Errors encountered

- R02はC再現として公開したが、ユーザー評価では知覚的に不合格だった。原因は既存prototypeへの漸進改良をrebuildの代替にしたこと。R03では画像比較を公開blocking gateにする。
- 初回`pnpm build`はpackage runnerが依存関係の再同期を要求し、非TTYで`ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY`となった。lockfile固定の`CI=true pnpm install --frozen-lockfile`で再同期してから再実行する。
- 最初に指定したbundled pnpmの旧pathは現在存在せずexit 127になった。環境が公開する`bin/fallback/pnpm`を明示して再実行する。
- shell上の短い`pnpm` wrapperはbuild時にも非TTY再同期を挟んで同じ失敗を繰り返した。以後は`CI=true`と実体pathをbuild／testにも使用する。
- bundled pnpm実体を直接呼ぶと子scriptの`node`がPATHに無くexit 1となった。bundled Nodeのbinを明示した固定PATHで実行する。
- 最初のR03 hero型は`Object.freeze`由来のliteral `757/651`へ狭まり、更新時にTS2322となった。mutable stateを明示的な`Point`として型付けして解消した。
- sandbox内のdev serverは`listen EPERM`になった。localhost比較検証に限って承認済みの外部実行で127.0.0.1 serverを起動した。
- 最初の`pnpm check`は子scriptのPATHから`pnpm`が見つからず失敗した。bundled fallback pnpmとbundled Nodeを含む固定PATHで再実行し、全checkを通した。
- R02 checksumをproject rootから実行するとmanifest内の相対pathを誤って解決した。`public/r02/`をworking directoryとして再実行し、snapshot自身の検査へ修正する。
- 公開前code reviewで、基準viewportのcoverぴったりなplateに対してcameraを最大108px動かすと背景外の黒帯が露出するP1を検出した。追従量を実際のcover overscan内へclampし、基準1672×941ではcamera offset 0、横長画面では余白がある軸だけを追従させる回帰testを追加した。
- 同reviewで、旧矩形walk boundsがshelter／wall／植栽の見た目を無視し、短時間の上移動で背景構造物へ重なれるP1を検出した。中央road形状へinsetした10頂点polygon、point-in-polygon、segment最近傍clampへ変更し、keyboard移動とtap destinationの両方を同じwalkable contractへ接続した。
- 最初のexact-file commitはsandboxの`.git/index.lock`書込制限で失敗し、承認済み外部実行へ切り替えた。次の試行は凍結したVite bundle内部のshader文字列に由来する既存末尾空白を`git diff --check`が検出して停止した。snapshot bytesとSHA-256を変えないため、R01／R02の凍結JS bundleを`.gitattributes`でbinary release artifactとして分類した。

## Status

**Currently in Phase 6** — 1672×941の最終比較は独立QAでP0 0／P1 0／非blocking P2 3、`final result: passed`。camera／walkable修正後のcode再監査もP0 0／P1 0でGO。Vitest 168件、strict TypeScript、production buildも再合格し、exact-file commit、Pages deploy、公開browser確認へ進む。
