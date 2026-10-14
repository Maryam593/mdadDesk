import { useState, type PointerEvent } from "react";

/**
 * Tilts a card a few degrees toward the mouse, like a real card in your hand.
 * Touch screens get no tilt (fingers don't hover).
 */
export function useTilt(maxDegrees = 6) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const across = (e.clientX - box.left) / box.width - 0.5; // -0.5 (left) … 0.5 (right)
    const down = (e.clientY - box.top) / box.height - 0.5; // -0.5 (top) … 0.5 (bottom)
    setTilt({ x: -down * 2 * maxDegrees, y: across * 2 * maxDegrees });
  };

  const onPointerLeave = () => setTilt({ x: 0, y: 0 });

  return {
    style: { transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` },
    onPointerMove,
    onPointerLeave,
  };
}
