import { NavLink } from "react-router-dom";
import { cx } from "@/components/ui/tone";
import type { NavLinkInfo } from "@/lib/nav";

interface Props {
  links: NavLinkInfo[];
  stacked?: boolean; // true = one under another (phone menu), false = in a row (desktop)
  onPick?: () => void; // e.g. close the phone menu after choosing
}

/** The header links as pills. Same component for the desktop row and the phone menu. */
export function NavItems({ links, stacked = false, onPick }: Props) {
  return (
    <nav className={cx("flex gap-1 text-sm", stacked && "flex-col")}>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end
          onClick={onPick}
          className={({ isActive }) =>
            cx(
              "whitespace-nowrap rounded-full px-3.5 py-2 font-medium transition",
              stacked && "rounded-xl px-4 py-3 text-base",
              isActive ? "bg-white text-ink" : "text-slate-300 hover:bg-white/10 hover:text-white",
            )
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
