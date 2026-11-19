'use client';

import { useEffect, useState } from 'react';
import { counterStatus, type CounterStatus, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-computed workshop counter status in the configured IANA time zone.
 * Static/no-JS output renders nothing so visitors see only the hours table.
 */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [status, setStatus] = useState<CounterStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(counterStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  if (!status) return null;

  return (
    <p
      role="status"
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
        status.open
          ? 'border-brass bg-brass/15 text-brass-text'
          : 'border-line bg-surface text-muted'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status.open ? 'bg-brass' : 'bg-muted'}`}
        aria-hidden="true"
      />
      <span>{status.label}</span>
    </p>
  );
}
