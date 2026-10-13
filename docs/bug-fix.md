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

## 2026-10-13 — API looked dead right after start
**Symptom:** `Invoke-RestMethod http://localhost:8080/health` → "Unable to connect" 2 s after `node dist/index.js`.
**Cause:** not a bug. Cold start (loading firebase-admin + @google/genai) takes more than 2 s on this machine.
**Fix:** none; wait for the `[api] listening on :8080` log before testing.
**Check:** `/health` → `{"ok":true,...}` once the log line appears.
