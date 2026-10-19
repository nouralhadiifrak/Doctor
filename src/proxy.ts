import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export const LOCALE_COOKIE = "NEXT_LOCALE";

// Only one public address: in production, the *.vercel.app URLs redirect
// permanently to the real domain so Google sees no duplicate pages.
const canonical = new URL(site.url);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const host = request.headers.get("host");
  if (process.env.VERCEL_ENV === "production" && host?.endsWith(".vercel.app")) {
    return NextResponse.redirect(new URL(pathname + search, canonical), 308);
  }
  const hasPrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasPrefix) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value ?? "";
  const locale = hasLocale(saved) ? saved : defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
