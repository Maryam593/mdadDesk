import { cx } from "@/components/ui/tone";

/** The MadadDesk mark (public/icon.svg, same file as the app icon) + name. */
export function Logo({ light = false, size = "md" }: { light?: boolean; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/icon.svg" alt="" className={cx("rounded-xl shadow-sm", big ? "h-14 w-14" : "h-9 w-9")} />
      <span className={cx("font-extrabold tracking-tight", big ? "text-3xl" : "text-xl", light ? "text-white" : "text-ink")}>
        Madad<span className="font-medium text-rose-400">Desk</span>
      </span>
    </span>
  );
}
