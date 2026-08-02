# Character Forge F-01 — Notes

## Confirmed inputs

- Beauty Sheet: `work/r07_character_depth/fram-r07-character-direction.png`
- R05 comparison: `work/r05_fram_visual_pass/r05-voxel-girl-04-1280x720.png`
- R08 comparison: `work/r08_character_art/r08-unified-05-1280x720.png`
- Current runtime contract: `src/prototypeB/render/hero/HeroVisual.ts`
- Current generated voxel precedent: `tools/generate-r05-voxel-avatar.mjs`

## Design reading

- 主人公は約3.6–4頭身。大きな頭部と目、短い顎、細い首で可愛さを作る。
- 白〜薄灰の非対称ボブ、片側の編み／束、暗い青緑の大きな目が顔の識別点。
- 生成SF装備は中世ファンタジーへ寄せない。淡色の技術ジャケット、濃色インナー、コーラル布、シアン発光を主語にする。
- ボクセルは単なる低解像度化ではなく、髪束・顔・衣服の重なり・装備のシルエットを高密度セルで整理する。

## Engineering hypothesis

- 正本を「意味パーツ付きのボクセルセルデータ」にし、表示用メッシュとLODを派生生成する。
- アニメーションは意味パーツの親子階層を共通リグとして扱い、見た目の高密度セルを骨に追従させる。
- 初版は完全自動な単眼3D復元ではなく、AI生成Build Sheetと決定的な再構築コンパイラを組み合わせる。
- 重要なのはF-01で終わる造形ではなく、次の人物・敵・遺物にも適用できる再現可能な工程である。

## Evidence log

- 2026-08-02: Project preflight 36/36 passed. Existing 18 untracked R05 screenshots remain untouched.
- 2026-08-02: Beauty Sheetからstrict four-view＋module Build Sheetを生成。SHA-256 `c6bb8c640d4dea7026040332ce5e101afcf3d074575c37ae77d60c65064b413a`。
- 2026-08-02: 48×92×42 source gridから37,990 solid cellsを再構築し、9,454 outer surface cells、9 materials、7 semantic rig partsとして表示。
- 2026-08-02: 1280×720 browserでfront／3-quarter／back、idle／run／hit、close／game、Build／Beauty／R05／R08切替を確認。`hit`は0.72秒後にidleへ戻る。
- 2026-08-02: Beauty Sheetとruntimeを同画面比較。F-01工程proofはpass、Beauty Sheet完全一致／commercial art acceptanceは未達。
- 2026-08-02: strict TypeScript、Vitest 37 files／202 tests、production buildが合格。
