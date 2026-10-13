export type AgencyKind = "fire" | "ambulance" | "police";
export type Role = "coordinator" | "agency" | "reporter";

export interface Agency {
  id: string;
  name: string;
  kind: AgencyKind;
  available: boolean;
  availabilityUpdatedAt: number;
}

export type AssignmentStatus = "notified" | "acknowledged" | "accepted" | "declined" | "busy";

export interface Assignment {
  id: string; // `${incidentId}_${agencyId}`
  incidentId: string;
  agencyId: string;
  role: "lead" | "support" | null;
  status: AssignmentStatus;
  updatedAt: number;
}
