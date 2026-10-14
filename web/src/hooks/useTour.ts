import { useState } from "react";
import type { TourId } from "@/lib/tours";

// Remembers on this device which tours were already seen, so each shows only once.
const storageKey = (id: TourId) => `madaddesk.tourSeen.${id}`;

function alreadySeen(id: TourId): boolean {
  try {
    return localStorage.getItem(storageKey(id)) === "yes";
  } catch {
    return false; // storage blocked: just show the tour
  }
}

export function useTour(id: TourId) {
  const [open, setOpen] = useState(() => !alreadySeen(id));

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(storageKey(id), "yes");
    } catch {
      // ignore: worst case the tour shows again next time
    }
  };

  return { open, close, replay: () => setOpen(true) };
}
