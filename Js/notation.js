// ============================================
// SYSTÈME DE NOTATION — BIBLIOAFRIK
// ============================================

// ============================================
// NOTER UN DOCUMENT
// ============================================
function noterDocument(docId, valeur, boutonEl) {
  const user = JSON.parse(localStorage.getItem('biblioafrik_user_actif') || 'null');

  if (!user) {
    afficherToastNotation('🔐 Connecte-toi pour noter !', 'warning');
    setTimeout(() => { window.location.href = 'connexion.html'; }, 1500);
    return;
  }

  // Vérifier si déjà noté
  const maNote = JSON.parse(localStorage.getItem('biblioafrik_mes_notes_' + user.id) || '{}');
  if (maNote[docId]) {
    afficherToastNotation('⚠️ Tu as déjà noté ce document !', 'warning');
    return;
  }

  // Sauvegarder la note
  let notes = JSON.parse(localStorage.getItem('biblioafrik_notes_global') || '{}');
  if (!notes[docId]) notes[docId] = { total: 0, count: 0 };
  notes[docId].total += valeur;
  notes[docId].count += 1;
  notes[docId].moyenne = (notes[docId].total / notes[docId].count).toFixed(1);
  localStorage.setItem('biblioafrik_notes_global', JSON.stringify(notes));

  // Sauvegarder ma note personnelle
  maNote[docId] = valeur;
  localStorage.setItem('biblioafrik_mes_notes_' + user.id, JSON.stringify(maNote));

  // Mettre à jour l'affichage
  mettreAJourAffichageNote(docId, notes[docId]);
  afficherToastNotation(`⭐ Merci ! Tu as noté ${valeur}/5 !`, 'success');
}

// ============================================
// OBTENIR LA NOTE D'UN DOCUMENT
// ============================================
function getNoteDoc(docId) {
  const notes = JSON.parse(localStorage.getItem('biblioafrik_notes_global') || '{}');
  return notes[docId] || { total: 0, count: 0, moyenne: 0 };
}

// ============================================
// OBTENIR MA NOTE PERSONNELLE
// ============================================
function getMaNote(docId) {
  const user = JSON.parse(localStorage.getItem('biblioafrik_user_actif') || 'null');
  if (!user) return 0;
  const maNote = JSON.parse(localStorage.getItem('biblioafrik_mes_notes_' + user.id) || '{}');
  return maNote[docId] || 0;
}

// ============================================
// GÉNÉRER LES ÉTOILES HTML
// ============================================
function genererEtoiles(docId, taille = 'normal') {
  const note = getNoteDoc(docId);
  const maNote = getMaNote(docId);
  const moyenne = parseFloat(note.moyenne) || 0;
  const count = note.count || 0;

  const etoilesHtml = [1, 2, 3, 4, 5].map(i => `
    <span class="star-btn ${taille === 'small' ? 'star-small' : ''} ${i <= maNote ? 'star-active' : ''}"
          data-val="${i}"
          data-doc="${docId}"
          onclick="noterDocument(${docId}, ${i}, this)"
          onmouseover="survolarEtoiles(this, ${i}, ${docId})"
          onmouseleave="resetEtoiles(${docId})">
      ★
    </span>
  `).join('');

  const moyenneHtml = count > 0
    ? `<span class="note-moyenne">${moyenne}</span>
       <span class="note-etoile-fixed">${genererEtoilesFixees(moyenne)}</span>
       <span class="note-count">(${count} avis)</span>`
    : `<span class="note-count">Pas encore noté</span>`;

  return `
    <div class="notation-container" id="notation-${docId}">
      <div class="etoiles-interactives">${etoilesHtml}</div>
      <div class="note-info">${moyenneHtml}</div>
    </div>
  `;
}

// ============================================
// ÉTOILES FIXES (affichage moyenne)
// ============================================
function genererEtoilesFixees(moyenne) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(moyenne)) html += '<span style="color:#f0a500;">★</span>';
    else if (i === Math.ceil(moyenne) && moyenne % 1 >= 0.5) html += '<span style="color:#f0a500;opacity:0.6;">★</span>';
    else html += '<span style="color:#ddd;">★</span>';
  }
  return html;
}

// ============================================
// SURVOL DES ÉTOILES
// ============================================
function survolarEtoiles(el, valeur, docId) {
  const container = document.getElementById('notation-' + docId);
  if (!container) return;
  container.querySelectorAll('.star-btn').forEach((s, i) => {
    s.style.color = i < valeur ? '#f0a500' : '#ddd';
    s.style.transform = i < valeur ? 'scale(1.2)' : 'scale(1)';
  });
}

// ============================================
// RESET ÉTOILES AU SURVOL
// ============================================
function resetEtoiles(docId) {
  const maNote = getMaNote(docId);
  const container = document.getElementById('notation-' + docId);
  if (!container) return;
  container.querySelectorAll('.star-btn').forEach((s, i) => {
    s.style.color = i < maNote ? '#f0a500' : '#ddd';
    s.style.transform = 'scale(1)';
  });
}

// ============================================
// METTRE À JOUR L'AFFICHAGE
// ============================================
function mettreAJourAffichageNote(docId, note) {
  const container = document.getElementById('notation-' + docId);
  if (!container) return;

  const maNote = getMaNote(docId);
  container.querySelectorAll('.star-btn').forEach((s, i) => {
    s.classList.toggle('star-active', i < maNote);
    s.style.color = i < maNote ? '#f0a500' : '#ddd';
  });

  const infoEl = container.querySelector('.note-info');
  if (infoEl) {
    infoEl.innerHTML = `
      <span class="note-moyenne">${note.moyenne}</span>
      <span class="note-etoile-fixed">${genererEtoilesFixees(parseFloat(note.moyenne))}</span>
      <span class="note-count">(${note.count} avis)</span>
    `;
  }
}

// ============================================
// TOAST NOTATION
// ============================================
function afficherToastNotation(message, type = 'success') {
  let toast = document.getElementById('toastNotation');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotation';
    toast.style.cssText = `
      position:fixed;bottom:25px;left:50%;transform:translateX(-50%) translateY(100px);
      padding:13px 22px;border-radius:12px;font-weight:600;font-size:0.88rem;
      box-shadow:0 5px 20px rgba(0,0,0,0.2);opacity:0;transition:all 0.4s;
      z-index:9999;font-family:'Poppins',sans-serif;white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }

  const colors = {
    success: 'background:#2ecc71;color:white;',
    warning: 'background:#f0a500;color:#1a1a2e;',
    error: 'background:#e74c3c;color:white;'
  };

  toast.style.cssText += colors[type] || colors.success;
  toast.textContent = message;
  toast.style.transform = 'translateX(-50%) translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.opacity = '0';
  }, 3000);
}

// ============================================
// INITIALISER TOUTES LES NOTATIONS
// ============================================
function initialiserNotations() {
  document.querySelectorAll('[data-notation-id]').forEach(el => {
    const docId = parseInt(el.getAttribute('data-notation-id'));
    el.innerHTML = genererEtoiles(docId, 'small');
  });
}

document.addEventListener('DOMContentLoaded', initialiserNotations);