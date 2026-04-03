import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { Grid, List, ChevronRight, Star, Filter, X } from 'lucide-react';
import { products as mockProducts, categories as mockCategories } from '../data/products';

const ProductList = () => {
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    brands: [],
    features: [],
    priceRange: [0, 2000],
    rating: 0
  });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addToCart } = useCart();
  const { searchQuery, selectedCategory } = useSearch();

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      const searchMatch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch = !selectedCategory || selectedCategory === 'All Categories' || product.category === selectedCategory;
      const filterCategoryMatch = filters.category.length === 0 || filters.category.includes(product.category);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const ratingMatch = product.rating >= filters.rating;
      return searchMatch && categoryMatch && filterCategoryMatch && brandMatch && priceMatch && ratingMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Pagination
  const totalItems = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center space-x-2 bg-white border border-[#DEE2E7] rounded-md px-4 py-3 w-full justify-center hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-1/4">
            <div className="bg-white border border-[#DEE2E7] rounded-md p-6">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-6">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Brands</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'HomeStyle'].map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleFilterChange('brands',
                          filters.brands.includes(brand)
                            ? filters.brands.filter(b => b !== brand)
                            : [...filters.brands, brand]
                        )}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Features</h4>
                <div className="space-y-2">
                  {['Wireless', 'Waterproof', 'Fast Charging', 'LED', 'Ergonomic'].map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => handleFilterChange('features',
                          filters.features.includes(feature)
                            ? filters.features.filter(f => f !== feature)
                            : [...filters.features, feature]
                        )}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-[#8B96A5] mt-2">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Ratings</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-[#8B96A5] ml-2">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Top Bar */}
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4 mb-6">
              <div className="flex justify-between items-center">
                {/* Breadcrumb and Count */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-[#8B96A5]">
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span>Products</span>
                  </div>
                  <span className="text-[#1C1C1C] font-medium">{totalItems} items</span>
                </div>

                {/* Sort and View Toggle */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-[#8B96A5]">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-[#DEE2E7] rounded px-3 py-1 text-sm"
                    >
                      <option value="name">Name</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>

                  <div className="flex border border-[#DEE2E7] rounded">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5]'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-[#0D6EFD] text-white' : 'text-[#8B96A5]'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {paginatedProducts.map(product => (
                <div key={product.id} className="bg-white border border-[#DEE2E7] rounded-md overflow-hidden hover:shadow-md">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="p-4">
                      <div className="w-full h-48 bg-gray-100 rounded mb-4 overflow-hidden relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs" style={{display: 'none'}}>
                          Product
                        </div>
                        {/* Free Shipping Tag */}
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Free Shipping
                        </div>
                      </div>
                      <h3 className="font-semibold text-[#1C1C1C] text-sm mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-[#8B96A5] ml-2">({product.rating})</span>
                      </div>
                      <p className="text-[#0D6EFD] font-bold text-lg">${product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full bg-[#0D6EFD] text-white py-2 rounded text-sm hover:bg-blue-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    // List View
                    <div className="flex p-4">
                      <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs" style={{display: 'none'}}>
                          Product
                        </div>
                      </div>
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold text-[#1C1C1C] mb-2">{product.name}</h3>
                        <p className="text-[#8B96A5] text-sm mb-2 overflow-hidden text-ellipsis" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{product.description}</p>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-[#8B96A5] ml-2">({product.rating})</span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-[#0D6EFD] font-bold text-xl mb-4">${product.price}</p>
                        <button className="bg-[#0D6EFD] text-white px-4 py-2 rounded text-sm hover:bg-blue-700 mb-2">
                          View Details
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="block w-full bg-gray-100 text-[#1C1C1C] py-2 rounded text-sm hover:bg-gray-200"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#8B96A5]">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-[#DEE2E7] rounded px-3 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded text-sm ${
                        currentPage === page
                          ? 'bg-[#0D6EFD] text-white'
                          : 'border border-[#DEE2E7] text-[#8B96A5] hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#1C1C1C]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Brands</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'HomeStyle'].map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleFilterChange('brands',
                          filters.brands.includes(brand)
                            ? filters.brands.filter(b => b !== brand)
                            : [...filters.brands, brand]
                        )}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Features</h4>
                <div className="space-y-2">
                  {['Wireless', 'Waterproof', 'Fast Charging', 'LED', 'Ergonomic'].map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature)}
                        onChange={() => handleFilterChange('features',
                          filters.features.includes(feature)
                            ? filters.features.filter(f => f !== feature)
                            : [...filters.features, feature]
                        )}
                        className="mr-2"
                      />
                      <span className="text-sm text-[#8B96A5]">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Price Range</h4>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-[#8B96A5] mt-2">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h4 className="font-semibold text-[#1C1C1C] mb-3">Ratings</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-[#8B96A5] ml-2">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Apply Filters Button */}
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#0D6EFD] text-white py-3 rounded-md font-medium hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;