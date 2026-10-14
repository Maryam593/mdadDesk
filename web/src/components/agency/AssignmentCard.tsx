import type { Assignment, Incident } from "@shared";
import { ParticleButton } from "@/components/ui/ParticleButton";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LocationLine } from "@/components/incident/LocationLine";
import { FieldGrid } from "@/components/incident/FieldGrid";
import { StatusBadge } from "@/components/incident/StatusBadge";
import { useDoc } from "@/hooks/useDoc";
import { markOnTheWay } from "@/services/assignments";

/** One help request in an agency's inbox, with the live incident details. */
export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const { data: incident } = useDoc<Incident>(`incidents/${assignment.incidentId}`);
  if (!incident) return null;

  const canAccept = assignment.status === "notified" && incident.status !== "resolved";
  const action = canAccept ? (
    <ParticleButton variant="danger" onClick={() => markOnTheWay(assignment)}>
      On the way
    </ParticleButton>
  ) : (
    <Badge tone="success">{assignment.status}</Badge>
  );

  return (
    <Card title={<>Help request <StatusBadge status={incident.status} /></>} actions={action}>
      <div className="space-y-3">
        <p className="text-sm">{incident.summary}</p>
        <FieldGrid values={incident} />
        <LocationLine location={incident.location} />
      </div>
    </Card>
  );
}
