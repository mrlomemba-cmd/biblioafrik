// ============================================
// SERVICE WORKER — BIBLIOAFRIK PWA
// ============================================

const CACHE_NAME = 'biblioafrik-v1';
const CACHE_URLS = [
  '/biblioafrik/',
  '/biblioafrik/index.html',
  '/biblioafrik/bibliotheque.html',
  '/biblioafrik/apropos.html',
  '/biblioafrik/contact.html',
  '/biblioafrik/connexion.html',
  '/biblioafrik/inscription.html',
  '/biblioafrik/profil.html',
  '/biblioafrik/versets.html',
  '/biblioafrik/lecteur.html',
  '/biblioafrik/conditions.html',
  '/biblioafrik/css/style.css',
  '/biblioafrik/js/main.js',
  '/biblioafrik/js/notifications.js',
  '/biblioafrik/js/verset.js',
  '/biblioafrik/js/pub.js',
];

// ============================================
// INSTALLATION
// ============================================
self.addEventListener('install', event => {
  console.log('BiblioAfrik PWA — Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Mise en cache des fichiers...');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// ============================================
// ACTIVATION
// ============================================
self.addEventListener('activate', event => {
  console.log('BiblioAfrik PWA — Activation...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ============================================
// INTERCEPTION DES REQUÊTES
// ============================================
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner le cache si disponible
        if (response) return response;

        // Sinon faire la requête réseau
        return fetch(event.request)
          .then(response => {
            // Ne pas mettre en cache les requêtes externes
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Mettre en cache la nouvelle réponse
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return response;
          })
          .catch(() => {
            // Page hors ligne
            return caches.match('/biblioafrik/index.html');
          });
      })
  );
});

// ============================================
// NOTIFICATIONS PUSH
// ============================================
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Nouveau contenu disponible sur BiblioAfrik !',
    icon: '/biblioafrik/icons/icon-192.png',
    badge: '/biblioafrik/icons/icon-72.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/biblioafrik/index.html' },
    actions: [
      { action: 'ouvrir', title: '📚 Ouvrir BiblioAfrik' },
      { action: 'fermer', title: '✕ Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || '📚 BiblioAfrik',
      options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'ouvrir' || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
```

---

## 💻 ÉTAPE 3 — Crée les icônes

Crée un dossier `icons/` dans ton projet.

Va sur ce site gratuit pour générer les icônes :
```
https://favicon.io/favicon-generator/
```

1. Tape **"BA"** comme texte
2. Choisis la couleur de fond : **#1a1a2e**
3. Choisis la couleur du texte : **#f0a500**
4. Télécharge le pack
5. Renomme les fichiers et mets-les dans le dossier `icons/` :
```
icons/
  icon-72.png
  icon-96.png
  icon-128.png
  icon-192.png
  icon-512.png