// Generated from spec/markup golden files. Do not restyle: change the markup in spec/ first.
// Shared nav + footer shell used by composed interactive pages.
import { links } from "@/lib/links";

type Page = "products" | "solutions" | "method" | "security" | "about" | "platform" | "insights" | "book";

function NavLink({ href, page, active }: { href: string; page: string; active: Page | undefined }) {
  const isCurrent = active && href === `/${active}`;
  return (
    <a href={href} {...(isCurrent ? { "aria-current": "page" as const } : {})}>
      {page}
    </a>
  );
}

export function SiteShell({
  children,
  activePage,
}: {
  children: React.ReactNode;
  activePage?: Page;
}) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="nav">
        <div className="wrap navin">
          <a className="brand" href="/" aria-label="TheDiligence, home">
            <span className="mark" aria-hidden="true">
              <i style={{ height: "12px", background: "var(--blue)" }}></i>
              <i style={{ height: "22px", background: "var(--orange)" }}></i>
              <i style={{ height: "16px", background: "var(--green)" }}></i>
            </span>
            TheDiligence
          </a>
          <nav className="links" aria-label="Main">
            <NavLink href="/products" page="Products" active={activePage} />
            <NavLink href="/solutions" page="Solutions" active={activePage} />
            <NavLink href="/method" page="Method" active={activePage} />
            <NavLink href="/security" page="Security" active={activePage} />
            <NavLink href="/about" page="About" active={activePage} />
          </nav>
          <div className="navr">
            <a className="btn btn-s btn-sm" href="/book">
              Book time
            </a>
            <a className="btn btn-p btn-sm" href={links.START_FREE}>
              Start free
            </a>
            <details className="menu">
              <summary aria-label="Open menu">
                <span className="burger" aria-hidden="true"></span>
              </summary>
              <div className="menu-p">
                <a href="/products" {...(activePage === "products" ? { "aria-current": "page" as const } : {})}>
                  Products
                </a>
                <a href="/solutions" {...(activePage === "solutions" ? { "aria-current": "page" as const } : {})}>
                  Solutions
                </a>
                <a href="/method" {...(activePage === "method" ? { "aria-current": "page" as const } : {})}>
                  Method
                </a>
                <a href="/security" {...(activePage === "security" ? { "aria-current": "page" as const } : {})}>
                  Security
                </a>
                <a href="/about" {...(activePage === "about" ? { "aria-current": "page" as const } : {})}>
                  About
                </a>
                <a href="/platform" {...(activePage === "platform" ? { "aria-current": "page" as const } : {})}>
                  Platform
                </a>
                <a href="/insights" {...(activePage === "insights" ? { "aria-current": "page" as const } : {})}>
                  Insights
                </a>
                <a href="/book" {...(activePage === "book" ? { "aria-current": "page" as const } : {})}>
                  Book time
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="foot">
        <div className="wrap">
          <div className="footg">
            <div className="stack-m">
              <a className="brand" href="/" aria-label="TheDiligence, home">
                <span className="mark" aria-hidden="true">
                  <i style={{ height: "12px", background: "var(--blue)" }}></i>
                  <i style={{ height: "22px", background: "var(--orange)" }}></i>
                  <i style={{ height: "16px", background: "var(--green)" }}></i>
                </span>
                TheDiligence
              </a>
              <p className="body" style={{ maxWidth: "34ch" }}>
                Skilled agents, orchestrated for evidence. Built by operator-investors, for operator-investors.
              </p>
              <p className="small">Paris and London</p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/platform">Platform and plans</a>
                </li>
                <li>
                  <a href="/method">The method</a>
                </li>
                <li>
                  <a href="/security">Security and compliance</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Work with us</h4>
              <ul>
                <li>
                  <a href="/solutions">Solutions</a>
                </li>
                <li>
                  <a href="/solutions#hire">Hire us</a>
                </li>
                <li>
                  <a href="/book">Book time</a>
                </li>
                <li>
                  <a href={links.START_FREE}>Start free</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/about">About us</a>
                </li>
                <li>
                  <a href="/insights">Insights</a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/ismaelghozael/"
                    target="_blank"
                    rel="noopener"
                  >
                    Ismael Ghozael
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mazenwazni/"
                    target="_blank"
                    rel="noopener"
                  >
                    Mazen Wazni
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footb">
            <span>TheDiligence is a working name.</span>
            <span>Evidence-graded analysis, not investment advice.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
