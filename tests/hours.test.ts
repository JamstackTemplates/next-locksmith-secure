import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { counterStatus, DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
});

test('Brass Key counter hours in America/Los_Angeles: Mon/Sat boundaries, Sun closed, and March/Nov DST', () => {
  const statusAt = (iso: string) => counterStatus(business.hours, 'America/Los_Angeles', new Date(iso));

  // Monday 2026-11-16 (PST = UTC-8): 07:59 closed, 08:00 open, 17:29 open, 17:30 closed
  assert.deepEqual(statusAt('2026-11-16T15:59:00Z'), { open: false, label: 'Counter closed · phone line still answered' });
  assert.deepEqual(statusAt('2026-11-16T16:00:00Z'), { open: true, label: 'Counter open now' });
  assert.deepEqual(statusAt('2026-11-17T01:29:00Z'), { open: true, label: 'Counter open now' });
  assert.deepEqual(statusAt('2026-11-17T01:30:00Z'), { open: false, label: 'Counter closed · phone line still answered' });

  // Saturday 2026-11-21 (PST = UTC-8): 12:59 open, 13:00 closed
  assert.deepEqual(statusAt('2026-11-21T20:59:00Z'), { open: true, label: 'Counter open now' });
  assert.deepEqual(statusAt('2026-11-21T21:00:00Z'), { open: false, label: 'Counter closed · phone line still answered' });

  // Sunday 2026-11-22 (PST = UTC-8): closed all day
  assert.deepEqual(statusAt('2026-11-22T18:00:00Z'), { open: false, label: 'Counter closed · phone line still answered' });

  // March DST spring-forward (2026-03-08 02:00 PST -> PDT = UTC-7): Monday 2026-03-09 07:59/08:00 PDT
  assert.deepEqual(statusAt('2026-03-09T14:59:00Z'), { open: false, label: 'Counter closed · phone line still answered' });
  assert.deepEqual(statusAt('2026-03-09T15:00:00Z'), { open: true, label: 'Counter open now' });

  // November DST fall-back (2026-11-01 02:00 PDT -> PST = UTC-8): Monday 2026-11-02 07:59/08:00 PST
  assert.deepEqual(statusAt('2026-11-02T15:59:00Z'), { open: false, label: 'Counter closed · phone line still answered' });
  assert.deepEqual(statusAt('2026-11-02T16:00:00Z'), { open: true, label: 'Counter open now' });

  // Missing zone returns null (no-JS / neutral)
  assert.equal(counterStatus(business.hours, '', new Date('2026-11-16T16:00:00Z')), null);
});
