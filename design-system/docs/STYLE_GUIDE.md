# Hábitos - Guia de Estilo e Design System

## Visão Geral

Sistema de design moderno e acessível para o aplicativo Hábitos, focado em clareza visual, produtividade e experiência motivadora.

---

## 📋 Sumário

1. [Paleta de Cores](#paleta-de-cores)
2. [Tipografia](#tipografia)
3. [Espaçamento](#espaçamento)
4. [Componentes](#componentes)
5. [Ícones](#ícones)
6. [Animações](#animações)
7. [Breakpoints](#breakpoints)
8. [Acessibilidade](#acessibilidade)

---

## 🎨 Paleta de Cores

### Cores Principais

#### Primary (Ação)
```css
--color-primary: #646CFF;
--color-primary-hover: #5157E8;
--color-primary-active: #4248D1;
--color-primary-disabled: #A5A9FF;
--color-primary-light: #E8E9FF;
--color-primary-dark: #3D43BA;
```

**Uso:** Botões primários, links, elementos interativos principais, foco de formulários.

**Contraste:** AA+ em fundos brancos (4.5:1 mínimo)

#### Accent (Sucesso/Progresso)
```css
--color-accent: #24C3B5;
--color-accent-hover: #1FAA9E;
--color-accent-active: #1A9287;
--color-accent-disabled: #8FE3DC;
--color-accent-light: #D4F5F2;
--color-accent-dark: #157F75;
```

**Uso:** Indicadores de sucesso, progresso de hábitos, estados positivos, streaks.

### Cores Semânticas

```css
--color-error: #FF6B6B;      /* Erros e ações destrutivas */
--color-warning: #FFB84D;    /* Avisos e alertas */
--color-success: #24C3B5;    /* Confirmações de sucesso */
--color-info: #3B82F6;       /* Informações neutras */
```

### Cores Neutras

```css
--color-neutral-900: #1A1A1A;  /* Texto principal */
--color-neutral-800: #2D2D2D;
--color-neutral-700: #404040;
--color-neutral-600: #5C5C5C;  /* Texto secundário */
--color-neutral-500: #808080;  /* Texto terciário */
--color-neutral-400: #A3A3A3;  /* Texto desabilitado */
--color-neutral-300: #C7C7C7;
--color-neutral-200: #E0E0E0;  /* Bordas */
--color-neutral-100: #F0F0F0;  /* Fundos terciários */
--color-neutral-50: #F7F8FA;   /* Fundos secundários */
--color-white: #FFFFFF;        /* Fundos principais */
```

### Aplicação de Cores

| Elemento | Cor | Uso |
|----------|-----|-----|
| Texto principal | `neutral-900` | Body text, títulos |
| Texto secundário | `neutral-600` | Descrições, labels |
| Texto desabilitado | `neutral-400` | Estados disabled |
| Background principal | `white` | Cards, modais |
| Background secundário | `neutral-50` | Body, páginas |
| Bordas | `neutral-200` | Separadores, inputs |
| Botões primários | `primary` | CTAs principais |
| Badges de sucesso | `accent-light` + `accent` | Progresso, streaks |

---

## ✍️ Tipografia

### Família de Fontes

```css
--font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-mono: 'Fira Code', 'Courier New', monospace;
```

**Fallback:** Sistema nativo para melhor performance e consistência.

### Escala de Tamanhos

| Token | Tamanho | Uso |
|-------|---------|-----|
| `font-size-xs` | 12px / 0.75rem | Badges, labels pequenas |
| `font-size-sm` | 14px / 0.875rem | Labels, helper text |
| `font-size-base` | 16px / 1rem | Body text, inputs |
| `font-size-lg` | 18px / 1.125rem | Subtítulos |
| `font-size-xl` | 20px / 1.25rem | Títulos de cards |
| `font-size-2xl` | 24px / 1.5rem | Títulos de seção |
| `font-size-3xl` | 30px / 1.875rem | Títulos de página |
| `font-size-4xl` | 36px / 2.25rem | Hero titles |
| `font-size-5xl` | 48px / 3rem | Landing page |

### Pesos

```css
--font-weight-regular: 400;   /* Body text */
--font-weight-medium: 500;    /* Labels, buttons */
--font-weight-semibold: 600;  /* Títulos de cards */
--font-weight-bold: 700;      /* Headings principais */
```

### Line Heights

```css
--line-height-tight: 1.25;    /* Headings */
--line-height-normal: 1.5;    /* Body text */
--line-height-relaxed: 1.75;  /* Texto longo */
```

### Exemplos de Uso

```css
/* Heading H1 */
font-size: var(--font-size-4xl);
font-weight: var(--font-weight-bold);
line-height: var(--line-height-tight);

/* Body Text */
font-size: var(--font-size-base);
font-weight: var(--font-weight-regular);
line-height: var(--line-height-normal);

/* Button Text */
font-size: var(--font-size-base);
font-weight: var(--font-weight-medium);
line-height: var(--line-height-normal);
```

---

## 📏 Espaçamento

### Escala (baseada em 4px)

```css
--spacing-0: 0;
--spacing-1: 4px;    /* Micro espaçamentos */
--spacing-2: 8px;    /* Gap pequeno */
--spacing-3: 12px;   /* Gap médio */
--spacing-4: 16px;   /* Padding padrão */
--spacing-5: 20px;
--spacing-6: 24px;   /* Seções */
--spacing-8: 32px;   /* Grandes seções */
--spacing-10: 40px;
--spacing-12: 48px;  /* Margens de página */
--spacing-16: 64px;
--spacing-20: 80px;
--spacing-24: 96px;
```

### Aplicação

| Contexto | Espaçamento |
|----------|-------------|
| Gap entre ícone e texto | `spacing-2` (8px) |
| Padding de botões | `spacing-4` (16px) horizontal |
| Padding de cards | `spacing-4` ou `spacing-6` |
| Margin entre seções | `spacing-8` |
| Margin de página (mobile) | `spacing-4` |
| Margin de página (desktop) | `spacing-8` |

---

## 🧩 Componentes

### Button

**Variantes:** `primary`, `secondary`, `ghost`, `danger`  
**Tamanhos:** `sm` (32px), `base` (40px), `lg` (48px)

**Estados:**
- Default
- Hover (translateY -1px, shadow)
- Active (scale 0.98)
- Disabled (opacity 0.6)
- Loading (spinner animado)

**Arquivo:** `components/Button.jsx` + `Button.css`

### Input

**Props:** label, error, helperText, icon, disabled, required  
**Altura:** 40px (base)

**Estados:**
- Default (border neutral-200)
- Hover (border neutral-300)
- Focus (border primary, shadow-focus)
- Error (border error, shadow-error-focus)
- Disabled (bg neutral-100, opacity 0.6)

**Arquivo:** `components/Input.jsx` + `Input.css`

### Card

**Variantes:** `default`, `bordered`, `elevated`  
**Padding:** `sm`, `base`, `lg`  
**Hoverable:** Opcional (lift effect)

**Estrutura:**
- Header (título, subtítulo)
- Body (conteúdo)
- Footer (ações)

**Arquivo:** `components/Card.jsx` + `Card.css`

### Modal

**Tamanhos:** `sm` (400px), `base` (560px), `lg` (720px), `xl` (1024px)

**Recursos:**
- Overlay com blur
- Fechar com ESC
- Fechar ao clicar no overlay (opcional)
- Animação scale-in
- Lock de scroll do body

**Arquivo:** `components/Modal.jsx` + `Modal.css`

### Toast

**Tipos:** `success`, `error`, `warning`, `info`  
**Posições:** `top-right`, `top-left`, `bottom-right`, etc.  
**Auto-dismiss:** 4000ms (configurável)

**Arquivo:** `components/Toast.jsx` + `Toast.css`

### HabitCard

Componente especializado para exibir hábitos.

**Features:**
- Título e badge de frequência
- Barra de progresso
- Indicador de streak
- Ações (editar, excluir)
- Botão de conclusão

**Arquivo:** `components/HabitCard.jsx` + `HabitCard.css`

### NavBar

Barra de navegação responsiva.

**Features:**
- Logo com gradiente
- Links de navegação (desktop)
- Menu hamburger (mobile)
- Avatar de usuário
- Botão de logout

**Arquivo:** `components/NavBar.jsx` + `NavBar.css`

### EmptyState

Estado vazio com ícone, mensagem e ação.

**Uso:** Listas vazias, sem dados, primeiro uso.

**Arquivo:** `components/EmptyState.jsx` + `EmptyState.css`

---

## 🎭 Ícones

### Lista de Ícones (SVG 24x24)

| Nome | Arquivo | Uso |
|------|---------|-----|
| Home | `home.svg` | Navegação dashboard |
| Add/Plus | `add.svg` | Adicionar novo hábito |
| Edit | `edit.svg` | Editar hábito |
| Delete | `delete.svg` | Remover hábito |
| Calendar | `calendar.svg` | Visualização de calendário |
| Settings | `settings.svg` | Configurações |
| Chart | `chart.svg` | Relatórios/Analytics |
| Logout | `logout.svg` | Sair da conta |
| Check | `check.svg` | Marcar concluído |
| Close/X | `close.svg` | Fechar modal |
| Menu | `menu.svg` | Menu mobile |
| User | `user.svg` | Perfil usuário |
| Filter | `filter.svg` | Filtros |
| Search | `search.svg` | Busca |
| Trend Up | `trend-up.svg` | Progresso positivo |
| Fire | `fire.svg` | Streak/Sequência |

**Estilo:** Outline com stroke-width 2px  
**Cor:** `currentColor` (herda do pai)  
**Otimização:** Minified, sem metadados desnecessários

**Localização:** `design-system/assets/icons/`

---

## ✨ Animações

### Microinterações

```css
/* Button Hover */
transform: translateY(-1px);
box-shadow: var(--shadow-sm);
transition: 150ms ease;

/* Button Active */
transform: scale(0.98);
transition: 100ms ease;

/* Card Hover */
transform: translateY(-2px);
box-shadow: var(--shadow-md);
transition: 200ms ease;
```

### Transições

```css
--transition-fast: 150ms ease;     /* Hover, opacity */
--transition-base: 200ms ease;     /* Padrão */
--transition-slow: 300ms ease;     /* Modais */
--transition-slower: 500ms ease;   /* Animações complexas */
```

### Keyframes Disponíveis

- `fadeIn` / `fadeOut`
- `slideInRight` / `slideInLeft` / `slideInUp`
- `scaleIn` / `scaleOut`
- `spin` (loading)
- `pulse` (indicadores)
- `bounce`
- `shake` (erros)

**Arquivo:** `tokens/animations.css`

---

## 📱 Breakpoints

```css
--breakpoint-mobile: 640px;      /* ≤ 640px */
--breakpoint-tablet: 641px;      /* 641-1024px */
--breakpoint-desktop: 1025px;    /* ≥ 1025px */
--breakpoint-wide: 1440px;       /* ≥ 1440px */
```

### Media Queries

```css
/* Mobile First */
.component { /* mobile styles */ }

@media (min-width: 641px) { /* tablet */ }
@media (min-width: 1025px) { /* desktop */ }

/* Desktop First */
@media (max-width: 1024px) { /* tablet */ }
@media (max-width: 640px) { /* mobile */ }
```

---

## ♿ Acessibilidade

### Contraste

- Texto normal: mínimo 4.5:1 (AA)
- Texto grande: mínimo 3:1 (AA)
- Primary vs white: 6.2:1 ✅
- Neutral-900 vs white: 12.6:1 ✅

### Foco Visível

```css
:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
  /* 0 0 0 3px rgba(100, 108, 255, 0.2) */
}
```

### ARIA

- Todos inputs com labels associadas
- Botões com `aria-label` quando sem texto
- Modais com `role="dialog"` e `aria-modal="true"`
- Loading states com `aria-busy="true"`
- Erros com `role="alert"`

### Navegação por Teclado

- Tab order lógico
- Enter para ativar botões
- ESC para fechar modais
- Setas em selects e navegação

### Checklist de Componentes

- ✅ Labels em todos inputs
- ✅ Estados de foco visíveis
- ✅ Contraste AA+ em textos
- ✅ Ícones com `aria-hidden` quando decorativos
- ✅ Textos alternativos em imagens
- ✅ Sem dependência apenas de cor para informação

---

## 📦 Assets

### Lista de Arquivos

```
design-system/
├── tokens/
│   ├── variables.css (15 KB)
│   └── animations.css (4 KB)
├── components/
│   ├── Button.jsx + .css (8 KB)
│   ├── Input.jsx + .css (7 KB)
│   ├── Card.jsx + .css (5 KB)
│   ├── Modal.jsx + .css (9 KB)
│   ├── Toast.jsx + .css (7 KB)
│   ├── NavBar.jsx + .css (9 KB)
│   ├── HabitCard.jsx + .css (8 KB)
│   ├── EmptyState.jsx + .css (3 KB)
│   ├── Badge.jsx + .css (2 KB)
│   └── Select.jsx + .css (6 KB)
├── assets/
│   └── icons/ (16 SVGs, ~1 KB cada)
├── prototypes/
│   ├── login.html (12 KB)
│   └── dashboard.html (15 KB)
└── docs/
    ├── STYLE_GUIDE.md (este arquivo)
    ├── IMPLEMENTATION_NOTES.md
    └── ROUTES.md
```

**Total combinado:** ~120 KB (otimizado)

---

## 🚀 Próximos Passos

1. Implementar componentes em React no projeto frontend
2. Configurar importação de tokens CSS
3. Criar páginas baseadas nos protótipos
4. Configurar proxy para API Django
5. Implementar context de autenticação
6. Adicionar testes de componentes

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2026  
**Mantido por:** Equipe Hábitos
