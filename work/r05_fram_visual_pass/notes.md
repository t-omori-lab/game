# Notes: F.R.A.M. R05 visual pass

## Confirmed user decisions

- 正式名称は`F.R.A.M. (Frontier Relics Archive Module)`。
- 日本語副題は「辺境遺物記録モジュール」、呼称は「フラム」。
- 主人公はF.R.A.M. moduleの一個体としてgame conceptへ接続する。
- R04はかなり改善したが、cameraが近すぎて周囲が見えない。
- tilt-shiftが知覚しにくい。
- 主人公はまだ全く可愛くなく、character造形は不合格。

## Evidence to collect

- [x] Concept CとR05の同一1280×720 normalized comparison: `concept-c-vs-r05.png`。
- [x] hero focused comparison: `concept-c-vs-r05-hero.png`。
- [x] final intro／active capture: `r05-intro-1280x720.png`、`r05-active-1280x720.png`。
- [x] tilt-shift metadata: focus 0.58、clear band 0.14、far 13、near 19、world-only。
- [x] R04 gameplay invariantsとR05 visual-specific tests: 32 files／190 tests。

## Working hypotheses

- camera pullbackは単独ではheroをさらに弱くするため、hero silhouetteと顔・髪・発光moduleのfrequencyを同時に上げる必要がある。
- tilt-shiftはblur strength不足だけでなく、近景遮蔽物と遠景landmarkがfocus bandから十分離れていない可能性がある。
- 現heroはcell数より、頭身、顔面平面、目の位置、髪の量感、肩幅、coatの裾、idle poseが主因で可愛さを失っている可能性が高い。

## Phase 1 audit

- Selected visual target: `docs/concepts/visual-fidelity-v03/ideal-screen-c-stylized-3d.png` at 1672×941.
- Functional baseline: `work/r04_r02_successor/r04-public-final-1672x941.png` and `concept-c-vs-r04-pass3.png`.
- Concept Cの主人公はframe高のおよそ14〜15%だが、R04は約20%前後を占め、視野の狭さを強めている。R04 `viewHeight`は540。
- R04のtilt-shiftはThree.js標準の水平／垂直shaderをfocus 0.61、strength 2.45で使う。旧Beauty Cellの3.7より弱く、明瞭bandの幅も定義していないため、camera pullback後のminiature感を十分制御できない。
- R04 heroはR02 `BeautyHeroVisual`を縮尺変更し、その上へ別の顔、髪、coat、packを重ねる構造。base volumeとoverlayのproportion／surfaceが一体化せず、「高密度だが一人の可愛い人物として読めない」状態を生みやすい。
- R05 first contractは`viewHeight=720`／hero scale 2.18だったが、actual captureで主人公が小さすぎた。current値は`viewHeight=640`、R05専用camera offset Y 560、target offset 0、hero scale 2.7。
- R05 miniature-depth contract: focus center 0.57、clear band 0.30、far 6.5px／near 8.5pxの非対称三層band。DOM HUDは常にsharp、playable mid-groundと主人公の顔はblurしない。
- 初期の約4.4頭身smooth modular hero案は撤回した。current hero contractは、約90 cell高／7,734 visible cell、4.8頭身、顔／髪／split coat／coral textile／小型archive moduleを、semantic pivotで動かす高密度voxel少女である。

## Public boundary

- Latest public version remains R04 until the user explicitly asks to deploy R05.

## Final browser evidence

- 1280×720 local in-app browser。
- active canvas 1917×1077、`presentation=r05-fram`、`environment=r04-live`、Display-P3 capability path、AgX、`tilt=banded`。
- `F.R.A.M.を起動`、ArrowUp、Qを実行。
- console warning／error 0。
- 旧`passed`判定は撤回済み。最新truthはproject-root `design-qa.md`の`final result: blocked`。

## High-density voxel-girl rebuild

- Quaternius CC0 female body／rigged hairはoffline anatomy／joint scaffoldだけに使用し、smooth meshはruntimeへ含めない。
- `generate-r05-voxel-avatar.mjs`は身体、髪、顔、split coat、coral textile、small archive moduleを0.0195-unit gridへquantizeし、7,734 visible cellを生成する。
- actorはhead／torso／upper-lower arms／hands／thighs／calves／feet／equipmentのsemantic pivotsを持ち、idle／run／attack／skillとweapon socketへ接続する。
- lower bodyをpiecewise-compressして4.8頭身とし、hair／skin／sage coat／graphite under-suit／coral／cyanを通常play scaleで分離した。
- latest full frame: `r05-current-final-1280x720.png`。
- latest full comparison: `concept-c-vs-r05-current.png`。
- latest actor comparison: `concept-c-vs-r05-hero-current.png`。

## Latest honest visual judgment

- actor representationは、普通のsmooth 3Dではなくmicro-voxel／dot-derived realtime characterとして正しい方向へ移った。
- ただしdefault heroineの顔、hair tuft、cloth volume、hands、secondary motionは未採択。
- full screenは大屋根、rectangular cell edge、flat colored material、olive mid-tone dominanceが残り、Concept Cのmacro composition／wet PBR／warm-cool HDR hierarchyへ未達。
- next P0は、C-shaped causal grayboxと、一つのbaked road-shelter-façade benchmarkである。

## Deployment preparation

- ユーザーの明示指示により、R05を現時点の公開評価版としてdeployする。visual QAの`blocked`判定は隠さず維持する。
- 公開R04の最終commit `3cb27cd3630071b90ae6264e10e84d85f7bf929d`からproduction bundleを再生成し、`public/r04/`へrelative-path、scope別service worker、snapshot、SHA-256 manifest付きで凍結した。今後のR05 shared sourceでR04は変質しない。
- root service workerは`r05-v1`へ上げ、catalog／R01〜R05の各indexをroute別にcacheする。
- local production artifactではcatalogがR05→R04→R03→R02→R01、R04が自己完結bundle、R05が`r05-fram`／7,734 visible voxel cellsとして起動した。
- R05でArrowUp後にplayer座標が`430,900 → 419,889`へ変わり、Qも入力した。browser warning／errorは0件。
