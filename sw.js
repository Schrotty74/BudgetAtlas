const CACHE = 'budgetatlas-v1.8-focus-flow-10';
const ASSETS = [
  './',
  './index.html',
  './styles.css?v=10',
  './focus-flow.css?v=10',
  './app.js?v=10',
  './io.js?v=10',
  './ui.js?v=10',
  './focus-flow.js?v=10',
  './manifest.json',
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