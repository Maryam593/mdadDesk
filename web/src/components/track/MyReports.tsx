import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { timeAgo } from "@/lib/labels";
import { myReports } from "@/lib/myReports";

/** Links to the status page of each SOS sent from this phone. */
export function MyReports() {
  const reports = myReports();
  if (reports.length === 0) return null;

  return (
    <Card title="Your reports: tap to see if help is coming">
      <ul className="space-y-2 text-sm">
        {reports.map((r) => (
          <li key={r.id}>
            <Link to={`/track/${r.id}`} className="block rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <span className="text-xs text-slate-500">{timeAgo(r.at)}</span>
              <p className="line-clamp-1">{r.preview}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
