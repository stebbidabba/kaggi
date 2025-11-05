"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "../../i18n";
import { ChevronDown } from "lucide-react";

export default function CarValuation() {
  const [activeTab, setActiveTab] = useState("overview");
  const [forceRender, setForceRender] = useState(0);

  const [carData, setCarData] = useState({
    make: "Toyota",
    model: "Yaris",
    year: "2018",
    licensePlate: "AB123",
    mileage: "50000"
  });
  const [faqExpanded, setFaqExpanded] = useState({});
  const { lang, t, setLang } = useI18n();
  const router = useRouter();

  // Hide header and footer on mount
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

  // Load car data from localStorage submissions (from form)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Get data from submissions array (same as confirm page)
        const submissions = JSON.parse(localStorage.getItem('nb_clone_submissions') || '[]');
        if (submissions.length > 0) {
          const latest = submissions[submissions.length - 1];
          setCarData({
            make: latest.vehicle?.make || "Toyota",
            model: latest.vehicle?.model || "Yaris",
            year: latest.vehicle?.year || "2018", 
            licensePlate: latest.reg || "AB123",
            mileage: latest.km || "50000"
          });
        } else {
          // Fallback mock data
          setCarData({
            make: "Toyota",
            model: "Yaris",
            year: "2018", 
            licensePlate: "AB123",
            mileage: "50000"
          });
        }
      } catch (error) {
        console.error('Error reading car data from localStorage:', error);
        // Fallback data on error
        setCarData({
          make: "Toyota",
          model: "Yaris",
          year: "2018",
          licensePlate: "AB123", 
          mileage: "50000"
        });
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear any stored data and redirect to homepage
    localStorage.removeItem('latest');
    router.push('/');
  };

  const handleStartAuction = () => {
    // Future implementation for starting auction
    alert('Auction starting soon!');
  };

  const toggleFaq = (index) => {
    setFaqExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const tabs = [
    { id: 'overview', label: t('carValuation.tabs.overview') },
    { id: 'test-report', label: t('carValuation.tabs.testReport') },
    { id: 'bidding-round', label: t('carValuation.tabs.biddingRound') }
  ];

  const faqs = [
    {
      question: t('carValuation.faq.questions.howLong.question'),
      answer: t('carValuation.faq.questions.howLong.answer')
    },
    {
      question: t('carValuation.faq.questions.cost.question'),
      answer: t('carValuation.faq.questions.cost.answer')
    },
    {
      question: t('carValuation.faq.questions.liability.question'),
      answer: t('carValuation.faq.questions.liability.answer')
    },
    {
      question: t('carValuation.faq.questions.price.question'),
      answer: t('carValuation.faq.questions.price.answer')
    },
    {
      question: t('carValuation.faq.questions.loan.question'),
      answer: t('carValuation.faq.questions.loan.answer')
    }
  ];

  if (!carData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: '#d54000' }}
          ></div>
          <p className="text-gray-600">
            {t('carValuation.loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/kaggi-logo.png" alt="Kaggi" className="h-8" />
        </div>

        {/* Language switcher and Logout */}
        <div className="flex items-center gap-4">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setLang('is')}
              className={`px-3 py-1 text-sm ${lang === 'is' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              IS
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-sm ${lang === 'en' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              EN
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            {t('carValuation.logout')}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs - nettbil.no style */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-2 rounded-full max-w-md mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setForceRender(prev => prev + 1);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors flex-1 text-center ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div key={forceRender}>
        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* Car Information - Only on Overview */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#044046] mb-6">
                {carData.make} {carData.model}
              </h1>
              
              <div className="flex justify-center items-center gap-6 text-[#044046] mb-8 text-base font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#044046]" fill="currentColor" viewBox="0 0 20 20" strokeWidth="2">
                    <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v1h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v5a2 2 0 01-2 2H6a2 2 0 01-2-2V10H3a1 1 0 01-1-1V6a1 1 0 011-1h1V4zm2 0v1h8V4H6zm-1 3v8h10V7H5z"/>
                  </svg>
                  <span className="font-semibold">{carData.licensePlate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#044046]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span className="font-semibold">{parseInt(carData.mileage).toLocaleString()} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#044046]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span className="font-semibold">{carData.year}</span>
                </div>
              </div>
            </div>

            {/* Nettbil-style Next Step Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-xl mx-auto relative pt-12 mt-20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-10 flex items-center justify-center">
                <img src="/next-step-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover rounded-full" />
                <span className="relative text-[#044046] text-base font-medium z-10">
                  {t('carValuation.nextStep.title')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#044046] mb-4 leading-tight">
                {t('carValuation.nextStep.description')}
              </h2>
              <p className="text-[#044046] mb-6 leading-relaxed text-base font-medium">
                If you want to get started with the sale faster, you can book a<br />
                free bidding round here. After the bidding round, you choose<br />
                whether to accept the highest bid or not.
              </p>
              <button
                onClick={handleStartAuction}
                className="w-full text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-[0.98] active:scale-95"
                style={{ 
                  backgroundColor: '#d54000',
                  boxShadow: '0 4px 12px rgba(213, 64, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#b53600';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#d54000';
                }}
              >
                {t('carValuation.nextStep.startAuction')}
              </button>
            </div>

            {/* Why sell with Kaggi - Only in Overview */}
            <div className="mb-12 max-w-md mx-auto mt-16">
              <h2 className="text-xl font-bold text-center text-[#044046] mb-8">
                {t('carValuation.whySell.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img src="/shield-icon.png" alt="Shield" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#044046] leading-relaxed">
                      Kaggi is safe and non-binding - you can<br />
                      withdraw from the sales process at any time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img src="/handshake-icon.png" alt="Handshake" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#044046] leading-relaxed">
                      We take care of the entire sales process, all you have to do is deliver your car to the test center.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img src="/smiley-icon.png" alt="Smiley" className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#044046] leading-relaxed">
                      Release the liability for complaints - we take responsibility once the car is sold!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ - Only in Overview */}
            <div>
              <h2 className="text-xl font-bold text-left text-[#044046] mb-4 pl-36">
                {t('carValuation.faq.title')}
              </h2>
              <div className="max-w-md mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 text-left flex justify-between items-center"
                    >
                      <span className="text-[#044046] pr-4">{faq.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform flex-shrink-0 ${
                          faqExpanded[index] ? 'rotate-180' : ''
                        }`}
                        style={{ color: '#d54000' }}
                      />
                    </button>
                    {faqExpanded[index] && (
                      <div className="pb-4">
                        <p className="text-[#044046] leading-relaxed text-sm">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'test-report' ? (
          <div className="text-center py-16">
            {/* Profile Icon Circle - PNG Image */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/4.png" 
                alt="Notaðir bílar - Used cars"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#044046] mb-4">
              {t('carValuation.testReport.noReport')}
            </h2>
            <p className="text-[#044046] mb-12 leading-relaxed max-w-md mx-auto">
              {t('carValuation.testReport.description')}
            </p>

            {/* Test Report FAQs */}
            <div className="max-w-md mx-auto">
              {t('carValuation.testReport.faqs').map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(`test-${index}`)}
                    className="w-full py-4 text-left flex justify-between items-center"
                  >
                    <span className="text-[#044046] pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        faqExpanded[`test-${index}`] ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#d54000' }}
                    />
                  </button>
                  {faqExpanded[`test-${index}`] && (
                    <div className="pb-4">
                      <p className="text-[#044046] leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'bidding-round' ? (
          <div className="text-center py-16" key={activeTab}>
            {/* Bidding Round Icon - PNG Image */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/bidding-round.png" 
                alt="16 ný tilboð - 16 new offers"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#044046] mb-4">
              {t('carValuation.biddingRound.notStarted')}
            </h2>
            <p className="text-[#044046] mb-12 leading-relaxed max-w-md mx-auto">
              {t('carValuation.biddingRound.description')}
            </p>

            {/* Bidding Round FAQs */}
            <div className="max-w-md mx-auto">
              {t('carValuation.biddingRound.faqs').map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleFaq(`bidding-${index}`)}
                    className="w-full py-4 text-left flex justify-between items-center"
                  >
                    <span className="text-[#044046] pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        faqExpanded[`bidding-${index}`] ? 'rotate-180' : ''
                      }`}
                      style={{ color: '#d54000' }}
                    />
                  </button>
                  {faqExpanded[`bidding-${index}`] && (
                    <div className="pb-4">
                      <p className="text-[#044046] leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </div>
  );
}