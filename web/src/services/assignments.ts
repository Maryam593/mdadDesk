import { arrayUnion, doc } from "firebase/firestore";
import type { Agency, Assignment, Incident } from "@shared";
import { requireDb } from "@/lib/firebase";
import { changeIncident } from "./incidents";

/** Coordinator: ask one agency for help. Creates its inbox item and notes it on the incident. */
export async function sendAgency(incident: Incident, agency: Agency) {
  const assignment: Assignment = {
    id: `${incident.id}_${agency.id}`, // one request per agency per incident
    incidentId: incident.id,
    agencyId: agency.id,
    agencyKind: agency.kind,
    agencyName: agency.name,
    location: incident.location,
    role: null,
    status: "notified",
    updatedAt: Date.now(),
  };
  await changeIncident(
    incident.id,
    { notifiedAgencyIds: arrayUnion(agency.id) },
    "agency_notified",
    `Help requested from ${agency.name}`,
    (batch) => batch.set(doc(requireDb(), "assignments", assignment.id), assignment),
  );
}

/** Agency: "we are on the way". The reporter's page shows this right away. */
export async function markOnTheWay(assignment: Assignment) {
  await changeIncident(
    assignment.incidentId,
    { status: "response", respondingKinds: arrayUnion(assignment.agencyKind) },
    "agency_response",
    `${assignment.agencyName} is on the way`,
    (batch) =>
      batch.update(doc(requireDb(), "assignments", assignment.id), {
        status: "accepted",
        updatedAt: Date.now(),
      }),
  );
}
