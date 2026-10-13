"use client";

import { localeNames, locales, type Locale } from "@/i18n/config";

const short: Record<Locale, string> = { fr: "FR", en: "EN", ar: "ع" };

function rememberLocale(l: Locale) {
  document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ lang, label, compact = false }: { lang: Locale; label: string; compact?: boolean }) {
  return (
    <nav aria-label={label} className="flex items-center rounded-full border border-current/15 p-0.5 text-xs font-semibold">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          onClick={() => rememberLocale(l)}
          aria-current={l === lang ? "true" : undefined}
          title={localeNames[l]}
          className={`grid place-items-center rounded-full transition ${compact ? "h-7 min-w-7 px-1.5 text-[11px] sm:h-8 sm:min-w-8 sm:px-2 sm:text-xs" : "h-8 min-w-8 px-2"} ${
            l === lang ? "bg-current/15" : "opacity-70 hover:opacity-100"
          }`}
        >
          {short[l]}
        </a>
      ))}
    </nav>
  );
}
