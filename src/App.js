import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import your components
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import CollectionPage from './components/CollectionPage';
import PaymentsPage from './components/PaymentsPage';
import ExtraCollectionPage from './components/ExtraCollectionPage';
import ExtraPaymentPage from './components/ExtraPaymentPage';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';

// Import sample data and translations (with fallback)
let sampleData, translations;

try {
  sampleData = require('./data/sampleData').default;
  translations = require('./data/translations').default;
} catch (error) {
  console.log('Using fallback data');
  // Fallback data if files don't exist
  sampleData = { 
    collections: [
      {
        id: 1,
        customer: 'John Smith',
        address: '123 Main St, Galle',
        wasteType: 'Household Waste',
        date: '2025-06-15',
        time: '09:00',
        status: 'scheduled',
        amount: 2500,
        notes: 'Regular weekly collection'
      }
    ], 
    payments: [
      {
        id: 1,
        customer: 'John Smith',
        amount: 2500,
        date: '2025-06-10',
        method: 'Credit Card',
        status: 'paid',
        invoice: 'INV-001',
        description: 'Weekly waste collection'
      }
    ]
  };

  translations = {
    welcomeTitle: 'Welcome to Trash Collection Management',
    welcomeSubtitle: 'Your waste management solution',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    features: 'Features',
    dashboard: 'Dashboard',
    collections: 'Collections',
    payments: 'Payments',
    scheduleCollections: 'Schedule Collections',
    trackPayments: 'Track Payments',
    manageRoutes: 'Manage Routes',
    realTimeUpdates: 'Real-time Updates'
  };
}

function App() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [collections, setCollections] = useState(sampleData.collections || []);
  const [payments, setPayments] = useState(sampleData.payments || []);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('trashapp_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('trashapp_user');
      }
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    const newUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin'
    };
    setUser(newUser);
    localStorage.setItem('trashapp_user', JSON.stringify(newUser));
    
    // Show welcome notification
    addNotification('success', 'Welcome!', 'Successfully logged in to your account.');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('trashapp_user');
    addNotification('info', 'Logged Out', 'You have been successfully logged out.');
  };

  // Add notification
  const addNotification = (type, title, message) => {
    const notification = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <div className="App">
        {/* Show Navbar only when user is logged in */}
        {user && (
          <Navbar 
            user={user} 
            handleLogout={handleLogout}
            translations={translations}
          />
        )}

        {/* Main Content */}
        <main className={user ? 'main-with-navbar' : 'main-full'}>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <HomePage 
                  translations={translations}
                  user={user}
                  handleLogin={handleLogin}
                />
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard 
                    user={user}
                    collections={collections}
                    payments={payments}
                    translations={translations}
                    addNotification={addNotification}
                  />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/collections" 
              element={
                <ProtectedRoute>
                  <CollectionPage 
                    collections={collections}
                    setCollections={setCollections}
                    translations={translations}
                    addNotification={addNotification}
                  />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/payments" 
              element={
                <ProtectedRoute>
                  <PaymentsPage 
                    payments={payments}
                    setPayments={setPayments}
                    translations={translations}
                    addNotification={addNotification}
                  />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/extra-collection" 
              element={
                <ProtectedRoute>
                  <ExtraCollectionPage 
                    translations={translations}
                    addNotification={addNotification}
                    setCollections={setCollections}
                  />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/extra-payment" 
              element={
                <ProtectedRoute>
                  <ExtraPaymentPage 
                    translations={translations}
                    addNotification={addNotification}
                  />
                </ProtectedRoute>
              } 
            />

            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Notification Toast Container */}
        <NotificationToast 
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </div>
    </Router>
  );
}

export default App;