import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { FieldGrid } from "@/components/incident/FieldGrid";
import { ReportForm } from "@/components/report/ReportForm";
import { SubmitStatus } from "@/components/report/SubmitStatus";
import { MyReports } from "@/components/track/MyReports";
import { useReportSubmit } from "@/hooks/useReportSubmit";

export function ReportPage() {
  const { delivery, ai, extraction, question, location, submit } = useReportSubmit();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Card title="Report an emergency in this building">
        <ReportForm onSubmit={submit} disabled={delivery === "pending" || ai === "pending"} />
      </Card>
      <SubmitStatus delivery={delivery} ai={ai} location={location} />
      {extraction && (
        <Card title="What we understood">
          <div className="space-y-3">
            <p className="text-sm">{extraction.summary}</p>
            <FieldGrid values={extraction} />
            {question && <Notice tone="info">Follow-up: {question}</Notice>}
          </div>
        </Card>
      )}
      <MyReports />
    </div>
  );
}
