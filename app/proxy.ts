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
  for (const [key, value] of request.headers.entries()) {
    if (!HOP_BY_HOP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

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

  // Return upstream response as-is
  const responseHeaders = new Headers(upstream.headers);
  // Strip hop-by-hop from upstream response too
  for (const h of HOP_BY_HOP) {
    responseHeaders.delete(h);
  }

  const bodyBuffer = await upstream.arrayBuffer();
  return new Response(bodyBuffer.byteLength > 0 ? bodyBuffer : null, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}
