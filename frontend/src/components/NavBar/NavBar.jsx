import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/habits', label: 'Hábitos', icon: '📋' },
    { path: '/create', label: 'Novo', icon: '➕' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">H</div>
          <span className="navbar-logo-text">Habitcs</span>
        </Link>

        <div className={`navbar-links ${mobileMenuOpen ? 'navbar-links-mobile' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${isActive(link.path) ? 'navbar-link-active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="navbar-link-icon">{link.icon}</span>
              <span className="navbar-link-text">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {user ? (
            <>
              <div className="navbar-user">
                <div className="navbar-user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="navbar-user-name">{user.name || 'Usuário'}</span>
              </div>
              <button onClick={handleLogout} className="navbar-logout" title="Sair">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-login-btn">
              Entrar
            </Link>
          )}
        </div>

        <button 
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
