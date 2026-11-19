import { mapEmbedUrl, mapSearchUrl } from '../lib/maps';

/**
 * Optional location component. Pass the formatted address from content; never embed a secret key.
 * A styled placeholder with an "Open in Google Maps" link sits behind the iframe, so the panel is
 * never blank while the lazy embed loads or when a browser extension blocks it.
 */
export function GoogleMap({ address, title, className = '' }: {
  address: string; title: string; className?: string;
}) {
  return (
    <div className={`map ${className}`}>
      <div className="map__placeholder">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Map loading…</p>
        <a href={mapSearchUrl(address)} className="text-link mt-1.5 text-sm font-medium">
          Open {address} in Google Maps ↗
        </a>
      </div>
      <iframe src={mapEmbedUrl(address)} title={title}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </div>
  );
}
