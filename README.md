# MadadDesk

From scattered distress messages to a verified emergency picture.
AI-assisted SOS intake (English / Urdu / Roman Urdu), coordinator verification and simulated
multi-agency response for building emergencies. Built for **AI Builder Cup 2026**.

> Prototype for drills and demos only — not a deployed emergency service.

## Quick start (local)
```bash
npm install
cp api/.env.example api/.env     # add GEMINI_API_KEY
cp web/.env.example web/.env     # add Firebase web config (optional for AI-only preview)
npm run dev                      # api :8080 + web :5173
```
Without Firebase config the report page still shows the AI preview.

## Firebase setup (free, no card)
Follow **[docs/firebase-setup.md](docs/firebase-setup.md)** step by step.

## Google Cloud setup (only if billing is available)
1. Create a GCP project, enable billing, add a $5 budget alert.
2. Enable: Cloud Run, Firestore, Generative Language API, Maps JavaScript API.
3. Firebase console → add the same project → Authentication (Email/Password) + Firestore.
4. Put the project id in `.firebaserc`, the web config in `web/.env`.
5. Seed demo users + agencies:
   ```bash
   gcloud auth application-default login
   GOOGLE_CLOUD_PROJECT=<id> npm run seed -w api
   ```

## Deploy
```bash
# API → Cloud Run
gcloud run deploy madaddesk-api --source . --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars "^@^GEMINI_MODEL=gemini-3.5-flash-lite,gemini-3.1-flash-lite@ALLOWED_ORIGIN=https://<id>.web.app" \
  --set-secrets GEMINI_API_KEY=gemini-key:latest
# Web + rules → Firebase
npm run build -w web && firebase deploy --only hosting,firestore:rules
```

## Scripts
| Command | What |
|---|---|
| `npm run dev` | api + web with reload |
| `npm run typecheck` | both workspaces |
| `npm run eval` | extraction accuracy on `data/synthetic-reports.json` |
| `npm run seed -w api` | demo accounts + agencies |

## Docs
- [docs/prd.md](docs/prd.md) — scope, users, trust rules, demo script
- [docs/core-structure.md](docs/core-structure.md) — folders, data model, code rules
- [docs/progress.md](docs/progress.md) — daily log
- [docs/bug-fix.md](docs/bug-fix.md) — bugs and fixes
- [docs/firebase-setup.md](docs/firebase-setup.md) — create the Firebase project (done for `mdaddeskv1-6af42`)
- [docs/deployment.md](docs/deployment.md) — put it online, test links for teammates
- [docs/testing-e2e.md](docs/testing-e2e.md) — step-by-step test checklist for the team
- [docs/testing-user.md](docs/testing-user.md) — testing with real people

## Stack
React + TypeScript + Vite + Tailwind (PWA) · Express on Cloud Run · Firestore · Firebase Auth · Gemini
