import { useState } from "react";
import type { TourId } from "@/lib/tours";

// Remembers on this device which tours were already seen, so each shows only once.
// Bump TOUR_VERSION after changing lib/tours.ts, so everyone sees the new tour once.
const TOUR_VERSION = 3;
const storageKey = (id: TourId) => `madaddesk.tourSeen.v${TOUR_VERSION}.${id}`;

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
