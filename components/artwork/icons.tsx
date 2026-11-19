import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function DoorKeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="2.5" width="12" height="19" rx="1" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="9" r="2.75" />
      <path d="M18.5 11.75V20M18.5 16.5H21M18.5 19H20.5" />
    </svg>
  );
}

export function CarDoorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5L7.5 5.5H19.5V18.5H4V11.5Z" />
      <path d="M7.5 11.5H17V7.5H9.2L7.5 11.5Z" />
      <path d="M13 14H16.5" />
      <circle cx="9.5" cy="14" r="1.1" />
    </svg>
  );
}

export function PinStackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 13H21" strokeDasharray="2 2" />
      <rect x="6" y="7" width="2.5" height="6" />
      <rect x="10.75" y="9" width="2.5" height="4" />
      <rect x="15.5" y="6" width="2.5" height="7" />
      <rect x="6" y="13" width="2.5" height="4.5" fill="currentColor" fillOpacity="0.22" />
      <rect x="10.75" y="13" width="2.5" height="5" fill="currentColor" fillOpacity="0.22" />
      <rect x="15.5" y="13" width="2.5" height="3.5" fill="currentColor" fillOpacity="0.22" />
    </svg>
  );
}

export function DeadboltIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="11" height="14" rx="1.5" />
      <circle cx="8" cy="12" r="3" />
      <path d="M8 10.5V13.5" />
      <path d="M13.5 9.5H21.5V14.5H13.5" />
      <path d="M16.5 9.5V14.5" />
    </svg>
  );
}

export function StrikePlateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="1.5" />
      <rect x="9.5" y="8" width="5" height="8" rx="1" />
      <circle cx="12" cy="5.2" r="1" />
      <circle cx="12" cy="18.8" r="1" />
    </svg>
  );
}

export function PhoneHandsetIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 3.5H9L10.7 7.8L8.4 9.3C9.6 11.7 12.3 14.4 14.7 15.6L16.2 13.3L20.5 15V18.5C20.5 19.6 19.6 20.5 18.5 20.5C10.5 20 4 13.5 3.5 5.5C3.5 4.4 4.4 3.5 5.5 3.5Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" />
    </svg>
  );
}

export function VanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 16.5V7.5H14.5V16.5M14.5 9.5H18.5L21.5 12.5V16.5H18.5" />
      <path d="M9 16.5H14.5M2.5 16.5H5" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
      <path d="M5.5 11.5H11" />
    </svg>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <circle cx="8.5" cy="10.2" r="2" />
      <path d="M5.5 16C6 14 7 13.2 8.5 13.2C10 13.2 11 14 11.5 16" />
      <path d="M14 9.5H18.5M14 12.5H18.5M14 15.5H17" />
    </svg>
  );
}

export function KeyTagMark(props: IconProps) {
  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="8" cy="18" r="4.5" stroke="var(--brass)" strokeWidth="1.5" />
      <rect
        x="10.5"
        y="6"
        width="22"
        height="24"
        rx="4"
        fill="var(--lacquer)"
        stroke="var(--brass)"
        strokeWidth="1.5"
      />
      <rect
        x="13"
        y="8.5"
        width="17"
        height="19"
        rx="2"
        stroke="var(--brass)"
        strokeWidth="1"
        strokeOpacity="0.6"
      />
      <circle cx="16.5" cy="18" r="1.8" fill="var(--bg)" stroke="var(--brass)" strokeWidth="1.2" />
      <path
        d="M21 14.5A2.8 2.8 0 1 1 26.6 14.5C26.6 15.7 25.8 16.6 24.8 17V22.5H22.8V20.5H21.5V19H22.8V17C21.8 16.6 21 15.7 21 14.5Z"
        fill="var(--brass)"
      />
    </svg>
  );
}
