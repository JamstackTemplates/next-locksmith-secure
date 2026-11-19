import type { Metadata } from 'next';
import { KeyBlankRackArt } from '../../components/artwork/key-blank-rack';
import { IdRulePlate } from '../../components/home-sections';
import { PageHead } from '../../components/page-head';
import {
  HardwareDisplayBoard,
  LockoutJobSheet,
  PricingNotesBand,
  RekeyBlankRack,
  ServiceJumpNav,
  ServicesCallBand,
} from '../../components/services-sections';
import { pricing } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Upfront starting prices for 24/7 lockouts, cylinder rekeying, master-key systems and Grade 1 security upgrades across Portland.',
  alternates: { canonical: absoluteUrl('/services/') },
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        eyebrow="Services & starting prices"
        title="Lockouts, rekeying and hardware"
        art={<KeyBlankRackArt />}
      >
        <p>
          Every starting price below is in whole US dollars. We confirm the final quote on site
          before starting any work.
        </p>
      </PageHead>

      <ServiceJumpNav />

      <LockoutJobSheet
        heading="Lockouts"
        intro="Answered 24 hours a day. Lockout starting prices already include our standard call-out fee during daytime hours."
      />

      <RekeyBlankRack
        heading="Rekeying"
        intro="Keep your existing door hardware and replace only the brass pins inside the cylinder. Faster and less expensive than swapping the whole lock."
      />

      <HardwareDisplayBoard
        heading="Security upgrades"
        intro="Supplied and fitted from the van or ordered to match your existing finish. Ask about keyed-alike bundles."
      />

      <PricingNotesBand
        heading="How pricing works"
        leftNote={
          <p>
            A ${pricing.callOutFee} call-out fee covers mobile dispatch anywhere in our Portland
            service zones and is already built into our lockout and move-in rekey prices. Calls
            between 18:00 and 08:00 or on Sundays carry a ${pricing.afterHoursSurcharge} after-hours
            surcharge.
          </p>
        }
        rightNote={
          <p>
            Every door and cylinder is inspected first, and we give you the exact total before we
            pick, drill or fit hardware. No surprise add-ons once the job is done.
          </p>
        }
      />

      <IdRulePlate>
        <IdRulePlate.Heading>ID before entry</IdRulePlate.Heading>
        <IdRulePlate.Body>
          We require valid photo ID and proof of residence, ownership or authority before opening
          any home, business or vehicle. If your wallet is inside, we confirm ID as soon as the door
          is open.
        </IdRulePlate.Body>
      </IdRulePlate>

      <ServicesCallBand
        heading="Need a locksmith right now?"
        body="For lockouts or snapped keys, call the 24/7 line directly. For rekeying or hardware quotes, send an enquiry."
      />
    </>
  );
}
