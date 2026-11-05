# Pepper · Vert

Deuxième proposition, ajoutée dans `vert/` du dépôt existant
`DenisBTL/pepper_maquette`. Adresse principale : `/vert/`, ancien nom
`maquette_2`. La première proposition se trouve désormais dans `/bleu-miel/`.

Source : [Homepage verte, cadre 60:663](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=60-663),
associée à la planche « Direction 01 · Vert botanique » et à
l’[article Appel à laboratoires, cadre 84:123](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=84-123).
Les autres copies de la homepage présentes sur la même page Figma ne sont pas
les références de cette intégration.

## Consulter

Ouvrir `index.html` ou servir la racine du dépôt avec un serveur statique,
puis visiter `/vert/`. Aucun build ni installation nécessaire.
L’article est accessible depuis la première carte d’actualité.

L’adresse de consultation sur GitHub Pages est
`https://denisbtl.github.io/pepper_maquette/vert/`.

## Organisation

```text
index.html               accueil et aperçus des interactions
article.html             gabarit Appel à laboratoires partenaires
css/site.css             jetons, composants, responsive et impression
js/site.js               langue, navigation, fenêtres modales et aperçus des formulaires
assets/                  exports Figma locaux, sans modification visuelle
assets/fonts/            Arsenal et Outfit, licences OFL incluses
assets/provenance.json   correspondance des fichiers et des calques Figma
validation/              résultats et captures du contrôle de livraison
```

L’implémentation reprend la convention HTML/CSS/JS sans build du dépôt et
ses attributs `data-en`, `data-en-alt`, avec des attributs supplémentaires
pour les libellés accessibles. Les styles et scripts sont propres à ce
sous-dossier. Aucun appel réseau externe au chargement.

Les références Code Connect à `Button` de `primitives` renvoyées par Figma
ne correspondent à aucune bibliothèque du dépôt statique. Les contrôles
sont donc des liens et boutons HTML natifs, conformément à cette pile.

## Mise en page et UX/UI

- Entrées : navigation vers les sections, cartes d’actualité, adhésion et formation.
- Hiérarchie : introduction, raison d’être, méthode, preuves, projets, expertises,
  actualités, parcours d’adhésion, formation et suivi des avancées.
- Visuels : composition photographique, logo, gravures, photos et flèches issus
  du fichier Figma. Les exports de calques composites conservent masques,
  recadrages et transparence. La capture de la page ne sert jamais de fond HTML.
- Responsive : composition conservée sur ordinateur ; image sous l’introduction,
  grilles réorganisées et menu repliable sur petit écran. Le texte reste du HTML,
  redimensionnable, sans réduction proportionnelle d’une page figée.
- Accessibilité : lien d’évitement, titres structurés, focus visible, contrôles
  nommés, fenêtres `dialog` natives, fermeture par Échap et retour du focus.
  Le mouvement est supprimé avec `prefers-reduced-motion`.
- Contrastes : les petits textes olive sur fond clair et les libellés verts
  sur olive ont été assombris dans la même palette. La carte Mission utilise
  une encre foncée pour rester lisible. Ce sont des adaptations explicites
  des contrastes de la maquette, sans revendication d’audit WCAG complet.
- États : les champs obligatoires et l’adresse e-mail utilisent la validation
  native. L’aperçu valide affiche un retour explicite ; la modification efface
  ce retour. Fermer un formulaire vide ses champs et réinitialise son état.
- Démonstration : aucune inscription, aucun e-mail ni aucune adhésion n’est envoyé.
  Aucune donnée saisie n’est conservée. `method="dialog"` empêche aussi un envoi
  natif accidentel si JavaScript est absent. Les aperçus l’expliquent avant saisie.
- Contenus incomplets : les trois aplats d’actualité et l’emplacement vidéo
  sont conservés tels que fournis. Le catalogue ne prétend pas contenir les
  14 fiches : il présente les quatre exemples disponibles. Les chiffres,
  actualités et traductions anglaises de démonstration restent à valider par Pepper.

## Critères de livraison

1. Accueil et article lisibles de 320 à 1920 px, sans débordement horizontal.
2. Visuels chargés depuis des fichiers non vides, bons calques et bonnes proportions.
3. Navigation mobile, langue FR/EN et liens accueil/article fonctionnels.
4. Fenêtres accessibles au clavier, focus restitué à la fermeture et formulaires
   sans transmission de données ni faux message d’envoi.
5. Aucun échec HTTP local ni erreur JavaScript pendant les parcours vérifiés.

Les contrôles exacts et leur portée figurent dans `validation/resultats.json`.

## Aides de lecture reprises de la première maquette

L’accueil propose une flèche à la fin de chaque tableau pour rejoindre le
suivant, puis un retour au début depuis le pied de page. Les écrans larges
disposent aussi de repères latéraux pour accéder directement aux douze
tableaux. Le libellé apparaît au survol et au focus ; le repère actif est
signalé visuellement et par `aria-current="location"`.

La barre en haut indique la progression dans la page, sur ordinateur comme
sur mobile et dans l’article. L’en-tête reste fixé en haut, s’efface lors de
la descente après le début de page et réapparaît à la remontée. Il reste
visible quand son menu est ouvert, quand un de ses contrôles a le focus ou
qu’une fenêtre de dialogue est ouverte.

Préconisation UX/UI et critères de vérification de cette reprise :

- Entrées : flèches en fin de tableau, repères latéraux, menu et lien d’évitement.
- Hiérarchie : le contenu conserve la priorité ; les aides de lecture restent
  secondaires, dans les couleurs de la direction Vert botanique.
- États et feedback : tableau actif, haut et bas de page, progression de 0 à
  100 %, en-tête affiché ou rétracté, menu ouvert et focus clavier.
- Navigation : défilement amorti comme dans la première maquette, interrompu
  dès que l’utilisateur reprend la main. À l’arrivée, le focus suit la cible,
  l’adresse conserve la langue et indique le tableau rejoint. L’en-tête revient
  à l’arrivée pour situer le tableau, puis s’efface à la prochaine descente.
- Responsive : repères latéraux à partir de 1340 px et 600 px de hauteur ;
  flèches et barre disponibles sur les petits écrans, sans recouvrir le texte.
- Accessibilité : liens natifs, libellés français/anglais, focus visible,
  compensation de la hauteur de l’en-tête et mouvement réduit respecté,
  y compris si la préférence change pendant la visite.
- Repli : sans JavaScript, les ancres et le contenu restent accessibles ;
  une cible inexistante n’est pas interceptée et ne bloque pas la navigation.
- Acceptation : toutes les flèches mènent au tableau suivant, les douze repères
  suivent la lecture, la barre atteint ses bornes, le header revient en remontant
  et au clavier ; vérifier les menus, les dialogues, le zoom et le mouvement réduit.

Les contrôles de cette évolution et les captures correspondantes sont dans
`validation/navigation.json`.

## Direction artistique et moodboard

`charte.html` reprend la planche Figma « Direction 01 · Vert botanique »
(68:98) : palette, Arsenal et Outfit, quatre photographies et gravures.
Les composants supplémentaires réutilisent les styles réels de la maquette.

- Entrées : bouton « M » à côté de FR/EN sur l’accueil, l’article et la charte,
  libellé « Moodboard · Direction artistique » ; lien dans le pied de page.
- Hiérarchie : direction et intention, couleurs, typographies, iconographie,
  moodboard photographique puis exemples de composants et de leurs états.
- États : accès actif sur la charte, survol et focus des liens ; copie d’un
  code couleur réussie ou indisponible avec retour textuel explicite.
- Feedback : le code hexadécimal reste lisible et sélectionnable ; une erreur
  de presse-papiers ne masque pas le code. Aucun formulaire ne transmet de données.
- Responsive : bouton M conservé à côté des langues, grilles de cinq couleurs
  et quatre images réorganisées sur petit écran ; aucun recouvrement du menu.
- Accessibilité : libellé développé pour M, clavier, focus, titres structurés,
  alternatives d’images et état courant. Les liens de retour conservent la langue.
- Acceptation : ouvrir la charte depuis l’accueil et l’article, revenir dans la
  même langue, consulter tous les visuels, copier une couleur, gérer un refus du
  presse-papiers, vérifier mobile, grand écran et zoom à 200 %.

Les résultats et captures de cette évolution sont dans `validation/charte.json`.
