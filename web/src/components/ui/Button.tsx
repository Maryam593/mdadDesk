import type { ButtonHTMLAttributes } from "react";
import { cx } from "./tone";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "sos";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-sm hover:brightness-110",
  secondary: "bg-white text-slate-800 border border-slate-300 hover:bg-slate-50",
  danger: "bg-danger text-white shadow-sm hover:brightness-110",
  ghost: "text-slate-700 hover:bg-slate-100",
  // Big SOS tiles on the report page
  sos: "flex-col bg-linear-to-br from-rose-500 to-red-700 text-white shadow-md hover:brightness-110 active:scale-95",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  busy?: boolean;
}

export function Button({ variant = "primary", busy, disabled, className, children, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || busy}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold",
        "transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        className,
      )}
    >
      {busy ? "…" : children}
    </button>
  );
}
