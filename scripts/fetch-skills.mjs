#!/usr/bin/env node
// Fetches the current skill source from the public skills repo into local,
// gitignored /skills and /packs folders. This is the site's only copy of
// that content — the public repo (github.com/IsmaelG/diligence-stack-skills)
// is the single source of truth, not this repo.
//
// Usage: node scripts/fetch-skills.mjs

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SKILLS_REPO = "https://github.com/IsmaelG/diligence-stack-skills.git";

function main() {
  const cloneDir = mkdtempSync(path.join(tmpdir(), "diligence-stack-skills-"));
  try {
    console.log(`cloning ${SKILLS_REPO} ...`);
    execFileSync(
      "git",
      ["clone", "--depth", "1", "--quiet", SKILLS_REPO, cloneDir],
      { stdio: "inherit" }
    );

    for (const dir of ["skills", "packs"]) {
      const src = path.join(cloneDir, dir);
      const dest = path.join(ROOT, dir);
      if (!existsSync(src)) {
        throw new Error(`Expected ${dir}/ in the skills repo but it's missing.`);
      }
      rmSync(dest, { recursive: true, force: true });
      cpSync(src, dest, { recursive: true, filter: (p) => !p.endsWith(".git") });
      console.log(`synced ${dir}/ from diligence-stack-skills`);
    }
  } finally {
    rmSync(cloneDir, { recursive: true, force: true });
  }
}

main();
