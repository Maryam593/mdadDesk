import type { Incident, IncidentStatus } from "@shared";
import { HoldButton } from "@/components/ui/HoldButton";

interface Props {
  incident: Incident;
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
}

/**
 * Closing a verified incident WITHOUT sending help (false alarm). Sits at the bottom and needs a
 * press-and-hold, so a slip of the finger can't close a real emergency.
 * Hidden once help has been sent.
 */
export function CloseFalseAlarm({ incident, onSetStatus }: Props) {
  if (incident.status !== "verified" || incident.notifiedAgencyIds.length > 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <span>Not an emergency?</span>
      <HoldButton onConfirm={() => onSetStatus(incident.id, "resolved")}>
        Hold to close without sending help
      </HoldButton>
    </div>
  );
}
