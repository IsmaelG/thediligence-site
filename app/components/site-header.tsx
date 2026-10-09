import Link from "next/link";
import { NavShell } from "./nav-shell";

const DESKTOP_LINKS = [
  { href: "/products",  label: "Products"  },
  { href: "/solutions", label: "Solutions" },
  { href: "/method",    label: "Method"    },
  { href: "/security",  label: "Security"  },
  { href: "/about",     label: "About"     },
];

export function SiteHeader() {
  return (
    <header className="nav">
      <div className="wrap">
        {/* Wordmark */}
        <Link href="/" className="nav-brand" aria-label="TheDiligence — home">
          TheDiligence
        </Link>

        {/* Desktop links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {DESKTOP_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions: theme toggle, mobile trigger, desktop CTAs */}
        <NavShell />
      </div>
    </header>
  );
}
