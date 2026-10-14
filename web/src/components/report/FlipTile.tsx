import { useState } from "react";
import { cx } from "@/components/ui/tone";
import { useTilt } from "@/hooks/useTilt";

interface Props {
  emoji: string;
  name: string;
  disabled?: boolean;
  onSend: () => void;
}

// Both faces fill the card; only the one facing you can be tapped. Flip styles: index.css (.flip …).
const FACE = "flip-face absolute inset-0 flex flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl";
const FRONT = "border border-slate-200 bg-white shadow-[0_5px_0_#e2e8f0,0_16px_24px_-12px_rgba(15,23,42,0.35)]";
const BACK = "bg-linear-to-br from-rose-500 to-red-700 text-white shadow-[0_5px_0_#9f1239,0_16px_24px_-12px_rgba(15,23,42,0.45)]";

/**
 * SOS card. Tap it: it flips over (spring + light sweep) and shows "Send SOS".
 * Two taps on purpose, so a pocket or a child can't send an SOS by accident.
 */
export function FlipTile({ emoji, name, disabled, onSend }: Props) {
  const [flipped, setFlipped] = useState(false);
  const tilt = useTilt();

  const send = () => {
    onSend();
    setFlipped(false);
  };

  return (
    <div className="flip h-36" onPointerMove={tilt.onPointerMove} onPointerLeave={tilt.onPointerLeave}>
      <div className="tilt h-full" style={tilt.style}>
        <div className={cx("flip-inner relative h-full", flipped && "flipped")}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setFlipped(true)}
            className={cx(FACE, FRONT, "face-front disabled:opacity-50", flipped && "pointer-events-none")}
          >
            <span className="sheen" />
            <span className="text-5xl leading-none">{emoji}</span>
            <span className="text-lg font-extrabold text-ink">{name}</span>
            <span className="text-xs text-slate-500">Tap to send</span>
          </button>
          <div className={cx(FACE, BACK, "flip-back", !flipped && "pointer-events-none")} aria-hidden={!flipped}>
            <span className="sheen" />
            <button type="button" onClick={send} className="rounded-xl bg-white px-4 py-2 font-extrabold text-danger shadow">
              Send {emoji} SOS
            </button>
            <span className="text-[11px] opacity-90">with your location</span>
            <button type="button" onClick={() => setFlipped(false)} className="text-xs underline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
