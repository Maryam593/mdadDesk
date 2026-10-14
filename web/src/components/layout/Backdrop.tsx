// Soft background behind every page: a few slow, flowing lines (like map contours / signal waves)
// over a light gradient. Pure SVG + CSS (styles/effects.css), so it is cheap on old phones.

const LINES = [
  "M-100 120 C 200 40, 400 220, 700 120 S 1200 40, 1600 140",
  "M-100 260 C 250 180, 450 360, 760 250 S 1250 170, 1600 280",
  "M-100 520 C 220 440, 480 620, 800 510 S 1300 430, 1600 540",
  "M-100 700 C 260 620, 520 800, 840 690 S 1320 610, 1600 720",
];

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-slate-100 via-white to-rose-50/60">
      <svg className="h-full w-full" viewBox="0 0 1500 800" preserveAspectRatio="xMidYMid slice">
        {LINES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i % 2 ? "#e11d2e" : "#0f766e"}
            strokeOpacity={0.12}
            strokeWidth={2}
            className="flow-line"
            style={{ animationDelay: `${i * -7}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
