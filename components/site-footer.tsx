import { business } from '../content/business';
import { KeyTagMark, PhoneHandsetIcon } from './artwork/icons';
import { GuillocheRosette } from './artwork/guilloche';
import { KnurledRule } from './artwork/knurled-rule';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-lacquer text-on-lacquer">
      <KnurledRule />
      <GuillocheRosette
        id="footer-rosette"
        className="absolute -right-40 -bottom-56 w-[32rem] text-brass opacity-[0.12]"
      />
      <div className="wrap relative grid gap-10 py-12 md:grid-cols-12 md:items-start">
        {/* Brand + 24/7 phone + email */}
        <div className="space-y-4 md:col-span-5">
          <div className="flex items-center gap-3">
            <KeyTagMark className="h-9 w-9 shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl font-extrabold uppercase tracking-wide text-on-lacquer">
                BRASS KEY
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-brass">
                LOCKSMITHS · PORTLAND
              </span>
            </div>
          </div>
          <p className="max-w-sm text-sm text-lacquer-muted">{business.counterLocation}</p>
          <div className="space-y-1.5 pt-1 font-mono text-sm">
            <p className="flex items-center gap-2">
              <PhoneHandsetIcon className="h-4 w-4 text-brass" />
              <a href={business.phoneHref} className="text-brass no-underline hover:underline">
                {business.phone}
              </a>
              <span className="text-xs text-lacquer-muted">(24/7 line)</span>
            </p>
            <p>
              <a
                href={`mailto:${business.email}`}
                className="wrap-anywhere text-on-lacquer underline decoration-brass/70"
              >
                {business.email}
              </a>
            </p>
          </div>
        </div>

        {/* Mini brass door plate for workshop counter hours */}
        <div className="md:col-span-4">
          <div className="border border-brass/60 bg-lacquer p-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-brass">
              Workshop counter hours
            </p>
            <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-xs">
              <dt className="text-lacquer-muted">Mon–Fri</dt>
              <dd className="text-right text-on-lacquer">08:00–17:30</dd>
              <dt className="text-lacquer-muted">Saturday</dt>
              <dd className="text-right text-on-lacquer">09:00–13:00</dd>
              <dt className="text-lacquer-muted">Sunday</dt>
              <dd className="text-right text-lacquer-muted">Closed</dd>
              <dt className="mt-1 border-t border-lacquer-line pt-1 text-brass">Phone line</dt>
              <dd className="mt-1 border-t border-lacquer-line pt-1 text-right text-brass">
                24 hours, every day
              </dd>
            </dl>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer" className="flex flex-col gap-2.5 text-sm md:col-span-3 md:items-end">
          <SiteLink href="/" className="text-on-lacquer hover:text-brass">
            Home
          </SiteLink>
          <SiteLink href="/services/" className="text-on-lacquer hover:text-brass">
            Services &amp; prices
          </SiteLink>
          <SiteLink href="/response-times/" className="text-on-lacquer hover:text-brass">
            Response times
          </SiteLink>
          <SiteLink href="/contact/" className="text-on-lacquer hover:text-brass">
            Contact &amp; quotes
          </SiteLink>
        </nav>
      </div>

      <div className="relative border-t border-lacquer-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-xs text-lacquer-muted">
          <p>{business.name} · {business.serviceArea}</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a
              className="text-on-lacquer no-underline hover:text-brass hover:underline"
              href="https://jamstacks.net"
            >
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
