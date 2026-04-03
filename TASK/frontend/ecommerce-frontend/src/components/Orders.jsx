import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, RefreshCw } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage (simulating API call)
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    // If no saved orders, use mock data for demo
    if (savedOrders.length === 0) {
      setOrders(mockOrders);
    } else {
      // Transform saved orders to match the expected format
      const transformedOrders = savedOrders.map(order => ({
        id: order.id || `ORD-${Date.now()}`,
        date: order.timestamp ? new Date(order.timestamp).toLocaleDateString() : '2024-01-15',
        status: order.status || 'confirmed',
        items: order.items || [],
        total: order.total || '0.00',
        shippingInfo: order.shippingInfo,
        paymentMethod: order.paymentMethod
      }));
      setOrders(transformedOrders);
    }
    setLoading(false);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-[#FF9017]" />;
      case 'processing':
        return <RefreshCw className="w-5 h-5 text-[#0D6EFD]" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-[#FF9017]" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-[#00B517]" />;
      default:
        return <Package className="w-5 h-5 text-[#8B96A5]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-[#FF9017] bg-orange-50';
      case 'processing':
        return 'text-[#0D6EFD] bg-blue-50';
      case 'shipped':
        return 'text-[#FF9017] bg-orange-50';
      case 'delivered':
        return 'text-[#00B517] bg-green-50';
      default:
        return 'text-[#8B96A5] bg-gray-50';
    }
  };

  // Mock orders for demo purposes
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: [
        { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 89.99 },
        { name: 'Smart Watch Series 5', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 149.99,
      items: [
        { name: 'Ergonomic Office Chair', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 79.99,
      items: [
        { name: 'Coffee Maker Deluxe', quantity: 1, price: 79.99 }
      ]
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D6EFD]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-md">
        <div className="p-6 border-b border-[#DEE2E7]">
          <h1 className="text-2xl font-bold text-[#1C1C1C]">My Orders</h1>
          <p className="text-[#8B96A5] mt-1">
            {displayOrders.length} order{displayOrders.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {displayOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-16 h-16 text-[#8B96A5] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-2">No orders yet</h2>
            <p className="text-[#8B96A5] mb-4">When you place orders, they will appear here.</p>
            <a href="/products" className="bg-[#0D6EFD] text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-block">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="divide-y divide-[#DEE2E7]">
            {displayOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm text-[#8B96A5]">
                      Order #{order.id} • {new Date(order.date || order.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-[#1C1C1C]">${order.total}</span>
                    <button className="text-[#0D6EFD] hover:underline flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Details</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items && order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#1C1C1C] text-sm truncate">{item.name}</h4>
                        <p className="text-[#8B96A5] text-xs">Qty: {item.quantity} • ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Info */}
                {order.shippingInfo && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-md">
                    <div>
                      <h5 className="font-medium text-[#1C1C1C] text-sm mb-2">Shipping Address</h5>
                      <p className="text-[#8B96A5] text-xs">
                        {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                        {order.shippingInfo.address}<br />
                        {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}<br />
                        {order.shippingInfo.country}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#1C1C1C] text-sm mb-2">Payment Method</h5>
                      <p className="text-[#8B96A5] text-xs">
                        {order.paymentMethod === 'credit_card' ? 'Credit/Debit Card' :
                         order.paymentMethod === 'paypal' ? 'PayPal' :
                         order.paymentMethod === 'apple_pay' ? 'Apple Pay' : order.paymentMethod}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {order.status === 'delivered' && (
                    <button className="bg-[#00B517] text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                      Write Review
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button className="bg-[#0D6EFD] text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                      Track Package
                    </button>
                  )}
                  <button className="border border-[#DEE2E7] text-[#1C1C1C] px-4 py-2 rounded text-sm hover:bg-gray-50">
                    Order Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;