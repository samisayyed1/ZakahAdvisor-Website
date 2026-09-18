"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children in as they scroll into view.
 *
 * Added for the design review of 2026-09-17: the Qur'an and Hadith passages
 * should arrive as the reader reaches them rather than sitting fully formed on
 * the page, so they read as a reminder rather than as a banner.
 *
 * It never hides anything it cannot bring back:
 *  - the hidden state is only ever applied from an effect, so with JavaScript
 *    off the children simply render;
 *  - anything already on screen at mount is left alone, so nothing flashes;
 *  - under prefers-reduced-motion it does nothing at all.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only arm what is still below the fold. Anything already in view stays put.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setHidden(true);

    let frame = 0;

    const check = () => {
      frame = 0;
      const current = ref.current;
      if (!current) return;
      // One test covers both cases: scrolling to it, and jumping past it. A
      // jump leaves the top edge negative, which is still above the line.
      //
      // This deliberately does not use IntersectionObserver. Going from below
      // the viewport to above it in a single frame never crosses a threshold,
      // so no callback is delivered at all and the passage would stay hidden
      // for the rest of the session.
      if (current.getBoundingClientRect().top >= window.innerHeight * 0.88) return;
      setHidden(false);
      stop();
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };

    function stop() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return stop;
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[var(--ease-za)] ${
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      {children}
    </div>
  );
}
