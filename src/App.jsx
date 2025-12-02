import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import BottomNav from './components/navbar/BottomNav';
import OfflineIndicator from './components/OfflineIndicator';
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    preloadData();
    
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const preloadData = async () => {
    try {
      // Hanya preload jika online
      if (navigator.onLine) {
        await Promise.all([
          api.getMakanan(),
          api.getMerchandise()
        ]);
        console.log('✅ Data preloaded successfully');
      } else {
        console.log('📡 Offline mode - using cached data');
      }
    } catch (error) {
      console.error('❌ Error preloading data:', error);
      // Tetap lanjutkan meski error
    } finally {
      // Set app ready regardless of preload success
      setTimeout(() => {
        setAppReady(true);
      }, 100);
    }
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash || !appReady) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        {/* Offline Indicator */}
        <OfflineIndicator />
        
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