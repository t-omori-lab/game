# F-01R Reconstruction Notes

## Ground truth

- Art authority: `work/r07_character_depth/fram-r07-character-direction.png`
- Machine-facing Build Sheet: `work/character_forge_f01/fram-f01-production-build-sheet.png`
- F-01 compiled runtime: `src/characterForge/f01.surface-pack.json`
- F-02 technical readability patch: `src/characterForge/F02ReadabilityModules.ts`

## Confirmed problem

F-02はBuild Sheetからの再構築ではなく、F-01 runtimeへ固定座標のセル、re-tone、scale補正を追加したもの。技術bridgeとしては利用できるが、Beauty Sheetの人物性を保持する生成パイプラインの証拠にはならない。

## Working decision

最初の再構築対象を頭・顔・髪に限定する。身体はF-01を暫定的に再利用し、最も人物性への寄与が大きい部分で、source data → compiler → compiled pack → Forge/R09という一本の経路を先に証明する。

## Verification boundary

- Machine gate: source/pack digest、module ownership、同一asset使用、4方向表示、motion、performance。
- Visual gate: silhouette、landmark、髪の非対称性、gameplay距離での顔の読みやすさ。
- Human gate: 「同じ人物」「可愛い女性型」と読めるか。これはユーザー確認までpending。

## Local result

- Compiled pack: 9,065 surface cells／20 modules／13 materials／7 rig parts。
- ForgeとR09でasset ID、source digest、payload digestが一致。
- F-01RはF-02のflat face maskを除去し、丸い顔、目、口、blush、首、非対称hair silhouetteを回復。
- R09で移動とmanual skill、browser error 0を確認。
- Beauty Sheetのhair lock密度、表情、全身moduleは未達。user art acceptanceはpending。
