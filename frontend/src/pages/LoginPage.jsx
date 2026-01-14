import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validação básica
    if (!username.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      // Garantir que o cookie CSRF esteja presente (fetch para endpoint que define o cookie)
      await fetch('/api/csrf/', { method: 'GET', credentials: 'include' });

      // Ler o cookie csrftoken e enviá-lo no header X-CSRFToken (necessário para Django CSRF)
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }

      const csrftoken = getCookie('csrftoken');

      const res = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrftoken ? { 'X-CSRFToken': csrftoken } : {}),
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Credenciais inválidas");
        return;
      }

      const data = await res.json();
      
      // Atualizar contexto de autenticação
      login({ 
        username: data.username || username,
        name: data.name || username 
      });
      
      // Redirecionar para origem ou página inicial
      const from = location.state?.from?.pathname || '/habits';
      navigate(from, { replace: true });
    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">H</div>
            <h1 className="login-logo-text">Habitcs</h1>
          </div>
          <h2 className="login-title">Bem-vindo de volta</h2>
          <p className="login-subtitle">
            Entre para acompanhar seus hábitos e alcançar suas metas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <Input
            label="Usuário ou Email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            autoComplete="username"
            required
            fullWidth
            disabled={loading}
          />

          <Input
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            required
            fullWidth
            disabled={loading}
          />

          <div className="login-options">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="login-forgot">
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            fullWidth
          >
            Entrar
          </Button>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <p className="login-register">
            Não tem uma conta?{' '}
            <a href="/register" className="login-register-link">
              Criar conta
            </a>
          </p>
        </form>
      </div>

      <div className="login-footer">
        <p>© 2026 Habitcs. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

export default LoginPage;
