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
    doctorName: "Dr Prénom Nom",
    title: "Médecin généraliste",
    cabinetName: "Cabinet médical",
    neighborhood: "Quartier",
    city: "Casablanca"
  },

  /* Two colours only. Everything else (tints, borders, hover) derives from them.
     Keep primary dark enough for white text (contrast 4.5:1 minimum). */
  theme: {
    primaryColor: "#1E5A72",
    accentColor: "#3F7D68"
  },

  /* Two sentences, factual. Shown in the hero. */
  intro: "Première phrase : type de consultations et public reçu. Deuxième phrase : modalités (sur rendez-vous, suivi, orientation).",

  /* icon: one of stethoscope, heart-rate-monitor, activity-heartbeat, vaccine,
     baby-carriage, clipboard-heart, report-medical, file-certificate, lungs,
     first-aid-kit, thermometer, microscope, scale, wheelchair, home-heart */
  consultations: [
    { title: "Domaine de consultation", description: "Une ou deux lignes descriptives, sans promesse de résultat.", icon: "stethoscope" }
  ],

  doctor: {
    photo: "images/medecin.jpg",
    /* One string, or an array of paragraphs. */
    bio: "Présentation factuelle du médecin et de sa pratique.",
    /* { year (optional), title, place (optional) } */
    qualifications: [
      { year: "", title: "Doctorat en médecine", place: "Faculté (à compléter)" }
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
    externalBookingUrl: ""
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
