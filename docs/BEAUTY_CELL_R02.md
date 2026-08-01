# AI-native Concept C Beauty Cell — R02

Last updated: 2026-08-02  
Status: implementation candidate; public art acceptance pending

## Purpose

Concept Cで採択した「高密度な小型3D造形、固定斜め俯瞰、濡れた都市、暖かい光と冷たい影、HD-2D的な奥行き」を、背景画像ではなく実際に歩いて戦えるrealtime sceneとして一画面に成立させる。一般game engineへ移行せず、現在のThree.js／deterministic simulation／browser preview基盤で、AIがworldを生成するための最小縦sliceを作る。

## Public version contract

- `/game/`: 公開prototypeの一覧。常に新しい順で、各版の説明とplay linkを表示する。
- `/game/r01/`: 2026-08-01時点のConcept C Direction Lockを比較用に保持する。
- `/game/r02/`: AI-native Concept C Beauty Cell。
- `?prototype=north-star`: R01への互換alias。
- `?prototype=beauty-cell`: R02への互換alias。
- 今後のdeploy計画では、過去版を残すかを必ず確認する。明示的な削除指示がない限り、公開済みversion routeを上書きしない。

## AI-native generation contract

R02は一枚絵を背景、depth、normal、textureへ流用しない。`BeautyCellSpec`をsceneの正本とし、安定ID、schema version、seed、bounds、composition bands、material grammar、causal rule、gameplay promise、generation provenanceからruntime geometryを構築する。

生成の責任分界は次のとおり。

- AI／agent: spec候補、visual grammar、module配置、actor recipe、flavor候補を作る。
- deterministic compiler: specからgeometry、material、instance配置、LOD候補を再現する。
- simulation: collision、damage、interaction、inventory、world stateの真実を所有する。
- human direction: North Starとの比較、採否、優先順位、例外を決める。

この分離により、AI生成物を増やしても「見た目だけで通れない」「説明だけ強い」「同じseedで再現しない」という破綻をgame ruleへ持ち込まない。

## Beauty Cell grammar

sceneはhero周辺の一画面を、foreground、middle ground、backgroundへ分ける。

- foreground: 左下の雨に濡れた階段と擁壁、画面端の葉、手入れされたplanter。
- middle ground: 歩ける濡れた交差点、風化した横断歩道、旧交通shelter、契約端末を兼ねる作業台。
- background: 水の溜まるspillway、壊れた都市frame、world-spaceに存在するanomaly。
- focal hierarchy: 主人公と調査robot、日差しの当たるroute、amberの生活技術、cyanの異常現象。

植生は飾りとして均一に撒かず、水、光、排水、人間の手入れから密度を決める。detailはplayer corridorを縁取るが、移動、enemy、telegraph、interactableを隠さない。

## Realtime visual stack

- WebGL2、AgX tone mapping、half-float render target、4× MSAA。
- GTAO、抑制したbloom、SMAA。
- R02だけに固定camera用のtwo-pass tilt-shift depth separationを適用し、DOM HUDはsharpに保つ。
- warm directional key、cool rim、低いambient／IBLで、明るい世界を灰色へ均さずmaterial差を残す。
- wet asphalt、clearcoat puddle、風化concrete、水、葉、布、metal、emissiveを同じ明度帯へ潰さない。
- PC Ultraをmasterとし、iPhoneは後で同じspec／asset sourceからrender scale、shadow、post、instance、textureを縮退する。

## Actor contract

R02のdefault protagonistは女性型field surveyorだが、製品主人公を固定しない。body、顔、髪、性別表現、種族、augmentation、装備は将来の`CharacterGenome`へ分離する。今回のactorは、SF作業服、sensor、battery／heat／service機構、technical cutterを読み取れることを優先し、中世fantasyの白coat／魔法剣へ寄せない。

companionは加入仕様の確定ではなく、造形比較のvisual-only previewである。将来はrobot、犬、robot犬、猫型機、人物などをworld内で発見し、rosterから交代する。

## Acceptance boundary

R02の実装・test・deploy成功は、Concept Cへ向かう公開prototypeの成立を意味する。商業品質、OCTOPATH TRAVELER／NieR:Automata同等、true HDR、WebGPU採用、iPhone 16 Pro実機合格、最終actor art、user art acceptanceは別gateであり、自動的に達成扱いにしない。

