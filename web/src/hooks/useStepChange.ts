import { useEffect, useRef, useState } from "react";

/**
 * Notices when the reporter's step goes UP while the page is open
 * (e.g. "Help requested" → "on the way"). The step already showing on load doesn't count.
 */
export function useStepChange(step: number) {
  const last = useRef<number | null>(null);
  const [changedTo, setChangedTo] = useState<number | null>(null);

  useEffect(() => {
    if (last.current !== null && step > last.current) setChangedTo(step);
    last.current = step;
  }, [step]);

  return { changedTo, clear: () => setChangedTo(null) };
}
