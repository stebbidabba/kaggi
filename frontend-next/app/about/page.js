"use client";
import React from "react";
import { useI18n } from "../../i18n";

export default function About() {
  const { t } = useI18n();
  
  return (
    <main className="min-h-screen bg-white">
      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#044046] mb-6">
              {t("about.title")}
            </h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-[#044046] space-y-6">
            <p className="text-xl leading-relaxed">
              {t("about.content.paragraph1")}
            </p>
            
            <p className="text-xl leading-relaxed">
              {t("about.content.paragraph2")}
            </p>
            
            <p className="text-xl leading-relaxed">
              {t("about.content.paragraph3")}
            </p>
            
            <p className="text-xl leading-relaxed">
              {t("about.content.paragraph4")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Information */}
            <div className="space-y-8 lg:ml-32">
              <h3 className="text-4xl lg:text-5xl font-bold text-[#044046] mb-6">Hafðu samband</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-[#ff833e] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="tel:3547877887" className="text-[#044046] font-medium text-lg underline">
                      {t("about.contact.phone")}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-[#ff833e] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="mailto:kaggi@kaggi.is" className="text-[#044046] font-medium text-lg underline">
                      {t("about.contact.email")}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 bg-[#ff833e] rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#044046] font-medium text-lg">{t("about.contact.hours")}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* New Image */}
            <div className="flex justify-center lg:justify-center -mt-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_59478579-4a34-4fc8-afab-9ea24414594f/artifacts/1c5da3pc_Untitled%20design%20-%202025-09-24T200726.258.png" 
                alt="Kaggi design" 
                className="w-80 h-auto rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}