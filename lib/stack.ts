/**
 * The eleven stations of the Diligence Stack method.
 *
 * Source of truth: docs/diligence-map-SPEC.md §3 and §4.
 * Also used by the platform (copied there by hand in v1, see INTERFACE §5).
 *
 * ⚠️ The `run` commands are placeholder syntax. Replace with real invocations
 * before launch (SPEC.md s1-data Done).
 */

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

export type LineId = "company" | "product" | "tech" | "shared";
export type RouteId = "full" | "first" | "invest" | "after";
export type StationId =
  | "marketdd"
  | "duediligence"
  | "companypeople"
  | "targetpeople"
  | "cohortlab"
  | "personapanel"
  | "productdd"
  | "technicaldd"
  | "valuecreation"
  | "interviewlog"
  | "onbrand";

export interface Station {
  id: StationId;
  /** Main-trunk step number 1–5 (undefined for feeder stations) */
  step?: number;
  line: LineId;
  /** Interchange hub (shown as a rounded rect, not a circle) */
  hub?: boolean;
  /** New skill — shown with "NEW" tag on map */
  isNew?: boolean;
  /** Short question shown on the map at rest */
  sq: string;
  /** Full question shown in Now panel and hover card */
  q: string;
  takes: string;
  produces: string;
  /** IDs of stations this one feeds into */
  feeds: StationId[];
  why: string;
  /** Placeholder run command — replace before launch */
  run: string;
  /** Output format */
  out: string;
  /** SVG coordinates (viewBox 0 0 1100 580) */
  x: number;
  y: number;
  /** Which side to place labels */
  labelSide: "above" | "below";
}

export interface Route {
  id: RouteId;
  name: string;
  stops: StationId[];
}

export interface Line {
  id: LineId;
  name: string;
  /** CSS custom property token name for the line colour */
  colorToken: string;
}

// --------------------------------------------------------------------------
// Lines
// --------------------------------------------------------------------------

export const lines: Record<LineId, Line> = {
  company: { id: "company", name: "Company diligence", colorToken: "--blue" },
  product: { id: "product", name: "Product diligence", colorToken: "--orange" },
  tech:    { id: "tech",    name: "Technical diligence", colorToken: "--green" },
  shared:  { id: "shared",  name: "Shared line", colorToken: "--shared" },
};

/** Resolved CSS colour for a given line, as a CSS var() reference */
export function lineColorVar(line: LineId): string {
  return `var(${lines[line].colorToken})`;
}

// --------------------------------------------------------------------------
// Stations
// --------------------------------------------------------------------------

export const stations: Station[] = [
  {
    id: "marketdd",
    step: 1,
    line: "company",
    sq: "How big is the market?",
    q: "How big is the market, how fast does it grow, who plays, and what are the 5 trends?",
    takes: "A sector or software category",
    produces:
      "Word + PDF deep dive in 10 fixed sections: sizing, value chain, players, M&A, segments, 5 trends",
    feeds: ["duediligence", "personapanel", "productdd"],
    why: "Runs first inside /duediligence. Its segments seed /personapanel and its sizing builds the /productdd pyramid.",
    run: "/marketdd \"<sector>\"",
    out: ".docx + .pdf",
    x: 80,  y: 280, labelSide: "below",
  },
  {
    id: "duediligence",
    step: 2,
    line: "company",
    hub: true,
    sq: "Is it a good company?",
    q: "Is this a good company? Financials, strategy, ownership, founders?",
    takes: "A company name",
    produces:
      "2-page Word memo with exhibits: financials (or proxy signals), SWOT, ownership, org chart with the digital leader",
    feeds: ["companypeople", "productdd"],
    why: "Together with /marketdd it forms Report 1. It is the entry point for both the people line and the product line.",
    run: "/duediligence \"<company>\"",
    out: ".docx",
    x: 250, y: 280, labelSide: "below",
  },
  {
    id: "companypeople",
    line: "company",
    sq: "Who actually decides?",
    q: "Who really decides, and how do I reach them?",
    takes: "A company name or an existing DD memo",
    produces:
      "Word people map: org chart, one card per person, email with confidence score, opening message",
    feeds: ["targetpeople"],
    why: "Turns the org chart into named people you can act on.",
    run: "/companypeople \"<company or memo>\"",
    out: ".docx",
    x: 400, y: 130, labelSide: "above",
  },
  {
    id: "targetpeople",
    line: "company",
    sq: "How do I get in front of them?",
    q: "How do I actually get a meeting with these people?",
    takes: "Names plus the angle you are pursuing",
    produces:
      "Outreach plan: routes ranked by odds of landing, timed message sequence",
    feeds: [],
    why: "End of the company line. The output is a meeting, not a memo.",
    run: "/targetpeople \"<names>\" --angle \"<why>\"",
    out: ".docx",
    x: 600, y: 130, labelSide: "above",
  },
  {
    id: "cohortlab",
    line: "product",
    sq: "Does retention flatten?",
    q: "Does retention flatten? How good is the revenue?",
    takes: "Customer revenue or MRR export",
    produces:
      "Retention triangles, NRR/GRR bridge, concentration, ready-made chart specs",
    feeds: ["productdd"],
    why: "Hard numbers behind the /productdd verdict. Called automatically when raw data exists.",
    run: "/cohortlab revenue_export.csv",
    out: "charts + tables",
    x: 440, y: 410, labelSide: "below",
  },
  {
    id: "personapanel",
    line: "product",
    isNew: true,
    sq: "Would a real user adopt it?",
    q: "Would real buyers and users discover, buy and use it?",
    takes: "Market segments, ICP, product access",
    produces:
      "Discover / Buy / Use scores from 1 to 5, a typical day, top irritants, simulated verbatims",
    feeds: ["productdd"],
    why: "Feeds /productdd. Recalibrated by real interviews from /interviewlog.",
    run: "/personapanel \"<product>\" --segments \"<ICP>\"",
    out: "scores + verbatims",
    x: 610, y: 410, labelSide: "below",
  },
  {
    id: "productdd",
    step: 3,
    line: "product",
    hub: true,
    sq: "Does it grow? What breaks at 10x?",
    q: "Does the product keep growing? What breaks at 10x?",
    takes: "DD memo, cohorts, personas, interviews",
    produces:
      "Word memo: Invest / Conditional / Pass verdict, weighted scorecard, pyramid, positioning map, red flags, data-needed appendix",
    feeds: ["technicaldd", "valuecreation"],
    why: "The decision memo. Everything on the product line converges here.",
    run: "/productdd \"<company>\"",
    out: ".docx",
    x: 520, y: 280, labelSide: "above",
  },
  {
    id: "technicaldd",
    step: 4,
    line: "tech",
    sq: "Does the tech back the claims?",
    q: "Does the technology back the claims? How deep is the debt?",
    takes: "Target and its product claims, optional CTO kits",
    produces:
      "6-axis scorecard (APIs, MCP readiness, integration time, architecture, SLA, security), same verdict scale",
    feeds: ["valuecreation"],
    why: "Checks what /productdd could only take on trust.",
    run: "/technicaldd \"<target>\"",
    out: ".docx",
    x: 720, y: 280, labelSide: "above",
  },
  {
    id: "valuecreation",
    step: 5,
    line: "tech",
    hub: true,
    sq: "What do we fix first?",
    q: "What do we fix first after investing, and how do we prove it?",
    takes: "Product and tech findings",
    produces:
      "Sized levers, 100-day plan, metrics that prove it worked, board asks",
    feeds: [],
    why: "Turns red flags into a board pack.",
    run: "/valuecreation \"<company>\"",
    out: ".docx (board pack)",
    x: 920, y: 280, labelSide: "above",
  },
  {
    id: "interviewlog",
    line: "shared",
    sq: "What did people actually say?",
    q: "What did people actually say, in citable form?",
    takes: "Notes, voice memos, VTT/SRT transcripts, emails",
    produces: "Source log: one entry per call, verbatims, I-xx rows",
    feeds: ["duediligence", "productdd", "personapanel"],
    why: "Feeds evidence into every memo. Usable at any stop.",
    run: "/interviewlog notes/*.vtt",
    out: "source log",
    x: 300, y: 500, labelSide: "below",
  },
  {
    id: "onbrand",
    line: "shared",
    sq: "Will it land as theirs?",
    q: "Can this land as if it came from inside their house?",
    takes: "Any finished Word memo plus the target website",
    produces: "Re-skinned, co-branded document in the target palette",
    feeds: [],
    why: "Ships any memo as a work sample. Usable at any stop.",
    run: "/onbrand memo.docx --site \"<target.com>\"",
    out: ".docx",
    x: 960, y: 500, labelSide: "below",
  },
];

// --------------------------------------------------------------------------
// Routes
// --------------------------------------------------------------------------

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
    stops: [
      "duediligence",
      "interviewlog",
      "cohortlab",
      "personapanel",
      "productdd",
      "technicaldd",
    ],
  },
  {
    id: "after",
    name: "After the deal",
    stops: ["productdd", "valuecreation", "onbrand"],
  },
];

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Find a station by ID. Throws if not found. */
export function stationById(id: StationId): Station {
  const s = stations.find((st) => st.id === id);
  if (!s) throw new Error(`Station not found: ${id}`);
  return s;
}

/** Find a station by ID, returning undefined if not found. */
export function stationByIdSafe(id: string): Station | undefined {
  return stations.find((st) => st.id === id);
}

/** Find a route by ID. Throws if not found. */
export function routeById(id: RouteId): Route {
  const r = routes.find((rt) => rt.id === id);
  if (!r) throw new Error(`Route not found: ${id}`);
  return r;
}

/** Map viewBox dimensions (shared with map components) */
export const MAP_VIEWBOX = {
  w: 1100,
  h: 580,
  padX: 70,
  padY: 20,
} as const;

/**
 * Track path segments (draw order: shared → company → product → feeders → tech).
 * Path coordinates are in viewBox 0 0 1100 580 units.
 */
export const trackSegments = [
  { line: "shared"  as LineId, d: "M40 500 H1060",                                              style: "dashed" },
  { line: "company" as LineId, d: "M80 280 H250 L400 130 H600",                                 style: "solid"  },
  { line: "product" as LineId, d: "M250 284 H920",                                              style: "solid"  },
  { line: "product" as LineId, d: "M440 410 H480 L520 370 V288 M610 410 H560 L520 370",         style: "solid"  },
  { line: "tech"    as LineId, d: "M520 276 H920",                                              style: "solid"  },
] as const;

/**
 * Validation: confirm the feeds graph matches the spec.
 * Called at build time by zod schema (s1-data).
 */
export function validateFeeds(): void {
  const ids = new Set(stations.map((s) => s.id));
  for (const station of stations) {
    for (const feedId of station.feeds) {
      if (!ids.has(feedId)) {
        throw new Error(
          `Station "${station.id}" feeds into unknown id "${feedId}"`,
        );
      }
    }
  }
}
