import { business } from '../content/business';
import { formatMinuteRange, getFeaturedZone } from '../content/response-zones';
import { PhoneHandsetIcon } from './artwork/icons';

export function CallBar() {
  const featured = getFeaturedZone();
  const arrival = formatMinuteRange(featured.dayMinutes);

  return (
    <>
      <div className="print-hide sticky top-0 z-50 border-b border-brass/50 bg-lacquer text-on-lacquer">
        <div className="wrap flex min-h-11 items-center justify-between gap-3 py-1.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brass/60 text-brass">
              <PhoneHandsetIcon className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-lacquer-muted">
              <span className="sm:hidden">24/7</span>
              <span className="hidden sm:inline">24/7 lockout line</span>
            </span>
            <a
              href={business.phoneHref}
              className="font-mono text-base font-medium tracking-tight text-brass no-underline hover:underline sm:text-lg"
            >
              {business.phone}
            </a>
          </div>
          <p className="hidden items-center gap-2 font-mono text-xs text-on-lacquer md:flex">
            <span className="inline-block h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
            <span>
              {featured.name} typical arrival{' '}
              <strong className="font-medium text-brass">{arrival}</strong>
            </span>
          </p>
        </div>
      </div>

      {/* Print-only contact strip so phone & email remain visible when call bar is hidden */}
      <div className="print-only border-b border-black py-2 text-sm">
        <div className="wrap flex flex-wrap justify-between gap-4">
          <strong>{business.name}</strong>
          <span>
            24/7 Lockout Line: {business.phone} · {business.email}
          </span>
        </div>
      </div>
    </>
  );
}
