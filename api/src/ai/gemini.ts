import { GoogleGenAI, type Schema } from "@google/genai";
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

/**
 * The ONLY place we call Gemini.
 * system = instructions, user = the text, schema = the JSON shape we want back.
 */
export async function generateJson(system: string, user: string, schema: Schema): Promise<unknown> {
  const request = getClient().models.generateContent({
    model: config.geminiModel,
    contents: user,
    config: {
      systemInstruction: system,
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0, // 0 = same answer every time, no creativity
    },
  });

  const response = await Promise.race([request, timeout(config.aiTimeoutMs)]);
  if (!response.text) throw new Error("empty AI response");
  return JSON.parse(response.text);
}
