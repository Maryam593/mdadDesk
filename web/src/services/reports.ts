import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { LOCATION_FIELDS, type Extraction } from "@shared";
import { auth, requireDb } from "@/lib/firebase";
import { addEvent } from "./events";
import { incidentIdFor, newIncident, newReport } from "./newRecords";

export const newReportId = () => crypto.randomUUID();

/**
 * Step 1 of an SOS: save the report and create its incident.
 * - The id is made on the phone, so sending twice overwrites instead of duplicating.
 * - The promise finishes only when the server confirms. Offline, it waits and sends later.
 */
export async function sendReport(id: string, text: string, createdAt: number) {
  const db = requireDb();
  const report = newReport(id, text, createdAt, auth?.currentUser?.uid ?? null);
  const incident = newIncident(id, text, createdAt);

  const batch = writeBatch(db); // all-or-nothing: either everything saves or nothing does
  batch.set(doc(db, "reports", id), { ...report, receivedAt: serverTimestamp() });
  batch.set(doc(db, "incidents", incident.id), incident);
  addEvent(batch, incident.id, "report_received", "SOS report received");
  await batch.commit();
}

/** Step 2 of an SOS: save what the AI understood (or that it failed). */
export async function applyExtraction(reportId: string, extraction: Extraction | null) {
  const db = requireDb();
  const batch = writeBatch(db);
  batch.update(doc(db, "reports", reportId), {
    aiStatus: extraction ? "ok" : "failed",
    extraction,
  });
  if (extraction) {
    // Copy only the fields the AI actually found. Unknown (null) fields are skipped,
    // so they never overwrite something the coordinator already typed in.
    const found: Record<string, unknown> = { summary: extraction.summary, updatedAt: Date.now() };
    for (const field of LOCATION_FIELDS) {
      if (extraction[field] !== null) found[field] = extraction[field];
    }
    batch.update(doc(db, "incidents", incidentIdFor(reportId)), found);
  }
  await batch.commit();
}
