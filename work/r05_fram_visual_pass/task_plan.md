# Task Plan: F.R.A.M. R05 visual pass

## Goal

R04の決定論的world／戦闘／questを維持したまま、Concept Cを基準に、周囲が読める広いcamera、miniature-depth、高密度voxel少女主人公を統合したR05評価版を作り、過去版を保存したままGitHub Pagesへ公開する。

## Non-negotiable gates

- `F.R.A.M. (Frontier Relics Archive Module)`／「辺境遺物記録モジュール」／「フラム」を正式名称とし、主人公はF.R.A.M. moduleの一個体として世界設定へ接続する。
- R01〜R04の公開版とsnapshotを変更・削除しない。
- R04の連続world、collision、quest、loot、二武器、半自動通常攻撃、手動大技を維持する。
- cameraを引いて周囲の探索情報を増やし、主人公の可読性を失った分は造形／silhouette／materialで補う。
- tilt-shiftは単なる全面blurにせず、主人公とplayable mid-groundを明瞭にし、近景と遠景に段階差を作る。
- 「可愛い」は通常gameplay scaleのfront／3-quarter viewで顔、髪、目、体形、衣装、SF module機構が一目で読めることをgateにする。
- Concept C完全再現やcommercial-quality達成は、同一viewport比較とユーザー評価なしに宣言しない。

## Phases

- [x] Phase 1: 現R04、Concept C、camera／post stack／hero implementationを同一viewport基準で監査し、R05 contractを確定する。
- [x] Phase 2: F.R.A.M.正式名称と主人公module conceptをproject正本へ反映し、R05 route／保存境界を作る。
- [x] Phase 3: camera pullbackと三層tilt-shiftを実装し、周囲の可視範囲と操作可読性を検証する。
- [x] Phase 4: smooth primitive heroを撤去し、CC0 rigを骨格参照にした約90セル高／7,734 visible cellのarticulated high-density voxel少女へ再構築する。
- [x] Phase 5: 強い帯状blurを撤去し、広いplay planeを鮮明に保つminiature-depth optics、低いR05 camera、asphalt／canal／density layerを統合する。
- [x] Phase 6: 同一viewport visual QA、gameplay regression、TypeScript、test、production buildを通し、release-integrityのP0／P1を解消する。Concept Cとの差分は次版のvisual gateとして残す。
- [x] Phase 7: R04を自己完結snapshotへ凍結し、R05 route、catalog、root service workerの公開境界を完成させる。
- [x] Phase 8: project docsを更新し、scope限定commitをmainへpushする。
- [x] Phase 9: GitHub Pages workflow、公開catalog、R01〜R05、R05操作／metadataを実URLで検証する。

## Key questions

1. どこまでcameraを引けば探索判断が増え、主人公の存在感も残るか。
2. 現tilt-shiftが弱い原因はfocus band、blur radius、camera framing、scene depthのどれか。
3. 現heroの「可愛くない」原因を、解像度追加ではなくproportion、顔、髪、pose、material、outlineのどこから解くか。
4. 主人公がF.R.A.M. moduleであることを、設定文だけでなく装備socket、scan、relic integration、visual signatureへどう表すか。

## Decisions made

- R05はR04-derived local successorとし、R04公開版は保存する。
- Concept Cをvisual target、R04をfunctional baselineとして同じ1672×941で比較する。
- 主人公はsmooth surfaceへ戻さず、CC0 rigをoffline anatomy scaffoldに限定し、visible runtimeをquantized micro-voxelだけで再構築する。
- Concept Cの少年型silhouetteをそのまま複製せず、4.8頭身、白髪のtwin silhouette、分割coat、coral textile、graphite under-suit、small archive moduleを持つ少女型presetへ翻訳する。
- 2026-08-02、ユーザーがR05 deployを明示的に承認した。visual gateのblocked状態を隠さず、現時点の評価版として公開する。
- R05公開時にR04をshared live buildのまま再生成せず、公開済みcommit由来の自己完結snapshotへ凍結する。

## Errors encountered

- 複数の連続描画tabと1.5 internal render scaleでbrowser検査が応答しにくくなった。重複tabを閉じ、R05上限を1.25へ調整し、`?capture=intro|active`で4 frame後に停止するvisual QA modeを追加した。通常routeの連続play loopは変更していない。
- R04 freeze用の一時directory内から最初の`git archive`を実行し、repositoryを解決できず空directoryのbuildが失敗した。canonical repositoryを`git -C`で明示して再実行する。
- production previewの初回起動はsandbox内のlocal port bindが`EPERM`になった。承認済みのlocal preview起動へ切り替え、同じbuild artifactを検査する。
- HTTP smokeのloop変数をzshの特殊配列`path`と同名にしてしまい、そのshell内のPATHを上書きして検査commandが見つからなくなった。`route_path`へ変更して再実行する。
- 4174／4175は別local appが使用中だったためVite previewは4176を選択した。browserは4176の`/game/`、frozen R04、live R05を検査した。
- R05の重い初期scene生成中にnavigation／selector待機が一度timeoutしたが、URL／titleは遷移済みだった。R04の描画tabを検査後に閉じてGPU負荷を下げ、R05のDOM、起動、移動、skill、metadata、consoleを確認した。
- sandbox shellから承認済みpreview processへの`curl`はnetwork境界で接続できなかった。HTTP確認の代わりにin-app browserでproduction artifactを実際に読み込み、built file tree／HTML／service-worker内容も別検査した。
- R05 manifest／OG追加の最初の複合patchはhunk区切りが不正で適用されなかった。index、manifest、testを正しい独立hunkに分けて再適用する。
- 最終testの最初の`pnpm test`は、依存関係purge確認を非TTYで求めて停止した。既存lockfileを保つ`CI=true`のworkspace runtimeで再実行する。

## Release audit findings

- R05個別HTMLだけ旧viewport指定（`maximum-scale=1`／`user-scalable=no`）が残っていた。rootと同じ可逆なviewport policyへ直し、root／R05双方をrelease testで固定する。

## Status

**Public evaluation build verified; visual gate remains blocked** — commits `0980f0f`／`35cf75f`のPages run #15成功、公開catalog R05→R04→R03→R02→R01、全route、frozen R04、R05 start／move／Q／7,734 cells metadata／consoleを実URLで確認した。Concept C再現・commercial品質は引き続き未宣言。
