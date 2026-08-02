# F.R.A.M. catalog and Forge next-version recommendation

Status: review proposal. No runtime or public deployment changed.

## Core judgment

The root page should be rebuilt as a game landing page first, an AI-native development-research page second, and an archive third. Copy edits alone will not fix the current hierarchy.

## Proposed first-view hierarchy

1. `AI-NATIVE GAME DEVELOPMENT PROJECT`
2. `F.R.A.M.`
3. `FRONTIER RELICS ARCHIVE MODULE / 辺境遺物記録モジュール`
4. `自然に侵食された都市を放浪し、遺物を回収し、世界の記憶を持ち帰るRPG。`
5. Primary CTA: `最新版を遊ぶ` / secondary CTA: `AI開発実験を見る`
6. One actual gameplay image from the latest playable build

Immediately below, state the research identity in one sentence:

> ゲームをつくる。ゲームを生成する仕組みもつくる。F.R.A.M.は、世界、人物、遺物、物語を共通の法則から生成し、遊べる形へ組み上げるAI-native開発研究です。

## Section naming

Recommended public hierarchy:

- Eyebrow / classification: `TECHNICAL EPOCHS / 技術エポック`
- Section heading: `遊べるAI開発実験`

- `技術エポック`はF.R.A.M.らしい分類名として残し、初見でも意味が分かる見出しを上に置く。
- `開発の節目`のような抽象語に戻さず、遊べる実験であることを明言する。

Alternatives:

1. `F.R.A.M.の表現研究` — gameとの関係が明瞭
2. `一枚絵から、動く世界へ` — F-01固有の見出しとして強い
3. `世界と旅人のつくり方` — 生成研究を柔らかく伝える
4. `FORGE RECORDS / 生成工房記録` — 世界内用語としては強いが、初見の説明力は低い

Recommended description:

> キャラクター、描画、生成工程の作り方が変わった時だけ、技術エポックとして記録します。F-01では、生成したキャラクターシートから、動かせる高密度ボクセルモデルを再構築しました。

## Replacement for the rejected archive copy

> 公開中の各版は、その時点の操作、戦闘、画面表現を残したプレイアブル版です。最新版と過去版を、ブラウザですぐ比較できます。

## Catalog performance contract

1. Put the title, description, and primary CTA in static HTML so they appear before JavaScript.
2. Download only one hero/gameplay poster in the first viewport.
3. Replace native-only lazy loading with `data-src` plus IntersectionObserver at a small threshold. Past cards must have no real `src` before intersection.
4. Convert catalog posters to 640–960px AVIF/WebP derivatives; keep canonical screenshots untouched.
5. Render old builds as lightweight text rows until they approach the viewport. Preserve every public link.
6. Remove the root catalog service worker, or reduce it to a one-time stale-worker cleanup. Offline/PWA ownership belongs to the playable route.
7. Acceptance budget: first-view transfer <= 150 KB; archive images 0 bytes before scroll; one visible raster <= 100 KB; LCPまでのrequest <= 6; game／Forge chunk 0件; meaningful title/CTA visible without JavaScript; clean-profile checks on desktop and iPhone-sized viewport.

## Forge camera contract

Use three explicit presets:

- `CLOSE`: face, hair, material and cell inspection.
- `FULL`: full-body animation and silhouette. This replaces the misleading current `GAME` name.
- `FIELD`: actual gameplay evaluation.

`FIELD` requirements:

- Reuse the main game's fixed diagonal camera angle, not only a larger character-inspection radius.
- Fit the actor to 14–18% of viewport height at 1280×720, with a target of 16%.
- Allow manual zoom beyond the preset; increase camera far plane and OrbitControls maximum distance proportionally.
- Add a lightweight world-scale reference plane or frozen gameplay-cell backdrop so the small actor is judged in context.
- Keep the same animation, material, light direction and actor identity across all three presets.
- Test the projected screen occupancy, no clipping, exact preset return, and the same actor at close and FIELD distance.

## Recommended implementation order

1. Rebuild root first view and copy; make the game and research identity explicit.
2. Make the catalog first paint static and hard-gate thumbnail loading.
3. Add `FIELD` to F-01 and share a gameplay camera contract.
4. Verify local desktop and iPhone-sized browser views.
5. Deploy only after the user reviews the new local root and FIELD screenshot.
