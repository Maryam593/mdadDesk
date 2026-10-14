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
  src/services/    reports.ts, incidents.ts, events.ts, assignments.ts — all Firestore writes
                   newRecords.ts — starting data for a new report/incident
  src/hooks/       useCollection / useDoc (realtime), useIncidents, useReportSubmit, useOnline,
                   useAuthUser, useClaims (role + agencyId)
  src/lib/         helpSteps.ts (reporter status steps), myReports.ts (reports sent from this phone)
  src/components/
    ui/            Button, ActionButton (busy + error), Card, Badge, Notice, TextField, tone.ts
    layout/        AppShell (nav), StatusBanners (offline / config)
    incident/      FieldGrid, StatusBadge, IncidentList, IncidentDetail, IncidentActions, DispatchPanel, Timeline
    track/         HelpProgress (reporter checklist), MyReports (links on the report page)
    agency/        AssignmentCard (one help request + "On the way")
    report/        ReportForm, SubmitStatus
    map/           IncidentMap (Leaflet + OpenStreetMap, no key), IncidentMarker (dot per incident)
  src/pages/       ReportPage, TrackPage (/track/:reportId), CoordinatorPage, AgencyPage, LoginPage
data/              synthetic-reports.json (labelled test set)
firestore.rules    role-based access via custom claims {role, agencyId}
```

## Data model (Firestore)
| Collection | Key fields |
|---|---|
| `reports/{clientId}` | text, clientCreatedAt, receivedAt (server), aiStatus, extraction, incidentId |
| `incidents/{inc_<reportId>}` | status reported→verified→response→resolved, location fields, reportIds, notifiedAgencyIds, respondingKinds, lead/support agency |
| `incidents/{id}/events` | append-only timeline (kind, message, actorUid, at) |
| `agencies/{id}` | name, kind, available, availabilityUpdatedAt |
| `assignments/{incidentId_agencyId}` | agencyKind, agencyName, role lead/support, status notified/accepted/declined/busy |

## Key flows
- **Report:** save report + incident first (delivery), then Gemini (enrichment). AI failure never blocks delivery.
- **Offline:** Firestore persistent cache queues writes in IndexedDB; the service worker serves the app shell.
- **Help loop:** coordinator Verify → `sendAgency` (assignment + `notifiedAgencyIds`) → agency
  `markOnTheWay` (assignment accepted, incident `response` + `respondingKinds`) → coordinator Resolved.
  The reporter's `/track` page reads only the incident doc and turns it into a step (`lib/helpSteps.ts`).
- **Who can read an incident:** anyone with its id (`get`), since the id is a random code only the
  reporter's phone and assigned agencies have. Listing all incidents is coordinator-only.
- **Status change:** `services/incidents.changeIncident` updates the incident and appends a timeline event in one batch.

## Decisions
- Map: Leaflet + OpenStreetMap instead of Google Maps (no billing). One demo building in
  `web/src/lib/building.ts`; incidents without their own location show there, nudged ~3 m apart.
  Coloured circles instead of image pins (Leaflet's default pin images break with Vite).
- shadcn/ui dropped: its generated files break the 60-line rule; own primitives instead.
- Web writes Firestore directly (realtime + offline); the API only does AI, keeping the Gemini key server-side.
