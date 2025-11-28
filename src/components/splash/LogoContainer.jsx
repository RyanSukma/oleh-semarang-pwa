import React from 'react';
import semarLogo from "../../assets/semar.png";


export default function LogoContainer() {
  return (
    <div className="logo-container">
      <div className="logo-card">
        <div className="logo-wrapper">
          <div className="logo-glow"></div>
          <img src={semarLogo} alt="Logo Semar" className="logo-icon" />
        </div>
      </div>
      <div className="logo-rings">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>
    </div>
  );
}