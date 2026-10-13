import type { Incident } from "@shared";
import { Card } from "@/components/ui/Card";
import { FieldGrid } from "./FieldGrid";
import { StatusBadge } from "./StatusBadge";
import { IncidentActions } from "./IncidentActions";
import { Timeline } from "./Timeline";

export function IncidentDetail({ incident }: { incident: Incident }) {
  return (
    <Card title={<>Incident <StatusBadge status={incident.status} /></>} actions={<IncidentActions incident={incident} />}>
      <div className="space-y-4">
        <p className="text-sm">{incident.summary}</p>
        <FieldGrid values={incident} />
        <div>
          <h3 className="mb-2 text-sm font-semibold">Timeline</h3>
          <Timeline incidentId={incident.id} />
        </div>
      </div>
    </Card>
  );
}
