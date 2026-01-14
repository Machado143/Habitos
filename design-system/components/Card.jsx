/**
 * Card Component
 * 
 * Componente de card com cabeçalho, corpo e rodapé opcionais
 * 
 * Props:
 * - title: string
 * - subtitle: string
 * - children: ReactNode
 * - footer: ReactNode
 * - variant: 'default' | 'bordered' | 'elevated'
 * - hoverable: boolean
 * - padding: 'sm' | 'base' | 'lg'
 */

import React from 'react';
import './Card.css';

export const Card = ({ 
  title,
  subtitle,
  children,
  footer,
  variant = 'default',
  hoverable = false,
  padding = 'base',
  className = '',
  ...props
}) => {
  const classNames = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable && 'card-hoverable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
