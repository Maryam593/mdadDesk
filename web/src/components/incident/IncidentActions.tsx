import { useState } from "react";
import type { Incident, IncidentStatus } from "@shared";
import { Button } from "@/components/ui/Button";
import { setIncidentStatus } from "@/services/incidents";

/** Next allowed human step for each status. AI never moves an incident forward. */
const NEXT: Partial<Record<IncidentStatus, { to: IncidentStatus; label: string }>> = {
  reported: { to: "verified", label: "Verify" },
  verified: { to: "response", label: "Response underway" },
  response: { to: "resolved", label: "Confirm resolved" },
};

export function IncidentActions({ incident }: { incident: Incident }) {
  const [busy, setBusy] = useState(false);
  const next = NEXT[incident.status];
  if (!next) return null;

  const run = async () => {
    setBusy(true);
    try {
      await setIncidentStatus(incident.id, next.to);
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
