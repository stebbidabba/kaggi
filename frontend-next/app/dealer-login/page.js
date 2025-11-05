"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "../../i18n";
import { Button, Input } from "../../ui";
import { User } from "lucide-react";

export default function DealerLoginPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Hide header and footer on this page and prevent scrolling
  useEffect(() => {
    // Hide header
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }
    
    // Hide footer
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';

    // Cleanup function to restore when leaving
    return () => {
      if (header) {
        header.style.display = '';
      }
      if (footer) {
        footer.style.display = '';
      }
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple bypass for now - just redirect to dealer dashboard
    // TODO: Add proper authentication later
    console.log('Login attempt:', formData);
    
    // Redirect to dealer dashboard
    window.location.href = '/dealer-dashboard';
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center cursor-pointer">
          <img src="/kaggi-logo.png" alt="Kaggi" className="w-32 h-32 object-contain" />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="max-w-xl w-full">
          
          {/* Main white card with rounded corners */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            
            {/* Light blue header section */}
            <div className="bg-[#dbf1fa] px-8 py-8">
              <div className="flex items-start space-x-4">
                {/* Icon section - new image */}
                <div className="flex-shrink-0">
                  <img src="https://customer-assets.emergentagent.com/job_carshop-next/artifacts/l48d9261_Kaggi%20%286%29.png" alt="Car document" className="w-20 h-20" />
                </div>
                
                {/* Header text */}
                <div className="pt-1">
                  <h1 className="text-3xl font-bold text-[#044046] mb-2">
                    {t("dealerLogin.title")}
                  </h1>
                  <p className="text-[#044046] text-lg">
                    {t("dealerLogin.subtitle")}
                  </p>
                </div>
              </div>
            </div>

            {/* Form section */}
            <div className="px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="flex justify-center">
                  <Input
                    type="email"
                    placeholder={t("dealerLogin.email")}
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className="w-80 h-12 px-6 border border-gray-300 rounded-full focus:border-[#ff833e] focus:ring-1 focus:ring-[#ff833e] focus:outline-none text-base placeholder-gray-500"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="flex justify-center mb-8">
                  <Input
                    type="password"
                    placeholder={t("dealerLogin.password")}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className="w-80 h-12 px-6 border border-gray-300 rounded-full focus:border-[#ff833e] focus:ring-1 focus:ring-[#ff833e] focus:outline-none text-base placeholder-gray-500"
                    required
                  />
                </div>

                {/* Login Button - More rounded and narrower */}
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-80 bg-[#ff833e] hover:bg-[#e6732d] text-white text-lg font-medium py-3 h-12 rounded-full transition-colors"
                  >
                    {t("dealerLogin.loginButton")}
                  </Button>
                </div>
              </form>

              {/* Links row */}
              <div className="flex justify-center space-x-12 mt-8 text-base">
                <a href="#" className="text-[#044046] underline transition-colors">
                  {t("dealerLogin.forgotPassword")}
                </a>
                <Link href="/dealer-registration" className="text-[#044046] underline transition-colors">
                  {t("dealerLogin.register")}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}