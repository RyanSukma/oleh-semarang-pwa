import React from 'react';
import '../../styles/Review.css';

export default function ReviewList({ reviews, loading }) {
  if (loading) {
    return <div className="review-loading">Memuat ulasan...</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-empty">
        <p>Belum ada ulasan untuk produk ini.</p>
        <p className="review-empty-sub">Jadilah yang pertama memberikan ulasan!</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star-full">⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star-half">⭐</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-empty">☆</span>);
    }
    
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <div className="review-user">
              <div className="review-avatar">
                {review.nama_reviewer.charAt(0).toUpperCase()}
              </div>
              <div className="review-user-info">
                <h4 className="review-name">{review.nama_reviewer}</h4>
                <span className="review-date">{formatDate(review.created_at)}</span>
              </div>
            </div>
            <div className="review-rating">
              {renderStars(review.rating)}
              <span className="review-rating-number">{review.rating.toFixed(1)}</span>
            </div>
          </div>
          {review.komentar && (
            <p className="review-comment">{review.komentar}</p>
          )}
        </div>
      ))}
    </div>
  );
}