# Instructions for AI agents (Claude Code, Antigravity, Codex, Cursor, …)

MadadDesk: building-emergency SOS → coordinator verifies → sends Fire / Ambulance / Police → agency
taps "On the way" → reporter sees each step. React PWA on Firebase (Spark plan, no billing).

## Read first
1. `docs/how-to-start.md`: run it, accounts, **the demo script**, common pitfalls.
2. `docs/core-structure.md`: folders, data model, code rules, who sees what.
3. `docs/prd.md`: scope and trust rules (AI never dispatches; humans verify).

## Code rules (the owner insists)
- Every code file ≤ 60 lines; split before it grows.
- No repeated components/logic: reuse `components/ui/*`, `services/*`, `hooks/*`.
- Beginner-readable: plain loops/ifs, short comments that explain *why*.
- Firestore writes only in `web/src/services/*`; AI prompts/schemas only in `shared/src/ai/`.
- Check: `npm run typecheck`, `npm run build -w web`. AI quality: `npm run eval` (needs `api/.env`).

## Keep the docs alive (after every change)
- Bug or confusing flow → `docs/bug-fix.md` (newest on top: Symptom, Cause, Fix, Check).
- Feature / decision → `docs/progress.md` (+ `docs/core-structure.md` if structure changed).
- Commit, `git push`, and redeploy if `web/` changed: `firebase deploy --only hosting`.

## Never
- Commit or print secrets: `api/.env`, `web/.env`, `api/service-account.json`, the demo password
  (`DEMO_PASSWORD` lives only in `api/.env`). The repo is public.
- Let AI move an incident forward, or show "sent" before Firestore confirms.
- Change the Firestore location or the `(default)` database id.

## Owner preferences
- Talks in Roman Urdu / English; explain simply.
- Don't drive the owner's browser; give manual test steps instead.
- Work without asking at each step, but confirm before anything public or hard to undo.

## Giving or explaining the demo
Follow `docs/how-to-start.md` section 4 exactly (two windows: normal = coordinator, Incognito = fire-saddar).
