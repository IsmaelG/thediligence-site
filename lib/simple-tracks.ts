// Deliberately simplified for the second round of orchestration protos —
// the first round (A-G) tried to show every relationship at once and
// tipped into "complicated." This keeps the marketdd/technicaldd/
// interviewlog/onbrand chaining as a one-line footnote instead of forcing
// it into the main visual, and reduces the entry point to the two real
// questions this site's own two primary packs already answer.

export type SimpleStep = {
  command: string;
  title: string;
  outcome: string;
  icon: string;
};

export type SimpleTrack = {
  id: "company" | "product";
  label: string;
  input: string;
  steps: SimpleStep[];
  footnote: string;
  result: string;
};

export const simpleTracks: SimpleTrack[] = [
  {
    id: "company",
    label: "Start with a company",
    input: "ACME",
    steps: [
      { command: "/duediligence", title: "Company brief", outcome: "Financials, strategy, ownership, SWOT, org chart.", icon: "◎" },
      { command: "/companypeople", title: "Who decides", outcome: "Org chart and a dossier on each decision-maker.", icon: "◈" },
      { command: "/targetpeople", title: "How to reach them", outcome: "Every realistic route, ranked, with the message written.", icon: "→" },
    ],
    footnote: "Automatically pulls in a market deep-dive (/marketdd), and can chain into a technical scorecard (/technicaldd) once a target is confirmed.",
    result: "A decision-grade company brief, and a plan to get in the room.",
  },
  {
    id: "product",
    label: "Start with a product",
    input: "ACME's product",
    steps: [
      { command: "/cohortlab", title: "Real retention", outcome: "Cohort curves recomputed from a raw sales export.", icon: "◎" },
      { command: "/productdd", title: "Will it keep growing?", outcome: "Invest / Conditional / Pass, backed by 8 areas of evidence.", icon: "◈" },
      { command: "/valuecreation", title: "The plan", outcome: "Sized levers, a 100-day plan, the board ask.", icon: "→" },
    ],
    footnote: "Interview evidence (/interviewlog) feeds in throughout, and /technicaldd can verify technical claims once a target is confirmed.",
    result: "A growth verdict, and a sized plan to act on it.",
  },
];
