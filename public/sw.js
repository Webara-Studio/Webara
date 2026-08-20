// Basic PWA service worker for Webara.
// Keep documents, Next.js output and live API responses aligned with the
// current deployment. Static assets may use the cache as an offline fallback.

const CACHE_NAME = 'webara-cache-v2';
const PRECACHE_ASSETS = [
  '/',
  '/favicon/site.webmanifest',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  '/favicon/favicon-32x32.png',
  '/favicon/favicon-16x16.png',
  '/webaralogo.webp',
  '/webaralogolight.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch(() => {
        // Ignore caching errors so install doesn't block.
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || request.url.startsWith('chrome-extension')) {
    return;
  }

  const url = new URL(request.url);
  const isDocument = request.mode === 'navigate' || request.destination === 'document';
  const isNextAsset = url.pathname.startsWith('/_next/');
  const isApiRequest = url.pathname.startsWith('/api/');

  // Never serve stale HTML, Next.js chunks or live API data after a deploy.
  // A stale app shell can reference a different build and cause a client-side
  // exception before React has a chance to render the page.
  if (isDocument || isNextAsset || isApiRequest) {
    event.respondWith(
      fetch(request, { cache: 'no-store' }).catch(() => caches.match(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.ok &&
            request.url.startsWith(self.location.origin)
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

