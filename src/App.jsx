import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import BottomNav from './components/navbar/BottomNav';
import Makanan from './pages/Makanan';
import DetailMakanan from './pages/DetailMakanan';
import Merchandise from './pages/Merchandise';
import DetailMerchandise from './pages/DetailMerchandise';
import Profile from './pages/Profile';
import { api } from './services/api';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    preloadData();
  }, []);

  const preloadData = async () => {
    try {
      await Promise.all([
        api.getMakanan(),
        api.getMerchandise()
      ]);
      console.log('Data preloaded successfully');
    } catch (error) {
      console.error('Error preloading data:', error);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
    setAppReady(true);
  };

  if (showSplash || !appReady) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        {/* Desktop Navbar - hanya muncul di desktop */}
        <DesktopNavbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/makanan" element={<Makanan />} />
          <Route path="/makanan/:id" element={<DetailMakanan />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/merchandise/:id" element={<DetailMerchandise />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Bottom Nav - hanya muncul di mobile */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;