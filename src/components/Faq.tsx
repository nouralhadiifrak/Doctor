import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHeading } from "./ui";

/** Practical questions, also published as FAQPage structured data (see page.tsx). */
export function faqEntries(dict: Dictionary["faq"], emergency: string) {
  return [...dict.items, { q: dict.emergencyQuestion, a: emergency }];
}

export function Faq({ dict, emergency }: { dict: Dictionary["faq"]; emergency: string }) {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={dict.kicker} title={dict.title} />

        <div className="mt-12 divide-y divide-line rounded-3xl border border-line bg-surface px-6 shadow-sm shadow-navy-950/5 sm:px-8">
          {faqEntries(dict, emergency).map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold leading-snug sm:text-xl [&::-webkit-details-marker]:hidden">
                <h3>{q}</h3>
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-gold transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
