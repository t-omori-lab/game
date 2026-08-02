import { createHash } from "node:crypto";
import {
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(projectRoot, "dist", "client");
const sourceIndex = path.join(sourceRoot, "r05", "index.html");
const sourceAssets = path.join(sourceRoot, "assets");
const targetRoot = path.join(projectRoot, "public", "r05");
const targetAssets = path.join(targetRoot, "assets");

await stat(sourceIndex);
await stat(sourceAssets);
await mkdir(targetRoot, { recursive: true });
await rm(targetAssets, { force: true, recursive: true });
await cp(sourceAssets, targetAssets, { recursive: true });

const sourceHtml = await readFile(sourceIndex, "utf8");
const snapshotHtml = sourceHtml
  .replaceAll('/game/assets/', './assets/')
  .replaceAll('https://t-omori-lab.github.io/game/r05/', './')
  .replace(
    "</body>",
    `  <script>
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("./sw.js", { scope: "./" });
        });
      }
    </script>
  </body>`,
  );

await writeFile(path.join(targetRoot, "index.html"), snapshotHtml);

const snapshot = {
  schemaVersion: 1,
  release: "r05",
  title: "F.R.A.M. / High-density Voxel Girl",
  sourceCommit: "dea41e8",
  frozenAt: "2026-08-02T00:00:00+09:00",
  note: "The public R05 renderer is frozen before the R06 sharp-navigation pass.",
};
await writeFile(
  path.join(targetRoot, "SNAPSHOT.json"),
  `${JSON.stringify(snapshot, null, 2)}\n`,
);

const serviceWorker = `"use strict";

const CACHE_NAME = "fram-r05-snapshot-v1";
const SCOPE_URL = new URL("./", self.registration.scope);
const INDEX_URL = new URL("./index.html", SCOPE_URL).href;
const STATIC_URLS = [
  new URL("./manifest.webmanifest", SCOPE_URL).href,
  new URL("./icon.svg", SCOPE_URL).href,
  new URL("./og.png", SCOPE_URL).href,
  new URL("./SNAPSHOT.json", SCOPE_URL).href,
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_URLS);
    const response = await fetch(new Request(INDEX_URL, { cache: "reload" }));
    if (response.ok) {
      await cache.put(INDEX_URL, response.clone());
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => name.startsWith("fram-r05-snapshot-") && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== SCOPE_URL.origin || !url.href.startsWith(SCOPE_URL.href)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(async () => {
      const cached = await caches.match(INDEX_URL);
      return cached ?? new Response("Offline", { status: 503 });
    }));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
`;
await writeFile(path.join(targetRoot, "sw.js"), serviceWorker);

const files = await listFiles(targetRoot);
const checksumLines = [];
for (const file of files) {
  if (path.basename(file) === "SHA256SUMS") continue;
  const bytes = await readFile(file);
  const digest = createHash("sha256").update(bytes).digest("hex");
  checksumLines.push(`${digest}  ${path.relative(targetRoot, file)}`);
}
await writeFile(
  path.join(targetRoot, "SHA256SUMS"),
  `${checksumLines.sort().join("\n")}\n`,
);

console.log(`Frozen R05 snapshot: ${files.length} files`);

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(absolute));
    else files.push(absolute);
  }
  return files;
}
