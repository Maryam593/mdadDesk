import { useState } from "react";
import type { Incident, IncidentStatus } from "@shared";
import { Button } from "@/components/ui/Button";

/** Next allowed human step for each status. AI never moves an incident forward. */
const NEXT: Partial<Record<IncidentStatus, { to: IncidentStatus; label: string }>> = {
  reported: { to: "verified", label: "Verify" },
  verified: { to: "response", label: "Response underway" },
  response: { to: "resolved", label: "Confirm resolved" },
};

interface Props {
  incident: Incident;
  // Saves the new status (database or sample data — this button doesn't need to know which).
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

export function IncidentActions({ incident, onSetStatus }: Props) {
  const [busy, setBusy] = useState(false);
  const next = NEXT[incident.status];
  if (!next) return null;

  const run = async () => {
    setBusy(true);
    try {
      await onSetStatus(incident.id, next.to);
    } catch (err) {
      console.error("Status change failed:", err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant={next.to === "verified" ? "danger" : "primary"} busy={busy} onClick={run}>
      {next.label}
    </Button>
  );
}
