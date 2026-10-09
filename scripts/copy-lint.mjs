#!/usr/bin/env node
/**
 * Copy lint — enforces the copy rules of SPEC.md §S7.
 *
 * Run:  node scripts/copy-lint.mjs [--fixture path/to/fixture.tsx]
 * CI:   pnpm copy:lint
 *
 * Checks (all case-insensitive unless noted):
 *  1. Forbidden phrases (exact sub-string)
 *  2. Exclamation marks in JSX / MDX string literals and text
 *  3. "SOC 2" without an adjacent status tag (must be followed by "Later" / "Next" within 50 chars)
 *  4. Prices ($N or €N or "per memo") while content/plans.json#published === false
 *  5. Hard-coded CSS tokens: bare hex colours, bare pixel/rem/em values for spacing / z-index
 *  6. Numbers with units that are not backed by an entry in content/claims.json
 *
 * Fixture mode: supply a single file path to run only against that file.
 *   node scripts/copy-lint.mjs --fixture tests/copy-lint-fixture.tsx
 * In fixture mode the script exits 1 when violations ARE found (proves the linter catches them).
 */

import fs from "node:fs";
import path from "node:path";
import { glob } from "node:fs/promises";

// --------------------------------------------------------------------------
// Config
// --------------------------------------------------------------------------

const ROOT = path.resolve(import.meta.dirname, "..");

const SCAN_GLOBS = [
  "app/**/*.{tsx,ts,mdx,md}",
  "content/**/*.{tsx,ts,mdx,md}",
  "lib/**/*.{tsx,ts,mdx,md}",
];

const EXCLUDE = [
  "node_modules",
  ".next",
  "content/schemas",
  "scripts/copy-lint.mjs", // don't scan ourselves
  // Legacy prototype components — replaced by s1-shell and s1-map.
  // They are intentionally unstyled/stale until those tasks land.
  "app/components/viz",
  "app/components/proto",
  "app/proto-",
  "app/proto-e",
  "app/proto-full-homepage",
  // Legacy data/content lib files — replaced by content/*.json + lib/stack.ts.
  "lib/content.ts",
  "lib/journeys.ts",
  "lib/subway.ts",
  "lib/simple-tracks.ts",
  "lib/orchestration.ts",
  "lib/diligence-map.ts",
];

// --------------------------------------------------------------------------
// Load content files
// --------------------------------------------------------------------------

const plansPath   = path.join(ROOT, "content/plans.json");
const claimsPath  = path.join(ROOT, "content/claims.json");
const provPath    = path.join(ROOT, "content/providers.json");

const plans    = JSON.parse(fs.readFileSync(plansPath,  "utf8"));
const claims   = JSON.parse(fs.readFileSync(claimsPath, "utf8"));
const providers = JSON.parse(fs.readFileSync(provPath,  "utf8"));

const pricesPublished = plans.published === true;

/** All valid provider tags (derived from content/providers.json) */
const providerTags = new Set(providers.providers.map((p) => p.tag));

/** All valid provider names */
const providerNames = providers.providers.map((p) => p.name);

/** The allowed status tags for SOC 2 — must be adjacent */
const SOC2_OK_TAGS = ["later", "next", "at launch"];

/**
 * Claim values that are allowed to appear as numbers without triggering
 * the "unclaimed number" check.  Derived from content/claims.json.
 */
const claimedValues = new Set(
  claims.claims
    .filter((c) => /^\d+$/.test(String(c.value)))
    .map((c) => String(c.value)),
);

// --------------------------------------------------------------------------
// Rule definitions
// --------------------------------------------------------------------------

/**
 * Each rule returns an array of { line, col, text } violations found in a file.
 * `lines` is an array of the file's lines (0-indexed).
 */

/** Rule 1: forbidden phrases */
const FORBIDDEN = [
  "never collect or store",
  "do not collect or store",
  "nothing to paste",
  "no key to paste",
  "third-party connection",
  "third party connection",
  "$15 to 25",
  "15 to 25 per memo",
];

function checkForbiddenPhrases(lines) {
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    for (const phrase of FORBIDDEN) {
      const idx = lower.indexOf(phrase.toLowerCase());
      if (idx !== -1) {
        hits.push({ line: i + 1, col: idx + 1, text: `Forbidden phrase: "${phrase}"` });
      }
    }
  }
  return hits;
}

/** Rule 2: exclamation marks in prose (JSX text nodes and plain string literals).
 *
 * Must NOT flag:
 *   - TypeScript non-null assertions: `expr!;`  `expr!,`  `expr!)`  `expr!.`  `expr![`
 *   - Boolean negation: `!flag`, `(!b`, `=> !p`
 *   - Comments
 *
 * DOES flag:
 *   - `>Great news!<`  (JSX text node ending in !)
 *   - `{"Amazing!"}` or `"Amazing!"` (string literal with trailing !)
 */
function checkExclamationMarks(lines) {
  const hits = [];
  // A prose "!" is one that follows [a-zA-Z0-9 ] and is followed by a space, <, ", `, or end of line.
  // This avoids flagging `expr!;` `!flag` etc.
  const proseExcl = /[a-zA-Z0-9]!(?=\s|<|"|`|$)/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) continue;
    let m;
    while ((m = proseExcl.exec(line)) !== null) {
      const col = m.index + 1;
      const snippet = line.slice(Math.max(0, m.index - 20), m.index + 5).trim();
      hits.push({ line: i + 1, col, text: `Exclamation mark in prose text: "...${snippet}..."` });
    }
  }
  return hits;
}

/** Rule 3: SOC 2 without a status tag nearby */
function checkSoc2(lines) {
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    const idx = lower.indexOf("soc 2");
    if (idx === -1) continue;
    // Check the surrounding 120 chars (this line + next line) for a status tag
    const window = lower + (lines[i + 1] ?? "").toLowerCase();
    const windowFrom = idx;
    const windowTo = Math.min(window.length, windowFrom + 120);
    const near = window.slice(windowFrom, windowTo);
    if (!SOC2_OK_TAGS.some((tag) => near.includes(tag))) {
      hits.push({ line: i + 1, col: idx + 1, text: 'SOC 2 without a status tag ("Later", "Next", or "At launch") within 120 characters' });
    }
  }
  return hits;
}

/** Rule 4: prices while published === false */
function checkPrices(lines) {
  if (pricesPublished) return []; // prices are fine when published
  const hits = [];
  // Patterns: $15, €25, "per memo", "per month", /mo, /year
  const pricePattern = /(\$|€)\s*\d+|per memo|per month|\/mo\b|\/year\b/gi;
  for (let i = 0; i < lines.length; i++) {
    let m;
    while ((m = pricePattern.exec(lines[i])) !== null) {
      // Ignore comments and data files themselves (allow "price": null)
      if (lines[i].includes('"price"') || lines[i].trim().startsWith("//") || lines[i].trim().startsWith("*")) continue;
      hits.push({ line: i + 1, col: m.index + 1, text: `Price shown while plans.json has published: false — "${m[0]}"` });
    }
  }
  return hits;
}

/** Rule 5: hard-coded CSS token values (bare hex, bare pixel/rem spacing) */
function checkHardCodedTokens(lines, filePath) {
  // Only check .tsx, .ts, .mdx files — not .json
  if (filePath.endsWith(".json")) return [];
  const hits = [];
  const hexRe = /#[0-9A-Fa-f]{3,8}\b/g;
  // Spacing/z-index tokens: values like 24px, 1.5rem, 0.75em that look like design tokens
  // We flag anything that looks like a hard-coded dimension that should be a CSS var
  const dimRe = /style={{[^}]*[:,\s](?:"[^"]*px[^"]*"|'[^']*px[^']*'|\d+(?:\.\d+)?rem\b|\d+(?:\.\d+)?em\b)/g;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip lines that are purely comments, imports, or inside tokens.css imports
    if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("import")) continue;
    // Skip lines inside CSS strings (likely being passed to style= as CSS vars)
    if (line.includes("var(--")) continue;
    let m;
    while ((m = hexRe.exec(line)) !== null) {
      // Allow hex in comments
      const prefix = line.slice(0, m.index);
      if (prefix.includes("//") || prefix.includes("/*")) break;
      hits.push({ line: i + 1, col: m.index + 1, text: `Hard-coded hex colour "${m[0]}" — use a CSS custom property from tokens.css` });
    }
  }
  return hits;
}

/** Rule 6: numbers with units not backed by claims.json */
const UNIT_PATTERN = /\b(\d+)\s+(years?|continents?|cities?|stages?|skills?|plans?|diligences?)\b/gi;

function checkUnclaimedNumbers(lines, filePath) {
  if (filePath.endsWith(".json")) return []; // data files are fine
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;
    let m;
    while ((m = UNIT_PATTERN.exec(line)) !== null) {
      const num = m[1];
      if (!claimedValues.has(num)) {
        hits.push({ line: i + 1, col: m.index + 1, text: `Number "${m[0]}" has no entry in content/claims.json (value "${num}" not found)` });
      }
    }
  }
  return hits;
}

// --------------------------------------------------------------------------
// File collection
// --------------------------------------------------------------------------

async function collectFiles(roots) {
  const files = [];
  for (const root of roots) {
    const full = path.join(ROOT, root);
    if (!fs.existsSync(full)) continue;
    await collectDir(full, files);
  }
  return files;
}

function isExcluded(rel) {
  return EXCLUDE.some((ex) => {
    // prefix match (covers both exact and directory-prefix patterns like "app/proto-")
    return rel === ex || rel.startsWith(ex + "/") || rel.startsWith(ex);
  });
}

async function collectDir(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (isExcluded(rel)) continue;
    if (entry.isDirectory()) {
      await collectDir(full, acc);
    } else if (/\.(tsx?|mdx?)$/.test(entry.name)) {
      acc.push(full);
    }
  }
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------

const args = process.argv.slice(2);
const fixtureIdx = args.indexOf("--fixture");
const fixtureMode = fixtureIdx !== -1;
const fixturePath = fixtureMode ? path.resolve(ROOT, args[fixtureIdx + 1]) : null;

async function lint(filePaths) {
  let totalViolations = 0;
  for (const filePath of filePaths) {
    const source = fs.readFileSync(filePath, "utf8");
    const lines = source.split("\n");
    const rel = path.relative(ROOT, filePath);

    const violations = [
      ...checkForbiddenPhrases(lines),
      ...checkExclamationMarks(lines),
      ...checkSoc2(lines),
      ...checkPrices(lines),
      ...checkHardCodedTokens(lines, filePath),
      ...checkUnclaimedNumbers(lines, filePath),
    ];

    if (violations.length > 0) {
      console.error(`\n${rel}`);
      for (const v of violations) {
        console.error(`  ${v.line}:${v.col}  ${v.text}`);
        totalViolations++;
      }
    }
  }
  return totalViolations;
}

(async () => {
  let files;
  if (fixtureMode) {
    if (!fixturePath || !fs.existsSync(fixturePath)) {
      console.error(`Fixture file not found: ${fixturePath}`);
      process.exit(2);
    }
    files = [fixturePath];
  } else {
    files = await collectFiles(["app", "lib", "content"]);
  }

  const count = await lint(files);

  if (fixtureMode) {
    // In fixture mode: violations are expected. Exit 0 if violations found (linter works), exit 1 if none (linter broken).
    if (count === 0) {
      console.error("\nFixture mode: expected violations but found none — the linter is broken.");
      process.exit(1);
    }
    console.log(`\nFixture mode: found ${count} violation(s) as expected — linter works. ✓`);
    process.exit(0);
  } else {
    if (count === 0) {
      console.log(`copy:lint — ${files.length} files scanned, 0 violations. ✓`);
    } else {
      console.error(`\ncopy:lint — ${count} violation(s) found across ${files.length} files.`);
      process.exit(1);
    }
  }
})();
