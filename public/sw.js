/* eslint-disable no-restricted-globals */
const STATIC_CACHE_NAME = "termace-static-v1.0";
const STATIC_ASSETS = [
  "/",
  "/directory.json",
  "/favicon.ico",
  "/logo192.png",
  "logo512.png",
  "/termace-high-resolution-logo-transparent.png",
  "https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.worker.min.mjs",
];

self.addEventListener("install", (e) => {
  e.waitUntil(cacheStatic());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(deleteOldCache());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(cacheThenNetwork(e.request));
});

async function cacheStatic() {
  const cache = await caches.open(STATIC_CACHE_NAME);
  return cache.addAll(STATIC_ASSETS);
}

async function deleteOldCache() {
  const keys = await caches.keys();
  const filtered = keys.filter((key) => key !== STATIC_CACHE_NAME);
  const promises = filtered.map((key) => caches.delete(key));
  return Promise.all(promises);
}

async function cacheThenNetwork(request) {
  const cacheRes = await caches.match(request);

  if (cacheRes) return cacheRes;

  const fetchRes = await fetch(request);

  return fetchRes;
}
