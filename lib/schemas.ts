/**
 * Zod schemas for all content/*.json data files and lib/stack.ts.
 *
 * This module validates every content file at import time, so any page
 * that imports it causes a build failure on malformed data.
 *
 * Import:  import "@/lib/schemas"  in any Server Component to trigger.
 */

import { z } from "zod";
import plansRaw    from "@/content/plans.json";
import providersRaw from "@/content/providers.json";
import claimsRaw   from "@/content/claims.json";
import { stations, routes, lines, validateFeeds } from "@/lib/stack";

// --------------------------------------------------------------------------
// Shared enums
// --------------------------------------------------------------------------

export const StatusTagSchema = z.enum(["At launch", "Next", "Later"]);
export const GradeSchema     = z.enum(["A", "B", "C"]);
export const LineIdSchema    = z.enum(["company", "product", "tech", "shared"]);
export const RouteIdSchema   = z.enum(["full", "first", "invest", "after"]);
export const StationIdSchema = z.enum([
  "marketdd", "duediligence", "companypeople", "targetpeople",
  "cohortlab", "personapanel", "productdd", "technicaldd",
  "valuecreation", "interviewlog", "onbrand",
]);

// --------------------------------------------------------------------------
// plans.json
// --------------------------------------------------------------------------

const PlanFeatureSchema = z.union([
  z.string(),
  z.object({ text: z.string(), status: StatusTagSchema }),
]);

const PlanSchema = z.object({
  id:      z.string().min(1),
  name:    z.string().min(1),
  tagline: z.string().min(1),
  limit:   z.string().min(1),
  price:   z.number().nullable(),
  features: z.array(PlanFeatureSchema).min(1),
  cta:     z.string().min(1),
  ctaHref: z.string().min(1),
});

export const PlansFileSchema = z.object({
  published: z.boolean(),
  plans:     z.array(PlanSchema).min(1),
});

export type PlansFile = z.infer<typeof PlansFileSchema>;

// --------------------------------------------------------------------------
// providers.json
// --------------------------------------------------------------------------

const ProviderSchema = z.object({
  id:           z.string().min(1),
  name:         z.string().min(1),
  description:  z.string().min(1),
  oauth_status: z.enum(["available", "pending"]),
  tag:          StatusTagSchema,
  note:         z.string().min(1),
});

export const ProvidersFileSchema = z.object({
  providers: z.array(ProviderSchema).min(1),
});

export type ProvidersFile = z.infer<typeof ProvidersFileSchema>;

// --------------------------------------------------------------------------
// claims.json
// --------------------------------------------------------------------------

const ClaimSchema = z.object({
  id:      z.string().min(1),
  value:   z.union([z.string(), z.number()]),
  unit:    z.string().min(1),
  context: z.string().min(1),
  source:  z.string().min(1),
  grade:   GradeSchema,
  pages:   z.array(z.string()).min(1),
  requiresFlag: z.string().optional(),
  gateS13:      z.boolean().optional(),
});

export const ClaimsFileSchema = z.object({
  claims: z.array(ClaimSchema).min(1),
});

export type ClaimsFile = z.infer<typeof ClaimsFileSchema>;

// --------------------------------------------------------------------------
// lib/stack.ts station schema
// --------------------------------------------------------------------------

const StationSchema = z.object({
  id:         StationIdSchema,
  step:       z.number().int().min(1).max(5).optional(),
  line:       LineIdSchema,
  hub:        z.boolean().optional(),
  isNew:      z.boolean().optional(),
  sq:         z.string().min(1),
  q:          z.string().min(1),
  takes:      z.string().min(1),
  produces:   z.string().min(1),
  feeds:      z.array(StationIdSchema),
  why:        z.string().min(1),
  run:        z.string().min(1),
  out:        z.string().min(1),
  x:          z.number(),
  y:          z.number(),
  labelSide:  z.enum(["above", "below"]),
});

const LineSchema = z.object({
  id:         LineIdSchema,
  name:       z.string().min(1),
  colorToken: z.string().startsWith("--"),
});

const RouteSchema = z.object({
  id:    RouteIdSchema,
  name:  z.string().min(1),
  stops: z.array(StationIdSchema).min(1),
});

// --------------------------------------------------------------------------
// Validate at module load — throws → build fails on bad data
// --------------------------------------------------------------------------

function validateAll() {
  const errors: string[] = [];

  // plans.json
  const plansResult = PlansFileSchema.safeParse(plansRaw);
  if (!plansResult.success) {
    errors.push(`content/plans.json:\n${plansResult.error.message}`);
  }

  // providers.json
  const provResult = ProvidersFileSchema.safeParse(providersRaw);
  if (!provResult.success) {
    errors.push(`content/providers.json:\n${provResult.error.message}`);
  }

  // claims.json
  const claimsResult = ClaimsFileSchema.safeParse(claimsRaw);
  if (!claimsResult.success) {
    errors.push(`content/claims.json:\n${claimsResult.error.message}`);
  }

  // lib/stack.ts — stations
  const stationsResult = z.array(StationSchema).length(11).safeParse(stations);
  if (!stationsResult.success) {
    errors.push(`lib/stack.ts stations:\n${stationsResult.error.message}`);
  }

  // lib/stack.ts — lines
  const linesResult = z.record(LineIdSchema, LineSchema).safeParse(lines);
  if (!linesResult.success) {
    errors.push(`lib/stack.ts lines:\n${linesResult.error.message}`);
  }

  // lib/stack.ts — routes
  const routesResult = z.array(RouteSchema).length(4).safeParse(routes);
  if (!routesResult.success) {
    errors.push(`lib/stack.ts routes:\n${routesResult.error.message}`);
  }

  // feeds graph integrity
  try {
    validateFeeds();
  } catch (e) {
    errors.push(`lib/stack.ts feeds graph: ${String(e)}`);
  }

  if (errors.length > 0) {
    throw new Error(
      `\n\n⛔ Content validation failed — fix these before building:\n\n${errors.join("\n\n")}`,
    );
  }
}

validateAll();

// --------------------------------------------------------------------------
// Typed, validated exports for use in Server Components
// --------------------------------------------------------------------------

export const plans    = PlansFileSchema.parse(plansRaw);
export const providers = ProvidersFileSchema.parse(providersRaw);
export const claims   = ClaimsFileSchema.parse(claimsRaw);
