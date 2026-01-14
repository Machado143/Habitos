/**
 * Input Component
 * 
 * Componente de campo de entrada com label, erro e estados
 * 
 * Props:
 * - label: string
 * - type: string (text, email, password, number, etc.)
 * - value: string | number
 * - onChange: function
 * - placeholder: string
 * - error: string
 * - disabled: boolean
 * - required: boolean
 * - helperText: string
 * - size: 'sm' | 'base' | 'lg'
 * - icon: ReactNode
 */

import React, { forwardRef } from 'react';
import './Input.css';

export const Input = forwardRef(({ 
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  helperText,
  size = 'base',
  icon,
  className = '',
  id,
  name,
  fullWidth = false,
  ...props
}, ref) => {
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const wrapperClasses = [
    'input-wrapper',
    `input-wrapper-${size}`,
    hasError && 'input-wrapper-error',
    disabled && 'input-wrapper-disabled',
    icon && 'input-wrapper-with-icon',
    fullWidth && 'input-wrapper-fullwidth',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="obrigatório">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <span className="input-icon" aria-hidden="true">{icon}</span>}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
            className="input-field"
            {...props}
          />
        
        />
      </div>

      {helperText && !hasError && (
        <span id={`${inputId}-helper`} className="input-helper">
          {helperText}
        </span>
      )}

      {hasError && (
        <span id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
