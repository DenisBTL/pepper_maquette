# PEPPER — maquette de démonstration

Maquette statique présentant une proposition de direction pour le site de la
plateforme PEPPER. Contenus et images provisoires, site non officiel.

En ligne : https://denisbtl.github.io/pepper_maquette/

## Le fil rouge

La page d'accueil déroule un récit en quatre chapitres, calqué sur les trois
questions du deck client (pourquoi PEPPER existe, pourquoi cela compte, pourquoi
nous rejoindre) :

**Hero plein écran** (le constat) → **01 — Pourquoi PEPPER existe** →
**02 — Comment nous travaillons** → **03 — Ce que cela change** →
**04 — Pourquoi vous**.

Les bandes photo pleine largeur (« Avant de protéger, savoir mesurer » ;
« Validée une fois, reconnue partout ») servent de charnières entre les
chapitres. Le registre est délibérément photo + texte : pas de diagrammes,
pas d'imagerie de laboratoire.

## Palette

La maquette applique la piste **03 « Rigueur et impact »** de la planche
d'exploration colorimétrique (bleu profond aligné sur le logo Pepper, cyan pâle
en accent sur fond sombre, pêche en tinte chaude, neutres gris-bleu). Toutes les
couleurs sont des variables CSS dans `:root` : basculer vers la piste 01 ou 02
se fait en changeant une dizaine de valeurs.

## Ce que traduit cette version

Elle applique les cinq références transmises par le client (document
« Références de sites ») et la direction artistique du deck — *minimal, elegant,
premium, editorial, breathing space* :

| Référence client | Traduction dans la maquette |
|---|---|
| The Climate Pledge — typographie, liste 01/02/03 | Système typographique Instrument Sans / Instrument Serif ; section « Du laboratoire à la réglementation » en quatre étapes numérotées, purement typographiques |
| The Climate Pledge — « Join the Pledge » | Bloc vidéo sur fond encre + parcours d'adhésion en trois étapes, au niveau du bouton « Devenir membre » |
| wellcome.org — chiffres clés | Bande « PEPPER en chiffres » : grands chiffres en serif, filets verticaux, phrase de sens sous chaque valeur |
| nesta.org.uk — images dans le menu | Méga-menu « Explorer » à quatre cartes illustrées |
| Arvato — mots-clés défilants | Bandeau des champs d'action sous le hero |
| No More Plastic — intégration photo | Hero plein écran et deux bandes photo pleine largeur, titre en capitales espacées |

Le mouvement reste sobre : apparitions en cascade au défilement, dérive lente
des bandes photo, défilement des mots-clés (en pause au survol et au focus),
fondu du méga-menu. Tout est neutralisé sous `prefers-reduced-motion`.

## Structure

```
index.html      structure et contenus (FR par défaut, EN dans les attributs data-en)
css/site.css    design system : jetons, échelle typographique, composants, responsive
js/site.js      bascule FR/EN, vues, méga-menu, filtres, modale vidéo, apparitions
img/            photographies provisoires (WebP)
```

Cinq vues cohabitent dans un même document : accueil, à propos, projets de
validation, ressources, devenir membre.

## Conventions

- **Bilingue** : tout élément traduisible porte `data-en` (texte), `data-en-ph`
  (placeholder) ou `data-en-alt` (texte alternatif d'image). Le français est dans
  le HTML ; le script mémorise la version FR au chargement et bascule à la demande.
- **Typographie** : Instrument Sans en variable 400–700 pour les titres, l'interface
  et le corps ; Instrument Serif réservé aux incises italiques et aux grands
  chiffres. Un micro-sous-ensemble grec d'Inter est chargé uniquement pour la
  lettre γ de PPARγ, absente d'Instrument Sans.
- **Échelle** : toutes les tailles sont des `clamp()` comportant un terme en `rem`,
  pour que le zoom navigateur reste opérant (WCAG 1.4.4).
- **Icônes** : sprite `<symbol>` en tête de `<body>`, instancié par `<use>`.
- **Aucun style ni script inline.**

## Images

Les 13 photographies proviennent de **Pexels** et sont couvertes par la
[licence Pexels](https://www.pexels.com/license/) : usage commercial libre,
modification autorisée, aucune attribution juridiquement requise. Elles sont
téléchargées, recadrées et converties en WebP dans `img/` — aucun appel à un
service externe au moment du rendu.

**Ce sont des visuels provisoires**, choisis pour illustrer la direction
artistique. Le deck prévoit à terme une production originale (photographies,
portraits, vidéo d'ouverture) ; l'achat de licences et la photographie sont hors
périmètre du devis.

Points de vigilance conservés dans la maquette : les personnes visibles ne sont
jamais présentées comme membres, salariés ou personnes exposées ; les légendes
restent descriptives.

## Contenus à confirmer par l'association

- Les chiffres de la bande « PEPPER en chiffres », dont l'année de création.
- Les intitulés nominatifs de gouvernance et d'équipe (la maquette ne montre que
  des fonctions).
- Les modalités réelles d'adhésion et l'instance qui l'approuve.
- La durée et le contenu de la vidéo, qui n'existe pas encore.

## Développement

Aucune dépendance ni build. Ouvrir `index.html` dans un navigateur, ou servir le
dossier :

```bash
python -m http.server 8000
```

Tout push sur `main` republie automatiquement le site via GitHub Pages.
