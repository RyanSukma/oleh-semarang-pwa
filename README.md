# Oleh-oleh Semar

**Nama:** Ryan Sukma Purwojanarko  
**NIM:** 21120123130100


## Deskripsi

Oleh-oleh Semar merupakan sebuah platform web yang dirancang untuk memudahkan pengguna dalam menemukan berbagai pilihan oleh-oleh khas Semarang. Mulai dari makanan tradisional seperti lumpia, wingko babat, bandeng presto, hingga merchandise unik yang mencerminkan budaya kota, semuanya disajikan dalam satu tempat yang praktis dan mudah diakses.

Aplikasi ini hadir untuk membantu wisatawan, perantau, maupun masyarakat lokal yang ingin mencari rekomendasi oleh-oleh dengan cepat tanpa harus berkeliling kota. Setiap produk dilengkapi dengan deskripsi, gambar, serta informasi toko, sehingga pengguna dapat memilih sesuai kebutuhan dan preferensi mereka.

## Teknologi

**Frontend:**
- React.js (Progressive Web App)
- Vite

**Backend:**
- Node.js & Express.js
- Supabase (Database & Authentication)
- Deployed on Vercel

## Struktur Proyek

```
TA-PPB/
├── oleh-oleh-semarang-api/          # Backend API
│   ├── node_modules/
│   ├── src/
│   │   ├── config/                  # Konfigurasi database & environment
│   │   ├── controllers/             # Logika bisnis
│   │   ├── models/                  # Model database
│   │   └── routes/                  # API routes
│
└── oleh-oleh-semarang-pwa/          # Frontend PWA
    ├── dist/                        # Build production
    ├── node_modules/
    ├── public/                      # File statis publik
    └── src/
        ├── assets/                  # Gambar, icon, dll
        ├── components/              # Komponen React reusable
        ├── pages/                   # Halaman aplikasi
        ├── services/                # API services & HTTP requests
        └── styles/                  # CSS/styling files
```

## Instalasi

### Frontend (PWA)

1. Clone repository
```bash
git clone <repository-url>
cd oleh-oleh-semarang-pwa
```

2. Install dependencies
```bash
npm install
```

3. Buat file `.env` dan tambahkan API URL
```env
VITE_API_URL=https://oleh-semarang-api.vercel.app/api
```

4. Jalankan aplikasi
```bash
npm run dev
```

### Backend (API)

Backend sudah di-deploy di Vercel dan menggunakan Supabase sebagai database.

API URL: `https://oleh-semarang-api.vercel.app`

## Fitur Utama

- Katalog makanan khas Semarang (lumpia, wingko babat, bandeng presto, dll)
- Katalog merchandise dan souvenir khas Semarang
- Detail produk lengkap dengan deskripsi dan gambar
- Informasi toko untuk setiap produk
- Ulasan dan rating produk
- Progressive Web App (dapat diinstall di perangkat)

## API Endpoints

Base URL: `https://oleh-semarang-api.vercel.app/api`

- `GET /makanan` - Mendapatkan daftar makanan
- `GET /makanan/:id` - Detail makanan
- `GET /merchandise` - Mendapatkan daftar merchandise
- `GET /merchandise/:id` - Detail merchandise
- `GET /ulasan` - Mendapatkan ulasan
- `POST /ulasan` - Membuat ulasan baru


## Link Demo

- Frontend: https://oleh-semarang-pwa.vercel.app/
- Backend API: https://oleh-semarang-api.vercel.app/api
---