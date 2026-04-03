import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  User,
  MessageCircle,
  Package,
  ShoppingCart,
  Search,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Globe,
  DollarSign
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

const Header = () => {
  const { totalItems } = useCart();
  const { updateSearch, selectedCategory } = useSearch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isShipToOpen, setIsShipToOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const location = useLocation();
  const navigate = useNavigate();

  const shipToRef = useRef(null);
  const languageRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shipToRef.current && !shipToRef.current.contains(event.target)) {
        setIsShipToOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearch(searchInput, categoryFilter);
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    updateSearch('', category);
    navigate('/products');
  };

  // Dropdown data
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
    'Australia', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Netherlands', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'South Korea', 'Singapore', 'New Zealand', 'Ireland',
    'Belgium', 'Austria', 'Switzerland', 'Portugal', 'Poland', 'Czech Republic', 'Hungary',
    'Greece', 'Turkey', 'South Africa', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Ecuador',
    'Uruguay', 'Paraguay', 'Bolivia', 'Venezuela', 'Costa Rica', 'Panama', 'Guatemala',
    'El Salvador', 'Honduras', 'Nicaragua', 'Belize', 'Bahamas', 'Jamaica', 'Trinidad and Tobago',
    'Barbados', 'Saint Lucia', 'Grenada', 'Saint Vincent and the Grenadines', 'Antigua and Barbuda',
    'Dominica', 'Saint Kitts and Nevis', 'Haiti', 'Dominican Republic', 'Cuba', 'Puerto Rico'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Swedish',
    'Norwegian', 'Danish', 'Finnish', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic',
    'Hindi', 'Bengali', 'Turkish', 'Greek', 'Polish', 'Czech', 'Hungarian', 'Romanian',
    'Bulgarian', 'Croatian', 'Slovenian', 'Slovak', 'Lithuanian', 'Latvian', 'Estonian',
    'Ukrainian', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Filipino', 'Swahili'
  ];

  const currencies = [
    'USD - US Dollar', 'EUR - Euro', 'GBP - British Pound', 'CAD - Canadian Dollar',
    'AUD - Australian Dollar', 'JPY - Japanese Yen', 'CHF - Swiss Franc', 'CNY - Chinese Yuan',
    'INR - Indian Rupee', 'BRL - Brazilian Real', 'MXN - Mexican Peso', 'RUB - Russian Ruble',
    'KRW - South Korean Won', 'SGD - Singapore Dollar', 'NZD - New Zealand Dollar',
    'ZAR - South African Rand', 'TRY - Turkish Lira', 'SEK - Swedish Krona', 'NOK - Norwegian Krone',
    'DKK - Danish Krone', 'PLN - Polish Złoty', 'CZK - Czech Koruna', 'HUF - Hungarian Forint',
    'ILS - Israeli Shekel', 'AED - UAE Dirham', 'SAR - Saudi Riyal', 'THB - Thai Baht',
    'VND - Vietnamese Dong', 'IDR - Indonesian Rupiah', 'MYR - Malaysian Ringgit',
    'PHP - Philippine Peso', 'EGP - Egyptian Pound', 'KES - Kenyan Shilling', 'NGN - Nigerian Naira'
  ];

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsShipToOpen(false);
    // In a real app, this would update user preferences
    alert(`Shipping location changed to ${country}`);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
    // In a real app, this would change the app language
    alert(`Language changed to ${language}`);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.split(' - ')[0]);
    setIsLanguageOpen(false);
    // In a real app, this would change currency and update prices
    alert(`Currency changed to ${currency}`);
  };

  return (
    <header className="bg-white border-b border-[#DEE2E7] font-sans">
      {/* Main Header - Desktop */}
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#1C1C1C] font-sans">
            Ecommerce
          </div>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="flex items-center border border-[#DEE2E7] rounded-md overflow-hidden">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-3 border-r border-[#DEE2E7] bg-gray-50 text-sm font-sans"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Home & Kitchen</option>
                <option>Sports & Outdoors</option>
                <option>Home & Office</option>
                <option>Fashion</option>
              </select>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-3 text-sm font-sans focus:outline-none"
              />
              <button type="submit" className="bg-[#0D6EFD] text-white px-6 py-3 flex items-center space-x-2 hover:bg-blue-700">
                <Search className="w-4 h-4" />
                <span className="font-sans">Search</span>
              </button>
            </form>
          </div>

          {/* Icons */}
          <div className="flex space-x-6">
            <Link to="/profile" className="flex flex-col items-center text-[#8B96A5] hover:text-[#1C1C1C] group">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs font-sans">Profile</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center text-[#8B96A5] hover:text-[#1C1C1C] group">
              <MessageCircle className="w-6 h-6 mb-1" />
              <span className="text-xs font-sans">Message</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center text-[#8B96A5] hover:text-[#1C1C1C] group">
              <Package className="w-6 h-6 mb-1" />
              <span className="text-xs font-sans">Orders</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-[#8B96A5] hover:text-[#1C1C1C] group relative">
              <ShoppingCart className="w-6 h-6 mb-1" />
              <span className="text-xs font-sans">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9017] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Settings Bar - Below Navigation */}
        <div className="border-t border-[#DEE2E7] mt-3 pt-3">
          <div className="flex items-center justify-end space-x-6">
            {/* Ship To Dropdown */}
            <div className="relative" ref={shipToRef}>
              <button
                onClick={() => {
                  setIsShipToOpen(!isShipToOpen);
                  setIsLanguageOpen(false);
                }}
                className="flex items-center space-x-2 text-sm text-[#8B96A5] hover:text-[#1C1C1C] py-1"
              >
                <MapPin className="w-4 h-4" />
                <span className="font-sans">Ship to {selectedCountry}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isShipToOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-[#DEE2E7] rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs text-[#8B96A5] font-medium mb-2 px-2">SELECT COUNTRY</div>
                    {countries.map((country) => (
                      <button
                        key={country}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded ${
                          selectedCountry === country ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language & Currency Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => {
                  setIsLanguageOpen(!isLanguageOpen);
                  setIsShipToOpen(false);
                }}
                className="flex items-center space-x-2 text-sm text-[#8B96A5] hover:text-[#1C1C1C] py-1"
              >
                <Globe className="w-4 h-4" />
                <span className="font-sans">{selectedLanguage}, {selectedCurrency}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-1 w-80 bg-white border border-[#DEE2E7] rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-4">
                    {/* Languages */}
                    <div className="mb-4">
                      <div className="text-xs text-[#8B96A5] font-medium mb-2">LANGUAGE</div>
                      <div className="max-h-32 overflow-y-auto">
                        {languages.map((language) => (
                          <button
                            key={language}
                            onClick={() => handleLanguageSelect(language)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded mb-1 ${
                              selectedLanguage === language ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                            }`}
                          >
                            {language}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Currencies */}
                    <div>
                      <div className="text-xs text-[#8B96A5] font-medium mb-2">CURRENCY</div>
                      <div className="max-h-32 overflow-y-auto">
                        {currencies.map((currency) => (
                          <button
                            key={currency}
                            onClick={() => handleCurrencySelect(currency)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded mb-1 ${
                              selectedCurrency === currency.split(' - ')[0] ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                            }`}
                          >
                            {currency}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        {/* Top Mobile Bar */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#1C1C1C] p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="text-xl font-bold text-[#1C1C1C] font-sans">
            Ecommerce
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2">
            <ShoppingCart className="w-6 h-6 text-[#1C1C1C]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF9017] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="flex items-center border border-[#DEE2E7] rounded-md overflow-hidden">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-3 text-sm font-sans focus:outline-none"
            />
            <button type="submit" className="bg-[#0D6EFD] text-white px-4 py-3 hover:bg-blue-700">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#DEE2E7] shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              {/* Navigation Links */}
              <nav className="space-y-3">
                <Link
                  to="/products"
                  className={`block font-medium font-sans py-2 ${
                    isActive('/products') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All category
                </Link>
                <Link
                  to="/"
                  className={`block font-medium font-sans py-2 ${
                    isActive('/') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/cart"
                  className={`block font-medium font-sans py-2 ${
                    isActive('/cart') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart
                </Link>
              </nav>

              {/* User Actions */}
              <div className="border-t border-[#DEE2E7] pt-4 space-y-3">
                <button className="flex items-center space-x-3 w-full text-left text-[#1C1C1C] hover:text-[#0D6EFD] py-2">
                  <User className="w-5 h-5" />
                  <span className="font-sans">Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-left text-[#1C1C1C] hover:text-[#0D6EFD] py-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-sans">Messages</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-left text-[#1C1C1C] hover:text-[#0D6EFD] py-2">
                  <Package className="w-5 h-5" />
                  <span className="font-sans">Orders</span>
                </button>
              </div>

              {/* Location & Language - Functional Dropdowns */}
              <div className="border-t border-[#DEE2E7] pt-4 space-y-3">
                {/* Ship To Dropdown */}
                <div className="relative" ref={shipToRef}>
                  <button
                    onClick={() => {
                      setIsShipToOpen(!isShipToOpen);
                      setIsLanguageOpen(false);
                    }}
                    className="flex items-center justify-between w-full text-[#8B96A5] hover:text-[#1C1C1C] py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-sans">Ship to</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-sans">{selectedCountry}</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>

                  {isShipToOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#DEE2E7] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <div className="text-xs text-[#8B96A5] font-medium mb-2 px-2">SELECT COUNTRY</div>
                        {countries.slice(0, 10).map((country) => (
                          <button
                            key={country}
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded ${
                              selectedCountry === country ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                            }`}
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Language & Currency Dropdown */}
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => {
                      setIsLanguageOpen(!isLanguageOpen);
                      setIsShipToOpen(false);
                    }}
                    className="flex items-center justify-between w-full text-[#8B96A5] hover:text-[#1C1C1C] py-2"
                  >
                    <span className="text-sm font-sans">Language</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-sans">{selectedLanguage}, {selectedCurrency}</span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>

                  {isLanguageOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#DEE2E7] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="p-4">
                        {/* Languages */}
                        <div className="mb-4">
                          <div className="text-xs text-[#8B96A5] font-medium mb-2">LANGUAGE</div>
                          <div className="max-h-32 overflow-y-auto">
                            {languages.slice(0, 5).map((language) => (
                              <button
                                key={language}
                                onClick={() => handleLanguageSelect(language)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded mb-1 ${
                                  selectedLanguage === language ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                                }`}
                              >
                                {language}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Currencies */}
                        <div>
                          <div className="text-xs text-[#8B96A5] font-medium mb-2">CURRENCY</div>
                          <div className="max-h-32 overflow-y-auto">
                            {currencies.slice(0, 5).map((currency) => (
                              <button
                                key={currency}
                                onClick={() => handleCurrencySelect(currency)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded mb-1 ${
                                  selectedCurrency === currency.split(' - ')[0] ? 'bg-blue-50 text-[#0D6EFD] font-medium' : 'text-[#1C1C1C]'
                                }`}
                              >
                                {currency}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row - Desktop Navigation */}
      <div className="hidden md:block max-w-[1200px] mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Navigation Links */}
          <nav className="flex space-x-8">
            <Link
              to="/products"
              className={`font-medium font-sans transition-colors ${
                isActive('/products') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
              }`}
            >
              All category
            </Link>
            <Link
              to="/"
              className={`font-medium font-sans transition-colors ${
                isActive('/') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className={`font-medium font-sans transition-colors ${
                isActive('/cart') ? 'text-[#0D6EFD]' : 'text-[#1C1C1C] hover:text-[#0D6EFD]'
              }`}
            >
              Cart
            </Link>
          </nav>

          {/* Ship to Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[#8B96A5]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-sans">Ship to</span>
              <div className="flex items-center space-x-1 border border-[#DEE2E7] rounded px-2 py-1 cursor-pointer hover:border-[#0D6EFD]">
                <span className="text-sm font-sans">🇺🇸</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
            <div className="border-l border-[#DEE2E7] h-6"></div>
            <div className="flex items-center space-x-1 text-[#8B96A5] cursor-pointer hover:text-[#1C1C1C]">
              <span className="text-sm font-sans">English, USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;