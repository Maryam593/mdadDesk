import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const INPUT = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-2 focus:outline-brand";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; multiline?: false };
type AreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; multiline: true };

/** Labelled input or textarea — the only form-field component in the app. */
export function TextField(props: InputProps | AreaProps) {
  const { label, multiline, ...rest } = props;
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {multiline ? (
        <textarea {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} className={INPUT} />
      ) : (
        <input {...(rest as InputHTMLAttributes<HTMLInputElement>)} className={INPUT} />
      )}
    </label>
  );
}
