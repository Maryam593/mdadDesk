---
name: madaddesk-demo
description: Run, explain or rehearse the MadadDesk demo (reporter → coordinator → agency help loop), or onboard a new person to the project. Use when someone asks how to give the demo, how the app works, how to test the full flow, or "where do I start".
---

# MadadDesk demo guide

1. Read `docs/how-to-start.md` (sections 1, 3, 4, 5). It is the single source of truth; do not invent steps.
2. Explain the roles first: reporter (no login), coordinator (verifies + sends), agency (On the way).
3. Walk the person through section 4 step by step, one step per message if they are testing live.
   Two browser windows are required: normal = coordinator, Incognito = fire-saddar.
4. Never print the demo password; say it is `DEMO_PASSWORD` in `api/.env` (owner shares it privately).
5. If something fails, check section 5 first, then `docs/bug-fix.md`. To see what really happened,
   read Firestore with firebase-admin from `api/` (incident status, `notifiedAgencyIds`, events timeline).
6. Give manual steps; do not drive the user's browser.
7. Log any new problem in `docs/bug-fix.md`.
