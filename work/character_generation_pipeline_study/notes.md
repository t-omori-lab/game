# Notes: 画像生成から3Dボクセル資産を作る制作パイプライン

Updated: 2026-08-02

## Local evidence

- Beauty Sheet: `work/r07_character_depth/fram-r07-character-direction.png`
  - 顔、髪、3.6頭身、短い技術上着、archive pack、coral textile、cyan toolを一つの造形思想で統合している。
  - front 3/4、back 3/4、side、face studyであり、同一neutral poseのorthographic front/back/left/rightではない。美術正本には使えるが、そのまま幾何正本にはできない。
- R05は `Superhero_Female_FullBody.gltf` と `Hair_Buns.gltf` を `tools/generate-r05-voxel-avatar.mjs` で0.0195 gridへsampleし、15 semantic partsとbind pivotsへ変換している。
  - runtime sourceは `R05VoxelAvatarData.generated.ts`、表示とanimationは `R05FramHeroVisual.ts`。
  - したがって「外部3D source -> bone-owned voxel -> game animation」は部分実証済み。
  - R05の髪団子が女の子として読みやすいという評価は、実在する3D hair silhouetteをsourceにしたことと整合する。
- R07はR05を生成後、code-authored head/jacketを重ねて旧surfaceを非表示にする。
- R08はR07を生成後、さらにcode-authored full-body cell volumeを重ねる。Beauty Sheetの投影や3D計測からvolumeを復元しておらず、R05 -> R07 -> R08のscale/pivot継承が残る。
- R08の19,221 cellsは各cellを `BoxGeometry` instanceとして保持する。source densityとruntime geometry budgetを分離できていない。
- `HeroVisual.ts` とrendererには、idle/run/windup/hit/recovery/hurt/skill、weapon socket、deterministic phase mappingが既にある。
- 現runtimeにはGLTFLoader/AnimationMixer/asset preloadは未接続。ただしThree.jsは既存dependencyなので、追加game engineは不要。
- 既存設計 `docs/VISUAL_NORTH_STAR_IMPLEMENTATION.md` は、concept/turnaround -> micro-voxel or grid-quantized source -> Blender cleanup/rig -> GLB/KTX2 -> actual-camera reviewを既に推奨している。今回の提案はこの本来の方針へ戻すもの。

## External evidence

- Tripo API
  - <https://platform.tripo3d.ai/docs/generation>
  - front/left/back/rightのexactly four inputsからmultiview-to-modelを実行でき、face limit、low-poly、parts生成等を指定できる。3D draftの最速比較候補。
  - animationはhuman-like、four limbs、simple one-layer clothingを推奨し、過剰accessoryや非人型には制約がある。完成rigではなくcandidateとして扱う。
- Meshy
  - <https://docs.meshy.ai/en/api/multi-image-to-3d>
  - multi-image、retopology、humanoid rig/API automationの比較候補。
  - 2026-03-07規約ではfree outputはMeshy所有・CC BY 4.0 license、paid planはprivate optionがある。主人公の正本へ使う場合はpaid/private条件と生成時規約をmanifestへ保存する。
- Blockbench
  - <https://www.blockbench.net/wiki/guides/export-formats/>
  - cube hierarchyとanimationを目視修正し、glTF/GLBへexportできる。高密度sourceの唯一の正本ではなく、bone-owned voxel clusterのart correction tool候補。
- Microsoft TRELLIS.2
  - <https://github.com/microsoft/TRELLIS.2>
  - image-to-3D、O-Voxel、PBR、GLB exportを備える有力なdraft generator。
  - 公式referenceはLinux、NVIDIA GPU 24GB以上。Apple M3上でのlocal production pathにはならない。
  - model/codeはMITだが、dependenciesは個別license確認が必要。
- Tencent Hunyuan3D-2
  - <https://github.com/Tencent-Hunyuan/Hunyuan3D-2>
  - multiview image-to-shape、mesh export、shape/paint分離がある。3D draft比較候補。
- Tencent Hunyuan3D-2.1 license
  - <https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1/blob/main/LICENSE>
  - TerritoryがEU、UK、South Koreaを除外し、Outputを含む利用にもterritory制約がある。worldwide Steam配布の正本toolとしては別契約または法務確認なしに採用しない。
- UniRig
  - <https://github.com/VAST-AI-Research/UniRig>
  - skeletonとskin weightの自動生成候補。公式も不正確なskeletonではskinningが大きく劣化するため、skeleton修正後のskinningを推奨する。CUDA GPU前提。
- Adobe Mixamo
  - <https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html>
  - humanoid向けの初期clip/rig candidate。neutral pose、clean connected meshが必要で、大きいhair/clothing、extra appendage、強いdeformationに制約がある。
- Three.js GLTFLoader
  - <https://threejs.org/docs/pages/GLTFLoader.html>
  - scene、skin、AnimationClipを読み、KTX2、Draco、Meshoptを接続できるため現runtimeへ統合可能。
- Blender glTF
  - <https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html>
  - skinning、keyframe、shape key animationをGLBへexportできる。game engineではなくoffline canonical asset compilerとして使える。
- glTF Transform
  - <https://gltf-transform.dev/>
  - geometry/animationのMeshopt圧縮とKTX2変換をbuild stepへ入れられる。

## Synthesized findings

### Core judgment

採用推奨。ただし `image -> one-click 3D -> ship` ではなく、`image -> Build Sheet -> 3D draft -> semantic voxel canonical source -> shared rig -> compiled GLB -> actual-camera human gate` とする。

### Why full automation fails

- 生成view間で髪、顔、衣装、装備、厚みが一致する保証がない。
- hidden geometryと関節位置を画像modelが任意補完する。
- raw generated meshは衣装/髪/bodyを融合し、装備換装とcharacter creatorに使いにくい。
- smooth skinningはcellを歪めてvoxel/pixel-art surfaceを失う。
- 可愛い、SF探索者らしい、同一人物に見える、というgateは最終gameplay cameraで人間が判断する必要がある。

### Recommended animation structure

- head、torso、boots、pack、weapon: rigid cluster
- upper/lower limbs: one-bone-owned voxel cluster
- shoulder/elbow/knee: overlapを持つjoint volume
- hair locks、coat tails、coral textile: few-bone limited deformation/secondary motion
- face: high-density semantic module
- equipment: stable sockets

Tripo/Meshy/UniRig/Mixamoのauto-rigは比較候補に使えるが、最終assetは同じproject-owned rig contractへ正規化する。

### Asset-family split

- humanoid: approved modular parts + `humanoid-v1`; whole characterを都度生成しない。
- tool/item/static prop: image-to-3D draftとvoxel化を高く自動化できる。
- robot: rigid part/pivot rigで自動化しやすい。
- dog/cat/monster: body-plan別rig family。
- building/road: rule-based modular geometry + generated material/decal。単一画像3D化を正本にしない。

### Smallest useful proof

世界やUIを触らず、独立Character Forgeでdefault protagonist一体だけを検証する。

1. 現sheetをBeauty Sheetとして固定。
2. neutral A-pose、orthographic front/back/left/right、same scale/lighting、separated modulesのBuild Sheetを生成・補正。
3. generic image-to-3D draftと、semantic voxel reconstructionを同条件で比較。
4. existing 15-pivot contractかclean `humanoid-v1`へbind。
5. idle、walk/run、hitだけ実装し、weapon/back socketsを確認。
6. actual C cameraでR05/R08とsame viewport比較。
7. 合格後だけ本編heroと他assetへ展開。

### Acceptance

- 説明なしに、可愛い女性型、SF field archivist、高密度voxelと読める。
- front/back/left/rightで同一人物、同一装備に見える。
- idle/run/hitでface/hair/jacket/coral textile/cell grammarが壊れない。
- tool、packを外してもidentityが残り、交換socketに破綻がない。
- source cellを維持しつつ、runtimeはouter surface/LODへcompileされる。
- normal gameplay viewとclose-upの双方でBeauty Sheetとの差が許容範囲。
- 人間のart acceptance前に「完成」「commercial parity」と呼ばない。
