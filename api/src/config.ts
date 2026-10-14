import { AI_MODELS } from "../../shared/src/ai";

// All settings come from api/.env (see .env.example).
export const config = {
  port: Number(process.env.PORT ?? 8080),
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  // First model is used normally; the next ones are backups when it is busy.
  // Optional override; the default list lives in shared/src/ai/prompts.ts
  geminiModels: process.env.GEMINI_MODEL ? process.env.GEMINI_MODEL.split(",") : AI_MODELS,
  allowedOrigins: (process.env.ALLOWED_ORIGIN ?? "http://localhost:5173").split(","),
  requireAuth: process.env.REQUIRE_AUTH === "true",
  aiTimeoutMs: 15_000,
};
