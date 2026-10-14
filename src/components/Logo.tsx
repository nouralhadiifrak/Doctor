import Image from "next/image";

type LogoProps = {
  tagline: string;
  className?: string;
  /** "auto" follows the theme; "onDark" always uses the light-ink version (footer). */
  tone?: "auto" | "onDark";
};

// The client's "HB" monogram. logo-dark.png has the navy parts turned light so it
// stays visible on navy backgrounds.
function Mark({ tone }: { tone: "auto" | "onDark" }) {
  const size = "h-8 w-auto shrink-0 sm:h-11";
  if (tone === "onDark") {
    return <Image src="/images/logo-dark.png" alt="" width={1150} height={610} className={size} />;
  }
  return (
    <>
      <Image src="/images/logo.png" alt="" width={1150} height={610} priority className={`${size} dark:hidden`} />
      <Image src="/images/logo-dark.png" alt="" width={1150} height={610} className={`${size} hidden dark:block`} />
    </>
  );
}

export function Logo({ tagline, className = "", tone = "auto" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <Mark tone={tone} />
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
