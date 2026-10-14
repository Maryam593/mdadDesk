import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Overlay } from "@/components/ui/Overlay";
import { useTour } from "@/hooks/useTour";
import { TOURS, type TourId } from "@/lib/tours";

/** First-visit guide for a page. Afterwards a small "How it works" button replays it. */
export function Tour({ id }: { id: TourId }) {
  const { open, close, replay } = useTour(id);
  const [index, setIndex] = useState(0);
  const steps = TOURS[id];

  if (!open) {
    const restart = () => {
      setIndex(0);
      replay();
    };
    return (
      <button
        onClick={restart}
        className="fixed bottom-4 right-4 z-[1500] rounded-full bg-brand px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        ❓ How it works
      </button>
    );
  }

  const step = steps[index];
  const isLast = index === steps.length - 1;
  return (
    <Overlay tone="neutral">
      <Card>
        <div className="space-y-3 text-center">
          <div className="text-5xl">{step.emoji}</div>
          <h2 className="text-lg font-semibold">{step.title}</h2>
          <p className="text-sm text-slate-600">{step.text}</p>
          <p className="text-xs text-slate-400">
            {index + 1} / {steps.length}
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="ghost" onClick={close}>Skip</Button>
            <Button onClick={() => (isLast ? close() : setIndex(index + 1))}>{isLast ? "Got it" : "Next"}</Button>
          </div>
        </div>
      </Card>
    </Overlay>
  );
}
