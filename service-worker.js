const CACHE_NAME = "herbarium-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js",
  "./assets/icons/sprite.svg",
  "./css/glossary.css",
  "./css/nav.css",
  "./css/templates.css",
  "./css/splash.css",
  "./data/glossary.json",
  "./data/labelTemplates.json",
  "./data/specimens.json",
  "./data/taxonomy.json",
  "./js/collectionDetail.js",
  "./js/glossary.js",
  "./js/nav.js",
  "./js/splash.js",
  "./js/templates.js",
  "./app.js",
  "./style.css"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});