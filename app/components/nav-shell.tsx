"use client";

import { useState } from "react";
import { MobileNav, MobileNavTrigger } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

/**
 * NavShell — the client wrapper that owns the mobile drawer open/close state.
 * Rendered inside SiteHeader (a Server Component).
 */
export function NavShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="nav-actions">
        <ThemeToggle />
        <MobileNavTrigger onClick={() => setDrawerOpen(true)} />
        {/* Desktop CTAs (hidden on mobile via CSS) */}
        <a href="/platform" className="btn btn-p" style={{ fontSize: "14px", padding: "8px 20px" }}>
          Start free
        </a>
        <a href="/contact" className="btn btn-s" style={{ fontSize: "14px", padding: "8px 20px" }}>
          Book time with us
        </a>
      </div>
      <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
