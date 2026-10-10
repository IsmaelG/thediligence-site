import type { NextRequest } from "next/server";
import { appProxy } from "@/lib/flags";
import { forwardToPlatform } from "@/app/proxy";

const PLATFORM_ORIGIN = process.env.PLATFORM_ORIGIN ?? "";

async function handle(request: NextRequest): Promise<Response> {
  const enabled = await appProxy();

  if (!enabled || !PLATFORM_ORIGIN) {
    return new Response(comingSoonHtml(), {
      status: 503,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return forwardToPlatform(request, PLATFORM_ORIGIN);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const HEAD = handle;
export const OPTIONS = handle;

function comingSoonHtml(): string {
  return `<!DOCTYPE html>
<html lang="en" class="td">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TheDiligence — Coming soon</title>
  <style>
    body { background: #F5F3EE; color: #14161A; font: 400 17px/1.55 'Overpass',system-ui,sans-serif; margin: 0; -webkit-font-smoothing: antialiased; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .wrap { max-width: 600px; padding: 0 32px; text-align: center; }
    .eyebrow { font: 600 12px/1.3 'Overpass Mono',monospace; letter-spacing: .12em; text-transform: uppercase; color: #5A606A; margin-bottom: 20px; }
    h1 { font: 400 clamp(36px,4.9vw,56px)/1.05 'Newsreader',Georgia,serif; letter-spacing: -.02em; margin: 0 0 20px; }
    p { font-size: 18px; line-height: 1.5; color: #3A3F47; margin: 0 0 32px; }
    a.btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 28px; border-radius: 999px; font: 600 16px/1 'Overpass',system-ui,sans-serif; background: #14161A; color: #F5F3EE; text-decoration: none; border: 1.5px solid transparent; }
    a.btn:hover { background: #3A3F47; }
    a.btn-s { background: transparent; color: #14161A; border-color: #14161A; margin-left: 8px; }
    a.btn-s:hover { background: #14161A; color: #F5F3EE; }
  </style>
</head>
<body>
  <main class="wrap">
    <p class="eyebrow">Early access</p>
    <h1>The platform is getting ready.</h1>
    <p>We are preparing early access for a first cohort of operator-investors. Book time with us to get a first look.</p>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      <a class="btn" href="/book">Book time with us</a>
      <a class="btn btn-s" href="/platform">Learn more</a>
    </div>
  </main>
</body>
</html>`;
}
