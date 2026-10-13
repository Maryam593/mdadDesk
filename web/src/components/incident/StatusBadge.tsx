import type { IncidentStatus } from "@shared";
import { Badge } from "@/components/ui/Badge";
import { STATUS_TONE } from "@/lib/labels";

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return <Badge tone={STATUS_TONE[status]}>{status}</Badge>;
}
