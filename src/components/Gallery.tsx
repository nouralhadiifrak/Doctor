"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import type { Dictionary } from "@/i18n/dictionaries";
import { gallery } from "@/lib/site";
import { ChevronIcon } from "./Icons";
import { Photo } from "./Photo";
import { SectionHeading } from "./ui";

const AUTOPLAY_MS = 4500;
const SWIPE_PX = 40;

/** Visual slot of a slide relative to the active one: 0 = centre, ±1 = sides. */
function slotOf(i: number, index: number, total: number) {
  let offset = (((i - index) % total) + total) % total;
  if (offset > total / 2) offset -= total;
  return offset;
}

function cardStyle(offset: number, rtl: boolean): CSSProperties {
  const side = Math.sign(offset) * (rtl ? -1 : 1);
  const far = Math.abs(offset);
  if (far === 0) return { transform: "translateX(-50%)", zIndex: 30, opacity: 1 };
  if (far === 1)
    return {
      transform: `translateX(calc(-50% + ${side * 62}%)) scale(0.78) rotateY(${-side * 16}deg)`,
      zIndex: 20,
      opacity: 1,
      filter: "brightness(0.82)",
    };
  return {
    transform: `translateX(calc(-50% + ${side * 105}%)) scale(0.6) rotateY(${-side * 24}deg)`,
    zIndex: 10,
    opacity: 0,
    pointerEvents: "none",
  };
}

// Cover-flow carousel: the active photo sits in front, its neighbours tilt
// back on each side. Swipe, arrows, dots, keyboard and autoplay (paused on
// hover, off screen, or with reduced motion).
export function Gallery({ dict }: { dict: Dictionary["gallery"] }) {
  const total = gallery.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [rtl, setRtl] = useState(false);
  const reduceMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const dragStart = useRef<number | null>(null);

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    setRtl(getComputedStyle(el).direction === "rtl");
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduceMotion) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [inView, paused, reduceMotion, next, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") (rtl ? prev : next)();
    else if (e.key === "ArrowLeft") (rtl ? next : prev)();
    else return;
    e.preventDefault();
  };

  const onPointerDown = (e: PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    const forward = rtl ? dx > 0 : dx < 0;
    (forward ? next : prev)();
  };

  const arrow =
    "grid size-12 place-items-center rounded-full border border-line bg-surface text-xl text-ink shadow-sm transition hover:bg-surface-2";
  const card = "w-[74%] max-w-[40rem] aspect-[4/5] sm:w-[62%] sm:aspect-[4/3] lg:w-[54%]";

  return (
    <section ref={section} id="cabinet" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading kicker={dict.kicker} title={dict.title} intro={dict.intro} align="start" />
          <div className="hidden gap-3 md:flex">
            <button type="button" onClick={rtl ? next : prev} aria-label={dict.prev} className={arrow}>
              <ChevronIcon className="-scale-x-100" />
            </button>
            <button type="button" onClick={rtl ? prev : next} aria-label={dict.next} className={arrow}>
              <ChevronIcon />
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={dict.title}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (dragStart.current = null)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mt-14 touch-pan-y select-none [perspective:1600px]"
        >
          {/* Invisible spacer gives the stage the height of the centre card. */}
          <div className={`invisible mx-auto ${card}`} aria-hidden="true" />

          {gallery.map((g, i) => {
            const offset = slotOf(i, index, total);
            const contain = "fit" in g && g.fit === "contain";
            const position = "position" in g ? g.position : undefined;
            const active = offset === 0;
            return (
              <figure
                key={g.src}
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${total}`}
                aria-hidden={!active}
                onClick={() => !active && goTo(i)}
                style={cardStyle(offset, rtl)}
                className={`absolute left-1/2 top-0 overflow-hidden rounded-[2rem] bg-surface-2 shadow-2xl shadow-navy-950/25 transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform dark:shadow-black/50 ${card} ${
                  active ? "" : "cursor-pointer"
                }`}
              >
                {contain && (
                  <Photo
                    src={g.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 40rem, 75vw"
                    className="scale-110 object-cover opacity-60 blur-2xl"
                    loading="lazy"
                    draggable={false}
                  />
                )}
                <Photo
                  src={g.src}
                  alt={dict.captions[g.key]}
                  fill
                  // Wide photos fill a tall frame on phones, so they need more pixels than its width.
                  sizes="(min-width: 1024px) 40rem, 160vw"
                  quality={90}
                  className={contain ? "object-contain" : "object-cover"}
                  style={position ? { objectPosition: position } : undefined}
                  // The gallery is far down the page: let the browser fetch photos as it gets close.
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p key={index} aria-live="polite" className="animate-[fade-up_0.5s_ease-out] font-display text-2xl font-semibold sm:text-3xl">
            {dict.captions[gallery[index].key]}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-muted" dir="ltr">
              {index + 1} / {total}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-surface-2 px-2 py-1.5">
              {gallery.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${dict.goTo} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="grid h-5 place-items-center px-0.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-accent" : "w-1.5 bg-muted/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
