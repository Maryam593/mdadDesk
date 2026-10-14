import { useEffect, useState } from "react";
import type { Role } from "@shared";
import { useAuthUser } from "./useAuthUser";

interface Claims {
  role: Role | null;
  agencyId: string | null;
}

/** Who is signed in: role ("coordinator" / "agency") and agencyId, set by api/scripts/seed.ts. */
export function useClaims() {
  const { user, ready } = useAuthUser();
  const [claims, setClaims] = useState<Claims | null>(null);

  useEffect(() => {
    setClaims(null);
    if (!user) return;
    user.getIdTokenResult().then((result) => {
      setClaims({
        role: (result.claims.role as Role) ?? null,
        agencyId: (result.claims.agencyId as string) ?? null,
      });
    });
  }, [user]);

  const loading = !ready || (user !== null && claims === null);
  return { role: claims?.role ?? null, agencyId: claims?.agencyId ?? null, email: user?.email ?? null, loading };
}
