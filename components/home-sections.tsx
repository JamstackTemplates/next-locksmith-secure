import type { ReactNode } from 'react';
import { business } from '../content/business';
import { formatMinuteRange, getFeaturedZone } from '../content/response-zones';
import { lowestPriceForCategory, type ServiceCategory } from '../content/services';
import { EscutcheonPlate } from './artwork/escutcheon-plate';
import {
  DeadboltIcon,
  DoorKeyIcon,
  IdCardIcon,
  PhoneHandsetIcon,
  PinStackIcon,
} from './artwork/icons';
import { GuillocheRosette, SecurityBand } from './artwork/guilloche';
import { KnurledRule } from './artwork/knurled-rule';
import { Nameplate } from './artwork/nameplate';
import { PinTumblerArt } from './artwork/pin-tumbler';
import { KeywayDivider, MiniPadlockIcon, PadlockArt, SafeDialMedallion } from './artwork/security-decor';
import { GoogleMap } from './google-map';
import { mapDirectionsUrl } from '../lib/maps';
import { OpenBadge } from './open-badge';
import { ResponseMeter } from './response-meter';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';
import { VaultDoorArt } from './artwork/vault-door';

type Children = { children: ReactNode };

/* ---------- 1. Hero ---------- */
function HomeHeroRoot({ children }: Children) {
  const featured = getFeaturedZone();
  const arrival = formatMinuteRange(featured.dayMinutes);

  return (
    <section className="pegboard relative overflow-hidden bg-bg">
      <GuillocheRosette
        id="hero-rosette"
        className="absolute -top-56 -left-64 w-[38rem] text-brass opacity-[0.13] dark:opacity-[0.09]"
      />
      <div className="wrap relative grid items-center gap-8 pt-8 pb-12 sm:pt-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
        <div className="lg:col-span-6 lg:pr-4">{children}</div>

        <div className="relative lg:col-span-6 lg:pl-6">
          {/* Arrival nameplate: overlaps the top edge on mobile, the lower-left corner on desktop */}
          <div className="relative z-10 -mb-5 ml-2 max-w-[19rem] lg:absolute lg:-bottom-4 lg:-left-6 lg:mb-0 lg:ml-0">
            <Nameplate tone="raised" className="shadow-xl">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {featured.name} typical arrival
              </p>
              <p className="mt-1 font-mono text-2xl font-medium text-brass-text sm:text-[1.65rem]">
                {arrival}
              </p>
              <p className="mt-1 text-xs text-muted">
                Daytime estimate · 24/7 dispatch across Portland
              </p>
            </Nameplate>
          </div>

          <div className="border-2 border-lacquer bg-lacquer p-1.5 shadow-2xl shadow-lacquer/30">
            <div className="border border-brass/60">
              <VaultDoorArt />
            </div>
          </div>
        </div>
      </div>
      <SecurityBand id="hero-band" />
    </section>
  );
}

function HeroEyebrow({ children }: Children) {
  return <p className="eyebrow mb-3">{children}</p>;
}

function HeroHeading({ children }: Children) {
  return (
    <h1 className="display-title text-[clamp(3.35rem,7.5vw,6.75rem)] text-ink">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: Children) {
  return (
    <p className="mt-5 max-w-xl text-base text-muted sm:text-lg lg:mt-6">
      {children}
    </p>
  );
}

function HeroActions({ children }: Children) {
  return (
    <div className="mt-6 space-y-5 lg:mt-8">
      <div className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
        {children}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
        <span className="inline-flex items-center gap-1.5 text-brass-text">
          <MiniPadlockIcon className="h-3.5 w-3.5" />
          ANSI Grade 1 hardware
        </span>
        <span aria-hidden="true">·</span>
        <span>Non-destructive entry</span>
        <span aria-hidden="true">·</span>
        <span>ID verified</span>
      </div>
    </div>
  );
}

function HeroCallAction({ children }: Children) {
  return (
    <a
      href={business.phoneHref}
      className="button min-h-14 px-6 font-mono text-lg tracking-tight sm:px-7 sm:text-xl"
    >
      <PhoneHandsetIcon className="h-5 w-5 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

function HeroQuoteLink({ children }: Children) {
  return (
    <SiteLink
      href="/contact/"
      className="text-link inline-flex min-h-11 items-center justify-center font-medium sm:justify-start"
    >
      {children}
    </SiteLink>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  Eyebrow: HeroEyebrow,
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  CallAction: HeroCallAction,
  QuoteLink: HeroQuoteLink,
});

/* ---------- 2. Three jobs we do all day (Key tags on a ring) ---------- */
function ServiceTagsRoot({ children }: Children) {
  return (
    <section className="border-b border-line bg-surface py-14 sm:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function ServiceTagsHeader({ children }: Children) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>
  );
}

function ServiceTagsHeading({ children }: Children) {
  return (
    <h2 className="display-title text-[clamp(2.4rem,5vw,3.75rem)] text-ink">
      {children}
    </h2>
  );
}

function ServiceTagsGrid({ children }: Children) {
  return (
    <div className="relative mt-10 pt-6">
      {/* Brass split-ring rod with riveted wall brackets spanning across the band */}
      <div
        className="print-hide pointer-events-none absolute top-0 right-2 left-2 hidden items-center md:flex"
        aria-hidden="true"
      >
        <span className="h-4 w-4 shrink-0 rounded-xs border-2 border-lacquer bg-raised" />
        <span className="h-2.5 flex-1 border-y border-lacquer bg-brass" />
        <span className="h-4 w-4 shrink-0 rounded-xs border-2 border-lacquer bg-raised" />
      </div>
      <div className="grid gap-6 md:grid-cols-3 md:gap-7">{children}</div>
    </div>
  );
}

const categoryIcons: Record<ServiceCategory, ReactNode> = {
  lockout: <DoorKeyIcon className="h-6 w-6 text-brass-text" />,
  rekey: <PinStackIcon className="h-6 w-6 text-brass-text" />,
  upgrade: <DeadboltIcon className="h-6 w-6 text-brass-text" />,
};

const tagAngles = ['-rotate-[1.6deg]', 'rotate-[0.6deg]', 'rotate-[1.8deg]'];

function ServiceTag({
  category,
  href,
  index,
  title,
  children,
}: {
  category: ServiceCategory;
  href: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  const from = lowestPriceForCategory(category);
  const angle = tagAngles[index % tagAngles.length];

  return (
    <SiteLink
      href={href}
      className={`key-tag-link group relative flex flex-col justify-between border-2 border-lacquer bg-raised p-6 text-ink no-underline hover:border-brass hover:no-underline ${angle}`}
    >
      {/* Top split-ring, tag number & punched grommet hole */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-11 w-11 items-center justify-center border border-brass/70 bg-surface">
            {categoryIcons[category]}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            NO. 0{index + 1}
          </span>
        </div>
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-lacquer bg-surface"
          aria-hidden="true"
        >
          <span className="h-2.5 w-2.5 rounded-full border border-brass-text bg-bg" />
        </span>
      </div>

      <div>
        <h3 className="display-title text-3xl text-ink group-hover:text-brass-text">
          {title}
        </h3>
        <p className="mt-2.5 text-sm text-muted">{children}</p>
      </div>

      <div className="mt-6 flex items-baseline justify-between border-t border-line pt-4">
        <span className="font-mono text-base font-medium text-brass-text">
          from ${from}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-ink underline decoration-brass">
          See prices →
        </span>
      </div>
    </SiteLink>
  );
}

export const ServiceTagsBand = Object.assign(ServiceTagsRoot, {
  Header: ServiceTagsHeader,
  Heading: ServiceTagsHeading,
  Grid: ServiceTagsGrid,
  Tag: ServiceTag,
});

/* ---------- 3. Response meter (Full-bleed lacquer band) ---------- */
function ResponseMeterBandRoot({ children }: Children) {
  return (
    <section className="relative overflow-hidden bg-lacquer py-16 text-on-lacquer sm:py-20">
      <SafeDialMedallion className="pointer-events-none absolute -top-14 -right-14 w-64 opacity-15 sm:w-80" />
      <div className="wrap relative z-10">{children}</div>
    </section>
  );
}

function ResponseMeterBandHeader({ children }: Children) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      {children}
    </div>
  );
}

function ResponseMeterBandHeading({ children }: Children) {
  return (
    <h2 className="display-title max-w-2xl text-[clamp(2.4rem,5vw,3.85rem)] text-on-lacquer">
      {children}
    </h2>
  );
}

function ResponseMeterBandLede({ children }: Children) {
  return <p className="mt-3 max-w-xl text-sm text-lacquer-muted sm:text-base">{children}</p>;
}

function ResponseMeterBandLink({ children }: Children) {
  return (
    <SiteLink
      href="/response-times/"
      className="inline-flex min-h-11 items-center border border-brass px-4 py-2 font-mono text-xs uppercase tracking-wider text-brass no-underline hover:bg-brass/15 hover:no-underline"
    >
      {children}
    </SiteLink>
  );
}

function ResponseMeterBandKey() {
  return <ResponseMeter variant="lacquer" />;
}

export const ResponseMeterBand = Object.assign(ResponseMeterBandRoot, {
  Header: ResponseMeterBandHeader,
  Heading: ResponseMeterBandHeading,
  Lede: ResponseMeterBandLede,
  Link: ResponseMeterBandLink,
  Key: ResponseMeterBandKey,
});

/* ---------- 4. How rekeying works (5/7 split) ---------- */
function RekeyExplainerRoot({ children }: Children) {
  return (
    <section className="pegboard border-y border-line bg-surface py-16 sm:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function RekeyExplainerLayout({
  steps,
  closing,
}: {
  steps: ReactNode;
  closing: ReactNode;
}) {
  return (
    <>
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
        <ol className="space-y-6 lg:col-span-5">{steps}</ol>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
          <PinTumblerArt state="wrong" />
          <PinTumblerArt state="right" />
          <PinTumblerArt state="new" />
        </div>
      </div>
      <div className="mt-10 border-t border-line pt-6">{closing}</div>
    </>
  );
}

function RekeyStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] items-start gap-4 border-b border-line pb-5 last:border-b-0 last:pb-0">
      <span className="font-mono text-3xl font-medium leading-none text-brass-text sm:text-4xl">
        {number}
      </span>
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm text-muted">{children}</p>
      </div>
    </li>
  );
}

function RekeyClosing({ children }: Children) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="text-base font-semibold text-ink sm:text-lg">{children}</p>
      <SiteLink href="/services/#rekeying" className="text-link font-mono text-sm">
        See rekeying prices →
      </SiteLink>
    </div>
  );
}

export const RekeyExplainerBand = Object.assign(RekeyExplainerRoot, {
  Layout: RekeyExplainerLayout,
  Step: RekeyStep,
  Closing: RekeyClosing,
});

/* ---------- 5. Before we open a door (Centred engraved plate) ---------- */
function IdRuleSection({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-bg py-14 sm:py-16 ${className}`}>
      <div className="wrap">
        <div className="mx-auto max-w-2xl">
          <Nameplate tone="brass">
            <div className="flex flex-col items-center text-center">
              <span className="mb-3 inline-flex h-11 w-11 items-center justify-center border border-lacquer bg-raised text-brass-text">
                <IdCardIcon className="h-6 w-6" />
              </span>
              {children}
              <KeywayDivider className="mt-5 w-48" />
            </div>
          </Nameplate>
        </div>
      </div>
    </section>
  );
}

function IdRuleHeading({ children }: Children) {
  return (
    <h2 className="display-title text-3xl text-ink sm:text-4xl">{children}</h2>
  );
}

function IdRuleBody({ children }: Children) {
  return <p className="mt-3 max-w-xl text-sm text-ink/90 sm:text-base">{children}</p>;
}

export const IdRulePlate = Object.assign(IdRuleSection, {
  Heading: IdRuleHeading,
  Body: IdRuleBody,
});

/* ---------- 6. Workshop counter (Escutcheon plate + framed brass map bezel) ---------- */
function CounterBandRoot({ children }: Children) {
  return (
    <section className="border-y border-line bg-surface py-16 sm:py-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function CounterBandGrid({
  heading,
  note,
}: {
  heading: ReactNode;
  note: ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5">
        <EscutcheonPlate>
          <div className="text-center">
            <p className="eyebrow">Walk-in key cutting</p>
            <h2 className="display-title mt-1 text-3xl text-ink sm:text-4xl">
              {heading}
            </h2>
            <div className="mt-3 flex justify-center">
              <OpenBadge hours={business.hours} />
            </div>
          </div>

          <table className="mt-5 w-full border-collapse font-mono text-sm">
            <caption className="sr-only">Workshop counter opening hours</caption>
            <tbody>
              {business.hours.map(entry => (
                <tr key={entry.day} className="border-b border-line last:border-b-0">
                  <th scope="row" className="py-2 text-left font-normal text-muted">
                    {entry.day}
                  </th>
                  <td className="py-2 text-right font-medium text-ink">
                    {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-4 border-t border-line pt-3 text-center font-mono text-xs text-brass-text">
            Phone line answered 24 hours, every day
          </p>
          <div className="text-center">
            <TimeZoneNote />
          </div>
        </EscutcheonPlate>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-7 lg:self-stretch">
        <div className="border-l-4 border-brass pl-4">
          <p className="eyebrow">Downtown Portland counter</p>
          <p className="mt-1.5 text-base font-medium text-ink sm:text-lg">
            {business.counterLocation}
          </p>
          <p className="mt-1 text-sm text-muted">{note}</p>
        </div>

        <div className="flex flex-1 flex-col border-2 border-lacquer bg-raised p-2">
          <div className="flex flex-1 flex-col border border-brass/70">
            <GoogleMap address={business.mapQuery} title={business.mapTitle} className="flex-1" />
          </div>
        </div>
        <a
          href={mapDirectionsUrl(business.mapQuery)}
          className="text-link self-start font-mono text-sm"
        >
          Get directions in Google Maps ↗
        </a>
      </div>
    </div>
  );
}

export const CounterBand = Object.assign(CounterBandRoot, {
  Grid: CounterBandGrid,
});

/* ---------- 7. Closing band ---------- */
export function ClosingQuoteBand({
  lead,
  actionLabel,
}: {
  lead: ReactNode;
  actionLabel: ReactNode;
}) {
  return (
    <section className="bg-bg">
      <KnurledRule />
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-10 sm:py-12">
        <div className="flex items-center gap-4">
          <PadlockArt className="hidden w-16 shrink-0 sm:block" />
          <p className="display-title text-3xl text-ink sm:text-4xl">{lead}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <SiteLink href="/contact/" className="button">
            {actionLabel}
          </SiteLink>
          <a
            href={`mailto:${business.email}`}
            className="text-link font-mono text-sm wrap-anywhere"
          >
            {business.email}
          </a>
        </div>
      </div>
    </section>
  );
}
