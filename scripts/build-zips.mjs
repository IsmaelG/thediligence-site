#!/usr/bin/env node
// Builds the downloadable skill zips from /skills into public/downloads/.
// Single source of truth is /skills — this script never hand-edits a zip.
//
// Usage: node scripts/build-zips.mjs

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const OUT_DIR = path.join(ROOT, "public", "downloads");

const PACKS = {
  "company-diligence-stack": [
    "duediligence",
    "marketdd",
    "companypeople",
    "targetpeople",
    "interviewlog",
    "onbrand",
  ],
  "product-diligence-stack": [
    "productdd",
    "cohortlab",
    "valuecreation",
    "interviewlog",
    "onbrand",
  ],
  "technical-diligence-stack": ["technicaldd", "interviewlog", "onbrand"],
};

// Some skills bundle a dependency into their own individual zip so they
// work standalone without also grabbing the dependency separately —
// e.g. duediligence auto-chains into marketdd (see its Step 0b) but
// marketdd isn't sold as its own site download, so it has to travel
// with duediligence's zip specifically.
const BUNDLES = {
  duediligence: ["marketdd"],
};

function zip(outFile, cwd, entries) {
  if (existsSync(outFile)) rmSync(outFile);
  execFileSync(
    "zip",
    ["-r", "-X", "-q", outFile, ...entries, "-x", "*.DS_Store"],
    { cwd }
  );
}

function main() {
  if (!existsSync(SKILLS_DIR)) {
    throw new Error(`Missing ${SKILLS_DIR} — run this from the repo root.`);
  }
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });

  const skillNames = readdirSync(SKILLS_DIR).filter((name) =>
    statSync(path.join(SKILLS_DIR, name)).isDirectory()
  );

  // One zip per individual skill, e.g. downloads/duediligence.zip -> duediligence/SKILL.md
  // (plus any bundled dependency folders from BUNDLES, e.g. marketdd rides
  // along inside duediligence.zip).
  for (const name of skillNames) {
    const outFile = path.join(OUT_DIR, `${name}.zip`);
    const entries = [name, ...(BUNDLES[name] ?? [])];
    const missingBundle = entries.filter((e) => !skillNames.includes(e));
    if (missingBundle.length) {
      throw new Error(`Skill "${name}" bundles missing skills: ${missingBundle.join(", ")}`);
    }
    zip(outFile, SKILLS_DIR, entries);
    console.log(`built ${path.relative(ROOT, outFile)}`);
  }

  // One zip per pack, bundling that pack's skill subset.
  for (const [packName, members] of Object.entries(PACKS)) {
    const missing = members.filter((m) => !skillNames.includes(m));
    if (missing.length) {
      throw new Error(`Pack "${packName}" references missing skills: ${missing.join(", ")}`);
    }
    const outFile = path.join(OUT_DIR, `${packName}.zip`);
    zip(outFile, SKILLS_DIR, members);
    console.log(`built ${path.relative(ROOT, outFile)}`);
  }

  console.log(`\n${skillNames.length} skill zips + ${Object.keys(PACKS).length} pack zips in ${path.relative(ROOT, OUT_DIR)}/`);
}

main();
