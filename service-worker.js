// service-worker.js
const CACHE_NAME = 'compresseur-nuance-cache-v1';
const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'images/icon-192x192.png', // Ajoutez vos icônes ici
    'images/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache Compresseur Nuance ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Renvoyer la réponse depuis le cache si elle existe, sinon, récupérer depuis le réseau
                return response || fetch(event.request);
            })
    );
});
