export const config = {
  port: Number(process.env.PORT ?? 8080),
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  geminiModel: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
  allowedOrigins: (process.env.ALLOWED_ORIGIN ?? "http://localhost:5173").split(","),
  requireAuth: process.env.REQUIRE_AUTH === "true",
  aiTimeoutMs: 15_000,
};
