import { generateJson } from "../ai/gemini";
import { CLARIFY_SYSTEM } from "../ai/prompts";
import { clarifySchema, clarifyZod } from "../ai/schemas";
import { aiRoute, requireText } from "./aiRoute";

export const clarifyRouter = aiRoute(async (req) => {
  const text = requireText(req);
  const missing: string[] = req.body?.extraction?.missingFields ?? [];
  if (!missing.length) return { question: null };
  const prompt = `Original report: "${text}"\nMissing fields: ${missing.join(", ")}`;
  const { question } = clarifyZod.parse(await generateJson(CLARIFY_SYSTEM, prompt, clarifySchema));
  return { question };
});
