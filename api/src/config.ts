// All settings come from api/.env (see .env.example).
export const config = {
  port: Number(process.env.PORT ?? 8080),
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  // First model is used normally; the next ones are backups when it is busy.
  geminiModels: (process.env.GEMINI_MODEL ?? "gemini-3.5-flash-lite,gemini-3.1-flash-lite").split(","),
  allowedOrigins: (process.env.ALLOWED_ORIGIN ?? "http://localhost:5173").split(","),
  requireAuth: process.env.REQUIRE_AUTH === "true",
  aiTimeoutMs: 15_000,
};
