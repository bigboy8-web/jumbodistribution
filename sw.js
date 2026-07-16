const CACHE = 'suj-distribusi-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Simpan app shell saat install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Bersihkan cache lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first: kalau ada di cache pakai itu, kalau tidak ambil dari network lalu simpan.
// Ini yang bikin app tetap jalan offline (termasuk Chart.js & font dari CDN setelah sekali online).
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return (
        cached ||
        fetch(e.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => {
              try { c.put(e.request, copy); } catch (_) {}
            });
            return res;
          })
          .catch(() => cached)
      );
    })
  );
});
