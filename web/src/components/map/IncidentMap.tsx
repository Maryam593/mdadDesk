import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import type { Incident } from "@shared";
import { Notice } from "@/components/ui/Notice";
import { useOnline } from "@/hooks/useOnline";
import { DEMO_BUILDING, MAP_ZOOM } from "@/lib/building";
import { IncidentMarker } from "./IncidentMarker";

interface Props {
  incidents: Incident[];
  onSelect: (id: string) => void;
}

// Free map: Leaflet + OpenStreetMap. No API key or billing needed.
// The map pictures come from the internet, so offline it stays grey (the rest of the app still works).
export function IncidentMap({ incidents, onSelect }: Props) {
  const online = useOnline();
  const center: [number, number] = [DEMO_BUILDING.lat, DEMO_BUILDING.lng];

  return (
    <div className="space-y-2">
      {!online && <Notice tone="warn">Map needs internet. Incident list below still works.</Notice>}
      <MapContainer center={center} zoom={MAP_ZOOM} className="h-80 w-full rounded-xl border border-slate-200">
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {/* The building itself: a grey ring with its name on hover */}
        <CircleMarker center={center} radius={22} pathOptions={{ color: "#475569", fillOpacity: 0.05 }}>
          <Tooltip>{DEMO_BUILDING.name}</Tooltip>
        </CircleMarker>
        {incidents.map((incident, index) => (
          <IncidentMarker key={incident.id} incident={incident} index={index} onSelect={onSelect} />
        ))}
      </MapContainer>
    </div>
  );
}
