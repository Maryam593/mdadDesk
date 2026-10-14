import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { tryModels, withTimeout, type JsonSchema } from "../../../shared/src/ai";
import { config } from "../config";

// The api's own Gemini caller (uses the secret key in api/.env).
// Used by the eval script. The web app calls Gemini through Firebase AI Logic instead (web/src/lib/ai.ts).

let client: GoogleGenAI | null = null; // created on the first AI call

function getClient(): GoogleGenAI {
  if (!config.geminiApiKey) throw new Error("GEMINI_API_KEY not set");
  if (!client) client = new GoogleGenAI({ apiKey: config.geminiApiKey });
  return client;
}

// One attempt with one model.
async function askModel(model: string, system: string, user: string, schema: JsonSchema) {
  const request = getClient().models.generateContent({
    model,
    contents: user,
    config: {
      systemInstruction: system,
      responseMimeType: "application/json",
      responseJsonSchema: schema,
      // Gemini 3 models "think" before answering. LOW is enough for short reports and much faster.
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    },
  });
  const response = await withTimeout(request, config.aiTimeoutMs);
  if (!response.text) throw new Error("empty AI response");
  return JSON.parse(response.text);
}

/** Asks Gemini for JSON, trying each model in GEMINI_MODEL (comma-separated) in order. */
export function generateJson(system: string, user: string, schema: JsonSchema): Promise<unknown> {
  return tryModels((model) => askModel(model, system, user, schema), config.geminiModels);
}
