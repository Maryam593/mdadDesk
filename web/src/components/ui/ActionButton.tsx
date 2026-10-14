import { useState, type ComponentProps } from "react";
import { Button } from "./Button";

interface Props extends Omit<ComponentProps<typeof Button>, "onClick" | "busy"> {
  onClick: () => Promise<void>; // the save to run when tapped
}

/** A Button that shows "…" while saving and a short message if the save fails. */
export function ActionButton({ onClick, ...rest }: Props) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const run = async () => {
    setBusy(true);
    setFailed(false);
    try {
      await onClick();
    } catch (err) {
      console.error("Action failed:", err);
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <Button {...rest} busy={busy} onClick={run} />
      {failed && <span className="text-xs text-danger">Failed, try again</span>}
    </span>
  );
}
