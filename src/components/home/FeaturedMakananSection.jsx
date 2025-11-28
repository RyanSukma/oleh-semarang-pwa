import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaStore } from "react-icons/fa";


export default function FeaturedMakananSection({ featuredMakanan }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star full" />);
  }

  if (hasHalf) {
    stars.push(<FaStarHalfAlt key="half" className="star half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
  }

  return stars;

  };

  return (
    <section className="featured-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Makanan Khas</h2>
          <p className="section-subtitle">Cita rasa autentik Kota Lumpia</p>
        </div>
        <button 
          className="btn-view-all"
          onClick={() => navigate('/makanan')}
        >
          Lihat Semua →
        </button>
      </div>

      <div className="featured-grid">
        {featuredMakanan.length === 0 ? (
          <p className="empty-state">Memuat data...</p>
        ) : (
          featuredMakanan.map((item) => (
            <div 
              key={item.id} 
              className="featured-card"
              onClick={() => navigate(`/makanan/${item.id}`)}
            >
              <div className="featured-card-image">
                <img src={item.gambar} alt={item.nama} />
                <div className="featured-card-overlay">
                  <span className="view-detail">Lihat Detail →</span>
                </div>
              </div>
              <div className="featured-card-content">
                <h3 className="featured-card-title">{item.nama}</h3>
                <p className="featured-card-description">{item.deskripsi}</p>

                <div className="featured-card-footer">
                  <div className="featured-card-rating">
                    <span className="rating-stars">{renderStars(item.rating || 0)}</span>
                    <span className="rating-number">({item.rating?.toFixed(1) || '0.0'})</span>
                  </div>

                  {item.toko && (
                    <span className="featured-card-store">
                      <FaStore style={{ marginRight: "4px" }} /> {item.toko}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
