import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

type ToastProps = {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Allow exit animation to complete
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div 
      className={`${getBackgroundColor()} rounded-lg border shadow-sm p-4 w-72 transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            type="button"
            className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;