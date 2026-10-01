// Single, always-present download CTA for mobile — replaces the desktop's
// route-dependent 1-3-button row (too much for a phone screen). Jumps to
// the real Downloads section further down the homepage rather than naming
// one specific pack, since mobile no longer tracks a "selected route."
export function MobileDownloadCta() {
  return (
    <div className="mt-6">
      <a
        href="#downloads"
        className="block rounded-md bg-accent px-5 py-3 text-center text-sm font-medium text-accent-foreground transition hover:opacity-90"
      >
        Download the Diligence Stack
      </a>
    </div>
  );
}
