"use client";
import React, { useState } from "react";
import { useI18n } from "../../i18n";
import { Button, Input, Card, CardContent } from "../../ui";
import { Car, Clock, DollarSign } from "lucide-react";

export default function CompanyPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    consent: false,
    newsletter: false
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleCheckboxChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white -mt-20 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4 lg:px-8 lg:ml-32">
          {/* Car Image - Now on the left */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <img 
              src="https://customer-assets.emergentagent.com/job_nextbil-1/artifacts/w5k5mlu6_Til%20so%CC%88lu%20%281%29.png" 
              alt="Dacia Dokker" 
              className="max-w-lg w-full lg:max-w-xl"
            />
          </div>

          {/* Text Content - Now on the right, moved more to the left */}
          <div className="space-y-8 order-1 lg:order-2 lg:-ml-16">
            <div className="text-center lg:text-left">
              <div className="text-[#ff833e] text-sm font-semibold tracking-wider uppercase mb-4">
                {t("company.subtitle")}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#044046] leading-tight mb-6">
                <div>{t("company.title.line1")}</div>
                <div>{t("company.title.line2")}</div>
                <div>{t("company.title.line3")}</div>
              </h1>
              <p className="text-lg text-[#044046] opacity-80 mb-8 max-w-lg">
                <div>{t("company.description.line1")}</div>
                <div>{t("company.description.line2")}</div>
              </p>
              <Button className="bg-[#ff833e] hover:bg-[#ff7a28] text-white text-xl px-6 py-3 rounded-full font-semibold">
                {t("company.contactButton")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white -mt-24">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sell more cars */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_i18n-nextjs-ui/artifacts/np3v6tp9_Til%20so%CC%88lu%20%282%29.png" 
                  alt="Car icon" 
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-xl font-bold text-[#044046] mb-3 -mt-2">{t("company.features.sellMore.title")}</h3>
              <p className="text-[#044046] leading-relaxed text-base">
                {t("company.features.sellMore.description")}
              </p>
            </div>

            {/* Spend little time and effort */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_i18n-nextjs-ui/artifacts/j3sy69h0_Til%20so%CC%88lu%20%283%29.png" 
                  alt="Hand OK icon" 
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-xl font-bold text-[#044046] mb-3 -mt-2">{t("company.features.lessTime.title")}</h3>
              <p className="text-[#044046] leading-relaxed text-base">
                {t("company.features.lessTime.description")}
              </p>
            </div>

            {/* Best price from dealer */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-4 shadow-sm">
              <div>
                <img 
                  src="https://customer-assets.emergentagent.com/job_i18n-nextjs-ui/artifacts/afzrq12t_Til%20so%CC%88lu%20%284%29.png" 
                  alt="Kr money icon" 
                  className="w-14 h-14"
                />
              </div>
              <h3 className="text-xl font-bold text-[#044046] mb-3 -mt-2">{t("company.features.bestPrice.title")}</h3>
              <p className="text-[#044046] leading-relaxed text-base">
                {t("company.features.bestPrice.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#044046] mb-4">
              {t("company.processTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center max-w-5xl mx-auto">
            <div className="space-y-14">
              {/* Step 1 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-[#ff833e] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#044046] mb-3">{t("company.steps.step1.title")}</h3>
                  <p className="text-[#044046] opacity-70 text-base lg:text-lg">
                    <div className="whitespace-nowrap">{t("company.steps.step1.description.line1")}</div>
                    <div>{t("company.steps.step1.description.line2")}</div>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-[#ff833e] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#044046] mb-3">
                    <div className="whitespace-nowrap">{t("company.steps.step2.title.line1")}</div>
                    <div>{t("company.steps.step2.title.line2")}</div>
                  </h3>
                  <p className="text-[#044046] opacity-70 text-base lg:text-lg">
                    <div className="whitespace-nowrap">{t("company.steps.step2.description.line1")}</div>
                    <div className="whitespace-nowrap">{t("company.steps.step2.description.line2")}</div>
                    <div>{t("company.steps.step2.description.line3")}</div>
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-[#ff833e] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#044046] mb-3">{t("company.steps.step3.title")}</h3>
                  <p className="text-[#044046] opacity-70 text-base lg:text-lg">
                    <div className="whitespace-nowrap">{t("company.steps.step3.description.line1")}</div>
                    <div className="whitespace-nowrap">{t("company.steps.step3.description.line2")}</div>
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-[#ff833e] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#044046] mb-3">{t("company.steps.step4.title")}</h3>
                  <p className="text-[#044046] opacity-70 text-base lg:text-lg">
                    <div className="whitespace-nowrap">{t("company.steps.step4.description.line1")}</div>
                    <div className="whitespace-nowrap">{t("company.steps.step4.description.line2")}</div>
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-end lg:justify-end lg:ml-28 lg:-mt-8">
              <div className="commonninja_component pid-03fbd13e-4859-4742-a334-c0c57cb61ce1 transform scale-110 origin-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://customer-assets.emergentagent.com/job_nettbil-clone-1/artifacts/yht8q8lc_Til%20so%CC%88lu%20%285%29%20%281%29.png')"
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#044046] mb-4">
                {t("company.form.title")}
              </h2>
              <p className="text-[#044046] opacity-70">
                {t("company.form.subtitle")}
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <Input
                  placeholder={t("company.form.name")}
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  className="w-full h-12 rounded-lg border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                />
              </div>

              <div className="flex space-x-2">
                <select className="h-12 px-3 rounded-lg border border-gray-200 bg-white text-gray-600">
                  <option>+47</option>
                  <option>+354</option>
                </select>
                <Input
                  placeholder={t("company.form.mobile")}
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  className="flex-1 h-12 rounded-lg border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder={t("company.form.email")}
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  className="w-full h-12 rounded-lg border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                />
              </div>

              <div>
                <Input
                  placeholder={t("company.form.company")}
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  className="w-full h-12 rounded-lg border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#044046]">
                  {t("company.form.consentTitle")}
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={handleCheckboxChange('consent')}
                      className="mt-1"
                    />
                    <span className="text-sm text-[#044046] opacity-80">
                      {t("company.form.consent")}
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.newsletter}
                      onChange={handleCheckboxChange('newsletter')}
                      className="mt-1"
                    />
                    <span className="text-sm text-[#044046] opacity-80">
                      {t("company.form.newsletter")}
                    </span>
                  </label>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#ff833e] hover:bg-[#ff7a28] text-white text-lg py-4 rounded-full font-semibold"
              >
                {t("company.form.submitButton")}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}