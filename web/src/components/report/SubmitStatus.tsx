import type { AiStatus, DeliveryStatus } from "@shared";
import { Notice } from "@/components/ui/Notice";
import type { Tone } from "@/lib/labels";

const DELIVERY: Record<DeliveryStatus, [Tone, string]> = {
  pending: ["warn", "SOS pending — not delivered yet. Keep this page open; it will send when online."],
  sent: ["success", "SOS delivered to the coordinator."],
  failed: ["danger", "SOS could not be saved. Call emergency services directly."],
};

const AI: Record<AiStatus, [Tone, string]> = {
  pending: ["info", "Reading your report…"],
  ok: ["neutral", "Details extracted. The coordinator will review them."],
  failed: ["neutral", "Automatic reading unavailable — the coordinator will read your message directly."],
};

export function SubmitStatus({ delivery, ai }: { delivery: DeliveryStatus | null; ai: AiStatus | null }) {
  return (
    <div className="space-y-2">
      {delivery && <Notice tone={DELIVERY[delivery][0]}>{DELIVERY[delivery][1]}</Notice>}
      {ai && <Notice tone={AI[ai][0]}>{AI[ai][1]}</Notice>}
    </div>
  );
}
