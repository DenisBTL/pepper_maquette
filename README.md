# PEPPER — maquette de démonstration

Maquette statique présentant une proposition de direction pour le site de la
plateforme PEPPER. Contenus provisoires, site non officiel.

En ligne : https://denisbtl.github.io/pepper_maquette/

## Structure

```
index.html      structure et contenus (FR par défaut, EN dans les attributs data-en)
css/site.css    styles : variables de thème, composants, responsive
js/site.js      bascule FR/EN, navigation entre vues, menu mobile, filtres, animations
```

## Conventions

- **Bilingue** : chaque élément traduisible porte un attribut `data-en` (ou
  `data-en-ph` pour un placeholder). Le texte français est celui du HTML ; le
  script mémorise la version FR au chargement et bascule à la demande.
- **Vues** : les trois pages (accueil, projets, ressources) sont des blocs
  `.view` d'un même document, affichés via les éléments `data-view`.
- **Icônes** : un sprite `<symbol>` en tête de `<body>`, instancié par `<use>`.
  Les icônes héritent de `currentColor` ; le logo utilise `--mark-1` / `--mark-2`.
- **Aucun style ni script inline** : tout passe par les deux fichiers dédiés.

## Développement

Aucune dépendance ni build. Ouvrir `index.html` dans un navigateur, ou servir le
dossier :

```bash
python -m http.server 8000
```

Tout push sur `main` republie automatiquement le site via GitHub Pages.
