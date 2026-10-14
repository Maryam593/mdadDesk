# Progress log

| Day | Target | Status |
|---|---|---|
| 13 Oct | Skeleton + GCP setup + Gemini test | Skeleton ✅ · Gemini ✅ (93%, 0 invented) · GCP billing ❌ card declined → plan B |
| 14 Oct | Intake → extract → editable card → clarification loop | Help loop ✅ · Firebase live ✅ · alerts ✅ · editable card / clarification reply ⏳ |
| 15 Oct | Coordinator realtime, verify, map marker, timeline | |
| 16 Oct | Agencies, accept/decline/busy, lead/support, rules | |
| 17 Oct | Fallback, related flag, eval, deploy, **freeze** | |
| 18 Oct | Video, deck, README, submit by midday | |

## 2026-10-13
**Done**
- Repo skeleton: npm workspaces (`web`, `api`) + `shared` types.
- API: `/health`, `/extract`, `/clarify` with Gemini structured output + zod validation, 15 s timeout, never-throw envelope.
- Web: PWA (installable, offline shell), Firestore offline cache, report page (delivery-first submit),
  coordinator page (realtime list + detail + verify/resolve + timeline), login, agency stub.
- `firestore.rules` (role claims), `api/scripts/seed.ts`, `api/scripts/eval.ts`, 20 synthetic reports.
- `Dockerfile` for Cloud Run, `firebase.json` for Hosting.
- Verified: both workspaces typecheck, production build + service worker generated,
  `/health` OK, `/extract` without key returns `{ok:false}`.

**Later the same day**
- Gemini key works (new `AQ.` format). Models: `gemini-3.5-flash-lite` + backup `gemini-3.1-flash-lite`.
- Eval on 20 synthetic reports: **93% field accuracy, 0 invented values, 0 failures.**
- GCP billing failed (`OR_BACR2_31`, SadaPay card). Without billing there is no Cloud Run or Google Maps.
  Plan B: Firebase Spark (Hosting + Firestore + Auth) + Gemini without a server; the map comes from elsewhere.

- Map added early (planned for 15 Oct): Leaflet + OpenStreetMap on the coordinator page. Shows the demo
  building and one coloured dot per incident (amber reported, red verified, blue response, green resolved; open ones drawn on top, resolved small and faded);
  clicking a dot opens the incident. Shows a notice when offline.

**Not yet verified:** Firestore writes (no Firebase project yet), so no incident dots appear yet; deployment.

**Next (14 Oct)**
- Add the Gemini key → `npm run eval`; tune prompts until ≥90% / 0 invented.
- Clarification answer input on the report page; editable fields on the coordinator card.

## 2026-10-14
**Done**
- MVP help loop (docs/prd.md) built end to end:
  - Reporter: "Your reports" links on the report page (saved on the phone) → live `/track/<id>` page
    with 5 steps: sent → seen → help requested → "<agency> on the way" → closed.
  - Coordinator: "Send help" buttons per agency after Verify (busy agencies disabled); Resolve button.
  - Agency: inbox of requests for the signed-in agency with **On the way**.
  - Rules: open `get` of one incident by id; agencies can only set `response`/`respondingKinds` on
    incidents they were asked to help; agencies read only their own assignments.
- Shared `ActionButton` (busy + error message) replaces repeated try/catch in buttons.
- Verified: typecheck + production build. **Not yet verified against a real Firebase project**
  (user is creating it now); test steps in `docs/firebase-setup.md` step 8.

**Later the same day**
- Firebase project `mdaddeskv1-6af42` created (Spark, Firestore in Mumbai). `web/.env`, `.firebaserc`,
  `api/.env` filled; `api/service-account.json` in place (gitignored).
  Rules deployed ("Deploy complete"); seed created 3 agencies + 4 demo accounts.
- "Movie-style" alerts: full red flashing screen + siren (Web Audio, no file) + system notification when
  the tab is hidden. Coordinator: new SOS. Agency: new help request. Closes itself once handled.
- Docs: `deployment.md` (Hosting + preview link for testers + Render option for the AI API),
  `testing-e2e.md` (15 cases E1–E15 for teammates), `testing-user.md` (sessions with real people).
- Verified: typecheck + build. **Not yet verified by a person in the browser:** help loop on real
  Firebase, siren, notifications.

**Next**
- User runs `docs/testing-e2e.md` E1–E10 locally; fix what fails.
- Deploy Part A and send the preview link to the team.
- Editable fields on the coordinator card; clarification reply on the report page.

**Later the same day (2)**
- One-tap SOS: 6 big buttons (fire, smoke, medical, trapped, collapse, other). Typing is optional.
- Phone GPS sent with the SOS (after delivery, never blocking it). Coordinator + agency see
  "± metres" and an "Open in Google Maps" link; the map flies to the selected incident.
  Rules updated (reporter may add `location` while `reported`) and deployed.
- Verified: typecheck + build + rules deploy. Browser test pending (testing-e2e E1, E1b, E1c).

**Later the same day (3): AI without a server**
- Firebase AI Logic enabled (Gemini Developer API, Spark). Web now calls Gemini directly via
  `firebase/ai` (`web/src/lib/ai.ts`); prompts/schemas/fallback moved to `shared/src/ai/`.
  Removed `web/src/lib/api.ts`, `VITE_API_URL`, `VITE_MAPS_API_KEY`.
- Eval with the shared JSON Schema: 90.6%, 0 invented, 3/20 timeouts (see bug-fix).
- Blocked: App Check enforcement returns 401 → user to unenforce in console.
- App Check: reCAPTCHA key registered in Firebase App Check (Fraud Defense); site key in `web/.env`.
  Build includes it. Browser check by the user pending.
- Eval rerun: 92.6%, 0 invented, 1/20 timeout.

**Later the same day (4): feedback from the first browser test**
- Header showed "Login" after signing in → now shows "👤 coordinator" (opens sign-out page).
- Reporter good-news splash: each time their SOS moves forward (verified, help requested, on the way,
  closed) a green full-screen splash with a chime and a phone notification. Emojis = who is coming +
  the "opposite" of the danger (fire → 🚒🧯💧, medical → 🚑🩺, trapped → 🪜…). The live status card now
  also shows on the report page right after sending (no need to open /track).
- First-visit tour on report, coordinator and agency pages (+ "❓ How it works" button).
- Refactors: `Overlay` shared by alert / splash / tour; `submitSteps.ts` split out of useReportSubmit (≤60 lines).
- User confirmed: login, coordinator page and map work.
- Tours rewritten after user feedback: every tour starts with what each tab is for; coordinator and
  report tours explain the flow (SOS → Verify → Send → On the way); agency tour says an empty inbox is
  normal until the coordinator sends a request, and shows before sign-in. `TOUR_VERSION` in
  `useTour.ts` makes changed tours show again once.
- **Deployed** to https://mdaddeskv1-6af42.web.app (Firebase Hosting). Checked: `/`, `/coordinator` and
  `sw.js` return 200. Phone test (GPS, App Check on the live domain, siren) pending.
- **New look** (user: "UI nhi acha, logo bhe nhi acha"): new logo (red tile, white pin, help cross, signal
  waves), navy header with logo + pill nav + footer with emergency numbers, Plus Jakarta Sans, rounder
  cards/buttons, big gradient SOS tiles with numbered steps and a "Need help?" hero, login page with logo.
- SOS tiles now flip (front: name, then turn over one by one to show the emoji; mouse hover turns them
  back; no animation with "reduce motion"). `FlipTile.tsx` + `.flip` CSS in index.css. Tour button is a
  green round "?".
- **Role-based tabs** (user: "coordinator ko agencies tab nhi dikhna chahiye, user ko sirf help tab"):
  public sees only Report SOS + Staff login; coordinator only Coordinator; agency only its inbox. After
  sign-in each role lands on its own page (`lib/nav.ts`). Tour step 1 explains this (TOUR_VERSION 3).
- Onboarding: `docs/how-to-start.md` (setup, accounts, 3-minute demo script, pitfalls), `AGENTS.md`
  (rules for any AI agent), `CLAUDE.md` / `GEMINI.md` pointing to it, Claude skill `madaddesk-demo`.
- Install on phones: PNG icons (192, 512, maskable 512, apple-touch-icon 180) made from `icon.svg`
  (Android/iPhone don't use SVG icons for installing). Manifest + iPhone meta tags updated.
- Docs: phone install steps for Android + iPhone and the iPhone limits (notifications only from the
  home-screen app, silent switch mutes sound, no alerts in the background) → `docs/how-to-start.md` §6,
  test cases E21–E22. Demo tip: iPhone as reporter, siren screens on laptop/Android.
