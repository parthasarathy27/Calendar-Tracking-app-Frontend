import React from 'react';
import './Navbar.css';

const Navbar = ({ toggleTheme, currentTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Calendar Tracker</div>
      <div className="navbar-actions">
        <button onClick={toggleTheme} className="theme-toggle">
          {currentTheme === 'dark' ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;