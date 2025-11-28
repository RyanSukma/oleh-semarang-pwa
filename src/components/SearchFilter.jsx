import React from "react";
import { Search, FilterX } from "lucide-react";
import "../styles/SearchFilter.css";

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  filterRating,
  setFilterRating,
  clearFilters,
  isFiltered
}) {
  return (
    <div className="filter-section">
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Cari makanan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Rating Filter */}
      <div className="filter-controls">
        <label htmlFor="rating-filter">Filter Rating:</label>
        <select
          id="rating-filter"
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="filter-select"
        >
          <option value="all">Semua Rating</option>
          <option value="5">⭐ 5 Bintang</option>
          <option value="4">⭐ 4+ Bintang</option>
          <option value="3">⭐ 3+ Bintang</option>
          <option value="2">⭐ 2+ Bintang</option>
          <option value="1">⭐ 1+ Bintang</option>
        </select>

        {isFiltered && (
          <button onClick={clearFilters} className="clear-filters-btn">
            <FilterX size={16} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
