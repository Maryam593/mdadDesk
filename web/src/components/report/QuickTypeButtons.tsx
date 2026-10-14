import { INCIDENT_TYPES, type IncidentType } from "@shared";
import { Button } from "@/components/ui/Button";
import { TYPE_LABELS } from "@/lib/labels";

interface Props {
  onPick: (type: IncidentType) => void;
  disabled?: boolean;
}

/** Big one-tap SOS buttons: tapping one sends the SOS right away. */
export function QuickTypeButtons({ onPick, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {INCIDENT_TYPES.map((type) => (
        <Button
          key={type}
          variant="danger"
          disabled={disabled}
          onClick={() => onPick(type)}
          className="py-5 text-lg"
        >
          {TYPE_LABELS[type]}
        </Button>
      ))}
    </div>
  );
}
