const CACHE_NAME = "exutoire-shell-v1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./sw.js",
  "./manifest.webmanifest",
  "./style/variables.css",
  "./style/base.css",
  "./style/components.css",
  "./src/main.js",
  "./src/version.js",
  "./src/core/state.js",
  "./src/core/session.js",
  "./src/core/categories.js",
  "./src/data/db.js",
  "./src/data/crypto.js",
  "./src/data/export-md.js",
  "./src/data/export-json.js",
  "./src/data/files.js",
  "./src/ui/layout.js",
  "./src/ui/phase1.js",
  "./src/ui/phase2.js",
  "./src/ui/thought-card.js",
  "./src/ui/history.js",
  "./src/ui/end-screen.js",
  "./src/ui/dialog.js",
  "./images/favicon-32x32.png",
  "./images/favicon-16x16.png",
  "./images/favicon-96x96.png",
  "./images/favicon.ico",
  "./images/favicon-196x196.png",
  "./images/favicon-128.png",
  "./images/apple-touch-icon-152x152.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    }),
  );
});
