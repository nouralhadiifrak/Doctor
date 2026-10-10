"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { ActivityIcon, ArrowIcon, CheckIcon, CloseIcon, HeartPulseIcon, StethoscopeIcon } from "./Icons";
import { SectionHeading, btn } from "./ui";

const icons = [StethoscopeIcon, HeartPulseIcon, ActivityIcon];

export function Services({ dict, bookLabel }: { dict: Dictionary["services"]; bookLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const item = dict.items[active];
  const ActiveIcon = icons[active];

  const open = (i: number) => {
    setActive(i);
    dialog.current?.showModal();
  };

  return (
    <section id="services" className="bg-surface-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={dict.kicker} title={dict.title} intro={dict.intro} />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {dict.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <li
                key={s.title}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-8 shadow-sm shadow-navy-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10"
              >
                <span className="grid size-16 place-items-center rounded-full border border-line bg-bg text-3xl text-accent transition group-hover:bg-brand group-hover:text-brand-ink">
                  <Icon />
                </span>
                <h3 className="mt-8 font-display text-2xl font-semibold leading-tight">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{s.summary}</p>
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="mt-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {dict.details}
                  <ArrowIcon className="transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="service-title"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-line bg-surface p-0 text-ink shadow-2xl"
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-2xl text-accent">
              <ActiveIcon />
            </span>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label={dict.close}
              className="grid size-10 place-items-center rounded-full border border-line text-lg hover:bg-surface-2"
            >
              <CloseIcon />
            </button>
          </div>
          <h3 id="service-title" className="mt-6 font-display text-3xl font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{item.body}</p>
          <ul className="mt-6 space-y-3">
            {item.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-xs text-brand-ink">
                  <CheckIcon strokeWidth={2.4} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a
            href="#booking"
            onClick={() => dialog.current?.close()}
            className={`${btn.base} ${btn.primary} mt-8 w-full`}
          >
            {bookLabel}
          </a>
        </div>
      </dialog>
    </section>
  );
}
