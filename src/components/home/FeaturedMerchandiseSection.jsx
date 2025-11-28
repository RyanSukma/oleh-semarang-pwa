import React from "react";
import { useNavigate } from "react-router-dom";
import {FaStar, FaStarHalfAlt, FaRegStar,FaBoxOpen} from "react-icons/fa";

export default function FeaturedMerchandiseSection({ featuredMerchandise }) {
  const navigate = useNavigate();

  // Sistem rating dengan half-star
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
          <h2 className="section-title">Merchandise Semarang</h2>
          <p className="section-subtitle">Kenang-kenangan istimewa</p>
        </div>

        <button className="btn-view-all" onClick={() => navigate("/merchandise")}>
          Lihat Semua →
        </button>
      </div>

      <div className="featured-grid">
        {featuredMerchandise.length === 0 ? (
          <p className="empty-state">Memuat data...</p>
        ) : (
          featuredMerchandise.map((item) => (
            <div
              key={item.id}
              className="featured-card"
              onClick={() => navigate(`/merchandise/${item.id}`)}
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
                    <span className="rating-stars">
                      {renderStars(item.rating || 0)}
                    </span>
                    <span className="rating-number">
                      ({item.rating?.toFixed(1) || "0.0"})
                    </span>
                  </div>

                  {item.kategori && (
                    <span className="featured-card-store">
                      <FaBoxOpen style={{ marginRight: "4px" }} />
                      {item.kategori}
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
