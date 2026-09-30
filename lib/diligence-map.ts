// Data model for "How it works — the map", rebuilt from the reviewed
// alt-spec (diligence-map-SPEC.md) — content and geometry adapted from
// that spec, reskinned to this site's existing dark/amber design tokens.
// Single source of truth: every UI element (map, Now panel, hover cards,
// route controls) renders from this file.

import { GITHUB_URL } from "@/lib/content";

export type LineId = "company" | "product" | "technical" | "shared";

export const lineColor: Record<LineId, string> = {
  company: "var(--mark-a)",
  product: "var(--mark-b)",
  technical: "var(--mark-c)",
  shared: "var(--muted)",
};

export const lineLabel: Record<LineId, string> = {
  company: "Company diligence",
  product: "Product diligence",
  technical: "Technical diligence",
  shared: "Shared line",
};

// Which pack a line's stations belong to, for the downloads-highlight
// behavior — matches the slugs in lib/content.ts's `packs`.
export const linePackSlug: Record<LineId, string | null> = {
  company: "company-diligence-stack",
  product: "product-diligence-stack",
  technical: "technical-diligence-stack",
  shared: null,
};

export type Station = {
  id: string;
  command: string;
  label: string;
  x: number;
  y: number;
  labelSide: "above" | "below";
  line: LineId;
  hub?: boolean;
  coming?: boolean;
  sq: string; // short question, shown on the map at rest
  q: string; // full question, shown in the Now panel and the card
  takes: string;
  produces: string;
  feeds: string[]; // station ids this one's output feeds into
  why: string;
};

export const stations: Station[] = [
  {
    id: "marketdd",
    command: "/marketdd",
    label: "Market Diligence",
    x: 80,
    y: 280,
    labelSide: "below",
    line: "company",
    sq: "How big is the market?",
    q: "How big is the market, how fast does it grow, who plays, and what are the 5 trends?",
    takes: "A sector or software category",
    produces: "Word + PDF deep dive in 10 fixed sections: sizing, value chain, players, M&A, segments, 5 trends",
    feeds: ["duediligence", "personapanel", "productdd"],
    why: "Runs first inside /duediligence. Its segments seed /personapanel and its sizing builds the /productdd pyramid.",
  },
  {
    id: "duediligence",
    command: "/duediligence",
    label: "Company Brief",
    x: 250,
    y: 280,
    labelSide: "below",
    line: "company",
    hub: true,
    sq: "Is it a good company?",
    q: "Is this a good company? Financials, strategy, ownership, founders?",
    takes: "A company name",
    produces: "2-page Word memo with exhibits: financials (or proxy signals), SWOT, ownership, org chart with the digital leader",
    feeds: ["companypeople", "productdd"],
    why: "Together with /marketdd it forms Report 1. It's the entry point for both the people line and the product line.",
  },
  {
    id: "companypeople",
    command: "/companypeople",
    label: "Who Decides",
    x: 400,
    y: 130,
    labelSide: "above",
    line: "company",
    sq: "Who actually decides?",
    q: "Who really decides, and how do I reach them?",
    takes: "A company name or an existing DD memo",
    produces: "Word people map: org chart, one card per person, email with confidence score, opening message",
    feeds: ["targetpeople"],
    why: "Turns the org chart into named people you can act on.",
  },
  {
    id: "targetpeople",
    command: "/targetpeople",
    label: "Outreach Plan",
    x: 600,
    y: 130,
    labelSide: "above",
    line: "company",
    sq: "How do I get in front of them?",
    q: "How do I actually get a meeting with these people?",
    takes: "Names plus the angle you're pursuing",
    produces: "Outreach plan: routes ranked by odds of landing, timed message sequence",
    feeds: [],
    why: "End of the company line. The output is a meeting, not a memo.",
  },
  {
    id: "cohortlab",
    command: "/cohortlab",
    label: "Retention",
    x: 440,
    y: 410,
    labelSide: "below",
    line: "product",
    sq: "Does retention flatten?",
    q: "Does retention flatten? How good is the revenue?",
    takes: "Customer revenue or MRR export",
    produces: "Retention triangles, NRR/GRR bridge, concentration, ready-made chart specs",
    feeds: ["productdd"],
    why: "Hard numbers behind the /productdd verdict. Called automatically when raw data exists.",
  },
  {
    id: "personapanel",
    command: "/personapanel",
    label: "Persona Panel",
    x: 610,
    y: 410,
    labelSide: "below",
    line: "product",
    coming: true,
    sq: "Would a real user adopt it?",
    q: "Would real buyers and users discover, buy and use it?",
    takes: "Market segments, ICP, product access",
    produces: "Discover / Buy / Use scores from 1 to 5, a typical day, top irritants, simulated verbatims",
    feeds: ["productdd"],
    why: "Feeds /productdd. Recalibrated by real interviews from /interviewlog. Not yet on the public repo — coming soon.",
  },
  {
    id: "productdd",
    command: "/productdd",
    label: "Product Verdict",
    x: 520,
    y: 280,
    labelSide: "above",
    line: "product",
    hub: true,
    sq: "Does it grow? What breaks at 10x?",
    q: "Does the product keep growing? What breaks at 10x?",
    takes: "DD memo, cohorts, personas, interviews",
    produces: "Word memo: Invest / Conditional / Pass verdict, weighted scorecard, pyramid, positioning map, red flags",
    feeds: ["technicaldd", "valuecreation"],
    why: "The decision memo. Everything on the product line converges here.",
  },
  {
    id: "technicaldd",
    command: "/technicaldd",
    label: "Tech Scorecard",
    x: 720,
    y: 280,
    labelSide: "above",
    line: "technical",
    sq: "Does the tech back the claims?",
    q: "Does the technology back the claims? How deep is the debt?",
    takes: "Target and its product claims, optional CTO kits",
    produces: "6-axis scorecard (APIs, agent readiness, integration time, architecture, SLA, security), same verdict scale",
    feeds: ["valuecreation"],
    why: "Checks what /productdd could only take on trust.",
  },
  {
    id: "valuecreation",
    command: "/valuecreation",
    label: "The Plan",
    x: 920,
    y: 280,
    labelSide: "above",
    line: "technical",
    hub: true,
    sq: "What do we fix first?",
    q: "What do we fix first after investing, and how do we prove it?",
    takes: "Product and tech findings",
    produces: "Sized levers, 100-day plan, metrics that prove it worked, board asks",
    feeds: [],
    why: "Turns red flags into a board pack.",
  },
  {
    id: "interviewlog",
    command: "/interviewlog",
    label: "Interviews",
    x: 300,
    y: 500,
    labelSide: "below",
    line: "shared",
    sq: "What did people actually say?",
    q: "What did people actually say, in citable form?",
    takes: "Notes, voice memos, VTT/SRT transcripts, emails",
    produces: "Source log: one entry per call, verbatims, I-xx rows",
    feeds: ["duediligence", "productdd", "personapanel"],
    why: "Feeds evidence into every memo. Usable at any stop.",
  },
  {
    id: "onbrand",
    command: "/onbrand",
    label: "On-Brand",
    x: 960,
    y: 500,
    labelSide: "below",
    line: "shared",
    sq: "Will it land as theirs?",
    q: "Can this land as if it came from inside their house?",
    takes: "Any finished Word memo plus the target website",
    produces: "Re-skinned, co-branded document in the target palette",
    feeds: [],
    why: "Ships any memo as a work sample. Usable at any stop.",
  },
];

export const stationById = (id: string): Station => {
  const s = stations.find((st) => st.id === id);
  if (!s) throw new Error(`Unknown station: ${id}`);
  return s;
};

export const stationByIdSafe = (id: string): Station | undefined =>
  stations.find((st) => st.id === id);

export const githubUrlFor = (id: string) => `${GITHUB_URL}/tree/main/skills/${id}`;

export type Route = {
  id: string;
  name: string;
  stops: string[];
};

export const routes: Route[] = [
  {
    id: "full",
    name: "Full tour",
    stops: [
      "marketdd",
      "duediligence",
      "companypeople",
      "targetpeople",
      "interviewlog",
      "cohortlab",
      "personapanel",
      "productdd",
      "technicaldd",
      "valuecreation",
      "onbrand",
    ],
  },
  {
    id: "first",
    name: "First meeting",
    stops: ["marketdd", "duediligence", "companypeople", "targetpeople"],
  },
  {
    id: "invest",
    name: "Investment decision",
    stops: ["duediligence", "interviewlog", "cohortlab", "personapanel", "productdd", "technicaldd"],
  },
  {
    id: "after",
    name: "After the deal",
    stops: ["productdd", "valuecreation", "onbrand"],
  },
];

export const routeById = (id: string): Route => {
  const r = routes.find((rt) => rt.id === id);
  if (!r) throw new Error(`Unknown route: ${id}`);
  return r;
};

// Which lines a route touches, for the Downloads-section highlight.
export const linesForRoute = (route: Route): LineId[] => {
  const set = new Set<LineId>();
  for (const stopId of route.stops) {
    const s = stationById(stopId);
    if (s.line !== "shared") set.add(s.line);
  }
  return Array.from(set);
};

// Shared SVG viewBox geometry — padded beyond the 1100x580 station-coordinate
// space so edge-station labels (e.g. /marketdd's question, which centers
// right at x=80) don't clip against the viewBox boundary. Any code that maps
// a station's x/y into on-screen percentages (e.g. StationCard) must use
// these same padded dimensions to stay aligned with what MapSvg renders.
export const MAP_VIEWBOX = { w: 1100, h: 580, padX: 70, padY: 20 };

export type TrackSegment = {
  id: string;
  d: string; // SVG path
  line: LineId;
  dashed?: boolean;
};

// Track paths — draw order shared -> company -> product -> tech, matching
// the reviewed spec. viewBox 0 0 1100 580.
export const trackSegments: TrackSegment[] = [
  { id: "shared", d: "M40 500 H1060", line: "shared", dashed: true },
  { id: "company", d: "M80 280 H250 L400 130 H600", line: "company" },
  { id: "product-trunk", d: "M250 284 H920", line: "product" },
  { id: "product-feeders", d: "M440 410 H480 L520 370 V288 M610 410 H560 L520 370", line: "product" },
  { id: "tech", d: "M520 276 H920", line: "technical" },
];
