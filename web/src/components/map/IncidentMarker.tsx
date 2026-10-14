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
  // Many reports come from the same spot (same house or building), so nudge each dot
  // ~6 m apart (0.00006°); otherwise the last one drawn hides the others.
  const base = incident.location ?? DEMO_BUILDING;
  const nudge = index * 0.00006;
  const position: [number, number] = [base.lat + nudge, base.lng + nudge];
  const done = incident.status === "resolved"; // finished: smaller and faded
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
      radius={done ? 6 : 10}
      pathOptions={{ color, fillColor: color, fillOpacity: done ? 0.35 : 0.7 }}
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
