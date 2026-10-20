import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { PinSpinIcon } from "./AnimatedIcons";
import { CalendarIcon, StarIcon } from "./Icons";
import { Photo } from "./Photo";
import { BrandButton } from "./BrandButton";
import { CurtainReveal } from "./fx/CurtainReveal";

type Props = { dict: Dictionary["hero"]; portrait: string; portraitPosition?: string };

// Grid placement: on phones the blocks stack as intro → portrait → rating;
// from lg the portrait sits in its own column spanning all rows.
export function Hero({ dict, portrait, portraitPosition = "50% 50%" }: Props) {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-bg text-ink">
      {/* Ambient light and fine rings, tinted for each theme */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 end-[-10%] size-[42rem] rounded-full bg-cream blur-[120px] dark:bg-navy-700/50" />
        <div className="absolute bottom-[-30%] start-[-10%] size-[36rem] rounded-full bg-gold/10 blur-[100px] dark:bg-navy-900" />
        <svg
          className="absolute end-[-12rem] top-1/2 hidden size-[56rem] -translate-y-1/2 text-ink/[0.06] lg:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
        >
          <circle cx="50" cy="50" r="49" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="31" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-24 sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[1fr_auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="lg:col-start-1 lg:row-start-2">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-kicker text-muted">
            <span className="h-px w-10 bg-ink/30" aria-hidden="true" />
            {dict.eyebrow}
          </p>
          <CurtainReveal
            tag="h1"
            text={dict.title}
            className="mt-6 pb-2 font-display text-[2.5rem] font-semibold uppercase leading-[1.05] tracking-[0.04em] text-balance sm:text-6xl lg:text-[4.5rem]"
          />
          <CurtainReveal
            tag="p"
            text={dict.subtitle}
            delay={0.35}
            className="mt-6 max-w-xl text-sm uppercase leading-relaxed tracking-[0.12em] text-muted sm:text-base"
          />

          {/* On phones the buttons sit under the rating instead (see below). */}
          <HeroActions dict={dict} className="mt-10 hidden sm:flex" />

          <ul className="mt-12 hidden flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.12em] text-muted lg:flex">
            <li className="flex items-center gap-2 text-ink">
              <Stars />
              {dict.rating}
            </li>
            {dict.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-ink/40" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:max-w-md lg:self-center">
          <div aria-hidden="true" className="absolute -inset-3 rounded-t-full border border-ink/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-surface-2 shadow-2xl shadow-navy-950/25 dark:shadow-black/40">
            <Photo
              src={portrait}
              alt={dict.portraitAlt}
              fill
              preload
              quality={90}
              sizes="(min-width: 1024px) 28rem, 20rem"
              className="object-cover"
              style={{ objectPosition: portraitPosition }}
            />
          </div>
        </div>

        {/* Phone-only rating line, shown right under the portrait. */}
        <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] lg:hidden">
          <Stars className="text-base" />
          {dict.rating}
        </p>
        <HeroActions dict={dict} className="-mt-4 justify-center sm:hidden" />
      </div>
    </section>
  );
}

// Compact on phones so both buttons fit on one line.
const compact = "max-sm:!gap-1.5 max-sm:!px-3.5 max-sm:!py-3 max-sm:!text-[0.8rem]";

function HeroActions({ dict, className }: { dict: Dictionary["hero"]; className: string }) {
  return (
    <div className={`flex flex-wrap gap-2 sm:gap-3 ${className}`}>
      <BrandButton variant="outline" href={site.mapsUrl} newTab icon={<PinSpinIcon />} className={compact}>
        {dict.ctaVisit}
      </BrandButton>
      <BrandButton href="#booking" icon={<CalendarIcon />} className={compact}>
        {dict.ctaBook}
      </BrandButton>
    </div>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex text-star ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}
