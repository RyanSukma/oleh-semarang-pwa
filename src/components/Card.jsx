import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaStore } from "react-icons/fa";
import '../styles/Card.css';

export default function Card({ item, type }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'makanan') {
      navigate(`/makanan/${item.id}`);
    } else {
      navigate(`/merchandise/${item.id}`);
    }
  };

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
    <div className="card" onClick={handleClick}>
      <div className="card-image-wrapper">
        <img src={item.gambar} alt={item.nama} className="card-image" />
        <div className="card-image-overlay">
          <span className="view-detail">Lihat Detail →</span>
        </div>
      </div>

      <div className="card-content">
        <h3 className="card-title">{item.nama}</h3>
        <p className="card-description">{item.deskripsi}</p>

        <div className="card-footer">
          <div className="card-rating">
            {renderStars(item.rating || 0)}
              <span className="rating-value">({item.rating?.toFixed(1) || "0.0"})</span>
            </div>

          {item.toko && (
            <span className="card-store">
              <FaStore style={{ marginRight: "4px" }} /> {item.toko}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
