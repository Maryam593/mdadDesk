import { useParams } from "react-router-dom";
import { Notice } from "@/components/ui/Notice";
import { LiveStatus } from "@/components/track/LiveStatus";

/** Reporter's live status page: /track/<reportId>. Updates by itself. */
export function TrackPage() {
  const { reportId = "" } = useParams();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <LiveStatus reportId={reportId} />
      <Notice tone="info">
        Keep this page open; it updates by itself. If you are in danger, also call 1122 (Rescue), 16 (Fire) or 15 (Police).
      </Notice>
    </div>
  );
}
