# tw-plugins

**English** · [Français](README.fr.md)

The nikorion TiddlyWiki plugin library: **[nikorion.github.io/tw-plugins](https://nikorion.github.io/tw-plugins/)**.

Drag the button of that page onto your wiki once; *Control Panel → Plugins → Get more plugins → Open plugin library* then shows a **nikorion** tab to install every nikorion plugin, and offers each new version as an update.

## What this repository builds

- `library/tiddlywiki.info`: the plugin library (`docs/library/`), every plugin listed in [tw-dev](https://github.com/nikorion/tw-dev)'s `plugins.json` except the internal `detect-language`, each taken from its repository's default branch.
- `page/`: the landing page (`docs/index.html`, in the look of the demo wikis, English or French after the browser) and the subscription tiddler as a file (`docs/nikorion-plugin-library.json`). `build.cjs` reads the plugin names, versions and English descriptions from the library's own catalogue; other languages come from `page/descriptions.json`, written by hand (update it with each new plugin or changed description).
- `.github/workflows/publish.yml`: builds both and publishes them to GitHub Pages on every push, every night, and on demand (Actions → Run workflow), so a new plugin version shows up within a day.

**Local build**

With `TIDDLYWIKI_PLUGIN_PATH` set as on the dev machine and `tw-dev` cloned next to this repository:

```
npx tiddlywiki library --build library
node page/build.cjs ../tw-dev/plugins.json
```

## License

MIT.
