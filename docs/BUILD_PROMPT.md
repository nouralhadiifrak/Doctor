# Reusable build prompt (Claude Code)

Paste the block below into Claude Code to build a doctor website like this
one. The **CLIENT** section is filled with Dr Hicham Ben Elghali's details as a
working example: for a new doctor, replace only that section (name, gender,
address, phones, hours, bio, qualifications, services, reviews, photos, logo)
and the repository/branch names. Everything else describes the approved design.

```
<role>
You are a senior front-end engineer and UI designer. Build a premium, mobile-first, one-page website for a medical practice. Ship production-quality code that builds, passes lint, and is verified with screenshots before you report done.
</role>

<context>
Starting state: empty repository nouralhadiifrak/Doctor-NEW (or a copy of the "Doctor" template repository – then adapt it instead of rebuilding).
Stack (proven, keep it): Next.js latest (App Router, TypeScript) + Tailwind CSS 4 + framer-motion. This Next.js version has breaking changes: read node_modules/next/dist/docs/ (i18n, proxy.ts, route handlers, cacheComponents) BEFORE coding. Deploy target: Vercel (deploys the main branch).
Git workflow I want: work on a feature branch, commit with clear messages, push, then OPEN A PULL REQUEST to main and give me its link. I review and click "Merge" myself. For each later round of changes, start a fresh branch from the latest main and open a new pull request.
</context>

<client>
- Doctor: Dr Hicham Ben Elghali, médecin généraliste. Gender: MALE – every text must use masculine forms; avoid ambiguous capitalised phrases (in capitals "UNE MÉDECINE" reads as "une médecin").
- Address: Bureau n°2, Rez-de-chaussée, Andalous Prestige – Crystal Offices 3, Bouskoura (Grand Casablanca).
- Google Maps link: https://www.google.com/maps/place/Dr.+Hicham+Ben+Elghali/data=!4m2!3m1!1s0x0:0xf003014219b9face
- Phones (tap-to-call, no WhatsApp button): cabinet 05 20 11 06 20 (+212520110620), mobile 06 63 45 60 22 (+212663456022).
- Hours: Monday–Thursday 09:00–18:00, Friday 14:00–18:00, Saturday 09:00–13:00, Sunday closed. Appointment slot: 30 min.
- Languages: French (default), English, Arabic (RTL). Name in Arabic: الدكتور هشام ابن الغالي (flag for native-speaker check).
- About text (use verbatim, translate for EN/AR):
  "Le Dr Hicham Ben Elghali est médecin généraliste exerçant à Bouskoura. Diplômé de la Faculté de Médecine et de Pharmacie de Casablanca (Université Hassan II), il a également obtenu un diplôme universitaire en médecine d’urgence au CHU Ibn Rochd.
  Son activité couvre la médecine générale, les consultations médicales, le suivi des maladies chroniques et la prévention. Il propose également différents actes médicaux, notamment l’électrocardiogramme (ECG), l’échographie, le dépistage métabolique, ainsi que les visites à domicile et les téléconsultations.
  Dans son cabinet, le Dr Ben Elghali privilégie une prise en charge attentive des patients, dans un environnement médical moderne, avec pour objectif de répondre à leurs besoins de santé et d’assurer un suivi adapté."
- Qualifications (4, with icons): Doctorat en médecine – FMP Casablanca, Université Hassan II (cap) · Médecine d’urgence – DU, CHU Ibn Rochd (red alert) · Médecine générale – consultations, suivi des maladies chroniques et prévention (stethoscope) · Visites à domicile – consultations à domicile et téléconsultations (house).
- Services (3 cards → popup details):
  1. Consultations & médecine générale – consultations au cabinet, téléconsultations, visites à domicile.
  2. Maladies chroniques & prévention – suivi des maladies chroniques, prévention et conseils personnalisés, dépistage métabolique.
  3. Actes médicaux – électrocardiogramme (ECG), échographie, dépistage métabolique.
- Google reviews (5★, verbatim, never invent or edit):
  • Soukaina Choukri: "Dr Hicham fait partie des médecins que je recommande les yeux fermés. Très à l’écoute, compétent et surtout humain. J’apprécie sa façon de prendre le temps d’expliquer les choses avec calme et bienveillance. Son attitude zen met tout de suite à l’aise pendant la consultation. Merci pour votre professionnalisme"
  • Ayoub Tayebi: "Un médecin généraliste comme on en rencontre rarement. Il prend le temps d'écouter, d'analyser les symptômes en profondeur et surtout d'expliquer à ses patients ce qu'ils ont, au lieu de simplement prescrire un traitement. Son approche est moderne, humaine et basée sur les dernières connaissances médicales. Son professionnalisme, sa rigueur et sa passion pour son métier inspirent un grand respect. Je le recommande sans hésitation."
  • Ghazzar Hajar: "Très bon médecin, à la fois compétent, professionnel et humain. Il est vraiment à l'écoute de ses patients prend le temps de bien expliquer et de rassurer. On se sent en confiance dès la consultation. Je recommande vivement."
- Photos: doctor portrait + practice photos uploaded to public/images (rename to URL-safe names; portrait first, then building, reception, waiting rooms, offices, exam rooms). Logo: design a minimal monogram until the client sends one.
- Colors: #010736, #0D1C42, #22396F, #FCF1D0 (+ a soft gold accent for stars). Feel: calm, safe, experienced, luxury, professional.
- Fonts: Cormorant Garamond (headings), Inter (text), Arabic: IBM Plex Sans Arabic + Amiri.
- SEO title: "Dr Hicham Ben Elghali – Médecin généraliste à Bouskoura, près de Casablanca".
</client>

<features>
1. i18n routes /fr /en /ar with dictionaries; Arabic fully RTL; language picker FR / EN / ع.
2. Light/dark mode via a class on <html> set before paint (no flash). Hero and every section follow the theme (reviews band stays navy).
3. Header: logo, nav anchors, language picker, theme switch, call button. On phones keep the language picker + switch visible; shrink the logo to two short lines; burger menu for links.
4. Hero: name in CAPITALS (serif, letter-spaced), subtitle in capitals ("Un suivi médical attentif et rigoureux, dans un cabinet moderne et serein, pour vous accompagner à chaque étape de votre santé."), buttons "Visiter le cabinet" (opens Google Maps in a new tab, spinning pin icon) + "Prendre rendez-vous". Arched portrait. 5★ "5,0 sur Google" + badges (desktop).
5. Mobile order: title + subtitle → portrait → 5★ Google → 4 qualifications with icons → about text → address with pin icon, underlined, linking to Google Maps → services → rest. Hide the hero buttons on phones (the sticky bottom bar covers Call / Book).
6. Services: 3 cards with icon + "Voir les détails" opening an accessible <dialog> popup with a booking button.
7. Gallery: cover-flow carousel – active photo large in front, neighbours smaller and tilted back on each side; swipe, arrows, dots pill, "1 / N" counter, keyboard, click a side photo to open it, autoplay 4.5s (pause on hover, off screen, reduced motion). Tall photos shown in full over a blurred copy of themselves. Caption per photo in all languages.
8. Reviews: 3 cards, verbatim text, initials avatar, "Avis Google" label, link to all reviews on Google.
9. Booking: name, phone, date, grid of slot buttons, optional message. Google Calendar via a service account (env: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID; timezone Africa/Casablanca); busy events block slots; re-check before insert; honeypot. Demo success in development without credentials, explicit "not configured" error in production (never a fake confirmation). Emergency note: "En cas d’urgence, appelez le 15 ou le 141."
10. Contact: ONE compact card (address + "Itinéraire", hours grouped "Lundi – Vendredi / Samedi / Dimanche", phones underlined and clickable) + Google Maps embed with FIXED heights (h-72 on phones) so it never collapses.
11. Sticky mobile bar: "Appeler" + "Rendez-vous". All phone numbers are underlined links everywhere.
12. SEO basics: per-language metadata + hreflang, Physician JSON-LD (address, phone, hours).
</features>

<motion>
- Headings and hero subtitle: mask text reveal (clip-path wipe bottom-to-top) when scrolled into view.
- Primary buttons: moving-gradient border (light trails travelling around the pill, full border lights up on hover), navy/cream palettes, theme-aware.
- Theme switch: soft white pill track with an inner rim; a sphere knob – silver on the left in light mode, turns navy and slides right with a slight overshoot in dark mode; touch ripple on press; role="switch".
- Animated line icons (inline SVG, currentColor so they follow the theme): graduation cap (tassel swings), emergency alert (fills with liquid red – ALWAYS red), stethoscope (swings), house (door closes/opens), map pin (spins on its axis), phone (rings with pulsing sound waves) on call buttons.
- Respect prefers-reduced-motion everywhere.
</motion>

<constraints>
- Before building, list any missing information (max 8 short questions), then STOP and wait for my answers.
- Build only what is listed. Never fabricate reviews, rating counts, diplomas or medical claims; flag translations that need a native-speaker check.
- Never commit secrets: .env* gitignored, provide .env.example and a README with step-by-step Google Calendar setup (service account, share calendar with "Make changes (see private events as free/busy)", calendar timezone GMT+01:00 Casablanca).
- Stop and ask before deleting files you didn't create, adding dependencies beyond next/react/tailwind/framer-motion/google-auth-library, or force-pushing.
- Create docs/PROJECT_NOTES.md recording decisions and open items.
</constraints>

<verification>
Done when ALL pass:
1. npm run build and npm run lint: zero errors (if styles seem missing, delete .next and rebuild).
2. Playwright screenshots at 360px, 390px and 1440px, light + dark, every language: no horizontal overflow, header controls fit, no console errors.
3. /api/availability returns slots for an open day and closed:true for a closed day; /api/book returns not_configured in production without credentials.
4. Committed, pushed, and a pull request to main opened – give me the link.
Finish with a short summary: what was built, what I must do next (credentials, photos, domain, merge the pull request), and anything unverified.
</verification>
```
