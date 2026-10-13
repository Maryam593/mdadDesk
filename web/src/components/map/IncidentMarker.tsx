import { CircleMarker, Popup } from "react-leaflet";
import type { Incident } from "@shared";
import { DEMO_BUILDING } from "@/lib/building";
import { STATUS_COLOR } from "@/lib/labels";

interface Props {
  incident: Incident;
  index: number; // position in the list, used to spread out markers at the same spot
  onSelect: (id: string) => void;
}

// One coloured dot per incident. Clicking it opens the incident on the right.
export function IncidentMarker({ incident, index, onSelect }: Props) {
  // All demo incidents share one building, so nudge each dot a few metres apart
  // (0.00003° ≈ 3 m) so they don't sit exactly on top of each other.
  const base = incident.location ?? DEMO_BUILDING;
  const position: [number, number] = [base.lat + index * 0.00003, base.lng + index * 0.00003];
  const color = STATUS_COLOR[incident.status];

  // Short label: "smoke · Floor 2 · shop 24". Unknown parts are written as "?".
  const label = [
    incident.incidentType ?? "?",
    `Floor ${incident.floor ?? "?"}`,
    incident.landmark ?? "?",
  ].join(" · ");

  return (
    <CircleMarker
      center={position}
      radius={10}
      pathOptions={{ color, fillColor: color, fillOpacity: 0.7 }}
      eventHandlers={{ click: () => onSelect(incident.id) }}
    >
      <Popup>
        <strong>{incident.status.toUpperCase()}</strong>
        <br />
        {label}
      </Popup>
    </CircleMarker>
  );
}
