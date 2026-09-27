// Data model for the subway-map protos (M & N), sourced directly from the
// user's own "Diligence_Stack_Read_Me.pdf" — which already lays this out
// as a transit map: 3 colored lines (Company/Product/Technical), a Shared
// line, and interchange stations. Coordinates are hand-placed on a grid,
// classic transit-map style (horizontal/vertical runs, 45-degree bends).
//
// Note: the PDF lists an 11th skill, /personapanel, not yet in the public
// repo or the site's pack listings — included here for map accuracy since
// it's central to the "Investment decision" route, but that's a separate
// gap to close later, not part of this task.

export type LineId = "company" | "product" | "technical" | "shared";

export const lineColor: Record<LineId, string> = {
  company: "var(--mark-a)",
  product: "var(--mark-b)",
  technical: "var(--mark-c)",
  shared: "var(--muted)",
};

export const lineLabel: Record<LineId, string> = {
  company: "Company Diligence Stack",
  product: "Product Diligence Stack",
  technical: "Technical Diligence Stack",
  shared: "Shared — usable at any stop",
};

export type Station = {
  id: string;
  command: string | null; // null for the ACME start hub
  label: string;
  x: number;
  y: number;
  lines: LineId[];
  question: string;
  takesIn: string;
  produces: string;
  interchange?: boolean;
  terminus?: boolean;
};

export const stations: Station[] = [
  {
    id: "start",
    command: null,
    label: "ACME",
    x: 60,
    y: 220,
    lines: ["company", "product"],
    question: "What are you trying to figure out?",
    takesIn: "A company name, or a domain like acme.com",
    produces: "Every stop below — pick a line and go",
  },
  {
    id: "marketdd",
    command: "/marketdd",
    label: "Market Diligence",
    x: 230,
    y: 100,
    lines: ["company"],
    question: "How big is the market, how fast does it grow, who plays, what are the 5 trends?",
    takesIn: "Sector or category",
    produces: "Word + PDF, 10 fixed sections, charts",
  },
  {
    id: "duediligence",
    command: "/duediligence",
    label: "Company Brief",
    x: 400,
    y: 100,
    lines: ["company"],
    question: "Is this a good company? Financials, strategy, ownership, founders?",
    takesIn: "Company name",
    produces: "2-page Word memo + exhibits, SWOT, org chart with digital leader",
    interchange: true,
  },
  {
    id: "companypeople",
    command: "/companypeople",
    label: "Who Decides",
    x: 580,
    y: 100,
    lines: ["company"],
    question: "Who really decides, and how do I reach them?",
    takesIn: "Company name or DD memo",
    produces: "Org chart, person cards, email + confidence, opener",
  },
  {
    id: "targetpeople",
    command: "/targetpeople",
    label: "Outreach Plan",
    x: 760,
    y: 100,
    lines: ["company"],
    question: "How do I actually get a meeting with these people?",
    takesIn: "Names + angle",
    produces: "Ranked routes, timed message sequence",
    terminus: true,
  },
  {
    id: "cohortlab",
    command: "/cohortlab",
    label: "Retention",
    x: 230,
    y: 340,
    lines: ["product"],
    question: "Does retention flatten? How good is the revenue?",
    takesIn: "Customer revenue / MRR export",
    produces: "Retention triangles, NRR/GRR bridge, concentration",
  },
  {
    id: "personapanel",
    command: "/personapanel",
    label: "Persona Panel",
    x: 340,
    y: 400,
    lines: ["product"],
    question: "Would real buyers and users discover, buy and use it?",
    takesIn: "Market segments, ICP, product access",
    produces: "Discover / Buy / Use scores, typical day, irritants",
  },
  {
    id: "productdd",
    command: "/productdd",
    label: "Product Verdict",
    x: 460,
    y: 340,
    lines: ["product"],
    question: "Does the product keep growing? What breaks at 10x?",
    takesIn: "DD memo + cohorts + personas + interviews",
    produces: "Verdict, weighted scorecard, pyramid, red flags",
    interchange: true,
  },
  {
    id: "valuecreation",
    command: "/valuecreation",
    label: "The Plan",
    x: 700,
    y: 340,
    lines: ["product", "technical"],
    question: "What do we fix first, and how do we prove it?",
    takesIn: "Product + tech findings",
    produces: "Sized levers, 100-day plan, metrics, board asks",
    terminus: true,
  },
  {
    id: "technicaldd",
    command: "/technicaldd",
    label: "Tech Scorecard",
    x: 420,
    y: 220,
    lines: ["technical"],
    question: "Does the technology back the claims? How deep is the debt?",
    takesIn: "Target + product claims, optional CTO kits",
    produces: "6-axis scorecard, Invest / Conditional / Pass",
    interchange: true,
  },
  {
    id: "interviewlog",
    command: "/interviewlog",
    label: "Interviews",
    x: 300,
    y: 480,
    lines: ["shared"],
    question: "What did people actually say, in citable form?",
    takesIn: "Notes, memos, VTT/SRT, emails",
    produces: "Source log — one entry per call, verbatims",
  },
  {
    id: "onbrand",
    command: "/onbrand",
    label: "On-Brand",
    x: 620,
    y: 480,
    lines: ["shared"],
    question: "Can this land as if it came from inside their house?",
    takesIn: "Any finished Word memo + target website",
    produces: "Re-skinned, co-branded document",
  },
];

export type Segment = {
  id: string;
  from: string;
  to: string;
  line: LineId;
  dashed?: boolean;
};

export const segments: Segment[] = [
  { id: "s-marketdd", from: "start", to: "marketdd", line: "company" },
  { id: "marketdd-dd", from: "marketdd", to: "duediligence", line: "company" },
  { id: "dd-cp", from: "duediligence", to: "companypeople", line: "company" },
  { id: "cp-tp", from: "companypeople", to: "targetpeople", line: "company" },

  { id: "s-cohortlab", from: "start", to: "cohortlab", line: "product" },
  { id: "cohortlab-persona", from: "cohortlab", to: "personapanel", line: "product" },
  { id: "persona-pdd", from: "personapanel", to: "productdd", line: "product" },
  { id: "pdd-vc", from: "productdd", to: "valuecreation", line: "product" },

  { id: "dd-tech", from: "duediligence", to: "technicaldd", line: "technical" },
  { id: "tech-pdd", from: "technicaldd", to: "productdd", line: "technical" },
  { id: "tech-vc", from: "technicaldd", to: "valuecreation", line: "technical" },

  { id: "il-pdd", from: "interviewlog", to: "productdd", line: "shared", dashed: true },
  { id: "il-dd", from: "interviewlog", to: "duediligence", line: "shared", dashed: true },
  { id: "vc-onbrand", from: "valuecreation", to: "onbrand", line: "shared", dashed: true },
];

export const stationById = (id: string) => stations.find((s) => s.id === id)!;

// The literal route from the feedback: ACME -> Market Diligence -> Company
// Brief (marketdd + duediligence = "Report 1") -> interviews feed in along
// the way -> Who Decides -> Outreach Plan. Matches the PDF's "First
// meeting" run, with /interviewlog folded in as the aside it is.
export const firstMeetingRoute = [
  "start",
  "marketdd",
  "duediligence",
  "interviewlog",
  "companypeople",
  "targetpeople",
];

// Every stop, in an order that keeps most consecutive pairs on a real
// segment (so their line lights up as it's reached) — company line, a
// technical detour, then product line, then the shared line.
export const fullSystemRoute = [
  "start",
  "marketdd",
  "duediligence",
  "technicaldd",
  "companypeople",
  "targetpeople",
  "cohortlab",
  "personapanel",
  "productdd",
  "valuecreation",
  "interviewlog",
  "onbrand",
];
