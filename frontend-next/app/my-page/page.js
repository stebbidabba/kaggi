"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "../../i18n";
import { Button, Input } from "../../ui";
import { FileText, Car } from "lucide-react";

export default function MyPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    licensePlate: '',
    email: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo only - no header navigation */}
      <div className="pt-0 pl-6">
        <Link href="/" className="flex items-center cursor-pointer">
          <img src="/kaggi-logo.png" alt="Kaggi" className="w-32 h-32 object-contain" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 pt-4">
        <div className="max-w-lg w-full">
          {/* Main Card Container */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="text-center space-y-6">
              {/* Avatar - Car with document icon */}
              <div className="flex justify-center mb-6">
                <img src="https://customer-assets.emergentagent.com/job_carshop-next/artifacts/0dl884us_Kaggi%20%283%29.png" alt="Car with document" className="w-20 h-20" />
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-[#044046]">
                  {t("myPage.title")}
                </h1>
                <p className="text-[#044046] text-base">
                  {t("myPage.subtitle")}
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4 max-w-xs mx-auto">
                {/* License Plate Input - Rounded like hero section */}
                <div className="relative">
                  <Input
                    placeholder={t("myPage.licensePlate")}
                    value={formData.licensePlate}
                    onChange={handleInputChange('licensePlate')}
                    className="w-full h-12 pr-14 rounded-full border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex flex-col items-center justify-center w-9 h-12 select-none">
                      <span className="w-5 h-3.5 overflow-hidden rounded-[2px]">
                        <img src="https://customer-assets.emergentagent.com/job_nextbil/artifacts/8dcp2q5e_Your%20paragraph%20text%20(3000%20x%203000%20px)%20(Logo)%20(8).png" alt="Iceland flag" className="w-full h-full object-cover" />
                      </span>
                      <span className="text-[10px] font-semibold text-[#044046] leading-tight">IS</span>
                    </div>
                  </div>
                </div>

                {/* Email Input - Rounded */}
                <div>
                  <Input
                    type="email"
                    placeholder={t("myPage.email")}
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className="w-full h-12 rounded-full border-gray-200 focus:border-[#ff833e] focus:ring-[#ff833e]"
                  />
                </div>

                {/* Button - Rounded */}
                <Button className="w-full bg-[#044046] hover:bg-[#033036] text-white text-lg py-3 rounded-full font-semibold">
                  {t("myPage.seeMyPage")}
                </Button>
              </div>

              {/* Register link */}
              <div className="space-y-2 pt-4">
                <p className="text-[#044046] text-base">
                  {t("myPage.sellQuestion")}
                </p>
                <a href="/" className="text-[#044046] underline text-base">
                  {t("myPage.registerCar")}
                </a>
              </div>
            </div>
          </div>

          {/* Dealer login - Separate colored container */}
          <div className="mt-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-center space-x-2 text-center">
              <img src="https://customer-assets.emergentagent.com/job_carshop-next/artifacts/ihr73ykn_Kaggi%20%282%29.png" alt="Kaggi logo" className="w-12 h-12" />
              <span className="text-[#044046]">
                {t("myPage.dealerQuestion")}
              </span>
              <a href="/dealer-login" className="text-[#044046] underline">
                {t("myPage.dealerLogin")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}