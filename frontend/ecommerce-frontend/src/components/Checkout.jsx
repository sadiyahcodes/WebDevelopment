import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { items, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal + shipping) * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order
    const orderDetails = {
      id: Date.now().toString(),
      items: items,
      shippingInfo,
      paymentMethod,
      billingAddress: billingAddress.sameAsShipping ? shippingInfo : billingAddress,
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      status: 'confirmed',
      timestamp: new Date().toISOString()
    };

    // Store order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    items.forEach(item => removeFromCart(item._id));

    setIsProcessing(false);
    setCurrentStep(4);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-[#0D6EFD] text-white' : 'bg-gray-200 text-gray-600'}`}>
          1
        </div>
        <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-[#0D6EFD]' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-[#0D6EFD] text-white' : 'bg-gray-200 text-gray-600'}`}>
          2
        </div>
        <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-[#0D6EFD]' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-[#0D6EFD] text-white' : 'bg-gray-200 text-gray-600'}`}>
          3
        </div>
      </div>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1C1C1C] mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#0D6EFD] text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-4">Order Confirmed!</h1>
          <p className="text-[#8B96A5] mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/orders')}
              className="bg-[#0D6EFD] text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/products')}
              className="border border-[#DEE2E7] text-[#1C1C1C] px-6 py-3 rounded-md hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center text-[#0D6EFD] hover:text-blue-700 mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </button>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Checkout</h1>
      </div>

      {renderStepIndicator()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <div className="bg-white border border-[#DEE2E7] rounded-md p-6">
              <div className="flex items-center mb-6">
                <Truck className="w-5 h-5 text-[#0D6EFD] mr-2" />
                <h2 className="text-xl font-semibold text-[#1C1C1C]">Shipping Information</h2>
              </div>

              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Address</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1C1C] mb-1">ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                      className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Country</label>
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700 font-medium"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Payment Method Selection */}
              <div className="bg-white border border-[#DEE2E7] rounded-md p-6">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-5 h-5 text-[#0D6EFD] mr-2" />
                  <h2 className="text-xl font-semibold text-[#1C1C1C]">Payment Method</h2>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === 'credit_card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit/Debit Card
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>PayPal</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="apple_pay"
                      checked={paymentMethod === 'apple_pay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span>Apple Pay</span>
                  </label>
                </div>

                {paymentMethod === 'credit_card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardInfo.cardholderName}
                        onChange={(e) => setCardInfo({...cardInfo, cardholderName: e.target.value})}
                        className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.cardNumber}
                        onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={cardInfo.expiryDate}
                          onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                          className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                          className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-md hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                )}

                {paymentMethod !== 'credit_card' && (
                  <div className="text-center py-8">
                    <p className="text-[#8B96A5] mb-4">You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'} to complete your payment.</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-md hover:bg-gray-50"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-[#DEE2E7] rounded-md p-6">
                <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Billing Address</h3>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={billingAddress.sameAsShipping}
                    onChange={(e) => setBillingAddress({...billingAddress, sameAsShipping: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm text-[#1C1C1C]">Same as shipping address</span>
                </label>

                {!billingAddress.sameAsShipping && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1C1C1C] mb-1">Address</label>
                      <input
                        type="text"
                        required
                        value={billingAddress.address}
                        onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                        className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                          className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                          className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={billingAddress.zipCode}
                          onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                          className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6EFD] focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {currentStep === 3 && (
            <div className="bg-white border border-[#DEE2E7] rounded-md p-6">
              <div className="flex items-center mb-6">
                <Shield className="w-5 h-5 text-[#0D6EFD] mr-2" />
                <h2 className="text-xl font-semibold text-[#1C1C1C]">Review Your Order</h2>
              </div>

              <div className="space-y-6">
                {/* Shipping Info Summary */}
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-2">Shipping Address</h3>
                  <p className="text-[#8B96A5] text-sm">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                    {shippingInfo.country}
                  </p>
                </div>

                {/* Payment Info Summary */}
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-2">Payment Method</h3>
                  <p className="text-[#8B96A5] text-sm">
                    {paymentMethod === 'credit_card' ? 'Credit/Debit Card' : paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                    {paymentMethod === 'credit_card' && cardInfo.cardNumber && (
                      <><br />•••• •••• •••• {cardInfo.cardNumber.slice(-4)}</>
                    )}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-[#1C1C1C] mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div key={item._id} className="flex justify-between items-center text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-[#DEE2E7] text-[#1C1C1C] py-3 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-[#0D6EFD] text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#DEE2E7] rounded-md p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item._id} className="flex justify-between items-center text-sm">
                  <div className="flex-1">
                    <p className="text-[#1C1C1C] truncate">{item.name}</p>
                    <p className="text-[#8B96A5]">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[#1C1C1C] font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#DEE2E7] pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#8B96A5]">Subtotal</span>
                <span className="text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8B96A5]">Shipping</span>
                <span className="text-[#1C1C1C]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8B96A5]">Tax</span>
                <span className="text-[#1C1C1C]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t border-[#DEE2E7] pt-2">
                <span className="text-[#1C1C1C]">Total</span>
                <span className="text-[#0D6EFD]">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 50 && (
              <p className="text-xs text-[#8B96A5] mt-2">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;