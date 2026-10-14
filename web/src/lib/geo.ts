import type { GeoPoint } from "@shared";

/**
 * Asks the phone for its GPS position. The browser shows "Allow location?" the first time.
 * Gives up after 10 seconds. Returns null if refused or unavailable: the SOS is sent anyway.
 * Note: GPS knows the street, not the floor, so floor / shop still come from the message.
 */
export function getLocation(): Promise<GeoPoint | null> {
  return new Promise((resolve) => {
    if (!("geolocation" in navigator)) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracyM: Math.round(pos.coords.accuracy),
        }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  });
}

/** Free link that opens the spot in Google Maps (no API key needed). */
export const mapsLink = (point: GeoPoint) => `https://www.google.com/maps?q=${point.lat},${point.lng}`;
