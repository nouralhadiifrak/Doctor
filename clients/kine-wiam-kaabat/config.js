/* ==========================================================================
   Cabinet de Kinésithérapie Kaabat Wiam, Casablanca

   CONFIRMED (from the Google Maps listing and Instagram link provided):
   - Practice name, Instagram handle, map location (33.6012326, -7.5136671).

   TO CONFIRM WITH THE CLIENT BEFORE PUBLISHING (left empty = hidden on the site):
   - phone, whatsapp, opening hours, street address, neighbourhood
   - qualifications, languages, years of practice, equipment, insurance
   - the list of "soins" below and the bio wording (draft, standard kiné scope)
   - photos: images/wiam-kaabat.jpg, images/cabinet-1.jpg ... cabinet-3.jpg
   ========================================================================== */
window.SITE = {
  identity: {
    doctorName: "Wiam Kaabat",
    title: "Kinésithérapeute",
    cabinetName: "Cabinet de Kinésithérapie Kaabat Wiam",
    shortName: "Cabinet Kaabat Wiam",
    neighborhood: "",            // TO CONFIRM (e.g. "Sidi Bernoussi")
    city: "Casablanca"
  },

  /* Palette supplied by the client: #464B71, #118AB2, #7CD5C7, #F2F2ED */
  theme: {
    primaryColor: "#464B71",     // buttons, logo, links (white text 8.4:1)
    accentColor: "#118AB2",      // status, small accents (darkened automatically for text)
    highlightColor: "#7CD5C7",   // decorative only: placeholders, check marks
    backgroundColor: "#F2F2ED",
    textColor: "#262A42"         // derived from #464B71 for body text (12.5:1)
  },

  labels: {
    navConsultations: "Soins",
    navDoctor: "La praticienne",
    consultations: "Domaines de prise en charge",
    doctor: "La kinésithérapeute",
    doctorPath: "Formation"
  },

  intro: "Séances de kinésithérapie et de rééducation sur rendez-vous, au cabinet à Casablanca. Chaque prise en charge débute par un bilan, puis un programme de séances adapté à votre situation.",

  /* DRAFT: standard kinésithérapie scope. Keep only what Wiam Kaabat practises. */
  consultations: [
    {
      title: "Rééducation orthopédique",
      description: "Entorses, fractures, tendinites et douleurs articulaires, après un traumatisme ou une immobilisation.",
      icon: "bone"
    },
    {
      title: "Rééducation post-opératoire",
      description: "Récupération de la mobilité et de la force après une chirurgie du genou, de l'épaule, de la hanche ou du rachis.",
      icon: "walk"
    },
    {
      title: "Dos et cou",
      description: "Lombalgies, cervicalgies et sciatiques : exercices, techniques manuelles et conseils de posture.",
      icon: "body-scan"
    },
    {
      title: "Kinésithérapie du sport",
      description: "Prise en charge des blessures sportives et reprise progressive de l'activité.",
      icon: "run"
    },
    {
      title: "Rééducation neurologique",
      description: "Travail de l'équilibre, de la marche et de la motricité après un AVC ou dans le cadre d'une maladie neurologique.",
      icon: "brain"
    },
    {
      title: "Massage thérapeutique",
      description: "Massages à visée antalgique et décontracturante, intégrés au programme de rééducation.",
      icon: "massage"
    }
  ],

  doctor: {
    photo: "images/wiam-kaabat.jpg",
    bio: [
      "Wiam Kaabat est kinésithérapeute et reçoit ses patients dans son cabinet à Casablanca, sur rendez-vous.",
      "Le programme de rééducation est établi après un bilan de la première séance, en lien avec le médecin prescripteur."
    ],
    qualifications: [],          // TO CONFIRM: diplôme, établissement, année
    languages: [],               // TO CONFIRM: e.g. ["Arabe", "Darija", "Français"]
    yearsOfExperience: null      // TO CONFIRM
  },

  cabinet: {
    photos: [
      { src: "images/cabinet-1.jpg", alt: "Salle de rééducation du cabinet" },
      { src: "images/cabinet-2.jpg", alt: "Cabine de soins" },
      { src: "images/cabinet-3.jpg", alt: "Accueil du cabinet" }
    ],
    equipment: []                // TO CONFIRM: e.g. "Électrothérapie", "Ultrasons", "Plateau de rééducation"
  },

  practical: {
    hours: {                     // TO CONFIRM, e.g. lundi: "09:00-13:00, 15:00-19:00"
      lundi: "",
      mardi: "",
      mercredi: "",
      jeudi: "",
      vendredi: "",
      samedi: "",
      dimanche: ""
    },
    address: "",                 // TO CONFIRM: street, building, floor
    mapsEmbedUrl: "https://maps.google.com/maps?q=33.6012326,-7.5136671&z=16&hl=fr&output=embed",
    mapsLink: "https://www.google.com/maps/place/Cabinet+de+Kin%C3%A9sith%C3%A9rapie+Kaabat+Wiam/@33.6012326,-7.5136671,17z/data=!4m6!3m5!1s0xda7cbfbedcf510d:0x21b2ddd114cdb19d!8m2!3d33.6012326!4d-7.5136671",
    access: "",
    parking: "",
    homeVisits: ""               // TO CONFIRM: séances à domicile ?
  },

  booking: {
    phone: "",                   // TO CONFIRM
    whatsapp: "",                // TO CONFIRM (format 2126XXXXXXXX)
    whatsappMessage: "Bonjour, je souhaite prendre rendez-vous au cabinet de kinésithérapie.",
    externalBookingUrl: "",
    instagram: "cabinet_de_kine_wiam_kaabat"
  },

  insurance: [],                 // TO CONFIRM: e.g. ["AMO (CNSS)", "CNOPS", "Mutuelles"]

  faq: [
    {
      question: "Comment prendre rendez-vous ?",
      answer: "Envoyez un message au cabinet sur Instagram en indiquant le motif de votre rééducation et vos disponibilités. Le cabinet vous propose un créneau."
    },
    {
      question: "Faut-il une prescription médicale ?",
      answer: "Pour une prise en charge par votre assurance maladie ou votre mutuelle, une prescription de votre médecin est généralement demandée. Apportez-la dès la première séance."
    },
    {
      question: "Que faut-il apporter à la première séance ?",
      answer: "La prescription médicale, vos comptes rendus et examens récents (radiographie, IRM, compte rendu opératoire), votre carte d'assuré et une tenue confortable."
    },
    {
      question: "Combien de séances faut-il prévoir ?",
      answer: "Le nombre de séances dépend de la prescription et de votre situation. Il vous est précisé après le bilan réalisé lors de la première séance."
    },
    {
      question: "Que faire en cas d'urgence ?",
      answer: "Le cabinet ne prend pas en charge les urgences. En cas de douleur intense et soudaine, de malaise, de difficulté à respirer ou d'accident, appelez le 141 (SAMU) ou le 15 (Protection civile)."
    }
  ],

  /* Only real figures from the Google Business profile. */
  google: {
    rating: null,
    reviewCount: null,
    reviewsLink: ""
  },

  seo: {
    title: "Wiam Kaabat, kinésithérapeute à Casablanca",
    description: "Cabinet de kinésithérapie Kaabat Wiam à Casablanca : rééducation orthopédique, post-opératoire, dos, sport. Séances sur rendez-vous.",
    keywords: ["kinésithérapeute Casablanca", "kiné Casablanca", "rééducation Casablanca", "Wiam Kaabat"]
  },

  legal: {
    disclaimer: "Ce site a une vocation uniquement informative et ne remplace pas une consultation médicale.",
    emergency: "En cas d'urgence, ne vous déplacez pas au cabinet : appelez le 141 (SAMU) ou le 15 (Protection civile)."
  }
};
