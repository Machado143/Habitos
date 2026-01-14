/**
 * LoginPage - Página completa de login
 * 
 * Componente com estado completo para autenticação
 */

import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        const from = location.state?.from?.pathname || "/habits";
        navigate(from, { replace: true });
      } else {
        setErrors({ form: result.error || 'Credenciais inválidas' });
      }
    } catch (error) {
      setErrors({ form: 'Erro de conexão. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">✓</div>
            <span className="login-logo-text">Hábitos</span>
          </div>
          <h1 className="login-title">Bem-vindo de volta!</h1>
          <p className="login-subtitle">Entre para acompanhar seus hábitos</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            id="username"
            name="username"
            type="text"
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            placeholder="Seu usuário"
            required
            disabled={loading}
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            required
            disabled={loading}
          />

          <div className="login-actions">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Lembrar de mim</span>
            </label>

            <a href="/forgot-password" className="login-link">
              Esqueceu a senha?
            </a>
          </div>

          {errors.form && (
            <div className="login-error" role="alert">
              {errors.form}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </form>

        <div className="login-footer">
          Não tem uma conta?{' '}
          <a href="/register" className="login-link">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
};
// Single default export already declared at function definition above
