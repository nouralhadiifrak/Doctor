import { NextResponse, type NextRequest } from "next/server";
import { getBusy, isCalendarConfigured, overlaps } from "@/lib/google-calendar";
import { bookableSlots, slotsForDate } from "@/lib/schedule";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  const open = bookableSlots(date);
  const headers = { "Cache-Control": "no-store" };

  if (slotsForDate(date).length === 0) {
    return NextResponse.json({ date, closed: true, slots: [] }, { headers });
  }
  if (open.length === 0 || !isCalendarConfigured()) {
    return NextResponse.json(
      { date, closed: false, slots: open.map((time) => ({ time, available: true })) },
      { headers },
    );
  }

  try {
    const busy = await getBusy(date);
    const slots = open.map((time) => ({ time, available: !overlaps(busy, date, time) }));
    return NextResponse.json({ date, closed: false, slots }, { headers });
  } catch (error) {
    console.error("availability: calendar read failed", error);
    return NextResponse.json({ error: "calendar_unavailable" }, { status: 502, headers });
  }
}
