"use client";
import React from "react";
import { M_PLUS_Rounded_1c } from "next/font/google";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui";
import { faqs } from "../../mock";
import { useI18n } from "../../i18n";

const mPlusRounded = M_PLUS_Rounded_1c({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function FAQPage(){
  const { t } = useI18n();
  return (
    <div className={`min-h-screen bg-white ${mPlusRounded.className}`}>
      {/* Hero Section with Icon and Title */}
      <div className="bg-[#fff8f6] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_kaggi-faq/artifacts/4ygj8juf_Your%20paragraph%20text%20%283000%20x%203000%20px%29%20%28Logo%29%20%2813%29.png" 
              alt="FAQ Icon" 
              className="w-64 h-64 object-contain"
            />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#044046] mb-8">
            Frequently asked questions
          </h1>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-0">
          {faqs.map((f, index) => (
            <div key={f.id} className="bg-white border-b border-gray-100">
              <Accordion type="single" collapsible>
                <AccordionItem value={`faq-${f.id}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-left text-base md:text-lg text-[#044046] hover:no-underline transition-colors [&>svg]:text-[#ff833e] hover:[&>svg]:text-[#ff833e] font-normal">
                    {t(f.qKey)}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-[#044046] opacity-90 text-base leading-relaxed whitespace-pre-line font-medium">
                    {t(f.aKey)}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}