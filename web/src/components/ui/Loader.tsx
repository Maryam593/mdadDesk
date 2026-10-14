import { WaveText } from "./WaveText";

/** Spinning rings + a waving label. Use it anywhere something is still loading. */
export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-3 py-2 text-sm text-slate-500">
      <span className="relative h-7 w-7">
        <span className="ring-outer absolute inset-0 rounded-full border-[3px] border-brand/20 border-t-brand" />
        <span className="ring-inner absolute inset-1.5 rounded-full border-[3px] border-danger/20 border-b-danger" />
      </span>
      <WaveText text={label} />
    </div>
  );
}
