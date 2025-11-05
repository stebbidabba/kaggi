"use client";
import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";
import { contactInfo } from "../../mock";

export default function Contact() {
  const { t } = useI18n();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
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
  
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#044046] mb-8">
            {t("contact.hero.title")}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium">
            {t("contact.hero.description")}
          </p>
          
          {/* Simple Contact Text */}
          <div className="text-lg text-gray-600 mb-8 font-medium">
            <p className="mb-4">
              {t("contact.simple.contactBy")} <a href={`mailto:${contactInfo.email}`} className="text-[#044046] underline hover:text-[#044046]">{contactInfo.email}</a>, {t("contact.simple.phone")} <a href={`tel:${contactInfo.phone}`} className="text-[#044046] underline hover:text-[#044046]">{contactInfo.phone.replace('+', '')}</a> {t("contact.simple.orChat")}
            </p>
            
            <p className="text-gray-600 font-medium mb-8">
              {t("contact.simple.hours")}
            </p>
          </div>

          {/* Contact Image */}
          <div className="mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_bilarticle/artifacts/cs1vexjv_ChatGPT%20Image%20Sep%2025%2C%202025%2C%2003_25_22%20PM.png"
              alt="Contact methods"
              className="mx-auto w-96 md:w-[500px] h-auto rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Simple CTA Button */}
        <div className="mt-12">
          <a 
            href={contactInfo.chatUrl}
            className="inline-flex items-center px-20 py-4 bg-orange-50 text-[#ff7a28] text-lg font-bold rounded-full border-2 border-[#ff7a28] hover:bg-[#ff7a28] hover:text-white transition-all duration-200 shadow-sm"
          >
            {t("contact.cta.button")}
          </a>
        </div>

      </div>

      {/* Floating Arrow with Chat Text */}
      <div className="fixed bottom-12 right-8 z-50 pointer-events-none">
        <div className="text-center">
          <p className="text-xl font-bold text-[#044046] mb-3">
            {t("contact.cta.button")}
          </p>
          <div className="flex justify-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_bilarticle/artifacts/bf5pijoq_ChatGPT%20Image%20Sep%2025%2C%202025%2C%2003_55_20%20PM.png"
              alt="Arrow pointing to chat"
              className="w-56 h-56 md:w-80 md:h-80 object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Common Ninja Chat Widget */}
      {isMounted && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="commonninja_component pid-31adabd1-d40e-4114-88a3-8b77e28aaf72"></div>
        </div>
      )}
    </div>
  );
}