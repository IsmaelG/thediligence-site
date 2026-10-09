const FOOTER_COLS = [
  {
    head: "Product",
    links: [
      { href: "/products",  label: "Products"                 },
      { href: "/platform",  label: "Platform and plans"       },
      { href: "/method",    label: "The method"               },
      { href: "/security",  label: "Security and compliance"  },
    ],
  },
  {
    head: "Work with us",
    links: [
      { href: "/solutions", label: "Solutions"   },
      { href: "/solutions#hire", label: "Hire us" },
      { href: "/book",      label: "Book time"   },
      { href: "/app",       label: "Start free"  },
    ],
  },
  {
    head: "Company",
    links: [
      { href: "/about",     label: "About us"      },
      { href: "/insights",  label: "Insights"      },
      {
        href: "https://linkedin.com/in/ismaelghozael",
        label: "Ismael Ghozael",
        external: true,
      },
      {
        href: "https://linkedin.com",
        label: "Mazen Wazni",
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
            <a href="/book" className="foot-link">
              ismael.ghozael@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
