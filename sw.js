// Prosty service worker, aby aplikacja była rozpoznawana jako PWA.
// Nie implementuje cachowania, aplikacja pozostaje w trybie online.

self.addEventListener('install', (event) => {
  console.log('Service Worker instalowany.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker aktywowany.');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Przekazuje żądanie do sieci bez cachowania.
  event.respondWith(fetch(event.request));
});
