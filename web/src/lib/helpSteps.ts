import type { AgencyKind, Incident } from "@shared";

// What the reporter sees on their status page, step by step.

export const HELP_STEPS = [
  "Sent: waiting for the coordinator",
  "Seen and confirmed",
  "Help requested",
  "Help on the way",
  "Closed",
];

const KIND_LABEL: Record<AgencyKind, string> = {
  fire: "Fire service",
  ambulance: "Ambulance",
  police: "Police",
};

/** Index into HELP_STEPS for where this incident is now. */
export function helpStep(incident: Incident): number {
  if (incident.status === "resolved") return 4;
  if (incident.status === "response") return 3;
  if (incident.status === "verified" && incident.notifiedAgencyIds.length > 0) return 2;
  if (incident.status === "verified") return 1;
  return 0;
}

/** e.g. "Fire service and Ambulance on the way" */
export function onTheWayText(incident: Incident): string {
  const names = incident.respondingKinds.map((kind) => KIND_LABEL[kind]);
  if (names.length === 0) return HELP_STEPS[3];
  return `${names.join(" and ")} on the way`;
}
