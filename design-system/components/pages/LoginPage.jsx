/**
 * LoginPage - Página completa de login
 * 
 * Componente com estado completo para autenticação
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/design-system/Input';
import Button from '../components/design-system/Button';
import './LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
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
      const result = await login(email, password);

      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/dashboard');
      } else {
        setErrors({ form: result.error || 'Erro ao fazer login' });
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
            id="email"
            name="email"
            type="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="seu@email.com"
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

export default LoginPage;
