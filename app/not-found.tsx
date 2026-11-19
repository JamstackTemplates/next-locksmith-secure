import { PhoneHandsetIcon } from '../components/artwork/icons';
import { WrongKeyArt } from '../components/artwork/wrong-key';
import { SiteLink } from '../components/site-link';
import { business } from '../content/business';

export default function NotFound() {
  return (
    <section className="pegboard bg-bg py-16 sm:py-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <WrongKeyArt />
        </div>
        <div className="lg:col-span-6">
          <p className="eyebrow">404 · Wrong bitting</p>
          <h1 className="display-title mt-2 text-[clamp(3rem,7vw,5.25rem)] text-ink">
            This key doesn&apos;t fit.
          </h1>
          <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
            That page isn&apos;t on our board. Head back to the counter, check our services, or call
            the 24/7 line if you&apos;re locked out.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={business.phoneHref} className="button font-mono text-base">
              <PhoneHandsetIcon className="h-4 w-4" />
              Call {business.phone}
            </a>
            <SiteLink href="/" className="button button-quiet">
              Go home
            </SiteLink>
            <SiteLink href="/services/" className="text-link font-medium">
              View services →
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
