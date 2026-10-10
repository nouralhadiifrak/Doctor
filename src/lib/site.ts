// Practice details shown across the site. Edit here to update every page.

export const site = {
  name: "Dr Hicham Ben Elghali",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phones: {
    office: { display: "05 20 11 06 20", tel: "+212520110620" },
    mobile: { display: "06 63 45 60 22", tel: "+212663456022" },
  },
  address: {
    line1: "Bureau n°2, Rez-de-chaussée",
    line2: "Andalous Prestige – Crystal Offices 3",
    city: "Bouskoura",
    country: "MA",
  },
  mapsUrl:
    "https://www.google.com/maps/place/Dr.+Hicham+Ben+Elghali/data=!4m2!3m1!1s0x0:0xf003014219b9face",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Dr.+Hicham+Ben+Elghali,+Crystal+Offices+3,+Bouskoura&output=embed",
};

// Replace the placeholder files in /public/images with real photos
// (e.g. "/images/cabinet-1.jpg") and update the paths here.
export const gallery = [
  { src: "/images/doctor.svg", key: "doctor" },
  { src: "/images/cabinet-1.svg", key: "reception" },
  { src: "/images/cabinet-2.svg", key: "waiting" },
  { src: "/images/cabinet-3.svg", key: "office" },
  { src: "/images/cabinet-4.svg", key: "exam" },
  { src: "/images/cabinet-5.svg", key: "equipment" },
] as const;

export type GalleryKey = (typeof gallery)[number]["key"];

// Verbatim Google reviews (French originals).
export const reviews = [
  {
    author: "Soukaina Choukri",
    rating: 5,
    text: "Dr Hicham fait partie des médecins que je recommande les yeux fermés. Très à l’écoute, compétent et surtout humain. J’apprécie sa façon de prendre le temps d’expliquer les choses avec calme et bienveillance. Son attitude zen met tout de suite à l’aise pendant la consultation. Merci pour votre professionnalisme",
  },
  {
    author: "Ayoub Tayebi",
    rating: 5,
    text: "Un médecin généraliste comme on en rencontre rarement. Il prend le temps d'écouter, d'analyser les symptômes en profondeur et surtout d'expliquer à ses patients ce qu'ils ont, au lieu de simplement prescrire un traitement. Son approche est moderne, humaine et basée sur les dernières connaissances médicales. Son professionnalisme, sa rigueur et sa passion pour son métier inspirent un grand respect. Je le recommande sans hésitation.",
  },
  {
    author: "Ghazzar Hajar",
    rating: 5,
    text: "Très bon médecin, à la fois compétent, professionnel et humain. Il est vraiment à l'écoute de ses patients prend le temps de bien expliquer et de rassurer. On se sent en confiance dès la consultation. Je recommande vivement.",
  },
];
