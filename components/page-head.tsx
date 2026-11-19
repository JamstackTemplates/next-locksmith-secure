import type { ReactNode } from 'react';
import { GuillocheRosette, SecurityBand } from './artwork/guilloche';
import { Nameplate } from './artwork/nameplate';

/** Inner-page header: engraved nameplate holding the display title, with optional motif art beside it. */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  art?: ReactNode;
}) {
  return (
    <header className="pegboard relative overflow-hidden bg-bg">
      <GuillocheRosette
        id="page-head-rosette"
        className="absolute -top-40 -right-48 w-[34rem] text-brass opacity-[0.14] dark:opacity-[0.09]"
      />
      <div className="wrap relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-12">
        <div className={art ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <Nameplate tone="raised">
            <p className="eyebrow">{eyebrow}</p>
            <h1
              id={id}
              className="display-title mt-2 text-[clamp(2.75rem,6.5vw,4.75rem)] text-ink"
            >
              {title}
            </h1>
            {children ? (
              <div className="mt-4 max-w-(--measure) text-base text-muted sm:text-lg">
                {children}
              </div>
            ) : null}
          </Nameplate>
        </div>
        {art ? <div className="lg:col-span-5">{art}</div> : null}
      </div>
      <SecurityBand id="page-head-band" />
    </header>
  );
}
