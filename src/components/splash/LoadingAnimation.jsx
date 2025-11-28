import React from 'react';

export default function LoadingAnimation({ fadeIn, progress, loadingText }) {
  return (
    <div className={`loading-container ${fadeIn ? 'loading-visible' : ''}`}>
      <div className="loading-bar-wrapper">
        <div className="loading-bar-bg">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }}
          >
            <div className="loading-bar-shine"></div>
          </div>
        </div>
      </div>
      
      <div className="loading-info">
        <p className="loading-text">{loadingText}</p>
        <p className="loading-percentage">{Math.round(progress)}%</p>
      </div>
      
      <div className="loading-dots">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
      </div>
    </div>
  );
}