import { useState } from "react";
import type { IncidentType } from "@shared";
import { TextArea } from "@/components/ui/TextField";
import { TYPE_LABELS } from "@/lib/labels";
import { QuickTypeButtons } from "./QuickTypeButtons";

interface Props {
  onSubmit: (text: string, type: IncidentType) => void;
  disabled?: boolean;
}

/** Optional details box + one-tap buttons. Tapping a button sends the SOS (with the details, if any). */
export function ReportForm({ onSubmit, disabled }: Props) {
  const [text, setText] = useState("");

  const send = (type: IncidentType) => {
    // No details typed? Send the button's name so the coordinator still gets a message.
    const message = text.trim() || `${TYPE_LABELS[type]} (one-tap SOS, no details)`;
    onSubmit(message, type);
    setText("");
  };

  return (
    <div className="space-y-4">
      <TextArea
        label="Details, optional: where exactly, how many people? (English, اردو, or Roman Urdu)"
        rows={3}
        maxLength={2000}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Second floor, shop 24 ke paas dhuaan hai. Hum 3 log hain."
      />
      <p className="text-sm font-semibold">Tap what is happening. Your SOS and location are sent at once.</p>
      <QuickTypeButtons onPick={send} disabled={disabled} />
    </div>
  );
}
