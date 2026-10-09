# tw-plugins

[English](README.md) · **Français**

La bibliothèque des plugins TiddlyWiki de nikorion : **[nikorion.github.io/tw-plugins](https://nikorion.github.io/tw-plugins/)**.

Glisser une fois le bouton de cette page sur votre wiki ; *Panneau de configuration → Plugins → Obtenir d'autres plugins → Ouvrir la bibliothèque de plugins* affiche alors un onglet **nikorion** pour installer tous les plugins nikorion, et propose chaque nouvelle version en mise à jour.

## Ce que construit ce dépôt

- `library/tiddlywiki.info` : la bibliothèque de plugins (`docs/library/`), tous les plugins listés dans le `plugins.json` de [tw-dev](https://github.com/nikorion/tw-dev) sauf `detect-language` (interne), chacun pris sur la branche par défaut de son dépôt.
- `page/` : la page d'accueil (`docs/index.html`, au style des wikis de démo, en anglais ou en français selon le navigateur) et le tiddler d'abonnement en fichier (`docs/nikorion-plugin-library.json`). `build.cjs` lit les noms, versions et descriptions des plugins dans le catalogue de la bibliothèque elle-même.
- `.github/workflows/publish.yml` : construit les deux et les publie sur GitHub Pages à chaque push, chaque nuit et à la demande (Actions → Run workflow) : une nouvelle version de plugin y apparaît en moins d'un jour.

**Build local**

Avec `TIDDLYWIKI_PLUGIN_PATH` posé comme sur la machine de dev et `tw-dev` cloné à côté de ce dépôt :

```
npx tiddlywiki library --build library
node page/build.cjs ../tw-dev/plugins.json
```

## Licence

MIT.
