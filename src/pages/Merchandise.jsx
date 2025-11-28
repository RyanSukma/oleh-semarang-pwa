import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/Card';
import SearchFilter from "../components/SearchFilter";   // ⬅️ Tambahkan
import '../styles/Pages.css';

export default function Merchandise() {
  const [merchandise, setMerchandise] = useState([]);
  const [filteredMerchandise, setFilteredMerchandise] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    loadMerchandise();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, filterRating, merchandise]);

  const loadMerchandise = async () => {
    try {
      const data = await api.getMerchandise();
      setMerchandise(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading merchandise:', err);
    }
  };

  const filterData = () => {
    let filtered = [...merchandise];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating !== 'all') {
      const rating = parseInt(filterRating);
      filtered = filtered.filter(item => {
        const itemRating = parseFloat(item.rating || 0);
        return itemRating >= rating && itemRating < rating + 1;
      });
    }

    setFilteredMerchandise(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterRating('all');
  };

  const isFiltered = searchTerm || filterRating !== 'all';

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={loadMerchandise} className="retry-button">Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Merchandise Semarang</h1>
        <p>Kenang-kenangan khas Kota Atlas</p>
      </header>

      {/* 🔥 Panggil komponen SearchFilter */}
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterRating={filterRating}
        setFilterRating={setFilterRating}
        clearFilters={clearFilters}
        isFiltered={isFiltered}
      />

      {isFiltered && (
        <div className="results-info">
          <p>Menampilkan {filteredMerchandise.length} dari {merchandise.length} merchandise</p>
        </div>
      )}

      <div className="card-grid">
        {merchandise.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>
            Memuat data...
          </p>
        ) : filteredMerchandise.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>
            Tidak ada merchandise yang sesuai dengan pencarian Anda.
          </p>
        ) : (
          filteredMerchandise.map(item => (
            <Card key={item.id} item={item} type="merchandise" />
          ))
        )}
      </div>
    </div>
  );
}
