import { useEffect, useRef, useState } from "react";

/**
 * Notices items that appear AFTER the page has loaded (a new SOS, a new help request).
 * Items already there on load never raise an alert.
 * Returns the first new item that still needs attention (`isUrgent`), or null.
 */
export function useArrivals<T extends { id: string }>(
  items: T[],
  ready: boolean, // false while the first data is still loading
  isUrgent: (item: T) => boolean,
) {
  const seen = useRef<Set<string> | null>(null);
  const [newIds, setNewIds] = useState<string[]>([]);

  useEffect(() => {
    if (!ready) return;
    if (seen.current === null) {
      seen.current = new Set(items.map((i) => i.id)); // first load: remember, don't alert
      return;
    }
    const fresh: string[] = [];
    for (const item of items) {
      if (!seen.current.has(item.id)) {
        seen.current.add(item.id);
        fresh.push(item.id);
      }
    }
    if (fresh.length > 0) setNewIds((ids) => [...ids, ...fresh]);
  }, [items, ready]);

  // Look up the live item, so the alert disappears once someone has handled it.
  const current = items.find((i) => newIds.includes(i.id) && isUrgent(i)) ?? null;
  const dismiss = (id: string) => setNewIds((ids) => ids.filter((x) => x !== id));
  return { current, dismiss };
}
