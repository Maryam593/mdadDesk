// Calm background behind every page: a soft gradient, two blurred colour glows and a very
// faint dot grid. No movement, so it never competes with the content.
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-linear-to-b from-slate-50 to-slate-100">
      <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-danger/10 blur-3xl" />
      <div className="dot-grid absolute inset-0" />
    </div>
  );
}
