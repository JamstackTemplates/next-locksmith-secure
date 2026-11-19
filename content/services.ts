export type ServiceCategory = 'lockout' | 'rekey' | 'upgrade';
export type ServiceUnit = 'per job' | 'per lock' | 'per cylinder' | 'per door';

export interface ServiceItem {
  /** Stable, unique, URL-safe identifier (lowercase letters, digits and hyphens). */
  id: string;
  /** Grouping on the Services page and Home overview. */
  category: ServiceCategory;
  /** Customer-facing job name. */
  name: string;
  /** One-sentence plain description of what the job covers. */
  summary: string;
  /** Starting price in whole USD; final quote confirmed on site before work starts. */
  priceFrom: number;
  /** Pricing unit displayed beside the starting price. */
  unit: ServiceUnit;
  /** Typical duration on site once the locksmith arrives. */
  typicalTime: string;
  /** Set false to dim the item and show "Temporarily unavailable – call to ask". */
  available: boolean;
  /** Optional short clarification shown alongside the service. */
  note?: string;
}

export interface PricingRules {
  /** Standard dispatch fee in whole USD; included in lockout starting prices. */
  callOutFee: number;
  /** Additional fee in whole USD for 18:00–08:00 and Sundays. */
  afterHoursSurcharge: number;
  /** ISO 4217 currency code. */
  currency: 'USD';
}

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = ['lockout', 'rekey', 'upgrade'];
export const SERVICE_UNITS: readonly ServiceUnit[] = ['per job', 'per lock', 'per cylinder', 'per door'];

export const pricing: PricingRules = {
  callOutFee: 45,
  afterHoursSurcharge: 40,
  currency: 'USD',
};

export const services: readonly ServiceItem[] = [
  {
    id: 'house-lockout',
    category: 'lockout',
    name: 'House or apartment lockout',
    summary: 'Non-destructive entry for standard residential deadbolts and knob or lever locks.',
    priceFrom: 95,
    unit: 'per job',
    typicalTime: '20–40 min on site',
    available: true,
    note: 'Includes $45 call-out fee.',
  },
  {
    id: 'car-lockout',
    category: 'lockout',
    name: 'Car lockout (most makes)',
    summary: 'Damage-free cabin entry using air wedges and reach tools without scratching paint or seals.',
    priceFrom: 110,
    unit: 'per job',
    typicalTime: '15–30 min on site',
    available: true,
    note: 'Includes $45 call-out fee.',
  },
  {
    id: 'business-lockout',
    category: 'lockout',
    name: 'Shop or office lockout',
    summary: 'Commercial storefront mortise cylinders, panic hardware and suite entry doors.',
    priceFrom: 135,
    unit: 'per job',
    typicalTime: '30–60 min on site',
    available: true,
    note: 'Includes $45 call-out fee.',
  },
  {
    id: 'broken-key-extraction',
    category: 'lockout',
    name: 'Broken key extraction',
    summary: 'Remove a snapped blade from a door or ignition cylinder and inspect the keyway.',
    priceFrom: 85,
    unit: 'per lock',
    typicalTime: '15–30 min',
    available: true,
  },
  {
    id: 'rekey-cylinder',
    category: 'rekey',
    name: 'Rekey a door cylinder',
    summary: 'Replace the brass key pins inside your existing cylinder so old keys no longer turn.',
    priceFrom: 35,
    unit: 'per cylinder',
    typicalTime: '10–15 min each',
    available: true,
  },
  {
    id: 'move-in-rekey',
    category: 'rekey',
    name: 'Move-in rekey (up to 3 locks, 4 keys)',
    summary: 'Reset up to three exterior cylinders to one fresh cut and hand over four brass keys.',
    priceFrom: 145,
    unit: 'per job',
    typicalTime: 'about 45 min',
    available: true,
    note: 'Includes $45 call-out fee.',
  },
  {
    id: 'key-alike',
    category: 'rekey',
    name: 'Key all doors alike',
    summary: 'Match compatible front, back and garage cylinders so a single house key opens them all.',
    priceFrom: 30,
    unit: 'per cylinder',
    typicalTime: '10–15 min each',
    available: true,
  },
  {
    id: 'master-key-small',
    category: 'rekey',
    name: 'Small master-key system (up to 10 doors)',
    summary: 'Pin a multi-door schedule for landlords or small shops with individual suite keys and one master.',
    priceFrom: 420,
    unit: 'per job',
    typicalTime: 'half a day',
    available: true,
  },
  {
    id: 'deadbolt-install',
    category: 'upgrade',
    name: 'Grade 1 deadbolt supplied and fitted',
    summary: 'Heavy-duty commercial-grade single-cylinder deadbolt with hardened bolt and full bore prep.',
    priceFrom: 165,
    unit: 'per door',
    typicalTime: 'about 1 hr',
    available: true,
  },
  {
    id: 'high-security-cylinder',
    category: 'upgrade',
    name: 'High-security restricted cylinder',
    summary: 'Pick- and drill-resistant cylinder with controlled keyway blanks cut only with authorisation.',
    priceFrom: 210,
    unit: 'per cylinder',
    typicalTime: 'about 45 min',
    available: true,
  },
  {
    id: 'strike-reinforcement',
    category: 'upgrade',
    name: 'Reinforced strike plate and long screws',
    summary: 'Swap the shallow factory strike for a heavy steel box strike anchored deep into the wall stud.',
    priceFrom: 75,
    unit: 'per door',
    typicalTime: 'about 30 min',
    available: true,
  },
  {
    id: 'smart-lock-install',
    category: 'upgrade',
    name: 'Smart lock fitting (customer-supplied)',
    summary: 'Mechanical installation, latch alignment and smooth bolt-throw tuning for a lock you provide.',
    priceFrom: 120,
    unit: 'per door',
    typicalTime: 'about 1 hr',
    available: false,
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function servicesByCategory(category: ServiceCategory): ServiceItem[] {
  return services.filter(item => item.category === category);
}

export function lowestPriceForCategory(category: ServiceCategory): number {
  const items = servicesByCategory(category);
  const available = items.filter(item => item.available);
  const pool = available.length > 0 ? available : items;
  return Math.min(...pool.map(item => item.priceFrom));
}

export function validateServices(items: readonly ServiceItem[], rules: PricingRules = pricing): void {
  if (!Number.isInteger(rules.callOutFee) || rules.callOutFee <= 0) {
    throw new Error('pricing.callOutFee: must be a positive whole USD amount');
  }
  if (!Number.isInteger(rules.afterHoursSurcharge) || rules.afterHoursSurcharge < 0) {
    throw new Error('pricing.afterHoursSurcharge: must be a non-negative whole USD amount');
  }
  if (rules.currency !== 'USD') {
    throw new Error(`pricing.currency: expected USD, got ${String(rules.currency)}`);
  }

  const seen = new Set<string>();
  for (const item of items) {
    const label = item.id || item.name || '<unnamed service>';
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`service "${label}": id must be lowercase URL-safe (letters, digits, hyphens)`);
    }
    if (seen.has(item.id)) {
      throw new Error(`service "${item.id}": duplicate id`);
    }
    seen.add(item.id);
    if (!SERVICE_CATEGORIES.includes(item.category)) {
      throw new Error(`service "${item.id}": category must be one of ${SERVICE_CATEGORIES.join(', ')}`);
    }
    if (!item.name.trim()) {
      throw new Error(`service "${item.id}": name is required`);
    }
    if (!item.summary.trim()) {
      throw new Error(`service "${item.id}": summary is required`);
    }
    if (!Number.isInteger(item.priceFrom) || item.priceFrom <= 0) {
      throw new Error(`service "${item.id}": priceFrom must be a positive whole USD amount`);
    }
    if (!SERVICE_UNITS.includes(item.unit)) {
      throw new Error(`service "${item.id}": unit must be one of ${SERVICE_UNITS.join(', ')}`);
    }
    if (!item.typicalTime.trim()) {
      throw new Error(`service "${item.id}": typicalTime is required`);
    }
    if (typeof item.available !== 'boolean') {
      throw new Error(`service "${item.id}": available must be a boolean`);
    }
  }
}
