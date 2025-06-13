import React from 'react';

const Dashboard = ({ translations }) => {
  const t = translations;

  // Sample data for dashboard stats
  const stats = {
    totalCollections: 25,
    completedToday: 8,
    pendingCollections: 12,
    totalRevenue: 1250.00,
    overduePayments: 3,
    activeRoutes: 2
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="main-content">
      <div className="card">
        <div className="card-header">
          {t.dashboardTitle || 'Dashboard'}
        </div>
        <div className="card-body">
          
          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalCollections}</div>
              <div className="stat-label">{t.totalCollections || 'Total Collections'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.completedToday}</div>
              <div className="stat-label">{t.completedToday || 'Completed Today'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.pendingCollections}</div>
              <div className="stat-label">{t.pendingCollections || 'Pending Collections'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{formatCurrency(stats.totalRevenue)}</div>
              <div className="stat-label">{t.totalRevenue || 'Total Revenue'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.overduePayments}</div>
              <div className="stat-label">{t.overduePayments || 'Overdue Payments'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.activeRoutes}</div>
              <div className="stat-label">{t.activeRoutes || 'Active Routes'}</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card mt-4">
            <div className="card-header">
              Recent Activity
            </div>
            <div className="card-body">
              <div className="notification notification-info">
                <div>
                  <strong>New collection request received for 789 Pine Rd</strong>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    2 hours ago
                  </div>
                </div>
              </div>
              <div className="notification notification-success">
                <div>
                  <strong>Route A completed successfully</strong>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    4 hours ago
                  </div>
                </div>
              </div>
              <div className="notification notification-warning">
                <div>
                  <strong>Payment overdue for customer at 123 Main St</strong>
                  <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    1 day ago
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;