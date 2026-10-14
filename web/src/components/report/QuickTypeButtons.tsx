import { INCIDENT_TYPES, type IncidentType } from "@shared";
import { Button } from "@/components/ui/Button";
import { TYPE_INFO } from "@/lib/labels";

interface Props {
  onPick: (type: IncidentType) => void;
  disabled?: boolean;
}

/** Big one-tap SOS tiles: tapping one sends the SOS right away. */
export function QuickTypeButtons({ onPick, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {INCIDENT_TYPES.map((type) => (
        <Button key={type} variant="sos" disabled={disabled} onClick={() => onPick(type)} className="py-5">
          <span className="text-4xl leading-none">{TYPE_INFO[type].emoji}</span>
          <span className="text-base">{TYPE_INFO[type].name}</span>
        </Button>
      ))}
    </div>
  );
}
