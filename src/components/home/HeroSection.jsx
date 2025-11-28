import React from 'react';
import { UtensilsCrossed, Package, Star } from 'lucide-react';
import semarIcon from "../../assets/semar.png";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <img 
              src="/logo-semarang.png" 
              alt="Logo Semarang" 
              className="badge-icon"
            />
            <span className="badge-text">Kota Atlas</span>
          </div>
          
          <h1 className="hero-title">
            Oleh-Oleh
            <br />
            <span className="hero-title-highlight">Semar</span>
          </h1>
          
          <p className="hero-description">
            Temukan berbagai pilihan oleh-oleh khas Semarang, mulai dari makanan 
            tradisional yang lezat hingga merchandise unik yang berkesan.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <UtensilsCrossed size={24} strokeWidth={1.8} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">5+</span>
                <span className="stat-label">Makanan</span>
              </div>
            </div>

            <div className="stat-item">
              <Package size={24} strokeWidth={1.8} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">5+</span>
                <span className="stat-label">Merchandise</span>
              </div>
            </div>

            <div className="stat-item">
              <Star size={24} strokeWidth={1.8} className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number">100%</span>
                <span className="stat-label">Khas Semarang</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="hero-image-wrapper">
            <div className="hero-image-bg"></div>

            <img 
              src={semarIcon} 
              alt="Semar Icon" 
              className="hero-emoji-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
