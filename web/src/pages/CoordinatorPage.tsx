import { CoordinatorDesk } from "@/components/coordinator/CoordinatorDesk";
import { RoleGate } from "@/components/layout/RoleGate";
import { Tour } from "@/components/tour/Tour";

export function CoordinatorPage() {
  return (
    <>
      <Tour id="coordinator" />
      <RoleGate role="coordinator">
        <CoordinatorDesk />
      </RoleGate>
    </>
  );
}
