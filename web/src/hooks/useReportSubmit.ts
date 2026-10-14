import { useState } from "react";
import type { AiStatus, DeliveryStatus, Extraction, IncidentType } from "@shared";
import { clarifyReport, extractReport } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";
import { rememberReport } from "@/lib/myReports";
import { getLocation } from "@/lib/geo";
import { applyExtraction, attachLocation, newReportId, sendReport } from "@/services/reports";

interface SubmitState {
  delivery: DeliveryStatus | null;
  ai: AiStatus | null;
  extraction: Extraction | null;
  question: string | null;
  location: LocationStatus | null;
}

export type LocationStatus = "pending" | "shared" | "off";

const INITIAL: SubmitState = { delivery: null, ai: null, extraction: null, question: null, location: null };

/**
 * Delivery first, AI second: the report is saved before Gemini runs,
 * so an AI failure or timeout never blocks the SOS from reaching the coordinator.
 */
export function useReportSubmit() {
  const [state, setState] = useState<SubmitState>(INITIAL);
  const patch = (p: Partial<SubmitState>) => setState((s) => ({ ...s, ...p }));

  const submit = async (text: string, type: IncidentType) => {
    const id = newReportId();
    const live = isFirebaseConfigured;
    setState({ ...INITIAL, delivery: live ? "pending" : null, ai: "pending", location: live ? "pending" : null });

    if (isFirebaseConfigured) {
      rememberReport(id, text); // so the reporter can open its status page, even offline
      sendReport(id, text, Date.now(), type)
        .then(() => patch({ delivery: "sent" }))
        .catch(() => patch({ delivery: "failed" }));
      getLocation().then((point) => {
        patch({ location: point ? "shared" : "off" });
        if (point) attachLocation(id, point).catch(console.error);
      });
    }

    const res = await extractReport({ text });
    const extraction = res.ok ? res.extraction : null;
    patch({ ai: res.ok ? "ok" : "failed", extraction });
    if (live) applyExtraction(id, extraction).catch(console.error);

    if (extraction?.missingFields.length) {
      const q = await clarifyReport({ text, extraction });
      if (q.ok) patch({ question: q.question });
    }
  };

  return { ...state, submit, reset: () => setState(INITIAL) };
}
