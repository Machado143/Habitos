/**
 * Button Component
 * 
 * Componente de botão com variantes e estados
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * - size: 'sm' | 'base' | 'lg'
 * - loading: boolean
 * - disabled: boolean
 * - fullWidth: boolean
 * - onClick: function
 * - type: 'button' | 'submit' | 'reset'
 * - children: ReactNode
 */

import React from 'react';
import './Button.css';

export const Button = ({ 
  variant = 'primary',
  size = 'base',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg className="spinner" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;
