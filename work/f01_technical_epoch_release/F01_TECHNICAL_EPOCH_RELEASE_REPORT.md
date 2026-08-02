# F-01 Technical Epoch Release Report

Status: completed  
Date: 2026-08-02

## Scope

Character Forge F-01をprototype releaseとは分離した技術検証の保存版としてcatalogとGitHub Pagesへ公開する。

## Result

### Local release candidate

- `/game/`にR版と独立した`Technology Epochs` sectionを追加した。
- F-01 cardは実runtime captureを使い、`USER REVIEW · APPROX. 70%`、技術検証であること、stable routeを明示した。
- catalog／PWA identityを正式作品名`F.R.A.M. — Development Archive`へ統一した。
- 正式名の下に`FRONTIER RELICS ARCHIVE MODULE · 辺境遺物記録モジュール`を小さく併記し、catalog全体をplayerが旅と各試作の違いを読み取れる日本語へ改稿した。
- F-01 routeの`LOCAL RECONSTRUCTION`表記を、公開後も矛盾しない`REPRODUCIBLE RECONSTRUCTION`へ変更した。
- Build Sheet→surface cellsは`compile-f01-surface-pack.py`で開発時に実行し、runtimeは47,270 bytesのvalidated packを展開する。1.8 MBの原寸Build Sheetは開発正本として残し、公開表示には87 KB derivativeを使う。
- 3D module到着前にF.R.A.M.／F-01の静的boot shellを表示し、catalog下段のR01〜R06画像はlazy loadへ変更した。
- root service workerを`fram-catalog-v3`へ更新し、旧catalog cacheから切り替える。

### Local verification

- Vitest: 38 files／204 tests passed。
- Strict TypeScript: passed。
- Production build: passed。`dist/client/forge/f01/index.html`と`dist/client/catalog/f01.jpg`を確認した。
- 1280×720 production preview catalog: `F.R.A.M.`、epoch 1件、release 6件、F-01 image 1280px、link `/game/forge/f01/`を確認した。
- Production preview F-01: canvas起動、9,454 render cells、37,990 source volume、7 rig parts、catalogへのrelative return linkを確認した。
- Surface compilerを二回実行し、47,270 bytes、9,454 cells、digest `a77a7e0…`が一致した。
- 軽量化後のproduction previewは同じcharacter visualを維持し、warm navigation後のapp ready markerが79〜102 msだった。これはpublic cold-load値ではない。

### Public verification

- Commit `2c64a5d36c65c4aeade58844fb00750a5589198e`を`main`へpushした。
- GitHub Actions `Deploy GitHub Pages` run #19／ID `30751781702`はbuild／deployともsuccessだった。
- `https://t-omori-lab.github.io/game/`、`/game/forge/f01/`、`/game/forge/f01-build-sheet.jpg`はHTTPS 200を返した。
- Public catalogを実browserで開き、`F.R.A.M.`、full name／日本語副題、epoch 1件、release 6件、F-01 image／link、release cover全件lazyを確認した。
- Public F-01を実browserで開き、9,454 cells、37,990 volume、7 rig parts、catalog return、app ready 531 ms、1151px Build Sheet previewを確認した。
- 既存R01〜R08を削除せず、catalog上のlatest playableはR06のまま維持した。

## Next

F-02でhair＋faceをmodule別正投影から復元し、close-upと通常gameplay cameraの両方で同じ人物として読めるかを評価する。
