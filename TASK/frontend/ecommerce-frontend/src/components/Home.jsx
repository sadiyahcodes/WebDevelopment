import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { products as mockProducts, categories } from '../data/products';

const Home = () => {
  const [products, setProducts] = useState(mockProducts);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds
  const { addToCart } = useCart();
  const { updateSearch, selectedCategory } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, secs };
  };

  const handleCategoryClick = (category) => {
    updateSearch('', category);
    navigate('/products');
  };

  const timeComponents = formatTime(timeLeft);

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Side - Categories (Mobile: Full width, Desktop: 20%) */}
          <div className="w-full lg:w-1/5">
            <h3 className="text-lg font-bold text-[#1C1C1C] mb-4 font-sans">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(1).map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`w-full text-left px-3 py-2 rounded text-sm font-sans transition-colors ${
                      index === 0
                        ? 'bg-blue-50 text-[#0D6EFD] font-medium'
                        : 'text-[#8B96A5] hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Center - Banner (Mobile: Full width, Desktop: 60%) */}
          <div className="w-full lg:w-3/5">
            <div className="relative h-48 lg:h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2 font-sans">Latest trending</h2>
                <p className="text-base lg:text-lg mb-4 font-sans">Electronic items</p>
                <button className="bg-[#0D6EFD] text-white px-4 lg:px-6 py-2 rounded-md font-medium hover:bg-blue-700 font-sans">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Cards (Mobile: Full width, Desktop: 20%) */}
          <div className="w-full lg:w-1/5 flex flex-col lg:flex-col gap-4">
            {/* User Welcome Card */}
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4">
              <h4 className="text-lg font-bold text-[#1C1C1C] mb-2 font-sans">Hi, user</h4>
              <p className="text-[#8B96A5] text-sm mb-4 font-sans">let's get started</p>
              <button
                onClick={() => navigate('/auth')}
                className="w-full bg-[#0D6EFD] text-white py-2 rounded-md font-medium hover:bg-blue-700 font-sans"
              >
                Join now
              </button>
            </div>

            {/* Get $10 Off Card */}
            <div className="bg-orange-500 text-white rounded-md p-4">
              <h4 className="text-lg font-bold mb-2 font-sans">Get $10 off</h4>
              <p className="text-sm mb-4 font-sans">when you purchase through app</p>
              <button className="w-full bg-white text-orange-500 py-2 rounded-md font-medium hover:bg-gray-50 font-sans">
                Get Coupon
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Deals & Offers Section */}
        <section className="my-10">
          <h3 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-sans">Deals and Offers</h3>
          <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
            {/* Left Side - Flash Sale */}
            <div className="w-full lg:w-1/4">
              <h4 className="text-xl font-bold text-[#1C1C1C] mb-2 font-sans">Flash Sale</h4>
              <p className="text-[#8B96A5] mb-4 font-sans">Up to 50% off on selected items</p>
              <div className="flex space-x-2 justify-center lg:justify-start">
                <div className="bg-gray-800 text-white px-2 lg:px-3 py-2 rounded text-center">
                  <div className="text-sm lg:text-lg font-bold font-sans">{timeComponents.days}</div>
                  <div className="text-xs font-sans">Days</div>
                </div>
                <div className="bg-gray-800 text-white px-2 lg:px-3 py-2 rounded text-center">
                  <div className="text-sm lg:text-lg font-bold font-sans">{timeComponents.hours}</div>
                  <div className="text-xs font-sans">Hours</div>
                </div>
                <div className="bg-gray-800 text-white px-2 lg:px-3 py-2 rounded text-center">
                  <div className="text-sm lg:text-lg font-bold font-sans">{timeComponents.minutes}</div>
                  <div className="text-xs font-sans">Min</div>
                </div>
                <div className="bg-gray-800 text-white px-2 lg:px-3 py-2 rounded text-center">
                  <div className="text-sm lg:text-lg font-bold font-sans">{timeComponents.secs}</div>
                  <div className="text-xs font-sans">Sec</div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {products.slice(0, 5).map(product => (
                  <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-md p-5 relative hover:shadow-md">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-sans">
                      -25%
                    </div>
                    <div className="w-full h-24 bg-gray-200 flex items-center justify-center mb-3 rounded overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-sans" style={{display: 'none'}}>
                        Product
                      </div>
                    </div>
                    <h4 className="font-semibold text-[#1C1C1C] text-sm mb-2 font-sans">{product.name}</h4>
                    <p className="text-lg font-semibold text-[#0D6EFD] font-sans">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2 w-full bg-[#0D6EFD] text-white py-1 px-3 rounded text-xs hover:bg-blue-700 font-sans"
                    >
                      Add to Cart
                    </button>
                    <button className="absolute top-2 left-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100">
                      <FaHeart className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Home & Outdoor Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <section className="my-10">
          <h3 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-sans">Home and Outdoor</h3>
          <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Left Side - Featured Image */}
            <div className="w-full lg:w-1/3">
              <div className="h-48 lg:h-64 bg-gray-100 rounded-md overflow-hidden mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format"
                  alt="Beautiful Home Decor and Outdoor Living"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                  <span className="text-white text-lg mb-4 font-sans font-semibold">Home & Outdoor</span>
                  <button
                    onClick={() => handleCategoryClick('Home & Outdoor')}
                    className="bg-[#0D6EFD] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 font-sans"
                  >
                    Source Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {products.slice(0, 8).map((product, index) => {
                  const homeImages = [
                    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop&auto=format', // Sofa
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&auto=format', // Dining table
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format', // Kitchen
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format', // Bedroom
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format', // Garden tools
                    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&auto=format', // Outdoor furniture
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&auto=format', // Home decor
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format'  // Outdoor equipment
                  ];
                  return (
                    <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-md p-4 hover:shadow-md">
                      <div className="w-full h-20 bg-gray-100 rounded mb-3 overflow-hidden">
                        <img
                          src={homeImages[index % homeImages.length]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-[#1C1C1C] text-sm mb-2 font-sans">{product.name}</h4>
                      <p className="text-[#0D6EFD] font-medium font-sans">From USD ${product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 w-full bg-[#0D6EFD] text-white py-1 px-3 rounded text-xs hover:bg-blue-700 font-sans"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Consumer Electronics Section */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <section className="my-10">
          <h3 className="text-2xl font-bold text-[#1C1C1C] mb-6 font-sans">Consumer Electronics</h3>
          <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6 flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* Left Side - Featured Image */}
            <div className="w-full lg:w-1/3">
              <div className="h-48 lg:h-64 bg-gray-100 rounded-md overflow-hidden mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format"
                  alt="Consumer Electronics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                  <span className="text-white text-lg mb-4 font-sans font-semibold">Electronics</span>
                  <button
                    onClick={() => handleCategoryClick('Consumer Electronics')}
                    className="bg-[#0D6EFD] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 font-sans"
                  >
                    Source Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Product Grid */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {products.slice(8, 16).map((product, index) => {
                  const electronicsImages = [
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop&auto=format',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop&auto=format'
                  ];
                  return (
                    <div key={product._id} className="bg-white border border-[#DEE2E7] rounded-md p-4 hover:shadow-md">
                      <div className="w-full h-20 bg-gray-100 rounded mb-3 overflow-hidden">
                        <img
                          src={electronicsImages[index % electronicsImages.length]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-[#1C1C1C] text-sm mb-2 font-sans">{product.name}</h4>
                      <p className="text-[#0D6EFD] font-medium font-sans">From USD ${product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 w-full bg-[#0D6EFD] text-white py-1 px-3 rounded text-xs hover:bg-blue-700 font-sans"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;