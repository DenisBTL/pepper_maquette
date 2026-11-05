# Adresses des propositions Pepper · 5 novembre 2026

## Correspondance

| Ancienne proposition | Adresse canonique | Nom affiché |
|---|---|---|
| Maquette 2, Vert botanique | `/vert/` | Vert |
| Maquette 4, direction Figma Cyan et miel | `/cyan/` | Cyan |
| Maquette 3, Bleu éditorial | `/bleu/` | Bleu |
| Première proposition, bleu et ambre, à la racine | `/bleu-miel/` | Bleu miel |

Le nom complet d’une direction Figma peut rester sur sa planche et dans les
documents de provenance. Les adresses, titres de navigation et liens entre
propositions utilisent les noms courts demandés.

## Préconisation UX/UI

- Problème utilisateur : les numéros ne permettent pas de retrouver une
  proposition par sa couleur ou de communiquer une adresse explicite au client.
- Règle : déplacer les pages et leurs ressources dans les dossiers de couleur ;
  maintenir les anciennes pages comme entrées de redirection. Conserver les
  corrections du contre-audit, sans réintroduire leur version antérieure.
- Point d’entrée : lien partagé, favori existant, pied de page de chaque
  proposition, article, bouton M ou retour à l’accueil depuis une charte.
- Hiérarchie : le nom de couleur identifie la proposition ; les liens vers
  les autres couleurs restent secondaires dans les pieds de page.
- États : URL canonique, ancienne URL, langue FR/EN, ancre de section et absence
  de JavaScript. Aucun nouvel état métier ni formulaire n’est introduit.
- Feedback : une ancienne page conduit directement à sa nouvelle adresse.
  Si la navigation automatique n’est pas exécutée, un titre et un lien nommé
  expliquent l’adresse de destination. `location.replace` évite un retour
  arrière bloqué sur la redirection.
- Données : la correspondance est explicite dans ce document et `versions.json`.
  Les traductions des liens utilisent Green, Cyan, Blue et Blue and honey.
- Responsive : mêmes compositions que les pages existantes ; les liens de
  couleur se replient sur plusieurs lignes et restent accessibles à 320 px.
- Accessibilité : liens HTML natifs, nom de couleur lisible et état courant
  `aria-current="page"` ; redirection de secours sans JavaScript. Les pages
  historiques sont `noindex` et désignent la page canonique.
- Cohérence : mêmes conventions `data-en` et `data-local-link` que le dépôt.
  Aucun changement des maquettes Mon Chai ou de son moteur d’assistant.

## Critères d’acceptation UX/UI

1. Les quatre URL canoniques affichent la bonne proposition et tous les assets
   appelés existent à leur nouvelle adresse.
2. Les trois anciens accueils numérotés, leurs articles et leurs chartes, ainsi
   que les deux pages de la racine, atteignent la bonne destination.
3. Avec JavaScript, `?lang=en`, les autres paramètres et `#section` sont
   conservés. L’historique ne contient pas de boucle de redirection.
4. Sans JavaScript, les pages de secours atteignent la bonne proposition ; la
   traduction interactive reste celle prise en charge par la page originale.
5. Tous les liens entre couleurs utilisent les nouveaux chemins et conservent
   la langue lorsque le parcours la prend en charge. Les pages historiques du
   contre-audit conservent leur contexte de version.
6. M, retour à l’accueil et première actualité restent fonctionnels dans Vert,
   Cyan et Bleu. Bleu miel conserve son gabarit de charte d’origine en français.
7. Les liens et les pages restent utilisables sur ordinateur et à 320/390 px,
   sans erreur de script ou ressource locale manquante.

Preuve de vérification : `validation/urls-couleurs.json`.

## Résultat de la vérification

Chromium et WebKit : 66 contrôles de page/largeur et 30 contrôles de
redirection, avec paramètres et ancres, historique sans boucle, parcours de
langue, liens de couleur et allers-retours de charte. Aucune ressource locale
manquante ni erreur JavaScript pendant ces parcours. Le script de reproduction
se trouve dans `validation/check-urls.cjs` (Playwright externe).

Contrôle complémentaire : les onze pages historiques redirigent également
sans JavaScript ; les anciens `index.html` explicites conservent langue et
ancre avec JavaScript. Les 339 références relatives de pages et ressources
existent dans la nouvelle arborescence (`validation/urls-ressources.json`).
