// ============================================
// ESPACES PUBLICITAIRES BIBLIOAFRIK
// ============================================

// Pub horizontale — entre les sections
const pubHorizontale = `
  <div class="pub-container pub-horizontal">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-8006779195400510"
         data-ad-slot="auto"
         data-ad-format="horizontal"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
  </div>
`;

// Pub rectangle — dans les grilles
const pubRectangle = `
  <div class="pub-container pub-rectangle">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-8006779195400510"
         data-ad-slot="auto"
         data-ad-format="rectangle"
         data-full-width-responsive="true">
    </ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>
  </div>
`;

// Insérer pub dans la bibliothèque
function insererPubsBibliotheque() {
  const grid = document.getElementById('docGrid');
  if (!grid) return;

  // Observer pour insérer après chargement
  const observer = new MutationObserver(() => {
    const cartes = grid.querySelectorAll('.doc-card');
    // Insérer une pub tous les 8 documents
    cartes.forEach((carte, i) => {
      if ((i + 1) % 8 === 0) {
        const pubDiv = document.createElement('div');
        pubDiv.className = 'pub-container pub-dans-grille';
        pubDiv.innerHTML = `
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-8006779195400510"
               data-ad-slot="auto"
               data-ad-format="auto"
               data-full-width-responsive="true">
          </ins>
        `;
        carte.insertAdjacentElement('afterend', pubDiv);
        (adsbygoogle = window.adsbygoogle || []).push({});
      }
    });
    observer.disconnect();
  });

  observer.observe(grid, { childList: true });
}

// Lancer
document.addEventListener('DOMContentLoaded', () => {
  insererPubsBibliotheque();
});