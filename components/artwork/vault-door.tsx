import { business } from '../../content/business';
import { RosetteLayers, type RosetteRing } from './guilloche';

/**
 * Hero scene: a round brass-and-lacquer bank-vault door set in a riveted diamond-plate wall.
 * Guilloché-engraved door face, engraved frame ring, four-spoke handle wheel around a
 * combination dial, heavy hinges, and a brass key ring hanging from one spoke.
 * Motion (dial turn, key sway, glints) lives in tailwind.input.css and stops for reduced motion.
 */

const CX = 320;
const CY = 280;

const doorRings: RosetteRing[] = [
  { base: 152, amp: 9, lobes: 30, count: 3, opacity: 0.32, width: 0.7 },
  { base: 116, amp: 20, lobes: 16, count: 6, opacity: 0.42, width: 0.75 },
  { base: 76, amp: 9, lobes: 12, count: 4, opacity: 0.5, width: 0.8 },
];

function polar(radius: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  return { x: +(Math.cos(rad) * radius).toFixed(1), y: +(Math.sin(rad) * radius).toFixed(1) };
}

function Glint({ x, y, size = 1, className = '' }: { x: number; y: number; size?: number; className?: string }) {
  return (
    <path
      className={`vault-glint ${className}`}
      transform={`translate(${x} ${y}) scale(${size})`}
      d="M0-10C1-2 2-1 10 0C2 1 1 2 0 10C-1 2-2 1-10 0C-2-1-1-2 0-10Z"
      fill="var(--on-lacquer)"
    />
  );
}

function HangingKey({ teeth, rotate, scale = 1 }: { teeth: string; rotate: number; scale?: number }) {
  return (
    <g transform={`rotate(${rotate}) scale(${scale})`}>
      <g transform="translate(3 4)" fill="#000" fillOpacity="0.4">
        <circle cy="20" r="18" />
        <path d={`M-6 36${teeth}L0 128L-6 120Z`} />
      </g>
      <circle cy="20" r="18" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.6" />
      <circle cy="20" r="18" fill="url(#vd-hatch)" />
      <circle cy="20" r="11" fill="none" stroke="var(--lacquer)" strokeWidth="1" strokeOpacity="0.55" />
      <circle cy="10" r="4.5" fill="var(--lacquer)" />
      <rect x="-11" y="35" width="22" height="7" rx="1.5" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" />
      <path d={`M-6 42${teeth}L0 128L-6 120Z`} fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="-1.5" y1="46" x2="-1.5" y2="116" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.6" />
    </g>
  );
}

export function VaultDoorArt({ className = '' }: { className?: string }) {
  const ringText = `${business.name.toUpperCase()} · PORTLAND, OREGON · 24 HOUR LOCKOUT LINE · `;
  const ringRadius = 214;
  const frameRivets = Array.from({ length: 36 }, (_, i) => polar(234, i * 10 + 5));
  const doorBolts = Array.from({ length: 16 }, (_, i) => polar(185, i * 22.5 + 11.25));
  const dialTicks = Array.from({ length: 50 }, (_, i) => i);
  const spokes = [45, 135, 225, 315];
  const hook = polar(136, 45);

  return (
    <svg
      viewBox="0 0 640 560"
      fill="none"
      role="img"
      aria-label={`Engraved brass bank-vault door with a combination dial and four-spoke handle, set in a riveted steel wall, with a ring of brass keys and a 24/7 tag hanging from the handle.`}
      className={`print-hide block h-auto w-full ${className}`}
    >
      <defs>
        <pattern id="vd-plate" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect x="3" y="9" width="12" height="3.5" rx="1.75" transform="rotate(-40 9 10.75)" fill="var(--brass)" fillOpacity="0.09" />
          <rect x="13" y="-3" width="12" height="3.5" rx="1.75" transform="rotate(40 19 -1.25)" fill="var(--brass)" fillOpacity="0.09" />
          <rect x="13" y="21" width="12" height="3.5" rx="1.75" transform="rotate(40 19 22.75)" fill="var(--brass)" fillOpacity="0.09" />
        </pattern>
        <pattern id="vd-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--lacquer)" strokeWidth="1.1" strokeOpacity="0.26" />
        </pattern>
        <pattern id="vd-knurl" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="var(--lacquer)" strokeWidth="1.3" strokeOpacity="0.4" />
        </pattern>
        <radialGradient id="vd-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--brass)" stopOpacity="0.34" />
          <stop offset="0.65" stopColor="var(--brass)" stopOpacity="0.08" />
          <stop offset="1" stopColor="var(--brass)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vd-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <path
          id="vd-ring-path"
          d={`M${CX - ringRadius} ${CY}a${ringRadius} ${ringRadius} 0 1 1 ${ringRadius * 2} 0a${ringRadius} ${ringRadius} 0 1 1 ${-ringRadius * 2} 0`}
        />
      </defs>

      {/* ===== Riveted diamond-plate wall ===== */}
      <rect width="640" height="560" fill="var(--lacquer)" />
      <rect width="640" height="560" fill="url(#vd-plate)" />
      <circle cx={CX} cy={CY} r="320" fill="url(#vd-glow)" />
      <rect x="9" y="9" width="622" height="542" stroke="var(--brass)" strokeOpacity="0.45" strokeWidth="1.2" />
      {[
        [22, 22],
        [618, 22],
        [22, 538],
        [618, 538],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="var(--brass)" stroke="#000" strokeOpacity="0.5" />
          <line x1={x - 3} y1={y + 2} x2={x + 3} y2={y - 2} stroke="var(--lacquer)" strokeWidth="1.3" />
        </g>
      ))}

      {/* ===== Hinges (right) ===== */}
      {[150, 330].map(y => (
        <g key={y}>
          <rect x="492" y={y + 22} width="102" height="36" rx="4" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.8" />
          <rect x="492" y={y + 22} width="102" height="36" rx="4" fill="url(#vd-hatch)" />
          <rect x="492" y={y + 22} width="102" height="12" rx="4" fill="#fff" fillOpacity="0.16" />
          {[514, 540].map(x => (
            <g key={x}>
              <circle cx={x} cy={y + 40} r="5" fill="var(--lacquer-line)" stroke="var(--lacquer)" strokeWidth="1.2" />
              <line x1={x - 3} y1={y + 42} x2={x + 3} y2={y + 38} stroke="var(--brass)" strokeWidth="1.2" />
            </g>
          ))}
          <path d={`M588 ${y}h20l-2 -8h-16z`} fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" />
          <path d={`M588 ${y + 80}h20l-2 8h-16z`} fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" />
          <rect x="586" y={y} width="24" height="80" rx="3" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.8" />
          <rect x="586" y={y} width="24" height="80" rx="3" fill="url(#vd-sheen)" />
          <rect x="590" y={y + 2} width="5" height="76" rx="2" fill="#fff" fillOpacity="0.22" />
          {[20, 40, 60].map(dy => (
            <line key={dy} x1="586" y1={y + dy} x2="610" y2={y + dy} stroke="var(--lacquer)" strokeWidth="1.6" />
          ))}
        </g>
      ))}

      {/* ===== Vault frame ring ===== */}
      <circle cx={CX + 7} cy={CY + 10} r="246" fill="#000" fillOpacity="0.5" />
      <circle cx={CX} cy={CY} r="246" fill="var(--lacquer-line)" stroke="var(--brass)" strokeWidth="2.5" />
      <circle cx={CX} cy={CY} r="246" fill="url(#vd-sheen)" />
      <circle cx={CX} cy={CY} r="241" stroke="var(--brass)" strokeOpacity="0.4" strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r="226" stroke="var(--brass)" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="1 3" />
      {frameRivets.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={CX + x} cy={CY + y} r="3.2" fill="var(--brass)" stroke="#000" strokeOpacity="0.45" />
      ))}
      <text fill="var(--brass)" fontFamily="var(--font-mono)" fontSize="10.5" fontWeight="600">
        <textPath href="#vd-ring-path" textLength={(2 * Math.PI * ringRadius - 12).toFixed(0)} lengthAdjust="spacing">
          {ringText}
          {ringText}
        </textPath>
      </text>
      <circle cx={CX} cy={CY} r="201" fill="#000" fillOpacity="0.7" stroke="var(--brass)" strokeWidth="1.5" />

      {/* ===== Door ===== */}
      <circle cx={CX + 4} cy={CY + 6} r="193" fill="#000" fillOpacity="0.45" />
      <circle cx={CX} cy={CY} r="193" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="2" />
      <circle cx={CX} cy={CY} r="193" fill="url(#vd-hatch)" />
      <circle cx={CX} cy={CY} r="193" fill="url(#vd-sheen)" />
      {doorBolts.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <circle cx={CX + x} cy={CY + y} r="4.6" fill="var(--lacquer)" />
          <circle cx={CX + x - 1.2} cy={CY + y - 1.2} r="1.4" fill="var(--brass)" fillOpacity="0.8" />
        </g>
      ))}
      <circle cx={CX} cy={CY} r="176" fill="var(--lacquer)" stroke="var(--lacquer)" strokeWidth="2" />
      <circle cx={CX} cy={CY} r="170" stroke="var(--brass)" strokeOpacity="0.7" strokeWidth="1" />

      {/* Guilloché engraving on the door face */}
      <g transform={`translate(${CX} ${CY})`}>
        <RosetteLayers id="vd-rosette" rings={doorRings} stroke="var(--brass)" />
        <circle r="98" stroke="var(--brass)" strokeOpacity="0.55" strokeWidth="0.8" />
        <circle r="134" stroke="var(--brass)" strokeOpacity="0.4" strokeWidth="0.6" strokeDasharray="2 3" />
      </g>

      {/* ===== Four-spoke handle wheel ===== */}
      <g transform={`translate(${CX} ${CY})`}>
        {spokes.map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <rect x="52" y="-6.5" width="78" height="13" rx="3" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.6" />
            <rect x="52" y="-6.5" width="78" height="5" rx="2" fill="#fff" fillOpacity="0.22" />
            <rect x="60" y="-9" width="9" height="18" rx="2" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" />
            <circle cx="136" r="14" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.8" />
            <circle cx="136" r="14" fill="url(#vd-sheen)" />
            <circle cx="131" cy="-5" r="3.6" fill="#fff" fillOpacity="0.4" />
          </g>
        ))}
        <circle r="58" fill="var(--lacquer-line)" stroke="var(--brass)" strokeWidth="2.2" />
        <circle r="58" fill="url(#vd-sheen)" />

        {/* Combination dial (turns gently; static for reduced motion) */}
        <polygon points="0,-51 -5,-60 5,-60" fill="var(--alert)" stroke="var(--lacquer)" strokeWidth="1" />
        <g className="vault-dial">
          <circle r="49" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.5" />
          {dialTicks.map(i => {
            const major = i % 5 === 0;
            const a = polar(major ? 39 : 43, i * 7.2 - 90);
            const b = polar(47, i * 7.2 - 90);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--brass)"
                strokeWidth={major ? 1.5 : 0.8}
                strokeOpacity={major ? 1 : 0.7}
              />
            );
          })}
          {[
            ['0', 0, -30],
            ['25', 31, 3],
            ['50', 0, 36],
            ['75', -31, 3],
          ].map(([label, x, y]) => (
            <text
              key={label}
              x={x}
              y={y}
              textAnchor="middle"
              fill="var(--on-lacquer)"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fontWeight="600"
            >
              {label}
            </text>
          ))}
          <circle r="21" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.6" />
          <circle r="18.5" fill="url(#vd-knurl)" />
          <circle r="10" fill="var(--lacquer)" stroke="var(--brass)" strokeWidth="1.2" />
          <rect x="-1.2" y="-18" width="2.4" height="7" fill="var(--lacquer)" />
        </g>
        <circle cx="-2.5" cy="-2.5" r="2.4" fill="var(--brass)" />
      </g>

      {/* ===== Key ring hanging from the lower-right spoke ===== */}
      <g transform={`translate(${CX + hook.x} ${CY + hook.y})`}>
        <g className="vault-keys">
          <g transform="scale(1.3)">
          <circle cy="16" r="16" stroke="#000" strokeOpacity="0.4" strokeWidth="3.5" transform="translate(2 3)" />
          <circle cy="16" r="16" stroke="var(--brass)" strokeWidth="3" />
          <circle cy="16" r="16" stroke="#fff" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="10 90" />
          <g transform="translate(0 22)">
            {/* Paper key tag */}
            <g transform="rotate(26)">
              <line x1="0" y1="8" x2="0" y2="24" stroke="var(--on-lacquer)" strokeWidth="1.2" />
              <path d="M-15 24L-6 15H6L15 24V72H-15Z" fill="var(--raised)" stroke="var(--lacquer)" strokeWidth="1.4" />
              <circle cy="22" r="2.6" fill="var(--lacquer)" />
              <text
                y="46"
                textAnchor="middle"
                fill="var(--alert)"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fontWeight="700"
              >
                24/7
              </text>
              <line x1="-9" y1="54" x2="9" y2="54" stroke="var(--lacquer)" strokeOpacity="0.5" />
              <line x1="-9" y1="60" x2="5" y2="60" stroke="var(--lacquer)" strokeOpacity="0.5" />
            </g>
            <HangingKey rotate={12} scale={0.86} teeth="H6V54H11V62H6V74H12V82H6V96H10V104H6V118" />
            <HangingKey rotate={-10} teeth="H6V52H12V60H6V70H11V78H6V90H13V98H6V118" />
          </g>
          </g>
        </g>
      </g>

      {/* ===== Glints ===== */}
      <Glint x={176} y={96} size={1.1} />
      <Glint x={468} y={132} size={0.7} className="vault-glint--late" />
      <Glint x={288} y={242} size={0.6} className="vault-glint--late" />
      <Glint x={598} y={168} size={0.8} />
    </svg>
  );
}
