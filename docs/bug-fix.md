# Bug-fix log

Add newest entries at the top. Format:

```
## YYYY-MM-DD — short title
**Symptom:** what went wrong (exact error if any)
**Cause:** root cause
**Fix:** what changed (files)
**Check:** how it was verified
```

---

## 2026-10-14 — Firebase AI Logic: "401 Firebase App Check token is invalid"
**Symptom:** `npm run check-firebase-ai -w api` → 401 for every model.
**Cause:** App Check enforcement got turned on for Firebase AI Logic during setup; our app sends no App Check token.
**Fix:** Console → Security → App Check → APIs → Firebase AI Logic → Unenforce. (Later: add reCAPTCHA App Check.)
**Check:** pending, rerun `check-firebase-ai`.

## 2026-10-14 — Eval after moving to JSON Schema: 3/20 timeouts
**Symptom:** `npm run eval`: 90.6% accuracy, 0 invented, but 3 "AI timeout" (before: 0 failures).
**Cause:** not known yet; likely Gemini load at that moment (both models timed out on the same reports).
**Check:** rerun later; if it repeats, raise the 15 s timeout or compare with the old `responseSchema`.

## 2026-10-14 — Old requests would set off the alarm when a page opens (caught before release)
**Symptom (found in review):** the agency page first asks "who am I?", then loads the inbox. In between,
`useCollection` said "done loading, 0 items", so every existing request looked *new* a moment later → siren.
**Cause:** `loading` was only true on the very first load, not when the path/query changed.
**Fix:** `web/src/hooks/useCollection.ts` remembers which query its data belongs to; `loading` stays
true until data for the current query arrives. `useArrivals` only starts watching after that.
**Check:** typecheck + build. Browser check pending (testing-e2e E3, E7).

## 2026-10-14 — `npm install firebase` in the root folder
**Symptom:** root `package.json` got a `firebase` dependency (copied from the Firebase console's SDK step).
**Cause:** the console tells you to install the SDK; this project already has it in `web/`.
**Fix:** reverted root `package.json` / lock. Skip the console's "npm install" step.

## 2026-10-13 — Gemini: model 404, then 503/429 on every report
**Symptom:** `gemini-2.5-flash` → 404 "no longer available to new users". After switching to
`gemini-3.8-flash`: eval 20/20 failed with 503 "high demand", 429 "free tier limit: 5 per minute", and timeouts.
**Cause:** 2.5 models are closed to new accounts. 3.8-flash is overloaded, has a tiny free quota, and "thinks" slowly.
**Fix:** default models `gemini-3.5-flash-lite,gemini-3.1-flash-lite` (second one is a backup, tried
automatically in `api/src/ai/gemini.ts`); `thinkingLevel: LOW`; eval waits 5 s between reports.
Added `npm run check-ai -w api` to list the models a key can use.
**Check:** eval 0/20 failures, 93% field accuracy, 0 invented values.
**Note:** AI Studio keys now start with `AQ.` — they work with the `@google/genai` SDK.

## 2026-10-13 — Eval invented "Plaza" as a building and "trapped" from a worried message
**Fix:** prompt rules in `api/src/ai/prompts.ts`: generic words are not building names; type only when stated;
landmarks in short English; basement = "B". Invented values 2 → 0.

## 2026-10-13 — API looked dead right after start
**Symptom:** `Invoke-RestMethod http://localhost:8080/health` → "Unable to connect" 2 s after `node dist/index.js`.
**Cause:** not a bug. Cold start (loading firebase-admin + @google/genai) takes more than 2 s on this machine.
**Fix:** none; wait for the `[api] listening on :8080` log before testing.
**Check:** `/health` → `{"ok":true,...}` once the log line appears.
