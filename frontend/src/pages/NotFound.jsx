/**
 * NotFound - Página 404
 * 
 * Exibida quando o usuário tenta acessar uma rota inexistente.
 */

import { Link } from 'react-router-dom'
import './AuthLayout.css'

export default function NotFound() {
  return (
    <main className="auth-page">
      <article className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">404 — Página não encontrada</h1>
          <p className="auth-subtitle">A página que você procura não existe.</p>
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
