import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

interface Props {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export function ReportForm({ onSubmit, disabled }: Props) {
  const [text, setText] = useState("");

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handle} className="space-y-3">
      <TextField
        multiline
        label="What is happening and where? (English, اردو, or Roman Urdu)"
        rows={4}
        maxLength={2000}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g. Plaza ki second floor, shop 24 ke paas dhuaan hai. Hum 3 log hain."
      />
      <Button type="submit" variant="danger" disabled={disabled || !text.trim()} className="w-full sm:w-auto">
        Send SOS report
      </Button>
    </form>
  );
}
