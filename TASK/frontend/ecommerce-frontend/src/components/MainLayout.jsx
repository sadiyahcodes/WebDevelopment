import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Notification from './Notification';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans">
      <Header />
      <Notification />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;