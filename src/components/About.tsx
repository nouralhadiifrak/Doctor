import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { AlertFillIcon, CapIcon, HouseDoorIcon, PinSpinIcon, StethoscopeSwingIcon } from "./AnimatedIcons";
import { SectionHeading } from "./ui";

// One icon per credential, in dictionary order. The alert icon keeps its red.
const icons = [CapIcon, AlertFillIcon, StethoscopeSwingIcon, HouseDoorIcon];

export function About({ dict }: { dict: Dictionary["about"] }) {
  const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city}`;

  return (
    <section id="about" className="pb-24 pt-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        {/* Phones: qualifications come first, right after the hero rating. */}
        <ul className="grid gap-3 self-center sm:grid-cols-2 lg:order-2 lg:grid-cols-1 lg:gap-4">
          {dict.credentials.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={c.title}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm shadow-navy-950/5 sm:p-5 lg:gap-5 lg:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-2xl text-accent">
                  <Icon />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold leading-tight lg:text-xl">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="lg:order-1">
          <SectionHeading kicker={dict.kicker} title={dict.title} align="start" />
          <div className="mt-8 space-y-5 text-base leading-[1.8] text-muted sm:text-lg">
            {dict.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={dict.mapsLink}
            className="group mt-8 flex items-start gap-3 font-medium text-ink"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-2 text-2xl text-accent">
              <PinSpinIcon />
            </span>
            <span
              dir="ltr"
              lang="fr"
              className="pt-2.5 underline decoration-accent/50 decoration-1 underline-offset-[6px] transition group-hover:decoration-accent rtl:text-right"
            >
              {address}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
