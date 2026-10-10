# Dr Hicham Ben Elghali – Website

One-page site for Dr Hicham Ben Elghali (médecin généraliste, Bouskoura), in French (default), English and Arabic (RTL), with light/dark mode and online booking through Google Calendar.

Built with Next.js 16 (App Router) and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /fr
```

Without Google credentials, `npm run dev` runs booking in **demo mode**: the form works but nothing is saved. In production, booking refuses requests until Calendar is configured, so patients never get a false confirmation.

## Where to edit things

| What | File |
| --- | --- |
| Texts (FR / EN / AR) | `src/i18n/dictionaries/fr.ts`, `en.ts`, `ar.ts` |
| Phones, address, map, photos, reviews | `src/lib/site.ts` |
| Opening hours, 20-min slots, booking window | `src/lib/schedule.ts` |
| Colours and fonts | `src/app/globals.css`, `src/app/[lang]/layout.tsx` |

**Photos:** replace the placeholders in `public/images/` with real photos (JPG/WebP, ideally 1600×1000 for the cabinet and 800×1000 for the portrait) and update the paths in `src/lib/site.ts`. The first gallery photo is also used as the hero portrait.

## Google Calendar setup

Appointments are written by a Google **service account** into a calendar that is shared with it. Slots that overlap a busy event in that calendar are shown as unavailable.

1. Go to <https://console.cloud.google.com/>, create a project, and enable the **Google Calendar API**.
2. *IAM & Admin → Service Accounts → Create service account*. Open it → *Keys → Add key → JSON*, and download the file.
3. In Google Calendar (the account that should receive bookings), open *Settings → the calendar → Share with specific people*, add the service account's email, and give it **"Make changes to events"**.
4. Set the environment variables (`.env.local` locally, or the hosting dashboard in production), see `.env.example`:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` – `client_email` from the JSON
   - `GOOGLE_PRIVATE_KEY` – `private_key` from the JSON (keep the `\n`)
   - `GOOGLE_CALENDAR_ID` – the calendar owner's Gmail address (or the calendar ID from its settings)

**Switching to the doctor's calendar later:** share the doctor's calendar with the same service account (step 3) and change `GOOGLE_CALENDAR_ID`. Nothing else changes.

Each booking creates an event "RDV · Patient name" with the phone and reason in its description. To block time (holidays, lunch), add a "Busy" event in the calendar. All-day events block the day only if they are set to "Busy".

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). Add the environment variables above, then set `NEXT_PUBLIC_SITE_URL` to the final domain.
