import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Mail, Phone, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationToast = ({ 
  message, 
  onClose, 
  type = 'success', 
  title = '',
  duration = 5000,
  showProgress = true,
  actions = [] 
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, duration);

    // Progress bar animation
    if (showProgress) {
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (duration / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [onClose, duration, showProgress]);

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500',
          titleColor: 'text-green-900',
          messageColor: 'text-green-700',
          progressColor: 'bg-green-500'
        };
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500',
          titleColor: 'text-red-900',
          messageColor: 'text-red-700',
          progressColor: 'bg-red-500'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-900',
          messageColor: 'text-yellow-700',
          progressColor: 'bg-yellow-500'
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700',
          progressColor: 'bg-blue-500'
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-900',
          messageColor: 'text-gray-700',
          progressColor: 'bg-gray-500'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  const getDefaultTitle = () => {
    if (title) return title;
    switch (type) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Information';
      default:
        return 'Notification';
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md transition-all duration-300 ${
      isVisible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'
    }`}>
      <div className={`${config.bgColor} ${config.borderColor} rounded-lg shadow-lg border-2 overflow-hidden`}>
        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full bg-gray-200 h-1">
            <div 
              className={`h-full transition-all duration-100 ease-linear ${config.progressColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Main Content */}
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            
            <div className="ml-3 flex-1">
              <p className={`text-sm font-semibold ${config.titleColor}`}>
                {getDefaultTitle()}
              </p>
              <p className={`text-sm mt-1 ${config.messageColor}`}>
                {message}
              </p>
              
              {/* SMS and Email indicators for success notifications */}
              {type === 'success' && (
                <div className="mt-3 flex items-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center animate-pulse">
                    <Phone className="w-3 h-3 mr-1 text-green-500" />
                    <span className="text-green-600">SMS Sent</span>
                  </div>
                  <div className="flex items-center animate-pulse">
                    <Mail className="w-3 h-3 mr-1 text-green-500" />
                    <span className="text-green-600">Email Sent</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {actions.length > 0 && (
                <div className="mt-3 flex space-x-2">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.onClick}
                      className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                        action.type === 'primary' 
                          ? `${config.progressColor} text-white hover:opacity-80`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

