import { collection, doc, type WriteBatch } from "firebase/firestore";
import type { IncidentEvent, IncidentEventKind } from "@shared";
import { auth, requireDb } from "@/lib/firebase";

/** Appends a timeline event to an incident inside an existing batch. */
export function addEvent(batch: WriteBatch, incidentId: string, kind: IncidentEventKind, message: string) {
  const ref = doc(collection(requireDb(), "incidents", incidentId, "events"));
  const event: IncidentEvent = {
    id: ref.id,
    incidentId,
    at: Date.now(),
    actorUid: auth?.currentUser?.uid ?? null,
    kind,
    message,
  };
  batch.set(ref, event);
}
