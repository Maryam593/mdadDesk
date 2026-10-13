import { Notice } from "@/components/ui/Notice";
import { useOnline } from "@/hooks/useOnline";
import { isFirebaseConfigured } from "@/lib/firebase";

/** App-wide warnings shown above every page. */
export function StatusBanners() {
  const online = useOnline();
  return (
    <>
      {!online && (
        <Notice tone="warn">
          You are offline. Reports are saved on this device and sent when the connection returns.
          This is not a replacement for calling emergency services.
        </Notice>
      )}
      {!isFirebaseConfigured && (
        <Notice tone="neutral">
          Dev mode: Firebase is not configured (fill <code>web/.env</code>). Only AI preview works.
        </Notice>
      )}
    </>
  );
}
