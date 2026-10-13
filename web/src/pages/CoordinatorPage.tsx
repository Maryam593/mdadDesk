import { useState } from "react";
import { orderBy } from "firebase/firestore";
import type { Incident } from "@shared";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { IncidentList } from "@/components/incident/IncidentList";
import { IncidentDetail } from "@/components/incident/IncidentDetail";
import { useCollection } from "@/hooks/useCollection";

export function CoordinatorPage() {
  const { data, loading, error } = useCollection<Incident>("incidents", [orderBy("createdAt", "desc")]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = data.find((i) => i.id === selectedId) ?? null;

  if (error) return <Notice tone="danger">{error}</Notice>;

  return (
    <div className="grid gap-4 md:grid-cols-[320px_1fr]">
      <Card title={`Incidents (${data.length})`}>
        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : (
          <IncidentList incidents={data} selectedId={selectedId} onSelect={setSelectedId} />
        )}
      </Card>
      {selected ? (
        <IncidentDetail incident={selected} />
      ) : (
        <Card>
          <p className="text-sm text-slate-500">Select an incident to review its source and verify it.</p>
        </Card>
      )}
    </div>
  );
}
