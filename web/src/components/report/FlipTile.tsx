import { useEffect, useState } from "react";
import { cx } from "@/components/ui/tone";

interface Props {
  emoji: string;
  name: string;
  delayMs: number; // when this tile turns over by itself (tiles turn one after another)
  disabled?: boolean;
  onClick: () => void; // sends the SOS, whichever side is showing
}

/**
 * One SOS tile with a flip: the front shows the name, then it turns over to show the emoji.
 * Hovering with a mouse turns it again. The flip styles live in index.css (.flip …).
 */
export function FlipTile({ emoji, name, delayMs, disabled, onClick }: Props) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <button
      type="button"
      aria-label={`Send SOS: ${name}`}
      disabled={disabled}
      onClick={onClick}
      className={cx("flip h-28 w-full rounded-2xl active:scale-95 disabled:opacity-50", flipped && "flipped")}
    >
      <span className="flip-inner relative block h-full w-full">
        <span className="flip-face absolute inset-0 grid place-items-center rounded-2xl bg-linear-to-br from-rose-500 to-red-700 text-2xl font-extrabold text-white shadow-md">
          {name}
        </span>
        <span className="flip-face flip-back absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-white shadow-md ring-2 ring-danger">
          <span className="text-5xl leading-none">{emoji}</span>
          <span className="text-sm font-bold text-danger">{name}</span>
        </span>
      </span>
    </button>
  );
}
