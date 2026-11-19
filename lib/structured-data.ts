import { business } from '../content/business.ts';
import { responseZones } from '../content/response-zones.ts';
import { pricing, services } from '../content/services.ts';
import { absoluteUrl } from './paths.ts';

export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Locksmith',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      addressCountry: 'US',
      streetAddress: business.counterLocation,
    },
    areaServed: responseZones.flatMap(zone =>
      zone.neighbourhoods.map(place => ({
        '@type': 'Place',
        name: `${place}, Portland, OR`,
      })),
    ),
    openingHoursSpecification,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Locksmith services',
      itemListElement: services.map(item => ({
        '@type': 'Offer',
        availability: item.available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: item.priceFrom,
          priceCurrency: pricing.currency,
          description: `${item.unit}; typical duration ${item.typicalTime}`,
        },
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.summary,
        },
      })),
    },
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
