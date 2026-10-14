import type { Incident } from "@shared";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FieldGrid } from "@/components/incident/FieldGrid";
import { useArrivals } from "@/hooks/useArrivals";
import { EmergencyAlert } from "./EmergencyAlert";

interface Props {
  incidents: Incident[];
  ready: boolean;
  onOpen: (id: string) => void; // selects the incident on the coordinator page
}

/** Coordinator: red alert + siren when a new SOS arrives that nobody has verified yet. */
export function NewSosAlert({ incidents, ready, onOpen }: Props) {
  const { current, dismiss } = useArrivals(incidents, ready, (i) => i.status === "reported");
  if (!current) return null;

  const open = () => {
    onOpen(current.id);
    dismiss(current.id);
  };

  return (
    <EmergencyAlert key={current.id} title="NEW SOS" body={current.summary} onClose={() => dismiss(current.id)}>
      <Card>
        <div className="space-y-3">
          <p className="text-sm">{current.summary}</p>
          <FieldGrid values={current} />
          <Button variant="danger" onClick={open}>
            Open incident
          </Button>
        </div>
      </Card>
    </EmergencyAlert>
  );
}
