import type { AgencyKind } from "./agency";
import type { IncidentType } from "./extraction";

export const INCIDENT_STATUSES = ["reported", "verified", "response", "resolved"] as const;
export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];

/** A GPS position from the reporter's phone. accuracyM = how many metres it may be off. */
export interface GeoPoint {
  lat: number;
  lng: number;
  accuracyM?: number;
}

export interface Incident {
  id: string;
  status: IncidentStatus;
  incidentType: IncidentType | null;
  building: string | null;
  floor: string | null;
  landmark: string | null;
  peopleReported: number | null;
  summary: string;
  reportIds: string[];
  relatedIncidentIds: string[]; // suggested only; coordinator decides
  location: GeoPoint | null; // phone GPS, if the reporter allowed it
  leadAgencyId: string | null;
  supportAgencyIds: string[];
  notifiedAgencyIds: string[]; // coordinator asked these agencies for help
  respondingKinds: AgencyKind[]; // agencies that tapped "On the way" (fire / ambulance / police)
  createdAt: number;
  updatedAt: number;
}

export type IncidentEventKind =
  | "report_received"
  | "report_linked"
  | "fields_edited"
  | "clarification_sent"
  | "verified"
  | "agency_notified"
  | "agency_response"
  | "lead_assigned"
  | "update"
  | "resolved";

export interface IncidentEvent {
  id: string;
  incidentId: string;
  at: number;
  actorUid: string | null;
  kind: IncidentEventKind;
  message: string;
}
