// Animated line icons redrawn from the client's references. They use
// currentColor so they follow the theme, except the alert icon, which stays
// red. Keyframes live in globals.css (classes starting with "ai-").

import { useId, type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Map pin that spins on its vertical axis. */
export function PinSpinIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <g className="ai-pin">
        <path d="M12 21.5s-7-6.2-7-11.8a7 7 0 0 1 14 0c0 5.6-7 11.8-7 11.8z" />
        <circle cx="12" cy="9.7" r="2.6" />
      </g>
    </svg>
  );
}

/** House whose door closes and opens. */
export function HouseDoorIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 20.5H5a1 1 0 0 1-1-1v-9L12 4l8 6.5v9a1 1 0 0 1-1 1h-4.5" />
      <path className="ai-door" d="M9.5 20.5v-5.5h5v5.5" />
    </svg>
  );
}

/** Red alert that fills up like a liquid, then empties. Always red. */
export function AlertFillIcon(props: Props) {
  const id = useId().replace(/:/g, "");
  return (
    <svg {...base} stroke="#c61f15" {...props}>
      <defs>
        <clipPath id={`fill-${id}`}>
          <rect className="ai-alert-level" x="0" y="0" width="24" height="24" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.3v5.6" />
      <circle cx="12" cy="16.6" r="0.4" fill="#c61f15" />
      <g clipPath={`url(#fill-${id})`}>
        <circle cx="12" cy="12" r="9" fill="#c61f15" />
        <path d="M12 7.3v5.6" stroke="#fff" />
        <circle cx="12" cy="16.6" r="0.4" stroke="#fff" fill="#fff" />
      </g>
    </svg>
  );
}

/** Graduation cap with a swinging tassel. */
export function CapIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.6v4.2c3 2.4 8 2.4 11 0v-4.2" />
      <path className="ai-tassel" d="M21.5 9.5v5.2" />
    </svg>
  );
}

/** Stethoscope whose chest piece gently swings. */
export function StethoscopeSwingIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3.5H5v5a5 5 0 0 0 10 0v-5h-1" />
      <g className="ai-stetho">
        <path d="M10 13.5v1.5a5 5 0 0 0 10 0v-2" />
        <circle cx="20" cy="11" r="2" />
      </g>
    </svg>
  );
}

/** Phone handset that rings, with pulsing sound waves. */
export function PhoneRingIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path
        className="ai-phone"
        d="M5.2 3.8h2.9l1.6 4.4-2.1 1.4a10.7 10.7 0 0 0 5.9 5.9l1.4-2.1 4.4 1.6v2.9a2 2 0 0 1-2.2 2A16.2 16.2 0 0 1 3.2 6a2 2 0 0 1 2-2.2z"
      />
      <path className="ai-wave ai-wave-1" d="M14.5 6.5a3.2 3.2 0 0 1 3 3" />
      <path className="ai-wave ai-wave-2" d="M14.5 3a6.6 6.6 0 0 1 6.5 6.5" />
    </svg>
  );
}
