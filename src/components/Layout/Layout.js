import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className="layout">
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
      <main className="main-content">
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
