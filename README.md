# Pepper · Propositions de couleur

Les quatre propositions utilisent des adresses fondées sur leur couleur.
Le site est statique, sans build. Les contenus sont des démonstrations.

| Proposition | Adresse principale | Ancienne adresse |
|---|---|---|
| Vert | [/vert/](https://denisbtl.github.io/pepper_maquette/vert/) | `/maquette_2/` |
| Cyan | [/cyan/](https://denisbtl.github.io/pepper_maquette/cyan/) | `/maquette_4/` |
| Bleu | [/bleu/](https://denisbtl.github.io/pepper_maquette/bleu/) | `/maquette_3/` |
| Bleu miel | [/bleu-miel/](https://denisbtl.github.io/pepper_maquette/bleu-miel/) | `/` |

Vert, Cyan et Bleu comprennent chacun `article.html` et `charte.html`.
Bleu miel conserve les vues de la première proposition et sa `charte.html`.
Les liens en pied de page utilisent les mêmes noms de couleur.

Les anciennes pages d’accueil, articles et chartes redirigent vers la nouvelle
adresse. Le script conserve les paramètres, dont `lang=en`, et l’ancre de la
section. Sans JavaScript, une redirection HTML et un lien de secours permettent
de rejoindre la page canonique. Les anciens dossiers d’assets ne sont pas
des adresses de pages conservées.

La racine du site redirige vers Bleu miel, comme la première proposition qui
s’y trouvait auparavant. `versions.json` consigne la correspondance des noms.

## Documentation et vérification

- [Vert](vert/README.md)
- [Cyan](cyan/README.md) et [contre-audit](cyan/validation/contre-audit.md)
- [Bleu](bleu/README.md) et [contre-audit](bleu/validation/contre-audit.md)
- [Bleu miel](bleu-miel/README.md)
- [Migration des adresses et critères UX/UI](docs/URLS_MAQUETTES.md)

Servir la racine de ce dépôt avec un serveur HTTP statique, puis ouvrir les
adresses ci-dessus sur ce serveur. Les captures et mesures historiques restent
dans les dossiers `validation/` : leurs anciens numéros désignent les versions
examinées, avant le changement d’adresse.
