import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import HeroSection from '../components/home/HeroSection';
import FeaturedMakananSection from '../components/home/FeaturedMakananSection';
import FeaturedMerchandiseSection from '../components/home/FeaturedMerchandiseSection';
import Footer from '../components/home/Footer';
import '../styles/HomePage.css';


export default function HomePage() {
  const [featuredMakanan, setFeaturedMakanan] = useState([]);
  const [featuredMerchandise, setFeaturedMerchandise] = useState([]);

  useEffect(() => {
    loadFeaturedData();
  }, []);

  const loadFeaturedData = async () => {
    try {
      const [makananData, merchandiseData] = await Promise.all([
        api.getMakanan(),
        api.getMerchandise()
      ]);
      
      setFeaturedMakanan(makananData.slice(0, 3));
      setFeaturedMerchandise(merchandiseData.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured data:', error);
    }
  };

  return (
    <div className="home-page">
      <HeroSection />
      
      <main className="home-content">
        <FeaturedMakananSection featuredMakanan={featuredMakanan} />
        <FeaturedMerchandiseSection featuredMerchandise={featuredMerchandise} />
      </main>

      {/* Footer di bawah content */}
      <Footer />
    </div>
  );
}