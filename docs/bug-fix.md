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
