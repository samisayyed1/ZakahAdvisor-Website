import { Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { navItems, site } from "@/content/site";

/**
 * Footer.
 *
 * Deliberately sparse. No address, registration number, telephone number,
 * e-mail address or social handle appears here: none was supplied in the
 * approved source material, and inventing one on a page about financial
 * transparency is not an option.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-za-dark-canvas text-za-dark-text">
      <div className="za-shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <Logo variant="inverse" className="h-10 w-auto" />

            <p className="za-measure-tight mt-6 text-[0.9375rem] leading-relaxed text-za-dark-muted">
              Independent charity audits and Zakah education — protecting the
              donor, holding charities accountable, and safeguarding the rights
              of those eligible to receive Zakah.
            </p>

            <p className="mt-6 font-display text-[0.9375rem] font-semibold tracking-[0.02em] text-za-gold">
              {site.domain}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <h2 className="za-eyebrow text-za-dark-muted">On this page</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    {/* Root-relative so these still work from /legal. On the
                        home page the browser treats it as a same-document
                        fragment and simply scrolls. */}
                    <a
                      href={`/${item.href}`}
                      className="text-[0.9375rem] text-za-dark-text transition-colors duration-200 hover:text-za-gold"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="za-eyebrow text-za-dark-muted">Legal</h2>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <TrackedLink
                    href="/legal"
                    event={{ name: "legal_opened", location: "footer" }}
                    className="text-[0.9375rem] text-za-dark-text transition-colors duration-200 hover:text-za-gold"
                  >
                    Legal Disclaimers &amp; Terms of Use
                  </TrackedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-za-dark-muted">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-sm text-za-dark-muted">
            Donations to {site.name} are Sadaqah, not Zakah.
          </p>
        </div>
      </div>
    </footer>
  );
}
