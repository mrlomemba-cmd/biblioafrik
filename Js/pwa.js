// ============================================
// PWA — INSTALLATION BIBLIOAFRIK
// ============================================

// Enregistrer le Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/biblioafrik/sw.js')
      .then(reg => {
        console.log('✅ Service Worker enregistré !', reg.scope);
      })
      .catch(err => {
        console.log('❌ Erreur Service Worker:', err);
      });
  });
}

// ============================================
// BOUTON D'INSTALLATION
// ============================================
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const installDismiss = document.getElementById('installDismiss');

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;

  // Afficher la bannière d'installation
  if (installBanner) {
    const dismissed = localStorage.getItem('biblioafrik_install_dismissed');
    if (!dismissed) {
      setTimeout(() => {
        installBanner.style.display = 'flex';
        installBanner.style.animation = 'slideInUp 0.5s ease';
      }, 3000);
    }
  }
});

// Clic sur installer
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('✅ BiblioAfrik installé !');
      if (installBanner) installBanner.style.display = 'none';
    }
    deferredPrompt = null;
  });
}

// Fermer la bannière
if (installDismiss) {
  installDismiss.addEventListener('click', () => {
    if (installBanner) installBanner.style.display = 'none';
    localStorage.setItem('biblioafrik_install_dismissed', 'true');
  });
}

// App installée
window.addEventListener('appinstalled', () => {
  console.log('🎉 BiblioAfrik a été installée !');
  if (installBanner) installBanner.style.display = 'none';
});