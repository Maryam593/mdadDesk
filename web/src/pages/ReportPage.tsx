import { Card } from "@/components/ui/Card";
import { Notice } from "@/components/ui/Notice";
import { FieldGrid } from "@/components/incident/FieldGrid";
import { ReportForm } from "@/components/report/ReportForm";
import { SubmitStatus } from "@/components/report/SubmitStatus";
import { MyReports } from "@/components/track/MyReports";
import { LiveStatus } from "@/components/track/LiveStatus";
import { useReportSubmit } from "@/hooks/useReportSubmit";
import { Tour } from "@/components/tour/Tour";

export function ReportPage() {
  const { delivery, ai, extraction, question, location, reportId, submit } = useReportSubmit();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Tour id="report" />
      <Card title="Report an emergency in this building">
        <ReportForm onSubmit={submit} disabled={delivery === "pending" || ai === "pending"} />
      </Card>
      <SubmitStatus delivery={delivery} ai={ai} location={location} />
      {reportId && <LiveStatus reportId={reportId} />}
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
