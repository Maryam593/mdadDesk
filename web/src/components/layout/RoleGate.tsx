import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { useClaims } from "@/hooks/useClaims";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

type StaffRole = "coordinator" | "agency";

const WHO: Record<StaffRole, string> = {
  coordinator: "the coordinator account (coordinator@madaddesk.demo)",
  agency: "an agency account, e.g. fire-saddar@madaddesk.demo",
};

/**
 * Shows the page only to the right kind of account; otherwise a clear message
 * instead of Firebase's "Missing or insufficient permissions".
 */
export function RoleGate({ role, children }: { role: StaffRole; children: ReactNode }) {
  const claims = useClaims();
  const navigate = useNavigate();
  if (!isFirebaseConfigured) return <>{children}</>; // sample mode: no accounts needed
  if (claims.loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (claims.role === role) return <>{children}</>;

  // Sign out (if needed) and open the login page, ready for the right account.
  const switchAccount = async () => {
    if (auth && claims.email) await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="space-y-3">
      <Notice tone="warn">
        {claims.email ? `This window is signed in as ${claims.email}. ` : "You are not signed in. "}
        This page needs {WHO[role]}. Tip: all tabs of one browser share one login, so use an
        Incognito window (Ctrl+Shift+N) for a second account.
      </Notice>
      <Button onClick={switchAccount}>{claims.email ? "Switch account" : "Go to login"}</Button>
    </div>
  );
}
