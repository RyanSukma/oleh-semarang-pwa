import React from 'react';

export default function BackgroundPattern({ fadeOut }) {
  return (
    <div className={`splash-bg-pattern ${fadeOut ? 'pattern-fade-out' : ''}`}>
      <div className="pattern-circle pattern-1"></div>
      <div className="pattern-circle pattern-2"></div>
      <div className="pattern-circle pattern-3"></div>
      <div className="pattern-circle pattern-4"></div>
    </div>
  );
}