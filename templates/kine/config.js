/* ==========================================================================
   CONFIGURATION DU SITE
   All client content lives here. index.html contains no client content.

   Rules for every client site:
   - Empty a field ("" or [] or null) and its block or section disappears.
   - Informational tone only: no slogans, no superlatives, no promises of
     results, no testimonials, no before/after, no prices presented as offers.
   - Images: put files in /images and reference them below. Until a file
     exists, a designed placeholder is shown automatically.
   ========================================================================== */
window.SITE = {
  identity: {
    doctorName: "Prénom Nom",
    title: "Kinésithérapeute",
    cabinetName: "Cabinet de kinésithérapie",
    shortName: "",   // optional shorter name for the header
    monogram: "",    // optional, default: initials of doctorName
    neighborhood: "Quartier",
    city: "Casablanca"
  },

  /* primaryColor and accentColor are required; the other three are optional.
     Tints, borders and hover states all derive from these values.
     Keep primary dark enough for white text (contrast 4.5:1 minimum). */
  /* Kiné template roles:
     primaryColor   hero block, buttons on light backgrounds (white text 4.5:1 min)
     accentColor    contact block and big tile (darkened automatically behind text)
     highlightColor buttons on dark blocks, arcs, tiles (dark text on it)
     backgroundColor, textColor */
  theme: {
    primaryColor: "#464B71",
    accentColor: "#118AB2",
    highlightColor: "#7CD5C7",
    backgroundColor: "#F2F2ED",
    textColor: "#262A42"
  },

  /* Optional: rename section titles and menu items for other professions.
     Keys: navConsultations, navDoctor, navCabinet, navInfos, consultations,
     doctor, doctorPath, cabinet, equipment, infos, insurance, callButton */
  labels: {},

  /* Optional "how it works" steps, shown after the care areas. 3 or 4 items. */
  process: [
    { title: "Bilan", description: "Une phrase factuelle.", icon: "clipboard-heart" }
  ],

  /* Two sentences, factual. Shown in the hero. */
  intro: "Première phrase : type de consultations et public reçu. Deuxième phrase : modalités (sur rendez-vous, suivi, orientation).",

  /* icon: one of stethoscope, heart-rate-monitor, activity-heartbeat, vaccine,
     baby-carriage, clipboard-heart, report-medical, file-certificate, lungs,
     first-aid-kit, thermometer, microscope, scale, wheelchair, home-heart,
     massage, bone, run, walk, stretching, stretching-2, brain, old, woman,
     baby-bottle, ball-football, body-scan, barbell, treadmill, accessible,
     wave-sine, flame, snowflake */
  /* 4 or 6 items fit the tile layout exactly. */
  consultations: [
    { title: "Domaine de prise en charge", description: "Une ou deux lignes descriptives, sans promesse de résultat.", icon: "bone" }
  ],

  doctor: {
    photo: "images/portrait.jpg",
    /* One string, or an array of paragraphs. */
    bio: "Présentation factuelle du ou de la kinésithérapeute et de sa pratique.",
    /* { year (optional), title, place (optional) } */
    qualifications: [
      { year: "", title: "Diplôme d'État de kinésithérapie", place: "Faculté (à compléter)" }
    ],
    languages: ["Arabe", "Français"],
    yearsOfExperience: null
  },

  cabinet: {
    /* Strings or { src, alt }. 1 to 5 photos; the gallery adapts its layout. */
    photos: ["images/cabinet-1.jpg", "images/cabinet-2.jpg", "images/cabinet-3.jpg"],
    equipment: []
  },

  practical: {
    /* "09:00-13:00, 15:00-19:00" for split days, "" when closed. Casablanca time. */
    hours: {
      lundi: "09:00-13:00, 15:00-19:00",
      mardi: "09:00-13:00, 15:00-19:00",
      mercredi: "09:00-13:00, 15:00-19:00",
      jeudi: "09:00-13:00, 15:00-19:00",
      vendredi: "09:00-13:00, 15:00-19:00",
      samedi: "09:00-13:00",
      dimanche: ""
    },
    address: "",
    /* Google Maps > Partager > Intégrer une carte > copy the src="..." value */
    mapsEmbedUrl: "",
    mapsLink: "",
    access: "",
    parking: "",
    /* Text if offered, "" if not. */
    homeVisits: ""
  },

  booking: {
    /* Displayed as written; the tel: link keeps digits only. */
    phone: "",
    /* International format, digits only, no + and no spaces: 2126XXXXXXXX */
    whatsapp: "",
    whatsappMessage: "Bonjour, je souhaite prendre rendez-vous au cabinet.",
    /* Optional, e.g. the doctor's DabaDoc profile URL. */
    externalBookingUrl: "",
    /* Optional: handle or profile URL. Used as the booking channel (direct
       message) when there is no WhatsApp, and shown in Contact. */
    instagram: ""
  },

  insurance: ["AMO (CNSS)", "CNOPS"],

  faq: [
    { question: "Comment prendre rendez-vous ?", answer: "Réponse factuelle." }
  ],

  /* Only real figures from the doctor's Google Business profile. Leave null otherwise. */
  google: {
    rating: null,
    reviewCount: null,
    reviewsLink: ""
  },

  seo: {
    title: "",
    description: "",
    keywords: []
  },

  legal: {
    disclaimer: "Ce site a une vocation uniquement informative et ne remplace pas une consultation médicale.",
    emergency: "En cas d'urgence, ne vous déplacez pas au cabinet : appelez le 141 (SAMU) ou le 15 (Protection civile)."
  }
};
