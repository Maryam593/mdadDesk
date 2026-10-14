import type { Incident } from "@shared";
import { Pager } from "@/components/ui/Pager";
import { cx } from "@/components/ui/tone";
import { usePages } from "@/hooks/usePages";
import { timeAgo } from "@/lib/labels";
import { StatusBadge } from "./StatusBadge";

interface Props {
  incidents: Incident[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const PER_PAGE = 6;

export function IncidentList({ incidents, selectedId, onSelect }: Props) {
  const pages = usePages(incidents, PER_PAGE);
  if (!incidents.length) return <p className="text-sm text-slate-500">No incidents yet.</p>;
  return (
    <>
      <ul className="space-y-2">
        {pages.visible.map((i) => (
          <li key={i.id}>
            <button
              onClick={() => onSelect(i.id)}
              className={cx(
                "w-full rounded-lg border p-3 text-left text-sm transition",
                i.id === selectedId ? "border-brand bg-brand-soft" : "border-slate-200 bg-white hover:bg-slate-50",
              )}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <StatusBadge status={i.status} />
                <span className="text-xs text-slate-500">{timeAgo(i.createdAt)}</span>
              </div>
              <p className="line-clamp-2">{i.summary}</p>
            </button>
          </li>
        ))}
      </ul>
      <Pager page={pages.page} pageCount={pages.pageCount} goTo={pages.goTo} />
    </>
  );
}
