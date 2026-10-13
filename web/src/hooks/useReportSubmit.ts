import { useState } from "react";
import type { AiStatus, DeliveryStatus, Extraction } from "@shared";
import { clarifyReport, extractReport } from "@/lib/api";
import { isFirebaseConfigured } from "@/lib/firebase";
import { applyExtraction, newReportId, sendReport } from "@/services/reports";

interface SubmitState {
  delivery: DeliveryStatus | null;
  ai: AiStatus | null;
  extraction: Extraction | null;
  question: string | null;
}

const INITIAL: SubmitState = { delivery: null, ai: null, extraction: null, question: null };

/**
 * Delivery first, AI second: the report is saved before Gemini runs,
 * so an AI failure or timeout never blocks the SOS from reaching the coordinator.
 */
export function useReportSubmit() {
  const [state, setState] = useState<SubmitState>(INITIAL);
  const patch = (p: Partial<SubmitState>) => setState((s) => ({ ...s, ...p }));

  const submit = async (text: string) => {
    const id = newReportId();
    setState({ ...INITIAL, delivery: isFirebaseConfigured ? "pending" : null, ai: "pending" });

    if (isFirebaseConfigured) {
      sendReport(id, text, Date.now())
        .then(() => patch({ delivery: "sent" }))
        .catch(() => patch({ delivery: "failed" }));
    }

    const res = await extractReport({ text });
    const extraction = res.ok ? res.extraction : null;
    patch({ ai: res.ok ? "ok" : "failed", extraction });
    if (isFirebaseConfigured) applyExtraction(id, extraction).catch(console.error);

    if (extraction?.missingFields.length) {
      const q = await clarifyReport({ text, extraction });
      if (q.ok) patch({ question: q.question });
    }
  };

  return { ...state, submit, reset: () => setState(INITIAL) };
}
