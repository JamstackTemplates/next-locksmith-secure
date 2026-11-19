import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  getFeaturedZone,
  responseZones,
  validateResponseZones,
} from '../content/response-zones.ts';
import { pricing, services, validateServices } from '../content/services.ts';
import { bittingCutDepth, buildKeyBladePath, buildKeyCuts } from '../lib/bitting.ts';
import { validateHours } from '../lib/hours.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'phoneHref', 'counterLocation', 'mapQuery'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.match(business.phoneHref, /^tel:\+?\d+$/, 'business.phoneHref: valid tel: URI required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 6, 'business.enquiries.usefulToInclude: include full guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('services catalog passes validation and rejects bad items with item-specific errors', () => {
  assert.doesNotThrow(() => validateServices(services, pricing));
  assert.equal(services.length, 12);

  // Duplicate ID names the offending service
  assert.throws(
    () => validateServices([...services, { ...services[0] }]),
    new RegExp(services[0].id),
  );
  // Non-URL-safe ID names the offending service
  assert.throws(
    () => validateServices([{ ...services[0], id: 'House Lockout!' }]),
    /House Lockout!/,
  );
  // Invalid category names the offending service
  assert.throws(
    () => validateServices([{ ...services[0], category: 'plumbing' as never }]),
    new RegExp(services[0].id),
  );
  // Non-integer / non-positive price names the offending service
  assert.throws(
    () => validateServices([{ ...services[1], priceFrom: 99.5 }]),
    new RegExp(services[1].id),
  );
  assert.throws(
    () => validateServices([{ ...services[1], priceFrom: 0 }]),
    new RegExp(services[1].id),
  );
});

test('response zones pass validation and reject bad ranges or featured counts', () => {
  assert.doesNotThrow(() => validateResponseZones(responseZones));
  const featured = getFeaturedZone(responseZones);
  assert.equal(featured.id, 'downtown');

  // Duplicate ID names offending zone
  assert.throws(
    () => validateResponseZones([...responseZones, { ...responseZones[1], featured: false }]),
    new RegExp(responseZones[1].id),
  );
  // Invalid range (min >= max or > 120) names offending zone
  assert.throws(
    () =>
      validateResponseZones(
        responseZones.map(z => (z.id === 'north' ? { ...z, dayMinutes: { min: 50, max: 50 } } : z)),
      ),
    /north/,
  );
  assert.throws(
    () =>
      validateResponseZones(
        responseZones.map(z => (z.id === 'outer-east' ? { ...z, nightMinutes: { min: 45, max: 130 } } : z)),
      ),
    /outer-east/,
  );
  // Night max < day max names offending zone
  assert.throws(
    () =>
      validateResponseZones(
        responseZones.map(z => (z.id === 'inner-east' ? { ...z, nightMinutes: { min: 20, max: 35 } } : z)),
      ),
    /inner-east/,
  );
  // Must have exactly one featured zone
  assert.throws(
    () => validateResponseZones(responseZones.map(z => ({ ...z, featured: false }))),
    /exactly one featured/,
  );
  assert.throws(
    () => validateResponseZones(responseZones.map(z => ({ ...z, featured: true }))),
    /exactly one featured/,
  );
});

test('key-bitting cut depth visibly increases when a zone max minutes increases', () => {
  assert.ok(bittingCutDepth(35) > bittingCutDepth(30));
  const before = buildKeyBladePath(buildKeyCuts(responseZones));
  const updated = responseZones.map(z =>
    z.id === 'downtown' ? { ...z, dayMinutes: { ...z.dayMinutes, max: 35 } } : z,
  );
  const after = buildKeyBladePath(buildKeyCuts(updated));
  assert.notEqual(before, after);
});

test('structured data emits Locksmith schema derived from content and escapes JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'Locksmith');
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.email, business.email);
  assert.equal(schema.openingHoursSpecification.length, 6);
  assert.equal(schema.hasOfferCatalog.itemListElement.length, services.length);
  assert.ok(schema.areaServed.length >= 20);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
