import "server-only";
import { JWT } from "google-auth-library";
import { TIMEZONE, slotEnd, toRfc3339 } from "./schedule";

// A Google service account writes appointments into a shared calendar.
// See README.md → "Google Calendar setup".

const API = "https://www.googleapis.com/calendar/v3";

type Busy = { start: number; end: number };

type CalendarEvent = {
  status?: string;
  transparency?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

let client: JWT | null = null;

export function isCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID,
  );
}

function getClient() {
  client ??= new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });
  return client;
}

const calendarPath = () =>
  `${API}/calendars/${encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!)}/events`;

/** Busy intervals on a practice-local date. Events marked "free" are ignored. */
export async function getBusy(date: string): Promise<Busy[]> {
  const url = new URL(calendarPath());
  url.searchParams.set("timeMin", toRfc3339(date, "00:00"));
  url.searchParams.set("timeMax", toRfc3339(date, "23:59"));
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("maxResults", "250");
  url.searchParams.set("timeZone", TIMEZONE);

  const res = await getClient().request<{ items?: CalendarEvent[] }>({ url: url.toString() });
  const dayStart = Date.parse(toRfc3339(date, "00:00"));
  const dayEnd = Date.parse(toRfc3339(date, "23:59"));

  return (res.data.items ?? [])
    .filter((e) => e.status !== "cancelled" && e.transparency !== "transparent")
    .map((e) => ({
      start: e.start?.dateTime ? Date.parse(e.start.dateTime) : dayStart,
      end: e.end?.dateTime ? Date.parse(e.end.dateTime) : dayEnd,
    }));
}

export function overlaps(busy: Busy[], date: string, time: string) {
  const start = Date.parse(toRfc3339(date, time));
  const end = Date.parse(toRfc3339(date, slotEnd(time)));
  return busy.some((b) => b.start < end && b.end > start);
}

export async function createAppointment(input: {
  date: string;
  time: string;
  name: string;
  phone: string;
  message?: string;
  locale: string;
}) {
  const description = [
    `Patient : ${input.name}`,
    `Téléphone : ${input.phone}`,
    input.message ? `Motif : ${input.message}` : null,
    `Langue : ${input.locale.toUpperCase()}`,
    "",
    "Réservé depuis le site web.",
  ]
    .filter((line) => line !== null)
    .join("\n");

  await getClient().request({
    url: calendarPath(),
    method: "POST",
    data: {
      summary: `RDV · ${input.name}`,
      description,
      start: { dateTime: `${input.date}T${input.time}:00`, timeZone: TIMEZONE },
      end: { dateTime: `${input.date}T${slotEnd(input.time)}:00`, timeZone: TIMEZONE },
      extendedProperties: { private: { source: "website", phone: input.phone } },
    },
  });
}
