import React, { useState } from 'react';
import { Store, Phone, MapPin, Globe, Instagram, Facebook, MessageCircle, Twitter, ArrowRight, Map } from 'lucide-react';
import '../styles/TokoInfo.css';

export default function TokoInfo({ toko }) {
  const [showMap, setShowMap] = useState(false);

  if (!toko || !toko.nama) {
    return null;
  }

  const hasContact = toko.telepon || toko.alamat || toko.sosmed;

  const handlePhoneClick = () => {
    if (toko.telepon) {
      window.location.href = `tel:${toko.telepon.replace(/\s|-/g, '')}`;
    }
  };

  const handleMapsClick = () => {
    if (toko.alamat) {
      const query = encodeURIComponent(`${toko.nama}, ${toko.alamat}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  const handleSocialClick = () => {
    if (toko.sosmed) {
      // Detect platform berdasarkan format
      let url = toko.sosmed;
      
      if (toko.sosmed.startsWith('@')) {
        // Asumsi Instagram
        const username = toko.sosmed.substring(1);
        url = `https://instagram.com/${username}`;
      } else if (!toko.sosmed.startsWith('http')) {
        // Jika tidak ada protocol, tambahkan
        url = `https://${toko.sosmed}`;
      }
      
      window.open(url, '_blank');
    }
  };

  const getSocialIcon = () => {
    if (!toko.sosmed) return <Globe size={18} />;
    
    const sosmed = toko.sosmed.toLowerCase();
    if (sosmed.includes('instagram') || sosmed.startsWith('@')) {
      return <Instagram size={18} />;
    } else if (sosmed.includes('facebook')) {
      return <Facebook size={18} />;
    } else if (sosmed.includes('whatsapp')) {
      return <MessageCircle size={18} />;
    } else if (sosmed.includes('twitter') || sosmed.includes('x.com')) {
      return <Twitter size={18} />;
    }
    return <Globe size={18} />;
  };

  return (
    <div className="toko-info-section">
      <div className="toko-info-header">
        <h3 className="toko-info-title">
          <Store size={20} />
          <span>Informasi Toko</span>
        </h3>
      </div>

      <div className="toko-info-card">
        <div className="toko-name-section">
          <Store size={20} className="toko-icon" />
          <h4 className="toko-name">{toko.nama}</h4>
        </div>

        {hasContact && (
          <div className="toko-contact-list">
            {/* Telepon */}
            {toko.telepon && (
              <div className="toko-contact-item">
                <div className="contact-label">
                  <Phone size={18} className="contact-icon" />
                  <span className="contact-text">Telepon</span>
                </div>
                <button 
                  className="contact-value clickable"
                  onClick={handlePhoneClick}
                  title="Klik untuk menelepon"
                >
                  <span>{toko.telepon}</span>
                  <ArrowRight size={16} className="contact-arrow" />
                </button>
              </div>
            )}

            {/* Alamat */}
            {toko.alamat && (
              <div className="toko-contact-item">
                <div className="contact-label">
                  <MapPin size={18} className="contact-icon" />
                  <span className="contact-text">Alamat</span>
                </div>
                <div className="contact-value-wrapper">
                  <span className="contact-value">{toko.alamat}</span>
                  <button 
                    className="btn-maps"
                    onClick={handleMapsClick}
                    title="Buka di Google Maps"
                  >
                    <Map size={16} />
                    <span>Lihat di Maps</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sosial Media */}
            {toko.sosmed && (
              <div className="toko-contact-item">
                <div className="contact-label">
                  <span className="contact-icon">{getSocialIcon()}</span>
                  <span className="contact-text">Sosial Media</span>
                </div>
                <button 
                  className="contact-value clickable"
                  onClick={handleSocialClick}
                  title="Kunjungi sosial media"
                >
                  <span>{toko.sosmed}</span>
                  <ArrowRight size={16} className="contact-arrow" />
                </button>
              </div>
            )}
          </div>
        )}

        {!hasContact && (
          <p className="toko-no-contact">
            Informasi kontak belum tersedia
          </p>
        )}
      </div>
    </div>
  );
}