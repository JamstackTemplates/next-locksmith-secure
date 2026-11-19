/** 404 illustration: a key half-inserted into a keyhole cutaway with jammed pins and brass filings. */
export function WrongKeyArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      fill="none"
      role="img"
      aria-label="Illustration of a brass key half-inserted into a cutaway lock cylinder with pins jammed at the wrong heights."
      className={`print-hide block h-auto w-full ${className}`}
    >
      <defs>
        <pattern id="wk-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.28" />
        </pattern>
      </defs>

      {/* Cylinder cutaway housing */}
      <rect x="174" y="34" width="218" height="218" rx="6" fill="var(--surface)" stroke="var(--lacquer)" strokeWidth="1.75" />
      <rect x="184" y="44" width="198" height="198" rx="3" fill="var(--raised)" stroke="var(--line)" strokeWidth="1.2" />

      {/* Shear line */}
      <line x1="168" y1="146" x2="398" y2="146" stroke="var(--alert)" strokeWidth="1.6" strokeDasharray="5 4" />
      <text x="378" y="232" textAnchor="end" fill="var(--alert)" fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" letterSpacing="1.2">
        SHEAR LINE JAMMED
      </text>

      {/* 4 pin stacks sitting at wrong heights */}
      {[
        { x: 222, splitY: 128, keyH: 46 },
        { x: 262, splitY: 162, keyH: 30 },
        { x: 302, splitY: 134, keyH: 42 },
        { x: 342, splitY: 158, keyH: 34 },
      ].map(p => (
        <g key={p.x}>
          <rect x={p.x - 10} y="54" width="20" height="156" fill="var(--bg)" stroke="var(--line)" strokeWidth="1" />
          {/* Spring */}
          <path
            d={`M${p.x - 5} 58 L${p.x + 5} 72 L${p.x - 5} 86 L${p.x + 5} 98 L${p.x} ${p.splitY - 30}`}
            stroke="var(--muted)"
            strokeWidth="1.3"
          />
          {/* Driver pin */}
          <rect x={p.x - 8} y={p.splitY - 30} width="16" height="30" rx="2" fill="var(--lacquer)" />
          {/* Key pin */}
          <path
            d={`M${p.x - 8} ${p.splitY} H${p.x + 8} V${p.splitY + p.keyH - 5} L${p.x} ${p.splitY + p.keyH} L${p.x - 8} ${p.splitY + p.keyH - 5} Z`}
            fill="var(--brass)"
            stroke="var(--lacquer)"
            strokeWidth="1.4"
          />
        </g>
      ))}

      {/* Key half-inserted from the left */}
      <g transform="translate(18, 154)">
        {/* Bow */}
        <path
          d="M16 14C16 -6 34 -18 56 -18C74 -18 86 -6 90 12H106V46H90C86 64 74 76 56 76C34 76 16 64 16 44Z"
          fill="var(--brass)"
          stroke="var(--lacquer)"
          strokeWidth="1.75"
        />
        <path
          d="M16 14C16 -6 34 -18 56 -18C74 -18 86 -6 90 12H106V46H90C86 64 74 76 56 76C34 76 16 64 16 44Z"
          fill="url(#wk-hatch)"
        />
        <circle cx="44" cy="29" r="9" fill="var(--bg)" stroke="var(--lacquer)" strokeWidth="1.5" />
        <text x="68" y="33" textAnchor="middle" fill="var(--lacquer)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          404
        </text>
        {/* Blade half-in */}
        <path
          d="M106 16H252L260 28L252 42H106Z M178 16L188 26L198 16 M212 16L222 30L234 16"
          fill="var(--brass)"
          stroke="var(--lacquer)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </g>

      {/* Small spark of brass filings at keyway entrance */}
      <g fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="0.7">
        <rect x="164" y="160" width="6" height="2.2" transform="rotate(-32 164 160)" />
        <rect x="158" y="206" width="5" height="2" transform="rotate(28 158 206)" />
        <rect x="170" y="218" width="4" height="2" transform="rotate(-14 170 218)" />
        <circle cx="163" cy="148" r="2" />
        <circle cx="152" cy="196" r="1.6" />
      </g>
    </svg>
  );
}
