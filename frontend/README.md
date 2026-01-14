# 🎨 Sistema de Design - Hábitos

## Versão Final de Produção

Design system monocromático elegante com componentes React prontos para uso.

---

## ✨ O que foi implementado:

### 🎨 **Tokens CSS**
- **Paleta monocromática completa**: Preto, cinza e branco
- **11 tons de cinza**: Do #000000 ao #FFFFFF
- **Cores semânticas**: Erro (vermelho), Sucesso (verde)
- **Espaçamentos**: Sistema baseado em 4px
- **Tipografia**: Inter font family com 5 pesos
- **Sombras suaves**: 6 níveis de elevação
- **Animações**: 12 keyframes prontas

### 🧩 **Componentes React**

#### Button
```jsx
import { Button } from './components';

<Button variant="primary" size="lg" loading={false}>
  Clique aqui
</Button>

// Variantes: primary, secondary, ghost, danger, success
// Tamanhos: sm, base, lg
// Estados: loading, disabled
```

#### Input
```jsx
import { Input } from './components';

<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  error="Campo obrigatório"
  helperText="Digite um email válido"
  icon={<MailIcon />}
  fullWidth
/>
```

#### Card
```jsx
import { Card } from './components';

<Card 
  title="Título do Card"
  subtitle="Subtítulo opcional"
  variant="elevated"
  padding="base"
  hoverable
>
  Conteúdo do card
</Card>

// Variantes: elevated, outlined
// Padding: none, sm, base, lg
```

#### NavBar
```jsx
import { NavBar } from './components';

<NavBar 
  user={{ name: 'João', username: 'joao123' }}
  onLogout={() => handleLogout()}
/>
```

### 📄 **Páginas Completas**

1. **LoginPage** (`/login`)
   - Background gradient elegante
   - Validação de formulário
   - Estados de loading
   - Mensagens de erro animadas
   - Responsivo mobile-first

2. **HabitsPage** (`/habits`)
   - Dashboard com estatísticas
   - Grid de cards de hábitos
   - Filtros (Todos, Ativos, Concluídos)
   - Ações inline (editar, deletar, concluir)
   - Empty states
   - Loading states
   - Totalmente responsivo

---

## 🚀 Como usar:

### 1. Importar estilos globais

No `main.jsx` ou `index.jsx`:

```jsx
import './index.css'; // Já importa tokens e animations automaticamente
```

### 2. Usar componentes

```jsx
import { Button, Card, Input, NavBar } from './components';

function MinhaPagina() {
  return (
    <>
      <NavBar user={user} onLogout={logout} />
      <Card title="Meu Card">
        <Input label="Nome" placeholder="Digite seu nome" />
        <Button variant="primary">Salvar</Button>
      </Card>
    </>
  );
}
```

### 3. Usar tokens CSS

```css
.meu-componente {
  padding: var(--spacing-4);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: var(--radius-base);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.meu-componente:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

---

## 📁 Estrutura de arquivos:

```
frontend/src/
├── styles/
│   ├── tokens.css         # Variáveis CSS (cores, espaçamentos, etc)
│   └── animations.css     # Keyframes e animações
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.css
│   ├── Input/
│   │   ├── Input.jsx
│   │   └── Input.css
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.css
│   ├── NavBar/
│   │   ├── NavBar.jsx
│   │   └── NavBar.css
│   └── index.js          # Export central
├── pages/
│   ├── LoginPage.jsx
│   ├── LoginPage.css
│   ├── HabitsPage.jsx
│   ├── HabitsPage.css
│   └── ...
├── index.css              # Reset + imports globais
└── main.jsx
```

---

## 🎨 Paleta de Cores:

### Cores Primárias (Preto/Cinza Escuro)
```css
--color-primary: #1A1A1A
--color-primary-hover: #000000
--color-primary-active: #0A0A0A
```

### Cores Accent (Cinza Médio)
```css
--color-accent: #616161
--color-accent-hover: #424242
--color-accent-active: #212121
```

### Escala Neutra
```css
--color-neutral-900: #000000 (preto)
--color-neutral-800: #212121
--color-neutral-700: #424242
--color-neutral-600: #616161
--color-neutral-500: #757575
--color-neutral-400: #9E9E9E
--color-neutral-300: #BDBDBD
--color-neutral-200: #E0E0E0
--color-neutral-100: #F5F5F5
--color-neutral-50: #FAFAFA
--color-white: #FFFFFF
```

### Cores Semânticas
```css
--color-error: #D32F2F (vermelho)
--color-success: #4CAF50 (verde)
--color-warning: #757575 (cinza)
```

---

## ✅ Características:

- ✅ **Monocromático elegante**: Paleta sofisticada em tons de cinza
- ✅ **Responsivo**: Mobile-first design
- ✅ **Acessível**: Contraste WCAG AA+ em todos os textos
- ✅ **Performático**: Animações GPU-accelerated
- ✅ **Modular**: Componentes independentes e reutilizáveis
- ✅ **TypeScript-ready**: Props bem definidas
- ✅ **Consistente**: Design tokens centralizados
- ✅ **Escalável**: Fácil de estender e customizar

---

## 🔥 Recursos Avançados:

### Animações prontas
```jsx
<div className="animate-fadeIn">Conteúdo com fade</div>
<div className="animate-slideInUp">Conteúdo deslizando</div>
<div className="animate-scaleIn">Conteúdo escalando</div>
```

### Gradientes monocromáticos
```css
background: var(--bg-gradient-dark);
/* linear-gradient(135deg, #1A1A1A 0%, #000000 100%) */

background: linear-gradient(135deg, #000000, #616161);
/* Preto para cinza médio */
```

### Sombras com níveis
```css
box-shadow: var(--shadow-xs);   /* Muito sutil */
box-shadow: var(--shadow-sm);   /* Pequena */
box-shadow: var(--shadow-base); /* Padrão */
box-shadow: var(--shadow-md);   /* Média */
box-shadow: var(--shadow-lg);   /* Grande */
box-shadow: var(--shadow-xl);   /* Extra grande */
```

---

## 📱 Breakpoints:

```css
/* Mobile-first approach */
@media (max-width: 640px) {
  /* Smartphones */
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablets */
}

@media (min-width: 1025px) {
  /* Desktop */
}
```

---

## 🎯 Próximos passos sugeridos:

1. ✅ **Já implementado**: Login e Dashboard funcionais
2. 🔄 **Implementar**: Página de criação/edição de hábitos
3. 📊 **Adicionar**: Página de relatórios com gráficos
4. 🔔 **Criar**: Sistema de notificações/toasts
5. 🌙 **Opcional**: Tema dark mode
6. 🧪 **Testar**: Adicionar testes unitários

---

**Desenvolvido com ❤️ usando React + Vite**  
**Design System v2.0.0 - Monocromático**
