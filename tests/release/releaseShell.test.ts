import { describe, expect, it } from "vitest";

import catalogHtml from "../../index.html?raw";
import r01Html from "../../public/r01/index.html?raw";
import r01Snapshot from "../../public/r01/SNAPSHOT.json?raw";
import r01Checksums from "../../public/r01/SHA256SUMS?raw";
import r01ServiceWorker from "../../public/r01/sw.js?raw";
import r02Html from "../../public/r02/index.html?raw";
import r02Snapshot from "../../public/r02/SNAPSHOT.json?raw";
import r02Checksums from "../../public/r02/SHA256SUMS?raw";
import r02ServiceWorker from "../../public/r02/sw.js?raw";
import r03Html from "../../public/r03/index.html?raw";
import r03Snapshot from "../../public/r03/SNAPSHOT.json?raw";
import r03Checksums from "../../public/r03/SHA256SUMS?raw";
import r03ServiceWorker from "../../public/r03/sw.js?raw";
import r04Html from "../../public/r04/index.html?raw";
import r04Snapshot from "../../public/r04/SNAPSHOT.json?raw";
import r04Checksums from "../../public/r04/SHA256SUMS?raw";
import r04ServiceWorker from "../../public/r04/sw.js?raw";
import r04Manifest from "../../public/r04/manifest.webmanifest?raw";
import r05Html from "../../public/r05/index.html?raw";
import r05Snapshot from "../../public/r05/SNAPSHOT.json?raw";
import r05Checksums from "../../public/r05/SHA256SUMS?raw";
import r05ServiceWorker from "../../public/r05/sw.js?raw";
import r05Manifest from "../../public/r05/manifest.webmanifest?raw";
import r06Html from "../../r06/index.html?raw";
import r06Manifest from "../../public/r06/manifest.webmanifest?raw";
import r06ServiceWorker from "../../public/r06/sw.js?raw";
import r07Html from "../../r07/index.html?raw";
import r08Html from "../../r08/index.html?raw";
import serviceWorker from "../../public/sw.js?raw";
import deployWorkflow from "../../.github/workflows/deploy-pages.yml?raw";
import catalogSource from "../../src/catalog.ts?raw";
import viteConfig from "../../vite.config.ts?raw";

describe("versioned public release shell", () => {
  it("uses a dedicated catalog entry and dedicated game entries", () => {
    expect(catalogHtml).toContain('src="/src/catalog.ts"');
    expect(catalogHtml).toContain("F.R.A.M. — AIとつくる世界記憶型・放浪RPG");

    expect(r01Html).toContain('src="./assets/index-');
    expect(r01Html).not.toContain("/src/main.ts");
    expect(r01Html).toContain("R01 — North Star Snapshot");
    expect(r01Snapshot).toContain(
      '"source_commit": "88d0f2f66cc4f6e531d6fcb875f2395403c360e5"',
    );
    expect(r01Snapshot).toContain('"frozen": true');
    expect(r01Checksums).toContain(
      "a5510d9b2433366f1c6de5239502f872579b3ef6bd2c2abb54ab321c4cbc236e  assets/index-Cj67ZGSF.js",
    );
    expect(viteConfig).not.toContain('r01: "r01/index.html"');
    expect(r02Html).toContain('src="./assets/r02-');
    expect(r02Html).not.toContain('/src/main.ts');
    expect(r02Html).toContain("R02 — AI-native Concept C Beauty Cell");
    expect(r02Snapshot).toContain(
      '"source_commit": "0b5fd9f6a332cec92ea0ccb1e333bd31865b611e"',
    );
    expect(r02Snapshot).toContain('"frozen": true');
    expect(r02Checksums).toContain("assets/r02-Dyj0RLzg.js");
    expect(viteConfig).not.toContain('r02: "r02/index.html"');

    expect(r03Html).toContain('src="./assets/r03-');
    expect(r03Html).not.toContain('/src/r03/main.ts');
    expect(r03Html).toContain("R03 — Concept C Beauty Benchmark");
    expect(r03Snapshot).toContain(
      '"source_commit": "79bf341696e015ece815e40eefdd6e5d8cb2adb6"',
    );
    expect(r03Snapshot).toContain('"frozen": true');
    expect(r03Checksums).toContain("assets/r03-B-jNzUXL.js");
    expect(viteConfig).not.toContain('r03: "r03/index.html"');

    expect(r04Html).toContain('src="./assets/r04-');
    expect(r04Html).not.toContain('/src/main.ts');
    expect(r04Html).toContain("R04 — Causal World Beauty Cell");
    expect(r04Html).toContain(
      'href="./assets/reclaimed-meadow-v1-CgTL2cqk.webp"',
    );
    expect(r04Snapshot).toContain(
      '"source_commit": "3cb27cd3630071b90ae6264e10e84d85f7bf929d"',
    );
    expect(r04Snapshot).toContain('"frozen": true');
    expect(r04Checksums).toContain("assets/r04-IriE60sk.js");
    expect(viteConfig).not.toContain('r04: "r04/index.html"');
    expect(r05Html).toContain('src="./assets/r05-');
    expect(r05Html).not.toContain('/src/main.ts');
    expect(r05Snapshot).toContain('"release": "r05"');
    expect(r05Checksums).toContain("assets/r05-DY3D0AKC.js");
    expect(viteConfig).not.toContain('r05: "r05/index.html"');

    expect(r06Html).toContain('src="/src/main.ts"');
    expect(r06Html).toContain("F.R.A.M. R06");
    expect(viteConfig).toContain('r06: "r06/index.html"');
    expect(r07Html).toContain('src="/src/main.ts"');
    expect(r07Html).toContain("F.R.A.M. R07");
    expect(viteConfig).toContain('r07: "r07/index.html"');
    expect(r08Html).toContain('src="/src/main.ts"');
    expect(r08Html).toContain("F.R.A.M. R08");
    expect(viteConfig).toContain('r08: "r08/index.html"');
  });

  it("renders the version manifest in declared newest-first order", () => {
    expect(catalogSource).toContain("PROTOTYPE_RELEASES.map");
    expect(catalogSource).toContain('data-testid="prototype-catalog"');
    expect(catalogSource).toContain("createReleaseHref(release.id");
    expect(catalogSource).toContain('prototypeParameter === "0.1"');
  });

  it("makes the game identity static and hard-gates archive images", () => {
    expect(catalogHtml).toContain('class="catalog-static"');
    expect(catalogHtml).toContain("AI-NATIVE GAME DEVELOPMENT PROJECT");
    expect(catalogHtml).toContain("世界記憶型・放浪RPG");
    expect(catalogHtml).toContain("最新版を遊ぶ");
    expect(catalogHtml).toContain("AI開発実験を見る");
    expect(catalogHtml).toContain("catalog/r06-hero.jpg");
    expect((catalogHtml.match(/<img/g) ?? [])).toHaveLength(1);
    expect(catalogSource).toContain("遊べるAI開発実験");
    expect(catalogSource).toContain("TECHNICAL EPOCHS / 技術エポック");
    expect(catalogSource).toContain('data-deferred-src="${thumbnail}"');
    expect(catalogSource).toContain('rootMargin: "220px 0px"');
    expect(catalogSource).not.toContain('\n            src="${thumbnail}"');
  });

  it("gives R04 an install scope that returns to the live R04 route", () => {
    const manifest = JSON.parse(r04Manifest) as {
      readonly id: string;
      readonly start_url: string;
      readonly scope: string;
    };

    expect(r04Html).toContain('href="./manifest.webmanifest"');
    expect(manifest).toMatchObject({
      id: "/game/r04/",
      start_url: "/game/r04/",
      scope: "/game/r04/",
    });
  });

  it("gives R05 its own install identity and canonical start route", () => {
    const manifest = JSON.parse(r05Manifest) as {
      readonly id: string;
      readonly start_url: string;
      readonly scope: string;
    };

    expect(r05Html).toContain('href="./manifest.webmanifest"');
    expect(r05Html).toContain('./og.png');
    expect(manifest).toMatchObject({
      id: "/game/r05/",
      start_url: "/game/r05/",
      scope: "/game/r05/",
    });
  });

  it("gives R06 its own install identity and canonical start route", () => {
    const manifest = JSON.parse(r06Manifest) as {
      readonly id: string;
      readonly start_url: string;
      readonly scope: string;
    };

    expect(r06Html).toContain('href="./manifest.webmanifest"');
    expect(r06Html).toContain('/game/r06/og.png');
    expect(manifest).toMatchObject({
      id: "/game/r06/",
      start_url: "/game/r06/",
      scope: "/game/r06/",
    });
  });

  it("caches and restores each release document independently", () => {
    expect(serviceWorker).toContain('const CACHE_NAME = "fram-catalog-v3"');
    expect(serviceWorker).not.toContain('new URL("./r01/index.html"');
    expect(serviceWorker).not.toContain('new URL("./r05/index.html"');
    expect(serviceWorker).not.toContain("cacheDocumentAndLinkedAssets");
    expect(r01ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r01-shell-"',
    );
    expect(r02ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r02-shell-"',
    );
    expect(r03ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r03-shell-"',
    );
    expect(r04ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r04-shell-"',
    );
    expect(r05ServiceWorker).toContain(
      'const CACHE_NAME = "fram-r05-snapshot-v1"',
    );
    expect(r06ServiceWorker).toContain(
      'const CACHE_NAME = "fram-r06-shell-v1"',
    );
    expect(serviceWorker).not.toContain("relic-frontier-r01-shell-");
    expect(serviceWorker).not.toContain("relic-frontier-r02-shell-");
    expect(serviceWorker).not.toContain("relic-frontier-r03-shell-");
    expect(serviceWorker).not.toContain("relic-frontier-r04-shell-");
  });

  it("gates the Pages artifact on tests and compilation", () => {
    expect(deployWorkflow).toContain("run: pnpm check");
    expect(deployWorkflow).not.toContain("run: pnpm build\n");
  });
});
