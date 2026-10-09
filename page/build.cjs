#!/usr/bin/env node
"use strict";

// Builds the landing page of the nikorion plugin library, after the library
// itself (docs/library/): docs/index.html + docs/nikorion-plugin-library.json.
//
//   node page/build.cjs <plugins.json of tw-dev>
//
// The plugin list comes from the library's own catalogue
// (docs/library/recipes/library/tiddlers.json: names, versions, descriptions),
// the demo links from tw-dev's plugins.json (short name → repository).

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const SITE = "https://nikorion.github.io/tw-plugins/";
const LIBRARY_URL = SITE + "library/index.html";

const repos = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const catalogue = JSON.parse(fs.readFileSync(path.join(DOCS, "library/recipes/library/tiddlers.json"), "utf8"));

const plugins = catalogue
  .map((p) => {
    const short = p.title.replace("$:/plugins/nikorion/", "");
    return {
      name: p.name || short,
      version: p.version || "",
      description: p.description || "",
      demo: repos[short] ? `https://nikorion.github.io/${repos[short]}/` : SITE,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// The tiddler that subscribes a wiki to the library (same shape as the core's
// $:/config/OfficialPluginLibrary).
const libraryTiddler = {
  title: "$:/config/nikorion/PluginLibrary",
  tags: "$:/tags/PluginLibrary",
  url: LIBRARY_URL,
  caption: "nikorion",
  text: "TiddlyWiki plugins by nikorion: " + SITE,
};

// JSON safe inside a <script> element.
const inline = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const html = fs
  .readFileSync(path.join(__dirname, "index.template.html"), "utf8")
  .replaceAll("{{LIBRARY_TIDDLER}}", inline(libraryTiddler))
  .replaceAll("{{PLUGINS}}", inline(plugins))
  .replaceAll("{{LIBRARY_URL}}", LIBRARY_URL)
  .replaceAll("{{BUILT}}", new Date().toISOString().slice(0, 10));

fs.writeFileSync(path.join(DOCS, "index.html"), html);
fs.writeFileSync(path.join(DOCS, "nikorion-plugin-library.json"), JSON.stringify([libraryTiddler], null, 2) + "\n");
process.stdout.write(`landing page: ${plugins.length} plugins\n`);
