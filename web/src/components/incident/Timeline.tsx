import { orderBy } from "firebase/firestore";
import type { IncidentEvent } from "@shared";
import { useCollection } from "@/hooks/useCollection";
import { Loader } from "@/components/ui/Loader";

export function Timeline({ incidentId }: { incidentId: string }) {
  const { data, loading } = useCollection<IncidentEvent>(
    `incidents/${incidentId}/events`,
    [orderBy("at", "asc")],
    incidentId,
  );
  if (loading) return <Loader label="Loading timeline…" />;
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
