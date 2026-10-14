import { useState } from "react";
import type { Incident, IncidentStatus } from "@shared";
import { ActionButton } from "@/components/ui/ActionButton";
import { Button } from "@/components/ui/Button";

interface Props {
  incident: Incident;
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

/**
 * Closing a verified incident WITHOUT sending help (false alarm). Small, at the bottom,
 * and asks "are you sure?" first: it used to sit where Verify was, so a double click closed cases.
 */
export function CloseFalseAlarm({ incident, onSetStatus }: Props) {
  const [asking, setAsking] = useState(false);
  if (incident.status !== "verified" || incident.notifiedAgencyIds.length > 0) return null;

  if (!asking) {
    return (
      <button onClick={() => setAsking(true)} className="text-xs text-slate-500 underline hover:text-slate-700">
        Not an emergency? Close without sending help
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span>Close this case? Nobody will be sent.</span>
      <ActionButton variant="danger" onClick={() => onSetStatus(incident.id, "resolved")}>
        Yes, close it
      </ActionButton>
      <Button variant="ghost" onClick={() => setAsking(false)}>
        Cancel
      </Button>
    </div>
  );
}
