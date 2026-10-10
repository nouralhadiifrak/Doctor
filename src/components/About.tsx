import type { Dictionary } from "@/i18n/dictionaries";
import { GraduationIcon, PinIcon, ShieldIcon } from "./Icons";
import { SectionHeading } from "./ui";

const icons = [GraduationIcon, ShieldIcon, PinIcon];

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading kicker={dict.kicker} title={dict.title} align="start" />
          <div className="mt-8 space-y-5 text-base leading-[1.8] text-muted sm:text-lg">
            {dict.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <ul className="flex flex-col gap-4 self-center">
          {dict.credentials.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={c.title} className="flex gap-5 rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-navy-950/5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-2xl text-accent">
                  <Icon />
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{c.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
