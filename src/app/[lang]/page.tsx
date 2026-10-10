import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { hasLocale, intlLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { gallery, site } from "@/lib/site";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: site.name,
    medicalSpecialty: "PrimaryCare",
    telephone: site.phones.office.tel,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    hasMap: site.mapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
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
      <JsonLd />
      <Header lang={lang} dict={dict.nav} />
      <main>
        <Hero dict={dict.hero} portrait={gallery[0].src} />
        <About dict={dict.about} />
        <Services dict={dict.services} bookLabel={dict.nav.book} />
        <Gallery dict={dict.gallery} />
        <Reviews dict={dict.reviews} />
        <Booking dict={dict.booking} lang={lang} intlLocale={intlLocale[lang]} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
      <MobileActionBar dict={dict.nav} />
    </>
  );
}
