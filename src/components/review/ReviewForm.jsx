import React, { useState } from 'react';
import '../../styles/Review.css';

export default function ReviewForm({ itemId, itemType, onSuccess }) {
  const [formData, setFormData] = useState({
    nama_reviewer: '',
    rating: 5,
    komentar: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi
    if (!formData.nama_reviewer.trim()) {
      setError('Nama wajib diisi');
      return;
    }

    if (formData.komentar && formData.komentar.length < 5) {
      setError('Komentar minimal 5 karakter');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSuccess({
        item_id: itemId,
        item_type: itemType,
        nama_reviewer: formData.nama_reviewer.trim(),
        rating: formData.rating,
        komentar: formData.komentar.trim()
      });

      // Reset form
      setFormData({
        nama_reviewer: '',
        rating: 5,
        komentar: ''
      });
    } catch (err) {
      setError(err.message || 'Gagal menambahkan ulasan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarInput = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || formData.rating);
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-input ${isFilled ? 'star-filled' : ''}`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          {isFilled ? '⭐' : '☆'}
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="review-form-container">
      <h3 className="review-form-title">Tulis Ulasan</h3>
      
      {error && (
        <div className="review-form-error">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="nama_reviewer">Nama Anda *</label>
          <input
            type="text"
            id="nama_reviewer"
            name="nama_reviewer"
            value={formData.nama_reviewer}
            onChange={handleChange}
            placeholder="Masukkan nama Anda"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* UPDATED: Bintang horizontal dengan wrapper */}
        <div className="form-group">
          <label>Rating *</label>
          <div className="star-input-container">
            {/* Wrapper untuk bintang agar horizontal */}
            <div className="star-input-wrapper">
              {renderStarInput()}
            </div>
            {/* Rating label di bawah */}
            <span className="rating-label">{formData.rating.toFixed(1)} / 5.0</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="komentar">Komentar (opsional)</label>
          <textarea
            id="komentar"
            name="komentar"
            value={formData.komentar}
            onChange={handleChange}
            placeholder="Ceritakan pengalaman Anda dengan produk ini..."
            rows="4"
            disabled={isSubmitting}
          />
          {formData.komentar && (
            <span className="char-count">{formData.komentar.length} karakter</span>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-submit-review"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>
    </div>
  );
}