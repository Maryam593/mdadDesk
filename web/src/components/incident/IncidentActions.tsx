import type { Incident, IncidentStatus } from "@shared";
import { ActionButton } from "@/components/ui/ActionButton";

/**
 * The main button at the top of an incident. AI never moves an incident forward.
 * - verified: no button here on purpose. The next step is "Send help" below, and closing a false
 *   alarm is a separate, confirmed link (CloseFalseAlarm). A button here got double-clicked.
 * - "response" is set by the agency tapping "On the way", not by the coordinator.
 */
type Step = { to: IncidentStatus; label: string; variant: "danger" | "primary" | "secondary" };
const NEXT: Partial<Record<IncidentStatus, Step>> = {
  reported: { to: "verified", label: "Verify", variant: "danger" },
  response: { to: "resolved", label: "Confirm resolved", variant: "primary" },
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
      variant={next.variant}
      onClick={() => onSetStatus(incident.id, next.to)}
    >
      {next.label}
    </ActionButton>
  );
}
