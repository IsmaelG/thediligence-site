import type { NextRequest } from "next/server";

/**
 * Forward a Next.js request to the platform.
 * Called by app/app/[[...slug]]/route.ts when app_proxy is ON.
 * Strips hop-by-hop headers; forwards body verbatim.
 */
export async function forwardToPlatform(
  request: NextRequest,
  platformOrigin: string,
): Promise<Response> {
  const url = new URL(request.url);
  const target = `${platformOrigin}${url.pathname}${url.search}`;

  const headers = new Headers();
  const HOP_BY_HOP = new Set([
    "host", "connection", "transfer-encoding", "te",
    "trailer", "upgrade", "keep-alive", "proxy-connection",
  ]);
  // Headers that must never be forwarded to avoid encoding/caching mismatches
  const STRIP_REQUEST = new Set(["accept-encoding"]);
  for (const [key, value] of request.headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase()) && !STRIP_REQUEST.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }
  // Ask the upstream for uncompressed content so we can forward the body verbatim
  headers.set("accept-encoding", "identity");

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.arrayBuffer()
      : undefined;

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  });

  // Return upstream response as-is, stripping headers that must not be forwarded
  const STRIP_RESPONSE = new Set([
    ...HOP_BY_HOP,
    "content-encoding", // upstream may have compressed; body is already decoded
    "content-length",   // let the runtime recalculate from the actual body
  ]);
  const responseHeaders = new Headers();
  for (const [key, value] of upstream.headers.entries()) {
    if (!STRIP_RESPONSE.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  }

  const bodyBytes = new Uint8Array(await upstream.arrayBuffer());
  return new Response(bodyBytes.byteLength > 0 ? bodyBytes : null, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
