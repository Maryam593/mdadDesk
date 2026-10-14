import { NavLink, Outlet } from "react-router-dom";
import { cx } from "@/components/ui/tone";
import { StatusBanners } from "./StatusBanners";
import { useAuthUser } from "@/hooks/useAuthUser";

const LINKS = [
  { to: "/", label: "Report SOS" },
  { to: "/coordinator", label: "Coordinator" },
  { to: "/agency", label: "Agency" },
];

export function AppShell() {
  const { user } = useAuthUser();
  // Last link: "Login", or who is signed in (e.g. "👤 coordinator"); it opens the sign-out page.
  const account = { to: "/login", label: user?.email ? `👤 ${user.email.split("@")[0]}` : "Login" };

  return (
    <div className="min-h-dvh">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-3">
          <span className="text-lg font-bold text-brand">MadadDesk</span>
          <nav className="flex flex-wrap gap-1 text-sm">
            {[...LINKS, account].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  cx("rounded-md px-3 py-1.5", isActive ? "bg-brand-soft text-brand" : "hover:bg-slate-100")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <StatusBanners />
        <Outlet />
      </main>
    </div>
  );
}
