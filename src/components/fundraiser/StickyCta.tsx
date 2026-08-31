"use client";

import { useEffect, useState } from "react";

import { CloseIcon } from "@/components/brand/Icons";
import { CTA_LABEL, SUPPORT_ANCHOR } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Mobile-only sticky call to action.
 *
 * It appears once the hero has scrolled away and steps aside again wherever the
 * page already puts a full-size CTA in front of the reader — the support tiers
 * and the closing section — so it never covers the buttons it points at, and
 * never sits on top of the footer. It respects the safe-area inset and can be
 * dismissed. Small viewports only; the desktop header CTA is always visible.
 */

/** Sections that already carry their own CTA, so the bar stands down. */
const QUIET_ZONES = ["support", "final"];

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    let heroPassed = false;
    const quiet = new Set<string>();

    const sync = () => setVisible(heroPassed && quiet.size === 0);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroPassed = !entry.isIntersecting;
        sync();
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );
    heroObserver.observe(hero);

    const quietObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = entry.target.id;
        if (entry.isIntersecting) quiet.add(id);
        else quiet.delete(id);
      }
      sync();
    });

    for (const id of QUIET_ZONES) {
      const element = document.getElementById(id);
      if (element) quietObserver.observe(element);
    }

    // The footer sits below the last quiet zone; keep the bar away from it too.
    const footer = document.querySelector("footer");
    let footerObserver: IntersectionObserver | undefined;
    if (footer) {
      footerObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) quiet.add("footer");
        else quiet.delete("footer");
        sync();
      });
      footerObserver.observe(footer);
    }

    return () => {
      heroObserver.disconnect();
      quietObserver.disconnect();
      footerObserver?.disconnect();
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
      <div className="border-t border-za-hairline bg-za-surface/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(26,26,26,0.35)] backdrop-blur-md">
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
