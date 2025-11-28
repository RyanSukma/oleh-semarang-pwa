import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, X, Edit3 } from 'lucide-react';
import { api } from '../services/api';
import TokoInfo from '../components/TokoInfo';
import ReviewForm from '../components/review/ReviewForm';
import ReviewList from '../components/review/ReviewList';
import ReviewStats from '../components/review/ReviewStats';
import '../styles/DetailPage.css';

export default function DetailMerchandise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [merchandise, setMerchandise] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    loadDetail();
    loadReviews();
    loadReviewStats();
  }, [id]);

  const loadDetail = async () => {
    try {
      const data = await api.getMerchandiseById(id);
      setMerchandise(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading detail:', err);
    }
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await api.getUlasan(id, 'merchandise');
      setReviews(data);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const loadReviewStats = async () => {
    try {
      const stats = await api.getUlasanStats(id, 'merchandise');
      setReviewStats(stats);
    } catch (err) {
      console.error('Error loading review stats:', err);
    }
  };

  const handleReviewSuccess = async (reviewData) => {
    try {
      await api.createUlasan(reviewData);
      
      api.clearCache();
      
      await loadReviews();
      await loadReviewStats();
      await loadDetail();
      
      setShowReviewForm(false);
      
      document.getElementById('ulasan-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    } catch (err) {
      throw new Error(err.message || 'Gagal menambahkan ulasan');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star-icon full">⭐</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star-icon half">⭐</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-icon empty">☆</span>);
    }
    
    return stars;
  };

  if (error || !merchandise) {
    return (
      <div className="detail-page">
        <div className="detail-wrapper">
          <button onClick={() => navigate(-1)} className="btn-back">
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </button>
          <div className="error-box">
            <p>{error || 'Memuat data...'}</p>
          </div>
        </div>
      </div>
    );
  }

  const tokoData = {
    nama: merchandise.toko,
    telepon: merchandise.toko_telepon,
    alamat: merchandise.toko_alamat,
    sosmed: merchandise.toko_sosmed
  };

  return (
    <div className="detail-page">
      <div className="detail-wrapper">
        <button onClick={() => navigate(-1)} className="btn-back">
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>
        
        <div className="detail-card">
          <img 
            src={merchandise.gambar} 
            alt={merchandise.nama} 
            className="detail-img"
          />
          
          <div className="detail-body">
            <h1 className="detail-name">{merchandise.nama}</h1>

            {merchandise.deskripsi && (
              <div className="description-section">
                <p className="description-text">{merchandise.deskripsi}</p>
              </div>
            )}
              
            {/* Rating Section */}
            <div className="rating-section">
              <div className="rating-stars-large">
                {renderStars(merchandise.rating || 0)}
              </div>
              <span className="rating-text">
                {merchandise.rating?.toFixed(1) || '0.0'} / 5.0
              </span>
              {reviewStats && (
                <span className="rating-count">
                  ({reviewStats.totalReviews} ulasan)
                </span>
              )}
            </div>

            {/* Info Grid - Hanya Kategori */}
            {merchandise.kategori && (
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">
                    <Package size={18} />
                    <span>Kategori</span>
                  </span>
                  <span className="info-value">{merchandise.kategori}</span>
                </div>
              </div>
            )}

            {/* TokoInfo Component */}
            <TokoInfo toko={tokoData} />

            {/* Ulasan Section */}
            <div id="ulasan-section" className="ulasan-section">
              <div className="ulasan-header">
                <h2 className="ulasan-heading">
                  Ulasan Pelanggan
                </h2>
                <button 
                  className="btn-write-review"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? (
                    <>
                      <X size={18} />
                      <span>Tutup</span>
                    </>
                  ) : (
                    <>
                      <Edit3 size={18} />
                      <span>Tulis Ulasan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Review Stats */}
              {reviewStats && <ReviewStats stats={reviewStats} />}

              {/* Review Form */}
              {showReviewForm && (
                <ReviewForm
                  itemId={id}
                  itemType="merchandise"
                  onSuccess={handleReviewSuccess}
                />
              )}

              {/* Review List */}
              <ReviewList reviews={reviews} loading={loadingReviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}