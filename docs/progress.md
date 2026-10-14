# Progress log

| Day | Target | Status |
|---|---|---|
| 13 Oct | Skeleton + GCP setup + Gemini test | Skeleton ✅ · Gemini ✅ (93%, 0 invented) · GCP billing ❌ card declined → plan B |
| 14 Oct | Intake → extract → editable card → clarification loop | |
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
  building and one coloured dot per incident (amber reported, red verified, blue response, green resolved);
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
