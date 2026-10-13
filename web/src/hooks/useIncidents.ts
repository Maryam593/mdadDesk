import { useState } from "react";
import { orderBy } from "firebase/firestore";
import type { Incident, IncidentStatus } from "@shared";
import { isFirebaseConfigured } from "@/lib/firebase";
import { SAMPLE_INCIDENTS } from "@/lib/sampleIncidents";
import { setIncidentStatus } from "@/services/incidents";
import { useCollection } from "./useCollection";

/**
 * Incidents for the coordinator.
 * - Firebase connected: live incidents from the database.
 * - Not connected: sample incidents kept in memory, so the page can still be tried.
 */
export function useIncidents() {
  const live = useCollection<Incident>(
    isFirebaseConfigured ? "incidents" : null,
    [orderBy("createdAt", "desc")],
  );
  const [samples, setSamples] = useState(SAMPLE_INCIDENTS);

  if (isFirebaseConfigured) {
    return { ...live, isSample: false, setStatus: setIncidentStatus };
  }

  // Sample mode: change the status in memory only (resets on page reload).
  const setSampleStatus = async (id: string, status: IncidentStatus) => {
    setSamples((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
  };
  return { data: samples, loading: false, error: null, isSample: true, setStatus: setSampleStatus };
}
