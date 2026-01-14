/**
 * Badge Component
 * 
 * Componente de badge/etiqueta para status e categorias
 * 
 * Props:
 * - variant: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
 * - size: 'sm' | 'base'
 * - children: ReactNode
 */

import React from 'react';
import './Badge.css';

export const Badge = ({ 
  variant = 'neutral',
  size = 'base',
  children,
  className = '',
  ...props
}) => {
  const classNames = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames} {...props}>
      {children}
    </span>
  );
};

export default Badge;
