"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { BOOKING_WINDOW_DAYS, addDays, nowAtClinic } from "@/lib/schedule";
import { site, whatsappUrl } from "@/lib/site";
import { PhoneRingIcon } from "./AnimatedIcons";
import { CalendarIcon, CheckIcon, WhatsAppIcon } from "./Icons";
import { BrandButton } from "./BrandButton";
import { SectionHeading } from "./ui";

type Slot = { time: string; available: boolean };
type SlotState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; closed: boolean; slots: Slot[] };
type Field = "name" | "phone" | "date" | "time";
type ServerError = keyof Dictionary["booking"]["errors"];

const noop = () => () => {};

export function Booking({ dict, lang, intlLocale }: { dict: Dictionary["booking"]; lang: Locale; intlLocale: string }) {
  // Today's date at the practice, read on the client only so prerendered HTML never goes stale.
  const today = useSyncExternalStore(noop, () => nowAtClinic().date, () => "");

  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", message: "", website: "" });
  const [slots, setSlots] = useState<SlotState>({ status: "idle" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ date: string; time: string; demo: boolean; whatsapp: string } | null>(null);
  const request = useRef(0);

  const phone = site.phone.display;
  const withPhone = (s: string) => s.replace("{phone}", phone);

  const loadSlots = async (date: string) => {
    const id = ++request.current;
    if (!date) return setSlots({ status: "idle" });
    setSlots({ status: "loading" });
    try {
      const res = await fetch(`/api/availability?date=${date}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (id === request.current) setSlots({ status: "ready", closed: data.closed, slots: data.slots });
    } catch {
      if (id === request.current) setSlots({ status: "error" });
    }
  };

  const update = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value, ...(field === "date" ? { time: "" } : {}) }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setServerError(null);
    if (field === "date") loadSlots(value);
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (form.name.trim().length < 2) next.name = dict.errors.name;
    const digits = form.phone.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(form.phone.trim()) || digits.length < 9 || digits.length > 15) {
      next.phone = dict.errors.phone;
    }
    if (!form.date) next.date = dict.errors.date;
    else if (!form.time) next.time = dict.errors.time;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        // Saved in the calendar: hand the patient over to WhatsApp to confirm with the doctor.
        const whatsapp = whatsappUrl(whatsappText(dict.whatsappIntro));
        setDone({ date: form.date, time: form.time, demo: Boolean(data.demo), whatsapp });
        setTimeout(() => window.location.assign(whatsapp), 1500);
        return;
      }
      const code = data.error as ServerError;
      setServerError(code in dict.errors ? code : "generic");
      if (code === "slot_unavailable") {
        setForm((f) => ({ ...f, time: "" }));
        loadSlots(form.date);
      }
    } catch {
      setServerError("generic");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    const [y, m, d] = date.split("-").map(Number);
    return new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d)));
  };

  /** Booking summary sent to the doctor on WhatsApp. */
  const whatsappText = (intro: string) =>
    [
      intro,
      `• ${dict.name} : ${form.name.trim()}`,
      `• ${dict.phone} : ${form.phone.trim()}`,
      form.date && `• ${dict.date} : ${formatDate(form.date)}`,
      form.time && `• ${dict.time} : ${form.time}`,
      form.message.trim() && `• ${dict.message} : ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

  const reset = () => {
    setDone(null);
    setForm({ name: "", phone: "", date: "", time: "", message: "", website: "" });
    setSlots({ status: "idle" });
  };

  const input =
    "mt-2 block w-full rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-ink placeholder:text-muted/60 transition focus:border-accent focus:outline-none focus:ring-4 focus:ring-[var(--ring)]";
  const labelCls = "text-sm font-semibold";
  const errorCls = "mt-2 text-sm text-red-700 dark:text-red-300";

  return (
    <section id="booking" className="bg-surface-2 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div>
          <SectionHeading kicker={dict.kicker} title={dict.title} intro={dict.intro} align="start" />
          <div className="mt-10 space-y-4 text-sm text-muted">
            <a href={`tel:${site.phone.tel}`} className="flex items-center gap-3 font-semibold text-ink">
              <span className="grid size-10 place-items-center rounded-full bg-surface text-lg text-accent">
                <PhoneRingIcon />
              </span>
              <span dir="ltr" className="underline decoration-accent/50 decoration-1 underline-offset-4">
                {site.phone.display}
              </span>
            </a>
            <p>{dict.emergency}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-xl shadow-navy-950/5 sm:p-10">
          {done ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-brand text-3xl text-brand-ink">
                <CheckIcon strokeWidth={2.2} />
              </span>
              <h3 className="mt-6 font-display text-3xl font-semibold">{dict.successTitle}</h3>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
                {dict.successBody.replace("{date}", formatDate(done.date)).replace("{time}", done.time)}
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted">{dict.whatsappRedirect}</p>
              <a
                href={done.whatsapp}
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25d366]/30 transition hover:bg-[#1ebe5b]"
              >
                <WhatsAppIcon className="text-lg" />
                {dict.openWhatsapp}
              </a>
              {done.demo && (
                <p className="mx-auto mt-4 max-w-md rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">{dict.demoNote}</p>
              )}
              <BrandButton variant="outlineLight" onClick={reset} className="mt-4 flex w-fit mx-auto">
                {dict.another}
              </BrandButton>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="bk-name" className={labelCls}>{dict.name}</label>
                  <input
                    id="bk-name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder={dict.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "bk-name-err" : undefined}
                    className={input}
                  />
                  {errors.name && <p id="bk-name-err" className={errorCls}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelCls}>{dict.phone}</label>
                  <input
                    id="bk-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    maxLength={20}
                    dir="ltr"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder={dict.phonePlaceholder}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "bk-phone-err" : undefined}
                    className={`${input} rtl:text-right`}
                  />
                  {errors.phone && <p id="bk-phone-err" className={errorCls}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="bk-date" className={labelCls}>{dict.date}</label>
                <div className="relative">
                  <input
                    id="bk-date"
                    name="date"
                    type="date"
                    required
                    min={today || undefined}
                    max={today ? addDays(today, BOOKING_WINDOW_DAYS) : undefined}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "bk-date-err" : undefined}
                    className={`${input} min-h-[3.25rem]`}
                  />
                  <CalendarIcon className="pointer-events-none absolute end-4 top-1/2 mt-1 -translate-y-1/2 text-lg text-muted sm:hidden" />
                </div>
                {errors.date && <p id="bk-date-err" className={errorCls}>{errors.date}</p>}
              </div>

              <fieldset aria-describedby={errors.time ? "bk-time-err" : undefined}>
                <legend className={labelCls}>{dict.time}</legend>
                <div className="mt-3 min-h-12">
                  {slots.status === "idle" && <p className="text-sm text-muted">{dict.chooseDate}</p>}
                  {slots.status === "loading" && <p className="animate-pulse text-sm text-muted">{dict.loading}</p>}
                  {slots.status === "error" && <p className={errorCls}>{withPhone(dict.errors.calendar_unavailable)}</p>}
                  {slots.status === "ready" &&
                    (slots.closed ? (
                      <p className="text-sm text-muted">{dict.closed}</p>
                    ) : slots.slots.every((s) => !s.available) ? (
                      <p className="text-sm text-muted">{dict.full}</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5" dir="ltr">
                        {slots.slots.map((s) => (
                          <label
                            key={s.time}
                            className={`relative cursor-pointer rounded-xl border px-2 py-2.5 text-center text-sm font-semibold tabular-nums transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[var(--ring)] ${
                              !s.available
                                ? "cursor-not-allowed border-line text-muted/50 line-through"
                                : form.time === s.time
                                  ? "border-brand bg-brand text-brand-ink"
                                  : "border-line bg-bg hover:border-accent/60"
                            }`}
                          >
                            <input
                              type="radio"
                              name="time"
                              value={s.time}
                              disabled={!s.available}
                              checked={form.time === s.time}
                              onChange={() => update("time", s.time)}
                              className="sr-only"
                            />
                            {s.time}
                          </label>
                        ))}
                      </div>
                    ))}
                </div>
                {errors.time && <p id="bk-time-err" className={errorCls}>{errors.time}</p>}
              </fieldset>

              <div>
                <label htmlFor="bk-message" className={labelCls}>
                  {dict.message} <span className="font-normal text-muted">({dict.optional})</span>
                </label>
                <textarea
                  id="bk-message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder={dict.messagePlaceholder}
                  className={`${input} resize-y`}
                />
              </div>

              {/* Honeypot for bots */}
              <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </label>
              </div>

              {serverError && (
                <p role="alert" className="rounded-xl border border-red-700/20 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-300/20 dark:bg-red-950/40 dark:text-red-200">
                  {withPhone(dict.errors[serverError])}
                </p>
              )}
              {serverError && serverError !== "slot_unavailable" && serverError !== "invalid" && (
                // Calendar unreachable: let the patient send the request on WhatsApp instead.
                <a
                  href={whatsappUrl(whatsappText(dict.whatsappRequest))}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]"
                >
                  <WhatsAppIcon className="text-lg" />
                  {dict.sendWhatsapp}
                </a>
              )}

              <BrandButton variant="navy" type="submit" disabled={submitting} icon={<CalendarIcon />} className="w-full !py-4 !text-base">
                {submitting ? dict.submitting : dict.submit}
              </BrandButton>
              <p className="text-center text-xs text-muted">{dict.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
