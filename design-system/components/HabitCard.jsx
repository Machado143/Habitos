/**
 * HabitCard Component
 * 
 * Card para exibir um hábito individual com progresso e ações
 * 
 * Props:
 * - habit: {
 *     id: string,
 *     name: string,
 *     frequency: 'daily' | 'weekly',
 *     streak: number,
 *     completed: boolean,
 *     progress: number
 *   }
 * - onEdit: function
 * - onDelete: function
 * - onToggleComplete: function
 */

import React from 'react';
import './HabitCard.css';

export const HabitCard = ({ 
  habit,
  onEdit,
  onDelete,
  onToggleComplete,
  className = '',
  ...props
}) => {
  const { name, frequency, streak, completed, progress = 0 } = habit;

  const classNames = [
    'habit-card',
    completed && 'habit-card-completed',
    className
  ].filter(Boolean).join(' ');

  const frequencyLabel = frequency === 'daily' ? 'Diário' : 'Semanal';
  const progressPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={classNames} {...props}>
      <div className="habit-card-header">
        <div className="habit-card-info">
          <h3 className="habit-card-title">{name}</h3>
          <span className="habit-card-frequency">{frequencyLabel}</span>
        </div>

        <div className="habit-card-actions">
          <button
            className="habit-card-action"
            onClick={() => onEdit?.(habit)}
            aria-label="Editar hábito"
            title="Editar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <button
            className="habit-card-action habit-card-action-danger"
            onClick={() => onDelete?.(habit)}
            aria-label="Excluir hábito"
            title="Excluir"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="habit-card-body">
        {/* Progress Bar */}
        <div className="habit-card-progress">
          <div className="habit-card-progress-bar">
            <div 
              className="habit-card-progress-fill"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <span className="habit-card-progress-text">{progressPercentage}%</span>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="habit-card-streak">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 6 6 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 6 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{streak} {streak === 1 ? 'dia' : 'dias'} seguidos</span>
          </div>
        )}
      </div>

      <div className="habit-card-footer">
        <button
          className={`habit-card-complete ${completed ? 'completed' : ''}`}
          onClick={() => onToggleComplete?.(habit)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {completed ? 'Concluído hoje' : 'Marcar como concluído'}
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
