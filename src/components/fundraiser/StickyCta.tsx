"use client";

import { useEffect, useState } from "react";

import { CloseIcon } from "@/components/brand/Icons";
import { CTA_LABEL, SUPPORT_ANCHOR } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Mobile-only sticky call to action.
 *
 * It appears once the hero has scrolled away, gets out of the way again while
 * the support tiers are on screen (so it never covers the buttons it points
 * at), respects the safe-area inset, and can be dismissed. Small viewports only
 * — the desktop header CTA is always visible.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const support = document.getElementById("support");
    if (!hero) return;

    let heroPassed = false;
    let supportInView = false;

    const sync = () => setVisible(heroPassed && !supportInView);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting;
        sync();
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );
    heroObserver.observe(hero);

    let supportObserver: IntersectionObserver | undefined;
    if (support) {
      supportObserver = new IntersectionObserver(([entry]) => {
        supportInView = entry.isIntersecting;
        sync();
      });
      supportObserver.observe(support);
    }

    return () => {
      heroObserver.disconnect();
      supportObserver?.disconnect();
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-[var(--ease-za)] lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      // Hidden from assistive technology while off-screen so it never appears
      // in the tab order behind the page.
      inert={!visible}
    >
      <div className="border-t border-za-hairline bg-za-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <a
            href={SUPPORT_ANCHOR}
            onClick={() =>
              track({ name: "guardian_cta_clicked", location: "sticky-mobile" })
            }
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-za bg-za-gold px-5 py-3 text-[0.9375rem] font-semibold text-za-text transition-colors duration-200 hover:bg-za-gold-hover"
          >
            {CTA_LABEL}
          </a>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-za text-za-muted transition-colors duration-200 hover:bg-za-canvas hover:text-za-text"
          >
            <span className="sr-only">Dismiss this banner</span>
            <CloseIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
