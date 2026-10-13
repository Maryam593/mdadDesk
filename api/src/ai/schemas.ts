import { Type, type Schema } from "@google/genai";
import { z } from "zod";
import { INCIDENT_TYPES, LOCATION_FIELDS } from "../../../shared/src";

const nullableString: Schema = { type: Type.STRING, nullable: true };

export const extractionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    incidentType: { type: Type.STRING, enum: [...INCIDENT_TYPES], nullable: true },
    building: nullableString,
    floor: nullableString,
    landmark: nullableString,
    peopleReported: { type: Type.INTEGER, nullable: true },
    helpRequested: nullableString,
    summary: { type: Type.STRING },
    language: { type: Type.STRING, enum: ["en", "ur", "roman-ur", "mixed"] },
    missingFields: { type: Type.ARRAY, items: { type: Type.STRING, enum: [...LOCATION_FIELDS] } },
  },
  required: ["incidentType", "building", "floor", "landmark", "peopleReported", "summary", "language", "missingFields"],
};

export const extractionZod = z.object({
  incidentType: z.enum(INCIDENT_TYPES).nullable(),
  building: z.string().nullable(),
  floor: z.string().nullable(),
  landmark: z.string().nullable(),
  peopleReported: z.number().int().nonnegative().nullable(),
  helpRequested: z.string().nullable().default(null),
  summary: z.string(),
  language: z.enum(["en", "ur", "roman-ur", "mixed"]),
  missingFields: z.array(z.enum(LOCATION_FIELDS)),
});

export const clarifySchema: Schema = {
  type: Type.OBJECT,
  properties: { question: nullableString },
  required: ["question"],
};

export const clarifyZod = z.object({ question: z.string().nullable() });
