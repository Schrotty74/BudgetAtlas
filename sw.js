const CACHE = 'budgetatlas-v1.1-focus-flow-10';
const ASSETS = [
  './',
  './index.html',
  './app/css/styles.css?v=1.1.2',
  './app/css/focus-flow.css?v=1.1.2',
  './app/js/app.js?v=1.1.3',
  './app/js/io.js?v=1.1.1',
  './app/js/ui.js?v=1.1',
  './app/js/focus-flow.js?v=1.1.2',
  './manifest.json',
  './assets/icons/budgetatlas.svg',
  './assets/icons/budgetatlas-180.png',
  './assets/icons/budgetatlas-192.png',
  './assets/icons/budgetatlas-512.png',
  './version.json',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const isHTML = e.request.mode === 'navigate' || e.request.headers.get('accept')?.includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(e.request).then(resp => {
      if (resp && resp.status === 200) {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return resp;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
    if (resp && resp.status === 200 && resp.type !== 'opaque') {
      const clone = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
    }
    return resp;
  }).catch(() => caches.match('./index.html'))));
});