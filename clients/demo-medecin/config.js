/* ==========================================================================
   DEMO SITE: fictional practice for prospect presentations.
   Every name, phone number and address below is a placeholder. Nothing here
   describes a real doctor. Replace everything before publishing for a client.
   ========================================================================== */
window.SITE = {
  identity: {
    doctorName: "Dr Prénom Nom",
    title: "Médecin généraliste",
    cabinetName: "Cabinet Médical Démo",
    neighborhood: "Maârif",
    city: "Casablanca"
  },

  theme: {
    primaryColor: "#1E5A72",
    accentColor: "#3F7D68"
  },

  intro: "Consultations de médecine générale pour adultes et enfants, sur rendez-vous, dans le quartier du Maârif. Suivi au long cours et orientation vers un spécialiste lorsque la situation le nécessite.",

  consultations: [
    {
      title: "Médecine générale",
      description: "Consultation pour un symptôme récent, un examen clinique ou un renouvellement de traitement.",
      icon: "stethoscope"
    },
    {
      title: "Maladies chroniques",
      description: "Suivi régulier du diabète, de l'hypertension artérielle et des troubles du cholestérol.",
      icon: "heart-rate-monitor"
    },
    {
      title: "Enfants et adolescents",
      description: "Suivi de la croissance, examens systématiques et affections courantes de l'enfant.",
      icon: "baby-carriage"
    },
    {
      title: "Vaccination",
      description: "Vaccins de l'enfant et de l'adulte, mise à jour du carnet et conseils avant un voyage.",
      icon: "vaccine"
    },
    {
      title: "Certificats médicaux",
      description: "Aptitude à la pratique sportive, certificats scolaires et administratifs après examen.",
      icon: "file-certificate"
    },
    {
      title: "Prévention et bilans",
      description: "Bilan de santé, dépistage et interprétation des résultats d'analyses.",
      icon: "clipboard-heart"
    }
  ],

  doctor: {
    photo: "images/medecin.jpg",
    bio: [
      "Le Dr Prénom Nom exerce la médecine générale au cabinet du Maârif et reçoit adultes, enfants et personnes âgées.",
      "La consultation laisse le temps de l'écoute, de l'examen clinique et de l'explication du traitement. Le suivi se fait dans la durée, en lien avec les spécialistes et les laboratoires lorsque c'est utile."
    ],
    qualifications: [
      { year: "Formation", title: "Doctorat en médecine", place: "Faculté de médecine (à compléter)" },
      { year: "Spécialisation", title: "Diplôme de médecine générale", place: "Établissement (à compléter)" },
      { year: "Formation complémentaire", title: "Diplôme universitaire (exemple : diabétologie)", place: "Établissement (à compléter)" },
      { year: "Exercice", title: "Installation en cabinet libéral", place: "Maârif, Casablanca" }
    ],
    languages: ["Arabe", "Darija", "Français", "Anglais"],
    yearsOfExperience: 12
  },

  cabinet: {
    photos: [
      { src: "images/cabinet-1.jpg", alt: "Salle d'attente du cabinet" },
      { src: "images/cabinet-2.jpg", alt: "Salle de consultation" },
      { src: "images/cabinet-3.jpg", alt: "Accueil du cabinet" }
    ],
    equipment: [
      "Électrocardiogramme (ECG)",
      "Mesure de la glycémie capillaire",
      "Nébuliseur pour aérosols",
      "Salle de soins pour pansements et injections",
      "Salle d'attente climatisée",
      "Accès par ascenseur"
    ]
  },

  practical: {
    hours: {
      lundi: "09:00-13:00, 15:00-19:00",
      mardi: "09:00-13:00, 15:00-19:00",
      mercredi: "09:00-13:00, 15:00-19:00",
      jeudi: "09:00-13:00, 15:00-19:00",
      vendredi: "09:00-12:30, 15:00-19:00",
      samedi: "09:00-13:00",
      dimanche: ""
    },
    address: "Adresse de démonstration, 2e étage, Maârif, Casablanca",
    mapsEmbedUrl: "https://www.google.com/maps?q=Maarif%2C%20Casablanca&z=15&output=embed",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Maarif%2C%20Casablanca",
    access: "Cabinet au 2e étage, immeuble avec ascenseur. Station de taxis à proximité.",
    parking: "Stationnement payant dans les rues voisines.",
    homeVisits: "Possibles dans le quartier pour les patients suivis au cabinet, sur demande et selon disponibilité."
  },

  booking: {
    phone: "+212 5 22 00 00 00",
    whatsapp: "212600000000",
    whatsappDisplay: "+212 6 00 00 00 00",
    whatsappMessage: "Bonjour, je souhaite prendre rendez-vous au Cabinet Médical Démo.",
    externalBookingUrl: ""
  },

  insurance: [
    "AMO (CNSS)",
    "CNOPS",
    "Mutuelles",
    "Assurances privées"
  ],

  faq: [
    {
      question: "Comment prendre rendez-vous ?",
      answer: "Par téléphone aux heures d'ouverture, ou par WhatsApp à tout moment. Le secrétariat confirme le créneau dès que possible."
    },
    {
      question: "Combien de temps dure une consultation ?",
      answer: "Prévoyez environ 20 à 30 minutes. Une première consultation ou un bilan peut demander un peu plus de temps."
    },
    {
      question: "Que faut-il apporter ?",
      answer: "Votre carte d'identité, votre carte d'assuré (AMO, CNOPS ou mutuelle), vos ordonnances en cours et vos derniers résultats d'analyses ou d'imagerie."
    },
    {
      question: "Le cabinet accepte-t-il mon assurance ?",
      answer: "Le cabinet remplit la feuille de soins pour l'AMO, la CNOPS et les assurances privées. Le remboursement est ensuite traité directement par votre organisme."
    },
    {
      question: "Que faire en cas d'urgence ?",
      answer: "Le cabinet ne prend pas en charge les urgences vitales. En cas de douleur thoracique, de difficulté à respirer, de malaise ou d'accident, appelez immédiatement le 141 (SAMU) ou le 15 (Protection civile)."
    }
  ],

  /* Demo: left empty on purpose. Only real figures from the doctor's Google
     Business profile go here; the hero fact appears once a rating is set. */
  google: {
    rating: null,
    reviewCount: null,
    reviewsLink: ""
  },

  seo: {
    title: "Dr Prénom Nom, médecin généraliste au Maârif, Casablanca",
    description: "Cabinet de médecine générale au Maârif, Casablanca. Consultations sur rendez-vous pour adultes et enfants, horaires, accès et prise de rendez-vous.",
    keywords: ["médecin généraliste Casablanca", "médecin Maârif", "cabinet médical Casablanca", "médecin de famille"]
  },

  legal: {
    disclaimer: "Ce site a une vocation uniquement informative et ne remplace pas une consultation médicale.",
    emergency: "En cas d'urgence, ne vous déplacez pas au cabinet : appelez le 141 (SAMU) ou le 15 (Protection civile)."
  }
};
