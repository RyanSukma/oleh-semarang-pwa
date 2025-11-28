import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ChefHat, ShoppingBag, User } from 'lucide-react'; 
import '../../styles/BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Home size={22} strokeWidth={1.8} />
        <span className="nav-label">Beranda</span>
      </NavLink>

      <NavLink to="/makanan" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <ChefHat size={22} strokeWidth={1.8} />
        <span className="nav-label">Makanan</span>
      </NavLink>

      <NavLink to="/merchandise" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <ShoppingBag size={22} strokeWidth={1.8} />
        <span className="nav-label">Merchandise</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <User size={22} strokeWidth={1.8} />
        <span className="nav-label">Profile</span>
      </NavLink>

    </nav>
  );
}
