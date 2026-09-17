# GuideHand — Handoff Sheet

Paste this into a new chat to pick up where we left off.
Last updated: 17 Sep 2026.

---

## What this is

**GuideHand** — an offline emergency preparedness app. React Native / Expo, Android.
The premise: it works when the power, the towers and the internet are gone.

Repo: https://github.com/cynthiasisk77-coder/GuideHand-  ·  Branch: `main`

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
7. **Short replies.** Do the work; don't narrate it. One thing at a time.

---

## Accounts and IDs — read before building

- **Expo project ID:** `0d85659e-59ab-4cbd-8cf3-a4b0812d5359`
  ⚠️ **Always pass this as `appId`.** Guessing the project *name* once started a
  build of the Remedies app by mistake. It lives in `app.json` →
  `expo.extra.eas.projectId`.
- ⚠️ **Bump `expo.android.versionCode` on every build.** It sat at unset (= 1)
  for weeks, and Android is entitled to keep the app it already has when the
  version does not move — so new APKs installed and changed nothing. Currently 2.
- **Expo account owner:** `your-ancestors-medicine-cabinet` (paid, fast queue)
- **Map tiles:** OpenFreeMap. No API key, no account, no request limit.
- This session can push branches but **not tags** (403).

---

## The design, as settled

Do not redesign without being asked. This took many rounds.

```
ground     #101A2E   deep navy — in BOTH colour schemes, deliberately
card       #F2F0EA   off-white, outlined in colour, NEVER filled
header     #9FB2BF   soft dusty blue, fades to #8499A8, carries DARK text
panel      the whole top section sits in one raised panel, soft blue edge
```

Muted signals, each with a darker twin used only for text:

| meaning | outline | text |
|---|---|---|
| danger to life | `#A8524C` | `#7E2A24` |
| severe weather / evacuation | `#B57A46` | `#734418` |
| clear, safe, handled | `#5E8468` | `#335743` |
| everything else | `#42707E` | `#274753` |

**Every text pair measures 7:1 or better (WCAG AAA). Keep it that way.** The
bright signal colours fail as small text (2.5–4.8:1) — that is why the twins
exist. Category colour comes from each group's `band` in `groups.ts`, never from
its position in the list.

---

## What is built

- **Ask GuideHand** — downloads a small model, answers only from your own
  articles, cites them, refuses to guess. Reads answers aloud.
- **Offline Maps** — pick an area, download real streets, works with no signal.
  Meeting places draw on the map.
- **Family Plan** — write it once, share the file, it lands on every phone.
  Medical info is opt-in per person and off by default.
- **Supply Inventory** — days of water and food you actually have, what expires
  next, phone charges in your power banks.
- **Home Supplies** — checklist. (The word "Cache" was removed everywhere a
  person can read it; storage keys still use it and must not be renamed.)
- **Medicine Tracker**, **Document Photos** — encrypted, PIN/fingerprint locked.
- **Family Meetup GPS** — distance and direction, no signal needed, QR sharing.
- **Backup** — automatic rolling snapshots plus export to a file.
- **Search** — understands plain English. Clear button and "Back to everything".
- **Read aloud** — on answers and on every article, above the steps.
- **422 written articles** of 434 topics.

## What is NOT built

- **Content for the packs** — the shelf exists and is empty. Biggest real gap.
- **Family sharing between phones** — beyond the file. Needs a backend.
- **12 unwritten topics** — 5 are internal meta-docs (bibliography, evidence
  standard, verification ledger, coverage tracker, engineering checklist) that
  arguably should not be customer-facing topics at all. Decide, don't write filler.
- **Looting / property defense and kidnapping articles** — offered, never approved.

---

## Verify before shipping — all of it

1. `npx tsc --noEmit`
2. `npx expo lint` — exactly **one** known pre-existing error in
   `src/hooks/use-color-scheme.web.ts:11`. One error = clean.
3. `npm install --dry-run` — the strict peer-dep check EAS runs.
4. **Drive it in a browser with Playwright.** Type-checking has missed every
   real bug this project has had. Chromium:
   `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `--no-sandbox`.
   **Render both colour schemes** — `colorScheme: 'dark'` — a dark-mode-only
   bug shipped because every screenshot was light mode.

### Traps that have bitten

- **Native-only imports take down every route.** Anything importing native code
  at module scope reaches for `TurboModuleRegistry` during web server-rendering
  and 500s the whole app, not just its screen. Put a `.web.tsx`/`.web.ts` stub
  beside it. Happened with `react-native-executorch`; pre-empted for maplibre.
- **`unknown` hides real bugs.** The AI download died on the phone with
  `Missing argument "path"` because `models.llm[key]` is a *container* of
  hardware variants — the model is `.DEFAULT`. It type-checked because the
  return type was `unknown`. It is now typed, and reintroducing the bug fails
  the build.
- **Auto-backup raced the save** — snapshot taken before the write landed,
  capturing the old value. Chain on `.then()`, never call it alongside.
- **An empty list on mount became the newest snapshot** and rate-limited out
  the real one. Only persist rows a person actually touched.
- **GPS hangs forever indoors** — no error, just a spinner. Everything touching
  location needs a timeout, **including the permission prompt**.
- **`clearButtonMode` is iOS-only** and renders nothing on Android.

---

## Next step

Test on a real phone. The two things no browser can prove:
1. Ask GuideHand → Small → download on Wi-Fi → ask a question.
2. Offline Maps → download an area → airplane mode → open it.
