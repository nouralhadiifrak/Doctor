import { NextResponse } from "next/server";
import { createAppointment, getBusy, isCalendarConfigured, overlaps } from "@/lib/google-calendar";
import { isValidSlot } from "@/lib/schedule";
import { hasLocale } from "@/i18n/config";

type Body = Partial<Record<"name" | "phone" | "date" | "time" | "message" | "website" | "locale", unknown>>;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const name = str(body.name).replace(/\s+/g, " ");
  const phone = str(body.phone);
  const date = str(body.date);
  const time = str(body.time);
  const message = str(body.message).slice(0, 1000);
  const locale = hasLocale(str(body.locale)) ? str(body.locale) : "fr";
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2 || name.length > 80) return fail("invalid", 400);
  if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 9 || digits.length > 15) {
    return fail("invalid", 400);
  }
  if (!isValidSlot(date, time)) return fail("slot_unavailable", 409);

  if (!isCalendarConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("book (demo mode, no calendar configured):", { name, phone, date, time, message });
      return NextResponse.json({ ok: true, demo: true });
    }
    return fail("not_configured", 503);
  }

  try {
    const busy = await getBusy(date);
    if (overlaps(busy, date, time)) return fail("slot_unavailable", 409);
    await createAppointment({ date, time, name, phone, message, locale });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("book: calendar write failed", error);
    return fail("calendar_unavailable", 502);
  }
}
