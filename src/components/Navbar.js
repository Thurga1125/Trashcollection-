import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  translations, 
  user, 
  currentPage, 
  setCurrentPage, 
  handleLogout, 
  language, 
  setLanguage 
}) => {
  const t = translations;

  const navItems = [
    { key: 'home', path: '/', label: t.home },
    { key: 'dashboard', path: '/dashboard', label: t.dashboard },
    { key: 'collections', path: '/collections', label: t.collections },
    { key: 'payments', path: '/payments', label: t.payments },
    { key: 'extra-collections', path: '/extra-collections', label: t.extraCollections },
    { key: 'extra-payments', path: '/extra-payments', label: t.extraPayments }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link 
          to="/" 
          className="navbar-brand"
          onClick={() => setCurrentPage('home')}
        >
          🗑️ Trash Collection
        </Link>

        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                to={item.path}
                className={`nav-link ${currentPage === item.key ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.key)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              backgroundColor: 'white'
            }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* User Menu */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#ecf0f1' }}>
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                style={{ 
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem'
                }}
              >
                {t.logout}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ 
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              {t.login}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;