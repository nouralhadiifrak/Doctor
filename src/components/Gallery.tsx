"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { gallery } from "@/lib/site";
import { ChevronIcon } from "./Icons";
import { Photo } from "./Photo";
import { SectionHeading } from "./ui";

export function Gallery({ dict }: { dict: Dictionary["gallery"] }) {
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const total = gallery.length;

  // Track the visible slide; works the same in LTR and RTL.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setIndex(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.6 },
    );
    slides.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const target = slides.current[(i + total) % total];
    const root = track.current;
    if (!target || !root) return;
    const delta = target.getBoundingClientRect().left - root.getBoundingClientRect().left;
    root.scrollBy({ left: delta, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
    if (e.key === "ArrowRight") goTo(index + (rtl ? -1 : 1));
    else if (e.key === "ArrowLeft") goTo(index + (rtl ? 1 : -1));
    else return;
    e.preventDefault();
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border border-line bg-surface text-xl text-ink shadow-sm transition hover:bg-surface-2";

  return (
    <section id="cabinet" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading kicker={dict.kicker} title={dict.title} intro={dict.intro} align="start" />
          <div className="hidden gap-3 md:flex">
            <button type="button" onClick={() => goTo(index - 1)} aria-label={dict.prev} className={arrow}>
              <ChevronIcon className="-scale-x-100 rtl:scale-x-100" />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label={dict.next} className={arrow}>
              <ChevronIcon className="rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            ref={track}
            role="region"
            aria-roledescription="carousel"
            aria-label={dict.title}
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl"
          >
            {gallery.map((g, i) => (
              <figure
                key={g.src}
                ref={(el) => {
                  slides.current[i] = el;
                }}
                data-index={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${total}`}
                className="relative aspect-[4/5] w-full shrink-0 snap-center snap-always overflow-hidden bg-surface-2 sm:aspect-[16/9]"
              >
                <Photo
                  src={g.src}
                  alt={dict.captions[g.key]}
                  fill
                  sizes="(min-width: 1280px) 80rem, 100vw"
                  className="object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent p-6 pt-20 font-display text-2xl font-semibold text-cream sm:p-8 sm:text-3xl">
                  {dict.captions[g.key]}
                </figcaption>
              </figure>
            ))}
          </div>

          <span
            className="pointer-events-none absolute end-4 top-4 rounded-full bg-navy-950/70 px-4 py-1.5 text-sm font-semibold tabular-nums text-cream backdrop-blur"
            aria-live="polite"
            dir="ltr"
          >
            {index + 1} / {total}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {gallery.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${dict.goTo} ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className="grid h-6 place-items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-accent" : "w-1.5 bg-muted/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
