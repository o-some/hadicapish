export const siteConfig = Object.freeze({
  brand: {
    name: "Vectora Academic",
    founder: "Hadi Capish",
    claim: "Master the concepts. Shape your future.",
    service: "International Mathematics & Physics Tutoring"
  },
  contact: {
    domain: "[DOMAIN WIRD NACHGEREICHT]",
    email: "hello@[domain].com",
    phone: "+49 6204 000000",
    address: "[VOLLSTÄNDIGE ANSCHRIFT WIRD NACHGEREICHT]",
    city: "Viernheim, Germany"
  },
  booking: {
    sourceTimeZone: "Europe/Berlin",
    earliestHour: 17,
    activeStudents: 0,
    capacity: 10,
    availability: [],
    videoProvider: "Google Meet",
    apiBaseUrl: ""
  },
  pricing: {
    vatRate: 0.19,
    currency: "EUR",
    offers: [
      { id: "consultation", name: "Free Consultation", minutes: 20, lessons: 1, price: 0, type: "consultation" },
      { id: "single", name: "Single Lesson", minutes: 60, lessons: 1, price: 100, type: "flexible" },
      { id: "five", name: "Five-Lesson Package", minutes: 60, lessons: 5, price: 475, type: "flexible" },
      { id: "ten", name: "Ten-Lesson Package", minutes: 60, lessons: 10, price: 900, type: "flexible" },
      { id: "exam", name: "Exam Preparation Package", minutes: 60, lessons: 6, price: 540, type: "flexible" },
      { id: "ia", name: "Physics IA Mentoring", minutes: 60, lessons: 4, price: 380, type: "flexible" },
      { id: "essential", name: "Essential", minutes: 60, lessons: 2, price: 190, type: "subscription" },
      { id: "progress", name: "Progress", minutes: 60, lessons: 4, price: 360, type: "subscription", popular: true },
      { id: "intensive", name: "Intensive", minutes: 60, lessons: 8, price: 680, type: "subscription" }
    ]
  },
  release: {
    previewMode: true,
    portraitsApproved: false,
    qualificationsApproved: false,
    legalApproved: false,
    courseScopeApproved: false,
    taxTreatmentApproved: false,
    paymentsConfigured: false,
    calendarConfigured: false,
    emailConfigured: false
  }
});

export const formatMoney = value => new Intl.NumberFormat("en-GB", {
  style: "currency", currency: siteConfig.pricing.currency, maximumFractionDigits: 0
}).format(value);

export const getOffer = id => siteConfig.pricing.offers.find(offer => offer.id === id);
