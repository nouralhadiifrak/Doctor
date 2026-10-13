type LogoProps = { tagline: string; className?: string };

/** Monogram: an "H" whose crossbar forms a medical cross, inside a fine double ring. */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" strokeWidth="1" />
      <circle cx="24" cy="24" r="19" strokeWidth="0.6" opacity="0.55" />
      <path d="M16.5 14.5v19M31.5 14.5v19M16.5 24h15" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 18.5v11" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ tagline, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <Emblem className="size-8 shrink-0 text-accent sm:size-10" />
      <span className="flex flex-col leading-none">
        {/* Two short lines on phones to leave room for the header controls. */}
        <span className="font-display text-[0.92rem] font-semibold leading-[1.05] tracking-wide sm:text-[1.15rem] sm:leading-none" dir="ltr">
          <span className="block sm:inline">Dr. Hicham </span>
          <span className="block sm:inline">Ben Elghali</span>
        </span>
        <span className="mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.22em] opacity-70 sm:block">
          {tagline}
        </span>
      </span>
    </span>
  );
}
