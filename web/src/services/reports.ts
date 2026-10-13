import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import { LOCATION_FIELDS, type Extraction, type Incident, type Report } from "@shared";
import { auth, requireDb } from "@/lib/firebase";
import { addEvent } from "./events";

export const newReportId = () => crypto.randomUUID();
export const incidentIdFor = (reportId: string) => `inc_${reportId}`;

/**
 * Saves the raw report + a new "reported" incident. Uses the client id, so a retry
 * overwrites instead of duplicating. Resolves only when Firestore acknowledges
 * (offline it stays pending in IndexedDB and syncs later).
 */
export async function sendReport(id: string, text: string, clientCreatedAt: number) {
  const db = requireDb();
  const incidentId = incidentIdFor(id);
  const report: Omit<Report, "receivedAt"> = {
    id, text, clientCreatedAt, reporterUid: auth?.currentUser?.uid ?? null,
    aiStatus: "pending", extraction: null, incidentId, clarifications: [],
  };
  const incident: Incident = {
    id: incidentId, status: "reported", incidentType: null, building: null, floor: null,
    landmark: null, peopleReported: null, summary: text.slice(0, 140), reportIds: [id],
    relatedIncidentIds: [], location: null, leadAgencyId: null, supportAgencyIds: [],
    createdAt: clientCreatedAt, updatedAt: Date.now(),
  };
  const batch = writeBatch(db);
  batch.set(doc(db, "reports", id), { ...report, receivedAt: serverTimestamp() });
  batch.set(doc(db, "incidents", incidentId), incident);
  addEvent(batch, incidentId, "report_received", "SOS report received");
  await batch.commit();
}

/** Stores the AI result (or failure) and copies stated fields onto the incident. */
export async function applyExtraction(reportId: string, extraction: Extraction | null) {
  const db = requireDb();
  const batch = writeBatch(db);
  batch.update(doc(db, "reports", reportId), {
    aiStatus: extraction ? "ok" : "failed",
    extraction,
  });
  if (extraction) {
    const stated = Object.fromEntries(
      LOCATION_FIELDS.filter((f) => extraction[f] !== null).map((f) => [f, extraction[f]]),
    );
    batch.update(doc(db, "incidents", incidentIdFor(reportId)), {
      ...stated, summary: extraction.summary, updatedAt: Date.now(),
    });
  }
  await batch.commit();
}
