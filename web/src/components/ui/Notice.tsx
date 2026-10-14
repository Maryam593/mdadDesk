import type { ReactNode } from "react";
import type { Tone } from "@/lib/labels";
import { TONE_CLASSES, cx } from "./tone";

/** Full-width message strip: offline state, delivery state, config warnings, errors. */
export function Notice({ tone = "info", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <div role="status" className={cx("rounded-xl border px-4 py-2.5 text-sm", TONE_CLASSES[tone])}>
      {children}
    </div>
  );
}
