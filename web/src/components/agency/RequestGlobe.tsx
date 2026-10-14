import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { GeoPoint } from "@shared";
import { DEMO_BUILDING } from "@/lib/building";

const SIZE = 220; // px on screen

// cobe turns the globe with two angles; these point it at a place on Earth.
const facePhi = (lng: number) => Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);
const faceTheta = (lat: number) => (lat * Math.PI) / 180;

/**
 * Grey dotted globe (cobe, WebGL) with a red dot for every open request.
 * It sways gently around the area the requests come from, so the dots stay in view.
 */
export function RequestGlobe({ points }: { points: GeoPoint[] }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointsKey = points.map((p) => `${p.lat},${p.lng}`).join("|"); // redraw only when the dots change

  useEffect(() => {
    if (!canvas.current) return;
    const centre = points[0] ?? DEMO_BUILDING;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const globe = createGlobe(canvas.current, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi: facePhi(centre.lng),
      theta: faceTheta(centre.lat) * 0.6,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.32, 0.36, 0.43], // grey
      markerColor: [0.88, 0.11, 0.18], // theme red
      glowColor: [0.18, 0.22, 0.3],
      markers: points.map((p) => ({ location: [p.lat, p.lng] as [number, number], size: 0.09 })),
    });

    // Sway left and right around the requests.
    let frame = 0;
    const started = performance.now();
    const sway = (now: number) => {
      if (!still) globe.update({ phi: facePhi(centre.lng) + Math.sin((now - started) / 2500) * 0.5 });
      frame = requestAnimationFrame(sway);
    };
    frame = requestAnimationFrame(sway);

    return () => {
      cancelAnimationFrame(frame);
      globe.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsKey]);

  return <canvas ref={canvas} aria-hidden style={{ width: SIZE, height: SIZE }} />;
}
