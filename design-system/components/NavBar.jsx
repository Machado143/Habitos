/**
 * NavBar Component
 * 
 * Barra de navegação principal com logo, menu e ações
 * 
 * Props:
 * - user: { name: string, avatar?: string }
 * - onLogout: function
 * - showMobileMenu: boolean
 * - onToggleMobileMenu: function
 */

import React from 'react';
import './NavBar.css';

export const NavBar = ({ 
  user,
  onLogout,
  showMobileMenu = false,
  onToggleMobileMenu,
  className = '',
  ...props
}) => {
  const classNames = ['navbar', className].filter(Boolean).join(' ');

  return (
    <nav className={classNames} {...props}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <button 
            className="navbar-menu-toggle"
            onClick={onToggleMobileMenu}
            aria-label="Abrir menu"
            aria-expanded={showMobileMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          
          <a href="/" className="navbar-logo">
            <span className="navbar-logo-icon">✓</span>
            <span className="navbar-logo-text">Hábitos</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <a href="/dashboard" className="navbar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Dashboard
          </a>
          
          <a href="/habits" className="navbar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 11V17M15 7V17M3 21H21M3 3L3 21M3 3H21M21 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Meus Hábitos
          </a>
          
          <a href="/reports" className="navbar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 7H21M21 7V15M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Relatórios
          </a>
        </div>

        {/* User Menu */}
        {user && (
          <div className="navbar-actions">
            <div className="navbar-user">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="navbar-avatar" />
              ) : (
                <div className="navbar-avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="navbar-username">{user.name}</span>
            </div>

            <button 
              className="navbar-logout"
              onClick={onLogout}
              aria-label="Sair"
              title="Sair"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 16L21 12M21 12L17 8M21 12H9M9 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
