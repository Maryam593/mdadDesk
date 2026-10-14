import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface Props {
  page: number; // 0-based, from usePages
  pageCount: number;
  goTo: (page: number) => void;
}

/** "‹ Prev · Page 2 of 5 · Next ›" under a list. Hidden when everything fits on one page. */
export function Pager({ page, pageCount, goTo }: Props) {
  if (pageCount <= 1) return null;

  return (
    <div className="mt-3 flex items-center justify-between gap-2 text-sm">
      <Button variant="ghost" disabled={page === 0} onClick={() => goTo(page - 1)}>
        <ChevronLeft size={16} aria-hidden /> Prev
      </Button>
      <span className="text-slate-500">
        Page {page + 1} of {pageCount}
      </span>
      <Button variant="ghost" disabled={page === pageCount - 1} onClick={() => goTo(page + 1)}>
        Next <ChevronRight size={16} aria-hidden />
      </Button>
    </div>
  );
}
