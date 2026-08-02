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
import r04Html from "../../r04/index.html?raw";
import r04Manifest from "../../public/r04/manifest.webmanifest?raw";
import serviceWorker from "../../public/sw.js?raw";
import deployWorkflow from "../../.github/workflows/deploy-pages.yml?raw";
import catalogSource from "../../src/catalog.ts?raw";
import viteConfig from "../../vite.config.ts?raw";

describe("versioned public release shell", () => {
  it("uses a dedicated catalog entry and dedicated game entries", () => {
    expect(catalogHtml).toContain('src="/src/catalog.ts"');
    expect(catalogHtml).toContain("Prototype Archive");

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

    expect(r04Html).toContain('src="/src/main.ts"');
    expect(r04Html).toContain("R04 — Causal World Beauty Cell");
    expect(r04Html).toContain(
      'href="../src/prototypeB/render/assets/reclaimed-meadow-v1.webp"',
    );
    expect(viteConfig).toContain('r04: "r04/index.html"');
  });

  it("renders the version manifest in declared newest-first order", () => {
    expect(catalogSource).toContain("PROTOTYPE_RELEASES.map");
    expect(catalogSource).toContain('data-testid="prototype-catalog"');
    expect(catalogSource).toContain("createReleaseHref(release.id");
    expect(catalogSource).toContain('prototypeParameter === "0.1"');
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

  it("caches and restores each release document independently", () => {
    expect(serviceWorker).toContain('const CACHE_VERSION = "r04-v1"');
    expect(serviceWorker).toContain('r01: new URL("./r01/index.html"');
    expect(serviceWorker).toContain('r02: new URL("./r02/index.html"');
    expect(serviceWorker).toContain('r03: new URL("./r03/index.html"');
    expect(serviceWorker).toContain('r04: new URL("./r04/index.html"');
    expect(serviceWorker).toContain("resolveRouteIndexUrl(request.url)");
    expect(serviceWorker).toContain('"small-persistent-world-shell-"');
    expect(serviceWorker).toContain(
      "cacheDocumentAndLinkedAssets(cache, indexUrl, response.clone())",
    );
    expect(r01ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r01-shell-"',
    );
    expect(r02ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r02-shell-"',
    );
    expect(r03ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r03-shell-"',
    );
    expect(serviceWorker).not.toContain("relic-frontier-r01-shell-");
    expect(serviceWorker).not.toContain("relic-frontier-r02-shell-");
    expect(serviceWorker).not.toContain("relic-frontier-r03-shell-");
  });

  it("gates the Pages artifact on tests and compilation", () => {
    expect(deployWorkflow).toContain("run: pnpm check");
    expect(deployWorkflow).not.toContain("run: pnpm build\n");
  });
});
