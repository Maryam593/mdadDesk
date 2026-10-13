# Core structure

## Code rules
- **Beginner-readable.** A new teammate should understand any file in one read. Plain `for` loops
  and `if`s over clever one-liners, one property per line, short comments that explain *why*.
- **Every code file ≤ 60 lines.** Split before it grows.
- **No repetition.** Reuse a component, hook or service; never copy one.
- UI primitives live in `web/src/components/ui/`. Feature components never restyle raw HTML
  for things a primitive already does (buttons, cards, notices, badges, fields).
- One write path per entity (`services/*`). Pages never call Firestore directly.
- Shared types live only in `shared/src/` and are imported by both web (`@shared`) and api.

## Layout
```
shared/src/        types used by web + api (extraction, report, incident, agency, api)
api/               Express on Cloud Run — Gemini only
  src/ai/          gemini.ts (single Gemini entry), prompts.ts, schemas.ts (Gemini + zod)
  src/routes/      aiRoute.ts (error → {ok:false} wrapper), extract.ts, clarify.ts
  src/auth.ts      Firebase ID-token check (REQUIRE_AUTH=true)
  scripts/         eval.ts (accuracy on data/), seed.ts (demo users + agencies)
web/               React + Vite + Tailwind v4 + PWA (vite-plugin-pwa)
  src/lib/         firebase.ts (offline cache), api.ts (never-throw POST), labels.ts
  src/services/    reports.ts, incidents.ts, events.ts — all Firestore writes
                   newRecords.ts — starting data for a new report/incident
  src/hooks/       useCollection (realtime), useReportSubmit, useOnline, useAuthUser
  src/components/
    ui/            Button, Card, Badge, Notice, TextField, tone.ts (colours + cx)
    layout/        AppShell (nav), StatusBanners (offline / config)
    incident/      FieldGrid, StatusBadge, IncidentList, IncidentDetail, IncidentActions, Timeline
    report/        ReportForm, SubmitStatus
  src/pages/       ReportPage, CoordinatorPage, AgencyPage, LoginPage
data/              synthetic-reports.json (labelled test set)
firestore.rules    role-based access via custom claims {role, agencyId}
```

## Data model (Firestore)
| Collection | Key fields |
|---|---|
| `reports/{clientId}` | text, clientCreatedAt, receivedAt (server), aiStatus, extraction, incidentId |
| `incidents/{inc_<reportId>}` | status reported→verified→response→resolved, location fields, reportIds, lead/support agency |
| `incidents/{id}/events` | append-only timeline (kind, message, actorUid, at) |
| `agencies/{id}` | name, kind, available, availabilityUpdatedAt |
| `assignments/{incidentId_agencyId}` | role lead/support, status notified/accepted/declined/busy |

## Key flows
- **Report:** save report + incident first (delivery), then Gemini (enrichment). AI failure never blocks delivery.
- **Offline:** Firestore persistent cache queues writes in IndexedDB; the service worker serves the app shell.
- **Status change:** `services/incidents.changeIncident` updates the incident and appends a timeline event in one batch.

## Decisions
- shadcn/ui dropped: its generated files break the 60-line rule; own primitives instead.
- Web writes Firestore directly (realtime + offline); the API only does AI, keeping the Gemini key server-side.
