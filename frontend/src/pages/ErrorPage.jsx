/**
 * ErrorPage - Página genérica de erro
 * 
 * @param {Object} props
 * @param {string} [props.message] - Mensagem de erro customizada
 */

import { Link } from 'react-router-dom'
import './AuthLayout.css'

/* =============================================================================
   CONSTANTES
   ============================================================================= */

/** Mensagem padrão quando nenhuma é fornecida */
const DEFAULT_MESSAGE = 'Ocorreu um erro.'

/* =============================================================================
   COMPONENTE PRINCIPAL
   ============================================================================= */

export default function ErrorPage({ message }) {
  return (
    <main className="auth-page">
      <article className="auth-container">
        <header className="auth-header">
          <h1 className="auth-title">Erro</h1>
          <p className="auth-subtitle" role="alert">
            {message || DEFAULT_MESSAGE}
          </p>
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
