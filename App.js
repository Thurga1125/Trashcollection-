import React, { useState } from 'react';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import PaymentsPage from './components/PaymentsPage';
import ExtraCollectionPage from './components/ExtraCollectionPage';
import ExtraPaymentPage from './components/ExtraPaymentPage';
import Navbar from './components/Navbar';
import NotificationToast from './components/NotificationToast';
import { sampleUser } from './data/sampleData';
import { translations } from './data/translations';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notificationMessage, setNotificationMessage] = useState('');

  const t = translations[language];

  const handleLogin = () => {
    setUser(sampleUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            language={language}
            setLanguage={setLanguage}
            onLogin={handleLogin}
            t={t}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            user={user}
            setCurrentPage={setCurrentPage}
            t={t}
          />
        );
      case 'payments':
        return (
          <PaymentsPage 
            user={user}
            showNotificationMessage={showNotificationMessage}
            t={t}
          />
        );
      case 'extraCollection':
        return (
          <ExtraCollectionPage 
            setCurrentPage={setCurrentPage}
            t={t}
          />
        );
      case 'extraPayment':
        return (
          <ExtraPaymentPage 
            showNotificationMessage={showNotificationMessage}
            setCurrentPage={setCurrentPage}
            t={t}
          />
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Navbar 
          user={user}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}
      
      <main className={user ? 'pt-16' : ''}>
        {user ? (
          <div className="container mx-auto px-4 py-8">
            {renderPage()}
          </div>
        ) : (
          renderPage()
        )}
      </main>

      {showNotification && (
        <NotificationToast 
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default App;