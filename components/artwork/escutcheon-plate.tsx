import type { ReactNode } from 'react';

/** Architectural brass escutcheon door plate framing the workshop counter hours. */
export function EscutcheonPlate({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-sm border-2 border-lacquer bg-raised p-2.5 brass-grain ${className}`}>
      {/* Corner screws */}
      <svg className="pointer-events-none absolute top-2.5 left-2.5 text-brass-text" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      <svg className="pointer-events-none absolute top-2.5 right-2.5 text-brass-text" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      <svg className="pointer-events-none absolute bottom-2.5 left-2.5 text-brass-text" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
      <svg className="pointer-events-none absolute bottom-2.5 right-2.5 text-brass-text" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <line x1="3" y1="6" x2="9" y2="6" stroke="currentColor" strokeWidth="1.3" />
      </svg>

      <div className="border border-brass/70 px-5 pt-6 pb-6 sm:px-7">
        {/* Top keyhole emblem */}
        <div className="mb-4 flex items-center justify-center">
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="32" height="40" rx="16" fill="var(--surface)" stroke="var(--brass)" strokeWidth="1.5" />
            <circle cx="18" cy="16" r="5" fill="var(--lacquer)" />
            <path d="M15 19.5L13.5 32H22.5L21 19.5Z" fill="var(--lacquer)" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}
