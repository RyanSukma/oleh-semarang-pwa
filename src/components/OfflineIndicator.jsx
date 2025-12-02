import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import '../styles/OfflineIndicator.css';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowToast(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showToast) return null;

  return (
    <div className={`offline-toast ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? (
        <>
          <Wifi size={20} />
          <span>Kembali Online</span>
        </>
      ) : (
        <>
          <WifiOff size={20} />
          <span>Mode Offline</span>
        </>
      )}
    </div>
  );
}