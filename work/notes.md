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
