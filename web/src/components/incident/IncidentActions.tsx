import type { Incident, IncidentStatus } from "@shared";
import { ActionButton } from "@/components/ui/ActionButton";

/**
 * Next allowed human step for each status. AI never moves an incident forward.
 * "Response" is set by the agency tapping "On the way", not by the coordinator.
 */
const NEXT: Partial<Record<IncidentStatus, { to: IncidentStatus; label: string }>> = {
  reported: { to: "verified", label: "Verify" },
  verified: { to: "resolved", label: "Close as resolved" },
  response: { to: "resolved", label: "Confirm resolved" },
};

interface Props {
  incident: Incident;
  // Saves the new status (database or sample data — this button doesn't need to know which).
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

export function IncidentActions({ incident, onSetStatus }: Props) {
  const next = NEXT[incident.status];
  if (!next) return null;

  return (
    <ActionButton
      variant={next.to === "verified" ? "danger" : "primary"}
      onClick={() => onSetStatus(incident.id, next.to)}
    >
      {next.label}
    </ActionButton>
  );
}
