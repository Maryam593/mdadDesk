import { LOCATION_FIELDS, type LocationField } from "@shared";
import { FIELD_LABELS } from "@/lib/labels";

type Values = Record<LocationField, string | number | null>;

/** Shows location fields; anything not stated is explicitly "Unknown", never blank or guessed. */
export function FieldGrid({ values }: { values: Values }) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
      {LOCATION_FIELDS.map((f) => (
        <div key={f}>
          <dt className="text-xs text-slate-500">{FIELD_LABELS[f]}</dt>
          <dd className={values[f] === null ? "italic text-amber-700" : "font-medium"}>
            {values[f] ?? "Unknown"}
          </dd>
        </div>
      ))}
    </dl>
  );
}
