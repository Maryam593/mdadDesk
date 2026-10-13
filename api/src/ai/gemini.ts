import { GoogleGenAI, type Schema } from "@google/genai";
import { config } from "../config";

let client: GoogleGenAI | null = null;
const ai = () => {
  if (!config.geminiApiKey) throw new Error("GEMINI_API_KEY not set");
  return (client ??= new GoogleGenAI({ apiKey: config.geminiApiKey }));
};

const withTimeout = <T>(p: Promise<T>, ms: number) =>
  Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error("AI timeout")), ms)),
  ]);

/** Single entry point for all Gemini calls: JSON in, parsed JSON out. */
export async function generateJson(system: string, user: string, schema: Schema): Promise<unknown> {
  const res = await withTimeout(
    ai().models.generateContent({
      model: config.geminiModel,
      contents: user,
      config: {
        systemInstruction: system,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0,
      },
    }),
    config.aiTimeoutMs,
  );
  if (!res.text) throw new Error("empty AI response");
  return JSON.parse(res.text);
}
