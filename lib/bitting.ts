import type { ResponseZone } from '../content/response-zones.ts';

/**
 * Compute bitting cut depth in SVG units proportional to typical max arrival minutes (0..120).
 * Deeper cuts represent longer typical arrival times.
 */
export function bittingCutDepth(maxMinutes: number, maxDepth = 64): number {
  const clamped = Math.max(0, Math.min(120, maxMinutes));
  return Number(((clamped / 120) * maxDepth).toFixed(1));
}

export interface KeyCutGeometry {
  zone: ResponseZone;
  /** Horizontal centre of this cut along the key blade. */
  centerX: number;
  /** Left shoulder of the cut. */
  startX: number;
  /** Right shoulder of the cut. */
  endX: number;
  /** Day bitting cut depth (SVG units from blade top). */
  dayDepth: number;
  /** Night bitting cut depth (SVG units from blade top). */
  nightDepth: number;
}

export const BLADE_START_X = 248;
export const BLADE_END_X = 1136;
export const BLADE_TOP_Y = 66;
export const BLADE_BOTTOM_Y = 158;

export function buildKeyCuts(zones: readonly ResponseZone[]): KeyCutGeometry[] {
  const count = zones.length;
  const usableStart = BLADE_START_X + 26;
  const usableWidth = BLADE_END_X - 38 - usableStart;
  const slotWidth = usableWidth / Math.max(1, count);
  const cutHalf = Math.min(44, slotWidth * 0.34);

  return zones.map((zone, index) => {
    const centerX = Number((usableStart + slotWidth * (index + 0.5)).toFixed(1));
    return {
      zone,
      centerX,
      startX: Number((centerX - cutHalf).toFixed(1)),
      endX: Number((centerX + cutHalf).toFixed(1)),
      dayDepth: bittingCutDepth(zone.dayMinutes.max),
      nightDepth: bittingCutDepth(zone.nightMinutes.max),
    };
  });
}

/** Build the SVG path string for the brass key blade with day bitting cuts. */
export function buildKeyBladePath(cuts: readonly KeyCutGeometry[]): string {
  const parts: string[] = [`M ${BLADE_START_X} ${BLADE_TOP_Y}`];
  for (const cut of cuts) {
    const rootY = Number((BLADE_TOP_Y + cut.dayDepth).toFixed(1));
    const flatHalf = Number(((cut.endX - cut.startX) * 0.28).toFixed(1));
    parts.push(`L ${cut.startX} ${BLADE_TOP_Y}`);
    parts.push(`L ${(cut.centerX - flatHalf).toFixed(1)} ${rootY}`);
    parts.push(`L ${(cut.centerX + flatHalf).toFixed(1)} ${rootY}`);
    parts.push(`L ${cut.endX} ${BLADE_TOP_Y}`);
  }
  parts.push(`L ${BLADE_END_X} ${BLADE_TOP_Y}`);
  parts.push(`L ${BLADE_END_X + 34} ${BLADE_TOP_Y + 28}`);
  parts.push(`L ${BLADE_END_X + 34} ${BLADE_BOTTOM_Y - 18}`);
  parts.push(`L ${BLADE_END_X + 8} ${BLADE_BOTTOM_Y}`);
  parts.push(`L ${BLADE_START_X} ${BLADE_BOTTOM_Y}`);
  parts.push('Z');
  return parts.join(' ');
}
