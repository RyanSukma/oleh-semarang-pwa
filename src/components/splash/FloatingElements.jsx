import React from 'react';

export default function FloatingElements({ fadeOut }) {
  return (
    <div className={`floating-elements ${fadeOut ? 'elements-fade-out' : ''}`}>
      <div className="float-item float-1">🍜</div>
      <div className="float-item float-2">🥘</div>
      <div className="float-item float-3">🛍️</div>
      <div className="float-item float-4">🎁</div>
      <div className="float-item float-5">🏛️</div>
      <div className="float-item float-6">🍲</div>
    </div>
  );
}