const CACHE = 'irctc-ai-v2';
const OFFLINE_ROUTES = ['/', '/search', '/results', '/pnr-status', '/live-train', '/schedule', '/stations', '/fare'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(OFFLINE_ROUTES))));
self.addEventListener('fetch', event => { if (event.request.method === 'GET') event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request))); });
self.addEventListener('sync', event => { if (event.tag === 'booking-status-sync') event.waitUntil(fetch('/api/health')); });
self.addEventListener('push', event => event.waitUntil(self.registration.showNotification('IRCTC AI PNR update', { body: event.data?.text() || 'Your journey status changed.' })));
