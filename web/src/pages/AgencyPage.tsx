import { AgencyInbox } from "@/components/agency/AgencyInbox";
import { RoleGate } from "@/components/layout/RoleGate";
import { Tour } from "@/components/tour/Tour";

export function AgencyPage() {
  return (
    <>
      <Tour id="agency" />
      <RoleGate role="agency">
        <AgencyInbox />
      </RoleGate>
    </>
  );
}
