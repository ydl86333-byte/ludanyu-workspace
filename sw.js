const CACHE='ludanyu-v1';
const ASSETS=[
  '/卤蛋鱼工作台.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>{
    return Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
  }));
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
