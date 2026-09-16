# GuideHand — Handoff Sheet

Paste this into a new chat to pick up where we left off.
Last updated: 16 Sep 2026.

---

## What this is

**GuideHand** — an offline emergency preparedness app. React Native / Expo, Android.
The whole premise: it works when the power, the towers and the internet are gone.

Repo: https://github.com/cynthiasisk77-coder/GuideHand-
Branch: `main`

---

## Standing rules — do not break these

1. **Do not touch FauxProof.** Ever. Separate project.
2. **Do not change Remedies** ("Your Ancestors Medicine Cabinet") code. Its Expo
   *account* is shared for billing only.
3. **Never invent a citation.** Unsourced content gets an honest
   "Not yet sourced" placeholder instead.
4. **Never present "call 911" as guaranteed.** The grid may be down.
5. **No copyrighted or watermarked third-party images.**
6. **Always grep BOTH `categories.ts` and `articleBodies.ts`** before writing content.
7. **Explain things for a beginner.** Short. One thing at a time. Do the work;
   don't narrate it.

---

## Install links (Android)

| Build | What's in it |
|---|---|
| [Latest APK](https://expo.dev/artifacts/eas/38W8OdMp6IgHwcyHIokAkaNp83eaLAiuJ71DS0ipCK0.apk) | Everything below **except** offline maps |
| Offline maps | Not built into an APK yet — code is pushed, needs a new build |

Links expire around 15 Dec 2026.

---

## What is built and working

- **Ask GuideHand** — downloads a small AI model to the phone, answers from your
  own articles only, cites which ones, refuses to guess. *Untested on a real phone.*
- **Search** — understands plain English ("how do I treat a burn").
- **Offline Maps** — pick an area, download real streets, works with no signal.
  Your meeting places draw on the map. *Code pushed, not in an APK yet.*
- **Supply Inventory** — how many days of water and food you actually have; what
  expires next; roughly how many phone charges are in your power banks.
- **Supply Cache** — checklist of what you should have.
- **Medicine Tracker** — encrypted. Doses and expiry dates.
- **Document Photos** — encrypted, PIN/fingerprint locked.
- **Family Meetup GPS** — distance and direction to a saved point, no signal needed.
  QR sharing for family who join late.
- **Backup** — automatic rolling snapshots, plus export to a file.
- **Content Packs** — the shelf is built. **It is empty.**
- **422 written articles** out of 434 topics.

## What is NOT built

- **Content for the packs** — biggest real gap. Shelf with nothing on it.
- **Family sharing between phones** — needs a backend.
- **12 unwritten topics** — but 5 of those are internal notes (bibliography,
  evidence standard, verification ledger, coverage tracker, engineering
  checklist) that arguably should not be customer-facing topics at all.
  Worth deciding rather than writing filler.
- **Looting / property defense and kidnapping articles** — offered, never approved.
- **Remedies as a companion app** — undecided.

---

## Accounts and IDs

- **Expo project ID (GuideHand):** `0d85659e-59ab-4cbd-8cf3-a4b0812d5359`
  ⚠️ **Always pass this as `appId`.** Guessing the project *name* once started a
  build of the Remedies app by mistake. Read it from `app.json` → `expo.extra.eas.projectId`.
- **Expo account owner:** `your-ancestors-medicine-cabinet` (paid — fast build queue)
- **Map tiles:** OpenFreeMap. No API key, no account, no request limit.

---

## Notes for whoever picks this up

**Verify pipeline — run all of it before shipping:**
1. `npx tsc --noEmit`
2. `npx expo lint` — there is exactly **one** known pre-existing error in
   `src/hooks/use-color-scheme.web.ts:11`. Never touched. One error = clean.
3. `npm install --dry-run` — catches the strict peer-dep resolution EAS runs.
4. **Drive it in a browser with Playwright.** Type-checking has missed every
   real bug this project has had. Chromium is at
   `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `--no-sandbox`.

**The trap that has bitten twice:** any native-only library imported at module
scope reaches for `TurboModuleRegistry` during web server-rendering and takes
down *every route*, not just its own screen. Put a `.web.tsx` / `.web.ts` stub
beside it from the start. This has happened with `react-native-executorch` and
was pre-empted for `@maplibre/maplibre-react-native`.

**Bugs the browser caught that tsc and lint did not:**
- Auto-backup snapshotted *before* the save landed, capturing the old value.
- An empty list on mount became the newest snapshot and rate-limited out the real one.
- GPS `getCurrentPositionAsync` hangs forever indoors — no error, just a spinner.
  Everything touching location needs a timeout, **including the permission prompt**.

---

## Next step

Build an APK with offline maps in it, and test on a real phone.
Nothing else is blocking.
