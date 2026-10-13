import type { IncidentType } from "./extraction";

export const INCIDENT_STATUSES = ["reported", "verified", "response", "resolved"] as const;
export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];

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
  location: { lat: number; lng: number } | null;
  leadAgencyId: string | null;
  supportAgencyIds: string[];
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
