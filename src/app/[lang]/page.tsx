import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Faq, faqEntries } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { hasLocale, intlLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { OPENING_HOURS } from "@/lib/schedule";
import { gallery, site } from "@/lib/site";

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

/** Structured data for Google: the practice, the website and the FAQ. */
function JsonLd({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const page = `${site.url}/${lang}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": `${site.url}/#physician`,
        name: site.name,
        description: dict.meta.description,
        medicalSpecialty: "PrimaryCare",
        url: page,
        image: `${site.url}${gallery[0].src}`,
        logo: `${site.url}/images/logo.png`,
        telephone: site.phone.tel,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.line1}, ${site.address.line2}`,
          addressLocality: site.address.city,
          addressRegion: "Casablanca-Settat",
          addressCountry: site.address.country,
        },
        areaServed: [
          { "@type": "City", name: "Bouskoura" },
          { "@type": "City", name: "Casablanca" },
        ],
        hasMap: site.mapsUrl,
        sameAs: [site.mapsUrl],
        availableService: dict.services.items.map((s) => ({ "@type": "MedicalProcedure", name: s.title })),
        openingHoursSpecification: Object.entries(OPENING_HOURS).flatMap(([day, hours]) =>
          hours
            ? [{
                "@type": "OpeningHoursSpecification",
                dayOfWeek: WEEKDAYS[Number(day)],
                opens: hhmm(hours[0]),
                closes: hhmm(hours[1]),
              }]
            : [],
        ),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: locales,
        publisher: { "@id": `${site.url}/#physician` },
      },
      {
        "@type": "FAQPage",
        "@id": `${page}#faq`,
        inLanguage: lang,
        mainEntity: faqEntries(dict.faq, dict.booking.emergency).map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd lang={lang} dict={dict} />
      <Header lang={lang} dict={dict.nav} />
      <main>
        <Hero dict={dict.hero} portrait={gallery[0].src} portraitPosition={gallery[0].position} />
        <About dict={dict.about} />
        <Services dict={dict.services} bookLabel={dict.nav.book} />
        <Gallery dict={dict.gallery} />
        <Reviews dict={dict.reviews} />
        <Booking dict={dict.booking} lang={lang} intlLocale={intlLocale[lang]} />
        <Faq dict={dict.faq} emergency={dict.booking.emergency} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
      <MobileActionBar dict={dict.nav} />
      <WhatsAppFloat dict={dict.nav} />
    </>
  );
}
