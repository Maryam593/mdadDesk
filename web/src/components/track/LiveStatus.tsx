import type { Incident } from "@shared";
import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { useDoc } from "@/hooks/useDoc";
import { incidentIdFor } from "@/services/newRecords";
import { HelpProgress } from "./HelpProgress";
import { HelpSplash } from "./HelpSplash";
import { Loader } from "@/components/ui/Loader";

/** Live status of one SOS: checklist + good-news splash. Used on the report page and /track. */
export function LiveStatus({ reportId }: { reportId: string }) {
  const { data: incident, loading, error } = useDoc<Incident>(`incidents/${incidentIdFor(reportId)}`);

  if (loading) return <Loader label="Checking your SOS…" />;
  if (error) return <Notice tone="danger">{error}</Notice>;
  if (!incident) {
    return (
      <Notice tone="warn">
        Report not found yet. If you sent it while offline, it appears here once your phone is online.
      </Notice>
    );
  }

  return (
    <Card title="Is help coming?">
      <p className="mb-4 text-sm">{incident.summary}</p>
      <HelpProgress incident={incident} />
      <HelpSplash incident={incident} />
    </Card>
  );
}
