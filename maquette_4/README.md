# Pepper · Maquette 4 · Cyan et miel

Quatrième proposition dans le dépôt existant `DenisBTL/pepper_maquette`.
« Cyan et miel » est une seule direction du Figma. HTML, CSS et JavaScript
natifs, sans build ni dépendance à installer.

Références Figma du fichier `xUIcohxRF4x1gGH0oX9Kg7` :

- [Accueil actuel, 71:128](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=71-128).
- [Article, 84:98](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=84-98).
- [Direction 03, 65:450](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=65-450).
- [Menu illustré, 71:191](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=71-191).

La copie archivée `65:99` n’est pas la référence. Les photographies du vivant,
du champ et des drapeaux européens sont celles du Figma. Space Grotesk et
Manrope sont hébergées localement avec leurs licences OFL. Les conversions
WebP proportionnelles et les empreintes des originaux sont documentées dans
`assets/provenance.json` ; aucun screenshot ne remplace du contenu HTML.

## Utilisation et UX/UI

- Points d’entrée : `/maquette_4/`, première actualité vers `article.html`,
  bouton **M** à côté de FR/EN vers `charte.html`, bouton de menu vers les
  trois entrées illustrées. Le pied de page relie les quatre propositions.
- Hiérarchie : introduction, mots clés, enjeu de protection, mission et vision,
  méthode, chiffres, impact, projets, acteurs, actualités, présentation,
  adhésion, formation et suivi.
- Compositions : photographie sur aplat cyan, repères miel, étapes avec photos
  rondes, chiffres en ligne, listes de projets, acteurs sur fond miel et menu
  documentaire. L’article associe un aplat cyan et une photo de rosée, puis un
  sommaire et une colonne de lecture.
- Navigation : tableaux suivants, repères latéraux sur grand écran, barre de
  lecture et header rétractable. Le menu illustré fonctionne sur ordinateur
  et mobile, se ferme par Échap ou au choix d’une entrée.
- États et feedback : menu ouvert/fermé, langue active, tableau courant,
  validation native des champs, aperçu valide, copie réussie ou refus du
  presse-papiers avec instruction de récupération. `font-display:swap` permet
  de lire pendant le chargement des polices locales.
- Responsive : colonnes puis empilement, sommaire placé avant l’article sur
  mobile, cartes du menu compactes, texte HTML et images proportionnelles.
- Accessibilité : lien d’évitement, clavier, focus visible, contrôles nommés,
  alternatives textuelles, dialogues natifs avec focus restitué et mouvement
  réduit. Les petits textes sur miel utilisent l’encre marine ; les accents
  cyan et miel ne remplacent pas les textes de lecture foncés.
- Cohérence : conventions de traduction et interactions de la maquette 2,
  langue conservée entre accueil, article, moodboard et autres propositions.

Les formulaires sont des aperçus sans transmission ni conservation de données,
avec une explication avant saisie et au succès. La vidéo est marquée « Vidéo à
produire ». Les quatre projets fournis sont présentés sans inventer le reste
du catalogue. Les chiffres et actualités restent ceux du design ; les contenus
et traductions de démonstration sont à valider avec Pepper.

## Critères d’acceptation

1. Accueil, article et moodboard lisibles de 320 à 1 920 pixels en FR et EN,
   sans débordement, asset manquant ou erreur JavaScript.
2. Le menu illustré atteint les bonnes sections, se ferme au choix d’un lien
   et rend le focus au bouton lors d’une fermeture par Échap.
3. M ouvre Cyan et miel ; le retour et l’article conservent la langue.
4. Barre de lecture, header et repères suivent le défilement, y compris le
   dernier tableau au bas de la page.
5. Les formulaires montrent un aperçu sans envoi ; les codes copiés sont ceux
   de Cyan et miel et le refus du presse-papiers est expliqué.
6. `validation/verification.json` et les captures desktop/mobile consignent
   les contrôles Chromium et WebKit effectués pour cette livraison.

Servir la racine du dépôt avec un serveur statique, puis ouvrir `/maquette_4/`.
Tous les assets et les polices sont locaux.
