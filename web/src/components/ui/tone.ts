import type { Tone } from "@/lib/labels";

/** Single source of colour per tone — used by Badge, Notice and anything status-coloured. */
export const TONE_CLASSES: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  info: "bg-sky-50 text-sky-800 border-sky-200",
  warn: "bg-amber-50 text-amber-800 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
