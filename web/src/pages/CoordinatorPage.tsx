import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { IncidentList } from "@/components/incident/IncidentList";
import { IncidentDetail } from "@/components/incident/IncidentDetail";
import { IncidentMap } from "@/components/map/IncidentMap";
import { NewSosAlert } from "@/components/alert/NewSosAlert";
import { Tour } from "@/components/tour/Tour";
import { useIncidents } from "@/hooks/useIncidents";

export function CoordinatorPage() {
  const { data, loading, error, isSample, setStatus } = useIncidents();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = data.find((i) => i.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <Tour id="coordinator" />
      <NewSosAlert incidents={data} ready={!loading && !isSample} onOpen={setSelectedId} />
      {error && <Notice tone="danger">{error}</Notice>}
      {isSample && (
        <Notice tone="info">
          Sample data: Firebase is not connected, so these 4 example incidents are shown. Changes reset on reload.
        </Notice>
      )}
      <IncidentMap incidents={data} onSelect={setSelectedId} focus={selected?.location ?? null} />
      <div className="grid gap-4 md:grid-cols-[320px_1fr]">
        <Card title={`Incidents (${data.length})`}>
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : (
            <IncidentList incidents={data} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </Card>
        {selected ? (
          <IncidentDetail incident={selected} onSetStatus={setStatus} live={!isSample} />
        ) : (
          <Card>
            <p className="text-sm text-slate-500">Select an incident (or a dot on the map) to review and verify it.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
