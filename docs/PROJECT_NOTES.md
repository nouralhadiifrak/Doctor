# Project notes – Dr Hicham Ben Elghali website

Read this first when resuming work. It records decisions, status and the plan
agreed so far. No secrets belong in this file.

## Client

- Dr Hicham Ben Elghali, médecin généraliste (male – texts must use masculine forms).
- Bureau n°2, Rez-de-chaussée, Andalous Prestige – Crystal Offices 3, Bouskoura.
- Phone: 06 63 45 60 22 only (calls + WhatsApp; the doctor has no landline).
- Hours: Mon–Fri 09:00–18:00, Sat 09:00–13:00, Sun closed. Slots: 20 min.
- Languages: French (default), English, Arabic (RTL).
- Palette: #010736, #0D1C42, #22396F, #FCF1D0. Feel: calm, safe, luxury, professional.

## Current state (built)

- Next.js 16 + Tailwind 4, one long page with sections: hero, about, services
  (3 cards + popups), gallery (9 real photos), Google reviews (verbatim),
  booking, contact (compact card + map), footer, sticky mobile Call/Book bar.
- Booking writes to Google Calendar via a service account
  (env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID).
  Tested working on the owner's own calendar. Setup steps: README.md.
- Effects: mask text reveal on headings, moving-gradient buttons, soft pill
  theme switch (silver knob = light, navy knob = dark, from client video),
  cover-flow gallery (from client video, autoplay 4.5s), animated line icons
  in src/components/AnimatedIcons.tsx (cap, red alert – always red,
  stethoscope, house, spinning pin, ringing phone).
- Hero follows light/dark theme. Hero text in capitals; subtitle "Un suivi
  médical…" (in caps, "Une médecine" read as "une médecin").
- Hero buttons: "Visiter le cabinet" (Google Maps, new tab) + "Prendre
  rendez-vous". Hidden on phones (sticky bottom bar covers call/book).
- Mobile order: title → portrait → Google rating → 4 qualifications with
  icons → about text → underlined address linking to Maps → services…
- Mobile header shows language picker + theme switch; logo on two lines.
- Phone numbers are underlined links everywhere. Map uses fixed heights
  (was collapsing on phones) – confirm on a real phone after deploy.
- Qualifications (4): Doctorat en médecine, Médecine d'urgence, Médecine
  générale, Visites à domicile – the last two were written from the bio and
  need the doctor's approval.
- Deployed on Vercel from `main`. Work branch: `claude/zen-heisenberg-n79be7`
  (merge it into `main` to publish new commits).

- After the client meeting: single number everywhere, floating WhatsApp
  button, booking saves to Google Calendar then opens WhatsApp with a
  prefilled summary (WhatsApp fallback if the calendar is unreachable);
  doctor's own calendar events block slots, all-day events block the day.
- Pending from that meeting: new colors + logo (waiting for files), domain
  name already bought by the doctor (connect it in Vercel → Domains).

## Waiting on the client (meeting)

- Logo file (SVG or transparent PNG) – current logo is a placeholder monogram.
- Higher-resolution photos (≥1600px wide); building photo without date stamp.
- Validation of all texts, service details, and the Arabic translation.
- OK to display the Google reviews.
- Booking rules: slot length, days off, holidays, whether home visits are bookable.
- Domain name bought in the doctor's name (e.g. drbenelghali.ma).
- Share his Google Calendar with the service account ("Make changes (see
  private events as free/busy)"), timezone (GMT+01:00) Casablanca; then set
  GOOGLE_CALENDAR_ID to his email in .env.local and Vercel, and redeploy.
- Add us as Manager on his Google Business Profile (never ask for passwords).
- Legal: Ordre des Médecins advertising rules; patient data (law 09-08 / CNDP)
  → privacy page + check whether a CNDP declaration is needed; legal notice.
- Signed quote + deposit (30–50%).

## Planned work (after the meeting)

1. Split into pages: Accueil (short overview + "En savoir plus" links + reviews),
   Le docteur, Services (decide: one page or one per service), Le cabinet
   (gallery), Rendez-vous, Contact. Menu, theme switch, languages and the mobile
   Call/Book bar stay on every page. URLs like /fr/docteur, /fr/rendez-vous.
2. SEO:
   - Real domain first (vercel.app deployment URLs are not indexed).
   - sitemap.xml, robots.txt, Open Graph share image, FAQ section.
   - Home title: "Dr Hicham Ben Elghali – Médecin généraliste à Bouskoura, près
     de Casablanca". Bouskoura stays primary; Casablanca as secondary mention.
   - Dedicated pages: /fr/medecin-generaliste-casablanca and a home-visits page
     ("médecin à domicile Casablanca / Bouskoura"); later per-service pages
     (ECG, échographie).
   - Off-site: Google Business Profile (website link, category, photos, reviews
     and replies, service areas for home visits; never put a city in the
     business name), DabaDoc / Med.ma profiles, consistent name/address/phone,
     Google Search Console + sitemap, local backlinks.
   - Expectations: Bouskoura top 3 in 1–3 months; home visits Casablanca 3–6
     months; "médecin généraliste Casablanca" (organic) 6–12 months, not
     guaranteed. Directories dominate that page 1 – a strong DabaDoc profile is
     the fastest way to appear there.
   - Avoid: fake addresses, keyword stuffing, copy-paste neighbourhood pages,
     superlatives ("le meilleur médecin").
3. Optional chatbot: limited to practical info + booking, 3 languages, never
   medical advice (redirect to the doctor / emergency 15 or 141).

## Pricing discussed (Morocco, estimates – verify against local market)

- Current site: 8,000–15,000 MAD (agency equivalent 15,000–30,000).
- Extras: multi-page 2,000–4,000; logo 1,000–3,000; SEO setup 1,500–4,000;
  Google Business + directories 800–2,000; per-service page 500–1,000 each;
  chatbot 2,500–6,000 + monthly AI cost.
- Packages: Essentiel ~8,000 · Pro ~13,000 · Premium ~18,000–20,000 MAD.
- Maintenance 300–800 MAD/month. Note: Vercel Hobby is non-commercial –
  budget Vercel Pro (~$20/month) or another host.
- Domain .ma ~100–300 MAD/year.

## Security notes

- Fragments of the first service-account key appeared in a screenshot; risk is
  low, but rotating the key (new JSON key, delete old one) is recommended,
  ideally when switching to the doctor's calendar.
- Delete downloaded JSON key files after copying into .env.local.
