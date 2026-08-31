"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { CloseIcon, MenuIcon } from "@/components/brand/Icons";
import { CtaButton } from "@/components/ui/CtaButton";
import { CTA_LABEL, navItems, SUPPORT_ANCHOR } from "@/content/site";
import { track } from "@/lib/analytics";

/**
 * Sticky header.
 *
 * Over the Deep Evergreen hero it is transparent and uses the dark-background
 * logo variant; once the hero is behind you it settles onto a light surface and
 * swaps to the light-background variant. Both are approved artwork — nothing is
 * auto-inverted.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the menu is open: lock the page, close on Escape, and keep Tab inside
  // the panel. The trap exists only for this modal-style menu.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-za)] ${
        solid
          ? "border-b border-za-hairline bg-za-surface/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="za-shell flex h-18 items-center justify-between gap-4 lg:h-20">
        <a
          href="#top"
          aria-label="Zakah Advisor — back to top"
          className="-m-2 shrink-0 rounded-za p-2"
        >
          <Logo
            variant={solid ? "light" : "inverse"}
            priority
            decorative
            // Brand guide §5: the horizontal logo is never rendered below
            // 120px wide. At the delivered 3.156:1 ratio, h-10 = 126px.
            className="h-10 w-auto lg:h-11"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-za px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200 ${
                solid
                  ? "text-za-text/80 hover:text-za-green"
                  : "text-za-on-dark/85 hover:text-za-gold"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrapped rather than given `hidden sm:inline-flex`: the button's
              own `inline-flex` is a display utility too, and which one wins
              depends on stylesheet order, not class order. */}
          <div className="hidden sm:block">
            <CtaButton location="header" className="px-5 py-2.5 text-sm" />
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`-mr-2 inline-flex size-11 items-center justify-center rounded-za transition-colors duration-200 lg:hidden ${
              solid ? "text-za-text hover:bg-za-canvas" : "text-za-on-dark hover:bg-white/10"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <CloseIcon className="size-6" />
            ) : (
              <MenuIcon className="size-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel. Rendered only when open so nothing focusable hides
          off-screen, and kept short enough that it never becomes a drawer. */}
      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          className="border-t border-za-hairline bg-za-surface lg:hidden"
        >
          <nav aria-label="Primary (mobile)" className="za-shell py-3">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex min-h-13 items-center border-b border-za-hairline text-base font-medium text-za-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={SUPPORT_ANCHOR}
              onClick={() => {
                track({ name: "guardian_cta_clicked", location: "header" });
                close();
              }}
              className="mt-4 mb-3 flex min-h-12 items-center justify-center rounded-za bg-za-gold px-6 py-3.5 text-[0.9375rem] font-semibold text-za-text transition-colors duration-200 hover:bg-za-gold-hover"
            >
              {CTA_LABEL}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
