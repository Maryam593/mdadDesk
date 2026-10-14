import { Inbox, LayoutDashboard, Siren, type LucideIcon } from "lucide-react";
import type { Role } from "@shared";

// Who sees which tabs (role-based): each person only sees their own job.
// Signed out = the public, who only need to ask for help.

export interface NavLinkInfo {
  to: string;
  label: string;
  icon: LucideIcon;
}

const REPORT: NavLinkInfo = { to: "/", label: "Report SOS", icon: Siren };
const COORDINATOR: NavLinkInfo = { to: "/coordinator", label: "Coordinator", icon: LayoutDashboard };
const AGENCY: NavLinkInfo = { to: "/agency", label: "Agency inbox", icon: Inbox };

export function tabsFor(role: Role | null): NavLinkInfo[] {
  if (role === "coordinator") return [COORDINATOR];
  if (role === "agency") return [AGENCY];
  return [REPORT];
}

/** Where each role lands right after signing in. */
export function homeFor(role: Role | null): string {
  if (role === "coordinator") return COORDINATOR.to;
  if (role === "agency") return AGENCY.to;
  return REPORT.to;
}
