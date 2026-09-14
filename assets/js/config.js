export const siteConfig = Object.freeze({
  brand: {
    name: "Vectora Academic",
    founder: "Hadi Capish",
    claim: "Master the concepts. Shape your future.",
    service: "International Mathematics & Physics Tutoring",
  },
  contact: {
    domain: "https://o-some.github.io/hadicapish/",
    email: "",
    phone: "",
    address: "",
    city: "Viernheim, Germany",
  },
  booking: {
    sourceTimeZone: "Europe/Berlin",
    earliestHour: 17,
    activeStudents: 0,
    capacity: 10,
    availability: [],
    videoProvider: "Google Meet",
    apiBaseUrl: "",
  },
  pricing: {
    vatRate: 0.19,
    currency: "EUR",
    offers: [
      {
        id: "consultation",
        name: "Free Consultation",
        minutes: 20,
        lessons: 1,
        price: 0,
        type: "consultation",
      },
      {
        id: "single",
        name: "Single Lesson",
        minutes: 60,
        lessons: 1,
        price: 100,
        type: "flexible",
        label: "Flexible start",
        summary:
          "Ideal for a first focused topic, an urgent question or trying the teaching approach without a longer commitment.",
      },
      {
        id: "five",
        name: "Five-Lesson Package",
        minutes: 60,
        lessons: 5,
        price: 475,
        type: "flexible",
        label: "Focused progress",
        summary:
          "Five lessons for a defined goal, knowledge gap or upcoming assessment — scheduled around the student.",
      },
      {
        id: "ten",
        name: "Ten-Lesson Package",
        minutes: 60,
        lessons: 10,
        price: 900,
        type: "flexible",
        label: "Best package value",
        summary:
          "A longer learning runway for rebuilding foundations, developing confidence and preparing consistently.",
      },
      {
        id: "exam",
        name: "Exam Preparation Package",
        minutes: 60,
        lessons: 6,
        price: 540,
        type: "flexible",
        label: "Exam focus",
        summary:
          "A structured six-lesson route from diagnostic review to timed practice and final preparation.",
      },
      {
        id: "ia",
        name: "Physics IA Mentoring",
        minutes: 60,
        lessons: 4,
        price: 380,
        type: "flexible",
        label: "Integrity-first guidance",
        summary:
          "Ethical subject guidance for planning, analysis and argumentation without completing assessed work.",
      },
      {
        id: "essential",
        name: "Essential",
        minutes: 60,
        lessons: 2,
        price: 190,
        type: "subscription",
        label: "Light continuity",
        summary:
          "Two focused lessons per month for students who need steady guidance alongside school.",
      },
      {
        id: "progress",
        name: "Progress",
        minutes: 60,
        lessons: 4,
        price: 360,
        type: "subscription",
        label: "Weekly rhythm",
        summary:
          "A weekly learning rhythm for consistent understanding, practice and course correction.",
        popular: true,
      },
      {
        id: "intensive",
        name: "Intensive",
        minutes: 60,
        lessons: 8,
        price: 680,
        type: "subscription",
        label: "High support",
        summary:
          "Twice-weekly support for demanding phases, major gaps or concentrated examination preparation.",
      },
    ],
  },
  release: {
    previewMode: false,
    launchMode: "early-access",
    portraitsApproved: false,
    qualificationsApproved: false,
    legalApproved: false,
    courseScopeApproved: false,
    taxTreatmentApproved: false,
    paymentsConfigured: false,
    calendarConfigured: false,
    emailConfigured: false,
  },
});

export const formatMoney = (value, locale = "en") =>
  new Intl.NumberFormat(
    locale === "de" ? "de-DE" : locale === "es" ? "es-ES" : "en-GB",
    {
    style: "currency",
    currency: siteConfig.pricing.currency,
    maximumFractionDigits: 0,
    },
  ).format(value);

export const getOffer = (id) =>
  siteConfig.pricing.offers.find((offer) => offer.id === id);
