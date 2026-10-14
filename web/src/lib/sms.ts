import type { GeoPoint } from "@shared";
import { mapsLink } from "./geo";

// SMS fallback: SMS needs only mobile signal, not internet. Opens the phone's SMS app with the SOS
// already written; the person just presses Send. Number: VITE_SOS_SMS_NUMBER in web/.env
// (the coordinator's phone). If empty, the SMS app opens and they choose who to send it to.

const SMS_NUMBER = import.meta.env.VITE_SOS_SMS_NUMBER ?? "";

export function smsLink(message: string, point: GeoPoint | null): string {
  let body = `SOS (MadadDesk): ${message}`;
  if (point) body += ` Location: ${mapsLink(point)}`;
  // "?&body=" works on both Android and iPhone.
  return `sms:${SMS_NUMBER}?&body=${encodeURIComponent(body)}`;
}
