import type { Agency, Incident } from "@shared";
import { ActionButton } from "@/components/ui/ActionButton";
import { useCollection } from "@/hooks/useCollection";
import { sendAgency } from "@/services/assignments";

/** What the button for one agency should say, given what already happened. */
function buttonLabel(incident: Incident, agency: Agency): string {
  if (incident.respondingKinds.includes(agency.kind)) return `${agency.name}: on the way`;
  if (incident.notifiedAgencyIds.includes(agency.id)) return `${agency.name}: request sent`;
  if (!agency.available) return `${agency.name} (busy)`;
  return `Send ${agency.name}`;
}

/** Coordinator: ask fire / ambulance / police for help. Only after the incident is verified. */
export function DispatchPanel({ incident }: { incident: Incident }) {
  const { data: agencies, error } = useCollection<Agency>("agencies");
  if (incident.status !== "verified" && incident.status !== "response") return null;

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Send help</h3>
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {agencies.map((agency) => (
          <ActionButton
            key={agency.id}
            variant="secondary"
            disabled={!agency.available || incident.notifiedAgencyIds.includes(agency.id)}
            onClick={() => sendAgency(incident, agency)}
          >
            {buttonLabel(incident, agency)}
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
