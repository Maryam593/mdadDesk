// Background behind every page: flowing lines (like map contours / signal waves) over a soft
// gradient. Pure SVG + CSS (styles/effects.css), so it stays cheap on old phones.

const LINE_COUNT = 14;

// One wavy line across the screen at height y; each line bends a little differently.
function wavyLine(i: number): string {
  const y = 30 + i * 58;
  const bend = (i % 2 ? 1 : -1) * (40 + (i % 4) * 22);
  return `M-100 ${y} C 200 ${y - bend}, 450 ${y + bend}, 750 ${y} S 1250 ${y - bend}, 1650 ${y}`;
}

const LINES: string[] = [];
for (let i = 0; i < LINE_COUNT; i++) LINES.push(wavyLine(i));

export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-slate-100 via-white to-rose-50">
      <svg className="h-full w-full" viewBox="0 0 1500 800" preserveAspectRatio="xMidYMid slice">
        {LINES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i % 3 === 0 ? "#e11d2e" : "#0f766e"}
            strokeOpacity={i % 3 === 0 ? 0.4 : 0.32}
            strokeWidth={i % 3 === 0 ? 2.6 : 2}
            className="flow-line"
            style={{ animationDelay: `${i * -5}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
