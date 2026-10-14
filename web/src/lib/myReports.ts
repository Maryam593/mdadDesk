// Remembers the SOS reports sent from this phone, so the reporter can reopen their
// status page later. Stored only on this device (browser storage).

export interface MyReport {
  id: string; // report id; the status page is /track/<id>
  at: number;
  preview: string;
}

const KEY = "madaddesk.myReports";
const MAX = 5;

export function myReports(): MyReport[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return []; // private window or blocked storage: just show nothing
  }
}

export function rememberReport(id: string, text: string) {
  const report: MyReport = { id, at: Date.now(), preview: text.slice(0, 60) };
  const list = [report, ...myReports()].slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore: tracking is a convenience, the SOS itself is already saved
  }
}
