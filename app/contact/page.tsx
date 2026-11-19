import type { Metadata } from 'next';
import { IdCardIcon, PhoneHandsetIcon } from '../../components/artwork/icons';
import { Nameplate } from '../../components/artwork/nameplate';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Non-urgent enquiries" title={business.enquiries.title}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      {/* Prominent urgent lockout panel directly under PageHead */}
      <section aria-label="Emergency lockouts" className="border-b border-line bg-surface py-6">
        <div className="wrap">
          <Nameplate tone="alert">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-alert">
                  Emergency 24/7 dispatch
                </p>
                <p className="mt-1 text-base font-semibold text-ink sm:text-lg">
                  Locked out right now? Don&apos;t use this form. Call{' '}
                  <a href={business.phoneHref} className="font-mono text-alert underline">
                    {business.phone}
                  </a>
                  .
                </p>
              </div>
              <a href={business.phoneHref} className="button font-mono text-base">
                <PhoneHandsetIcon className="h-4 w-4" />
                Call {business.phone}
              </a>
            </div>
          </Nameplate>
        </div>
      </section>

      <div className="bg-bg py-12 sm:py-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left column: hosted Jamstacks support form OR static email fallback */}
          <section aria-label="Quote enquiry form" className="lg:col-span-7">
            <div className="border-2 border-lacquer bg-raised p-6 sm:p-8">
              <p className="eyebrow">Send an enquiry</p>
              <h2 className="display-title mt-1 text-3xl text-ink sm:text-4xl">
                Ask for a quote
              </h2>
              <p className="mt-2 mb-6 text-sm text-muted">
                For rekeying quotes, security upgrades, small master-key systems and counter
                key-cutting questions. Sending a message is an enquiry only—we&apos;ll reply with a
                quote and available times.
              </p>

              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div className="border border-line bg-surface p-6">
                  <h3 className="text-lg font-semibold text-ink">Write to us directly</h3>
                  <p className="mt-2 text-sm text-muted">
                    The web enquiry form is not connected yet. Email{' '}
                    <a
                      href={`mailto:${business.email}`}
                      className="text-link font-mono wrap-anywhere"
                    >
                      {business.email}
                    </a>{' '}
                    with the details listed alongside, and we&apos;ll reply with a quote and
                    available times.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right column: Stamped key tag checklist, always-visible email, ID rule, counter hours */}
          <aside aria-label="Contact details and checklist" className="space-y-6 lg:col-span-5">
            {/* Key tag: what to include */}
            <div className="relative border-2 border-lacquer bg-surface p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow">What to include in your message</p>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-lacquer bg-raised"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-bg" />
                </span>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-sm text-ink">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Always-visible email + copy button */}
            <div className="border border-line bg-raised p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brass-text">
                Direct email
              </h2>
              <p className="mt-2">
                <a
                  className="text-link font-mono text-base wrap-anywhere"
                  href={`mailto:${business.email}`}
                >
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-line pt-4 text-sm text-muted">
                <IdCardIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass-text" />
                <p>
                  Photo ID and proof of residence, ownership or authority are required before we
                  open any lock.
                </p>
              </div>
            </div>

            {/* Workshop counter location & hours */}
            <div className="border border-line bg-raised p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brass-text">
                  Workshop counter
                </h2>
                <OpenBadge hours={business.hours} />
              </div>
              <p className="mt-2 text-sm text-ink">{business.counterLocation}</p>
              <table className="mt-4 w-full border-collapse font-mono text-xs">
                <caption className="sr-only">Workshop counter hours</caption>
                <tbody>
                  {business.hours.map(entry => (
                    <tr key={entry.day} className="border-b border-line last:border-b-0">
                      <th scope="row" className="py-1.5 text-left font-normal text-muted">
                        {entry.day}
                      </th>
                      <td className="py-1.5 text-right text-ink">
                        {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TimeZoneNote />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
