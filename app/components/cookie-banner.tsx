"use client";

/**
 * CookieBanner — dormant until analytics are activated.
 *
 * To activate: set `NEXT_PUBLIC_ANALYTICS_ACTIVE=true` (or flip the
 * `analytics_active` flag). Until then this component renders nothing.
 */
export function CookieBanner() {
  // Dormant: no analytics on the site yet (no third-party scripts).
  // This component is a shell so the layout and consent flow are ready.
  if (process.env.NEXT_PUBLIC_ANALYTICS_ACTIVE !== "true") {
    return null;
  }

  return (
    <div
      className="cookie-banner"
      role="region"
      aria-label="Cookie preferences"
    >
      <div>
        <p className="body" style={{ margin: 0 }}>
          We use anonymous analytics to improve the site. No tracking across
          other sites, no ads.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="btn btn-p"
          style={{ fontSize: "14px" }}
          onClick={() => {
            localStorage.setItem("cookie-consent", "accepted");
          }}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-s"
          style={{ fontSize: "14px" }}
          onClick={() => {
            localStorage.setItem("cookie-consent", "declined");
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
