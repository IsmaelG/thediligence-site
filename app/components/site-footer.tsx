const FOOTER_COLS = [
  {
    head: "Product",
    links: [
      { href: "/platform",  label: "Platform"  },
      { href: "/products",  label: "Skills"    },
      { href: "/method",    label: "Method"    },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    head: "Company",
    links: [
      { href: "/solutions", label: "Solutions" },
      { href: "/about",     label: "About"     },
      { href: "/insights",  label: "Insights"  },
      { href: "/contact",   label: "Contact"   },
    ],
  },
  {
    head: "Legal",
    links: [
      { href: "/security", label: "Security" },
      { href: "/privacy",  label: "Privacy"  },
      { href: "/terms",    label: "Terms"    },
      {
        href: "https://status.thediligence.app",
        label: "Status",
        external: true,
      },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          {/* Brand column */}
          <div className="foot-brand-col">
            <p
              className="nav-brand"
              style={{ marginBottom: "var(--sp-12)", display: "block" }}
            >
              TheDiligence
            </p>
            <p className="small" style={{ maxWidth: "26ch", margin: 0 }}>
              Evidence-graded analysis, not investment advice.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.head}>
              <span className="foot-col-head">{col.head}</span>
              <ul className="foot-links">
                {col.links.map(({ href, label, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="foot-link"
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {label}
                      {external && (
                        <span aria-hidden="true" style={{ marginLeft: "2px" }}>
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot-meta">
          <p className="small">
            TheDiligence is a working name.{" "}
            <span style={{ color: "var(--mut)", opacity: 0.7 }}>
              © {new Date().getFullYear()} TheDiligence.
            </span>
          </p>
          <p className="small">
            <a href="/contact" className="foot-link">
              ismael.ghozael@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
