'use client';

import { useState, type ReactNode } from 'react';
import { business } from '../content/business';
import { formatMinuteRange, responseZones } from '../content/response-zones';
import { ClockIcon, PhoneHandsetIcon, VanIcon } from './artwork/icons';
import { Nameplate } from './artwork/nameplate';
import { ResponseMeter } from './response-meter';

/**
 * Paired interactive response-meter key + engraved building directory board.
 * Hovering or focusing a zone highlights both its bitting cut and its directory row.
 * All data renders statically without JS.
 */
export function ResponseMeterDirectory() {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);

  return (
    <>
      <section className="border-b border-line bg-bg py-12 sm:py-16">
        <div className="wrap">
          <p className="eyebrow">Key-bitting response meter</p>
          <h2 className="display-title mt-1 mb-6 text-[clamp(2.2rem,4.5vw,3.3rem)] text-ink">
            Typical arrival cuts by zone
          </h2>
          <ResponseMeter
            zones={responseZones}
            showNight
            variant="bone"
            activeZoneId={activeZoneId}
            onActiveZoneChange={setActiveZoneId}
          />
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-20">
        <div className="wrap">
          <div className="border-2 border-brass bg-lacquer p-5 text-on-lacquer sm:p-8">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-brass/50 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-brass">
                  Engraved service directory · Portland
                </p>
                <h2 className="display-title mt-1 text-3xl text-on-lacquer sm:text-4xl">
                  Neighbourhood response board
                </h2>
              </div>
              <p className="font-mono text-xs text-lacquer-muted">
                Day: 08:00–18:00 · Night: 18:00–08:00 &amp; Sundays
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <caption className="sr-only">
                  Typical daytime and nighttime locksmith arrival ranges by Portland zone
                </caption>
                <thead>
                  <tr className="border-b border-brass/50 font-mono text-xs uppercase tracking-wider text-brass">
                    <th scope="col" className="py-3 pr-4">Zone</th>
                    <th scope="col" className="py-3 px-4">Neighbourhoods</th>
                    <th scope="col" className="py-3 px-4 text-right">Day (typical)</th>
                    <th scope="col" className="py-3 pl-4 text-right">Night (typical)</th>
                  </tr>
                </thead>
                <tbody>
                  {responseZones.map(zone => {
                    const isActive = activeZoneId === zone.id;
                    return (
                      <tr
                        key={zone.id}
                        data-zone-row={zone.id}
                        onMouseEnter={() => setActiveZoneId(zone.id)}
                        onMouseLeave={() => setActiveZoneId(null)}
                        className={`border-b border-lacquer-line transition-colors last:border-b-0 ${
                          isActive ? 'bg-brass/15' : 'hover:bg-brass/10'
                        }`}
                      >
                        <th scope="row" className="py-4 pr-4 font-semibold text-on-lacquer">
                          <span className="inline-flex items-center gap-2">
                            {zone.name}
                            {zone.featured ? (
                              <span className="border border-brass/70 px-1.5 py-0.5 font-mono text-[0.65rem] font-normal uppercase tracking-wider text-brass">
                                Counter zone
                              </span>
                            ) : null}
                          </span>
                        </th>
                        <td className="py-4 px-4 text-sm text-lacquer-muted">
                          {zone.neighbourhoods.join(', ')}
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-sm font-medium text-brass whitespace-nowrap">
                          {formatMinuteRange(zone.dayMinutes)}
                        </td>
                        <td className="py-4 pl-4 text-right font-mono text-sm text-on-lacquer whitespace-nowrap">
                          {formatMinuteRange(zone.nightMinutes)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- What changes our arrival (three key tags in a staggered row) ---------- */
export function ArrivalFactorsBand({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="pegboard border-y border-line bg-bg py-14 sm:py-20">
      <div className="wrap">
        <p className="eyebrow">Real-world estimates</p>
        <h2 className="display-title mt-1 text-[clamp(2.2rem,4.5vw,3.3rem)] text-ink">
          {heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3 md:items-start">{children}</div>
      </div>
    </section>
  );
}

const staggerClasses = ['', 'md:mt-5', 'md:mt-10'];

export function ArrivalFactorTag({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  const icon =
    index === 0 ? (
      <VanIcon className="h-5 w-5 text-brass-text" />
    ) : index === 1 ? (
      <ClockIcon className="h-5 w-5 text-brass-text" />
    ) : (
      <PhoneHandsetIcon className="h-5 w-5 text-brass-text" />
    );

  return (
    <article
      className={`border-2 border-lacquer bg-raised p-6 ${staggerClasses[index % staggerClasses.length]}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center border border-brass/70 bg-surface">
          {icon}
        </span>
        <span className="font-mono text-xs text-muted">0{index + 1}</span>
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-muted">{children}</p>
    </article>
  );
}

/* ---------- Outside these zones ---------- */
export function OutsideZonesBand({
  heading,
  body,
}: {
  heading: ReactNode;
  body: ReactNode;
}) {
  return (
    <section className="bg-surface py-14 sm:py-16">
      <div className="wrap">
        <Nameplate tone="raised">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Wider metro area</p>
              <h2 className="display-title mt-1 text-3xl text-ink sm:text-4xl">{heading}</h2>
              <p className="mt-2 text-sm text-muted sm:text-base">{body}</p>
            </div>
            <a href={business.phoneHref} className="button font-mono text-base">
              <PhoneHandsetIcon className="h-4 w-4" />
              Call {business.phone}
            </a>
          </div>
        </Nameplate>
      </div>
    </section>
  );
}
