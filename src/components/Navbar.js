import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, handleLogout, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🗑️</span>
          Trash Collection
        </Link>

        <ul className={`navbar-menu ${isMenuOpen ? 'mobile-open' : ''}`}>
          <li className="navbar-item">
            <Link 
              to="/dashboard" 
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/collections" 
              className={`navbar-link ${isActive('/collections') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/payments" 
              className={`navbar-link ${isActive('/payments') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Payments
            </Link>
          </li>
          <li className="navbar-item navbar-dropdown">
            <span className="navbar-link">Services</span>
            <div className="dropdown-menu">
              <Link 
                to="/extra-collection" 
                className="dropdown-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Extra Collection
              </Link>
              <Link 
                to="/extra-payment" 
                className="dropdown-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Extra Payment
              </Link>
            </div>
          </li>
        </ul>

        <div className="navbar-actions">
          <div className="notification-badge">
            <span className="notification-icon">🔔</span>
            <span className="badge">3</span>
          </div>
          
          <div className="user-menu">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="user-dropdown">
              <div className="dropdown-item" style={{fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px'}}>
                {user?.name || 'User'}
              </div>
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <button 
                onClick={handleLogout}
                className="dropdown-item" 
                style={{background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer'}}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;