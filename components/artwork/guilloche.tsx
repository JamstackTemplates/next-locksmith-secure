/**
 * Banknote / safe-door style guilloché engraving.
 * One wavy ring is drawn once and repeated with <use> rotations, which keeps the markup small.
 */

export type RosetteRing = {
  /** Mean radius of the ring. */
  base: number;
  /** Wave height either side of the mean radius. */
  amp: number;
  /** Number of waves around the ring. */
  lobes: number;
  /** Phase-shifted copies interlaced to form the woven pattern. */
  count: number;
  opacity?: number;
  width?: number;
};

/** Closed polar wave r(θ) = base + amp·sin(lobes·θ), centred on 0,0. */
export function rosetteCurve(base: number, amp: number, lobes: number, stepsPerLobe = 14): string {
  const steps = lobes * stepsPerLobe;
  let d = '';
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = base + amp * Math.sin(lobes * t);
    d += `${i === 0 ? 'M' : 'L'}${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r).toFixed(1)}`;
  }
  return `${d}Z`;
}

/** SVG group of interlaced rings; place inside any <svg>. `id` must be unique on the page. */
export function RosetteLayers({
  id,
  rings,
  stroke = 'currentColor',
}: {
  id: string;
  rings: RosetteRing[];
  stroke?: string;
}) {
  return (
    <g fill="none" stroke={stroke}>
      <defs>
        {rings.map((ring, index) => (
          <path key={index} id={`${id}-${index}`} d={rosetteCurve(ring.base, ring.amp, ring.lobes)} />
        ))}
      </defs>
      {rings.map((ring, index) => (
        <g key={index} strokeOpacity={ring.opacity ?? 0.6} strokeWidth={ring.width ?? 0.8}>
          {Array.from({ length: ring.count }, (_, copy) => (
            <use
              key={copy}
              href={`#${id}-${index}`}
              transform={`rotate(${((360 / ring.lobes / ring.count) * copy).toFixed(2)})`}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const ornamentRings: RosetteRing[] = [
  { base: 168, amp: 16, lobes: 24, count: 4, opacity: 0.7, width: 0.9 },
  { base: 122, amp: 22, lobes: 16, count: 5, opacity: 0.8, width: 0.9 },
  { base: 70, amp: 14, lobes: 10, count: 4, opacity: 0.9, width: 1 },
];

/** Decorative engraved rosette, coloured with currentColor (set text colour + opacity on the class). */
export function GuillocheRosette({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg
      viewBox="-200 -200 400 400"
      aria-hidden="true"
      className={`print-hide pointer-events-none block ${className}`}
    >
      <circle r="196" fill="none" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.8" />
      <circle r="190" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
      <RosetteLayers id={id} rings={ornamentRings} />
      <circle r="40" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Thin banknote-style security band: interlaced sine waves on lacquer between brass rules.
 * Tiles seamlessly at any width.
 */
export function SecurityBand({ id, className = '' }: { id: string; className?: string }) {
  const wave = 'M-80 9C-66.7 0 -53.3 0 -40 9S-13.3 18 0 9S26.7 0 40 9S66.7 18 80 9S106.7 0 120 9S146.7 18 160 9';
  return (
    <div className={`print-hide w-full bg-lacquer ${className}`} aria-hidden="true">
      <svg className="block h-[22px] w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={id} width="80" height="18" patternUnits="userSpaceOnUse" y="2">
            {[0, 20, 40, 60].map((shift, index) => (
              <path
                key={shift}
                d={wave}
                transform={`translate(${shift} 0)`}
                fill="none"
                stroke="var(--brass)"
                strokeWidth="0.8"
                strokeOpacity={index % 2 === 0 ? 0.85 : 0.45}
              />
            ))}
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="1.5" fill="var(--brass)" />
        <rect x="0" y="2" width="100%" height="18" fill={`url(#${id})`} />
        <rect x="0" y="20.5" width="100%" height="1.5" fill="var(--brass)" />
      </svg>
    </div>
  );
}
