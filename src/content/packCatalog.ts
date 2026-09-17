// The catalog of content packs, compiled into the app.
//
// This is the fallback the Content Packs screen shows when there is no network
// — which, for this app, is the case that matters. A newer catalog fetched from
// the network replaces it at runtime, but the app never depends on that call
// succeeding.
//
// LICENSING — every source listed here is one GuideHand can ship commercially:
//
//   Public domain (works of the U.S. federal government): MedlinePlus and the
//   National Library of Medicine, FEMA, Ready.gov, the CDC, and U.S. Army field
//   manuals. No restrictions, no attribution legally required — we attribute
//   anyway, because a reader deserves to know where a first-aid step came from.
//
//   CC BY-SA (Wikipedia): commercial use is permitted with attribution, and any
//   derived text has to carry the same licence. That is why the Wikipedia pack
//   is kept as its own separate pack rather than blended into GuideHand's own
//   articles — share-alike would otherwise reach into content that isn't
//   Wikipedia's.
//
// Deliberately NOT listed: wikiHow and iFixit. Both are CC BY-NC-SA, and the NC
// means NonCommercial. Their guides are good and they would fit this app well,
// but bundling them would be a licence violation the moment GuideHand is paid,
// ad-supported, or otherwise commercial. They would need written permission
// from those publishers first.

import { PackCatalog } from "@/lib/packTypes";

// Packs are served as static files. Changing this location only requires
// publishing a new catalog, not a new app release.
const PACK_BASE = "https://cynthiasisk77-coder.github.io/GuideHand-/packs";

export const BUNDLED_PACK_CATALOG: PackCatalog = {
  catalogVersion: 1,
  packs: [
    {
      id: "field-medicine",
      name: "Field Medicine Reference",
      summary:
        "Deeper medical reference than the app carries on its own — conditions, symptoms, and what to do when professional care isn't reachable.",
      version: 1,
      bytes: 0,
      articleCount: 0,
      license: "Public domain — MedlinePlus, U.S. National Library of Medicine",
      attribution: "MedlinePlus, U.S. National Library of Medicine",
      icon: "medical",
      url: `${PACK_BASE}/field-medicine.json`,
      published: false,
    },
    {
      id: "disaster-response",
      name: "Disaster Response",
      summary:
        "Official guidance for hurricanes, floods, wildfire, earthquakes, and chemical and radiological incidents.",
      version: 1,
      bytes: 18346,
      articleCount: 10,
      license: "Public domain — FEMA, Ready.gov, and the CDC",
      attribution: "FEMA, Ready.gov, and the U.S. Centers for Disease Control and Prevention",
      icon: "storm",
      url: `${PACK_BASE}/disaster-response.json`,
      published: true,
    },
    {
      id: "survival-manuals",
      name: "Wilderness & Survival Manuals",
      summary:
        "Shelter, fire, water, navigation, and signalling, drawn from the military field manuals these skills were written down in.",
      version: 1,
      bytes: 0,
      articleCount: 0,
      license: "Public domain — U.S. Army field manuals",
      attribution: "U.S. Army field manuals",
      icon: "compass",
      url: `${PACK_BASE}/survival-manuals.json`,
      published: false,
    },
    {
      id: "plants-and-wildlife",
      name: "Plants & Wildlife Reference",
      summary:
        "Identification reference for edible and poisonous plants, venomous animals, and dangerous look-alikes.",
      version: 1,
      bytes: 0,
      articleCount: 0,
      license: "CC BY-SA 4.0 — Wikipedia",
      attribution: "Wikipedia contributors, CC BY-SA 4.0",
      icon: "leaf",
      url: `${PACK_BASE}/plants-and-wildlife.json`,
      published: false,
    },
  ],
};
