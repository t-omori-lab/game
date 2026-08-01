"use strict";

const CACHE_PREFIX = "relic-frontier-r02-shell-";
const CACHE_VERSION = "snapshot-0b5fd9f-v1";
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
const SCOPE_URL = new URL("./", self.registration.scope);
const ROOT_URL = new URL("./", SCOPE_URL).href;
const INDEX_URL = new URL("./index.html", SCOPE_URL).href;
const STATIC_SHELL_URLS = [
  ROOT_URL,
  new URL("./manifest.webmanifest", SCOPE_URL).href,
  new URL("./icon.svg", SCOPE_URL).href,
];
const CACHEABLE_DESTINATIONS = new Set([
  "font",
  "image",
  "manifest",
  "script",
  "style",
  "worker",
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(STATIC_SHELL_URLS);

      const indexResponse = await fetch(
        new Request(INDEX_URL, { cache: "reload" }),
      );

      if (!isCacheable(indexResponse)) {
        throw new Error("The R02 application shell could not be cached.");
      }

      await cacheIndexAndLinkedAssets(cache, indexResponse);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      const obsoleteNames = cacheNames.filter(
        (name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME,
      );

      await Promise.all(obsoleteNames.map((name) => caches.delete(name)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (
    requestUrl.origin !== SCOPE_URL.origin ||
    !requestUrl.href.startsWith(SCOPE_URL.href)
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (
    CACHEABLE_DESTINATIONS.has(request.destination) ||
    /\.(?:css|js|svg|png|webp|woff2?|webmanifest)$/i.test(requestUrl.pathname)
  ) {
    event.respondWith(cacheFirstAsset(request));
  }
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request);

    if (isCacheable(response)) {
      const cache = await caches.open(CACHE_NAME);

      try {
        await cacheIndexAndLinkedAssets(cache, response.clone());
      } catch {
        // A quota or transient asset failure must not block an online response.
      }
    }

    return response;
  } catch {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(INDEX_URL);

    if (cached !== undefined) {
      return cached;
    }

    return new Response(
      "<!doctype html><html lang=\"ja\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width\"><title>オフライン</title><body style=\"margin:2rem;background:#07110f;color:#fff3c4;font-family:system-ui\"><h1>オフラインです</h1><p>一度オンラインでR02を起動すると、この試作を端末に保存できます。</p></body></html>",
      {
        status: 503,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }
}

async function cacheFirstAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached !== undefined) {
    return cached;
  }

  const response = await fetch(request);

  if (isCacheable(response)) {
    await cache.put(request, response.clone());
  }

  return response;
}

function isCacheable(response) {
  return response.ok && response.type === "basic";
}

async function cacheIndexAndLinkedAssets(cache, response) {
  const contentType = response.headers.get("Content-Type") ?? "";

  if (!contentType.includes("text/html")) {
    throw new Error("The R02 application shell index is not HTML.");
  }

  await cache.put(INDEX_URL, response.clone());

  const html = await response.text();
  const linkedAssets = discoverLinkedAssetUrls(html);

  if (linkedAssets.length > 0) {
    await cache.addAll(linkedAssets);
  }
}

function discoverLinkedAssetUrls(html) {
  const urls = new Set();
  const attributePattern = /\b(?:href|src)=["']([^"'#]+)["']/gi;

  for (const match of html.matchAll(attributePattern)) {
    const reference = match[1];

    if (reference === undefined) {
      continue;
    }

    const url = new URL(reference, INDEX_URL);

    if (
      url.origin === SCOPE_URL.origin &&
      url.href.startsWith(SCOPE_URL.href) &&
      (url.protocol === "http:" || url.protocol === "https:")
    ) {
      urls.add(url.href);
    }
  }

  return [...urls];
}
