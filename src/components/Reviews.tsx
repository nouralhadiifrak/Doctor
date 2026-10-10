import type { Dictionary } from "@/i18n/dictionaries";
import { reviews, site } from "@/lib/site";
import { ArrowIcon, GoogleIcon, StarIcon } from "./Icons";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Stars({ count, className = "" }: { count: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 text-gold ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

export function Reviews({ dict }: { dict: Dictionary["reviews"] }) {
  return (
    <section id="reviews" className="relative isolate overflow-hidden border-y border-line bg-navy-950 py-24 text-cream sm:py-32">
      <div aria-hidden="true" className="absolute start-1/2 top-0 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-700/40 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-kicker text-cream/70">
            <span className="h-px w-8 bg-cream/40" aria-hidden="true" />
            {dict.kicker}
            <span className="h-px w-8 bg-cream/40" aria-hidden="true" />
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-balance sm:text-5xl">
            {dict.title}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="font-display text-5xl font-semibold" dir="ltr">5,0</span>
            <div className="text-start">
              <Stars count={5} className="text-lg" />
              <p className="mt-1 text-sm text-cream/70">{dict.rating}</p>
            </div>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.author} className="flex flex-col rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <Stars count={r.rating} />
                <span aria-hidden="true" className="font-display text-6xl leading-none text-cream/15">“</span>
              </div>
              <blockquote lang="fr" dir="ltr" className="mt-4 flex-1 text-start leading-relaxed text-cream/85">
                <p>{r.text}</p>
              </blockquote>
              {dict.originalNote && <p className="mt-4 text-xs italic text-cream/50">{dict.originalNote}</p>}
              <div className="mt-8 flex items-center gap-4 border-t border-cream/10 pt-6">
                <span className="grid size-11 place-items-center rounded-full bg-cream text-sm font-semibold text-navy-950">
                  {initials(r.author)}
                </span>
                <div>
                  <p className="font-semibold" dir="ltr">{r.author}</p>
                  <p className="flex items-center gap-1.5 text-xs text-cream/60">
                    <GoogleIcon /> {dict.source}
                  </p>
                </div>
              </div>
              <span className="sr-only">5 / 5</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream underline-offset-4 hover:underline"
          >
            {dict.seeAll}
            <ArrowIcon className="rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
