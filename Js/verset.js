// ============================================
// VERSET DU JOUR — BIBLIOAFRIK
// ============================================

const versets = [
  { ref: "Jean 3:16", texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
  { ref: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie." },
  { ref: "Jérémie 29:11", texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
  { ref: "Psaumes 23:1", texte: "L'Éternel est mon berger : je ne manquerai de rien." },
  { ref: "Proverbes 3:5-6", texte: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse. Reconnais-le dans toutes tes voies, et il aplanira tes sentiers." },
  { ref: "Romains 8:28", texte: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
  { ref: "Ésaïe 40:31", texte: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point ; ils marchent, et ne se fatiguent point." },
  { ref: "Matthieu 6:33", texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus." },
  { ref: "Psaumes 27:1", texte: "L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? L'Éternel est le soutien de ma vie : de qui aurais-je frayeur ?" },
  { ref: "Josué 1:9", texte: "Ne t'ai-je pas donné cet ordre : Sois fort et courageux ? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras." },
  { ref: "2 Timothée 1:7", texte: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse." },
  { ref: "Psaumes 46:1", texte: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse." },
  { ref: "Matthieu 5:3", texte: "Heureux les pauvres en esprit, car le royaume des cieux est à eux !" },
  { ref: "Jean 14:6", texte: "Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi." },
  { ref: "Romains 12:2", texte: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu." },
  { ref: "Psaumes 119:105", texte: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
  { ref: "Proverbes 22:6", texte: "Instruis l'enfant selon la voie qu'il doit suivre ; et quand il sera vieux, il ne s'en détournera pas." },
  { ref: "Ésaïe 41:10", texte: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours." },
  { ref: "1 Corinthiens 13:4-5", texte: "La charité est patiente, elle est pleine de bonté ; la charité n'est point envieuse ; la charité ne se vante point, elle ne s'enfle point d'orgueil." },
  { ref: "Apocalypse 3:20", texte: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi." },
  { ref: "Galates 5:22-23", texte: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance." },
  { ref: "Psaumes 37:4", texte: "Fais de l'Éternel tes délices, et il te donnera ce que ton cœur désire." },
  { ref: "Jean 16:33", texte: "Dans le monde, vous aurez des tribulations ; mais prenez courage, j'ai vaincu le monde." },
  { ref: "Luc 1:37", texte: "Car rien n'est impossible à Dieu." },
  { ref: "Hébreux 11:1", texte: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas." },
  { ref: "Matthieu 11:28", texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos." },
  { ref: "1 Jean 4:8", texte: "Celui qui n'aime pas n'a pas connu Dieu, car Dieu est amour." },
  { ref: "Psaumes 150:6", texte: "Que tout ce qui respire loue l'Éternel ! Louez l'Éternel !" },
  { ref: "Proverbes 16:3", texte: "Recommande à l'Éternel tes œuvres, et tes projets réussiront." },
  { ref: "Ésaïe 26:3", texte: "Tu conserveras en parfaite paix celui dont l'esprit est soutenu par toi, parce qu'il se confie en toi." },
  { ref: "Romains 15:13", texte: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi, pour que vous abondiez en espérance, par la puissance du Saint-Esprit !" },
  { ref: "Jacques 1:17", texte: "Tout don excellent et tout don parfait descend d'en haut, du Père des lumières, en qui il n'y a ni changement ni ombre de variation." },
  { ref: "Jean 11:25", texte: "Jésus lui dit : Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort." },
  { ref: "Psaumes 34:8", texte: "Sentez et voyez combien l'Éternel est bon ! Heureux l'homme qui cherche en lui son refuge !" },
  { ref: "Matthieu 7:7", texte: "Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira." },
  { ref: "2 Chroniques 7:14", texte: "Si mon peuple sur qui est invoqué mon nom s'humilie, prie, et cherche ma face, et s'il se détourne de ses mauvaises voies, je l'exaucerai des cieux." },
  { ref: "Psaumes 1:1-2", texte: "Heureux l'homme qui ne marche pas selon le conseil des méchants... Mais qui trouve son plaisir dans la loi de l'Éternel, et qui la médite jour et nuit !" },
  { ref: "1 Pierre 5:7", texte: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous." },
  { ref: "Ésaïe 43:2", texte: "Quand tu traverseras les eaux, je serai avec toi ; et les fleuves ne te submergeront point." },
  { ref: "Psaumes 91:1", texte: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant." },
  { ref: "Colossiens 3:23", texte: "Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et non pour des hommes." },
  { ref: "Éphésiens 6:10", texte: "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante." },
  { ref: "Proverbes 11:2", texte: "Avec l'orgueil vient la honte, mais avec l'humilité vient la sagesse." },
  { ref: "Michée 6:8", texte: "On t'a fait connaître, ô homme, ce qui est bien ; et ce que l'Éternel demande de toi, c'est que tu pratiques la justice, que tu aimes la miséricorde, et que tu marches humblement avec ton Dieu." },
  { ref: "Apocalypse 21:4", texte: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu." },
  { ref: "Jean 15:5", texte: "Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire." },
  { ref: "Deutéronome 31:6", texte: "Fortifiez-vous et ayez du courage ! Ne craignez pas et ne soyez pas dans la terreur devant eux, car l'Éternel, ton Dieu, marche lui-même avec toi." },
  { ref: "Psaumes 23:4", texte: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me rassurent." },
  { ref: "Romains 8:37", texte: "Mais dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés." },
  { ref: "Psaumes 139:14", texte: "Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le reconnaît bien." },
];

// ============================================
// OBTENIR LE VERSET DU JOUR
// ============================================
function getVersetDuJour() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  return versets[dayOfYear % versets.length];
}

// ============================================
// AFFICHER LA BANNIÈRE VERSET
// ============================================
function afficherVersetDuJour(containerId = 'versetDuJour') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const verset = getVersetDuJour();
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  // Vérifier si fermé aujourd'hui
  const ferme = localStorage.getItem('biblioafrik_verset_ferme');
  const aujourdhui = new Date().toDateString();
  if (ferme === aujourdhui) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = `
    <div class="verset-banner">
      <div class="verset-left">
        <div class="verset-label">
          <i class="fas fa-cross"></i> Verset du jour — ${today}
        </div>
        <blockquote class="verset-texte">"${verset.texte}"</blockquote>
        <div class="verset-ref">— ${verset.ref}</div>
      </div>
      <div class="verset-actions">
        <button class="verset-btn-partager" onclick="partagerVerset('${verset.ref}', \`${verset.texte.replace(/`/g, "'")}\`)">
          <i class="fas fa-share-alt"></i>
        </button>
        <button class="verset-btn-fermer" onclick="fermerVerset()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  `;

  container.style.display = 'block';
}

// ============================================
// FERMER LA BANNIÈRE
// ============================================
function fermerVerset() {
  const container = document.getElementById('versetDuJour');
  if (container) {
    container.style.animation = 'slideUp 0.4s ease forwards';
    setTimeout(() => { container.style.display = 'none'; }, 400);
  }
  localStorage.setItem('biblioafrik_verset_ferme', new Date().toDateString());
}

// ============================================
// PARTAGER LE VERSET
// ============================================
function partagerVerset(ref, texte) {
  const message = `✝️ "${texte}" — ${ref}\n\n📖 Découvre plus de ressources chrétiennes sur BiblioAfrik :\nhttps://mrlomemba-cmd.github.io/biblioafrik`;
  if (navigator.share) {
    navigator.share({ title: 'Verset du jour — BiblioAfrik', text: message });
  } else {
    navigator.clipboard.writeText(message);
    alert('✅ Verset copié ! Tu peux le partager sur WhatsApp.');
  }
}

// ============================================
// PAGE DÉDIÉE VERSETS (pour versets.html)
// ============================================
function afficherTousVersets(containerId = 'tousVersets') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const versetAujourdhui = getVersetDuJour();

  container.innerHTML = versets.map((v, i) => `
    <div class="verset-card ${v.ref === versetAujourdhui.ref ? 'verset-aujourd-hui' : ''}">
      ${v.ref === versetAujourdhui.ref ? '<div class="verset-badge-today">✨ Aujourd\'hui</div>' : ''}
      <blockquote>"${v.texte}"</blockquote>
      <div class="verset-card-ref">— ${v.ref}</div>
      <button class="verset-card-share" onclick="partagerVerset('${v.ref}', \`${v.texte.replace(/`/g, "'")}\`)">
        <i class="fas fa-share-alt"></i> Partager
      </button>
    </div>
  `).join('');
}

// Lancer automatiquement
document.addEventListener('DOMContentLoaded', () => {
  afficherVersetDuJour();
});