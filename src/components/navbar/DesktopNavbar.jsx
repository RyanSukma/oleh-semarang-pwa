import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/DesktopNavbar.css';
import logo from '../../assets/semar.png';

export default function DesktopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="desktop-navbar">
  <div className="desktop-navbar-container">
    <div className="navbar-brand" onClick={() => navigate('/')}>
      <img 
        src={logo} 
        alt="Oleh-Oleh Semar Logo" 
        className="navbar-logo-img"
      />
      <span className="navbar-title">Oleh-Oleh Semar</span>
    </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <button 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <span className="nav-link-text">Beranda</span>
          </button>

          <button 
            className={`nav-link ${isActive('/makanan') || location.pathname.startsWith('/makanan/') ? 'active' : ''}`}
            onClick={() => navigate('/makanan')}
          >
            <span className="nav-link-text">Makanan</span>
          </button>

          <button 
            className={`nav-link ${isActive('/merchandise') || location.pathname.startsWith('/merchandise/') ? 'active' : ''}`}
            onClick={() => navigate('/merchandise')}
          >
            <span className="nav-link-text">Merchandise</span>
          </button>

          <button 
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            <span className="nav-link-text">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}