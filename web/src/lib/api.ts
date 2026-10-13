import type {
  ApiResult,
  ClarifyRequest,
  ClarifyResponse,
  ExtractRequest,
  ExtractResponse,
} from "@shared";
import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

/** POST helper that never throws: network/AI errors come back as `{ ok: false }`. */
async function post<T extends object>(path: string, body: unknown): Promise<ApiResult<T>> {
  if (!navigator.onLine) return { ok: false, error: "offline" };
  try {
    const token = await auth?.currentUser?.getIdToken();
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return (await res.json()) as ApiResult<T>;
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}

export const extractReport = (req: ExtractRequest) => post(`/extract`, req) as Promise<ExtractResponse>;
export const clarifyReport = (req: ClarifyRequest) => post(`/clarify`, req) as Promise<ClarifyResponse>;
