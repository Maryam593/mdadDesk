import { useParams } from "react-router-dom";
import type { Incident } from "@shared";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { HelpProgress } from "@/components/track/HelpProgress";
import { useDoc } from "@/hooks/useDoc";
import { incidentIdFor } from "@/services/newRecords";

/** Reporter's live status page: /track/<reportId>. Updates by itself. */
export function TrackPage() {
  const { reportId = "" } = useParams();
  const { data: incident, loading, error } = useDoc<Incident>(`incidents/${incidentIdFor(reportId)}`);

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (error) return <Notice tone="danger">{error}</Notice>;
  if (!incident) {
    return (
      <Notice tone="warn">
        Report not found yet. If you sent it while offline, it appears here once your phone is online.
      </Notice>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Card title="Your SOS">
        <p className="mb-4 text-sm">{incident.summary}</p>
        <HelpProgress incident={incident} />
      </Card>
      <Notice tone="info">
        Keep this page open; it updates by itself. If you are in danger, also call 1122 (Rescue), 16 (Fire) or 15 (Police).
      </Notice>
    </div>
  );
}
