/** Row of distinct brass key-blank silhouettes hanging on hooks along a rail. */
export function KeyBlankRackArt({ className = '' }: { className?: string }) {
  const blanks = [
    { x: 42, code: 'SC1', bow: 'M-15 0H15L18 20L6 28V86L0 92L-6 86V28L-18 20Z' },
    { x: 108, code: 'KW1', bow: 'M0 -3C11 -3 17 4 17 13C17 20 12 25 6 28V84L0 90L-6 84V28C-12 25 -17 20 -17 13C-17 4 -11 -3 0 -3Z' },
    { x: 174, code: 'Y1', bow: 'M-16 3L0 -4L16 3L14 22L6 28V88L-6 88V28L-14 22Z' },
    { x: 240, code: 'WR5', bow: 'M-14 -1H14L17 16L10 26L6 28V82L0 88L-6 82V28L-10 26L-17 16Z' },
    { x: 306, code: 'M1', bow: 'M-12 0L0 -4L12 0L16 14L6 28V86L-6 86V28L-16 14Z' },
    { x: 372, code: 'SC4', bow: 'M-15 0H15L18 20L6 28V90L0 96L-6 90V28L-18 20Z' },
  ];

  return (
    <svg
      viewBox="0 0 414 140"
      fill="none"
      aria-hidden="true"
      className={`print-hide block h-auto w-full ${className}`}
    >
      <defs>
        <pattern id="kbr-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.28" />
        </pattern>
      </defs>
      {/* Top brass rack bar */}
      <rect x="6" y="10" width="402" height="10" rx="4" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.5" />
      <circle cx="18" cy="15" r="2.2" fill="var(--brass)" />
      <circle cx="396" cy="15" r="2.2" fill="var(--brass)" />

      {blanks.map(b => (
        <g key={b.code} transform={`translate(${b.x}, 32)`}>
          {/* Hook */}
          <path d="M0 -12V4" stroke="var(--lacquer)" strokeWidth="1.8" />
          <circle cx="0" cy="-12" r="2.6" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.2" />
          {/* Key blank */}
          <path d={b.bow} fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d={b.bow} fill="url(#kbr-hatch)" />
          <circle cx="0" cy="8" r="3" fill="var(--bg)" stroke="var(--lacquer)" strokeWidth="1.3" />
          <line x1="-1.5" y1="34" x2="-1.5" y2="78" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.55" />
          <text x="0" y="21" textAnchor="middle" fill="var(--lacquer)" fontFamily="var(--font-mono)" fontSize="7.5" fontWeight="600">
            {b.code}
          </text>
        </g>
      ))}
    </svg>
  );
}
