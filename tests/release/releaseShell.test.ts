import { describe, expect, it } from "vitest";

import catalogHtml from "../../index.html?raw";
import r01Html from "../../public/r01/index.html?raw";
import r01Snapshot from "../../public/r01/SNAPSHOT.json?raw";
import r01Checksums from "../../public/r01/SHA256SUMS?raw";
import r01ServiceWorker from "../../public/r01/sw.js?raw";
import r02Html from "../../r02/index.html?raw";
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
    expect(r02Html).toContain('src="/src/main.ts"');
    expect(r02Html).toContain("R02 — AI-native Concept C Beauty Cell");
  });

  it("renders the version manifest in declared newest-first order", () => {
    expect(catalogSource).toContain("PROTOTYPE_RELEASES.map");
    expect(catalogSource).toContain('data-testid="prototype-catalog"');
    expect(catalogSource).toContain("createReleaseHref(release.id");
    expect(catalogSource).toContain('prototypeParameter === "0.1"');
  });

  it("caches and restores each release document independently", () => {
    expect(serviceWorker).toContain('r01: new URL("./r01/index.html"');
    expect(serviceWorker).toContain('r02: new URL("./r02/index.html"');
    expect(serviceWorker).toContain("resolveRouteIndexUrl(request.url)");
    expect(serviceWorker).toContain('"small-persistent-world-shell-"');
    expect(serviceWorker).toContain(
      "cacheDocumentAndLinkedAssets(cache, indexUrl, response.clone())",
    );
    expect(r01ServiceWorker).toContain(
      'const CACHE_PREFIX = "relic-frontier-r01-shell-"',
    );
    expect(serviceWorker).not.toContain("relic-frontier-r01-shell-");
  });

  it("gates the Pages artifact on tests and compilation", () => {
    expect(deployWorkflow).toContain("run: pnpm check");
    expect(deployWorkflow).not.toContain("run: pnpm build\n");
  });
});
