import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ translations, user, handleLogin }) => {
  const t = translations;

  if (user) {
    return (
      <div className="home-page">
        <div className="hero-section">
          <div className="hero-container">
            <h1 className="hero-title">Welcome back, {user.name}!</h1>
            <p className="hero-subtitle">{t.welcomeSubtitle}</p>
            
            <div className="hero-buttons">
              <Link to="/dashboard" className="btn-hero btn-hero-primary">
                🏠 {t.dashboard}
              </Link>
              <Link to="/collections" className="btn-hero btn-hero-secondary">
                🗑️ {t.collections}
              </Link>
              <Link to="/payments" className="btn-hero btn-hero-secondary">
                💰 {t.payments}
              </Link>
            </div>
          </div>
        </div>

        <div className="features-section">
          <div className="features-container">
            <h2 className="section-title">{t.features}</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3 className="feature-title">{t.scheduleCollections}</h3>
                <p className="feature-description">
                  Efficiently manage and schedule waste collections for your community.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3 className="feature-title">{t.trackPayments}</h3>
                <p className="feature-description">
                  Keep track of payments and manage billing for collection services.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🗺️</div>
                <h3 className="feature-title">{t.manageRoutes}</h3>
                <p className="feature-description">
                  Optimize collection routes and monitor driver progress in real-time.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">{t.realTimeUpdates}</h3>
                <p className="feature-description">
                  Get instant updates on collection status and payment notifications.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-container">
            <h2 className="section-title">Your Impact</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">45</div>
                <div className="stat-label">Collections This Month</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12</div>
                <div className="stat-label">Routes Managed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">On-Time Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">$2.4K</div>
                <div className="stat-label">Revenue This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Welcome to Trash Collection Management</h1>
          <p className="hero-subtitle">Your comprehensive waste management solution</p>
          
          <div className="hero-buttons">
            <button 
              onClick={handleLogin}
              className="btn-hero btn-hero-primary"
            >
              🚀 {t.getStarted || 'Get Started'}
            </button>
            <button 
              className="btn-hero btn-hero-secondary"
              onClick={() => {
                document.querySelector('.features-section').scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              📖 {t.learnMore || 'Learn More'}
            </button>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <h2 className="section-title">{t.features || 'Features'}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">{t.scheduleCollections || 'Schedule Collections'}</h3>
              <p className="feature-description">
                Efficiently manage and schedule waste collections for your community with our intuitive scheduling system.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">{t.trackPayments || 'Track Payments'}</h3>
              <p className="feature-description">
                Keep track of payments and manage billing for collection services with automated invoicing.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3 className="feature-title">{t.manageRoutes || 'Manage Routes'}</h3>
              <p className="feature-description">
                Optimize collection routes and monitor driver progress in real-time for maximum efficiency.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">{t.realTimeUpdates || 'Real-time Updates'}</h3>
              <p className="feature-description">
                Get instant updates on collection status and payment notifications through our notification system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-container">
          <h2 className="section-title">Trusted by Communities</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Collections Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.5%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <div className="services-container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3 className="service-title">Residential Collection</h3>
              <p className="service-description">
                Regular household waste collection services for residential areas.
              </p>
              <div className="service-price">$25/month</div>
              <button 
                onClick={handleLogin}
                className="btn-service"
              >
                Get Started
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3 className="service-title">Commercial Collection</h3>
              <p className="service-description">
                Comprehensive waste management solutions for businesses.
              </p>
              <div className="service-price">$75/month</div>
              <button 
                onClick={handleLogin}
                className="btn-service"
              >
                Get Started
              </button>
            </div>
            <div className="service-card">
              <div className="service-icon">♻️</div>
              <h3 className="service-title">Recycling Services</h3>
              <p className="service-description">
                Specialized recycling collection and processing services.
              </p>
              <div className="service-price">$15/month</div>
              <button 
                onClick={handleLogin}
                className="btn-service"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of satisfied customers who trust us with their waste management needs.
          </p>
          <button 
            onClick={handleLogin}
            className="btn-hero btn-hero-primary"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>

      <div className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Trash Collection</h3>
              <p>Your trusted partner in waste management solutions.</p>
            </div>
            <div className="footer-section">
              <h3>Services</h3>
              <p><a href="#residential">Residential Collection</a></p>
              <p><a href="#commercial">Commercial Collection</a></p>
              <p><a href="#recycling">Recycling Services</a></p>
            </div>
            <div className="footer-section">
              <h3>Support</h3>
              <p><a href="#help">Help Center</a></p>
              <p><a href="#contact">Contact Us</a></p>
              <p><a href="#faq">FAQ</a></p>
            </div>
            <div className="footer-section">
              <h3>Company</h3>
              <p><a href="#about">About Us</a></p>
              <p><a href="#careers">Careers</a></p>
              <p><a href="#privacy">Privacy Policy</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Trash Collection Management. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;