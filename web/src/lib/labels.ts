import type { IncidentStatus, IncidentType, LocationField } from "@shared";

export const FIELD_LABELS: Record<LocationField, string> = {
  incidentType: "Incident",
  building: "Building",
  floor: "Floor",
  landmark: "Shop / landmark",
  peopleReported: "People reported",
};

// Big one-tap buttons on the report page.
export const TYPE_LABELS: Record<IncidentType, string> = {
  fire: "🔥 Fire",
  smoke: "💨 Smoke",
  medical: "🚑 Medical",
  trapped: "🆘 Trapped",
  collapse: "🧱 Collapse",
  other: "❓ Other",
};

export type Tone = "neutral" | "info" | "warn" | "danger" | "success";

export const STATUS_TONE: Record<IncidentStatus, Tone> = {
  reported: "warn",
  verified: "danger",
  response: "info",
  resolved: "success",
};

// Marker colour on the map for each status (same meaning as the badges).
export const STATUS_COLOR: Record<IncidentStatus, string> = {
  reported: "#d97706", // amber: not checked yet
  verified: "#dc2626", // red: confirmed emergency
  response: "#0284c7", // blue: team on the way
  resolved: "#16a34a", // green: closed
};

export const timeAgo = (ms: number) => {
  const s = Math.round((Date.now() - ms) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  return `${Math.round(s / 3600)}h ago`;
};
