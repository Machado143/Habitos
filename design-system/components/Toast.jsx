/**
 * Toast Component
 * 
 * Componente de notificação temporária
 * 
 * Props:
 * - message: string
 * - type: 'success' | 'error' | 'warning' | 'info'
 * - duration: number (ms)
 * - onClose: function
 * - isVisible: boolean
 */

import React, { useEffect } from 'react';
import './Toast.css';

const ToastIcon = ({ type }) => {
  switch (type) {
    case 'success':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'error':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'warning':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'info':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};

export const Toast = ({ 
  message,
  type = 'info',
  duration = 4000,
  onClose,
  isVisible = true,
  className = '',
  ...props
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const classNames = [
    'toast',
    `toast-${type}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classNames}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <span className="toast-icon">
        <ToastIcon type={type} />
      </span>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * ToastContainer - Container para múltiplos toasts
 */
export const ToastContainer = ({ children, position = 'top-right' }) => {
  const positionClass = `toast-container-${position}`;
  
  return (
    <div className={`toast-container ${positionClass}`}>
      {children}
    </div>
  );
};

export default Toast;
