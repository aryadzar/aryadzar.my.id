// One-off migration for the redesigned Uses page.
//
// The page now groups items into five sections (workstation, furniture,
// accessories, applications, subscriptions). Items saved with the old six
// categories still show up, because the page maps them at render time, but
// Studio shows them with no category selected until they are re-saved.
// This script rewrites the old values so Studio matches.
//
//   node --env-file=.env.local scripts/migrate-uses-categories.mjs           # dry run
//   node --env-file=.env.local scripts/migrate-uses-categories.mjs --apply   # write
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a token
// with write access in SANITY_API_WRITE_TOKEN.

import { createClient } from "next-sanity";

const MAP = {
  editor: "applications",
  terminal: "applications",
  devops: "applications",
  design: "applications",
  browser: "applications",
  hardware: "workstation",
};

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, NEXT_PUBLIC_SANITY_TOKEN_WRITE_COMMENT: token } = process.env;
const apply = process.argv.includes("--apply");

if (!projectId || !dataset || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-11-08",
  useCdn: false,
  perspective: "raw", // include drafts so they are migrated too
});

const docs = await client.fetch(
  `*[_type == "uses" && category in $legacy]{ _id, name, language, category } | order(name asc)`,
  { legacy: Object.keys(MAP) },
);

if (docs.length === 0) {
  console.log("Nothing to migrate: no Uses documents use the old categories.");
  process.exit(0);
}

for (const doc of docs) {
  console.log(`${doc._id}  [${doc.language ?? "-"}]  ${doc.name}: ${doc.category} -> ${MAP[doc.category]}`);
}

if (!apply) {
  console.log(`\n${docs.length} document(s) would change. Re-run with --apply to write.`);
  process.exit(0);
}

let tx = client.transaction();
for (const doc of docs) tx = tx.patch(doc._id, { set: { category: MAP[doc.category] } });
await tx.commit();
console.log(`\nUpdated ${docs.length} document(s).`);
