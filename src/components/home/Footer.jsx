import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  UtensilsCrossed, 
  Gift, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  BookOpen,
  Target,
  Star,
  Handshake
} from 'lucide-react';
import logo from '../../assets/semar.png'; // ⭐ Import logo
import '../../styles/Footer.css';

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <img 
              src={logo} 
              alt="Oleh-Oleh Semar Logo" 
              className="footer-logo-icon"
            />
            <h3 className="footer-brand-name">Oleh-Oleh Semar</h3>
          </div>
          <p className="footer-tagline">
            Destinasi terpercaya untuk oleh-oleh khas Semarang. 
            Temukan cita rasa autentik dan kerajinan berkualitas dari Kota Lumpia.
          </p>
          <div className="footer-social">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://wa.me/62247123456" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Jelajahi</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => navigate('/')} className="footer-link">
                <Home size={16} />
                <span>Beranda</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/makanan')} className="footer-link">
                <UtensilsCrossed size={16} />
                <span>Makanan</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/merchandise')} className="footer-link">
                <Gift size={16} />
                <span>Merchandise</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/profile')} className="footer-link">
                <User size={16} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Tentang Kami */}
        <div className="footer-section">
          <h4 className="footer-heading">Tentang Kami</h4>
          <ul className="footer-links">
            <li>
              <span className="footer-link-static">
                <BookOpen size={16} className="category-icon" />
                <span>Cerita Kami</span>
              </span>
            </li>
            <li>
              <span className="footer-link-static">
                <Target size={16} className="category-icon" />
                <span>Visi & Misi</span>
              </span>
            </li>
            <li>
              <span className="footer-link-static">
                <Star size={16} className="category-icon" />
                <span>Testimoni</span>
              </span>
            </li>
            <li>
              <span className="footer-link-static">
                <Handshake size={16} className="category-icon" />
                <span>Mitra Kami</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Kontak Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Kontak Kami</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Jl. Pemuda No. 123<br/>Semarang, Jawa Tengah</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:info@oleholehsemar.com">info@oleholehsemar.com</a>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:+62247123456">+62 24 7123 456</a>
            </li>
            <li>
              <Clock size={18} className="contact-icon" />
              <span>Senin - Sabtu<br/>08:00 - 20:00 WIB</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            © {currentYear} Oleh-Oleh Semar. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Kebijakan Privasi</span>
            <span className="footer-divider">•</span>
            <span className="footer-bottom-link">Syarat & Ketentuan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}