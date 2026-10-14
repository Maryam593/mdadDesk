import { EXTRACT_SYSTEM, extractionJsonSchema, toExtraction } from "../../../shared/src/ai";
import type { Extraction } from "../../../shared/src";
import { generateJson } from "../ai/gemini";
import { aiRoute, requireText } from "./aiRoute";

export async function extract(text: string): Promise<Extraction> {
  return toExtraction(await generateJson(EXTRACT_SYSTEM, text, extractionJsonSchema));
}

export const extractRouter = aiRoute(async (req) => ({
  extraction: await extract(requireText(req)),
}));
