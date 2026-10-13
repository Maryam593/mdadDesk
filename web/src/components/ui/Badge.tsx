import type { ReactNode } from "react";
import type { Tone } from "@/lib/labels";
import { TONE_CLASSES, cx } from "./tone";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={cx("inline-block rounded-full border px-2 py-0.5 text-xs font-medium", TONE_CLASSES[tone])}>
      {children}
    </span>
  );
}
