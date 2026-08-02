"use strict";

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
