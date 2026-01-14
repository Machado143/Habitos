/**
 * NeedLogin - Página de aviso de autenticação necessária
 * 
 * Responsabilidades:
 * - Informar que o login é necessário
 * - Redirecionar automaticamente para login após 1.6s
 * - Preservar a rota de origem para redirect pós-login
 */

import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './AuthLayout.css'

/* =============================================================================
   CONSTANTES
   ============================================================================= */

/** Tempo em ms antes do redirect automático */
const REDIRECT_DELAY_MS = 1600

/* =============================================================================
   COMPONENTE PRINCIPAL
   ============================================================================= */

export default function NeedLogin() {
  const location = useLocation()
  const navigate = useNavigate()

  // ─────────────────────────────────────────────────────────────────────────────
  // Efeitos
  // ─────────────────────────────────────────────────────────────────────────────

  /** Redireciona para login após delay, preservando origem */
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { state: { from: location } })
    }, REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [location, navigate])

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <main className="auth-page">
      <article className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">É necessário estar logado</h1>
          <p className="auth-subtitle">Você será redirecionado para a tela de login...</p>
        </header>

        <footer>
          <p className="auth-note">
            <Link to="/">Voltar para a página inicial</Link>
          </p>
        </footer>
      </article>
    </main>
  )
}
