import type { ReactNode } from 'react';

type Tone = 'brass' | 'raised' | 'lacquer' | 'alert';

function ScrewHead({ className }: { className: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    >
      <circle cx="6" cy="6" r="4.5" fill="var(--bg)" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.25" />
      <line x1="3" y1="8.2" x2="9" y2="3.8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

const toneClasses: Record<Tone, string> = {
  brass: 'bg-surface border-lacquer text-ink brass-grain',
  raised: 'bg-raised border-line text-ink',
  lacquer: 'bg-lacquer border-brass text-on-lacquer',
  alert: 'bg-raised border-alert text-ink',
};

const innerRuleClasses: Record<Tone, string> = {
  brass: 'border-brass/75',
  raised: 'border-brass/55',
  lacquer: 'border-brass/45',
  alert: 'border-alert/60',
};

const screwColor: Record<Tone, string> = {
  brass: 'text-brass-text',
  raised: 'text-brass-text',
  lacquer: 'text-brass',
  alert: 'text-alert',
};

/** Engraved brass/lacquer nameplate with four corner slotted screws. */
export function Nameplate({
  children,
  tone = 'raised',
  className = '',
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`relative border-2 p-2 shadow-[0_2px_0_rgba(23,21,15,0.14)] ${toneClasses[tone]} ${className}`}
    >
      <ScrewHead className={`top-2 left-2 ${screwColor[tone]}`} />
      <ScrewHead className={`top-2 right-2 ${screwColor[tone]}`} />
      <ScrewHead className={`bottom-2 left-2 ${screwColor[tone]}`} />
      <ScrewHead className={`bottom-2 right-2 ${screwColor[tone]}`} />
      <div className={`border px-5 py-4 sm:px-7 sm:py-5 ${innerRuleClasses[tone]}`}>
        {children}
      </div>
    </div>
  );
}
