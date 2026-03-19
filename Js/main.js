// === CHARGEMENT DES DOCUMENTS DEPUIS L'ADMIN ===
const documentsParDefaut = [
  { id: 1, titre: "Algèbre — Cours Complet Terminale", categorie: "maths", niveau: "Terminale", icon: "🔢", lien: "#", description: "" },
  { id: 2, titre: "Géométrie dans l'espace — Exercices Corrigés", categorie: "maths", niveau: "Terminale", icon: "🔢", lien: "#", description: "" },
  { id: 3, titre: "Probabilités et Statistiques", categorie: "maths", niveau: "1ère", icon: "🔢", lien: "#", description: "" },
  { id: 4, titre: "Fonctions — Résumé et Applications", categorie: "maths", niveau: "Terminale", icon: "🔢", lien: "#", description: "" },
  { id: 5, titre: "Mécanique — Résumé et Exercices", categorie: "physique", niveau: "1ère", icon: "⚗️", lien: "#", description: "" },
  { id: 6, titre: "Électricité — Cours Complet", categorie: "physique", niveau: "Terminale", icon: "⚗️", lien: "#", description: "" },
  { id: 7, titre: "Thermodynamique — Fiches de Révision", categorie: "physique", niveau: "Terminale", icon: "⚗️", lien: "#", description: "" },
  { id: 8, titre: "Optique — Exercices BAC Corrigés", categorie: "physique", niveau: "Terminale", icon: "⚗️", lien: "#", description: "" },
  { id: 9, titre: "Dissertation — Méthodologie Complète", categorie: "francais", niveau: "Lycée", icon: "📝", lien: "#", description: "" },
  { id: 10, titre: "Commentaire de Texte — Guide Complet", categorie: "francais", niveau: "Lycée", icon: "📝", lien: "#", description: "" },
  { id: 11, titre: "Grammaire Française — Révisions BAC", categorie: "francais", niveau: "Terminale", icon: "📝", lien: "#", description: "" },
  { id: 12, titre: "Introduction à Python — Débutants", categorie: "informatique", niveau: "Tous niveaux", icon: "💻", lien: "#", description: "" },
  { id: 13, titre: "HTML & CSS — Apprendre le Web", categorie: "informatique", niveau: "Débutant", icon: "💻", lien: "#", description: "" },
  { id: 14, titre: "Algorithmes et Structures de Données", categorie: "informatique", niveau: "Avancé", icon: "💻", lien: "#", description: "" },
  { id: 15, titre: "Histoire de l'Afrique — Résumé BAC", categorie: "histoire", niveau: "Terminale", icon: "🌍", lien: "#", description: "" },
  { id: 16, titre: "Géographie Africaine — Fiches", categorie: "histoire", niveau: "1ère", icon: "🌍", lien: "#", description: "" },
  { id: 17, titre: "La Colonisation — Cours Complet", categorie: "histoire", niveau: "Terminale", icon: "🌍", lien: "#", description: "" },
  { id: 18, titre: "Biologie Cellulaire — Cours Détaillé", categorie: "svt", niveau: "Terminale", icon: "🧬", lien: "#", description: "" },
  { id: 19, titre: "Génétique — Résumé et Exercices", categorie: "svt", niveau: "Terminale", icon: "🧬", lien: "#", description: "" },
  { id: 20, titre: "English Grammar — Complete Guide", categorie: "anglais", niveau: "Lycée", icon: "🇬🇧", lien: "#", description: "" },
  { id: 21, titre: "English Vocabulary — BAC Preparation", categorie: "anglais", niveau: "Terminale", icon: "🇬🇧", lien: "#", description: "" },
];

// Charge les documents depuis l'admin (localStorage) ou utilise les défauts
let documents = JSON.parse(localStorage.getItem('biblioafrik_docs')) || documentsParDefaut;

// === AFFICHAGE DES DOCUMENTS ===
function afficherDocuments(liste) {
  const grid = document.getElementById('docGrid');
  const aucun = document.getElementById('aucunResultat');
  const compteur = document.getElementById('compteur');

  if (!grid) return;
  grid.innerHTML = '';

  if (liste.length === 0) {
    if (aucun) aucun.style.display = 'block';
    if (compteur) compteur.textContent = '0 document trouvé';
    return;
  }

  if (aucun) aucun.style.display = 'none';
  if (compteur) compteur.textContent =
    `${liste.length} document${liste.length > 1 ? 's' : ''} trouvé${liste.length > 1 ? 's' : ''}`;

  liste.forEach(doc => {
    const carte = document.createElement('div');
    carte.className = 'doc-card';
    carte.innerHTML = `
      <div class="doc-icon">${doc.icon}</div>
      <div class="doc-info">
        <h3 title="${doc.titre}">${doc.titre}</h3>
        <div class="badges">
          <span class="badge ${doc.categorie}">
            ${doc.categorie.charAt(0).toUpperCase() + doc.categorie.slice(1)}
          </span>
          <span class="niveau">${doc.niveau}</span>
        </div>
        <div class="doc-meta">
          <span class="taille">📄 PDF</span>
          <span class="telechargements">⬇ Gratuit</span>
        </div>
      </div>
      <a href="${doc.lien}"
         target="_blank"
         class="btn-dl"
         onclick="compterTelechargement('${doc.titre}')">
        ⬇ Télécharger
      </a>
    `;
    grid.appendChild(carte);
  });
}

// === FILTRE PAR CATÉGORIE ===
let categorieActive = 'tous';
let rechercheActive = '';

function filtrer(categorie) {
  categorieActive = categorie;
  document.querySelectorAll('.filtre').forEach(b => b.classList.remove('actif'));
  event.target.classList.add('actif');
  mettreAJour();
}

// === MISE À JOUR COMBINÉE ===
function mettreAJour() {
  let resultat = documents;

  if (categorieActive !== 'tous') {
    resultat = resultat.filter(d => d.categorie === categorieActive);
  }

  if (rechercheActive.length > 0) {
    resultat = resultat.filter(d =>
      d.titre.toLowerCase().includes(rechercheActive) ||
      d.categorie.toLowerCase().includes(rechercheActive) ||
      d.niveau.toLowerCase().includes(rechercheActive)
    );
  }

  afficherDocuments(resultat);
}

// === RECHERCHE EN TEMPS RÉEL ===
const champRecherche = document.getElementById('recherche');
if (champRecherche) {
  champRecherche.addEventListener('input', function () {
    rechercheActive = this.value.toLowerCase().trim();
    mettreAJour();
  });
}

// === MENU HAMBURGER MOBILE ===
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');
if (hamburger && navUl) {
  hamburger.addEventListener('click', () => {
    navUl.classList.toggle('ouvert');
  });
}

// === COMPTEUR TÉLÉCHARGEMENTS ===
function compterTelechargement(titre) {
  let total = parseInt(localStorage.getItem('biblioafrik_dl') || '0');
  total++;
  localStorage.setItem('biblioafrik_dl', total);
  console.log(`📥 Téléchargement : ${titre} | Total : ${total}`);
}

// === INITIALISATION ===
afficherDocuments(documents);
```

---

## ✅ Ce qui change maintenant

Maintenant ton site fonctionne comme un vrai système complet :
```
Tu publies dans admin.html
        ↓
Sauvegardé automatiquement
        ↓
bibliotheque.html le charge et l'affiche
        ↓
Les étudiants téléchargent 🎉