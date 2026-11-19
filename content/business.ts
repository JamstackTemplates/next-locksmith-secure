import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by the page and fallback metadata. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public 24/7 lockout and main telephone number formatted for display. */
  phone: string;
  /** Actionable tel: href derived from the main number. */
  phoneHref: string;
  /** Plain-English location note for the walk-in key-cutting counter. */
  counterLocation: string;
  /** Public landmark or street address passed to GoogleMap. */
  mapQuery: string;
  /** Accessible title for the embedded map iframe. */
  mapTitle: string;
  /** Summary of the mobile service area. */
  serviceArea: string;
  /** Walk-in key-cutting counter hours (same-day intervals only; phone line is 24/7). */
  hours: readonly OpeningHours[];
  /** Contact page copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain enquiry wording; no booking, payment or arrival promises. */
    introduction: string;
    /** Suggestions for the message field, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Brass Key Locksmiths',
  tagline: "Locked out? We're already on the way.",
  introduction:
    'Lockouts, rekeying and security upgrades across Portland. One number, answered every hour of every day.',
  email: 'hello@brasskeylocksmiths.example',
  phone: '(503) 555-0148',
  phoneHref: 'tel:+15035550148',
  counterLocation:
    'Key-cutting counter two blocks from Pioneer Courthouse Square, Downtown Portland, OR',
  mapQuery: 'Pioneer Courthouse Square, Portland, OR',
  mapTitle: 'Map showing the area around the Brass Key workshop counter',
  serviceArea: 'Portland city and close-in suburbs',
  hours: [
    { day: 'Monday', opens: '08:00', closes: '17:30' },
    { day: 'Tuesday', opens: '08:00', closes: '17:30' },
    { day: 'Wednesday', opens: '08:00', closes: '17:30' },
    { day: 'Thursday', opens: '08:00', closes: '17:30' },
    { day: 'Friday', opens: '08:00', closes: '17:30' },
    { day: 'Saturday', opens: '09:00', closes: '13:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Quotes and questions',
    introduction:
      "For rekeying quotes, hardware upgrades, small master-key systems and counter key cutting. We'll reply with a quote and available times.",
    usefulToInclude: [
      'Your neighbourhood or nearest cross streets',
      'Property type (house, apartment, shop, or vehicle make and year)',
      'How many doors or locks are involved',
      'The lock brand if you can see a stamp on the face or key',
      'What you would like done (rekey, replace, upgrade or duplicate)',
      'Days and times that suit you for a visit or counter pickup',
    ],
  },
};
