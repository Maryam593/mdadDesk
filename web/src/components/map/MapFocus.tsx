import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { GeoPoint } from "@shared";
import { MAP_ZOOM } from "@/lib/building";

/** Moves the map to a point (e.g. the selected incident's GPS spot). Draws nothing itself. */
export function MapFocus({ point }: { point: GeoPoint | null }) {
  const map = useMap();
  const lat = point?.lat;
  const lng = point?.lng;

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) map.flyTo([lat, lng], MAP_ZOOM);
  }, [map, lat, lng]);

  return null;
}
