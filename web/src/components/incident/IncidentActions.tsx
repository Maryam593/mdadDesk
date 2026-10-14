import type { Incident, IncidentStatus } from "@shared";
import { ActionButton } from "@/components/ui/ActionButton";
import { HoldButton } from "@/components/ui/HoldButton";

interface Props {
  incident: Incident;
  // Saves the new status (database or sample data — this button doesn't need to know which).
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

/**
 * The main button at the top of an incident. AI never moves an incident forward.
 * - reported → "Verify" (a normal tap).
 * - verified → nothing here on purpose: the next step is "Send help" below
 *   (a button here used to get double-clicked and close cases).
 * - response → "Hold to confirm resolved": closing must be deliberate.
 * "response" itself is set by the agency tapping "On the way", not by the coordinator.
 */
export function IncidentActions({ incident, onSetStatus }: Props) {
  if (incident.status === "reported") {
    return (
      <ActionButton variant="danger" onClick={() => onSetStatus(incident.id, "verified")}>
        Verify
      </ActionButton>
    );
  }
  if (incident.status === "response") {
    return (
      <HoldButton tone="primary" onConfirm={() => onSetStatus(incident.id, "resolved")}>
        Hold to confirm resolved
      </HoldButton>
    );
  }
  return null;
}
