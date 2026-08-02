# Notes: F.R.A.M. 次期方針整理

## Confirmed baseline

- 公開latest playableはR06。Character Forge F-01は独立technical epochとして公開済み。
- F-01はユーザー暫定評価約70%。画像生成→Build Sheet→検証済み3D surface pack→semantic rigのpipeline proofは成立した。
- catalogはgame-first identityへ改善済みだが、ユーザーは読み込みがまだ重いと感じている。
- Visual North StarはConcept C。高密度voxel／rich pixel-art知覚、fixed diagonal diorama、HD-2D的な弱いdepth softnessを目指す。
- productの主体験は自由放浪、world memory、自然侵食された現代都市、条件付き自動通常攻撃＋手動大技、自分で選ぶ拠点。
- 既存未追跡R05画像18件は今回の所有対象外。

## Tensions to resolve

- F-02をForgeだけで改善すると、再び「良いcharacter demoだが別ゲーム」の状態になり得る。
- gameplayだけを先行すると、最重要のcharacter appeal／Concept C画面品質が再び後回しになる。
- world生成やLLMを広げると、夏のplayable loopよりtoolchain制作が主目的になり得る。
- PC最高品質を追う一方、browserの初回loadとiPhone tierを同じasset sourceから成立させる必要がある。

## Runtime／load audit

- catalog root service workerはcatalog navigationだけを扱い、過去route全件のprecacheは既に撤去済み。first view自体を再び主タスクにする必要はない。
- ただしscroll後のarchiveには過去の大きいcaptureが残り、R06起動側はThree／renderer／game chunk、生成surface、旧hero系のstatic importが重なる。体感の「まだ重い」はcatalog first viewだけでは説明し切れない。
- 次版はperformance大改修を独立主題にせず、先にcold start baselineを取る。新しいcharacter routeはBeauty／Build SheetやR07／R08 reference画像をgameplay起動時にloadせず、検証済みruntime packだけをroute単位でloadする。
- catalog budgetは既存の`first view <= 150 KB / archive 0 byte before scroll`を維持する。game routeは計測前に架空の達成値を確定せず、R06比のtransfer／first-controllable／long taskを記録し、R09で10%以上悪化させないことを暫定guardとする。

## Synthesis decision

- 次の主milestoneは**R09 First Memory Expedition**とする。二site、拠点選択、module設置、save、二回目差分をつなぎ、F.R.A.M.固有のworld memoryを最初にgame loop化する。
- visualを後回しにせず、F-01を同じR09 sceneへbridgeする。F-02はStandalone Forgeで先行せず、通常camera、移動、戦闘、world lightで露呈したhair／face／jacket／pack／toolの問題をmodule単位で直す。
- First Memory Loopのlogic proofは現行actorで進め、F-02待ちで止めない。F-02はR09のvisual benchmark候補化を塞ぐ独立gateとする。
- completionはR09A Logic ProofとR09B Visual Review Candidateへ分ける。R09Aは二site×二module、回収物消費、撤退、save／reload、auto-basic／manual skillをF-01なしで通す。
- R09は新save namespaceを使い、R06／WorldLegacyを自動importせず旧saveを保持する。F-01の失敗時は現行actorへfallbackし、world-memory schemaをvisual assetへ依存させない。
- R09後はRelic Buildcraft、First Companion、Causal World Cellの順に、同じplayable主線へ生成systemを追加する。
