/**
 * Background motifs, derived from the mark's own anatomy (brand guide §10):
 * the audit grid, the crescent sweep taken from the lower curve of the Audit
 * Glass, and the concentric investigation rings.
 *
 * All of these sit at 2–5% intensity. They are structure, not decoration, and
 * they never compete with the words in front of them. Every one is decorative
 * and hidden from assistive technology.
 */

type MotifProps = {
  className?: string;
};

/** A fine financial ruling grid. Used behind dark statement sections. */
export function AuditGrid({ className }: MotifProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="za-audit-grid"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M72 0H0v72"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#za-audit-grid)" />
    </svg>
  );
}

/**
 * The Crescent Sweep — the lower curve of the Audit Glass, blown up and used as
 * a section transition. Positioned by the caller.
 */
export function CrescentSweep({ className }: MotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M600 300a300 300 0 1 1-88-212"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M540 300a240 240 0 1 1-70-170"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M478 300a178 178 0 1 1-52-126"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Concentric investigation rings, for hero and statement compositions. */
export function AuditRings({ className }: MotifProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {[288, 232, 176, 120].map((r) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/**
 * The 'Z' extraction from the mark's negative space, tiled as a watermark.
 * Kept extremely faint — it should read as paper texture, not as a pattern.
 */
export function ZWatermark({ className }: MotifProps) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="za-z-watermark"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <path
            d="M74 76h52l-52 48h52"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#za-z-watermark)" />
    </svg>
  );
}
