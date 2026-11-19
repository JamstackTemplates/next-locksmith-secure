import type { Metadata } from 'next';
import {
  ClosingQuoteBand,
  CounterBand,
  HomeHero,
  IdRulePlate,
  RekeyExplainerBand,
  ResponseMeterBand,
  ServiceTagsBand,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Eyebrow>Portland 24/7 mobile locksmith &amp; counter</HomeHero.Eyebrow>
        <HomeHero.Heading>
          Locked out?
          <br />
          We&apos;re already
          <br />
          on the way.
        </HomeHero.Heading>
        <HomeHero.Introduction>
          Lockouts, rekeying and security upgrades across Portland. One number, answered every hour
          of every day.
        </HomeHero.Introduction>
        <HomeHero.Actions>
          <HomeHero.CallAction>Call {business.phone}</HomeHero.CallAction>
          <HomeHero.QuoteLink>Send a quote enquiry →</HomeHero.QuoteLink>
        </HomeHero.Actions>
      </HomeHero>

      <ServiceTagsBand>
        <ServiceTagsBand.Header>
          <div>
            <p className="eyebrow">Upfront starting rates</p>
            <ServiceTagsBand.Heading>Three jobs we do all day</ServiceTagsBand.Heading>
          </div>
          <p className="max-w-md text-sm text-muted">
            Final price is always confirmed on site before any drill, pick or cylinder comes out of
            the kit.
          </p>
        </ServiceTagsBand.Header>
        <ServiceTagsBand.Grid>
          <ServiceTagsBand.Tag category="lockout" href="/services/#lockouts" index={0} title="Lockouts">
            Non-destructive entry for homes, apartments, cars and shop doors, day or night.
          </ServiceTagsBand.Tag>
          <ServiceTagsBand.Tag category="rekey" href="/services/#rekeying" index={1} title="Rekeying">
            Reset the pins inside your existing cylinders so old keys stop working and one key fits
            every door.
          </ServiceTagsBand.Tag>
          <ServiceTagsBand.Tag category="upgrade" href="/services/#upgrades" index={2} title="Security upgrades">
            Grade 1 deadbolts, restricted high-security cylinders and reinforced steel strike plates.
          </ServiceTagsBand.Tag>
        </ServiceTagsBand.Grid>
      </ServiceTagsBand>

      <ResponseMeterBand>
        <ResponseMeterBand.Header>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-brass">
              Typical arrival by Portland zone
            </p>
            <ResponseMeterBand.Heading>
              How long until we&apos;re at your door
            </ResponseMeterBand.Heading>
            <ResponseMeterBand.Lede>
              Each cut on the blade shows the typical daytime arrival range for that part of town.
              Estimates vary with bridges, traffic and active calls.
            </ResponseMeterBand.Lede>
          </div>
          <ResponseMeterBand.Link>Full day &amp; night table →</ResponseMeterBand.Link>
        </ResponseMeterBand.Header>
        <ResponseMeterBand.Key />
      </ResponseMeterBand>

      <RekeyExplainerBand>
        <p className="eyebrow">Inside the cylinder</p>
        <h2 className="display-title mt-1 text-[clamp(2.4rem,5vw,3.75rem)] text-ink">
          How rekeying works
        </h2>
        <RekeyExplainerBand.Layout
          steps={
            <>
              <RekeyExplainerBand.Step number="01" title="We keep your solid door hardware">
                Your deadbolt housing and latch stay right on the door. We pull only the brass
                cylinder plug onto the bench.
              </RekeyExplainerBand.Step>
              <RekeyExplainerBand.Step number="02" title="We swap the bottom brass key pins">
                New pin lengths are loaded to match a fresh bitting code so the new key lines up
                flush on the shear line.
              </RekeyExplainerBand.Step>
              <RekeyExplainerBand.Step number="03" title="Every previous key is locked out">
                Old tenant, contractor or lost keys no longer lift the pins to the shear line, and
                we hand you freshly cut brass keys on the spot.
              </RekeyExplainerBand.Step>
            </>
          }
          closing={
            <RekeyExplainerBand.Closing>
              Moved in? Rekey for less than new locks.
            </RekeyExplainerBand.Closing>
          }
        />
      </RekeyExplainerBand>

      <IdRulePlate>
        <IdRulePlate.Heading>Before we open a door</IdRulePlate.Heading>
        <IdRulePlate.Body>
          Before we open any home, shop or vehicle, we check photo ID and proof of residence,
          ownership or authority to enter. If your ID is locked inside, we verify it the moment the
          door opens.
        </IdRulePlate.Body>
      </IdRulePlate>

      <CounterBand>
        <CounterBand.Grid
          heading="Workshop counter"
          note="Walk in for duplicate house and commercial keys, stamped key tags, cylinder drop-offs and hardware advice."
        />
      </CounterBand>

      <ClosingQuoteBand
        lead="Not urgent? Send a quote enquiry"
        actionLabel="Go to Contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
