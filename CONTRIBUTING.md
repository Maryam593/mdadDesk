# Contributing to MadadDesk

Thanks for helping! MadadDesk is a small emergency-response prototype, so the rules below keep it
simple, safe and easy for beginners to read.

## Get set up
1. Fork the repo and clone your fork.
2. `npm install`
3. `cp web/.env.example web/.env` and fill it with **your own** Firebase project
   ([docs/firebase-setup.md](docs/firebase-setup.md)). Do not use the live project's keys.
4. `npm run dev` → http://localhost:5173
5. Read [docs/how-to-start.md](docs/how-to-start.md) and [docs/core-structure.md](docs/core-structure.md).

## Code rules
- **Every code file stays ≤ 60 lines.** Split it into a component, hook or helper before it grows.
- **Don't repeat code.** Reuse `web/src/components/ui/*`, `hooks/*`, `services/*` and `lib/*`.
  If two places need the same thing, make it one reusable piece.
- **Beginner-readable:** plain loops and `if`s, clear names, short comments that explain *why*.
- **Firestore writes only in `web/src/services/*`.**
- **AI prompts, schemas and fallback only in `shared/src/ai/`.**
- **No emojis in the UI.** Use `lucide-react` icons; data icons live in `web/src/lib/icons.ts`.
- Tailwind for styling; shared effects go in `web/src/styles/effects.css`.

## Trust rules (never break these)
- AI never moves an incident forward or dispatches anyone. A human verifies and sends help.
- Unknown stays "Unknown": AI must not invent locations, counts or names.
- Never show "sent" before Firestore confirms the write.
- Never change the Firestore location or the `(default)` database id.

## Before you open a pull request
```bash
npm run typecheck
npm run build -w web
npm run eval        # only if you changed AI prompts/schemas (needs api/.env)
```
Then walk the flow in [docs/testing-e2e.md](docs/testing-e2e.md) (reporter → coordinator → agency).

## Keep the docs alive
Every change updates the docs in the same pull request:
- Bug or confusing flow → [docs/bug-fix.md](docs/bug-fix.md), newest on top:
  **Symptom / Cause / Fix / Check**.
- Feature or decision → [docs/progress.md](docs/progress.md), plus
  [docs/core-structure.md](docs/core-structure.md) if folders or data changed.

## Commits and pull requests
- One topic per pull request; keep it small.
- Commit messages say what changed in plain words, e.g. `Agency inbox: show request count`.
- In the description, say what you changed, how you tested it, and add a screenshot for UI changes.

## Secrets (the repo is public)
Never commit or paste `api/.env`, `web/.env`, `api/service-account.json` or any password.
Found a security problem? Don't open a public issue; contact the maintainer privately on GitHub.

## Reporting bugs and ideas
Open an issue with: what you did, what you expected, what happened, phone/browser, and the
footer version (`Version … UTC`). Screenshots or the browser console (F12) help a lot.

By contributing you agree your work is released under the [MIT License](LICENSE).
