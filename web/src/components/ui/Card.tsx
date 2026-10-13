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
    <section className={cx("rounded-xl border border-slate-200 bg-white p-4 shadow-sm", className)}>
      {(title || actions) && (
        <header className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold">{title}</h2>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
