import type { Dictionary } from "@/i18n/dictionaries";
import { OPENING_HOURS } from "@/lib/schedule";
import { site } from "@/lib/site";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from "./Icons";
import { SectionHeading } from "./ui";

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const weekOrder = [1, 2, 3, 4, 5, 6, 0];

/** Consecutive days with identical hours, e.g. Monday–Friday 09:00–18:00. */
function hourGroups() {
  const groups: { from: number; to: number; hours?: [number, number] }[] = [];
  for (const d of weekOrder) {
    const h = OPENING_HOURS[d];
    const last = groups.at(-1);
    if (last && last.hours?.[0] === h?.[0] && last.hours?.[1] === h?.[1]) last.to = d;
    else groups.push({ from: d, to: d, hours: h });
  }
  return groups;
}

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const block = "flex gap-4 py-5 first:pt-0 last:pb-0";
  const icon = "mt-0.5 shrink-0 text-xl text-accent";
  const label = "font-display text-lg font-semibold leading-none";

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={dict.kicker} title={dict.title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="divide-y divide-line rounded-3xl border border-line bg-surface p-6 shadow-sm shadow-navy-950/5 sm:p-7">
            <div className={block}>
              <PinIcon className={icon} />
              <div className="flex-1">
                <p className={label}>{dict.address}</p>
                <address className="mt-2 text-sm not-italic leading-relaxed text-muted" dir="ltr" lang="fr">
                  {site.address.line1}, {site.address.line2}, {site.address.city}
                </address>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {dict.directions} <ArrowIcon className="rtl:-scale-x-100" />
                </a>
              </div>
            </div>

            <div className={block}>
              <ClockIcon className={icon} />
              <div className="flex-1">
                <p className={label}>{dict.hours}</p>
                <dl className="mt-2 space-y-1 text-sm">
                  {hourGroups().map((g) => (
                    <div key={g.from} className="flex justify-between gap-4">
                      <dt className="font-medium">
                        {g.from === g.to ? dict.days[g.from] : `${dict.days[g.from]} – ${dict.days[g.to]}`}
                      </dt>
                      <dd className={g.hours ? "tabular-nums text-muted" : "text-muted/70"} dir="ltr">
                        {g.hours ? `${fmt(g.hours[0])} – ${fmt(g.hours[1])}` : dict.closed}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className={block}>
              <PhoneIcon className={icon} />
              <div className="flex-1">
                <p className={label}>{dict.phones}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {(["office", "mobile"] as const).map((k) => (
                    <li key={k} className="flex items-center justify-between gap-4">
                      <span className="text-muted">{dict[k]}</span>
                      <a
                        href={`tel:${site.phones[k].tel}`}
                        dir="ltr"
                        className="font-semibold tabular-nums text-accent underline-offset-4 hover:underline"
                      >
                        {site.phones[k].display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="min-h-[18rem] overflow-hidden rounded-3xl border border-line bg-surface-2">
            <iframe
              title={dict.mapTitle}
              src={site.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[18rem] border-0 dark:opacity-90 dark:[filter:invert(0.9)_hue-rotate(180deg)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
