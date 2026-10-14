import { useState, type ComponentProps } from "react";
import { ActionButton } from "./ActionButton";

const SPARKS = 12;
const COLORS = ["#e11d2e", "#f97316", "#facc15", "#0f766e"];

// One burst: sparks spread evenly around a circle, each with its own direction.
function makeBurst() {
  const sparks = [];
  for (let i = 0; i < SPARKS; i++) {
    const angle = (i / SPARKS) * Math.PI * 2;
    const distance = 40 + Math.random() * 30;
    sparks.push({ dx: Math.cos(angle) * distance, dy: Math.sin(angle) * distance, color: COLORS[i % COLORS.length] });
  }
  return sparks;
}

/** An ActionButton that bursts sparks when pressed. For happy moments, e.g. "On the way". */
export function ParticleButton({ onClick, ...rest }: ComponentProps<typeof ActionButton>) {
  const [burst, setBurst] = useState<ReturnType<typeof makeBurst>>([]);

  const press = async () => {
    setBurst(makeBurst());
    setTimeout(() => setBurst([]), 700); // sparks are gone after their animation
    await onClick();
  };

  return (
    <span className="relative inline-flex">
      <ActionButton {...rest} onClick={press} />
      {burst.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="spark pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
          style={{ background: s.color, ["--dx" as string]: `${s.dx}px`, ["--dy" as string]: `${s.dy}px` }}
        />
      ))}
    </span>
  );
}
