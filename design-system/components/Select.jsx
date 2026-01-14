/**
 * Select Component
 * 
 * Componente de seleção/dropdown
 * 
 * Props:
 * - label: string
 * - options: Array<{ value: string, label: string }>
 * - value: string
 * - onChange: function
 * - error: string
 * - disabled: boolean
 * - required: boolean
 * - placeholder: string
 */

import React, { forwardRef } from 'react';
import './Select.css';

export const Select = forwardRef(({ 
  label,
  options = [],
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  placeholder = 'Selecione uma opção',
  className = '',
  id,
  name,
  ...props
}, ref) => {
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const wrapperClasses = [
    'select-wrapper',
    hasError && 'select-wrapper-error',
    disabled && 'select-wrapper-disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={selectId} className="select-label">
          {label}
          {required && <span className="select-required" aria-label="obrigatório">*</span>}
        </label>
      )}
      
      <div className="select-container">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${selectId}-error` : undefined}
          className="select-field"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="select-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {hasError && (
        <span id={`${selectId}-error`} className="select-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
