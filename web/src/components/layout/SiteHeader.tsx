import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { tabsFor } from "@/lib/nav";
import { Logo } from "./Logo";
import { NavItems } from "./NavItems";

/**
 * Navy top bar. Wide screens: links in a row. Phones: a ☰ button that opens the links
 * as a list under the bar. Each person only sees their own tabs (lib/nav.ts).
 */
export function SiteHeader() {
  const { role, email } = useClaims();
  const [menuOpen, setMenuOpen] = useState(false);
  const account = { to: "/login", label: email ? `👤 ${email.split("@")[0]}` : "🔑 Staff login" };
  const links = [...tabsFor(role), account];

  return (
    <header className="sticky top-0 z-[1100] bg-ink shadow-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <Logo light />
        </NavLink>
        <div className="hidden sm:block">
          <NavItems links={links} />
        </div>
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="grid h-11 w-11 place-items-center rounded-xl text-2xl text-white hover:bg-white/10 sm:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 px-4 pb-4 pt-2 sm:hidden">
          <NavItems links={links} stacked onPick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
