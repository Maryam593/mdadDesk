// Creates demo accounts (with role claims) and the three simulated agencies.
// Needs: `gcloud auth application-default login` and GOOGLE_CLOUD_PROJECT=<project id>.
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import type { Agency, AgencyKind } from "../../shared/src";

initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
const PASSWORD = process.env.DEMO_PASSWORD ?? "madad-demo-2026";

const AGENCIES: Array<{ id: string; name: string; kind: AgencyKind; available: boolean }> = [
  { id: "fire-saddar", name: "Saddar Fire Station", kind: "fire", available: true },
  { id: "ambulance-1", name: "City Ambulance Service", kind: "ambulance", available: false },
  { id: "police-saddar", name: "Saddar Police", kind: "police", available: true },
];

const USERS = [
  { email: "coordinator@madaddesk.demo", claims: { role: "coordinator" } },
  ...AGENCIES.map((a) => ({ email: `${a.id}@madaddesk.demo`, claims: { role: "agency", agencyId: a.id } })),
];

async function upsertUser(email: string, claims: object) {
  const auth = getAuth();
  const user = await auth.getUserByEmail(email).catch(() => auth.createUser({ email, password: PASSWORD }));
  await auth.setCustomUserClaims(user.uid, claims);
  console.log(`user  ${email}  ${JSON.stringify(claims)}`);
}

const db = getFirestore();
for (const a of AGENCIES) {
  const agency: Agency = { ...a, availabilityUpdatedAt: Date.now() };
  await db.doc(`agencies/${a.id}`).set(agency);
  console.log(`agency ${a.id}`);
}
for (const u of USERS) await upsertUser(u.email, u.claims);
console.log(`\nAll demo passwords: ${PASSWORD}`);
