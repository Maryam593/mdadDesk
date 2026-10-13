import { readFileSync } from "node:fs";
import { extract } from "../src/routes/extract";
import { LOCATION_FIELDS, type LocationField } from "../../shared/src";

type Sample = { id: string; text: string; expected: Record<LocationField, string | number | null> };
const samples: Sample[] = JSON.parse(readFileSync(new URL("../../data/synthetic-reports.json", import.meta.url), "utf8"));

const norm = (v: unknown) => (v === null || v === undefined ? null : String(v).toLowerCase().trim());
// Landmarks/buildings: accept if one contains the other ("shop 24" vs "near shop 24").
const match = (a: unknown, b: unknown) => {
  const [x, y] = [norm(a), norm(b)];
  return x === y || (x !== null && y !== null && (x.includes(y) || y.includes(x)));
};

let correct = 0, total = 0, invented = 0, failures = 0;
for (const s of samples) {
  try {
    const got = await extract(s.text);
    for (const f of LOCATION_FIELDS) {
      total++;
      if (match(got[f], s.expected[f])) correct++;
      else if (s.expected[f] === null && got[f] !== null) {
        invented++;
        console.log(`  INVENTED ${s.id}.${f} = ${got[f]}`);
      } else console.log(`  WRONG    ${s.id}.${f}: got ${got[f]}, expected ${s.expected[f]}`);
    }
  } catch (e) {
    failures++;
    console.log(`  FAILED   ${s.id}: ${(e as Error).message}`);
  }
}

console.log(`\nField accuracy: ${((100 * correct) / Math.max(total, 1)).toFixed(1)}% (${correct}/${total})`);
console.log(`Invented values: ${invented}   AI failures: ${failures}/${samples.length}`);
