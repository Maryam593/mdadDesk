import { AI_MODELS } from "./prompts";

/** Rejects after `ms` milliseconds, so a slow AI call can't hang forever. */
export function withTimeout<T>(work: Promise<T>, ms: number): Promise<T> {
  const timer = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("AI timeout")), ms));
  return Promise.race([work, timer]);
}

/**
 * Asks each model in turn until one answers.
 * `ask` does one attempt with one model; web and api each pass their own.
 */
export async function tryModels<T>(ask: (model: string) => Promise<T>, models = AI_MODELS): Promise<T> {
  let lastError: unknown = null;
  for (const model of models) {
    try {
      return await ask(model);
    } catch (err) {
      lastError = err;
      console.warn(`[ai] ${model} failed, trying next:`, String(err).slice(0, 120));
    }
  }
  throw lastError;
}
