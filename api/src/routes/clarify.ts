import { CLARIFY_SYSTEM, clarifyJsonSchema, clarifyPrompt, toQuestion } from "../../../shared/src/ai";
import { generateJson } from "../ai/gemini";
import { aiRoute, requireText } from "./aiRoute";

export const clarifyRouter = aiRoute(async (req) => {
  const text = requireText(req);
  const missing: string[] = req.body?.extraction?.missingFields ?? [];
  if (!missing.length) return { question: null };
  const raw = await generateJson(CLARIFY_SYSTEM, clarifyPrompt(text, missing), clarifyJsonSchema);
  return { question: toQuestion(raw) };
});
