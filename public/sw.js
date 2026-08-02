"use strict";

const CACHE_NAME = "fram-catalog-v3";
const SCOPE_URL = new URL("./", self.registration.scope);
const CATALOG_URL = new URL("./index.html", SCOPE_URL).href;
const STATIC_URLS = [
  new URL("./manifest.webmanifest", SCOPE_URL).href,
  new URL("./icon.svg", SCOPE_URL).href,
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(STATIC_URLS);
    const response = await fetch(new Request(CATALOG_URL, { cache: "reload" }));
    if (response.ok) await cache.put(CATALOG_URL, response.clone());
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter((name) => (
        name.startsWith("relic-frontier-shell-") ||
        name.startsWith("small-persistent-world-shell-") ||
        name.startsWith("fram-catalog-")
      ) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== SCOPE_URL.origin || !url.href.startsWith(SCOPE_URL.href)) return;

  const isCatalogNavigation = request.mode === "navigate" &&
    (url.pathname === new URL("./", SCOPE_URL).pathname ||
      url.pathname === new URL("./index.html", SCOPE_URL).pathname);

  if (!isCatalogNavigation) return;
  event.respondWith(fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(CATALOG_URL, response.clone());
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(CATALOG_URL);
    return cached ?? new Response("Offline", { status: 503 });
  }));
});
