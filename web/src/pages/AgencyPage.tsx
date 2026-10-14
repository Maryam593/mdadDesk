import { where } from "firebase/firestore";
import type { Assignment } from "@shared";
import { Notice } from "@/components/ui/Notice";
import { AssignmentCard } from "@/components/agency/AssignmentCard";
import { useClaims } from "@/hooks/useClaims";
import { useCollection } from "@/hooks/useCollection";

/** Agency inbox: help requests sent to the signed-in agency, newest first. */
export function AgencyPage() {
  const { role, agencyId, loading } = useClaims();
  const { data, error } = useCollection<Assignment>(
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

  const newestFirst = [...data].sort((a, b) => b.updatedAt - a.updatedAt);
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold">Agency inbox</h2>
      {error && <Notice tone="danger">{error}</Notice>}
      {newestFirst.length === 0 && <Notice tone="info">No requests yet. New ones appear here by themselves.</Notice>}
      {newestFirst.map((a) => (
        <AssignmentCard key={a.id} assignment={a} />
      ))}
    </div>
  );
}
