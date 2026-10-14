import { useRef, useState, type ReactNode } from "react";
import { cx } from "./tone";

interface Props {
  onConfirm: () => Promise<void> | void; // runs only after the full hold
  holdMs?: number;
  tone?: "danger" | "primary";
  children: ReactNode;
}

const TONES = {
  danger: { box: "border-danger text-danger", fill: "bg-danger/20" },
  primary: { box: "border-brand text-brand", fill: "bg-brand/20" },
};

/**
 * Press and HOLD to confirm (a fill shows progress). Letting go early cancels.
 * For actions that must not happen by a slip of the finger, e.g. closing a case.
 */
export function HoldButton({ onConfirm, holdMs = 1200, tone = "danger", children }: Props) {
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    setHolding(true);
    timer.current = setTimeout(async () => {
      setHolding(false);
      try {
        await onConfirm();
      } catch (err) {
        console.error("Hold action failed:", err);
      }
    }, holdMs);
  };
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    setHolding(false);
  };

  return (
    <button
      type="button"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && !e.repeat && start()}
      onKeyUp={cancel}
      className={cx("relative select-none overflow-hidden rounded-xl border-2 bg-white px-4 py-2 text-sm font-semibold", TONES[tone].box)}
      style={{ ["--hold-ms" as string]: `${holdMs}ms` }}
    >
      {holding && <span className={cx("hold-fill absolute inset-y-0 left-0", TONES[tone].fill)} />}
      <span className="relative">{holding ? "Keep holding…" : children}</span>
    </button>
  );
}
