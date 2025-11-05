"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useI18n } from "../i18n";
import { partners, steps, advantages, faqs, homeFaqs, STORAGE_KEYS, carIllustration, processIllustration } from "../mock";
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui";
import { Globe, Car, FileText, BadgeCheck, ShieldCheck, DollarSign, Handshake, Timer, MapPin, Star } from "lucide-react";

const API = "/api"; // ingress routes '/api' to backend

function HeroForm({ compact = false }) {
  const { t } = useI18n();
  const [reg, setReg] = useState("");
  const [km, setKm] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'error', 'not_found'

  const submit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!reg || !km) {
      alert("Please fill both fields");
      return;
    }

    setIsVerifying(true);
    setVerificationMessage(t("common.verifyingVehicle"));
    setVerificationStatus(null);

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api-transform.preview.emergentagent.com';
      const response = await axios.post(`${BACKEND_URL}/api/vehicle/verify`, {
        plate: reg,
        mileage: parseInt(km)
      });

      const data = response.data;

      if (data.success) {
        setVerificationStatus('success');
        setVerificationMessage(t("common.vehicleFound"));
        
        // Store vehicle data and redirect after short delay
        const prev = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
        prev.push({ 
          reg, 
          km, 
          ts: Date.now(),
          vehicle: data.data, // Node.js backend puts vehicle data in data.data
          verified: true 
        });
        localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(prev));
        
        setTimeout(() => {
          window.location.href = "/confirm";
        }, 2000);
      } else {
        setVerificationStatus('error');
        if (data.error === 'not_found') {
          setVerificationMessage(t("common.vehicleNotFound"));
        } else {
          setVerificationMessage(data.message || t("common.apiUnavailable"));
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setVerificationStatus('error');
      setVerificationMessage(t("common.apiUnavailable"));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <form onSubmit={submit} className={`w-full ${compact ? "max-w-2xl" : "max-w-2xl"} mx-auto flex flex-col gap-3`}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative">
          <Input 
            data-testid="reg-input" 
            value={reg} 
            onChange={(e) => setReg(e.target.value.toUpperCase())} 
            placeholder={t("common.licensePlate")} 
            className="h-14 rounded-full pl-5 pr-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff833e] focus:border-[#ff833e] uppercase" 
            disabled={isVerifying}
            style={{ textTransform: 'uppercase' }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-9 h-12 select-none">
            <span className="w-5 h-3.5 overflow-hidden rounded-[2px]">
              <img src="https://customer-assets.emergentagent.com/job_nextbil/artifacts/8dcp2q5e_Your%20paragraph%20text%20(3000%20x%203000%20px)%20(Logo)%20(8).png" alt="Iceland flag" className="w-full h-full object-cover" />
            </span>
            <span className="text-[10px] font-semibold text-[#044046] leading-tight">IS</span>
          </div>
        </div>
        <Input 
          data-testid="km-input" 
          value={km} 
          onChange={(e) => {
            // Aðeins leyfa tölur
            const value = e.target.value.replace(/[^0-9]/g, '');
            setKm(value);
          }}
          placeholder={t("common.mileage")} 
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className="h-14 rounded-full px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff833e] focus:border-[#ff833e]" 
          disabled={isVerifying}
        />
      </div>
      
      {/* Verification status message */}
      {verificationMessage && (
        <div className={`text-center py-2 px-4 rounded-full text-sm font-medium ${
          verificationStatus === 'success' 
            ? 'bg-green-50 text-green-700' 
            : verificationStatus === 'error'
            ? 'bg-red-50 text-red-700'
            : 'bg-blue-50 text-blue-700'
        }`}>
          {isVerifying && (
            <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
          )}
          {verificationMessage}
        </div>
      )}

      <Button 
        type="submit" 
        data-testid="submit-btn" 
        className="h-12 rounded-full btn-orange text-base font-semibold w-full"
        disabled={isVerifying}
      >
        {isVerifying ? t("common.verifyingVehicle") : t("common.start")}
      </Button>
    </form>
  );
}

export default function Page() {
  const { t } = useI18n();
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    axios.get(`${API}/`).catch(() => {});
    setIsMounted(true);
    
    // Initialize Common Ninja chat widget
    const initCommonNinja = () => {
      if (typeof window !== 'undefined' && window.commonNinjaInit) {
        window.commonNinjaInit();
      } else if (typeof window !== 'undefined') {
        setTimeout(initCommonNinja, 1000);
      }
    };
    
    setTimeout(initCommonNinja, 2000);
  }, []);

  const iconMap = { Car, FileText, BadgeCheck, ShieldCheck, DollarSign, Handshake, Timer, MapPin, Star };

  return (
    <main>
      {/* Hero */}
      <section className="bg-[var(--hero-bg)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center pl-6 pr-4 md:pl-16 md:pr-6 lg:pl-28 xl:pl-36 2xl:pl-48 py-16">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#044046] leading-tight tracking-tight">
              {t("common.heroTitle")}
            </h1>
            <p className="mt-5 text-[#044046] text-opacity-80 text-lg md:text-xl max-w-2xl">{t("common.heroSub")}</p>
            <div className="mt-7 max-w-xl">
              <HeroForm />
            </div>
          </div>
          <div className="relative">
            <img 
              src={carIllustration} 
              alt="car" 
              className="w-full max-w-[260px] md:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px] object-contain mx-auto"
              style={{
                maskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at center, black 40%, transparent 80%)',
                filter: 'drop-shadow(0 0 20px rgba(255, 131, 62, 0.1))'
              }}
            />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-[#044046] text-center flex items-center justify-center gap-3 mt-3">
            {t("common.processTitle")}<span className="inline-flex items-center justify-center rounded-[12px] bg-[#ff7a28] text-white font-extrabold px-3 py-1 md:px-4 md:py-1.5 text-2xl md:text-3xl shadow-sm select-none tracking-tighter">1-2-3</span>
          </h2>
          <p className="mt-3 text-center text-[#044046] opacity-90 text-base md:text-lg">{t("common.processSubtitle")}</p>
        </div>
        <div className="w-full -mt-44 md:-mt-52">
          <div className="max-w-7xl mx-auto px-4 relative group">
            <img src={processIllustration} alt="process" className="w-full h-auto max-h-[860px] md:max-h-[1120px] object-contain" loading="eager" decoding="async" />
            <div className="absolute left-0 right-0 top-[24%] md:top-[30%] h-[150px] md:h-[180px] pointer-events-none">
              <div className="h-full w-full grid grid-cols-3 gap-6 px-4 place-items-center">
                <div className="flex flex-col items-center text-center px-6 md:px-8 pb-8 md:pb-10 mt-2 md:mt-4 transform translate-x-8 md:translate-x-14 translate-y-18 md:translate-y-24">
                  <div className="text-[#044046] font-bold text-xl md:text-2xl leading-snug text-center md:text-center mb-2 md:mb-3">{t("process.step1.title")}</div>
                  <div className="text-[#044046] opacity-90 text-sm md:text-base leading-relaxed max-w-[90%] text-center md:text-center">{t("process.step1.desc")}</div>
                </div>
                <div className="flex flex-col items-center text-center px-6 md:px-8 pb-8 md:pb-10 mt-2 md:mt-4 transform -translate-x-3 md:-translate-x-5 translate-y-18 md:translate-y-24">
                  <div className="text-[#044046] font-bold text-xl md:text-2xl leading-snug text-center mb-2 md:mb-3">{t("process.step2.title")}</div>
                  <div className="text-[#044046] opacity-90 text-sm md:text-base leading-relaxed max-w-[90%] text-center">{t("process.step2.desc")}</div>
                </div>
                <div className="flex flex-col items-center text-center px-6 md:px-8 pb-8 md:pb-10 mt-2 md:mt-4 transform -translate-x-[4.65rem] md:-translate-x-[6.15rem] translate-y-[4.3rem] md:translate-y-[5.3rem] align-top">
                  <div className="text-[#044046] font-bold text-xl md:text-2xl leading-snug text-center mb-2 md:mb-3 mt-5">{t("process.step3.title")}</div>
                  <div className="text-[#044046] opacity-90 text-sm md:text-base leading-relaxed max-w-[90%] text-center mt-3">{t("process.step3.desc")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary New Way Section */}
      <section className="max-w-7xl mx-auto px-4 py-1 -mt-96 mb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#044046] via-[#066771] to-[#088a9c] p-10 shadow-2xl max-w-5xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#ff833e] rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white rounded-full opacity-10"></div>
          
          <div className="relative z-10">
            {/* Main header with gradient text - smaller */}
            <h3 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-white to-[#ffd4a8] bg-clip-text text-transparent leading-tight">
              Nýstárleg leið til að selja bílinn þinn
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Checkmarks in a cool box */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ff833e] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg">Engin gjöld fyrir skráningu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ff833e] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg">Tilboð frá mörgum bílasölum</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#ff833e] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-white font-medium text-lg">Öruggt og einfalt ferli</span>
                  </div>
                </div>
              </div>
              
              {/* CTA with pulsing effect */}
              <div className="text-center md:text-left">
                <div className="inline-block">
                  <button className="group relative overflow-hidden bg-[#ff833e] hover:bg-[#e6732d] text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative">Seldu bílinn á 2 mínútum</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-4 py-2 -mt-8 ml-48 mr-48">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#044046]">{t("common.advantagesTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3">
          {advantages.map((a, index) => {
            const Icon = iconMap[a.icon] || ShieldCheck;
            const isBottomRow = index >= 3; // Bottom 3 cards
            const isFirstCard = index === 0; // Kostnaðarlaust card
            const isSecondCard = index === 1; //  card
            const isThirdCard = index === 2; // Engin skuldbinding card
            const isFourthCard = index === 3; // Selt hratt card
            const isFifthCard = index === 4; // Yfir 80.000 seldir bílar card
            const isSixthCard = index === 5; // Þjónusta um allt land card
            return (
              <Card key={a.id} className={`rounded-2xl max-w-xs ${isSecondCard ? '-ml-2' : ''} ${isThirdCard ? '-ml-4' : ''} ${isFourthCard ? 'mt-2' : ''} ${isFifthCard ? 'mt-1 -ml-2' : ''} ${isSixthCard ? 'mt-1 -ml-4' : ''}`}>
                <CardHeader className={`pb-5 px-4 ${isBottomRow ? 'pt-2' : 'pt-3'}`}>
                  {isFirstCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/mgen4mzf_Your%20paragraph%20text%20%282%29.png" alt="KR icon" className="w-12 h-12" />
                    </div>
                  ) : isSecondCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/pu22yp6j_Your%20paragraph%20text%20%283%29.png" alt="Shield icon" className="w-12 h-12" />
                    </div>
                  ) : isThirdCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/z7ghqk2t_Your%20paragraph%20text%20%284%29.png" alt="Smiley icon" className="w-12 h-12" />
                    </div>
                  ) : isFourthCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/kvnolzbz_Your%20paragraph%20text%20%285%29.png" alt="Clock icon" className="w-12 h-12" />
                    </div>
                  ) : isFifthCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/95i9rh0r_Your%20paragraph%20text%20%286%29.png" alt="Star icon" className="w-12 h-12" />
                    </div>
                  ) : isSixthCard ? (
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2">
                      <img src="https://customer-assets.emergentagent.com/job_nettbil-redesign/artifacts/pze1tgb8_Your%20paragraph%20text%20%287%29.png" alt="Map icon" className="w-12 h-12" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-2"><Icon size={20} /></div>
                  )}
                  <CardTitle className={`font-semibold ${isFirstCard || isSecondCard || isThirdCard || isFourthCard || isFifthCard || isSixthCard ? 'text-xl' : 'text-base'}`}>{t(a.titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className={`text-slate-600 px-4 ${isBottomRow ? 'pb-4' : 'pb-8'} ${isFirstCard ? '-mt-1 pt-0' : isSecondCard ? '-mt-1 pt-0' : isThirdCard ? '-mt-1 pt-0' : 'pt-3'} ${isFirstCard || isSecondCard || isThirdCard || isFourthCard || isFifthCard || isSixthCard ? 'text-base' : 'text-sm'}`}>
                  {t(a.descKey)}
                  {isSixthCard && (
                    <div className="mt-3">
                      <a href="#" className="text-[#044046] hover:text-[#ff833e] underline text-sm">
                        {t("common.seeDeliveryMap")}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="max-w-3xl mx-auto px-4 py-10 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-[#044046]">{t("common.faqTitle")}</h2>
        <div className="space-y-1">
          {homeFaqs.map((f) => (
            <Accordion key={f.id} type="single" collapsible className="border-b border-gray-200">
              <AccordionItem value={`item-${f.id}`} className="border-none">
                <AccordionTrigger className="py-4 px-0 text-left hover:no-underline flex items-center justify-between [&>svg]:text-[#ff7a28] [&>svg]:ml-auto font-normal">
                  <span className="text-base md:text-lg text-[#044046]">{t(f.qKey)}</span>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-4 text-base text-[#044046] opacity-90 leading-relaxed whitespace-pre-line font-medium">
                  {t(f.aKey)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link className="text-[#044046] underline font-medium text-lg" href="/faq">{t("common.seeMore")}</Link>
        </div>
      </section>

      {/* Bottom hero repeat */}
      <section className="bg-[var(--hero-bg)]">
        <div className="max-w-4xl mx-auto px-4 py-16 pt-32 pb-28 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#044046]">{t("common.formTitle")}</h3>
          <p className="text-base md:text-lg text-[#044046] opacity-90 mb-8 whitespace-pre-line">{t("common.formSubtitle")}</p>
          <HeroForm compact />
        </div>
      </section>
      
      {/* Common Ninja Chat Widget */}
      {isMounted && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="commonninja_component pid-31adabd1-d40e-4114-88a3-8b77e28aaf72"></div>
        </div>
      )}
    </main>
  );
}