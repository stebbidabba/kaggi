"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "../i18n";
import { contactInfo } from "../mock";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui";

function BrandLogo() {
  return (
    <Link href="/" className="flex items-center hover:text-inherit -mt-4">
      <img src="/kaggi-logo.png" alt="Kaggi" className="w-32 h-32 object-contain" />
    </Link>
  );
}

function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 px-3 rounded-full text-sm font-normal">{lang.toUpperCase()}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 bg-[var(--header-bg)] border border-transparent rounded-md shadow-sm">
        <DropdownMenuItem onClick={() => setLang("is")} className="text-sm font-normal hover:text-[#ff833e]">IS</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLang("en")} className="text-sm font-normal hover:text-[#ff833e]">EN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  
  const centerNav = [
    { href: "/", label: t("common.nav.sell"), highlight: pathname === "/" },
    { href: "/company", label: t("common.nav.company"), highlight: pathname === "/company" },
    { href: "/dealers", label: t("common.nav.dealers"), highlight: pathname === "/dealers" },
  ];
  const rightNav = [
    { href: "/my-page", label: t("common.nav.myPage") },
    { href: "/dealer-login", label: t("common.nav.dealerPortal") },
  ];
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "var(--header-bg)", fontWeight: 500, borderBottom: 0 }}>
      <div className="max-w-[1320px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-8 py-0 px-2 pr-0" style={{minHeight: '85px', height: '85px', overflow: 'visible'}}>
        {/* Left: Logo */}
        <div className="flex items-center -ml-4">
          <BrandLogo />
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center justify-center gap-12 text-[17px] font-medium -mt-1">
          {centerNav.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`${it.highlight ? "text-[#ff7a28]" : "text-[#044046]"} hover:text-[#ff833e] transition-colors`}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Right: Phone + links + lang */}
        <div className="hidden md:flex items-center justify-end gap-4 font-medium -mt-1">
          <div className="mr-4 hover:text-[#ff833e] transition-colors"><LanguageSwitcher /></div>
          <div className="relative group flex items-center">
            <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 text-[#044046]">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="shrink-0" fill="#ff7a28">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.15.38 2.39.59 3.54.59.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.39.59 3.54.17.35.1.77-.23 1.05l-2.24 2.2z"></path>
              </svg>
              <span className="text-[17px] font-medium">{contactInfo.phone.replace('+', '')}</span>
            </a>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 px-6 py-4 bg-white text-gray-700 text-center rounded-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xl border border-gray-100" style={{minWidth: '200px'}}>
              <div className="text-sm font-medium leading-relaxed">
                {t("common.phoneTooltip")}
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white" style={{filter: 'drop-shadow(0 -1px 1px rgba(0,0,0,0.1)'}}></div>
            </div>
          </div>
          {rightNav.map((it, idx) => (
            <Link
              key={it.href}
              href={it.href}
              className={`text-[#044046] hover:text-[#ff833e] text-[17px] ${idx === 0 ? 'ml-3 mr-1' : 'ml-1'}`}
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  const { quickLinks } = require("../mock");
  return (
    <footer className="bg-[var(--hero-bg)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-10 pb-32">
        <div className="flex flex-col ml-16 -mt-8">
          <h4 className="font-semibold mb-0 text-[#044046] text-3xl">
            <Link href="/" className="flex items-center hover:text-inherit -mt-4">
              <img src="/kaggi-logo.png" alt="Kaggi" className="w-40 h-40 object-contain" />
            </Link>
          </h4>
          <p className="text-base text-slate-600 -mt-7">© 2025 Kaggi</p>
        </div>
        <div className="ml-8">
          <h4 className="font-semibold mb-8 text-[#044046] text-3xl mt-4">{t("common.footer.shortcuts")}</h4>
          <ul className="text-lg">
            {quickLinks.map((l, index) => (
              <li key={l.to} className={index === 0 ? "" : index === 3 ? "mt-12" : "mt-6"}><Link className="text-slate-700 hover:text-[#044046] hover:underline" href={l.to}>{t(l.labelKey)}</Link></li>
            ))}
          </ul>
        </div>
        <div className="-ml-10">
          <h4 className="font-semibold mb-8 text-[#044046] text-3xl mt-4">{t("common.footer.contact")}</h4>
          <ul className="text-lg text-slate-700">
            <li><a className="hover:text-[#044046] hover:underline" href="/contact">{t("common.footer.contactUs")}</a></li>
            <li className="mt-6"><a className="hover:text-[#044046] hover:underline" href={contactInfo.chatUrl}>{t("common.footer.chat")}</a></li>

            <li className="mt-12"><a className="hover:text-[#044046] hover:underline underline" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
            <li className="mt-6"><a className="hover:text-[#044046] hover:underline" href={`tel:${contactInfo.phone}`}>{contactInfo.phone.replace('+', '')}</a></li>
            <li className="mt-6">
              <p className="text-lg text-slate-700">{t("common.footer.openingHours")}</p>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default function ClientLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col App">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

