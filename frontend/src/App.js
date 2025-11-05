import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { I18nProvider, useI18n } from "./i18n";
import { partners, steps, advantages, faqs, quickLinks, contactInfo, STORAGE_KEYS, carIllustration } from "./mock";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Separator } from "./components/ui/separator";
import { Car, FileText, BadgeCheck, ShieldCheck, DollarSign, Handshake, Timer, MapPin, Star, Globe, Phone, Mail } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

function BrandLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="w-8 h-8 rounded-full bg-emerald-700" />
      <span className="font-extrabold text-xl tracking-tight">nettbil</span>
    </Link>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 px-3">{t("common.lang." + lang)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLang("is")}>IS</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("en")}>EN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const { t } = useI18n();
  const items = [
    { to: "/sell", label: t("common.nav.sell") },
    { to: "/business", label: t("common.nav.business") },
    { to: "/dealers", label: t("common.nav.dealers") },
    { to: "/faq", label: t("common.nav.faq") },
    { to: "/about", label: t("common.nav.about") },
    { to: "/contact", label: t("common.nav.contact") },
  ];
  return (
    <header className="sticky top-0 z-40 w-full border-b" style={{background: "var(--header-bg)"}}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-8">
          <BrandLogo />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            {items.map((it) => (
              <Link key={it.to} to={it.to} className="hover:text-black transition-colors">{it.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${contactInfo.phone}`} className="hidden sm:flex items-center gap-1 text-sm text-slate-700"><Phone size={16} /> {contactInfo.phone}</a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#fff1e6] border-t mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 py-12">
        <div className="flex flex-col gap-2">
          <BrandLogo />
          <p className="text-sm text-slate-600">Nettbil AS {t("common.footer.rights")}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("common.footer.shortcuts")}</h4>
          <ul className="space-y-2">
            {quickLinks.map((l) => (
              <li key={l.to}><Link className="text-slate-700 hover:text-black" to={l.to}>{t(l.labelKey)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t("common.footer.contact")}</h4>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-center gap-2"><Phone size={16} /> {contactInfo.phone}</li>
            <li className="flex items-center gap-2"><Mail size={16} /> <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a></li>
            <li><a className="underline" href={contactInfo.chatUrl}>Chat</a></li>
            <li><a className="underline" href={contactInfo.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function HeroForm({ compact = false }) {
  const { t } = useI18n();
  const [reg, setReg] = useState("");
  const [km, setKm] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!reg || !km) return alert("Please fill both fields");
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
    prev.push({ reg, km, ts: Date.now() });
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(prev));
    navigate("/confirm");
  };

  return (
    <form onSubmit={submit} className={`w-full ${compact ? "" : "max-w-2xl"} mx-auto flex flex-col gap-3`}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Input data-testid="reg-input" value={reg} onChange={(e) => setReg(e.target.value)} placeholder={t("common.regno")} className="h-12 rounded-full px-5" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">IS</span>
        </div>
        <Input data-testid="km-input" value={km} onChange={(e) => setKm(e.target.value)} placeholder={t("common.mileage")} className="h-12 rounded-full px-5" />
      </div>
      <Button type="submit" data-testid="submit-btn" className="h-12 rounded-full btn-orange text-base font-semibold">{t("common.start")}</Button>
    </form>
  );
}

function PartnersBar() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <p className="text-sm text-slate-600">{t("common.inPartnership")}</p>
      <div className="flex items-center gap-6 opacity-80">
        {partners.map((p) => (
          <img key={p.name} src={p.logo} alt={p.name} className="h-6 object-contain" />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { t } = useI18n();

  useEffect(() => {
    // Ping backend hello (mock - safe, uses env URL)
    const hello = async () => {
      try {
        const res = await axios.get(`${API}/`);
        console.log(res.data.message);
      } catch (e) {
        console.log("Backend not reachable yet", e?.message);
      }
    };
    hello();
  }, []);

  const iconMap = { Car, FileText, BadgeCheck, ShieldCheck, DollarSign, Handshake, Timer, MapPin, Star };

  return (
    <main>
      {/* Hero */}
      <section className="bg-[var(--hero-bg)] border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 py-14">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-emerald-900 leading-tight">
              {t("common.heroTitle")}
            </h1>
            <p className="mt-3 text-slate-700 text-lg">{t("common.heroSub")}</p>
            <div className="mt-6">
              <HeroForm />
            </div>
            <PartnersBar />
          </div>
          <div className="relative">
            <img src={carIllustration} alt="car" className="w-full rounded-3xl shadow-soft" />
            <div className="absolute bottom-6 right-6 bg-emerald-900 text-white rounded-full px-4 py-2 text-sm shadow-lg flex items-center gap-2"><Globe size={16}/> Kr 2.68m</div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-4"><span className="bg-orange-100 text-orange-700 text-xs font-bold badge-pill px-2 py-1">1-2-3</span></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("common.processTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => {
            const Icon = iconMap[s.icon] || Car;
            return (
              <Card key={s.id} className="rounded-3xl">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2"><Icon /></div>
                  <CardTitle className="text-lg">{t(s.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{t(s.descKey)}</CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("common.advantagesTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a) => {
            const Icon = iconMap[a.icon] || ShieldCheck;
            return (
              <Card key={a.id} className="rounded-3xl">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2"><Icon /></div>
                  <CardTitle className="text-lg">{t(a.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{t(a.descKey)}</CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t("common.faqTitle")}</h2>
        <Accordion type="single" collapsible className="bg-white rounded-2xl border">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={`item-${f.id}`}>
              <AccordionTrigger className="px-6">{t(f.qKey)}</AccordionTrigger>
              <AccordionContent className="px-6 text-slate-600">{t(f.aKey)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-4">
          <Link className="underline" to="/faq">{t("common.seeMore")}</Link>
        </div>
      </section>

      {/* Bottom hero repeat */}
      <section className="bg-[var(--hero-bg)] border-t">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h3 className="text-2xl font-bold mb-2">{t("common.formTitle")}</h3>
          <HeroForm compact />
        </div>
      </section>
    </main>
  );
}

function FAQPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{t("common.nav.faq")}</h1>
      <Accordion type="single" collapsible className="bg-white rounded-2xl border">
        {faqs.map((f) => (
          <AccordionItem key={f.id} value={`faq-${f.id}`}>
            <AccordionTrigger className="px-6">{t(f.qKey)}</AccordionTrigger>
            <AccordionContent className="px-6 text-slate-600">{t(f.aKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function DealersPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t("common.nav.dealers")}</h1>
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <p className="text-slate-600">Portal for dealers. Login will be implemented later.</p>
          <Button className="btn-orange rounded-full">Login</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AboutPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t("common.nav.about")}</h1>
      <p className="text-slate-700">We are building a safe and simple way to sell cars online. This page is a placeholder clone of nettbil's About.</p>
    </div>
  );
}

function ContactPage() {
  const { t } = useI18n();
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{t("common.nav.contact")}</h1>
      <div className="space-y-2">
        <p className="flex items-center gap-2"><Phone size={18}/> {contactInfo.phone}</p>
        <p className="flex items-center gap-2"><Mail size={18}/> <a className="underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
        <Button asChild className="btn-orange rounded-full"><a href="#chat">Open chat</a></Button>
      </div>
    </div>
  );
}

function LegalPage() {
  const { t } = useI18n();
  const location = useLocation();
  const tab = location.pathname.split("/").pop();
  const value = ["terms","privacy","cookies"].includes(tab) ? tab : "terms";
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Legal</h1>
      <Tabs value={value} className="w-full">
        <TabsList>
          <TabsTrigger value="terms">{t("common.footer.links.terms")}</TabsTrigger>
          <TabsTrigger value="privacy">{t("common.footer.links.privacy")}</TabsTrigger>
          <TabsTrigger value="cookies">{t("common.footer.links.cookies")}</TabsTrigger>
        </TabsList>
        <TabsContent value="terms"><p className="text-slate-700 leading-7">Placeholder terms. This clone is for demo purposes and uses mocked data.</p></TabsContent>
        <TabsContent value="privacy"><p className="text-slate-700 leading-7">Placeholder privacy policy. No personal data is stored server-side in this mock.</p></TabsContent>
        <TabsContent value="cookies"><p className="text-slate-700 leading-7">Placeholder cookie policy. Only localStorage is used for language and submissions.</p></TabsContent>
      </Tabs>
    </div>
  );
}

function SellPage() {
  const { t } = useI18n();
  return (
    <div className="bg-[var(--hero-bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">{t("common.formTitle")}</h1>
        <p className="text-slate-700 mb-6">{t("common.heroSub")}</p>
        <HeroForm />
      </div>
    </div>
  );
}

function ConfirmPage() {
  const { t } = useI18n();
  const latest = useMemo(() => {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
    return arr[arr.length - 1];
  }, []);
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mb-4"><BadgeCheck size={28}/></div>
      <h1 className="text-3xl font-bold mb-2">{t("common.start")}</h1>
      <p className="text-slate-700">{t("common.received")}</p>
      {latest && <p className="mt-2 text-sm text-slate-500">{latest.reg} • {latest.km} km</p>}
      <div className="mt-6">
        <Link to="/"><Button variant="outline" className="rounded-full">Home</Button></Link>
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sell" element={<SellPage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/dealers" element={<DealersPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/legal/:slug" element={<LegalPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <I18nProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </I18nProvider>
    </div>
  );
}

export default App;