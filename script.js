// Tes documents (tu en ajouteras plus tard)
const documents = [
  {
    titre: "Cours complet de Mathématiques Terminale",
    matiere: "Mathématiques",
    niveau: "Terminale",
    categorie: "maths",
    lien: "documents/maths-terminale.pdf"
  },
  {
    titre: "Introduction à la Physique — Licence 1",
    matiere: "Physique",
    niveau: "Licence 1",
    categorie: "physique",
    lien: "documents/physique-l1.pdf"
  },
  {
    titre: "Apprendre Python — Bases de l'Informatique",
    matiere: "Informatique",
    niveau: "Lycée / BTS",
    categorie: "info",
    lien: "documents/python-bases.pdf"
  },
  {
    titre: "Grammaire Française — Révisions BAC",
    matiere: "Français",
    niveau: "Terminale",
    categorie: "francais",
    lien: "documents/grammaire-bac.pdf"
  },
  {
    titre: "Annales BAC Maths 2018-2023",
    matiere: "Mathématiques",
    niveau: "BAC",
    categorie: "annales",
    lien: "documents/annales-maths.pdf"
  },
  {
    titre: "English Grammar for African Students",
    matiere: "Anglais",
    niveau: "Tous niveaux",
    categorie: "anglais",
    lien: "documents/english-grammar.pdf"
  }
];

// Afficher les documents
function afficherDocuments(liste) {
  const grid = document.getElementById('docGrid');
  grid.innerHTML = '';

  if (liste.length === 0) {
    grid.innerHTML = '<p>Aucun document trouvé.</p>';
    return;
  }

  liste.forEach(doc => {
    grid.innerHTML += `
      <div class="doc-card">
        <span class="niveau">${doc.niveau}</span>
        <h3>${doc.titre}</h3>
        <p class="matiere">${doc.matiere}</p>
        <a href="${doc.lien}" target="_blank">📥 Télécharger</a>
      </div>
    `;
  });
}

// Filtrer par catégorie
function filterDocs(categorie) {
  const filtres = documents.filter(d => d.categorie === categorie);
  afficherDocuments(filtres);
}

// Recherche en temps réel
document.getElementById('searchBar').addEventListener('input', function() {
  const terme = this.value.toLowerCase();
  const resultats = documents.filter(d =>
    d.titre.toLowerCase().includes(terme) ||
    d.matiere.toLowerCase().includes(terme)
  );
  afficherDocuments(resultats);
});

// Afficher tous les documents au démarrage
afficherDocuments(documents);