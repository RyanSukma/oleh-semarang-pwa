import React from 'react';

export default function TitleSection({ fadeIn }) {
  return (
    <div className={`title-section ${fadeIn ? 'title-visible' : ''}`}>
      <h1 className="splash-title">
        Oleh-Oleh
        <br />
        <span className="splash-title-highlight">Semar</span>
      </h1>
      <div className="title-underline"></div>
      <p className="splash-tagline">Kenangan Khas Kota Atlas</p>
      <p className="splash-subtitle">Tradisi Rasa Semarang</p>
    </div>
  );
}