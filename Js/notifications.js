// ============================================
// SYSTÈME DE NOTIFICATIONS BIBLIOAFRIK
// ============================================

// Notifications par défaut (simulées)
const notificationsParDefaut = [
  {
    id: 1,
    icon: "📚",
    titre: "Nouveau cours ajouté !",
    texte: "Introduction à Python — Débutants est disponible",
    lien: "bibliotheque.html",
    date: "Aujourd'hui",
    lu: false
  },
  {
    id: 2,
    icon: "✝️",
    titre: "Nouveau livre chrétien !",
    texte: "Prières du Matin et du Soir vient d'être ajouté",
    lien: "bibliotheque.html?cat=chretien",
    date: "Aujourd'hui",
    lu: false
  },
  {
    id: 3,
    icon: "💪",
    titre: "Nouveau livre motivation !",
    texte: "Entrepreneuriat Africain — Guide disponible",
    lien: "bibliotheque.html?cat=motivation",
    date: "Hier",
    lu: false
  },
  {
    id: 4,
    icon: "⚽",
    titre: "Nouvelle ressource sport !",
    texte: "Nutrition Sportive — Guide Complet ajouté",
    lien: "bibliotheque.html?cat=sport",
    date: "Il y a 2 jours",
    lu: false
  },
  {
    id: 5,
    icon: "🌍",
    titre: "Bienvenue sur BiblioAfrik !",
    texte: "Découvre nos 65 documents gratuits",
    lien: "bibliotheque.html",
    date: "À l'inscription",
    lu: true
  }
];

// ============================================
// INITIALISER LES NOTIFICATIONS
// ============================================
function initNotifications() {
  const user = JSON.parse(localStorage.getItem('biblioafrik_user_actif') || 'null');
  const bell = document.getElementById('notifBell');

  if (!user || !bell) return;

  // Afficher la cloche
  bell.style.display = 'flex';
  bell.style.alignItems = 'center';
  bell.style.justifyContent = 'center';

  // Charger les notifications
  let notifs = JSON.parse(localStorage.getItem('biblioafrik_notifs_' + user.id) || 'null');
  if (!notifs) {
    notifs = notificationsParDefaut;
    sauvegarderNotifs(notifs, user.id);
  }

  afficherNotifications(notifs);
  mettreAJourCompteur(notifs);

  // Animer la cloche si nouvelles notifs
  const nonLues = notifs.filter(n => !n.lu).length;
  if (nonLues > 0) {
    setTimeout(() => {
      bell.classList.add('ring');
      setTimeout(() => bell.classList.remove('ring'), 600);
    }, 1500);
  }
}

// ============================================
// AFFICHER LES NOTIFICATIONS
// ============================================
function afficherNotifications(notifs) {
  const liste = document.getElementById('notifListe');
  if (!liste) return;

  if (notifs.length === 0) {
    liste.innerHTML = `
      <div class="notif-vide">
        <span>🔔</span>
        <p>Aucune notification pour l'instant</p>
      </div>
    `;
    return;
  }

  // Trier — non lues en premier
  const triees = [...notifs].sort((a, b) => a.lu - b.lu);

  liste.innerHTML = triees.slice(0, 6).map(n => `
    <a href="${n.lien}" class="notif-item ${n.lu ? '' : 'non-lu'}"
       onclick="marquerLu(${n.id})">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-texte">
        <strong>${n.titre}</strong>
        <small>${n.texte}</small><br/>
        <small style="color:#f0a500;">🕐 ${n.date}</small>
      </div>
      ${!n.lu ? '<div class="notif-point"></div>' : ''}
    </a>
  `).join('') + `
    <div class="notif-footer">
      <a href="bibliotheque.html">Voir tous les nouveaux documents →</a>
    </div>
  `;
}

// ============================================
// OUVRIR / FERMER LE DROPDOWN
// ============================================
function toggleNotifs() {
  const dropdown = document.getElementById('notifDropdown');
  dropdown.classList.toggle('ouvert');

  // Fermer si clic ailleurs
  if (dropdown.classList.contains('ouvert')) {
    setTimeout(() => {
      document.addEventListener('click', fermerNotifsDehors);
    }, 100);
  }
}

function fermerNotifsDehors(e) {
  const bell = document.getElementById('notifBell');
  if (bell && !bell.contains(e.target)) {
    document.getElementById('notifDropdown').classList.remove('ouvert');
    document.removeEventListener('click', fermerNotifsDehors);
  }
}

// ============================================
// MARQUER COMME LU
// ============================================
function marquerLu(id) {
  const user = JSON.parse(localStorage.getItem('biblioafrik_user_actif') || 'null');
  if (!user) return;

  let notifs = JSON.parse(localStorage.getItem('biblioafrik_notifs_' + user.id) || '[]');
  notifs = notifs.map(n => n.id === id ? {...n, lu: true} : n);
  sauvegarderNotifs(notifs, user.id);
  mettreAJourCompteur(notifs);
}

// ============================================
// TOUT MARQUER COMME LU
// ============================================
function toutMarquerLu() {
  const user = JSON.parse(localStorage.getItem('biblioafrik_user_actif') || 'null');
  if (!user) return;

  let notifs = JSON.parse(localStorage.getItem('biblioafrik_notifs_' + user.id) || '[]');
  notifs = notifs.map(n => ({...n, lu: true}));
  sauvegarderNotifs(notifs, user.id);
  afficherNotifications(notifs);
  mettreAJourCompteur(notifs);
}

// ============================================
// METTRE À JOUR LE COMPTEUR
// ============================================
function mettreAJourCompteur(notifs) {
  const count = document.getElementById('notifCount');
  if (!count) return;

  const nonLues = notifs.filter(n => !n.lu).length;

  if (nonLues > 0) {
    count.textContent = nonLues > 9 ? '9+' : nonLues;
    count.classList.remove('cache');
  } else {
    count.classList.add('cache');
  }
}

// ============================================
// AJOUTER UNE NOUVELLE NOTIFICATION (depuis admin)
// ============================================
function ajouterNotification(icon, titre, texte, lien) {
  // Ajouter à tous les membres
  let membres = JSON.parse(localStorage.getItem('biblioafrik_membres') || '[]');

  membres.forEach(membre => {
    let notifs = JSON.parse(localStorage.getItem('biblioafrik_notifs_' + membre.id) || 'null');
    if (!notifs) notifs = [...notificationsParDefaut];

    const newNotif = {
      id: Date.now(),
      icon, titre, texte, lien,
      date: new Date().toLocaleDateString('fr-FR'),
      lu: false
    };

    notifs.unshift(newNotif);
    if (notifs.length > 20) notifs = notifs.slice(0, 20);
    localStorage.setItem('biblioafrik_notifs_' + membre.id, JSON.stringify(notifs));
  });
}

// ============================================
// SAUVEGARDER
// ============================================
function sauvegarderNotifs(notifs, userId) {
  localStorage.setItem('biblioafrik_notifs_' + userId, JSON.stringify(notifs));
}

// ============================================
// LANCER AU CHARGEMENT
// ============================================
document.addEventListener('DOMContentLoaded', initNotifications);