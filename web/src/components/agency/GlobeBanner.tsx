import { Radio } from "lucide-react";
import type { Assignment, GeoPoint } from "@shared";
import { DEMO_BUILDING } from "@/lib/building";
import { RequestGlobe } from "./RequestGlobe";

const THREE_HOURS = 3 * 60 * 60 * 1000;

// Still "live": waiting for this agency, or accepted recently (a request stays "accepted" after the
// case is closed, so older accepted ones are left off the globe).
const isLive = (a: Assignment) =>
  a.status === "notified" || (a.status === "accepted" && Date.now() - a.updatedAt < THREE_HOURS);

/** Top of the agency inbox: a globe with a red dot wherever an open request came from. */
export function GlobeBanner({ assignments }: { assignments: Assignment[] }) {
  const points: GeoPoint[] = [];
  for (const a of assignments) {
    if (isLive(a)) points.push(a.location ?? DEMO_BUILDING); // no GPS: the demo building
  }
  const waiting = assignments.filter((a) => a.status === "notified").length;

  return (
    <section className="flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-linear-to-br from-ink via-slate-800 to-slate-900 p-6 text-white shadow-xl sm:flex-row sm:justify-between">
      <div className="space-y-2 text-center sm:text-left">
        <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-300 sm:justify-start">
          <Radio size={14} aria-hidden /> Live requests
        </p>
        <p className="text-4xl font-extrabold">{points.length}</p>
        <p className="text-sm text-slate-300">
          {points.length === 0
            ? "All quiet. New requests appear here with a siren."
            : `${waiting} waiting for you · red dots show where they came from`}
        </p>
      </div>
      <RequestGlobe points={points} />
    </section>
  );
}
