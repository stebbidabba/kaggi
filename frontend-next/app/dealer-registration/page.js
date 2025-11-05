"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "../../i18n";
import { Button, Input } from "../../ui";
import { Check, Eye, EyeOff } from "lucide-react";

export default function DealerRegistrationPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repeatPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    strength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  // Function to check if label should be visible
  const shouldLabelShow = (fieldName, fieldValue) => {
    // Show label floating when focused, hide when field has content but not focused
    if (fieldValue.length > 0 && focusedField !== fieldName) {
      return false; // Hide label when field has content and not focused
    }
    return true; // Show label in all other cases
  };

  // Function to check if label should be floating
  const shouldLabelFloat = (fieldName, fieldValue) => {
    return focusedField === fieldName;
  };

  // No need to hide header/footer - use default layout

  // Check password strength
  const checkPasswordStrength = (password) => {
    const strength = {
      length: password.length >= 12,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)
    };
    
    const strengthCount = Object.values(strength).filter(Boolean).length;
    strength.strength = strengthCount >= 4; // Medium or strong if 4+ criteria met
    
    setPasswordStrength(strength);
  };

  // Get password strength level
  const getPasswordStrengthLevel = () => {
    if (formData.password.length === 0) return null;
    
    const criteria = [
      passwordStrength.length,
      passwordStrength.lowercase,
      passwordStrength.uppercase,
      passwordStrength.number,
      passwordStrength.symbol
    ];
    
    const metCriteria = criteria.filter(Boolean).length;
    
    if (metCriteria <= 2 || formData.password.length < 8) {
      return { level: 'weak', text: t("dealerRegistration.tooWeak"), bars: 1, color: 'bg-red-500' };
    } else if (metCriteria <= 4 || formData.password.length < 12) {
      return { level: 'medium', text: t("dealerRegistration.medium"), bars: 2, color: 'bg-yellow-500' };
    } else {
      return { level: 'strong', text: t("dealerRegistration.strong"), bars: 3, color: 'bg-green-500' };
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to contact info page
    router.push('/dealer-contact-info');
  };

  // Validation function to check if form is complete
  const isFormValid = () => {
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.repeatPassword.trim() !== '' &&
      formData.password === formData.repeatPassword &&
      termsAccepted
    );
  };

  const getPasswordStrengthColor = () => {
    const metCriteria = Object.values(passwordStrength).filter(Boolean).length;
    if (metCriteria >= 5) return 'bg-green-500';
    if (metCriteria >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPasswordStrengthWidth = () => {
    const metCriteria = Object.values(passwordStrength).filter(Boolean).length;
    return `${(metCriteria / 6) * 100}%`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-lg w-full space-y-12">
          {/* Header Text */}
          <div className="text-left mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("dealerRegistration.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("dealerRegistration.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="mb-6 relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerRegistration.email")}
                value={formData.email}
                onChange={handleInputChange('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('email', formData.email) && (
                <label 
                  htmlFor="email" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('email', formData.email)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerRegistration.email")}
                </label>
              )}
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerRegistration.password")}
                value={formData.password}
                onChange={handleInputChange('password')}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('password', formData.password) && (
                <label 
                  htmlFor="password" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('password', formData.password)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerRegistration.password")}
                </label>
              )}
            </div>

            {/* Repeat Password */}
            <div className="mb-6 relative">
              <Input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerRegistration.repeatPassword")}
                value={formData.repeatPassword}
                onChange={handleInputChange('repeatPassword')}
                onFocus={() => setFocusedField('repeatPassword')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('repeatPassword', formData.repeatPassword) && (
                <label 
                  htmlFor="repeatPassword" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('repeatPassword', formData.repeatPassword)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerRegistration.repeatPassword")}
                </label>
              )}
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-6 mb-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-base font-medium text-gray-700">{t("dealerRegistration.passwordStrength")}</div>
                  {getPasswordStrengthLevel() && (
                    <div className="text-sm font-medium text-gray-600">
                      {getPasswordStrengthLevel().text}
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  {[1, 2, 3].map((barNumber) => {
                    const strengthLevel = getPasswordStrengthLevel();
                    const isActive = strengthLevel && barNumber <= strengthLevel.bars;
                    
                    return (
                      <div key={barNumber} className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            isActive ? strengthLevel.color : 'bg-gray-200'
                          }`}
                          style={{ width: isActive ? '100%' : '0%' }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Password Requirements */}
              <div className="space-y-3 text-base">
                <div className={`flex items-center space-x-3 ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.length ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.length && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.length")}</span>
                </div>
                
                <div className={`flex items-center space-x-3 ${passwordStrength.strength ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.strength ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.strength && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.strength")}</span>
                </div>
                
                <div className={`flex items-center space-x-3 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.lowercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.lowercase && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.lowercase")}</span>
                </div>
                
                <div className={`flex items-center space-x-3 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.uppercase ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.uppercase && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.uppercase")}</span>
                </div>
                
                <div className={`flex items-center space-x-3 ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.number ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.number && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.number")}</span>
                </div>
                
                <div className={`flex items-center space-x-3 ${passwordStrength.symbol ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passwordStrength.symbol ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {passwordStrength.symbol && <Check className="w-4 h-4" />}
                  </div>
                  <span>{t("dealerRegistration.requirements.symbol")}</span>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-4 mb-8">
              <div className="relative mt-1">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="sr-only"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <label
                  htmlFor="terms"
                  className={`flex items-center justify-center w-6 h-6 border-2 rounded cursor-pointer transition-colors duration-200 ${
                    termsAccepted 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {termsAccepted && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              </div>
              <label htmlFor="terms" className="text-lg text-gray-700 cursor-pointer">
                {t("dealerRegistration.termsAccept")}{' '}
                <Link href="/legal/terms" className="text-black underline hover:text-gray-800">
                  {t("dealerRegistration.termsLink")}
                </Link>{' '}
                {t("dealerRegistration.termsText")}
              </label>
            </div>

            {/* Submit Button */}
            <div className="mb-8">
              <button
                type="submit"
                className="w-full h-16 btn-orange font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                disabled={!isFormValid()}
              >
                <span className="text-xl">{t("dealerRegistration.nextButton")}</span>
              </button>
            </div>
          </form>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-500 mb-12">
            {t("dealerRegistration.recaptcha.text")}{' '}
            <Link href="/legal/privacy" className="underline hover:text-gray-700">
              {t("dealerRegistration.recaptcha.privacy")}
            </Link>{' '}
            {t("dealerRegistration.recaptcha.and")}{' '}
            <Link href="/legal/terms" className="underline hover:text-gray-700">
              {t("dealerRegistration.recaptcha.terms")}
            </Link>{' '}
            {t("dealerRegistration.recaptcha.apply")}.
          </div>
        </div>
      </main>
    </div>
  );
}