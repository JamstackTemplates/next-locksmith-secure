import type { ReactNode } from 'react';
import { business } from '../content/business';
import { pricing, servicesByCategory, type ServiceItem } from '../content/services';
import {
  CarDoorIcon,
  ClockIcon,
  DeadboltIcon,
  DoorKeyIcon,
  PhoneHandsetIcon,
  PinStackIcon,
  StrikePlateIcon,
} from './artwork/icons';
import { SiteLink } from './site-link';

function UnavailableSticker() {
  return (
    <span className="inline-block -rotate-2 border border-alert bg-raised px-2.5 py-0.5 font-mono text-[0.7rem] font-medium uppercase tracking-wider text-alert">
      Temporarily unavailable – call to ask
    </span>
  );
}

/* ---------- Category Jump Links (Stamped brass tags) ---------- */
export function ServiceJumpNav() {
  const links = [
    { href: '#lockouts', label: 'Lockouts', tag: '01', icon: <DoorKeyIcon className="h-4 w-4" /> },
    { href: '#rekeying', label: 'Rekeying', tag: '02', icon: <PinStackIcon className="h-4 w-4" /> },
    { href: '#upgrades', label: 'Security upgrades', tag: '03', icon: <DeadboltIcon className="h-4 w-4" /> },
  ];

  return (
    <nav aria-label="Service categories" className="border-b border-line bg-surface py-5">
      <div className="wrap flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">Jump to:</span>
        {links.map(item => (
          <a
            key={item.href}
            href={item.href}
            className="key-tag-link inline-flex min-h-11 items-center gap-2 border-2 border-lacquer bg-raised px-4 py-1.5 text-sm font-semibold text-ink no-underline hover:border-brass hover:no-underline"
          >
            <span className="text-brass-text">{item.icon}</span>
            <span>{item.label}</span>
            <span className="font-mono text-xs text-muted">{item.tag}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ---------- 1. Lockouts: Emergency Job Sheet ---------- */
function lockoutIcon(id: string) {
  if (id === 'car-lockout') return <CarDoorIcon className="h-5 w-5 text-brass-text" />;
  return <DoorKeyIcon className="h-5 w-5 text-brass-text" />;
}

export function LockoutJobSheet({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: ReactNode;
}) {
  const items = servicesByCategory('lockout');

  return (
    <section id="lockouts" className="bg-bg py-14 sm:py-20">
      <div className="wrap">
        <div className="relative border-2 border-lacquer bg-raised p-5 sm:p-8">
          {/* Alert-red corner stamp "24/7" */}
          <div
            aria-label="24/7 dispatch"
            className="pointer-events-none absolute top-4 right-4 rotate-6 border-2 border-alert px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-alert sm:top-6 sm:right-6 sm:text-sm"
          >
            24/7
          </div>

          <div className="border-b-2 border-lacquer pb-5 pr-20">
            <p className="eyebrow">Work order · Dispatch sheet</p>
            <h2 className="display-title mt-1 text-[clamp(2.3rem,5vw,3.5rem)] text-ink">
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{intro}</p>
          </div>

          {/* Ruled work-order columns */}
          <div className="mt-2 overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-left">
              <thead>
                <tr className="border-b border-lacquer font-mono text-xs uppercase tracking-wider text-muted">
                  <th scope="col" className="py-3 pr-4">Job</th>
                  <th scope="col" className="py-3 px-4">Typical time</th>
                  <th scope="col" className="py-3 pl-4 text-right">From price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: ServiceItem) => (
                  <tr
                    key={item.id}
                    className={`border-b border-line last:border-b-0 ${
                      item.available ? '' : 'opacity-65'
                    }`}
                  >
                    <td className="py-4 pr-4 align-top">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0">{lockoutIcon(item.id)}</span>
                        <div>
                          <p className="font-semibold text-ink">{item.name}</p>
                          <p className="mt-1 text-sm text-muted">{item.summary}</p>
                          {item.note ? (
                            <p className="mt-1 font-mono text-xs text-brass-text">{item.note}</p>
                          ) : null}
                          {!item.available ? (
                            <div className="mt-2">
                              <UnavailableSticker />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top font-mono text-xs text-muted whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="h-3.5 w-3.5 text-brass-text" />
                        {item.typicalTime}
                      </span>
                    </td>
                    <td className="py-4 pl-4 align-top text-right font-mono whitespace-nowrap">
                      <span className="block text-lg font-medium text-ink">
                        from ${item.priceFrom}
                      </span>
                      <span className="block text-xs text-muted">{item.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Rekeying: Key-Blank Rack ---------- */
export function RekeyBlankRack({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: ReactNode;
}) {
  const items = servicesByCategory('rekey');

  return (
    <section id="rekeying" className="border-y border-line bg-surface py-14 sm:py-20">
      <div className="wrap">
        <p className="eyebrow">Key-blank rack · Cylinder pinning</p>
        <h2 className="display-title mt-1 text-[clamp(2.3rem,5vw,3.5rem)] text-ink">
          {heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{intro}</p>

        {/* Horizontal rack rail */}
        <div className="relative mt-10 pt-5">
          <div
            className="print-hide pointer-events-none absolute top-0 right-0 left-0 h-3 rounded-full border border-lacquer bg-lacquer"
            aria-hidden="true"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, idx) => (
              <li
                key={item.id}
                className={`flex flex-col items-center text-center ${
                  item.available ? '' : 'opacity-65'
                }`}
              >
                {/* Brass key blank silhouette with stamped price on bow */}
                <div className="relative w-full max-w-[14rem]">
                  <svg
                    viewBox="0 0 180 156"
                    fill="none"
                    aria-hidden="true"
                    className="mx-auto block h-auto w-44"
                  >
                    {/* Hook */}
                    <path d="M90 0V20" stroke="var(--lacquer)" strokeWidth="2.5" />
                    <circle cx="90" cy="4" r="3.5" fill="var(--brass)" stroke="var(--lacquer)" strokeWidth="1.4" />
                    {/* Key blank body */}
                    <path
                      d={
                        idx % 2 === 0
                          ? 'M24 22H156L164 80L114 98V146L90 154L66 146V98L16 80Z'
                          : 'M90 14C132 14 160 34 160 60C160 80 140 94 114 98V146L90 154L66 146V98C40 94 20 80 20 60C20 34 48 14 90 14Z'
                      }
                      fill="var(--brass)"
                      stroke="var(--lacquer)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Ring hole */}
                    <circle cx="90" cy="36" r="7" fill="var(--surface)" stroke="var(--lacquer)" strokeWidth="1.6" />
                    {/* Stamped price & unit on bow */}
                    <text
                      x="90"
                      y="67"
                      textAnchor="middle"
                      fill="var(--lacquer)"
                      fontFamily="var(--font-mono)"
                      fontSize="19"
                      fontWeight="600"
                    >
                      from ${item.priceFrom}
                    </text>
                    <text
                      x="90"
                      y="83"
                      textAnchor="middle"
                      fill="var(--lacquer)"
                      fontFamily="var(--font-mono)"
                      fontSize="8.5"
                      letterSpacing="0.8"
                    >
                      {item.unit.toUpperCase()}
                    </text>
                    {/* Blade milling lines */}
                    <line x1="84" y1="104" x2="84" y2="142" stroke="var(--lacquer)" strokeWidth="1.4" strokeOpacity="0.6" />
                    <line x1="96" y1="104" x2="96" y2="142" stroke="var(--lacquer)" strokeWidth="1.4" strokeOpacity="0.4" />
                  </svg>
                </div>

                {/* Name, summary and typical time beneath blank */}
                <div className="mt-3 flex flex-1 flex-col justify-between border border-line bg-raised p-4 text-left">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                    <p className="mt-1.5 text-sm text-muted">{item.summary}</p>
                    {item.note ? (
                      <p className="mt-1.5 font-mono text-xs text-brass-text">{item.note}</p>
                    ) : null}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 font-mono text-xs text-muted">
                    <span>{item.typicalTime}</span>
                    <span className="text-brass-text">from ${item.priceFrom}</span>
                  </div>
                  {!item.available ? (
                    <div className="mt-3">
                      <UnavailableSticker />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Security Upgrades: Hardware Display Board ---------- */
function upgradeIcon(id: string) {
  if (id === 'strike-reinforcement') return <StrikePlateIcon className="h-5 w-5 text-brass-text" />;
  return <DeadboltIcon className="h-5 w-5 text-brass-text" />;
}

export function HardwareDisplayBoard({
  heading,
  intro,
}: {
  heading: ReactNode;
  intro: ReactNode;
}) {
  const items = servicesByCategory('upgrade');

  return (
    <section id="upgrades" className="bg-bg py-14 sm:py-20">
      <div className="wrap">
        <div className="pegboard border-2 border-lacquer bg-surface p-5 sm:p-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="eyebrow">Hardware display board</p>
              <h2 className="display-title mt-1 text-[clamp(2.3rem,5vw,3.5rem)] text-ink">
                {heading}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">{intro}</p>
          </div>

          <ul className="grid gap-6 md:grid-cols-2">
            {items.map(item => (
              <li
                key={item.id}
                data-service-id={item.id}
                data-available={String(item.available)}
                className={`relative border-2 border-lacquer bg-raised p-5 pt-7 ${
                  item.available ? '' : 'opacity-60'
                }`}
              >
                {/* Peg hook */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-lacquer bg-brass"
                >
                  <span className="h-2 w-2 rounded-full bg-lacquer" />
                </span>

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-brass/70 bg-surface">
                      {upgradeIcon(item.id)}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                      <p className="mt-1 font-mono text-xs text-muted">{item.typicalTime}</p>
                    </div>
                  </div>

                  {/* Product-style stamped brass price tag */}
                  <div className="border border-lacquer bg-surface px-3 py-1.5 text-right font-mono">
                    <span className="block text-base font-medium text-brass-text">
                      from ${item.priceFrom}
                    </span>
                    <span className="block text-[0.7rem] uppercase text-muted">{item.unit}</span>
                  </div>
                </div>

                <p className="mt-3.5 text-sm text-muted">{item.summary}</p>

                {!item.available ? (
                  <div className="mt-4">
                    <UnavailableSticker />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. How pricing works ---------- */
export function PricingNotesBand({
  heading,
  leftNote,
  rightNote,
}: {
  heading: ReactNode;
  leftNote: ReactNode;
  rightNote: ReactNode;
}) {
  return (
    <section className="border-y border-line bg-surface py-14 sm:py-16">
      <div className="wrap">
        <p className="eyebrow">Plain figures</p>
        <h2 className="display-title mt-1 text-[clamp(2.2rem,4.5vw,3.25rem)] text-ink">
          {heading}
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-3 border-l-4 border-brass pl-5 text-sm text-muted sm:text-base">
            <p className="font-mono text-base font-medium text-ink">
              Call-out fee: ${pricing.callOutFee} {pricing.currency} · After-hours surcharge: +$
              {pricing.afterHoursSurcharge} {pricing.currency}
            </p>
            <div>{leftNote}</div>
          </div>
          <div className="space-y-3 border-l-4 border-line pl-5 text-sm text-muted sm:text-base">
            {rightNote}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Services Call CTA ---------- */
export function ServicesCallBand({
  heading,
  body,
}: {
  heading: ReactNode;
  body: ReactNode;
}) {
  return (
    <section className="bg-lacquer py-12 text-on-lacquer">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="display-title text-3xl text-on-lacquer sm:text-4xl">{heading}</h2>
          <p className="mt-1.5 max-w-xl text-sm text-lacquer-muted">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href={business.phoneHref} className="button font-mono text-base">
            <PhoneHandsetIcon className="h-4 w-4" />
            Call {business.phone}
          </a>
          <SiteLink
            href="/contact/"
            className="inline-flex min-h-11 items-center border border-brass px-4 py-2 font-mono text-xs uppercase tracking-wider text-brass no-underline hover:bg-brass/15 hover:no-underline"
          >
            Request a quote →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
