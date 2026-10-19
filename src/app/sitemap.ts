import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}`,
    changeFrequency: "monthly",
    priority: lang === "fr" ? 1 : 0.8,
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}`])),
        "x-default": `${site.url}/${defaultLocale}`,
      },
    },
  }));
}
