import React, { useEffect } from 'react';

const NotificationToast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const getNotificationClass = () => {
    switch (type) {
      case 'success': return 'notification-success';
      case 'error': return 'notification-error';
      case 'warning': return 'notification-warning';
      case 'info':
      default: return 'notification-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info':
      default: return 'ℹ️';
    }
  };

  return (
    <div 
      className={`notification ${getNotificationClass()}`}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        minWidth: '300px',
        maxWidth: '500px',
        zIndex: 1000,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{getIcon()}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button
          onClick={onClose}
          className="notification-close"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: 'inherit',
            padding: '0.25rem',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;