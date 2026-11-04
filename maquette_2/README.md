# Pepper, maquette 2 : Vert botanique

Deuxième proposition, ajoutée dans `maquette_2/` du dépôt existant
`DenisBTL/pepper_maquette`. La première proposition reste à la racine.

Source : [Homepage verte, cadre 60:663](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=60-663),
associée à la planche « Direction 01 · Vert botanique » et à
l’[article Appel à laboratoires, cadre 84:123](https://www.figma.com/design/xUIcohxRF4x1gGH0oX9Kg7/?node-id=84-123).
Les autres copies de la homepage présentes sur la même page Figma ne sont pas
les références de cette intégration.

## Consulter

Ouvrir `index.html` ou servir la racine du dépôt avec un serveur statique,
puis visiter `/maquette_2/`. Aucun build ni installation nécessaire.
L’article est accessible depuis la première carte d’actualité.

L’adresse GitHub Pages prévue après intégration dans `main` est
`https://denisbtl.github.io/pepper_maquette/maquette_2/`.
La présence de ce fichier ne vaut pas confirmation de publication.

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
