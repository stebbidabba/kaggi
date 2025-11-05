"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "../../i18n";
import { Button } from "../../ui";
import { 
  Search, 
  Filter, 
  Car, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail, 
  Heart,
  HelpCircle,
  Eye,
  Calendar,
  ShoppingBag,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Gauge
} from "lucide-react";

export default function DealerDashboard() {
  const [cars, setCars] = useState([
    {
      id: 'mock-1',
      car_make: 'Suzuki',
      car_model: 'Swift',
      year: 2016,
      car_plate: 'AB123',
      mileage: 85000,
      color: 'White',
      status: 'active',
      seller_name: 'Stefán Jónsson',
      email: 'stefan@example.is',
      phone: '+3546921608',
      created_at: '2025-11-01T10:00:00Z'
    },
    {
      id: 'mock-2',
      car_make: 'Volkswagen',
      car_model: 'Golf',
      year: 2018,
      car_plate: 'CD456',
      mileage: 62000,
      color: 'Blue',
      status: 'active',
      seller_name: 'Guðrún Magnúsdóttir',
      email: 'gudrun@example.is',
      phone: '+3547777123',
      created_at: '2025-11-02T10:00:00Z'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [bidData, setBidData] = useState({});
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [showAuctionDetail, setShowAuctionDetail] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [dealerName, setDealerName] = useState("Bílasali Ehf.");
  const [dealerEmail, setDealerEmail] = useState("dealer@example.com");
  const [activeSection, setActiveSection] = useState("active-auctions");
  const [dashboardStats, setDashboardStats] = useState({
    active_auctions: 2,
    coming_cars: 0,
    my_bids: 0,
    favorites: 0,
    my_purchases: 0
  });
  const [favorites, setFavorites] = useState([]);
  const [dealerBids, setDealerBids] = useState([]);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [selectedInspectionCar, setSelectedInspectionCar] = useState(null);
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

  useEffect(() => {
    // Ensure loading state is cleared even if API calls fail
    const timeout = setTimeout(() => {
      console.log("🚨 Force clearing loading state after 3 seconds");
      setLoading(false);
    }, 3000);

    fetchData().finally(() => {
      clearTimeout(timeout);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    fetchSectionData();
  }, [activeSection]);

  const handleLogout = () => {
    // Clear any stored data and redirect to dealer login
    localStorage.removeItem('latest');
    router.push('/dealer-login');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("🔄 Starting fetchData...");
      // Fetch data with timeout to prevent hanging
      await Promise.race([
        Promise.all([
          fetchCars(),
          fetchDashboardStats(),
          fetchFavorites(),
          fetchDealerBids()
        ]),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 10000)
        )
      ]);
      console.log("✅ All data fetched successfully");
    } catch (error) {
      console.error("❌ Error in fetchData:", error);
      // Use mock data if API calls fail or timeout
      console.log("🔄 API timeout/error, keeping initial mock cars");
      // Don't overwrite cars - keep the initial state
      console.log("✅ Using initial mock car data");
    } finally {
      setLoading(false);
      console.log("✅ Loading state cleared");
    }
  };

  const fetchCars = async () => {
    try {
      console.log("🚗 Fetching cars...");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("🔗 Backend URL:", backendUrl);
      
      // If no backend URL, skip API call and keep mock data
      if (!backendUrl) {
        console.log("ℹ️ No backend URL configured, using mock data");
        return;
      }
      
      const response = await fetch(`${backendUrl}/api/cars`);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ API Response:', result);
        if (result.success && Array.isArray(result.cars)) {
          setCars(result.cars);
          console.log('✅ Loaded cars from API:', result.cars.length);
        } else {
          console.error('❌ API returned invalid format:', result);
          // Keep existing mock data instead of clearing
          console.log('ℹ️ Keeping existing cars data');
        }
      } else {
        const error = await response.text();
        console.error('❌ Failed to fetch cars (HTTP', response.status, '):', error);
        // Keep existing mock data instead of clearing
        console.log('ℹ️ Keeping existing cars data');
      }
    } catch (error) {
      console.error("❌ Network error fetching cars:", error);
      // Keep existing mock data instead of clearing
      console.log('ℹ️ Keeping existing cars data');
    }
  };

  const fetchDashboardStats = async () => {
    try {
      console.log("📊 Fetching dashboard stats...");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/dashboard/stats/${dealerEmail}`);
      
      if (response.ok) {
        const result = await response.json();
        setDashboardStats(result.stats || dashboardStats);
        console.log('✅ Loaded dashboard stats:', result.stats);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      console.log("❤️ Fetching favorites...");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/favorites/${dealerEmail}`);
      
      if (response.ok) {
        const result = await response.json();
        setFavorites(result.favorites || []);
        console.log('✅ Loaded favorites:', result.favorites?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchDealerBids = async () => {
    try {
      console.log("💰 Fetching dealer bids...");
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/bids/dealer/${dealerEmail}`);
      
      if (response.ok) {
        const result = await response.json();
        setDealerBids(result.bids || []);
        console.log('✅ Loaded dealer bids:', result.bids?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching dealer bids:", error);
    }
  };

  const fetchSectionData = async () => {
    // Refresh data when section changes
    switch (activeSection) {
      case 'favorites':
        await fetchFavorites();
        break;
      case 'my-bids':
        await fetchDealerBids();
        break;
      case 'active-auctions':
      case 'coming-cars':
        await fetchCars();
        break;
    }
  };

  const handleOpenAuction = (car) => {
    setSelectedAuction(car);
    setShowAuctionDetail(true);
    // Fetch bid history for this car
    fetchBidHistory(car.id);
  };

  const handleBidSubmit = async (carId) => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert("Vinsamlegast sláðu inn gilt verðtilboð");
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/bids/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: carId,
          dealer_name: dealerName,
          dealer_email: dealerEmail,
          bid_amount: parseInt(bidAmount)
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Tilboð sent inn!");
        setShowBidModal(false);
        setBidAmount("");
        setSelectedCar(null);
        // Refresh data
        fetchData();
        // Refresh bid history if in auction detail view
        if (selectedAuction) {
          fetchBidHistory(selectedAuction.id);
        }
      } else {
        const error = await response.text();
        alert(`Villa við að senda tilboð: ${error}`);
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Villa kom upp við að senda tilboð");
    }
  };

  const fetchBidHistory = async (carId) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/bids/car/${carId}`);
      
      if (response.ok) {
        const result = await response.json();
        setBidHistory(result.bids || []);
        console.log('✅ Loaded bid history:', result.bids?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching bid history:", error);
      setBidHistory([]);
    }
  };

  const handleToggleFavorite = async (carId) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const isFavorited = favorites.some(fav => fav.id === carId);
      
      const endpoint = isFavorited ? '/api/favorites/remove' : '/api/favorites/add';
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: carId,
          dealer_email: dealerEmail
        }),
      });

      if (response.ok) {
        await fetchFavorites();
        await fetchDashboardStats();
        alert(isFavorited ? t('dealerDashboard.actions.removedFromFavorites') : t('dealerDashboard.actions.addedToFavorites'));
      } else {
        const error = await response.text();
        alert(`Villa: ${error}`);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Villa kom upp");
    }
  };

  const getCurrentSectionData = () => {
    switch (activeSection) {
      case 'active-auctions':
        return cars.filter(car => car.status === 'active');
      case 'coming-cars':
        return cars.filter(car => car.status === 'pending');
      case 'favorites':
        return favorites;
      case 'my-bids':
        return dealerBids;
      case 'my-purchases':
        return cars.filter(car => car.status === 'sold');
      case 'faq':
        return [];
      default:
        return cars;
    }
  };

  const filteredData = getCurrentSectionData().filter(item => {
    if (activeSection === 'my-bids') {
      // For bids, search in car details
      const car = item.car;
      if (!car) return false;
      return car.car_make.toLowerCase().includes(searchTerm.toLowerCase()) ||
             car.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
             car.car_plate.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      // For cars
      const matchesSearch = 
        item.car_make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.car_model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.car_plate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || item.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    }
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      sold: "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    const statusLabels = {
      active: "Virkt uppboð",
      pending: "Í bið",
      sold: "Selt"
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium border rounded-full ${statusStyles[status] || statusStyles.active}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('is-IS', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + ' kr';
  };

  const renderAuctionDetailView = () => {
    if (!selectedAuction) return null;

    const mockHighestBid = Math.floor(Math.random() * 1000000) + 500000;
    const mockTimeRemaining = "1d : 5h : 23m";

    return (
      <div className="max-w-7xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={() => {
              setShowAuctionDetail(false);
              setSelectedAuction(null);
            }}
            variant="outline"
            className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-4 py-2 transition-colors"
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
{t('dealerDashboard.actions.backToList')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Car Images and Details */}
          <div className="lg:col-span-3">
            {/* Image Gallery - Smaller and more compact */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="h-[500px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <img 
                  src={`/cars/${selectedAuction.car_plate}.jpg`}
                  alt={`${selectedAuction.car_make} ${selectedAuction.car_model}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="text-center absolute inset-0 flex items-center justify-center flex-col" style={{display: 'none'}}>
                  <Car className="h-24 w-24 text-blue-400 mb-4" />
                  <p className="text-blue-600 text-lg font-medium">Engin mynd</p>
                </div>
                
                {/* Navigation arrows */}
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md">
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md">
                  <ChevronRight className="h-5 w-5" />
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  1 / 1
                </div>
              </div>
              
              {/* Inspection Report Button */}
              <div className="p-4">
                <button
                  onClick={() => {
                    setSelectedInspectionCar(selectedAuction);
                    setShowInspectionModal(true);
                  }}
                  className="w-full bg-[#ff833e] hover:bg-[#ff7a28] text-white py-3 px-4 rounded-lg transition-colors font-semibold"
                >
                  Skoðunarskýrsla
                </button>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedAuction.car_make} {selectedAuction.car_model} | Tekna | Skinn | CC | Bose | R.Kam
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.regNumber')}</p>
                  <p className="font-semibold">{selectedAuction.car_plate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.year')}</p>
                  <p className="font-semibold">{selectedAuction.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.vin')}</p>
                  <p className="font-semibold">SJNFAAZE0U6027257</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.volume')}</p>
                  <p className="font-semibold">N/A</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.mileage')}</p>
                  <p className="font-semibold">{selectedAuction.mileage?.toLocaleString() || 0} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.fuel')}</p>
                  <p className="font-semibold">Rafmagn</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.transmission')}</p>
                  <p className="font-semibold">Sjálfskiptur</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.equipment')}</p>
                  <p className="font-semibold">CC, Bose</p>
                </div>
              </div>

              {/* Seller Information */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t('dealerDashboard.auctionDetail.seller')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.name')}</p>
                    <p className="font-medium">{selectedAuction.seller_name || 'María Kristinsdóttir'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('dealerDashboard.auctionDetail.carDetails.email')}</p>
                    <p className="font-medium">{selectedAuction.email || 'maria@example.com'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bid History moved to right column */}
          </div>

          {/* Right Column - Nettbil Style Status/Bidding Panel */}
          <div className="lg:col-span-2">
            {/* Status and Bidding Section - First white box */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
              {/* Status Header - Nettbil Style */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Status</h3>
                  {selectedAuction.status === 'active' ? (
                    <span className="px-4 py-2 bg-red-400 text-white text-sm font-bold rounded-2xl uppercase shadow-sm">
                      {t('dealerDashboard.auctionDetail.status.outbid')}
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-red-400 text-white text-sm font-bold rounded-2xl uppercase shadow-sm">
                      {lang === 'is' ? 'UPPBOÐ LOKIÐ' : 'AUCTION ENDED'}
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('dealerDashboard.auctionDetail.highestBid')}</p>
                    <p className="text-3xl font-bold text-green-600">{formatPrice(mockHighestBid)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t('dealerDashboard.auctionDetail.timeRemaining')}</p>
                    <p className="text-xl font-bold text-red-600">{mockTimeRemaining}</p>
                  </div>
                </div>
              </div>

              {/* Bidding Form - Nettbil Style */}
              {selectedAuction.status === 'active' && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('dealerDashboard.auctionDetail.placeBid')}</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">{t('dealerDashboard.auctionDetail.bidAmount')}</label>
                    {/* Nettbil-style rounded bid input box: minus left, amount center (gray), plus right - NO BORDER */}
                    <div className="flex items-center bg-white rounded-full overflow-hidden shadow-sm">
                      {/* Minus button - left side with white background */}
                      <button 
                        onClick={() => setBidAmount((prev) => Math.max(0, (parseInt(prev) || 0) - 1000))}
                        className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-600 text-2xl font-bold transition-colors border-r border-gray-200"
                      >
                        -
                      </button>
                      
                      {/* Amount input - center with gray background */}
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="flex-1 px-4 py-3 text-lg text-center bg-gray-100 border-0 focus:outline-none focus:ring-0"
                        placeholder="Upphæð"
                      />
                      
                      {/* Plus button - right side with white background */}
                      <button 
                        onClick={() => setBidAmount((prev) => (parseInt(prev) || 0) + 1000)}
                        className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-white hover:bg-gray-50 text-gray-600 text-2xl font-bold transition-colors border-l border-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">{t('dealerDashboard.auctionDetail.suggestion')} {formatPrice(mockHighestBid + 12000)} ({t('dealerDashboard.auctionDetail.minimumBid')})</p>
                  </div>

                  {/* Quick Bid Buttons - Nettbil Style */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button 
                      onClick={() => setBidAmount(mockHighestBid + 12000)}
                      className="px-4 py-3 text-sm font-medium border-2 border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      + 12.000 kr
                    </button>
                    <button 
                      onClick={() => setBidAmount(mockHighestBid + 36000)}
                      className="px-4 py-3 text-sm font-medium border-2 border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      + 36.000 kr
                    </button>
                    <button 
                      onClick={() => setBidAmount(mockHighestBid + 60000)}
                      className="px-4 py-3 text-sm font-medium border-2 border-orange-300 text-orange-600 rounded-xl hover:bg-orange-50 transition-colors"
                    >
                      + 60.000 kr
                    </button>
                  </div>

                  {/* Bid Actions - Nettbil Style - Side by Side Pills */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleBidSubmit(selectedAuction.id)}
                      className="w-full bg-orange-400 hover:bg-orange-500 text-white py-4 text-lg font-semibold rounded-full transition-colors shadow-sm"
                      disabled={!bidAmount || parseFloat(bidAmount) <= mockHighestBid}
                    >
                      {t('dealerDashboard.auctionDetail.placeBid')}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-orange-400 text-orange-600 hover:bg-orange-50 py-4 text-lg font-semibold rounded-full transition-colors"
                    >
                      {t('dealerDashboard.auctionDetail.autoBid')}
                    </Button>
                  </div>
                  
                  {/* What is auto bid link - centered under the auto bid button */}
                  <div className="flex justify-end mt-3">
                    <div className="w-1/2 flex justify-center">
                      <button className="text-black hover:text-gray-700 underline text-sm">
                        {t('dealerDashboard.auctionDetail.whatIsAutoBid')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
              
            {/* Bid History - Separate white box with spacing */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{t('dealerDashboard.auctionDetail.bidHistory')}</h3>
              </div>
              <div className="p-6">
                {bidHistory.length > 0 ? (
                  <div className="space-y-3">
                    {bidHistory.map((bid, index) => (
                      <div key={bid.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{bid.dealer_name}</p>
                          <p className="text-xs text-gray-600">
                            {new Date(bid.created_at).toLocaleDateString('is-IS')} • {new Date(bid.created_at).toLocaleTimeString('is-IS')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 text-sm">{formatPrice(bid.bid_amount)}</p>
                          {index === 0 && <p className="text-xs text-green-600">{t('dealerDashboard.auctionDetail.highestBid')}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">{t('dealerDashboard.auctionDetail.noBidsYet')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: '#044046' }}
          ></div>
          <p className="text-gray-600">Hleður bílum...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Villa: {error}</p>
          <Button onClick={fetchCars}>Reyna aftur</Button>
        </div>
      </div>
    );
  }

  const renderSectionContent = () => {
    // Show auction detail view
    if (showAuctionDetail && selectedAuction) {
      return renderAuctionDetailView();
    }
    
    if (activeSection === 'faq') {
      const faqData = t('dealerDashboard.faq.questions');
      return (
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('dealerDashboard.faq.title')}</h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl">
        {/* Search and Filter */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={t('dealerDashboard.search.placeholder')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {activeSection !== 'my-bids' && activeSection !== 'favorites' && (
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="all">{t('dealerDashboard.search.allStatuses')}</option>
                  <option value="active">{t('dealerDashboard.search.activeAuction')}</option>
                  <option value="pending">{t('dealerDashboard.search.pending')}</option>
                  <option value="sold">{t('dealerDashboard.search.sold')}</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeSection === 'my-bids' ? (
            // Render bids
            filteredData.length > 0 ? (
              filteredData.map((bid) => (
                <div key={bid.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-green-800 font-medium">{formatPrice(bid.bid_amount)}</p>
                      <p className="text-green-600 text-sm">Mitt tilboð</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {bid.car?.car_make || 'N/A'} {bid.car?.car_model || 'N/A'}
                      </h3>
                      <p className="text-gray-600">{bid.car?.year || 'N/A'} • {bid.car?.car_plate || 'N/A'}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Tilboð sent: {new Date(bid.created_at).toLocaleDateString('is-IS')}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Tilboðsupphæð: {formatPrice(bid.bid_amount)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{t('dealerDashboard.empty.noBids')}</p>
              </div>
            )
          ) : (
            // Render cars - Nettbil style preview cards
            filteredData.length > 0 ? (
              filteredData.map((car) => (
                <div key={car.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                     onClick={() => handleOpenAuction(car)}>
                  {/* Car Image - Top of card */}
                  <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                    <img 
                      src={`/cars/${car.car_plate}.jpg`}
                      alt={`${car.car_make} ${car.car_model}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                    <div className="text-center absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                      <div>
                        <Car className="h-16 w-16 text-blue-400 mx-auto mb-2" />
                        <p className="text-blue-600 text-sm">Engin mynd</p>
                      </div>
                    </div>
                    
                    {/* Status Ribbon - Long Corner Banner */}
                    <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                      <div className={`absolute top-2 -right-10 transform rotate-45 px-16 py-1 text-white text-xs font-bold text-center uppercase ${
                        car.status === 'active' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}
                      style={{
                        backgroundColor: car.status === 'active' ? '#22C55E' : '#EF4444',
                        fontSize: '13px'
                      }}>
                        {car.status === 'active' 
                          ? (lang === 'is' ? 'VIRKT UPPBOÐ' : 'ACTIVE AUCTION')
                          : (lang === 'is' ? 'UPPBOÐ LOKIÐ' : 'AUCTION ENDED')
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    {/* Car Model and Year */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                          {car.car_make} {car.car_model}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{car.year}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleToggleFavorite(car.id);
                        }}
                        className={`p-1 rounded ${
                          favorites.some(fav => fav.id === car.id)
                            ? 'text-red-500 hover:text-red-700'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${favorites.some(fav => fav.id === car.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Mileage */}
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Gauge className="h-4 w-4 mr-1" />
                      <span>{car.mileage ? car.mileage?.toLocaleString() : "Ekki tilgreint"}</span>
                    </div>
                    
                    {/* Highest Bid (Mock for now) */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700">{t('dealerDashboard.auctionDetail.highestBid')}</p>
                      <p className="text-lg font-bold text-green-600">{formatPrice(Math.floor(Math.random() * 1000000) + 500000)}</p>
                    </div>
                    
                    {/* Action Button */}
                    {car.status === 'active' && (
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleOpenAuction(car);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors shadow-sm font-semibold"
                      >
                        {t('dealerDashboard.actions.openAuction')}
                      </Button>
                    )}
                    
                    {car.status === 'pending' && (
                      <Button disabled className="w-full bg-gray-100 text-gray-500">
                        Í bið
                      </Button>
                    )}
                    
                    {car.status === 'sold' && (
                      <Button disabled className="w-full bg-gray-100 text-gray-500">
                        Seldur
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">{t('dealerDashboard.empty.noCars')}</p>
                <p className="text-gray-400 text-sm">{t('dealerDashboard.empty.tryChangingFilters')}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const sidebarItems = [
    {
      id: 'active-auctions',
      label: t('dealerDashboard.sidebar.activeAuctions'),
      count: dashboardStats.active_auctions,
      icon: Eye,
      iconColor: 'text-teal-600'
    },
    {
      id: 'coming-cars',
      label: t('dealerDashboard.sidebar.comingCars'),
      count: dashboardStats.coming_cars,
      icon: Calendar,
      iconColor: 'text-teal-600'
    },
    {
      id: 'my-bids',
      label: t('dealerDashboard.sidebar.myBids'),
      count: dashboardStats.my_bids,
      icon: DollarSign,
      iconColor: 'text-teal-600'
    },
    {
      id: 'favorites',
      label: t('dealerDashboard.sidebar.favorites'),
      count: dashboardStats.favorites,
      icon: Heart,
      iconColor: 'text-teal-600'
    },
    {
      id: 'my-purchases',
      label: t('dealerDashboard.sidebar.myPurchases'),
      count: dashboardStats.my_purchases,
      icon: ShoppingBag,
      iconColor: 'text-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as Car Valuation Page */}
      <div className="flex justify-between items-center p-6 shadow-sm">
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
            {t('dealerDashboard.logout')}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Nettbil style */}
        <div className="w-64 bg-gray-50 min-h-screen">
          <div className="p-4 pt-6 pl-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className={`font-medium text-base ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                    </div>
                    
                    {item.count !== null && (
                      <span className={`text-sm font-semibold ${
                        isActive 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          <div className="p-6">
            {renderSectionContent()}
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Bjóða í {selectedCar.car_make} {selectedCar.car_model}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tilboðsupphæð (ISK)
                </label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="T.d. 2500000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nafn bílasala
                </label>
                <input
                  type="text"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Netfang bílasala
                </label>
                <input
                  type="email"
                  value={dealerEmail}
                  onChange={(e) => setDealerEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  setShowBidModal(false);
                  setBidAmount("");
                  setSelectedCar(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Hætta við
              </Button>
              <Button
                onClick={() => handleBidSubmit(selectedCar.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Senda tilboð
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Inspection Report Modal */}
      {showInspectionModal && selectedInspectionCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowInspectionModal(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-[#ff833e] text-white p-6 rounded-t-lg">
              <h2 className="text-2xl font-bold mb-2">
                Skoðunarskýrsla
              </h2>
              <p className="text-white/90">
                {selectedInspectionCar.car_make} {selectedInspectionCar.car_model} {selectedInspectionCar.year}
              </p>
              <p className="text-sm text-white/80">
                Skráningarnúmer: {selectedInspectionCar.car_plate}
              </p>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Inspection Date and Status */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Skoðunardagsetning</p>
                    <p className="font-semibold text-gray-900">15. október 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Næsta skoðun</p>
                    <p className="font-semibold text-gray-900">15. október 2027</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 bg-green-500 text-white font-bold rounded-lg">
                      SAMÞYKKT
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Technical Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tæknilegar upplýsingar</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                  <div>
                    <p className="text-gray-600">Skráningarnúmer</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.car_plate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Verksmiðjunúmer</p>
                    <p className="font-semibold text-gray-900">SJNFAAZE0U6{Math.floor(Math.random() * 100000)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Framleiðandi/Tegund</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.car_make} {selectedInspectionCar.car_model}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Árgerð</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Eldsneyti</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.car_make === 'Suzuki' ? 'Bensín' : 'Bensín/Rafmagn'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kílómetrafjöldi</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.mileage?.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Búnaður</p>
                    <p className="font-semibold text-gray-900">Sjálfskiptur</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Litur</p>
                    <p className="font-semibold text-gray-900">{selectedInspectionCar.color || 'Hvítur'}</p>
                  </div>
                </div>
              </div>

              {/* Inspection Results - Detailed */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Niðurstöður skoðunar</h3>
                
                {/* Hemlar (Brakes) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">1. Hemlar</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Framhemlaklossar</span>
                      <span className="text-gray-900 font-medium">7mm (mörk: 3mm) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Afturhemlaklossar</span>
                      <span className="text-gray-900 font-medium">5mm (mörk: 3mm) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Hemlabúnaður og slöngur</span>
                      <span className="text-gray-900 font-medium">Óskert ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Hemlukraftur</span>
                      <span className="text-gray-900 font-medium">652 N/kg (krafa: 500) ✓</span>
                    </div>
                  </div>
                </div>

                {/* Stýri og fjöðrun (Steering & Suspension) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">2. Stýri og fjöðrun</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Stýrisendi og búnaður</span>
                      <span className="text-gray-900 font-medium">Óskert, engin fæðing ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Höggdeyfar</span>
                      <span className="text-gray-900 font-medium">Virkir, engin leki ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Fjöðrandi hlutar</span>
                      <span className="text-gray-900 font-medium">Góður stuðningur ✓</span>
                    </div>
                  </div>
                </div>

                {/* Ljósabúnaður (Lighting) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">3. Ljósabúnaður</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Framljós, hátt og lágt</span>
                      <span className="text-gray-900 font-medium">Virka, rétt stillt ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Bremsu- og stefnuljós</span>
                      <span className="text-gray-900 font-medium">Öll virk ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Baklýsing og bakljós</span>
                      <span className="text-gray-900 font-medium">Í lagi ✓</span>
                    </div>
                  </div>
                </div>

                {/* Útblástur (Emissions) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">4. Útblástur</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• CO gildi (kol)óxíð)</span>
                      <span className="text-gray-900 font-medium">0.21% (mörk: 0.5%) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• HC gildi (kolvetni)</span>
                      <span className="text-gray-900 font-medium">89 ppm (mörk: 200) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Lambda (súrefni)</span>
                      <span className="text-gray-900 font-medium">1.01 (mörk: 0.97-1.03) ✓</span>
                    </div>
                  </div>
                </div>

                {/* Dekk og hjól (Tires & Wheels) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">5. Dekk og hjól</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                      ATHUGASEMD
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Mynstursdýpt, framhjól</span>
                      <span className="text-gray-900 font-medium">4.5mm (mörk: 1.6mm) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Mynstursdýpt, afturhjól</span>
                      <span className="text-gray-900 font-medium">5.2mm (mörk: 1.6mm) ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Ástand dekka</span>
                      <span className="text-yellow-600 font-medium">Mælt með nýjum dekkjum innan 6 mán. ⚠</span>
                    </div>
                  </div>
                </div>

                {/* Karossería og undirvagn (Body & Undercarriage) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">6. Karossería og burðarvirki</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Burðarvirki og viðgerðir</span>
                      <span className="text-gray-900 font-medium">Óskert, engar óleyfilegar viðg. ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Tæringar og ryð</span>
                      <span className="text-gray-900 font-medium">Lítilsháttar yfirborðsryð ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Festingar og svigur</span>
                      <span className="text-gray-900 font-medium">Allar í lagi ✓</span>
                    </div>
                  </div>
                </div>

                {/* Innrétting og öryggisbúnaður */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                    <h4 className="font-semibold text-gray-900">7. Innrétting og öryggisbúnaður</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      SAMÞYKKT
                    </span>
                  </div>
                  <div className="pl-4 space-y-1 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Öryggisbelti</span>
                      <span className="text-gray-900 font-medium">Öll virk, læsingar í lagi ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Loftpúðar (airbag)</span>
                      <span className="text-gray-900 font-medium">Engin viðvörun á töflu ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Framrúða og rúðuþurrkur</span>
                      <span className="text-gray-900 font-medium">Heil rúða, þurrkur virkar ✓</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">• Púkar og horn</span>
                      <span className="text-gray-900 font-medium">Virka eðlilega ✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspector Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Athugasemdir skoðunarmanns</h3>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm">
                  <p className="text-gray-700 mb-2">
                    <strong>Mælt með viðhaldi:</strong> Framhjóladekk byrja að vera slitin og mælt er með endurnýjun innan 6 mánaða. 
                    Lítilsháttar yfirborðsryð á neðri hluta undirstells, ekki burðarvirki. Mælt með ryðvörn.
                  </p>
                  <p className="text-gray-700">
                    <strong>Almennt ástand:</strong> Bíllinn er í góðu viðhaldi miðað við aldur og ekna kílómetra. 
                    Engar alvarlegar athugasemdir. Öll kerfi virka sem skyldi.
                  </p>
                </div>
              </div>

              {/* Test Results Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Samantekt prófana</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">6</p>
                    <p className="text-xs text-gray-600">Samþykkt</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-xs text-gray-600">Athugasemd</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-red-600">0</p>
                    <p className="text-xs text-gray-600">Hafnað</p>
                  </div>
                </div>
              </div>

              {/* Inspector Info */}
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600">
                  <p><strong>Skoðunarmaður:</strong> Jón Þór Sigurðsson</p>
                  <p><strong>Skoðunarstöð:</strong> Bifreiðaskoðun Íslands - Reykjavík</p>
                  <p><strong>Leyfisnúmer:</strong> BS-2024-{Math.floor(Math.random() * 1000)}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowInspectionModal(false)}
                className="w-full bg-[#ff833e] hover:bg-[#ff7a28] text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              >
                Loka
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}