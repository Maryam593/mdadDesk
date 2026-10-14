import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/lib/labels";
import { TONE_CLASSES, cx } from "./tone";

interface Props {
  tone?: Tone;
  icon?: LucideIcon; // optional icon on the left
  children: ReactNode;
}

/** Full-width message strip: offline state, delivery state, config warnings, errors. */
export function Notice({ tone = "info", icon: Icon, children }: Props) {
  return (
    <div role="status" className={cx("flex items-start gap-2 rounded-xl border px-4 py-2.5 text-sm", TONE_CLASSES[tone])}>
      {Icon && <Icon size={18} className="mt-px shrink-0" aria-hidden />}
      <div>{children}</div>
    </div>
  );
}
