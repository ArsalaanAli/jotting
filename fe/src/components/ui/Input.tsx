import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  icon,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = props.type === 'password';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            ${icon ? 'pl-10' : 'pl-4'}
            ${isPasswordType ? 'pr-10' : 'pr-4'}
            py-2 block w-full rounded-md 
            ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} 
            shadow-sm 
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''} 
            ${className}
          `}
          {...props}
          type={isPasswordType ? (showPassword ? 'text' : 'password') : props.type}
        />
        {isPasswordType && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;