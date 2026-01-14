/**
 * EmptyState Component
 * 
 * Componente para exibir estado vazio com mensagem e ação
 * 
 * Props:
 * - icon: ReactNode
 * - title: string
 * - description: string
 * - action: ReactNode
 */

import React from 'react';
import './EmptyState.css';

export const EmptyState = ({ 
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}) => {
  const classNames = ['empty-state', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {icon && <div className="empty-state-icon">{icon}</div>}
      
      {title && <h3 className="empty-state-title">{title}</h3>}
      
      {description && <p className="empty-state-description">{description}</p>}
      
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
