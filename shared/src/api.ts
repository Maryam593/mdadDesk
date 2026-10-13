import type { Extraction } from "./extraction";

/** Every API response uses this envelope so the UI can always fall back to manual entry. */
export type ApiResult<T> = ({ ok: true } & T) | { ok: false; error: string };

export interface ExtractRequest {
  text: string;
}
export type ExtractResponse = ApiResult<{ extraction: Extraction }>;

export interface ClarifyRequest {
  text: string;
  extraction: Extraction;
}
export type ClarifyResponse = ApiResult<{ question: string | null }>;
