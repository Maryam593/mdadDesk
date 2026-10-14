import type { ReactNode } from "react";
import { cx } from "./tone";

type OverlayTone = "danger" | "good" | "neutral";

const BACKDROP: Record<OverlayTone, string> = {
  danger: "animate-pulse bg-red-700/90", // emergency: flashing red
  good: "bg-emerald-700/90", // good news for the reporter
  neutral: "bg-slate-900/60", // tour / information
};

/** A full-screen layer on top of everything (map included), with the content centred. */
export function Overlay({ tone, children }: { tone: OverlayTone; children: ReactNode }) {
  return (
    <div role="dialog" className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className={cx("absolute inset-0", BACKDROP[tone])} />
      <div className="relative w-full max-w-lg space-y-4">{children}</div>
    </div>
  );
}
