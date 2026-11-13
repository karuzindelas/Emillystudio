const CACHE_PREFIX = "emilly-studio-public-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll([
        OFFLINE_URL,
        "/manifest.webmanifest",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
        "/icons/icon-maskable-512.png",
        "/icon.svg",
      ]);
      try {
        const shell = await fetch("/");
        if (
          shell.ok &&
          shell.headers.get("x-emilly-cacheable") === "public-shell" &&
          shell.headers.get("content-type")?.includes("text/html")
        ) {
          await cache.put("/", shell);
        }
      } catch {
        // Installation may complete while offline; the fallback remains available.
      }
      await self.skipWaiting();
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    if (url.pathname !== "/") {
      event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (
            response.ok &&
            response.headers.get("content-type")?.includes("text/html") &&
            response.headers.get("x-emilly-cacheable") === "public-shell"
          ) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put("/", copy));
          }
          return response;
        })
        .catch(async () => (await caches.match("/")) ?? (await caches.match(OFFLINE_URL))),
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
  }
});
