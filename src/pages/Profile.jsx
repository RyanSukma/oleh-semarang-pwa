import React from 'react';
import '../styles/Profile.css';
import semarLogo from '../assets/semar.png';

// Import icon dari lucide-react
import { Smartphone, Building2, UserCheck, Heart } from "lucide-react";

export default function Profile() {
  return (
    <div className="page-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-logo">
            <img 
              src={semarLogo} 
              alt="Semar Logo" 
              className="profile-logo-img"
            />
          </div>
          <h1>Oleh-Oleh Semar</h1>
          <p className="profile-tagline">Bringing Semarang Home</p>
        </div>

        <div className="profile-section">
          <h2>
            <Smartphone size={22} style={{ marginRight: 8 }} /> Tentang Aplikasi
          </h2>
          <p className="text-justify">
            Oleh-oleh Semar merupakan sebuah platform web yang dirancang untuk memudahkan pengguna dalam menemukan berbagai pilihan oleh-oleh khas Semarang. Mulai dari makanan tradisional seperti lumpia, wingko babat, bandeng presto, hingga merchandise unik yang mencerminkan budaya kota, semuanya disajikan dalam satu tempat yang praktis dan mudah diakses.
            Aplikasi ini hadir untuk membantu wisatawan, perantau, maupun masyarakat lokal yang ingin mencari rekomendasi oleh-oleh dengan cepat tanpa harus berkeliling kota. Setiap produk dilengkapi dengan deskripsi, gambar, serta informasi toko, sehingga pengguna dapat memilih sesuai kebutuhan dan preferensi mereka. Dengan tampilan yang sederhana namun informatif, Oleh-oleh Semar menjadi solusi modern bagi siapa pun yang ingin membawa pulang kenangan khas dari Kota Semarang.
          </p>
        </div>

        <div className="profile-section">
          
          <h2>
            <Building2 size={22} style={{ marginRight: 8 }} /> Tentang Semarang
          </h2>
          <p className="text-justify">
            Semarang adalah ibu kota Provinsi Jawa Tengah yang dikenal sebagai "Kota Lumpia" dan "Kota Atlas". 
            Kota ini memiliki berbagai kuliner dan oleh-oleh khas yang terkenal hingga ke seluruh Indonesia. 
            Selain kaya akan cita rasa, Semarang juga memiliki warisan budaya yang kuat, tercermin dari bangunan bersejarah seperti Lawang Sewu, Kota Lama, dan Sam Poo Kong yang menjadi ikon wisata favorit.
            Tidak hanya itu, perkembangan kota yang pesat menjadikan Semarang sebagai pusat perdagangan dan pariwisata di pesisir utara Jawa. 
            Berbagai produk UMKM, mulai dari makanan, kerajinan tangan, hingga merchandise khas, terus berkembang dan semakin banyak diburu wisatawan. 
            Kombinasi antara sejarah, budaya, dan kekayaan kuliner membuat Semarang menjadi destinasi yang unik sekaligus memberikan pengalaman lengkap bagi para pengunjung.
          </p>
        </div>

        <div className="profile-section">
          <h2>
            <UserCheck size={22} style={{ marginRight: 8 }} /> Informasi Developer
          </h2>
          <div className="developer-info">
            <p><strong>Nama:</strong> Ryan Sukma Purwojanarko</p>
            <p><strong>NIM:</strong> 21120123130100</p>
            <p><strong>Prodi:</strong> Teknik Komputer</p>
            <p><strong>Angkatan:</strong> 2023</p>
          </div>
        </div>

        <div className="profile-footer"> 
          <p>Made with ❤️ for Praktikum Perangkat Bergerak</p> 
          <p className="version">Version 1.0.0</p> 
        </div> 
      </div> 
    </div> 
  ); }