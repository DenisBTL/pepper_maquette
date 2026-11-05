# Pepper · Bleu

Troisième proposition dans le dépôt existant `DenisBTL/pepper_maquette`.
Adresse principale : `/bleu/`. Ancien nom : `maquette_3`.

HTML, CSS et JavaScript natifs, sans build ni dépendance à installer.

Références Figma du fichier `xUIcohxRF4x1gGH0oX9Kg7` :

- [Accueil bleu, 17:38](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=17-38).
- [Article, 84:173](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=84-173).
- [Direction 02, 68:162](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=68-162).
- Suivi et pied de page : cadres `17:316` et `17:322`.

L’accueil, `article.html` et `charte.html` reprennent les photographies de ces
cadres, Instrument Sans, Instrument Serif et Noto Sans. Les licences OFL sont
incluses. `assets/provenance.json` documente les images et leur conversion WebP
proportionnelle. Les captures du Figma ne servent jamais de fond de page.
Les références Code Connect à `Button` de `primitives` n’existent pas dans le
dépôt statique : les composants sont adaptés en liens et boutons HTML natifs.

## Utilisation et UX/UI

- Points d’entrée : `/bleu/`, première actualité vers l’article, bouton
  **M** à côté de FR/EN vers la direction artistique. Le pied de page relie les
  quatre propositions.
- Hiérarchie : introduction, mission et vision, enjeu de protection, méthode,
  chiffres, impact européen, projets, acteurs, actualités, présentation et
  adhésion côte à côte, formation et suivi.
- Compositions : photo de famille avec fondu clair, titres en serif italique,
  étapes en lignes, quatre panneaux de chiffres, projets sur aplats et six
  cartes photographiques. L’article associe une ouverture photographique à
  un corps de lecture illustré au microscope.
- Navigation : boutons vers le tableau suivant, repères latéraux sur grand
  écran, barre de lecture et header qui se rétracte en descendant, revient en
  remontant et reste visible pendant l’usage du menu ou d’un dialogue.
- États et feedback : menu ouvert/fermé, langue active, tableau courant,
  formulaires invalides et aperçu valide, copie de couleur réussie ou refusée
  avec instruction de copie manuelle. Les dialogues se ferment par Échap et
  rendent le focus au déclencheur. Les polices utilisent `font-display:swap`.
- Responsive : mise en colonnes sur ordinateur, empilement mobile, menu
  repliable, images recadrées proportionnellement et texte HTML redimensionnable.
- Accessibilité : lien d’évitement, navigation clavier, focus visible, contrôles
  nommés, alternatives textuelles et respect du mouvement réduit. Les textes
  de lecture conservent une encre foncée sur les accents clairs.
- Cohérence : même moteur d’interaction et mêmes conventions `data-en` que la
  maquette 2. La langue suit les liens entre les trois pages et les propositions.

Les formulaires sont des aperçus sans envoi ni conservation des données ; ce
comportement est indiqué avant saisie et après validation. La vidéo reste
signalée « Vidéo à produire ». Le catalogue présente les quatre projets fournis,
sans inventer les dix autres fiches. Les textes et chiffres viennent du design ;
les traductions anglaises restent des contenus de démonstration à valider.

## Critères d’acceptation

1. Les trois pages restent lisibles de 320 à 1 920 pixels en FR et EN, sans
   débordement horizontal, image manquante ou erreur JavaScript.
2. M ouvre la bonne direction artistique ; le retour conserve la langue.
3. Les repères et les boutons de lecture atteignent les bons tableaux ; le
   dernier repère est actif en bas de page, même avec un pied de page court.
4. Les formulaires affichent un aperçu honnête, Échap ferme les dialogues et
   le focus revient au bon contrôle.
5. Les couleurs copiées sont celles de cette direction ; un refus du
   presse-papiers produit un message de récupération explicite.
6. `validation/verification.json` et les captures desktop/mobile consignent
   les vérifications Chromium et WebKit de la livraison.

Pour une prévisualisation, servir la racine du dépôt avec un serveur statique,
puis ouvrir `/bleu/`. Tous les assets et les polices sont locaux.

## Contre-audit du 5 novembre 2026

Le [rapport avec captures avant/après](validation/contre-audit.md) documente
les défauts confirmés et les corrections de grilles, de typographie et de visuels.
Les [mesures détaillées](validation/contre-audit-verification.json) complètent
les premiers contrôles de livraison, conservés dans ce dossier.

Le contrôle reproductible commun se trouve dans
`../bleu/validation/check-layout.cjs`. Il utilise Playwright comme outil
de vérification externe, sans dépendance ajoutée au site. Servir la racine du
dépôt puis définir `PEPPER_AUDIT_URL` vers ce serveur ; lancer le script avec
Node. `PEPPER_PLAYWRIGHT_MODULE`, `PEPPER_CHROMIUM_EXECUTABLE` et
`PEPPER_WEBKIT_EXECUTABLE` permettent de désigner une installation existante.
