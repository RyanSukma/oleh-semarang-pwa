import React, { useState, useEffect } from 'react';
import BackgroundPattern from '../components/splash/BackgroundPattern';
import FloatingElements from '../components/splash/FloatingElements';
import LogoContainer from '../components/splash/LogoContainer';
import TitleSection from '../components/splash/TitleSection';
import LoadingAnimation from '../components/splash/LoadingAnimation';
import Footer from '../components/splash/Footer';
import '../styles/SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingText, setLoadingText] = useState('Memuat...');

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingText('Siap digunakan!');
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => {
                if (typeof onComplete === 'function') onComplete();
              }, 100);
            }, 600);
          }, 500);
          return 100;
        }
        
        // Update loading text
        if (prev < 30) {
          setLoadingText('Memuat data...');
        } else if (prev < 60) {
          setLoadingText('Menyiapkan aplikasi...');
        } else if (prev < 90) {
          setLoadingText('Hampir selesai...');
        }
        
        const nextProgress = prev + 4;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`splash-screen ${!fadeIn ? 'splash-fade-in' : 'splash-visible'} ${fadeOut ? 'splash-fade-out' : ''}`}
    >
      
      <BackgroundPattern fadeOut={fadeOut} />
      <FloatingElements fadeOut={fadeOut} />
      
      <div className={`splash-content-wrapper ${!fadeIn ? 'content-fade-in' : 'content-visible'} ${fadeOut ? 'content-fade-out' : ''}`}>
        
        <LogoContainer />
        <TitleSection fadeIn={fadeIn} />
        <LoadingAnimation fadeIn={fadeIn} progress={progress} loadingText={loadingText} />
        
      </div>

      <Footer fadeOut={fadeOut} fadeIn={fadeIn} />
    </div>
  );
}