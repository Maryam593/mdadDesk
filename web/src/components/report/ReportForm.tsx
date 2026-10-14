import { useState, type ReactNode } from "react";
import type { IncidentType } from "@shared";
import { TextArea } from "@/components/ui/TextField";
import { TYPE_INFO } from "@/lib/labels";
import { QuickTypeButtons } from "./QuickTypeButtons";

interface Props {
  onSubmit: (text: string, type: IncidentType) => void;
  disabled?: boolean;
}

// Numbered heading, e.g. "① Add details".
function StepLabel({ n, children }: { n: number; children: ReactNode }) {
  return (
    <p className="mb-2 flex items-center gap-2 text-sm font-bold text-ink">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-white">{n}</span>
      {children}
    </p>
  );
}

/** Optional details box + one-tap tiles. Tapping a tile sends the SOS (with the details, if any). */
export function ReportForm({ onSubmit, disabled }: Props) {
  const [text, setText] = useState("");

  const send = (type: IncidentType) => {
    // No details typed? Send the tile's name so the coordinator still gets a message.
    const message = text.trim() || `${TYPE_INFO[type].emoji} ${TYPE_INFO[type].name} (one-tap SOS, no details)`;
    onSubmit(message, type);
    setText("");
  };

  return (
    <div className="space-y-5">
      <div>
        <StepLabel n={1}>Add details if you can (optional)</StepLabel>
        <TextArea
          label="Where exactly, how many people? English, اردو or Roman Urdu"
          rows={3}
          maxLength={2000}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Second floor, shop 24 ke paas dhuaan hai. Hum 3 log hain."
        />
      </div>
      <div>
        <StepLabel n={2}>Tap what is happening: SOS + location are sent at once</StepLabel>
        <QuickTypeButtons onPick={send} disabled={disabled} />
      </div>
    </div>
  );
}
