"use client";
import React from "react";
import { useI18n } from "../../i18n";

export default function Cookies() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#044046] mb-6">
              {t("cookies.title")}
            </h1>
          </div>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none text-[#044046] space-y-8">
            {/* Introduction */}
            <p className="text-xl leading-relaxed">
              {t("cookies.content.intro")}
            </p>
            
            {/* What are cookies */}
            <div>
              <h2 className="text-2xl font-bold text-[#044046] mb-4">
                {t("cookies.content.whatAre.title")}
              </h2>
              <p className="text-lg leading-relaxed">
                {t("cookies.content.whatAre.text")}
              </p>
            </div>
            
            {/* How to manage */}
            <div>
              <h2 className="text-2xl font-bold text-[#044046] mb-4">
                {t("cookies.content.howToManage.title")}
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                {t("cookies.content.howToManage.text")}
              </p>
              <p className="text-lg leading-relaxed">
                {t("cookies.content.howToManage.link")}
              </p>
              <p className="text-lg leading-relaxed font-medium">
                {t("cookies.content.howToManage.linkText")}
              </p>
            </div>
            
            {/* Types of cookies */}
            <div>
              <h2 className="text-2xl font-bold text-[#044046] mb-6">
                {t("cookies.content.types.title")}
              </h2>
              
              {/* Necessary cookies */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#044046] mb-3">
                  {t("cookies.content.types.necessary.title")}
                </h3>
                <p className="text-lg leading-relaxed">
                  {t("cookies.content.types.necessary.text")}
                </p>
              </div>
              
              {/* Analytics cookies */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#044046] mb-3">
                  {t("cookies.content.types.analytics.title")}
                </h3>
                <p className="text-lg leading-relaxed">
                  {t("cookies.content.types.analytics.text")}
                </p>
              </div>
              
              {/* Marketing cookies */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#044046] mb-3">
                  {t("cookies.content.types.marketing.title")}
                </h3>
                <p className="text-lg leading-relaxed">
                  {t("cookies.content.types.marketing.text")}
                </p>
              </div>
            </div>
            
            {/* Consent */}
            <div>
              <h2 className="text-2xl font-bold text-[#044046] mb-4">
                {t("cookies.content.consent.title")}
              </h2>
              <p className="text-lg leading-relaxed">
                {t("cookies.content.consent.text")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}