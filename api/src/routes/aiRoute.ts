import { Router, type Request } from "express";

/**
 * Wraps an AI handler: any failure becomes `{ ok: false, error }` with HTTP 200,
 * so the client can always fall back to manual entry instead of crashing.
 */
export function aiRoute<T extends object>(handler: (req: Request) => Promise<T>) {
  const router = Router();
  router.post("/", async (req, res) => {
    try {
      res.json({ ok: true, ...(await handler(req)) });
    } catch (err) {
      const error = err instanceof Error ? err.message : "unknown error";
      console.error(`[api] ${req.baseUrl} failed:`, error);
      res.json({ ok: false, error });
    }
  });
  return router;
}

export function requireText(req: Request, max = 2000): string {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) throw new Error("text is required");
  if (text.length > max) throw new Error(`text longer than ${max} chars`);
  return text;
}
