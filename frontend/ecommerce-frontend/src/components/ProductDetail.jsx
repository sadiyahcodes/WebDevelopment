import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ChevronRight, Shield, MessageCircle, User, Truck, Info } from 'lucide-react';
import { products as mockProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // Find product by ID from mock data
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== parseInt(id))
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) return (
    <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  );

  const images = [product.image, product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-[#8B96A5]">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span>Products</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#1C1C1C]">{product.title}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-5 order-1">
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4">
              {/* Main Image */}
              <div className="w-full h-80 lg:h-96 bg-gray-100 rounded-md overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                      selectedImage === index ? 'border-[#0D6EFD]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Product Info */}
          <div className="lg:col-span-4 order-2">
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6">
              <h1 className="text-2xl font-bold text-[#1C1C1C] mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-[#8B96A5] ml-2">({product.rating})</span>
              </div>

              {/* Price Tiers */}
              <div className="mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-[#8B96A5]">50-100 pcs</span>
                  <span className="text-lg font-bold text-[#0D6EFD]">${(product.price * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-[#8B96A5]">100-500 pcs</span>
                  <span className="text-lg font-bold text-[#0D6EFD]">${(product.price * 0.85).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#8B96A5]">500+ pcs</span>
                  <span className="text-lg font-bold text-[#0D6EFD]">${(product.price * 0.8).toFixed(2)}</span>
                </div>
              </div>

              {/* Specs Table */}
              <div className="border border-[#DEE2E7] rounded-md overflow-hidden mb-6">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-[#DEE2E7]">
                      <td className="px-4 py-3 bg-gray-50 font-medium text-[#1C1C1C]">Model</td>
                      <td className="px-4 py-3 text-[#8B96A5]">{product.title.split(' ')[0]}</td>
                    </tr>
                    <tr className="border-b border-[#DEE2E7]">
                      <td className="px-4 py-3 bg-gray-50 font-medium text-[#1C1C1C]">Style</td>
                      <td className="px-4 py-3 text-[#8B96A5]">Modern</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 bg-gray-50 font-medium text-[#1C1C1C]">Material</td>
                      <td className="px-4 py-3 text-[#8B96A5]">Premium Quality</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <span className="text-sm text-[#8B96A5] mr-2">Quantity:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-[#DEE2E7] rounded px-3 py-2"
                  >
                    {[1,2,3,4,5,10,20,50].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Right: Supplier Info Card */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="w-8 h-8 text-[#8B96A5]" />
                </div>
                <h3 className="font-semibold text-[#1C1C1C] mb-1">{product.supplierInfo.name}</h3>
                <div className="flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
                <p className="text-sm text-[#8B96A5]">{product.supplierInfo.location}</p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700 font-semibold flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
                <button className="w-full border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-md hover:bg-gray-50 font-semibold">
                  Seller's Profile
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[#DEE2E7]">
                <div className="text-sm text-[#8B96A5] space-y-2">
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="text-[#1C1C1C]">Within 1 hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min. Order:</span>
                    <span className="text-[#1C1C1C]">50 pieces</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment:</span>
                    <span className="text-[#1C1C1C]">T/T, L/C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-[1200px] mx-auto px-4 pb-8">
        <div className="bg-white border border-[#DEE2E7] rounded-md">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto border-b border-[#DEE2E7]">
            {[
              { id: 'description', label: 'Description', icon: Info },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'seller', label: 'About Seller', icon: User }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 lg:px-6 py-4 font-medium whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'text-[#0D6EFD] border-b-2 border-[#0D6EFD]'
                    : 'text-[#8B96A5] hover:text-[#1C1C1C]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Product Description</h3>
                <p className="text-[#8B96A5] leading-relaxed">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-[#1C1C1C] mb-2">Key Features:</h4>
                    <ul className="text-sm text-[#8B96A5] space-y-1">
                      <li>• High-quality materials</li>
                      <li>• Durable construction</li>
                      <li>• Modern design</li>
                      <li>• Easy to use</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1C1C1C] mb-2">Specifications:</h4>
                    <ul className="text-sm text-[#8B96A5] space-y-1">
                      <li>• Weight: 1.5kg</li>
                      <li>• Dimensions: 30x20x10cm</li>
                      <li>• Color: Multiple options</li>
                      <li>• Warranty: 1 year</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(review => (
                    <div key={review} className="border-b border-[#DEE2E7] pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-[#8B96A5] ml-2">John Doe • 2 days ago</span>
                      </div>
                      <p className="text-[#8B96A5]">Great product! Exactly as described. Fast shipping and excellent quality.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-[#0D6EFD] mt-1" />
                    <div>
                      <h4 className="font-medium text-[#1C1C1C]">Standard Shipping</h4>
                      <p className="text-sm text-[#8B96A5]">5-7 business days • Free on orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="w-5 h-5 text-[#0D6EFD] mt-1" />
                    <div>
                      <h4 className="font-medium text-[#1C1C1C]">Express Shipping</h4>
                      <p className="text-sm text-[#8B96A5]">2-3 business days • $15.99</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seller' && (
              <div>
                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">About the Seller</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-[#8B96A5]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1C1C1C]">{product.supplierInfo.name}</h4>
                    <p className="text-sm text-[#8B96A5] mb-2">{product.supplierInfo.location}</p>
                    <p className="text-[#8B96A5]">Established manufacturer with over 10 years of experience in the industry. We specialize in high-quality products and provide excellent customer service.</p>
                    <div className="mt-3 flex space-x-4 text-sm">
                      <span className="text-[#8B96A5]">Contact: {product.supplierInfo.contact}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-[1200px] mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct._id} className="bg-white border border-[#DEE2E7] rounded-md overflow-hidden hover:shadow-md">
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1C1C1C] text-sm mb-2">{relatedProduct.title}</h3>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-[#8B96A5] ml-2">({relatedProduct.rating})</span>
                </div>
                <p className="text-[#0D6EFD] font-bold text-lg">${relatedProduct.price}</p>
                <button
                  onClick={() => addToCart(relatedProduct)}
                  className="mt-3 w-full bg-[#0D6EFD] text-white py-2 rounded text-sm hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;