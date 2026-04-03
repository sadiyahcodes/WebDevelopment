import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import MainLayout from './components/MainLayout';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Messages from './components/Messages';
import Orders from './components/Orders';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AuthChoice from './components/AuthChoice';
import Admin from './components/Admin';

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<ProductList />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<Profile />} />
              <Route path="messages" element={<Messages />} />
              <Route path="orders" element={<Orders />} />
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route path="/auth" element={<AuthChoice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </CartProvider>
    </SearchProvider>
  );
}

export default App;
