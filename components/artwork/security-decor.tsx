/**
 * Cohesive mechanical locksmith & security-hardware decorations:
 * combination safe dial, brass padlock, riveted security seal, and keyway divider.
 * Uses only theme CSS variables so light and dark modes stay balanced.
 */

export function SafeDialMedallion({
  className = '',
  decorative = true,
}: {
  className?: string;
  decorative?: boolean;
}) {
  const ticks = Array.from({ length: 40 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Engraved combination safe dial'}
      className={`print-hide block ${className}`}
    >
      <defs>
        <pattern id="sd-knurl" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--lacquer)" strokeWidth="1.2" strokeOpacity="0.35" />
        </pattern>
      </defs>

      {/* Outer heavy vault bezel */}
      <circle cx="120" cy="120" r="112" fill="var(--surface)" stroke="var(--lacquer)" strokeWidth="2.5" />
      <circle cx="120" cy="120" r="103" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.5" />

      {/* Top opening index triangle */}
      <polygon points="120,24 114,13 126,13" fill="var(--alert)" stroke="var(--lacquer)" strokeWidth="1" />

      {/* Graduated brass dial ring */}
      <circle cx="120" cy="120" r="92" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.25" />

      {/* 40 precision dial ticks */}
      {ticks.map(i => {
        const angle = (i * 360) / 40 - 90;
        const rad = (angle * Math.PI) / 180;
        const isMajor = i % 5 === 0;
        const r1 = isMajor ? 74 : 81;
        const r2 = 90;
        const x1 = 120 + Math.cos(rad) * r1;
        const y1 = 120 + Math.sin(rad) * r1;
        const x2 = 120 + Math.cos(rad) * r2;
        const y2 = 120 + Math.sin(rad) * r2;
        return (
          <line
            key={i}
            x1={x1.toFixed(1)}
            y1={y1.toFixed(1)}
            x2={x2.toFixed(1)}
            y2={y2.toFixed(1)}
            stroke="var(--brass)"
            strokeWidth={isMajor ? '1.8' : '1'}
            strokeOpacity={isMajor ? '0.95' : '0.6'}
          />
        );
      })}

      {/* Cardinal dial numerals */}
      <text x="120" y="64" textAnchor="middle" fill="var(--on-lacquer)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">0</text>
      <text x="176" y="124" textAnchor="middle" fill="var(--on-lacquer)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">25</text>
      <text x="120" y="184" textAnchor="middle" fill="var(--on-lacquer)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">50</text>
      <text x="64" y="124" textAnchor="middle" fill="var(--on-lacquer)" fontFamily="var(--font-mono)" fontSize="12" fontWeight="600">75</text>

      {/* Inner knurled brass spinner knob */}
      <circle cx="120" cy="120" r="46" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="2" />
      <circle cx="120" cy="120" r="42" fill="url(#sd-knurl)" />
      <circle cx="120" cy="120" r="30" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.5" />

      {/* Center keyhole & grip ribs */}
      <circle cx="120" cy="115" r="6" fill="var(--brass)" />
      <path d="M117 118L115 133H125L123 118Z" fill="var(--brass)" />
      <circle cx="120" cy="120" r="22" stroke="var(--brass)" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.65" />

      {/* Corner bezel screws */}
      {[45, 135, 225, 315].map(deg => {
        const rad = (deg * Math.PI) / 180;
        const cx = 120 + Math.cos(rad) * 107.5;
        const cy = 120 + Math.sin(rad) * 107.5;
        return (
          <circle key={deg} cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="2.8" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1" />
        );
      })}
    </svg>
  );
}

/** Engraved brass padlock & shackle emblem for security/contact motifs. */
export function PadlockArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 190"
      fill="none"
      aria-hidden="true"
      className={`print-hide block ${className}`}
    >
      <defs>
        <pattern id="pl-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.28" />
        </pattern>
      </defs>

      {/* Background brass tag silhouette behind padlock */}
      <rect x="16" y="34" width="188" height="136" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.4" strokeDasharray="4 3" />

      {/* Hardened steel shackle */}
      <path
        d="M74 82V52C74 30 90 16 110 16C130 16 146 30 146 52V82"
        stroke="var(--lacquer)"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d="M74 82V52C74 30 90 16 110 16C130 16 146 30 146 52V82"
        stroke="var(--raised)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M74 82V52C74 30 90 16 110 16C130 16 146 30 146 52V82"
        stroke="var(--brass)"
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />

      {/* Heavy solid brass padlock body */}
      <rect x="52" y="76" width="116" height="94" rx="8" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="2.2" />
      <rect x="52" y="76" width="116" height="94" rx="8" fill="url(#pl-hatch)" />
      {/* Inner engraved bevel */}
      <rect x="61" y="85" width="98" height="76" rx="4" fill="none" stroke="var(--lacquer)" strokeWidth="1.2" strokeOpacity="0.65" />

      {/* Rivets */}
      <circle cx="68" cy="92" r="2.5" fill="var(--lacquer)" />
      <circle cx="152" cy="92" r="2.5" fill="var(--lacquer)" />
      <circle cx="68" cy="154" r="2.5" fill="var(--lacquer)" />
      <circle cx="152" cy="154" r="2.5" fill="var(--lacquer)" />

      {/* Keyhole escutcheon */}
      <circle cx="110" cy="117" r="19" fill="var(--lacquer)" stroke="var(--raised)" strokeWidth="1.4" />
      <circle cx="110" cy="113" r="6" fill="var(--brass)" />
      <path d="M107 116L105 129H115L113 116Z" fill="var(--brass)" />

      {/* Bottom brass stamp */}
      <text x="110" y="153" textAnchor="middle" fill="var(--lacquer)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="600" letterSpacing="1.6">
        SOLID BRASS · PDX
      </text>
    </svg>
  );
}

/** Subtle engraved horizontal rule with a centred brass escutcheon keyhole ornament. */
export function KeywayDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`print-hide flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-line" />
      <svg width="46" height="20" viewBox="0 0 46 20" fill="none">
        <rect x="1" y="1" width="44" height="18" rx="9" fill="var(--surface)" stroke="var(--brass)" strokeWidth="1.3" />
        <circle cx="10" cy="10" r="1.5" fill="var(--brass-text)" />
        <circle cx="36" cy="10" r="1.5" fill="var(--brass-text)" />
        <circle cx="23" cy="8.5" r="2.6" fill="var(--lacquer)" />
        <path d="M21.5 10L20.8 14.8H25.2L24.5 10Z" fill="var(--lacquer)" />
      </svg>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Small inline 18px engraved padlock badge for spec strips & security plates. */
export function MiniPadlockIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={className}>
      <path d="M6.5 9V6.2C6.5 4.2 8 2.8 10 2.8C12 2.8 13.5 4.2 13.5 6.2V9" strokeLinecap="round" />
      <rect x="4" y="9" width="12" height="8.5" rx="1.5" />
      <circle cx="10" cy="12.7" r="1.1" fill="currentColor" stroke="none" />
      <path d="M10 13.8V15.3" strokeLinecap="round" />
    </svg>
  );
}
