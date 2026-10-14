# Deployment

How to put MadadDesk online so teammates and judges can open it from their own phones.
Everything here is free (Firebase **Spark** plan, no card).

## What runs where
| Part | Where | Status |
|---|---|---|
| Web app (React PWA) | Firebase Hosting → `https://mdaddeskv1-6af42.web.app` | ✅ Live since 14 Oct |
| Database + login | Firebase Firestore + Auth (project `mdaddeskv1-6af42`) | ✅ Live since 14 Oct (rules + demo data uploaded) |
| AI (Gemini) | Firebase AI Logic, called from the app; no server | Enabled 14 Oct; App Check must not block it (see below) |

If the AI can't be reached, the app still works: the SOS is delivered and the coordinator
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

## AI check (Firebase AI Logic)
```
npm run check-firebase-ai -w api
```
This script can't pass App Check (no browser), so expect **"App Check token is invalid"**: that only
proves AI Logic is on. The real check is in the browser: send an SOS → "What we understood" appears, and
App Check → APIs → Firebase AI Logic shows verified requests. Setup: `docs/firebase-setup.md` step 9.
The `api/` server is no longer needed online; it only runs the eval on the developer's PC.

## After changing code
| Changed | Run |
|---|---|
| Anything in `web/` | Part A again |
| `firestore.rules` | `firebase deploy --only firestore:rules` |
| Prompts in `shared/src/ai/` | Part A again (the app carries them); `npm run eval` to re-check accuracy |
| Demo accounts / agencies | `npm run seed -w api` (safe to run again; it resets the 3 agencies) |
