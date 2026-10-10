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
    <span className={`flex items-center gap-3 ${className}`}>
      <Emblem className="size-10 shrink-0 text-accent" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-semibold tracking-wide" dir="ltr">
          Dr. Hicham Ben Elghali
        </span>
        <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] opacity-70">
          {tagline}
        </span>
      </span>
    </span>
  );
}
