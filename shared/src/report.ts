import type { Extraction } from "./extraction";

export type AiStatus = "pending" | "ok" | "failed";
export type DeliveryStatus = "pending" | "sent" | "failed";

export interface Clarification {
  question: string;
  answer: string | null;
  at: number;
}

export interface Report {
  id: string; // client-generated, stable across retries
  text: string;
  clientCreatedAt: number; // set on device
  receivedAt: { seconds: number } | null; // Firestore serverTimestamp = backend acknowledgement
  reporterUid: string | null;
  aiStatus: AiStatus;
  extraction: Extraction | null;
  incidentId: string | null;
  clarifications: Clarification[];
}
