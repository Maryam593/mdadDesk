import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { startSiren } from "@/lib/siren";
import { showSystemNotification } from "@/lib/systemNotify";

interface Props {
  title: string; // e.g. "NEW SOS"
  body: string; // one line for the phone notification
  onClose: () => void;
  children: ReactNode; // the details and action buttons
}

/** Full-screen flashing red alert with a siren. Give it key={item.id} so each alert restarts. */
export function EmergencyAlert({ title, body, onClose, children }: Props) {
  // Runs once per alert (the key changes for each new one), even if the details update later.
  useEffect(() => {
    const stopSiren = startSiren();
    showSystemNotification(`🚨 ${title}`, body);
    return stopSiren; // stops when the alert closes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div role="alertdialog" className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-pulse bg-red-700/90" />
      <div className="relative w-full max-w-lg space-y-4">
        <h2 className="text-center text-3xl font-black tracking-wide text-white">🚨 {title}</h2>
        {children}
        <div className="text-center">
          <Button variant="secondary" onClick={onClose}>
            Silence and close
          </Button>
        </div>
      </div>
    </div>
  );
}
