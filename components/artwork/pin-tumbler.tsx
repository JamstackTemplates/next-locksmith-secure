type TumblerState = 'wrong' | 'right' | 'new';

interface ChamberSpec {
  x: number;
  /** Length of the bottom key pin (aligned to shear line y=84 when right). */
  keyPinH: number;
  /** Vertical lift applied by the key blade at this chamber. */
  lift: number;
  /** Highlight new key pins in the 'new' state. */
  isNew?: boolean;
}

const SHEAR_Y = 84;
const DRIVER_H = 26;

function chambersFor(state: TumblerState): ChamberSpec[] {
  if (state === 'wrong') {
    return [
      { x: 52, keyPinH: 26, lift: 6 },
      { x: 82, keyPinH: 34, lift: 18 }, // pushed too high -> blocks shear line
      { x: 112, keyPinH: 22, lift: 2 }, // sits too low -> driver drops below shear line
      { x: 142, keyPinH: 30, lift: 14 },
      { x: 172, keyPinH: 24, lift: 4 },
    ];
  }
  if (state === 'right') {
    return [
      { x: 52, keyPinH: 26, lift: 10 },
      { x: 82, keyPinH: 34, lift: 10 },
      { x: 112, keyPinH: 22, lift: 10 },
      { x: 142, keyPinH: 30, lift: 10 },
      { x: 172, keyPinH: 24, lift: 10 },
    ];
  }
  // 'new': fresh pin lengths set to a brand-new key bitting, all cleanly aligned on shear line
  return [
    { x: 52, keyPinH: 32, lift: 10, isNew: true },
    { x: 82, keyPinH: 20, lift: 10, isNew: true },
    { x: 112, keyPinH: 34, lift: 10, isNew: true },
    { x: 142, keyPinH: 22, lift: 10, isNew: true },
    { x: 172, keyPinH: 30, lift: 10, isNew: true },
  ];
}

const labels: Record<TumblerState, { caption: string; status: string }> = {
  wrong: { caption: 'Old or wrong key', status: 'BLOCKED AT SHEAR LINE' },
  right: { caption: 'Matched key pins', status: 'CLEAR TO TURN' },
  new: { caption: 'Fresh brass pins', status: 'OLD KEYS LOCKED OUT' },
};

/** Pin-tumbler cylinder cutaway in three states: wrong key, right key, new pins. */
export function PinTumblerArt({ state, className = '' }: { state: TumblerState; className?: string }) {
  const chambers = chambersFor(state);
  const { caption, status } = labels[state];
  const isBlocked = state === 'wrong';

  return (
    <figure className={`flex flex-col border border-line bg-raised p-3 ${className}`}>
      <svg
        viewBox="0 0 220 156"
        fill="none"
        role="img"
        aria-label={`Pin-tumbler cutaway showing ${caption.toLowerCase()}: ${status.toLowerCase()}.`}
        className="block h-auto w-full"
      >
        {/* Outer cylinder housing */}
        <rect x="16" y="14" width="188" height="122" rx="4" fill="var(--surface)" stroke="var(--lacquer)" strokeWidth="1.5" />

        {/* Rotating plug */}
        <rect x="24" y={SHEAR_Y} width="172" height="44" fill="var(--lacquer)" fillOpacity="0.1" stroke="var(--lacquer)" strokeWidth="1.4" />

        {/* Pin chambers */}
        {chambers.map(c => {
          // For right/new, top of keyPin sits exactly at SHEAR_Y (y=84).
          // For wrong, lift offsets the split away from SHEAR_Y.
          const splitY = state === 'wrong' ? SHEAR_Y + (10 - c.lift) : SHEAR_Y;
          const driverTop = splitY - DRIVER_H;
          const keyPinBottom = splitY + c.keyPinH;

          return (
            <g key={c.x}>
              {/* Chamber bore */}
              <rect x={c.x - 8} y="20" width="16" height="98" fill="var(--bg)" stroke="var(--line)" strokeWidth="1" />
              {/* Coil spring */}
              <path
                d={`M${c.x - 4} 22 L${c.x + 4} ${22 + (driverTop - 22) * 0.25} L${c.x - 4} ${22 + (driverTop - 22) * 0.5} L${c.x + 4} ${22 + (driverTop - 22) * 0.75} L${c.x} ${driverTop}`}
                stroke="var(--muted)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Driver pin (top) */}
              <rect
                x={c.x - 6}
                y={driverTop}
                width="12"
                height={DRIVER_H}
                rx="1.5"
                fill="var(--lacquer)"
                stroke="var(--lacquer)"
                strokeWidth="1.2"
              />
              {/* Key pin (bottom) */}
              <path
                d={`M${c.x - 6} ${splitY} H${c.x + 6} V${keyPinBottom - 4} L${c.x} ${keyPinBottom} L${c.x - 6} ${keyPinBottom - 4} Z`}
                fill={c.isNew ? 'var(--brass)' : 'var(--brass)'}
                fillOpacity={c.isNew ? 1 : 0.78}
                stroke="var(--lacquer)"
                strokeWidth="1.3"
              />
            </g>
          );
        })}

        {/* Key blade resting under the key pins */}
        <path
          d={
            state === 'wrong'
              ? 'M24 124 H186 L192 118 L186 112 H172 L166 118 H142 L134 106 H112 L106 118 H82 L76 102 H52 L44 114 H24 Z'
              : state === 'right'
                ? 'M24 124 H186 L192 118 L186 112 H172 L166 108 H142 L136 114 H112 L106 106 H82 L76 118 H52 L44 110 H24 Z'
                : 'M24 124 H186 L192 118 L186 112 H172 L166 114 H142 L136 106 H112 L106 118 H82 L76 104 H52 L44 116 H24 Z'
          }
          fill={state === 'new' ? 'var(--brass)' : 'var(--muted)'}
          fillOpacity={state === 'new' ? 0.9 : 0.45}
          stroke="var(--lacquer)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Shear line */}
        <line
          x1="10"
          y1={SHEAR_Y}
          x2="210"
          y2={SHEAR_Y}
          stroke={isBlocked ? 'var(--alert)' : 'var(--brass-text)'}
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <text
          x="198"
          y={SHEAR_Y - 4}
          textAnchor="end"
          fill={isBlocked ? 'var(--alert)' : 'var(--brass-text)'}
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          fontWeight="600"
        >
          SHEAR LINE
        </text>
      </svg>
      <figcaption className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
        <span className="text-sm font-semibold text-ink">{caption}</span>
        <span className={`font-mono text-[0.68rem] uppercase tracking-wider ${isBlocked ? 'text-alert' : 'text-brass-text'}`}>
          {status}
        </span>
      </figcaption>
    </figure>
  );
}
