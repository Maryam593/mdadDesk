import type { Incident } from "@shared";
import { cx } from "@/components/ui/tone";
import { HELP_STEPS, helpStep, onTheWayText } from "@/lib/helpSteps";

/** The reporter's checklist: done steps are filled, the current one is bold. */
export function HelpProgress({ incident }: { incident: Incident }) {
  const current = helpStep(incident);

  return (
    <ol className="space-y-3">
      {HELP_STEPS.map((label, index) => {
        const done = index <= current;
        const text = index === 3 && done ? onTheWayText(incident) : label;
        return (
          <li
            key={label}
            className={cx(
              "flex items-center gap-3 text-sm",
              !done && "text-slate-400",
              index === current && "font-semibold",
            )}
          >
            <span className={cx("h-3 w-3 shrink-0 rounded-full", done ? "bg-brand" : "bg-slate-200")} />
            {text}
          </li>
        );
      })}
    </ol>
  );
}
