# Notas de Implementação - Hábitos Design System

## 🎯 Como Implementar no Projeto

### 1. Setup Inicial

#### Instalar no Frontend (React + Vite)

```bash
cd frontend
# Copiar arquivos do design system
cp -r ../design-system/tokens ./src/styles/
cp -r ../design-system/components ./src/components/design-system/
cp -r ../design-system/assets ./public/assets/
```

#### Importar Tokens CSS

No `src/main.jsx`:

```javascript
import './styles/tokens/variables.css';
import './styles/tokens/animations.css';
```

#### Reset CSS Base

Criar `src/styles/reset.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  font-family: var(--font-family-body);
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}
```

---

### 2. Configuração do Vite

#### vite.config.js

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
  }
})
```

---

### 3. Estrutura de Componentes

#### Componentes Estáticos vs. Com Estado

**Componentes Estáticos (Presentational):**
- `Button` - Apenas visual, recebe props
- `Input` - Controlled component
- `Card` - Layout puro
- `Badge` - Display apenas
- `EmptyState` - Display apenas

**Uso:**
```jsx
// Estático - pai controla estado
<Input 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

**Componentes Com Estado (Container):**
- `Modal` - Gerencia isOpen internamente
- `Toast` - Auto-dismiss com timer
- `NavBar` - Estado de menu mobile

**Uso:**
```jsx
// Com estado interno
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  {/* conteúdo */}
</Modal>
```

#### Padrão de Composição

```jsx
// HabitCard é composição de Card + Badge + Button
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

export const HabitCard = ({ habit, onEdit, onDelete }) => {
  return (
    <Card padding="base" hoverable>
      <div className="habit-header">
        <h3>{habit.name}</h3>
        <Badge variant="primary">{habit.frequency}</Badge>
      </div>
      {/* ... */}
      <Button variant="primary" onClick={onToggleComplete}>
        Marcar como concluído
      </Button>
    </Card>
  );
};
```

---

### 4. Endpoints da API Django

#### Base URL
```
http://localhost:8000/api/
```

#### Autenticação

```javascript
// POST /api/login/
{
  "email": "user@example.com",
  "password": "senha123"
}

// Resposta
{
  "token": "abc123...",
  "user": {
    "id": 1,
    "name": "Usuário",
    "email": "user@example.com"
  }
}

// POST /api/logout/
// Headers: Authorization: Token abc123...
```

#### Hábitos

```javascript
// GET /api/habits/
// Retorna lista de hábitos do usuário
[
  {
    "id": 1,
    "name": "Meditação matinal",
    "frequency": "daily",
    "goal": 30,
    "streak": 23,
    "completed_today": true,
    "progress": 85,
    "created_at": "2026-01-01T00:00:00Z"
  }
]

// POST /api/habits/
{
  "name": "Novo hábito",
  "frequency": "daily", // or "weekly"
  "goal": 30
}

// PUT /api/habits/{id}/
// Atualizar hábito

// DELETE /api/habits/{id}/
// Remover hábito

// POST /api/habits/{id}/complete/
// Marcar hábito como concluído hoje
{
  "date": "2026-01-14"
}

// GET /api/habits/{id}/history/
// Histórico de conclusões
[
  {
    "date": "2026-01-14",
    "completed": true
  }
]
```

#### Relatórios

```javascript
// GET /api/reports/summary/
{
  "active_habits": 8,
  "total_streak": 23,
  "completed_today": 5,
  "completion_rate": 0.85
}

// GET /api/reports/trends/?period=week
// Dados para gráficos
{
  "labels": ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  "data": [5, 6, 7, 6, 8, 7, 5]
}
```

---

### 5. Context de Autenticação

#### src/contexts/AuthContext.jsx

```jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar token ao carregar
    const token = localStorage.getItem('token');
    if (token) {
      // Validar token com API
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    }
    
    return { success: false, error: data.message };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

#### Uso em Componentes

```jsx
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    
    if (result.success) {
      // Redirecionar para dashboard
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      {/* ... */}
    </form>
  );
}
```

---

### 6. Rotas e Navegação

#### src/App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HabitsPage from './pages/HabitsPage';
import CreateHabit from './pages/CreateHabit';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/habits" element={<ProtectedRoute><HabitsPage /></ProtectedRoute>} />
          <Route path="/habits/new" element={<ProtectedRoute><CreateHabit /></ProtectedRoute>} />
          <Route path="/habits/:id/edit" element={<ProtectedRoute><CreateHabit /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

### 7. Gerenciamento de Estado

#### Opção 1: Context API (Simples)

```jsx
// src/contexts/HabitsContext.jsx
const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHabits = async () => {
    setLoading(true);
    const response = await fetch('/api/habits/');
    const data = await response.json();
    setHabits(data);
    setLoading(false);
  };

  const createHabit = async (habitData) => {
    const response = await fetch('/api/habits/', {
      method: 'POST',
      body: JSON.stringify(habitData)
    });
    const newHabit = await response.json();
    setHabits([...habits, newHabit]);
  };

  return (
    <HabitsContext.Provider value={{ habits, fetchHabits, createHabit, loading }}>
      {children}
    </HabitsContext.Provider>
  );
};
```

#### Opção 2: React Query (Recomendado para produção)

```bash
npm install @tanstack/react-query
```

```jsx
// src/hooks/useHabits.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useHabits = () => {
  return useQuery({
    queryKey: ['habits'],
    queryFn: async () => {
      const response = await fetch('/api/habits/');
      return response.json();
    }
  });
};

export const useCreateHabit = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (habitData) => 
      fetch('/api/habits/', {
        method: 'POST',
        body: JSON.stringify(habitData)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(['habits']);
    }
  });
};
```

---

### 8. Toast Notifications System

```jsx
// src/contexts/ToastContext.jsx
import { createContext, useState, useContext } from 'react';
import { ToastContainer, Toast } from '../components/design-system/Toast';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer position="top-right">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
```

**Uso:**
```jsx
const { showToast } = useToast();

const handleSave = async () => {
  try {
    await saveHabit();
    showToast('Hábito salvo com sucesso!', 'success');
  } catch (error) {
    showToast('Erro ao salvar hábito', 'error');
  }
};
```

---

### 9. Performance e Otimizações

#### Lazy Loading de Páginas

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Reports = lazy(() => import('./pages/Reports'));

function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

#### Memoização de Componentes

```jsx
import { memo } from 'react';

export const HabitCard = memo(({ habit, onEdit, onDelete }) => {
  // ... componente
}, (prevProps, nextProps) => {
  // Re-render apenas se habit mudou
  return prevProps.habit.id === nextProps.habit.id &&
         prevProps.habit.completed === nextProps.habit.completed;
});
```

#### SVG como Componentes

```jsx
// src/components/icons/HomeIcon.jsx
export const HomeIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 12L5 10M5 10L12 3L19 10..." stroke={color} strokeWidth="2" />
  </svg>
);
```

---

### 10. Testes

#### Exemplo de Teste de Componente

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

### 11. Checklist de Implementação

- [ ] Copiar tokens CSS para `src/styles/`
- [ ] Copiar componentes para `src/components/design-system/`
- [ ] Importar variables.css e animations.css no main.jsx
- [ ] Configurar proxy do Vite para Django
- [ ] Implementar AuthContext e login
- [ ] Criar rotas protegidas
- [ ] Implementar ToastProvider
- [ ] Criar páginas Dashboard, Habits, Reports
- [ ] Conectar componentes com API
- [ ] Adicionar loading states
- [ ] Implementar tratamento de erros
- [ ] Testar responsividade
- [ ] Validar acessibilidade
- [ ] Adicionar testes unitários

---

### 12. Dicas e Boas Práticas

1. **Sempre use tokens CSS** ao invés de valores hardcoded
2. **Componentes pequenos** e com responsabilidade única
3. **Props typing** com PropTypes ou TypeScript
4. **Error boundaries** para capturar erros de componentes
5. **Loading states** em todas operações assíncronas
6. **Feedback visual** para todas ações do usuário
7. **Validação** de formulários antes de enviar
8. **Debounce** em campos de busca
9. **Lazy loading** de páginas e imagens pesadas
10. **Acessibilidade** desde o início, não como refactor

---

**Próximos passos:** Ver `ROUTES.md` para mapa completo de navegação.
