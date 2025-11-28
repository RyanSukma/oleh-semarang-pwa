import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Card from '../components/Card';
import { Search, FilterX } from "lucide-react";   // ⬅ Tambahkan
import '../styles/Pages.css';
import SearchFilter from '../components/SearchFilter';

export default function Makanan() {
  const [makanan, setMakanan] = useState([]);
  const [filteredMakanan, setFilteredMakanan] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    loadMakanan();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, filterRating, makanan]);

  const loadMakanan = async () => {
    try {
      const data = await api.getMakanan();
      setMakanan(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading makanan:', err);
    }
  };

  const filterData = () => {
    let filtered = [...makanan];

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

    setFilteredMakanan(filtered);
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
          <button onClick={loadMakanan} className="retry-button">Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Makanan Khas Semarang</h1>
        <p>Oleh-oleh makanan lezat dari Kota Lumpia</p>
      </header>
      <SearchFilter
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filterRating={filterRating}
      setFilterRating={setFilterRating}
      clearFilters={clearFilters}
      isFiltered={isFiltered}/>

      
    

      {isFiltered && (
        <div className="results-info">
          <p>Menampilkan {filteredMakanan.length} dari {makanan.length} makanan</p>
        </div>
      )}

      <div className="card-grid">
        {makanan.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>
            Memuat data...
          </p>
        ) : filteredMakanan.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', gridColumn: '1/-1' }}>
            Tidak ada makanan yang sesuai dengan pencarian Anda.
          </p>
        ) : (
          filteredMakanan.map(item => (
            <Card key={item.id} item={item} type="makanan" />
          ))
        )}
      </div>
    </div>
  );
}
