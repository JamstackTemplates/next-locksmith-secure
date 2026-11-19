'use client';

import { useId, useState } from 'react';
import {
  formatMinuteRange,
  responseZones,
  type ResponseZone,
} from '../content/response-zones';
import {
  BLADE_BOTTOM_Y,
  BLADE_END_X,
  BLADE_START_X,
  BLADE_TOP_Y,
  buildKeyBladePath,
  buildKeyCuts,
} from '../lib/bitting';

interface ResponseMeterProps {
  zones?: readonly ResponseZone[];
  /** Show hatched night-range extension below each day cut and a Day/Night legend. */
  showNight?: boolean;
  /** Visual surface variant: 'lacquer' for Home's dark band, 'bone' for Response times. */
  variant?: 'lacquer' | 'bone';
  /** Controlled active zone ID (when paired with the directory board). */
  activeZoneId?: string | null;
  onActiveZoneChange?: (id: string | null) => void;
}

export function ResponseMeter({
  zones = responseZones,
  showNight = false,
  variant = 'lacquer',
  activeZoneId: controlledActive,
  onActiveZoneChange,
}: ResponseMeterProps) {
  const [localActive, setLocalActive] = useState<string | null>(null);
  const uid = useId().replace(/:/g, '');
  const activeId = controlledActive !== undefined ? controlledActive : localActive;
  const setActive = (id: string | null) => {
    if (onActiveZoneChange) onActiveZoneChange(id);
    else setLocalActive(id);
  };

  const cuts = buildKeyCuts(zones);
  const bladePath = buildKeyBladePath(cuts);
  const onDark = variant === 'lacquer';
  const desc = zones
    .map(
      z =>
        `${z.name}: typical daytime arrival ${formatMinuteRange(z.dayMinutes)}, night ${formatMinuteRange(z.nightMinutes)}`,
    )
    .join('; ');

  return (
    <div className="w-full">
      {showNight ? (
        <div className="mb-4 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-3.5 w-6 border border-lacquer bg-brass" aria-hidden="true" />
            Day (08:00–18:00) · solid brass cut
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3.5 w-6 border border-lacquer bg-surface"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(-45deg, transparent 0 3px, var(--brass) 3px 5px)',
              }}
              aria-hidden="true"
            />
            Night &amp; Sunday · hatched extension
          </span>
        </div>
      ) : null}

      <div className="overflow-x-auto pb-2">
        <svg
          viewBox="0 0 1190 228"
          fill="none"
          role="img"
          aria-labelledby={`meter-title-${uid} meter-desc-${uid}`}
          className="block h-auto w-full min-w-[680px]"
        >
          <title id={`meter-title-${uid}`}>
            Typical Portland locksmith arrival times encoded as key bitting cuts
          </title>
          <desc id={`meter-desc-${uid}`}>{desc}</desc>

          <defs>
            <pattern
              id={`meter-hatch-${uid}`}
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="7"
                stroke="var(--lacquer)"
                strokeWidth="1.2"
                strokeOpacity="0.28"
              />
            </pattern>
            <pattern
              id={`meter-night-${uid}`}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="var(--brass)"
                strokeWidth="1.6"
                strokeOpacity="0.88"
              />
            </pattern>
          </defs>

          {/* Scale guide line along top of blade */}
          <line
            x1={BLADE_START_X}
            y1={BLADE_TOP_Y - 18}
            x2={BLADE_END_X}
            y2={BLADE_TOP_Y - 18}
            stroke={onDark ? 'var(--lacquer-line)' : 'var(--line)'}
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x={BLADE_START_X}
            y={BLADE_TOP_Y - 26}
            fill={onDark ? 'var(--lacquer-muted)' : 'var(--muted)'}
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="1.2"
          >
            CUT DEPTH = TYPICAL MAX ARRIVAL (MIN)
          </text>

          {/* Key Bow (left head) */}
          <path
            d="M34 62C34 30 62 18 112 18H182C206 18 220 34 224 54H248V170H224C220 190 206 206 182 206H112C62 206 34 194 34 162Z"
            fill="var(--brass)"
            stroke="var(--lacquer)"
            strokeWidth="2"
          />
          <path
            d="M44 66C44 40 66 28 112 28H180C198 28 210 40 214 58V166C210 184 198 196 180 196H112C66 196 44 184 44 158Z"
            fill={`url(#meter-hatch-${uid})`}
            stroke="var(--lacquer)"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          {/* Key ring punch hole */}
          <circle
            cx="74"
            cy="112"
            r="19"
            fill={onDark ? 'var(--lacquer)' : 'var(--bg)'}
            stroke="var(--lacquer)"
            strokeWidth="2"
          />
          {/* Stamped bow lettering */}
          <text
            x="158"
            y="102"
            textAnchor="middle"
            fill="var(--lacquer)"
            fontFamily="var(--font-display)"
            fontSize="24"
            fontWeight="800"
            letterSpacing="1.4"
          >
            BRASS KEY
          </text>
          <text
            x="158"
            y="124"
            textAnchor="middle"
            fill="var(--lacquer)"
            fontFamily="var(--font-mono)"
            fontSize="10.5"
            fontWeight="600"
            letterSpacing="1.6"
          >
            PDX · 24/7
          </text>
          <text
            x="158"
            y="141"
            textAnchor="middle"
            fill="var(--lacquer)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            letterSpacing="1.1"
          >
            TYPICAL ETA
          </text>

          {/* Shoulder collar */}
          <rect
            x="234"
            y="50"
            width="16"
            height="124"
            rx="2"
            fill="var(--brass)"
            stroke="var(--lacquer)"
            strokeWidth="1.8"
          />

          {/* Main brass key blade with day bitting cuts */}
          <path
            d={bladePath}
            fill="var(--brass)"
            stroke="var(--lacquer)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d={bladePath} fill={`url(#meter-hatch-${uid})`} />

          {/* Longitudinal milling groove along lower blade */}
          <rect
            x={BLADE_START_X + 10}
            y={BLADE_BOTTOM_Y - 22}
            width={BLADE_END_X - BLADE_START_X - 18}
            height="8"
            rx="2"
            fill="var(--lacquer)"
            fillOpacity="0.22"
            stroke="var(--lacquer)"
            strokeWidth="1"
            strokeOpacity="0.45"
          />

          {/* Per-zone cut markers, optional night hatched extensions, and hover highlights */}
          {cuts.map(cut => {
            const isActive = activeId === cut.zone.id;
            const dayRootY = Number((BLADE_TOP_Y + cut.dayDepth).toFixed(1));
            const nightRootY = Number((BLADE_TOP_Y + cut.nightDepth).toFixed(1));
            const flatHalf = Number(((cut.endX - cut.startX) * 0.28).toFixed(1));

            return (
              <g
                key={cut.zone.id}
                data-zone-cut={cut.zone.id}
                data-day-max={cut.zone.dayMinutes.max}
                data-cut-depth={cut.dayDepth}
                className="cursor-pointer"
                onMouseEnter={() => setActive(cut.zone.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Night hatched extension showing deeper typical night arrival */}
                {showNight && cut.nightDepth > cut.dayDepth ? (
                  <polygon
                    points={`${cut.centerX - flatHalf},${dayRootY} ${cut.centerX + flatHalf},${dayRootY} ${cut.centerX + flatHalf + 5},${nightRootY} ${cut.centerX - flatHalf - 5},${nightRootY}`}
                    fill={onDark ? 'var(--lacquer)' : 'var(--surface)'}
                    stroke="var(--lacquer)"
                    strokeWidth="1.3"
                  />
                ) : null}
                {showNight && cut.nightDepth > cut.dayDepth ? (
                  <polygon
                    points={`${cut.centerX - flatHalf},${dayRootY} ${cut.centerX + flatHalf},${dayRootY} ${cut.centerX + flatHalf + 5},${nightRootY} ${cut.centerX - flatHalf - 5},${nightRootY}`}
                    fill={`url(#meter-night-${uid})`}
                  />
                ) : null}

                {/* Active highlight indicator */}
                {isActive ? (
                  <rect
                    x={cut.startX - 4}
                    y={BLADE_TOP_Y - 14}
                    width={cut.endX - cut.startX + 8}
                    height={BLADE_BOTTOM_Y - BLADE_TOP_Y + 26}
                    rx="3"
                    fill="var(--brass)"
                    fillOpacity="0.16"
                    stroke="var(--brass)"
                    strokeWidth="2"
                  />
                ) : null}

                {/* Vertical callout leader line down to label */}
                <line
                  x1={cut.centerX}
                  y1={BLADE_BOTTOM_Y + 2}
                  x2={cut.centerX}
                  y2={BLADE_BOTTOM_Y + 26}
                  stroke={isActive ? 'var(--brass)' : onDark ? 'var(--lacquer-muted)' : 'var(--line)'}
                  strokeWidth={isActive ? '2' : '1.2'}
                />
                <circle
                  cx={cut.centerX}
                  cy={dayRootY}
                  r={isActive ? '4.5' : '3'}
                  fill={isActive ? 'var(--alert)' : 'var(--lacquer)'}
                  stroke="var(--raised)"
                  strokeWidth="1.2"
                />

                {/* Minute figure stamped directly above each cut */}
                <text
                  x={cut.centerX}
                  y={BLADE_TOP_Y - 6}
                  textAnchor="middle"
                  fill={isActive ? 'var(--brass)' : onDark ? 'var(--on-lacquer)' : 'var(--text)'}
                  fontFamily="var(--font-mono)"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  {formatMinuteRange(cut.zone.dayMinutes)}
                </text>

                {/* Zone name below blade */}
                <text
                  x={cut.centerX}
                  y={BLADE_BOTTOM_Y + 44}
                  textAnchor="middle"
                  fill={isActive ? 'var(--brass)' : onDark ? 'var(--on-lacquer)' : 'var(--text)'}
                  fontFamily="var(--font-mono)"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  {cut.zone.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive keyboard-focusable zone legend */}
      <div
        className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
        role="list"
        aria-label="Response time zones"
      >
        {zones.map(zone => {
          const isActive = activeId === zone.id;
          return (
            <button
              key={zone.id}
              type="button"
              onMouseEnter={() => setActive(zone.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(zone.id)}
              onBlur={() => setActive(null)}
              className={`group border px-3 py-2.5 text-left transition-colors ${
                onDark
                  ? isActive
                    ? 'border-brass bg-brass/15 text-on-lacquer'
                    : 'border-lacquer-line bg-lacquer text-on-lacquer hover:border-brass/70'
                  : isActive
                    ? 'border-brass bg-surface text-ink'
                    : 'border-line bg-raised text-ink hover:border-brass'
              }`}
            >
              <span className="block text-xs font-semibold leading-snug">{zone.name}</span>
              <span
                className={`mt-1 block font-mono text-xs ${
                  onDark ? 'text-brass' : 'text-brass-text'
                }`}
              >
                Day {formatMinuteRange(zone.dayMinutes)}
              </span>
              {showNight ? (
                <span
                  className={`block font-mono text-[0.7rem] ${
                    onDark ? 'text-lacquer-muted' : 'text-muted'
                  }`}
                >
                  Night {formatMinuteRange(zone.nightMinutes)}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
