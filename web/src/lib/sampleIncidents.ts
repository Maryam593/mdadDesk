import type { Incident } from "@shared";

// Example incidents shown ONLY when Firebase is not connected, so the map and
// buttons can be tried without a database. Never saved anywhere.

const MINUTE = 60_000;

function sample(id: string, minutesAgo: number, fields: Partial<Incident>): Incident {
  return {
    id,
    status: "reported",
    incidentType: null,
    building: null,
    floor: null,
    landmark: null,
    peopleReported: null,
    summary: "",
    reportIds: [],
    relatedIncidentIds: [],
    location: null,
    leadAgencyId: null,
    supportAgencyIds: [],
    notifiedAgencyIds: [],
    respondingKinds: [],
    createdAt: Date.now() - minutesAgo * MINUTE,
    updatedAt: Date.now(),
    ...fields,
  };
}

export const SAMPLE_INCIDENTS: Incident[] = [
  sample("sample-1", 2, {
    incidentType: "smoke", floor: "2", landmark: "shop 24", peopleReported: 3,
    summary: "Smoke near shop 24 on the second floor; 3 people with the reporter.",
  }),
  sample("sample-2", 6, {
    status: "verified", incidentType: "fire", building: "Saddar Trade Centre", floor: "G", landmark: "main stairs",
    summary: "Fire on the ground floor near the main stairs.",
  }),
  sample("sample-3", 11, {
    status: "response", incidentType: "trapped", floor: "4", landmark: "shop 41", peopleReported: 2,
    summary: "Two people stuck in shop 41, fourth floor stairs blocked.",
  }),
  sample("sample-4", 40, {
    status: "resolved", incidentType: "medical", landmark: "food court", peopleReported: 1,
    summary: "A man fainted in the food court.",
  }),
];
