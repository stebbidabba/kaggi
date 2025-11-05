"use client";
import React, { useState } from "react";
import { useI18n } from "../../i18n";
import { Button, Input, Card, CardContent } from "../../ui";
import { Check } from "lucide-react";

export default function DealersPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Bid on cars with condition report */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-[#044046] leading-tight mb-6">
                  {t("dealers.hero.title")}
                </h1>
                <p className="text-xl text-[#044046] opacity-80 mb-8">
                  {t("dealers.hero.subtitle")}
                </p>
              </div>

              {/* Collaboration logos */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#044046] text-sm">{t("dealers.collaboration")}</span>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm">
                    FINN
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">V</span>
                    </div>
                    <span className="text-red-600 font-bold text-sm">VIKING</span>
                    <span className="text-[#044046] text-sm">KONTROLL</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#ff833e] hover:bg-[#ff7a28] text-white text-lg px-8 py-4 rounded-full font-semibold">
                  {t("dealers.createAccount")}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#ff833e] text-[#ff833e] hover:bg-[#ff833e] hover:text-white text-lg px-8 py-4 rounded-full font-semibold"
                >
                  {t("dealers.login")}
                </Button>
              </div>

              {/* Benefits list */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#044046]">{t("dealers.benefits.auction")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#044046]">{t("dealers.benefits.newCars")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#044046]">{t("dealers.benefits.selection")}</span>
                </div>
              </div>
            </div>

            {/* Right Content - Car Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiByeD0iMTIiIGZpbGw9IiNmOWZhZmIiLz4KPHJlY3QgeD0iNTAiIHk9IjE4MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSI2MCIgcng9IjMwIiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjgwIiB5PSIxMDAiIHdpZHRoPSIzNDAiIGhlaWdodD0iMTAwIiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB4PSIxMDAiIHk9IjEyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjEwIiByeD0iNSIgZmlsbD0iIzM3NDE1MSIvPgo8cmVjdCB4PSIyMDAiIHk9IjEyMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMCIgcng9IjUiIGZpbGw9IiMzNzQxNTEiLz4KPGNpcmNsZSBjeD0iMTQwIiBjeT0iMjMwIiByPSIyNSIgZmlsbD0iIzM3NDE1MSIvPgo8Y2lyY2xlIGN4PSIzNjAiIGN5PSIyMzAiIHI9IjI1IiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjI1MCIgeT0iMjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzc0MTUxIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCI+VGVzbGEgTU9ERUwgMyBMT05HIFJBTkdFIEFXRDwvdGV4dD4KPC9zdmc+Cg==" 
                  alt="Tesla Model 3" 
                  className="max-w-lg w-full"
                />
                <div className="absolute top-4 right-4 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm font-semibold text-[#044046]">2020 • 45,000 km • Automatic • Electric</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded shadow">
                  <span className="text-sm text-[#044046] opacity-70">{t("dealers.highestBid")}</span>
                  <div className="bg-gray-200 h-4 rounded mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-[#044046] rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-3">will be connected later</div>
                <div className="text-lg opacity-90">{t("dealers.stats.carsBidding")}</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-3">will be connected later</div>
                <div className="text-lg opacity-90">{t("dealers.stats.newCarsDaily")}</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold mb-3">will be connected later</div>
                <div className="text-lg opacity-90">{t("dealers.stats.carsComing")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples of cars section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#044046] text-center mb-12">
            {t("dealers.examples.title")}
          </h2>
          
          {/* This section will be populated with dynamic car data later */}
          <div className="space-y-6">
            {/* Placeholder for dynamic car listings */}
            <div className="text-center py-12 text-[#044046] opacity-50">
              <p>{t("dealers.examples.placeholder")}</p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <Button className="bg-[#ff833e] hover:bg-[#ff7a28] text-white text-xl px-8 py-4 rounded-full font-semibold mb-4">
              {t("dealers.seeAllCars")}
            </Button>
            <p className="text-[#044046] opacity-70">
              {t("dealers.requiresLicense")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Sales Manager Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#044046] mb-12">
            {t("dealers.contact.title")}
          </h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[#044046] opacity-70 mb-2">{t("dealers.contact.customerService")}</p>
              <a href="tel:47494900" className="text-2xl font-bold text-[#044046] hover:text-[#ff833e]">
                47 49 49 00
              </a>
            </div>
            
            <div>
              <p className="text-[#044046] opacity-70 mb-2">{t("dealers.contact.email")}</p>
              <a href="mailto:dealer@nettbil.no" className="text-xl text-[#044046] hover:text-[#ff833e] underline">
                dealer@nettbil.no
              </a>
            </div>
            
            <div>
              <p className="text-[#044046] opacity-70 mb-2">{t("dealers.contact.hours")}</p>
              <p className="text-lg font-semibold text-[#044046]">
                {t("dealers.contact.schedule")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}