import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ translations, user, handleLogin }) => {
  const t = translations;

  if (user) {
    return (
      <div className="main-content">
        <div className="card">
          <div className="card-header">
            {t.welcomeTitle}
          </div>
          <div className="card-body">
            <h2>Welcome back, {user.name}!</h2>
            <p className="mb-4">{t.welcomeSubtitle}</p>
            
            <div className="stats-grid">
              <div className="stat-card">
                <Link to="/dashboard" className="btn btn-primary">
                  {t.dashboard}
                </Link>
              </div>
              <div className="stat-card">
                <Link to="/collections" className="btn btn-success">
                  {t.collections}
                </Link>
              </div>
              <div className="stat-card">
                <Link to="/payments" className="btn btn-warning">
                  {t.payments}
                </Link>
              </div>
            </div>

            <div className="mt-5">
              <h3>{t.features}</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <h4>{t.scheduleCollections}</h4>
                  <p>Efficiently manage and schedule waste collections for your community.</p>
                </div>
                <div className="stat-card">
                  <h4>{t.trackPayments}</h4>
                  <p>Keep track of payments and manage billing for collection services.</p>
                </div>
                <div className="stat-card">
                  <h4>{t.manageRoutes}</h4>
                  <p>Optimize collection routes and monitor driver progress in real-time.</p>
                </div>
                <div className="stat-card">
                  <h4>{t.realTimeUpdates}</h4>
                  <p>Get instant updates on collection status and payment notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-body text-center">
          <h1 className="mb-4">{t.welcomeTitle}</h1>
          <p className="mb-5" style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
            {t.welcomeSubtitle}
          </p>
          
          <div className="mb-5">
            <button 
              onClick={handleLogin}
              className="btn btn-primary mr-3"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              {t.getStarted}
            </button>
            <button 
              className="btn btn-secondary"
              style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
            >
              {t.learnMore}
            </button>
          </div>

          <div className="mt-5">
            <h2 className="mb-4">{t.features}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">📅</div>
                <h4>{t.scheduleCollections}</h4>
                <p>Efficiently manage and schedule waste collections for your community.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">💰</div>
                <h4>{t.trackPayments}</h4>
                <p>Keep track of payments and manage billing for collection services.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">🗺️</div>
                <h4>{t.manageRoutes}</h4>
                <p>Optimize collection routes and monitor driver progress in real-time.</p>
              </div>
              <div className="stat-card">
                <div className="stat-number">⚡</div>
                <h4>{t.realTimeUpdates}</h4>
                <p>Get instant updates on collection status and payment notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;