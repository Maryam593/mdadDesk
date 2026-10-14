import { INCIDENT_TYPES, type IncidentType } from "@shared";
import { TYPE_INFO } from "@/lib/labels";
import { FlipTile } from "./FlipTile";

interface Props {
  onPick: (type: IncidentType) => void;
  disabled?: boolean;
}

/** Big one-tap SOS tiles: tapping one sends the SOS right away. */
export function QuickTypeButtons({ onPick, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {INCIDENT_TYPES.map((type, index) => (
        <FlipTile
          key={type}
          emoji={TYPE_INFO[type].emoji}
          name={TYPE_INFO[type].name}
          delayMs={700 + index * 180}
          disabled={disabled}
          onClick={() => onPick(type)}
        />
      ))}
    </div>
  );
}
