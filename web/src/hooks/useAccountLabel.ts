import type { Agency, AgencyKind } from "@shared";
import { useClaims } from "./useClaims";
import { useDoc } from "./useDoc";

const STAFF: Record<AgencyKind, string> = {
  fire: "Fire staff",
  ambulance: "Ambulance staff",
  police: "Police staff",
};

/**
 * A friendly name for the signed-in person, for the header: "Coordinator", "Fire staff", …
 * (instead of the email). null when nobody is signed in.
 */
export function useAccountLabel(): string | null {
  const { role, agencyId, email } = useClaims();
  const agency = useDoc<Agency>(agencyId ? `agencies/${agencyId}` : null);

  if (!email) return null;
  if (role === "coordinator") return "Coordinator";
  if (role === "agency" && agency.data) return STAFF[agency.data.kind];
  return email.split("@")[0]; // still loading, or an account without a role
}
