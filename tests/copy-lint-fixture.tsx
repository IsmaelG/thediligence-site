/**
 * copy-lint fixture — deliberately contains one violation of each rule.
 *
 * Run:  node scripts/copy-lint.mjs --fixture tests/copy-lint-fixture.tsx
 * Expected exit code: 0 (violations found → linter works)
 *
 * DO NOT import or render this file. It exists only to prove the linter catches errors.
 */

// Rule 1: forbidden phrase
// "We never collect or store your key" is the old forbidden wording.
const keyMessage = "We never collect or store your key in plain text.";

// Rule 2: exclamation mark in JSX text
function BadHeadline() {
  return <h1>Diligence is amazing!</h1>;
}

// Rule 3: SOC 2 without status tag
const securityNote = "We are SOC 2 certified and fully compliant with all standards.";

// Rule 4: price while published === false
// $25 per memo is the forbidden price figure
const priceText = "Starts at $25 per memo.";

// Rule 5: hard-coded hex colour instead of CSS token
const badStyle = { color: "#1A1B1E", background: "#F5F3EE" };

// Rule 6: number with unit not in claims.json (99 is not a claimed value)
const unknownClaim = "Our platform has 99 skills built in.";

export {};
