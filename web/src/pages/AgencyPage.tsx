import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";

// Day 16: agency inbox — notified incidents with accept / decline / busy actions.
export function AgencyPage() {
  return (
    <Card title="Agency inbox">
      <Notice tone="neutral">
        Coming next: verified incidents assigned to your agency, with accept, decline and busy actions.
      </Notice>
    </Card>
  );
}
