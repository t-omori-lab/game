# Working Notes

## Post-prototype companion robot concept

- 2026-07-31、ユーザーはPrototype B完成後に検討する参考メモとして、主人公へ随伴robotを付ける案を追加した。
- 参考感覚は『NieR:Automata』の随伴機と『攻殻機動隊』のタチコマ。ただし固有の外見、人物像、台詞、設定は模倣しない。
- 主人公は移動とactionの主体で、近距離物理／遠距離物理を担当する。
- 随伴robotは機械的・技術的な遺物を解析し、自身へ組み込んで使用する。
- 随伴robotは特殊技／大技の担当候補。使用回数またはenergyに制限があり、field中または拠点で回復手段を必要とする。
- この分担により、主人公の手動combatを保ったまま、遺物build、解析情報、有限resource、相棒への愛着を一つのsystemへ束ねられる可能性がある。
- 現行Prototype Bの斥力環は、後続検討で随伴robot側のmoduleへ移せる候補。ただしPrototype B試遊前には実装しない。

## Post-prototype journey and daily-life references

- 2026-07-31、ユーザーは漫画『少女終末旅行』『世界が終わっても生きるのって楽しい』『ウスズミの果て』を、世界観、旅、生活感の参考として追加した。
- 抽出する軸は、終末の大事件そのものではなく、文明の残骸を移動し、食べる、直す、補給する、拾う、休む、小さな発見を語るという日常の手触り。
- 暗く静かな世界でも「生きる行為そのものが楽しい」という感触を、探索resource、野営、遺物解析、随伴robotとの短い反応へ翻訳できる。
- 漫画『リビルドワールド』も参考に加え、危険地帯で旧世界の遺物を回収し、解析、換金、装備更新、次の探索資金へ循環させる生活型ハクスラの経済loopを抽出する。
- 高性能な相棒／案内役を置く場合も、戦闘と進路の最終判断は主人公＝playerに残す。
- 固有の人物、乗り物、景観、台詞、出来事は模倣せず、旅と生活をgame loopへ接続する情報構造だけを参照する。

## Prototype B confirmed feedback

- 2026-07-30、ユーザーはprototype 0.1を「ゲームとして一応出来上がっている」点は評価しつつ、約20点と評価した。
- 常時自動遠隔攻撃はタワーディフェンス的で面白くなく、攻撃、防御、item、skill／魔法を自分で使いたい。
- mapは固定arenaではなく、自characterをほぼ中心にしてscrollする。
- キャラクターとobjectを16×16×16の着色boxから作り、固定斜め見下ろしでrealtime 3D描画する案を採用候補とする。
- Elonaが、ルナティックドーンと並んで目指す自由世界の中核に近い。
- Undertaleからは弾幕の模倣ではなく、敵の事情、非戦闘解決、行動結果を世界が覚える仕組みを参照する。
- 2026-07-30、ユーザーは上記を反映した次のPrototype B実装を承認した。
- 追加参考として、ラグランジュポイントの武器system、SF設定、soundが高く評価された。
- 攻殻機動隊、Cyberpunk 2077、Watch Dogsのcyberpunk世界観も好みとして追加された。
- 漫画『上野さんは不器用』は、謎のSF itemと、その原理・用途を妙に具体的に解説する発想源の候補として追加された。

## Prototype B working hypothesis

- 企画の合成式は「Elonaの生活自由度 × ルナティックドーン／CardWirthの依頼人生 × Diablo／イニシエダンジョン／RoLの手動ハクスラ × Undertale／moonの世界反応」。
- 長く遊べる核はcontent量ではなく、依頼、装備、敵への対処、帰還判断、世界履歴が相互作用することに置く。
- AI生成は完成画像より、schema検査できるVoxelRecipe、名前、噂、依頼候補へ使う。
- 本編規模へ広げる前に、renderer性能と10分のgameplay loopを同じPrototype Bで判定する。
- 妖怪とcyberpunkを二者択一にせず、「辺境に残る旧文明技術／電脳怪異」という接続余地を残す。
- SF itemは単なる数値modifierではなく、使用法と副作用がplayerの行動を変える道具にする。
- 参考作の固有設定、台詞、画面、音楽を複製せず、system上の役割と情報構造だけを抽出する。

## Prototype B local evidence

- 2026-07-30、既定runtimeをPrototype B「辺境遺物録」へ切り替えた。
- Prototype 0.1は`?prototype=0.1`で比較起動でき、Phaser chunkはそのrouteだけで読む。
- 16³ voxel core、validator、hidden-face mesher、player／武器2／敵4／object4の11 recipesを実装した。
- Three.js fixed orthographic renderer、3,600×1,800 world、camera follow、ground instancing、voxel burst、attack／guard／relic ringを実装した。
- Prototype B simulationは手動combat、二武器、guard／just guard、回避、relic、healing、loot 6、quest三結果を持つ。
- Web Audioで探索pulse、危険layer、武器、guard、回避、遺物、item、結果cueを実装した。
- Vitest 85/85、strict TypeScript、Vite production buildが合格した。
- 対峙用の二つの鍵をtrigger圏外で回収できる配置へ直し、初期地点から敵を残した連続移動testで回収可能性を固定した。
- 対峙modalから探索へ戻って選択を再開できるようにし、縦画面pause、入力順に依存しない防御／回避、keyboard focus、音声scheduler復帰を修正した。
- 852×393相当browserで、開始、依頼受注、武器切替、scroll、敵target、敗北、再開を確認した。初期画面60fps、約25 calls、約18k triangles、console error／warning 0件。
- browserの短いArrow keypressが30Hz tick間で失われたため、移動tapを一tick queueする入力改善を加え、x=430→435の移動を再確認した。
- 戦闘せず最初のlootへ進むと屑鉄猟犬に敗北した。手動対応が必要な設計は確認できたが、初回難易度は実機試遊で再評価する。
- local browserの10分通し、iPhone 16 Pro実機、PWA install／offline、Prototype B saveは未確認。

## Confirmed input

- 2026-07-30、ユーザーは新規ゲーム開発の開始を承認した。
- 基準端末はiPhone 16 Pro。
- 初版はブラウザ／PWAで遊べる形を採用する。
- 好みとして、ルナティックドーン、巡り廻る。、おっさん or die、Diablo、Kenshi、Oblivion、Metal Max、Vampire Survivorsが挙がった。
- 妖怪は有力候補だが、世界観、舞台、主人公は未決定。
- リッチな素材量より、計算描画されたベクター表現と仕組みの面白さを重視する。

## Initialization evidence

- Project ID: `P-20260730-28501297`
- Initial local commit: `bce481fde7a00062f76f540aadd16762c93dd2cb`
- Remote: none
- Push: not performed
- Initial preflight after registration: `PASS=36 WARNING=0 FAIL=0`
- Workspace registryの初期化前後差分は、生成日更新と本project行の追加だけだった。

## Working hypotheses

- 好みの中心は「周回」そのものより、自分がいなくても続く世界、自由な放浪、装備や乗り物の履歴にある。
- 初期版では常時世界simulationを作らず、帰還時に世界をまとめて進めるevent-driven更新で感覚を再現する。
- 最初の評価対象は、世界観なしでも8分遊べる戦闘と強化選択である。

## Prototype 0.1 evidence

- 30Hz deterministic simulation、vector frontend、touch input、3択upgrade、8分bossを実装した。
- 遠征終了時の討伐跡、累計遠征、最高討伐数を`WorldLegacy v1`として次回へ継承する。
- PWA shell、初回install asset precache、A/B save、checksum、IndexedDB／memory fallbackを実装した。
- 2026-07-30、Vitest 36/36、strict TypeScript、Vite production buildが合格した。
- 852×393相当browserで開始、戦闘、強化、再開、縦画面案内を確認した。
- Python Playwright packageがないため、root側のscript E2Eは未実行。worker browser QAと保存済みscreenshotを証拠とする。
- iPhone 16 Pro実機10分試遊、HTTPS PWA install、offline実機再起動は未確認。

確認済みの現在状態は最終的に `docs/PROJECT_CONTEXT.md`、長期的な判断は `docs/DECISIONS.md` へ移します。

## Visual Pass C input and evidence

- 2026-07-31、ユーザーは公開プレイ画面を「全体的に暗すぎる」と評価した。
- 求める世界は、状況そのものは人間にとってシビアでも、崩壊した文明を自然が侵食し、光、植物、水、錆などが色鮮やかに共存するもの。
- 『NieR:Automata』は固有表現の模倣ではなく、淡い昼光、崩壊した人工物、回復する自然、静けさと危険の同居を参照する。
- 16×16×16 voxel characterは表現力不足と評価された。3D voxelは維持しつつ、『FINAL FANTASY VI』のcharacter sprite程度に、頭身、顔、髪、服、装備、pose差を読めることが目標。
- 公開版を852×393で撮影すると、worldの大半が黒緑のscreen effectとHUD overlayに覆われ、地面と建物の明度差が小さい。playerは中心にいるが、髪、顔、胴、脚、武器が一つの暗い塊に見える。
- 現画面のperformance表示は約25 draw calls／約18k triangles。高密度characterは全objectではなく重要characterへ限定できる余地がある。

### External structural references

- Square Enix公式NieR BlogのE3 screenshotは、崩壊した都市をsoft daylightと植生の中に置き、終末を黒一色にしない構造の参照になる。
  - https://blog.jp.square-enix.com/nier/2016/06/20/nierautomatae3.html
- Square Enix公式FINAL FANTASY Pixel Remaster FAQは、original pixel spriteの感触を保ちながら、現代の高解像度画面で明瞭に読めるようcharacterを再設計したと説明している。
  - https://finalfantasypixelremaster.square-enix-games.com/en_GB/faq
- いずれも画像、character、palette、構図を複製せず、情報階層と体験構造だけを抽出する。

### Visual Pass C local result

- 暗さの主因はlight不足ではなく、camera距離約991に対する暗色`FogExp2(0.00088)`、低明度のsource palette、最大約65%まで重なるscreen edge darkeningだった。
- rendererをpale gray-green daylight `#c4d3c7`／fog density `0.00025`へ変更し、sage ground、pale concrete、blue-green water、orange rust、deterministic grass／flowerを実装した。
- screen edge darkening、HUD／loadout／touch controlsを明るい半透明slateへ弱め、enemy telegraphをred-orange `#ed4034`へ強化した。
- voxel recipeをschema v2の可変`width × height × depth`へ更新。legacy 10 assetsは16³／cell順／voxel数を維持し、playerだけ16×24×12とした。
- 新playerは583 voxels、742 exposed faces、1,484 triangles、7 functional colors。髪、顔、scarf、coat、左右の腕、脚間のnegative space、boots、weapon／focus anchorsを持つ。
- Vitest 94/94、strict TypeScript、production build、diff checkが合格。
- 852×393 local mobile Chromeで、up／right／down／leftのsilhouetteを確認。60fps表示、26 draw calls、22,148 triangles。double tap後もscale 1、offset 0。
- local screenshot: `/tmp/game-public-current.png`。public GitHub PagesとiPhone 16 Pro実機には未反映／未確認。

## Visual Pass D input and official production evidence

- 2026-07-31、ユーザーはVisual Pass Cのmap、building、objectについて、大きなbox中心でMinecraftのまま、鮮やかさと魅力が不足していると評価した。
- quality barはprototype内の改善ではなく、『OCTOPATH TRAVELER』など商業gameのHD-2D表現。
- playerとcompanion robotは特に美しさが必要であり、現在のplayer 16×24×12を下限として再高密度化を検討する。
- Official Unreal Engine／Acquire interviewでは、HD-2Dをpixel表現と3D環境の融合と説明し、続編の改善としてhigh-resolution mapのorganic pixel appearance、dynamic day／night lighting、より密度の高いactionを支えるcharacter proportionを挙げる。
  - https://www.unrealengine.com/developer-interviews/octopath-traveler-ii-builds-a-bigger-bolder-world-in-its-stunning-hd-2d-style?lang=ja
- Original production interviewでは、effectだけでは不足し、point lightを同期させてcharacter shadowをenvironmentへ落とし、light／shadowの印象を強めたと説明する。
  - https://www.unrealengine.com/spotlights/octopath-traveler-s-hd-2d-art-style-and-story-make-for-a-jrpg-dream-come-true?lang=ja
- したがってdensityはvoxel countだけでなく、ground microdetail、multi-part architecture、props、material response、directional light、effect-linked light、atmosphere、camera compositionの積として再設計する。

## Discoverable companion roster clarification

- 2026-07-31、ユーザーは同行者を開始時からいる一体だけのpartnerにしない方針を明確化した。
- 同行者はworld内で発見、合流、加入し、複数候補から交代できる。候補は人型robotに限らず、犬、猫、犬型／猫型robot、人物など幅を持たせる。
- 参照するのは『Oblivion』『Skyrim』等の「旅の途中で仲間になり同行する」構造であり、固有characterやquestは模倣しない。
- Visual Pass Dで作った調査灯型robotはroster候補asset一体として保持するが、通常の開始画面では表示しない。加入stateと同行者gameplayは後続scope。

## Optimistic post-apocalypse tone clarification

- 2026-07-31、ユーザーは人類が危機にある荒廃worldでも、常時つらく悲しい雰囲気にはせず、まだ負けていないという楽天性を求めた。
- 人々は状況へあっけらかんと実務的に対応し、食事、修理、商売、探索、小さな楽しみを続ける。
- deathは起こり、ときにあっさりしている。通常の画面や演出は哀歌ではなく、陽光、自然、生活痕、乾いたhumorをbaselineにする。

## World bible and generation-law clarification

- 2026-07-31、ユーザーはworld、人物、世界地図、遺跡、item、monsterなどをMarkdownの設定資料へまとめ始める方針を示した。
- 原則としてcontentは開発中に生成して収録する。play中にその場で無制限生成する方式にはせず、deterministicな規則、schema検査、出典、human reviewを通す。
- 生成物は「それらしいflavor text」だけで正当化しない。材料、構造、energy源、作用対象、作用scale、出力、副作用、interface、環境条件を持たせ、少なくとも世界内の科学または明示された固有法則で説明可能にする。
- 武器／itemの文字rankは技術帯域の目安に留め、実際の強さはdamage、penetration、heat、range、energy cost、precision、stability、riskなど複数の数値で管理する。
- 仮の技術帯域では、Eは刃、質量、弾性、燃焼など機械／物理作用。上位は熱、電磁、化学、分子scaleへ広がる。psychic作用を採る場合も万能魔法にせず、観測可能な入力、出力、限界、反作用を持つ世界固有の仮説として定義する。
- 合成可否は名前やrarityだけで決めず、機構とinterfaceの相性、保存則、電力／熱／応力budget、故障mode、game balanceを同時に満たすかで判定する。
- 遺跡／dungeon生成は世界設定だけでなく、入口、予告、選択、報酬、撤退、route redundancy、landmark、combat／rest／puzzleのcadence、重要item到達可能性を検証してから採用する。
- 詳細は`docs/WORLD_BIBLE.md`と`docs/GENERATION_RULES.md`をdurable sourceにする。

## HDR-like visual direction clarification

- 2026-07-31、ユーザーは画面品質としてHDR的な美しさを追求し、smartphoneで成立するなら採用する方針を示した。
- baselineはtrue HDR専用表示ではなく、linear lighting、強いが白飛びしないsunlight、warm highlight／cool shadow、emissive accent、tone mapping、color separationで全対応端末へHDR-likeな画を作る。
- Display P3やtrue HDR outputはbrowser／OS／display capabilityで分岐するprogressive enhancementとし、未対応端末の色やreadabilityを壊さない。
- bloomやfull-screen post processはmobile heat／battery／combat readabilityを含めて測り、開始町のquality gateでは最大2 pass、実機で余裕がなければ削る。

## Music reference clarification

- 2026-07-31、ユーザーは探索BGMの参考として`Go, Go, Heartbreaker! / MYUKKE.`に加え、`.conf / ariiol`を挙げた。
- 固有のmelody、arrangement、soundを模倣せず、tempo、音色、余白、反復、展開密度、感情温度へ分解し、「明るい終末を移動する」音響設計へ使う。
- 既存曲そのものを収録する場合は、game利用、複製、配信、Steam／Web公開、地域、期間を含む権利条件を確認するまで未決定とする。

## Visual Pass E pre-deploy review

- authored voxel paletteの16進色をLinear-sRGBへ変換してからvertex attributeへ渡す。`0x808080`は約`0.216`であることを回帰testへ追加した。
- 依頼板の描画、prop、collider、interactionを`TOWN_CONTRACT_BOARD_POSITION`へ一本化した。
- fixture collision testは対象colliderだけをworldへ残し、隣接colliderによる偽陽性を除いた。
- generated meadowへ置換済みの旧start-town ground receiverを生成しないようにし、draw callを12から11へ削減した。
- built HTMLのpreloadからhash付きWebPをservice workerのprecache対象へ含め、TextureLoader失敗時はvertex-color地面へfallbackする。
- Vitest 116件、strict TypeScript、production build、852×393 production previewを通過。previewは60fps表示、35〜37 draw calls、49,520〜49,616 triangles、MSAA、AgX、texture `ready`、double tap scale 1、browser error 0件。asset遮断時はtexture `fallback`を確認した。
- commit `773aaf6`のGitHub Actions run #7はbuild／deployとも成功。公開HTMLの新JS／WebP参照、JS／WebP／service worker／manifestのHTTPS 200、公開mobile browserの起動・操作・double tap抑止・texture `ready`を確認した。

## Product design synthesis and 2026 technical research

- 2026-07-31、ユーザーは追加実装を抑え、要求統合、不足設計、iPhone前提のrich visual、主人公／同行者design、生成world／assetをgameplayへ接続するlogicを先に進めるよう指示した。
- 仮称「世界記憶型・放浪生活ハクスラ」は未承認の統合案。Gate Aのmanual action＋loot／buildと、Gate Bの自己目的＋world memoryを別々に証明し、Gate Cのvisual benchmarkを独立させる。
- Prototype Bは一回の遠征、manual action、hybrid rendererの技術証明だが、combat feel contract、三build、スマホloot UI、同時目的、複数回の因果、同行者、経済、生成pipelineは未証明。
- contentを単品で生成せず、共通GameplayContractと、旧用途、現在資源、actor need、衝突、証拠、複数対処、reward、world mutation、future hookを持つCausal World Cellとして生成する案を作った。
- character／item／material／structureは、version付きStyleProfileとgameplay role、semantic parts、material、rig、socket、物理budget、来歴を持つAssetDNAからcompileする。AI生成meshは候補であり正本にしない。

### Primary technical evidence

- Safari 26はiOSを含めWebGPUを出荷し、HDR imageをWebGPU Canvasでも扱う。half-float内部照明、P3、HDR display outputは別能力として実機判定する。
  - https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/
  - https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
- Three.js WebGPURendererはWebGPUからWebGL2へfallbackできるが、manualはexperimentalと明記。ShaderMaterial／EffectComposer経路はTSL移行が必要。
  - https://threejs.org/manual/en/webgpurenderer
- KTX2／Basis Universalは配信sizeだけでなくGPU native textureへのtranscodeによりmemory、bandwidth、powerを減らす。
  - https://www.khronos.org/news/press/khronos-ktx-2-0-textures-enable-compact-visually-rich-gltf-3d-assets
- 2026年の個別研究はPBR、UV／normal bake、polygon control、GLB、rig生成の一部を前進させる。一つの公開toolがhero制作をend-to-endで保証するわけではなく、production-ready surveyはtopology、UV、PBR、rig、physics、scene assemblyを含むgapが残ると整理する。
  - https://arxiv.org/abs/2605.26137
  - https://github.com/TencentARC/Pixal3D
  - https://github.com/microsoft/TRELLIS.2
  - https://github.com/VAST-AI-Research/SkinTokens
  - https://arxiv.org/abs/2604.23629
- CubePart論文はpart-controllable生成の2026年research precedent。現公開codeは主に既存mesh＋part schemaからpart meshへ分解する。README、root license、checkpoint card間の適用範囲を明確に確認できないため、clearance完了までproduct dependencyにしない。
  - https://about.roblox.com/publications/cubepart-open-vocabulary-part-controllable-3d-generator
  - https://github.com/Roblox/cube/blob/main/LICENSE
- missionとspaceを別々に生成して対応付ける方針は、action-adventure level生成の既存研究と一致する。WFCは局所pattern仕上げへ限定する。
  - https://pcgworkshop.com/archive/dormans2010adventures.pdf
  - https://github.com/mxgmn/WaveFunctionCollapse
- RPGBenchはLLMが魅力的なstoryを作れても、長期stateとmechanicsの一貫性を崩しやすいと報告。GameGen-Verifierは仕様をkeypointへ分け、runtime state注入と短いinteractionで検査する方式を報告する。
  - https://arxiv.org/abs/2502.00595
  - https://arxiv.org/abs/2605.07442
- NVIDIA Researchの「Fly, Fail, Fix」は、RL agentのplay traceをLMMが読み、configuration変更を提案するoffline design iterationを示す。自動適用ではなくhuman-approved reviewer候補として使う。
  - https://research.nvidia.com/publication/2025-08_fly-fail-fix-iterative-game-repair-reinforcement-learning-and-large-multimodal
- Steamworksは、gameへ同梱されplayerが消費するAI-assisted contentをpre-generated AI contentとして申告対象にする。live-generated AIには追加guardrail説明が必要。申告は法的clearanceではなく、提出時に規則を再確認する。
  - https://partner.steamgames.com/doc/gettingstarted/contentsurvey?language=english
- AI／画像／3D serviceは同じseedでもbyte一致を保証しない。procedural工程だけをseed replayし、AI raw outputはhash付きで凍結、再生成物は別candidateとして再承認する。
  - https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter
- WebKit browser storageはbest-effortでevictionがあり得る。SafariとHome Screen Web Appのstorageは自動継承を仮定せず、persist request、atomic save、backup、export／importを設計する。
  - https://webkit.org/blog/14403/updates-to-storage-policy/
  - https://webkit.org/blog/14787/webkit-features-in-safari-17-2/
- WebGL Display-P3はstock Three.js設定ではなく、現project固有のColorSpaces登録と`drawingBufferColorSpace` probeを含む経路として扱う。
  - https://threejs.org/docs/pages/WebGLRenderer.html
  - https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes

### Research boundaries

- WebGPU／HDRの公式supportは、iPhone 16 Proで本作が60fps／高画質になる証明ではない。Safari／home-screen PWAの10分実測が必要。
- 3D generatorのdemo品質は、target topology、rig、collision、LOD、material数、license、actual-camera readabilityを満たす証明ではない。
- AI seedはreplay保証ではなく、IndexedDBへの書込みは永続保証ではない。candidate freezeとsave exportを別の安全策として持つ。
- GameplayContract、Causal World Cell、StyleProfile／AssetDNA、三gate、四profile rendererは既存知見を統合した本project向けdesign proposalであり、同一構成のproduct実証はまだない。

## Semi-auto combat, overgrown city, self-built base clarification

- 2026-08-01、ユーザーは移動／action／戦闘styleとして、Elona Mobileに近い「通常戦闘は自動、大技skill発動は手動」が最も近いと明示した。
- 過去の不合格は自動化一般ではなく、固定arenaで接近、位置取り、target、撤退を必要とせず、常時自動遠隔攻撃を眺めるタワーディフェンス的な構造だったと再解釈する。
- 確定方向は、手動移動／接敵／位置取り／撤退、条件付き自動通常攻撃、手動大技。target上書き、guard／dodge、item、通常の同行者行動をどこまで手動に残すかは比較案。
- 自由放浪とworld memoryは基本方針として支持された。
- 人類は激減し、識別可能な現代都市とinfraが植物、水、動物、新しい生活へ自然侵食／転用されている。NieR:Automataは危機と鮮やかな自然が同居する構造参照であり、固有設定、景観、asset、構図は模倣しない。
- 既存遺構を復旧するか、条件の合う土地を選び、playerが自分の拠点を築く。完全自由配置、複数拠点、移転、維持、襲撃は未決定。
- 夏版の推奨縮小形は、拠点候補地二つ、稼働拠点一つ、機能module候補二つ以上／設置一つ。次回90秒以内にvisualとgameplayを一件ずつ変え、放浪の成果をworld memoryとして見せる。
- 拠点は探索80％／拠点20％程度の錨として扱い、完全自由な床／壁／家具editor、入植者仕事割当、offline待機生産、定期wave防衛へ広げない。

## Runtime local micro-model／pseudo-LLM idea

- 2026-08-01、ユーザーは、事前承認済みcontentだけでなく、必要に応じたruntime生成が独自性と面白さを増す可能性を提案した。対象は、矛盾のないplayer character、都度独自のscenario／台詞、item／flavor text、合成／強化法則に従う結果、map等。
- 外部APIは費用、通信、運用、privacy、service継続性を複雑にするため、商用利用条件を確認した小規模OSS local LLM、またはgrammar／template／retrieval／状態機械を組み合わせた「擬似LLM」をgameへ同梱する案。
- 推奨仮説は三層構造。`Rule Core`が世界状態、数値、合成可否、map到達性、報酬、event因果を決定し、`Pseudo-LLM`が規則内の構造候補を安価かつ再現可能に組み、`Local Micro-LLM`が必要な場合だけ台詞、scenario表現、命名、flavorへ変換する。
- characterは制約付きgenome、scenarioは検証可能なevent graph、item／合成は物理／energy／balance solver、mapはmission graph＋space graphを先に作る。local modelへ自由文からmechanicsを直接決めさせない。
- runtime生成物はその場限りにせず、canonical state参照、seed、generator／validator version、model ID／weight hash、input／output hash、採用結果をsaveへ凍結する。reload時は再生成せず同じ結果を読む。検証失敗時はdeterministic fallbackへ戻す。
- 小型であること自体は矛盾防止、商用利用許可、smartphone性能、battery、download sizeを保証しない。具体modelの採用はlicense、weight再配布、生成物条件、端末RAM／速度、品質を同じbenchmarkで確認してから決める。
- 初期default候補は擬似LLM。規則だけでは表現の反復が目立つ箇所へlocal micro-LLMを限定導入し、PCでは高品質model、smartphoneでは軽量model／擬似LLMへquality tierで切り替える。

## 2026-08-01 — North Star City Cell v0.1 working notes

- 今回の判断レベルは `Revise one thing`。現行のhero、combat、post stackは保持し、村落的背景だけを自然侵食現代都市へ置き換える。
- visual protagonistは主人公。都市情報を増やしても、開始地点には明るい抜けと移動方向を残す。
- 読む順番は `主人公／進路 → 道路・高架・建築の旧用途 → 水・植生・修理生活の痕跡`。
- 都市の認識には大きな箱を増やすだけでは足りない。横断歩道、車線、窓反復、庇、手すり、配管、看板支持体、排水、舗装目地など、人間scaleの反復と用途記号が必要。
- 植生は一様に撒かず、水が溜まる低地、亀裂、日照縁、壁面の支持体へ因果的に集中させる。
- 生活痕跡は荒廃の悲壮感ではなく、雨水回収、補修板、菜園、作業灯、干し布など「あっけらかんと使い直す」方向にする。
- authoritative collisionとinteractionは既存simulationを正本とし、North Star artは同じ置換ID／位置を守る。装飾がcollisionを偽装しないこと。
- runtime生成textureを使う場合は決定的seedと明示的disposeを持たせる。最終量産pipelineとは分けたlocal candidateと記録する。
- 1600×900の第一稿では、現代道路、高架、横断歩道、kioskにより村から都市への認識は改善した。一方、south buildingのdetailがcameraと逆の面にあり、巨大な無地boxとして見えた。
- camera-facing側を旧店舗／診療所のtile、窓、shutter、庇、錆補修、洗濯へ反転し、512² asphalt＋linear／mipmapへ変更した第二稿をactual-cameraで確認した。crosswalkも風化／分節し、菜園とrepair bayへ色を足した。
- 第二稿は「都市の旧用途が読める最初のlocal candidate」まで。高解像度baked albedo／normal／roughness、roof microdetail、最終hero／companion、commercial art acceptanceは未達。
- local evidence: 1600×900 viewport、1598×898 canvas、device pixel ratio 1、`environmentProfile=north-star-city`、MSAA、half-float post stack、ground texture `ready`。Vitest 18 files／129 tests、strict TypeScript、Vite production build合格。

## 2026-08-01 — Visual North Star Concept Set v0.4 working notes

- built-in `image_gen`で、A: hybrid HD-2D、B: precision micro-voxel、C: stylized modular 3D、D: synthesis、E: corrected synthesisの五案を生成した。全案は1672×941で、runtime screenshotではない。
- 比較ではDがworld／compositionの最良ベース、Cがactor clarity、Bが明るさ／即読性、Aがhybrid実装の現実性で強かった。Eはこの合成判断を、暗部の持上げ、actor約35%拡大、genericな白髪／白coat／青剣からの離脱、限定したrepair markで反映した。
- Eのprotagonist motif候補はdark windswept hair、pale sage asymmetrical field coat、rust-orange panel、folded semicircular survey frame、short cyan-amber blade。最終人物設定ではなく、通常gameplay倍率で固有silhouetteを作る試験対象。
- 現runtimeは既にorthographic composition、warm key／cool rim、PMREM、half-float MSAA／GTAO／bloom／SMAA、AgX／P3 probeを持つ。Eとの差はpost effect追加より、outdoor／baked light、layered VisualCell、wetness／water、authored foliage、rigged actors、asset pipelineが支配的。
- 推奨production grammarは、realtime stylized 3D actors／collision／occlusion／near shadowと、fixed-camera 3D shell＋baked indirect／PBR／macro decal。flat background一枚にはせず、scroll、parallax、occlusionを保つ。
- canonical assetはBlender sourceからGLB／KTX2へbuildする。AI 3Dはhard-surface donor、concept、surface variationまでに限定し、deforming hero／coat／hair／quadrupedは既知topologyとrigを正本にする。
- simulationの`Acquire → Windup → Hit → Recover`がdamage timingを所有し、animation clipはphase progressを表示する。animation eventからruleを発火しない。
- accepted packはAssetDNA、StyleProfile、GameplayContract、SHA-256、tool／generator version、prompt／spec、license review、人間修正、validation、採否理由を持つ。runtime AIはphysics、collision、damage、合成可否を決めない。
- 最初の実装単位はBeauty Cell一件。road、wall、shelter、rain collector、water、garden、hero、quadruped robot candidate、enemyだけを同じE cameraで作り、2560×1440のidle／move／combat／wet frameをuser reviewする。

## 2026-08-01 — North Star Surface Pass v0.2 working notes

- 判断レベルは引き続き`Revise one thing`。今回直すのは大面積surfaceの平坦さであり、gameplayやrenderer方式は広げない。
- fixed cameraで情報量への寄与が大きい順は、道路／横断歩道、建物roof、camera-facing facade。見えにくい背面へ同量のdetailを置かない。
- 実装候補はNorth Star専用の決定的DataTexture群。albedoだけでなく、同じheight／wear fieldからnormalとroughnessを生成し、各channelのcolor spaceを分離する。
- UVを持たない既存batch全体へ無理にtextureを貼らず、主要な舗装と建物shellだけをUV付きgeometryへ分離する。collision／interactionの正本と置換IDは変えない。
- facadeの汚れ、補修、苔は一様なnoiseにせず、雨筋、地際、排水、亀裂、補修patchへ因果を持たせる。屋根は水溜まり跡、排水、設備支持、植生縁を優先する。
- texture ownershipとdisposeをsurface libraryへ集約し、同じgroupを複数回disposeしても安全にする。
- provenance候補: profile、generator/version、seed、resolution、channels、deterministic flag、content digest、source=`procedural-dev-candidate`。
- commercial reference級という目標は維持するが、この一回で達成したとは判定しない。actual-cameraの第一稿を撮り、最も効く一箇所を再度直す。
- 1600×900第一稿では、road／wall／roofにalbedo／normal／roughnessの物質感が出て、巨大な無地面は解消した。一方、asphaltの補修矩形とroofの湛水輪が複数回規則的に並び、「高精細な生成tile」に見えた。
- 一度のactual-camera改稿は反復感へ限定する。macro wearのrepeatをほぼ一画面一回へ下げ、主要2棟のshell／roofはgeometry側UV位相をずらす。fine aggregate／normalの解像度は維持する。
- macro反復の改稿後、asphaltの固定5px-cellへ必ず骨材を置く規則がscreen上で点格子として露出した。cellは候補位置だけに使い、約36%だけを採用する疎密へ変更。albedo差、height、roughness、normal strengthも抑え、規則より材料の揺らぎとして読む値へ戻す。
- 疎密修正後のroadはmacro反復／点格子を解消し、中央の読みやすさも回復した。次に残る最大の平坦面は南北の長い歩道slabだったため、既存batch内で低contrastの伸縮目地と欠損した点字誘導blockを追加し、人間scaleと旧用途を補う。collision形状は不変。
- code reviewで、BoxGeometry全6面へ同じ0..1 UVとmacro傷を貼る伸縮／同形反復と、scene生成ごとの同期source生成をP1として検出した。各faceの実寸比でUV範囲を縮め、法線方向ごとに位相を変える。生成済みheight／channel／digestはmodule内cacheへ保持し、renderer restartでは再計算しない。初回同期生成自体は残るため、build-time bakeは次sliceの性能／配信課題。
- first-pass local screenshot: `/tmp/north-star-surface-v2-first.png`。
- surfaceごとの派生seedを各texture metadataの`seed`とし、共通値は`baseSeed`へ分離した。library provenanceとtexture provenanceが同じ生成単位を指す。
- final local screenshot: `/tmp/north-star-surface-v2-final.png`。独立visual reviewは静止画上のP0なしで`Keep and stop`。最大の次課題は右上の高架駅／線路構造で、roofの高周波detailは移動時shimmer未検証。
- final local evidence: strict TypeScript、Vitest 19 files／133 tests、Vite production build、`git diff --check`合格。初回同期生成はproduction blockerとして残し、public deploy／pushは行わない。

## 2026-08-01 — Visual Fidelity Foundation v0.3 working notes

- ユーザー評価: 現画面は依然commercial-qualityではない。都市構造の追加より、簡単な構造物でも美しく見える描画方式、個別asset、主人公、画面構成、UI、光を先に追求する。
- 判断レベルは`Return to purpose/value`。次の主要改稿を高架駅の分節から、画面全体のquality foundationへ差し替える。
- preserve: PC-first North Star独立route、半自動戦闘、現代都市の旧用途、Surface Pass v0.2、baseline route、決定論的simulation。
- visual protagonist: 主人公。読む順番は`主人公と進路 → 光と空気が作る空間 → 旧用途／生活痕跡 → 必要な戦闘情報`。
- hard boundary: geometryやprop数の追加だけでrichnessを作らない。固有作品のasset／costume／palette／構図は写さない。
- 一次資料から採用したproduction principle: HD-2Dではflat characterと3D backgroundの統合、固定camera、dynamic lightingが中核。NieR系の制作知見ではopen spaceでsilhouetteを立て、material、light、particleを空間と危険の読みへ使う。Three.jsではPMREMでroughness-awareなIBLを与える。
- 第一稿はPMREM 0.58、hemisphere 0.86、AgX exposure 1.18で、道路、concrete、foliage、metalが白い同一明度帯へ圧縮された。lighting機能の有無ではなく、ambient／direct／fog／display transformの比率が主因だった。
- 第二稿はPCだけをAgX exposure 0.98、PMREM 0.26、hemisphere 0.42、warm key 2.68、cool rim 0.62、fog near 1140へ変更した。明るい世界を維持しつつ、direct lightとshadow／material responseを分離した。
- PC cameraを510から360 world-unitへ寄せ、探索中は進行方向へ46、戦闘中はtarget方向へ最大27.36 world-unitだけ構図を共有する。simulation／targetingは変更しない。camera profileはrender qualityではなくexperienceから明示する。
- 主人公はmatte clothをsheen付きPhysicalMaterial、metalを高metalness＋low clearcoat、signalをHDR値のtone-map外emissiveへ分離した。造形source自体は既存24×32×16であり、material改善を最終造形の代替にしない。
- PC fine-pointerではtouch control、idle combat readout、diagnostic badge／performanceを非表示。intro中はHUD／loadout／promptも退かせ、左40%のscrim、title、開始button、worldだけを視線入口にした。
- actual browser evidence: 1280×720／DPR 2、canvas 2556×1436、`half-float-msaa`、MSAA 4、GTAO／bloom／SMAA true、PMREM IBL、Display-P3、AgX exposure 0.98、texture ready、touch control `display:none`。
- visual judgment: simple box主体でも光、接地、material差、UI hierarchyは第一稿より明確に改善した。一方、主人公の顔、髪、衣装、手足のsilhouetteはまだliteral voxel recipeに支配され、commercial character qualityへ未達。次は都市を増やさず、literal high-density voxel／semantic voxel surface／stylized low-polyを同camera／light／poseで比較する。
