"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "../../i18n";

export default function TipsPage() {
  const { t } = useI18n();

  const categories = [
    {
      id: 1,
      titleKey: "tips.categories.sellCar.title",
      descKey: "tips.categories.sellCar.desc",
      bgColor: "bg-[#B8E6E6]",
      icon: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/tips-sell-icon.png"
    },
    {
      id: 2,
      titleKey: "tips.categories.maintenance.title", 
      descKey: "tips.categories.maintenance.desc",
      bgColor: "bg-white",
      icon: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/tips-maintenance-icon.png"
    },
    {
      id: 3,
      titleKey: "tips.categories.stories.title",
      descKey: "tips.categories.stories.desc", 
      bgColor: "bg-white",
      icon: "https://customer-assets.emergentagent.com/job_kaggi-nextjs/artifacts/tips-stories-icon.png"
    }
  ];

  const latestArticles = [
    {
      id: 1,
      titleKey: "tips.articles.article1.title",
      descKey: "tips.articles.article1.desc",
      category: "tips.articles.article1.category",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2, 
      titleKey: "tips.articles.article2.title",
      descKey: "tips.articles.article2.desc",
      category: "tips.articles.article2.category",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      titleKey: "tips.articles.article3.title", 
      descKey: "tips.articles.article3.desc",
      category: "tips.articles.article3.category",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center"
    }
  ];

  const customerStories = [
    {
      id: 1,
      titleKey: "tips.stories.story1.title",
      descKey: "tips.stories.story1.desc", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      titleKey: "tips.stories.story2.title",
      descKey: "tips.stories.story2.desc",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      titleKey: "tips.stories.story3.title",
      descKey: "tips.stories.story3.desc", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c28c?w=400&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <main className="bg-[#F8F6F0] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#044046] mb-6">
            {t("tips.hero.title")}
          </h1>
          <p className="text-xl text-[#044046] opacity-80">
            {t("tips.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className={`${category.bgColor} rounded-3xl p-12 text-center hover:shadow-lg transition-shadow cursor-pointer ${index === 0 ? 'md:col-span-1' : ''}`}
              >
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#044046]" viewBox="0 0 24 24" fill="currentColor">
                      {index === 0 && (
                        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                      )}
                      {index === 1 && (
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      )}
                      {index === 2 && (
                        <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                      )}
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#044046] mb-4">
                  {t(category.titleKey)}
                  <span className="ml-2 text-[#ff833e]">›</span>
                </h3>
                <p className="text-[#044046] opacity-80 text-lg">
                  {t(category.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#044046] mb-12">
            {t("tips.latestArticles.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/tips/articles/${article.id === 1 ? 'hvernig-selja-bil-til-utlanda' : article.id === 2 ? 'reklamasjonsansvar-ved-salg-av-bil' : article.id === 3 ? 'hvad-er-astandsskyrsla' : `article-${article.id}`}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={t(article.titleKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block bg-[#B8E6E6] text-[#044046] px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {t(article.category)}
                    </div>
                    <h3 className="text-xl font-bold text-[#044046] mb-3 leading-tight">
                      {t(article.titleKey)}
                    </h3>
                    <p className="text-[#044046] opacity-80 text-sm leading-relaxed">
                      {t(article.descKey)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#044046] mb-12">
            {t("tips.customerStories.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerStories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={t(story.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#044046] mb-3 leading-tight">
                    {t(story.titleKey)}
                  </h3>
                  <p className="text-[#044046] opacity-80 text-sm leading-relaxed">
                    {t(story.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            {t("tips.cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}