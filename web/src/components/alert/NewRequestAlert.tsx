import type { Assignment } from "@shared";
import { AssignmentCard } from "@/components/agency/AssignmentCard";
import { useArrivals } from "@/hooks/useArrivals";
import { EmergencyAlert } from "./EmergencyAlert";

interface Props {
  assignments: Assignment[];
  ready: boolean;
}

/**
 * Agency: red alert + siren when the coordinator asks this agency for help.
 * Closes by itself after "On the way" (the request is then no longer "notified").
 */
export function NewRequestAlert({ assignments, ready }: Props) {
  const { current, dismiss } = useArrivals(assignments, ready, (a) => a.status === "notified");
  if (!current) return null;

  return (
    <EmergencyAlert
      key={current.id}
      title="HELP REQUESTED"
      body={`${current.agencyName}: open MadadDesk now`}
      onClose={() => dismiss(current.id)}
    >
      <AssignmentCard assignment={current} />
    </EmergencyAlert>
  );
}
