"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "../../i18n";
import { Button, Input } from "../../ui";

export default function DealerContactInfoPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    organizationNumber: '',
    dealerName: '',
    mobileNumber: '',
    streetAddress: '',
    postalCode: '',
    city: ''
  });
  const [focusedField, setFocusedField] = useState('');
  const [organizationValidation, setOrganizationValidation] = useState({
    status: null, // null, 'validating', 'valid', 'invalid'
    message: '',
    companyName: null
  });

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

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset organization validation when user types
    if (field === 'organizationNumber') {
      setOrganizationValidation({
        status: null,
        message: '',
        companyName: null
      });
    }
  };

  // Company validation function
  const validateOrganizationNumber = async (kennitala) => {
    if (!kennitala || kennitala.length !== 10) {
      return;
    }

    setOrganizationValidation({
      status: 'validating',
      message: 'Staðfesti fyrirtæki...',
      companyName: null
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/validate-company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kennitala: kennitala
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setOrganizationValidation({
          status: result.valid ? 'valid' : 'invalid',
          message: result.message,
          companyName: result.company_name || null
        });
      } else {
        setOrganizationValidation({
          status: 'invalid',
          message: result.detail || '❌ Villa við að staðfesta kennitölu.',
          companyName: null
        });
      }
    } catch (error) {
      console.error('Validation error:', error);
      setOrganizationValidation({
        status: 'invalid',
        message: '❌ Villa við að staðfesta kennitölu.',
        companyName: null
      });
    }
  };

  // Handle organization number blur
  const handleOrganizationBlur = () => {
    setFocusedField('');
    if (formData.organizationNumber && formData.organizationNumber.length === 10) {
      validateOrganizationNumber(formData.organizationNumber);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get vehicle data from localStorage (from previous step)
    const submissions = JSON.parse(localStorage.getItem('kaggi_submissions') || "[]");
    const latestSubmission = submissions[submissions.length - 1];
    
    if (!latestSubmission?.vehicle) {
      alert('Villa: Engar bílaupplýsingar fundust. Vinsamlegast byrjaðu aftur.');
      return;
    }

    try {
      console.log('Submitting dealer registration...');
      
      const registrationData = {
        ...formData,
        vehicle: {
          registrationNumber: latestSubmission.vehicle.registrationNumber,
          make: latestSubmission.vehicle.make,
          model: latestSubmission.vehicle.model,
          year: latestSubmission.vehicle.year,
          mileage: latestSubmission.km || latestSubmission.vehicle.mileage
        }
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dealers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Dealer registered successfully:', result.data);
        
        // Store success data
        localStorage.setItem('kaggi_registration_complete', JSON.stringify({
          ...result.data,
          timestamp: Date.now()
        }));

        // Redirect to success page or dealer login
        alert('Skráning tókst! Þú getur nú skráð þig inn á dealer dashboard.');
        window.location.href = '/dealer-login';
        
      } else {
        console.error('❌ Registration failed:', result.message);
        alert('Villa við skráningu: ' + result.message);
      }

    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Villa kom upp við skráningu. Reyndu aftur.');
    }
  };

  // Validation function to check if form is complete
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.surname.trim() !== '' &&
      formData.organizationNumber.trim() !== '' &&
      formData.dealerName.trim() !== '' &&
      formData.mobileNumber.trim() !== '' &&
      formData.streetAddress.trim() !== '' &&
      formData.postalCode.trim() !== '' &&
      formData.city.trim() !== ''
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-lg w-full space-y-12">
          {/* Header Text */}
          <div className="text-left mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("dealerContactInfo.title")}
            </h2>
            <p className="text-lg text-gray-600">
              {t("dealerContactInfo.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-6 relative">
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.firstName")}
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('firstName', formData.firstName) && (
                <label 
                  htmlFor="firstName" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('firstName', formData.firstName)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.firstName")}
                </label>
              )}
            </div>

            {/* Surname */}
            <div className="mb-6 relative">
              <Input
                id="surname"
                name="surname"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.surname")}
                value={formData.surname}
                onChange={handleInputChange('surname')}
                onFocus={() => setFocusedField('surname')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('surname', formData.surname) && (
                <label 
                  htmlFor="surname" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('surname', formData.surname)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.surname")}
                </label>
              )}
            </div>

            {/* Organization Number */}
            <div className="mb-6 relative">
              <Input
                id="organizationNumber"
                name="organizationNumber"
                type="text"
                required
                maxLength={10}
                className={`appearance-none rounded-full relative block w-full px-6 py-4 border placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 text-lg bg-white peer transition-all duration-200 ${
                  organizationValidation.status === 'valid' 
                    ? 'border-green-500 focus:ring-green-500 focus:border-green-500' 
                    : organizationValidation.status === 'invalid'
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                }`}
                placeholder={t("dealerContactInfo.organizationNumber")}
                value={formData.organizationNumber}
                onChange={handleInputChange('organizationNumber')}
                onFocus={() => setFocusedField('organizationNumber')}
                onBlur={handleOrganizationBlur}
              />
              {shouldLabelShow('organizationNumber', formData.organizationNumber) && (
                <label 
                  htmlFor="organizationNumber" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('organizationNumber', formData.organizationNumber)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.organizationNumber")}
                </label>
              )}
              
              {/* Validation Message */}
              {organizationValidation.status && organizationValidation.message && (
                <div className={`mt-2 text-sm font-medium ${
                  organizationValidation.status === 'valid' 
                    ? 'text-green-600' 
                    : organizationValidation.status === 'invalid'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}>
                  {organizationValidation.status === 'validating' && (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {organizationValidation.message}
                    </span>
                  )}
                  {organizationValidation.status !== 'validating' && organizationValidation.message}
                  {organizationValidation.companyName && (
                    <div className="text-xs text-gray-600 mt-1">
                      {organizationValidation.companyName}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dealer Name */}
            <div className="mb-6 relative">
              <Input
                id="dealerName"
                name="dealerName"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.dealerName")}
                value={formData.dealerName}
                onChange={handleInputChange('dealerName')}
                onFocus={() => setFocusedField('dealerName')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('dealerName', formData.dealerName) && (
                <label 
                  htmlFor="dealerName" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('dealerName', formData.dealerName)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.dealerName")}
                </label>
              )}
            </div>

            {/* Mobile Number with fixed +354 country code */}
            <div className="mb-6 relative">
              <div className="flex">
                {/* Fixed Country Code */}
                <div className="bg-white border border-gray-300 rounded-l-full px-4 py-4 text-lg text-gray-900 border-r-0 flex items-center">
                  +354
                </div>
                
                {/* Mobile Number Input */}
                <div className="flex-1 relative">
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    className="appearance-none rounded-r-full relative block w-full px-6 py-4 border border-gray-300 border-l-0 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                    placeholder={t("dealerContactInfo.mobileNumber")}
                    value={formData.mobileNumber}
                    onChange={handleInputChange('mobileNumber')}
                    onFocus={() => setFocusedField('mobileNumber')}
                    onBlur={() => setFocusedField('')}
                  />
                  {shouldLabelShow('mobileNumber', formData.mobileNumber) && (
                    <label 
                      htmlFor="mobileNumber" 
                      className={`absolute transition-all duration-200 pointer-events-none ${
                        shouldLabelFloat('mobileNumber', formData.mobileNumber)
                          ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                          : 'text-lg text-gray-500 top-4 left-6'
                      }`}
                    >
                      {t("dealerContactInfo.mobileNumber")}
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Street Address */}
            <div className="mb-6 relative">
              <Input
                id="streetAddress"
                name="streetAddress"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.streetAddress")}
                value={formData.streetAddress}
                onChange={handleInputChange('streetAddress')}
                onFocus={() => setFocusedField('streetAddress')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('streetAddress', formData.streetAddress) && (
                <label 
                  htmlFor="streetAddress" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('streetAddress', formData.streetAddress)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.streetAddress")}
                </label>
              )}
            </div>

            {/* Postal Code */}
            <div className="mb-6 relative">
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.postalCode")}
                value={formData.postalCode}
                onChange={handleInputChange('postalCode')}
                onFocus={() => setFocusedField('postalCode')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('postalCode', formData.postalCode) && (
                <label 
                  htmlFor="postalCode" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('postalCode', formData.postalCode)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.postalCode")}
                </label>
              )}
            </div>

            {/* City */}
            <div className="mb-6 relative">
              <Input
                id="city"
                name="city"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-6 py-4 border border-gray-300 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg bg-white peer transition-all duration-200"
                placeholder={t("dealerContactInfo.city")}
                value={formData.city}
                onChange={handleInputChange('city')}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField('')}
              />
              {shouldLabelShow('city', formData.city) && (
                <label 
                  htmlFor="city" 
                  className={`absolute transition-all duration-200 pointer-events-none ${
                    shouldLabelFloat('city', formData.city)
                      ? 'text-sm text-gray-600 -top-3 left-4 bg-white px-2 z-10' 
                      : 'text-lg text-gray-500 top-4 left-6'
                  }`}
                >
                  {t("dealerContactInfo.city")}
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-8">
              <button
                type="submit"
                className="w-full h-16 btn-orange font-semibold rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                disabled={!isFormValid()}
              >
                <span className="text-xl">{t("dealerContactInfo.nextButton")}</span>
              </button>
            </div>
          </form>

          {/* Footer Text */}
          <div className="text-center text-sm text-gray-500 mb-12">
            {t("dealerContactInfo.recaptcha.text")}{' '}
            <Link href="/legal/privacy" className="underline hover:text-gray-700">
              {t("dealerContactInfo.recaptcha.privacy")}
            </Link>{' '}
            {t("dealerContactInfo.recaptcha.and")}{' '}
            <Link href="/legal/terms" className="underline hover:text-gray-700">
              {t("dealerContactInfo.recaptcha.terms")}
            </Link>{' '}
            {t("dealerContactInfo.recaptcha.apply")}.
          </div>
        </div>
      </main>
    </div>
  );
}