import { generateJson } from "../ai/gemini";
import { EXTRACT_SYSTEM } from "../ai/prompts";
import { extractionSchema, extractionZod } from "../ai/schemas";
import { aiRoute, requireText } from "./aiRoute";
import { LOCATION_FIELDS, type Extraction } from "../../../shared/src";

/** Recompute missingFields ourselves rather than trusting the model. */
const withMissing = (e: Omit<Extraction, "missingFields">): Extraction => ({
  ...e,
  missingFields: LOCATION_FIELDS.filter((f) => e[f] === null),
});

export async function extract(text: string): Promise<Extraction> {
  const raw = await generateJson(EXTRACT_SYSTEM, text, extractionSchema);
  return withMissing(extractionZod.parse(raw));
}

export const extractRouter = aiRoute(async (req) => ({
  extraction: await extract(requireText(req)),
}));
