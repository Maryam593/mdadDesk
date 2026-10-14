import type { Incident, Report } from "@shared";

// Builds the starting data for a brand-new SOS report and its incident.
// Everything the AI hasn't read yet starts as null (= "Unknown").

/** Each report gets exactly one incident, named after it. */
export const incidentIdFor = (reportId: string) => `inc_${reportId}`;

export function newReport(id: string, text: string, createdAt: number, uid: string | null) {
  const report: Omit<Report, "receivedAt"> = {
    id,
    text,
    clientCreatedAt: createdAt,
    reporterUid: uid,
    aiStatus: "pending",
    extraction: null,
    incidentId: incidentIdFor(id),
    clarifications: [],
  };
  return report;
}

export function newIncident(reportId: string, text: string, createdAt: number) {
  const incident: Incident = {
    id: incidentIdFor(reportId),
    status: "reported",
    incidentType: null,
    building: null,
    floor: null,
    landmark: null,
    peopleReported: null,
    summary: text.slice(0, 140), // until the AI writes a better one
    reportIds: [reportId],
    relatedIncidentIds: [],
    location: null,
    leadAgencyId: null,
    supportAgencyIds: [],
    notifiedAgencyIds: [],
    respondingKinds: [],
    createdAt,
    updatedAt: Date.now(),
  };
  return incident;
}
