import { MapPin } from "lucide-react";
import type { GeoPoint } from "@shared";
import { mapsLink } from "@/lib/geo";

/** "GPS location (±12 m) · Open in Google Maps", or a warning when there is none. */
export function LocationLine({ location }: { location: GeoPoint | null }) {
  if (!location) {
    return (
      <p className="flex items-center gap-1.5 text-sm italic text-amber-700">
        <MapPin size={16} aria-hidden /> No GPS location: use the floor and landmark.
      </p>
    );
  }
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-sm">
      <MapPin size={16} className="text-danger" aria-hidden /> GPS location (±{location.accuracyM ?? "?"} m) ·{" "}
      <a href={mapsLink(location)} target="_blank" rel="noreferrer" className="font-medium text-brand underline">
        Open in Google Maps
      </a>
    </p>
  );
}
