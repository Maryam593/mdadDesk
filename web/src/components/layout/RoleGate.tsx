import type { ReactNode } from "react";
import { Notice } from "@/components/ui/Notice";
import { useClaims } from "@/hooks/useClaims";
import { isFirebaseConfigured } from "@/lib/firebase";

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
  if (!isFirebaseConfigured) return <>{children}</>; // sample mode: no accounts needed
  if (claims.loading) return <p className="text-sm text-slate-500">Loading…</p>;
  if (claims.role === role) return <>{children}</>;

  return (
    <Notice tone="warn">
      {claims.email ? `You are signed in as ${claims.email}. ` : "You are not signed in. "}
      This page needs {WHO[role]}: use the Login tab. Tip: all tabs of one browser share one login,
      so open a second account in an Incognito window (Ctrl+Shift+N).
    </Notice>
  );
}
