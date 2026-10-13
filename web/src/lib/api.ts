import type { ClarifyRequest, ClarifyResponse, ExtractRequest, ExtractResponse } from "@shared";
import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/**
 * Sends JSON to our API. It never throws:
 * if anything goes wrong you get { ok: false, error } and the UI falls back to manual entry.
 */
async function post(path: string, body: unknown) {
  if (!navigator.onLine) return { ok: false, error: "offline" };

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = await auth?.currentUser?.getIdToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(API_URL + path, { method: "POST", headers, body: JSON.stringify(body) });
    return await res.json();
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

export function extractReport(req: ExtractRequest): Promise<ExtractResponse> {
  return post("/extract", req);
}

export function clarifyReport(req: ClarifyRequest): Promise<ClarifyResponse> {
  return post("/clarify", req);
}
