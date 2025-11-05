"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "../../i18n";
import { STORAGE_KEYS } from "../../mock";
import { Button, Input } from "../../ui";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

export default function ConfirmPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [sendingVerification, setSendingVerification] = useState(false);
  
  // Postal codes lookup for Iceland
  const postalCodes = {
    "101": "Reykjavík", "102": "Reykjavík", "103": "Reykjavík", "104": "Reykjavík", "105": "Reykjavík",
    "107": "Reykjavík", "108": "Reykjavík", "109": "Reykjavík", "110": "Reykjavík", "111": "Reykjavík",
    "112": "Reykjavík", "113": "Reykjavík", "116": "Reykjavík", "121": "Reykjavík", "123": "Reykjavík",
    "124": "Reykjavík", "125": "Reykjavík", "127": "Reykjavík", "128": "Reykjavík", "129": "Reykjavík",
    "130": "Reykjavík", "132": "Reykjavík", "161": "Reykjavík", "162": "Reykjavík", "170": "Seltjarnarnes",
    "172": "Seltjarnarnes", "190": "Vogar", "191": "Vogar", "200": "Kópavogur", "201": "Kópavogur",
    "202": "Kópavogur", "203": "Kópavogur", "206": "Kópavogur", "210": "Garðabær", "212": "Garðabær",
    "220": "Hafnarfjörður", "221": "Hafnarfjörður", "222": "Hafnarfjörður", "225": "Garðabær (Álftanes)",
    "230": "Reykjanesbær", "232": "Reykjanesbær", "233": "Reykjanesbær", "235": "Keflavíkurflugvöllur",
    "240": "Grindavík", "241": "Grindavík", "245": "Sandgerði", "246": "Sandgerði", "250": "Garður",
    "251": "Garður", "260": "Reykjanesbær", "262": "Reykjanesbær", "270": "Mosfellsbær", "271": "Mosfellsbær",
    "276": "Kjós", "300": "Akranes", "301": "Akranes", "302": "Akranes", "310": "Borgarnes", "311": "Borgarnes",
    "320": "Reykholt í Borgarfirði", "340": "Stykkishólmur", "341": "Stykkishólmur", "342": "Stykkishólmur",
    "345": "Flatey á Breiðafirði", "350": "Grundarfjörður", "351": "Grundarfjörður", "355": "Ólafsvík",
    "356": "Snæfellsbær", "360": "Hellissandur", "370": "Búðardalur", "371": "Búðardalur", "380": "Reykhólahreppur",
    "381": "Reykhólahreppur", "400": "Ísafjörður", "401": "Ísafjörður", "410": "Hnífsdalur", "415": "Bolungarvík",
    "416": "Bolungarvík", "420": "Súðavík", "421": "Súðavík", "425": "Flateyri", "426": "Flateyri",
    "430": "Suðureyri", "431": "Suðureyri", "450": "Patreksfjörður", "451": "Patreksfjörður", "460": "Tálknafjörður",
    "461": "Tálknafjörður", "465": "Bíldudalur", "466": "Bíldudalur", "470": "Þingeyri", "471": "Þingeyri",
    "500": "Staður", "510": "Hólmavík", "511": "Hólmavík", "512": "Hólmavík", "520": "Drangsnes", "524": "Árneshreppur",
    "530": "Hvammstangi", "531": "Hvammstangi", "540": "Blönduós", "541": "Blönduós", "545": "Skagaströnd",
    "546": "Skagaströnd", "550": "Sauðárkrókur", "551": "Sauðárkrókur", "560": "Varmahlíð", "561": "Varmahlíð",
    "565": "Hofsós", "566": "Hofsós", "570": "Fljót", "580": "Siglufjörður", "581": "Siglufjörður",
    "600": "Akureyri", "601": "Akureyri", "602": "Akureyri", "603": "Akureyri", "604": "Akureyri", "605": "Akureyri",
    "606": "Akureyri", "607": "Akureyri", "610": "Grenivík", "616": "Grenivík", "611": "Grímsey", "620": "Dalvík",
    "621": "Dalvík", "625": "Ólafsfjörður", "626": "Ólafsfjörður", "630": "Hrísey", "640": "Húsavík", "641": "Húsavík",
    "645": "Fosshóll", "650": "Laugar", "660": "Mývatn", "670": "Kópasker", "671": "Kópasker", "675": "Raufarhöfn",
    "676": "Raufarhöfn", "680": "Þórshöfn", "681": "Þórshöfn", "685": "Bakkafjörður", "686": "Bakkafjörður",
    "690": "Vopnafjörður", "691": "Vopnafjörður", "700": "Egilsstaðir", "701": "Egilsstaðir", "710": "Seyðisfjörður",
    "711": "Seyðisfjörður", "715": "Mjóifjörður", "720": "Borgarfjörður (eystri)", "721": "Borgarfjörður (eystri)",
    "730": "Reyðarfjörður", "731": "Reyðarfjörður", "735": "Eskifjörður", "736": "Eskifjörður", "740": "Neskaupstaður",
    "741": "Neskaupstaður", "750": "Fáskrúðsfjörður", "751": "Fáskrúðsfjörður", "755": "Stöðvarfjörður",
    "756": "Stöðvarfjörður", "760": "Breiðdalsvík", "761": "Breiðdalsvík", "765": "Djúpivogur", "766": "Djúpivogur",
    "780": "Höfn í Hornafirði", "781": "Höfn í Hornafirði", "785": "Öræfi", "800": "Selfoss", "801": "Selfoss",
    "802": "Selfoss", "803": "Selfoss", "804": "Selfoss", "805": "Selfoss", "806": "Selfoss", "810": "Hveragerði",
    "815": "Þorlákshöfn", "816": "Ölfus", "820": "Eyrarbakki", "825": "Stokkseyri", "840": "Laugarvatn",
    "845": "Flúðir", "846": "Flúðir", "850": "Hella", "851": "Hella", "860": "Hvolsvöllur", "861": "Hvolsvöllur",
    "870": "Vík", "871": "Vík", "880": "Kirkjubæjarklaustur", "881": "Kirkjubæjarklaustur", "900": "Vestmannaeyjar",
    "902": "Vestmannaeyjar"
  };
  
  // Form state - empty by default for clean user experience
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+354",
    phoneNumber: "",
    email: "",
    postalCode: "",
    acceptTerms: false,
    newsletter: false,
    // Step 2 questions
    hasDamage: null,
    hasRepairs: null, 
    hasOtherInfo: null,
    hasSpecialOwnership: null,
    // Step 2 text inputs for "yes" answers
    damageDetails: "",
    repairDetails: "",
    otherDetails: "",
    ownershipDetails: "",
    // Ownership type selection when hasSpecialOwnership is "yes"
    ownershipType: null
  });

  // Validation state for showing errors
  const [validationErrors, setValidationErrors] = useState({});

  // Derived state for postal place
  const postalPlace = postalCodes[formData.postalCode] || "";

  // State for latest submission data from localStorage
  const [latest, setLatest] = useState({
    reg: "DAK71",
    km: "110000", 
    vehicle: {
      make: "Toyota",
      model: "Yaris",
      year: 2018
    }
  });

  // Effect to load data from localStorage on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const arr = JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
        if (arr.length > 0) {
          setLatest(arr[arr.length - 1]);
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        // Keep default values if error occurs
      }
    }
  }, []);

  const steps = [
    { id: 1, title: t("wizard.step1.title"), subtitle: t("wizard.step1.subtitle") },
    { id: 2, title: t("wizard.step2.title"), subtitle: t("wizard.step2.subtitle") },
    { id: 3, title: t("wizard.step3.title"), subtitle: t("wizard.step3.subtitle") }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep1 = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "Fornafn er nauðsynlegt";
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = "Eftirnafn er nauðsynlegt";
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Símanúmer er nauðsynlegt";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Tölvupóstur er nauðsynlegur";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Vinsamlegast sláðu inn gilt netfang";
    }
    
    if (!formData.postalCode.trim()) {
      errors.postalCode = "Póstnúmer er nauðsynlegt";
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = "Þú verður að samþykkja skilmála og kjör";
    }
    
    return errors;
  };

  const handleNext = async (e) => {
    if (e) e.preventDefault(); // Prevent default form submission if called from form
    
    if (currentStep === 1) {
      // Validate step 1 before proceeding
      const errors = validateStep1();
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return; // Don't proceed if there are validation errors
      }
      
      // Clear any previous validation errors
      setValidationErrors({});
      
      // Register car in Supabase when moving from Step 1 to Step 2
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        
        const carRegistrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          postalCode: formData.postalCode,
          carMake: latest.vehicle?.make || "Unknown",
          carModel: latest.vehicle?.model || "Unknown",
          carPlate: latest.reg || "",
          year: latest.vehicle?.year || new Date().getFullYear(),
          mileage: parseInt(latest.km) || 0
        };
        
        console.log('Registering car:', carRegistrationData);
        
        // Try Supabase first
        const carResponse = await fetch(`${backendUrl}/api/cars/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(carRegistrationData),
        });
        
        if (carResponse.ok) {
          const result = await carResponse.json();
          console.log('Car registered successfully in Supabase:', result);
        } else {
          console.error('Failed to register car in Supabase:', await carResponse.text());
        }
        
        // Car successfully registered to Supabase!
        
      } catch (error) {
        console.error('Error registering car:', error);
        
        console.error('Failed to register car to Supabase, but continuing with registration flow');
      }
      
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // When moving from Step 2 to Step 3, send welcome email
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        
        // Send welcome email using template #2 directly
        const emailResponse = await fetch(`${backendUrl}/api/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phoneNumber
          }),
        });

        if (!emailResponse.ok) {
          // Only log errors, not success messages
          console.error('Failed to send welcome email, but continuing to Step 3');
        }
      } catch (error) {
        console.error('Error adding contact to Brevo list:', error);
      }
      
      setCurrentStep(3);
    } else {
      // Final submission
      console.log("Final form submission:", formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePriceEstimate = async () => {
    setSendingVerification(true);
    
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      // Prepare phone number with country code
      let phoneNumber = formData.phoneNumber;
      const countryCode = formData.countryCode;
      
      // Combine country code with phone number
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = countryCode + phoneNumber;
      }
      
      // Send verification code
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
        // Redirect to verification page with phone number and redirect parameter
        router.push(`/verify?phone=${encodeURIComponent(phoneNumber)}&redirect=car-valuation`);
      } else {
        console.error('Failed to send verification code:', result.message);
        alert('Gat ekki sent staðfestingarkóða. Reyndu aftur.');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      alert('Villa kom upp. Reyndu aftur.');
    } finally {
      setSendingVerification(false);
    }
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      // For step 1, don't prevent form submission - let validation happen in handleNext
      return true;
    }
    if (currentStep === 2) {
      // Step 2 requires all questions answered
      const basicQuestionsAnswered = (
        formData.hasDamage !== null &&
        formData.hasRepairs !== null &&
        formData.hasOtherInfo !== null &&
        formData.hasSpecialOwnership !== null
      );
      
      // If user selected "yes" for special ownership, they must also select ownership type
      if (formData.hasSpecialOwnership === "yes" && formData.ownershipType === null) {
        return false;
      }
      
      return basicQuestionsAnswered;
    }
    // Always return true for other steps for testing
    return true;
  };

  return (
    <>
      {/* Custom Header - Override main layout */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fffaf0]" style={{ minHeight: '120px' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center" style={{ height: '70px' }}>
          <Link href="/" className="flex items-center">
            <img src="/kaggi-logo.png" alt="Kaggi" className="w-36 h-36 object-contain" />
          </Link>
        </div>
        
        {/* Header separator line */}
        <div className="w-full border-b border-gray-200"></div>
        
        {/* Full width white background for steps */}
        <div className="w-full bg-white">
          {/* Steps section in fixed header */}
          <div className="max-w-4xl mx-auto px-4">
            {/* Progress Steps */}
            <div className="flex items-center justify-center py-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold
                      ${currentStep > step.id || (currentStep === step.id && step.id === 3)
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.id 
                          ? 'bg-black text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {currentStep > step.id || (currentStep === step.id && step.id === 3) ? (
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M8 12L11 15L16 9" 
                            stroke="white" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </div>
                    <span className={`ml-3 text-lg font-medium ${currentStep >= step.id ? 'text-black' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mx-6 flex items-center">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={currentStep > step.id ? 'text-black' : 'text-gray-400'}
                      >
                        <path 
                          d="M7 14L12 10L7 6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom separator line */}
        <div className="w-full border-b border-gray-200"></div>
      </div>
      
      {/* Page content with top margin to account for fixed header */}
      <div className="pt-[120px] min-h-screen bg-white">

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step Header - Only show on step 1 */}
        {currentStep === 1 && (
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-[#044046] mb-4 leading-tight">
              Complete the registration<br />
              and get a price estimate<br />
              for your car
            </h1>
          </div>
        )}

        {/* Vehicle Info Card - Like nettbil with shadow - Only show on step 1 */}
        {latest && currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-10 mb-12 max-w-2xl mx-auto" style={{ boxShadow: '0 10px 20px -4px rgba(0, 0, 0, 0.15), 0 -4px 10px -2px rgba(0, 0, 0, 0.08), 4px 0 10px -2px rgba(0, 0, 0, 0.08), -4px 0 10px -2px rgba(0, 0, 0, 0.08)' }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{latest.vehicle?.make} {latest.vehicle?.model}</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#e7f9fc] rounded-full px-4 py-3 flex items-center gap-2 justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="18" viewBox="0 0 24 20" fill="none" className="text-teal-500">
                    <path d="M2 16h20c1 0 2-1 2-2v-4c0-1-1-2-2-2H2c-1 0-2 1-2 2v4c0 1 1 2 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M6 4h12c2 0 4 2 4 4h-20c0-2 2-4 4-4z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M8 10h2M14 10h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <rect x="3" y="16" width="2" height="2" fill="currentColor"/>
                    <rect x="19" y="16" width="2" height="2" fill="currentColor"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-900 text-lg">{latest.reg}</span>
              </div>
              <div className="bg-[#e7f9fc] rounded-full px-4 py-3 flex items-center gap-2 justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-teal-500">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M8 15a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="7" cy="10" r="1" fill="currentColor"/>
                    <circle cx="10" cy="7" r="1" fill="currentColor"/>
                    <circle cx="14" cy="7" r="1" fill="currentColor"/>
                    <circle cx="17" cy="10" r="1" fill="currentColor"/>
                    <circle cx="17" cy="14" r="1" fill="currentColor"/>
                    <circle cx="7" cy="14" r="1" fill="currentColor"/>
                    <path d="M12 12l4-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-900 text-lg">{parseInt(latest.km).toLocaleString()} km</span>
              </div>
              <div className="bg-[#e7f9fc] rounded-full px-4 py-3 flex items-center gap-2 justify-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="text-teal-500">
                    <rect x="3" y="4" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M6 2v4M12 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8h12" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="5" y="10" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="7.5" y="10" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="10" y="10" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="12.5" y="10" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="5" y="12.5" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="7.5" y="12.5" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="10" y="12.5" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="12.5" y="12.5" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="5" y="15" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="7.5" y="15" width="1.5" height="1.5" fill="currentColor"/>
                    <rect x="10" y="15" width="1.5" height="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-900 text-lg">{latest.vehicle?.year}</span>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* First Name - Full width with floating label */}
              <div className="relative">
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder=" "
                  className={`w-full h-16 px-4 py-5 border rounded-full focus:outline-none focus:ring-0 peer [&:not(:focus):not(:placeholder-shown)]:border-transparent [&:not(:focus):not(:placeholder-shown)]:shadow-none text-lg ${
                    validationErrors.firstName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-orange-400'
                  }`}
                />
                <label htmlFor="firstName" className="absolute left-4 top-5 text-gray-500 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:focus):not(:placeholder-shown)]:opacity-0 bg-white px-1 pointer-events-none">
                  Fornafn
                </label>
                {validationErrors.firstName && (
                  <p className="text-red-500 text-sm mt-2 ml-4">{validationErrors.firstName}</p>
                )}
              </div>
              
              {/* Last Name - Full width with floating label */}
              <div className="relative">
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder=" "
                  className={`w-full h-16 px-4 py-5 border rounded-full focus:outline-none focus:ring-0 peer [&:not(:focus):not(:placeholder-shown)]:border-transparent [&:not(:focus):not(:placeholder-shown)]:shadow-none text-lg ${
                    validationErrors.lastName 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-orange-400'
                  }`}
                />
                <label htmlFor="lastName" className="absolute left-4 top-5 text-gray-500 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:focus):not(:placeholder-shown)]:opacity-0 bg-white px-1 pointer-events-none">
                  Eftirnafn
                </label>
                {validationErrors.lastName && (
                  <p className="text-red-500 text-sm mt-2 ml-4">{validationErrors.lastName}</p>
                )}
              </div>

              {/* Country code and phone number on same line with floating labels */}
              <div className="flex gap-4">
                <div className="relative w-28">
                  <select 
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="w-full h-16 pl-4 pr-7 pt-3 pb-3 border border-gray-200 rounded-full focus:outline-none focus:ring-0 focus:border-orange-400 bg-white text-left"
                  >
                    <option value="+354">+354</option>
                    <option value="+47">+47</option>
                    <option value="+46">+46</option>
                    <option value="+45">+45</option>
                  </select>
                </div>
                
                <div className="flex-1 relative">
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder=" "
                    className={`w-full h-16 px-4 py-5 border rounded-full focus:outline-none focus:ring-0 peer text-lg ${
                      validationErrors.phoneNumber 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-orange-400'
                    }`}
                  />
                  <label htmlFor="phoneNumber" className="absolute left-4 top-5 text-gray-500 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:focus):not(:placeholder-shown)]:opacity-0 bg-white px-1 pointer-events-none">
                    Símanúmer
                  </label>
                  {validationErrors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-2 ml-4">{validationErrors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Email - Full width with floating label */}
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder=" "
                  className={`w-full h-16 px-4 py-5 border rounded-full focus:outline-none focus:ring-0 peer [&:not(:focus):not(:placeholder-shown)]:border-transparent [&:not(:focus):not(:placeholder-shown)]:shadow-none text-lg ${
                    validationErrors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-orange-400'
                  }`}
                />
                <label htmlFor="email" className="absolute left-4 top-5 text-gray-500 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:focus):not(:placeholder-shown)]:opacity-0 bg-white px-1 pointer-events-none">
                  Tölvupóstur
                </label>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-2 ml-4">{validationErrors.email}</p>
                )}
              </div>

              {/* Postal Code - Two fields like nettbil */}
              <div className="flex gap-4">
                <div className="relative w-32">
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder=" "
                    className={`w-full h-16 px-4 py-5 border rounded-full focus:outline-none focus:ring-0 peer [&:not(:focus):not(:placeholder-shown)]:border-transparent [&:not(:focus):not(:placeholder-shown)]:shadow-none text-lg ${
                      validationErrors.postalCode 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-orange-400'
                    }`}
                  />
                  <label htmlFor="postalCode" className="absolute left-4 top-5 text-gray-500 text-base transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-[:not(:focus):not(:placeholder-shown)]:opacity-0 bg-white px-1 pointer-events-none">
                    Póstnúmer
                  </label>
                  {validationErrors.postalCode && (
                    <p className="text-red-500 text-sm mt-2 ml-4 whitespace-nowrap">{validationErrors.postalCode}</p>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <div className="w-full h-16 px-4 pt-3 pb-3 border border-gray-200 rounded-full bg-gray-100 flex items-center text-gray-500 text-lg">
                    {postalPlace || "Postal code"}
                  </div>
                </div>
              </div>

              {/* Checkboxes - Larger and properly aligned */}
              <div className="space-y-6 mt-8">
                <div className="flex items-start space-x-4">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <label htmlFor="terms" className="text-base text-gray-700 leading-relaxed">
                      Ég samþykki <Link href="/legal/terms" className="text-gray-700 underline hover:text-gray-900">skilmála og kjör</Link> og að Kaggi má hafa samband við mig varðandi sölu bílsins míns.
                    </label>
                    {validationErrors.acceptTerms && (
                      <p className="text-red-500 text-sm mt-2">{validationErrors.acceptTerms}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                  />
                  <label htmlFor="newsletter" className="text-base text-gray-700 leading-relaxed">
                    Já, ég vil gerast áskrifandi að fréttabréfi Kaggi.
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8">
              <h1 className="text-5xl font-bold text-[#044046] text-center mb-12 leading-tight">
                {t("wizard.step2.formTitle")}
              </h1>
              
              {/* Question 1 - Damage */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#044046] mb-2">
                    {t("wizard.step2.questions.damage.title")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("wizard.step2.questions.damage.description")}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasDamage"
                        value="yes"
                        checked={formData.hasDamage === "yes"}
                        onChange={(e) => handleInputChange('hasDamage', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasDamage === "yes" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.yes")}</span>
                  </label>
                  
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasDamage"
                        value="no"
                        checked={formData.hasDamage === "no"}
                        onChange={(e) => handleInputChange('hasDamage', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasDamage === "no" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.no")}</span>
                  </label>
                </div>
                
                {/* Conditional text input for damage details */}
                {formData.hasDamage === "yes" && (
                  <div className="mt-4">
                    <textarea
                      value={formData.damageDetails}
                      onChange={(e) => handleInputChange('damageDetails', e.target.value)}
                      placeholder={t("wizard.step2.placeholders.damage")}
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-0 focus:border-orange-400 resize-none min-h-[120px] text-base"
                      rows={4}
                    />
                  </div>
                )}
              </div>

              {/* Question 2 - Repairs */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#044046] mb-2">
                    {t("wizard.step2.questions.repairs.title")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("wizard.step2.questions.repairs.description")}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasRepairs"
                        value="yes"
                        checked={formData.hasRepairs === "yes"}
                        onChange={(e) => handleInputChange('hasRepairs', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasRepairs === "yes" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.yes")}</span>
                  </label>
                  
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasRepairs"
                        value="no"
                        checked={formData.hasRepairs === "no"}
                        onChange={(e) => handleInputChange('hasRepairs', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasRepairs === "no" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.no")}</span>
                  </label>
                </div>
                
                {/* Conditional text input for repair details */}
                {formData.hasRepairs === "yes" && (
                  <div className="mt-4">
                    <textarea
                      value={formData.repairDetails}
                      onChange={(e) => handleInputChange('repairDetails', e.target.value)}
                      placeholder={t("wizard.step2.placeholders.repairs")}
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-0 focus:border-orange-400 resize-none min-h-[120px] text-base"
                      rows={4}
                    />
                  </div>
                )}
              </div>

              {/* Question 3 - Other info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#044046] mb-2">
                    {t("wizard.step2.questions.other.title")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("wizard.step2.questions.other.description")}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasOtherInfo"
                        value="yes"
                        checked={formData.hasOtherInfo === "yes"}
                        onChange={(e) => handleInputChange('hasOtherInfo', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasOtherInfo === "yes" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.yes")}</span>
                  </label>
                  
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasOtherInfo"
                        value="no"
                        checked={formData.hasOtherInfo === "no"}
                        onChange={(e) => handleInputChange('hasOtherInfo', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasOtherInfo === "no" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.no")}</span>
                  </label>
                </div>
                
                {/* Conditional text input for other details */}
                {formData.hasOtherInfo === "yes" && (
                  <div className="mt-4">
                    <textarea
                      value={formData.otherDetails}
                      onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                      placeholder={t("wizard.step2.placeholders.other")}
                      className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-0 focus:border-orange-400 resize-none min-h-[120px] text-base"
                      rows={4}
                    />
                  </div>
                )}
              </div>

              {/* Question 4 - Special ownership */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#044046] mb-2">
                    {t("wizard.step2.questions.ownership.title")}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t("wizard.step2.questions.ownership.description")}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasSpecialOwnership"
                        value="yes"
                        checked={formData.hasSpecialOwnership === "yes"}
                        onChange={(e) => handleInputChange('hasSpecialOwnership', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasSpecialOwnership === "yes" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.yes")}</span>
                  </label>
                  
                  <label className="flex items-center justify-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-full min-w-[120px] h-16 transition-colors bg-white hover:border-gray-300">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="hasSpecialOwnership"
                        value="no"
                        checked={formData.hasSpecialOwnership === "no"}
                        onChange={(e) => handleInputChange('hasSpecialOwnership', e.target.value)}
                        className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          border: '2px solid #d1d5db',
                          borderRadius: '50%',
                          outline: 'none',
                          backgroundColor: 'white'
                        }}
                      />
                      {formData.hasSpecialOwnership === "no" && (
                        <div 
                          className="absolute w-4 h-4 rounded-full pointer-events-none"
                          style={{ 
                            backgroundColor: '#fb923c',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      )}
                    </div>
                    <span className="text-lg font-medium text-gray-700">{t("wizard.step2.no")}</span>
                  </label>
                </div>
                
                {/* Conditional ownership type selection */}
                {formData.hasSpecialOwnership === "yes" && (
                  <div className="mt-6 space-y-4">
                    <h4 className="text-lg font-semibold text-[#044046]">
                      {t("wizard.step2.ownershipTypes.title")}
                    </h4>
                    
                    <div className="space-y-3">
                      {/* Estate option */}
                      <label className="flex items-center gap-3 cursor-pointer p-2">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="ownershipType"
                            value="estate"
                            checked={formData.ownershipType === "estate"}
                            onChange={(e) => handleInputChange('ownershipType', e.target.value)}
                            className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: '2px solid #d1d5db',
                              borderRadius: '50%',
                              outline: 'none',
                              backgroundColor: 'white'
                            }}
                          />
                          {formData.ownershipType === "estate" && (
                            <div 
                              className="absolute w-4 h-4 rounded-full pointer-events-none"
                              style={{ 
                                backgroundColor: '#fb923c',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-700">{t("wizard.step2.ownershipTypes.estate")}</span>
                      </label>

                      {/* Power of attorney option */}
                      <label className="flex items-center gap-3 cursor-pointer p-2">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="ownershipType"
                            value="powerOfAttorney"
                            checked={formData.ownershipType === "powerOfAttorney"}
                            onChange={(e) => handleInputChange('ownershipType', e.target.value)}
                            className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: '2px solid #d1d5db',
                              borderRadius: '50%',
                              outline: 'none',
                              backgroundColor: 'white'
                            }}
                          />
                          {formData.ownershipType === "powerOfAttorney" && (
                            <div 
                              className="absolute w-4 h-4 rounded-full pointer-events-none"
                              style={{ 
                                backgroundColor: '#fb923c',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-700">{t("wizard.step2.ownershipTypes.powerOfAttorney")}</span>
                      </label>

                      {/* Helping sell option */}
                      <label className="flex items-center gap-3 cursor-pointer p-2">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="ownershipType"
                            value="helpingSell"
                            checked={formData.ownershipType === "helpingSell"}
                            onChange={(e) => handleInputChange('ownershipType', e.target.value)}
                            className="w-6 h-6 focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              border: '2px solid #d1d5db',
                              borderRadius: '50%',
                              outline: 'none',
                              backgroundColor: 'white'
                            }}
                          />
                          {formData.ownershipType === "helpingSell" && (
                            <div 
                              className="absolute w-4 h-4 rounded-full pointer-events-none"
                              style={{ 
                                backgroundColor: '#fb923c',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                            />
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-700">{t("wizard.step2.ownershipTypes.helpingSell")}</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Text input removed as per user request */}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-12 max-w-4xl mx-auto">
              {/* Main Heading */}
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-[#044046]">
                  {t("wizard.step3.mainHeading")}
                </h1>
                <p className="text-xl font-medium text-[#044046]">
                  {t("wizard.step3.confirmationText")}
                </p>
              </div>

              {/* Price Estimate Card */}
              <div className="bg-white rounded-3xl py-16 px-12 max-w-xl mx-auto text-center space-y-8 shadow-2xl" style={{ boxShadow: '0 10px 20px -4px rgba(0, 0, 0, 0.15), 0 -4px 10px -2px rgba(0, 0, 0, 0.08), 4px 0 10px -2px rgba(0, 0, 0, 0.08), -4px 0 10px -2px rgba(0, 0, 0, 0.08)' }}>
                {/* Kr Icon */}
                <div className="flex justify-center">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_form-refinement/artifacts/tl27olb3_Kr.png" 
                    alt="Kr Icon" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-[#044046]">
                  {t("wizard.step3.priceEstimate.heading")}
                </h2>
                
                <p className="text-lg text-gray-800 leading-relaxed">
                  Sjáðu hvað við metum að bíllinn þinn gæti fengið í uppboðsrúndu hjá Kaggi!
                </p>
                
                <p className="text-lg text-gray-800 leading-relaxed">
                  Stundum höfum við ekki næg sögugögn til að gefa þér verðmat. Í því tilfelli mun ráðgjafi hafa samband við þig með verðmat.
                </p>
                
                <button 
                  onClick={handlePriceEstimate}
                  disabled={sendingVerification}
                  style={{ backgroundColor: '#d54000' }} 
                  className="hover:opacity-90 text-white font-medium px-8 py-4 rounded-full text-lg transition-opacity disabled:opacity-50"
                >
                  {sendingVerification ? 'Sendi kóða...' : t("wizard.step3.priceEstimate.loginButton")}
                </button>
              </div>

              {/* What Happens Next Section */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center text-[#044046]">
                  {t("wizard.step3.whatNext.heading")}
                </h2>
                
                <div className="space-y-6 max-w-xl mx-auto">
                  {/* Step 1 - Person Icon */}
                  <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center space-y-6">
                    <div className="flex justify-center">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_stepwise-email/artifacts/nofdozvc_Untitled%20design%20-%202025-09-28T152136.249.png" 
                        alt="Prufuakstur Icon" 
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-[#044046]">
                      {t("wizard.step3.whatNext.step1.title")}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {t("wizard.step3.whatNext.step1.description")}
                    </p>
                  </div>

                  {/* Step 2 - Kr Icon */}
                  <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center space-y-6">
                    <div className="flex justify-center">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_stepwise-email/artifacts/4qz4p00x_Untitled%20design%20-%202025-09-28T152116.896.png" 
                        alt="Uppboðsrúnda Icon" 
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-[#044046]">
                      {t("wizard.step3.whatNext.step2.title")}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {t("wizard.step3.whatNext.step2.description")}
                    </p>
                  </div>

                  {/* Step 3 - Car Icon */}
                  <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center space-y-6">
                    <div className="flex justify-center">
                      <img 
                        src="https://customer-assets.emergentagent.com/job_stepwise-email/artifacts/e2e0mixj_Untitled%20design%20-%202025-09-28T152052.860.png" 
                        alt="Bíll seldur Icon" 
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-[#044046]">
                      {t("wizard.step3.whatNext.step3.title")}
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed">
                      {t("wizard.step3.whatNext.step3.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Actions - Full width button that's disabled until terms accepted - Hide for Step 3 */}
          {currentStep !== 3 && (
            <form onSubmit={handleNext} className="pt-6">
              <Button
                type="submit"
                disabled={!isStepValid()}
                className={`w-full py-4 text-lg font-medium rounded-full transition-colors ${
                  !isStepValid()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-400 hover:bg-orange-500 text-white'
                }`}
              >
                {t("common.continue")}
              </Button>
            </form>
          )}
        </div>

        {/* Footer Info - Two lines with links - Hide for Step 3 */}
        {currentStep !== 3 && (
          <div className="mt-12 mb-16 text-center">
            <p className="text-sm text-gray-500">
              Þessi síða er vernduð af reCAPTCHA og <Link href="/legal/privacy" className="text-gray-500 underline hover:text-gray-700">persónuverndarstefnu</Link><br />
              Google og <Link href="/legal/terms" className="text-gray-500 underline hover:text-gray-700">þjónustuskilmálum</Link> gilda.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}