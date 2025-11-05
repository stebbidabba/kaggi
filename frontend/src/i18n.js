import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEYS } from "./mock";

const translations = {
  is: {
    common: {
      brand: "nettbil",
      start: "Kom í gang",
      regno: "Bílnúmer",
      mileage: "Kílómetrastand",
      inPartnership: "Í samstarfi við",
      nav: { sell: "Selja bílinn", business: "Fyrirtæki", dealers: "Forhandlar", faq: "Spurt og svarað", about: "Um okkur", contact: "Hafðu samband" },
      lang: { is: "IS", en: "EN" },
      ctaSell: "Byrja að selja bílinn",
      heroTitle: "Einfaldasta leiðin til að selja bílinn",
      heroSub: "Yfir 2.000 bílasalar keppa um að bjóða þér besta verðið. Selt hratt, öruggt og einfalt.",
      stats: "Hingað til hafa yfir 80.000 selt með Nettbil",
      processTitle: "Seldu bílinn á 1-2-3",
      advantagesTitle: "Tryggt og einfalt",
      faqTitle: "Við hjálpum þér alla leið",
      seeMore: "Sjá fleiri spurningar",
      received: "Við höfum móttekið bílinn – boð verða birt innan skamms.",
      formTitle: "Komdu í gang með einfalt bílasöluferli",
      footer: {
        shortcuts: "Snarveier",
        contact: "Hafðu samband",
        rights: "© 2025",
        links: {
          tips: "Bíltips",
          faq: "Spurt og svarað",
          about: "Um Nettbil",
          dealers: "Fyrir bílasala",
          terms: "Skilmálar",
          privacy: "Persónuvernd",
          cookies: "Vafrakökur",
          openbook: "Opin bókhald",
        },
      },
    },
    process: {
      step1: { title: "Segðu okkur frá bílnum", desc: "Fylltu út grunnupplýsingar um bílinn." },
      step2: { title: "Skila bílnum", desc: "Við tökum myndir og setjum hann í uppboð." },
      step3: { title: "Samþykktu hæsta boð", desc: "Fáðu greitt fljótt." },
    },
    advantages: {
      free: { title: "Kostnaðarlaust", desc: "Enginn kostnaður fyrir söluaðila." },
      noLiability: { title: "Engin ábyrgðaráhætta", desc: "Við tökum yfir ábyrgð eftir sölu." },
      noCommitment: { title: "Engin skuldbinding", desc: "Þú ræður hvort þú samþykkir boð." },
      fast: { title: "Selt hratt", desc: "Oft innan 1 dags ef boð er samþykkt." },
      soldCount: { title: "Yfir 80.000 seldir bílar", desc: "Reynsla og traust síðan 2017." },
      nationwide: { title: "Þjónusta um allt land", desc: "Við dekka allt landið." },
    },
    faq: {
      q1: { q: "Hvaða verð get ég búist við?", a: "Við sýnum væntanlegt verðbil byggt á gögnum og boðum frá söluaðilum." },
      q2: { q: "Er þjónustan ókeypis?", a: "Já, þú borgar ekkert nema þú samþykkir sölu." },
      q3: { q: "Get ég notað skoðunarskýrslu ef ég sel ekki?", a: "Já, þú átt skýrsluna og getur notað hana áfram." },
      q4: { q: "Fæ ég betra verð með innbyrðis skipti?", a: "Stundum – en hjá okkur keppa margir söluaðilar sem getur hækkað verðið." },
      q5: { q: "Get ég skilað bílnum á skoðunarstöð?", a: "Já, þú getur valið hentugan afhendingarstað." },
      q6: { q: "Hvað gerist með samninga eftir sölu?", a: "Við sjáum um alla pappíra og greiðslur." },
    },
  },
  en: {
    common: {
      brand: "nettbil",
      start: "Get started",
      regno: "License plate",
      mileage: "Mileage",
      inPartnership: "In partnership with",
      nav: { sell: "Sell your car", business: "Business", dealers: "Dealers", faq: "FAQ", about: "About", contact: "Contact" },
      lang: { is: "IS", en: "EN" },
      ctaSell: "Start selling your car",
      heroTitle: "The easiest way to sell your car",
      heroSub: "Over 2,000 dealers compete to give you the best price. Fast, safe and simple.",
      stats: "So far over 80,000 cars sold with Nettbil",
      processTitle: "Sell your car in 1-2-3",
      advantagesTitle: "Safe and simple",
      faqTitle: "We help you all the way",
      seeMore: "See more questions",
      received: "We have received your car – bids will appear shortly.",
      formTitle: "Get started with an easy car sale",
      footer: {
        shortcuts: "Shortcuts",
        contact: "Contact",
        rights: "© 2025",
        links: {
          tips: "Car tips",
          faq: "FAQ",
          about: "About Nettbil",
          dealers: "For dealers",
          terms: "Terms",
          privacy: "Privacy",
          cookies: "Cookies",
          openbook: "Open book",
        },
      },
    },
    process: {
      step1: { title: "Tell us about your car", desc: "Fill out the basic details." },
      step2: { title: "Deliver the car", desc: "We take photos and list it for auction." },
      step3: { title: "Accept the highest bid", desc: "Get paid quickly." },
    },
    advantages: {
      free: { title: "Free of charge", desc: "No cost for the seller." },
      noLiability: { title: "No liability risk", desc: "We take the responsibility after the sale." },
      noCommitment: { title: "No commitment", desc: "You decide whether to accept a bid." },
      fast: { title: "Sold fast", desc: "Often within 1 day if you accept a bid." },
      soldCount: { title: "Over 80,000 cars sold", desc: "Experience and trust since 2017." },
      nationwide: { title: "Nationwide service", desc: "We cover the whole country." },
    },
    faq: {
      q1: { q: "What price can I expect?", a: "We show an estimated range based on data and dealer bids." },
      q2: { q: "Is the service free?", a: "Yes, you pay nothing unless you sell." },
      q3: { q: "Can I use the inspection report if I don't sell?", a: "Yes, the report is yours to keep and use." },
      q4: { q: "Do I get a better price with trade-in?", a: "Sometimes – but many dealers compete here which can drive the price up." },
      q5: { q: "Can I deliver the car at an inspection station?", a: "Yes, choose a convenient drop-off location." },
      q6: { q: "What about contracts after the sale?", a: "We handle all paperwork and payments." },
    },
  },
};

const I18nContext = createContext({ lang: "is", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(STORAGE_KEYS.language) || "is");

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEYS.language, l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.is;
    return (key) => key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), dict) || key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}