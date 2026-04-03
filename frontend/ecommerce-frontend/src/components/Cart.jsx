import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Heart, ShoppingCart, Tag } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [savedForLater, setSavedForLater] = useState(() => {
    const savedItems = localStorage.getItem('savedForLater');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const saveForLater = (item) => {
    removeFromCart(item.id);
    const newSaved = [...savedForLater, item];
    setSavedForLater(newSaved);
    localStorage.setItem('savedForLater', JSON.stringify(newSaved));
  };

  const moveToCart = (item) => {
    const newSaved = savedForLater.filter(savedItem => savedItem.id !== item.id);
    setSavedForLater(newSaved);
    localStorage.setItem('savedForLater', JSON.stringify(newSaved));
    // Add back to cart with quantity 1
    updateQuantity(item.id, 1);
  };

  const applyCoupon = () => {
    const code = couponCode.toLowerCase().trim();
    if (code === 'save10') {
      setDiscount(10);
      alert('Coupon applied! 10% discount added.');
    } else if (code === 'save20') {
      setDiscount(20);
      alert('Coupon applied! 20% discount added.');
    } else {
      setDiscount(0);
      alert('Invalid coupon code. Try SAVE10 or SAVE20');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  return (
    <>
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart List - Left Side */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-[#DEE2E7] rounded-md">
              <div className="p-6 border-b border-[#DEE2E7]">
                <h1 className="text-2xl font-bold text-[#1C1C1C]">Shopping Cart</h1>
                <p className="text-[#8B96A5] mt-1">{items.length} items in your cart</p>
              </div>

              {items.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingCart className="w-16 h-16 text-[#8B96A5] mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-[#1C1C1C] mb-2">Your cart is empty</h2>
                  <p className="text-[#8B96A5] mb-4">Add some products to get started!</p>
                  <a href="/products" className="bg-[#0D6EFD] text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-[#DEE2E7]">
                  {items.map(item => (
                    <div key={item.id} className="p-4 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
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

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1C1C1C] mb-1">{item.name}</h3>
                        <p className="text-[#8B96A5] text-sm mb-2 line-clamp-2">{item.description}</p>
                        <p className="text-[#0D6EFD] font-bold">${item.price}</p>
                      </div>

                      <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:space-y-2">
                        <div className="flex items-center">
                          <label className="text-sm text-[#8B96A5] mr-2">Qty:</label>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            className="border border-[#DEE2E7] rounded px-2 py-1 text-sm"
                          >
                            {[1,2,3,4,5,10,20,50].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#8B96A5] hover:text-red-500 p-2"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => saveForLater(item)}
                            className="text-[#8B96A5] hover:text-[#0D6EFD] p-2"
                            title="Save for later"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <div className="bg-white border border-[#DEE2E7] rounded-md mt-8">
                <div className="p-6 border-b border-[#DEE2E7]">
                  <h2 className="text-xl font-bold text-[#1C1C1C]">Saved for Later</h2>
                  <p className="text-[#8B96A5] mt-1">{savedForLater.length} items saved</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 lg:p-6">
                  {savedForLater.slice(0, 4).map(item => (
                    <div key={item.id} className="border border-[#DEE2E7] rounded-md p-4">
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
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
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#1C1C1C] text-sm mb-1">{item.name}</h3>
                          <p className="text-[#0D6EFD] font-bold text-sm">${item.price}</p>
                        </div>
                        <button
                          onClick={() => moveToCart(item)}
                          className="bg-[#0D6EFD] text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar - Right Side */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white border border-[#DEE2E7] rounded-md p-4 lg:p-6 lg:sticky lg:top-4">
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">
                  Have a coupon?
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-[#DEE2E7] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#0D6EFD]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-[#0D6EFD] text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-[#8B96A5] mt-1">Try SAVE10 or SAVE20</p>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Subtotal ({items.length} items)</span>
                  <span className="text-[#1C1C1C] font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount ({discount}%)</span>
                    <span className="text-green-600 font-medium">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Tax</span>
                  <span className="text-[#1C1C1C] font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#8B96A5]">Shipping</span>
                  <span className="text-[#1C1C1C] font-medium">Free</span>
                </div>

                <hr className="border-[#DEE2E7]" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#1C1C1C]">Total</span>
                  <span className="text-[#1C1C1C]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-[#00B517] text-white py-4 rounded-md hover:bg-green-600 font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={items.length === 0}
              >
                Checkout
              </button>

              <div className="mt-4 text-center">
                <a href="/products" className="text-[#0D6EFD] hover:underline text-sm">
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Checkout Footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#DEE2E7] p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-[#8B96A5]">Total</p>
            <p className="text-lg font-bold text-[#1C1C1C]">${total.toFixed(2)}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-[#00B517] text-white px-6 py-3 rounded-md hover:bg-green-600 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={items.length === 0}
          >
            Checkout ({items.length})
          </button>
        </div>
        {discount > 0 && (
          <p className="text-xs text-green-600 text-center">
            Coupon applied: {discount}% off
          </p>
        )}
      </div>

      {/* Add bottom padding on mobile to account for fixed footer */}
      <div className="lg:hidden h-24"></div>
    </>
  );
};

export default Cart;