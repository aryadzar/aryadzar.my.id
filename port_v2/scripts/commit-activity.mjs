// Regenerates constants/commit-activity.json from this repository's git history.
// Usage (from port_v2/):  node scripts/commit-activity.mjs
// The About page uses that snapshot when GITHUB_TOKEN is not set.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const dates = execSync("git log --format=%ad --date=short", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
if (dates.length === 0) throw new Error("No git history found. Run this from inside the repository.");

const counts = new Map();
for (const d of dates) counts.set(d, (counts.get(d) ?? 0) + 1);

const day = 24 * 3600 * 1000;
const first = new Date(dates[dates.length - 1] + "T00:00:00Z");
const start = new Date(first.getTime() - first.getUTCDay() * day); // back to Sunday
const last = new Date(dates[0] + "T00:00:00Z");
const end = new Date(last.getTime() + (6 - last.getUTCDay()) * day); // forward to Saturday

const days = [];
for (let t = start.getTime(); t <= end.getTime(); t += day) {
  days.push(counts.get(new Date(t).toISOString().slice(0, 10)) ?? 0);
}

writeFileSync(
  new URL("../constants/commit-activity.json", import.meta.url),
  JSON.stringify({ source: "repository", start: start.toISOString().slice(0, 10), days }) + "\n",
);
console.log(`${dates.length} commits over ${days.length / 7} weeks`);
