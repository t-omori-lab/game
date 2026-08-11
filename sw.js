"use strict";

const RETIRED_CACHE_PREFIXES = [
  "fram-catalog-",
  "relic-frontier-shell-",
  "small-persistent-world-shell-",
];

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => (
          RETIRED_CACHE_PREFIXES.some((prefix) => name.startsWith(prefix))
        ))
        .map((name) => caches.delete(name)),
    );
    await self.clients.claim();
    await self.registration.unregister();
  })());
});
