# Deployment

How to put MadadDesk online so teammates and judges can open it from their own phones.
Everything here is free (Firebase **Spark** plan, no card).

## What runs where
| Part | Where | Status |
|---|---|---|
| Web app (React PWA) | Firebase Hosting → `https://mdaddeskv1-6af42.web.app` | Ready to deploy (Part A) |
| Database + login | Firebase Firestore + Auth (project `mdaddeskv1-6af42`) | ✅ Live since 14 Oct (rules + demo data uploaded) |
| AI API (Gemini) | Needs a small server. Cloud Run is blocked (no billing) | Runs only on the developer's PC for now (Part B) |

If the AI API can't be reached, the app still works: the SOS is delivered and the coordinator
reads the message by hand ("Automatic reading unavailable"). So Part A alone is enough for testing the help loop.

---

## Before you start (one time)
- `npm install` in the project folder.
- `npm install -g firebase-tools` then `firebase login` (same Google account as the project).
- `web\.env` filled (see `docs/firebase-setup.md` step 2). Never commit `.env` files or `api\service-account.json`.

## Part A: deploy the web app
```
npm run build -w web
firebase deploy --only hosting,firestore:rules
```
Check:
1. Open `https://mdaddeskv1-6af42.web.app` on a phone. The report page loads.
2. Send a test SOS → "SOS delivered".
3. Login as coordinator → the SOS is on the list.
4. Turn on airplane mode and reload: the app still opens (PWA offline).

### Test link for teammates (doesn't touch the main site)
```
npm run build -w web
firebase hosting:channel:deploy team-test --expires 7d
```
Firebase prints a temporary URL like `https://mdaddeskv1-6af42--team-test-xxxx.web.app`. Share that link
with testers; it expires by itself. Login works there too (Firebase allows its own preview domains).

### Undo a bad deploy
Firebase console → **Hosting** → release history → ⋮ on the previous release → **Rollback**.

## Part B: AI API online (optional, not tried yet)
The API is a normal Node server (`api/`). Free option without a card: **Render** (render.com) free web service.
*Not tested yet. Record the result in `docs/progress.md`.*

| Render setting | Value |
|---|---|
| Root directory | (empty: repo root) |
| Build command | `npm ci && npm run build -w api` |
| Start command | `npm start -w api` |
| Environment | `GEMINI_API_KEY` (secret), `GEMINI_MODEL=gemini-3.5-flash-lite,gemini-3.1-flash-lite`, `ALLOWED_ORIGIN=https://mdaddeskv1-6af42.web.app`, `REQUIRE_AUTH=false` |

Then put the Render URL in `web\.env` as `VITE_API_URL=https://<name>.onrender.com`, and run Part A again.
Free servers sleep after ~15 min idle: the first SOS after a break may skip the AI (fallback). Open
`<api-url>/health` a minute before a demo to wake it up.

If billing ever works: Cloud Run instructions are in `README.md`.

## After changing code
| Changed | Run |
|---|---|
| Anything in `web/` | Part A again |
| `firestore.rules` | `firebase deploy --only firestore:rules` |
| `api/` | Render redeploys by itself on `git push` (once Part B is set up) |
| Demo accounts / agencies | `npm run seed -w api` (safe to run again; it resets the 3 agencies) |
