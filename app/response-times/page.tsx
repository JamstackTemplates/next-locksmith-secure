import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import {
  ArrivalFactorTag,
  ArrivalFactorsBand,
  OutsideZonesBand,
  ResponseMeterDirectory,
} from '../../components/response-times-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Response times',
  description:
    'Typical daytime and nighttime arrival estimates by Portland neighbourhood, drawn as a key-bitting response meter and service directory.',
  alternates: { canonical: absoluteUrl('/response-times/') },
};

export default function ResponseTimesPage() {
  return (
    <>
      <PageHead eyebrow="Dispatch estimates · Portland" title="Typical response times">
        <p>
          Every range below is a typical arrival estimate from our downtown workshop or nearest
          mobile van—never a guarantee. We tell you our real ETA on the phone before we roll.
        </p>
      </PageHead>

      <ResponseMeterDirectory />

      <ArrivalFactorsBand heading="What changes our arrival">
        <ArrivalFactorTag index={0} title="Bridge lifts and river traffic">
          Willamette River bridge lifts, I-5 bottlenecks and evening rush hour add 10–20 minutes
          when crossing between Westside and Eastside zones.
        </ArrivalFactorTag>
        <ArrivalFactorTag index={1} title="Winter rain and ice">
          Heavy rain, standing water or ice in the West Hills slows our vans down. We quote a
          realistic window rather than rushing on slick streets.
        </ArrivalFactorTag>
        <ArrivalFactorTag index={2} title="Back-to-back emergency calls">
          If our nearest van is finishing a lockout two blocks away, we tell you honestly on the
          call and update you if anything shifts.
        </ArrivalFactorTag>
      </ArrivalFactorsBand>

      <OutsideZonesBand
        heading="Outside these zones?"
        body="Call anyway. If a van is free we often cover Gresham, Tigard, West Linn or Vancouver, and we'll give you an honest travel estimate and total price before heading out."
      />
    </>
  );
}
