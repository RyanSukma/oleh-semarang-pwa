import React from 'react';

export default function Footer({ fadeOut, fadeIn }) {
  return (
    <div className={`splash-footer ${fadeIn ? 'footer-visible' : ''} ${fadeOut ? 'footer-fade-out' : ''}`}>
      <div className="footer-dots">
      </div>
      <p className="footer-brand">Oleh-Oleh Khas Semarang</p>
      <p className="footer-version">Versi 1.0</p>
    </div>
  );
}