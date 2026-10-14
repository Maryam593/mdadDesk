import { useState } from "react";

/**
 * Splits a list into pages. Works on any list (incidents, requests, …).
 * If the list shrinks (e.g. items closed), it stays on a page that still exists.
 */
export function usePages<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(page, pageCount - 1);

  return {
    visible: items.slice(current * pageSize, (current + 1) * pageSize),
    page: current, // 0 = first page
    pageCount,
    goTo: setPage,
  };
}
