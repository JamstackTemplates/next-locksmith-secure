/** Knurled brass bar divider with diagonal hatch and rounded end caps. */
export function KnurledRule({ className = '' }: { className?: string }) {
  return (
    <div className={`print-hide w-full ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 14"
        preserveAspectRatio="none"
        className="block h-3 w-full"
        fill="none"
      >
        <defs>
          <pattern id="knurl-hatch" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-2,10 L10,-2 M0,12 L12,0" stroke="var(--lacquer)" strokeWidth="1.4" strokeOpacity="0.48" />
            <path d="M-2,0 L10,12 M0,-2 L12,10" stroke="var(--lacquer)" strokeWidth="0.9" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect x="1" y="2" width="1198" height="10" rx="5" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.5" />
        <rect x="6" y="3" width="1188" height="8" rx="4" fill="url(#knurl-hatch)" />
      </svg>
    </div>
  );
}
