export interface MinuteRange {
  /** Typical minimum arrival time in whole minutes. */
  min: number;
  /** Typical maximum arrival time in whole minutes. */
  max: number;
}

export interface ResponseZone {
  /** Stable, unique, URL-safe identifier (lowercase letters, digits and hyphens). */
  id: string;
  /** Zone display name shown on the response meter and directory board. */
  name: string;
  /** Representative Portland neighbourhoods covered by this zone. */
  neighbourhoods: readonly string[];
  /** Typical daytime arrival range (08:00–18:00, Mon–Sat), in whole minutes. */
  dayMinutes: MinuteRange;
  /** Typical night/Sunday arrival range (18:00–08:00 & Sundays), in whole minutes. */
  nightMinutes: MinuteRange;
  /** Exactly one zone is featured in the sticky call bar and hero arrival nameplate. */
  featured?: boolean;
}

export const responseZones: readonly ResponseZone[] = [
  {
    id: 'downtown',
    name: 'Downtown & Pearl',
    neighbourhoods: ['Downtown', 'Pearl District', 'Old Town', 'Goose Hollow'],
    dayMinutes: { min: 20, max: 30 },
    nightMinutes: { min: 25, max: 40 },
    featured: true,
  },
  {
    id: 'inner-east',
    name: 'Inner East',
    neighbourhoods: ['Buckman', 'Hosford-Abernethy', 'Kerns', 'Irvington'],
    dayMinutes: { min: 25, max: 40 },
    nightMinutes: { min: 30, max: 45 },
  },
  {
    id: 'north',
    name: 'North',
    neighbourhoods: ['Mississippi', 'Kenton', 'St. Johns', 'Overlook'],
    dayMinutes: { min: 35, max: 50 },
    nightMinutes: { min: 40, max: 60 },
  },
  {
    id: 'southwest',
    name: 'Southwest Hills',
    neighbourhoods: ['Hillsdale', 'Multnomah Village', 'Corbett'],
    dayMinutes: { min: 35, max: 50 },
    nightMinutes: { min: 40, max: 60 },
  },
  {
    id: 'outer-east',
    name: 'Outer East',
    neighbourhoods: ['Montavilla', 'Lents', 'Gateway', 'Parkrose'],
    dayMinutes: { min: 40, max: 60 },
    nightMinutes: { min: 45, max: 75 },
  },
  {
    id: 'close-suburbs',
    name: 'Close-in suburbs',
    neighbourhoods: ['Beaverton', 'Milwaukie', 'Lake Oswego'],
    dayMinutes: { min: 50, max: 75 },
    nightMinutes: { min: 60, max: 90 },
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function formatMinuteRange(range: MinuteRange): string {
  return `${range.min}–${range.max} min`;
}

export function getFeaturedZone(zones: readonly ResponseZone[] = responseZones): ResponseZone {
  const featured = zones.find(zone => zone.featured);
  if (!featured) throw new Error('responseZones: expected one zone with featured: true');
  return featured;
}

export function validateResponseZones(zones: readonly ResponseZone[]): void {
  const seen = new Set<string>();
  let featuredCount = 0;

  for (const zone of zones) {
    const label = zone.id || zone.name || '<unnamed zone>';
    if (!URL_SAFE_ID.test(zone.id)) {
      throw new Error(`zone "${label}": id must be lowercase URL-safe (letters, digits, hyphens)`);
    }
    if (seen.has(zone.id)) {
      throw new Error(`zone "${zone.id}": duplicate id`);
    }
    seen.add(zone.id);
    if (!zone.name.trim()) {
      throw new Error(`zone "${zone.id}": name is required`);
    }
    if (!zone.neighbourhoods.length || zone.neighbourhoods.some(n => !n.trim())) {
      throw new Error(`zone "${zone.id}": neighbourhoods must list at least one non-empty place`);
    }
    for (const [kind, range] of [
      ['dayMinutes', zone.dayMinutes],
      ['nightMinutes', zone.nightMinutes],
    ] as const) {
      if (
        !Number.isInteger(range.min) ||
        !Number.isInteger(range.max) ||
        range.min <= 0 ||
        range.min >= range.max ||
        range.max > 120
      ) {
        throw new Error(
          `zone "${zone.id}": ${kind} must be whole minutes with 0 < min < max <= 120`,
        );
      }
    }
    if (zone.nightMinutes.max < zone.dayMinutes.max) {
      throw new Error(`zone "${zone.id}": nightMinutes.max must be >= dayMinutes.max`);
    }
    if (zone.featured) featuredCount += 1;
  }

  if (featuredCount !== 1) {
    throw new Error(`responseZones: expected exactly one featured zone, found ${featuredCount}`);
  }
}
