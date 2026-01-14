# 🎨 Guia do Sistema Monocromático

## Visão Geral

O design system **Hábitos** utiliza uma paleta **monocromática elegante** baseada em tons de cinza, branco e preto. Esta abordagem cria uma estética minimalista, sofisticada e atemporal.

---

## Paleta de Cores

### Cores Primárias - Preto e Cinza Escuro

Usadas para elementos principais, botões primários e CTAs importantes.

```css
--color-primary: #1A1A1A         /* Cinza muito escuro */
--color-primary-hover: #000000   /* Preto puro */
--color-primary-active: #0A0A0A  /* Preto intermediário */
--color-primary-disabled: #BDBDBD /* Cinza médio claro */
--color-primary-light: #F5F5F5   /* Cinza muito claro */
--color-primary-dark: #000000    /* Preto */
```

**Uso:**
- Botões principais
- Navegação ativa
- Elementos de destaque
- Cabeçalhos importantes

---

### Cores Accent - Cinza Médio

Usadas para criar contraste secundário e variação visual.

```css
--color-accent: #616161           /* Cinza médio */
--color-accent-hover: #424242     /* Cinza médio escuro */
--color-accent-active: #212121    /* Cinza escuro */
--color-accent-disabled: #E0E0E0  /* Cinza claro */
--color-accent-light: #F5F5F5     /* Cinza muito claro */
--color-accent-dark: #000000      /* Preto */
```

**Uso:**
- Botões secundários
- Badges
- Elementos informativos
- Ícones secundários

---

### Escala Neutra - Tons de Cinza Completa

Sistema completo de tons para textos, backgrounds e bordas.

```css
--color-neutral-900: #000000  /* Preto puro */
--color-neutral-800: #212121  /* Cinza 21 */
--color-neutral-700: #424242  /* Cinza 42 */
--color-neutral-600: #616161  /* Cinza 61 */
--color-neutral-500: #757575  /* Cinza 75 */
--color-neutral-400: #9E9E9E  /* Cinza 9E */
--color-neutral-300: #BDBDBD  /* Cinza BD */
--color-neutral-200: #E0E0E0  /* Cinza E0 */
--color-neutral-100: #F5F5F5  /* Cinza F5 */
--color-neutral-50:  #FAFAFA  /* Cinza FA */
--color-white:       #FFFFFF  /* Branco puro */
```

**Hierarquia:**
- **900-800**: Textos principais, títulos
- **700-600**: Textos secundários
- **500-400**: Textos terciários, desabilitados
- **300-200**: Bordas, separadores
- **100-50**: Backgrounds sutis
- **White**: Background principal

---

### Cores Semânticas

Mantemos algumas cores para feedback do usuário (essencial para UX).

#### ❌ Erro (Mantém Vermelho)
```css
--color-error: #D32F2F
--color-error-hover: #C62828
--color-error-light: #FFEBEE
--color-error-dark: #B71C1C
```

**Uso:** Mensagens de erro, validação de formulários, ações destrutivas

#### ⚠️ Aviso (Cinza)
```css
--color-warning: #757575
--color-warning-hover: #616161
--color-warning-light: #F5F5F5
```

**Uso:** Alertas neutros, informações de atenção

#### ✅ Sucesso (Cinza Escuro)
```css
--color-success: #424242
--color-success-hover: #212121
--color-success-light: #F5F5F5
```

**Uso:** Confirmações, conclusões de tarefas

#### ℹ️ Informação (Cinza Médio)
```css
--color-info: #616161
--color-info-hover: #424242
--color-info-light: #FAFAFA
```

**Uso:** Tooltips, mensagens informativas

---

## Backgrounds

```css
--color-bg-primary: #FFFFFF    /* Branco - cards, modais */
--color-bg-secondary: #FAFAFA  /* Cinza quase branco - página */
--color-bg-tertiary: #F5F5F5   /* Cinza claro - seções */
--color-bg-overlay: rgba(0, 0, 0, 0.75)  /* Overlay escuro */
```

### Hierarquia de Profundidade

```
┌─────────────────────────────────────┐
│  Page (#FAFAFA)                     │
│  ┌───────────────────────────────┐  │
│  │ Card (#FFFFFF)                │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Section (#F5F5F5)       │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## Textos

```css
--color-text-primary: #000000    /* Preto - títulos, texto principal */
--color-text-secondary: #424242  /* Cinza escuro - texto secundário */
--color-text-tertiary: #616161   /* Cinza médio - legendas */
--color-text-disabled: #9E9E9E   /* Cinza claro - desabilitado */
--color-text-inverse: #FFFFFF    /* Branco - sobre fundo escuro */
```

### Contraste e Acessibilidade

Todos os pares texto/fundo atendem **WCAG 2.1 nível AA+**:

| Texto | Background | Contraste | Status |
|-------|------------|-----------|--------|
| #000000 | #FFFFFF | 21:1 | ✅ AAA |
| #424242 | #FFFFFF | 9.74:1 | ✅ AAA |
| #616161 | #FFFFFF | 5.74:1 | ✅ AA |
| #757575 | #FFFFFF | 4.54:1 | ✅ AA |
| #FFFFFF | #000000 | 21:1 | ✅ AAA |

---

## Bordas

```css
--color-border-primary: #E0E0E0    /* Bordas padrão */
--color-border-secondary: #BDBDBD  /* Bordas mais visíveis */
--color-border-focus: #000000      /* Estado de foco */
```

**Uso:**
- **Primary**: Cards, inputs, separadores sutis
- **Secondary**: Tabelas, elementos que precisam mais destaque
- **Focus**: Estado de foco em inputs e botões

---

## Gradientes Monocromáticos

### Para Logos e Elementos Especiais

```css
/* Gradiente Preto → Cinza Médio Escuro */
background: linear-gradient(135deg, #000000, #424242);

/* Gradiente Preto → Cinza Médio */
background: linear-gradient(135deg, #000000, #616161);

/* Gradiente Cinza Escuro → Cinza Claro */
background: linear-gradient(135deg, #212121, #9E9E9E);
```

### Aplicação

```css
/* Logo icon */
.logo-icon {
  background: linear-gradient(135deg, #000000, #424242);
}

/* Texto com gradiente */
.gradient-text {
  background: linear-gradient(135deg, #000000, #616161);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Barras de progresso */
.progress-bar {
  background: linear-gradient(90deg, #000000, #424242);
}
```

---

## Sombras Suaves

Sombras mais sutis para manter elegância monocromática:

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
```

**Princípio:** Sombras menos intensas (alpha channel reduzido) para evitar contraste excessivo.

---

## Componentes Principais

### Botões

```jsx
// Primário - Preto
<Button variant="primary">Criar hábito</Button>

// Secundário - Cinza médio
<Button variant="secondary">Cancelar</Button>

// Ghost - Transparente com borda
<Button variant="ghost">Ver mais</Button>

// Danger - Vermelho (mantém cor)
<Button variant="danger">Deletar</Button>
```

### Cards

```jsx
// Branco com sombra suave
<Card variant="elevated">
  <h3>Conteúdo</h3>
</Card>

// Cinza claro
<Card variant="outlined">
  <h3>Conteúdo</h3>
</Card>
```

### Badges

```jsx
// Cinza escuro
<Badge variant="default">Ativo</Badge>

// Verde (sucesso mantém cor)
<Badge variant="success">Completo</Badge>

// Vermelho (erro mantém cor)
<Badge variant="error">Falhou</Badge>
```

---

## Exemplos de Uso

### Header / Navbar

```css
.navbar {
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
  box-shadow: var(--shadow-sm);
}

.navbar-logo {
  background: linear-gradient(135deg, #000000, #424242);
  color: white;
}

.nav-link {
  color: #616161;
}

.nav-link:hover {
  color: #000000;
}

.nav-link.active {
  color: #000000;
  border-bottom: 2px solid #000000;
}
```

### Cards de Hábito

```css
.habit-card {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-shadow: var(--shadow-sm);
}

.habit-card:hover {
  border-color: #BDBDBD;
  box-shadow: var(--shadow-md);
}

.habit-title {
  color: #000000;
  font-weight: 600;
}

.habit-description {
  color: #616161;
}

.progress-bar-bg {
  background-color: #F5F5F5;
}

.progress-bar-fill {
  background: linear-gradient(90deg, #000000, #424242);
}
```

### Login Page

```css
.login-page {
  background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%);
}

.login-card {
  background: #FFFFFF;
  box-shadow: var(--shadow-xl);
}

.login-title {
  color: #000000;
}

.login-subtitle {
  color: #616161;
}
```

---

## Princípios de Design

### 1. **Hierarquia Visual Clara**
Use a escala de cinza para criar diferentes níveis de importância:
- **Preto (#000000)**: Máxima prioridade
- **Cinza escuro (#424242)**: Alta prioridade
- **Cinza médio (#616161)**: Média prioridade
- **Cinza claro (#9E9E9E)**: Baixa prioridade

### 2. **Contraste Intencional**
- Mantenha alto contraste entre texto e fundo
- Use branco (#FFFFFF) para destacar elementos importantes
- Preto (#000000) para criar pontos focais

### 3. **Espaçamento Generoso**
Em designs monocromáticos, o espaço em branco é ainda mais crucial:
- Aumente padding/margin entre elementos
- Use backgrounds diferentes (#FFFFFF, #FAFAFA, #F5F5F5) para separar seções

### 4. **Tipografia Forte**
Com menos cor, a tipografia carrega mais peso:
- Varie pesos (400, 500, 600, 700)
- Use tamanhos contrastantes
- Aproveite espaçamento de letras (letter-spacing)

### 5. **Sombras Sutis**
Crie profundidade sem exagero:
- Sombras mais suaves (alpha 0.04 - 0.15)
- Prefira múltiplas camadas de sombras leves
- Use blur generoso

---

## Quando Usar Cor

Mesmo em um sistema monocromático, algumas cores são essenciais:

### ✅ Use Cor Para:
- **Erros e alertas críticos** (vermelho #D32F2F)
- **Sucesso confirmado** (verde #4CAF50 - opcional, pode usar cinza)
- **Links externos** (azul tradicional - se necessário)
- **Notificações importantes**

### ❌ Evite Cor Para:
- Decoração
- Elementos genéricos
- Navegação principal
- Conteúdo secundário

---

## Checklist de Implementação

### Ao Criar Novos Componentes:

- [ ] Usa apenas cores da paleta monocromática
- [ ] Mantém contraste mínimo 4.5:1 (AA)
- [ ] Sombras são sutis (alpha < 0.15)
- [ ] Hierarquia clara através de tons de cinza
- [ ] Espaçamento generoso entre elementos
- [ ] Tipografia varia em peso/tamanho
- [ ] Usa cor apenas para feedback crítico
- [ ] Testa em modo escuro (se aplicável)

---

## Modo Escuro (Futuro)

Para uma futura implementação de tema escuro, inverter a paleta:

```css
[data-theme="dark"] {
  --color-bg-primary: #1A1A1A;
  --color-bg-secondary: #121212;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #BDBDBD;
  --color-border-primary: #424242;
}
```

---

## Recursos e Inspiração

- **Google Material Design**: Sistema de cinzas refinado
- **Apple Human Interface**: Uso elegante de espaço em branco
- **Dieter Rams**: "Weniger, aber besser" (Menos, mas melhor)
- **Swiss Design**: Tipografia e grid como elementos principais

---

**Última atualização:** Janeiro 2026  
**Versão:** 2.0.0 - Monocromático
