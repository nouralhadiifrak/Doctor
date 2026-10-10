import type { Dictionary } from "@/i18n/dictionaries";
import { OPENING_HOURS } from "@/lib/schedule";
import { site } from "@/lib/site";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./Icons";
import { SectionHeading, btn } from "./ui";

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const card = "rounded-3xl border border-line bg-surface p-7 shadow-sm shadow-navy-950/5";
  const label = "flex items-center gap-3 font-display text-xl font-semibold";

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={dict.kicker} title={dict.title} />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <div className={card}>
              <p className={label}>
                <PinIcon className="text-2xl text-accent" /> {dict.address}
              </p>
              <address className="mt-4 not-italic leading-relaxed text-muted" dir="ltr" lang="fr">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.city}
              </address>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn.base} ${btn.outline} mt-6 !py-2.5`}
              >
                {dict.directions} <ArrowIcon className="rtl:-scale-x-100" />
              </a>
            </div>

            <div className={card}>
              <p className={label}>
                <ClockIcon className="text-2xl text-accent" /> {dict.hours}
              </p>
              <dl className="mt-4 divide-y divide-line">
                {weekOrder.map((d) => {
                  const h = OPENING_HOURS[d];
                  return (
                    <div key={d} className="flex justify-between gap-4 py-2.5 text-sm">
                      <dt className="font-medium">{dict.days[d]}</dt>
                      <dd className={h ? "tabular-nums text-muted" : "text-muted/70"} dir="ltr">
                        {h ? `${fmt(h[0])} – ${fmt(h[1])}` : dict.closed}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className={card}>
              <p className={label}>
                <PhoneIcon className="text-2xl text-accent" /> {dict.phones}
              </p>
              <ul className="mt-4 space-y-3">
                {(["office", "mobile"] as const).map((k) => (
                  <li key={k} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted">{dict[k]}</span>
                    <a href={`tel:${site.phones[k].tel}`} dir="ltr" className="font-semibold tabular-nums text-accent underline-offset-4 hover:underline">
                      {site.phones[k].display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="min-h-[24rem] overflow-hidden rounded-3xl border border-line bg-surface-2">
            <iframe
              title={dict.mapTitle}
              src={site.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[24rem] border-0 dark:opacity-90 dark:[filter:invert(0.9)_hue-rotate(180deg)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
