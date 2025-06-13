import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Basic component imports
const HomePage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Welcome to Trash Collection Management</h1>
    <p>Your waste management solution</p>
  </div>
);

const Dashboard = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Dashboard</h1>
    <p>Dashboard content will go here</p>
  </div>
);

const Navbar = ({ user, handleLogout }) => (
  <nav style={{ 
    background: '#2c3e50', 
    padding: '1rem', 
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>🗑️ Trash Collection</div>
    <div>
      {user ? (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Welcome, {user.name}</span>
          <button 
            onClick={handleLogout}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button style={{
          background: '#3498db',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Login
        </button>
      )}
    </div>
  </nav>
);

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    setUser({ id: 1, name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Navbar user={user} handleLogout={handleLogout} />
      
      <Routes>
        <Route
          path="/"
          element={<HomePage handleLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </div>
  );
};

export default App;