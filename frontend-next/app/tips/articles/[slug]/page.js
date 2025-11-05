"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "../../../../i18n";

export default function ArticlePage({ params }) {
  const { t } = useI18n();
  const { slug } = params;

  // Article content mapping
  const articles = {
    "hvernig-selja-bil-til-utlanda": {
      titleKey: "tips.articleDetails.sellAbroad.title",
      contentKey: "tips.articleDetails.sellAbroad.content",
      categoryKey: "tips.articleDetails.sellAbroad.category",
      image: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/8jbata2q_Screenshot%202025-09-25%20at%2013.36.52.png"
    },
    "reklamasjonsansvar-ved-salg-av-bil": {
      titleKey: "tips.articleDetails.liability.title",
      contentKey: "tips.articleDetails.liability.content", 
      categoryKey: "tips.articleDetails.liability.category",
      image: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/p3nzn6b5_Screenshot%202025-09-25%20at%2013.45.17.png"
    },
    "hvad-er-astandsskyrsla": {
      titleKey: "tips.articleDetails.conditionReport.title",
      contentKey: "tips.articleDetails.conditionReport.content", 
      categoryKey: "tips.articleDetails.conditionReport.category",
      image: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/8s9l8tyl_Screenshot%202025-09-25%20at%2013.58.37.png"
    }
  };

  const article = articles[slug];

  if (!article) {
    return (
      <main className="bg-[#F8F6F0] min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#044046]">Grein fannst ekki</h1>
          <Link href="/tips" className="text-[#ff833e] hover:underline mt-4 inline-block">
            Til baka á bíltips
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Image */}
      <section className="relative h-96 bg-gray-200 overflow-hidden">
        <img 
          src={slug === "reklamasjonsansvar-ved-salg-av-bil" ? 
            "https://images.unsplash.com/photo-1632823469850-74af96cdec37?w=1200&h=400&fit=crop&crop=center" : 
            slug === "hvad-er-astandsskyrsla" ?
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop&crop=center" :
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=400&fit=crop&crop=center"
          }
          alt={slug === "reklamasjonsansvar-ved-salg-av-bil" ? "Mechanic working on car" : 
               slug === "hvad-er-astandsskyrsla" ? "Car inspection" : 
               "Tesla dashboard in car"}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Breadcrumb */}
      <section className="py-6 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm">
            <Link href="/tips" className="text-[#044046] hover:text-[#ff833e] underline">
              {t("tips.breadcrumb.tips")}
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-600">{t(article.categoryKey)}</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#044046] mb-8 leading-tight">
            {t(article.titleKey)}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-lg text-[#044046] opacity-90 leading-relaxed space-y-6">
              {/* Render different content based on article slug */}
              {slug === "hvernig-selja-bil-til-utlanda" && (
                <>
                  <p className="text-xl italic mb-8">
                    {t("tips.articleDetails.sellAbroad.intro")}
                  </p>
                  <div className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.sellAbroad.canSell.title")}
                      </h2>
                      <p className="mb-4">
                        {t("tips.articleDetails.sellAbroad.canSell.content")}
                      </p>
                    </section>
                  </div>
                </>
              )}

              {/* Liability article content */}
              {slug === "reklamasjonsansvar-ved-salg-av-bil" && (
                <>
                  <p className="text-xl italic mb-8">
                    {t("tips.articleDetails.liability.intro")}
                  </p>
                  <p className="mb-8">
                    {t("tips.articleDetails.liability.introDetail")}
                  </p>
                </>
              )}

              {/* Condition report article content */}
              {slug === "hvad-er-astandsskyrsla" && (
                <>
                  {/* Introduction */}
                  <p className="text-xl italic mb-8">
                    {t("tips.articleDetails.conditionReport.intro")}
                  </p>
                  
                  <p className="mb-8">
                    {t("tips.articleDetails.conditionReport.introDetail")}
                  </p>

                  {/* Main sections */}
                  <div className="space-y-12">
                    {/* What is condition report */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.whatIs.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.whatIs.content")}
                      </p>

                      <h3 className="text-xl font-semibold text-[#044046] mb-4">
                        {t("tips.articleDetails.conditionReport.whatIs.coversTitle")}
                      </h3>

                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.bodywork.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.bodywork.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.lights.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.lights.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.wheels.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.wheels.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.brakes.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.brakes.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.engine.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.engine.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.battery.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.battery.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.chassis.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.chassis.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.steering.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.steering.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.climate.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.climate.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.whatIs.covers.diagnosis.title")}</strong> {t("tips.articleDetails.conditionReport.whatIs.covers.diagnosis.content")}
                          </div>
                        </li>
                      </ul>
                    </section>

                    {/* Why do you need condition report */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.whyNeeded.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.whyNeeded.content1")}
                      </p>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.whyNeeded.content2")}
                      </p>
                    </section>

                    {/* Difference from EU control */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.vsEuControl.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.vsEuControl.content1")}
                      </p>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.vsEuControl.content2")}
                      </p>
                    </section>

                    {/* Why is it important */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.importance.title")}
                      </h2>
                      
                      <ul className="space-y-4 mb-6">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.importance.safety.title")}</strong> {t("tips.articleDetails.conditionReport.importance.safety.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.importance.price.title")}</strong> {t("tips.articleDetails.conditionReport.importance.price.content")}
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <div>
                            <strong className="text-[#044046]">{t("tips.articleDetails.conditionReport.importance.risk.title")}</strong> {t("tips.articleDetails.conditionReport.importance.risk.content")}
                          </div>
                        </li>
                      </ul>

                      <p className="italic text-[#044046] opacity-80 mb-6">
                        {t("tips.articleDetails.conditionReport.importance.note")}
                      </p>
                    </section>

                    {/* What to do before test */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.beforeTest.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.beforeTest.intro")}
                      </p>
                      
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.keys")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.tollDevice")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.extraWheels")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.hatShelf")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.serviceBook")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.beforeTest.papers")}
                        </li>
                      </ul>

                      <p className="font-semibold mb-6">
                        {t("tips.articleDetails.conditionReport.beforeTest.reminder")}
                      </p>

                      <p>
                        {t("tips.articleDetails.conditionReport.beforeTest.conclusion")}
                      </p>
                    </section>

                    {/* Cost */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.cost.title")}
                      </h2>
                      <p>
                        {t("tips.articleDetails.conditionReport.cost.content")}
                      </p>
                    </section>

                    {/* Can I buy the report */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.canBuy.title")}
                      </h2>
                      <p>
                        {t("tips.articleDetails.conditionReport.canBuy.content")}
                      </p>
                    </section>

                    {/* Disclosure obligation */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.disclosureObligation.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.disclosureObligation.content1")}
                      </p>
                      <p>
                        {t("tips.articleDetails.conditionReport.disclosureObligation.content2")}
                      </p>
                    </section>

                    {/* What happens if you hold back info */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.holdingBackInfo.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.holdingBackInfo.content1")}
                      </p>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.holdingBackInfo.content2")}
                      </p>

                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.holdingBackInfo.consequence1")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.holdingBackInfo.consequence2")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-[#ff833e] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {t("tips.articleDetails.conditionReport.holdingBackInfo.consequence3")}
                        </li>
                      </ul>

                      <p>
                        {t("tips.articleDetails.conditionReport.holdingBackInfo.conclusion")}
                      </p>
                    </section>

                    {/* How it works with Kaggi */}
                    <section>
                      <h2 className="text-2xl font-bold text-[#044046] mb-6">
                        {t("tips.articleDetails.conditionReport.howItWorks.title")}
                      </h2>
                      <p className="mb-6">
                        {t("tips.articleDetails.conditionReport.howItWorks.content1")}
                      </p>

                      <h3 className="text-xl font-semibold text-[#044046] mb-4">
                        {t("tips.articleDetails.conditionReport.pickup.title")}
                      </h3>
                      <p className="mb-4">
                        {t("tips.articleDetails.conditionReport.pickup.content")}
                      </p>

                      <h4 className="text-lg font-semibold text-[#044046] mb-3">
                        {t("tips.articleDetails.conditionReport.pickup.howItWorks")}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-[#ff833e] text-white rounded-full text-sm font-bold mr-4 flex-shrink-0">1</span>
                          {t("tips.articleDetails.conditionReport.pickup.step1")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-[#ff833e] text-white rounded-full text-sm font-bold mr-4 flex-shrink-0">2</span>
                          {t("tips.articleDetails.conditionReport.pickup.step2")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-[#ff833e] text-white rounded-full text-sm font-bold mr-4 flex-shrink-0">3</span>
                          {t("tips.articleDetails.conditionReport.pickup.step3")}
                        </li>
                        <li className="flex items-start">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-[#ff833e] text-white rounded-full text-sm font-bold mr-4 flex-shrink-0">4</span>
                          {t("tips.articleDetails.conditionReport.pickup.step4")}
                        </li>
                      </ul>
                    </section>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#F8F6F0]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=128&h=128&fit=crop&crop=center"
                alt="Car icon" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#044046] mb-4">
              {t("tips.cta.title")}
            </h2>
            <p className="text-xl text-[#044046] opacity-80 mb-8">
              {t("tips.cta.subtitle")}
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-[#044046]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                <span className="text-[#044046] font-medium">{t("tips.cta.licensePlate")}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-[#044046]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.64 21.97c-.21-.02-.42-.05-.63-.07-.38-.04-.75-.11-1.12-.17-.96-.17-1.92-.46-2.84-.78C5.77 19.54 3 16.76 3 13.5c0-.83.11-1.64.3-2.4C4.46 7.61 7.5 5 11.5 5s7.04 2.61 8.2 6.1c.19.76.3 1.57.3 2.4 0 3.26-2.77 6.04-6.05 7.35-.92.32-1.88.61-2.84.78-.37.06-.74.13-1.12.17-.21.02-.42.05-.63.07-.64.04-1.27.04-1.92 0z"/>
                </svg>
                <span className="text-[#044046] font-medium">{t("tips.cta.mileage")}</span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block bg-[#ff833e] hover:bg-[#e6732d] text-white font-bold py-4 px-12 rounded-full text-xl transition-colors shadow-lg hover:shadow-xl"
          >
            {slug === "hvernig-selja-bil-til-utlanda" ? t("tips.articleDetails.sellAbroad.cta.button") : 
             slug === "reklamasjonsansvar-ved-salg-av-bil" ? t("tips.articleDetails.liability.cta.button") :
             t("tips.articleDetails.conditionReport.cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}