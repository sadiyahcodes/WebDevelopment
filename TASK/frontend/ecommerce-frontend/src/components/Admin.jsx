import React, { useEffect, useState } from 'react';
import { products as mockProducts } from '../data/products';

const Admin = () => {
  const [products, setProducts] = useState(mockProducts);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '', category: '', stock: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate adding product to mock data
    const newProduct = {
      ...form,
      id: Date.now(), // Simple ID generation
      imageUrl: form.image,
      rating: 0,
      reviews: 0,
      inStock: true
    };
    setProducts(prev => [...prev, newProduct]);
    setForm({ name: '', price: '', image: '', description: '', category: '', stock: '' });
    alert('Product added successfully');
  };

  const deleteProduct = async (id) => {
    // Simulate deleting product from mock data
    setProducts(prev => prev.filter(product => product.id !== id));
    alert('Product deleted successfully');
  };

  return (
    <div className="min-h-screen bg-page-bg font-sans">
      {/* 3-Tier Header */}
      <header className="bg-white border-b border-border">
        {/* Top Tier */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">Ecommerce - Admin</div>
            <div className="flex items-center space-x-4 flex-1 max-w-md mx-4">
              <select className="border border-border rounded px-2 py-1 text-sm">
                <option>All Categories</option>
              </select>
              <input type="text" placeholder="Search products..." className="flex-1 border border-border rounded px-3 py-1 md:block hidden" />
              <button className="bg-primary text-white px-4 py-1 rounded md:block hidden">Search</button>
            </div>
            <div className="flex space-x-4">
              <button className="text-text-main">👤 Profile</button>
              <button className="text-text-main">💬 Messages</button>
              <button className="text-text-main">📦 Orders</button>
              <button className="text-text-main">🛒 Cart</button>
            </div>
          </div>
        </div>
        {/* Mid Tier */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <nav className="flex space-x-6">
              <a href="/" className="text-text-main hover:text-primary">Home</a>
              <a href="/products" className="text-text-main hover:text-primary">Products</a>
              <a href="/cart" className="text-text-main hover:text-primary">Cart</a>
              <a href="/login" className="text-text-main hover:text-primary">Login</a>
              <a href="/admin" className="text-text-main hover:text-primary">Admin</a>
            </nav>
            <div className="flex items-center space-x-2">
              <span className="text-text-muted">Ship to</span>
              <select className="border border-border rounded px-2 py-1">
                <option>🇺🇸 United States</option>
              </select>
            </div>
          </div>
        </div>
        {/* Bottom Tier - Breadcrumbs */}
        <div className="container mx-auto px-4 py-2">
          <nav className="text-text-muted text-sm">
            <a href="/" className="hover:text-primary">Home</a> {'>'} <span>Admin</span>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-main mb-8">Admin Panel</h1>

        {/* Add Product Form */}
        <div className="bg-white border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-text-main mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:col-span-2"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition-colors md:col-span-2"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-text-main mb-4">Manage Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="border border-border rounded-lg p-4">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-4" />
                <h3 className="font-semibold text-text-main mb-2">{product.name}</h3>
                <p className="text-primary font-bold mb-2">${product.price}</p>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-error text-white px-4 py-2 rounded hover:bg-red-700 w-full transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-muted">&copy; 2026 Ecommerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;