import React from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode, MdMenu } from 'react-icons/md';
import './Navbar.css';

const Navbar = ({ toggleTheme, theme, toggleMobileMenu }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="mobile-menu-btn btn-ghost" onClick={toggleMobileMenu}>
          <MdMenu size={24} />
        </button>
        <h1 className="navbar-logo mobile-only-logo">CommTrack</h1>
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle btn-ghost">
            {theme === 'dark' ? <MdOutlineLightMode size={20} /> : <MdOutlineDarkMode size={20} />}
          </button>
          <div className="user-profile">
            <div className="avatar">JD</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;