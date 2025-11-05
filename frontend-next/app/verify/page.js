"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "../../i18n";

export default function VerifyPage() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get phone number and redirect parameter from URL parameters
  const phoneNumber = searchParams.get('phone') || '';
  const redirectPage = searchParams.get('redirect') || 'price-estimate';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);

  // Focus management for code inputs
  const handleCodeChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError(t("common.smsVerify.errorAllDigits"));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          code: fullCode
        }),
      });

      const result = await response.json();

      if (result.success && result.valid) {
        // Code is valid - redirect to specified page or default to price-estimate
        router.push(`/${redirectPage}`);
      } else {
        setError(t("common.smsVerify.errorWrongCode"));
        setCode(['', '', '', '', '', '']);
        // Focus first input
        document.getElementById('code-0')?.focus();
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError(t("common.smsVerify.errorGeneral"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/send-verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear current code and show success message
        setCode(['', '', '', '', '', '']);
        // You could show a success toast here
        document.getElementById('code-0')?.focus();
      } else {
        setError(t("common.smsVerify.errorGeneral"));
      }
    } catch (error) {
      console.error('Resend error:', error);
      setError(t("common.smsVerify.errorGeneral"));
    } finally {
      setResending(false);
    }
  };

  // Auto-focus first input on load
  useEffect(() => {
    document.getElementById('code-0')?.focus();
  }, []);

  // Hide header and footer for this page
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Cleanup on unmount
    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Logo in top-left corner - larger */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center">
          <img src="/kaggi-logo.png" alt="Kaggi" className="w-32 h-32 object-contain" />
        </Link>
      </div>

      {/* Main content centered */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-xl">
          
          {/* Main container with extremely rounded border like nettbil - properly sized */}
          <div className="bg-white border border-gray-200 p-8 sm:p-10 shadow-sm mx-auto" style={{borderRadius: '40px'}}>
            
            {/* Message Icon - larger */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <img src="/message-icon.png" alt="Message" className="w-12 h-12" />
              </div>
            </div>

            {/* Header Text - exactly 2 lines - no wrapping */}
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 leading-relaxed px-2">
                <div className="whitespace-nowrap">{t("common.smsVerify.headerLine1")}</div>
                <div className="font-bold mt-1">{phoneNumber}</div>
              </h1>
              <p className="text-gray-600 text-base px-4">
                {t("common.smsVerify.useCodeText")}
              </p>
            </div>

            {/* Code Input Fields - responsive and properly spaced */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-6 px-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-medium border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0"
                  disabled={loading}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-center text-sm mb-4 px-4">
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading || code.join('').length !== 6}
              className={`w-full py-3 sm:py-4 text-white font-medium rounded-full transition-colors ${
                loading || code.join('').length !== 6
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {loading ? t("common.smsVerify.verifyingText") : t("common.smsVerify.continueButton")}
            </button>

            {/* Resend Code */}
            <div className="text-center mt-4">
              <button
                onClick={handleResendCode}
                disabled={resending}
                className="text-gray-800 text-base underline hover:no-underline disabled:opacity-50 px-4"
              >
                {resending ? t("common.smsVerify.resendingText") : t("common.smsVerify.resendText")}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}