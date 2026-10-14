import { INCIDENT_TYPES, type IncidentType } from "@shared";
import { TYPE_INFO } from "@/lib/labels";
import { FlipTile } from "./FlipTile";

interface Props {
  onPick: (type: IncidentType) => void;
  disabled?: boolean;
}

/** SOS cards: tap one, it flips, then "Send SOS" on the back sends it. */
export function QuickTypeButtons({ onPick, disabled }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {INCIDENT_TYPES.map((type) => (
        <FlipTile
          key={type}
          emoji={TYPE_INFO[type].emoji}
          name={TYPE_INFO[type].name}
          disabled={disabled}
          onSend={() => onPick(type)}
        />
      ))}
    </div>
  );
}
