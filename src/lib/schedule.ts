// Opening hours and appointment slot rules. Shared by the booking form and
// the API so both always agree on which slots exist.

export const TIMEZONE = "Africa/Casablanca";
export const SLOT_MINUTES = 20;
export const BOOKING_WINDOW_DAYS = 60;

// Minutes from midnight, keyed by weekday (0 = Sunday). Missing = closed.
export const OPENING_HOURS: Partial<Record<number, [number, number]>> = {
  1: [9 * 60, 18 * 60],
  2: [9 * 60, 18 * 60],
  3: [9 * 60, 18 * 60],
  4: [9 * 60, 18 * 60],
  5: [9 * 60, 18 * 60],
  6: [9 * 60, 13 * 60],
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

const pad = (n: number) => String(n).padStart(2, "0");
const toTime = (minutes: number) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

function parseDate(date: string) {
  if (!DATE_RE.test(date)) return null;
  const [y, m, d] = date.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d));
  if (utc.getUTCFullYear() !== y || utc.getUTCMonth() !== m - 1 || utc.getUTCDate() !== d) {
    return null;
  }
  return utc;
}

export function weekdayOf(date: string) {
  return parseDate(date)?.getUTCDay() ?? -1;
}

export function addDays(date: string, days: number) {
  const utc = parseDate(date);
  if (!utc) return date;
  utc.setUTCDate(utc.getUTCDate() + days);
  return utc.toISOString().slice(0, 10);
}

/** Current date ("YYYY-MM-DD") and minutes past midnight at the practice. */
export function nowAtClinic(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** All slots the practice offers on a date, ignoring the calendar. */
export function slotsForDate(date: string): string[] {
  const hours = OPENING_HOURS[weekdayOf(date)];
  if (!hours) return [];
  const slots: string[] = [];
  for (let t = hours[0]; t + SLOT_MINUTES <= hours[1]; t += SLOT_MINUTES) {
    slots.push(toTime(t));
  }
  return slots;
}

/** Slots on a date that are still in the future and inside the booking window. */
export function bookableSlots(date: string, now = new Date()): string[] {
  const today = nowAtClinic(now);
  if (!parseDate(date) || date < today.date || date > addDays(today.date, BOOKING_WINDOW_DAYS)) {
    return [];
  }
  const slots = slotsForDate(date);
  return date === today.date ? slots.filter((s) => toMinutes(s) > today.minutes) : slots;
}

export function isValidSlot(date: string, time: string, now = new Date()) {
  return TIME_RE.test(time) && bookableSlots(date, now).includes(time);
}

/** UTC offset of the practice timezone at a wall-clock time, e.g. "+01:00". */
function offsetAt(date: string, time: string) {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = new Date(Date.UTC(y, mo - 1, d, h, mi));
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, timeZoneName: "longOffset" })
      .formatToParts(guess)
      .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const match = name.match(/GMT([+-]\d{2}):?(\d{2})?/);
  return match ? `${match[1]}:${match[2] ?? "00"}` : "+00:00";
}

/** RFC 3339 timestamp for a practice-local date and time. */
export function toRfc3339(date: string, time: string) {
  return `${date}T${time}:00${offsetAt(date, time)}`;
}

export function slotEnd(time: string) {
  return toTime(toMinutes(time) + SLOT_MINUTES);
}
