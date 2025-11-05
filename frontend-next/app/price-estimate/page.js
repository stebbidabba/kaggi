"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "../../i18n";

export default function PriceEstimatePage() {
  const { t } = useI18n();

  return (
    <>
      {/* Custom Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fffaf0]" style={{ minHeight: '120px' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center" style={{ height: '70px' }}>
          <Link href="/" className="flex items-center">
            <img src="/kaggi-logo.png" alt="Kaggi" className="w-36 h-36 object-contain" />
          </Link>
        </div>
        
        {/* Header separator line */}
        <div className="w-full border-b border-gray-200"></div>
        
        {/* Bottom separator line */}
        <div className="w-full border-b border-gray-200"></div>
      </div>
      
      {/* Page content with top margin */}
      <div className="pt-[120px] min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-[#044046] mb-4 leading-tight">
              Símanúmer staðfest!
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Þú hefur fengið aðgang að verðmati bílsins þíns
            </p>
          </div>

          {/* Price Estimate Card */}
          <div className="bg-white rounded-3xl py-16 px-12 max-w-2xl mx-auto text-center space-y-8 shadow-2xl mb-12" style={{ boxShadow: '0 10px 20px -4px rgba(0, 0, 0, 0.15), 0 -4px 10px -2px rgba(0, 0, 0, 0.08), 4px 0 10px -2px rgba(0, 0, 0, 0.08), -4px 0 10px -2px rgba(0, 0, 0, 0.08)' }}>
            {/* Price Icon */}
            <div className="flex justify-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_form-refinement/artifacts/tl27olb3_Kr.png" 
                alt="Kr Icon" 
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <h2 className="text-4xl font-bold text-[#044046]">
              Verðmat bílsins þíns
            </h2>
            
            {/* Mock Price Range */}
            <div className="bg-green-50 rounded-2xl p-8">
              <p className="text-sm text-gray-600 mb-2">Áætlað verðmat í uppboði:</p>
              <p className="text-4xl font-bold text-green-600 mb-2">2.800.000 - 3.200.000 kr</p>
              <p className="text-sm text-gray-500">Miðað við söluverð svipaðra bíla síðustu 90 daga</p>
            </div>
            
            <p className="text-lg text-gray-800 leading-relaxed">
              Þetta er áætlað verðmat byggt á sögugögnum frá uppboðum Kaggi. Lokaverð getur verið breytilegt eftir ástandi og eftirspurn.
            </p>
            
            <div className="space-y-4">
              <button className="w-full text-white font-medium px-8 py-4 rounded-full text-lg transition-opacity hover:opacity-90" style={{ backgroundColor: '#d54000' }}>
                Setja bíl í uppboð núna
              </button>
              
              <button className="w-full bg-gray-100 text-gray-700 font-medium px-8 py-4 rounded-full text-lg transition-colors hover:bg-gray-200">
                Fá nákvæmara verðmat
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why Choose Kaggi */}
            <div className="bg-white rounded-[2rem] border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#044046] mb-4">
                Af hverju Kaggi?
              </h3>
              <ul className="text-gray-700 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ókeypis verðmat og prufuakstur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Fljótt og öruggt uppboðsferli</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Engin falinn kostnaður</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Greiðsla innan 2 virkra daga</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-[2rem] border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#044046] mb-4">
                Næstu skref
              </h3>
              <ol className="text-gray-700 space-y-2 text-left">
                <li className="flex items-start gap-3">
                  <span className="bg-[#044046] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Bókaðu ókeypis prufuakstur</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#044046] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Við metum bílinn nákvæmlega</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#044046] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Bíllinn fer í uppboð</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#044046] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Þú færð greiðslu strax</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-[#044046] mb-4">
              Spurningar?
            </h3>
            <p className="text-gray-600 mb-4">
              Hafðu samband við okkar þjónustuteymi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+3545812345" className="bg-[#044046] text-white px-6 py-3 rounded-full font-medium hover:opacity-90">
                📞 581-2345
              </a>
              <a href="mailto:help@kaggi.is" className="border border-[#044046] text-[#044046] px-6 py-3 rounded-full font-medium hover:bg-[#044046] hover:text-white">
                ✉️ help@kaggi.is
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}