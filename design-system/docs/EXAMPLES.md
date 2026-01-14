# Exemplos Práticos de Implementação

## 🎯 Receitas de Código Prontas para Usar

Este documento contém exemplos completos e funcionais de como usar o design system.

---

## 1. Configuração Inicial do Projeto

### package.json (adicionar)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
```

### src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Importar tokens CSS
import './styles/tokens/variables.css'
import './styles/tokens/animations.css'
import './styles/reset.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 2. Context de Autenticação Completo

### src/contexts/AuthContext.jsx

```javascript
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const validateToken = async (token) => {
    try {
      const response = await fetch('/api/user/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }

      return { 
        success: false, 
        error: data.message || 'Credenciais inválidas' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: 'Erro de conexão. Tente novamente.' 
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/logout/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
      }
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## 3. Toast Provider com Context

### src/contexts/ToastContext.jsx

```javascript
import React, { createContext, useState, useContext, useCallback } from 'react';
import { ToastContainer, Toast } from '../components/design-system/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showSuccess = useCallback((message) => {
    showToast(message, 'success');
  }, [showToast]);

  const showError = useCallback((message) => {
    showToast(message, 'error');
  }, [showToast]);

  const showWarning = useCallback((message) => {
    showToast(message, 'warning');
  }, [showToast]);

  const showInfo = useCallback((message) => {
    showToast(message, 'info');
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ 
      showToast, 
      showSuccess, 
      showError, 
      showWarning, 
      showInfo 
    }}>
      {children}
      <ToastContainer position="top-right">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
            isVisible={true}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
```

---

## 4. Hook Personalizado para API

### src/hooks/useApi.js

```javascript
import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const useApi = () => {
  const { token } = useAuth();
  const { showError } = useToast();
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Token ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return { data, error: null };
    } catch (error) {
      showError(error.message);
      return { data: null, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [token, showError]);

  const get = useCallback((url) => request(url), [request]);

  const post = useCallback((url, body) => 
    request(url, { method: 'POST', body: JSON.stringify(body) }), 
    [request]
  );

  const put = useCallback((url, body) => 
    request(url, { method: 'PUT', body: JSON.stringify(body) }), 
    [request]
  );

  const del = useCallback((url) => 
    request(url, { method: 'DELETE' }), 
    [request]
  );

  return { get, post, put, del, loading };
};
```

---

## 5. Hook para Gerenciar Hábitos

### src/hooks/useHabits.js

```javascript
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';
import { useToast } from '../contexts/ToastContext';

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  const { showSuccess, showError } = useToast();

  const fetchHabits = useCallback(async () => {
    setLoading(true);
    const { data, error } = await api.get('/api/habits/');
    
    if (data) {
      setHabits(data);
    }
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const createHabit = useCallback(async (habitData) => {
    const { data, error } = await api.post('/api/habits/', habitData);
    
    if (data) {
      setHabits(prev => [...prev, data]);
      showSuccess('Hábito criado com sucesso!');
      return { success: true, habit: data };
    }
    
    return { success: false, error };
  }, [api, showSuccess]);

  const updateHabit = useCallback(async (id, habitData) => {
    const { data, error } = await api.put(`/api/habits/${id}/`, habitData);
    
    if (data) {
      setHabits(prev => prev.map(h => h.id === id ? data : h));
      showSuccess('Hábito atualizado!');
      return { success: true, habit: data };
    }
    
    return { success: false, error };
  }, [api, showSuccess]);

  const deleteHabit = useCallback(async (id) => {
    const { error } = await api.del(`/api/habits/${id}/`);
    
    if (!error) {
      setHabits(prev => prev.filter(h => h.id !== id));
      showSuccess('Hábito removido!');
      return { success: true };
    }
    
    return { success: false, error };
  }, [api, showSuccess]);

  const completeHabit = useCallback(async (id) => {
    const { data, error } = await api.post(`/api/habits/${id}/complete/`, {
      date: new Date().toISOString().split('T')[0]
    });
    
    if (data) {
      setHabits(prev => prev.map(h => 
        h.id === id ? { ...h, completed_today: true, streak: data.streak } : h
      ));
      showSuccess('Hábito concluído! 🎉');
      return { success: true };
    }
    
    return { success: false, error };
  }, [api, showSuccess]);

  return {
    habits,
    loading,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    completeHabit
  };
};
```

---

## 6. Componente ProtectedRoute

### src/components/ProtectedRoute.jsx

```javascript
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '100vh' 
      }}>
        <div className="spinner">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

---

## 7. App.jsx Completo

### src/App.jsx

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/HabitsPage';
import CreateHabit from './pages/CreateHabit';
import HabitDetail from './pages/HabitDetail';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/habits" element={
              <ProtectedRoute>
                <HabitsPage />
              </ProtectedRoute>
            } />

            <Route path="/habits/new" element={
              <ProtectedRoute>
                <CreateHabit />
              </ProtectedRoute>
            } />

            <Route path="/habits/:id/edit" element={
              <ProtectedRoute>
                <CreateHabit />
              </ProtectedRoute>
            } />

            <Route path="/habits/:id" element={
              <ProtectedRoute>
                <HabitDetail />
              </ProtectedRoute>
            } />

            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />

            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
```

---

## 8. Página Dashboard Completa

### src/pages/Dashboard.jsx

```javascript
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useHabits } from '../hooks/useHabits';
import NavBar from '../components/design-system/NavBar';
import Card from '../components/design-system/Card';
import HabitCard from '../components/design-system/HabitCard';
import Button from '../components/design-system/Button';
import EmptyState from '../components/design-system/EmptyState';
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { habits, loading, completeHabit, deleteHabit } = useHabits();

  const stats = {
    activeHabits: habits.length,
    currentStreak: Math.max(...habits.map(h => h.streak || 0), 0),
    completedToday: habits.filter(h => h.completed_today).length
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNewHabit = () => {
    navigate('/habits/new');
  };

  const handleEditHabit = (habit) => {
    navigate(`/habits/${habit.id}/edit`);
  };

  const handleDeleteHabit = async (habit) => {
    if (confirm(`Tem certeza que deseja excluir "${habit.name}"?`)) {
      await deleteHabit(habit.id);
    }
  };

  const handleToggleComplete = async (habit) => {
    if (!habit.completed_today) {
      await completeHabit(habit.id);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard">
      <NavBar user={user} onLogout={handleLogout} />

      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Olá, {user?.name || 'Usuário'}! 👋</h1>
          <p className="dashboard-subtitle">
            Continue sua jornada de desenvolvimento pessoal
          </p>
        </header>

        <div className="stats-grid">
          <Card variant="elevated" padding="base">
            <div className="stat-content">
              <span className="stat-label">Hábitos ativos</span>
              <span className="stat-value">{stats.activeHabits}</span>
            </div>
          </Card>

          <Card variant="elevated" padding="base">
            <div className="stat-content">
              <span className="stat-label">Dias de sequência</span>
              <span className="stat-value">{stats.currentStreak}</span>
            </div>
          </Card>

          <Card variant="elevated" padding="base">
            <div className="stat-content">
              <span className="stat-label">Concluídos hoje</span>
              <span className="stat-value">
                {stats.completedToday}/{stats.activeHabits}
              </span>
            </div>
          </Card>
        </div>

        <section className="habits-section">
          <div className="section-header">
            <h2 className="section-title">Seus hábitos</h2>
            <Button 
              variant="primary" 
              onClick={handleNewHabit}
            >
              Novo hábito
            </Button>
          </div>

          {habits.length === 0 ? (
            <EmptyState
              title="Nenhum hábito ainda"
              description="Comece criando seu primeiro hábito para acompanhar"
              action={
                <Button variant="primary" onClick={handleNewHabit}>
                  Criar primeiro hábito
                </Button>
              }
            />
          ) : (
            <div className="habits-grid">
              {habits.slice(0, 6).map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteHabit}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}

          {habits.length > 6 && (
            <div className="view-all">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/habits')}
              >
                Ver todos os hábitos
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
```

---

## 9. Formulário de Hábito com Validação

### src/pages/CreateHabit.jsx

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useToast } from '../contexts/ToastContext';
import NavBar from '../components/design-system/NavBar';
import Card from '../components/design-system/Card';
import Input from '../components/design-system/Input';
import Select from '../components/design-system/Select';
import Button from '../components/design-system/Button';
import './CreateHabit.css';

export const CreateHabit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const { showSuccess, showError } = useToast();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily',
    goal: 30
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadHabit();
    }
  }, [id]);

  const loadHabit = async () => {
    const { data } = await api.get(`/api/habits/${id}/`);
    if (data) {
      setFormData({
        name: data.name,
        frequency: data.frequency,
        goal: data.goal
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (formData.goal < 1) {
      newErrors.goal = 'Meta deve ser maior que 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const endpoint = isEditing 
      ? `/api/habits/${id}/` 
      : '/api/habits/';
    
    const method = isEditing ? 'put' : 'post';

    const { data, error } = await api[method](endpoint, formData);

    if (data) {
      showSuccess(isEditing ? 'Hábito atualizado!' : 'Hábito criado!');
      navigate('/habits');
    }

    setLoading(false);
  };

  return (
    <div className="create-habit-page">
      <NavBar />

      <main className="create-habit-container">
        <Card
          title={isEditing ? 'Editar Hábito' : 'Novo Hábito'}
          subtitle={isEditing ? 'Atualize as informações do seu hábito' : 'Crie um novo hábito para acompanhar'}
          padding="lg"
        >
          <form onSubmit={handleSubmit} className="habit-form">
            <Input
              label="Nome do hábito"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="Ex: Meditar 10 minutos"
              required
              disabled={loading}
            />

            <Select
              label="Frequência"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              options={[
                { value: 'daily', label: 'Diário' },
                { value: 'weekly', label: 'Semanal' }
              ]}
              required
              disabled={loading}
            />

            <Input
              label="Meta (dias)"
              type="number"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: parseInt(e.target.value) })}
              error={errors.goal}
              helperText="Quantos dias você quer manter esse hábito?"
              min={1}
              disabled={loading}
            />

            <div className="form-actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                {isEditing ? 'Salvar alterações' : 'Criar hábito'}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default CreateHabit;
```

---

## 10. Exemplo de Uso de Modal

```javascript
import React, { useState } from 'react';
import Modal from './components/design-system/Modal';
import Button from './components/design-system/Button';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirmar ação"
        size="base"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        }
      >
        <p>Tem certeza que deseja realizar esta ação?</p>
      </Modal>
    </>
  );
}
```

---

Estes exemplos cobrem os casos de uso mais comuns. Consulte a documentação completa em `docs/` para mais detalhes!
