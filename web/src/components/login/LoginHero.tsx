import { Link } from "react-router-dom";
import { LayoutDashboard, Lock, Siren } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

const POINTS = [
  { icon: LayoutDashboard, text: "Coordinators verify every SOS and decide who goes." },
  { icon: Siren, text: "Fire, Ambulance and Police get a red alert with the exact spot." },
  { icon: Lock, text: "Each person sees only their own job." },
];

/** Left side of the login page: what this place is, for whom. */
export function LoginHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-ink via-slate-800 to-rose-900 p-8 text-white shadow-xl">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-danger/30 blur-3xl" />
      <div className="relative space-y-6">
        <Logo light size="lg" />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-rose-300">Staff control room</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight">Every second counts. So does every report.</h1>
        </div>
        <ul className="space-y-3">
          {POINTS.map((p) => (
            <li key={p.text} className="flex gap-3 text-sm text-slate-200">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                <p.icon size={16} aria-hidden />
              </span>
              <span className="pt-1">{p.text}</span>
            </li>
          ))}
        </ul>
        <p className="rounded-xl bg-white/10 px-4 py-3 text-sm">
          In danger? You don't need an account.{" "}
          <Link to="/" className="font-bold text-rose-300 underline">Report an SOS →</Link>
        </p>
      </div>
    </section>
  );
}
