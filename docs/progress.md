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

**Not yet verified:** Firestore writes (no Firebase project yet), deployment.

**Next (14 Oct)**
- Add the Gemini key → `npm run eval`; tune prompts until ≥90% / 0 invented.
- Clarification answer input on the report page; editable fields on the coordinator card.
