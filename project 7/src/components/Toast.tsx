import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${getBgColor()}`}
    >
      {getIcon()}
      <span className="ml-3 text-sm font-medium text-gray-900">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  );
};

// Toast Manager Component
interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const ToastManager: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Function to add toast (can be called from anywhere)
  const addToast = (message: string, type: 'success' | 'error' | 'info', duration?: number) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Make addToast available globally
  useEffect(() => {
    interface WindowWithToast extends Window {
      showToast?: (message: string, type: 'success' | 'error' | 'info', duration?: number) => void;
    }
    (window as WindowWithToast).showToast = addToast;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Simple toast API
export const toast = {
  success: (message: string, duration?: number) => {
    interface WindowWithToast extends Window {
      showToast?: (message: string, type: 'success' | 'error' | 'info', duration?: number) => void;
    }
    const w = window as WindowWithToast;
    if (w.showToast) {
      w.showToast(message, 'success', duration);
    }
  },
  error: (message: string, duration?: number) => {
    interface WindowWithToast extends Window {
      showToast?: (message: string, type: 'success' | 'error' | 'info', duration?: number) => void;
    }
    const w = window as WindowWithToast;
    if (w.showToast) {
      w.showToast(message, 'error', duration);
    }
  },
  info: (message: string, duration?: number) => {
    interface WindowWithToast extends Window {
      showToast?: (message: string, type: 'success' | 'error' | 'info', duration?: number) => void;
    }
    const w = window as WindowWithToast;
    if (w.showToast) {
      w.showToast(message, 'info', duration);
    }
  }
};

export default Toast;