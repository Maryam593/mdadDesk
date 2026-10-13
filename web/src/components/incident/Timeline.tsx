import { orderBy } from "firebase/firestore";
import type { IncidentEvent } from "@shared";
import { useCollection } from "@/hooks/useCollection";

export function Timeline({ incidentId }: { incidentId: string }) {
  const { data, loading } = useCollection<IncidentEvent>(
    `incidents/${incidentId}/events`,
    [orderBy("at", "asc")],
    incidentId,
  );
  if (loading) return <p className="text-sm text-slate-500">Loading timeline…</p>;
  return (
    <ol className="space-y-2 border-l-2 border-slate-200 pl-4 text-sm">
      {data.map((e) => (
        <li key={e.id}>
          <span className="text-xs text-slate-500">{new Date(e.at).toLocaleTimeString()}</span>{" "}
          {e.message}
        </li>
      ))}
    </ol>
  );
}
