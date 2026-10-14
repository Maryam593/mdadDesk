import { where } from "firebase/firestore";
import type { Assignment } from "@shared";
import { Notice } from "@/components/ui/Notice";
import { AssignmentCard } from "@/components/agency/AssignmentCard";
import { NewRequestAlert } from "@/components/alert/NewRequestAlert";
import { GlobeBanner } from "./GlobeBanner";
import { Pager } from "@/components/ui/Pager";
import { usePages } from "@/hooks/usePages";
import { useClaims } from "@/hooks/useClaims";
import { useCollection } from "@/hooks/useCollection";

/** Agency inbox: help requests sent to the signed-in agency, newest first. */
export function AgencyInbox() {
  const { agencyId } = useClaims(); // RoleGate already checked this is an agency
  const inbox = useCollection<Assignment>(
    agencyId ? "assignments" : null,
    agencyId ? [where("agencyId", "==", agencyId)] : [],
    agencyId ?? "",
  );

  const newestFirst = [...inbox.data].sort((a, b) => b.updatedAt - a.updatedAt);
  const pages = usePages(newestFirst, 5);
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <NewRequestAlert assignments={inbox.data} ready={agencyId !== null && !inbox.loading} />
      <GlobeBanner assignments={inbox.data} />
      <h2 className="text-lg font-semibold">Requests</h2>
      {inbox.error && <Notice tone="danger">{inbox.error}</Notice>}
      {newestFirst.length === 0 && <Notice tone="info">No requests yet. A request appears here (with a siren) after the coordinator verifies an SOS and taps "Send" for your agency.</Notice>}
      {pages.visible.map((a) => (
        <AssignmentCard key={a.id} assignment={a} />
      ))}
      <Pager page={pages.page} pageCount={pages.pageCount} goTo={pages.goTo} />
    </div>
  );
}
