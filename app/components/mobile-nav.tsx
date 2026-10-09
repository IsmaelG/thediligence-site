"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/products",  label: "Products"  },
  { href: "/solutions", label: "Solutions" },
  { href: "/method",    label: "Method"    },
  { href: "/security",  label: "Security"  },
  { href: "/about",     label: "About"     },
  // Mobile-only
  { href: "/platform",  label: "Platform"  },
  { href: "/insights",  label: "Insights"  },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Close on backdrop click
  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  }

  // Close on Escape (dialog handles it natively, but we also update state)
  function handleClose() {
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="drawer"
      onClick={handleClick}
      onClose={handleClose}
      aria-label="Navigation menu"
    >
      <div className="drawer-inner">
        <div className="drawer-header">
          <span
            className="nav-brand"
            style={{ fontSize: "15px", color: "var(--mut)" }}
          >
            TheDiligence
          </span>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="drawer-links" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="drawer-link"
              aria-current={pathname === href ? "page" : undefined}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="drawer-actions">
          <Link href="/platform" className="btn btn-p" onClick={onClose}>
            Start free
          </Link>
          <Link href="/contact" className="btn btn-s" onClick={onClose}>
            Book time with us
          </Link>
        </div>
      </div>
    </dialog>
  );
}

// The trigger button rendered inside the nav
export function MobileNavTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="nav-icon-btn nav-menu-btn"
      onClick={onClick}
      aria-label="Open navigation"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}
