# Content packs

Extra reference material people download over Wi-Fi ahead of time, so it's on
their phone when the signal isn't.

Everything the app already shows works without any of this. Packs are depth on
top, never the basics — nothing in the base app depends on a pack being present.

## How it works

`catalog.json` lists what's available. The app fetches it, falls back to the
last copy it saw, and falls back again to the copy compiled into
`src/content/packCatalog.ts`. That last fallback is why the screen still shows a
list with the grid down.

Each pack is a single JSON file sitting next to the catalog.

## Publishing

These files are served as static files over HTTPS. Turn on GitHub Pages for this
repository (Settings → Pages → deploy from `main`, folder `/`) and they'll be
live at:

```
https://cynthiasisk77-coder.github.io/GuideHand-/packs/catalog.json
```

which is where the app already looks. To publish somewhere else instead, set
`EXPO_PUBLIC_PACK_CATALOG_URL` at build time — no code change needed.

## Pack file format

```json
{
  "id": "field-medicine",
  "name": "Field Medicine Reference",
  "version": 1,
  "license": "Public domain — MedlinePlus, U.S. National Library of Medicine",
  "attribution": "MedlinePlus, U.S. National Library of Medicine",
  "articles": [
    {
      "title": "Treating a deep laceration",
      "category": "Medical & First Aid",
      "priority": "P0",
      "sources": ["MedlinePlus, U.S. National Library of Medicine"],
      "guidance": [
        "One step per line.",
        "Same shape as the articles already in the app."
      ]
    }
  ]
}
```

`category` should match a category name in `src/content/categories.ts` so the
articles land somewhere people already browse. A category the app doesn't have
still works — those articles are reachable through search.

An article the app already carries under the same title is skipped rather than
duplicated, and the app's own verified version always wins.

## Adding a pack

1. Write the pack JSON and drop it in this folder.
2. Add or update its entry in `catalog.json`, with `bytes` set to the real file
   size and `published` set to `true`.
3. Mirror the same entry in `src/content/packCatalog.ts` so the offline fallback
   list stays current.
4. Bump `version` whenever a pack's content changes. The app compares it against
   what's installed and offers an update.

Malformed articles are dropped on install and the rest of the pack still
installs. A pack with nothing readable in it is refused outright, and a pack
whose `id` doesn't match its catalog entry is refused too.

## Licensing — read before adding a source

Only ship content GuideHand is allowed to ship commercially.

**Safe:**

- **Public domain** — works of the U.S. federal government: MedlinePlus and the
  National Library of Medicine, FEMA, Ready.gov, the CDC, U.S. Army field
  manuals. No restrictions. Attribute anyway: a reader deserves to know where a
  first-aid step came from.
- **CC BY-SA** — Wikipedia. Commercial use is fine with attribution, but
  share-alike means anything derived from it carries the same licence. Keep
  Wikipedia content in its own pack rather than blending it into GuideHand's own
  articles, so share-alike doesn't reach into text that isn't Wikipedia's.

**Not safe:**

- **CC BY-NC-SA** — wikiHow and iFixit are both under this. The **NC** means
  NonCommercial. Their guides are good and would fit this app well, but bundling
  them is a licence violation the moment GuideHand is paid, ad-supported, or
  otherwise commercial. They'd need written permission from those publishers
  first.

When in doubt, check the actual licence on the actual page. Licences differ
between a site's text, its images, and its user contributions.
