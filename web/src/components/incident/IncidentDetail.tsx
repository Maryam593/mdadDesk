import type { Incident, IncidentStatus } from "@shared";
import { Card } from "@/components/ui/Card";
import { FieldGrid } from "./FieldGrid";
import { StatusBadge } from "./StatusBadge";
import { IncidentActions } from "./IncidentActions";
import { Timeline } from "./Timeline";

interface Props {
  incident: Incident;
  onSetStatus: (id: string, status: IncidentStatus) => Promise<void>;
  showTimeline: boolean; // false for sample data (it has no saved history)
}

export function IncidentDetail({ incident, onSetStatus, showTimeline }: Props) {
  return (
    <Card
      title={<>Incident <StatusBadge status={incident.status} /></>}
      actions={<IncidentActions incident={incident} onSetStatus={onSetStatus} />}
    >
      <div className="space-y-4">
        <p className="text-sm">{incident.summary}</p>
        <FieldGrid values={incident} />
        {showTimeline && (
          <div>
            <h3 className="mb-2 text-sm font-semibold">Timeline</h3>
            <Timeline incidentId={incident.id} />
          </div>
        )}
      </div>
    </Card>
  );
}
