import { GoogleGenAI, ThinkingLevel, type Schema } from "@google/genai";
import { config } from "../config";

// Created once, on the first AI call.
let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (!config.geminiApiKey) throw new Error("GEMINI_API_KEY not set");
  if (!client) client = new GoogleGenAI({ apiKey: config.geminiApiKey });
  return client;
}

// Rejects after `ms` milliseconds, so a slow AI call can't hang the request forever.
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("AI timeout")), ms));
}

// One attempt with one model.
async function askModel(model: string, system: string, user: string, schema: Schema) {
  const request = getClient().models.generateContent({
    model,
    contents: user,
    config: {
      systemInstruction: system,
      responseMimeType: "application/json",
      responseSchema: schema,
      // Gemini 3 models "think" before answering. LOW is enough for short reports and much faster.
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });
  const response = await Promise.race([request, timeout(config.aiTimeoutMs)]);
  if (!response.text) throw new Error("empty AI response");
  return JSON.parse(response.text);
}

/**
 * The ONLY place we call Gemini. Tries each model in GEMINI_MODEL (comma-separated) in order,
 * so if the first one is busy (503) or out of free quota (429) the next one answers.
 */
export async function generateJson(system: string, user: string, schema: Schema): Promise<unknown> {
  let lastError: unknown = null;
  for (const model of config.geminiModels) {
    try {
      return await askModel(model, system, user, schema);
    } catch (err) {
      lastError = err;
      console.warn(`[ai] ${model} failed, trying next:`, String(err).slice(0, 120));
    }
  }
  throw lastError;
}
