export const partners = [
  {
    name: "FINN",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Finn.no_logo.svg/2560px-Finn.no_logo.svg.png",
  },
  {
    name: "NAF",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/NAF-logo.png",
  },
  {
    name: "Viking",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Viking_logo.png",
  },
];

export const steps = [
  {
    id: 1,
    icon: "FileText",
    titleKey: "process.step1.title",
    descKey: "process.step1.desc",
  },
  {
    id: 2,
    icon: "Car",
    titleKey: "process.step2.title",
    descKey: "process.step2.desc",
  },
  {
    id: 3,
    icon: "BadgeCheck",
    titleKey: "process.step3.title",
    descKey: "process.step3.desc",
  },
];

export const advantages = [
  { id: 1, icon: "DollarSign", titleKey: "advantages.free.title", descKey: "advantages.free.desc" },
  { id: 2, icon: "ShieldCheck", titleKey: "advantages.noLiability.title", descKey: "advantages.noLiability.desc" },
  { id: 3, icon: "Handshake", titleKey: "advantages.noCommitment.title", descKey: "advantages.noCommitment.desc" },
  { id: 4, icon: "Timer", titleKey: "advantages.fast.title", descKey: "advantages.fast.desc" },
  { id: 5, icon: "Star", titleKey: "advantages.soldCount.title", descKey: "advantages.soldCount.desc" },
  { id: 6, icon: "MapPin", titleKey: "advantages.nationwide.title", descKey: "advantages.nationwide.desc" },
];

export const faqs = [
  { id: 1, qKey: "faq.q1.q", aKey: "faq.q1.a" },
  { id: 2, qKey: "faq.q2.q", aKey: "faq.q2.a" },
  { id: 3, qKey: "faq.q3.q", aKey: "faq.q3.a" },
  { id: 4, qKey: "faq.q4.q", aKey: "faq.q4.a" },
  { id: 5, qKey: "faq.q5.q", aKey: "faq.q5.a" },
  { id: 6, qKey: "faq.q6.q", aKey: "faq.q6.a" },
];

export const legalLinks = [
  { to: "/legal/terms", labelKey: "footer.links.terms" },
  { to: "/legal/privacy", labelKey: "footer.links.privacy" },
  { to: "/legal/cookies", labelKey: "footer.links.cookies" },
  { to: "/open-book", labelKey: "footer.links.openbook" },
];

export const quickLinks = [
  { to: "/tips", labelKey: "footer.links.tips" },
  { to: "/faq", labelKey: "footer.links.faq" },
  { to: "/about", labelKey: "footer.links.about" },
  { to: "/dealers", labelKey: "footer.links.dealers" },
  ...legalLinks,
];

export const contactInfo = {
  phone: "+354 471 0000",
  email: "kontakt@nettbil.is",
  chatUrl: "#chat",
  facebook: "https://facebook.com",
};

export const carIllustration =
  "https://images.unsplash.com/photo-1606661425321-1d1ec87c7cf5?q=80&amp;w=1200&amp;auto=format&amp;fit=crop";

// LocalStorage keys
export const STORAGE_KEYS = {
  language: "nb_clone_lang",
  submissions: "nb_clone_submissions",
};