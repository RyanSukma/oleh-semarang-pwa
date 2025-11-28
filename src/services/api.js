const API_URL = import.meta.env.VITE_API_URL;

// Simple cache object
const cache = {
  makanan: null,
  merchandise: null,
  makananTimestamp: null,
  merchandiseTimestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000;

export const api = {
  // Makanan endpoints
  async getMakanan() {
    const now = Date.now();
    if (cache.makanan && cache.makananTimestamp && (now - cache.makananTimestamp < CACHE_DURATION)) {
      console.log('Using cached makanan data');
      return cache.makanan;
    }
    
    console.log('Fetching fresh makanan data');
    const response = await fetch(`${API_URL}/makanan`);
    if (!response.ok) throw new Error('Failed to fetch makanan');
    const data = await response.json();
    
    cache.makanan = data;
    cache.makananTimestamp = now;
    return data;
  },

  async getMakananById(id) {
    const response = await fetch(`${API_URL}/makanan/${id}`);
    if (!response.ok) throw new Error('Failed to fetch makanan detail');
    return response.json();
  },

  // Merchandise endpoints
  async getMerchandise() {
    const now = Date.now();
    if (cache.merchandise && cache.merchandiseTimestamp && (now - cache.merchandiseTimestamp < CACHE_DURATION)) {
      console.log('Using cached merchandise data');
      return cache.merchandise;
    }
    
    console.log('Fetching fresh merchandise data');
    const response = await fetch(`${API_URL}/merchandise`);
    if (!response.ok) throw new Error('Failed to fetch merchandise');
    const data = await response.json();
    
    cache.merchandise = data;
    cache.merchandiseTimestamp = now;
    return data;
  },

  async getMerchandiseById(id) {
    const response = await fetch(`${API_URL}/merchandise/${id}`);
    if (!response.ok) throw new Error('Failed to fetch merchandise detail');
    return response.json();
  },

  // ========== ULASAN ENDPOINTS (BARU) ==========
  
  // Get ulasan by item
  async getUlasan(itemId, itemType) {
    const response = await fetch(`${API_URL}/ulasan/${itemType}/${itemId}`);
    if (!response.ok) throw new Error('Failed to fetch ulasan');
    return response.json();
  },

  // Get stats ulasan
  async getUlasanStats(itemId, itemType) {
    const response = await fetch(`${API_URL}/ulasan/${itemType}/${itemId}/stats`);
    if (!response.ok) throw new Error('Failed to fetch ulasan stats');
    return response.json();
  },

  // Create ulasan baru
  async createUlasan(data) {
    const response = await fetch(`${API_URL}/ulasan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create ulasan');
    }
    
    return response.json();
  },

  // Clear cache
  clearCache() {
    cache.makanan = null;
    cache.merchandise = null;
    cache.makananTimestamp = null;
    cache.merchandiseTimestamp = null;
    console.log('Cache cleared');
  }
};