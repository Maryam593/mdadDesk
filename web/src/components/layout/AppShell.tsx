import { NavLink, Outlet } from "react-router-dom";
import { cx } from "@/components/ui/tone";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Logo } from "./Logo";
import { StatusBanners } from "./StatusBanners";

const LINKS = [
  { to: "/", label: "🆘 Report SOS" },
  { to: "/coordinator", label: "🧭 Coordinator" },
  { to: "/agency", label: "🚒 Agency" },
];

export function AppShell() {
  const { user } = useAuthUser();
  // Last link: "Login", or who is signed in (e.g. "👤 coordinator"); it opens the sign-out page.
  const account = { to: "/login", label: user?.email ? `👤 ${user.email.split("@")[0]}` : "🔑 Login" };

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-[1100] bg-ink shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/">
            <Logo light />
          </NavLink>
          <nav className="-mx-1 flex gap-1 overflow-x-auto text-sm">
            {[...LINKS, account].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                className={({ isActive }) =>
                  cx(
                    "whitespace-nowrap rounded-full px-3.5 py-1.5 font-medium transition",
                    isActive ? "bg-white text-ink" : "text-slate-300 hover:bg-white/10 hover:text-white",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-4 px-4 py-6">
        <StatusBanners />
        <Outlet />
      </main>
      <footer className="pb-16 pt-2 text-center text-xs text-slate-500">
        Prototype for drills and demos. In real danger also call 1122 · 16 · 15.
      </footer>
    </div>
  );
}
