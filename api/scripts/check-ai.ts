// Quick health check for the Gemini key: lists Flash models and tries the configured one.
// Run: npm run check-ai -w api
import { GoogleGenAI } from "@google/genai";
import { config } from "../src/config";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

// 1. Which Flash models can this key see?
try {
  const names: string[] = [];
  for await (const model of await ai.models.list()) {
    if (model.name?.includes("flash")) names.push(model.name.replace("models/", ""));
  }
  console.log("Flash models available:\n  " + names.join("\n  "));
} catch (err) {
  console.log("Could not list models:", String(err).slice(0, 300));
}

// 2. Does each model in .env actually answer?
for (const model of config.geminiModels) {
  try {
    const res = await ai.models.generateContent({ model, contents: "Reply with just: ok" });
    console.log(`${model} ->`, res.text?.trim());
  } catch (err) {
    console.log(`${model} FAILED:`, String(err).slice(0, 300));
  }
}
