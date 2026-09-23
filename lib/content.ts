export type Skill = {
  slug: string;
  command: string;
  title: string;
  blurb: string;
};

export type Pack = {
  slug: string;
  name: string;
  tagline: string;
  flow: string;
  question: string;
  skills: Skill[];
};

const duediligence: Skill = {
  slug: "duediligence",
  command: "/duediligence",
  title: "Due diligence",
  blurb:
    "Give it a company name, get back a decision-grade brief: financials (or proxy signals when there are none), strategy, ownership, an evidence-backed SWOT, and the org chart with the digital leader identified. Runs a market deep-dive on the sector automatically first, via the bundled marketdd skill.",
};

const marketdd: Skill = {
  slug: "marketdd",
  command: "/marketdd",
  title: "Market due diligence",
  blurb:
    "A sourced, chart-heavy deep dive on a whole sector or software category: market size and growth, where value sits in the chain, who plays where, M&A moves, and the 5 customer trends for the next 5-10 years. Bundled into duediligence — runs automatically when there's no recent market report — but works standalone too.",
};

const companypeople: Skill = {
  slug: "companypeople",
  command: "/companypeople",
  title: "Company people",
  blurb:
    "Who actually decides, mapped out: an org chart, a dossier on each person, a likely work email with a confidence score, and an opening message written to get a reply.",
};

const targetpeople: Skill = {
  slug: "targetpeople",
  command: "/targetpeople",
  title: "Target people",
  blurb:
    "How to get in front of named people — every realistic route ranked by the chance it works, with the exact message written for each step and when to send it.",
};

const interviewlog: Skill = {
  slug: "interviewlog",
  command: "/interviewlog",
  title: "Interview log",
  blurb:
    "Turns messy call notes, voice memos and transcripts into a clean, citable source log — one entry per conversation, with quotes you can put straight in a report.",
};

const onbrand: Skill = {
  slug: "onbrand",
  command: "/onbrand",
  title: "On-brand",
  blurb:
    "Re-skins a finished report in a target company's own colours and fonts, read from their real website, so it lands looking like it came from inside their offices.",
};

const productdd: Skill = {
  slug: "productdd",
  command: "/productdd",
  title: "Product due diligence",
  blurb:
    "Will the product keep growing, and what breaks at 10x? A verdict and scored verdict sit on page one, backed by eight areas of evidence, a market map, and red flags.",
};

const cohortlab: Skill = {
  slug: "cohortlab",
  command: "/cohortlab",
  title: "Cohort lab",
  blurb:
    "Feed it a raw sales export and get real retention: cohort curves, NRR/GRR with an expansion-contraction-churn bridge, and revenue concentration — recomputed from raw rows.",
};

const valuecreation: Skill = {
  slug: "valuecreation",
  command: "/valuecreation",
  title: "Value creation",
  blurb:
    "Turns findings into a plan: three to five sized levers, a 100-day plan, the metrics that prove it worked, and the exact asks for the board.",
};

const technicaldd: Skill = {
  slug: "technicaldd",
  command: "/technicaldd",
  title: "Technical due diligence",
  blurb:
    "Turns vendor claims — 'API-first', 'enterprise-grade', 'proprietary' — into evidence across 6 axes: APIs, agent readiness, integration time, architecture, SLA/uptime, and security & compliance.",
};

export const packs: Pack[] = [
  {
    slug: "company-diligence-stack",
    name: "Company Diligence Stack",
    tagline:
      "Everything you need to walk into a meeting, a board seat, or a first call knowing more about a company than the person across the table.",
    flow: "/duediligence (+ /marketdd auto) → /companypeople → /targetpeople",
    question: "Is it a good company, and who do I talk to?",
    skills: [duediligence, companypeople, targetpeople, interviewlog, onbrand],
  },
  {
    slug: "product-diligence-stack",
    name: "Product Diligence Stack",
    tagline:
      "Everything you need to tell an investment committee whether a product will keep growing, and what breaks if it gets ten times bigger.",
    flow: "/cohortlab + /interviewlog → /productdd → /valuecreation",
    question: "Will the product keep growing?",
    skills: [productdd, cohortlab, valuecreation, interviewlog, onbrand],
  },
  {
    slug: "technical-diligence-stack",
    name: "Technical Diligence Stack",
    tagline:
      "Everything you need to turn a vendor's technical claims — 'API-first', 'enterprise-grade', 'proprietary' — into evidence, once a target is on the table.",
    flow: "/duediligence or /productdd → /technicaldd",
    question: "Does the technology hold up under the hood?",
    skills: [technicaldd, interviewlog, onbrand],
  },
];

export const allSkills: Skill[] = [
  duediligence,
  marketdd,
  companypeople,
  targetpeople,
  productdd,
  cohortlab,
  valuecreation,
  interviewlog,
  onbrand,
  technicaldd,
];

export const evidenceMarks = [
  {
    mark: "A",
    color: "var(--mark-a)",
    label: "Verified",
    detail: "Official accounts, invoices, or figures worked out from raw data.",
  },
  {
    mark: "B",
    color: "var(--mark-b)",
    label: "Reported",
    detail: "What someone told us, on the record or off.",
  },
  {
    mark: "C",
    color: "var(--mark-c)",
    label: "Estimated",
    detail: "An estimate or a single source — flagged, not hidden.",
  },
];

export const rules = [
  {
    title: "Every number carries a mark",
    detail:
      "[A] official accounts or figures worked out from raw data · [B] what someone told us · [C] an estimate or a single source. Mixing marks in one sentence counts as a mistake.",
  },
  {
    title: "Every claim points to a source",
    detail:
      "S-01 a document, I-01 an interview, P-01 something published — each must appear on the source list. A check refuses to print a report where one doesn't.",
  },
  {
    title: "Research first, write last",
    detail: "Roughly 70% finding things out, 20% building the argument, 10% making the document.",
  },
  {
    title: "What's missing is part of the job",
    detail:
      "Anything that couldn't be checked becomes a line in the appendix: what's needed, why, who has it, how to get it, how urgent.",
  },
];

export const GITHUB_URL = "https://github.com/IsmaelG/diligence-stack-skills";
export const AUTHOR_LINKEDIN_URL = "https://www.linkedin.com/in/ismaelghozael";
export const AUTHOR_ABOUT_URL = "https://ismaelghozael.vercel.app";
