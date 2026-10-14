import { where } from "firebase/firestore";
import type { Assignment } from "@shared";
import { Notice } from "@/components/ui/Notice";
import { AssignmentCard } from "@/components/agency/AssignmentCard";
import { NewRequestAlert } from "@/components/alert/NewRequestAlert";
import { Tour } from "@/components/tour/Tour";
import { useClaims } from "@/hooks/useClaims";
import { useCollection } from "@/hooks/useCollection";

/** Agency inbox: help requests sent to the signed-in agency, newest first. */
export function AgencyPage() {
  const { role, agencyId, loading } = useClaims();
  const inbox = useCollection<Assignment>(
    agencyId ? "assignments" : null,
    agencyId ? [where("agencyId", "==", agencyId)] : [],
    agencyId ?? "",
  );

  if (loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (role !== "agency") {
    return (
      <Notice tone="neutral">
        Agency inbox: sign in on the Login page with an agency account, e.g. fire-saddar@madaddesk.demo.
      </Notice>
    );
  }

  const newestFirst = [...inbox.data].sort((a, b) => b.updatedAt - a.updatedAt);
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Tour id="agency" />
      <NewRequestAlert assignments={inbox.data} ready={!inbox.loading} />
      <h2 className="text-lg font-semibold">Agency inbox</h2>
      {inbox.error && <Notice tone="danger">{inbox.error}</Notice>}
      {newestFirst.length === 0 && <Notice tone="info">No requests yet. New ones appear here by themselves.</Notice>}
      {newestFirst.map((a) => (
        <AssignmentCard key={a.id} assignment={a} />
      ))}
    </div>
  );
}
