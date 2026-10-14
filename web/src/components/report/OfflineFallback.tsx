import { useEffect, useState } from "react";
import { MessageSquareText, Phone, WifiOff } from "lucide-react";
import type { GeoPoint } from "@shared";
import { useOnline } from "@/hooks/useOnline";
import { smsLink } from "@/lib/sms";

interface Props {
  message: string;
  point: GeoPoint | null;
}

const BIG = "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-base font-bold shadow-sm";

/**
 * Shown while the SOS is NOT delivered yet: right away when offline, or after 5 s on Wi-Fi without
 * internet. The SOS still waits on the phone and goes by itself when internet returns, but in an
 * emergency these work with only mobile signal.
 */
export function OfflineFallback({ message, point }: Props) {
  const online = useOnline();
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 5000);
    return () => clearTimeout(timer);
  }, []);
  if (online && !slow) return null;

  return (
    <section className="space-y-3 rounded-2xl border-2 border-danger bg-red-50 p-4">
      <p className="flex items-center gap-2 font-bold text-danger">
        <WifiOff size={18} aria-hidden /> No internet: don't wait. Send it another way:
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a href={smsLink(message, point)} className={`${BIG} bg-danger text-white`}>
          <MessageSquareText size={20} aria-hidden /> Send by SMS
        </a>
        <a href="tel:1122" className={`${BIG} border-2 border-danger bg-white text-danger`}>
          <Phone size={20} aria-hidden /> Call 1122
        </a>
      </div>
      <p className="text-xs text-slate-600">
        SMS and calls need only mobile signal. Your SOS is also saved here and sends itself when internet is back.
      </p>
    </section>
  );
}
