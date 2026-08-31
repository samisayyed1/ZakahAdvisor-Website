"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { track, type AnalyticsEvent } from "@/lib/analytics";

/** An internal link that records a conversion event when it is followed. */
export function TrackedLink({
  href,
  event,
  children,
  className,
}: {
  href: string;
  event: AnalyticsEvent;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} onClick={() => track(event)} className={className}>
      {children}
    </Link>
  );
}
