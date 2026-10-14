import type { AiStatus, DeliveryStatus, Extraction, IncidentType } from "@shared";
import { clarifyReport, extractReport } from "@/lib/ai";
import { getLocation } from "@/lib/geo";
import { rememberReport } from "@/lib/myReports";
import { applyExtraction, attachLocation, sendReport } from "@/services/reports";

// The steps of sending an SOS, used by useReportSubmit. Each step reports progress via `patch`.

export type LocationStatus = "pending" | "shared" | "off";

export interface SubmitState {
  delivery: DeliveryStatus | null;
  ai: AiStatus | null;
  extraction: Extraction | null;
  question: string | null;
  location: LocationStatus | null;
  reportId: string | null; // set once sent to Firebase, for the live status card
}

type Patch = (changes: Partial<SubmitState>) => void;

/** Step 1: save the SOS, then add the phone's GPS position. Neither waits for the AI. */
export function deliver(id: string, text: string, type: IncidentType, patch: Patch) {
  rememberReport(id, text); // so the reporter can open its status page, even offline
  sendReport(id, text, Date.now(), type)
    .then(() => patch({ delivery: "sent" }))
    .catch(() => patch({ delivery: "failed" }));
  getLocation().then((point) => {
    patch({ location: point ? "shared" : "off" });
    if (point) attachLocation(id, point).catch(console.error);
  });
}

/** Step 2: let Gemini read the message; ask one follow-up question if details are missing. */
export async function readWithAi(id: string, text: string, saveToFirebase: boolean, patch: Patch) {
  const res = await extractReport({ text });
  const extraction = res.ok ? res.extraction : null;
  if (!res.ok) console.warn("[ai] failed:", res.error); // F12 → Console shows why (App Check, model, …)
  patch({ ai: res.ok ? "ok" : "failed", extraction });
  if (saveToFirebase) applyExtraction(id, extraction).catch(console.error);

  if (extraction?.missingFields.length) {
    const q = await clarifyReport({ text, extraction });
    if (q.ok) patch({ question: q.question });
  }
}
