# Doctor

One-page websites for independent doctors' practices (cabinets médicaux) in Casablanca.
Plain HTML, CSS and vanilla JS: no build step, opens by double-clicking `index.html`,
deploys as a static folder.

## Structure

```
templates/medecin/        Calm template for doctors (index.html, style.css, script.js, config.js)
templates/kine/           Bold colour-block template for kinés (same config.js schema + process)
clients/demo-medecin/     Demo site for prospects (fictional content) + images/
clients/kine-wiam-kaabat/ Cabinet de Kinésithérapie Kaabat Wiam (fields marked TO CONFIRM in config.js)
```

## New client

1. Copy `templates/medecin/` (or `templates/kine/`) to `clients/<client-slug>/` and add an `images/` folder.
2. Fill in `config.js`. All content lives there; `index.html` holds none.
   - `theme.primaryColor` / `theme.accentColor` recolour the whole site.
   - Empty a field (`""`, `[]`, `null`) and its block or section disappears.
   - Hours are in Casablanca time: `"09:00-13:00, 15:00-19:00"`, `""` when closed.
   - `whatsapp`: digits only in international format (`2126XXXXXXXX`).
   - `mapsEmbedUrl`: Google Maps > Partager > Intégrer une carte > the `src` value.
   - `google.rating`: only real figures from the doctor's Google Business profile.
   - Other professions (kiné, dentiste...): rename sections and menu items with `labels`.
   - `theme` also accepts `highlightColor`, `backgroundColor`, `textColor` for 4-colour palettes.
   - `booking.instagram`: used for booking (direct message) when there is no WhatsApp.
3. Drop photos in `images/` with the names used in `config.js`. Until a file exists,
   a designed placeholder (initials, abstract blocks) is shown.
4. Verify the emergency numbers and wording in `legal` with the doctor.

## Content rules (medical advertising)

Informational tone only: no slogans, no superlatives, no promises of results,
no patient testimonials, no before/after images, no prices presented as offers.
Never publish invented qualifications, registration numbers, reviews or phone numbers.

`script.js` is shared: keep it identical in both templates.

Icons: [Tabler Icons](https://tabler.io/icons) (MIT), inlined in `script.js`.
