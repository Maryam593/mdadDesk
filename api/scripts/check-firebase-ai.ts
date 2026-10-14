// Checks that Gemini answers through Firebase AI Logic (same path the web app uses).
// Reads the web config from web/.env. Run: npm run check-firebase-ai -w api
import { readFileSync } from "node:fs";
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { AI_MODELS } from "../../shared/src/ai";

const env: Record<string, string> = {};
for (const line of readFileSync(new URL("../../web/.env", import.meta.url), "utf8").split("\n")) {
  const [key, ...rest] = line.trim().split("=");
  if (key && !key.startsWith("#")) env[key] = rest.join("=");
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});
const ai = getAI(app, { backend: new GoogleAIBackend() });

for (const model of AI_MODELS) {
  try {
    const result = await getGenerativeModel(ai, { model }).generateContent("Reply with the word OK.");
    console.log(`OK    ${model}: ${result.response.text().trim()}`);
  } catch (err) {
    console.log(`FAIL  ${model}: ${String(err).slice(0, 200)}`);
  }
}
process.exit(0);
