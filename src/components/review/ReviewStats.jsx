import React from 'react';
import '../../styles/Review.css';

export default function ReviewStats({ stats }) {
  if (!stats) return null;

  const { averageRating, totalReviews, ratingDistribution } = stats;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>☆</span>);
    }
    
    return stars;
  };

  const getBarWidth = (count) => {
    if (totalReviews === 0) return '0%';
    return `${(count / totalReviews) * 100}%`;
  };

  return (
    <div className="review-stats">
      <div className="stats-summary">
        <div className="stats-rating">
          <span className="stats-number">{averageRating.toFixed(1)}</span>
          <div className="stats-stars">{renderStars(averageRating)}</div>
          <span className="stats-total">Berdasarkan {totalReviews} ulasan</span>
        </div>
      </div>

      {totalReviews > 0 && (
        <div className="stats-distribution">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="distribution-row">
              <span className="distribution-label">{star} ⭐</span>
              <div className="distribution-bar-bg">
                <div 
                  className="distribution-bar-fill" 
                  style={{ width: getBarWidth(ratingDistribution[star]) }}
                ></div>
              </div>
              <span className="distribution-count">{ratingDistribution[star]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}