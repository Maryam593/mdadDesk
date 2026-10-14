import type { ReactNode } from "react";
import { cx } from "./tone";

interface Props {
  title?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Card({ title, actions, className, children }: Props) {
  return (
    <section className={cx("rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm", className)}>
      {(title || actions) && (
        <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-ink">{title}</h2>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
