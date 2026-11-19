import { DarkModeToggle } from 'jamstacks';
import { KeyTagMark } from './artwork/icons';
import { SiteLink } from './site-link';

export function SiteHeader() {
  return (
    <header className="border-b-2 border-lacquer bg-raised">
      <div className="wrap flex min-h-18 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5">
        <SiteLink
          href="/"
          className="group inline-flex items-center gap-2.5 text-ink no-underline hover:no-underline"
        >
          <KeyTagMark className="h-9 w-9 shrink-0 transition-transform duration-150 group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl font-extrabold uppercase tracking-wide text-ink sm:text-[1.7rem]">
              BRASS KEY
            </span>
            <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.26em] text-brass-text">
              LOCKSMITHS
            </span>
          </span>
        </SiteLink>

        <nav
          aria-label="Main"
          className="flex items-center gap-3.5 text-sm font-medium sm:gap-6 sm:text-[0.95rem]"
        >
          <SiteLink href="/services/" markCurrent="page" className="py-1 text-ink">
            Services
          </SiteLink>
          <SiteLink href="/response-times/" markCurrent="page" className="py-1 text-ink">
            Response times
          </SiteLink>
          <SiteLink href="/contact/" markCurrent="page" className="py-1 text-ink">
            Contact
          </SiteLink>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
}
