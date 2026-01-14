/**
 * HomePage - Página inicial do aplicativo
 * 
 * Responsabilidades:
 * - Exibir boas-vindas ao usuário
 * - Mostrar links de navegação para usuários logados
 * - Mostrar link de login para usuários não logados
 * - Permitir logout
 */

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Button from '../components/Button/Button'
import './AuthLayout.css'

/* =============================================================================
   CONSTANTES
   ============================================================================= */

/** Endpoint de logout */
const LOGOUT_ENDPOINT = '/api/logout/'

/* =============================================================================
   COMPONENTE PRINCIPAL
   ============================================================================= */

export default function HomePage() {
  const { user, logout } = useContext(AuthContext)

  // ─────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────────

  /** Realiza logout do usuário */
  async function handleLogout() {
    try {
      await fetch(LOGOUT_ENDPOINT, { method: 'POST', credentials: 'include' })
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
    logout()
    window.location.href = '/login'
  }

  /** Navega para a página de hábitos */
  const goToHabits = () => {
    window.location.href = '/habits'
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <main className="auth-page">
      <article className="auth-container">
        {/* Header */}
        <header className="auth-header">
          <h1 className="auth-title">Bem-vindo ao Habitcs</h1>
          <p className="auth-subtitle">Organize seus hábitos e acompanhe seu progresso</p>
        </header>

        {/* Conteúdo: Usuário logado */}
        {user ? (
          <section>
            <p>Olá, <strong>{user.name || user.username}</strong>.</p>
            
            <nav className="auth-nav-links">
              <Link to="/habits">Meus hábitos</Link>
              <span aria-hidden="true">·</span>
              <Link to="/create">Criar hábito</Link>
            </nav>

            <div className="auth-actions">
              <Button variant="ghost" onClick={goToHabits}>Ir para hábitos</Button>
              <Button variant="danger" onClick={handleLogout}>Sair</Button>
            </div>
          </section>
        ) : (
          /* Conteúdo: Usuário não logado */
          <section>
            <p>Você não está logado.</p>
            <p>
              <Link to="/login">Entrar</Link> para continuar.
            </p>
          </section>
        )}
      </article>
    </main>
  )
}
